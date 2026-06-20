import type { DailyBetaOneReleaseReviewSection } from "../daily-beta-1-release-review-kit";
import {
  buildControlledBuilderReviewAdvancedDetails,
  buildControlledBuilderReviewBoundary,
  buildControlledBuilderReviewModel,
  buildControlledBuilderReviewPacket,
  buildControlledBuilderReviewSections,
  buildControlledBuilderReviewStableKey as buildUniversalGameBuilderReviewStableKey,
  summarizeControlledBuilderReview,
  type ControlledBuilderReviewPacketInput,
} from "../controlled-builder-dry-run-review-kit";
import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";

export { buildUniversalGameBuilderReviewStableKey };
export * from "./UniversalGameBuilderReviewPhasePanels";

export type UniversalGameBuilderReviewPacketInput = ControlledBuilderReviewPacketInput;

export type UniversalGameBuilderReviewSlug =
  | "universal-game-builder-boundary"
  | "game-target-intake-packet"
  | "game-platform-classifier-preview"
  | "game-server-plan-preview"
  | "game-modpack-plan-preview"
  | "game-content-plan-preview"
  | "game-automation-plan-preview"
  | "game-asset-pipeline-plan-preview"
  | "game-deployment-plan-preview"
  | "game-safety-approval-plan"
  | "game-evidence-capture-plan"
  | "game-result-review-plan"
  | "game-recovery-plan-preview"
  | "game-packaging-plan-preview"
  | "first-universal-game-builder-candidate"
  | "controlled-universal-game-builder-release-candidate";

type UniversalGameBuilderDefinition = {
  slug: UniversalGameBuilderReviewSlug;
  phase: string;
  title: string;
  markerTitle: string;
  safetyCopy: string;
  approvalCopy: string;
  deniedCopy: string;
  groupLabel: string;
  checklistLabel: string;
  subtitle: string;
  primaryLabel: string;
  language: readonly string[];
  fieldItems: readonly string[];
  previewFocus: string;
  routes: readonly string[];
  links: readonly { href: string; label: string }[];
  nextRecommendedAction: string;
  summarySubject: string;
  plainEnglishTitle: string;
  plainEnglishCopy: string;
  identity: string;
  advancedDetails: readonly string[];
  advancedCopy: string;
  dataScope: string;
};

export const UNIVERSAL_GAME_BUILDER_BOUNDARY_LANGUAGE = [
  "Universal game builder boundary",
  "Universal game builder boundary does not start game servers",
  "Game builder execution requires explicit operator approval",
  "Game targets are not limited to Minecraft",
  "Denied universal game builder paths remain blocked",
  "Universal game builder checklist",
  "static universal game-builder boundary preview",
  "approval required",
] as const;

export const GAME_TARGET_INTAKE_PACKET_LANGUAGE = [
  "Game target intake packet",
  "Game target intake packet does not send prompts",
  "Game target intake requires explicit operator approval",
  "Game target packets support any supported game target",
  "Denied game target intake paths remain blocked",
  "Game target intake checklist",
  "static supported game target intake preview",
  "approval required",
] as const;

export const GAME_PLATFORM_CLASSIFIER_PREVIEW_LANGUAGE = [
  "Game platform classifier preview",
  "Game platform classifier preview does not call models",
  "Game platform classification requires explicit operator approval",
  "Game platform classification supports multiple game adapter families",
  "Denied game platform classifier paths remain blocked",
  "Game platform classifier checklist",
  "static game platform classifier preview",
  "approval required",
] as const;

export const GAME_SERVER_PLAN_PREVIEW_LANGUAGE = [
  "Game server plan preview",
  "Game server plan preview does not start servers",
  "Game server planning requires explicit operator approval",
  "Game server plans support supported game targets beyond Minecraft",
  "Denied game server plan paths remain blocked",
  "Game server plan checklist",
  "static game server plan preview",
  "approval required",
] as const;

export const GAME_MODPACK_PLAN_PREVIEW_LANGUAGE = [
  "Game modpack plan preview",
  "Game modpack plan preview does not install mods",
  "Game modpack planning requires explicit operator approval",
  "Modpack plans support game-specific adapter families",
  "Denied game modpack plan paths remain blocked",
  "Game modpack plan checklist",
  "static game modpack plan preview",
  "approval required",
] as const;

export const GAME_CONTENT_PLAN_PREVIEW_LANGUAGE = [
  "Game content plan preview",
  "Game content plan preview does not generate live assets",
  "Game content planning requires explicit operator approval",
  "Content plans support lore quests rules and world design",
  "Denied game content plan paths remain blocked",
  "Game content plan checklist",
  "static game content plan preview",
  "approval required",
] as const;

export const GAME_AUTOMATION_PLAN_PREVIEW_LANGUAGE = [
  "Game automation plan preview",
  "Game automation plan preview does not create automations",
  "Game automation planning requires explicit operator approval",
  "Automation plans support admin and server workflow review",
  "Denied game automation plan paths remain blocked",
  "Game automation plan checklist",
  "static game automation plan preview",
  "approval required",
] as const;

export const GAME_ASSET_PIPELINE_PLAN_PREVIEW_LANGUAGE = [
  "Game asset pipeline plan preview",
  "Game asset pipeline plan preview does not download or render assets",
  "Game asset pipeline planning requires explicit operator approval",
  "Asset pipeline plans support game-specific asset workflows",
  "Denied game asset pipeline paths remain blocked",
  "Game asset pipeline checklist",
  "static game asset pipeline preview",
  "approval required",
] as const;

export const GAME_DEPLOYMENT_PLAN_PREVIEW_LANGUAGE = [
  "Game deployment plan preview",
  "Game deployment plan preview does not deploy servers",
  "Game deployment planning requires explicit operator approval",
  "Deployment plans support hosted local and private game targets",
  "Denied game deployment plan paths remain blocked",
  "Game deployment plan checklist",
  "static game deployment plan preview",
  "approval required",
] as const;

export const GAME_SAFETY_APPROVAL_PLAN_LANGUAGE = [
  "Game safety approval plan",
  "Game safety approval plan does not approve actions",
  "Game safety approval requires explicit operator approval",
  "Safety plans gate server mods assets commands and deployment",
  "Denied game safety approval paths remain blocked",
  "Game safety approval checklist",
  "static game safety approval plan",
  "approval required",
] as const;

export const GAME_EVIDENCE_CAPTURE_PLAN_LANGUAGE = [
  "Game evidence capture plan",
  "Game evidence capture plan does not persist evidence",
  "Game evidence capture requires explicit operator approval",
  "Evidence plans route game outputs to shared review",
  "Denied game evidence capture paths remain blocked",
  "Game evidence capture checklist",
  "static game evidence capture plan",
  "approval required",
] as const;

export const GAME_RESULT_REVIEW_PLAN_LANGUAGE = [
  "Game result review plan",
  "Game result review plan does not persist results",
  "Game result review requires explicit operator approval",
  "Result plans route game outputs to shared review",
  "Denied game result review paths remain blocked",
  "Game result review checklist",
  "static game result review plan",
  "approval required",
] as const;

export const GAME_RECOVERY_PLAN_PREVIEW_LANGUAGE = [
  "Game recovery plan preview",
  "Game recovery plan preview does not trigger recovery",
  "Game recovery planning requires explicit operator approval",
  "Recovery plans include rollback backup and restore review",
  "Denied game recovery plan paths remain blocked",
  "Game recovery plan checklist",
  "static game recovery plan preview",
  "approval required",
] as const;

export const GAME_PACKAGING_PLAN_PREVIEW_LANGUAGE = [
  "Game packaging plan preview",
  "Game packaging plan preview does not package outputs",
  "Game packaging planning requires explicit operator approval",
  "Packaging plans support configs mods assets and runbooks",
  "Denied game packaging plan paths remain blocked",
  "Game packaging plan checklist",
  "static game packaging plan preview",
  "approval required",
] as const;

export const FIRST_UNIVERSAL_GAME_BUILDER_CANDIDATE_LANGUAGE = [
  "First universal game builder candidate",
  "First universal game builder candidate does not execute game workflows",
  "Game builder candidates require explicit operator approval",
  "Candidate packets combine game target model routing and backend plans",
  "Denied universal game builder candidate paths remain blocked",
  "First universal game builder checklist",
  "static first universal game-builder candidate",
  "approval required",
] as const;

export const CONTROLLED_UNIVERSAL_GAME_BUILDER_RELEASE_CANDIDATE_LANGUAGE = [
  "Controlled universal game builder release candidate",
  "Controlled universal game builder release candidate does not call models or execute adapters",
  "Controlled game builder release requires explicit operator approval",
  "Release candidate supports any supported game target with shared brain gates",
  "Denied controlled universal game builder release paths remain blocked",
  "Controlled universal game builder release checklist",
  "static controlled universal game-builder release candidate",
  "approval required",
] as const;

export const UNIVERSAL_GAME_BUILDER_PREVIEW_SAFETY_MARKERS = [
  "universal-game-builder static review-only preview",
  "deterministic static review content",
  "supported game target review-only packet",
  "review-only",
  "preview-only",
  "not executable from UI",
  "approval required",
  "operator-approved",
  "clear denied-path copy",
  "clear operator approval copy",
  "no game workflow execution",
  "no game server start",
  "no game server launch",
  "no game client launch",
  "no mod install behavior",
  "no asset download behavior",
  "no asset render behavior",
  "no game automation creation",
  "no deployment execution",
  "no package/export/write behavior",
  "no scaffold project creation",
  "no backend adapter execution",
  "no game adapter execution",
  "no model calls",
  "no provider calls",
  "no live provider connection tests",
  "no local runtime probes",
  "no prompt sending",
  "no prompts sent remotely",
  "no credit spend",
  "no API key reads",
  "no secret reads",
  "no credential reads",
  "no credential storage",
  "no browser credential storage",
  "no model output persistence",
  "no evidence capture/ingestion/storage",
  "no result persistence",
  "no recovery/retry trigger",
  "no automatic memory promotion",
  "no hidden approvals",
  "no hidden execution",
  "Models are workers not isolated brains",
] as const;

const UNIVERSAL_GAME_BUILDER_PACKET_FIELDS = [
  "high-level game goal",
  "target game/platform",
  "server/modpack/content/asset/deployment intent",
  "inferred adapter family",
  "selected model class",
  "model routing rationale",
  "shared context packet",
  "backend adapter plan",
  "game adapter plan",
  "file plan",
  "command plan",
  "runtime/server plan",
  "asset pipeline plan",
  "deployment plan",
  "evidence plan",
  "result plan",
  "recovery plan",
  "packaging plan",
  "approval gates",
  "risk class",
  "denied live execution state",
  "operator review state",
] as const;

const SUPPORTED_GAME_TARGETS = [
  "Minecraft as one supported example",
  "Roblox",
  "FiveM / GTA roleplay",
  "Valheim",
  "Rust",
  "ARK",
  "Project Zomboid",
  "Factorio",
  "Terraria",
  "Garry's Mod",
  "Unreal projects",
  "Unity projects",
  "modpacks",
  "private servers",
  "game automation workflows",
  "game asset pipelines",
  "future game-specific adapters",
] as const;

function sentenceList(items: readonly string[]): string {
  return items.join(", ");
}

function buildUniversalGameBuilderDefinition(input: {
  slug: UniversalGameBuilderReviewSlug;
  phase: string;
  title: string;
  markerTitle: string;
  safetyCopy: string;
  approvalCopy: string;
  deniedCopy: string;
  groupLabel: string;
  checklistLabel: string;
  subtitle: string;
  primaryLabel: string;
  language: readonly string[];
  fieldItems: readonly string[];
  previewFocus: string;
  routes: readonly string[];
  links: readonly { href: string; label: string }[];
  nextRecommendedAction: string;
}): UniversalGameBuilderDefinition {
  const packetFields = `Future universal game-builder packet fields: ${sentenceList(UNIVERSAL_GAME_BUILDER_PACKET_FIELDS)}.`;
  const supportedTargets = `Supported game target examples: ${sentenceList(SUPPORTED_GAME_TARGETS)}. Minecraft is one example supported game target, not the default route and not the only route.`;
  const universalGameBoundary =
    "Universal game-builder boundary: CodexForge accepts high-level game goals and represents a review-only packet for supported game target selection, game adapter family selection, model routing, backend adapter planning, game adapter planning, file planning, command planning, runtime/server planning, asset pipeline planning, deployment planning, evidence planning, result review, recovery planning, packaging planning, and approval gates. No server starts, no mods install, no assets download or render, no clients launch, no projects scaffold, and no adapters execute.";
  const sharedBrainBoundary =
    "Shared CodexForge brain boundary: all paid/free/local/remote/OpenAI-compatible/specialist model workers share one CodexForge brain, memory, knowledge, evidence, result, audit, and approval layer. Models are workers. CodexForge is the brain. Memory promotion requires explicit operator approval. Future approved model outputs return through shared evidence and result review rather than isolated model memory.";
  const modelRouterBoundary =
    "Model-router preview rules: cheapest capable model wins if safe; local model preferred for private game configs, server secrets, local project files, and sensitive context; paid/pro model requires quality or capability justification; specialist model requires domain-fit justification for game, server, mod, content, or asset tasks; all routing rationale stays static and review-only until explicit operator approval.";
  const backendAdapterBoundary =
    "Backend and game adapter preview rules: server plans remain preview-only; modpack plans remain preview-only; asset pipeline plans remain preview-only; automation plans remain preview-only; deployment plans remain preview-only; file, command, runtime, package, and scaffold proposals remain preview-only; all real execution requires explicit operator approval.";
  const deniedBoundary =
    `${input.safetyCopy}. ${input.deniedCopy}. Denied live execution state is blocked for model calls, provider calls, provider connection tests, local runtime probes, API key reads, secret reads, credential storage, prompt sending, credit spend, file writes, command execution, runtime/server startup, game server launch, game client launch, mod installation, asset downloads, asset rendering, automation creation, deployment, evidence persistence, result persistence, recovery triggers, packaging, project scaffolding, backend adapter execution, game adapter execution, model output persistence, automatic memory promotion, hidden approvals, browser credential storage, audit writes, network calls, and live request routing.`;
  const checklistCopy =
    `${input.checklistLabel}: high-level game goal, supported game target, target game/platform, intent, inferred game adapter family, selected model class, routing rationale, shared context packet, backend adapter plan, game adapter plan, file plan, command plan, runtime/server plan, asset pipeline plan, deployment plan, evidence plan, result plan, recovery plan, packaging plan, approval gates, risk class, denied live execution state, operator review state, adapter review, audit note, privacy note, cost note, and recovery note.`;
  const fieldLine = `Static preview focus fields: ${sentenceList(input.fieldItems)}.`;

  return {
    slug: input.slug,
    phase: input.phase,
    title: input.title,
    markerTitle: input.markerTitle,
    safetyCopy: input.safetyCopy,
    approvalCopy: input.approvalCopy,
    deniedCopy: input.deniedCopy,
    groupLabel: input.groupLabel,
    checklistLabel: input.checklistLabel,
    subtitle: input.subtitle,
    primaryLabel: input.primaryLabel,
    language: input.language,
    fieldItems: input.fieldItems,
    previewFocus: input.previewFocus,
    routes: input.routes,
    links: input.links,
    nextRecommendedAction: input.nextRecommendedAction,
    summarySubject: input.title,
    plainEnglishTitle: `Plain-English ${input.title.toLowerCase()}`,
    plainEnglishCopy: `${input.markerTitle}. ${deniedBoundary} ${input.approvalCopy} ${packetFields} ${supportedTargets} ${sharedBrainBoundary} ${modelRouterBoundary} ${backendAdapterBoundary} ${fieldLine} What this unlocks next: ${input.nextRecommendedAction}`,
    identity: `${input.title} identity: ${input.markerTitle}. ${input.safetyCopy}. ${input.approvalCopy} ${input.deniedCopy}. ${packetFields} ${supportedTargets} ${sharedBrainBoundary} This is static universal game-builder preview-only review content, not executable from UI, approval required, and no live model, provider, backend adapter, game adapter, file, command, runtime, server, modpack, automation, asset, deployment, evidence, result, recovery, packaging, or scaffold action is available.`,
    advancedDetails: [
      `${input.title} identity`,
      input.markerTitle,
      input.safetyCopy,
      input.approvalCopy,
      input.deniedCopy,
      packetFields,
      supportedTargets,
      `${input.groupLabel}: ${sentenceList(input.fieldItems)}.`,
      checklistCopy,
      `Preview focus: ${input.previewFocus}.`,
      universalGameBoundary,
      sharedBrainBoundary,
      modelRouterBoundary,
      backendAdapterBoundary,
      deniedBoundary,
      "Risk review: static risk class is high until the operator explicitly approves model routing plus backend and game adapter execution.",
      "Operator review state: blocked until explicit human approval confirms game target, plan, risk budget, privacy, evidence, result, recovery, packaging, and approvals.",
      `What this unlocks next: ${input.nextRecommendedAction}`,
      ...UNIVERSAL_GAME_BUILDER_PREVIEW_SAFETY_MARKERS,
    ],
    advancedCopy: `advanced ${input.slug} details collapsed/secondary. This route is static universal game-builder review-only preview content, preview-only, not executable from UI, and ${input.safetyCopy.toLowerCase()}.`,
    dataScope: `${input.slug} static universal game-builder preview surface`,
  };
}

export const UNIVERSAL_GAME_BUILDER_DEFINITIONS: Record<UniversalGameBuilderReviewSlug, UniversalGameBuilderDefinition> = {
  "universal-game-builder-boundary": buildUniversalGameBuilderDefinition({
    slug: "universal-game-builder-boundary",
    phase: "Phase 970",
    title: "Universal Game Builder Boundary",
    markerTitle: "Universal game builder boundary",
    safetyCopy: "Universal game builder boundary does not start game servers",
    approvalCopy: "Game builder execution requires explicit operator approval.",
    deniedCopy: "Denied universal game builder paths remain blocked",
    groupLabel: "Game targets are not limited to Minecraft",
    checklistLabel: "Universal game builder checklist",
    subtitle: "Review the universal game-builder boundary without starting servers, launching clients, installing mods, calling models, or executing adapters.",
    primaryLabel: "Review game boundary",
    language: UNIVERSAL_GAME_BUILDER_BOUNDARY_LANGUAGE,
    fieldItems: ["supported game target boundary", "game adapter family boundary", "model routing boundary", "backend adapter plan boundary", "game adapter plan boundary", "denied execution state"],
    previewFocus: "the universal game-builder boundary across supported game targets, adapter families, model routing, backend adapter planning, game adapter planning, and denied live execution state",
    routes: ["/controlled-project-builder-release-candidate", "/game-target-intake-packet", "/game-safety-approval-plan"],
    links: [
      { href: "/controlled-project-builder-release-candidate", label: "Previous Phase" },
      { href: "/game-target-intake-packet", label: "Next Phase" },
      { href: "/game-safety-approval-plan", label: "Safety Plan" },
    ],
    nextRecommendedAction: "review game target intake while every live server, mod, asset, deployment, model, provider, backend adapter, and game adapter path remains blocked",
  }),
  "game-target-intake-packet": buildUniversalGameBuilderDefinition({
    slug: "game-target-intake-packet",
    phase: "Phase 971",
    title: "Game Target Intake Packet",
    markerTitle: "Game target intake packet",
    safetyCopy: "Game target intake packet does not send prompts",
    approvalCopy: "Game target intake requires explicit operator approval.",
    deniedCopy: "Denied game target intake paths remain blocked",
    groupLabel: "Game target packets support any supported game target",
    checklistLabel: "Game target intake checklist",
    subtitle: "Review static game target intake without sending prompts or routing requests to models.",
    primaryLabel: "Review target intake",
    language: GAME_TARGET_INTAKE_PACKET_LANGUAGE,
    fieldItems: ["high-level game goal", "target game/platform", "intent", "privacy note", "sensitivity note", "denied prompt-send state"],
    previewFocus: "supported game target intake across goals, platform hints, server/mod/content/asset/deployment intent, privacy, and denied prompt sending",
    routes: ["/universal-game-builder-boundary", "/game-platform-classifier-preview", "/game-safety-approval-plan"],
    links: [
      { href: "/universal-game-builder-boundary", label: "Previous Phase" },
      { href: "/game-platform-classifier-preview", label: "Next Phase" },
      { href: "/game-safety-approval-plan", label: "Safety Plan" },
    ],
    nextRecommendedAction: "review platform classification after target intake is visible and still blocked from prompt sending",
  }),
  "game-platform-classifier-preview": buildUniversalGameBuilderDefinition({
    slug: "game-platform-classifier-preview",
    phase: "Phase 972",
    title: "Game Platform Classifier Preview",
    markerTitle: "Game platform classifier preview",
    safetyCopy: "Game platform classifier preview does not call models",
    approvalCopy: "Game platform classification requires explicit operator approval.",
    deniedCopy: "Denied game platform classifier paths remain blocked",
    groupLabel: "Game platform classification supports multiple game adapter families",
    checklistLabel: "Game platform classifier checklist",
    subtitle: "Review static game platform classification without model calls, provider calls, or adapter execution.",
    primaryLabel: "Review classifier",
    language: GAME_PLATFORM_CLASSIFIER_PREVIEW_LANGUAGE,
    fieldItems: ["target game/platform", "game adapter family", "specialist fit note", "local privacy preference", "routing rationale", "denied model-call state"],
    previewFocus: "static classification of supported game target, game adapter family, local/private context, specialist model fit, and denied model calls",
    routes: ["/game-target-intake-packet", "/game-server-plan-preview", "/game-safety-approval-plan"],
    links: [
      { href: "/game-target-intake-packet", label: "Previous Phase" },
      { href: "/game-server-plan-preview", label: "Next Phase" },
      { href: "/game-safety-approval-plan", label: "Safety Plan" },
    ],
    nextRecommendedAction: "review game server planning after platform classification is visible and still static",
  }),
  "game-server-plan-preview": buildUniversalGameBuilderDefinition({
    slug: "game-server-plan-preview",
    phase: "Phase 973",
    title: "Game Server Plan Preview",
    markerTitle: "Game server plan preview",
    safetyCopy: "Game server plan preview does not start servers",
    approvalCopy: "Game server planning requires explicit operator approval.",
    deniedCopy: "Denied game server plan paths remain blocked",
    groupLabel: "Game server plans support supported game targets beyond Minecraft",
    checklistLabel: "Game server plan checklist",
    subtitle: "Review static game server plans without starting servers, launching clients, probing runtimes, or executing adapters.",
    primaryLabel: "Review server plan",
    language: GAME_SERVER_PLAN_PREVIEW_LANGUAGE,
    fieldItems: ["server intent", "runtime/server plan", "admin policy", "backup note", "game adapter plan", "denied server-start state"],
    previewFocus: "preview-only server planning for supported game targets, runtime/server proposals, admin workflow notes, backups, and denied server startup",
    routes: ["/game-platform-classifier-preview", "/game-modpack-plan-preview", "/game-safety-approval-plan"],
    links: [
      { href: "/game-platform-classifier-preview", label: "Previous Phase" },
      { href: "/game-modpack-plan-preview", label: "Next Phase" },
      { href: "/game-safety-approval-plan", label: "Safety Plan" },
    ],
    nextRecommendedAction: "review modpack planning while server startup remains blocked",
  }),
  "game-modpack-plan-preview": buildUniversalGameBuilderDefinition({
    slug: "game-modpack-plan-preview",
    phase: "Phase 974",
    title: "Game Modpack Plan Preview",
    markerTitle: "Game modpack plan preview",
    safetyCopy: "Game modpack plan preview does not install mods",
    approvalCopy: "Game modpack planning requires explicit operator approval.",
    deniedCopy: "Denied game modpack plan paths remain blocked",
    groupLabel: "Modpack plans support game-specific adapter families",
    checklistLabel: "Game modpack plan checklist",
    subtitle: "Review static modpack plans without installing mods, downloading assets, writing files, or executing game adapters.",
    primaryLabel: "Review modpack plan",
    language: GAME_MODPACK_PLAN_PREVIEW_LANGUAGE,
    fieldItems: ["modpack intent", "adapter family", "dependency plan", "compatibility note", "license review note", "denied mod-install state"],
    previewFocus: "preview-only modpack planning across game-specific adapter families, dependencies, compatibility, license review, and denied mod installation",
    routes: ["/game-server-plan-preview", "/game-content-plan-preview", "/game-safety-approval-plan"],
    links: [
      { href: "/game-server-plan-preview", label: "Previous Phase" },
      { href: "/game-content-plan-preview", label: "Next Phase" },
      { href: "/game-safety-approval-plan", label: "Safety Plan" },
    ],
    nextRecommendedAction: "review content planning while mod installation and asset downloads remain blocked",
  }),
  "game-content-plan-preview": buildUniversalGameBuilderDefinition({
    slug: "game-content-plan-preview",
    phase: "Phase 975",
    title: "Game Content Plan Preview",
    markerTitle: "Game content plan preview",
    safetyCopy: "Game content plan preview does not generate live assets",
    approvalCopy: "Game content planning requires explicit operator approval.",
    deniedCopy: "Denied game content plan paths remain blocked",
    groupLabel: "Content plans support lore quests rules and world design",
    checklistLabel: "Game content plan checklist",
    subtitle: "Review static lore, quest, rules, and world design planning without generating or persisting assets.",
    primaryLabel: "Review content plan",
    language: GAME_CONTENT_PLAN_PREVIEW_LANGUAGE,
    fieldItems: ["lore plan", "quest plan", "rules plan", "world design plan", "content safety note", "denied live-asset state"],
    previewFocus: "preview-only game content planning across lore, quests, rules, world design, safety review, and denied asset generation",
    routes: ["/game-modpack-plan-preview", "/game-automation-plan-preview", "/game-safety-approval-plan"],
    links: [
      { href: "/game-modpack-plan-preview", label: "Previous Phase" },
      { href: "/game-automation-plan-preview", label: "Next Phase" },
      { href: "/game-safety-approval-plan", label: "Safety Plan" },
    ],
    nextRecommendedAction: "review automation planning while content generation remains blocked",
  }),
  "game-automation-plan-preview": buildUniversalGameBuilderDefinition({
    slug: "game-automation-plan-preview",
    phase: "Phase 976",
    title: "Game Automation Plan Preview",
    markerTitle: "Game automation plan preview",
    safetyCopy: "Game automation plan preview does not create automations",
    approvalCopy: "Game automation planning requires explicit operator approval.",
    deniedCopy: "Denied game automation plan paths remain blocked",
    groupLabel: "Automation plans support admin and server workflow review",
    checklistLabel: "Game automation plan checklist",
    subtitle: "Review static game automation and admin workflow plans without creating schedules, jobs, or server automations.",
    primaryLabel: "Review automation plan",
    language: GAME_AUTOMATION_PLAN_PREVIEW_LANGUAGE,
    fieldItems: ["admin workflow review", "server workflow review", "moderation workflow note", "schedule proposal", "approval gate", "denied automation state"],
    previewFocus: "preview-only admin and server workflow review, moderation notes, schedule proposals, approval gates, and denied automation creation",
    routes: ["/game-content-plan-preview", "/game-asset-pipeline-plan-preview", "/game-safety-approval-plan"],
    links: [
      { href: "/game-content-plan-preview", label: "Previous Phase" },
      { href: "/game-asset-pipeline-plan-preview", label: "Next Phase" },
      { href: "/game-safety-approval-plan", label: "Safety Plan" },
    ],
    nextRecommendedAction: "review asset pipeline planning while automation creation remains blocked",
  }),
  "game-asset-pipeline-plan-preview": buildUniversalGameBuilderDefinition({
    slug: "game-asset-pipeline-plan-preview",
    phase: "Phase 977",
    title: "Game Asset Pipeline Plan Preview",
    markerTitle: "Game asset pipeline plan preview",
    safetyCopy: "Game asset pipeline plan preview does not download or render assets",
    approvalCopy: "Game asset pipeline planning requires explicit operator approval.",
    deniedCopy: "Denied game asset pipeline paths remain blocked",
    groupLabel: "Asset pipeline plans support game-specific asset workflows",
    checklistLabel: "Game asset pipeline checklist",
    subtitle: "Review static asset pipeline planning without downloading, rendering, importing, or packaging assets.",
    primaryLabel: "Review asset pipeline",
    language: GAME_ASSET_PIPELINE_PLAN_PREVIEW_LANGUAGE,
    fieldItems: ["asset workflow", "format note", "source policy", "license review", "toolchain proposal", "denied asset state"],
    previewFocus: "preview-only game-specific asset workflows, formats, source policy, license review, toolchain proposals, and denied downloads or rendering",
    routes: ["/game-automation-plan-preview", "/game-deployment-plan-preview", "/game-safety-approval-plan"],
    links: [
      { href: "/game-automation-plan-preview", label: "Previous Phase" },
      { href: "/game-deployment-plan-preview", label: "Next Phase" },
      { href: "/game-safety-approval-plan", label: "Safety Plan" },
    ],
    nextRecommendedAction: "review deployment planning while asset downloads and rendering remain blocked",
  }),
  "game-deployment-plan-preview": buildUniversalGameBuilderDefinition({
    slug: "game-deployment-plan-preview",
    phase: "Phase 978",
    title: "Game Deployment Plan Preview",
    markerTitle: "Game deployment plan preview",
    safetyCopy: "Game deployment plan preview does not deploy servers",
    approvalCopy: "Game deployment planning requires explicit operator approval.",
    deniedCopy: "Denied game deployment plan paths remain blocked",
    groupLabel: "Deployment plans support hosted local and private game targets",
    checklistLabel: "Game deployment plan checklist",
    subtitle: "Review static hosted, local, and private game deployment plans without deploying servers or writing deployment artifacts.",
    primaryLabel: "Review deployment plan",
    language: GAME_DEPLOYMENT_PLAN_PREVIEW_LANGUAGE,
    fieldItems: ["deployment intent", "hosted option", "local option", "private server option", "rollback note", "denied deployment state"],
    previewFocus: "preview-only deployment planning for hosted, local, and private supported game targets, rollback notes, and denied deployment",
    routes: ["/game-asset-pipeline-plan-preview", "/game-safety-approval-plan", "/game-packaging-plan-preview"],
    links: [
      { href: "/game-asset-pipeline-plan-preview", label: "Previous Phase" },
      { href: "/game-safety-approval-plan", label: "Next Phase" },
      { href: "/game-packaging-plan-preview", label: "Packaging Plan" },
    ],
    nextRecommendedAction: "review game safety approval gates before any server, mod, asset, command, or deployment action can be considered",
  }),
  "game-safety-approval-plan": buildUniversalGameBuilderDefinition({
    slug: "game-safety-approval-plan",
    phase: "Phase 979",
    title: "Game Safety Approval Plan",
    markerTitle: "Game safety approval plan",
    safetyCopy: "Game safety approval plan does not approve actions",
    approvalCopy: "Game safety approval requires explicit operator approval.",
    deniedCopy: "Denied game safety approval paths remain blocked",
    groupLabel: "Safety plans gate server mods assets commands and deployment",
    checklistLabel: "Game safety approval checklist",
    subtitle: "Review static approval gates without approving server, mod, asset, command, deployment, model, provider, backend, or game adapter actions.",
    primaryLabel: "Review safety gates",
    language: GAME_SAFETY_APPROVAL_PLAN_LANGUAGE,
    fieldItems: ["server approval gate", "mod approval gate", "asset approval gate", "command approval gate", "deployment approval gate", "denied approval state"],
    previewFocus: "approval gates across servers, mods, assets, commands, deployment, model routing, backend adapters, game adapters, and denied approvals",
    routes: ["/game-deployment-plan-preview", "/game-evidence-capture-plan", "/universal-game-builder-boundary"],
    links: [
      { href: "/game-deployment-plan-preview", label: "Previous Phase" },
      { href: "/game-evidence-capture-plan", label: "Next Phase" },
      { href: "/universal-game-builder-boundary", label: "Boundary" },
    ],
    nextRecommendedAction: "review evidence capture planning with every approval still manual and blocked from persistence",
  }),
  "game-evidence-capture-plan": buildUniversalGameBuilderDefinition({
    slug: "game-evidence-capture-plan",
    phase: "Phase 980",
    title: "Game Evidence Capture Plan",
    markerTitle: "Game evidence capture plan",
    safetyCopy: "Game evidence capture plan does not persist evidence",
    approvalCopy: "Game evidence capture requires explicit operator approval.",
    deniedCopy: "Denied game evidence capture paths remain blocked",
    groupLabel: "Evidence plans route game outputs to shared review",
    checklistLabel: "Game evidence capture checklist",
    subtitle: "Review static evidence capture planning without capturing, ingesting, storing, or persisting game outputs.",
    primaryLabel: "Review evidence plan",
    language: GAME_EVIDENCE_CAPTURE_PLAN_LANGUAGE,
    fieldItems: ["evidence source placeholder", "game output routing", "redaction note", "review destination", "audit note", "denied evidence state"],
    previewFocus: "evidence planning for game outputs, redaction, shared review routing, audit notes, and denied evidence persistence",
    routes: ["/game-safety-approval-plan", "/game-result-review-plan", "/game-recovery-plan-preview"],
    links: [
      { href: "/game-safety-approval-plan", label: "Previous Phase" },
      { href: "/game-result-review-plan", label: "Next Phase" },
      { href: "/game-recovery-plan-preview", label: "Recovery Plan" },
    ],
    nextRecommendedAction: "review result handling after evidence routing is visible and still blocked from persistence",
  }),
  "game-result-review-plan": buildUniversalGameBuilderDefinition({
    slug: "game-result-review-plan",
    phase: "Phase 981",
    title: "Game Result Review Plan",
    markerTitle: "Game result review plan",
    safetyCopy: "Game result review plan does not persist results",
    approvalCopy: "Game result review requires explicit operator approval.",
    deniedCopy: "Denied game result review paths remain blocked",
    groupLabel: "Result plans route game outputs to shared review",
    checklistLabel: "Game result review checklist",
    subtitle: "Review static result handling without storing, reusing, or persisting game outputs.",
    primaryLabel: "Review result plan",
    language: GAME_RESULT_REVIEW_PLAN_LANGUAGE,
    fieldItems: ["result plan", "acceptance criteria", "game output routing", "reuse policy", "review destination", "denied result state"],
    previewFocus: "result review planning for game outputs, acceptance criteria, reuse policy, shared review routing, and denied result persistence",
    routes: ["/game-evidence-capture-plan", "/game-recovery-plan-preview", "/game-packaging-plan-preview"],
    links: [
      { href: "/game-evidence-capture-plan", label: "Previous Phase" },
      { href: "/game-recovery-plan-preview", label: "Next Phase" },
      { href: "/game-packaging-plan-preview", label: "Packaging Plan" },
    ],
    nextRecommendedAction: "review recovery strategy while game result persistence remains blocked",
  }),
  "game-recovery-plan-preview": buildUniversalGameBuilderDefinition({
    slug: "game-recovery-plan-preview",
    phase: "Phase 982",
    title: "Game Recovery Plan Preview",
    markerTitle: "Game recovery plan preview",
    safetyCopy: "Game recovery plan preview does not trigger recovery",
    approvalCopy: "Game recovery planning requires explicit operator approval.",
    deniedCopy: "Denied game recovery plan paths remain blocked",
    groupLabel: "Recovery plans include rollback backup and restore review",
    checklistLabel: "Game recovery plan checklist",
    subtitle: "Review static game recovery plans without triggering rollback, backup, restore, retry, or repair actions.",
    primaryLabel: "Review recovery plan",
    language: GAME_RECOVERY_PLAN_PREVIEW_LANGUAGE,
    fieldItems: ["rollback review", "backup review", "restore review", "failure modes", "retry boundary", "denied recovery state"],
    previewFocus: "preview-only recovery planning across rollback, backup, restore, failure modes, retry boundaries, and denied recovery triggers",
    routes: ["/game-result-review-plan", "/game-packaging-plan-preview", "/game-safety-approval-plan"],
    links: [
      { href: "/game-result-review-plan", label: "Previous Phase" },
      { href: "/game-packaging-plan-preview", label: "Next Phase" },
      { href: "/game-safety-approval-plan", label: "Safety Plan" },
    ],
    nextRecommendedAction: "review packaging after recovery strategy is visible and still blocked from execution",
  }),
  "game-packaging-plan-preview": buildUniversalGameBuilderDefinition({
    slug: "game-packaging-plan-preview",
    phase: "Phase 983",
    title: "Game Packaging Plan Preview",
    markerTitle: "Game packaging plan preview",
    safetyCopy: "Game packaging plan preview does not package outputs",
    approvalCopy: "Game packaging planning requires explicit operator approval.",
    deniedCopy: "Denied game packaging plan paths remain blocked",
    groupLabel: "Packaging plans support configs mods assets and runbooks",
    checklistLabel: "Game packaging plan checklist",
    subtitle: "Review static packaging plans without creating archives, configs, mod bundles, assets, exports, or runbooks.",
    primaryLabel: "Review packaging plan",
    language: GAME_PACKAGING_PLAN_PREVIEW_LANGUAGE,
    fieldItems: ["config package scope", "mod package scope", "asset package scope", "runbook scope", "retention note", "denied packaging state"],
    previewFocus: "preview-only packaging planning across configs, mods, assets, runbooks, retention notes, and denied package creation",
    routes: ["/game-recovery-plan-preview", "/first-universal-game-builder-candidate", "/game-safety-approval-plan"],
    links: [
      { href: "/game-recovery-plan-preview", label: "Previous Phase" },
      { href: "/first-universal-game-builder-candidate", label: "Next Phase" },
      { href: "/game-safety-approval-plan", label: "Safety Plan" },
    ],
    nextRecommendedAction: "combine the reviewed game target, model routing, backend plans, game adapter plans, and approval gates into the first universal candidate",
  }),
  "first-universal-game-builder-candidate": buildUniversalGameBuilderDefinition({
    slug: "first-universal-game-builder-candidate",
    phase: "Phase 984",
    title: "First Universal Game Builder Candidate",
    markerTitle: "First universal game builder candidate",
    safetyCopy: "First universal game builder candidate does not execute game workflows",
    approvalCopy: "Game builder candidates require explicit operator approval.",
    deniedCopy: "Denied universal game builder candidate paths remain blocked",
    groupLabel: "Candidate packets combine game target model routing and backend plans",
    checklistLabel: "First universal game builder checklist",
    subtitle: "Review the first universal game-builder candidate without executing game workflows, models, providers, backend adapters, or game adapters.",
    primaryLabel: "Review first candidate",
    language: FIRST_UNIVERSAL_GAME_BUILDER_CANDIDATE_LANGUAGE,
    fieldItems: ["candidate game target", "candidate model routing", "candidate backend plan", "candidate game adapter plan", "candidate approval gates", "denied workflow state"],
    previewFocus: "combined game target, model routing, shared context, backend adapter plan, game adapter plan, file, command, runtime/server, asset, deployment, evidence, result, recovery, packaging, and approval packet",
    routes: ["/game-packaging-plan-preview", "/controlled-universal-game-builder-release-candidate", "/game-safety-approval-plan"],
    links: [
      { href: "/game-packaging-plan-preview", label: "Previous Phase" },
      { href: "/controlled-universal-game-builder-release-candidate", label: "Next Phase" },
      { href: "/game-safety-approval-plan", label: "Safety Plan" },
    ],
    nextRecommendedAction: "review the controlled universal game-builder release candidate with every model, backend adapter, and game adapter path still denied",
  }),
  "controlled-universal-game-builder-release-candidate": buildUniversalGameBuilderDefinition({
    slug: "controlled-universal-game-builder-release-candidate",
    phase: "Phase 985",
    title: "Controlled Universal Game Builder Release Candidate",
    markerTitle: "Controlled universal game builder release candidate",
    safetyCopy: "Controlled universal game builder release candidate does not call models or execute adapters",
    approvalCopy: "Controlled game builder release requires explicit operator approval.",
    deniedCopy: "Denied controlled universal game builder release paths remain blocked",
    groupLabel: "Release candidate supports any supported game target with shared brain gates",
    checklistLabel: "Controlled universal game builder release checklist",
    subtitle: "Review the controlled universal game-builder release candidate without model calls, provider calls, backend adapter execution, game adapter execution, server starts, mod installs, asset downloads, deployments, packaging, or scaffolds.",
    primaryLabel: "Review universal game-builder RC",
    language: CONTROLLED_UNIVERSAL_GAME_BUILDER_RELEASE_CANDIDATE_LANGUAGE,
    fieldItems: ["release game target", "release model routing", "release backend plans", "release game adapter plans", "shared brain gates", "denied release state"],
    previewFocus: "release candidate review across supported game targets, shared brain gates, model routing, backend adapter review, game adapter review, memory, knowledge, evidence, result, audit, approval, and denied live execution state",
    routes: ["/first-universal-game-builder-candidate", "/universal-game-builder-boundary", "/game-safety-approval-plan"],
    links: [
      { href: "/first-universal-game-builder-candidate", label: "Previous Phase" },
      { href: "/universal-game-builder-boundary", label: "Boundary" },
      { href: "/game-safety-approval-plan", label: "Safety Plan" },
    ],
    nextRecommendedAction: "keep the universal game-builder release blocked until every supported game target route, model route, backend adapter plan, game adapter plan, smoke, approval gate, and denied path is reviewed by the operator",
  }),
};

export function buildUniversalGameBuilderReview(
  slug: UniversalGameBuilderReviewSlug,
  input: UniversalGameBuilderReviewPacketInput
): UniversalExecutionReviewPacket {
  return buildControlledBuilderReviewPacket(slug, input);
}

export function buildUniversalGameBuilderReviewAdvancedDetails(
  title: string,
  language: readonly string[],
  details: readonly string[]
): string {
  return buildControlledBuilderReviewAdvancedDetails(title, language, [...details, ...UNIVERSAL_GAME_BUILDER_PREVIEW_SAFETY_MARKERS]);
}

export function buildUniversalGameBuilderReviewSections(
  ...sections: DailyBetaOneReleaseReviewSection[]
): DailyBetaOneReleaseReviewSection[] {
  return buildControlledBuilderReviewSections(...sections);
}

export function buildUniversalGameBuilderReviewBoundary() {
  return buildControlledBuilderReviewBoundary();
}

export function getUniversalGameBuilderReviewDefinition(slug: UniversalGameBuilderReviewSlug) {
  return UNIVERSAL_GAME_BUILDER_DEFINITIONS[slug];
}

export function buildUniversalGameBuilderReviewPackets(slug: UniversalGameBuilderReviewSlug): UniversalExecutionReviewPacket[] {
  const definition = getUniversalGameBuilderReviewDefinition(slug);
  const sections = buildUniversalGameBuilderReviewSections(
    { label: definition.groupLabel, items: [`${definition.groupLabel}: ${sentenceList(definition.fieldItems)}.`] },
    { label: definition.checklistLabel, items: [`${definition.checklistLabel}: ${sentenceList(UNIVERSAL_GAME_BUILDER_PACKET_FIELDS)}.`] },
    { label: "Supported game targets", items: [`Supported game target examples: ${sentenceList(SUPPORTED_GAME_TARGETS)}.`] },
    { label: "Model-router policy", items: ["Cheapest capable model wins if safe; local model preferred for private game configs, server secrets, local project files, and sensitive context; paid/pro model requires quality or capability justification; specialist model requires domain-fit justification for game/server/mod/content/asset tasks."] },
    { label: "Backend and game adapter policy", items: ["Server, modpack, asset pipeline, automation, deployment, file, command, runtime, package, and scaffold proposals remain preview-only until explicit operator approval."] },
    { label: "Denied live execution state", items: [definition.deniedCopy, definition.safetyCopy] },
    { label: "Operator approval state", items: [definition.approvalCopy, "All real execution requires explicit operator approval."] }
  );

  return [
    buildUniversalGameBuilderReview(slug, {
      idHint: slug,
      status: "blocked",
      identity: definition.identity,
      sections,
      routes: [...definition.routes],
      nextRecommendedAction: `What this unlocks next: ${definition.nextRecommendedAction}`,
      advancedDetails: buildUniversalGameBuilderReviewAdvancedDetails(definition.slug, definition.language, definition.advancedDetails),
    }),
  ];
}

export function summarizeUniversalGameBuilderReview(
  title: string,
  packets: readonly UniversalExecutionReviewPacket[],
  approvalCopy: string
): string {
  return summarizeControlledBuilderReview(title, packets, approvalCopy);
}

export function summarizeUniversalGameBuilderReviewForSlug(
  slug: UniversalGameBuilderReviewSlug,
  packets: readonly UniversalExecutionReviewPacket[]
): string {
  const definition = getUniversalGameBuilderReviewDefinition(slug);
  return summarizeUniversalGameBuilderReview(definition.title, packets, definition.approvalCopy);
}

export function buildUniversalGameBuilderReviewModelForSlug(
  slug: UniversalGameBuilderReviewSlug,
  packets = buildUniversalGameBuilderReviewPackets(slug)
) {
  const definition = getUniversalGameBuilderReviewDefinition(slug);
  return buildControlledBuilderReviewModel({
    phase: definition.phase,
    title: definition.title,
    summary: summarizeUniversalGameBuilderReviewForSlug(slug, packets),
    subtitle: definition.subtitle,
    primaryLabel: definition.primaryLabel,
    anchor: definition.slug,
    plainEnglishTitle: definition.plainEnglishTitle,
    plainEnglishCopy: definition.plainEnglishCopy,
    language: [...definition.language],
    markers: [...definition.language, ...UNIVERSAL_GAME_BUILDER_PREVIEW_SAFETY_MARKERS],
    links: [...definition.links],
    packets,
    advancedSummary: `Advanced ${definition.title} details`,
    advancedDetails: [...definition.advancedDetails, ...UNIVERSAL_GAME_BUILDER_PREVIEW_SAFETY_MARKERS],
    advancedCopy: definition.advancedCopy,
    dataScope: definition.dataScope,
  });
}
