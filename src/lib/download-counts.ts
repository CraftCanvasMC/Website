import { existsSync, mkdirSync } from "node:fs";
import { dirname, extname, isAbsolute, join } from "node:path";
import sqlite3 from "sqlite3";

type DownloadCountQueryOptions = {
  day?: string | null;
};

type DownloadCountRow = {
  download_url: string;
  count: number;
};

const DEFAULT_DB_FILE = join(process.cwd(), ".cache", "download-counts.sqlite");

let dbPromise: Promise<sqlite3.Database> | null = null;
let writeQueue: Promise<void> = Promise.resolve();

function resolvePath(pathLike: string) {
  return isAbsolute(pathLike) ? pathLike : join(process.cwd(), pathLike);
}

function resolveDbFilePath() {
  const configuredDbFile = process.env.DOWNLOAD_COUNTS_DB_FILE?.trim();
  const configuredFile = process.env.DOWNLOAD_COUNTS_FILE?.trim();

  if (configuredDbFile) {
    return resolvePath(configuredDbFile);
  }

  if (configuredFile) {
    const resolved = resolvePath(configuredFile);
    const isJsonPath = extname(resolved).toLowerCase() === ".json";

    return isJsonPath
      ? resolved.slice(0, -".json".length) + ".sqlite"
      : resolved;
  }

  return DEFAULT_DB_FILE;
}

const DB_FILE_PATH = resolveDbFilePath();

function getTodayDayKey() {
  return new Date().toISOString().slice(0, 10);
}

function run(
  db: sqlite3.Database,
  query: string,
  params: unknown[] = []
): Promise<void> {
  return new Promise((resolve, reject) => {
    db.run(query, params as never[], (error) => {
      if (error) {
        reject(error);
        return;
      }
      resolve();
    });
  });
}

function getRow<T>(
  db: sqlite3.Database,
  query: string,
  params: unknown[] = []
): Promise<T | undefined> {
  return new Promise((resolve, reject) => {
    db.get(query, params as never[], (error, row) => {
      if (error) {
        reject(error);
        return;
      }
      resolve((row as T | undefined) ?? undefined);
    });
  });
}

function getAllRows<T>(
  db: sqlite3.Database,
  query: string,
  params: unknown[] = []
): Promise<T[]> {
  return new Promise((resolve, reject) => {
    db.all(query, params as never[], (error, rows) => {
      if (error) {
        reject(error);
        return;
      }
      resolve((rows as T[]) || []);
    });
  });
}

function ensureSchema(connection: sqlite3.Database) {
  return Promise.all([
    run(
      connection,
      `
    CREATE TABLE IF NOT EXISTS download_totals (
      download_url TEXT PRIMARY KEY,
      count INTEGER NOT NULL DEFAULT 0
    )
  `
    ),
    run(
      connection,
      `
    CREATE TABLE IF NOT EXISTS download_daily (
      download_url TEXT NOT NULL,
      day TEXT NOT NULL,
      count INTEGER NOT NULL DEFAULT 0,
      PRIMARY KEY (download_url, day)
    )
  `
    ),
    run(
      connection,
      `
    CREATE INDEX IF NOT EXISTS idx_download_daily_day
    ON download_daily(day)
  `
    ),
  ]).then(() => undefined);
}

function openDatabase(filePath: string): Promise<sqlite3.Database> {
  const sqlite = sqlite3.verbose();
  return new Promise((resolve, reject) => {
    const database = new sqlite.Database(filePath, (error) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(database);
    });
  });
}

function enqueueWrite<T>(task: () => Promise<T>) {
  const next = writeQueue.then(task, task);
  writeQueue = next.then(
    () => undefined,
    () => undefined
  );
  return next;
}

async function createDatabase() {
  const dbDir = dirname(DB_FILE_PATH);
  if (!existsSync(dbDir)) {
    mkdirSync(dbDir, { recursive: true });
  }

  const connection = await openDatabase(DB_FILE_PATH);

  try {
    await run(connection, "PRAGMA journal_mode = WAL");
    await run(connection, "PRAGMA synchronous = NORMAL");
    await ensureSchema(connection);
  } catch (error) {
    await new Promise<void>((resolve) => {
      connection.close(() => resolve());
    });
    throw error;
  }

  return connection;
}

async function getDatabase() {
  if (!dbPromise) {
    dbPromise = createDatabase();
  }
  return dbPromise;
}

export async function incrementDownloadCount(
  downloadUrl: string,
  options: DownloadCountQueryOptions = {}
) {
  const day = options.day ?? getTodayDayKey();

  return enqueueWrite(async () => {
    const connection = await getDatabase();

    try {
      await run(connection, "BEGIN IMMEDIATE");
      await run(
        connection,
        `
          INSERT INTO download_totals (download_url, count)
          VALUES (?, 1)
          ON CONFLICT(download_url) DO UPDATE SET
            count = download_totals.count + 1
        `,
        [downloadUrl]
      );
      await run(
        connection,
        `
          INSERT INTO download_daily (download_url, day, count)
          VALUES (?, ?, 1)
          ON CONFLICT(download_url, day) DO UPDATE SET
            count = download_daily.count + 1
        `,
        [downloadUrl, day]
      );
      await run(connection, "COMMIT");
    } catch (error) {
      try {
        await run(connection, "ROLLBACK");
      } catch {
        // ignore rollback errors after failed writes
      }
      throw error;
    }

    const totalRow = await getRow<{ count: number }>(
      connection,
      "SELECT count FROM download_totals WHERE download_url = ?",
      [downloadUrl]
    );
    return totalRow?.count ?? 0;
  });
}

export async function getDownloadCount(
  downloadUrl: string,
  options: DownloadCountQueryOptions = {}
) {
  const counts = await getDownloadCounts([downloadUrl], options);
  return counts.byUrl[downloadUrl] ?? 0;
}

export async function getDownloadCounts(
  downloadUrls: string[],
  options: DownloadCountQueryOptions = {}
) {
  const uniqueUrls = Array.from(new Set(downloadUrls));

  if (uniqueUrls.length === 0) {
    return {
      total: 0,
      byUrl: {} as Record<string, number>,
    };
  }

  const connection = await getDatabase();
  const placeholders = uniqueUrls.map(() => "?").join(", ");

  const rows = options.day
    ? await getAllRows<DownloadCountRow>(
        connection,
        `
          SELECT download_url, count
          FROM download_daily
          WHERE day = ? AND download_url IN (${placeholders})
        `,
        [options.day, ...uniqueUrls]
      )
    : await getAllRows<DownloadCountRow>(
        connection,
        `
          SELECT download_url, count
          FROM download_totals
          WHERE download_url IN (${placeholders})
        `,
        uniqueUrls
      );

  const byUrl: Record<string, number> = {};
  for (const url of uniqueUrls) {
    byUrl[url] = 0;
  }

  for (const row of rows) {
    byUrl[row.download_url] = Number(row.count) || 0;
  }

  const total = uniqueUrls.reduce((sum, url) => sum + (byUrl[url] || 0), 0);

  return {
    total,
    byUrl,
  };
}
