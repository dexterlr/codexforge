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
    buildHealthDimension("brain-recall", "Brain recall readiness", "ready", "Search Brain memory", "Approved Brain graph search is deterministic local recall with visible chat recall handoff, no graph mutation, and inspect before editing guidance."),
    buildHealthDimension("evidence-memory", "Evidence to Memory readiness", "needs-review", "Review read-only evidence memory", "Read-only execution evidence can become reviewable memory candidates only; Review required before memory promotion, Brain merge review required, and no graph mutation."),
    buildHealthDimension("evidence-grounded-chat", "Evidence-Grounded Chat readiness", "needs-review", "Use reviewed evidence in chat", "Selected reviewed evidence becomes visible chat grounding with local citations, stale and weak warnings, no hidden context injection, and latest-message authority preserved."),
    buildHealthDimension("memory-review", "Memory review readiness", "needs-review", "Review queue ready", "Memory candidates require confidence, contradiction risk, and explicit approval review before promotion event preview."),
    buildHealthDimension("memory-persistence", "Memory persistence readiness", "needs-review", "Approved event ledger", "Approved memory events persist only under .codexforge/memory-events and remain future graph merge previews."),
    buildHealthDimension("brain-merge", "Brain merge readiness", "needs-review", "Approved graph merge", "Brain event merge review can produce an approved local graph merge only after explicit approval, policy validation, and rollback summary review."),
    buildHealthDimension("files", "File workflow readiness", "needs-review", "Preview-first", "File context and patch preview are available through the Files surface."),
    buildHealthDimension("capabilities", "Capability readiness", "needs-review", "Policy visible", "Capability routing remains reviewable before any guarded handoff."),
    buildHealthDimension("runs", "Run center readiness", "preview-only", "Approval gated", "Run orchestration is visible but execution is outside this dashboard."),
    buildHealthDimension("bridge-consent", "Bridge consent readiness", "future-gated", "Consent required", "Local bridge activity requires explicit guarded approval."),
    buildHealthDimension("artifacts", "Artifact readiness", "needs-review", "Workspace guarded", "Artifact review and export approval posture are visible."),
    buildHealthDimension("artifact-ingestion", "Artifact ingestion readiness", "needs-review", "Candidates visible", "Exported artifacts produce read-only memory candidates and brain signals for review before promotion."),
    buildHealthDimension("task-autopilot", "Task Autopilot readiness", "needs-review", "Review task suggestions", "Recalled memory, active context, file risk, and mission state can produce review-gated suggestions and preview-only handoff prompts."),
    buildHealthDimension("task-activation", "Reviewed Task Activation readiness", "needs-review", "Activate reviewed task", "Accepted suggestions can become activation requests, policy-reviewed active plan previews, and /ai handoffs without auto-run or file mutation."),
    buildHealthDimension("execution-readiness", "Execution Readiness", "needs-review", "Review execution readiness", "Activated task plans can be reviewed for step preflight, tool posture, risk, tests, and approval readiness while execution remains blocked until approval."),
    buildHealthDimension("step-runner-preview", "Step Runner Preview readiness", "needs-review", "Preview a task step run", "Approved Step Runner Preview prepares tool policy posture, approval packet, dry run plan, result preview, and ledger only; No step execution in Phase 25."),
    buildHealthDimension("read-only-step-execution", "Read-Only Step Execution readiness", "needs-review", "Execute approved read-only step", "Approved read-only step execution can run only read-file, list-files, search-project, or snapshot-project after explicit approval; Mutation tools remain blocked."),
    buildHealthDimension("grounded-fix-recommendation", "Grounded Fix Recommendation readiness", "needs-review", "Review grounded fix recommendation", "Evidence, file intelligence, task readiness, and manual goals can produce reviewed fix recommendations only; Safe Patch Preview is required for edits and no mutation is performed."),
    buildHealthDimension("apply-diff-dry-run", "Apply-Diff Dry Run readiness", "needs-review", "Review dry-run result", "Human-approved apply packets can produce deterministic apply-diff dry-run results, file impact, conflict checks, and ledger views only; simulation only, no mutation, actual apply-diff remains blocked, current file verification required, rollback plan required, and preserve latest-message authority."),
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
