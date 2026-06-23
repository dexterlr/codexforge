export type GameServerBuilderRouteSlug =
  | "codexforge-cockpit"
  | "game-server-builder-domain-boundary"
  | "game-server-goal-intake-preview"
  | "server-type-classifier-preview"
  | "theme-lore-pack-preview"
  | "minecraft-server-profile-preview"
  | "plugin-mod-intent-preview"
  | "world-rules-config-preview"
  | "roles-permissions-economy-preview"
  | "quest-region-faction-preview"
  | "server-file-plan-preview"
  | "server-command-plan-preview"
  | "server-validation-evidence-preview"
  | "server-recovery-audit-preview"
  | "cockpit-game-server-builder-summary"
  | "first-game-server-builder-candidate"
  | "controlled-game-server-builder-release-candidate";

export type GameServerBuilderKind =
  | "game-server-builder-preview"
  | "game-server-builder-domain-boundary"
  | "game-server-builder-intake"
  | "game-server-builder-classifier"
  | "game-server-builder-plan"
  | "first-game-server-builder-candidate"
  | "controlled-game-server-builder-release-candidate";

export type GameServerBuilderState =
  | "preview-only"
  | "review-only"
  | "backend-owned"
  | "needs-approval"
  | "blocked"
  | "denied"
  | "manual-review"
  | "candidate"
  | "release-candidate";

export type GameServerBuilderItem = {
  id: string;
  label: string;
  detail: string;
  state: GameServerBuilderState;
};

export type GameServerBuilderSection = {
  sectionId: string;
  label: string;
  title: string;
  humanReadableSummary: string;
  plannedArtifacts: readonly string[];
  likelyFileFamilies: readonly string[];
  likelyCommandFamilies: readonly string[];
  approvalNeeds: readonly string[];
  evidenceNeeds: readonly string[];
  resultNeeds: readonly string[];
  auditNeeds: readonly string[];
  recoveryNeeds: readonly string[];
  deniedActions: readonly string[];
  safetyNotes: readonly string[];
  checklist: readonly GameServerBuilderItem[];
  state: GameServerBuilderState;
};

export type GameServerBuilderModel = {
  gameServerBuilderId: string;
  gameServerBuilderKind: GameServerBuilderKind;
  goalRef: GameServerBuilderSection;
  projectContextRef: GameServerBuilderSection;
  specialistWorkerRef: GameServerBuilderSection;
  modelRouterRef: GameServerBuilderSection;
  providerApprovalRef: GameServerBuilderSection;
  localModelBridgeRef: GameServerBuilderSection;
  gameServerGoalIntake: GameServerBuilderSection;
  serverTypeClassifier: GameServerBuilderSection;
  themeLorePack: GameServerBuilderSection;
  minecraftServerProfile: GameServerBuilderSection;
  pluginModIntent: GameServerBuilderSection;
  worldRulesConfig: GameServerBuilderSection;
  rolesPermissionsEconomy: GameServerBuilderSection;
  questRegionFaction: GameServerBuilderSection;
  serverFilePlan: GameServerBuilderSection;
  serverCommandPlan: GameServerBuilderSection;
  serverValidationEvidence: GameServerBuilderSection;
  serverRecoveryAudit: GameServerBuilderSection;
  deniedGameServerBoundaries: GameServerBuilderSection;
  cockpitSummary: readonly GameServerBuilderItem[];
  explicitSafetyLimits: readonly string[];
};

export type GameServerBuilderRouteDefinition = {
  slug: GameServerBuilderRouteSlug;
  href: string;
  phase: string;
  title: string;
  commandLabel: string;
  summary: string;
  markerPhrases: readonly string[];
  sectionIds: readonly string[];
  devOnly: boolean;
};

export type GameServerBuilderRouteModel = {
  route: GameServerBuilderRouteDefinition;
  gameServerBuilder: GameServerBuilderModel;
  sections: readonly GameServerBuilderSection[];
  diagnosticRoutes: readonly GameServerBuilderRouteDefinition[];
  cockpitMarkers: readonly string[];
  summary: string;
};

export const GAME_SERVER_BUILDER_COCKPIT_MARKERS = [
  "Game Server Builder",
  "Server Goal",
  "Server Type",
  "Theme",
  "Minecraft Profile",
  "Plugins",
  "Mods",
  "World Rules",
  "Roles",
  "Permissions",
  "Economy",
  "Quests",
  "Regions",
  "Factions",
  "Files",
  "Commands",
  "Validation",
  "Evidence",
  "Recovery",
  "Audit",
  "No server starts from the cockpit",
  "No plugin installs from the cockpit",
  "No mod installs from the cockpit",
  "No port binding from the cockpit",
  "No command execution from the cockpit",
  "Backend-owned game server workflow remains required",
  "Explicit operator approval remains required",
] as const;

const EXPLICIT_SAFETY_LIMITS = [
  "Game Server Builder is preview-only from the frontend.",
  "It does not start game servers from the UI.",
  "It does not install mods or plugins from the UI.",
  "It does not download server jars from the UI.",
  "It does not bind ports from the UI.",
  "It does not run Java, Docker, SteamCMD, or server commands from the UI.",
  "It does not write generated server files from the UI.",
  "It does not call models, providers, connectors, or local models from the UI.",
  "It prepares a future backend-owned game server domain workflow.",
  "Explicit operator approval remains required.",
] as const;

function checklist(
  prefix: string,
  summary: string,
  blocked: string,
  approval: string
): readonly GameServerBuilderItem[] {
  return [
    {
      id: `${prefix}-summary`,
      label: "Review summary",
      detail: summary,
      state: "review-only",
    },
    {
      id: `${prefix}-blocked`,
      label: "Denied action",
      detail: blocked,
      state: "blocked",
    },
    {
      id: `${prefix}-approval`,
      label: "Approval requirement",
      detail: approval,
      state: "needs-approval",
    },
  ];
}

function createSection(section: GameServerBuilderSection): GameServerBuilderSection {
  return section;
}

const COMMON_APPROVAL_NEEDS = [
  "Explicit operator approval before any backend-owned game server workflow can execute.",
  "Provider Approval Gate, Local Model Bridge, Model Router v2, and Specialist Worker Registry remain references only from the frontend.",
  "Operator review must confirm scope, risks, denied paths, evidence needs, result needs, audit needs, and recovery needs.",
] as const;

const COMMON_EVIDENCE_NEEDS = [
  "Reviewed goal, server type, theme, configuration plan, plugin/mod intent, and denied action report.",
  "Future backend-owned checks must capture validation evidence without frontend persistence.",
] as const;

const COMMON_RESULT_NEEDS = [
  "Static work proposal summary, expected artifacts, validation expectations, denied paths, and operator handoff.",
  "No frontend-generated server files, no frontend command output, and no frontend runtime result.",
] as const;

const COMMON_AUDIT_NEEDS = [
  "Goal, project context, specialist worker fit, model route reference, provider approval reference, evidence, result, recovery, and operator timeline.",
  "Audit remains future backend-owned and must not be persisted by the UI.",
] as const;

const COMMON_RECOVERY_NEEDS = [
  "Rollback plan, restore snapshot plan, failed-start explanation, manual review path, retry boundary, and safety stop.",
  "Recovery remains future backend-owned and must not execute from the UI.",
] as const;

const GOAL_REF = createSection({
  sectionId: "goalRef",
  label: "Goal Ref",
  title: "goalRef",
  humanReadableSummary:
    "Goal reference keeps the user dream visible: build a Minecraft Game of Thrones themed server as a safe review-only work proposal before any backend-owned game server workflow exists.",
  plannedArtifacts: ["Goal summary", "Done criteria", "Server audience note", "Denied action note"],
  likelyFileFamilies: ["docs/server-goal.md", "docs/done-criteria.md"],
  likelyCommandFamilies: ["No command from the UI", "Future backend-owned goal validation only"],
  approvalNeeds: COMMON_APPROVAL_NEEDS,
  evidenceNeeds: COMMON_EVIDENCE_NEEDS,
  resultNeeds: COMMON_RESULT_NEEDS,
  auditNeeds: COMMON_AUDIT_NEEDS,
  recoveryNeeds: COMMON_RECOVERY_NEEDS,
  deniedActions: ["Send prompts from the UI", "Dispatch a worker from the UI", "Persist goal queues from the UI"],
  safetyNotes: ["Goal reference is deterministic review content only.", "backend-owned game server workflow remains required."],
  checklist: checklist(
    "goal-ref",
    "The goal stays human-readable and review-only before any worker, model, provider, connector, or local model route can run.",
    "No prompt sending, hidden worker routing, queue creation, or transaction creation from the UI.",
    "Explicit operator approval remains required."
  ),
  state: "review-only",
});

const PROJECT_CONTEXT_REF = createSection({
  sectionId: "projectContextRef",
  label: "Project Context Ref",
  title: "projectContextRef",
  humanReadableSummary:
    "Project context reference previews where future backend-owned server planning would attach project scope, workspace rules, safety posture, and evidence boundaries.",
  plannedArtifacts: ["Project context packet", "Workspace boundary note", "Server plan scope note"],
  likelyFileFamilies: ["docs/project-context.md", "docs/safety-boundary.md"],
  likelyCommandFamilies: ["No local scans from the UI", "Future backend-owned context checks only"],
  approvalNeeds: COMMON_APPROVAL_NEEDS,
  evidenceNeeds: COMMON_EVIDENCE_NEEDS,
  resultNeeds: COMMON_RESULT_NEEDS,
  auditNeeds: COMMON_AUDIT_NEEDS,
  recoveryNeeds: COMMON_RECOVERY_NEEDS,
  deniedActions: ["Read secrets from the UI", "Probe localhost from the UI", "Browse arbitrary files from the UI"],
  safetyNotes: ["No secret reads or API key reads from the UI.", "Project context capture remains backend-owned."],
  checklist: checklist(
    "project-context-ref",
    "Context stays scoped to reviewed planning language and does not inspect live server state from the cockpit.",
    "No localhost probes, secret reads, API key reads, browser storage writes, or connector calls from the UI.",
    "Operator approval must confirm any future backend context capture."
  ),
  state: "backend-owned",
});

const SPECIALIST_WORKER_REF = createSection({
  sectionId: "specialistWorkerRef",
  label: "Specialist Worker Ref",
  title: "specialistWorkerRef",
  humanReadableSummary:
    "Specialist worker reference links the domain pack to the Game Server Worker profile while keeping worker dispatch blocked from the frontend.",
  plannedArtifacts: ["Worker fit note", "Capability fit summary", "Denied worker route note"],
  likelyFileFamilies: ["docs/worker-fit.md", "docs/denied-worker-routes.md"],
  likelyCommandFamilies: ["No worker command from the UI", "Future backend-owned worker dispatch only"],
  approvalNeeds: COMMON_APPROVAL_NEEDS,
  evidenceNeeds: COMMON_EVIDENCE_NEEDS,
  resultNeeds: COMMON_RESULT_NEEDS,
  auditNeeds: COMMON_AUDIT_NEEDS,
  recoveryNeeds: COMMON_RECOVERY_NEEDS,
  deniedActions: ["Dispatch workers from the UI", "Hide worker routing", "Persist worker decisions from the UI"],
  safetyNotes: ["Specialist worker dispatch remains blocked.", "Worker routing remains explicit and operator-reviewed."],
  checklist: checklist(
    "specialist-worker-ref",
    "Game Server Worker fit is visible, but no worker is dispatched from the cockpit.",
    "No hidden worker routing, worker dispatch, or worker decision persistence from the UI.",
    "Explicit operator approval remains required before any backend-owned worker execution."
  ),
  state: "backend-owned",
});

const MODEL_ROUTER_REF = createSection({
  sectionId: "modelRouterRef",
  label: "Model Router Ref",
  title: "modelRouterRef",
  humanReadableSummary:
    "Model Router v2 stays a reference for future capability fit; the Game Server Builder UI does not call models, rank models, or send prompts.",
  plannedArtifacts: ["Model fit note", "No-call boundary", "Future route review packet"],
  likelyFileFamilies: ["docs/model-route.md", "docs/no-model-call.md"],
  likelyCommandFamilies: ["No model calls from the UI", "Future backend-owned model route review only"],
  approvalNeeds: COMMON_APPROVAL_NEEDS,
  evidenceNeeds: COMMON_EVIDENCE_NEEDS,
  resultNeeds: COMMON_RESULT_NEEDS,
  auditNeeds: COMMON_AUDIT_NEEDS,
  recoveryNeeds: COMMON_RECOVERY_NEEDS,
  deniedActions: ["Call models from the UI", "Send prompts from the UI", "Hide model routing"],
  safetyNotes: ["No live model calls or local model calls from the UI.", "Model route selection remains future backend-owned."],
  checklist: checklist(
    "model-router-ref",
    "Model fit is described as a future route reference only.",
    "No model calls, local model calls, provider calls, prompt sends, or hidden model routing from the UI.",
    "Model route use requires explicit operator approval and backend ownership."
  ),
  state: "backend-owned",
});

const PROVIDER_APPROVAL_REF = createSection({
  sectionId: "providerApprovalRef",
  label: "Provider Approval Ref",
  title: "providerApprovalRef",
  humanReadableSummary:
    "Provider Approval Gate stays required before any future model, connector, download, or external service could support game server planning.",
  plannedArtifacts: ["Provider approval note", "External dependency review", "Denied provider path note"],
  likelyFileFamilies: ["docs/provider-approval.md", "docs/external-dependency-review.md"],
  likelyCommandFamilies: ["No provider calls from the UI", "No downloads from the UI"],
  approvalNeeds: COMMON_APPROVAL_NEEDS,
  evidenceNeeds: COMMON_EVIDENCE_NEEDS,
  resultNeeds: COMMON_RESULT_NEEDS,
  auditNeeds: COMMON_AUDIT_NEEDS,
  recoveryNeeds: COMMON_RECOVERY_NEEDS,
  deniedActions: ["Call providers from the UI", "Download server jars from the UI", "Install plugins or mods from the UI"],
  safetyNotes: ["Provider approval is not persisted by the UI.", "Downloads and installs remain blocked from the frontend."],
  checklist: checklist(
    "provider-approval-ref",
    "External dependencies are represented as intent only.",
    "No provider calls, connector calls, downloads, plugin installs, mod installs, or approval persistence from the UI.",
    "Future provider use requires explicit operator approval."
  ),
  state: "needs-approval",
});

const LOCAL_MODEL_BRIDGE_REF = createSection({
  sectionId: "localModelBridgeRef",
  label: "Local Model Bridge Ref",
  title: "localModelBridgeRef",
  humanReadableSummary:
    "Local Model Bridge remains a future backend-owned route reference only; the Game Server Builder does not probe localhost, bind ports, or call local models.",
  plannedArtifacts: ["Local route note", "Local privacy boundary", "Denied localhost path note"],
  likelyFileFamilies: ["docs/local-model-route.md", "docs/local-privacy-boundary.md"],
  likelyCommandFamilies: ["No localhost probes from the UI", "No local model calls from the UI"],
  approvalNeeds: COMMON_APPROVAL_NEEDS,
  evidenceNeeds: COMMON_EVIDENCE_NEEDS,
  resultNeeds: COMMON_RESULT_NEEDS,
  auditNeeds: COMMON_AUDIT_NEEDS,
  recoveryNeeds: COMMON_RECOVERY_NEEDS,
  deniedActions: ["Probe localhost from the UI", "Call local models from the UI", "Start local runtimes from the UI"],
  safetyNotes: ["Local model and local runtime work remains backend-owned.", "No port binding or process spawning from the UI."],
  checklist: checklist(
    "local-model-bridge-ref",
    "Local/private model use is a future approval-gated reference only.",
    "No localhost probes, local model calls, runtime starts, Java starts, Docker starts, or port binding from the UI.",
    "Explicit operator approval remains required."
  ),
  state: "backend-owned",
});

const GAME_SERVER_GOAL_INTAKE = createSection({
  sectionId: "gameServerGoalIntake",
  label: "Server Goal",
  title: "gameServerGoalIntake",
  humanReadableSummary:
    "Captures a review-only goal for a private Minecraft Game of Thrones themed roleplay server with target players, server style, rules, and done criteria.",
  plannedArtifacts: ["Goal intake packet", "Target player profile", "Server style note", "Done criteria checklist"],
  likelyFileFamilies: ["docs/server-goal.md", "docs/player-profile.md", "docs/done-criteria.md"],
  likelyCommandFamilies: ["No server creation from the UI", "Future backend-owned goal lint only"],
  approvalNeeds: COMMON_APPROVAL_NEEDS,
  evidenceNeeds: ["Game type, theme, target players, server style, rules, done criteria, and denied action capture."],
  resultNeeds: COMMON_RESULT_NEEDS,
  auditNeeds: COMMON_AUDIT_NEEDS,
  recoveryNeeds: COMMON_RECOVERY_NEEDS,
  deniedActions: ["Create server files from the UI", "Start a server from the UI", "Persist intake queues from the UI"],
  safetyNotes: ["Goal intake preview does not create server files.", "It is deterministic review-only content."],
  checklist: checklist(
    "game-server-goal-intake",
    "Captures game type theme target players server style rules and done criteria for review.",
    "No server file creation, queue persistence, or command execution from the UI.",
    "Explicit operator approval remains required."
  ),
  state: "review-only",
});

const SERVER_TYPE_CLASSIFIER = createSection({
  sectionId: "serverTypeClassifier",
  label: "Server Type",
  title: "serverTypeClassifier",
  humanReadableSummary:
    "Classifies the sample as a Minecraft roleplay survival server candidate, with Paper or Fabric/Forge paths treated as review-only options.",
  plannedArtifacts: ["Server type classification", "Loader option note", "Public/private posture note"],
  likelyFileFamilies: ["docs/server-type.md", "docs/loader-options.md"],
  likelyCommandFamilies: ["No Paper, Spigot, Fabric, Forge, or Vanilla runtime from the UI", "Future backend-owned compatibility check only"],
  approvalNeeds: COMMON_APPROVAL_NEEDS,
  evidenceNeeds: ["Classification evidence for Minecraft, Paper, Spigot, Fabric, Forge, Vanilla, modded, roleplay, survival, minigame, private, and public intents."],
  resultNeeds: COMMON_RESULT_NEEDS,
  auditNeeds: COMMON_AUDIT_NEEDS,
  recoveryNeeds: COMMON_RECOVERY_NEEDS,
  deniedActions: ["Install or run servers from the UI", "Download loaders from the UI", "Bind server ports from the UI"],
  safetyNotes: ["Classifier preview does not install or run servers.", "Server type remains a future backend-owned decision."],
  checklist: checklist(
    "server-type-classifier",
    "Classifies Minecraft Paper Spigot Fabric Forge Vanilla modded roleplay survival minigame private and public server intents.",
    "No install, runtime start, download, or port binding from the UI.",
    "Explicit operator approval remains required."
  ),
  state: "review-only",
});

const THEME_LORE_PACK = createSection({
  sectionId: "themeLorePack",
  label: "Theme",
  title: "themeLorePack",
  humanReadableSummary:
    "Shapes a Westeros-inspired theme with kingdoms, houses, regions, ranks, roleplay rules, quests, events, trade, and lore as review-only planning text.",
  plannedArtifacts: ["Theme brief", "Lore boundaries", "House and kingdom list", "Roleplay style guide"],
  likelyFileFamilies: ["docs/theme-lore.md", "docs/roleplay-rules.md", "docs/event-lore.md"],
  likelyCommandFamilies: ["No asset generation from the UI", "No final asset writing from the UI"],
  approvalNeeds: COMMON_APPROVAL_NEEDS,
  evidenceNeeds: ["Theme rationale, lore boundaries, faction names, region map concept, quest hooks, event hooks, and denied asset actions."],
  resultNeeds: COMMON_RESULT_NEEDS,
  auditNeeds: COMMON_AUDIT_NEEDS,
  recoveryNeeds: COMMON_RECOVERY_NEEDS,
  deniedActions: ["Write final assets from the UI", "Generate final lore files from the UI", "Download assets from the UI"],
  safetyNotes: ["Theme lore pack is review-only content.", "Final assets and files remain future backend-owned artifacts."],
  checklist: checklist(
    "theme-lore-pack",
    "Shapes Westeros kingdoms houses regions ranks rules quests events economy and roleplay lore as review-only content.",
    "No final asset generation, downloads, or file writes from the UI.",
    "Explicit operator approval remains required."
  ),
  state: "review-only",
});

const MINECRAFT_SERVER_PROFILE = createSection({
  sectionId: "minecraftServerProfile",
  label: "Minecraft Profile",
  title: "minecraftServerProfile",
  humanReadableSummary:
    "Reviews Minecraft version, loader profile, plugin profile, mod profile, world profile, memory profile, and validation needs without downloading jars or starting Java.",
  plannedArtifacts: ["Minecraft profile", "Version/loader matrix", "Memory profile note", "Validation needs list"],
  likelyFileFamilies: ["docs/minecraft-profile.md", "docs/loader-profile.md", "docs/memory-profile.md"],
  likelyCommandFamilies: ["No Java command from the UI", "No server jar download from the UI", "No port binding from the UI"],
  approvalNeeds: COMMON_APPROVAL_NEEDS,
  evidenceNeeds: ["Server version, loader profile, plugin profile, mod profile, world profile, memory profile, and validation needs."],
  resultNeeds: COMMON_RESULT_NEEDS,
  auditNeeds: COMMON_AUDIT_NEEDS,
  recoveryNeeds: COMMON_RECOVERY_NEEDS,
  deniedActions: ["Download jars from the UI", "Install Java from the UI", "Start Minecraft from the UI", "Bind ports from the UI"],
  safetyNotes: ["Minecraft profile preview does not start Minecraft.", "Runtime work remains backend-owned and approval-gated."],
  checklist: checklist(
    "minecraft-server-profile",
    "Shows server version loader profile plugin profile mod profile world profile memory profile and validation needs.",
    "No jar downloads, Java starts, Minecraft starts, Docker starts, or port binding from the UI.",
    "Explicit operator approval remains required."
  ),
  state: "review-only",
});

const PLUGIN_MOD_INTENT = createSection({
  sectionId: "pluginModIntent",
  label: "Plugins And Mods",
  title: "pluginModIntent",
  humanReadableSummary:
    "Lists plugin and mod intent for region protection, permissions, economy, quests, factions, chat, moderation, maps, and roleplay without download, install, or enablement.",
  plannedArtifacts: ["Plugin intent list", "Mod intent list", "Compatibility note", "Denied install note"],
  likelyFileFamilies: ["docs/plugin-intent.md", "docs/mod-intent.md", "docs/compatibility.md"],
  likelyCommandFamilies: ["No plugin install from the UI", "No mod install from the UI", "Future backend-owned compatibility check only"],
  approvalNeeds: COMMON_APPROVAL_NEEDS,
  evidenceNeeds: ["Region protection, permissions, economy, quests, factions, chat, moderation, maps, roleplay intents, and denied install evidence."],
  resultNeeds: COMMON_RESULT_NEEDS,
  auditNeeds: COMMON_AUDIT_NEEDS,
  recoveryNeeds: COMMON_RECOVERY_NEEDS,
  deniedActions: ["Download plugins from the UI", "Download mods from the UI", "Install or enable plugins or mods from the UI"],
  safetyNotes: ["Plugins and mods are intent only.", "No external download or install is performed by the frontend."],
  checklist: checklist(
    "plugin-mod-intent",
    "Lists region protection permissions economy quests factions chat moderation maps and roleplay plugin or mod intents.",
    "No plugin or mod download, install, enablement, or config mutation from the UI.",
    "Explicit operator approval remains required."
  ),
  state: "review-only",
});

const WORLD_RULES_CONFIG = createSection({
  sectionId: "worldRulesConfig",
  label: "World Rules",
  title: "worldRulesConfig",
  humanReadableSummary:
    "Previews spawn, PvP, economy, grief protection, roleplay, faction, event, and moderation rules as planned future configs only.",
  plannedArtifacts: ["World rules plan", "Spawn/lobby concept", "PvP and grief policy", "Moderation rule matrix"],
  likelyFileFamilies: ["server.properties", "plugins/*/config.yml", "docs/world-rules.md", "docs/moderation.md"],
  likelyCommandFamilies: ["No config write from the UI", "Future backend-owned config lint only"],
  approvalNeeds: COMMON_APPROVAL_NEEDS,
  evidenceNeeds: ["Spawn rules, PvP rules, economy rules, grief protection, roleplay rules, faction rules, event rules, and moderation rules."],
  resultNeeds: COMMON_RESULT_NEEDS,
  auditNeeds: COMMON_AUDIT_NEEDS,
  recoveryNeeds: COMMON_RECOVERY_NEEDS,
  deniedActions: ["Write config files from the UI", "Mutate server properties from the UI", "Apply world rules from the UI"],
  safetyNotes: ["World rules config preview does not write config files.", "Configs remain plan-only until backend-owned execution."],
  checklist: checklist(
    "world-rules-config",
    "Shows spawn rules PvP rules economy rules grief protection roleplay rules faction rules event rules and moderation rules.",
    "No config file writes or server property mutation from the UI.",
    "Explicit operator approval remains required."
  ),
  state: "review-only",
});

const ROLES_PERMISSIONS_ECONOMY = createSection({
  sectionId: "rolesPermissionsEconomy",
  label: "Roles Permissions Economy",
  title: "rolesPermissionsEconomy",
  humanReadableSummary:
    "Reviews owner, admin, moderator, builder, noble, faction leader, member, guest, economy, trade, and reward structures without mutating permission or economy configs.",
  plannedArtifacts: ["Role matrix", "Permission matrix", "Economy and trade plan", "Reward structure"],
  likelyFileFamilies: ["plugins/permissions/config.yml", "plugins/economy/config.yml", "docs/roles.md", "docs/economy.md"],
  likelyCommandFamilies: ["No permission mutation from the UI", "No economy config mutation from the UI"],
  approvalNeeds: COMMON_APPROVAL_NEEDS,
  evidenceNeeds: ["Owner, admin, moderator, builder, noble, faction leader, member, guest, economy, trade, and reward structures."],
  resultNeeds: COMMON_RESULT_NEEDS,
  auditNeeds: COMMON_AUDIT_NEEDS,
  recoveryNeeds: COMMON_RECOVERY_NEEDS,
  deniedActions: ["Mutate permission files from the UI", "Mutate economy configs from the UI", "Grant ranks from the UI"],
  safetyNotes: ["Roles and permissions remain review-only.", "Economy setup remains a future backend-owned artifact."],
  checklist: checklist(
    "roles-permissions-economy",
    "Shows owner admin moderator builder noble faction leader member guest economy trade and reward structures.",
    "No permission file mutation, rank grants, or economy config writes from the UI.",
    "Explicit operator approval remains required."
  ),
  state: "review-only",
});

const QUEST_REGION_FACTION = createSection({
  sectionId: "questRegionFaction",
  label: "Quests Regions Factions",
  title: "questRegionFaction",
  humanReadableSummary:
    "Plans kingdoms, regions, houses, faction claims, quests, events, NPC storylines, and progression hooks as review-only content.",
  plannedArtifacts: ["Region plan", "Faction plan", "Quest and event hooks", "NPC storyline notes"],
  likelyFileFamilies: ["plugins/quests/*.yml", "plugins/regions/*.yml", "plugins/factions/*.yml", "docs/storylines.md"],
  likelyCommandFamilies: ["No quest config write from the UI", "No region or faction config write from the UI"],
  approvalNeeds: COMMON_APPROVAL_NEEDS,
  evidenceNeeds: ["Kingdoms, regions, houses, faction claims, quests, events, NPC storylines, progression hooks, and denied write paths."],
  resultNeeds: COMMON_RESULT_NEEDS,
  auditNeeds: COMMON_AUDIT_NEEDS,
  recoveryNeeds: COMMON_RECOVERY_NEEDS,
  deniedActions: ["Write quests from the UI", "Write regions from the UI", "Write faction configs from the UI"],
  safetyNotes: ["Quest, region, and faction plans are review-only.", "Actual config generation remains backend-owned."],
  checklist: checklist(
    "quest-region-faction",
    "Shows kingdoms regions houses faction claims quests events NPC storylines and progression hooks as review-only plans.",
    "No quest, region, or faction config writes from the UI.",
    "Explicit operator approval remains required."
  ),
  state: "review-only",
});

const SERVER_FILE_PLAN = createSection({
  sectionId: "serverFilePlan",
  label: "Files",
  title: "serverFilePlan",
  humanReadableSummary:
    "Previews planned server.properties, plugin configs, mod configs, permissions configs, world rules, docs, scripts, evidence, and rollback files without writing them.",
  plannedArtifacts: ["Server file manifest", "Config family map", "Evidence file plan", "Rollback file plan"],
  likelyFileFamilies: ["server.properties", "plugins/**/*.yml", "mods/*.toml", "docs/*.md", "rollback/*.json"],
  likelyCommandFamilies: ["No file writes from the UI", "Future backend-owned file plan validation only"],
  approvalNeeds: COMMON_APPROVAL_NEEDS,
  evidenceNeeds: ["Planned server.properties, plugin configs, mod configs, permissions configs, world rules docs, scripts, evidence, and rollback files."],
  resultNeeds: COMMON_RESULT_NEEDS,
  auditNeeds: COMMON_AUDIT_NEEDS,
  recoveryNeeds: COMMON_RECOVERY_NEEDS,
  deniedActions: ["Write server files from the UI", "Apply diffs from the UI", "Create snapshots from the UI"],
  safetyNotes: ["Server file plan preview does not write server files.", "File mutation remains backend-owned and approval-gated."],
  checklist: checklist(
    "server-file-plan",
    "Shows planned server.properties plugin configs mod configs permissions configs world rules docs scripts evidence and rollback files.",
    "No server file writes, diff application, or snapshot creation from the UI.",
    "Explicit operator approval remains required."
  ),
  state: "review-only",
});

const SERVER_COMMAND_PLAN = createSection({
  sectionId: "serverCommandPlan",
  label: "Commands",
  title: "serverCommandPlan",
  humanReadableSummary:
    "Lists future backend-owned validation, build, smoke, config lint, server dry-run, and safety command candidates without executing them.",
  plannedArtifacts: ["Command candidate plan", "Command risk note", "Command evidence expectation", "Denied command report"],
  likelyFileFamilies: ["docs/command-plan.md", "docs/validation-plan.md"],
  likelyCommandFamilies: ["config lint candidate", "plugin compatibility candidate", "mod compatibility candidate", "server dry-run candidate"],
  approvalNeeds: COMMON_APPROVAL_NEEDS,
  evidenceNeeds: ["Future command candidate, approval reference, expected evidence, expected result, risk, and denied command path."],
  resultNeeds: COMMON_RESULT_NEEDS,
  auditNeeds: COMMON_AUDIT_NEEDS,
  recoveryNeeds: COMMON_RECOVERY_NEEDS,
  deniedActions: ["Run commands from the UI", "Start Java from the UI", "Start Docker from the UI", "Start SteamCMD from the UI"],
  safetyNotes: ["Server command plan preview does not run commands.", "Command execution remains backend-owned and approval-gated."],
  checklist: checklist(
    "server-command-plan",
    "Shows future backend-owned validation build smoke config lint server dry-run and safety command candidates.",
    "No command execution, Java starts, Docker starts, SteamCMD starts, process spawning, or port binding from the UI.",
    "Explicit operator approval remains required."
  ),
  state: "review-only",
});

const SERVER_VALIDATION_EVIDENCE = createSection({
  sectionId: "serverValidationEvidence",
  label: "Validation Evidence",
  title: "serverValidationEvidence",
  humanReadableSummary:
    "Previews config checks, plugin checks, mod checks, port checks, startup checks, log checks, result states, and audit references as future backend-owned evidence.",
  plannedArtifacts: ["Validation evidence plan", "Result state plan", "Audit reference map", "Denied validation note"],
  likelyFileFamilies: ["evidence/config-checks.json", "evidence/plugin-checks.json", "evidence/startup-checks.json", "audit/*.json"],
  likelyCommandFamilies: ["No validation run from the UI", "Future backend-owned evidence capture only"],
  approvalNeeds: ["Backend-owned evidence capture remains required.", "Explicit operator approval remains required before validation can execute."],
  evidenceNeeds: ["Config checks, plugin checks, mod checks, port checks, startup checks, log checks, result states, and audit references."],
  resultNeeds: COMMON_RESULT_NEEDS,
  auditNeeds: COMMON_AUDIT_NEEDS,
  recoveryNeeds: COMMON_RECOVERY_NEEDS,
  deniedActions: ["Run validation from the UI", "Persist evidence from the UI", "Persist results from the UI", "Probe ports from the UI"],
  safetyNotes: ["Validation evidence preview does not run validation.", "Evidence capture remains future backend-owned."],
  checklist: checklist(
    "server-validation-evidence",
    "Shows config checks plugin checks mod checks port checks startup checks log checks result states and audit references.",
    "No validation run, evidence persistence, result persistence, audit persistence, or port checks from the UI.",
    "Backend-owned evidence capture remains required."
  ),
  state: "backend-owned",
});

const SERVER_RECOVERY_AUDIT = createSection({
  sectionId: "serverRecoveryAudit",
  label: "Recovery Audit",
  title: "serverRecoveryAudit",
  humanReadableSummary:
    "Reviews rollback configs, restore snapshots, stop server, retry validation, explain failure, manual review, safety stop, and audit continuity without executing recovery.",
  plannedArtifacts: ["Rollback plan", "Restore snapshot plan", "Failure explanation plan", "Audit continuity note"],
  likelyFileFamilies: ["rollback/*.json", "snapshots/*.json", "audit/recovery.json", "docs/recovery.md"],
  likelyCommandFamilies: ["No rollback from the UI", "No retry from the UI", "No restore from the UI"],
  approvalNeeds: COMMON_APPROVAL_NEEDS,
  evidenceNeeds: ["Recovery trigger, rollback scope, restore snapshot reference, retry scope, failure explanation, safety stop, and audit continuity."],
  resultNeeds: COMMON_RESULT_NEEDS,
  auditNeeds: COMMON_AUDIT_NEEDS,
  recoveryNeeds: ["Rollback configs", "Restore snapshots", "Stop server plan", "Retry validation plan", "Explain failure", "Manual review", "Safety stop", "Audit continuity"],
  deniedActions: ["Execute rollback from the UI", "Execute retry from the UI", "Execute restore from the UI", "Stop servers from the UI"],
  safetyNotes: ["Server recovery audit preview does not execute rollback retry restore or recovery.", "Recovery remains operator-approved and backend-owned."],
  checklist: checklist(
    "server-recovery-audit",
    "Shows rollback configs restore snapshots stop server retry validation explain failure manual review safety stop and audit continuity.",
    "No rollback, retry, restore, stop server, or recovery execution from the UI.",
    "Explicit operator approval remains required."
  ),
  state: "backend-owned",
});

const DENIED_GAME_SERVER_BOUNDARIES = createSection({
  sectionId: "deniedGameServerBoundaries",
  label: "Denied Boundaries",
  title: "deniedGameServerBoundaries",
  humanReadableSummary:
    "Keeps denied game server actions explicit: no server starts, installs, downloads, commands, model calls, provider calls, connector calls, file writes, persistence, rollback, deployment, ports, or background processes from the frontend.",
  plannedArtifacts: ["Denied path matrix", "Safety limit list", "Operator approval reminder"],
  likelyFileFamilies: ["docs/denied-game-server-paths.md", "docs/safety-limits.md"],
  likelyCommandFamilies: ["No runtime command from the UI", "No server command from the UI", "No network or port command from the UI"],
  approvalNeeds: COMMON_APPROVAL_NEEDS,
  evidenceNeeds: ["Denied game server action list, approval boundary, backend ownership boundary, and cockpit-first copy."],
  resultNeeds: COMMON_RESULT_NEEDS,
  auditNeeds: COMMON_AUDIT_NEEDS,
  recoveryNeeds: COMMON_RECOVERY_NEEDS,
  deniedActions: [
    "Start game servers from the UI",
    "Run Java, Docker, SteamCMD, or server commands from the UI",
    "Install mods or plugins from the UI",
    "Download server jars from the UI",
    "Bind ports from the UI",
    "Write generated server files from the UI",
    "Persist queues, transactions, approvals, evidence, results, audit, or memory from the UI",
  ],
  safetyNotes: [
    "Denied game server builder paths remain blocked.",
    "The cockpit is the normal user surface.",
    "Phase pages remain dev test diagnostics only.",
  ],
  checklist: checklist(
    "denied-game-server-boundaries",
    "Denied game server paths stay visible for operator review.",
    "No execution, install, download, network, persistence, file mutation, or recovery action from the UI.",
    "Explicit operator approval and backend-owned workflow remain required."
  ),
  state: "denied",
});

const COCKPIT_SUMMARY: readonly GameServerBuilderItem[] = [
  {
    id: "server-goal",
    label: "Server Goal",
    detail:
      "Shape a private Minecraft Game of Thrones themed roleplay server goal with target players, server style, rules, and done criteria.",
    state: "review-only",
  },
  {
    id: "server-type",
    label: "Server Type",
    detail: "Infer Minecraft roleplay survival server intent and keep Paper, Spigot, Fabric, Forge, Vanilla, modded, private, and public options review-only.",
    state: "review-only",
  },
  {
    id: "theme",
    label: "Theme",
    detail: "Plan a Westeros-inspired theme with kingdoms, houses, regions, ranks, lore, roleplay rules, quests, events, economy, and trade.",
    state: "review-only",
  },
  {
    id: "minecraft-profile",
    label: "Minecraft Profile",
    detail: "Explain version, loader, plugin, mod, world, memory, and validation profile choices without downloading jars or starting servers.",
    state: "review-only",
  },
  {
    id: "plugins",
    label: "Plugins",
    detail: "List region protection, permissions, economy, quest, faction, chat, moderation, map, and roleplay plugin intent only.",
    state: "review-only",
  },
  {
    id: "mods",
    label: "Mods",
    detail: "List mod intent and compatibility questions without downloading, installing, enabling, or writing mod configs from the cockpit.",
    state: "review-only",
  },
  {
    id: "world-rules",
    label: "World Rules",
    detail: "Preview spawn/lobby, PvP, grief protection, roleplay, faction, event, economy, and moderation rule plans.",
    state: "review-only",
  },
  {
    id: "roles",
    label: "Roles",
    detail: "Plan owner, admin, moderator, builder, noble, faction leader, member, and guest roles without granting ranks from the UI.",
    state: "review-only",
  },
  {
    id: "permissions",
    label: "Permissions",
    detail: "Preview permission matrix needs without mutating permission files or persisting worker decisions from the UI.",
    state: "review-only",
  },
  {
    id: "economy",
    label: "Economy",
    detail: "Plan trade, rewards, shops, and kingdom economy rules without writing economy configs from the cockpit.",
    state: "review-only",
  },
  {
    id: "quests",
    label: "Quests",
    detail: "Shape quest and event hooks for houses, kingdoms, NPC storylines, and progression as review-only plans.",
    state: "review-only",
  },
  {
    id: "regions",
    label: "Regions",
    detail: "Plan kingdoms, regions, spawn/lobby, safe zones, war zones, and protected areas without writing region configs.",
    state: "review-only",
  },
  {
    id: "factions",
    label: "Factions",
    detail: "Plan houses, faction claims, leader roles, alliances, rivalries, and claim rules without creating faction files.",
    state: "review-only",
  },
  {
    id: "files",
    label: "Files",
    detail: "Preview future server.properties, plugin configs, mod configs, permissions configs, docs, scripts, evidence, and rollback files.",
    state: "review-only",
  },
  {
    id: "commands",
    label: "Commands",
    detail: "Preview future backend-owned validation, build, smoke, config lint, server dry-run, and safety command candidates.",
    state: "review-only",
  },
  {
    id: "validation",
    label: "Validation",
    detail: "Require future backend-owned config, plugin, mod, port, startup, and log checks; no validation runs from the cockpit.",
    state: "backend-owned",
  },
  {
    id: "evidence",
    label: "Evidence",
    detail: "Require future backend-owned evidence capture for checks, result states, denied paths, and audit references.",
    state: "backend-owned",
  },
  {
    id: "recovery",
    label: "Recovery",
    detail: "Plan rollback configs, restore snapshots, stop server, retry validation, explain failure, manual review, and safety stop.",
    state: "backend-owned",
  },
  {
    id: "audit",
    label: "Audit",
    detail: "Keep goal, context, worker, route, approval, evidence, result, recovery, and operator timeline audit needs visible.",
    state: "backend-owned",
  },
];

const GAME_SERVER_BUILDER_MODEL: GameServerBuilderModel = {
  gameServerBuilderId: "game-server-builder-domain-pack-1594-1609",
  gameServerBuilderKind: "controlled-game-server-builder-release-candidate",
  goalRef: GOAL_REF,
  projectContextRef: PROJECT_CONTEXT_REF,
  specialistWorkerRef: SPECIALIST_WORKER_REF,
  modelRouterRef: MODEL_ROUTER_REF,
  providerApprovalRef: PROVIDER_APPROVAL_REF,
  localModelBridgeRef: LOCAL_MODEL_BRIDGE_REF,
  gameServerGoalIntake: GAME_SERVER_GOAL_INTAKE,
  serverTypeClassifier: SERVER_TYPE_CLASSIFIER,
  themeLorePack: THEME_LORE_PACK,
  minecraftServerProfile: MINECRAFT_SERVER_PROFILE,
  pluginModIntent: PLUGIN_MOD_INTENT,
  worldRulesConfig: WORLD_RULES_CONFIG,
  rolesPermissionsEconomy: ROLES_PERMISSIONS_ECONOMY,
  questRegionFaction: QUEST_REGION_FACTION,
  serverFilePlan: SERVER_FILE_PLAN,
  serverCommandPlan: SERVER_COMMAND_PLAN,
  serverValidationEvidence: SERVER_VALIDATION_EVIDENCE,
  serverRecoveryAudit: SERVER_RECOVERY_AUDIT,
  deniedGameServerBoundaries: DENIED_GAME_SERVER_BOUNDARIES,
  cockpitSummary: COCKPIT_SUMMARY,
  explicitSafetyLimits: EXPLICIT_SAFETY_LIMITS,
};

const SECTION_LOOKUP: Record<string, GameServerBuilderSection> = {
  goalRef: GOAL_REF,
  projectContextRef: PROJECT_CONTEXT_REF,
  specialistWorkerRef: SPECIALIST_WORKER_REF,
  modelRouterRef: MODEL_ROUTER_REF,
  providerApprovalRef: PROVIDER_APPROVAL_REF,
  localModelBridgeRef: LOCAL_MODEL_BRIDGE_REF,
  gameServerGoalIntake: GAME_SERVER_GOAL_INTAKE,
  serverTypeClassifier: SERVER_TYPE_CLASSIFIER,
  themeLorePack: THEME_LORE_PACK,
  minecraftServerProfile: MINECRAFT_SERVER_PROFILE,
  pluginModIntent: PLUGIN_MOD_INTENT,
  worldRulesConfig: WORLD_RULES_CONFIG,
  rolesPermissionsEconomy: ROLES_PERMISSIONS_ECONOMY,
  questRegionFaction: QUEST_REGION_FACTION,
  serverFilePlan: SERVER_FILE_PLAN,
  serverCommandPlan: SERVER_COMMAND_PLAN,
  serverValidationEvidence: SERVER_VALIDATION_EVIDENCE,
  serverRecoveryAudit: SERVER_RECOVERY_AUDIT,
  deniedGameServerBoundaries: DENIED_GAME_SERVER_BOUNDARIES,
};

const ALL_SECTION_IDS = Object.keys(SECTION_LOOKUP);

const ROUTES: readonly GameServerBuilderRouteDefinition[] = [
  {
    slug: "codexforge-cockpit",
    href: "/codexforge-cockpit",
    phase: "Cockpit",
    title: "Game Server Builder",
    commandLabel: "Go to Unified CodexForge Cockpit",
    summary: "Cockpit Game Server Builder summary keeps the first domain pack in the normal user cockpit.",
    markerPhrases: GAME_SERVER_BUILDER_COCKPIT_MARKERS,
    sectionIds: ALL_SECTION_IDS,
    devOnly: false,
  },
  {
    slug: "game-server-builder-domain-boundary",
    href: "/game-server-builder-domain-boundary",
    phase: "Phase 1594",
    title: "Game Server Builder Domain Boundary",
    commandLabel: "Go to Game Server Builder Domain Boundary",
    summary: "Defines the preview-only boundary for a backend-owned game server domain workflow without runtime execution.",
    markerPhrases: [
      "Game server builder domain boundary",
      "Game server builder domain boundary does not start servers from the UI",
      "Game server builder requires explicit operator approval before server work",
      "Game server builder prepares backend-owned game server workflows without runtime execution",
      "Denied game server builder paths remain blocked",
      "Game server builder checklist",
    ],
    sectionIds: ["goalRef", "specialistWorkerRef", "modelRouterRef", "providerApprovalRef", "localModelBridgeRef", "deniedGameServerBoundaries"],
    devOnly: true,
  },
  {
    slug: "game-server-goal-intake-preview",
    href: "/game-server-goal-intake-preview",
    phase: "Phase 1595",
    title: "Game Server Goal Intake Preview",
    commandLabel: "Go to Game Server Goal Intake Preview",
    summary: "Previews game server goal intake for game type, theme, target players, server style, rules, and done criteria.",
    markerPhrases: [
      "Game server goal intake preview",
      "Game server goal intake preview does not create server files from the UI",
      "Game server goal intake preview requires explicit operator approval",
      "Game server goal intake preview captures game type theme target players server style rules and done criteria",
      "Denied game server goal intake paths remain blocked",
      "Game server goal intake checklist",
    ],
    sectionIds: ["gameServerGoalIntake", "goalRef", "projectContextRef", "deniedGameServerBoundaries"],
    devOnly: true,
  },
  {
    slug: "server-type-classifier-preview",
    href: "/server-type-classifier-preview",
    phase: "Phase 1596",
    title: "Server Type Classifier Preview",
    commandLabel: "Go to Server Type Classifier Preview",
    summary: "Previews server type classification without installing or running any server.",
    markerPhrases: [
      "Server type classifier preview",
      "Server type classifier preview does not install or run servers",
      "Server type classifier preview requires explicit operator approval",
      "Server type classifier preview classifies Minecraft Paper Spigot Fabric Forge Vanilla modded roleplay survival minigame private and public server intents",
      "Denied server type classifier paths remain blocked",
      "Server type classifier checklist",
    ],
    sectionIds: ["serverTypeClassifier", "minecraftServerProfile", "deniedGameServerBoundaries"],
    devOnly: true,
  },
  {
    slug: "theme-lore-pack-preview",
    href: "/theme-lore-pack-preview",
    phase: "Phase 1597",
    title: "Theme Lore Pack Preview",
    commandLabel: "Go to Theme Lore Pack Preview",
    summary: "Previews Westeros-inspired lore, houses, regions, ranks, rules, quests, events, economy, and roleplay.",
    markerPhrases: [
      "Theme lore pack preview",
      "Theme lore pack preview does not generate or write final assets from the UI",
      "Theme lore pack preview requires explicit operator approval",
      "Theme lore pack preview shapes Westeros kingdoms houses regions ranks rules quests events economy and roleplay lore as review-only content",
      "Denied theme lore pack paths remain blocked",
      "Theme lore pack checklist",
    ],
    sectionIds: ["themeLorePack", "gameServerGoalIntake", "deniedGameServerBoundaries"],
    devOnly: true,
  },
  {
    slug: "minecraft-server-profile-preview",
    href: "/minecraft-server-profile-preview",
    phase: "Phase 1598",
    title: "Minecraft Server Profile Preview",
    commandLabel: "Go to Minecraft Server Profile Preview",
    summary: "Previews Minecraft version, loader, plugin, mod, world, memory, and validation profile needs without runtime work.",
    markerPhrases: [
      "Minecraft server profile preview",
      "Minecraft server profile preview does not download jars install Java start Minecraft or bind ports",
      "Minecraft server profile preview requires explicit operator approval",
      "Minecraft server profile preview shows server version loader profile plugin profile mod profile world profile memory profile and validation needs",
      "Denied Minecraft server profile paths remain blocked",
      "Minecraft server profile checklist",
    ],
    sectionIds: ["minecraftServerProfile", "serverTypeClassifier", "pluginModIntent", "deniedGameServerBoundaries"],
    devOnly: true,
  },
  {
    slug: "plugin-mod-intent-preview",
    href: "/plugin-mod-intent-preview",
    phase: "Phase 1599",
    title: "Plugin Mod Intent Preview",
    commandLabel: "Go to Plugin Mod Intent Preview",
    summary: "Previews plugin and mod intent without downloading, installing, enabling, or writing configs.",
    markerPhrases: [
      "Plugin mod intent preview",
      "Plugin mod intent preview does not download install or enable plugins or mods",
      "Plugin mod intent preview requires explicit operator approval",
      "Plugin mod intent preview lists region protection permissions economy quests factions chat moderation maps and roleplay plugin or mod intents",
      "Denied plugin mod intent paths remain blocked",
      "Plugin mod intent checklist",
    ],
    sectionIds: ["pluginModIntent", "minecraftServerProfile", "worldRulesConfig", "deniedGameServerBoundaries"],
    devOnly: true,
  },
  {
    slug: "world-rules-config-preview",
    href: "/world-rules-config-preview",
    phase: "Phase 1600",
    title: "World Rules Config Preview",
    commandLabel: "Go to World Rules Config Preview",
    summary: "Previews world rules and config families without writing config files from the UI.",
    markerPhrases: [
      "World rules config preview",
      "World rules config preview does not write config files from the UI",
      "World rules config preview requires explicit operator approval",
      "World rules config preview shows spawn rules PvP rules economy rules grief protection roleplay rules faction rules event rules and moderation rules",
      "Denied world rules config paths remain blocked",
      "World rules config checklist",
    ],
    sectionIds: ["worldRulesConfig", "themeLorePack", "rolesPermissionsEconomy", "deniedGameServerBoundaries"],
    devOnly: true,
  },
  {
    slug: "roles-permissions-economy-preview",
    href: "/roles-permissions-economy-preview",
    phase: "Phase 1601",
    title: "Roles Permissions Economy Preview",
    commandLabel: "Go to Roles Permissions Economy Preview",
    summary: "Previews roles, permissions, economy, trade, and rewards without mutating permissions or economy configs.",
    markerPhrases: [
      "Roles permissions economy preview",
      "Roles permissions economy preview does not mutate permission files or economy configs",
      "Roles permissions economy preview requires explicit operator approval",
      "Roles permissions economy preview shows owner admin moderator builder noble faction leader member guest economy trade and reward structures",
      "Denied roles permissions economy paths remain blocked",
      "Roles permissions economy checklist",
    ],
    sectionIds: ["rolesPermissionsEconomy", "worldRulesConfig", "pluginModIntent", "deniedGameServerBoundaries"],
    devOnly: true,
  },
  {
    slug: "quest-region-faction-preview",
    href: "/quest-region-faction-preview",
    phase: "Phase 1602",
    title: "Quest Region Faction Preview",
    commandLabel: "Go to Quest Region Faction Preview",
    summary: "Previews quests, regions, houses, faction claims, events, NPC storylines, and progression hooks.",
    markerPhrases: [
      "Quest region faction preview",
      "Quest region faction preview does not write quests regions or faction configs from the UI",
      "Quest region faction preview requires explicit operator approval",
      "Quest region faction preview shows kingdoms regions houses faction claims quests events NPC storylines and progression hooks as review-only plans",
      "Denied quest region faction paths remain blocked",
      "Quest region faction checklist",
    ],
    sectionIds: ["questRegionFaction", "themeLorePack", "rolesPermissionsEconomy", "deniedGameServerBoundaries"],
    devOnly: true,
  },
  {
    slug: "server-file-plan-preview",
    href: "/server-file-plan-preview",
    phase: "Phase 1603",
    title: "Server File Plan Preview",
    commandLabel: "Go to Server File Plan Preview",
    summary: "Previews future server file families without writing server files from the UI.",
    markerPhrases: [
      "Server file plan preview",
      "Server file plan preview does not write server files from the UI",
      "Server file plan preview requires explicit operator approval",
      "Server file plan preview shows planned server.properties plugin configs mod configs permissions configs world rules docs scripts evidence and rollback files",
      "Denied server file plan paths remain blocked",
      "Server file plan checklist",
    ],
    sectionIds: ["serverFilePlan", "worldRulesConfig", "rolesPermissionsEconomy", "questRegionFaction", "deniedGameServerBoundaries"],
    devOnly: true,
  },
  {
    slug: "server-command-plan-preview",
    href: "/server-command-plan-preview",
    phase: "Phase 1604",
    title: "Server Command Plan Preview",
    commandLabel: "Go to Server Command Plan Preview",
    summary: "Previews future backend-owned command candidates without running commands from the UI.",
    markerPhrases: [
      "Server command plan preview",
      "Server command plan preview does not run commands from the UI",
      "Server command plan preview requires explicit operator approval",
      "Server command plan preview shows future backend-owned validation build smoke config lint server dry-run and safety command candidates",
      "Denied server command plan paths remain blocked",
      "Server command plan checklist",
    ],
    sectionIds: ["serverCommandPlan", "serverFilePlan", "serverValidationEvidence", "deniedGameServerBoundaries"],
    devOnly: true,
  },
  {
    slug: "server-validation-evidence-preview",
    href: "/server-validation-evidence-preview",
    phase: "Phase 1605",
    title: "Server Validation Evidence Preview",
    commandLabel: "Go to Server Validation Evidence Preview",
    summary: "Previews future backend-owned validation evidence without running validation from the UI.",
    markerPhrases: [
      "Server validation evidence preview",
      "Server validation evidence preview does not run validation from the UI",
      "Server validation evidence preview requires backend-owned evidence capture",
      "Server validation evidence preview shows config checks plugin checks mod checks port checks startup checks log checks result states and audit references",
      "Denied server validation evidence paths remain blocked",
      "Server validation evidence checklist",
    ],
    sectionIds: ["serverValidationEvidence", "serverCommandPlan", "serverRecoveryAudit", "deniedGameServerBoundaries"],
    devOnly: true,
  },
  {
    slug: "server-recovery-audit-preview",
    href: "/server-recovery-audit-preview",
    phase: "Phase 1606",
    title: "Server Recovery Audit Preview",
    commandLabel: "Go to Server Recovery Audit Preview",
    summary: "Previews recovery and audit continuity without rollback, retry, restore, stop, or recovery execution from the UI.",
    markerPhrases: [
      "Server recovery audit preview",
      "Server recovery audit preview does not execute rollback retry restore or recovery from the UI",
      "Server recovery audit preview requires explicit operator approval",
      "Server recovery audit preview shows rollback configs restore snapshots stop server retry validation explain failure manual review safety stop and audit continuity",
      "Denied server recovery audit paths remain blocked",
      "Server recovery audit checklist",
    ],
    sectionIds: ["serverRecoveryAudit", "serverValidationEvidence", "deniedGameServerBoundaries"],
    devOnly: true,
  },
  {
    slug: "cockpit-game-server-builder-summary",
    href: "/cockpit-game-server-builder-summary",
    phase: "Phase 1607",
    title: "Cockpit Game Server Builder Summary",
    commandLabel: "Go to Cockpit Game Server Builder Summary",
    summary: "Shows the cockpit-centered Game Server Builder summary while keeping the cockpit as the normal user surface.",
    markerPhrases: [
      "Cockpit game server builder summary",
      "Cockpit game server builder summary keeps the cockpit as the normal user surface",
      "Cockpit game server builder summary does not start servers install mods bind ports or run commands from the cockpit",
      "Cockpit game server builder summary shows server goal type theme Minecraft profile plugins mods world rules roles permissions economy quests regions factions files commands validation evidence recovery and audit",
      "Phase pages remain dev test diagnostics only",
      "Cockpit game server builder checklist",
    ],
    sectionIds: ALL_SECTION_IDS,
    devOnly: true,
  },
  {
    slug: "first-game-server-builder-candidate",
    href: "/first-game-server-builder-candidate",
    phase: "Phase 1608",
    title: "First Game Server Builder Candidate",
    commandLabel: "Go to First Game Server Builder Candidate",
    summary: "Combines the first Game Server Builder candidate across goal, type, theme, configs, commands, validation, evidence, recovery, and audit.",
    markerPhrases: [
      "First game server builder candidate",
      "First game server builder candidate does not create or start game servers from the UI",
      "First game server builder candidate requires explicit operator approval",
      "Candidate combines game server goal type theme lore Minecraft profile plugins mods world rules roles permissions economy quests regions factions files commands validation evidence recovery and audit",
      "Denied first game server builder paths remain blocked",
      "First game server builder checklist",
    ],
    sectionIds: ALL_SECTION_IDS,
    devOnly: true,
  },
  {
    slug: "controlled-game-server-builder-release-candidate",
    href: "/controlled-game-server-builder-release-candidate",
    phase: "Phase 1609",
    title: "Controlled Game Server Builder Release Candidate",
    commandLabel: "Go to Controlled Game Server Builder Release Candidate",
    summary:
      "Controlled game server builder release candidate prepares CodexForge for backend-owned game server domain workflows without frontend server execution.",
    markerPhrases: [
      "Controlled game server builder release candidate",
      "Controlled game server builder release candidate does not dispatch workers call local models models providers connectors write files apply diffs run commands create snapshots persist approvals create queues persist transactions persist evidence results audit promote memory release locks execute rollback retry recovery spawn processes bind ports install deploy start runtimes start game servers download mods download plugins send prompts store credentials probe localhost or write browser storage from the frontend",
      "Controlled game server builder release requires explicit operator approval",
      "Release candidate prepares CodexForge for backend-owned game server domain workflows without frontend server execution",
      "Denied controlled game server builder paths remain blocked",
      "Controlled game server builder release checklist",
    ],
    sectionIds: ALL_SECTION_IDS,
    devOnly: true,
  },
];

export function listGameServerBuilderRouteDefinitions(): readonly GameServerBuilderRouteDefinition[] {
  return ROUTES;
}

export function getGameServerBuilderRouteDefinition(slug: GameServerBuilderRouteSlug): GameServerBuilderRouteDefinition {
  const route = ROUTES.find((candidate) => candidate.slug === slug);
  if (!route) return ROUTES[0];
  return route;
}

export function buildGameServerBuilderRouteModel(slug: GameServerBuilderRouteSlug = "codexforge-cockpit"): GameServerBuilderRouteModel {
  const route = getGameServerBuilderRouteDefinition(slug);
  const sections = route.sectionIds.map((sectionId) => SECTION_LOOKUP[sectionId]).filter(Boolean);

  return {
    route,
    gameServerBuilder: GAME_SERVER_BUILDER_MODEL,
    sections,
    diagnosticRoutes: ROUTES.filter((candidate) => candidate.devOnly),
    cockpitMarkers: GAME_SERVER_BUILDER_COCKPIT_MARKERS,
    summary: summarizeGameServerBuilderRoute(route, sections),
  };
}

export function buildGameServerBuilderModel(): GameServerBuilderRouteModel {
  return buildGameServerBuilderRouteModel("codexforge-cockpit");
}

export function summarizeGameServerBuilderRoute(
  route: GameServerBuilderRouteDefinition,
  sections: readonly GameServerBuilderSection[]
): string {
  return `${route.title} keeps ${sections.length} game server builder sections static, deterministic, preview-only, review-only, approval-required, backend-owned, and blocked from frontend game server starts, Java starts, Docker starts, SteamCMD starts, plugin installs, mod installs, downloads, port binding, model calls, provider calls, connector calls, prompt sending, file mutation, command execution, persistence, and recovery execution.`;
}

export function buildGameServerBuilderStableKey(parts: readonly string[]): string {
  return parts.join("__");
}
