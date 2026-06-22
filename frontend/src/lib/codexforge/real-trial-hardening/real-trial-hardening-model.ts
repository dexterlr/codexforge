export type RealTrialHardeningRouteSlug =
  | "codexforge-cockpit"
  | "real-trial-hardening-boundary"
  | "denied-path-failure-handling"
  | "denied-command-failure-handling"
  | "approval-expiry-failure-handling"
  | "dirty-workspace-failure-handling"
  | "preflight-failure-handling"
  | "backend-guard-mismatch-handling"
  | "evidence-capture-failure-handling"
  | "result-capture-failure-handling"
  | "audit-capture-failure-handling"
  | "operator-stop-handling"
  | "manual-review-handling"
  | "recovery-review-packet"
  | "rollback-readiness-preview"
  | "retry-readiness-preview"
  | "controlled-real-trial-hardening-release-candidate";

export type RealTrialHardeningPanelState =
  | "blocked"
  | "approval-required"
  | "backend-owned"
  | "manual-review"
  | "preview-only";

export type RealTrialHardeningChecklistItem = {
  id: string;
  label: string;
  detail: string;
  state: RealTrialHardeningPanelState;
};

export type RealTrialHardeningSurface = {
  id: string;
  title: string;
  eyebrow: string;
  state: RealTrialHardeningPanelState;
  body: string;
  checklist: readonly RealTrialHardeningChecklistItem[];
  evidence: readonly string[];
};

export type RealTrialHardeningModel = {
  hardeningId: string;
  trialId: string;
  trialKind: string;
  goal: string;
  workspaceBoundary: string;
  failureScenarios: readonly string[];
  deniedPathHandling: readonly string[];
  deniedCommandHandling: readonly string[];
  approvalExpiryHandling: readonly string[];
  dirtyWorkspaceHandling: readonly string[];
  preflightFailureHandling: readonly string[];
  backendGuardMismatchHandling: readonly string[];
  evidenceFailureHandling: readonly string[];
  resultFailureHandling: readonly string[];
  auditFailureHandling: readonly string[];
  operatorStopHandling: readonly string[];
  manualReviewHandling: readonly string[];
  recoveryReviewPacket: readonly string[];
  rollbackReadinessPreview: readonly string[];
  retryReadinessPreview: readonly string[];
  goNoGoDecision: string;
  explicitSafetyLimits: readonly string[];
};

export type RealTrialHardeningRouteDefinition = {
  slug: RealTrialHardeningRouteSlug;
  href: string;
  phase: string;
  title: string;
  commandLabel: string;
  summary: string;
  markerPhrases: readonly string[];
  handlingCopy: string;
  deniedCopy: string;
  approvalCopy: string;
  surfaceIds: readonly string[];
  devOnly: boolean;
};

export type RealTrialHardeningRouteModel = {
  route: RealTrialHardeningRouteDefinition;
  hardening: RealTrialHardeningModel;
  surfaces: readonly RealTrialHardeningSurface[];
  globalSafetyCopy: readonly string[];
  hardeningFlow: readonly string[];
  summary: string;
};

export const REAL_TRIAL_HARDENING_COCKPIT_LANGUAGE = [
  "Real trial hardening",
  "Denied path failure handling",
  "Denied command failure handling",
  "Approval expiry failure handling",
  "Dirty workspace failure handling",
  "Preflight failure handling",
  "Backend guard mismatch handling",
  "Evidence capture failure handling",
  "Result capture failure handling",
  "Audit capture failure handling",
  "Operator stop handling",
  "Manual review handling",
  "Recovery review packet",
  "Rollback readiness preview",
  "Retry readiness preview",
  "No broad execution from the cockpit",
  "No direct recovery execution from the cockpit",
  "No direct rollback execution from the cockpit",
  "No direct retry execution from the cockpit",
  "Real trial hardening keeps backend-owned guarded execution required",
].join(" | ");

const GLOBAL_SAFETY_COPY = [
  "This is hardening for the tiny real controlled trial.",
  "It is not broad execution.",
  "It does not make the frontend executable.",
  "It does not let the frontend mutate files.",
  "It does not let the frontend run commands.",
  "It does not persist approvals from the UI.",
  "It does not persist queue/evidence/result/audit from the UI.",
  "It does not execute rollback, retry, or recovery from the UI.",
  "It keeps backend-owned guarded execution as the only future execution path.",
  "Real trial hardening requires explicit operator approval.",
  "Rollback, retry, and recovery remain approval-gated backend-owned future paths.",
  "Broad execution remains blocked from the cockpit.",
  "No broad execution from the cockpit.",
  "No direct recovery execution from the cockpit.",
  "No direct rollback execution from the cockpit.",
  "No direct retry execution from the cockpit.",
  "Real trial hardening keeps backend-owned guarded execution required.",
] as const;

const HARDENING_FLOW = [
  "real trial hardening boundary",
  "denied path failure handling",
  "denied command failure handling",
  "approval expiry failure handling",
  "dirty workspace failure handling",
  "preflight failure handling",
  "backend guard mismatch handling",
  "evidence capture failure handling",
  "result capture failure handling",
  "audit capture failure handling",
  "operator stop handling",
  "manual review handling",
  "recovery review packet",
  "rollback readiness preview",
  "retry readiness preview",
  "controlled real trial hardening release candidate",
] as const;

const HARDENING_MODEL: RealTrialHardeningModel = {
  hardeningId: "codexforge-real-trial-hardening-1370-1385",
  trialId: "codexforge-tiny-real-controlled-trial-1354-1369",
  trialKind: "tiny-real-controlled-operator-trial-hardening",
  goal:
    "Harden the first tiny real controlled operator trial against failure before any larger execution is allowed.",
  workspaceBoundary:
    "Workspace boundary remains the current project root and the tiny real trial scope only. Frontend review pages cannot browse arbitrary files, mutate files, run commands, persist approvals, persist queues, persist evidence, persist results, persist audit records, release locks, or execute rollback retry recovery.",
  failureScenarios: [
    "denied path",
    "denied command",
    "expired approval",
    "stale approval",
    "dirty workspace",
    "preflight failure",
    "backend guard mismatch",
    "evidence capture failure",
    "result capture failure",
    "audit capture failure",
    "operator stop",
    "manual review",
    "recovery review",
    "rollback readiness",
    "retry readiness",
    "go/no-go hardening",
  ],
  deniedPathHandling: [
    "Denied path handling blocks traversal attempts.",
    "Denied path handling blocks arbitrary files.",
    "Denied path handling blocks binary writes.",
    "Denied path handling blocks generated-file violations.",
    "Denied path handling blocks workspace escape.",
    "Denied path handling records a backend-owned future review reason only.",
  ],
  deniedCommandHandling: [
    "Denied command handling blocks non-allowlisted commands.",
    "Denied command handling blocks unsafe arguments.",
    "Denied command handling blocks unsafe working directories.",
    "Denied command handling blocks hidden environment access.",
    "Denied command handling blocks shell escalation.",
    "Denied command handling records a backend-owned future review reason only.",
  ],
  approvalExpiryHandling: [
    "Approval expiry handling blocks stale tickets.",
    "Approval expiry handling blocks expired tickets.",
    "Approval expiry handling blocks mismatched tickets.",
    "Approval expiry handling blocks replayed tickets.",
    "Approval expiry handling blocks scope-invalid tickets.",
    "Approval expiry handling requires explicit human re-approval.",
  ],
  dirtyWorkspaceHandling: [
    "Dirty workspace handling previews uncommitted change risk.",
    "Dirty workspace handling previews stale diff risk.",
    "Dirty workspace handling previews conflicting file risk.",
    "Dirty workspace handling previews manual review requirements.",
    "Dirty workspace handling does not run git commands from the UI.",
  ],
  preflightFailureHandling: [
    "Preflight failure handling checks goal readiness.",
    "Preflight failure handling checks plan readiness.",
    "Preflight failure handling checks diff readiness.",
    "Preflight failure handling checks command readiness.",
    "Preflight failure handling checks approval readiness.",
    "Preflight failure handling checks path guard readiness.",
    "Preflight failure handling checks command guard readiness.",
    "Preflight failure handling checks evidence result audit recovery and queue readiness.",
  ],
  backendGuardMismatchHandling: [
    "Backend guard mismatch handling blocks route mismatch.",
    "Backend guard mismatch handling blocks packet mismatch.",
    "Backend guard mismatch handling blocks approval mismatch.",
    "Backend guard mismatch handling blocks path guard mismatch.",
    "Backend guard mismatch handling blocks command guard mismatch.",
    "Backend guard mismatch handling blocks evidence contract mismatch.",
  ],
  evidenceFailureHandling: [
    "Evidence capture failure handling previews missing stdout.",
    "Evidence capture failure handling previews missing stderr.",
    "Evidence capture failure handling previews missing exit code.",
    "Evidence capture failure handling previews missing diff.",
    "Evidence capture failure handling previews missing approval redaction operator audit and queue references.",
  ],
  resultFailureHandling: [
    "Result capture failure handling previews missing success state.",
    "Result capture failure handling previews missing denied blocked failed timeout canceled needs-review manual-review retryable and recovered states.",
    "Result capture failure handling does not persist results from the UI.",
  ],
  auditFailureHandling: [
    "Audit capture failure handling previews missing goal plan diff apply command approval evidence result recovery queue operator and denied-path records.",
    "Audit capture failure handling does not persist audit logs from the UI.",
  ],
  operatorStopHandling: [
    "Operator stop handling previews stop request acknowledgement.",
    "Operator stop handling previews backend halt boundary.",
    "Operator stop handling previews evidence capture result capture audit capture and manual review path.",
    "Operator stop handling does not kill processes from the UI.",
  ],
  manualReviewHandling: [
    "Manual review handling previews review reasons.",
    "Manual review handling previews blocked action summary.",
    "Manual review handling previews evidence gaps result gaps audit gaps.",
    "Manual review handling previews next safe operator choices.",
    "Manual review handling does not execute recovery.",
  ],
  recoveryReviewPacket: [
    "Recovery review packet previews rollback options.",
    "Recovery review packet previews retry options.",
    "Recovery review packet previews stop restore explain-failure manual-review safety-stop and partial-recovery options.",
    "Recovery review packet does not execute rollback retry or recovery.",
  ],
  rollbackReadinessPreview: [
    "Rollback readiness preview checks snapshot availability.",
    "Rollback readiness preview checks diff reversibility.",
    "Rollback readiness preview checks touched files risk notes evidence references and audit references.",
    "Rollback readiness preview does not execute rollback.",
  ],
  retryReadinessPreview: [
    "Retry readiness preview checks retry reason.",
    "Retry readiness preview checks changed preconditions approval freshness guard readiness evidence gaps result gaps and audit continuity.",
    "Retry readiness preview does not execute retry.",
  ],
  goNoGoDecision:
    "No-go for broader execution. Go only for deterministic hardening preview of the tiny real controlled trial, with backend-owned guarded execution still required for any future execution.",
  explicitSafetyLimits: [
    "not broad execution",
    "not frontend executable",
    "no direct frontend file mutation",
    "no direct frontend command execution",
    "no hidden approvals",
    "no approval persistence from UI",
    "no queue persistence from UI",
    "no evidence persistence from UI",
    "no result persistence from UI",
    "no audit persistence from UI",
    "no direct frontend rollback",
    "no direct frontend retry",
    "no direct frontend recovery",
    "no provider calls",
    "no model calls",
    "no connector calls",
    "no adapter execution",
    "no runtime starts",
    "no process spawning",
    "no port binding",
    "no deployment",
    "no install",
    "no secret reads",
    "no automatic memory promotion",
  ],
};

const SURFACES: readonly RealTrialHardeningSurface[] = [
  {
    id: "real-trial-hardening-boundary",
    title: "Real trial hardening boundary",
    eyebrow: "Phase 1370",
    state: "backend-owned",
    body:
      "Hardening stays scoped to the tiny real controlled trial and keeps broad apply/run blocked behind backend-owned guarded execution.",
    checklist: [
      {
        id: "boundary-does-not-broaden",
        label: "Real trial hardening boundary does not broaden execution",
        detail: "The cockpit only previews failure safety for the existing tiny real controlled trial.",
        state: "blocked",
      },
      {
        id: "boundary-approval",
        label: "Real trial hardening requires explicit operator approval",
        detail: "Any future backend-owned execution still needs a fresh operator approval.",
        state: "approval-required",
      },
    ],
    evidence: ["hardening boundary packet", "backend-owned guard reference", "no broad execution marker"],
  },
  {
    id: "denied-path-failure-handling",
    title: "Denied path failure handling",
    eyebrow: "Phase 1371",
    state: "blocked",
    body:
      "Denied path failures are represented as blocked review states for traversal, arbitrary files, binary writes, generated-file violations, and workspace escape.",
    checklist: [
      {
        id: "denied-path-no-mutation",
        label: "Denied path failure handling does not mutate files",
        detail: "The UI shows the denial and never writes recovery output.",
        state: "blocked",
      },
      {
        id: "denied-path-approval",
        label: "Denied path failure handling requires explicit operator approval",
        detail: "Recovery remains blocked until a future backend-owned approval path exists.",
        state: "approval-required",
      },
    ],
    evidence: ["denied path reason", "path guard mismatch note", "manual review reference"],
  },
  {
    id: "denied-command-failure-handling",
    title: "Denied command failure handling",
    eyebrow: "Phase 1372",
    state: "blocked",
    body:
      "Denied command failures block non-allowlisted commands, unsafe arguments, unsafe working directories, hidden environment access, and shell escalation.",
    checklist: [
      {
        id: "denied-command-no-run",
        label: "Denied command failure handling does not run commands",
        detail: "The cockpit cannot run the denied command or any recovery command.",
        state: "blocked",
      },
      {
        id: "denied-command-approval",
        label: "Denied command failure handling requires explicit operator approval",
        detail: "A future backend command path must verify command allowlist and approval freshness.",
        state: "approval-required",
      },
    ],
    evidence: ["command guard denial", "unsafe argument note", "shell escalation block"],
  },
  {
    id: "approval-expiry-failure-handling",
    title: "Approval expiry failure handling",
    eyebrow: "Phase 1373",
    state: "approval-required",
    body:
      "Approval expiry failures block stale, expired, mismatched, replayed, and scope-invalid tickets and require explicit human re-approval.",
    checklist: [
      {
        id: "approval-not-persisted",
        label: "Approval expiry failure handling does not persist approvals",
        detail: "The UI does not create or refresh approval state.",
        state: "blocked",
      },
      {
        id: "approval-human-reapproval",
        label: "Approval expiry failure handling requires explicit human re-approval",
        detail: "Expired approval recovery remains blocked.",
        state: "approval-required",
      },
    ],
    evidence: ["approval freshness preview", "stale ticket block", "scope invalid block"],
  },
  {
    id: "dirty-workspace-failure-handling",
    title: "Dirty workspace failure handling",
    eyebrow: "Phase 1374",
    state: "manual-review",
    body:
      "Dirty workspace failures preview uncommitted change risk, stale diff risk, conflicting file risk, and manual review requirements without running git from the UI.",
    checklist: [
      {
        id: "dirty-no-git-ui",
        label: "Dirty workspace failure handling does not run git commands from the UI",
        detail: "Workspace risk is represented as review copy only.",
        state: "blocked",
      },
      {
        id: "dirty-approval",
        label: "Dirty workspace failure handling requires explicit operator approval",
        detail: "Dirty workspace recovery remains blocked.",
        state: "approval-required",
      },
    ],
    evidence: ["uncommitted change risk", "stale diff risk", "manual review requirement"],
  },
  {
    id: "preflight-failure-handling",
    title: "Preflight failure handling",
    eyebrow: "Phase 1375",
    state: "blocked",
    body:
      "Preflight failures check goal, plan, diff, command, approval, path guard, command guard, evidence, result, audit, recovery, and queue readiness before any future backend-owned execution.",
    checklist: [
      {
        id: "preflight-no-execute",
        label: "Preflight failure handling does not execute apply or run",
        detail: "A failed preflight stops before execution.",
        state: "blocked",
      },
      {
        id: "preflight-approval",
        label: "Preflight failure handling requires explicit operator approval",
        detail: "Preflight recovery remains blocked.",
        state: "approval-required",
      },
    ],
    evidence: ["preflight readiness matrix", "guard readiness note", "queue readiness note"],
  },
  {
    id: "backend-guard-mismatch-handling",
    title: "Backend guard mismatch handling",
    eyebrow: "Phase 1376",
    state: "blocked",
    body:
      "Backend guard mismatch handling blocks route mismatch, packet mismatch, approval mismatch, path guard mismatch, command guard mismatch, and evidence contract mismatch.",
    checklist: [
      {
        id: "guard-no-release",
        label: "Backend guard mismatch handling does not release execution",
        detail: "A mismatch keeps the backend execution hold intact.",
        state: "blocked",
      },
      {
        id: "guard-approval",
        label: "Backend guard mismatch handling requires explicit operator approval",
        detail: "Backend guard mismatch recovery remains blocked.",
        state: "approval-required",
      },
    ],
    evidence: ["route mismatch block", "packet mismatch block", "evidence contract mismatch block"],
  },
  {
    id: "evidence-capture-failure-handling",
    title: "Evidence capture failure handling",
    eyebrow: "Phase 1377",
    state: "backend-owned",
    body:
      "Evidence capture failures preview missing stdout, stderr, exit code, diff, approval, redaction, operator, audit, and queue references without UI persistence.",
    checklist: [
      {
        id: "evidence-not-persisted",
        label: "Evidence capture failure handling does not persist evidence from the UI",
        detail: "Evidence remains a backend-owned future capture concern.",
        state: "blocked",
      },
      {
        id: "evidence-approval",
        label: "Evidence capture failure handling requires explicit operator approval",
        detail: "Evidence capture recovery remains blocked.",
        state: "approval-required",
      },
    ],
    evidence: ["missing stdout preview", "missing diff preview", "redaction reference gap"],
  },
  {
    id: "result-capture-failure-handling",
    title: "Result capture failure handling",
    eyebrow: "Phase 1378",
    state: "backend-owned",
    body:
      "Result capture failures preview missing success, denied, blocked, failed, timeout, canceled, needs-review, manual-review, retryable, and recovered states without UI persistence.",
    checklist: [
      {
        id: "result-not-persisted",
        label: "Result capture failure handling does not persist results from the UI",
        detail: "Result capture remains backend-owned.",
        state: "blocked",
      },
      {
        id: "result-approval",
        label: "Result capture failure handling requires explicit operator approval",
        detail: "Result capture recovery remains blocked.",
        state: "approval-required",
      },
    ],
    evidence: ["missing terminal state preview", "needs-review state gap", "retryable state gap"],
  },
  {
    id: "audit-capture-failure-handling",
    title: "Audit capture failure handling",
    eyebrow: "Phase 1379",
    state: "backend-owned",
    body:
      "Audit capture failures preview missing goal, plan, diff, apply, command, approval, evidence, result, recovery, queue, operator, and denied-path records without UI persistence.",
    checklist: [
      {
        id: "audit-not-persisted",
        label: "Audit capture failure handling does not persist audit logs from the UI",
        detail: "Audit capture remains backend-owned.",
        state: "blocked",
      },
      {
        id: "audit-approval",
        label: "Audit capture failure handling requires explicit operator approval",
        detail: "Audit capture recovery remains blocked.",
        state: "approval-required",
      },
    ],
    evidence: ["missing audit record preview", "operator record gap", "denied-path record gap"],
  },
  {
    id: "operator-stop-handling",
    title: "Operator stop handling",
    eyebrow: "Phase 1380",
    state: "manual-review",
    body:
      "Operator stop handling previews stop request acknowledgement, backend halt boundary, evidence capture, result capture, audit capture, and manual review path without killing processes from the UI.",
    checklist: [
      {
        id: "stop-no-kill-ui",
        label: "Operator stop handling does not kill processes from the UI",
        detail: "The cockpit can represent a stop request but cannot terminate runtime work.",
        state: "blocked",
      },
      {
        id: "stop-approval",
        label: "Operator stop handling requires explicit operator approval",
        detail: "Operator stop recovery remains blocked.",
        state: "approval-required",
      },
    ],
    evidence: ["stop request acknowledgement", "backend halt boundary", "manual review path"],
  },
  {
    id: "manual-review-handling",
    title: "Manual review handling",
    eyebrow: "Phase 1381",
    state: "manual-review",
    body:
      "Manual review handling previews review reasons, blocked action summary, evidence gaps, result gaps, audit gaps, and next safe operator choices without executing recovery.",
    checklist: [
      {
        id: "manual-no-recovery",
        label: "Manual review handling does not execute recovery",
        detail: "The cockpit presents review context only.",
        state: "blocked",
      },
      {
        id: "manual-approval",
        label: "Manual review handling requires explicit operator approval",
        detail: "Manual review recovery remains blocked.",
        state: "approval-required",
      },
    ],
    evidence: ["review reason list", "blocked action summary", "safe operator choices"],
  },
  {
    id: "recovery-review-packet",
    title: "Recovery review packet",
    eyebrow: "Phase 1382",
    state: "approval-required",
    body:
      "Recovery review packet previews rollback, retry, stop, restore, explain-failure, manual-review, safety-stop, and partial-recovery options without executing recovery.",
    checklist: [
      {
        id: "recovery-no-execute",
        label: "Recovery review packet does not execute rollback retry or recovery",
        detail: "Recovery execution remains blocked.",
        state: "blocked",
      },
      {
        id: "recovery-approval",
        label: "Recovery review packet requires explicit operator approval",
        detail: "Every future recovery action must remain approval-gated.",
        state: "approval-required",
      },
    ],
    evidence: ["rollback option preview", "retry option preview", "safety-stop option preview"],
  },
  {
    id: "rollback-readiness-preview",
    title: "Rollback readiness preview",
    eyebrow: "Phase 1383",
    state: "preview-only",
    body:
      "Rollback readiness preview checks snapshot availability, diff reversibility, touched files, risk notes, evidence references, and audit references without executing rollback.",
    checklist: [
      {
        id: "rollback-no-execute",
        label: "Rollback readiness preview does not execute rollback",
        detail: "Rollback execution remains blocked.",
        state: "blocked",
      },
      {
        id: "rollback-approval",
        label: "Rollback readiness preview requires explicit operator approval",
        detail: "Rollback needs a future backend-owned approval path.",
        state: "approval-required",
      },
    ],
    evidence: ["snapshot availability preview", "diff reversibility preview", "audit reference preview"],
  },
  {
    id: "retry-readiness-preview",
    title: "Retry readiness preview",
    eyebrow: "Phase 1384",
    state: "preview-only",
    body:
      "Retry readiness preview checks retry reason, changed preconditions, approval freshness, guard readiness, evidence gaps, result gaps, and audit continuity without executing retry.",
    checklist: [
      {
        id: "retry-no-execute",
        label: "Retry readiness preview does not execute retry",
        detail: "Retry execution remains blocked.",
        state: "blocked",
      },
      {
        id: "retry-approval",
        label: "Retry readiness preview requires explicit operator approval",
        detail: "Retry requires fresh approval and backend guard verification.",
        state: "approval-required",
      },
    ],
    evidence: ["retry reason preview", "approval freshness preview", "audit continuity preview"],
  },
  {
    id: "controlled-real-trial-hardening-release-candidate",
    title: "Controlled real trial hardening release candidate",
    eyebrow: "Phase 1385",
    state: "approval-required",
    body:
      "The release candidate prepares the tiny real trial for safer backend-owned failure handling without broad execution.",
    checklist: [
      {
        id: "release-no-broadening",
        label:
          "Controlled real trial hardening release candidate does not broaden execution call models write files run commands persist approvals create queues release locks persist results or execute recovery from the frontend",
        detail: "It is a hardening release candidate only.",
        state: "blocked",
      },
      {
        id: "release-approval",
        label: "Controlled real trial hardening release requires explicit operator approval",
        detail: "Release candidate review does not approve future execution.",
        state: "approval-required",
      },
    ],
    evidence: ["release checklist", "no broad execution marker", "backend-owned failure handling marker"],
  },
];

const ROUTES: readonly RealTrialHardeningRouteDefinition[] = [
  {
    slug: "codexforge-cockpit",
    href: "/codexforge-cockpit",
    phase: "Phases 1370-1385",
    title: "Real trial hardening",
    commandLabel: "Go to CodexForge Cockpit",
    summary:
      "Cockpit-centered hardening for the first tiny real controlled operator trial before any broader execution is allowed.",
    markerPhrases: [
      "Real trial hardening",
      "Denied path failure handling",
      "Denied command failure handling",
      "Approval expiry failure handling",
      "Dirty workspace failure handling",
      "Preflight failure handling",
      "Backend guard mismatch handling",
      "Evidence capture failure handling",
      "Result capture failure handling",
      "Audit capture failure handling",
      "Operator stop handling",
      "Manual review handling",
      "Recovery review packet",
      "Rollback readiness preview",
      "Retry readiness preview",
      "No broad execution from the cockpit",
      "No direct recovery execution from the cockpit",
      "No direct rollback execution from the cockpit",
      "No direct retry execution from the cockpit",
      "Real trial hardening keeps backend-owned guarded execution required",
    ],
    handlingCopy:
      "The tiny real trial needs hardening before broader execution because denied paths, denied commands, expired approvals, dirty workspaces, failed preflights, backend guard mismatches, capture gaps, operator stops, manual review, rollback readiness, and retry readiness must all fail closed.",
    deniedCopy:
      "Denied paths and denied commands are handled as blocked review states. Traversal, arbitrary files, binary writes, generated-file violations, workspace escape, non-allowlisted commands, unsafe arguments, unsafe working directories, hidden environment access, and shell escalation remain blocked.",
    approvalCopy:
      "Expired or stale approvals require explicit human re-approval. Rollback, retry, and recovery remain approval-gated and backend-owned.",
    surfaceIds: [
      "real-trial-hardening-boundary",
      "denied-path-failure-handling",
      "denied-command-failure-handling",
      "approval-expiry-failure-handling",
      "dirty-workspace-failure-handling",
      "preflight-failure-handling",
      "backend-guard-mismatch-handling",
      "evidence-capture-failure-handling",
      "result-capture-failure-handling",
      "audit-capture-failure-handling",
      "operator-stop-handling",
      "manual-review-handling",
      "recovery-review-packet",
      "rollback-readiness-preview",
      "retry-readiness-preview",
      "controlled-real-trial-hardening-release-candidate",
    ],
    devOnly: false,
  },
  {
    slug: "real-trial-hardening-boundary",
    href: "/real-trial-hardening-boundary",
    phase: "Phase 1370",
    title: "Real trial hardening boundary",
    commandLabel: "Go to Real Trial Hardening Boundary",
    summary: "Define the hardening-only boundary for the tiny real controlled trial without broadening execution.",
    markerPhrases: [
      "Real trial hardening boundary",
      "Real trial hardening boundary does not broaden execution",
      "Real trial hardening requires explicit operator approval",
      "Hardening boundary keeps tiny real trial behind backend-owned guarded execution",
      "Denied real trial hardening paths remain blocked",
      "Real trial hardening checklist",
    ],
    handlingCopy: "Hardening boundary keeps tiny real trial behind backend-owned guarded execution.",
    deniedCopy: "Denied real trial hardening paths remain blocked.",
    approvalCopy: "Real trial hardening requires explicit operator approval.",
    surfaceIds: ["real-trial-hardening-boundary"],
    devOnly: true,
  },
  {
    slug: "denied-path-failure-handling",
    href: "/denied-path-failure-handling",
    phase: "Phase 1371",
    title: "Denied path failure handling",
    commandLabel: "Go to Denied Path Failure Handling",
    summary: "Preview denied path failure handling without frontend file mutation.",
    markerPhrases: [
      "Denied path failure handling",
      "Denied path failure handling does not mutate files",
      "Denied path failure handling requires explicit operator approval",
      "Denied path failure handling blocks traversal arbitrary files binary writes generated-file violations and workspace escape",
      "Denied path failure recovery remains blocked",
      "Denied path failure checklist",
    ],
    handlingCopy:
      "Denied path failure handling blocks traversal arbitrary files binary writes generated-file violations and workspace escape.",
    deniedCopy: "Denied path failure recovery remains blocked.",
    approvalCopy: "Denied path failure handling requires explicit operator approval.",
    surfaceIds: ["denied-path-failure-handling"],
    devOnly: true,
  },
  {
    slug: "denied-command-failure-handling",
    href: "/denied-command-failure-handling",
    phase: "Phase 1372",
    title: "Denied command failure handling",
    commandLabel: "Go to Denied Command Failure Handling",
    summary: "Preview denied command failure handling without running commands.",
    markerPhrases: [
      "Denied command failure handling",
      "Denied command failure handling does not run commands",
      "Denied command failure handling requires explicit operator approval",
      "Denied command failure handling blocks non-allowlisted commands unsafe arguments unsafe working directories hidden environment access and shell escalation",
      "Denied command recovery remains blocked",
      "Denied command failure checklist",
    ],
    handlingCopy:
      "Denied command failure handling blocks non-allowlisted commands unsafe arguments unsafe working directories hidden environment access and shell escalation.",
    deniedCopy: "Denied command recovery remains blocked.",
    approvalCopy: "Denied command failure handling requires explicit operator approval.",
    surfaceIds: ["denied-command-failure-handling"],
    devOnly: true,
  },
  {
    slug: "approval-expiry-failure-handling",
    href: "/approval-expiry-failure-handling",
    phase: "Phase 1373",
    title: "Approval expiry failure handling",
    commandLabel: "Go to Approval Expiry Failure Handling",
    summary: "Preview stale and expired approval failure handling without persisting approvals.",
    markerPhrases: [
      "Approval expiry failure handling",
      "Approval expiry failure handling does not persist approvals",
      "Approval expiry failure handling requires explicit human re-approval",
      "Approval expiry failure handling blocks stale expired mismatched replayed and scope-invalid approval tickets",
      "Expired approval recovery remains blocked",
      "Approval expiry failure checklist",
    ],
    handlingCopy:
      "Approval expiry failure handling blocks stale expired mismatched replayed and scope-invalid approval tickets.",
    deniedCopy: "Expired approval recovery remains blocked.",
    approvalCopy: "Approval expiry failure handling requires explicit human re-approval.",
    surfaceIds: ["approval-expiry-failure-handling"],
    devOnly: true,
  },
  {
    slug: "dirty-workspace-failure-handling",
    href: "/dirty-workspace-failure-handling",
    phase: "Phase 1374",
    title: "Dirty workspace failure handling",
    commandLabel: "Go to Dirty Workspace Failure Handling",
    summary: "Preview dirty workspace risk without running git commands from the UI.",
    markerPhrases: [
      "Dirty workspace failure handling",
      "Dirty workspace failure handling does not run git commands from the UI",
      "Dirty workspace failure handling requires explicit operator approval",
      "Dirty workspace failure handling previews uncommitted change risk stale diff risk conflicting file risk and manual review requirements",
      "Dirty workspace recovery remains blocked",
      "Dirty workspace failure checklist",
    ],
    handlingCopy:
      "Dirty workspace failure handling previews uncommitted change risk stale diff risk conflicting file risk and manual review requirements.",
    deniedCopy: "Dirty workspace recovery remains blocked.",
    approvalCopy: "Dirty workspace failure handling requires explicit operator approval.",
    surfaceIds: ["dirty-workspace-failure-handling"],
    devOnly: true,
  },
  {
    slug: "preflight-failure-handling",
    href: "/preflight-failure-handling",
    phase: "Phase 1375",
    title: "Preflight failure handling",
    commandLabel: "Go to Preflight Failure Handling",
    summary: "Preview preflight failure handling without apply or run execution.",
    markerPhrases: [
      "Preflight failure handling",
      "Preflight failure handling does not execute apply or run",
      "Preflight failure handling requires explicit operator approval",
      "Preflight failure handling checks goal plan diff command approval path guard command guard evidence result audit recovery and queue readiness",
      "Preflight recovery remains blocked",
      "Preflight failure checklist",
    ],
    handlingCopy:
      "Preflight failure handling checks goal plan diff command approval path guard command guard evidence result audit recovery and queue readiness.",
    deniedCopy: "Preflight recovery remains blocked.",
    approvalCopy: "Preflight failure handling requires explicit operator approval.",
    surfaceIds: ["preflight-failure-handling"],
    devOnly: true,
  },
  {
    slug: "backend-guard-mismatch-handling",
    href: "/backend-guard-mismatch-handling",
    phase: "Phase 1376",
    title: "Backend guard mismatch handling",
    commandLabel: "Go to Backend Guard Mismatch Handling",
    summary: "Preview backend guard mismatch handling without releasing execution.",
    markerPhrases: [
      "Backend guard mismatch handling",
      "Backend guard mismatch handling does not release execution",
      "Backend guard mismatch handling requires explicit operator approval",
      "Backend guard mismatch handling blocks route mismatch packet mismatch approval mismatch path guard mismatch command guard mismatch and evidence contract mismatch",
      "Backend guard mismatch recovery remains blocked",
      "Backend guard mismatch checklist",
    ],
    handlingCopy:
      "Backend guard mismatch handling blocks route mismatch packet mismatch approval mismatch path guard mismatch command guard mismatch and evidence contract mismatch.",
    deniedCopy: "Backend guard mismatch recovery remains blocked.",
    approvalCopy: "Backend guard mismatch handling requires explicit operator approval.",
    surfaceIds: ["backend-guard-mismatch-handling"],
    devOnly: true,
  },
  {
    slug: "evidence-capture-failure-handling",
    href: "/evidence-capture-failure-handling",
    phase: "Phase 1377",
    title: "Evidence capture failure handling",
    commandLabel: "Go to Evidence Capture Failure Handling",
    summary: "Preview evidence capture failure handling without UI evidence persistence.",
    markerPhrases: [
      "Evidence capture failure handling",
      "Evidence capture failure handling does not persist evidence from the UI",
      "Evidence capture failure handling requires explicit operator approval",
      "Evidence capture failure handling previews missing stdout stderr exit code diff approval redaction operator audit and queue references",
      "Evidence capture recovery remains blocked",
      "Evidence capture failure checklist",
    ],
    handlingCopy:
      "Evidence capture failure handling previews missing stdout stderr exit code diff approval redaction operator audit and queue references.",
    deniedCopy: "Evidence capture recovery remains blocked.",
    approvalCopy: "Evidence capture failure handling requires explicit operator approval.",
    surfaceIds: ["evidence-capture-failure-handling"],
    devOnly: true,
  },
  {
    slug: "result-capture-failure-handling",
    href: "/result-capture-failure-handling",
    phase: "Phase 1378",
    title: "Result capture failure handling",
    commandLabel: "Go to Result Capture Failure Handling",
    summary: "Preview result capture failure handling without UI result persistence.",
    markerPhrases: [
      "Result capture failure handling",
      "Result capture failure handling does not persist results from the UI",
      "Result capture failure handling requires explicit operator approval",
      "Result capture failure handling previews missing success denied blocked failed timeout canceled needs-review manual-review retryable and recovered states",
      "Result capture recovery remains blocked",
      "Result capture failure checklist",
    ],
    handlingCopy:
      "Result capture failure handling previews missing success denied blocked failed timeout canceled needs-review manual-review retryable and recovered states.",
    deniedCopy: "Result capture recovery remains blocked.",
    approvalCopy: "Result capture failure handling requires explicit operator approval.",
    surfaceIds: ["result-capture-failure-handling"],
    devOnly: true,
  },
  {
    slug: "audit-capture-failure-handling",
    href: "/audit-capture-failure-handling",
    phase: "Phase 1379",
    title: "Audit capture failure handling",
    commandLabel: "Go to Audit Capture Failure Handling",
    summary: "Preview audit capture failure handling without UI audit persistence.",
    markerPhrases: [
      "Audit capture failure handling",
      "Audit capture failure handling does not persist audit logs from the UI",
      "Audit capture failure handling requires explicit operator approval",
      "Audit capture failure handling previews missing goal plan diff apply command approval evidence result recovery queue operator and denied-path records",
      "Audit capture recovery remains blocked",
      "Audit capture failure checklist",
    ],
    handlingCopy:
      "Audit capture failure handling previews missing goal plan diff apply command approval evidence result recovery queue operator and denied-path records.",
    deniedCopy: "Audit capture recovery remains blocked.",
    approvalCopy: "Audit capture failure handling requires explicit operator approval.",
    surfaceIds: ["audit-capture-failure-handling"],
    devOnly: true,
  },
  {
    slug: "operator-stop-handling",
    href: "/operator-stop-handling",
    phase: "Phase 1380",
    title: "Operator stop handling",
    commandLabel: "Go to Operator Stop Handling",
    summary: "Preview operator stop handling without killing processes from the UI.",
    markerPhrases: [
      "Operator stop handling",
      "Operator stop handling does not kill processes from the UI",
      "Operator stop handling requires explicit operator approval",
      "Operator stop handling previews stop request acknowledgement backend halt boundary evidence capture result capture audit capture and manual review path",
      "Operator stop recovery remains blocked",
      "Operator stop checklist",
    ],
    handlingCopy:
      "Operator stop handling previews stop request acknowledgement backend halt boundary evidence capture result capture audit capture and manual review path.",
    deniedCopy: "Operator stop recovery remains blocked.",
    approvalCopy: "Operator stop handling requires explicit operator approval.",
    surfaceIds: ["operator-stop-handling"],
    devOnly: true,
  },
  {
    slug: "manual-review-handling",
    href: "/manual-review-handling",
    phase: "Phase 1381",
    title: "Manual review handling",
    commandLabel: "Go to Manual Review Handling",
    summary: "Preview manual review handling without executing recovery.",
    markerPhrases: [
      "Manual review handling",
      "Manual review handling does not execute recovery",
      "Manual review handling requires explicit operator approval",
      "Manual review handling previews review reasons blocked action summary evidence gaps result gaps audit gaps and next safe operator choices",
      "Manual review recovery remains blocked",
      "Manual review checklist",
    ],
    handlingCopy:
      "Manual review handling previews review reasons blocked action summary evidence gaps result gaps audit gaps and next safe operator choices.",
    deniedCopy: "Manual review recovery remains blocked.",
    approvalCopy: "Manual review handling requires explicit operator approval.",
    surfaceIds: ["manual-review-handling"],
    devOnly: true,
  },
  {
    slug: "recovery-review-packet",
    href: "/recovery-review-packet",
    phase: "Phase 1382",
    title: "Recovery review packet",
    commandLabel: "Go to Recovery Review Packet",
    summary: "Preview recovery review options without executing rollback retry or recovery.",
    markerPhrases: [
      "Recovery review packet",
      "Recovery review packet does not execute rollback retry or recovery",
      "Recovery review packet requires explicit operator approval",
      "Recovery review packet previews rollback retry stop restore explain-failure manual-review safety-stop and partial-recovery options",
      "Recovery execution remains blocked",
      "Recovery review checklist",
    ],
    handlingCopy:
      "Recovery review packet previews rollback retry stop restore explain-failure manual-review safety-stop and partial-recovery options.",
    deniedCopy: "Recovery execution remains blocked.",
    approvalCopy: "Recovery review packet requires explicit operator approval.",
    surfaceIds: ["recovery-review-packet"],
    devOnly: true,
  },
  {
    slug: "rollback-readiness-preview",
    href: "/rollback-readiness-preview",
    phase: "Phase 1383",
    title: "Rollback readiness preview",
    commandLabel: "Go to Rollback Readiness Preview",
    summary: "Preview rollback readiness without executing rollback.",
    markerPhrases: [
      "Rollback readiness preview",
      "Rollback readiness preview does not execute rollback",
      "Rollback readiness preview requires explicit operator approval",
      "Rollback readiness preview checks snapshot availability diff reversibility touched files risk notes evidence references and audit references",
      "Rollback execution remains blocked",
      "Rollback readiness checklist",
    ],
    handlingCopy:
      "Rollback readiness preview checks snapshot availability diff reversibility touched files risk notes evidence references and audit references.",
    deniedCopy: "Rollback execution remains blocked.",
    approvalCopy: "Rollback readiness preview requires explicit operator approval.",
    surfaceIds: ["rollback-readiness-preview"],
    devOnly: true,
  },
  {
    slug: "retry-readiness-preview",
    href: "/retry-readiness-preview",
    phase: "Phase 1384",
    title: "Retry readiness preview",
    commandLabel: "Go to Retry Readiness Preview",
    summary: "Preview retry readiness without executing retry.",
    markerPhrases: [
      "Retry readiness preview",
      "Retry readiness preview does not execute retry",
      "Retry readiness preview requires explicit operator approval",
      "Retry readiness preview checks retry reason changed preconditions approval freshness guard readiness evidence gaps result gaps and audit continuity",
      "Retry execution remains blocked",
      "Retry readiness checklist",
    ],
    handlingCopy:
      "Retry readiness preview checks retry reason changed preconditions approval freshness guard readiness evidence gaps result gaps and audit continuity.",
    deniedCopy: "Retry execution remains blocked.",
    approvalCopy: "Retry readiness preview requires explicit operator approval.",
    surfaceIds: ["retry-readiness-preview"],
    devOnly: true,
  },
  {
    slug: "controlled-real-trial-hardening-release-candidate",
    href: "/controlled-real-trial-hardening-release-candidate",
    phase: "Phase 1385",
    title: "Controlled real trial hardening release candidate",
    commandLabel: "Go to Controlled Real Trial Hardening Release Candidate",
    summary: "Prepare the tiny real trial for safer backend-owned failure handling without broad execution.",
    markerPhrases: [
      "Controlled real trial hardening release candidate",
      "Controlled real trial hardening release candidate does not broaden execution call models write files run commands persist approvals create queues release locks persist results or execute recovery from the frontend",
      "Controlled real trial hardening release requires explicit operator approval",
      "Release candidate prepares CodexForge tiny real trial for safer backend-owned failure handling without broad execution",
      "Denied controlled real trial hardening paths remain blocked",
      "Controlled real trial hardening release checklist",
    ],
    handlingCopy:
      "Release candidate prepares CodexForge tiny real trial for safer backend-owned failure handling without broad execution.",
    deniedCopy: "Denied controlled real trial hardening paths remain blocked.",
    approvalCopy: "Controlled real trial hardening release requires explicit operator approval.",
    surfaceIds: ["controlled-real-trial-hardening-release-candidate"],
    devOnly: true,
  },
] as const;

export function buildRealTrialHardeningStableKey(parts: readonly string[]): string {
  return parts.join(":").toLowerCase().replace(/[^a-z0-9:/-]+/g, "-");
}

export function listRealTrialHardeningRouteDefinitions(): readonly RealTrialHardeningRouteDefinition[] {
  return ROUTES;
}

export function getRealTrialHardeningRouteDefinition(
  slug: RealTrialHardeningRouteSlug
): RealTrialHardeningRouteDefinition {
  return ROUTES.find((candidate) => candidate.slug === slug) ?? ROUTES[0];
}

export function buildRealTrialHardeningRouteModel(
  slug: RealTrialHardeningRouteSlug = "codexforge-cockpit"
): RealTrialHardeningRouteModel {
  const route = getRealTrialHardeningRouteDefinition(slug);
  const selectedSurfaces = route.surfaceIds
    .map((surfaceId) => SURFACES.find((surface) => surface.id === surfaceId))
    .filter((surface): surface is RealTrialHardeningSurface => Boolean(surface));

  return {
    route,
    hardening: HARDENING_MODEL,
    surfaces: selectedSurfaces.length > 0 ? selectedSurfaces : SURFACES,
    globalSafetyCopy: GLOBAL_SAFETY_COPY,
    hardeningFlow: HARDENING_FLOW,
    summary: summarizeRealTrialHardeningRoute(route),
  };
}

export function buildCodexForgeRealTrialHardeningCockpitModel(): RealTrialHardeningRouteModel {
  return buildRealTrialHardeningRouteModel("codexforge-cockpit");
}

export function summarizeRealTrialHardeningRouteModel(model: RealTrialHardeningRouteModel): string {
  return [
    model.route.phase,
    model.route.title,
    model.route.summary,
    model.hardening.hardeningId,
    model.hardening.trialId,
    model.hardening.goNoGoDecision,
  ].join(" | ");
}

function summarizeRealTrialHardeningRoute(route: RealTrialHardeningRouteDefinition): string {
  return [route.phase, route.title, route.summary, route.approvalCopy, route.deniedCopy].join(" | ");
}
