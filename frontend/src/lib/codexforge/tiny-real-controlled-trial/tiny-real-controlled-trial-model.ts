export type TinyRealControlledTrialRouteSlug =
  | "codexforge-cockpit"
  | "tiny-real-controlled-trial-boundary"
  | "tiny-real-file-write-candidate"
  | "tiny-real-command-candidate"
  | "tiny-real-approval-ticket"
  | "tiny-real-backend-execution-hold"
  | "tiny-real-path-guard"
  | "tiny-real-command-guard"
  | "tiny-real-preflight-review"
  | "tiny-real-evidence-capture-contract"
  | "tiny-real-result-capture-contract"
  | "tiny-real-audit-capture-contract"
  | "tiny-real-recovery-contract"
  | "tiny-real-denied-path-matrix"
  | "tiny-real-operator-signoff"
  | "first-tiny-real-controlled-candidate"
  | "controlled-tiny-real-operator-trial-release-candidate";

export type TinyRealControlledTrialPanelState =
  | "blocked"
  | "candidate-only"
  | "approval-required"
  | "backend-owned"
  | "review-only";

export type TinyRealControlledTrialChecklistItem = {
  id: string;
  label: string;
  detail: string;
  state: TinyRealControlledTrialPanelState;
};

export type TinyRealControlledTrialSurface = {
  id: string;
  title: string;
  eyebrow: string;
  state: TinyRealControlledTrialPanelState;
  body: string;
  checklist: readonly TinyRealControlledTrialChecklistItem[];
  evidence: readonly string[];
};

export type TinyRealSandboxWriteCandidate = {
  path: string;
  diffSummary: string;
  guardStatement: string;
  approvalRequirement: string;
};

export type TinyRealCommandCandidate = {
  command: string;
  workingDirectory: string;
  guardStatement: string;
  timeout: string;
  approvalRequirement: string;
};

export type TinyRealControlledTrialContract = {
  trialId: string;
  trialKind: string;
  goal: string;
  workspaceBoundary: string;
  sandboxWriteCandidate: TinyRealSandboxWriteCandidate;
  commandCandidate: TinyRealCommandCandidate;
  approvalTicket: readonly string[];
  executionHold: string;
  pathGuard: readonly string[];
  commandGuard: readonly string[];
  preflightReview: readonly string[];
  evidenceCaptureContract: readonly string[];
  resultCaptureContract: readonly string[];
  auditCaptureContract: readonly string[];
  recoveryContract: readonly string[];
  deniedPathMatrix: readonly string[];
  operatorSignoff: readonly string[];
  goNoGoDecision: string;
  explicitSafetyLimits: readonly string[];
};

export type TinyRealControlledTrialRouteDefinition = {
  slug: TinyRealControlledTrialRouteSlug;
  href: string;
  phase: string;
  title: string;
  commandLabel: string;
  summary: string;
  markerPhrases: readonly string[];
  deniedCopy: string;
  approvalCopy: string;
  surfaceIds: readonly string[];
  devOnly: boolean;
};

export type TinyRealControlledTrialRouteModel = {
  route: TinyRealControlledTrialRouteDefinition;
  contract: TinyRealControlledTrialContract;
  surfaces: readonly TinyRealControlledTrialSurface[];
  globalSafetyCopy: readonly string[];
  trialReviewFlow: readonly string[];
  summary: string;
};

export const TINY_REAL_CONTROLLED_TRIAL_COCKPIT_LANGUAGE = [
  "Tiny real controlled trial",
  "Tiny real file write candidate",
  "Tiny real command candidate",
  "Tiny real approval ticket",
  "Tiny real backend execution hold",
  "Tiny real path guard",
  "Tiny real command guard",
  "Tiny real preflight review",
  "Tiny real evidence capture contract",
  "Tiny real result capture contract",
  "Tiny real audit capture contract",
  "Tiny real recovery contract",
  "Tiny real denied path matrix",
  "Tiny real operator signoff",
  "No broad execution from the cockpit",
  "No direct file mutation from the cockpit",
  "No direct command execution from the cockpit",
  "Tiny real trial requires backend-owned guarded execution",
  "Tiny real trial requires explicit operator approval",
].join(" | ");

const GLOBAL_SAFETY_COPY = [
  "This is a tiny real controlled operator trial.",
  "It is not broad execution.",
  "It requires explicit operator approval.",
  "It requires backend-owned execution.",
  "The frontend cockpit cannot directly mutate files.",
  "The frontend cockpit cannot directly run commands.",
  "The first write candidate is sandbox-bounded.",
  "The first command candidate is allowlisted and review-only until backend approval.",
  "Evidence/result/audit capture is backend-owned.",
  "Recovery remains approval-gated.",
  "No broad execution from the cockpit.",
  "No direct file mutation from the cockpit.",
  "No direct command execution from the cockpit.",
  "Tiny real trial requires backend-owned guarded execution.",
  "Tiny real trial requires explicit operator approval.",
  "Normal operation remains centered on /codexforge-cockpit.",
  "Phase pages remain dev/test diagnostics only.",
  "No model calls, provider calls, connector calls, adapter calls, runtime starts, process spawning, port binding, package installation, deployment, scaffold creation, approval persistence, queue persistence, direct frontend file mutation, direct frontend command execution, broad backend execution, evidence persistence, result persistence, audit persistence, recovery execution, secret reads, or memory promotion occurs from this preview.",
] as const;

const TRIAL_REVIEW_FLOW = [
  "tiny real controlled trial boundary",
  "sandbox write candidate review",
  "allowlisted command candidate review",
  "explicit approval ticket review",
  "backend execution hold",
  "path guard",
  "command guard",
  "preflight review",
  "evidence capture contract",
  "result capture contract",
  "audit capture contract",
  "recovery contract",
  "denied path matrix",
  "operator signoff",
  "go/no-go decision",
] as const;

const DENIED_PATH_MATRIX = [
  "blocked prompts",
  "blocked models",
  "blocked providers",
  "blocked connectors",
  "blocked arbitrary files",
  "blocked arbitrary commands",
  "blocked git",
  "blocked tests",
  "blocked builds",
  "blocked smokes",
  "blocked runtimes",
  "blocked adapters",
  "blocked persistence",
  "blocked export",
  "blocked recovery",
  "blocked queues",
  "blocked deploy",
  "blocked install",
  "blocked scaffold",
  "blocked secrets",
  "blocked memory promotion",
  "blocked broad backend execution",
] as const;

const TRIAL_CONTRACT: TinyRealControlledTrialContract = {
  trialId: "codexforge-tiny-real-controlled-trial-1354-1369",
  trialKind: "tiny-real-controlled-operator-trial",
  goal:
    "Create the first tiny real controlled operator trial contract for one sandbox-bounded file write candidate and one allowlisted read-only command candidate while broad execution remains blocked.",
  workspaceBoundary:
    "Workspace boundary is the current project root only. The cockpit previews the candidate and cannot browse arbitrary files, write files, run commands, persist approvals, persist queues, or release execution.",
  sandboxWriteCandidate: {
    path: "sandbox/tiny-real-controlled-trial/approved-note.txt",
    diffSummary:
      "Create or replace one small text note containing a deterministic trial marker, only after explicit operator approval and backend-owned path guard verification.",
    guardStatement:
      "File write candidate is sandbox-bounded path-guarded diff-reviewed and backend-owned.",
    approvalRequirement: "Tiny real file write candidate requires explicit operator approval.",
  },
  commandCandidate: {
    command:
      'rg --fixed-strings "Tiny real controlled trial" src/lib/codexforge/tiny-real-controlled-trial',
    workingDirectory: "workspace root",
    guardStatement:
      "Command candidate is allowlisted argument-guarded working-directory-guarded timeout-bounded and backend-owned.",
    timeout: "5 seconds",
    approvalRequirement: "Tiny real command candidate requires explicit operator approval.",
  },
  approvalTicket: [
    "operator identity preview",
    "trial scope preview",
    "approval expiry preview",
    "replay protection preview",
    "denied paths preview",
    "backend authorization checks preview",
  ],
  executionHold:
    "Execution hold keeps apply and command run blocked until backend-owned guards verify the ticket.",
  pathGuard: [
    "workspace root containment",
    "path traversal denial",
    "sandbox candidate only",
    "generated file policy",
    "binary guard",
    "rollback readiness",
  ],
  commandGuard: [
    "rg allowlist candidate",
    "fixed-string argument review",
    "workspace root working directory",
    "environment-name-only display",
    "timeout bound",
    "cancellation readiness",
    "stdout stderr and exit-code capture",
  ],
  preflightReview: [
    "goal",
    "plan",
    "diff",
    "command",
    "approval ticket",
    "path guard",
    "command guard",
    "evidence readiness",
    "result readiness",
    "audit readiness",
    "recovery readiness",
  ],
  evidenceCaptureContract: [
    "diff reference",
    "command reference",
    "stdout reference",
    "stderr reference",
    "exit code reference",
    "approval timestamp",
    "redaction requirement",
    "operator audit reference",
    "queue reference",
  ],
  resultCaptureContract: [
    "success",
    "denied",
    "blocked",
    "failed",
    "timeout",
    "canceled",
    "needs-review",
    "manual-review",
    "retryable",
    "recovered",
  ],
  auditCaptureContract: [
    "goal",
    "plan",
    "diff",
    "apply",
    "command",
    "approval",
    "evidence",
    "result",
    "recovery",
    "queue",
    "operator",
    "denied-path records",
  ],
  recoveryContract: [
    "rollback",
    "retry",
    "stop",
    "restore",
    "explain-failure",
    "manual-review",
    "safety-stop",
    "partial-recovery",
  ],
  deniedPathMatrix: DENIED_PATH_MATRIX,
  operatorSignoff: [
    "goal scope",
    "sandbox path",
    "command allowlist",
    "evidence contract",
    "result contract",
    "audit contract",
    "recovery contract",
    "go/no-go decision",
  ],
  goNoGoDecision:
    "No-go for broad execution. Go is only possible for the tiny backend-owned guarded trial after explicit operator approval; until then the cockpit remains preview-only.",
  explicitSafetyLimits: GLOBAL_SAFETY_COPY,
} as const;

const SURFACES: readonly TinyRealControlledTrialSurface[] = [
  {
    id: "trial-boundary",
    title: "Tiny real controlled trial boundary",
    eyebrow: "Boundary",
    state: "blocked",
    body:
      "Defines the first tiny real controlled trial path and separates cockpit preview from backend-owned guarded execution. It is intentionally tiny so the first real action is one sandbox-bounded write candidate and one allowlisted read-only command candidate.",
    checklist: [
      {
        id: "boundary-no-broad-execution",
        label: "Broad execution blocked",
        detail: "Tiny real controlled trial boundary does not allow broad execution.",
        state: "blocked",
      },
      {
        id: "boundary-approval",
        label: "Approval required",
        detail: "Tiny real controlled trial requires explicit operator approval.",
        state: "approval-required",
      },
    ],
    evidence: ["tiny trial only", "backend-owned guard required", "cockpit preview only"],
  },
  {
    id: "file-write-candidate",
    title: "Tiny real file write candidate",
    eyebrow: "File write",
    state: "candidate-only",
    body:
      "Previews one sandbox-bounded file write candidate. The frontend cannot write it; a future backend-owned guarded executor must verify approval, path guard, diff review, evidence, result, audit, and recovery requirements.",
    checklist: [
      {
        id: "file-no-frontend-write",
        label: "No direct write",
        detail: "Tiny real file write candidate does not let the frontend write files directly.",
        state: "blocked",
      },
      {
        id: "file-approval",
        label: "Approval required",
        detail: "Tiny real file write candidate requires explicit operator approval.",
        state: "approval-required",
      },
    ],
    evidence: [TRIAL_CONTRACT.sandboxWriteCandidate.path, "path guard", "diff review", "backend-owned"],
  },
  {
    id: "command-candidate",
    title: "Tiny real command candidate",
    eyebrow: "Command",
    state: "candidate-only",
    body:
      "Previews one allowlisted read-only command candidate. The frontend cannot run it; the candidate remains review-only until explicit approval and backend-owned command guard verification.",
    checklist: [
      {
        id: "command-no-frontend-run",
        label: "No direct command",
        detail: "Tiny real command candidate does not let the frontend run commands directly.",
        state: "blocked",
      },
      {
        id: "command-approval",
        label: "Approval required",
        detail: "Tiny real command candidate requires explicit operator approval.",
        state: "approval-required",
      },
    ],
    evidence: [TRIAL_CONTRACT.commandCandidate.command, "allowlist", "argument guard", "timeout-bounded"],
  },
  {
    id: "approval-ticket",
    title: "Tiny real approval ticket",
    eyebrow: "Approval",
    state: "approval-required",
    body:
      "Previews operator identity, scope, expiry, replay protection, denied paths, and backend authorization checks without persisting hidden approvals or releasing execution.",
    checklist: [
      {
        id: "approval-no-hidden",
        label: "No hidden approval",
        detail: "Tiny real approval ticket does not persist hidden approvals.",
        state: "blocked",
      },
      {
        id: "approval-human",
        label: "Human approval",
        detail: "Tiny real approval ticket requires explicit human approval.",
        state: "approval-required",
      },
    ],
    evidence: TRIAL_CONTRACT.approvalTicket,
  },
  {
    id: "backend-execution-hold",
    title: "Tiny real backend execution hold",
    eyebrow: "Execution hold",
    state: "backend-owned",
    body:
      "Keeps the tiny apply and command run blocked from the frontend until a future backend-owned guard verifies the explicit approval ticket.",
    checklist: [
      {
        id: "hold-no-frontend-release",
        label: "No frontend release",
        detail: "Tiny real backend execution hold does not release execution from the frontend.",
        state: "blocked",
      },
      {
        id: "hold-approval",
        label: "Approval required",
        detail: "Tiny real backend execution hold requires explicit operator approval.",
        state: "approval-required",
      },
    ],
    evidence: ["apply hold", "command hold", "backend ticket verification"],
  },
  {
    id: "path-guard",
    title: "Tiny real path guard",
    eyebrow: "Path guard",
    state: "backend-owned",
    body:
      "Checks workspace root containment, traversal denial, generated file policy, binary guard, and rollback readiness for the single sandbox candidate.",
    checklist: [
      {
        id: "path-no-frontend-browse",
        label: "No arbitrary paths",
        detail: "Tiny real path guard does not browse arbitrary files or write files from the frontend.",
        state: "blocked",
      },
      {
        id: "path-approval",
        label: "Approval required",
        detail: "Tiny real path guard requires explicit operator approval.",
        state: "approval-required",
      },
    ],
    evidence: TRIAL_CONTRACT.pathGuard,
  },
  {
    id: "command-guard",
    title: "Tiny real command guard",
    eyebrow: "Command guard",
    state: "backend-owned",
    body:
      "Checks allowlist, arguments, working directory, environment-name-only display, timeout, cancellation, stdout, stderr, and exit-code capture for the single command candidate.",
    checklist: [
      {
        id: "command-guard-no-run",
        label: "No frontend run",
        detail: "Tiny real command guard does not run commands from the frontend.",
        state: "blocked",
      },
      {
        id: "command-guard-approval",
        label: "Approval required",
        detail: "Tiny real command guard requires explicit operator approval.",
        state: "approval-required",
      },
    ],
    evidence: TRIAL_CONTRACT.commandGuard,
  },
  {
    id: "preflight-review",
    title: "Tiny real preflight review",
    eyebrow: "Preflight",
    state: "review-only",
    body:
      "Verifies goal, plan, diff, command, approval ticket, path guard, command guard, evidence, result, audit, and recovery readiness before any future backend-owned trial could proceed.",
    checklist: [
      {
        id: "preflight-no-execute",
        label: "No apply or run",
        detail: "Tiny real preflight review does not execute apply or run.",
        state: "blocked",
      },
      {
        id: "preflight-approval",
        label: "Approval required",
        detail: "Tiny real preflight review requires explicit operator approval.",
        state: "approval-required",
      },
    ],
    evidence: TRIAL_CONTRACT.preflightReview,
  },
  {
    id: "evidence-capture-contract",
    title: "Tiny real evidence capture contract",
    eyebrow: "Evidence",
    state: "backend-owned",
    body:
      "Defines backend-owned capture for diff, command, stdout, stderr, exit code, approval timestamp, redaction, operator audit, and queue references.",
    checklist: [
      {
        id: "evidence-no-frontend-persist",
        label: "No frontend persistence",
        detail: "Tiny real evidence capture contract does not persist evidence from the frontend.",
        state: "blocked",
      },
      {
        id: "evidence-approval",
        label: "Approval required",
        detail: "Tiny real evidence capture contract requires explicit operator approval.",
        state: "approval-required",
      },
    ],
    evidence: TRIAL_CONTRACT.evidenceCaptureContract,
  },
  {
    id: "result-capture-contract",
    title: "Tiny real result capture contract",
    eyebrow: "Result",
    state: "backend-owned",
    body:
      "Defines backend-owned result capture for success, denied, blocked, failed, timeout, canceled, needs-review, manual-review, retryable, and recovered states.",
    checklist: [
      {
        id: "result-no-frontend-persist",
        label: "No frontend persistence",
        detail: "Tiny real result capture contract does not persist results from the frontend.",
        state: "blocked",
      },
      {
        id: "result-approval",
        label: "Approval required",
        detail: "Tiny real result capture contract requires explicit operator approval.",
        state: "approval-required",
      },
    ],
    evidence: TRIAL_CONTRACT.resultCaptureContract,
  },
  {
    id: "audit-capture-contract",
    title: "Tiny real audit capture contract",
    eyebrow: "Audit",
    state: "backend-owned",
    body:
      "Defines backend-owned audit capture for goal, plan, diff, apply, command, approval, evidence, result, recovery, queue, operator, and denied-path records.",
    checklist: [
      {
        id: "audit-no-frontend-persist",
        label: "No frontend persistence",
        detail: "Tiny real audit capture contract does not persist audit logs from the frontend.",
        state: "blocked",
      },
      {
        id: "audit-approval",
        label: "Approval required",
        detail: "Tiny real audit capture contract requires explicit operator approval.",
        state: "approval-required",
      },
    ],
    evidence: TRIAL_CONTRACT.auditCaptureContract,
  },
  {
    id: "recovery-contract",
    title: "Tiny real recovery contract",
    eyebrow: "Recovery",
    state: "approval-required",
    body:
      "Keeps rollback, retry, stop, restore, explain-failure, manual-review, safety-stop, and partial-recovery actions approval-gated and backend-owned.",
    checklist: [
      {
        id: "recovery-no-frontend-execute",
        label: "No frontend recovery",
        detail: "Tiny real recovery contract does not execute recovery from the frontend.",
        state: "blocked",
      },
      {
        id: "recovery-approval",
        label: "Approval required",
        detail: "Tiny real recovery contract requires explicit operator approval.",
        state: "approval-required",
      },
    ],
    evidence: TRIAL_CONTRACT.recoveryContract,
  },
  {
    id: "denied-path-matrix",
    title: "Tiny real denied path matrix",
    eyebrow: "Denied paths",
    state: "blocked",
    body:
      "Lists blocked prompts, models, providers, connectors, arbitrary files, commands, git, tests, builds, smokes, runtimes, adapters, persistence, export, recovery, queues, deploy, install, scaffold, secrets, memory promotion, and broad backend execution.",
    checklist: [
      {
        id: "denied-no-workflow-mutation",
        label: "No workflow mutation",
        detail: "Tiny real denied path matrix does not mutate workflow state.",
        state: "blocked",
      },
      {
        id: "denied-approval",
        label: "Approval required",
        detail: "Tiny real denied path matrix requires explicit operator approval.",
        state: "approval-required",
      },
    ],
    evidence: TRIAL_CONTRACT.deniedPathMatrix,
  },
  {
    id: "operator-signoff",
    title: "Tiny real operator signoff",
    eyebrow: "Signoff",
    state: "approval-required",
    body:
      "Previews goal, scope, sandbox path, command allowlist, evidence, result, audit, recovery, and go/no-go decision without automatically releasing execution.",
    checklist: [
      {
        id: "signoff-no-auto-release",
        label: "No auto release",
        detail: "Tiny real operator signoff does not release execution automatically.",
        state: "blocked",
      },
      {
        id: "signoff-human",
        label: "Human approval",
        detail: "Tiny real operator signoff requires explicit human approval.",
        state: "approval-required",
      },
    ],
    evidence: TRIAL_CONTRACT.operatorSignoff,
  },
  {
    id: "go-no-go-review",
    title: "Tiny real go/no-go review",
    eyebrow: "Decision",
    state: "review-only",
    body:
      "Reports that broad execution remains blocked. A go decision can only apply to the tiny backend-owned guarded trial after explicit operator approval and guard verification.",
    checklist: [
      {
        id: "go-no-go-broad-blocked",
        label: "Broad execution blocked",
        detail: "First tiny real controlled candidate does not allow broad apply or run.",
        state: "blocked",
      },
      {
        id: "go-no-go-approval",
        label: "Approval required",
        detail: "Controlled tiny real operator trial release requires explicit operator approval.",
        state: "approval-required",
      },
    ],
    evidence: ["no-go for broad execution", "tiny trial only", "backend-owned guard required"],
  },
] as const;

const ALL_SURFACE_IDS = SURFACES.map((surface) => surface.id);

const ROUTES: readonly TinyRealControlledTrialRouteDefinition[] = [
  {
    slug: "codexforge-cockpit",
    href: "/codexforge-cockpit",
    phase: "Cockpit",
    title: "Tiny real controlled trial",
    commandLabel: "Go to Unified CodexForge Cockpit",
    summary:
      "The cockpit previews the first tiny real controlled trial path while direct file mutation, direct command execution, and broad execution remain blocked.",
    markerPhrases: [
      "Tiny real controlled trial",
      "Tiny real file write candidate",
      "Tiny real command candidate",
      "Tiny real approval ticket",
      "Tiny real backend execution hold",
      "Tiny real path guard",
      "Tiny real command guard",
      "Tiny real preflight review",
      "Tiny real evidence capture contract",
      "Tiny real result capture contract",
      "Tiny real audit capture contract",
      "Tiny real recovery contract",
      "Tiny real denied path matrix",
      "Tiny real operator signoff",
      "No broad execution from the cockpit",
      "No direct file mutation from the cockpit",
      "No direct command execution from the cockpit",
      "Tiny real trial requires backend-owned guarded execution",
      "Tiny real trial requires explicit operator approval",
    ],
    deniedCopy: "Broad execution, direct frontend file mutation, direct frontend command execution, hidden approval, persistence, recovery execution, and provider/model/connector/adapter/runtime calls remain blocked.",
    approvalCopy: "Tiny real trial requires explicit operator approval and backend-owned guarded execution.",
    surfaceIds: ALL_SURFACE_IDS,
    devOnly: false,
  },
  {
    slug: "tiny-real-controlled-trial-boundary",
    href: "/tiny-real-controlled-trial-boundary",
    phase: "Phase 1354",
    title: "Tiny real controlled trial boundary",
    commandLabel: "Go to Tiny Real Controlled Trial Boundary",
    summary: "Tiny real controlled trial boundary separates cockpit preview from backend-owned guarded execution.",
    markerPhrases: [
      "Tiny real controlled trial boundary",
      "Tiny real controlled trial boundary does not allow broad execution",
      "Tiny real controlled trial requires explicit operator approval",
      "Tiny real controlled trial separates cockpit preview from backend-owned guarded execution",
      "Denied tiny real controlled trial paths remain blocked",
      "Tiny real controlled trial checklist",
    ],
    deniedCopy: "Denied tiny real controlled trial paths remain blocked.",
    approvalCopy: "Tiny real controlled trial requires explicit operator approval.",
    surfaceIds: ["trial-boundary", "backend-execution-hold", "denied-path-matrix", "go-no-go-review"],
    devOnly: true,
  },
  {
    slug: "tiny-real-file-write-candidate",
    href: "/tiny-real-file-write-candidate",
    phase: "Phase 1355",
    title: "Tiny real file write candidate",
    commandLabel: "Go to Tiny Real File Write Candidate",
    summary: "File write candidate is sandbox-bounded path-guarded diff-reviewed and backend-owned.",
    markerPhrases: [
      "Tiny real file write candidate",
      "Tiny real file write candidate does not let the frontend write files directly",
      "Tiny real file write candidate requires explicit operator approval",
      "File write candidate is sandbox-bounded path-guarded diff-reviewed and backend-owned",
      "Denied tiny real file write paths remain blocked",
      "Tiny real file write checklist",
    ],
    deniedCopy: "Denied tiny real file write paths remain blocked.",
    approvalCopy: "Tiny real file write candidate requires explicit operator approval.",
    surfaceIds: ["file-write-candidate", "path-guard", "approval-ticket", "evidence-capture-contract", "result-capture-contract", "recovery-contract"],
    devOnly: true,
  },
  {
    slug: "tiny-real-command-candidate",
    href: "/tiny-real-command-candidate",
    phase: "Phase 1356",
    title: "Tiny real command candidate",
    commandLabel: "Go to Tiny Real Command Candidate",
    summary: "Command candidate is allowlisted argument-guarded working-directory-guarded timeout-bounded and backend-owned.",
    markerPhrases: [
      "Tiny real command candidate",
      "Tiny real command candidate does not let the frontend run commands directly",
      "Tiny real command candidate requires explicit operator approval",
      "Command candidate is allowlisted argument-guarded working-directory-guarded timeout-bounded and backend-owned",
      "Denied tiny real command paths remain blocked",
      "Tiny real command checklist",
    ],
    deniedCopy: "Denied tiny real command paths remain blocked.",
    approvalCopy: "Tiny real command candidate requires explicit operator approval.",
    surfaceIds: ["command-candidate", "command-guard", "approval-ticket", "evidence-capture-contract", "result-capture-contract", "recovery-contract"],
    devOnly: true,
  },
  {
    slug: "tiny-real-approval-ticket",
    href: "/tiny-real-approval-ticket",
    phase: "Phase 1357",
    title: "Tiny real approval ticket",
    commandLabel: "Go to Tiny Real Approval Ticket",
    summary: "Approval ticket previews operator identity scope expiry replay protection denied paths and backend authorization checks.",
    markerPhrases: [
      "Tiny real approval ticket",
      "Tiny real approval ticket does not persist hidden approvals",
      "Tiny real approval ticket requires explicit human approval",
      "Approval ticket previews operator identity scope expiry replay protection denied paths and backend authorization checks",
      "Denied tiny real approval paths remain blocked",
      "Tiny real approval checklist",
    ],
    deniedCopy: "Denied tiny real approval paths remain blocked.",
    approvalCopy: "Tiny real approval ticket requires explicit human approval.",
    surfaceIds: ["approval-ticket", "backend-execution-hold", "path-guard", "command-guard", "audit-capture-contract", "denied-path-matrix"],
    devOnly: true,
  },
  {
    slug: "tiny-real-backend-execution-hold",
    href: "/tiny-real-backend-execution-hold",
    phase: "Phase 1358",
    title: "Tiny real backend execution hold",
    commandLabel: "Go to Tiny Real Backend Execution Hold",
    summary: "Execution hold keeps apply and command run blocked until backend-owned guards verify the ticket.",
    markerPhrases: [
      "Tiny real backend execution hold",
      "Tiny real backend execution hold does not release execution from the frontend",
      "Tiny real backend execution hold requires explicit operator approval",
      "Execution hold keeps apply and command run blocked until backend-owned guards verify the ticket",
      "Denied tiny real backend execution paths remain blocked",
      "Tiny real backend execution hold checklist",
    ],
    deniedCopy: "Denied tiny real backend execution paths remain blocked.",
    approvalCopy: "Tiny real backend execution hold requires explicit operator approval.",
    surfaceIds: ["backend-execution-hold", "approval-ticket", "path-guard", "command-guard", "preflight-review", "go-no-go-review"],
    devOnly: true,
  },
  {
    slug: "tiny-real-path-guard",
    href: "/tiny-real-path-guard",
    phase: "Phase 1359",
    title: "Tiny real path guard",
    commandLabel: "Go to Tiny Real Path Guard",
    summary: "Path guard checks workspace root containment traversal denial generated file policy binary guard and rollback readiness.",
    markerPhrases: [
      "Tiny real path guard",
      "Tiny real path guard does not browse arbitrary files or write files from the frontend",
      "Tiny real path guard requires explicit operator approval",
      "Path guard checks workspace root containment traversal denial generated file policy binary guard and rollback readiness",
      "Denied tiny real path guard paths remain blocked",
      "Tiny real path guard checklist",
    ],
    deniedCopy: "Denied tiny real path guard paths remain blocked.",
    approvalCopy: "Tiny real path guard requires explicit operator approval.",
    surfaceIds: ["path-guard", "file-write-candidate", "approval-ticket", "recovery-contract", "denied-path-matrix"],
    devOnly: true,
  },
  {
    slug: "tiny-real-command-guard",
    href: "/tiny-real-command-guard",
    phase: "Phase 1360",
    title: "Tiny real command guard",
    commandLabel: "Go to Tiny Real Command Guard",
    summary: "Command guard checks allowlist arguments working directory environment-name-only display timeout cancellation stdout stderr and exit-code capture.",
    markerPhrases: [
      "Tiny real command guard",
      "Tiny real command guard does not run commands from the frontend",
      "Tiny real command guard requires explicit operator approval",
      "Command guard checks allowlist arguments working directory environment-name-only display timeout cancellation stdout stderr and exit-code capture",
      "Denied tiny real command guard paths remain blocked",
      "Tiny real command guard checklist",
    ],
    deniedCopy: "Denied tiny real command guard paths remain blocked.",
    approvalCopy: "Tiny real command guard requires explicit operator approval.",
    surfaceIds: ["command-guard", "command-candidate", "approval-ticket", "evidence-capture-contract", "result-capture-contract", "denied-path-matrix"],
    devOnly: true,
  },
  {
    slug: "tiny-real-preflight-review",
    href: "/tiny-real-preflight-review",
    phase: "Phase 1361",
    title: "Tiny real preflight review",
    commandLabel: "Go to Tiny Real Preflight Review",
    summary: "Preflight review verifies goal plan diff command approval ticket path guard command guard evidence result audit and recovery readiness.",
    markerPhrases: [
      "Tiny real preflight review",
      "Tiny real preflight review does not execute apply or run",
      "Tiny real preflight review requires explicit operator approval",
      "Preflight review verifies goal plan diff command approval ticket path guard command guard evidence result audit and recovery readiness",
      "Denied tiny real preflight paths remain blocked",
      "Tiny real preflight checklist",
    ],
    deniedCopy: "Denied tiny real preflight paths remain blocked.",
    approvalCopy: "Tiny real preflight review requires explicit operator approval.",
    surfaceIds: ["preflight-review", "file-write-candidate", "command-candidate", "approval-ticket", "path-guard", "command-guard", "evidence-capture-contract", "result-capture-contract", "audit-capture-contract", "recovery-contract"],
    devOnly: true,
  },
  {
    slug: "tiny-real-evidence-capture-contract",
    href: "/tiny-real-evidence-capture-contract",
    phase: "Phase 1362",
    title: "Tiny real evidence capture contract",
    commandLabel: "Go to Tiny Real Evidence Capture Contract",
    summary: "Evidence capture contract covers diff command stdout stderr exit code approval timestamp redaction operator audit and queue references.",
    markerPhrases: [
      "Tiny real evidence capture contract",
      "Tiny real evidence capture contract does not persist evidence from the frontend",
      "Tiny real evidence capture contract requires explicit operator approval",
      "Evidence capture contract covers diff command stdout stderr exit code approval timestamp redaction operator audit and queue references",
      "Denied tiny real evidence paths remain blocked",
      "Tiny real evidence checklist",
    ],
    deniedCopy: "Denied tiny real evidence paths remain blocked.",
    approvalCopy: "Tiny real evidence capture contract requires explicit operator approval.",
    surfaceIds: ["evidence-capture-contract", "file-write-candidate", "command-candidate", "approval-ticket", "result-capture-contract", "audit-capture-contract"],
    devOnly: true,
  },
  {
    slug: "tiny-real-result-capture-contract",
    href: "/tiny-real-result-capture-contract",
    phase: "Phase 1363",
    title: "Tiny real result capture contract",
    commandLabel: "Go to Tiny Real Result Capture Contract",
    summary: "Result capture contract covers success denied blocked failed timeout canceled needs-review manual-review retryable and recovered states.",
    markerPhrases: [
      "Tiny real result capture contract",
      "Tiny real result capture contract does not persist results from the frontend",
      "Tiny real result capture contract requires explicit operator approval",
      "Result capture contract covers success denied blocked failed timeout canceled needs-review manual-review retryable and recovered states",
      "Denied tiny real result paths remain blocked",
      "Tiny real result checklist",
    ],
    deniedCopy: "Denied tiny real result paths remain blocked.",
    approvalCopy: "Tiny real result capture contract requires explicit operator approval.",
    surfaceIds: ["result-capture-contract", "evidence-capture-contract", "recovery-contract", "audit-capture-contract", "go-no-go-review"],
    devOnly: true,
  },
  {
    slug: "tiny-real-audit-capture-contract",
    href: "/tiny-real-audit-capture-contract",
    phase: "Phase 1364",
    title: "Tiny real audit capture contract",
    commandLabel: "Go to Tiny Real Audit Capture Contract",
    summary: "Audit capture contract covers goal plan diff apply command approval evidence result recovery queue operator and denied-path records.",
    markerPhrases: [
      "Tiny real audit capture contract",
      "Tiny real audit capture contract does not persist audit logs from the frontend",
      "Tiny real audit capture contract requires explicit operator approval",
      "Audit capture contract covers goal plan diff apply command approval evidence result recovery queue operator and denied-path records",
      "Denied tiny real audit paths remain blocked",
      "Tiny real audit checklist",
    ],
    deniedCopy: "Denied tiny real audit paths remain blocked.",
    approvalCopy: "Tiny real audit capture contract requires explicit operator approval.",
    surfaceIds: ["audit-capture-contract", "approval-ticket", "evidence-capture-contract", "result-capture-contract", "recovery-contract", "denied-path-matrix"],
    devOnly: true,
  },
  {
    slug: "tiny-real-recovery-contract",
    href: "/tiny-real-recovery-contract",
    phase: "Phase 1365",
    title: "Tiny real recovery contract",
    commandLabel: "Go to Tiny Real Recovery Contract",
    summary: "Recovery contract covers rollback retry stop restore explain-failure manual-review safety-stop and partial-recovery requirements.",
    markerPhrases: [
      "Tiny real recovery contract",
      "Tiny real recovery contract does not execute recovery from the frontend",
      "Tiny real recovery contract requires explicit operator approval",
      "Recovery contract covers rollback retry stop restore explain-failure manual-review safety-stop and partial-recovery requirements",
      "Denied tiny real recovery paths remain blocked",
      "Tiny real recovery checklist",
    ],
    deniedCopy: "Denied tiny real recovery paths remain blocked.",
    approvalCopy: "Tiny real recovery contract requires explicit operator approval.",
    surfaceIds: ["recovery-contract", "result-capture-contract", "evidence-capture-contract", "audit-capture-contract", "operator-signoff", "go-no-go-review"],
    devOnly: true,
  },
  {
    slug: "tiny-real-denied-path-matrix",
    href: "/tiny-real-denied-path-matrix",
    phase: "Phase 1366",
    title: "Tiny real denied path matrix",
    commandLabel: "Go to Tiny Real Denied Path Matrix",
    summary: "Denied path matrix lists blocked prompts models providers connectors arbitrary files commands git tests builds smokes runtimes adapters persistence export recovery queues deploy install scaffold secrets memory promotion and broad backend execution.",
    markerPhrases: [
      "Tiny real denied path matrix",
      "Tiny real denied path matrix does not mutate workflow state",
      "Tiny real denied path matrix requires explicit operator approval",
      "Denied path matrix lists blocked prompts models providers connectors arbitrary files commands git tests builds smokes runtimes adapters persistence export recovery queues deploy install scaffold secrets memory promotion and broad backend execution",
      "Denied tiny real paths remain blocked",
      "Tiny real denied path checklist",
    ],
    deniedCopy: "Denied tiny real paths remain blocked.",
    approvalCopy: "Tiny real denied path matrix requires explicit operator approval.",
    surfaceIds: ["denied-path-matrix", "trial-boundary", "file-write-candidate", "command-candidate", "path-guard", "command-guard", "go-no-go-review"],
    devOnly: true,
  },
  {
    slug: "tiny-real-operator-signoff",
    href: "/tiny-real-operator-signoff",
    phase: "Phase 1367",
    title: "Tiny real operator signoff",
    commandLabel: "Go to Tiny Real Operator Signoff",
    summary: "Operator signoff previews goal scope sandbox path command allowlist evidence result audit recovery and go no-go decision.",
    markerPhrases: [
      "Tiny real operator signoff",
      "Tiny real operator signoff does not release execution automatically",
      "Tiny real operator signoff requires explicit human approval",
      "Operator signoff previews goal scope sandbox path command allowlist evidence result audit recovery and go no-go decision",
      "Denied tiny real signoff paths remain blocked",
      "Tiny real operator signoff checklist",
    ],
    deniedCopy: "Denied tiny real signoff paths remain blocked.",
    approvalCopy: "Tiny real operator signoff requires explicit human approval.",
    surfaceIds: ["operator-signoff", "approval-ticket", "file-write-candidate", "command-candidate", "evidence-capture-contract", "result-capture-contract", "audit-capture-contract", "recovery-contract", "go-no-go-review"],
    devOnly: true,
  },
  {
    slug: "first-tiny-real-controlled-candidate",
    href: "/first-tiny-real-controlled-candidate",
    phase: "Phase 1368",
    title: "First tiny real controlled candidate",
    commandLabel: "Go to First Tiny Real Controlled Candidate",
    summary: "Candidate combines sandbox file write command candidate approval ticket backend hold path guard command guard preflight evidence result audit recovery denied paths and operator signoff.",
    markerPhrases: [
      "First tiny real controlled candidate",
      "First tiny real controlled candidate does not allow broad apply or run",
      "First tiny real controlled candidate requires explicit operator approval",
      "Candidate combines sandbox file write command candidate approval ticket backend hold path guard command guard preflight evidence result audit recovery denied paths and operator signoff",
      "Denied first tiny real controlled paths remain blocked",
      "First tiny real controlled checklist",
    ],
    deniedCopy: "Denied first tiny real controlled paths remain blocked.",
    approvalCopy: "First tiny real controlled candidate requires explicit operator approval.",
    surfaceIds: ALL_SURFACE_IDS,
    devOnly: true,
  },
  {
    slug: "controlled-tiny-real-operator-trial-release-candidate",
    href: "/controlled-tiny-real-operator-trial-release-candidate",
    phase: "Phase 1369",
    title: "Controlled tiny real operator trial release candidate",
    commandLabel: "Go to Controlled Tiny Real Operator Trial Release Candidate",
    summary: "Release candidate prepares CodexForge for the first tiny backend-owned guarded apply and run without broad execution.",
    markerPhrases: [
      "Controlled tiny real operator trial release candidate",
      "Controlled tiny real operator trial release candidate does not call models write files run commands persist approvals create queues release locks persist results or execute recovery from the frontend",
      "Controlled tiny real operator trial release requires explicit operator approval",
      "Release candidate prepares CodexForge for the first tiny backend-owned guarded apply and run without broad execution",
      "Denied controlled tiny real operator trial paths remain blocked",
      "Controlled tiny real operator trial release checklist",
    ],
    deniedCopy: "Denied controlled tiny real operator trial paths remain blocked.",
    approvalCopy: "Controlled tiny real operator trial release requires explicit operator approval.",
    surfaceIds: ALL_SURFACE_IDS,
    devOnly: true,
  },
] as const;

export function buildTinyRealControlledTrialStableKey(parts: readonly string[]): string {
  return parts.join(":").toLowerCase().replace(/[^a-z0-9:/-]+/g, "-");
}

export function listTinyRealControlledTrialRouteDefinitions(): readonly TinyRealControlledTrialRouteDefinition[] {
  return ROUTES;
}

export function getTinyRealControlledTrialRouteDefinition(
  slug: TinyRealControlledTrialRouteSlug
): TinyRealControlledTrialRouteDefinition {
  return ROUTES.find((candidate) => candidate.slug === slug) ?? ROUTES[0];
}

export function buildTinyRealControlledTrialRouteModel(
  slug: TinyRealControlledTrialRouteSlug = "codexforge-cockpit"
): TinyRealControlledTrialRouteModel {
  const route = getTinyRealControlledTrialRouteDefinition(slug);
  const surfaces = route.surfaceIds
    .map((surfaceId) => SURFACES.find((surface) => surface.id === surfaceId))
    .filter((surface): surface is TinyRealControlledTrialSurface => Boolean(surface));

  return {
    route,
    contract: TRIAL_CONTRACT,
    surfaces,
    globalSafetyCopy: GLOBAL_SAFETY_COPY,
    trialReviewFlow: TRIAL_REVIEW_FLOW,
    summary: summarizeTinyRealControlledTrialRoute(route, surfaces),
  };
}

export function buildTinyRealControlledTrialModel(): TinyRealControlledTrialRouteModel {
  return buildTinyRealControlledTrialRouteModel("codexforge-cockpit");
}

export function summarizeTinyRealControlledTrialRoute(
  route: TinyRealControlledTrialRouteDefinition,
  surfaces: readonly TinyRealControlledTrialSurface[]
): string {
  return `${route.title} keeps ${surfaces.length} tiny real controlled trial surfaces deterministic, operator-approved, backend-owned, guarded, audit-visible, recoverable, and blocked from broad execution.`;
}

export function summarizeTinyRealControlledTrialRouteModel(
  model = buildTinyRealControlledTrialModel()
): string {
  return model.summary;
}
