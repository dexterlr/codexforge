import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import {
  ADAPTER_BACKED_EXECUTION_PREVIEW_SAFETY_MARKERS,
  buildAdapterBackedExecutionPreview,
  buildAdapterBackedExecutionPreviewAdvancedDetails,
  buildAdapterBackedExecutionPreviewBoundary,
  buildAdapterBackedExecutionPreviewModel,
  buildAdapterBackedExecutionPreviewSections,
  buildAdapterBackedExecutionPreviewStableKey as buildBackendDryRunModelRouterPreviewStableKey,
  summarizeAdapterBackedExecutionPreview,
  type AdapterBackedExecutionPreviewPacketInput,
} from "../adapter-backed-execution-preview-kit";

export { buildBackendDryRunModelRouterPreviewStableKey };

export type BackendDryRunModelRouterPreviewPacketInput = AdapterBackedExecutionPreviewPacketInput;

export type BackendDryRunModelRouterPreviewSlug =
  | "backend-adapter-dry-run-packet-inventory"
  | "file-write-backend-dry-run-packet"
  | "command-runner-backend-dry-run-packet"
  | "local-runtime-backend-dry-run-packet"
  | "evidence-store-backend-dry-run-packet"
  | "result-store-backend-dry-run-packet"
  | "recovery-backend-dry-run-packet"
  | "packaging-backend-dry-run-packet"
  | "project-scaffold-backend-dry-run-packet"
  | "model-router-selection-preview"
  | "model-capability-registry-preview"
  | "model-cost-quality-policy-preview"
  | "model-privacy-locality-policy-preview"
  | "model-fallback-chain-preview"
  | "model-selection-approval-packet"
  | "backend-dry-run-model-router-candidate"
  | "shared-model-brain-context-contract"
  | "shared-model-memory-access-preview"
  | "shared-model-knowledge-access-preview"
  | "model-task-classification-matrix"
  | "model-efficiency-scoring-preview"
  | "free-model-routing-policy-preview"
  | "paid-model-routing-policy-preview"
  | "pro-model-routing-policy-preview"
  | "local-model-routing-policy-preview"
  | "specialist-model-routing-policy-preview"
  | "model-continuity-handoff-packet"
  | "cross-model-result-comparison-preview"
  | "cross-model-failure-recovery-preview"
  | "model-spend-guardrail-preview"
  | "model-routing-audit-trail-preview"
  | "shared-brain-model-router-candidate";

type BackendDryRunModelRouterPreviewSectionInput = {
  label: string;
  items: string[];
};

type BackendDryRunModelRouterPreviewDefinition = {
  slug: BackendDryRunModelRouterPreviewSlug;
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
  sections: readonly BackendDryRunModelRouterPreviewSectionInput[];
  routes: readonly string[];
  links: readonly { href: string; label: string }[];
  nextRecommendedAction: string;
  advancedCopy: string;
  dataScope: string;
};

export const BACKEND_DRY_RUN_MODEL_ROUTER_PREVIEW_SAFETY_MARKERS = [
  "backend dry-run/model-router preview only",
  "deterministic static review content",
  "static backend dry-run/model-router preview",
  "review-only",
  "not executable from UI",
  "approval required",
  "operator-approved",
  "clear denied-path copy",
  "clear operator approval copy",
  "no backend dry-run execution",
  "no backend adapter run",
  "no backend adapter execution",
  "no dry-run packet execution",
  "no file write/delete/mutation",
  "no command execution",
  "no local runtime start/stop",
  "no evidence capture/ingestion/storage",
  "no output/result storage or reuse",
  "no recovery/retry trigger",
  "no package/export/write behavior",
  "no project scaffold creation",
  "no provider/model calls",
  "no local model calls",
  "no model calls",
  "no network calls",
  "no secret reads",
  "no API key reads",
  "no prompt sending",
  "no paid model calls",
  "no free model calls",
  "no remote model calls",
  "no pro model calls",
  "no specialist model calls",
  "no specialist image/video/coding/research/trading/voice/game-server model calls",
  "no live model routing",
  "no live request routing",
  "no automatic routing",
  "no automatic memory promotion",
  "no live memory reads",
  "no live knowledge queries",
  "no live provider scoring",
  "no live prompt transfer",
  "no audit record writes",
  "model-router selection remains preview-only",
  "operator approval required before provider spend or execution",
  "paid free local and specialist models remain preview-only",
  "future bounded model-router considers task domain, required quality, required speed, cost budget, free vs paid preference, pro/high-quality preference, local/privacy preference, context window size, tool/function support, multimodal support, coding ability, research/citation ability, video/image generation ability, trading/reasoning ability, game-server/domain expertise, historical reliability, failure history, operator preference, and approval policy",
  "shared CodexForge brain layer includes shared task context, shared project memory, shared knowledge graph, shared evidence store, shared result store, shared decision log, shared model handoff packet, shared audit trail, shared operator preferences, shared safety policy, shared task state, and shared approval state",
  "Models are workers not isolated brains",
  "no approval shortcuts",
  "no hidden approvals",
  ...ADAPTER_BACKED_EXECUTION_PREVIEW_SAFETY_MARKERS,
] as const;

export const BACKEND_ADAPTER_DRY_RUN_PACKET_INVENTORY_LANGUAGE = [
  "Backend adapter dry-run packet inventory",
  "Backend adapter dry-run packet inventory does not execute dry-runs",
  "Dry-run packets require explicit operator approval",
  "Denied dry-run packet paths remain blocked",
  "Dry-run packet groups",
  "Backend dry-run checklist",
  "static backend dry-run/model-router preview",
  "review-only",
  "not executable from UI",
  "approval required",
  "operator-approved",
] as const;

export const FILE_WRITE_BACKEND_DRY_RUN_PACKET_LANGUAGE = [
  "File write backend dry-run packet",
  "File write backend dry-run packet does not write files",
  "File write dry-runs require explicit operator approval",
  "Denied file write dry-run paths remain blocked",
  "File write dry-run groups",
  "File write dry-run checklist",
  "static backend dry-run/model-router preview",
  "review-only",
  "not executable from UI",
  "approval required",
  "operator-approved",
] as const;

export const COMMAND_RUNNER_BACKEND_DRY_RUN_PACKET_LANGUAGE = [
  "Command runner backend dry-run packet",
  "Command runner backend dry-run packet does not execute commands",
  "Command dry-runs require explicit operator approval",
  "Denied command dry-run paths remain blocked",
  "Command dry-run groups",
  "Command dry-run checklist",
  "static backend dry-run/model-router preview",
  "review-only",
  "not executable from UI",
  "approval required",
  "operator-approved",
] as const;

export const LOCAL_RUNTIME_BACKEND_DRY_RUN_PACKET_LANGUAGE = [
  "Local runtime backend dry-run packet",
  "Local runtime backend dry-run packet does not start runtimes",
  "Runtime dry-runs require explicit operator approval",
  "Denied runtime dry-run paths remain blocked",
  "Runtime dry-run groups",
  "Runtime dry-run checklist",
  "static backend dry-run/model-router preview",
  "review-only",
  "not executable from UI",
  "approval required",
  "operator-approved",
] as const;

export const EVIDENCE_STORE_BACKEND_DRY_RUN_PACKET_LANGUAGE = [
  "Evidence store backend dry-run packet",
  "Evidence store backend dry-run packet does not persist evidence",
  "Evidence dry-runs require explicit operator approval",
  "Denied evidence dry-run paths remain blocked",
  "Evidence dry-run groups",
  "Evidence dry-run checklist",
  "static backend dry-run/model-router preview",
  "review-only",
  "not executable from UI",
  "approval required",
  "operator-approved",
] as const;

export const RESULT_STORE_BACKEND_DRY_RUN_PACKET_LANGUAGE = [
  "Result store backend dry-run packet",
  "Result store backend dry-run packet does not persist results",
  "Result dry-runs require explicit operator approval",
  "Denied result dry-run paths remain blocked",
  "Result dry-run groups",
  "Result dry-run checklist",
  "static backend dry-run/model-router preview",
  "review-only",
  "not executable from UI",
  "approval required",
  "operator-approved",
] as const;

export const RECOVERY_BACKEND_DRY_RUN_PACKET_LANGUAGE = [
  "Recovery backend dry-run packet",
  "Recovery backend dry-run packet does not trigger recovery",
  "Recovery dry-runs require explicit operator approval",
  "Denied recovery dry-run paths remain blocked",
  "Recovery dry-run groups",
  "Recovery dry-run checklist",
  "static backend dry-run/model-router preview",
  "review-only",
  "not executable from UI",
  "approval required",
  "operator-approved",
] as const;

export const PACKAGING_BACKEND_DRY_RUN_PACKET_LANGUAGE = [
  "Packaging backend dry-run packet",
  "Packaging backend dry-run packet does not package or export",
  "Packaging dry-runs require explicit operator approval",
  "Denied packaging dry-run paths remain blocked",
  "Packaging dry-run groups",
  "Packaging dry-run checklist",
  "static backend dry-run/model-router preview",
  "review-only",
  "not executable from UI",
  "approval required",
  "operator-approved",
] as const;

export const PROJECT_SCAFFOLD_BACKEND_DRY_RUN_PACKET_LANGUAGE = [
  "Project scaffold backend dry-run packet",
  "Project scaffold backend dry-run packet does not create projects",
  "Project scaffold dry-runs require explicit operator approval",
  "Denied project scaffold dry-run paths remain blocked",
  "Project scaffold dry-run groups",
  "Project scaffold dry-run checklist",
  "static backend dry-run/model-router preview",
  "review-only",
  "not executable from UI",
  "approval required",
  "operator-approved",
] as const;

export const MODEL_ROUTER_SELECTION_PREVIEW_LANGUAGE = [
  "Model router selection preview",
  "Model router selection preview does not call models",
  "Model routing requires explicit operator approval",
  "Paid free local and specialist models remain preview-only",
  "Model selection groups",
  "Model router checklist",
  "static backend dry-run/model-router preview",
  "review-only",
  "not executable from UI",
  "approval required",
  "operator-approved",
] as const;

export const MODEL_CAPABILITY_REGISTRY_PREVIEW_LANGUAGE = [
  "Model capability registry preview",
  "Model capability registry preview does not call models",
  "Capability registration requires explicit operator approval",
  "Denied capability shortcuts remain blocked",
  "Model capability groups",
  "Capability registry checklist",
  "static backend dry-run/model-router preview",
  "review-only",
  "not executable from UI",
  "approval required",
  "operator-approved",
] as const;

export const MODEL_COST_QUALITY_POLICY_PREVIEW_LANGUAGE = [
  "Model cost quality policy preview",
  "Model cost quality policy preview does not spend credits",
  "Paid model usage requires explicit operator approval",
  "Cost quality routing remains preview-only",
  "Cost quality policy groups",
  "Cost quality checklist",
  "static backend dry-run/model-router preview",
  "review-only",
  "not executable from UI",
  "approval required",
  "operator-approved",
] as const;

export const MODEL_PRIVACY_LOCALITY_POLICY_PREVIEW_LANGUAGE = [
  "Model privacy locality policy preview",
  "Model privacy locality policy preview does not send data remotely",
  "Remote model use requires explicit operator approval",
  "Local-first routing remains operator-controlled",
  "Privacy locality groups",
  "Privacy locality checklist",
  "static backend dry-run/model-router preview",
  "review-only",
  "not executable from UI",
  "approval required",
  "operator-approved",
] as const;

export const MODEL_FALLBACK_CHAIN_PREVIEW_LANGUAGE = [
  "Model fallback chain preview",
  "Model fallback chain preview does not call fallback models",
  "Fallback model use requires explicit operator approval",
  "Denied fallback paths remain blocked",
  "Model fallback groups",
  "Fallback chain checklist",
  "static backend dry-run/model-router preview",
  "review-only",
  "not executable from UI",
  "approval required",
  "operator-approved",
] as const;

export const MODEL_SELECTION_APPROVAL_PACKET_LANGUAGE = [
  "Model selection approval packet",
  "Model selection approval packet does not approve model calls",
  "Model selection requires explicit operator approval",
  "Denied model approval shortcuts remain blocked",
  "Model approval groups",
  "Model approval checklist",
  "static backend dry-run/model-router preview",
  "review-only",
  "not executable from UI",
  "approval required",
  "operator-approved",
] as const;

export const BACKEND_DRY_RUN_MODEL_ROUTER_CANDIDATE_LANGUAGE = [
  "Backend dry-run model router candidate",
  "Backend dry-run model router candidate does not execute adapters or call models",
  "Backend dry-run and model routing require explicit operator approval",
  "Denied candidate execution paths remain blocked",
  "Backend model router candidate groups",
  "Candidate readiness checklist",
  "static backend dry-run/model-router preview",
  "review-only",
  "not executable from UI",
  "approval required",
  "operator-approved",
] as const;

export const SHARED_MODEL_BRAIN_CONTEXT_CONTRACT_LANGUAGE = [
  "Shared model brain context contract",
  "Shared model brain context contract does not call models",
  "CodexForge owns the shared brain context",
  "Models are workers not isolated brains",
  "Shared context requires explicit operator approval",
  "Shared brain context checklist",
  "static backend dry-run/model-router preview",
  "review-only",
  "not executable from UI",
  "approval required",
  "operator-approved",
] as const;

export const SHARED_MODEL_MEMORY_ACCESS_PREVIEW_LANGUAGE = [
  "Shared model memory access preview",
  "Shared model memory access preview does not read live memory",
  "Memory access requires explicit operator approval",
  "Models share one CodexForge memory layer",
  "Denied memory access paths remain blocked",
  "Shared memory checklist",
  "static backend dry-run/model-router preview",
  "review-only",
  "not executable from UI",
  "approval required",
  "operator-approved",
] as const;

export const SHARED_MODEL_KNOWLEDGE_ACCESS_PREVIEW_LANGUAGE = [
  "Shared model knowledge access preview",
  "Shared model knowledge access preview does not query live knowledge",
  "Knowledge access requires explicit operator approval",
  "Models share one CodexForge knowledge layer",
  "Denied knowledge access paths remain blocked",
  "Shared knowledge checklist",
  "static backend dry-run/model-router preview",
  "review-only",
  "not executable from UI",
  "approval required",
  "operator-approved",
] as const;

export const MODEL_TASK_CLASSIFICATION_MATRIX_LANGUAGE = [
  "Model task classification matrix",
  "Model task classification matrix does not route live requests",
  "Task classification requires explicit operator approval",
  "Task domains drive model selection",
  "Denied classification shortcuts remain blocked",
  "Task classification checklist",
  "static backend dry-run/model-router preview",
  "review-only",
  "not executable from UI",
  "approval required",
  "operator-approved",
] as const;

export const MODEL_EFFICIENCY_SCORING_PREVIEW_LANGUAGE = [
  "Model efficiency scoring preview",
  "Model efficiency scoring preview does not score live providers",
  "Efficiency scoring requires explicit operator approval",
  "Cost speed quality privacy and context are scored together",
  "Denied scoring shortcuts remain blocked",
  "Efficiency scoring checklist",
  "static backend dry-run/model-router preview",
  "review-only",
  "not executable from UI",
  "approval required",
  "operator-approved",
] as const;

export const FREE_MODEL_ROUTING_POLICY_PREVIEW_LANGUAGE = [
  "Free model routing policy preview",
  "Free model routing policy preview does not call free models",
  "Free model routing requires explicit operator approval",
  "Free models share the same CodexForge brain",
  "Denied free model routes remain blocked",
  "Free model policy checklist",
  "static backend dry-run/model-router preview",
  "review-only",
  "not executable from UI",
  "approval required",
  "operator-approved",
] as const;

export const PAID_MODEL_ROUTING_POLICY_PREVIEW_LANGUAGE = [
  "Paid model routing policy preview",
  "Paid model routing policy preview does not call paid models",
  "Paid model usage requires explicit operator approval",
  "Paid models share the same CodexForge brain",
  "Denied paid model routes remain blocked",
  "Paid model policy checklist",
  "static backend dry-run/model-router preview",
  "review-only",
  "not executable from UI",
  "approval required",
  "operator-approved",
] as const;

export const PRO_MODEL_ROUTING_POLICY_PREVIEW_LANGUAGE = [
  "Pro model routing policy preview",
  "Pro model routing policy preview does not call pro models",
  "Pro model usage requires explicit operator approval",
  "Pro models share the same CodexForge brain",
  "Denied pro model routes remain blocked",
  "Pro model policy checklist",
  "static backend dry-run/model-router preview",
  "review-only",
  "not executable from UI",
  "approval required",
  "operator-approved",
] as const;

export const LOCAL_MODEL_ROUTING_POLICY_PREVIEW_LANGUAGE = [
  "Local model routing policy preview",
  "Local model routing policy preview does not call local models",
  "Local model usage requires explicit operator approval",
  "Local models share the same CodexForge brain",
  "Denied local model routes remain blocked",
  "Local model policy checklist",
  "static backend dry-run/model-router preview",
  "review-only",
  "not executable from UI",
  "approval required",
  "operator-approved",
] as const;

export const SPECIALIST_MODEL_ROUTING_POLICY_PREVIEW_LANGUAGE = [
  "Specialist model routing policy preview",
  "Specialist model routing policy preview does not call specialist models",
  "Specialist model usage requires explicit operator approval",
  "Specialist models share the same CodexForge brain",
  "Denied specialist model routes remain blocked",
  "Specialist model policy checklist",
  "static backend dry-run/model-router preview",
  "review-only",
  "not executable from UI",
  "approval required",
  "operator-approved",
] as const;

export const MODEL_CONTINUITY_HANDOFF_PACKET_LANGUAGE = [
  "Model continuity handoff packet",
  "Model continuity handoff packet does not transfer live prompts",
  "Model handoff requires explicit operator approval",
  "Models can pick up from shared task memory",
  "Denied model handoff paths remain blocked",
  "Continuity handoff checklist",
  "static backend dry-run/model-router preview",
  "review-only",
  "not executable from UI",
  "approval required",
  "operator-approved",
] as const;

export const CROSS_MODEL_RESULT_COMPARISON_PREVIEW_LANGUAGE = [
  "Cross-model result comparison preview",
  "Cross-model result comparison preview does not call models",
  "Cross-model comparison requires explicit operator approval",
  "Model results compare against shared evidence and task state",
  "Denied comparison paths remain blocked",
  "Cross-model comparison checklist",
  "static backend dry-run/model-router preview",
  "review-only",
  "not executable from UI",
  "approval required",
  "operator-approved",
] as const;

export const CROSS_MODEL_FAILURE_RECOVERY_PREVIEW_LANGUAGE = [
  "Cross-model failure recovery preview",
  "Cross-model failure recovery preview does not retry models",
  "Model fallback and recovery require explicit operator approval",
  "Recovery uses shared failure history",
  "Denied model recovery paths remain blocked",
  "Cross-model recovery checklist",
  "static backend dry-run/model-router preview",
  "review-only",
  "not executable from UI",
  "approval required",
  "operator-approved",
] as const;

export const MODEL_SPEND_GUARDRAIL_PREVIEW_LANGUAGE = [
  "Model spend guardrail preview",
  "Model spend guardrail preview does not spend credits",
  "Model spend requires explicit operator approval",
  "Paid model budgets remain operator-controlled",
  "Denied spend paths remain blocked",
  "Model spend checklist",
  "static backend dry-run/model-router preview",
  "review-only",
  "not executable from UI",
  "approval required",
  "operator-approved",
] as const;

export const MODEL_ROUTING_AUDIT_TRAIL_PREVIEW_LANGUAGE = [
  "Model routing audit trail preview",
  "Model routing audit trail preview does not write audit records",
  "Model routing audit writes require explicit operator approval",
  "Routing decisions reference shared brain state",
  "Denied routing audit paths remain blocked",
  "Model routing audit checklist",
  "static backend dry-run/model-router preview",
  "review-only",
  "not executable from UI",
  "approval required",
  "operator-approved",
] as const;

export const SHARED_BRAIN_MODEL_ROUTER_CANDIDATE_LANGUAGE = [
  "Shared brain model router candidate",
  "Shared brain model router candidate does not route live model calls",
  "Shared brain model routing requires explicit operator approval",
  "All models use one CodexForge brain memory and knowledge layer",
  "Denied shared brain routing paths remain blocked",
  "Shared brain router candidate checklist",
  "static backend dry-run/model-router preview",
  "review-only",
  "not executable from UI",
  "approval required",
  "operator-approved",
] as const;

function sentenceList(items: readonly string[]): string {
  return items.join(", ");
}

function buildPreviewFieldLine(items: readonly string[]): string {
  return `Static preview fields: ${sentenceList(items)}.`;
}

function buildDefinition(input: {
  slug: BackendDryRunModelRouterPreviewSlug;
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
}): BackendDryRunModelRouterPreviewDefinition {
  const fieldLine = buildPreviewFieldLine(input.fieldItems);
  const modelRouterBoundary =
    "Future bounded model-router representation: static candidates cover paid, free, pro, local, remote, and specialist AI models across task domain, required quality, required speed, cost budget, free vs paid preference, pro/high-quality preference, local/privacy preference, context window size, tool/function support, multimodal support, coding ability, research/citation ability, video/image generation ability, trading/reasoning ability, game-server/domain expertise, historical reliability, failure history, operator preference, and approval policy. No live routing or model calls are implemented.";
  const sharedBrainBoundary =
    "Shared CodexForge brain boundary: all models are workers over one CodexForge-owned layer for shared task context, shared project memory, shared knowledge graph, shared evidence store, shared result store, shared decision log, shared model handoff packet, shared audit trail, shared operator preferences, shared safety policy, shared task state, and shared approval state. Models are workers not isolated brains.";
  const safetyBoundary =
    `${input.safetyCopy}. ${input.deniedCopy}. This surface does not execute backend dry-runs, run adapters, write files, execute commands, start local runtimes, store evidence or results, trigger recovery, package/export, create projects, call providers/models/connectors, route live requests, call free models, call paid models, call pro models, call local models, call remote models, call specialist image/video/coding/research/trading/voice/game-server models, score live providers, read live memory, query live knowledge, transfer live prompts, write audit records, spend credits, use browser/desktop/camera/voice/video tools, read API keys or secrets, write credentials, persist outputs, promote memory automatically, approve automatically, route automatically, or mutate anything from UI. It is deterministic static review content, preview-only, review-only, not executable from UI, operator-approved, and approval required before provider spend or execution.`;
  const unresolvedBlockers =
    "Unresolved blockers: explicit operator approval flow, model-router owner, adapter owner, sandbox enforcement, denied path enforcement, cost budget policy, privacy/locality policy, capability registry review, fallback denial behavior, failure-history capture, audit boundary, evidence/result policy, validation evidence, recovery owner, and operator handoff.";

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
    plainEnglishCopy: `${input.markerTitle}. ${safetyBoundary} ${input.approvalCopy} ${fieldLine} ${sharedBrainBoundary} ${modelRouterBoundary} What this unlocks next: ${input.nextRecommendedAction}`,
    identity: `${input.title} identity: ${input.markerTitle}. ${input.safetyCopy}. ${input.approvalCopy} ${input.deniedCopy}. ${sharedBrainBoundary} This is static backend dry-run/model-router preview only, not executable from UI, approval required, and no live adapter calls or model calls are available.`,
    language: input.language,
    advancedDetails: [
      `${input.title} identity`,
      input.markerTitle,
      fieldLine,
      `${input.groupLabel}: ${sentenceList(input.fieldItems)}.`,
      `${input.checklistLabel}: approval copy, denied path copy, sandbox boundary, cost/privacy policy note, audit placeholder, evidence/result placeholder, fallback note, validation handoff, and operator handoff.`,
      `Preview focus: ${input.previewFocus}.`,
      safetyBoundary,
      sharedBrainBoundary,
      modelRouterBoundary,
      unresolvedBlockers,
      `What this unlocks next: ${input.nextRecommendedAction}`,
    ],
    sections: [
      { label: input.groupLabel, items: [`${input.groupLabel}: ${sentenceList(input.fieldItems)}.`] },
      { label: input.checklistLabel, items: [`${input.checklistLabel}: approval copy, denied path copy, sandbox boundary, cost/privacy policy note, audit placeholder, evidence/result placeholder, fallback note, validation handoff, and operator handoff.`] },
      { label: "Safety boundary", items: [safetyBoundary] },
      { label: "Shared brain boundary", items: [sharedBrainBoundary] },
      { label: "Model-router boundary", items: [modelRouterBoundary] },
      { label: "Unresolved blockers", items: [unresolvedBlockers] },
      { label: "What this unlocks next", items: [`What this unlocks next: ${input.nextRecommendedAction}`] },
    ],
    routes: input.routes,
    links: input.links,
    nextRecommendedAction: `What this unlocks next: ${input.nextRecommendedAction}`,
    advancedCopy: `advanced ${input.slug} details collapsed/secondary. This route is static backend dry-run/model-router preview only, preview-only, not executable from UI, and ${input.safetyCopy.toLowerCase()}.`,
    dataScope: `${input.slug} static backend dry-run/model-router preview surface`,
  };
}

export const BACKEND_DRY_RUN_MODEL_ROUTER_PREVIEW_DEFINITIONS: Record<BackendDryRunModelRouterPreviewSlug, BackendDryRunModelRouterPreviewDefinition> = {
  "backend-adapter-dry-run-packet-inventory": buildDefinition({
    slug: "backend-adapter-dry-run-packet-inventory",
    phase: "Phase 826",
    title: "Backend Adapter Dry-Run Packet Inventory",
    markerTitle: "Backend adapter dry-run packet inventory",
    approvalCopy: "Dry-run packets require explicit operator approval.",
    subtitle: "Review backend adapter dry-run packets without executing dry-runs.",
    primaryLabel: "Review dry-run packet inventory",
    safetyCopy: "Backend adapter dry-run packet inventory does not execute dry-runs",
    deniedCopy: "Denied dry-run packet paths remain blocked",
    groupLabel: "Dry-run packet groups",
    checklistLabel: "Backend dry-run checklist",
    language: BACKEND_ADAPTER_DRY_RUN_PACKET_INVENTORY_LANGUAGE,
    fieldItems: ["adapter family", "packet type", "approval state", "sandbox state", "audit placeholder", "denied path reason"],
    previewFocus: "packet inventory boundaries, denied dry-run paths, approval state, sandbox state, and audit placeholders",
    routes: ["/file-write-backend-dry-run-packet", "/model-router-selection-preview", "/backend-dry-run-model-router-candidate"],
    links: [
      { href: "/file-write-backend-dry-run-packet", label: "File dry-run packet" },
      { href: "/model-router-selection-preview", label: "Model router selection" },
      { href: "/backend-dry-run-model-router-candidate", label: "Candidate" },
    ],
    nextRecommendedAction: "review each adapter dry-run packet before any backend dry-run behavior is considered.",
  }),
  "file-write-backend-dry-run-packet": buildDefinition({
    slug: "file-write-backend-dry-run-packet",
    phase: "Phase 827",
    title: "File Write Backend Dry-Run Packet",
    markerTitle: "File write backend dry-run packet",
    approvalCopy: "File write dry-runs require explicit operator approval.",
    subtitle: "Review the file write backend dry-run packet without writing files.",
    primaryLabel: "Review file write dry-run",
    safetyCopy: "File write backend dry-run packet does not write files",
    deniedCopy: "Denied file write dry-run paths remain blocked",
    groupLabel: "File write dry-run groups",
    checklistLabel: "File write dry-run checklist",
    language: FILE_WRITE_BACKEND_DRY_RUN_PACKET_LANGUAGE,
    fieldItems: ["target path preview", "operation kind", "diff placeholder", "rollback note", "approval state", "denied path reason"],
    previewFocus: "file-write packet shape, target path preview, diff placeholder, rollback note, and denied file-write paths",
    routes: ["/backend-adapter-dry-run-packet-inventory", "/command-runner-backend-dry-run-packet", "/model-selection-approval-packet"],
    links: [
      { href: "/backend-adapter-dry-run-packet-inventory", label: "Packet inventory" },
      { href: "/command-runner-backend-dry-run-packet", label: "Command dry-run" },
      { href: "/model-selection-approval-packet", label: "Model approval" },
    ],
    nextRecommendedAction: "lock target path, diff, rollback, audit, evidence, and denial policy before any file write dry-run execution exists.",
  }),
  "command-runner-backend-dry-run-packet": buildDefinition({
    slug: "command-runner-backend-dry-run-packet",
    phase: "Phase 828",
    title: "Command Runner Backend Dry-Run Packet",
    markerTitle: "Command runner backend dry-run packet",
    approvalCopy: "Command dry-runs require explicit operator approval.",
    subtitle: "Review the command runner backend dry-run packet without executing commands.",
    primaryLabel: "Review command dry-run",
    safetyCopy: "Command runner backend dry-run packet does not execute commands",
    deniedCopy: "Denied command dry-run paths remain blocked",
    groupLabel: "Command dry-run groups",
    checklistLabel: "Command dry-run checklist",
    language: COMMAND_RUNNER_BACKEND_DRY_RUN_PACKET_LANGUAGE,
    fieldItems: ["command intent", "working directory preview", "sandbox profile", "timeout policy", "approval state", "denied command reason"],
    previewFocus: "command request preview, sandbox profile, timeout policy, approval state, and denied command paths",
    routes: ["/file-write-backend-dry-run-packet", "/local-runtime-backend-dry-run-packet", "/model-router-selection-preview"],
    links: [
      { href: "/file-write-backend-dry-run-packet", label: "File dry-run" },
      { href: "/local-runtime-backend-dry-run-packet", label: "Runtime dry-run" },
      { href: "/model-router-selection-preview", label: "Model router" },
    ],
    nextRecommendedAction: "define command allowlists, sandbox, timeout, audit, and denial behavior before command dry-runs can execute.",
  }),
  "local-runtime-backend-dry-run-packet": buildDefinition({
    slug: "local-runtime-backend-dry-run-packet",
    phase: "Phase 829",
    title: "Local Runtime Backend Dry-Run Packet",
    markerTitle: "Local runtime backend dry-run packet",
    approvalCopy: "Runtime dry-runs require explicit operator approval.",
    subtitle: "Review the local runtime backend dry-run packet without starting runtimes.",
    primaryLabel: "Review runtime dry-run",
    safetyCopy: "Local runtime backend dry-run packet does not start runtimes",
    deniedCopy: "Denied runtime dry-run paths remain blocked",
    groupLabel: "Runtime dry-run groups",
    checklistLabel: "Runtime dry-run checklist",
    language: LOCAL_RUNTIME_BACKEND_DRY_RUN_PACKET_LANGUAGE,
    fieldItems: ["runtime kind", "startup preview", "resource boundary", "network policy", "approval state", "denied runtime reason"],
    previewFocus: "runtime startup preview, resource boundary, network policy, approval state, and denied runtime paths",
    routes: ["/command-runner-backend-dry-run-packet", "/evidence-store-backend-dry-run-packet", "/model-privacy-locality-policy-preview"],
    links: [
      { href: "/command-runner-backend-dry-run-packet", label: "Command dry-run" },
      { href: "/evidence-store-backend-dry-run-packet", label: "Evidence dry-run" },
      { href: "/model-privacy-locality-policy-preview", label: "Privacy policy" },
    ],
    nextRecommendedAction: "review local runtime resource boundaries and network policy before any runtime startup behavior exists.",
  }),
  "evidence-store-backend-dry-run-packet": buildDefinition({
    slug: "evidence-store-backend-dry-run-packet",
    phase: "Phase 830",
    title: "Evidence Store Backend Dry-Run Packet",
    markerTitle: "Evidence store backend dry-run packet",
    approvalCopy: "Evidence dry-runs require explicit operator approval.",
    subtitle: "Review the evidence store backend dry-run packet without persisting evidence.",
    primaryLabel: "Review evidence dry-run",
    safetyCopy: "Evidence store backend dry-run packet does not persist evidence",
    deniedCopy: "Denied evidence dry-run paths remain blocked",
    groupLabel: "Evidence dry-run groups",
    checklistLabel: "Evidence dry-run checklist",
    language: EVIDENCE_STORE_BACKEND_DRY_RUN_PACKET_LANGUAGE,
    fieldItems: ["evidence kind", "source preview", "redaction policy", "retention policy", "approval state", "denied evidence reason"],
    previewFocus: "evidence packet source preview, redaction, retention, approval state, and denied evidence paths",
    routes: ["/local-runtime-backend-dry-run-packet", "/result-store-backend-dry-run-packet", "/model-capability-registry-preview"],
    links: [
      { href: "/local-runtime-backend-dry-run-packet", label: "Runtime dry-run" },
      { href: "/result-store-backend-dry-run-packet", label: "Result dry-run" },
      { href: "/model-capability-registry-preview", label: "Capability registry" },
    ],
    nextRecommendedAction: "lock redaction, retention, and evidence approval policy before evidence persistence can exist.",
  }),
  "result-store-backend-dry-run-packet": buildDefinition({
    slug: "result-store-backend-dry-run-packet",
    phase: "Phase 831",
    title: "Result Store Backend Dry-Run Packet",
    markerTitle: "Result store backend dry-run packet",
    approvalCopy: "Result dry-runs require explicit operator approval.",
    subtitle: "Review the result store backend dry-run packet without persisting results.",
    primaryLabel: "Review result dry-run",
    safetyCopy: "Result store backend dry-run packet does not persist results",
    deniedCopy: "Denied result dry-run paths remain blocked",
    groupLabel: "Result dry-run groups",
    checklistLabel: "Result dry-run checklist",
    language: RESULT_STORE_BACKEND_DRY_RUN_PACKET_LANGUAGE,
    fieldItems: ["result kind", "acceptance preview", "reuse policy", "retention policy", "approval state", "denied result reason"],
    previewFocus: "result packet acceptance preview, reuse policy, retention policy, approval state, and denied result paths",
    routes: ["/evidence-store-backend-dry-run-packet", "/recovery-backend-dry-run-packet", "/model-cost-quality-policy-preview"],
    links: [
      { href: "/evidence-store-backend-dry-run-packet", label: "Evidence dry-run" },
      { href: "/recovery-backend-dry-run-packet", label: "Recovery dry-run" },
      { href: "/model-cost-quality-policy-preview", label: "Cost quality policy" },
    ],
    nextRecommendedAction: "define acceptance, reuse, retention, privacy, and denial policy before result persistence exists.",
  }),
  "recovery-backend-dry-run-packet": buildDefinition({
    slug: "recovery-backend-dry-run-packet",
    phase: "Phase 832",
    title: "Recovery Backend Dry-Run Packet",
    markerTitle: "Recovery backend dry-run packet",
    approvalCopy: "Recovery dry-runs require explicit operator approval.",
    subtitle: "Review the recovery backend dry-run packet without triggering recovery.",
    primaryLabel: "Review recovery dry-run",
    safetyCopy: "Recovery backend dry-run packet does not trigger recovery",
    deniedCopy: "Denied recovery dry-run paths remain blocked",
    groupLabel: "Recovery dry-run groups",
    checklistLabel: "Recovery dry-run checklist",
    language: RECOVERY_BACKEND_DRY_RUN_PACKET_LANGUAGE,
    fieldItems: ["failure source", "recovery mode", "retry scope", "rollback target", "approval state", "denied recovery reason"],
    previewFocus: "recovery packet failure source, retry scope, rollback target, approval state, and denied recovery paths",
    routes: ["/result-store-backend-dry-run-packet", "/packaging-backend-dry-run-packet", "/model-fallback-chain-preview"],
    links: [
      { href: "/result-store-backend-dry-run-packet", label: "Result dry-run" },
      { href: "/packaging-backend-dry-run-packet", label: "Packaging dry-run" },
      { href: "/model-fallback-chain-preview", label: "Fallback chain" },
    ],
    nextRecommendedAction: "define recovery ownership, retry limits, rollback targets, cleanup, escalation, and denial evidence before recovery behavior exists.",
  }),
  "packaging-backend-dry-run-packet": buildDefinition({
    slug: "packaging-backend-dry-run-packet",
    phase: "Phase 833",
    title: "Packaging Backend Dry-Run Packet",
    markerTitle: "Packaging backend dry-run packet",
    approvalCopy: "Packaging dry-runs require explicit operator approval.",
    subtitle: "Review the packaging backend dry-run packet without packaging or exporting.",
    primaryLabel: "Review packaging dry-run",
    safetyCopy: "Packaging backend dry-run packet does not package or export",
    deniedCopy: "Denied packaging dry-run paths remain blocked",
    groupLabel: "Packaging dry-run groups",
    checklistLabel: "Packaging dry-run checklist",
    language: PACKAGING_BACKEND_DRY_RUN_PACKET_LANGUAGE,
    fieldItems: ["artifact source", "bundle type", "destination preview", "redaction note", "approval state", "denied packaging reason"],
    previewFocus: "packaging packet artifact source, destination preview, redaction note, approval state, and denied packaging paths",
    routes: ["/recovery-backend-dry-run-packet", "/project-scaffold-backend-dry-run-packet", "/model-selection-approval-packet"],
    links: [
      { href: "/recovery-backend-dry-run-packet", label: "Recovery dry-run" },
      { href: "/project-scaffold-backend-dry-run-packet", label: "Scaffold dry-run" },
      { href: "/model-selection-approval-packet", label: "Approval packet" },
    ],
    nextRecommendedAction: "define destination, redaction, handoff, rollback, audit, and denial policy before package or export behavior exists.",
  }),
  "project-scaffold-backend-dry-run-packet": buildDefinition({
    slug: "project-scaffold-backend-dry-run-packet",
    phase: "Phase 834",
    title: "Project Scaffold Backend Dry-Run Packet",
    markerTitle: "Project scaffold backend dry-run packet",
    approvalCopy: "Project scaffold dry-runs require explicit operator approval.",
    subtitle: "Review the project scaffold backend dry-run packet without creating projects.",
    primaryLabel: "Review scaffold dry-run",
    safetyCopy: "Project scaffold backend dry-run packet does not create projects",
    deniedCopy: "Denied project scaffold dry-run paths remain blocked",
    groupLabel: "Project scaffold dry-run groups",
    checklistLabel: "Project scaffold dry-run checklist",
    language: PROJECT_SCAFFOLD_BACKEND_DRY_RUN_PACKET_LANGUAGE,
    fieldItems: ["project type", "template policy", "target path preview", "file/command/runtime dependencies", "approval state", "denied scaffold reason"],
    previewFocus: "project scaffold packet project type, template policy, target path preview, dependencies, approval state, and denied scaffold paths",
    routes: ["/packaging-backend-dry-run-packet", "/model-router-selection-preview", "/backend-dry-run-model-router-candidate"],
    links: [
      { href: "/packaging-backend-dry-run-packet", label: "Packaging dry-run" },
      { href: "/model-router-selection-preview", label: "Model router" },
      { href: "/backend-dry-run-model-router-candidate", label: "Candidate" },
    ],
    nextRecommendedAction: "review file, command, runtime, audit, evidence, result, recovery, and model-router dependencies before any scaffold creation behavior exists.",
  }),
  "model-router-selection-preview": buildDefinition({
    slug: "model-router-selection-preview",
    phase: "Phase 835",
    title: "Model Router Selection Preview",
    markerTitle: "Model router selection preview",
    approvalCopy: "Model routing requires explicit operator approval.",
    subtitle: "Review bounded model-router selection without calling models.",
    primaryLabel: "Review model selection",
    safetyCopy: "Model router selection preview does not call models",
    deniedCopy: "Paid free local and specialist models remain preview-only",
    groupLabel: "Model selection groups",
    checklistLabel: "Model router checklist",
    language: MODEL_ROUTER_SELECTION_PREVIEW_LANGUAGE,
    fieldItems: ["task domain", "model capability", "quality need", "cost budget", "speed need", "operator preference", "approval policy"],
    previewFocus: "bounded model-router selection inputs across paid, free, local, remote, and specialist model classes without routing or model calls",
    routes: ["/backend-adapter-dry-run-packet-inventory", "/model-capability-registry-preview", "/model-selection-approval-packet"],
    links: [
      { href: "/backend-adapter-dry-run-packet-inventory", label: "Packet inventory" },
      { href: "/model-capability-registry-preview", label: "Capability registry" },
      { href: "/model-selection-approval-packet", label: "Approval packet" },
    ],
    nextRecommendedAction: "review capability, cost, privacy, fallback, and approval packets before any model routing can exist.",
  }),
  "model-capability-registry-preview": buildDefinition({
    slug: "model-capability-registry-preview",
    phase: "Phase 836",
    title: "Model Capability Registry Preview",
    markerTitle: "Model capability registry preview",
    approvalCopy: "Capability registration requires explicit operator approval.",
    subtitle: "Review static model capability registration without calling models.",
    primaryLabel: "Review capability registry",
    safetyCopy: "Model capability registry preview does not call models",
    deniedCopy: "Denied capability shortcuts remain blocked",
    groupLabel: "Model capability groups",
    checklistLabel: "Capability registry checklist",
    language: MODEL_CAPABILITY_REGISTRY_PREVIEW_LANGUAGE,
    fieldItems: ["model class", "domain strengths", "tool support", "context window", "safety profile", "locality", "approval policy"],
    previewFocus: "static capability registry shape for future paid, free, local, remote, and specialist model classes",
    routes: ["/model-router-selection-preview", "/model-cost-quality-policy-preview", "/model-privacy-locality-policy-preview"],
    links: [
      { href: "/model-router-selection-preview", label: "Model router" },
      { href: "/model-cost-quality-policy-preview", label: "Cost quality policy" },
      { href: "/model-privacy-locality-policy-preview", label: "Privacy locality policy" },
    ],
    nextRecommendedAction: "review capability source, safety profile, context window, tool support, locality, and denial behavior before capability registration exists.",
  }),
  "model-cost-quality-policy-preview": buildDefinition({
    slug: "model-cost-quality-policy-preview",
    phase: "Phase 837",
    title: "Model Cost Quality Policy Preview",
    markerTitle: "Model cost quality policy preview",
    approvalCopy: "Paid model usage requires explicit operator approval.",
    subtitle: "Review model cost and quality policy without spending credits.",
    primaryLabel: "Review cost quality policy",
    safetyCopy: "Model cost quality policy preview does not spend credits",
    deniedCopy: "Cost quality routing remains preview-only",
    groupLabel: "Cost quality policy groups",
    checklistLabel: "Cost quality checklist",
    language: MODEL_COST_QUALITY_POLICY_PREVIEW_LANGUAGE,
    fieldItems: ["quality need", "cost budget", "speed need", "failure history", "paid model threshold", "denied spend reason"],
    previewFocus: "cost-quality policy thresholds for future model routing without credit spend or provider calls",
    routes: ["/model-capability-registry-preview", "/model-privacy-locality-policy-preview", "/model-fallback-chain-preview"],
    links: [
      { href: "/model-capability-registry-preview", label: "Capability registry" },
      { href: "/model-privacy-locality-policy-preview", label: "Privacy locality" },
      { href: "/model-fallback-chain-preview", label: "Fallback chain" },
    ],
    nextRecommendedAction: "define quality thresholds, budget ceilings, speed tradeoffs, and paid-model approval language before paid usage can exist.",
  }),
  "model-privacy-locality-policy-preview": buildDefinition({
    slug: "model-privacy-locality-policy-preview",
    phase: "Phase 838",
    title: "Model Privacy Locality Policy Preview",
    markerTitle: "Model privacy locality policy preview",
    approvalCopy: "Remote model use requires explicit operator approval.",
    subtitle: "Review model privacy and locality policy without sending data remotely.",
    primaryLabel: "Review privacy locality policy",
    safetyCopy: "Model privacy locality policy preview does not send data remotely",
    deniedCopy: "Local-first routing remains operator-controlled",
    groupLabel: "Privacy locality groups",
    checklistLabel: "Privacy locality checklist",
    language: MODEL_PRIVACY_LOCALITY_POLICY_PREVIEW_LANGUAGE,
    fieldItems: ["privacy tier", "locality requirement", "remote eligibility", "redaction need", "operator preference", "denied remote reason"],
    previewFocus: "local-first privacy and locality policy for model routing without remote data transfer",
    routes: ["/model-cost-quality-policy-preview", "/model-fallback-chain-preview", "/model-selection-approval-packet"],
    links: [
      { href: "/model-cost-quality-policy-preview", label: "Cost quality policy" },
      { href: "/model-fallback-chain-preview", label: "Fallback chain" },
      { href: "/model-selection-approval-packet", label: "Approval packet" },
    ],
    nextRecommendedAction: "define privacy tiers, redaction, remote eligibility, and local-first overrides before remote model routing can exist.",
  }),
  "model-fallback-chain-preview": buildDefinition({
    slug: "model-fallback-chain-preview",
    phase: "Phase 839",
    title: "Model Fallback Chain Preview",
    markerTitle: "Model fallback chain preview",
    approvalCopy: "Fallback model use requires explicit operator approval.",
    subtitle: "Review model fallback chains without calling fallback models.",
    primaryLabel: "Review fallback chain",
    safetyCopy: "Model fallback chain preview does not call fallback models",
    deniedCopy: "Denied fallback paths remain blocked",
    groupLabel: "Model fallback groups",
    checklistLabel: "Fallback chain checklist",
    language: MODEL_FALLBACK_CHAIN_PREVIEW_LANGUAGE,
    fieldItems: ["primary class", "fallback class", "failure history", "cost guard", "privacy guard", "denied fallback reason"],
    previewFocus: "fallback chain ordering, failure-history inputs, cost guards, privacy guards, and denied fallback behavior",
    routes: ["/model-privacy-locality-policy-preview", "/model-selection-approval-packet", "/backend-dry-run-model-router-candidate"],
    links: [
      { href: "/model-privacy-locality-policy-preview", label: "Privacy locality" },
      { href: "/model-selection-approval-packet", label: "Approval packet" },
      { href: "/backend-dry-run-model-router-candidate", label: "Candidate" },
    ],
    nextRecommendedAction: "review failure history, fallback order, cost/privacy guards, and approval packet handoff before fallback behavior exists.",
  }),
  "model-selection-approval-packet": buildDefinition({
    slug: "model-selection-approval-packet",
    phase: "Phase 840",
    title: "Model Selection Approval Packet",
    markerTitle: "Model selection approval packet",
    approvalCopy: "Model selection requires explicit operator approval.",
    subtitle: "Review model selection approval without approving model calls.",
    primaryLabel: "Review model approval",
    safetyCopy: "Model selection approval packet does not approve model calls",
    deniedCopy: "Denied model approval shortcuts remain blocked",
    groupLabel: "Model approval groups",
    checklistLabel: "Model approval checklist",
    language: MODEL_SELECTION_APPROVAL_PACKET_LANGUAGE,
    fieldItems: ["selected class", "approval state", "budget state", "privacy state", "fallback state", "denied approval reason"],
    previewFocus: "model-selection approval packet state, budget/privacy/fallback gates, and denied shortcut behavior",
    routes: ["/model-router-selection-preview", "/model-fallback-chain-preview", "/backend-dry-run-model-router-candidate"],
    links: [
      { href: "/model-router-selection-preview", label: "Model router" },
      { href: "/model-fallback-chain-preview", label: "Fallback chain" },
      { href: "/backend-dry-run-model-router-candidate", label: "Candidate" },
    ],
    nextRecommendedAction: "lock approval state, budget state, privacy state, fallback state, expiry, and denial behavior before model calls can exist.",
  }),
  "backend-dry-run-model-router-candidate": buildDefinition({
    slug: "backend-dry-run-model-router-candidate",
    phase: "Phase 841",
    title: "Backend Dry-Run Model Router Candidate",
    markerTitle: "Backend dry-run model router candidate",
    approvalCopy: "Backend dry-run and model routing require explicit operator approval.",
    subtitle: "Review the backend dry-run model-router candidate without executing adapters or calling models.",
    primaryLabel: "Review backend model-router candidate",
    safetyCopy: "Backend dry-run model router candidate does not execute adapters or call models",
    deniedCopy: "Denied candidate execution paths remain blocked",
    groupLabel: "Backend model router candidate groups",
    checklistLabel: "Candidate readiness checklist",
    language: BACKEND_DRY_RUN_MODEL_ROUTER_CANDIDATE_LANGUAGE,
    fieldItems: ["dry-run packet inventory", "adapter packet status", "model selection status", "approval packet status", "privacy/cost policy", "denied execution reason"],
    previewFocus: "combined backend dry-run and bounded model-router readiness candidate without adapter execution, provider calls, or model calls",
    routes: ["/backend-adapter-dry-run-packet-inventory", "/model-router-selection-preview", "/model-selection-approval-packet"],
    links: [
      { href: "/backend-adapter-dry-run-packet-inventory", label: "Packet inventory" },
      { href: "/model-router-selection-preview", label: "Model router" },
      { href: "/model-selection-approval-packet", label: "Approval packet" },
    ],
    nextRecommendedAction: "keep the candidate static until dry-run packet approval, model-router policy, cost/privacy guards, fallback behavior, audit/evidence/result policy, and operator approval are reviewed.",
  }),
  "shared-model-brain-context-contract": buildDefinition({
    slug: "shared-model-brain-context-contract",
    phase: "Phase 842",
    title: "Shared Model Brain Context Contract",
    markerTitle: "Shared model brain context contract",
    approvalCopy: "Shared context requires explicit operator approval.",
    subtitle: "Review the shared model brain context contract without calling models.",
    primaryLabel: "Review shared context contract",
    safetyCopy: "Shared model brain context contract does not call models",
    deniedCopy: "Models are workers not isolated brains",
    groupLabel: "CodexForge owns the shared brain context",
    checklistLabel: "Shared brain context checklist",
    language: SHARED_MODEL_BRAIN_CONTEXT_CONTRACT_LANGUAGE,
    fieldItems: ["shared task context", "shared project memory", "shared knowledge graph", "shared evidence store", "shared result store", "shared approval state"],
    previewFocus: "CodexForge-owned context boundaries for workers that share one brain instead of isolated memory silos",
    routes: ["/shared-model-memory-access-preview", "/shared-model-knowledge-access-preview", "/shared-brain-model-router-candidate"],
    links: [
      { href: "/shared-model-memory-access-preview", label: "Memory access" },
      { href: "/shared-model-knowledge-access-preview", label: "Knowledge access" },
      { href: "/shared-brain-model-router-candidate", label: "Router candidate" },
    ],
    nextRecommendedAction: "review shared memory, shared knowledge, evidence/result ownership, approval state, and handoff packet boundaries before any model can use shared context.",
  }),
  "shared-model-memory-access-preview": buildDefinition({
    slug: "shared-model-memory-access-preview",
    phase: "Phase 843",
    title: "Shared Model Memory Access Preview",
    markerTitle: "Shared model memory access preview",
    approvalCopy: "Memory access requires explicit operator approval.",
    subtitle: "Review shared model memory access without reading live memory.",
    primaryLabel: "Review shared memory access",
    safetyCopy: "Shared model memory access preview does not read live memory",
    deniedCopy: "Denied memory access paths remain blocked",
    groupLabel: "Models share one CodexForge memory layer",
    checklistLabel: "Shared memory checklist",
    language: SHARED_MODEL_MEMORY_ACCESS_PREVIEW_LANGUAGE,
    fieldItems: ["memory scope", "task state pointer", "approval state", "promotion policy", "redaction policy", "denied memory reason"],
    previewFocus: "static memory access boundaries for future model workers without live reads or memory promotion",
    routes: ["/shared-model-brain-context-contract", "/shared-model-knowledge-access-preview", "/model-continuity-handoff-packet"],
    links: [
      { href: "/shared-model-brain-context-contract", label: "Context contract" },
      { href: "/shared-model-knowledge-access-preview", label: "Knowledge access" },
      { href: "/model-continuity-handoff-packet", label: "Handoff packet" },
    ],
    nextRecommendedAction: "lock memory read approval, redaction, promotion denial, retention, and task-state references before model memory access can exist.",
  }),
  "shared-model-knowledge-access-preview": buildDefinition({
    slug: "shared-model-knowledge-access-preview",
    phase: "Phase 844",
    title: "Shared Model Knowledge Access Preview",
    markerTitle: "Shared model knowledge access preview",
    approvalCopy: "Knowledge access requires explicit operator approval.",
    subtitle: "Review shared model knowledge access without querying live knowledge.",
    primaryLabel: "Review shared knowledge access",
    safetyCopy: "Shared model knowledge access preview does not query live knowledge",
    deniedCopy: "Denied knowledge access paths remain blocked",
    groupLabel: "Models share one CodexForge knowledge layer",
    checklistLabel: "Shared knowledge checklist",
    language: SHARED_MODEL_KNOWLEDGE_ACCESS_PREVIEW_LANGUAGE,
    fieldItems: ["knowledge graph scope", "citation/evidence pointer", "freshness policy", "approval state", "redaction policy", "denied knowledge reason"],
    previewFocus: "static knowledge graph access boundaries for future model workers without live knowledge queries",
    routes: ["/shared-model-brain-context-contract", "/shared-model-memory-access-preview", "/cross-model-result-comparison-preview"],
    links: [
      { href: "/shared-model-brain-context-contract", label: "Context contract" },
      { href: "/shared-model-memory-access-preview", label: "Memory access" },
      { href: "/cross-model-result-comparison-preview", label: "Result comparison" },
    ],
    nextRecommendedAction: "review knowledge graph ownership, evidence links, citation policy, freshness policy, and denial behavior before knowledge access can exist.",
  }),
  "model-task-classification-matrix": buildDefinition({
    slug: "model-task-classification-matrix",
    phase: "Phase 845",
    title: "Model Task Classification Matrix",
    markerTitle: "Model task classification matrix",
    approvalCopy: "Task classification requires explicit operator approval.",
    subtitle: "Review model task classification without routing live requests.",
    primaryLabel: "Review task classification",
    safetyCopy: "Model task classification matrix does not route live requests",
    deniedCopy: "Denied classification shortcuts remain blocked",
    groupLabel: "Task domains drive model selection",
    checklistLabel: "Task classification checklist",
    language: MODEL_TASK_CLASSIFICATION_MATRIX_LANGUAGE,
    fieldItems: ["task domain", "required quality", "required speed", "modality need", "tool/function support", "approval policy"],
    previewFocus: "static task-domain classification inputs for future model selection without live routing",
    routes: ["/shared-model-brain-context-contract", "/model-efficiency-scoring-preview", "/shared-brain-model-router-candidate"],
    links: [
      { href: "/shared-model-brain-context-contract", label: "Context contract" },
      { href: "/model-efficiency-scoring-preview", label: "Efficiency scoring" },
      { href: "/shared-brain-model-router-candidate", label: "Router candidate" },
    ],
    nextRecommendedAction: "review domain labels, quality/speed requirements, modality/tool needs, and approval rules before task classification can influence routing.",
  }),
  "model-efficiency-scoring-preview": buildDefinition({
    slug: "model-efficiency-scoring-preview",
    phase: "Phase 846",
    title: "Model Efficiency Scoring Preview",
    markerTitle: "Model efficiency scoring preview",
    approvalCopy: "Efficiency scoring requires explicit operator approval.",
    subtitle: "Review model efficiency scoring without scoring live providers.",
    primaryLabel: "Review efficiency scoring",
    safetyCopy: "Model efficiency scoring preview does not score live providers",
    deniedCopy: "Denied scoring shortcuts remain blocked",
    groupLabel: "Cost speed quality privacy and context are scored together",
    checklistLabel: "Efficiency scoring checklist",
    language: MODEL_EFFICIENCY_SCORING_PREVIEW_LANGUAGE,
    fieldItems: ["cost budget", "required speed", "required quality", "privacy preference", "context window size", "historical reliability"],
    previewFocus: "static efficiency scoring dimensions across cost, speed, quality, privacy, context, and reliability without live provider scoring",
    routes: ["/model-task-classification-matrix", "/model-spend-guardrail-preview", "/shared-brain-model-router-candidate"],
    links: [
      { href: "/model-task-classification-matrix", label: "Task matrix" },
      { href: "/model-spend-guardrail-preview", label: "Spend guardrail" },
      { href: "/shared-brain-model-router-candidate", label: "Router candidate" },
    ],
    nextRecommendedAction: "review score weights, budget ceilings, speed thresholds, privacy preference, context need, and reliability evidence before model scoring can exist.",
  }),
  "free-model-routing-policy-preview": buildDefinition({
    slug: "free-model-routing-policy-preview",
    phase: "Phase 847",
    title: "Free Model Routing Policy Preview",
    markerTitle: "Free model routing policy preview",
    approvalCopy: "Free model routing requires explicit operator approval.",
    subtitle: "Review free model routing policy without calling free models.",
    primaryLabel: "Review free model policy",
    safetyCopy: "Free model routing policy preview does not call free models",
    deniedCopy: "Denied free model routes remain blocked",
    groupLabel: "Free models share the same CodexForge brain",
    checklistLabel: "Free model policy checklist",
    language: FREE_MODEL_ROUTING_POLICY_PREVIEW_LANGUAGE,
    fieldItems: ["free vs paid preference", "task domain fit", "quality ceiling", "rate/queue risk", "privacy state", "denied free route reason"],
    previewFocus: "static free-model routing policy that keeps free workers on the shared CodexForge brain without live calls",
    routes: ["/model-task-classification-matrix", "/model-efficiency-scoring-preview", "/shared-brain-model-router-candidate"],
    links: [
      { href: "/model-task-classification-matrix", label: "Task matrix" },
      { href: "/model-efficiency-scoring-preview", label: "Efficiency scoring" },
      { href: "/shared-brain-model-router-candidate", label: "Router candidate" },
    ],
    nextRecommendedAction: "review free-model quality ceilings, privacy eligibility, queue risk, fallback denial, and operator approval before free model routing can exist.",
  }),
  "paid-model-routing-policy-preview": buildDefinition({
    slug: "paid-model-routing-policy-preview",
    phase: "Phase 848",
    title: "Paid Model Routing Policy Preview",
    markerTitle: "Paid model routing policy preview",
    approvalCopy: "Paid model usage requires explicit operator approval.",
    subtitle: "Review paid model routing policy without calling paid models.",
    primaryLabel: "Review paid model policy",
    safetyCopy: "Paid model routing policy preview does not call paid models",
    deniedCopy: "Denied paid model routes remain blocked",
    groupLabel: "Paid models share the same CodexForge brain",
    checklistLabel: "Paid model policy checklist",
    language: PAID_MODEL_ROUTING_POLICY_PREVIEW_LANGUAGE,
    fieldItems: ["cost budget", "quality threshold", "spend approval state", "privacy state", "result retention policy", "denied paid route reason"],
    previewFocus: "static paid-model routing policy with operator-controlled spend and shared-brain continuity",
    routes: ["/model-efficiency-scoring-preview", "/model-spend-guardrail-preview", "/shared-brain-model-router-candidate"],
    links: [
      { href: "/model-efficiency-scoring-preview", label: "Efficiency scoring" },
      { href: "/model-spend-guardrail-preview", label: "Spend guardrail" },
      { href: "/shared-brain-model-router-candidate", label: "Router candidate" },
    ],
    nextRecommendedAction: "review budget ceilings, paid approval language, privacy eligibility, result policy, and denied spend behavior before paid model routing can exist.",
  }),
  "pro-model-routing-policy-preview": buildDefinition({
    slug: "pro-model-routing-policy-preview",
    phase: "Phase 849",
    title: "Pro Model Routing Policy Preview",
    markerTitle: "Pro model routing policy preview",
    approvalCopy: "Pro model usage requires explicit operator approval.",
    subtitle: "Review pro model routing policy without calling pro models.",
    primaryLabel: "Review pro model policy",
    safetyCopy: "Pro model routing policy preview does not call pro models",
    deniedCopy: "Denied pro model routes remain blocked",
    groupLabel: "Pro models share the same CodexForge brain",
    checklistLabel: "Pro model policy checklist",
    language: PRO_MODEL_ROUTING_POLICY_PREVIEW_LANGUAGE,
    fieldItems: ["pro/high-quality preference", "quality threshold", "context window need", "tool/function support", "spend approval state", "denied pro route reason"],
    previewFocus: "static pro/high-quality model policy that preserves one shared CodexForge brain without live pro calls",
    routes: ["/model-efficiency-scoring-preview", "/model-spend-guardrail-preview", "/shared-brain-model-router-candidate"],
    links: [
      { href: "/model-efficiency-scoring-preview", label: "Efficiency scoring" },
      { href: "/model-spend-guardrail-preview", label: "Spend guardrail" },
      { href: "/shared-brain-model-router-candidate", label: "Router candidate" },
    ],
    nextRecommendedAction: "review high-quality thresholds, context/tool needs, cost approval, and denial behavior before pro model routing can exist.",
  }),
  "local-model-routing-policy-preview": buildDefinition({
    slug: "local-model-routing-policy-preview",
    phase: "Phase 850",
    title: "Local Model Routing Policy Preview",
    markerTitle: "Local model routing policy preview",
    approvalCopy: "Local model usage requires explicit operator approval.",
    subtitle: "Review local model routing policy without calling local models.",
    primaryLabel: "Review local model policy",
    safetyCopy: "Local model routing policy preview does not call local models",
    deniedCopy: "Denied local model routes remain blocked",
    groupLabel: "Local models share the same CodexForge brain",
    checklistLabel: "Local model policy checklist",
    language: LOCAL_MODEL_ROUTING_POLICY_PREVIEW_LANGUAGE,
    fieldItems: ["local/privacy preference", "device boundary", "context window size", "tool/function support", "approval state", "denied local route reason"],
    previewFocus: "static local-model policy for privacy-preserving workers over the same CodexForge brain without local model calls",
    routes: ["/shared-model-memory-access-preview", "/shared-model-knowledge-access-preview", "/shared-brain-model-router-candidate"],
    links: [
      { href: "/shared-model-memory-access-preview", label: "Memory access" },
      { href: "/shared-model-knowledge-access-preview", label: "Knowledge access" },
      { href: "/shared-brain-model-router-candidate", label: "Router candidate" },
    ],
    nextRecommendedAction: "review local runtime boundaries, privacy tiers, context needs, tool support, and approval language before local model routing can exist.",
  }),
  "specialist-model-routing-policy-preview": buildDefinition({
    slug: "specialist-model-routing-policy-preview",
    phase: "Phase 851",
    title: "Specialist Model Routing Policy Preview",
    markerTitle: "Specialist model routing policy preview",
    approvalCopy: "Specialist model usage requires explicit operator approval.",
    subtitle: "Review specialist model routing policy without calling specialist models.",
    primaryLabel: "Review specialist model policy",
    safetyCopy: "Specialist model routing policy preview does not call specialist models",
    deniedCopy: "Denied specialist model routes remain blocked",
    groupLabel: "Specialist models share the same CodexForge brain",
    checklistLabel: "Specialist model policy checklist",
    language: SPECIALIST_MODEL_ROUTING_POLICY_PREVIEW_LANGUAGE,
    fieldItems: ["multimodal support", "coding ability", "research/citation ability", "video/image generation ability", "trading/reasoning ability", "game-server/domain expertise"],
    previewFocus: "static specialist model policy across image, video, coding, research, trading, voice, and game-server domains without specialist calls",
    routes: ["/model-task-classification-matrix", "/cross-model-result-comparison-preview", "/shared-brain-model-router-candidate"],
    links: [
      { href: "/model-task-classification-matrix", label: "Task matrix" },
      { href: "/cross-model-result-comparison-preview", label: "Result comparison" },
      { href: "/shared-brain-model-router-candidate", label: "Router candidate" },
    ],
    nextRecommendedAction: "review specialist capability claims, domain boundaries, output review rules, cost/privacy gates, and denial behavior before specialist model routing can exist.",
  }),
  "model-continuity-handoff-packet": buildDefinition({
    slug: "model-continuity-handoff-packet",
    phase: "Phase 852",
    title: "Model Continuity Handoff Packet",
    markerTitle: "Model continuity handoff packet",
    approvalCopy: "Model handoff requires explicit operator approval.",
    subtitle: "Review model continuity handoff packets without transferring live prompts.",
    primaryLabel: "Review handoff packet",
    safetyCopy: "Model continuity handoff packet does not transfer live prompts",
    deniedCopy: "Denied model handoff paths remain blocked",
    groupLabel: "Models can pick up from shared task memory",
    checklistLabel: "Continuity handoff checklist",
    language: MODEL_CONTINUITY_HANDOFF_PACKET_LANGUAGE,
    fieldItems: ["shared model handoff packet", "shared task state", "shared approval state", "shared decision log", "failure history", "denied handoff reason"],
    previewFocus: "static handoff packet shape that lets future workers pick up shared task context without live prompt transfer",
    routes: ["/shared-model-memory-access-preview", "/model-routing-audit-trail-preview", "/shared-brain-model-router-candidate"],
    links: [
      { href: "/shared-model-memory-access-preview", label: "Memory access" },
      { href: "/model-routing-audit-trail-preview", label: "Audit trail" },
      { href: "/shared-brain-model-router-candidate", label: "Router candidate" },
    ],
    nextRecommendedAction: "review handoff packet fields, approval state, redaction, failure history, decision log, and denial behavior before model handoff can exist.",
  }),
  "cross-model-result-comparison-preview": buildDefinition({
    slug: "cross-model-result-comparison-preview",
    phase: "Phase 853",
    title: "Cross-Model Result Comparison Preview",
    markerTitle: "Cross-model result comparison preview",
    approvalCopy: "Cross-model comparison requires explicit operator approval.",
    subtitle: "Review cross-model result comparison without calling models.",
    primaryLabel: "Review result comparison",
    safetyCopy: "Cross-model result comparison preview does not call models",
    deniedCopy: "Denied comparison paths remain blocked",
    groupLabel: "Model results compare against shared evidence and task state",
    checklistLabel: "Cross-model comparison checklist",
    language: CROSS_MODEL_RESULT_COMPARISON_PREVIEW_LANGUAGE,
    fieldItems: ["shared result store", "shared evidence store", "shared task state", "quality criteria", "operator review state", "denied comparison reason"],
    previewFocus: "static result comparison shape for future outputs against shared evidence and task state without model calls",
    routes: ["/shared-model-knowledge-access-preview", "/model-continuity-handoff-packet", "/cross-model-failure-recovery-preview"],
    links: [
      { href: "/shared-model-knowledge-access-preview", label: "Knowledge access" },
      { href: "/model-continuity-handoff-packet", label: "Handoff packet" },
      { href: "/cross-model-failure-recovery-preview", label: "Recovery preview" },
    ],
    nextRecommendedAction: "review comparison criteria, evidence anchors, task-state checks, operator review state, retention policy, and denial behavior before comparisons can exist.",
  }),
  "cross-model-failure-recovery-preview": buildDefinition({
    slug: "cross-model-failure-recovery-preview",
    phase: "Phase 854",
    title: "Cross-Model Failure Recovery Preview",
    markerTitle: "Cross-model failure recovery preview",
    approvalCopy: "Model fallback and recovery require explicit operator approval.",
    subtitle: "Review cross-model failure recovery without retrying models.",
    primaryLabel: "Review model recovery",
    safetyCopy: "Cross-model failure recovery preview does not retry models",
    deniedCopy: "Denied model recovery paths remain blocked",
    groupLabel: "Recovery uses shared failure history",
    checklistLabel: "Cross-model recovery checklist",
    language: CROSS_MODEL_FAILURE_RECOVERY_PREVIEW_LANGUAGE,
    fieldItems: ["shared failure history", "fallback candidate", "retry denial reason", "cost guard", "privacy guard", "operator escalation state"],
    previewFocus: "static failure recovery and fallback shape using shared failure history without retries",
    routes: ["/cross-model-result-comparison-preview", "/model-continuity-handoff-packet", "/shared-brain-model-router-candidate"],
    links: [
      { href: "/cross-model-result-comparison-preview", label: "Result comparison" },
      { href: "/model-continuity-handoff-packet", label: "Handoff packet" },
      { href: "/shared-brain-model-router-candidate", label: "Router candidate" },
    ],
    nextRecommendedAction: "review failure classification, fallback denial, retry approval, budget/privacy guards, escalation, and audit handoff before recovery can exist.",
  }),
  "model-spend-guardrail-preview": buildDefinition({
    slug: "model-spend-guardrail-preview",
    phase: "Phase 855",
    title: "Model Spend Guardrail Preview",
    markerTitle: "Model spend guardrail preview",
    approvalCopy: "Model spend requires explicit operator approval.",
    subtitle: "Review model spend guardrails without spending credits.",
    primaryLabel: "Review spend guardrail",
    safetyCopy: "Model spend guardrail preview does not spend credits",
    deniedCopy: "Denied spend paths remain blocked",
    groupLabel: "Paid model budgets remain operator-controlled",
    checklistLabel: "Model spend checklist",
    language: MODEL_SPEND_GUARDRAIL_PREVIEW_LANGUAGE,
    fieldItems: ["cost budget", "paid model threshold", "pro model threshold", "approval expiry", "spend denial reason", "audit placeholder"],
    previewFocus: "static spend guardrails for paid and pro models without provider calls or credit spend",
    routes: ["/model-efficiency-scoring-preview", "/paid-model-routing-policy-preview", "/shared-brain-model-router-candidate"],
    links: [
      { href: "/model-efficiency-scoring-preview", label: "Efficiency scoring" },
      { href: "/paid-model-routing-policy-preview", label: "Paid policy" },
      { href: "/shared-brain-model-router-candidate", label: "Router candidate" },
    ],
    nextRecommendedAction: "review budget ceilings, spend approvals, expiry rules, audit placeholders, and denied spend behavior before paid or pro model usage can exist.",
  }),
  "model-routing-audit-trail-preview": buildDefinition({
    slug: "model-routing-audit-trail-preview",
    phase: "Phase 856",
    title: "Model Routing Audit Trail Preview",
    markerTitle: "Model routing audit trail preview",
    approvalCopy: "Model routing audit writes require explicit operator approval.",
    subtitle: "Review model routing audit trails without writing audit records.",
    primaryLabel: "Review routing audit",
    safetyCopy: "Model routing audit trail preview does not write audit records",
    deniedCopy: "Denied routing audit paths remain blocked",
    groupLabel: "Routing decisions reference shared brain state",
    checklistLabel: "Model routing audit checklist",
    language: MODEL_ROUTING_AUDIT_TRAIL_PREVIEW_LANGUAGE,
    fieldItems: ["shared audit trail", "shared decision log", "model selection reason", "approval state", "budget/privacy state", "denied audit reason"],
    previewFocus: "static routing audit trail shape tied to shared brain state without writing audit records",
    routes: ["/model-continuity-handoff-packet", "/model-spend-guardrail-preview", "/shared-brain-model-router-candidate"],
    links: [
      { href: "/model-continuity-handoff-packet", label: "Handoff packet" },
      { href: "/model-spend-guardrail-preview", label: "Spend guardrail" },
      { href: "/shared-brain-model-router-candidate", label: "Router candidate" },
    ],
    nextRecommendedAction: "review audit fields, decision-log references, approval state, budget/privacy evidence, denial records, and retention policy before audit writes can exist.",
  }),
  "shared-brain-model-router-candidate": buildDefinition({
    slug: "shared-brain-model-router-candidate",
    phase: "Phase 857",
    title: "Shared Brain Model Router Candidate",
    markerTitle: "Shared brain model router candidate",
    approvalCopy: "Shared brain model routing requires explicit operator approval.",
    subtitle: "Review the shared brain model router candidate without routing live model calls.",
    primaryLabel: "Review shared brain router",
    safetyCopy: "Shared brain model router candidate does not route live model calls",
    deniedCopy: "Denied shared brain routing paths remain blocked",
    groupLabel: "All models use one CodexForge brain memory and knowledge layer",
    checklistLabel: "Shared brain router candidate checklist",
    language: SHARED_BRAIN_MODEL_ROUTER_CANDIDATE_LANGUAGE,
    fieldItems: ["shared task context", "shared project memory", "shared knowledge graph", "shared model handoff packet", "shared audit trail", "approval policy"],
    previewFocus: "combined shared-brain model-router candidate across paid, free, pro, local, remote, and specialist model workers without live routing",
    routes: ["/shared-model-brain-context-contract", "/model-task-classification-matrix", "/model-routing-audit-trail-preview"],
    links: [
      { href: "/shared-model-brain-context-contract", label: "Context contract" },
      { href: "/model-task-classification-matrix", label: "Task matrix" },
      { href: "/model-routing-audit-trail-preview", label: "Audit trail" },
    ],
    nextRecommendedAction: "keep the candidate static until shared context, memory, knowledge, task classification, scoring, policy, handoff, comparison, recovery, spend, audit, and operator approval are reviewed.",
  }),
};

export function buildBackendDryRunModelRouterPreview(
  slug: BackendDryRunModelRouterPreviewSlug,
  input: BackendDryRunModelRouterPreviewPacketInput
): UniversalExecutionReviewPacket {
  return buildAdapterBackedExecutionPreview(slug, input);
}

export function buildBackendDryRunModelRouterPreviewAdvancedDetails(
  title: string,
  language: readonly string[],
  details: readonly string[]
): string {
  return buildAdapterBackedExecutionPreviewAdvancedDetails(title, language, [...details, ...BACKEND_DRY_RUN_MODEL_ROUTER_PREVIEW_SAFETY_MARKERS]);
}

export function buildBackendDryRunModelRouterPreviewSections(
  ...sections: BackendDryRunModelRouterPreviewSectionInput[]
): ReturnType<typeof buildAdapterBackedExecutionPreviewSections> {
  return buildAdapterBackedExecutionPreviewSections(...sections);
}

export function buildBackendDryRunModelRouterPreviewBoundary() {
  return buildAdapterBackedExecutionPreviewBoundary();
}

export function getBackendDryRunModelRouterPreviewDefinition(slug: BackendDryRunModelRouterPreviewSlug) {
  return BACKEND_DRY_RUN_MODEL_ROUTER_PREVIEW_DEFINITIONS[slug];
}

export function buildBackendDryRunModelRouterPreviewPackets(slug: BackendDryRunModelRouterPreviewSlug): UniversalExecutionReviewPacket[] {
  const definition = getBackendDryRunModelRouterPreviewDefinition(slug);
  return [
    buildBackendDryRunModelRouterPreview(slug, {
      idHint: slug,
      status: "blocked",
      identity: definition.identity,
      sections: buildBackendDryRunModelRouterPreviewSections(...definition.sections),
      routes: [...definition.routes],
      nextRecommendedAction: definition.nextRecommendedAction,
      advancedDetails: buildBackendDryRunModelRouterPreviewAdvancedDetails(definition.anchor, definition.language, definition.advancedDetails),
    }),
  ];
}

export function summarizeBackendDryRunModelRouterPreview(
  title: string,
  packets: readonly UniversalExecutionReviewPacket[],
  approvalCopy: string
): string {
  return summarizeAdapterBackedExecutionPreview(title, packets, approvalCopy);
}

export function summarizeBackendDryRunModelRouterPreviewForSlug(
  slug: BackendDryRunModelRouterPreviewSlug,
  packets: readonly UniversalExecutionReviewPacket[]
): string {
  const definition = getBackendDryRunModelRouterPreviewDefinition(slug);
  return summarizeBackendDryRunModelRouterPreview(definition.title, packets, definition.approvalCopy);
}

export function buildBackendDryRunModelRouterPreviewModelForSlug(
  slug: BackendDryRunModelRouterPreviewSlug,
  packets = buildBackendDryRunModelRouterPreviewPackets(slug)
) {
  const definition = getBackendDryRunModelRouterPreviewDefinition(slug);
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
    advancedDetails: [...definition.advancedDetails, ...BACKEND_DRY_RUN_MODEL_ROUTER_PREVIEW_SAFETY_MARKERS],
    links: definition.links,
    packets,
    advancedCopy: definition.advancedCopy,
    dataScope: definition.dataScope,
  });
}
