'use client';

import { useState, useEffect, useMemo, memo, useCallback } from 'react';
import { Download, GitCommit, LayoutList, PanelsTopLeft, BookOpenText, ChevronRight } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { CodeBlock } from '~/components/ui/code-block';
import { Card } from '~/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { Redirecting } from '~/components/redirecting';
import type { Build } from '~/lib/schemas/jenkins';
import { useTranslation } from '~/lib/use-translation';

const CommitItem = memo(({ commit }: { commit: any }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = useCallback(() => setIsOpen(o => !o), []);

  return (
    <div className="min-w-0 space-y-1">
      <div className="flex min-w-0 items-center gap-1.5">
        <a
          href={`https://github.com/CraftCanvasMC/Canvas/commit/${commit.hash}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-1.5 text-neutral-500 text-sm hover:text-neutral-400"
        >
          <GitCommit className="size-3.5" />
          {commit.hash?.slice(0, 7)}
        </a>

        <p className="min-w-0 break-words text-neutral-300 text-sm flex-1">
          {commit.message || t.downloads.commit.noMessage}
        </p>

        {commit.extraDescription && (
          <button
            onClick={toggleOpen}
            className="ml-1 text-neutral-500 hover:text-neutral-300 transition-colors"
            title={isOpen ? t.downloads.commit.hideDetails : t.downloads.commit.showDetails}
            aria-expanded={isOpen}
          >
            <ChevronRight
              className={`size-4 transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`}
            />
          </button>
        )}
      </div>

      <div
        className={`overflow-hidden transition-all duration-200 ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        {commit.extraDescription && (
          <div className="pl-6 text-sm text-neutral-400 border-l border-neutral-700 whitespace-pre-wrap font-mono">
            {commit.extraDescription.replace(/^\n/, '')}
          </div>
        )}
      </div>
    </div>
  );
});

CommitItem.displayName = 'CommitItem';

const dateFormatter = new Intl.DateTimeFormat('en-GB', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false
});

const getRelativeTime = (timestamp: number): string => {
  const diffMs = Date.now() - timestamp;
  const diffMins = Math.floor(diffMs / 60000);

  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;

  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;

  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 30) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;

  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths < 12) return `${diffMonths} month${diffMonths > 1 ? 's' : ''} ago`;

  const diffYears = Math.floor(diffMonths / 12);
  return `${diffYears} year${diffYears > 1 ? 's' : ''} ago`;
};

const StatusBadge = memo(({ result, isExperimental }: { result?: string; isExperimental?: boolean }) => {
  const { t } = useTranslation();
  if (result === 'FAILURE') {
    return <span className="rounded-full bg-red-500/20 px-2 py-0.5 text-xs font-semibold text-red-400">{t.downloads.status.failed}</span>;
  }
  if (result === 'ABORTED') {
    return <span className="rounded-full bg-gray-500/20 px-2 py-0.5 text-xs font-semibold text-gray-400">{t.downloads.status.cancelled}</span>;
  }
  if (isExperimental) {
    return <span className="rounded-full bg-yellow-500/20 px-2 py-0.5 text-xs font-semibold text-yellow-400">{t.downloads.status.experimental}</span>;
  }
  return null;
});

StatusBadge.displayName = 'StatusBadge';

const BuildRow = memo(({ build, isLatest }: { build: Build; isLatest: boolean }) => {
  const { t, language } = useTranslation();
  const { buildNumber, commits, timestamp } = build;

  const dateFormatter = useMemo(() => new Intl.DateTimeFormat(language === 'tr' ? 'tr-TR' : 'en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }), [language]);

  const formattedDate = useMemo(() => {
    const date = new Date(timestamp);
    return dateFormatter.format(date).replace(',', '');
  }, [timestamp, dateFormatter]);

  const relativeTime = useMemo(() => {
    const diffMs = Date.now() - timestamp;
    const diffMins = Math.floor(diffMs / 60000);

    const unit = (count: number, singular: string, plural: string) => `${count} ${count === 1 ? singular : plural} ${t.downloads.relative.suffixAgo}`;

    if (diffMins < 1) return t.downloads.relative.justNow;
    if (diffMins < 60) return unit(diffMins, t.downloads.relative.minute, t.downloads.relative.minutes);

    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return unit(diffHours, t.downloads.relative.hour, t.downloads.relative.hours);

    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 30) return unit(diffDays, t.downloads.relative.day, t.downloads.relative.days);

    const diffMonths = Math.floor(diffDays / 30);
    if (diffMonths < 12) return unit(diffMonths, t.downloads.relative.month, t.downloads.relative.months);

    const diffYears = Math.floor(diffMonths / 12);
    return unit(diffYears, t.downloads.relative.year, t.downloads.relative.years);
  }, [timestamp, t]);
  const displayCommits = useMemo(() => commits.slice(0, 100), [commits]);

  return (
    <div
      className="group flex flex-col justify-between gap-4 border-neutral-800 border-t py-4 px-4 sm:px-6 sm:flex-row sm:items-center
                 transition-all duration-200 ease-out
                 hover:scale-[1.01] hover:shadow-lg hover:border hover:border-white/20 hover:rounded-lg will-change-transform"
    >
      <div className="flex min-w-0 flex-1 flex-col sm:flex-row sm:items-center">
        <div className="flex flex-col justify-center pr-6 sm:pr-8 border-r border-white/10 min-w-[120px] sm:min-w-[140px]">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-neutral-100">#{buildNumber}</span>
            <StatusBadge result={build.result} isExperimental={build.isExperimental} />
          </div>
          <span className="text-[11px] text-neutral-500 mt-1">
            {formattedDate} <span className="text-neutral-600">({relativeTime})</span>
          </span>
        </div>

        <div className="flex-1 min-w-0 pl-6 sm:pl-8 mt-3 sm:mt-0 space-y-2">
          {commits.length === 0 ? (
            <span className="text-neutral-300 text-sm">{t.downloads.build.noChanges}</span>
          ) : (
            displayCommits.map((commit) => <CommitItem key={commit.hash} commit={commit} />)
          )}
        </div>
      </div>

      <Button
        variant={isLatest ? 'default' : 'secondary'}
        asChild={!!build.downloadUrl}
        disabled={!build.downloadUrl}
        className="w-full shrink-0 sm:w-auto"
      >
        {build.downloadUrl ? (
          <a href={build.downloadUrl} download className="inline-flex items-center gap-2">
            <Download className="size-4" />
            {t.downloads.build.download}
          </a>
        ) : (
          <span className="inline-flex items-center gap-2">
            <Download className="size-4" />
            {t.downloads.build.unavailable}
          </span>
        )}
      </Button>
    </div>
  );
});

BuildRow.displayName = 'BuildRow';

const SculptorContent = memo(({ selectedVersion }: { selectedVersion: string }) => {
  const { t } = useTranslation();
  return (
    <div className="text-center sm:text-left animate-fade-in">
      <h2 className="text-xl font-semibold mb-2 text-center">{t.downloads.sculptor.title}</h2>
      <p className="text-sm text-neutral-400 max-w-2xl mx-auto">
        {t.downloads.sculptor.description}
      </p>

      <div className="mt-6 text-center">
        <Button asChild className="inline-flex items-center gap-2 px-6 py-2">
          <a
            href="https://jenkins.canvasmc.io/job/Sculptor/lastSuccessfulBuild/artifact/build/libs/Sculptor-1.0.0-SNAPSHOT.jar"
            download
          >
            <Download className="size-4" />
            {t.downloads.sculptor.downloadButton}
          </a>
        </Button>
      </div>

      <div className="mt-8 text-left">
        <h3 className="text-lg font-semibold mb-3 text-neutral-200">{t.downloads.sculptor.exampleUsage}</h3>
        <CodeBlock language="cmd">
          {`$ java -Dsculptor.minecraftVersion=${selectedVersion} -Dsculptor.includeExperimental=true -jar sculptor.jar`}
        </CodeBlock>
      </div>

      <div className="mt-8 text-left">
        <h3 className="text-lg font-semibold mb-3 text-neutral-200">{t.downloads.sculptor.argumentsExplained}</h3>
        <ul className="list-disc pl-6 space-y-2 text-sm text-neutral-300">
          <li>
            <code className="text-neutral-100">-Dsculptor.minecraftVersion</code> — <br />
            <span className="text-neutral-400">
              <strong>{t.downloads.sculptor.args.minecraftVersion.requiredLabel}</strong> {t.downloads.sculptor.args.minecraftVersion.description}
            </span>
          </li>
          <li>
            <code className="text-neutral-100">-Dsculptor.includeExperimental</code> — <br />
            <span className="text-neutral-400">
              <strong>{t.downloads.sculptor.args.includeExperimental.optionalLabel}</strong> {t.downloads.sculptor.args.includeExperimental.description}
            </span>
          </li>
          <li>
            <code className="text-neutral-100">-Dsculptor.serverFileName</code> — <br />
            <span className="text-neutral-400">
              <strong>{t.downloads.sculptor.args.serverFileName.optionalLabel}</strong> {t.downloads.sculptor.args.serverFileName.description}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
});

SculptorContent.displayName = 'SculptorContent';

const BuildsList = memo(({ builds }: { builds: Build[] }) => {
  const { t } = useTranslation();
  return (
    <div className="space-y-2 animate-fade-in">
      {builds.length === 0 ? (
        <p className="text-neutral-300 text-center">{t.downloads.list.noBuilds}</p>
      ) : (
        builds.map((build, index) => (
          <BuildRow key={build.buildNumber} build={build} isLatest={index === 0} />
        ))
      )}
    </div>
  );
});

BuildsList.displayName = 'BuildsList';

export default function DownloadsPage({
  buildsByVersion,
  versions,
  usingCache = false,
}: {
  buildsByVersion: Record<string, Build[]>;
  versions: string[];
  usingCache?: boolean;
}) {
  const { t } = useTranslation();
  const [selectedVersion, setSelectedVersion] = useState(versions[0]);
  const [showNewTab, setShowNewTab] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const [contentKey, setContentKey] = useState(0);

  const builds = useMemo(
    () => buildsByVersion[selectedVersion]?.slice(0, 11) ?? [],
    [buildsByVersion, selectedVersion]
  );

  useEffect(() => {
    const clearRedirect = () => setRedirecting(false);
    window.addEventListener('pageshow', clearRedirect);
    return () => window.removeEventListener('pageshow', clearRedirect);
  }, []);

  const handleJavadocRedirect = useCallback(() => {
    setRedirecting(true);
    setTimeout(() => {
      window.location.href = `/api/v2/jd/?version=${selectedVersion}&experimental=false`;
    }, 150);
  }, [selectedVersion]);

  const toggleTab = useCallback(() => {
    setShowNewTab(prev => !prev);
    setContentKey(k => k + 1);
  }, []);

  return (
    <section className="mt-12 sm:mt-16 relative">
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>

      <Redirecting show={redirecting} target={t.downloads.header.javadocsTarget} />
      <Card className="p-6 overflow-hidden">
        <div className="mb-6 flex items-center justify-between gap-4 animate-fade-in">
          <div className="flex items-center gap-2">
            <Select value={selectedVersion} onValueChange={setSelectedVersion}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={t.downloads.header.selectVersion} />
              </SelectTrigger>
              <SelectContent>
                {versions.map((version) => (
                  <SelectItem key={version} value={version}>
                    Minecraft {version}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <button
              onClick={handleJavadocRedirect}
              className="p-2 rounded hover:bg-white/10 transition-colors"
              title={t.downloads.header.viewJavadocsTitle}
              aria-label={t.downloads.header.viewJavadocsTitle}
            >
              <BookOpenText className="size-5 text-neutral-300 hover:text-neutral-100" />
            </button>
          </div>

          <Button
            variant={showNewTab ? 'default' : 'secondary'}
            onClick={toggleTab}
            className="flex items-center gap-2 transition-transform duration-200 hover:scale-105"
          >
            {showNewTab ? (
              <>
                <LayoutList className="size-4" />
                {t.downloads.header.toggle.showBuilds}
              </>
            ) : (
              <>
                <PanelsTopLeft className="size-4" />
                {t.downloads.header.toggle.showSculptor}
              </>
            )}
          </Button>
        </div>

        <div key={contentKey}>
          {showNewTab ? (
            <SculptorContent selectedVersion={selectedVersion} />
          ) : (
            <BuildsList builds={builds} />
          )}
        </div>

        <div className="mt-8 text-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <a
            href="https://jenkins.canvasmc.io"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-400 text-sm hover:text-neutral-300 transition-colors"
          >
            {t.downloads.jenkinsLink}
          </a>
        </div>
      </Card>
    </section>
  );
}