import JSON5 from "json5";
import JSZip from "jszip";
import { isScalar, isSeq, parseDocument } from "yaml";

import serverTemplate from "../../../configs/canvas-server.yml?raw";
import worldsTemplate from "../../../configs/canvas-worlds.yml?raw";

type TargetFile = "server" | "world" | "removed";

interface OptionMapping {
  oldPath: string;
  target: TargetFile;
  newPath?: readonly string[];
}

const OPTION_MAPPINGS: ReadonlyArray<OptionMapping> = [
  {
    oldPath: "scheduler.stealThresholdMillis",
    target: "server",
    newPath: [
      "region-scheduler",
      "affinity-scheduler",
      "steal-threshold-millis",
    ],
  },
  {
    oldPath: "scheduler.runTasksBufferMillis",
    target: "server",
    newPath: [
      "region-scheduler",
      "affinity-scheduler",
      "run-tasks-buffer-millis",
    ],
  },
  {
    oldPath: "scheduler.overloadedLogMillis",
    target: "server",
    newPath: ["region-scheduler", "overloaded-log-millis"],
  },
  {
    oldPath: "scheduler.tickRegionAffinity",
    target: "server",
    newPath: ["region-scheduler", "affinity-scheduler", "tick-region-affinity"],
  },
  {
    oldPath: "scheduler.enableAffinitySchedulerCpuAffinity",
    target: "server",
    newPath: [
      "region-scheduler",
      "affinity-scheduler",
      "enable-affinity-scheduler-cpu-affinity",
    ],
  },
  {
    oldPath: "scheduler.enableWorkStealing",
    target: "server",
    newPath: ["region-scheduler", "affinity-scheduler", "enable-work-stealing"],
  },
  {
    oldPath: "scheduler.enableMidTickTasks",
    target: "server",
    newPath: [
      "region-scheduler",
      "affinity-scheduler",
      "enable-mid-tick-tasks",
    ],
  },
  {
    oldPath: "scheduler.defaultTickRate",
    target: "server",
    newPath: ["region-scheduler", "default-tick-rate"],
  },
  { oldPath: "chunks.useEuclideanDistanceSquared", target: "removed" },
  {
    oldPath: "chunks.threadPoolPriority",
    target: "server",
    newPath: ["chunk-system", "thread-priority"],
  },
  {
    oldPath: "chunks.fluidPostProcessingMode",
    target: "server",
    newPath: ["chunk-system", "fluid-post-processing-algorithm"],
  },
  {
    oldPath: "chunks.fluidPostProcessingToScheduledTick",
    target: "server",
    newPath: ["chunk-system", "make-fluid-post-process-scheduled-tick"],
  },
  {
    oldPath: "chunks.optimizeAquifer",
    target: "server",
    newPath: ["chunk-system", "optimize-aquifer"],
  },
  {
    oldPath: "chunks.useEndBiomeCache",
    target: "server",
    newPath: ["chunk-system", "use-end-biome-cache"],
  },
  {
    oldPath: "chunks.endBiomeCacheCapacity",
    target: "server",
    newPath: ["chunk-system", "end-biome-cache-size"],
  },
  {
    oldPath: "chunks.optimizeBeardifier",
    target: "server",
    newPath: ["chunk-system", "optimize-beardifier"],
  },
  {
    oldPath: "chunks.optimizeNoiseGeneration",
    target: "server",
    newPath: ["chunk-system", "optimize-noise-generation"],
  },
  {
    oldPath: "chunks.structures.deduplicateShuffledTemplatePoolElementList",
    target: "server",
    newPath: [
      "chunk-system",
      "structure-optimizations",
      "deduplicate-shuffled-template-pool-element-list",
    ],
  },
  {
    oldPath: "chunks.structures.optimizeStructureGen",
    target: "server",
    newPath: ["chunk-system", "structure-optimizations", "enable"],
  },
  {
    oldPath: "networking.filterClientboundSetEntityMotionPacket",
    target: "server",
    newPath: ["networking", "filter-velocity-packet"],
  },
  {
    oldPath: "networking.reduceUselessMovePackets",
    target: "server",
    newPath: ["networking", "filter-move-packets"],
  },
  {
    oldPath: "networking.hideFlamesOnEntitiesWithFireResistance",
    target: "world",
    newPath: ["visuals", "hide-flames-on-entities-with-fire-resistance"],
  },
  {
    oldPath: "networking.hideFlamesOnEntitiesWithInvisibility",
    target: "world",
    newPath: ["visuals", "hide-flames-on-entities-with-invisibility"],
  },
  {
    oldPath: "networking.optimizePlayerListTicking",
    target: "server",
    newPath: ["networking", "alternative-player-list-tick"],
  },
  {
    oldPath: "networking.playerInfoSendInterval",
    target: "server",
    newPath: ["networking", "player-info-send-interval"],
  },
  {
    oldPath: "networking.asyncProtocolSwitch",
    target: "server",
    newPath: ["networking", "async-protocol-switch"],
  },
  {
    oldPath: "networking.maximumPacketBytes",
    target: "server",
    newPath: ["networking", "maximum-packet-bytes"],
  },
  {
    oldPath: "networking.disablePaperPacketOverflowContainerFix",
    target: "server",
    newPath: ["networking", "disable-paper-packet-overflow-container-fix"],
  },
  {
    oldPath: "networking.packetTooLargeDisconnectReason",
    target: "server",
    newPath: ["networking", "packet-too-large-disconnect-reason"],
  },
  {
    oldPath: "cactusCheckSurvivalBeforeGrowth",
    target: "world",
    newPath: ["cactus-check-survival-before-growth"],
  },
  {
    oldPath: "enableCachedMTBEntityTypeConvert",
    target: "server",
    newPath: ["cache-minecraft2-bukkit-entity-type-conversion"],
  },
  {
    oldPath: "tileEntitySnapshotCreation",
    target: "server",
    newPath: ["tile-entity-snapshot-creation"],
  },
  {
    oldPath: "chainEndCrystalExplosions",
    target: "world",
    newPath: ["chain-end-crystal-explosions"],
  },
  {
    oldPath: "disableFarmlandTrampling",
    target: "world",
    newPath: ["farming", "disable-farmland-trampling"],
  },
  {
    oldPath: "farmlandAlwaysMoist",
    target: "world",
    newPath: ["farming", "farmland-always-moist"],
  },
  {
    oldPath: "enableNoChatReports",
    target: "server",
    newPath: ["chat", "disable-chat-reporting"],
  },
  {
    oldPath: "disableChatVerificationOrder",
    target: "server",
    newPath: ["chat", "disable-chat-verification-order"],
  },
  {
    oldPath: "snowballCanKnockback",
    target: "world",
    newPath: ["combat", "snowball-can-knockback-players"],
  },
  {
    oldPath: "eggCanKnockback",
    target: "world",
    newPath: ["combat", "egg-can-knockback-players"],
  },
  {
    oldPath: "entityCollisionMode",
    target: "world",
    newPath: ["entities", "entity-collision-mode"],
  },
  {
    oldPath: "fixes.mc298464",
    target: "server",
    newPath: ["vanilla-fixes", "mc298464"],
  },
  {
    oldPath: "fixes.mc223153",
    target: "server",
    newPath: ["vanilla-fixes", "mc223153"],
  },
  {
    oldPath: "fixes.mc200418",
    target: "server",
    newPath: ["vanilla-fixes", "mc200418"],
  },
  {
    oldPath: "fixes.mc94054",
    target: "server",
    newPath: ["vanilla-fixes", "mc94054"],
  },
  {
    oldPath: "fixes.mc245394",
    target: "server",
    newPath: ["vanilla-fixes", "mc245394"],
  },
  { oldPath: "fixes.mc231743", target: "removed" },
  {
    oldPath: "fixes.mc227337",
    target: "server",
    newPath: ["vanilla-fixes", "mc227337"],
  },
  {
    oldPath: "fixes.mc221257",
    target: "server",
    newPath: ["vanilla-fixes", "mc221257"],
  },
  {
    oldPath: "fixes.mc206922",
    target: "server",
    newPath: ["vanilla-fixes", "mc206922"],
  },
  {
    oldPath: "fixes.mc155509",
    target: "server",
    newPath: ["vanilla-fixes", "mc155509"],
  },
  {
    oldPath: "fixes.mc132878",
    target: "server",
    newPath: ["vanilla-fixes", "mc132878"],
  },
  {
    oldPath: "fixes.mc121706",
    target: "server",
    newPath: ["vanilla-fixes", "mc121706"],
  },
  {
    oldPath: "fixes.mc119754",
    target: "server",
    newPath: ["vanilla-fixes", "mc119754"],
  },
  {
    oldPath: "fixes.mc100991",
    target: "server",
    newPath: ["vanilla-fixes", "mc100991"],
  },
  {
    oldPath: "fixes.mc30391",
    target: "server",
    newPath: ["vanilla-fixes", "mc30391"],
  },
  {
    oldPath: "fixes.mc183990",
    target: "server",
    newPath: ["vanilla-fixes", "mc183990"],
  },
  {
    oldPath: "fixes.mc136249",
    target: "server",
    newPath: ["vanilla-fixes", "mc136249"],
  },
  { oldPath: "fixes.mc258859", target: "removed" },
  {
    oldPath: "fixes.pearlDuplication",
    target: "server",
    newPath: ["vanilla-fixes", "pearl-duplication"],
  },
  {
    oldPath: "fastOrbs",
    target: "world",
    newPath: ["entities", "fast-orbs"],
  },
  {
    oldPath: "enableTpsBar",
    target: "world",
    newPath: ["enable-tps-bar"],
  },
  {
    oldPath: "tpsBarFormat",
    target: "world",
    newPath: ["tps-bar-format"],
  },
  {
    oldPath: "defaultRespawnDimensionKey",
    target: "server",
    newPath: ["default-respawn-dimension-key"],
  },
  {
    oldPath: "containers.barrelRows",
    target: "server",
    newPath: ["purpur-containers", "barrel-rows"],
  },
  {
    oldPath: "containers.enderChestSixRows",
    target: "server",
    newPath: ["purpur-containers", "ender-chest-six-rows"],
  },
  {
    oldPath: "containers.enderChestPermissionRows",
    target: "server",
    newPath: ["purpur-containers", "ender-chest-permission-rows"],
  },
  {
    oldPath: "disableLeafDecay",
    target: "world",
    newPath: ["farming", "disable-leaf-decay"],
  },
  {
    oldPath: "itemEntitiesImmuneToExplosions",
    target: "world",
    newPath: ["entities", "item-entities-immune-to-explosions"],
  },
  {
    oldPath: "itemEntitiesImmuneToLightning",
    target: "world",
    newPath: ["entities", "item-entities-immune-to-lightning"],
  },
  {
    oldPath: "itemEntitySpreadFactor",
    target: "world",
    newPath: ["entities", "item-entity-velocity-on-death-factor"],
  },
  {
    oldPath: "projectiles.maxProjectileLoadsPerTick",
    target: "world",
    newPath: ["entities", "projectiles", "max-projectile-chunk-loads-per-tick"],
  },
  {
    oldPath: "projectiles.maxProjectileLoadsPerProjectile",
    target: "world",
    newPath: [
      "entities",
      "projectiles",
      "max-projectile-chunk-loads-per-projectile-before-removal",
    ],
  },
  {
    oldPath: "projectiles.loadChunks",
    target: "world",
    newPath: ["entities", "projectiles", "load-chunks"],
  },
  {
    oldPath: "projectiles.crossRegionRedirectableProjectileDeflection",
    target: "world",
    newPath: [
      "entities",
      "projectiles",
      "cross-region-redirectable-projectile-deflection",
    ],
  },
  {
    oldPath: "enableSuffocationOptimization",
    target: "world",
    newPath: ["enable-suffocation-optimization"],
  },
  {
    oldPath: "skeletonAimInaccuracy",
    target: "world",
    newPath: ["entities", "skeleton-aim-accuracy"],
  },
  {
    oldPath: "combat.disableAttackHitDelay",
    target: "world",
    newPath: ["combat", "restore-old-attack-delay-mechanics"],
  },
  {
    oldPath: "combat.imitateSwordBlocking",
    target: "world",
    newPath: ["combat", "imitate-sword-blocking"],
  },
  {
    oldPath: "combat.mace.ignoreFallDistance",
    target: "world",
    newPath: ["combat", "mace", "ignore-fall-distance"],
  },
  {
    oldPath: "combat.mace.fallDistanceLimit",
    target: "world",
    newPath: ["combat", "mace", "fall-distance-limit"],
  },
  {
    oldPath: "combat.enableOldEnchantedGoldenAppleCrafting",
    target: "removed",
  },
  {
    oldPath: "combat.disableSweepingEdge",
    target: "world",
    newPath: ["combat", "disable-sweeping-edge"],
  },
  {
    oldPath: "combat.ignoreNetheriteKnockbackResistance",
    target: "world",
    newPath: ["combat", "disable-netherite-knockback-resistance"],
  },
  {
    oldPath: "combat.disableCritsWhileSprinting",
    target: "world",
    newPath: ["combat", "disable-crits-while-sprinting"],
  },
  { oldPath: "combat.invulnerabilityTicks", target: "removed" },
  {
    oldPath: "combat.fishingRodPulls",
    target: "world",
    newPath: ["combat", "allow-fishing-rods-to-pull-entities"],
  },
  {
    oldPath: "combat.criticalHitMultiplier",
    target: "world",
    newPath: ["combat", "critical-hit-multiplier"],
  },
  {
    oldPath: "combat.removeRedDeathAnimation",
    target: "world",
    newPath: ["combat", "remove-red-death-animation"],
  },
  {
    oldPath: "combat.useOldBlastProtection",
    target: "world",
    newPath: ["combat", "use-legacy-blast-protection"],
  },
  { oldPath: "spawner.minSpawnDelay", target: "removed" },
  { oldPath: "spawner.maxSpawnDelay", target: "removed" },
  { oldPath: "spawner.spawnCount", target: "removed" },
  { oldPath: "spawner.maxNearbyEntities", target: "removed" },
  { oldPath: "spawner.requiredPlayerRange", target: "removed" },
  { oldPath: "spawner.spawnRange", target: "removed" },
  {
    oldPath: "spawner.disableMaxNearbyEntitiesCheck",
    target: "world",
    newPath: ["spawner", "disable-max-nearby-entities-check"],
  },
  {
    oldPath: "spawner.noCollisions",
    target: "world",
    newPath: ["spawner", "spawned-entities-have-no-collision"],
  },
  {
    oldPath: "disableCriterionTrigger",
    target: "world",
    newPath: ["disable-criterion-trigger"],
  },
  {
    oldPath: "cropsIgnoreLightCheck",
    target: "world",
    newPath: ["farming", "crops-ignore-light-check"],
  },
  {
    oldPath: "disableSnowLightChecks",
    target: "world",
    newPath: ["disable-snow-light-checks"],
  },
  {
    oldPath: "disableGrassLightChecks",
    target: "world",
    newPath: ["disable-grass-light-checks"],
  },
  {
    oldPath: "particles.disableSprintParticles",
    target: "world",
    newPath: ["visuals", "particles", "disable-sprint-particles"],
  },
  {
    oldPath: "particles.disableFallParticles",
    target: "world",
    newPath: ["visuals", "particles", "disable-fall-particles"],
  },
  {
    oldPath: "particles.disableDeathParticles",
    target: "world",
    newPath: ["visuals", "particles", "disable-death-particles"],
  },
  {
    oldPath: "particles.disableEffectParticles",
    target: "world",
    newPath: ["visuals", "particles", "disable-effect-particles"],
  },
  {
    oldPath: "particles.disableWaterSplashParticles",
    target: "world",
    newPath: ["visuals", "particles", "disable-water-splash-particles"],
  },
  {
    oldPath: "particles.disableBubbleColumnParticles",
    target: "world",
    newPath: ["visuals", "particles", "disable-bubble-column-particles"],
  },
  {
    oldPath: "particles.disableNewCombatParticles",
    target: "world",
    newPath: ["visuals", "particles", "disable-new-combat-particles"],
  },
  {
    oldPath: "blacklistNonPlayerEntitiesFromEnteringNetherPortals",
    target: "server",
    newPath: ["blacklist-non-player-entities-from-entering-nether-portals"],
  },
  {
    oldPath: "blacklistNonPlayerEntitiesFromEnteringEndPortals",
    target: "server",
    newPath: ["blacklist-non-player-entities-from-entering-end-portals"],
  },
  {
    oldPath: "blacklistNonPlayerEntitiesFromEnteringGatewayPortals",
    target: "server",
    newPath: ["blacklist-non-player-entities-from-entering-gateway-portals"],
  },
  {
    oldPath: "waypointUpdateScale",
    target: "world",
    newPath: ["waypoint-update-scale"],
  },
  {
    oldPath: "serverModName",
    target: "server",
    newPath: ["server-mod-name"],
  },
  {
    oldPath: "restoreVanillaEnderPearlBehavior",
    target: "server",
    newPath: ["restore-vanilla-ender-pearl-behavior"],
  },
  {
    oldPath: "displayWorldLoadScreenForPortaling",
    target: "server",
    newPath: ["display-world-load-screen-for-portaling"],
  },
] as const;

type ParsedYamlDocument = ReturnType<typeof parseDocument>;

export interface MigrationArchive {
  archive: Uint8Array;
  migratedCount: number;
  removedOptions: string[];
}

function getValueAtPath(source: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((value, key) => {
    if (!value || typeof value !== "object" || Array.isArray(value)) {
      return undefined;
    }

    return Reflect.get(value, key);
  }, source);
}

function cloneValue<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function updateDocumentValue(
  document: ParsedYamlDocument,
  path: readonly string[],
  value: unknown
) {
  const existingNode = document.getIn([...path], true);

  if (!existingNode) {
    throw new Error(`Template path not found: ${path.join(".")}`);
  }

  if (isScalar(existingNode)) {
    existingNode.value = cloneValue(value) as never;
    return;
  }

  if (isSeq(existingNode)) {
    if (!Array.isArray(value)) {
      throw new Error(`Expected an array for ${path.join(".")}`);
    }

    existingNode.items = value.map((item) =>
      document.createNode(cloneValue(item))
    );
    return;
  }

  document.setIn([...path], cloneValue(value));
}

function assertConfigShape(
  value: unknown
): asserts value is Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error("The uploaded config must be a JSON5 object.");
  }
}

export async function createMigrationArchive(
  oldConfigText: string
): Promise<MigrationArchive> {
  const parsedConfig = JSON5.parse(oldConfigText);
  assertConfigShape(parsedConfig);

  const serverDocument = parseDocument(serverTemplate, { prettyErrors: true });
  const worldsDocument = parseDocument(worldsTemplate, { prettyErrors: true });
  const removedOptions: string[] = [];

  let migratedCount = 0;

  for (const mapping of OPTION_MAPPINGS) {
    const value = getValueAtPath(parsedConfig, mapping.oldPath);

    if (value === undefined) {
      continue;
    }

    if (mapping.target === "removed" || !mapping.newPath) {
      removedOptions.push(mapping.oldPath);
      continue;
    }

    const document =
      mapping.target === "server" ? serverDocument : worldsDocument;
    updateDocumentValue(document, mapping.newPath, value);
    migratedCount += 1;
  }

  const zip = new JSZip();
  zip.file("canvas-server.yml", serverDocument.toString({ lineWidth: 0 }));
  zip.file("canvas-worlds.yml", worldsDocument.toString({ lineWidth: 0 }));

  const archive = await zip.generateAsync({
    type: "uint8array",
    compression: "DEFLATE",
    compressionOptions: { level: 9 },
  });

  return {
    archive,
    migratedCount,
    removedOptions,
  };
}
