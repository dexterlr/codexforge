export type BackendExecutionQueueRouteSlug =
  | "codexforge-cockpit"
  | "backend-execution-queue-boundary"
  | "queue-item-model-preview"
  | "queue-approval-state-preview"
  | "queue-preflight-state-preview"
  | "queue-apply-state-preview"
  | "queue-run-state-preview"
  | "queue-evidence-capture-state-preview"
  | "queue-result-capture-state-preview"
  | "queue-audit-capture-state-preview"
  | "queue-blocked-denied-state-preview"
  | "queue-failed-canceled-state-preview"
  | "queue-manual-review-state-preview"
  | "queue-recovery-state-preview"
  | "cockpit-queue-summary"
  | "first-backend-execution-queue-candidate"
  | "controlled-backend-execution-queue-release-candidate";

export type BackendExecutionQueueModelKind =
  | "backend-execution-queue-v1"
  | "backend-execution-queue-boundary"
  | "queue-item-model-preview"
  | "queue-approval-state-preview"
  | "queue-preflight-state-preview"
  | "queue-apply-state-preview"
  | "queue-run-state-preview"
  | "queue-evidence-capture-state-preview"
  | "queue-result-capture-state-preview"
  | "queue-audit-capture-state-preview"
  | "queue-blocked-denied-state-preview"
  | "queue-failed-canceled-state-preview"
  | "queue-manual-review-state-preview"
  | "queue-recovery-state-preview"
  | "backend-execution-queue-candidate"
  | "backend-execution-queue-release-candidate";

export type BackendExecutionQueueLifecycleState =
  | "preview"
  | "needs approval"
  | "approved"
  | "queued"
  | "preflight"
  | "applying"
  | "running"
  | "capturing evidence"
  | "capturing result"
  | "capturing audit"
  | "completed"
  | "blocked"
  | "denied"
  | "failed"
  | "canceled"
  | "manual review"
  | "recovered";

export type BackendExecutionQueuePanelState =
  | "preview-only"
  | "review-only"
  | "backend-owned"
  | "needs-approval"
  | "allowed"
  | "denied"
  | "blocked"
  | "failed"
  | "canceled"
  | "manual-review"
  | "recovered";

export type BackendExecutionQueueItem = {
  id: string;
  label: string;
  detail: string;
  state: BackendExecutionQueuePanelState;
};

export type BackendExecutionQueueSection = {
  id: string;
  label: string;
  title: string;
  summary: string;
  state: BackendExecutionQueuePanelState;
  items: readonly BackendExecutionQueueItem[];
};

export type BackendExecutionQueueTransition = {
  id: string;
  label: string;
  from: BackendExecutionQueueLifecycleState | "frontend";
  to: BackendExecutionQueueLifecycleState | "backend-owned hold";
  detail: string;
  state: BackendExecutionQueuePanelState;
};

export type BackendExecutionQueueWorkItem = {
  id: string;
  label: string;
  goalContextReference: string;
  planDiffCommandReference: string;
  approvalReference: string;
  evidenceReference: string;
  resultReference: string;
  auditReference: string;
  recoveryReference: string;
  memoryReference: string;
  state: BackendExecutionQueuePanelState;
};

export type BackendExecutionQueueModel = {
  queueModelId: string;
  queueModelKind: BackendExecutionQueueModelKind;
  queueItem: BackendExecutionQueueWorkItem;
  queueStates: readonly BackendExecutionQueueLifecycleState[];
  approvalState: BackendExecutionQueueSection;
  preflightState: BackendExecutionQueueSection;
  applyState: BackendExecutionQueueSection;
  runState: BackendExecutionQueueSection;
  evidenceCaptureState: BackendExecutionQueueSection;
  resultCaptureState: BackendExecutionQueueSection;
  auditCaptureState: BackendExecutionQueueSection;
  blockedDeniedState: BackendExecutionQueueSection;
  failedCanceledState: BackendExecutionQueueSection;
  manualReviewState: BackendExecutionQueueSection;
  recoveryState: BackendExecutionQueueSection;
  allowedTransitions: readonly BackendExecutionQueueTransition[];
  deniedTransitions: readonly BackendExecutionQueueTransition[];
  cockpitSummary: readonly BackendExecutionQueueItem[];
  explicitSafetyLimits: readonly string[];
};

export type BackendExecutionQueueRouteDefinition = {
  slug: BackendExecutionQueueRouteSlug;
  href: string;
  phase: string;
  title: string;
  commandLabel: string;
  summary: string;
  markerPhrases: readonly string[];
  sectionIds: readonly string[];
  devOnly: boolean;
};

export type BackendExecutionQueueRouteModel = {
  route: BackendExecutionQueueRouteDefinition;
  queue: BackendExecutionQueueModel;
  sections: readonly BackendExecutionQueueSection[];
  diagnosticRoutes: readonly BackendExecutionQueueRouteDefinition[];
  cockpitMarkers: readonly string[];
  summary: string;
};

export const BACKEND_EXECUTION_QUEUE_COCKPIT_MARKERS = [
  "Backend Execution Queue v1",
  "Queue Item",
  "Approval",
  "Preflight",
  "Apply",
  "Run",
  "Evidence",
  "Result",
  "Audit",
  "Blocked",
  "Denied",
  "Failed",
  "Canceled",
  "Manual Review",
  "Recovery",
  "Transitions",
  "No queue creation from the cockpit",
  "No queue persistence from the cockpit",
  "No execution release from the cockpit",
  "No direct file mutation from the cockpit",
  "No direct command execution from the cockpit",
  "Backend-owned queue state remains required",
  "Explicit operator approval remains required",
] as const;

const QUEUE_STATES: readonly BackendExecutionQueueLifecycleState[] = [
  "preview",
  "needs approval",
  "approved",
  "queued",
  "preflight",
  "applying",
  "running",
  "capturing evidence",
  "capturing result",
  "capturing audit",
  "completed",
  "blocked",
  "denied",
  "failed",
  "canceled",
  "manual review",
  "recovered",
] as const;

const EXPLICIT_SAFETY_LIMITS = [
  "Backend Execution Queue v1 is preview-only from the frontend.",
  "It does not create real queue jobs from the UI.",
  "It does not persist queue state from the UI.",
  "It does not release execution from the frontend.",
  "It does not write files from the frontend.",
  "It does not run commands from the frontend.",
  "It does not call models/providers/connectors from the frontend.",
  "It does not persist approvals from the UI.",
  "It does not persist evidence/results/audit from the UI.",
  "It does not execute recovery/rollback/retry from the UI.",
  "It does not promote memory automatically.",
  "It does not write browser storage from the cockpit.",
  "It prepares a future backend-owned durable queue path.",
  "Backend-owned guarded execution remains required for real actions.",
  "Explicit operator approval remains required.",
] as const;

const QUEUE_ITEM: BackendExecutionQueueWorkItem = {
  id: "queue-item-preview-001",
  label: "Queue Item",
  goalContextReference: "Goal and project context references are preview-only and are not persisted from the cockpit.",
  planDiffCommandReference: "Plan, diff, and command references remain review-only until backend-owned queue creation exists.",
  approvalReference: "Approval reference is a preview of explicit operator approval, not stored approval state.",
  evidenceReference: "Evidence reference names expected capture needs without saving evidence from the UI.",
  resultReference: "Result reference names expected outcome capture without saving result records from the UI.",
  auditReference: "Audit reference names expected audit capture without saving audit logs from the UI.",
  recoveryReference: "Recovery reference lists rollback, retry, restore, stop, and manual review choices without execution.",
  memoryReference: "Memory reference connects future evidence memory only after explicit approval and backend ownership.",
  state: "preview-only",
};

const APPROVAL_STATE: BackendExecutionQueueSection = {
  id: "approval-state",
  label: "Approval",
  title: "Queue approval state preview",
  summary:
    "Approval state previews needs-approval, approved, expired, stale, denied, blocked, and replay-protected states without persisting approvals.",
  state: "needs-approval",
  items: [
    {
      id: "approval-needs-human",
      label: "Needs explicit human approval",
      detail: "The future queue cannot leave preview until a backend-owned approval ticket is explicitly accepted by the operator.",
      state: "needs-approval",
    },
    {
      id: "approval-invalid",
      label: "Expired, stale, or replayed approval blocked",
      detail: "Expired, stale, replayed, hidden, or scope-invalid approvals remain denied and cannot release execution.",
      state: "blocked",
    },
    {
      id: "approval-no-ui-persist",
      label: "No approval persistence",
      detail: "The cockpit can show approval vocabulary but does not persist approvals from the UI.",
      state: "denied",
    },
  ],
};

const PREFLIGHT_STATE: BackendExecutionQueueSection = {
  id: "preflight-state",
  label: "Preflight",
  title: "Queue preflight state preview",
  summary:
    "Preflight state previews context readiness, plan readiness, diff readiness, command readiness, evidence readiness, audit readiness, and recovery readiness.",
  state: "backend-owned",
  items: [
    {
      id: "preflight-readiness",
      label: "Readiness checks",
      detail: "Context, plan, diff, command, evidence, result, audit, and recovery readiness are future backend-owned checks.",
      state: "backend-owned",
    },
    {
      id: "preflight-no-ui-check",
      label: "No UI preflight execution",
      detail: "Queue preflight state preview does not execute preflight checks from the UI.",
      state: "blocked",
    },
    {
      id: "preflight-denied",
      label: "Denied readiness paths",
      detail: "Missing approval, unsafe paths, denied commands, dirty context, secret reads, and unsupported recovery stop before apply or run.",
      state: "denied",
    },
  ],
};

const APPLY_STATE: BackendExecutionQueueSection = {
  id: "apply-state",
  label: "Apply",
  title: "Queue apply state preview",
  summary:
    "Apply state previews waiting, applying, applied, blocked, denied, failed, rolled-back, and manual-review states without writing files.",
  state: "backend-owned",
  items: [
    {
      id: "apply-waiting",
      label: "Waiting to apply",
      detail: "Apply cannot start until backend-owned queue state, path guard, diff scope, and explicit operator approval are valid.",
      state: "needs-approval",
    },
    {
      id: "apply-no-write",
      label: "No frontend file mutation",
      detail: "Queue apply state preview does not write files or apply diffs from the UI.",
      state: "blocked",
    },
    {
      id: "apply-manual-review",
      label: "Manual review path",
      detail: "Conflicts, partial apply, rollback implications, or denied mutation move to manual review instead of direct execution.",
      state: "manual-review",
    },
  ],
};

const RUN_STATE: BackendExecutionQueueSection = {
  id: "run-state",
  label: "Run",
  title: "Queue run state preview",
  summary:
    "Run state previews waiting, running, completed, failed, timeout, canceled, blocked, denied, and manual-review command states.",
  state: "backend-owned",
  items: [
    {
      id: "run-waiting",
      label: "Waiting to run",
      detail: "Commands stay waiting until backend-owned approval, command guard, arguments, working directory, and timeout policy are valid.",
      state: "needs-approval",
    },
    {
      id: "run-no-command",
      label: "No frontend command execution",
      detail: "Queue run state preview does not run commands from the UI.",
      state: "blocked",
    },
    {
      id: "run-outcomes",
      label: "Command outcomes",
      detail: "Completed, failed, timeout, canceled, blocked, denied, and manual-review command states are represented as future backend-owned outcomes.",
      state: "review-only",
    },
  ],
};

const EVIDENCE_CAPTURE_STATE: BackendExecutionQueueSection = {
  id: "evidence-capture-state",
  label: "Evidence",
  title: "Queue evidence capture state preview",
  summary:
    "Evidence capture state previews pending, capturing, captured, missing, redacted, failed, blocked, and manual-review evidence states.",
  state: "backend-owned",
  items: [
    {
      id: "evidence-backend-owned",
      label: "Backend-owned evidence capture",
      detail: "Diff, stdout, stderr, exit code, approval, result, recovery, and audit evidence need future backend capture and redaction.",
      state: "backend-owned",
    },
    {
      id: "evidence-no-ui-persist",
      label: "No evidence persistence",
      detail: "Queue evidence capture state preview does not persist evidence from the UI.",
      state: "blocked",
    },
    {
      id: "evidence-gaps",
      label: "Evidence gaps",
      detail: "Missing, redacted, failed, blocked, and manual-review evidence states prevent automatic completion.",
      state: "manual-review",
    },
  ],
};

const RESULT_CAPTURE_STATE: BackendExecutionQueueSection = {
  id: "result-capture-state",
  label: "Result",
  title: "Queue result capture state preview",
  summary:
    "Result capture state previews pending, success, blocked, denied, failed, timeout, canceled, retryable, recovered, and operator-accepted results.",
  state: "backend-owned",
  items: [
    {
      id: "result-backend-owned",
      label: "Backend-owned result capture",
      detail: "The future backend records success, blocked, denied, failed, timeout, canceled, retryable, recovered, and operator-accepted outcomes.",
      state: "backend-owned",
    },
    {
      id: "result-no-ui-persist",
      label: "No result persistence",
      detail: "Queue result capture state preview does not persist results from the UI.",
      state: "blocked",
    },
    {
      id: "result-operator-accepted",
      label: "Operator accepted",
      detail: "Operator acceptance is a review state and cannot be inferred from UI preview text.",
      state: "needs-approval",
    },
  ],
};

const AUDIT_CAPTURE_STATE: BackendExecutionQueueSection = {
  id: "audit-capture-state",
  label: "Audit",
  title: "Queue audit capture state preview",
  summary:
    "Audit capture state previews goal, context, plan, diff, command, approval, evidence, result, recovery, operator, memory, and denied-path audit records.",
  state: "backend-owned",
  items: [
    {
      id: "audit-records",
      label: "Audit records",
      detail: "Goal, context, plan, diff, command, approval, evidence, result, recovery, operator, memory, and denied-path records need backend ownership.",
      state: "backend-owned",
    },
    {
      id: "audit-no-ui-persist",
      label: "No audit persistence",
      detail: "Queue audit capture state preview does not persist audit logs from the UI.",
      state: "blocked",
    },
    {
      id: "audit-denied-path",
      label: "Denied path audit",
      detail: "Denied paths are recorded as future audit facts only when backend-owned capture exists.",
      state: "denied",
    },
  ],
};

const BLOCKED_DENIED_STATE: BackendExecutionQueueSection = {
  id: "blocked-denied-state",
  label: "Blocked",
  title: "Queue blocked denied state preview",
  summary:
    "Blocked and denied state previews blocked path, blocked command, blocked approval, blocked model, blocked provider, blocked connector, blocked memory, blocked recovery, and denied execution states.",
  state: "blocked",
  items: [
    {
      id: "blocked-paths",
      label: "Blocked paths",
      detail: "Path, command, approval, model, provider, connector, memory, recovery, and execution releases remain blocked unless backend policy allows them.",
      state: "blocked",
    },
    {
      id: "denied-execution",
      label: "Denied execution",
      detail: "Denied execution is a final stop from the cockpit and cannot be overridden by hidden approval.",
      state: "denied",
    },
    {
      id: "blocked-no-mutation",
      label: "No workflow mutation",
      detail: "Queue blocked denied state preview does not mutate workflow state.",
      state: "blocked",
    },
  ],
};

const FAILED_CANCELED_STATE: BackendExecutionQueueSection = {
  id: "failed-canceled-state",
  label: "Failed",
  title: "Queue failed canceled state preview",
  summary:
    "Failed and canceled state previews failed apply, failed command, failed evidence, failed result, failed audit, canceled by operator, timeout, and manual-stop states.",
  state: "failed",
  items: [
    {
      id: "failed-capture",
      label: "Failure categories",
      detail: "Failed apply, command, evidence, result, and audit capture are separate queue outcomes so recovery can be scoped.",
      state: "failed",
    },
    {
      id: "canceled-stop",
      label: "Canceled or stopped",
      detail: "Canceled by operator, timeout, and manual-stop states require review and do not execute recovery from the UI.",
      state: "canceled",
    },
    {
      id: "failed-no-recovery-execute",
      label: "No UI recovery execution",
      detail: "Queue failed canceled state preview does not execute recovery from the UI.",
      state: "blocked",
    },
  ],
};

const MANUAL_REVIEW_STATE: BackendExecutionQueueSection = {
  id: "manual-review-state",
  label: "Manual Review",
  title: "Queue manual review state preview",
  summary:
    "Manual review state previews evidence gaps, result gaps, audit gaps, recovery choices, denied paths, and next operator decisions.",
  state: "manual-review",
  items: [
    {
      id: "manual-gaps",
      label: "Review gaps",
      detail: "Evidence gaps, result gaps, audit gaps, denied paths, and recovery choices wait for the operator instead of running automatically.",
      state: "manual-review",
    },
    {
      id: "manual-no-auto",
      label: "No automatic review action",
      detail: "Queue manual review state preview does not execute review actions automatically.",
      state: "blocked",
    },
    {
      id: "manual-decisions",
      label: "Next operator decision",
      detail: "Continue, deny, cancel, recover, retry, rollback, or accept results require explicit operator approval and backend ownership.",
      state: "needs-approval",
    },
  ],
};

const RECOVERY_STATE: BackendExecutionQueueSection = {
  id: "recovery-state",
  label: "Recovery",
  title: "Queue recovery state preview",
  summary:
    "Recovery state previews rollback-ready, retry-ready, restore-ready, stop-ready, explain-failure, manual-review, safety-stop, and partial-recovery states.",
  state: "backend-owned",
  items: [
    {
      id: "recovery-options",
      label: "Recovery options",
      detail: "Rollback, retry, restore, stop, explain-failure, safety-stop, and partial recovery are future backend-owned actions.",
      state: "backend-owned",
    },
    {
      id: "recovery-no-ui-execute",
      label: "No UI rollback retry recovery",
      detail: "Queue recovery state preview does not execute rollback retry or recovery from the UI.",
      state: "blocked",
    },
    {
      id: "recovery-recovered",
      label: "Recovered state",
      detail: "Recovered means backend evidence, result, audit, and operator acceptance align after explicit approval.",
      state: "recovered",
    },
  ],
};

const COCKPIT_SUMMARY: readonly BackendExecutionQueueItem[] = [
  {
    id: "cockpit-queue-item",
    label: "Queue Item",
    detail: "A future work item carries goal context, plan diff commands, approval, evidence, result, audit, recovery, and memory references.",
    state: "preview-only",
  },
  {
    id: "cockpit-approval",
    label: "Approval",
    detail: "Approval starts as needs approval and only a backend-owned explicit operator approval can move it toward approved.",
    state: "needs-approval",
  },
  {
    id: "cockpit-preflight",
    label: "Preflight",
    detail: "Preflight checks context, plan, diff, command, evidence, audit, and recovery readiness before any apply or run.",
    state: "backend-owned",
  },
  {
    id: "cockpit-apply",
    label: "Apply",
    detail: "Apply is backend-owned and cannot write files or apply diffs from the cockpit.",
    state: "blocked",
  },
  {
    id: "cockpit-run",
    label: "Run",
    detail: "Run is backend-owned and cannot run commands from the cockpit.",
    state: "blocked",
  },
  {
    id: "cockpit-evidence",
    label: "Evidence",
    detail: "Evidence capture belongs to the backend and cannot persist evidence from the cockpit.",
    state: "backend-owned",
  },
  {
    id: "cockpit-result",
    label: "Result",
    detail: "Result capture belongs to the backend and cannot persist results from the cockpit.",
    state: "backend-owned",
  },
  {
    id: "cockpit-audit",
    label: "Audit",
    detail: "Audit capture belongs to the backend and cannot persist audit logs from the cockpit.",
    state: "backend-owned",
  },
  {
    id: "cockpit-blocked",
    label: "Blocked",
    detail: "Blocked queue paths stop on unsafe paths, unsafe commands, invalid approval, missing evidence, or denied policy.",
    state: "blocked",
  },
  {
    id: "cockpit-denied",
    label: "Denied",
    detail: "Denied queue paths remain blocked and cannot be bypassed by hidden approvals or cockpit actions.",
    state: "denied",
  },
  {
    id: "cockpit-failed",
    label: "Failed",
    detail: "Failed apply, command, evidence, result, or audit states move to review instead of automatic recovery.",
    state: "failed",
  },
  {
    id: "cockpit-canceled",
    label: "Canceled",
    detail: "Canceled, timeout, and manual-stop states require operator review before any future recovery path.",
    state: "canceled",
  },
  {
    id: "cockpit-manual-review",
    label: "Manual Review",
    detail: "Manual review captures gaps and the next operator decision without executing actions automatically.",
    state: "manual-review",
  },
  {
    id: "cockpit-recovery",
    label: "Recovery",
    detail: "Recovery options are backend-owned and require explicit approval before rollback, retry, restore, stop, or partial recovery.",
    state: "backend-owned",
  },
  {
    id: "cockpit-transitions",
    label: "Transitions",
    detail: "Allowed transitions describe future backend-owned movement; denied transitions block frontend queue creation, persistence, and execution release.",
    state: "review-only",
  },
];

const ALLOWED_TRANSITIONS: readonly BackendExecutionQueueTransition[] = [
  {
    id: "preview-to-needs-approval",
    label: "Preview to needs approval",
    from: "preview",
    to: "needs approval",
    detail: "A future backend can prepare a reviewed work item and ask for explicit operator approval.",
    state: "allowed",
  },
  {
    id: "needs-approval-to-approved",
    label: "Needs approval to approved",
    from: "needs approval",
    to: "approved",
    detail: "Only explicit operator approval in backend-owned state can mark the work item approved.",
    state: "needs-approval",
  },
  {
    id: "approved-to-queued",
    label: "Approved to queued",
    from: "approved",
    to: "queued",
    detail: "Only a backend-owned durable queue can create a queued record after approval.",
    state: "backend-owned",
  },
  {
    id: "queued-to-preflight",
    label: "Queued to preflight",
    from: "queued",
    to: "preflight",
    detail: "The backend performs readiness checks before any apply or run state.",
    state: "backend-owned",
  },
  {
    id: "preflight-to-applying",
    label: "Preflight to applying",
    from: "preflight",
    to: "applying",
    detail: "Apply is allowed only when path guards, diff scope, approval, and evidence plan pass.",
    state: "backend-owned",
  },
  {
    id: "applying-to-running",
    label: "Applying to running",
    from: "applying",
    to: "running",
    detail: "Run is allowed only after apply state is resolved or the backend declares apply not required.",
    state: "backend-owned",
  },
  {
    id: "running-to-evidence",
    label: "Running to capturing evidence",
    from: "running",
    to: "capturing evidence",
    detail: "Backend-owned evidence capture follows guarded execution.",
    state: "backend-owned",
  },
  {
    id: "evidence-to-result",
    label: "Capturing evidence to capturing result",
    from: "capturing evidence",
    to: "capturing result",
    detail: "Result capture uses backend-owned evidence and does not trust UI state.",
    state: "backend-owned",
  },
  {
    id: "result-to-audit",
    label: "Capturing result to capturing audit",
    from: "capturing result",
    to: "capturing audit",
    detail: "Audit capture records goal, context, plan, diff, command, approval, evidence, result, recovery, operator, memory, and denied paths.",
    state: "backend-owned",
  },
  {
    id: "audit-to-completed",
    label: "Capturing audit to completed",
    from: "capturing audit",
    to: "completed",
    detail: "Completion requires backend-owned evidence, result, audit, and operator acceptance rules.",
    state: "allowed",
  },
  {
    id: "manual-review-to-recovered",
    label: "Manual review to recovered",
    from: "manual review",
    to: "recovered",
    detail: "Recovered state requires explicit operator approval and backend-owned recovery evidence.",
    state: "needs-approval",
  },
];

const DENIED_TRANSITIONS: readonly BackendExecutionQueueTransition[] = [
  {
    id: "frontend-create-queue",
    label: "Frontend queue creation denied",
    from: "frontend",
    to: "queued",
    detail: "The cockpit cannot create real queue jobs directly.",
    state: "denied",
  },
  {
    id: "frontend-persist-queue",
    label: "Frontend queue persistence denied",
    from: "frontend",
    to: "backend-owned hold",
    detail: "The cockpit cannot persist queue state, approvals, evidence, result, audit, or recovery decisions.",
    state: "denied",
  },
  {
    id: "frontend-release-execution",
    label: "Frontend execution release denied",
    from: "frontend",
    to: "applying",
    detail: "The cockpit cannot release apply or run execution directly.",
    state: "denied",
  },
  {
    id: "frontend-apply-run",
    label: "Frontend apply or run denied",
    from: "frontend",
    to: "running",
    detail: "Direct file mutation, diff application, command execution, process spawning, port binding, install, deployment, and runtime starts stay blocked.",
    state: "blocked",
  },
  {
    id: "hidden-approval",
    label: "Hidden approval denied",
    from: "preview",
    to: "approved",
    detail: "Hidden approval, stale approval, replayed approval, and approval persistence from the UI are denied.",
    state: "denied",
  },
  {
    id: "frontend-recovery",
    label: "Frontend recovery denied",
    from: "failed",
    to: "recovered",
    detail: "Rollback, retry, restore, stop, partial recovery, and memory promotion cannot execute from the UI.",
    state: "blocked",
  },
];

const BACKEND_EXECUTION_QUEUE: BackendExecutionQueueModel = {
  queueModelId: "codexforge-backend-execution-queue-v1-1466-1481",
  queueModelKind: "backend-execution-queue-v1",
  queueItem: QUEUE_ITEM,
  queueStates: QUEUE_STATES,
  approvalState: APPROVAL_STATE,
  preflightState: PREFLIGHT_STATE,
  applyState: APPLY_STATE,
  runState: RUN_STATE,
  evidenceCaptureState: EVIDENCE_CAPTURE_STATE,
  resultCaptureState: RESULT_CAPTURE_STATE,
  auditCaptureState: AUDIT_CAPTURE_STATE,
  blockedDeniedState: BLOCKED_DENIED_STATE,
  failedCanceledState: FAILED_CANCELED_STATE,
  manualReviewState: MANUAL_REVIEW_STATE,
  recoveryState: RECOVERY_STATE,
  allowedTransitions: ALLOWED_TRANSITIONS,
  deniedTransitions: DENIED_TRANSITIONS,
  cockpitSummary: COCKPIT_SUMMARY,
  explicitSafetyLimits: EXPLICIT_SAFETY_LIMITS,
};

const ALL_SECTIONS = [
  APPROVAL_STATE,
  PREFLIGHT_STATE,
  APPLY_STATE,
  RUN_STATE,
  EVIDENCE_CAPTURE_STATE,
  RESULT_CAPTURE_STATE,
  AUDIT_CAPTURE_STATE,
  BLOCKED_DENIED_STATE,
  FAILED_CANCELED_STATE,
  MANUAL_REVIEW_STATE,
  RECOVERY_STATE,
] as const;

const ROUTES: readonly BackendExecutionQueueRouteDefinition[] = [
  {
    slug: "codexforge-cockpit",
    href: "/codexforge-cockpit",
    phase: "Backend Execution Queue v1",
    title: "Cockpit queue summary",
    commandLabel: "Go to Unified CodexForge Cockpit",
    summary: "Concise cockpit-centered Backend Execution Queue v1 summary for normal users.",
    markerPhrases: BACKEND_EXECUTION_QUEUE_COCKPIT_MARKERS,
    sectionIds: ALL_SECTIONS.map((section) => section.id),
    devOnly: false,
  },
  {
    slug: "backend-execution-queue-boundary",
    href: "/backend-execution-queue-boundary",
    phase: "Phase 1466",
    title: "Backend execution queue boundary",
    commandLabel: "Go to Backend Execution Queue Boundary",
    summary: "Backend execution queue boundary defines preview-only backend-owned queue state without broad execution.",
    markerPhrases: [
      "Backend execution queue boundary",
      "Backend execution queue boundary does not create queue jobs from the UI",
      "Backend execution queue requires explicit operator approval before execution",
      "Backend execution queue prepares durable backend-owned work item state without broad execution",
      "Denied backend execution queue paths remain blocked",
      "Backend execution queue checklist",
    ],
    sectionIds: ["approval-state", "preflight-state", "blocked-denied-state"],
    devOnly: true,
  },
  {
    slug: "queue-item-model-preview",
    href: "/queue-item-model-preview",
    phase: "Phase 1467",
    title: "Queue item model preview",
    commandLabel: "Go to Queue Item Model Preview",
    summary: "Queue item model preview shows the future work item references without UI queue persistence.",
    markerPhrases: [
      "Queue item model preview",
      "Queue item model preview does not persist queue state from the UI",
      "Queue item model preview requires explicit operator approval before execution",
      "Queue item model previews goal context plan diff commands approval evidence result audit recovery and memory references",
      "Denied queue item paths remain blocked",
      "Queue item model checklist",
    ],
    sectionIds: ALL_SECTIONS.map((section) => section.id),
    devOnly: true,
  },
  {
    slug: "queue-approval-state-preview",
    href: "/queue-approval-state-preview",
    phase: "Phase 1468",
    title: "Queue approval state preview",
    commandLabel: "Go to Queue Approval State Preview",
    summary: "Queue approval state preview defines approval vocabulary without approval persistence.",
    markerPhrases: [
      "Queue approval state preview",
      "Queue approval state preview does not persist approvals from the UI",
      "Queue approval state preview requires explicit human approval",
      "Queue approval state previews needs-approval approved expired stale denied blocked and replay-protected approval states",
      "Denied queue approval paths remain blocked",
      "Queue approval state checklist",
    ],
    sectionIds: ["approval-state", "blocked-denied-state", "audit-capture-state"],
    devOnly: true,
  },
  {
    slug: "queue-preflight-state-preview",
    href: "/queue-preflight-state-preview",
    phase: "Phase 1469",
    title: "Queue preflight state preview",
    commandLabel: "Go to Queue Preflight State Preview",
    summary: "Queue preflight state preview defines readiness checks without executing them from the UI.",
    markerPhrases: [
      "Queue preflight state preview",
      "Queue preflight state preview does not execute preflight checks from the UI",
      "Queue preflight state preview requires explicit operator approval",
      "Queue preflight state previews context readiness plan readiness diff readiness command readiness evidence readiness audit readiness and recovery readiness",
      "Denied queue preflight paths remain blocked",
      "Queue preflight checklist",
    ],
    sectionIds: ["preflight-state", "approval-state", "blocked-denied-state"],
    devOnly: true,
  },
  {
    slug: "queue-apply-state-preview",
    href: "/queue-apply-state-preview",
    phase: "Phase 1470",
    title: "Queue apply state preview",
    commandLabel: "Go to Queue Apply State Preview",
    summary: "Queue apply state preview shows apply lifecycle without writing files or applying diffs.",
    markerPhrases: [
      "Queue apply state preview",
      "Queue apply state preview does not write files or apply diffs from the UI",
      "Queue apply state preview requires explicit operator approval",
      "Queue apply state previews waiting applying applied blocked denied failed rolled-back and manual-review apply states",
      "Denied queue apply paths remain blocked",
      "Queue apply state checklist",
    ],
    sectionIds: ["apply-state", "evidence-capture-state", "blocked-denied-state"],
    devOnly: true,
  },
  {
    slug: "queue-run-state-preview",
    href: "/queue-run-state-preview",
    phase: "Phase 1471",
    title: "Queue run state preview",
    commandLabel: "Go to Queue Run State Preview",
    summary: "Queue run state preview shows command lifecycle without command execution from the UI.",
    markerPhrases: [
      "Queue run state preview",
      "Queue run state preview does not run commands from the UI",
      "Queue run state preview requires explicit operator approval",
      "Queue run state previews waiting running completed failed timeout canceled blocked denied and manual-review command states",
      "Denied queue run paths remain blocked",
      "Queue run state checklist",
    ],
    sectionIds: ["run-state", "evidence-capture-state", "failed-canceled-state"],
    devOnly: true,
  },
  {
    slug: "queue-evidence-capture-state-preview",
    href: "/queue-evidence-capture-state-preview",
    phase: "Phase 1472",
    title: "Queue evidence capture state preview",
    commandLabel: "Go to Queue Evidence Capture State Preview",
    summary: "Queue evidence capture state preview shows future backend-owned evidence capture without UI persistence.",
    markerPhrases: [
      "Queue evidence capture state preview",
      "Queue evidence capture state preview does not persist evidence from the UI",
      "Queue evidence capture state preview requires backend-owned evidence capture",
      "Queue evidence capture state previews pending capturing captured missing redacted failed blocked and manual-review evidence states",
      "Denied queue evidence paths remain blocked",
      "Queue evidence capture checklist",
    ],
    sectionIds: ["evidence-capture-state", "result-capture-state", "manual-review-state"],
    devOnly: true,
  },
  {
    slug: "queue-result-capture-state-preview",
    href: "/queue-result-capture-state-preview",
    phase: "Phase 1473",
    title: "Queue result capture state preview",
    commandLabel: "Go to Queue Result Capture State Preview",
    summary: "Queue result capture state preview shows future backend-owned result capture without UI persistence.",
    markerPhrases: [
      "Queue result capture state preview",
      "Queue result capture state preview does not persist results from the UI",
      "Queue result capture state preview requires backend-owned result capture",
      "Queue result capture state previews pending success blocked denied failed timeout canceled retryable recovered and operator-accepted result states",
      "Denied queue result paths remain blocked",
      "Queue result capture checklist",
    ],
    sectionIds: ["result-capture-state", "failed-canceled-state", "recovery-state"],
    devOnly: true,
  },
  {
    slug: "queue-audit-capture-state-preview",
    href: "/queue-audit-capture-state-preview",
    phase: "Phase 1474",
    title: "Queue audit capture state preview",
    commandLabel: "Go to Queue Audit Capture State Preview",
    summary: "Queue audit capture state preview shows future backend-owned audit capture without UI persistence.",
    markerPhrases: [
      "Queue audit capture state preview",
      "Queue audit capture state preview does not persist audit logs from the UI",
      "Queue audit capture state preview requires backend-owned audit capture",
      "Queue audit capture state previews goal context plan diff command approval evidence result recovery operator memory and denied-path audit records",
      "Denied queue audit paths remain blocked",
      "Queue audit capture checklist",
    ],
    sectionIds: ["audit-capture-state", "evidence-capture-state", "blocked-denied-state"],
    devOnly: true,
  },
  {
    slug: "queue-blocked-denied-state-preview",
    href: "/queue-blocked-denied-state-preview",
    phase: "Phase 1475",
    title: "Queue blocked denied state preview",
    commandLabel: "Go to Queue Blocked Denied State Preview",
    summary: "Queue blocked denied state preview shows fail-closed denied paths without mutating workflow state.",
    markerPhrases: [
      "Queue blocked denied state preview",
      "Queue blocked denied state preview does not mutate workflow state",
      "Queue blocked denied state preview requires explicit operator approval",
      "Queue blocked denied state previews blocked path blocked command blocked approval blocked model blocked provider blocked connector blocked memory blocked recovery and denied execution states",
      "Denied queue blocked paths remain blocked",
      "Queue blocked denied checklist",
    ],
    sectionIds: ["blocked-denied-state", "approval-state", "manual-review-state"],
    devOnly: true,
  },
  {
    slug: "queue-failed-canceled-state-preview",
    href: "/queue-failed-canceled-state-preview",
    phase: "Phase 1476",
    title: "Queue failed canceled state preview",
    commandLabel: "Go to Queue Failed Canceled State Preview",
    summary: "Queue failed canceled state preview shows failed and stopped outcomes without executing recovery.",
    markerPhrases: [
      "Queue failed canceled state preview",
      "Queue failed canceled state preview does not execute recovery from the UI",
      "Queue failed canceled state preview requires explicit operator approval",
      "Queue failed canceled state previews failed apply failed command failed evidence failed result failed audit canceled by operator timeout and manual-stop states",
      "Denied queue failed canceled paths remain blocked",
      "Queue failed canceled checklist",
    ],
    sectionIds: ["failed-canceled-state", "manual-review-state", "recovery-state"],
    devOnly: true,
  },
  {
    slug: "queue-manual-review-state-preview",
    href: "/queue-manual-review-state-preview",
    phase: "Phase 1477",
    title: "Queue manual review state preview",
    commandLabel: "Go to Queue Manual Review State Preview",
    summary: "Queue manual review state preview shows review gaps and next decisions without automatic review actions.",
    markerPhrases: [
      "Queue manual review state preview",
      "Queue manual review state preview does not execute review actions automatically",
      "Queue manual review state preview requires explicit operator approval",
      "Queue manual review state previews evidence gaps result gaps audit gaps recovery choices denied paths and next operator decisions",
      "Denied queue manual review paths remain blocked",
      "Queue manual review checklist",
    ],
    sectionIds: ["manual-review-state", "evidence-capture-state", "result-capture-state", "audit-capture-state"],
    devOnly: true,
  },
  {
    slug: "queue-recovery-state-preview",
    href: "/queue-recovery-state-preview",
    phase: "Phase 1478",
    title: "Queue recovery state preview",
    commandLabel: "Go to Queue Recovery State Preview",
    summary: "Queue recovery state preview shows recovery options without rollback retry or recovery execution from the UI.",
    markerPhrases: [
      "Queue recovery state preview",
      "Queue recovery state preview does not execute rollback retry or recovery from the UI",
      "Queue recovery state preview requires explicit operator approval",
      "Queue recovery state previews rollback-ready retry-ready restore-ready stop-ready explain-failure manual-review safety-stop and partial-recovery states",
      "Denied queue recovery paths remain blocked",
      "Queue recovery state checklist",
    ],
    sectionIds: ["recovery-state", "failed-canceled-state", "manual-review-state"],
    devOnly: true,
  },
  {
    slug: "cockpit-queue-summary",
    href: "/cockpit-queue-summary",
    phase: "Phase 1479",
    title: "Cockpit queue summary",
    commandLabel: "Go to Cockpit Queue Summary",
    summary: "Cockpit queue summary keeps the cockpit as the normal user surface.",
    markerPhrases: [
      "Cockpit queue summary",
      "Cockpit queue summary keeps the cockpit as the normal user surface",
      "Cockpit queue summary does not create queue jobs from the cockpit",
      "Cockpit queue summary shows queue item approval preflight apply run evidence result audit blocked denied failed canceled manual review recovery and transitions",
      "Phase pages remain dev test diagnostics only",
      "Cockpit queue summary checklist",
    ],
    sectionIds: ALL_SECTIONS.map((section) => section.id),
    devOnly: true,
  },
  {
    slug: "first-backend-execution-queue-candidate",
    href: "/first-backend-execution-queue-candidate",
    phase: "Phase 1480",
    title: "First backend execution queue candidate",
    commandLabel: "Go to First Backend Execution Queue Candidate",
    summary: "First backend execution queue candidate combines the complete preview-only queue shape.",
    markerPhrases: [
      "First backend execution queue candidate",
      "First backend execution queue candidate does not create real queue jobs from the UI",
      "First backend execution queue candidate requires explicit operator approval",
      "Candidate combines queue item approval preflight apply run evidence result audit blocked denied failed canceled manual review recovery and allowed transitions",
      "Denied first backend execution queue paths remain blocked",
      "First backend execution queue checklist",
    ],
    sectionIds: ALL_SECTIONS.map((section) => section.id),
    devOnly: true,
  },
  {
    slug: "controlled-backend-execution-queue-release-candidate",
    href: "/controlled-backend-execution-queue-release-candidate",
    phase: "Phase 1481",
    title: "Controlled backend execution queue release candidate",
    commandLabel: "Go to Controlled Backend Execution Queue Release Candidate",
    summary: "Controlled backend execution queue release candidate prepares durable backend-owned queue state without frontend persistence.",
    markerPhrases: [
      "Controlled backend execution queue release candidate",
      "Controlled backend execution queue release candidate does not call models providers connectors write files apply diffs run commands persist approvals create queues persist evidence results audit promote memory release locks or write browser storage from the frontend",
      "Controlled backend execution queue release requires explicit operator approval",
      "Release candidate prepares CodexForge for backend-owned durable execution queue without frontend queue persistence",
      "Denied controlled backend execution queue paths remain blocked",
      "Controlled backend execution queue release checklist",
    ],
    sectionIds: ALL_SECTIONS.map((section) => section.id),
    devOnly: true,
  },
] as const;

export function buildBackendExecutionQueueStableKey(parts: readonly string[]): string {
  return parts.join(":").toLowerCase().replace(/[^a-z0-9:/-]+/g, "-");
}

export function listBackendExecutionQueueRouteDefinitions(): readonly BackendExecutionQueueRouteDefinition[] {
  return ROUTES;
}

export function getBackendExecutionQueueRouteDefinition(
  slug: BackendExecutionQueueRouteSlug
): BackendExecutionQueueRouteDefinition {
  return ROUTES.find((candidate) => candidate.slug === slug) ?? ROUTES[0];
}

export function buildBackendExecutionQueueModel(): BackendExecutionQueueModel {
  return BACKEND_EXECUTION_QUEUE;
}

export function buildBackendExecutionQueueRouteModel(
  slug: BackendExecutionQueueRouteSlug = "codexforge-cockpit"
): BackendExecutionQueueRouteModel {
  const route = getBackendExecutionQueueRouteDefinition(slug);
  const sections = route.sectionIds
    .map((sectionId) => ALL_SECTIONS.find((section) => section.id === sectionId))
    .filter((section): section is BackendExecutionQueueSection => Boolean(section));

  return {
    route,
    queue: BACKEND_EXECUTION_QUEUE,
    sections: sections.length > 0 ? sections : ALL_SECTIONS,
    diagnosticRoutes: ROUTES.filter((candidate) => candidate.devOnly),
    cockpitMarkers: BACKEND_EXECUTION_QUEUE_COCKPIT_MARKERS,
    summary: summarizeBackendExecutionQueueRoute(route),
  };
}

export function summarizeBackendExecutionQueueRouteModel(model: BackendExecutionQueueRouteModel): string {
  return [
    model.route.phase,
    model.route.title,
    model.route.summary,
    model.queue.queueModelId,
    "cockpit is the normal user surface",
    "phase pages remain dev test diagnostics only",
    "broad execution still blocked",
    "frontend queue persistence still blocked",
  ].join(" | ");
}

function summarizeBackendExecutionQueueRoute(route: BackendExecutionQueueRouteDefinition): string {
  return [route.phase, route.title, route.summary, "Explicit operator approval remains required"].join(" | ");
}
