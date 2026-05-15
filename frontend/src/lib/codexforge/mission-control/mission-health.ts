import type {
  MissionHealthDimension,
  MissionHealthReport,
  MissionReadinessLevel,
} from "./mission-control-types";

function buildHealthDimension(
  id: MissionHealthDimension["id"],
  label: string,
  readiness: MissionReadinessLevel,
  signal: string,
  detail: string
): MissionHealthDimension {
  return { id, label, readiness, signal, detail };
}

export function buildMissionHealthReport(): MissionHealthReport {
  const dimensions: MissionHealthDimension[] = [
    buildHealthDimension("runtime", "Runtime health", "ready", "Established", "Brain runtime foundations are available for inspection."),
    buildHealthDimension("memory", "Memory readiness", "ready", "Context ready", "Memory foundations are present without direct graph mutation from Mission Control."),
    buildHealthDimension("brain-recall", "Brain recall readiness", "ready", "Search Brain memory", "Approved Brain graph search is deterministic local recall with no graph mutation and inspect before editing handoff."),
    buildHealthDimension("memory-review", "Memory review readiness", "needs-review", "Review queue ready", "Memory candidates require confidence, contradiction risk, and explicit approval review before promotion event preview."),
    buildHealthDimension("memory-persistence", "Memory persistence readiness", "needs-review", "Approved event ledger", "Approved memory events persist only under .codexforge/memory-events and remain future graph merge previews."),
    buildHealthDimension("brain-merge", "Brain merge readiness", "needs-review", "Approved graph merge", "Brain event merge review can produce an approved local graph merge only after explicit approval, policy validation, and rollback summary review."),
    buildHealthDimension("files", "File workflow readiness", "needs-review", "Preview-first", "File context and patch preview are available through the Files surface."),
    buildHealthDimension("capabilities", "Capability readiness", "needs-review", "Policy visible", "Capability routing remains reviewable before any guarded handoff."),
    buildHealthDimension("runs", "Run center readiness", "preview-only", "Approval gated", "Run orchestration is visible but execution is outside this dashboard."),
    buildHealthDimension("bridge-consent", "Bridge consent readiness", "future-gated", "Consent required", "Local bridge activity requires explicit guarded approval."),
    buildHealthDimension("artifacts", "Artifact readiness", "needs-review", "Workspace guarded", "Artifact review and export approval posture are visible."),
    buildHealthDimension("artifact-ingestion", "Artifact ingestion readiness", "needs-review", "Candidates visible", "Exported artifacts produce read-only memory candidates and brain signals for review before promotion."),
    buildHealthDimension("production-pack", "Production pack readiness", "needs-review", "Pack review", "Production packs are available for preview bundling and validation."),
    buildHealthDimension("safety", "Safety posture", "ready", "Readonly", "Mission Control does not mutate source, run commands, control desktop, or place trades."),
  ];

  return {
    id: "mission-health-report",
    posture: "needs-review",
    dimensions,
    summary: summarizeMissionHealthReport(dimensions),
  };
}

export function summarizeMissionHealthReport(
  reportOrDimensions: MissionHealthReport | MissionHealthDimension[]
): string[] {
  const dimensions = Array.isArray(reportOrDimensions)
    ? reportOrDimensions
    : reportOrDimensions.dimensions;
  const ready = dimensions.filter((dimension) => dimension.readiness === "ready").length;
  const review = dimensions.filter((dimension) => dimension.readiness === "needs-review").length;
  const gated = dimensions.filter(
    (dimension) =>
      dimension.readiness === "preview-only" ||
      dimension.readiness === "future-gated"
  ).length;

  return [
    `${ready} health dimensions are ready.`,
    `${review} dimensions need operator review.`,
    `${gated} dimensions remain preview-only or future gated.`,
  ];
}
