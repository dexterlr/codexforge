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
    buildHealthDimension("operator-memory-inbox", "Personal Operator Memory Inbox readiness", "needs-review", "Review memory inbox", "Signals can become reviewed inbox cards with promotion preview only; no auto-promotion, no Brain graph mutation, and preserve latest-message authority."),
    buildHealthDimension("runtime-event-journal", "Runtime Event Journal readiness", "needs-review", "Review runtime event journal", "Runtime event lifecycle visibility covers requests, approvals, policy, validation, dry-runs, reducer previews, blocked or ready results, and append-only audit handoffs; read-only, no graph mutation, no event append from UI, and preserve latest-message authority."),
    buildHealthDimension("runtime-event-replay", "Runtime Event Replay Simulator readiness", "needs-review", "Review runtime event replay", "Selected runtime journal events can be previewed against a selected graph snapshot with reducer simulation, impact analysis, risk detection, and rollback guidance; preview-only, no graph mutation, no appendEvent, no event execution, no auto-persistence, and preserve latest-message authority."),
    buildHealthDimension("snapshot-restore-gate", "Snapshot Restore Approval Gate readiness", "needs-review", "Review snapshot restore gate", "Restore candidate modeling, comparison evidence, replay evidence, governance review, runtime journal review, explicit approval packet, and request preview are visible; restore blocked by default, no graph mutation, no appendEvent, no saveBrainGraph from UI, future guarded snapshot executor required, and preserve latest-message authority."),
    buildHealthDimension("brain-continuity-dashboard", "Brain Continuity Dashboard readiness", "needs-review", "Review Brain continuity", "Read-only continuity dashboard covers memory growth, runtime event journal health, snapshot posture, replay readiness, restore risk, governance posture, next safe action, no graph mutation, no snapshot restore, no appendEvent, no saveBrainGraph from UI, and preserve latest-message authority."),
    buildHealthDimension("brain-mutation-governance", "Brain Mutation Governance readiness", "needs-review", "Review brain mutation governance", "Read-only governance covers approved mutation boundaries, blocked direct mutation visibility, reducer impact governance, runtime journal integrity posture, risk board, and next safe action; no graph mutation from UI, no auto-promotion, and preserve latest-message authority."),
    buildHealthDimension("memory-persistence", "Memory persistence readiness", "needs-review", "Approved event ledger", "Approved memory events persist only under .codexforge/memory-events and remain future graph merge previews."),
    buildHealthDimension("brain-merge", "Brain merge readiness", "needs-review", "Approved graph merge", "Brain event merge review can produce an approved local graph merge only after explicit approval, policy validation, and rollback summary review."),
    buildHealthDimension("files", "File workflow readiness", "needs-review", "Preview-first", "File context and patch preview are available through the Files surface."),
    buildHealthDimension("capabilities", "Capability readiness", "needs-review", "Policy visible", "Capability routing remains reviewable before any guarded handoff."),
    buildHealthDimension("runs", "Run center readiness", "preview-only", "Approval gated", "Run orchestration is visible but execution is outside this dashboard."),
    buildHealthDimension("bridge-consent", "Bridge consent readiness", "future-gated", "Consent required", "Local bridge activity requires explicit guarded approval."),
    buildHealthDimension("creative-local-bridge", "Creative Local Bridge readiness", "preview-only", "Review creative bridge", "Creative Local Bridge v1 is preview-only/request-ready for profiles, adapters, approval packets, artifact capture plans, and handoff prompts; no Blender, ComfyUI, Unreal, video render, command, provider, or file-write execution from Mission Control."),
    buildHealthDimension("video-render-job-preview", "Video Render Job Preview readiness", "preview-only", "Review video render job preview", "Video Render Job Preview v1 is preview-only/request-ready for render input, timeline, shot plan, provider plan, queue preview, artifact expectations, approval packet, policy, and future executor packet; no render execution, no Blender execution, no ComfyUI execution, no Unreal execution, no ffmpeg execution, no command execution, and no file writes."),
    buildHealthDimension("guarded-creative-executor", "Guarded Creative Executor readiness", "preview-only", "Review creative executor dry-run", "Guarded Creative Executor readiness is dry-run-first/request-ready for creative execution packets, adapter allowlist, approval packet, preflight, dry-run, kill-switch policy, artifact capture plan, and future guarded executor boundary; execution disabled in Phase 67, no render execution, no command execution, and no file writes."),
    buildHealthDimension("blender-adapter-preview", "Blender Adapter Preview readiness", "preview-only", "Review Blender adapter preview", "Blender Adapter Preview v1 is preview-only/request-ready for scene input, scene model, object/material/light/camera/render plans, Python preview, safety policy, and future executor packet; no Blender execution, no render execution, and no file writes."),
    buildHealthDimension("unreal-adapter-preview", "Unreal Adapter Preview readiness", "preview-only", "Review Unreal adapter preview", "Unreal Adapter Preview v1 is preview-only/request-ready for project input, level model, actor/asset/material/Blueprint/Sequencer plans, build settings, command preview, safety policy, and future executor packet; no Unreal execution, no Unreal Editor launch, no render execution, no package/build, and no file writes."),
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
    buildHealthDimension("approved-patch-apply", "Approved Patch Apply readiness", "needs-review", "Review Approved Patch Apply", "Approved Patch Apply v1 is approval-gated/request-ready in /files: preview diff becomes apply request, approval packet, policy, preflight, dry-run preview, rollback plan, validation capture, and guarded bridge state; execution remains request-ready/blocked until safe API is available and Phase 59 Validation Runner v1 is the next recommended step."),
    buildHealthDimension("validation-runner", "Validation Runner readiness", "needs-review", "Run approved validation", "Validation Runner v1 is approval-gated/request-ready/manual-only at /validation: allowlisted command catalog, explicit approval, policy, preflight, output capture, and result routing to Verification Ingestion or Regression Triage; no arbitrary shell, no direct UI command execution, no file writes, and no Brain graph mutation."),
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
