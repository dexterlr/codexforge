import type {
  BrainMutationBoundary,
  BrainMutationBoundaryRegistry,
  BrainMutationBoundaryType,
  BrainMutationGovernanceEventType,
  BrainMutationMode,
} from "./brain-mutation-governance-types";
import { buildBrainMutationGovernanceStableKey } from "./brain-mutation-governance-types";

const DEFAULT_ALLOWED_EVENTS: Record<BrainMutationBoundaryType, BrainMutationGovernanceEventType[]> = {
  "runtime-event-executor": ["memory.promoted"],
  "memory-promotion-gate": ["memory.promoted"],
  "approved-brain-merge": ["memory.promoted", "concept.synthesized"],
  "brain-merge-preview": ["memory.promoted", "concept.synthesized"],
  "graph-reducer-preview": [
    "message.created",
    "task.created",
    "task.updated",
    "execution.started",
    "execution.completed",
    "diff.generated",
    "memory.promoted",
    "concept.synthesized",
    "failure.detected",
    "recovery.detected",
  ],
  "memory-review": ["memory.promoted"],
  "operator-memory-inbox": ["memory.promoted"],
  "runtime-event-journal": [
    "message.created",
    "task.created",
    "task.updated",
    "execution.started",
    "execution.completed",
    "diff.generated",
    "memory.promoted",
    "concept.synthesized",
    "failure.detected",
    "recovery.detected",
  ],
  "direct-ui-mutation-block": ["unknown"],
  unknown: ["unknown"],
};

function defaultMutationMode(type: BrainMutationBoundaryType): BrainMutationMode {
  if (type === "runtime-event-executor") return "guarded-executor";
  if (type === "memory-promotion-gate") return "request-ready";
  if (type === "approved-brain-merge") return "executed";
  if (type === "brain-merge-preview" || type === "graph-reducer-preview" || type === "memory-review" || type === "operator-memory-inbox" || type === "runtime-event-journal") return "preview-only";
  return "blocked";
}

function defaultSourceRoute(type: BrainMutationBoundaryType): string {
  switch (type) {
    case "runtime-event-executor":
      return "/memory-inbox";
    case "memory-promotion-gate":
    case "operator-memory-inbox":
      return "/memory-inbox";
    case "runtime-event-journal":
      return "/runtime-journal";
    case "approved-brain-merge":
    case "brain-merge-preview":
    case "memory-review":
      return "/memory";
    case "graph-reducer-preview":
    case "direct-ui-mutation-block":
    case "unknown":
      return "/brain-governance";
  }
}

function defaultSourceModule(type: BrainMutationBoundaryType): string {
  switch (type) {
    case "runtime-event-executor":
      return "src/lib/codexforge/runtime-event-executor";
    case "memory-promotion-gate":
      return "src/lib/codexforge/memory-promotion-gate";
    case "runtime-event-journal":
      return "src/lib/codexforge/runtime-event-journal";
    case "operator-memory-inbox":
      return "src/lib/codexforge/operator-memory-inbox";
    case "graph-reducer-preview":
      return "src/lib/codexforge/brain/runtime/graph-reducer.ts";
    case "approved-brain-merge":
      return "src/lib/codexforge/approved-brain-merge";
    case "brain-merge-preview":
      return "src/lib/codexforge/brain-merge";
    case "memory-review":
      return "src/lib/codexforge/memory-review";
    case "direct-ui-mutation-block":
      return "src/lib/codexforge/brain-mutation-governance/direct-mutation-detector.ts";
    case "unknown":
      return "unknown";
  }
}

function defaultLabel(type: BrainMutationBoundaryType): string {
  switch (type) {
    case "runtime-event-executor":
      return "Runtime Event Executor";
    case "memory-promotion-gate":
      return "Memory Promotion Gate";
    case "approved-brain-merge":
      return "Approved Brain merge";
    case "brain-merge-preview":
      return "Brain merge preview";
    case "graph-reducer-preview":
      return "Graph reducer preview";
    case "memory-review":
      return "Memory review";
    case "operator-memory-inbox":
      return "Operator Memory Inbox";
    case "runtime-event-journal":
      return "Runtime Event Journal";
    case "direct-ui-mutation-block":
      return "Direct UI mutation block";
    case "unknown":
      return "Unknown boundary";
  }
}

function safetyNoteFor(type: BrainMutationBoundaryType): string {
  if (type === "runtime-event-executor") {
    return "appendEvent is executor-domain-only; direct UI graph mutation is blocked; reducer preview and audit journal remain visible.";
  }
  if (type === "memory-promotion-gate") {
    return "memory.promoted requires Memory Promotion Gate plus Runtime Event Executor; no auto-promotion and no graph mutation from UI.";
  }
  if (type === "runtime-event-journal") {
    return "Runtime Event Journal is read-only audit visibility; it never appends runtime events.";
  }
  if (type === "direct-ui-mutation-block") {
    return "No direct UI graph mutation is allowed; direct mutation signals are blocked and routed to approved boundaries.";
  }
  if (type === "unknown") {
    return "Unknown boundary is blocked until policy, reducer preview, approval, and audit posture are visible.";
  }
  return "Boundary is review-gated, deterministic, local-first, and direct UI mutation is blocked.";
}

function nextSafeActionFor(type: BrainMutationBoundaryType): string {
  switch (type) {
    case "runtime-event-executor":
      return "Review request, policy, validation, approval, reducer preview, and audit ledger.";
    case "memory-promotion-gate":
      return "Review Memory Promotion Gate approval and request packet before executor handoff.";
    case "runtime-event-journal":
      return "Review runtime event journal before approving any guarded event path.";
    case "graph-reducer-preview":
      return "Inspect reducer preview before any mutation request can proceed.";
    case "direct-ui-mutation-block":
      return "Inspect direct mutation signal and keep UI mutation blocked.";
    case "unknown":
      return "Stop and stabilize until a known mutation boundary is selected.";
    default:
      return "Keep review-gated preview visible and route mutation through approved boundaries.";
  }
}

export function buildBrainMutationBoundary(input: Partial<BrainMutationBoundary> & {
  type: BrainMutationBoundaryType;
}): BrainMutationBoundary {
  const type = input.type;
  const allowedEventTypes = [...(input.allowedEventTypes ?? DEFAULT_ALLOWED_EVENTS[type])];
  const mutationMode = input.mutationMode ?? defaultMutationMode(type);
  const approvalRequired = input.approvalRequired ?? !["runtime-event-journal", "direct-ui-mutation-block"].includes(type);
  const policyRequired = input.policyRequired ?? type !== "runtime-event-journal";
  const reducerPreviewRequired = input.reducerPreviewRequired ?? !["runtime-event-journal", "direct-ui-mutation-block", "operator-memory-inbox", "memory-review"].includes(type);
  const auditJournalRequired = input.auditJournalRequired ?? !["direct-ui-mutation-block"].includes(type);

  return {
    id: input.id ?? buildBrainMutationGovernanceStableKey("boundary", type, input.sourceRoute ?? defaultSourceRoute(type)),
    label: input.label ?? defaultLabel(type),
    type,
    sourceRoute: input.sourceRoute ?? defaultSourceRoute(type),
    sourceModule: input.sourceModule ?? defaultSourceModule(type),
    allowedEventTypes,
    mutationMode: type === "unknown" ? "blocked" : mutationMode,
    approvalRequired,
    policyRequired,
    reducerPreviewRequired,
    auditJournalRequired,
    directUiMutationAllowed: false,
    safetyNote: input.safetyNote ?? safetyNoteFor(type),
    nextSafeAction: input.nextSafeAction ?? nextSafeActionFor(type),
  };
}

export function buildBrainMutationBoundaryRegistry(
  suppliedBoundaries: readonly (Partial<BrainMutationBoundary> & { type: BrainMutationBoundaryType })[] = []
): BrainMutationBoundaryRegistry {
  const defaults: Array<Partial<BrainMutationBoundary> & { type: BrainMutationBoundaryType }> = [
    { type: "runtime-event-executor" },
    { type: "memory-promotion-gate" },
    { type: "runtime-event-journal" },
    { type: "operator-memory-inbox" },
    { type: "memory-review" },
    { type: "graph-reducer-preview" },
    { type: "brain-merge-preview" },
    { type: "approved-brain-merge" },
    { type: "direct-ui-mutation-block" },
    { type: "unknown" },
  ];
  const boundaries = [...defaults, ...suppliedBoundaries].map(buildBrainMutationBoundary);

  const registry: BrainMutationBoundaryRegistry = {
    id: "brain-mutation-boundary-registry",
    boundaries,
    boundaryCount: boundaries.length,
    guardedBoundaryCount: boundaries.filter((boundary) => boundary.mutationMode === "guarded-executor" || boundary.mutationMode === "request-ready").length,
    blockedBoundaryCount: boundaries.filter((boundary) => boundary.mutationMode === "blocked").length,
    previewBoundaryCount: boundaries.filter((boundary) => boundary.mutationMode === "preview-only").length,
    directUiMutationAllowedCount: boundaries.filter((boundary) => boundary.directUiMutationAllowed).length,
    summary: [],
  };
  return { ...registry, summary: summarizeBrainMutationBoundaryRegistry(registry) };
}

export function summarizeBrainMutationBoundaryRegistry(
  registry: Pick<BrainMutationBoundaryRegistry, "boundaryCount" | "guardedBoundaryCount" | "blockedBoundaryCount" | "directUiMutationAllowedCount">
): string[] {
  return [
    `${registry.boundaryCount} mutation boundaries registered.`,
    `${registry.guardedBoundaryCount} guarded/request-ready boundaries visible; ${registry.blockedBoundaryCount} boundaries blocked.`,
    registry.directUiMutationAllowedCount === 0
      ? "Direct UI mutation should always be false across the registry."
      : "Direct UI mutation allowance detected and must be blocked.",
    "appendEvent should be executor-domain-only; memory.promoted requires Memory Promotion Gate plus Runtime Event Executor; unknown boundary is blocked.",
  ];
}
