import type { ContinuityHandoffInput, ContinuityHandoffPosture, ContinuityHandoffRoute, ContinuityHandoffState, ContinuityHandoffStateItem } from "./continuity-handoff-types";
import { buildContinuityHandoffStableKey, uniqueContinuityHandoffStrings } from "./continuity-handoff-types";

const DEFAULT_SURFACES = [
  "Brain Continuity Dashboard",
  "Stabilization Command Center",
  "Global Activity Feed",
  "Brain graph inspector",
  "Operator Memory Inbox",
  "Runtime Event Journal",
  "Brain Snapshot Manager",
  "Snapshot Restore Approval Gate",
  "Brain Mutation Governance Console",
];

const DEFAULT_ROUTES: ContinuityHandoffRoute[] = [
  "/handoff",
  "/brain-continuity",
  "/stabilization",
  "/activity",
  "/brain",
  "/memory-inbox",
  "/runtime-journal",
  "/brain-snapshots",
  "/snapshot-restore",
  "/brain-governance",
];

function posture(value: ContinuityHandoffPosture | null | undefined, fallback: ContinuityHandoffPosture): ContinuityHandoffPosture {
  return value ?? fallback;
}

function worstPosture(values: readonly ContinuityHandoffPosture[]): ContinuityHandoffPosture {
  if (values.includes("blocked")) return "blocked";
  if (values.includes("risk")) return "risk";
  if (values.includes("warning")) return "warning";
  if (values.includes("review")) return "review";
  if (values.includes("unknown")) return "unknown";
  return "ready";
}

export function buildContinuityHandoffStateItem(input: {
  label: string;
  posture: ContinuityHandoffPosture;
  detail: string;
  sourceSurface: string;
  relatedRoute: ContinuityHandoffRoute;
  reviewRequired?: boolean;
}): ContinuityHandoffStateItem {
  return {
    id: buildContinuityHandoffStableKey("handoff-state-item", input.label, input.posture, input.sourceSurface),
    label: input.label,
    posture: input.posture,
    detail: input.detail,
    sourceSurface: input.sourceSurface,
    relatedRoute: input.relatedRoute,
    reviewRequired: input.reviewRequired ?? input.posture !== "ready",
  };
}

export function buildContinuityHandoffState(input: ContinuityHandoffInput = {}): ContinuityHandoffState {
  const productName = input.productName?.trim() || "CodexForge";
  const branchLabel = input.branchLabel?.trim() || "codexforge-foundation";
  const phaseLabel = input.phaseLabel?.trim() || "Phase 53 Continuity Handoff Packet";
  const sourceSurfaces = uniqueContinuityHandoffStrings(input.sourceSurfaces ?? DEFAULT_SURFACES);
  const activeRoutes = Array.from(new Set(input.activeRoutes ?? DEFAULT_ROUTES));
  const continuityStatus = posture(input.continuityStatus, "review");
  const stabilizationStatus = posture(input.stabilizationStatus, "review");
  const brainPosture = posture(input.brainPosture, "review");
  const memoryPosture = posture(input.memoryPosture, "review");
  const runtimeEventPosture = posture(input.runtimeEventPosture, "review");
  const snapshotPosture = posture(input.snapshotPosture, "review");
  const restorePosture = posture(input.restorePosture, "blocked");
  const validationPosture = posture(input.validationPosture, "review");
  const currentPosture = posture(input.currentPosture, worstPosture([continuityStatus, stabilizationStatus, brainPosture, memoryPosture, runtimeEventPosture, snapshotPosture, restorePosture, validationPosture]));
  const items = [
    buildContinuityHandoffStateItem({ label: "Continuity status", posture: continuityStatus, detail: "Brain continuity is summarized for handoff review; create handoff packet is visible and copy-only.", sourceSurface: "Brain Continuity Dashboard", relatedRoute: "/brain-continuity" }),
    buildContinuityHandoffStateItem({ label: "Stabilization status", posture: stabilizationStatus, detail: "Build, smoke, regression, and next-safe-action posture remain manual validation inputs.", sourceSurface: "Stabilization Command Center", relatedRoute: "/stabilization" }),
    buildContinuityHandoffStateItem({ label: "Brain posture", posture: brainPosture, detail: "Canonical Brain graph behavior is preserved; no graph mutation is available from handoff UI.", sourceSurface: "Brain graph inspector", relatedRoute: "/brain" }),
    buildContinuityHandoffStateItem({ label: "Memory posture", posture: memoryPosture, detail: "Memory candidates remain review-bound; no auto-promotion guarantee is explicit.", sourceSurface: "Operator Memory Inbox", relatedRoute: "/memory-inbox" }),
    buildContinuityHandoffStateItem({ label: "Runtime event posture", posture: runtimeEventPosture, detail: "Runtime event lifecycle is read-only in handoff; no appendEvent call exists.", sourceSurface: "Runtime Event Journal", relatedRoute: "/runtime-journal" }),
    buildContinuityHandoffStateItem({ label: "Snapshot posture", posture: snapshotPosture, detail: "Snapshot state is inspectable only; snapshot restore is not triggered.", sourceSurface: "Brain Snapshot Manager", relatedRoute: "/brain-snapshots" }),
    buildContinuityHandoffStateItem({ label: "Restore posture", posture: restorePosture, detail: "Brain graph restore blocked by default; Snapshot Restore Gate preview only.", sourceSurface: "Snapshot Restore Approval Gate", relatedRoute: "/snapshot-restore" }),
    buildContinuityHandoffStateItem({ label: "Validation posture", posture: validationPosture, detail: "Commands are rendered for copy only; UI cannot execute shell commands.", sourceSurface: "Smoke suite", relatedRoute: "smoke suite" }),
  ];
  const id = buildContinuityHandoffStableKey("continuity-handoff", productName, branchLabel, phaseLabel, currentPosture, sourceSurfaces);

  return {
    id,
    productName,
    branchLabel,
    phaseLabel,
    currentPosture,
    sourceSurfaces,
    activeRoutes,
    continuityStatus,
    stabilizationStatus,
    brainPosture,
    memoryPosture,
    runtimeEventPosture,
    snapshotPosture,
    restorePosture,
    validationPosture,
    noMutationGuarantee: "read-only, copy only, no graph mutation, no snapshot restore, no appendEvent, no saveBrainGraph from UI, no command execution, no file writes, no auto-persistence",
    items,
    summary: [
      `${productName} ${phaseLabel} on ${branchLabel} is ${currentPosture}.`,
      `${sourceSurfaces.length} source surfaces and ${activeRoutes.length} active routes feed the reviewed handoff packet.`,
      "No-mutation guarantee: read-only, copy only, no graph mutation, no snapshot restore, no appendEvent, no saveBrainGraph from UI, no command execution, no file writes, no auto-persistence.",
    ],
  };
}

export function summarizeContinuityHandoffState(state: ContinuityHandoffState): string[] {
  return [
    `${state.productName} ${state.phaseLabel} on ${state.branchLabel} is ${state.currentPosture}.`,
    `${state.sourceSurfaces.length} source surfaces and ${state.activeRoutes.length} active routes feed the reviewed handoff packet.`,
    `No-mutation guarantee: ${state.noMutationGuarantee}.`,
  ];
}
