export type ApplyRunTransactionRouteSlug =
  | "codexforge-cockpit"
  | "apply-run-transaction-boundary"
  | "transaction-intent-packet"
  | "transaction-preflight-preview"
  | "workspace-snapshot-preview"
  | "guarded-apply-transaction-step"
  | "guarded-run-transaction-step"
  | "transaction-validation-step"
  | "transaction-evidence-capture-preview"
  | "transaction-result-capture-preview"
  | "transaction-audit-capture-preview"
  | "transaction-rollback-readiness-preview"
  | "transaction-retry-readiness-preview"
  | "transaction-recovery-decision-preview"
  | "cockpit-transaction-summary"
  | "first-apply-run-transaction-candidate"
  | "controlled-apply-run-transaction-release-candidate";

export type ApplyRunTransactionKind =
  | "apply-run-transaction-preview"
  | "apply-run-transaction-boundary"
  | "transaction-intent-packet"
  | "transaction-preflight-preview"
  | "workspace-snapshot-preview"
  | "guarded-apply-transaction-step"
  | "guarded-run-transaction-step"
  | "transaction-validation-step"
  | "transaction-evidence-capture-preview"
  | "transaction-result-capture-preview"
  | "transaction-audit-capture-preview"
  | "transaction-rollback-readiness-preview"
  | "transaction-retry-readiness-preview"
  | "transaction-recovery-decision-preview"
  | "first-apply-run-transaction-candidate"
  | "controlled-apply-run-transaction-release-candidate";

export type ApplyRunTransactionPanelState =
  | "preview-only"
  | "review-only"
  | "backend-owned"
  | "needs-approval"
  | "blocked"
  | "denied"
  | "manual-review"
  | "rollback-ready"
  | "retry-ready";

export type ApplyRunTransactionItem = {
  id: string;
  label: string;
  detail: string;
  state: ApplyRunTransactionPanelState;
};

export type ApplyRunTransactionSection = {
  id: string;
  label: string;
  title: string;
  summary: string;
  state: ApplyRunTransactionPanelState;
  items: readonly ApplyRunTransactionItem[];
};

export type ApplyRunTransactionDeniedBoundary = ApplyRunTransactionItem;

export type ApplyRunTransactionModel = {
  transactionId: string;
  transactionKind: ApplyRunTransactionKind;
  queueItemRef: string;
  compiledGoalRef: string;
  workProposalRef: string;
  approvalRef: string;
  transactionIntent: ApplyRunTransactionSection;
  preflightPreview: ApplyRunTransactionSection;
  workspaceSnapshotPreview: ApplyRunTransactionSection;
  guardedApplyStep: ApplyRunTransactionSection;
  guardedRunStep: ApplyRunTransactionSection;
  validationStep: ApplyRunTransactionSection;
  evidenceCapturePreview: ApplyRunTransactionSection;
  resultCapturePreview: ApplyRunTransactionSection;
  auditCapturePreview: ApplyRunTransactionSection;
  rollbackReadinessPreview: ApplyRunTransactionSection;
  retryReadinessPreview: ApplyRunTransactionSection;
  recoveryDecisionPreview: ApplyRunTransactionSection;
  transactionFinalizationPreview: ApplyRunTransactionSection;
  deniedTransactionBoundaries: readonly ApplyRunTransactionDeniedBoundary[];
  cockpitSummary: readonly ApplyRunTransactionItem[];
  explicitSafetyLimits: readonly string[];
};

export type ApplyRunTransactionRouteDefinition = {
  slug: ApplyRunTransactionRouteSlug;
  href: string;
  phase: string;
  title: string;
  commandLabel: string;
  summary: string;
  markerPhrases: readonly string[];
  sectionIds: readonly string[];
  devOnly: boolean;
};

export type ApplyRunTransactionRouteModel = {
  route: ApplyRunTransactionRouteDefinition;
  transaction: ApplyRunTransactionModel;
  sections: readonly ApplyRunTransactionSection[];
  diagnosticRoutes: readonly ApplyRunTransactionRouteDefinition[];
  cockpitMarkers: readonly string[];
  summary: string;
};

export const APPLY_RUN_TRANSACTION_COCKPIT_MARKERS = [
  "Apply Run Transaction Boundary",
  "Transaction",
  "Intent",
  "Preflight",
  "Snapshot",
  "Apply",
  "Run",
  "Validate",
  "Evidence",
  "Result",
  "Audit",
  "Rollback",
  "Retry",
  "Recovery",
  "Denied Paths",
  "No transaction creation from the cockpit",
  "No transaction persistence from the cockpit",
  "No snapshot creation from the cockpit",
  "No apply execution from the cockpit",
  "No command execution from the cockpit",
  "No rollback retry or recovery execution from the cockpit",
  "Backend-owned transaction state remains required",
  "Explicit operator approval remains required",
] as const;

const EXPLICIT_SAFETY_LIMITS = [
  "Apply Run Transaction Boundary is preview-only from the frontend.",
  "It does not create real transactions from the UI.",
  "It does not persist transaction state from the UI.",
  "It does not create real snapshots from the UI.",
  "It does not write files from the UI.",
  "It does not apply diffs from the UI.",
  "It does not run commands from the UI.",
  "It does not create queue jobs from the UI.",
  "It does not persist approvals from the UI.",
  "It does not persist evidence/results/audit from the UI.",
  "It does not execute recovery/rollback/retry from the UI.",
  "It does not call models/providers/connectors from the frontend.",
  "It does not promote memory automatically.",
  "It does not write browser storage from the cockpit.",
  "It prepares a future backend-owned transactional apply/run path.",
  "Backend-owned guarded execution remains required for real actions.",
  "Explicit operator approval remains required.",
] as const;

const TRANSACTION_INTENT: ApplyRunTransactionSection = {
  id: "transaction-intent",
  label: "Intent",
  title: "transactionIntent",
  summary:
    "Intent previews queue item, compiled goal, work proposal, approval, scope, and done criteria before any backend-owned transaction can exist.",
  state: "needs-approval",
  items: [
    {
      id: "intent-goal-context",
      label: "Goal context and proposal",
      detail:
        "A future guarded work item becomes a transaction only after queue item, compiled goal, work proposal, approval, scope, and done criteria references align.",
      state: "review-only",
    },
    {
      id: "intent-no-execution",
      label: "Intent is not executable",
      detail: "Transaction intent packet does not execute intent and cannot release apply or run from the UI.",
      state: "blocked",
    },
    {
      id: "intent-operator-approval",
      label: "Operator approval required",
      detail: "Explicit operator approval remains required before future backend-owned transaction execution.",
      state: "needs-approval",
    },
  ],
};

const PREFLIGHT_PREVIEW: ApplyRunTransactionSection = {
  id: "preflight-preview",
  label: "Preflight",
  title: "preflightPreview",
  summary:
    "Preflight previews approval freshness, queue state, path guard, command guard, snapshot readiness, evidence readiness, result readiness, audit readiness, and recovery readiness.",
  state: "backend-owned",
  items: [
    {
      id: "preflight-readiness",
      label: "Readiness checks",
      detail:
        "Approval freshness, queue state, path guard, command guard, snapshot readiness, evidence readiness, result readiness, audit readiness, and recovery readiness are backend-owned future checks.",
      state: "backend-owned",
    },
    {
      id: "preflight-no-ui-check",
      label: "No UI preflight",
      detail: "Transaction preflight preview does not run preflight checks from the UI.",
      state: "blocked",
    },
    {
      id: "preflight-denied",
      label: "Denied preflight paths",
      detail: "Stale approval, invalid queue state, unsafe paths, denied commands, missing snapshot readiness, and recovery gaps block apply/run.",
      state: "denied",
    },
  ],
};

const WORKSPACE_SNAPSHOT_PREVIEW: ApplyRunTransactionSection = {
  id: "workspace-snapshot-preview",
  label: "Snapshot",
  title: "workspaceSnapshotPreview",
  summary:
    "Snapshot readiness previews required snapshot references, touched files, rollback readiness, dirty workspace risk, and manual review needs without creating snapshots.",
  state: "backend-owned",
  items: [
    {
      id: "snapshot-requirement",
      label: "Snapshot requirement",
      detail:
        "A future backend snapshot must establish touched files, rollback references, dirty workspace risk, and manual review needs before apply.",
      state: "backend-owned",
    },
    {
      id: "snapshot-no-create",
      label: "No UI snapshot creation",
      detail: "Workspace snapshot preview does not create snapshots from the UI.",
      state: "blocked",
    },
    {
      id: "snapshot-dirty-workspace",
      label: "Dirty workspace risk",
      detail: "Dirty workspace, missing rollback references, and unresolved touched files move the transaction to manual review.",
      state: "manual-review",
    },
  ],
};

const GUARDED_APPLY_STEP: ApplyRunTransactionSection = {
  id: "guarded-apply-step",
  label: "Apply",
  title: "guardedApplyStep",
  summary:
    "Apply previews path guard, diff apply, snapshot evidence, rollback, and denied path requirements while keeping file writes and diff application blocked in the UI.",
  state: "backend-owned",
  items: [
    {
      id: "apply-path-guard",
      label: "Path guard and diff scope",
      detail: "Path guard, diff scope, snapshot evidence, and rollback references are required before future backend-owned apply.",
      state: "backend-owned",
    },
    {
      id: "apply-no-ui-write",
      label: "No UI write or diff apply",
      detail: "Guarded apply transaction step does not write files or apply diffs from the UI.",
      state: "blocked",
    },
    {
      id: "apply-denied",
      label: "Denied apply paths",
      detail: "Direct file mutation, broad apply, unsafe paths, missing snapshot, missing approval, and hidden approvals remain blocked.",
      state: "denied",
    },
  ],
};

const GUARDED_RUN_STEP: ApplyRunTransactionSection = {
  id: "guarded-run-step",
  label: "Run",
  title: "guardedRunStep",
  summary:
    "Run previews command guard, allowlist, arguments, working directory, timeout, stdout, stderr, exit code, and denied command requirements without command execution.",
  state: "backend-owned",
  items: [
    {
      id: "run-command-guard",
      label: "Command guard",
      detail:
        "Command allowlist, arguments, working directory, timeout, stdout, stderr, exit code, and denied command requirements are backend-owned future controls.",
      state: "backend-owned",
    },
    {
      id: "run-no-ui-command",
      label: "No UI command execution",
      detail: "Guarded run transaction step does not run commands from the UI.",
      state: "blocked",
    },
    {
      id: "run-denied",
      label: "Denied command paths",
      detail: "Arbitrary command execution, process starts, port binding, installs, deployments, and unapproved arguments remain blocked.",
      state: "denied",
    },
  ],
};

const VALIDATION_STEP: ApplyRunTransactionSection = {
  id: "validation-step",
  label: "Validate",
  title: "validationStep",
  summary:
    "Validation previews build, smoke, lint, test, hygiene, and domain validation candidates as backend-owned future checks without running validation from the UI.",
  state: "backend-owned",
  items: [
    {
      id: "validation-candidates",
      label: "Validation candidates",
      detail: "Build, smoke, lint, test, hygiene, and domain validation candidates are named for future backend-owned checks.",
      state: "review-only",
    },
    {
      id: "validation-no-ui-run",
      label: "No UI validation execution",
      detail: "Transaction validation step does not run validation from the UI.",
      state: "blocked",
    },
    {
      id: "validation-approval",
      label: "Approval-gated validation",
      detail: "Validation cannot run until explicit operator approval and backend-owned transaction state exist.",
      state: "needs-approval",
    },
  ],
};

const EVIDENCE_CAPTURE_PREVIEW: ApplyRunTransactionSection = {
  id: "evidence-capture-preview",
  label: "Evidence",
  title: "evidenceCapturePreview",
  summary:
    "Evidence preview covers diff, command, stdout, stderr, exit code, approval, queue, snapshot, validation, result, audit, and recovery evidence without UI persistence.",
  state: "backend-owned",
  items: [
    {
      id: "evidence-references",
      label: "Evidence references",
      detail:
        "Diff, command, stdout, stderr, exit code, approval, queue, snapshot, validation, result, audit, and recovery evidence need backend-owned capture.",
      state: "backend-owned",
    },
    {
      id: "evidence-no-ui-persist",
      label: "No UI evidence persistence",
      detail: "Transaction evidence capture preview does not persist evidence from the UI.",
      state: "blocked",
    },
    {
      id: "evidence-gaps",
      label: "Evidence gaps",
      detail: "Missing, redacted, mismatched, or incomplete evidence moves the transaction to manual review.",
      state: "manual-review",
    },
  ],
};

const RESULT_CAPTURE_PREVIEW: ApplyRunTransactionSection = {
  id: "result-capture-preview",
  label: "Result",
  title: "resultCapturePreview",
  summary:
    "Result preview covers success, blocked, denied, failed, timeout, canceled, manual-review, retryable, recovered, and operator-accepted outcomes without UI persistence.",
  state: "backend-owned",
  items: [
    {
      id: "result-outcomes",
      label: "Outcome categories",
      detail:
        "Success, blocked, denied, failed, timeout, canceled, manual-review, retryable, recovered, and operator-accepted outcomes require backend-owned result capture.",
      state: "backend-owned",
    },
    {
      id: "result-no-ui-persist",
      label: "No UI result persistence",
      detail: "Transaction result capture preview does not persist results from the UI.",
      state: "blocked",
    },
    {
      id: "result-operator-acceptance",
      label: "Operator acceptance",
      detail: "Operator acceptance is reviewed explicitly and cannot be inferred from cockpit preview text.",
      state: "needs-approval",
    },
  ],
};

const AUDIT_CAPTURE_PREVIEW: ApplyRunTransactionSection = {
  id: "audit-capture-preview",
  label: "Audit",
  title: "auditCapturePreview",
  summary:
    "Audit preview records goal context, plan, diff, command, approval, queue, transaction, snapshot, evidence, result, recovery, operator, and denied paths without UI persistence.",
  state: "backend-owned",
  items: [
    {
      id: "audit-records",
      label: "Audit records",
      detail:
        "Goal context, plan, diff, command, approval, queue, transaction, snapshot, evidence, result, recovery, operator, and denied path records need backend-owned audit capture.",
      state: "backend-owned",
    },
    {
      id: "audit-no-ui-persist",
      label: "No UI audit persistence",
      detail: "Transaction audit capture preview does not persist audit logs from the UI.",
      state: "blocked",
    },
    {
      id: "audit-continuity",
      label: "Audit continuity",
      detail: "Audit continuity is required before retry, rollback, recovery, finalization, or operator acceptance can be reviewed.",
      state: "review-only",
    },
  ],
};

const ROLLBACK_READINESS_PREVIEW: ApplyRunTransactionSection = {
  id: "rollback-readiness-preview",
  label: "Rollback",
  title: "rollbackReadinessPreview",
  summary:
    "Rollback readiness checks snapshot availability, diff reversibility, touched files, evidence references, audit references, and recovery risk without executing rollback.",
  state: "rollback-ready",
  items: [
    {
      id: "rollback-readiness",
      label: "Rollback readiness",
      detail: "Snapshot availability, diff reversibility, touched files, evidence references, audit references, and recovery risk must be reviewable.",
      state: "rollback-ready",
    },
    {
      id: "rollback-no-execute",
      label: "No rollback execution",
      detail: "Transaction rollback readiness preview does not execute rollback.",
      state: "blocked",
    },
    {
      id: "rollback-approval",
      label: "Rollback approval",
      detail: "Rollback remains approval-gated and backend-owned even when readiness is visible.",
      state: "needs-approval",
    },
  ],
};

const RETRY_READINESS_PREVIEW: ApplyRunTransactionSection = {
  id: "retry-readiness-preview",
  label: "Retry",
  title: "retryReadinessPreview",
  summary:
    "Retry readiness checks failure reason, changed preconditions, approval freshness, guard readiness, evidence gaps, result gaps, and audit continuity without executing retry.",
  state: "retry-ready",
  items: [
    {
      id: "retry-readiness",
      label: "Retry readiness",
      detail: "Failure reason, changed preconditions, approval freshness, guard readiness, evidence gaps, result gaps, and audit continuity must be reviewed.",
      state: "retry-ready",
    },
    {
      id: "retry-no-execute",
      label: "No retry execution",
      detail: "Transaction retry readiness preview does not execute retry.",
      state: "blocked",
    },
    {
      id: "retry-approval",
      label: "Retry approval",
      detail: "Retry remains approval-gated and backend-owned because changed preconditions can alter transaction risk.",
      state: "needs-approval",
    },
  ],
};

const RECOVERY_DECISION_PREVIEW: ApplyRunTransactionSection = {
  id: "recovery-decision-preview",
  label: "Recovery",
  title: "recoveryDecisionPreview",
  summary:
    "Recovery decision preview shows rollback, retry, restore, stop, explain-failure, manual-review, safety-stop, and partial-recovery decisions without executing recovery.",
  state: "manual-review",
  items: [
    {
      id: "recovery-decisions",
      label: "Recovery decisions",
      detail: "Rollback, retry, restore, stop, explain-failure, manual-review, safety-stop, and partial-recovery decisions stay review-only.",
      state: "manual-review",
    },
    {
      id: "recovery-no-execute",
      label: "No recovery execution",
      detail: "Transaction recovery decision preview does not execute recovery.",
      state: "blocked",
    },
    {
      id: "recovery-approval",
      label: "Approval-gated recovery",
      detail: "Recovery remains approval-gated because recovery can mutate workspace state or change transaction outcome.",
      state: "needs-approval",
    },
  ],
};

const TRANSACTION_FINALIZATION_PREVIEW: ApplyRunTransactionSection = {
  id: "transaction-finalization-preview",
  label: "Finalize",
  title: "transactionFinalizationPreview",
  summary:
    "Finalization previews completion, blocked, denied, manual review, recovered, retryable, and operator-accepted closure without persisting transaction state from the UI.",
  state: "backend-owned",
  items: [
    {
      id: "finalization-capture",
      label: "Final transaction summary",
      detail: "Finalization can only be backend-owned after evidence, result, audit, recovery review, and operator acceptance align.",
      state: "backend-owned",
    },
    {
      id: "finalization-no-ui-persist",
      label: "No UI transaction persistence",
      detail: "The cockpit and phase pages do not persist transaction state from the UI.",
      state: "blocked",
    },
    {
      id: "finalization-denied",
      label: "Denied finalization paths",
      detail: "Missing approval, evidence gaps, result gaps, audit gaps, unsafe recovery, and denied apply/run boundaries block finalization.",
      state: "denied",
    },
  ],
};

const DENIED_TRANSACTION_BOUNDARIES: readonly ApplyRunTransactionDeniedBoundary[] = [
  {
    id: "denied-transaction-creation",
    label: "Frontend transaction creation denied",
    detail: "The UI cannot create real transactions, queue jobs, snapshots, approvals, evidence, results, audit, rollback, retry, or recovery records.",
    state: "denied",
  },
  {
    id: "denied-frontend-apply",
    label: "Frontend apply denied",
    detail: "Direct file mutation, diff application, broad apply, arbitrary path access, and hidden approval remain blocked.",
    state: "blocked",
  },
  {
    id: "denied-frontend-run",
    label: "Frontend run denied",
    detail: "Direct command execution, runtime starts, process starts, port binding, deployment, install, and broad backend execution remain blocked.",
    state: "blocked",
  },
  {
    id: "denied-recovery",
    label: "Frontend rollback retry recovery denied",
    detail: "Rollback, retry, restore, stop, partial recovery, and automatic memory promotion cannot execute from the UI.",
    state: "blocked",
  },
  {
    id: "denied-external-calls",
    label: "Provider model connector calls denied",
    detail: "Models, providers, connectors, secret reads, browser storage writes, and approval persistence from the UI remain blocked.",
    state: "denied",
  },
];

const COCKPIT_SUMMARY: readonly ApplyRunTransactionItem[] = [
  {
    id: "cockpit-transaction",
    label: "Transaction",
    detail:
      "A future guarded work item becomes a transaction only when backend-owned queue item, compiled goal, work proposal, and approval references are ready.",
    state: "preview-only",
  },
  {
    id: "cockpit-intent",
    label: "Intent",
    detail: "Intent shows goal context, work proposal, queue item scope, approval reference, and done criteria without executing intent.",
    state: "review-only",
  },
  {
    id: "cockpit-preflight",
    label: "Preflight",
    detail:
      "Preflight checks approval freshness, queue state, path guard, command guard, snapshot readiness, evidence readiness, result readiness, audit readiness, and recovery readiness.",
    state: "backend-owned",
  },
  {
    id: "cockpit-snapshot",
    label: "Snapshot",
    detail: "Snapshot readiness means touched files, rollback references, dirty workspace risk, and manual review needs are known before apply.",
    state: "backend-owned",
  },
  {
    id: "cockpit-apply",
    label: "Apply",
    detail: "Apply previews guarded diff and path requirements separately from command run; the cockpit cannot write files or apply diffs.",
    state: "blocked",
  },
  {
    id: "cockpit-run",
    label: "Run",
    detail: "Run previews guarded command allowlist, arguments, working directory, timeout, stdout, stderr, and exit code separately from apply.",
    state: "blocked",
  },
  {
    id: "cockpit-validate",
    label: "Validate",
    detail: "Validation means backend-owned build, smoke, lint, test, hygiene, and domain checks can be reviewed before finalization.",
    state: "backend-owned",
  },
  {
    id: "cockpit-evidence",
    label: "Evidence",
    detail: "Evidence must capture diff, command, stdout, stderr, exit code, approval, queue, snapshot, validation, result, audit, and recovery references.",
    state: "backend-owned",
  },
  {
    id: "cockpit-result",
    label: "Result",
    detail: "Result capture must record success, blocked, denied, failed, timeout, canceled, manual-review, retryable, recovered, and operator-accepted outcomes.",
    state: "backend-owned",
  },
  {
    id: "cockpit-audit",
    label: "Audit",
    detail: "Audit capture must connect goal context, plan, diff, command, approval, queue, transaction, snapshot, evidence, result, recovery, operator, and denied paths.",
    state: "backend-owned",
  },
  {
    id: "cockpit-rollback",
    label: "Rollback",
    detail: "Rollback readiness is reviewed from snapshot availability, diff reversibility, touched files, evidence, audit, and recovery risk.",
    state: "rollback-ready",
  },
  {
    id: "cockpit-retry",
    label: "Retry",
    detail: "Retry readiness is reviewed from failure reason, changed preconditions, approval freshness, guards, evidence gaps, result gaps, and audit continuity.",
    state: "retry-ready",
  },
  {
    id: "cockpit-recovery",
    label: "Recovery",
    detail: "Recovery remains approval-gated because rollback, retry, restore, stop, safety-stop, and partial recovery can change workspace or transaction outcome.",
    state: "needs-approval",
  },
  {
    id: "cockpit-denied-paths",
    label: "Denied Paths",
    detail:
      "The cockpit cannot create, persist, apply, run, snapshot, rollback, retry, recover, approve, or capture transaction records directly.",
    state: "denied",
  },
];

const APPLY_RUN_TRANSACTION: ApplyRunTransactionModel = {
  transactionId: "codexforge-apply-run-transaction-preview-1482-1497",
  transactionKind: "apply-run-transaction-preview",
  queueItemRef: "queue-item-ref-preview-only",
  compiledGoalRef: "compiled-goal-ref-preview-only",
  workProposalRef: "work-proposal-ref-preview-only",
  approvalRef: "approval-ref-preview-only",
  transactionIntent: TRANSACTION_INTENT,
  preflightPreview: PREFLIGHT_PREVIEW,
  workspaceSnapshotPreview: WORKSPACE_SNAPSHOT_PREVIEW,
  guardedApplyStep: GUARDED_APPLY_STEP,
  guardedRunStep: GUARDED_RUN_STEP,
  validationStep: VALIDATION_STEP,
  evidenceCapturePreview: EVIDENCE_CAPTURE_PREVIEW,
  resultCapturePreview: RESULT_CAPTURE_PREVIEW,
  auditCapturePreview: AUDIT_CAPTURE_PREVIEW,
  rollbackReadinessPreview: ROLLBACK_READINESS_PREVIEW,
  retryReadinessPreview: RETRY_READINESS_PREVIEW,
  recoveryDecisionPreview: RECOVERY_DECISION_PREVIEW,
  transactionFinalizationPreview: TRANSACTION_FINALIZATION_PREVIEW,
  deniedTransactionBoundaries: DENIED_TRANSACTION_BOUNDARIES,
  cockpitSummary: COCKPIT_SUMMARY,
  explicitSafetyLimits: EXPLICIT_SAFETY_LIMITS,
};

const ALL_SECTIONS = [
  TRANSACTION_INTENT,
  PREFLIGHT_PREVIEW,
  WORKSPACE_SNAPSHOT_PREVIEW,
  GUARDED_APPLY_STEP,
  GUARDED_RUN_STEP,
  VALIDATION_STEP,
  EVIDENCE_CAPTURE_PREVIEW,
  RESULT_CAPTURE_PREVIEW,
  AUDIT_CAPTURE_PREVIEW,
  ROLLBACK_READINESS_PREVIEW,
  RETRY_READINESS_PREVIEW,
  RECOVERY_DECISION_PREVIEW,
  TRANSACTION_FINALIZATION_PREVIEW,
] as const;

const ROUTES: readonly ApplyRunTransactionRouteDefinition[] = [
  {
    slug: "codexforge-cockpit",
    href: "/codexforge-cockpit",
    phase: "Apply Run Transaction Boundary",
    title: "Cockpit transaction summary",
    commandLabel: "Go to Unified CodexForge Cockpit",
    summary: "Concise cockpit-centered apply/run transaction preview for normal users.",
    markerPhrases: APPLY_RUN_TRANSACTION_COCKPIT_MARKERS,
    sectionIds: ALL_SECTIONS.map((section) => section.id),
    devOnly: false,
  },
  {
    slug: "apply-run-transaction-boundary",
    href: "/apply-run-transaction-boundary",
    phase: "Phase 1482",
    title: "Apply run transaction boundary",
    commandLabel: "Go to Apply Run Transaction Boundary",
    summary: "Apply run transaction boundary previews backend-owned transactional apply/run without broad execution.",
    markerPhrases: [
      "Apply run transaction boundary",
      "Apply run transaction boundary does not create transactions from the UI",
      "Apply run transaction requires explicit operator approval before execution",
      "Apply run transaction prepares backend-owned transactional apply and run without broad execution",
      "Denied apply run transaction paths remain blocked",
      "Apply run transaction checklist",
    ],
    sectionIds: ["transaction-intent", "preflight-preview", "guarded-apply-step", "guarded-run-step", "recovery-decision-preview"],
    devOnly: true,
  },
  {
    slug: "transaction-intent-packet",
    href: "/transaction-intent-packet",
    phase: "Phase 1483",
    title: "Transaction intent packet",
    commandLabel: "Go to Transaction Intent Packet",
    summary: "Transaction intent packet previews goal context, proposal, approval, queue item, scope, and done criteria.",
    markerPhrases: [
      "Transaction intent packet",
      "Transaction intent packet does not execute intent",
      "Transaction intent packet requires explicit operator approval",
      "Transaction intent packet previews goal context work proposal approval queue item scope and done criteria",
      "Denied transaction intent paths remain blocked",
      "Transaction intent checklist",
    ],
    sectionIds: ["transaction-intent", "preflight-preview", "transaction-finalization-preview"],
    devOnly: true,
  },
  {
    slug: "transaction-preflight-preview",
    href: "/transaction-preflight-preview",
    phase: "Phase 1484",
    title: "Transaction preflight preview",
    commandLabel: "Go to Transaction Preflight Preview",
    summary: "Transaction preflight preview shows readiness checks before apply or run.",
    markerPhrases: [
      "Transaction preflight preview",
      "Transaction preflight preview does not run preflight checks from the UI",
      "Transaction preflight preview requires explicit operator approval",
      "Transaction preflight preview checks approval freshness queue state path guard command guard snapshot readiness evidence readiness result readiness audit readiness and recovery readiness",
      "Denied transaction preflight paths remain blocked",
      "Transaction preflight checklist",
    ],
    sectionIds: ["preflight-preview", "workspace-snapshot-preview", "guarded-apply-step", "guarded-run-step"],
    devOnly: true,
  },
  {
    slug: "workspace-snapshot-preview",
    href: "/workspace-snapshot-preview",
    phase: "Phase 1485",
    title: "Workspace snapshot preview",
    commandLabel: "Go to Workspace Snapshot Preview",
    summary: "Workspace snapshot preview shows rollback readiness without creating snapshots.",
    markerPhrases: [
      "Workspace snapshot preview",
      "Workspace snapshot preview does not create snapshots from the UI",
      "Workspace snapshot preview requires explicit operator approval",
      "Workspace snapshot preview shows snapshot requirement touched files rollback readiness dirty workspace risk and manual review needs",
      "Denied workspace snapshot paths remain blocked",
      "Workspace snapshot checklist",
    ],
    sectionIds: ["workspace-snapshot-preview", "rollback-readiness-preview", "recovery-decision-preview"],
    devOnly: true,
  },
  {
    slug: "guarded-apply-transaction-step",
    href: "/guarded-apply-transaction-step",
    phase: "Phase 1486",
    title: "Guarded apply transaction step",
    commandLabel: "Go to Guarded Apply Transaction Step",
    summary: "Guarded apply transaction step previews path guard and diff requirements without file writes.",
    markerPhrases: [
      "Guarded apply transaction step",
      "Guarded apply transaction step does not write files or apply diffs from the UI",
      "Guarded apply transaction step requires explicit operator approval",
      "Guarded apply transaction step previews path guard diff apply snapshot evidence rollback and denied path requirements",
      "Denied guarded apply transaction paths remain blocked",
      "Guarded apply transaction checklist",
    ],
    sectionIds: ["guarded-apply-step", "workspace-snapshot-preview", "evidence-capture-preview", "rollback-readiness-preview"],
    devOnly: true,
  },
  {
    slug: "guarded-run-transaction-step",
    href: "/guarded-run-transaction-step",
    phase: "Phase 1487",
    title: "Guarded run transaction step",
    commandLabel: "Go to Guarded Run Transaction Step",
    summary: "Guarded run transaction step previews command guard requirements without command execution.",
    markerPhrases: [
      "Guarded run transaction step",
      "Guarded run transaction step does not run commands from the UI",
      "Guarded run transaction step requires explicit operator approval",
      "Guarded run transaction step previews command guard allowlist arguments working directory timeout stdout stderr exit code and denied command requirements",
      "Denied guarded run transaction paths remain blocked",
      "Guarded run transaction checklist",
    ],
    sectionIds: ["guarded-run-step", "evidence-capture-preview", "result-capture-preview", "retry-readiness-preview"],
    devOnly: true,
  },
  {
    slug: "transaction-validation-step",
    href: "/transaction-validation-step",
    phase: "Phase 1488",
    title: "Transaction validation step",
    commandLabel: "Go to Transaction Validation Step",
    summary: "Transaction validation step previews backend-owned validation candidates.",
    markerPhrases: [
      "Transaction validation step",
      "Transaction validation step does not run validation from the UI",
      "Transaction validation step requires explicit operator approval",
      "Transaction validation step previews build smoke lint test hygiene and domain validation candidates as backend-owned future checks",
      "Denied transaction validation paths remain blocked",
      "Transaction validation checklist",
    ],
    sectionIds: ["validation-step", "evidence-capture-preview", "result-capture-preview"],
    devOnly: true,
  },
  {
    slug: "transaction-evidence-capture-preview",
    href: "/transaction-evidence-capture-preview",
    phase: "Phase 1489",
    title: "Transaction evidence capture preview",
    commandLabel: "Go to Transaction Evidence Capture Preview",
    summary: "Transaction evidence capture preview shows future backend-owned evidence capture.",
    markerPhrases: [
      "Transaction evidence capture preview",
      "Transaction evidence capture preview does not persist evidence from the UI",
      "Transaction evidence capture preview requires backend-owned evidence capture",
      "Transaction evidence capture preview covers diff command stdout stderr exit code approval queue snapshot validation result audit and recovery evidence",
      "Denied transaction evidence paths remain blocked",
      "Transaction evidence checklist",
    ],
    sectionIds: ["evidence-capture-preview", "result-capture-preview", "audit-capture-preview"],
    devOnly: true,
  },
  {
    slug: "transaction-result-capture-preview",
    href: "/transaction-result-capture-preview",
    phase: "Phase 1490",
    title: "Transaction result capture preview",
    commandLabel: "Go to Transaction Result Capture Preview",
    summary: "Transaction result capture preview shows future backend-owned result outcomes.",
    markerPhrases: [
      "Transaction result capture preview",
      "Transaction result capture preview does not persist results from the UI",
      "Transaction result capture preview requires backend-owned result capture",
      "Transaction result capture preview covers success blocked denied failed timeout canceled manual-review retryable recovered and operator-accepted outcomes",
      "Denied transaction result paths remain blocked",
      "Transaction result checklist",
    ],
    sectionIds: ["result-capture-preview", "retry-readiness-preview", "recovery-decision-preview"],
    devOnly: true,
  },
  {
    slug: "transaction-audit-capture-preview",
    href: "/transaction-audit-capture-preview",
    phase: "Phase 1491",
    title: "Transaction audit capture preview",
    commandLabel: "Go to Transaction Audit Capture Preview",
    summary: "Transaction audit capture preview shows future backend-owned audit capture.",
    markerPhrases: [
      "Transaction audit capture preview",
      "Transaction audit capture preview does not persist audit logs from the UI",
      "Transaction audit capture preview requires backend-owned audit capture",
      "Transaction audit capture preview records goal context plan diff command approval queue transaction snapshot evidence result recovery operator and denied paths",
      "Denied transaction audit paths remain blocked",
      "Transaction audit checklist",
    ],
    sectionIds: ["audit-capture-preview", "evidence-capture-preview", "result-capture-preview", "transaction-finalization-preview"],
    devOnly: true,
  },
  {
    slug: "transaction-rollback-readiness-preview",
    href: "/transaction-rollback-readiness-preview",
    phase: "Phase 1492",
    title: "Transaction rollback readiness preview",
    commandLabel: "Go to Transaction Rollback Readiness Preview",
    summary: "Transaction rollback readiness preview shows rollback review inputs without executing rollback.",
    markerPhrases: [
      "Transaction rollback readiness preview",
      "Transaction rollback readiness preview does not execute rollback",
      "Transaction rollback readiness preview requires explicit operator approval",
      "Transaction rollback readiness preview checks snapshot availability diff reversibility touched files evidence references audit references and recovery risk",
      "Denied transaction rollback paths remain blocked",
      "Transaction rollback readiness checklist",
    ],
    sectionIds: ["rollback-readiness-preview", "workspace-snapshot-preview", "audit-capture-preview", "recovery-decision-preview"],
    devOnly: true,
  },
  {
    slug: "transaction-retry-readiness-preview",
    href: "/transaction-retry-readiness-preview",
    phase: "Phase 1493",
    title: "Transaction retry readiness preview",
    commandLabel: "Go to Transaction Retry Readiness Preview",
    summary: "Transaction retry readiness preview shows retry review inputs without executing retry.",
    markerPhrases: [
      "Transaction retry readiness preview",
      "Transaction retry readiness preview does not execute retry",
      "Transaction retry readiness preview requires explicit operator approval",
      "Transaction retry readiness preview checks failure reason changed preconditions approval freshness guard readiness evidence gaps result gaps and audit continuity",
      "Denied transaction retry paths remain blocked",
      "Transaction retry readiness checklist",
    ],
    sectionIds: ["retry-readiness-preview", "preflight-preview", "evidence-capture-preview", "result-capture-preview"],
    devOnly: true,
  },
  {
    slug: "transaction-recovery-decision-preview",
    href: "/transaction-recovery-decision-preview",
    phase: "Phase 1494",
    title: "Transaction recovery decision preview",
    commandLabel: "Go to Transaction Recovery Decision Preview",
    summary: "Transaction recovery decision preview shows approval-gated recovery decisions without execution.",
    markerPhrases: [
      "Transaction recovery decision preview",
      "Transaction recovery decision preview does not execute recovery",
      "Transaction recovery decision preview requires explicit operator approval",
      "Transaction recovery decision preview shows rollback retry restore stop explain-failure manual-review safety-stop and partial-recovery decisions",
      "Denied transaction recovery paths remain blocked",
      "Transaction recovery decision checklist",
    ],
    sectionIds: ["recovery-decision-preview", "rollback-readiness-preview", "retry-readiness-preview", "transaction-finalization-preview"],
    devOnly: true,
  },
  {
    slug: "cockpit-transaction-summary",
    href: "/cockpit-transaction-summary",
    phase: "Phase 1495",
    title: "Cockpit transaction summary",
    commandLabel: "Go to Cockpit Transaction Summary",
    summary: "Cockpit transaction summary keeps the cockpit as the normal user surface.",
    markerPhrases: [
      "Cockpit transaction summary",
      "Cockpit transaction summary keeps the cockpit as the normal user surface",
      "Cockpit transaction summary does not create or execute transactions from the cockpit",
      "Cockpit transaction summary shows intent preflight snapshot apply run validate evidence result audit rollback retry recovery and denied paths",
      "Phase pages remain dev test diagnostics only",
      "Cockpit transaction summary checklist",
    ],
    sectionIds: ALL_SECTIONS.map((section) => section.id),
    devOnly: true,
  },
  {
    slug: "first-apply-run-transaction-candidate",
    href: "/first-apply-run-transaction-candidate",
    phase: "Phase 1496",
    title: "First apply run transaction candidate",
    commandLabel: "Go to First Apply Run Transaction Candidate",
    summary: "First apply run transaction candidate combines the full preview-only transaction boundary.",
    markerPhrases: [
      "First apply run transaction candidate",
      "First apply run transaction candidate does not execute transactions from the UI",
      "First apply run transaction candidate requires explicit operator approval",
      "Candidate combines intent preflight snapshot guarded apply guarded run validation evidence result audit rollback retry recovery and denied boundaries",
      "Denied first apply run transaction paths remain blocked",
      "First apply run transaction checklist",
    ],
    sectionIds: ALL_SECTIONS.map((section) => section.id),
    devOnly: true,
  },
  {
    slug: "controlled-apply-run-transaction-release-candidate",
    href: "/controlled-apply-run-transaction-release-candidate",
    phase: "Phase 1497",
    title: "Controlled apply run transaction release candidate",
    commandLabel: "Go to Controlled Apply Run Transaction Release Candidate",
    summary: "Controlled apply run transaction release candidate prepares backend-owned transactional apply/run without frontend transaction persistence.",
    markerPhrases: [
      "Controlled apply run transaction release candidate",
      "Controlled apply run transaction release candidate does not call models providers connectors write files apply diffs run commands create snapshots persist approvals create queues persist transactions persist evidence results audit promote memory release locks execute rollback retry recovery or write browser storage from the frontend",
      "Controlled apply run transaction release requires explicit operator approval",
      "Release candidate prepares CodexForge for backend-owned transactional apply/run without frontend transaction persistence",
      "Denied controlled apply run transaction paths remain blocked",
      "Controlled apply run transaction release checklist",
    ],
    sectionIds: ALL_SECTIONS.map((section) => section.id),
    devOnly: true,
  },
] as const;

export function buildApplyRunTransactionStableKey(parts: readonly string[]): string {
  return parts.join(":").toLowerCase().replace(/[^a-z0-9:/-]+/g, "-");
}

export function listApplyRunTransactionRouteDefinitions(): readonly ApplyRunTransactionRouteDefinition[] {
  return ROUTES;
}

export function getApplyRunTransactionRouteDefinition(
  slug: ApplyRunTransactionRouteSlug
): ApplyRunTransactionRouteDefinition {
  return ROUTES.find((candidate) => candidate.slug === slug) ?? ROUTES[0];
}

export function buildApplyRunTransactionModel(): ApplyRunTransactionModel {
  return APPLY_RUN_TRANSACTION;
}

export function buildApplyRunTransactionRouteModel(
  slug: ApplyRunTransactionRouteSlug = "codexforge-cockpit"
): ApplyRunTransactionRouteModel {
  const route = getApplyRunTransactionRouteDefinition(slug);
  const sections = route.sectionIds
    .map((sectionId) => ALL_SECTIONS.find((section) => section.id === sectionId))
    .filter((section): section is ApplyRunTransactionSection => Boolean(section));

  return {
    route,
    transaction: APPLY_RUN_TRANSACTION,
    sections: sections.length > 0 ? sections : ALL_SECTIONS,
    diagnosticRoutes: ROUTES.filter((candidate) => candidate.devOnly),
    cockpitMarkers: APPLY_RUN_TRANSACTION_COCKPIT_MARKERS,
    summary: summarizeApplyRunTransactionRoute(route),
  };
}

export function summarizeApplyRunTransactionRouteModel(model: ApplyRunTransactionRouteModel): string {
  return [
    model.route.phase,
    model.route.title,
    model.route.summary,
    model.transaction.transactionId,
    "cockpit is the normal user surface",
    "phase pages remain dev test diagnostics only",
    "broad execution still blocked",
    "frontend transaction persistence still blocked",
  ].join(" | ");
}

function summarizeApplyRunTransactionRoute(route: ApplyRunTransactionRouteDefinition): string {
  return [route.phase, route.title, route.summary, "Explicit operator approval remains required"].join(" | ");
}
