import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  ADAPTER_BACKED_EXECUTION_PREVIEW_SAFETY_MARKERS,
  buildAdapterBackedExecutionPreview,
  buildAdapterBackedExecutionPreviewAdvancedDetails,
  buildAdapterBackedExecutionPreviewBoundary,
  buildAdapterBackedExecutionPreviewModel,
  buildAdapterBackedExecutionPreviewSections,
  buildAdapterBackedExecutionPreviewStableKey as buildModelRouterProviderReadinessReviewStableKey,
  summarizeAdapterBackedExecutionPreview,
  type AdapterBackedExecutionPreviewPacketInput,
} from "../adapter-backed-execution-preview-kit";

export { buildModelRouterProviderReadinessReviewStableKey };

export type ModelRouterProviderReadinessReviewPacketInput = AdapterBackedExecutionPreviewPacketInput;

export type ModelRouterProviderReadinessReviewSlug =
  | "live-provider-readiness-boundary"
  | "approved-provider-test-packet"
  | "openai-compatible-provider-test-packet"
  | "local-model-bridge-dry-run"
  | "free-model-provider-trial-packet"
  | "paid-model-provider-trial-packet"
  | "pro-model-provider-trial-packet"
  | "specialist-model-provider-trial-packet"
  | "model-router-trial-cockpit"
  | "model-router-candidate-ranking-review"
  | "model-router-budget-decision-review"
  | "model-router-privacy-decision-review"
  | "model-router-shared-context-review"
  | "model-router-evidence-capture-review"
  | "first-controlled-provider-trial-candidate"
  | "model-router-execution-readiness-candidate";

type ModelRouterProviderReadinessReviewSectionInput = {
  label: string;
  items: string[];
};

type ModelRouterProviderReadinessReviewDefinition = {
  slug: ModelRouterProviderReadinessReviewSlug;
  phase: string;
  title: string;
  markerTitle: string;
  summarySubject: string;
  approvalCopy: string;
  subtitle: string;
  primaryLabel: string;
  anchor: string;
  plainEnglishTitle: string;
  plainEnglishCopy: string;
  identity: string;
  language: readonly string[];
  advancedDetails: readonly string[];
  sections: readonly ModelRouterProviderReadinessReviewSectionInput[];
  routes: readonly string[];
  links: readonly { href: string; label: string }[];
  nextRecommendedAction: string;
  advancedCopy: string;
  dataScope: string;
};

export const MODEL_ROUTER_PROVIDER_READINESS_REVIEW_SAFETY_MARKERS = [
  "provider readiness and model-router trial review only",
  "deterministic static review content",
  "static provider readiness preview",
  "static model-router trial preview",
  "review-only",
  "not executable from UI",
  "approval required",
  "operator-approved",
  "no network calls",
  "no provider calls",
  "no live provider tests",
  "no live provider connection tests",
  "no provider connection probes",
  "no API calls",
  "no model calls",
  "no live model calls",
  "no local model calls",
  "no local runtime probes",
  "no local bridge endpoint calls",
  "no API key reads",
  "no secret reads",
  "no credential reads",
  "no credential storage",
  "no browser credential storage",
  "no prompt sending",
  "no remote prompt transfer",
  "no project memory remote transfer",
  "no knowledge graph remote transfer",
  "no output persistence",
  "no model output persistence",
  "no automatic memory promotion",
  "no live request routing",
  "no live provider scoring",
  "no credit spend",
  "no hidden approvals",
  "no backend adapter execution",
  "no audit record writes",
  "models are workers over one shared CodexForge brain",
  ...ADAPTER_BACKED_EXECUTION_PREVIEW_SAFETY_MARKERS,
] as const;

export const LIVE_PROVIDER_READINESS_BOUNDARY_LANGUAGE = [
  "Live provider readiness boundary",
  "Live provider readiness boundary does not test live providers",
  "Provider readiness requires explicit operator approval",
  "All providers use the shared CodexForge brain",
  "Denied live provider readiness paths remain blocked",
  "Live provider readiness checklist",
  "review-only",
  "not executable from UI",
  "approval required",
] as const;

export const APPROVED_PROVIDER_TEST_PACKET_LANGUAGE = [
  "Approved provider test packet",
  "Approved provider test packet does not call providers",
  "Provider tests require explicit operator approval",
  "Provider test packets use shared CodexForge context",
  "Denied provider test paths remain blocked",
  "Approved provider test checklist",
  "review-only",
  "not executable from UI",
  "approval required",
] as const;

export const OPENAI_COMPATIBLE_PROVIDER_TEST_PACKET_LANGUAGE = [
  "OpenAI-compatible provider test packet",
  "OpenAI-compatible provider test packet does not call APIs",
  "OpenAI-compatible provider tests require explicit operator approval",
  "OpenAI-compatible providers use shared CodexForge memory and knowledge",
  "Denied OpenAI-compatible provider test paths remain blocked",
  "OpenAI-compatible provider test checklist",
  "review-only",
  "not executable from UI",
  "approval required",
] as const;

export const LOCAL_MODEL_BRIDGE_DRY_RUN_LANGUAGE = [
  "Local model bridge dry-run",
  "Local model bridge dry-run does not probe local runtimes",
  "Local model bridge use requires explicit operator approval",
  "Local model bridge uses shared CodexForge memory and knowledge",
  "Denied local model bridge paths remain blocked",
  "Local model bridge checklist",
  "review-only",
  "not executable from UI",
  "approval required",
] as const;

export const FREE_MODEL_PROVIDER_TRIAL_PACKET_LANGUAGE = [
  "Free model provider trial packet",
  "Free model provider trial packet does not call free models",
  "Free model trials require explicit operator approval",
  "Free models use shared CodexForge memory and knowledge",
  "Denied free model trial paths remain blocked",
  "Free model provider trial checklist",
  "review-only",
  "not executable from UI",
  "approval required",
] as const;

export const PAID_MODEL_PROVIDER_TRIAL_PACKET_LANGUAGE = [
  "Paid model provider trial packet",
  "Paid model provider trial packet does not call paid models",
  "Paid model trials require explicit operator approval",
  "Paid models use shared CodexForge memory and knowledge",
  "Denied paid model trial paths remain blocked",
  "Paid model provider trial checklist",
  "review-only",
  "not executable from UI",
  "approval required",
] as const;

export const PRO_MODEL_PROVIDER_TRIAL_PACKET_LANGUAGE = [
  "Pro model provider trial packet",
  "Pro model provider trial packet does not call pro models",
  "Pro model trials require explicit operator approval",
  "Pro models use shared CodexForge memory and knowledge",
  "Denied pro model trial paths remain blocked",
  "Pro model provider trial checklist",
  "review-only",
  "not executable from UI",
  "approval required",
] as const;

export const SPECIALIST_MODEL_PROVIDER_TRIAL_PACKET_LANGUAGE = [
  "Specialist model provider trial packet",
  "Specialist model provider trial packet does not call specialist models",
  "Specialist model trials require explicit operator approval",
  "Specialist models use shared CodexForge memory and knowledge",
  "Denied specialist model trial paths remain blocked",
  "Specialist model provider trial checklist",
  "review-only",
  "not executable from UI",
  "approval required",
] as const;

export const MODEL_ROUTER_TRIAL_COCKPIT_LANGUAGE = [
  "Model router trial cockpit",
  "Model router trial cockpit does not route live requests",
  "Model router trials require explicit operator approval",
  "Trial cockpit uses shared brain model criteria",
  "Denied model router trial paths remain blocked",
  "Model router trial cockpit checklist",
  "review-only",
  "not executable from UI",
  "approval required",
] as const;

export const MODEL_ROUTER_CANDIDATE_RANKING_REVIEW_LANGUAGE = [
  "Model router candidate ranking review",
  "Model router candidate ranking review does not rank live providers",
  "Candidate ranking requires explicit operator approval",
  "Ranking explains cost quality speed privacy and task fit",
  "Denied candidate ranking paths remain blocked",
  "Model ranking review checklist",
  "review-only",
  "not executable from UI",
  "approval required",
] as const;

export const MODEL_ROUTER_BUDGET_DECISION_REVIEW_LANGUAGE = [
  "Model router budget decision review",
  "Model router budget decision review does not spend credits",
  "Budget decisions require explicit operator approval",
  "Cheapest capable model is preferred when safe",
  "Denied budget decision paths remain blocked",
  "Model budget decision checklist",
  "review-only",
  "not executable from UI",
  "approval required",
] as const;

export const MODEL_ROUTER_PRIVACY_DECISION_REVIEW_LANGUAGE = [
  "Model router privacy decision review",
  "Model router privacy decision review does not send data remotely",
  "Privacy decisions require explicit operator approval",
  "Local models are preferred for sensitive shared context",
  "Denied privacy decision paths remain blocked",
  "Model privacy decision checklist",
  "review-only",
  "not executable from UI",
  "approval required",
] as const;

export const MODEL_ROUTER_SHARED_CONTEXT_REVIEW_LANGUAGE = [
  "Model router shared context review",
  "Model router shared context review does not send prompts",
  "Shared context use requires explicit operator approval",
  "All model workers receive approved shared context packets",
  "Denied shared context routing paths remain blocked",
  "Model shared context checklist",
  "review-only",
  "not executable from UI",
  "approval required",
] as const;

export const MODEL_ROUTER_EVIDENCE_CAPTURE_REVIEW_LANGUAGE = [
  "Model router evidence capture review",
  "Model router evidence capture review does not persist model outputs",
  "Evidence capture requires explicit operator approval",
  "Model outputs return through shared evidence review",
  "Denied evidence capture paths remain blocked",
  "Model evidence capture checklist",
  "review-only",
  "not executable from UI",
  "approval required",
] as const;

export const FIRST_CONTROLLED_PROVIDER_TRIAL_CANDIDATE_LANGUAGE = [
  "First controlled provider trial candidate",
  "First controlled provider trial candidate does not call providers",
  "Provider trials require explicit operator approval",
  "Trial candidates preserve shared CodexForge brain state",
  "Denied provider trial candidate paths remain blocked",
  "First controlled provider trial checklist",
  "review-only",
  "not executable from UI",
  "approval required",
] as const;

export const MODEL_ROUTER_EXECUTION_READINESS_CANDIDATE_LANGUAGE = [
  "Model router execution readiness candidate",
  "Model router execution readiness candidate does not route live model calls",
  "Model router execution requires explicit operator approval",
  "All model workers use one CodexForge brain memory and knowledge layer",
  "Denied model router execution paths remain blocked",
  "Model router execution readiness checklist",
  "review-only",
  "not executable from UI",
  "approval required",
] as const;

function sentenceList(items: readonly string[]): string {
  return items.join(", ");
}

function buildPreviewFieldLine(items: readonly string[]): string {
  return `Static preview fields: ${sentenceList(items)}.`;
}

function buildDefinition(input: {
  slug: ModelRouterProviderReadinessReviewSlug;
  phase: string;
  title: string;
  markerTitle: string;
  approvalCopy: string;
  subtitle: string;
  primaryLabel: string;
  safetyCopy: string;
  deniedCopy: string;
  groupLabel: string;
  checklistLabel: string;
  language: readonly string[];
  fieldItems: readonly string[];
  previewFocus: string;
  routes: readonly string[];
  links: readonly { href: string; label: string }[];
  nextRecommendedAction: string;
}): ModelRouterProviderReadinessReviewDefinition {
  const readinessFields =
    "Future provider readiness packets include provider class, model class, connection status placeholder, credential boundary status, approval requirement, expected cost tier, expected latency tier, privacy/locality risk, context window capability, tool support capability, model specialization, shared brain context requirement, output evidence destination, audit trail destination, and denied live-call status.";
  const efficiencyBoundary =
    "Future model-router logic is static preview only: free or cheap models are preferred for low-risk drafts and simple summaries, local models are preferred for private, sensitive, or codebase context, paid or pro models are reserved for high-quality reasoning, final review, hard coding, and complex planning, specialist models are considered for video, image, coding, research, trading, game-server, creative, and automation tasks, the cheapest capable model wins when safe, escalation happens only when capability or quality thresholds require it, and every decision explains cost, quality, speed, privacy, context, and tool support for operator review.";
  const sharedBrainBoundary =
    "Shared CodexForge brain boundary: All models share one CodexForge brain. All models share one CodexForge memory layer. All models share one CodexForge knowledge layer. All model outputs return through shared evidence/result review. Model handoff uses approved context sync packets. No model owns isolated memory. Memory promotion requires operator approval. CodexForge owns the shared brain, shared memory, shared knowledge, shared evidence/result state, shared decision log, shared model handoff packet, shared audit trail, shared operator preferences, shared safety policy, shared task state, and shared approval state.";
  const safetyBoundary =
    `${input.safetyCopy}. ${input.deniedCopy}. This surface does not call any model, test live provider connections, probe local runtimes, read API keys, store credentials, spend credits, send prompts remotely, send project memory remotely, send knowledge graph data remotely, persist model outputs, promote memory automatically, execute backend adapters, route live requests, write audit records, create hidden approvals, or mutate anything from UI. It is deterministic static review content, preview-only, review-only, smoke-covered, not executable from UI, operator-approved, and approval required before any provider readiness, provider test, provider trial, bridge use, model routing, evidence capture, or execution readiness can advance.`;
  const fieldLine = buildPreviewFieldLine(input.fieldItems);
  const unresolvedBlockers =
    "Unresolved blockers: explicit operator approval flow, credential boundary owner, provider adapter owner, local bridge owner, sandbox enforcement, denied path enforcement, cost budget policy, privacy/locality policy, capability registry review, shared context packet approval, evidence/result policy, audit boundary, validation evidence, failure-history capture, recovery owner, and operator handoff.";

  return {
    slug: input.slug,
    phase: input.phase,
    title: input.title,
    markerTitle: input.markerTitle,
    summarySubject: input.title,
    approvalCopy: input.approvalCopy,
    subtitle: input.subtitle,
    primaryLabel: input.primaryLabel,
    anchor: input.slug,
    plainEnglishTitle: `Plain-English ${input.title.toLowerCase()}`,
    plainEnglishCopy: `${input.markerTitle}. ${safetyBoundary} ${input.approvalCopy} ${fieldLine} ${readinessFields} ${sharedBrainBoundary} ${efficiencyBoundary} What this unlocks next: ${input.nextRecommendedAction}`,
    identity: `${input.title} identity: ${input.markerTitle}. ${input.safetyCopy}. ${input.approvalCopy} ${input.deniedCopy}. ${sharedBrainBoundary} This is static provider readiness and model-router trial preview only, not executable from UI, approval required, and no live provider calls or model calls are available.`,
    language: input.language,
    advancedDetails: [
      `${input.title} identity`,
      input.markerTitle,
      fieldLine,
      readinessFields,
      `${input.groupLabel}: ${sentenceList(input.fieldItems)}.`,
      `${input.checklistLabel}: approval copy, denied path copy, credential boundary, cost tier, latency tier, privacy/locality risk, context window capability, tool support capability, shared brain context requirement, evidence destination, audit destination, and operator handoff.`,
      `Preview focus: ${input.previewFocus}.`,
      safetyBoundary,
      sharedBrainBoundary,
      efficiencyBoundary,
      unresolvedBlockers,
      `What this unlocks next: ${input.nextRecommendedAction}`,
    ],
    sections: [
      { label: input.groupLabel, items: [`${input.groupLabel}: ${sentenceList(input.fieldItems)}.`] },
      { label: input.checklistLabel, items: [`${input.checklistLabel}: approval copy, denied path copy, credential boundary, cost tier, latency tier, privacy/locality risk, context window capability, tool support capability, shared brain context requirement, evidence destination, audit destination, and operator handoff.`] },
      { label: "Provider readiness packet boundary", items: [readinessFields] },
      { label: "Shared brain boundary", items: [sharedBrainBoundary] },
      { label: "Model-router efficiency boundary", items: [efficiencyBoundary] },
      { label: "Safety boundary", items: [safetyBoundary] },
      { label: "Unresolved blockers", items: [unresolvedBlockers] },
      { label: "What this unlocks next", items: [`What this unlocks next: ${input.nextRecommendedAction}`] },
    ],
    routes: input.routes,
    links: input.links,
    nextRecommendedAction: input.nextRecommendedAction,
    advancedCopy: `${input.title} is review-only and deterministic. ${safetyBoundary} ${sharedBrainBoundary} ${efficiencyBoundary}`,
    dataScope: `${input.title} uses static provider readiness and model-router trial review copy only. It reads no credentials, calls no providers, calls no models, probes no local runtimes, sends no prompts, persists no outputs, writes no audit records, and promotes no memory.`,
  };
}

const providerReadinessFields = [
  "provider class",
  "model class",
  "connection status placeholder",
  "credential boundary status",
  "approval requirement",
  "expected cost tier",
  "expected latency tier",
  "privacy/locality risk",
  "context window capability",
  "tool support capability",
  "model specialization",
  "shared brain context requirement",
  "output evidence destination",
  "audit trail destination",
  "denied live-call status",
] as const;

const routerDecisionFields = [
  "task risk tier",
  "candidate model classes",
  "selected model class placeholder",
  "cost rationale",
  "quality rationale",
  "speed rationale",
  "privacy rationale",
  "context window rationale",
  "tool support rationale",
  "shared context packet requirement",
  "evidence/result destination",
  "audit trail placeholder",
  "operator approval requirement",
] as const;

export const MODEL_ROUTER_PROVIDER_READINESS_REVIEW_DEFINITIONS: Record<
  ModelRouterProviderReadinessReviewSlug,
  ModelRouterProviderReadinessReviewDefinition
> = {
  "live-provider-readiness-boundary": buildDefinition({
    slug: "live-provider-readiness-boundary",
    phase: "Phase 906",
    title: "Live Provider Readiness Boundary",
    markerTitle: "Live provider readiness boundary",
    approvalCopy: "Provider readiness requires explicit operator approval.",
    subtitle: "Review live provider readiness boundaries without testing providers.",
    primaryLabel: "Review provider readiness",
    safetyCopy: "Live provider readiness boundary does not test live providers",
    deniedCopy: "Denied live provider readiness paths remain blocked",
    groupLabel: "All providers use the shared CodexForge brain",
    checklistLabel: "Live provider readiness checklist",
    language: LIVE_PROVIDER_READINESS_BOUNDARY_LANGUAGE,
    fieldItems: providerReadinessFields,
    previewFocus: "future provider readiness packets without connection tests, provider calls, credential reads, prompt transfer, or live readiness scoring",
    routes: ["/approved-provider-test-packet", "/model-router-trial-cockpit", "/controlled-model-use-release-candidate"],
    links: [
      { href: "/approved-provider-test-packet", label: "Provider Test Packet" },
      { href: "/model-router-trial-cockpit", label: "Router Trial Cockpit" },
      { href: "/controlled-model-use-release-candidate", label: "Phase 905 RC" },
    ],
    nextRecommendedAction: "review readiness fields, credential boundaries, shared brain context, denied live-call status, evidence destination, audit destination, and approval policy before any live provider readiness can exist.",
  }),
  "approved-provider-test-packet": buildDefinition({
    slug: "approved-provider-test-packet",
    phase: "Phase 907",
    title: "Approved Provider Test Packet",
    markerTitle: "Approved provider test packet",
    approvalCopy: "Provider tests require explicit operator approval.",
    subtitle: "Review approved provider test packet shape without calling providers.",
    primaryLabel: "Review provider test packet",
    safetyCopy: "Approved provider test packet does not call providers",
    deniedCopy: "Denied provider test paths remain blocked",
    groupLabel: "Provider test packets use shared CodexForge context",
    checklistLabel: "Approved provider test checklist",
    language: APPROVED_PROVIDER_TEST_PACKET_LANGUAGE,
    fieldItems: providerReadinessFields,
    previewFocus: "approved provider-test packets without provider calls, connection tests, API calls, credential reads, output persistence, or audit writes",
    routes: ["/live-provider-readiness-boundary", "/openai-compatible-provider-test-packet", "/model-router-trial-cockpit"],
    links: [
      { href: "/live-provider-readiness-boundary", label: "Readiness Boundary" },
      { href: "/openai-compatible-provider-test-packet", label: "OpenAI-Compatible Packet" },
      { href: "/model-router-trial-cockpit", label: "Router Trial Cockpit" },
    ],
    nextRecommendedAction: "review test packet boundaries, shared context use, credential denial, evidence destination, audit destination, and approval policy before any provider test can be proposed.",
  }),
  "openai-compatible-provider-test-packet": buildDefinition({
    slug: "openai-compatible-provider-test-packet",
    phase: "Phase 908",
    title: "OpenAI-Compatible Provider Test Packet",
    markerTitle: "OpenAI-compatible provider test packet",
    approvalCopy: "OpenAI-compatible provider tests require explicit operator approval.",
    subtitle: "Review OpenAI-compatible provider test packets without API calls.",
    primaryLabel: "Review OpenAI-compatible packet",
    safetyCopy: "OpenAI-compatible provider test packet does not call APIs",
    deniedCopy: "Denied OpenAI-compatible provider test paths remain blocked",
    groupLabel: "OpenAI-compatible providers use shared CodexForge memory and knowledge",
    checklistLabel: "OpenAI-compatible provider test checklist",
    language: OPENAI_COMPATIBLE_PROVIDER_TEST_PACKET_LANGUAGE,
    fieldItems: providerReadinessFields,
    previewFocus: "OpenAI-compatible provider packet boundaries without API calls, endpoint tests, credential reads, prompt sending, or remote memory transfer",
    routes: ["/approved-provider-test-packet", "/local-model-bridge-dry-run", "/model-router-shared-context-review"],
    links: [
      { href: "/approved-provider-test-packet", label: "Approved Test Packet" },
      { href: "/local-model-bridge-dry-run", label: "Local Bridge" },
      { href: "/model-router-shared-context-review", label: "Shared Context" },
    ],
    nextRecommendedAction: "review API-call denial, shared memory and knowledge boundaries, context packet requirements, evidence return, audit destination, and approval policy before OpenAI-compatible providers can be tested.",
  }),
  "local-model-bridge-dry-run": buildDefinition({
    slug: "local-model-bridge-dry-run",
    phase: "Phase 909",
    title: "Local Model Bridge Dry-Run",
    markerTitle: "Local model bridge dry-run",
    approvalCopy: "Local model bridge use requires explicit operator approval.",
    subtitle: "Review local model bridge dry-run packets without probing local runtimes.",
    primaryLabel: "Review local bridge dry-run",
    safetyCopy: "Local model bridge dry-run does not probe local runtimes",
    deniedCopy: "Denied local model bridge paths remain blocked",
    groupLabel: "Local model bridge uses shared CodexForge memory and knowledge",
    checklistLabel: "Local model bridge checklist",
    language: LOCAL_MODEL_BRIDGE_DRY_RUN_LANGUAGE,
    fieldItems: providerReadinessFields,
    previewFocus: "local model bridge packet shape without runtime probes, local bridge endpoint calls, local model calls, process inspection, or output persistence",
    routes: ["/openai-compatible-provider-test-packet", "/free-model-provider-trial-packet", "/model-router-privacy-decision-review"],
    links: [
      { href: "/openai-compatible-provider-test-packet", label: "OpenAI-Compatible Packet" },
      { href: "/free-model-provider-trial-packet", label: "Free Trial Packet" },
      { href: "/model-router-privacy-decision-review", label: "Privacy Decision" },
    ],
    nextRecommendedAction: "review local runtime denial, local bridge approval, private shared context handling, evidence return, audit destination, and denied execution paths before local bridge use can exist.",
  }),
  "free-model-provider-trial-packet": buildDefinition({
    slug: "free-model-provider-trial-packet",
    phase: "Phase 910",
    title: "Free Model Provider Trial Packet",
    markerTitle: "Free model provider trial packet",
    approvalCopy: "Free model trials require explicit operator approval.",
    subtitle: "Review free model provider trial packets without calling free models.",
    primaryLabel: "Review free model trial",
    safetyCopy: "Free model provider trial packet does not call free models",
    deniedCopy: "Denied free model trial paths remain blocked",
    groupLabel: "Free models use shared CodexForge memory and knowledge",
    checklistLabel: "Free model provider trial checklist",
    language: FREE_MODEL_PROVIDER_TRIAL_PACKET_LANGUAGE,
    fieldItems: providerReadinessFields,
    previewFocus: "free model trial packet boundaries without free model calls, provider calls, prompt transfer, output persistence, or automatic selection",
    routes: ["/local-model-bridge-dry-run", "/paid-model-provider-trial-packet", "/model-router-budget-decision-review"],
    links: [
      { href: "/local-model-bridge-dry-run", label: "Local Bridge" },
      { href: "/paid-model-provider-trial-packet", label: "Paid Trial Packet" },
      { href: "/model-router-budget-decision-review", label: "Budget Decision" },
    ],
    nextRecommendedAction: "review low-cost trial policy, shared brain requirements, denied free-model calls, evidence return, audit destination, and approval policy before free model trials can exist.",
  }),
  "paid-model-provider-trial-packet": buildDefinition({
    slug: "paid-model-provider-trial-packet",
    phase: "Phase 911",
    title: "Paid Model Provider Trial Packet",
    markerTitle: "Paid model provider trial packet",
    approvalCopy: "Paid model trials require explicit operator approval.",
    subtitle: "Review paid model provider trial packets without calling paid models.",
    primaryLabel: "Review paid model trial",
    safetyCopy: "Paid model provider trial packet does not call paid models",
    deniedCopy: "Denied paid model trial paths remain blocked",
    groupLabel: "Paid models use shared CodexForge memory and knowledge",
    checklistLabel: "Paid model provider trial checklist",
    language: PAID_MODEL_PROVIDER_TRIAL_PACKET_LANGUAGE,
    fieldItems: providerReadinessFields,
    previewFocus: "paid model trial packet boundaries without paid model calls, credit spend, provider calls, prompt transfer, or output persistence",
    routes: ["/free-model-provider-trial-packet", "/pro-model-provider-trial-packet", "/model-router-budget-decision-review"],
    links: [
      { href: "/free-model-provider-trial-packet", label: "Free Trial Packet" },
      { href: "/pro-model-provider-trial-packet", label: "Pro Trial Packet" },
      { href: "/model-router-budget-decision-review", label: "Budget Decision" },
    ],
    nextRecommendedAction: "review paid cost tiers, spend denial, shared brain requirements, evidence return, audit destination, and operator approval before any paid model trial can exist.",
  }),
  "pro-model-provider-trial-packet": buildDefinition({
    slug: "pro-model-provider-trial-packet",
    phase: "Phase 912",
    title: "Pro Model Provider Trial Packet",
    markerTitle: "Pro model provider trial packet",
    approvalCopy: "Pro model trials require explicit operator approval.",
    subtitle: "Review pro model provider trial packets without calling pro models.",
    primaryLabel: "Review pro model trial",
    safetyCopy: "Pro model provider trial packet does not call pro models",
    deniedCopy: "Denied pro model trial paths remain blocked",
    groupLabel: "Pro models use shared CodexForge memory and knowledge",
    checklistLabel: "Pro model provider trial checklist",
    language: PRO_MODEL_PROVIDER_TRIAL_PACKET_LANGUAGE,
    fieldItems: providerReadinessFields,
    previewFocus: "pro model trial packet boundaries without pro model calls, paid escalation, credit spend, prompt transfer, or automatic routing",
    routes: ["/paid-model-provider-trial-packet", "/specialist-model-provider-trial-packet", "/model-router-candidate-ranking-review"],
    links: [
      { href: "/paid-model-provider-trial-packet", label: "Paid Trial Packet" },
      { href: "/specialist-model-provider-trial-packet", label: "Specialist Trial Packet" },
      { href: "/model-router-candidate-ranking-review", label: "Candidate Ranking" },
    ],
    nextRecommendedAction: "review pro-quality thresholds, escalation denial, shared context requirements, evidence return, audit destination, and operator approval before pro model trials can exist.",
  }),
  "specialist-model-provider-trial-packet": buildDefinition({
    slug: "specialist-model-provider-trial-packet",
    phase: "Phase 913",
    title: "Specialist Model Provider Trial Packet",
    markerTitle: "Specialist model provider trial packet",
    approvalCopy: "Specialist model trials require explicit operator approval.",
    subtitle: "Review specialist model provider trial packets without calling specialist models.",
    primaryLabel: "Review specialist model trial",
    safetyCopy: "Specialist model provider trial packet does not call specialist models",
    deniedCopy: "Denied specialist model trial paths remain blocked",
    groupLabel: "Specialist models use shared CodexForge memory and knowledge",
    checklistLabel: "Specialist model provider trial checklist",
    language: SPECIALIST_MODEL_PROVIDER_TRIAL_PACKET_LANGUAGE,
    fieldItems: providerReadinessFields,
    previewFocus: "specialist model trial packet boundaries for video, image, coding, research, trading, game-server, creative, and automation classes without specialist calls or artifact generation",
    routes: ["/pro-model-provider-trial-packet", "/model-router-trial-cockpit", "/model-router-candidate-ranking-review"],
    links: [
      { href: "/pro-model-provider-trial-packet", label: "Pro Trial Packet" },
      { href: "/model-router-trial-cockpit", label: "Router Trial Cockpit" },
      { href: "/model-router-candidate-ranking-review", label: "Candidate Ranking" },
    ],
    nextRecommendedAction: "review specialist task classes, shared context needs, tool capability boundaries, evidence return, audit destination, and approval policy before specialist model trials can exist.",
  }),
  "model-router-trial-cockpit": buildDefinition({
    slug: "model-router-trial-cockpit",
    phase: "Phase 914",
    title: "Model Router Trial Cockpit",
    markerTitle: "Model router trial cockpit",
    approvalCopy: "Model router trials require explicit operator approval.",
    subtitle: "Review model-router trial decisions without routing live requests.",
    primaryLabel: "Review router trial cockpit",
    safetyCopy: "Model router trial cockpit does not route live requests",
    deniedCopy: "Denied model router trial paths remain blocked",
    groupLabel: "Trial cockpit uses shared brain model criteria",
    checklistLabel: "Model router trial cockpit checklist",
    language: MODEL_ROUTER_TRIAL_COCKPIT_LANGUAGE,
    fieldItems: routerDecisionFields,
    previewFocus: "first model-router cockpit decisions without live routing, provider calls, model calls, prompt transfer, audit writes, or output persistence",
    routes: ["/specialist-model-provider-trial-packet", "/model-router-candidate-ranking-review", "/model-router-budget-decision-review"],
    links: [
      { href: "/specialist-model-provider-trial-packet", label: "Specialist Trial Packet" },
      { href: "/model-router-candidate-ranking-review", label: "Candidate Ranking" },
      { href: "/model-router-budget-decision-review", label: "Budget Decision" },
    ],
    nextRecommendedAction: "review router trial criteria, shared brain context, candidate classes, denied live routing, rationale capture, evidence destination, and approval policy before router trials can exist.",
  }),
  "model-router-candidate-ranking-review": buildDefinition({
    slug: "model-router-candidate-ranking-review",
    phase: "Phase 915",
    title: "Model Router Candidate Ranking Review",
    markerTitle: "Model router candidate ranking review",
    approvalCopy: "Candidate ranking requires explicit operator approval.",
    subtitle: "Review candidate ranking explanations without ranking live providers.",
    primaryLabel: "Review candidate ranking",
    safetyCopy: "Model router candidate ranking review does not rank live providers",
    deniedCopy: "Denied candidate ranking paths remain blocked",
    groupLabel: "Ranking explains cost quality speed privacy and task fit",
    checklistLabel: "Model ranking review checklist",
    language: MODEL_ROUTER_CANDIDATE_RANKING_REVIEW_LANGUAGE,
    fieldItems: routerDecisionFields,
    previewFocus: "candidate ranking review without live provider scoring, model benchmarking, provider calls, model calls, or automatic escalation",
    routes: ["/model-router-trial-cockpit", "/model-router-budget-decision-review", "/model-router-privacy-decision-review"],
    links: [
      { href: "/model-router-trial-cockpit", label: "Router Trial Cockpit" },
      { href: "/model-router-budget-decision-review", label: "Budget Decision" },
      { href: "/model-router-privacy-decision-review", label: "Privacy Decision" },
    ],
    nextRecommendedAction: "review ranking rationale for cost, quality, speed, privacy, context, tool support, and task fit before any model-router candidate list can be approved.",
  }),
  "model-router-budget-decision-review": buildDefinition({
    slug: "model-router-budget-decision-review",
    phase: "Phase 916",
    title: "Model Router Budget Decision Review",
    markerTitle: "Model router budget decision review",
    approvalCopy: "Budget decisions require explicit operator approval.",
    subtitle: "Review model-router budget decisions without spending credits.",
    primaryLabel: "Review budget decision",
    safetyCopy: "Model router budget decision review does not spend credits",
    deniedCopy: "Denied budget decision paths remain blocked",
    groupLabel: "Cheapest capable model is preferred when safe",
    checklistLabel: "Model budget decision checklist",
    language: MODEL_ROUTER_BUDGET_DECISION_REVIEW_LANGUAGE,
    fieldItems: routerDecisionFields,
    previewFocus: "budget decision review without credit spend, paid provider calls, pro escalation, automatic routing, or audit writes",
    routes: ["/model-router-candidate-ranking-review", "/model-router-privacy-decision-review", "/model-router-shared-context-review"],
    links: [
      { href: "/model-router-candidate-ranking-review", label: "Candidate Ranking" },
      { href: "/model-router-privacy-decision-review", label: "Privacy Decision" },
      { href: "/model-router-shared-context-review", label: "Shared Context" },
    ],
    nextRecommendedAction: "review cheapest-capable selection, cost tier, quality threshold, spend denial, evidence destination, audit destination, and approval policy before budget decisions can route anything.",
  }),
  "model-router-privacy-decision-review": buildDefinition({
    slug: "model-router-privacy-decision-review",
    phase: "Phase 917",
    title: "Model Router Privacy Decision Review",
    markerTitle: "Model router privacy decision review",
    approvalCopy: "Privacy decisions require explicit operator approval.",
    subtitle: "Review privacy/locality decisions without sending data remotely.",
    primaryLabel: "Review privacy decision",
    safetyCopy: "Model router privacy decision review does not send data remotely",
    deniedCopy: "Denied privacy decision paths remain blocked",
    groupLabel: "Local models are preferred for sensitive shared context",
    checklistLabel: "Model privacy decision checklist",
    language: MODEL_ROUTER_PRIVACY_DECISION_REVIEW_LANGUAGE,
    fieldItems: routerDecisionFields,
    previewFocus: "privacy decision review without remote prompt transfer, project memory transfer, knowledge graph transfer, provider calls, or model calls",
    routes: ["/model-router-budget-decision-review", "/model-router-shared-context-review", "/model-router-evidence-capture-review"],
    links: [
      { href: "/model-router-budget-decision-review", label: "Budget Decision" },
      { href: "/model-router-shared-context-review", label: "Shared Context" },
      { href: "/model-router-evidence-capture-review", label: "Evidence Capture" },
    ],
    nextRecommendedAction: "review local-first preference, sensitive context handling, remote-transfer denial, shared context packet requirements, evidence return, and operator approval before privacy decisions can be applied.",
  }),
  "model-router-shared-context-review": buildDefinition({
    slug: "model-router-shared-context-review",
    phase: "Phase 918",
    title: "Model Router Shared Context Review",
    markerTitle: "Model router shared context review",
    approvalCopy: "Shared context use requires explicit operator approval.",
    subtitle: "Review shared context routing without sending prompts.",
    primaryLabel: "Review shared context",
    safetyCopy: "Model router shared context review does not send prompts",
    deniedCopy: "Denied shared context routing paths remain blocked",
    groupLabel: "All model workers receive approved shared context packets",
    checklistLabel: "Model shared context checklist",
    language: MODEL_ROUTER_SHARED_CONTEXT_REVIEW_LANGUAGE,
    fieldItems: routerDecisionFields,
    previewFocus: "shared context review without prompt sending, memory promotion, remote transfer, provider calls, model calls, or isolated memory ownership",
    routes: ["/model-router-privacy-decision-review", "/model-router-evidence-capture-review", "/first-controlled-provider-trial-candidate"],
    links: [
      { href: "/model-router-privacy-decision-review", label: "Privacy Decision" },
      { href: "/model-router-evidence-capture-review", label: "Evidence Capture" },
      { href: "/first-controlled-provider-trial-candidate", label: "Trial Candidate" },
    ],
    nextRecommendedAction: "review approved context packet fields, shared brain references, no-isolated-memory handling, prompt-send denial, evidence destination, audit destination, and approval policy before shared context can be routed.",
  }),
  "model-router-evidence-capture-review": buildDefinition({
    slug: "model-router-evidence-capture-review",
    phase: "Phase 919",
    title: "Model Router Evidence Capture Review",
    markerTitle: "Model router evidence capture review",
    approvalCopy: "Evidence capture requires explicit operator approval.",
    subtitle: "Review evidence capture boundaries without persisting model outputs.",
    primaryLabel: "Review evidence capture",
    safetyCopy: "Model router evidence capture review does not persist model outputs",
    deniedCopy: "Denied evidence capture paths remain blocked",
    groupLabel: "Model outputs return through shared evidence review",
    checklistLabel: "Model evidence capture checklist",
    language: MODEL_ROUTER_EVIDENCE_CAPTURE_REVIEW_LANGUAGE,
    fieldItems: routerDecisionFields,
    previewFocus: "evidence capture review without model output persistence, result storage, audit writes, memory promotion, provider calls, or model calls",
    routes: ["/model-router-shared-context-review", "/first-controlled-provider-trial-candidate", "/model-router-execution-readiness-candidate"],
    links: [
      { href: "/model-router-shared-context-review", label: "Shared Context" },
      { href: "/first-controlled-provider-trial-candidate", label: "Trial Candidate" },
      { href: "/model-router-execution-readiness-candidate", label: "Execution Readiness" },
    ],
    nextRecommendedAction: "review shared evidence destination, result review layer, output persistence denial, audit placeholder, memory promotion gate, and approval policy before evidence capture can exist.",
  }),
  "first-controlled-provider-trial-candidate": buildDefinition({
    slug: "first-controlled-provider-trial-candidate",
    phase: "Phase 920",
    title: "First Controlled Provider Trial Candidate",
    markerTitle: "First controlled provider trial candidate",
    approvalCopy: "Provider trials require explicit operator approval.",
    subtitle: "Review the first controlled provider trial candidate without calling providers.",
    primaryLabel: "Review provider trial candidate",
    safetyCopy: "First controlled provider trial candidate does not call providers",
    deniedCopy: "Denied provider trial candidate paths remain blocked",
    groupLabel: "Trial candidates preserve shared CodexForge brain state",
    checklistLabel: "First controlled provider trial checklist",
    language: FIRST_CONTROLLED_PROVIDER_TRIAL_CANDIDATE_LANGUAGE,
    fieldItems: providerReadinessFields,
    previewFocus: "first controlled provider trial candidate without provider calls, model calls, connection tests, prompt transfer, output persistence, audit writes, or automatic approval",
    routes: ["/model-router-shared-context-review", "/model-router-evidence-capture-review", "/model-router-execution-readiness-candidate"],
    links: [
      { href: "/model-router-shared-context-review", label: "Shared Context" },
      { href: "/model-router-evidence-capture-review", label: "Evidence Capture" },
      { href: "/model-router-execution-readiness-candidate", label: "Execution Readiness" },
    ],
    nextRecommendedAction: "review provider trial candidate fields, shared brain state preservation, denied provider calls, evidence return, audit destination, budget/privacy decisions, and approval policy before any controlled provider trial can run.",
  }),
  "model-router-execution-readiness-candidate": buildDefinition({
    slug: "model-router-execution-readiness-candidate",
    phase: "Phase 921",
    title: "Model Router Execution Readiness Candidate",
    markerTitle: "Model router execution readiness candidate",
    approvalCopy: "Model router execution requires explicit operator approval.",
    subtitle: "Review model-router execution readiness without routing live model calls.",
    primaryLabel: "Review execution readiness",
    safetyCopy: "Model router execution readiness candidate does not route live model calls",
    deniedCopy: "Denied model router execution paths remain blocked",
    groupLabel: "All model workers use one CodexForge brain memory and knowledge layer",
    checklistLabel: "Model router execution readiness checklist",
    language: MODEL_ROUTER_EXECUTION_READINESS_CANDIDATE_LANGUAGE,
    fieldItems: routerDecisionFields,
    previewFocus: "model-router execution readiness candidate without live routing, model calls, provider calls, prompt sending, backend adapter execution, output persistence, memory promotion, or audit writes",
    routes: ["/model-router-evidence-capture-review", "/first-controlled-provider-trial-candidate", "/controlled-model-use-release-candidate"],
    links: [
      { href: "/model-router-evidence-capture-review", label: "Evidence Capture" },
      { href: "/first-controlled-provider-trial-candidate", label: "Trial Candidate" },
      { href: "/controlled-model-use-release-candidate", label: "Phase 905 RC" },
    ],
    nextRecommendedAction: "keep model-router execution blocked until provider readiness, approved context packets, budget/privacy decisions, evidence capture, audit destination, denied paths, and explicit operator approval are reviewed together.",
  }),
};

export function buildModelRouterProviderReadinessReview(
  slug: ModelRouterProviderReadinessReviewSlug,
  input: ModelRouterProviderReadinessReviewPacketInput
): UniversalExecutionReviewPacket {
  return buildAdapterBackedExecutionPreview(slug, input);
}

export function buildModelRouterProviderReadinessReviewAdvancedDetails(
  title: string,
  language: readonly string[],
  details: readonly string[]
): string {
  return buildAdapterBackedExecutionPreviewAdvancedDetails(title, language, [...details, ...MODEL_ROUTER_PROVIDER_READINESS_REVIEW_SAFETY_MARKERS]);
}

export function buildModelRouterProviderReadinessReviewSections(
  ...sections: ModelRouterProviderReadinessReviewSectionInput[]
): ReturnType<typeof buildAdapterBackedExecutionPreviewSections> {
  return buildAdapterBackedExecutionPreviewSections(...sections);
}

export function buildModelRouterProviderReadinessReviewBoundary() {
  return buildAdapterBackedExecutionPreviewBoundary();
}

export function getModelRouterProviderReadinessReviewDefinition(slug: ModelRouterProviderReadinessReviewSlug) {
  return MODEL_ROUTER_PROVIDER_READINESS_REVIEW_DEFINITIONS[slug];
}

export function buildModelRouterProviderReadinessReviewPackets(slug: ModelRouterProviderReadinessReviewSlug): UniversalExecutionReviewPacket[] {
  const definition = getModelRouterProviderReadinessReviewDefinition(slug);
  return [
    buildModelRouterProviderReadinessReview(slug, {
      idHint: slug,
      status: "blocked",
      identity: definition.identity,
      sections: buildModelRouterProviderReadinessReviewSections(...definition.sections),
      routes: [...definition.routes],
      nextRecommendedAction: definition.nextRecommendedAction,
      advancedDetails: buildModelRouterProviderReadinessReviewAdvancedDetails(definition.anchor, definition.language, definition.advancedDetails),
    }),
  ];
}

export function summarizeModelRouterProviderReadinessReview(
  title: string,
  packets: readonly UniversalExecutionReviewPacket[],
  approvalCopy: string
): string {
  return summarizeAdapterBackedExecutionPreview(title, packets, approvalCopy);
}

export function summarizeModelRouterProviderReadinessReviewForSlug(
  slug: ModelRouterProviderReadinessReviewSlug,
  packets: readonly UniversalExecutionReviewPacket[]
): string {
  const definition = getModelRouterProviderReadinessReviewDefinition(slug);
  return summarizeModelRouterProviderReadinessReview(definition.title, packets, definition.approvalCopy);
}

export function buildModelRouterProviderReadinessReviewModelForSlug(
  slug: ModelRouterProviderReadinessReviewSlug,
  packets = buildModelRouterProviderReadinessReviewPackets(slug)
) {
  const definition = getModelRouterProviderReadinessReviewDefinition(slug);
  return buildAdapterBackedExecutionPreviewModel({
    phase: definition.phase,
    title: definition.title,
    summarySubject: definition.summarySubject,
    approvalCopy: definition.approvalCopy,
    subtitle: definition.subtitle,
    primaryLabel: definition.primaryLabel,
    anchor: definition.anchor,
    plainEnglishTitle: definition.plainEnglishTitle,
    plainEnglishCopy: definition.plainEnglishCopy,
    language: definition.language,
    advancedDetails: [...definition.advancedDetails, ...MODEL_ROUTER_PROVIDER_READINESS_REVIEW_SAFETY_MARKERS],
    links: definition.links,
    packets,
    advancedCopy: definition.advancedCopy,
    dataScope: definition.dataScope,
  });
}
