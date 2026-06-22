export type BackendApprovalHandoffRouteSlug =
  | "codexforge-cockpit"
  | "backend-approval-handoff-boundary"
  | "backend-approval-ticket-contract"
  | "backend-file-write-handoff-contract"
  | "backend-command-handoff-contract"
  | "backend-evidence-handoff-contract"
  | "backend-result-handoff-contract"
  | "backend-recovery-handoff-contract"
  | "backend-audit-handoff-contract"
  | "backend-queue-handoff-contract"
  | "backend-approval-denied-path-matrix"
  | "backend-approval-operator-signoff"
  | "backend-approval-go-no-go-review"
  | "backend-handoff-security-review"
  | "backend-handoff-failure-review"
  | "first-backend-approval-handoff-candidate"
  | "controlled-backend-approval-handoff-release-candidate";

export type BackendApprovalHandoffPanelState =
  | "blocked"
  | "preview-only"
  | "approval-required"
  | "dev-test-only";

export type BackendApprovalHandoffChecklistItem = {
  id: string;
  label: string;
  detail: string;
  state: BackendApprovalHandoffPanelState;
};

export type BackendApprovalHandoffSurface = {
  id: string;
  title: string;
  eyebrow: string;
  state: BackendApprovalHandoffPanelState;
  body: string;
  checklist: readonly BackendApprovalHandoffChecklistItem[];
  placeholders: readonly string[];
};

export type BackendApprovalHandoffRouteDefinition = {
  slug: BackendApprovalHandoffRouteSlug;
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

export type BackendApprovalHandoffRouteModel = {
  route: BackendApprovalHandoffRouteDefinition;
  surfaces: readonly BackendApprovalHandoffSurface[];
  globalSafetyCopy: readonly string[];
  targetFamilies: readonly string[];
  handoffFlow: readonly string[];
  approvalTicketFields: readonly string[];
  deniedPathMatrix: readonly string[];
  resultStates: readonly string[];
  recoveryRequirements: readonly string[];
  queueStates: readonly string[];
  futureBackendGuards: readonly string[];
  summary: string;
};

export const BACKEND_APPROVAL_HANDOFF_COCKPIT_LANGUAGE = [
  "Backend approval handoff packet",
  "Backend approval ticket contract",
  "Backend file write handoff contract",
  "Backend command handoff contract",
  "Backend evidence handoff contract",
  "Backend result handoff contract",
  "Backend recovery handoff contract",
  "Backend audit handoff contract",
  "Backend queue handoff contract",
  "Backend approval denied path matrix",
  "Backend approval operator signoff",
  "Backend approval go no-go review",
  "Backend handoff security review",
  "Backend handoff failure review",
  "No real file mutation from the cockpit",
  "No real command execution from the cockpit",
  "No backend execution from the cockpit",
].join(" | ");

const GLOBAL_SAFETY_COPY = [
  "Phase pages are dev/test surfaces only.",
  "Normal operation should happen in this cockpit.",
  "Backend approval handoff requires explicit operator approval.",
  "File writes remain blocked until explicit operator approval.",
  "Commands remain blocked until explicit operator approval.",
  "No provider/model/connector/runtime execution occurs from this cockpit in this batch.",
  "No real mutation occurs from this cockpit in this batch.",
  "No real file mutation from the cockpit.",
  "No real command execution from the cockpit.",
  "No backend execution from the cockpit.",
  "No approval persistence from the cockpit.",
  "No queue persistence from the cockpit.",
  "No execution lock release from the cockpit.",
  "No evidence persistence from the cockpit.",
  "No result persistence from the cockpit.",
  "No audit persistence from the cockpit.",
  "No export writing from the cockpit.",
  "No rollback retry or recovery execution from the cockpit.",
  "No model calls, provider calls, connector calls, adapter calls, runtime starts, process spawning, port binding, package installation, deployment, scaffold creation, prompt sending, or memory promotion occurs from this preview.",
] as const;

const TARGET_FAMILIES = [
  "Supported game targets",
  "Apps",
  "Websites",
  "Dashboards",
  "Tools",
  "Research packs",
  "Automation workflows",
  "Creative and video workflows",
  "Trading workspaces",
  "Data workspaces",
  "Documentation and export packs",
  "Integration packs",
  "General local projects",
] as const;

const HANDOFF_FLOW = [
  "frontend preview packet",
  "backend approval ticket",
  "backend file-write handoff",
  "backend command handoff",
  "backend evidence handoff",
  "backend result handoff",
  "backend recovery handoff",
  "backend audit handoff",
  "backend queue handoff",
  "denied path matrix",
  "operator signoff",
  "go/no-go review",
  "security review",
  "failure review",
] as const;

const APPROVAL_TICKET_FIELDS = [
  "approval scope",
  "operator identity",
  "target action",
  "denied paths",
  "expiry",
  "file-write guard",
  "command guard",
  "evidence requirement",
  "result requirement",
  "audit requirement",
] as const;

const DENIED_PATH_MATRIX = [
  "prompts",
  "models",
  "providers",
  "connectors",
  "files",
  "commands",
  "git",
  "tests",
  "builds",
  "smokes",
  "runtimes",
  "adapters",
  "persistence",
  "export",
  "recovery",
  "queues",
  "deploy",
  "install",
  "scaffold",
  "secrets",
  "memory promotion",
] as const;

const RESULT_STATES = ["success", "denied", "blocked", "failed", "timeout", "needs-review", "manual-review", "retryable"] as const;

const RECOVERY_REQUIREMENTS = ["rollback", "retry", "stop", "restore", "explain-failure", "manual-review", "safety-stop"] as const;

const QUEUE_STATES = ["queued", "blocked", "approved", "denied", "running", "completed", "failed", "timeout", "canceled", "recovered"] as const;

const FUTURE_BACKEND_GUARDS = [
  "explicit operator approval",
  "backend-owned approval guard",
  "file-write path guard",
  "diff preview",
  "command allowlist",
  "command argument guard",
  "working-directory guard",
  "environment guard",
  "evidence capture",
  "result capture",
  "audit contract",
  "queue contract",
  "recovery contract",
  "secret redaction",
  "provider block",
  "connector block",
  "memory-promotion block",
] as const;

const SURFACES: readonly BackendApprovalHandoffSurface[] = [
  {
    id: "handoff-boundary",
    title: "Backend approval handoff boundary",
    eyebrow: "Boundary",
    state: "blocked",
    body: "Separates the frontend cockpit preview packet from future backend-owned approval and execution services. The UI previews the packet only and cannot approve, execute, write, persist, recover, release locks, or create queues.",
    checklist: [
      {
        id: "handoff-boundary-no-backend-action",
        label: "Backend action blocked",
        detail: "No backend action is executed from this surface; future execution remains behind explicit operator approval and backend-owned guards.",
        state: "blocked",
      },
      {
        id: "handoff-boundary-preview-contract",
        label: "Preview handoff contract",
        detail: "The cockpit can describe the approval ticket, file-write, command, evidence, result, recovery, audit, queue, denial, signoff, go/no-go, security, and failure contracts.",
        state: "preview-only",
      },
    ],
    placeholders: ["frontend preview packet", "backend-owned approval", "execution blocked", "operator approval gate"],
  },
  {
    id: "approval-ticket",
    title: "Backend approval ticket contract",
    eyebrow: "Ticket",
    state: "approval-required",
    body: "Defines approval scope, operator identity, target action, denied paths, and expiry for a future backend approval service without persisting approvals or approving execution.",
    checklist: [
      {
        id: "approval-ticket-no-persistence",
        label: "Approval persistence blocked",
        detail: "The ticket contract writes no approval decision, queue item, audit record, evidence, result, or hidden approval.",
        state: "blocked",
      },
      {
        id: "approval-ticket-human-required",
        label: "Human approval required",
        detail: "Future backend execution requires an explicit human approval bound to scope, identity, action, denied paths, and expiry.",
        state: "approval-required",
      },
    ],
    placeholders: ["approval scope", "operator identity", "target action", "denied paths", "expiry"],
  },
  {
    id: "file-write-handoff",
    title: "Backend file write handoff contract",
    eyebrow: "File write",
    state: "approval-required",
    body: "Defines path guard, diff, rollback, evidence, result, and audit requirements for a future backend file-write handoff without writing files or applying diffs.",
    checklist: [
      {
        id: "file-write-no-mutation",
        label: "File mutation blocked",
        detail: "The cockpit does not write files, apply diffs, export files, persist approval, or execute rollback.",
        state: "blocked",
      },
      {
        id: "file-write-guards-required",
        label: "Backend guards required",
        detail: "Future file writes require explicit approval, path guard, diff preview, rollback contract, evidence capture, result capture, and audit.",
        state: "approval-required",
      },
    ],
    placeholders: ["path guard", "diff preview", "rollback contract", "evidence capture", "result capture", "audit record"],
  },
  {
    id: "command-handoff",
    title: "Backend command handoff contract",
    eyebrow: "Command",
    state: "approval-required",
    body: "Defines allowlist, arguments, working directory, environment names, evidence, result, and recovery requirements for a future backend command handoff without running commands.",
    checklist: [
      {
        id: "command-no-run",
        label: "Command execution blocked",
        detail: "The cockpit does not run shell, git, test, build, smoke, runtime, adapter, or dry-run commands.",
        state: "blocked",
      },
      {
        id: "command-guards-required",
        label: "Command guards required",
        detail: "Future commands require explicit approval, allowlist, argument guard, working-directory guard, environment-name-only display, evidence, result, and recovery contracts.",
        state: "approval-required",
      },
    ],
    placeholders: ["allowlist", "arguments", "working directory", "environment names", "stdout", "stderr", "exit code"],
  },
  {
    id: "evidence-handoff",
    title: "Backend evidence handoff contract",
    eyebrow: "Evidence",
    state: "approval-required",
    body: "Defines diff, command, stdout, stderr, exit code, approval timestamp, operator, audit, and redaction fields without persisting evidence.",
    checklist: [
      {
        id: "evidence-no-persistence",
        label: "Evidence persistence blocked",
        detail: "The cockpit writes no evidence, logs, outputs, exports, audit records, credentials, or secret values.",
        state: "blocked",
      },
      {
        id: "evidence-redaction-required",
        label: "Redaction required",
        detail: "Future evidence capture requires explicit approval, backend storage policy, secret redaction, and audit retention rules.",
        state: "approval-required",
      },
    ],
    placeholders: ["diff", "command", "stdout", "stderr", "exit code", "approval timestamp", "operator", "redaction"],
  },
  {
    id: "result-handoff",
    title: "Backend result handoff contract",
    eyebrow: "Result",
    state: "approval-required",
    body: "Defines success, denied, blocked, failed, timeout, needs-review, manual-review, and retryable states without persisting results.",
    checklist: [
      {
        id: "result-no-persistence",
        label: "Result persistence blocked",
        detail: "The cockpit stores no results, queue transitions, evidence, audit entries, exports, outputs, recovery decisions, or memory promotion.",
        state: "blocked",
      },
      {
        id: "result-states-reviewed",
        label: "Backend result states required",
        detail: "Future result capture requires explicit approval, backend result policy, evidence linkage, audit linkage, and recovery routing.",
        state: "approval-required",
      },
    ],
    placeholders: ["success", "denied", "blocked", "failed", "timeout", "needs-review", "manual-review", "retryable"],
  },
  {
    id: "recovery-handoff",
    title: "Backend recovery handoff contract",
    eyebrow: "Recovery",
    state: "approval-required",
    body: "Defines rollback, retry, stop, restore, explain-failure, manual-review, and safety-stop requirements without executing recovery.",
    checklist: [
      {
        id: "recovery-no-execution",
        label: "Recovery execution blocked",
        detail: "The cockpit does not execute rollback, retry, restore, recovery commands, file mutation, adapter calls, exports, or queue changes.",
        state: "blocked",
      },
      {
        id: "recovery-contract-required",
        label: "Recovery contract required",
        detail: "Future recovery requires explicit approval, backend-owned recovery contract, safety stop, result capture, and audit trail.",
        state: "approval-required",
      },
    ],
    placeholders: ["rollback", "retry", "stop", "restore", "explain-failure", "manual-review", "safety-stop"],
  },
  {
    id: "audit-handoff",
    title: "Backend audit handoff contract",
    eyebrow: "Audit",
    state: "approval-required",
    body: "Defines goal, context, approval, file, command, evidence, result, recovery, queue, and operator signoff records without persisting audit logs.",
    checklist: [
      {
        id: "audit-no-persistence",
        label: "Audit persistence blocked",
        detail: "The cockpit writes no audit logs, approval records, evidence, results, queue state, exports, or recovery records.",
        state: "blocked",
      },
      {
        id: "audit-records-required",
        label: "Backend audit contract required",
        detail: "Future backend execution requires audit records for goal, context, approval, file, command, evidence, result, recovery, queue, and signoff.",
        state: "approval-required",
      },
    ],
    placeholders: ["goal", "context", "approval", "file", "command", "evidence", "result", "recovery", "queue", "signoff"],
  },
  {
    id: "queue-handoff",
    title: "Backend queue handoff contract",
    eyebrow: "Queue",
    state: "approval-required",
    body: "Defines queued, blocked, approved, denied, running, completed, failed, timeout, canceled, and recovered states without creating queue jobs.",
    checklist: [
      {
        id: "queue-no-persistence",
        label: "Queue persistence blocked",
        detail: "The cockpit creates no queue jobs, persists no queue state, releases no locks, and starts no backend execution.",
        state: "blocked",
      },
      {
        id: "queue-contract-required",
        label: "Backend queue contract required",
        detail: "Future queue creation requires explicit approval, backend-owned queue state machine, lock policy, evidence, result, audit, and recovery links.",
        state: "approval-required",
      },
    ],
    placeholders: ["queued", "blocked", "approved", "denied", "running", "completed", "failed", "timeout", "canceled", "recovered"],
  },
  {
    id: "denied-path-matrix",
    title: "Backend approval denied path matrix",
    eyebrow: "Denied paths",
    state: "blocked",
    body: "Lists blocked prompts, models, providers, connectors, files, commands, git, tests, builds, smokes, runtimes, adapters, persistence, export, recovery, queues, deploy, install, scaffold, secrets, and memory promotion.",
    checklist: [
      {
        id: "denied-matrix-no-state-mutation",
        label: "Workflow state unchanged",
        detail: "The denied matrix mutates no workflow state, approval state, queue state, evidence, results, audit, files, or commands.",
        state: "blocked",
      },
      {
        id: "denied-matrix-approval-required",
        label: "Denied paths remain blocked",
        detail: "Future backend-owned services must keep these paths blocked unless explicit approval and a guarded contract permits them.",
        state: "approval-required",
      },
    ],
    placeholders: ["prompts", "models", "providers", "files", "commands", "tests", "builds", "smokes", "secrets", "memory promotion"],
  },
  {
    id: "operator-signoff",
    title: "Backend approval operator signoff",
    eyebrow: "Signoff",
    state: "approval-required",
    body: "Confirms the approval ticket, file write handoff, command handoff, evidence, result, recovery, audit, queue, and denied path matrix without persisting signoff or approving execution.",
    checklist: [
      {
        id: "operator-signoff-no-approval",
        label: "Signoff persistence blocked",
        detail: "The cockpit persists no signoff, approval decision, queue job, lock release, evidence, result, audit, or backend execution.",
        state: "blocked",
      },
      {
        id: "operator-signoff-human-required",
        label: "Human signoff required",
        detail: "Future signoff requires an explicit human approval that binds the full handoff packet to backend-owned guards.",
        state: "approval-required",
      },
    ],
    placeholders: ["approval ticket", "file write handoff", "command handoff", "evidence", "result", "recovery", "audit", "queue", "denied matrix"],
  },
  {
    id: "go-no-go-review",
    title: "Backend approval go no-go review",
    eyebrow: "Go no-go",
    state: "blocked",
    body: "Reports preview-only status, blocked backend execution, and required future backend guards without releasing execution.",
    checklist: [
      {
        id: "go-no-go-no-release",
        label: "Execution release blocked",
        detail: "The cockpit releases no execution lock, starts no backend service, creates no queue job, and persists no go decision.",
        state: "blocked",
      },
      {
        id: "go-no-go-guards-required",
        label: "Backend guards required",
        detail: "Future go requires explicit approval, file-write guard, command guard, evidence capture, result capture, audit, queue, and recovery contracts.",
        state: "approval-required",
      },
    ],
    placeholders: ["preview-only status", "blocked backend execution", "future backend guards", "go decision", "no-go decision"],
  },
  {
    id: "security-review",
    title: "Backend handoff security review",
    eyebrow: "Security",
    state: "approval-required",
    body: "Checks secret redaction, path guard, command allowlist, environment-name-only display, provider block, connector block, and memory-promotion block without executing backend actions.",
    checklist: [
      {
        id: "security-no-backend-action",
        label: "Backend actions blocked",
        detail: "The review does not call providers, connectors, models, adapters, commands, files, runtimes, queues, exports, or memory promotion.",
        state: "blocked",
      },
      {
        id: "security-guards-visible",
        label: "Security guards visible",
        detail: "Future backend services must enforce redaction, path guard, command allowlist, environment-name-only display, provider block, connector block, and memory block.",
        state: "approval-required",
      },
    ],
    placeholders: ["secret redaction", "path guard", "command allowlist", "environment-name-only display", "provider block", "connector block", "memory-promotion block"],
  },
  {
    id: "failure-review",
    title: "Backend handoff failure review",
    eyebrow: "Failure",
    state: "approval-required",
    body: "Defines denied, invalid, expired, canceled, failed, timeout, partial, recovery-required, and manual-review handoff states without retrying or recovering actions.",
    checklist: [
      {
        id: "failure-no-retry",
        label: "Retry and recovery blocked",
        detail: "The cockpit does not retry, recover, rollback, restore, mutate files, run commands, create queues, persist results, or execute adapters.",
        state: "blocked",
      },
      {
        id: "failure-states-required",
        label: "Failure states required",
        detail: "Future backend services must expose deterministic failure states and route them to manual review or explicitly approved recovery.",
        state: "approval-required",
      },
    ],
    placeholders: ["denied", "invalid", "expired", "canceled", "failed", "timeout", "partial", "recovery-required", "manual-review"],
  },
  {
    id: "first-candidate",
    title: "First backend approval handoff candidate",
    eyebrow: "Candidate",
    state: "approval-required",
    body: "Combines approval ticket, file write, command, evidence, result, recovery, audit, queue, denied path, signoff, go no-go, security, and failure reviews without executing backend actions.",
    checklist: [
      {
        id: "first-candidate-preview-only",
        label: "Candidate is preview-only",
        detail: "The candidate executes no backend action, writes no files, runs no commands, persists no approval, creates no queue, and releases no lock.",
        state: "blocked",
      },
      {
        id: "first-candidate-approval-required",
        label: "Operator approval required",
        detail: "Future backend-owned execution requires explicit approval and every guard in the combined handoff packet.",
        state: "approval-required",
      },
    ],
    placeholders: ["approval ticket", "file write", "command", "evidence", "result", "recovery", "audit", "queue", "security", "failure"],
  },
  {
    id: "release-candidate",
    title: "Controlled backend approval handoff release candidate",
    eyebrow: "Release candidate",
    state: "approval-required",
    body: "Prepares CodexForge for future backend-owned approval and execution without calling models, writing files, running commands, persisting approvals, creating queues, releasing locks, persisting results, or executing recovery.",
    checklist: [
      {
        id: "release-candidate-preview-only",
        label: "Release candidate is preview-only",
        detail: "The release candidate stays static, deterministic, cockpit-centered, approval-gated, and blocked from backend execution.",
        state: "blocked",
      },
      {
        id: "release-candidate-backend-guards-required",
        label: "Future backend guards required",
        detail: "Future backend execution requires explicit approval plus file, command, evidence, result, recovery, audit, queue, security, and failure contracts.",
        state: "approval-required",
      },
    ],
    placeholders: ["release candidate", "backend-owned approval", "backend-owned execution", "guards required", "execution blocked"],
  },
] as const;

const ALL_SURFACE_IDS = SURFACES.map((surface) => surface.id);

const ROUTES: readonly BackendApprovalHandoffRouteDefinition[] = [
  {
    slug: "codexforge-cockpit",
    href: "/codexforge-cockpit",
    phase: "Cockpit",
    title: "Backend approval handoff packet",
    commandLabel: "Go to Unified CodexForge Cockpit",
    summary: "Cockpit-centered preview-only backend approval handoff packet for future backend-owned approval and execution.",
    markerPhrases: BACKEND_APPROVAL_HANDOFF_COCKPIT_LANGUAGE.split(" | "),
    deniedCopy: "Denied cockpit paths remain blocked: no real file mutation, no real command execution, no backend execution, no approval persistence, no queue persistence, no lock release, no evidence persistence, no result persistence, no audit persistence, no export writing, and no recovery execution.",
    approvalCopy: "A future backend approval handoff requires explicit operator approval, backend-owned guards, file-write path guard, diff preview, command allowlist, command argument guard, working-directory guard, environment guard, evidence capture, result capture, audit, queue, security, failure, and recovery contracts.",
    surfaceIds: ALL_SURFACE_IDS,
    devOnly: false,
  },
  {
    slug: "backend-approval-handoff-boundary",
    href: "/backend-approval-handoff-boundary",
    phase: "Phase 1306",
    title: "Backend approval handoff boundary",
    commandLabel: "Go to Backend Approval Handoff Boundary",
    summary: "Handoff boundary separates frontend preview from backend-owned approval and execution.",
    markerPhrases: [
      "Backend approval handoff boundary",
      "Backend approval handoff boundary does not execute backend actions",
      "Backend approval handoff requires explicit operator approval",
      "Handoff boundary separates frontend preview from backend-owned approval and execution",
      "Denied backend approval handoff paths remain blocked",
      "Backend approval handoff checklist",
    ],
    deniedCopy: "Denied backend approval handoff paths remain blocked.",
    approvalCopy: "Backend approval handoff requires explicit operator approval.",
    surfaceIds: ALL_SURFACE_IDS,
    devOnly: true,
  },
  {
    slug: "backend-approval-ticket-contract",
    href: "/backend-approval-ticket-contract",
    phase: "Phase 1307",
    title: "Backend approval ticket contract",
    commandLabel: "Go to Backend Approval Ticket Contract",
    summary: "Approval ticket contract defines approval scope operator identity target action denied paths and expiry.",
    markerPhrases: [
      "Backend approval ticket contract",
      "Backend approval ticket contract does not persist approvals",
      "Backend approval ticket requires explicit human approval",
      "Approval ticket contract defines approval scope operator identity target action denied paths and expiry",
      "Denied backend approval ticket paths remain blocked",
      "Backend approval ticket checklist",
    ],
    deniedCopy: "Denied backend approval ticket paths remain blocked.",
    approvalCopy: "Backend approval ticket requires explicit human approval.",
    surfaceIds: ["approval-ticket", "denied-path-matrix", "operator-signoff", "audit-handoff"],
    devOnly: true,
  },
  {
    slug: "backend-file-write-handoff-contract",
    href: "/backend-file-write-handoff-contract",
    phase: "Phase 1308",
    title: "Backend file write handoff contract",
    commandLabel: "Go to Backend File Write Handoff Contract",
    summary: "File write handoff contract defines path guard diff rollback evidence result and audit requirements.",
    markerPhrases: [
      "Backend file write handoff contract",
      "Backend file write handoff contract does not write files",
      "Backend file write handoff requires explicit operator approval",
      "File write handoff contract defines path guard diff rollback evidence result and audit requirements",
      "Denied backend file write handoff paths remain blocked",
      "Backend file write handoff checklist",
    ],
    deniedCopy: "Denied backend file write handoff paths remain blocked.",
    approvalCopy: "Backend file write handoff requires explicit operator approval.",
    surfaceIds: ["file-write-handoff", "approval-ticket", "evidence-handoff", "result-handoff", "recovery-handoff", "audit-handoff"],
    devOnly: true,
  },
  {
    slug: "backend-command-handoff-contract",
    href: "/backend-command-handoff-contract",
    phase: "Phase 1309",
    title: "Backend command handoff contract",
    commandLabel: "Go to Backend Command Handoff Contract",
    summary: "Command handoff contract defines allowlist arguments working directory environment names evidence result and recovery requirements.",
    markerPhrases: [
      "Backend command handoff contract",
      "Backend command handoff contract does not run commands",
      "Backend command handoff requires explicit operator approval",
      "Command handoff contract defines allowlist arguments working directory environment names evidence result and recovery requirements",
      "Denied backend command handoff paths remain blocked",
      "Backend command handoff checklist",
    ],
    deniedCopy: "Denied backend command handoff paths remain blocked.",
    approvalCopy: "Backend command handoff requires explicit operator approval.",
    surfaceIds: ["command-handoff", "approval-ticket", "evidence-handoff", "result-handoff", "recovery-handoff", "audit-handoff"],
    devOnly: true,
  },
  {
    slug: "backend-evidence-handoff-contract",
    href: "/backend-evidence-handoff-contract",
    phase: "Phase 1310",
    title: "Backend evidence handoff contract",
    commandLabel: "Go to Backend Evidence Handoff Contract",
    summary: "Evidence handoff contract defines diff command stdout stderr exit code approval timestamp operator audit and redaction fields.",
    markerPhrases: [
      "Backend evidence handoff contract",
      "Backend evidence handoff contract does not persist evidence",
      "Backend evidence handoff requires explicit operator approval",
      "Evidence handoff contract defines diff command stdout stderr exit code approval timestamp operator audit and redaction fields",
      "Denied backend evidence handoff paths remain blocked",
      "Backend evidence handoff checklist",
    ],
    deniedCopy: "Denied backend evidence handoff paths remain blocked.",
    approvalCopy: "Backend evidence handoff requires explicit operator approval.",
    surfaceIds: ["evidence-handoff", "file-write-handoff", "command-handoff", "audit-handoff", "security-review"],
    devOnly: true,
  },
  {
    slug: "backend-result-handoff-contract",
    href: "/backend-result-handoff-contract",
    phase: "Phase 1311",
    title: "Backend result handoff contract",
    commandLabel: "Go to Backend Result Handoff Contract",
    summary: "Result handoff contract defines success denied blocked failed timeout needs-review manual-review and retryable states.",
    markerPhrases: [
      "Backend result handoff contract",
      "Backend result handoff contract does not persist results",
      "Backend result handoff requires explicit operator approval",
      "Result handoff contract defines success denied blocked failed timeout needs-review manual-review and retryable states",
      "Denied backend result handoff paths remain blocked",
      "Backend result handoff checklist",
    ],
    deniedCopy: "Denied backend result handoff paths remain blocked.",
    approvalCopy: "Backend result handoff requires explicit operator approval.",
    surfaceIds: ["result-handoff", "evidence-handoff", "recovery-handoff", "audit-handoff", "failure-review"],
    devOnly: true,
  },
  {
    slug: "backend-recovery-handoff-contract",
    href: "/backend-recovery-handoff-contract",
    phase: "Phase 1312",
    title: "Backend recovery handoff contract",
    commandLabel: "Go to Backend Recovery Handoff Contract",
    summary: "Recovery handoff contract defines rollback retry stop restore explain-failure manual-review and safety-stop requirements.",
    markerPhrases: [
      "Backend recovery handoff contract",
      "Backend recovery handoff contract does not execute recovery",
      "Backend recovery handoff requires explicit operator approval",
      "Recovery handoff contract defines rollback retry stop restore explain-failure manual-review and safety-stop requirements",
      "Denied backend recovery handoff paths remain blocked",
      "Backend recovery handoff checklist",
    ],
    deniedCopy: "Denied backend recovery handoff paths remain blocked.",
    approvalCopy: "Backend recovery handoff requires explicit operator approval.",
    surfaceIds: ["recovery-handoff", "result-handoff", "audit-handoff", "failure-review", "go-no-go-review"],
    devOnly: true,
  },
  {
    slug: "backend-audit-handoff-contract",
    href: "/backend-audit-handoff-contract",
    phase: "Phase 1313",
    title: "Backend audit handoff contract",
    commandLabel: "Go to Backend Audit Handoff Contract",
    summary: "Audit handoff contract defines goal context approval file command evidence result recovery queue and operator signoff records.",
    markerPhrases: [
      "Backend audit handoff contract",
      "Backend audit handoff contract does not persist audit logs",
      "Backend audit handoff requires explicit operator approval",
      "Audit handoff contract defines goal context approval file command evidence result recovery queue and operator signoff records",
      "Denied backend audit handoff paths remain blocked",
      "Backend audit handoff checklist",
    ],
    deniedCopy: "Denied backend audit handoff paths remain blocked.",
    approvalCopy: "Backend audit handoff requires explicit operator approval.",
    surfaceIds: ["audit-handoff", "approval-ticket", "file-write-handoff", "command-handoff", "evidence-handoff", "result-handoff", "recovery-handoff", "queue-handoff", "operator-signoff"],
    devOnly: true,
  },
  {
    slug: "backend-queue-handoff-contract",
    href: "/backend-queue-handoff-contract",
    phase: "Phase 1314",
    title: "Backend queue handoff contract",
    commandLabel: "Go to Backend Queue Handoff Contract",
    summary: "Queue handoff contract defines queued blocked approved denied running completed failed timeout canceled and recovered states.",
    markerPhrases: [
      "Backend queue handoff contract",
      "Backend queue handoff contract does not create queue jobs",
      "Backend queue handoff requires explicit operator approval",
      "Queue handoff contract defines queued blocked approved denied running completed failed timeout canceled and recovered states",
      "Denied backend queue handoff paths remain blocked",
      "Backend queue handoff checklist",
    ],
    deniedCopy: "Denied backend queue handoff paths remain blocked.",
    approvalCopy: "Backend queue handoff requires explicit operator approval.",
    surfaceIds: ["queue-handoff", "approval-ticket", "result-handoff", "recovery-handoff", "audit-handoff", "operator-signoff"],
    devOnly: true,
  },
  {
    slug: "backend-approval-denied-path-matrix",
    href: "/backend-approval-denied-path-matrix",
    phase: "Phase 1315",
    title: "Backend approval denied path matrix",
    commandLabel: "Go to Backend Approval Denied Path Matrix",
    summary: "Denied path matrix lists blocked prompts models providers connectors files commands git tests builds smokes runtimes adapters persistence export recovery queues deploy install scaffold secrets and memory promotion.",
    markerPhrases: [
      "Backend approval denied path matrix",
      "Backend approval denied path matrix does not mutate workflow state",
      "Backend approval denied path matrix requires explicit operator approval",
      "Denied path matrix lists blocked prompts models providers connectors files commands git tests builds smokes runtimes adapters persistence export recovery queues deploy install scaffold secrets and memory promotion",
      "Denied backend approval matrix paths remain blocked",
      "Backend approval denied path matrix checklist",
    ],
    deniedCopy: "Denied backend approval matrix paths remain blocked.",
    approvalCopy: "Backend approval denied path matrix requires explicit operator approval.",
    surfaceIds: ["denied-path-matrix", "handoff-boundary", "approval-ticket", "go-no-go-review", "security-review"],
    devOnly: true,
  },
  {
    slug: "backend-approval-operator-signoff",
    href: "/backend-approval-operator-signoff",
    phase: "Phase 1316",
    title: "Backend approval operator signoff",
    commandLabel: "Go to Backend Approval Operator Signoff",
    summary: "Operator signoff confirms approval ticket file write handoff command handoff evidence result recovery audit queue and denied path matrix.",
    markerPhrases: [
      "Backend approval operator signoff",
      "Backend approval operator signoff does not persist signoff or approve execution",
      "Backend approval operator signoff requires explicit human approval",
      "Operator signoff confirms approval ticket file write handoff command handoff evidence result recovery audit queue and denied path matrix",
      "Denied backend approval signoff paths remain blocked",
      "Backend approval operator signoff checklist",
    ],
    deniedCopy: "Denied backend approval signoff paths remain blocked.",
    approvalCopy: "Backend approval operator signoff requires explicit human approval.",
    surfaceIds: ["operator-signoff", "approval-ticket", "file-write-handoff", "command-handoff", "evidence-handoff", "result-handoff", "recovery-handoff", "audit-handoff", "queue-handoff", "denied-path-matrix"],
    devOnly: true,
  },
  {
    slug: "backend-approval-go-no-go-review",
    href: "/backend-approval-go-no-go-review",
    phase: "Phase 1317",
    title: "Backend approval go no-go review",
    commandLabel: "Go to Backend Approval Go No Go Review",
    summary: "Go no-go review reports preview-only status blocked backend execution and required future backend guards.",
    markerPhrases: [
      "Backend approval go no-go review",
      "Backend approval go no-go review does not release execution",
      "Backend approval go no-go review requires explicit operator approval",
      "Go no-go review reports preview-only status blocked backend execution and required future backend guards",
      "Denied backend approval go no-go paths remain blocked",
      "Backend approval go no-go checklist",
    ],
    deniedCopy: "Denied backend approval go no-go paths remain blocked.",
    approvalCopy: "Backend approval go no-go review requires explicit operator approval.",
    surfaceIds: ["go-no-go-review", "operator-signoff", "denied-path-matrix", "security-review", "failure-review"],
    devOnly: true,
  },
  {
    slug: "backend-handoff-security-review",
    href: "/backend-handoff-security-review",
    phase: "Phase 1318",
    title: "Backend handoff security review",
    commandLabel: "Go to Backend Handoff Security Review",
    summary: "Security review checks secret redaction path guard command allowlist environment-name-only display provider block connector block and memory-promotion block.",
    markerPhrases: [
      "Backend handoff security review",
      "Backend handoff security review does not execute backend actions",
      "Backend handoff security review requires explicit operator approval",
      "Security review checks secret redaction path guard command allowlist environment-name-only display provider block connector block and memory-promotion block",
      "Denied backend handoff security paths remain blocked",
      "Backend handoff security review checklist",
    ],
    deniedCopy: "Denied backend handoff security paths remain blocked.",
    approvalCopy: "Backend handoff security review requires explicit operator approval.",
    surfaceIds: ["security-review", "file-write-handoff", "command-handoff", "evidence-handoff", "denied-path-matrix"],
    devOnly: true,
  },
  {
    slug: "backend-handoff-failure-review",
    href: "/backend-handoff-failure-review",
    phase: "Phase 1319",
    title: "Backend handoff failure review",
    commandLabel: "Go to Backend Handoff Failure Review",
    summary: "Failure review defines denied invalid expired canceled failed timeout partial recovery-required and manual-review handoff states.",
    markerPhrases: [
      "Backend handoff failure review",
      "Backend handoff failure review does not retry or recover actions",
      "Backend handoff failure review requires explicit operator approval",
      "Failure review defines denied invalid expired canceled failed timeout partial recovery-required and manual-review handoff states",
      "Denied backend handoff failure paths remain blocked",
      "Backend handoff failure review checklist",
    ],
    deniedCopy: "Denied backend handoff failure paths remain blocked.",
    approvalCopy: "Backend handoff failure review requires explicit operator approval.",
    surfaceIds: ["failure-review", "result-handoff", "recovery-handoff", "audit-handoff", "queue-handoff"],
    devOnly: true,
  },
  {
    slug: "first-backend-approval-handoff-candidate",
    href: "/first-backend-approval-handoff-candidate",
    phase: "Phase 1320",
    title: "First backend approval handoff candidate",
    commandLabel: "Go to First Backend Approval Handoff Candidate",
    summary: "Candidate combines approval ticket file write command evidence result recovery audit queue denied path signoff go no-go security and failure reviews.",
    markerPhrases: [
      "First backend approval handoff candidate",
      "First backend approval handoff candidate does not execute backend actions",
      "First backend approval handoff candidate requires explicit operator approval",
      "Candidate combines approval ticket file write command evidence result recovery audit queue denied path signoff go no-go security and failure reviews",
      "Denied first backend approval handoff paths remain blocked",
      "First backend approval handoff checklist",
    ],
    deniedCopy: "Denied first backend approval handoff paths remain blocked.",
    approvalCopy: "First backend approval handoff candidate requires explicit operator approval.",
    surfaceIds: ALL_SURFACE_IDS,
    devOnly: true,
  },
  {
    slug: "controlled-backend-approval-handoff-release-candidate",
    href: "/controlled-backend-approval-handoff-release-candidate",
    phase: "Phase 1321",
    title: "Controlled backend approval handoff release candidate",
    commandLabel: "Go to Controlled Backend Approval Handoff Release Candidate",
    summary: "Release candidate prepares CodexForge for future backend-owned approval and execution without executing it.",
    markerPhrases: [
      "Controlled backend approval handoff release candidate",
      "Controlled backend approval handoff release candidate does not call models write files run commands persist approvals create queues release locks persist results or execute recovery",
      "Controlled backend approval handoff release requires explicit operator approval",
      "Release candidate prepares CodexForge for future backend-owned approval and execution without executing it",
      "Denied controlled backend approval handoff paths remain blocked",
      "Controlled backend approval handoff release checklist",
    ],
    deniedCopy: "Denied controlled backend approval handoff paths remain blocked.",
    approvalCopy: "Controlled backend approval handoff release requires explicit operator approval.",
    surfaceIds: ALL_SURFACE_IDS,
    devOnly: true,
  },
] as const;

export function buildBackendApprovalHandoffStableKey(parts: readonly string[]): string {
  return parts.join(":").toLowerCase().replace(/[^a-z0-9:/-]+/g, "-");
}

export function listBackendApprovalHandoffRouteDefinitions(): readonly BackendApprovalHandoffRouteDefinition[] {
  return ROUTES;
}

export function getBackendApprovalHandoffRouteDefinition(
  slug: BackendApprovalHandoffRouteSlug
): BackendApprovalHandoffRouteDefinition {
  return ROUTES.find((candidate) => candidate.slug === slug) ?? ROUTES[0];
}

export function buildBackendApprovalHandoffRouteModel(
  slug: BackendApprovalHandoffRouteSlug = "codexforge-cockpit"
): BackendApprovalHandoffRouteModel {
  const route = getBackendApprovalHandoffRouteDefinition(slug);
  const surfaces = route.surfaceIds
    .map((surfaceId) => SURFACES.find((surface) => surface.id === surfaceId))
    .filter((surface): surface is BackendApprovalHandoffSurface => Boolean(surface));

  return {
    route,
    surfaces,
    globalSafetyCopy: GLOBAL_SAFETY_COPY,
    targetFamilies: TARGET_FAMILIES,
    handoffFlow: HANDOFF_FLOW,
    approvalTicketFields: APPROVAL_TICKET_FIELDS,
    deniedPathMatrix: DENIED_PATH_MATRIX,
    resultStates: RESULT_STATES,
    recoveryRequirements: RECOVERY_REQUIREMENTS,
    queueStates: QUEUE_STATES,
    futureBackendGuards: FUTURE_BACKEND_GUARDS,
    summary: summarizeBackendApprovalHandoffRoute(route, surfaces),
  };
}

export function buildBackendApprovalHandoffModel(): BackendApprovalHandoffRouteModel {
  return buildBackendApprovalHandoffRouteModel("codexforge-cockpit");
}

export function summarizeBackendApprovalHandoffRoute(
  route: BackendApprovalHandoffRouteDefinition,
  surfaces: readonly BackendApprovalHandoffSurface[]
): string {
  return `${route.title} keeps ${surfaces.length} backend approval handoff surfaces static, deterministic, preview-only, approval-gated, and blocked from backend execution.`;
}

export function summarizeBackendApprovalHandoffRouteModel(
  model = buildBackendApprovalHandoffModel()
): string {
  return model.summary;
}
