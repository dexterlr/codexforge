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
    buildHealthDimension("operator-home-dashboard", "Operator Home Dashboard readiness", "ready", "Launch deck ready", "Operator Home provides a read-only local-first command deck for launch, status, safety posture, validation checklist copy, and next safe action routing."),
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
    buildHealthDimension("regression-triage", "Self-Healing Regression Triage readiness", "needs-review", "Review regression triage", "Failed or warning verification signals can produce reviewed regression cards with suspected cause, impact map, rollback advice, fix recommendation, and Safe Patch Preview handoff only; no auto-fix, no auto-rollback, no command execution, and no mutation."),
    buildHealthDimension("regression-fix-queue", "Regression Fix Queue readiness", "needs-review", "Review regression fix queue", "Reviewed regression triage cards can become prioritized repair queue items with policy, readiness, route, ledger, and Safe Patch Preview plus Preview Diff Composer handoff only; no auto-fix, no auto-rollback, no command execution, no file writes, and no Brain graph mutation."),
    buildHealthDimension("stabilization-command-center", "Stabilization Command Center readiness", "needs-review", "Review stabilization command center", "Build and smoke posture, verification signals, regression triage, fix queue, patch queue, apply gates, post-apply verification, and next safest action are visible in a read-only operator dashboard; no auto-fix, no auto-rollback, no command execution, no file writes, and no Brain graph mutation."),
    buildHealthDimension("apply-evidence-pack", "Apply Evidence Pack readiness", "needs-review", "Build apply evidence pack", "Apply Evidence Pack bundles preview diff package, current file verification, rollback plan, test plan, operator approval note, evidence refs, smoke placeholders, mutation firewall, and final readiness for future guarded apply only; it does not apply changes."),
    buildHealthDimension("apply-diff-dry-run", "Apply-Diff Dry Run readiness", "needs-review", "Review dry-run result", "Human-approved apply packets can produce deterministic apply-diff dry-run results, file impact, conflict checks, and ledger views only; simulation only, no mutation, actual apply-diff remains blocked, current file verification required, rollback plan required, and preserve latest-message authority."),
    buildHealthDimension("apply-diff-execution-gate", "Apply-Diff Execution Gate readiness", "needs-review", "Review approved apply request", "Clean dry-run packages can become explicit human-approved apply-diff request packets with policy confirmation, guarded execute route bridge status, visible result contract, rollback plan required, verification required after dispatch, no silent execution, and preserve latest-message authority."),
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
