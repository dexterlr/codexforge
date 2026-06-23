export type ReleaseGradeAuditTrailRouteSlug =
  | "codexforge-cockpit"
  | "release-grade-audit-trail-boundary"
  | "goal-audit-record-preview"
  | "context-audit-record-preview"
  | "compiler-audit-record-preview"
  | "proposal-audit-record-preview"
  | "approval-audit-record-preview"
  | "queue-audit-record-preview"
  | "transaction-audit-record-preview"
  | "apply-command-audit-record-preview"
  | "evidence-result-audit-record-preview"
  | "recovery-audit-record-preview"
  | "memory-audit-record-preview"
  | "denied-path-audit-record-preview"
  | "cockpit-audit-trail-summary"
  | "first-release-grade-audit-trail-candidate"
  | "controlled-release-grade-audit-trail-release-candidate";

export type ReleaseGradeAuditTrailKind =
  | "release-grade-audit-trail-preview"
  | "release-grade-audit-trail-boundary"
  | "goal-audit-record-preview"
  | "context-audit-record-preview"
  | "compiler-audit-record-preview"
  | "proposal-audit-record-preview"
  | "approval-audit-record-preview"
  | "queue-audit-record-preview"
  | "transaction-audit-record-preview"
  | "apply-command-audit-record-preview"
  | "evidence-result-audit-record-preview"
  | "recovery-audit-record-preview"
  | "memory-audit-record-preview"
  | "denied-path-audit-record-preview"
  | "first-release-grade-audit-trail-candidate"
  | "controlled-release-grade-audit-trail-release-candidate";

export type ReleaseGradeAuditTrailState =
  | "preview-only"
  | "review-only"
  | "backend-owned"
  | "needs-approval"
  | "blocked"
  | "denied"
  | "manual-review"
  | "capture-contract"
  | "continuity";

export type ReleaseGradeAuditTrailItem = {
  id: string;
  label: string;
  detail: string;
  state: ReleaseGradeAuditTrailState;
};

export type ReleaseGradeAuditTrailRecord = {
  id: string;
  label: string;
  title: string;
  summary: string;
  state: ReleaseGradeAuditTrailState;
  items: readonly ReleaseGradeAuditTrailItem[];
};

export type ReleaseGradeAuditTrailModel = {
  auditTrailId: string;
  auditTrailKind: ReleaseGradeAuditTrailKind;
  goalAuditRecord: ReleaseGradeAuditTrailRecord;
  contextAuditRecord: ReleaseGradeAuditTrailRecord;
  compilerAuditRecord: ReleaseGradeAuditTrailRecord;
  proposalAuditRecord: ReleaseGradeAuditTrailRecord;
  approvalAuditRecord: ReleaseGradeAuditTrailRecord;
  queueAuditRecord: ReleaseGradeAuditTrailRecord;
  transactionAuditRecord: ReleaseGradeAuditTrailRecord;
  applyCommandAuditRecord: ReleaseGradeAuditTrailRecord;
  evidenceResultAuditRecord: ReleaseGradeAuditTrailRecord;
  recoveryAuditRecord: ReleaseGradeAuditTrailRecord;
  memoryAuditRecord: ReleaseGradeAuditTrailRecord;
  deniedPathAuditRecord: ReleaseGradeAuditTrailRecord;
  operatorTimeline: ReleaseGradeAuditTrailRecord;
  cockpitSummary: readonly ReleaseGradeAuditTrailItem[];
  explicitSafetyLimits: readonly string[];
};

export type ReleaseGradeAuditTrailRouteDefinition = {
  slug: ReleaseGradeAuditTrailRouteSlug;
  href: string;
  phase: string;
  title: string;
  commandLabel: string;
  summary: string;
  markerPhrases: readonly string[];
  recordIds: readonly string[];
  devOnly: boolean;
};

export type ReleaseGradeAuditTrailRouteModel = {
  route: ReleaseGradeAuditTrailRouteDefinition;
  auditTrail: ReleaseGradeAuditTrailModel;
  records: readonly ReleaseGradeAuditTrailRecord[];
  diagnosticRoutes: readonly ReleaseGradeAuditTrailRouteDefinition[];
  cockpitMarkers: readonly string[];
  summary: string;
};

export const RELEASE_GRADE_AUDIT_TRAIL_COCKPIT_MARKERS = [
  "Release-Grade Audit Trail",
  "Goal",
  "Context",
  "Compiler",
  "Proposal",
  "Approval",
  "Queue",
  "Transaction",
  "Apply",
  "Command",
  "Evidence",
  "Result",
  "Recovery",
  "Memory",
  "Denied Paths",
  "Operator Timeline",
  "No audit persistence from the cockpit",
  "No execution claims from the cockpit",
  "No hidden approval from the cockpit",
  "No hidden memory promotion from the cockpit",
  "Backend-owned audit capture remains required",
  "Explicit operator approval remains required",
] as const;

const EXPLICIT_SAFETY_LIMITS = [
  "Release-Grade Audit Trail is preview-only from the frontend.",
  "It does not persist audit logs from the UI.",
  "It does not create real audit records from the UI.",
  "It does not claim execution happened.",
  "It does not persist approvals from the UI.",
  "It does not persist evidence/results/memory from the UI.",
  "It does not release execution from the frontend.",
  "It prepares a future backend-owned audit capture path.",
  "Backend-owned guarded execution remains required for real actions.",
  "Explicit operator approval remains required.",
  "It does not create queue jobs or transactions from the UI.",
  "It does not run commands, write files, apply diffs, call models/providers/connectors, or write browser storage from the frontend.",
] as const;

const GOAL_AUDIT_RECORD: ReleaseGradeAuditTrailRecord = {
  id: "goalAuditRecord",
  label: "Goal",
  title: "goalAuditRecord",
  summary:
    "Goal audit record preview captures the raw goal, normalized goal, domain, task, target, done criteria, and operator timeline reference without claiming execution happened.",
  state: "review-only",
  items: [
    {
      id: "goal-raw-normalized",
      label: "Raw and normalized goal",
      detail: "The future backend record would keep the operator goal and normalized goal side by side for review.",
      state: "capture-contract",
    },
    {
      id: "goal-domain-task-target",
      label: "Domain task target",
      detail: "Domain, task, and target are previewed as deterministic audit fields before any proposal or queue item exists.",
      state: "review-only",
    },
    {
      id: "goal-done-timeline",
      label: "Done criteria timeline",
      detail: "Done criteria and operator timeline reference connect the goal to later evidence without claiming work ran.",
      state: "continuity",
    },
  ],
};

const CONTEXT_AUDIT_RECORD: ReleaseGradeAuditTrailRecord = {
  id: "contextAuditRecord",
  label: "Context",
  title: "contextAuditRecord",
  summary:
    "Context audit record preview captures workspace identity, project map, stack, files, commands, risks, confidence, and denied context boundaries without crawling arbitrary files from the UI.",
  state: "backend-owned",
  items: [
    {
      id: "context-workspace-project",
      label: "Workspace identity",
      detail: "Workspace identity, project map, and stack are future backend-owned context fields, not live UI crawling.",
      state: "backend-owned",
    },
    {
      id: "context-files-commands-risks",
      label: "Files commands risks",
      detail: "Relevant files, command expectations, risks, and confidence are previewed for audit continuity.",
      state: "review-only",
    },
    {
      id: "context-denied-boundaries",
      label: "Denied context boundaries",
      detail: "Arbitrary file browsing, secret reads, runtime probes, and broad project scanning remain denied.",
      state: "denied",
    },
  ],
};

const COMPILER_AUDIT_RECORD: ReleaseGradeAuditTrailRecord = {
  id: "compilerAuditRecord",
  label: "Compiler",
  title: "compilerAuditRecord",
  summary:
    "Compiler audit record preview captures goal compiler decisions for domain, task, target, context, files, commands, risk, approval, evidence, done, recovery, and model tool hints without calling models.",
  state: "review-only",
  items: [
    {
      id: "compiler-decisions",
      label: "Compiler decisions",
      detail: "Future backend capture would record domain, task, target, context, files, commands, and risk decisions.",
      state: "capture-contract",
    },
    {
      id: "compiler-approval-evidence",
      label: "Approval evidence done",
      detail: "Approval, evidence, done criteria, and recovery hints connect compiler output to the proposal record.",
      state: "continuity",
    },
    {
      id: "compiler-model-tool-hints",
      label: "Model tool hints",
      detail: "Model and tool hints are static review copy here; this surface does not call models, providers, or tools.",
      state: "blocked",
    },
  ],
};

const PROPOSAL_AUDIT_RECORD: ReleaseGradeAuditTrailRecord = {
  id: "proposalAuditRecord",
  label: "Proposal",
  title: "proposalAuditRecord",
  summary:
    "Proposal audit record preview captures plan, files, diff, commands, risks, approval hold, evidence, result, recovery, timeline, and model tool handoff without executing proposals.",
  state: "needs-approval",
  items: [
    {
      id: "proposal-plan-files-diff",
      label: "Plan files diff",
      detail: "Plan, affected files, and diff intent are previewed as audit fields only.",
      state: "review-only",
    },
    {
      id: "proposal-commands-risks-hold",
      label: "Commands risks hold",
      detail: "Command candidates, risks, and approval hold connect the proposal to the approval record.",
      state: "needs-approval",
    },
    {
      id: "proposal-evidence-result-recovery",
      label: "Evidence result recovery",
      detail: "Evidence expectations, result expectations, recovery plan, timeline, and handoff are not execution claims.",
      state: "continuity",
    },
  ],
};

const APPROVAL_AUDIT_RECORD: ReleaseGradeAuditTrailRecord = {
  id: "approvalAuditRecord",
  label: "Approval",
  title: "approvalAuditRecord",
  summary:
    "Approval audit record preview captures operator identity, scope, expiry, approval freshness, replay protection, risk level, files, commands, and denied paths without persisting approvals from the UI.",
  state: "needs-approval",
  items: [
    {
      id: "approval-operator-scope",
      label: "Operator identity scope",
      detail: "Operator identity, approved scope, risk level, files, and commands must be captured by backend-owned approval records.",
      state: "backend-owned",
    },
    {
      id: "approval-expiry-freshness",
      label: "Expiry freshness replay",
      detail: "Expiry, approval freshness, and replay protection guard stale or reused approvals.",
      state: "needs-approval",
    },
    {
      id: "approval-denied-paths",
      label: "Denied approval paths",
      detail: "Hidden approval, approval persistence from the UI, and approval reuse outside scope remain denied.",
      state: "denied",
    },
  ],
};

const QUEUE_AUDIT_RECORD: ReleaseGradeAuditTrailRecord = {
  id: "queueAuditRecord",
  label: "Queue",
  title: "queueAuditRecord",
  summary:
    "Queue audit record preview captures queue item, approval, preflight, apply, run, evidence, result, audit, blocked, denied, failed, canceled, manual review, recovery, and transitions without creating queue jobs from the UI.",
  state: "backend-owned",
  items: [
    {
      id: "queue-item-transitions",
      label: "Queue item transitions",
      detail: "Queue item, approval, preflight, apply, run, evidence, result, audit, and transition states require backend-owned capture.",
      state: "backend-owned",
    },
    {
      id: "queue-blocked-denied",
      label: "Blocked denied failed",
      detail: "Blocked, denied, failed, canceled, manual review, and recovery states are first-class audit outcomes.",
      state: "continuity",
    },
    {
      id: "queue-no-ui-create",
      label: "No UI queue creation",
      detail: "The cockpit previews queue audit shape and does not create or persist queue jobs.",
      state: "blocked",
    },
  ],
};

const TRANSACTION_AUDIT_RECORD: ReleaseGradeAuditTrailRecord = {
  id: "transactionAuditRecord",
  label: "Transaction",
  title: "transactionAuditRecord",
  summary:
    "Transaction audit record preview captures intent, preflight, snapshot, apply, run, validate, evidence, result, audit, rollback, retry, recovery, and denied boundaries without creating transactions from the UI.",
  state: "backend-owned",
  items: [
    {
      id: "transaction-intent-preflight",
      label: "Intent preflight snapshot",
      detail: "Intent, preflight, and snapshot references belong to backend-owned transaction capture.",
      state: "backend-owned",
    },
    {
      id: "transaction-apply-run-validate",
      label: "Apply run validate",
      detail: "Apply, run, validate, evidence, result, and audit fields connect transaction steps to evidence.",
      state: "continuity",
    },
    {
      id: "transaction-recovery-denied",
      label: "Rollback retry recovery",
      detail: "Rollback, retry, recovery, and denied boundaries are reviewed without executing recovery from the UI.",
      state: "manual-review",
    },
  ],
};

const APPLY_COMMAND_AUDIT_RECORD: ReleaseGradeAuditTrailRecord = {
  id: "applyCommandAuditRecord",
  label: "Apply Command",
  title: "applyCommandAuditRecord",
  summary:
    "Apply command audit record preview captures guarded apply, path guard, diff, command allowlist, arguments, working directory, timeout, stdout, stderr, exit code, and denied commands without writing files or running commands from the UI.",
  state: "blocked",
  items: [
    {
      id: "apply-path-diff",
      label: "Apply path guard diff",
      detail: "Guarded apply, path guard, and diff references are backend-owned capture fields, not frontend apply behavior.",
      state: "backend-owned",
    },
    {
      id: "command-allowlist-arguments",
      label: "Command allowlist arguments",
      detail: "Command allowlist, arguments, working directory, and timeout are reviewed before backend-owned execution can exist.",
      state: "needs-approval",
    },
    {
      id: "command-output-denied",
      label: "Stdout stderr exit code",
      detail: "Stdout, stderr, exit code, and denied commands are result-linked audit fields; the UI does not run commands.",
      state: "blocked",
    },
  ],
};

const EVIDENCE_RESULT_AUDIT_RECORD: ReleaseGradeAuditTrailRecord = {
  id: "evidenceResultAuditRecord",
  label: "Evidence Result",
  title: "evidenceResultAuditRecord",
  summary:
    "Evidence result audit record preview captures evidence references, result state, stdout, stderr, exit code, redaction, operator accepted state, and audit continuity without persisting evidence or results from the UI.",
  state: "capture-contract",
  items: [
    {
      id: "evidence-references",
      label: "Evidence references",
      detail: "Evidence references and redaction notes must be captured by a backend-owned evidence path.",
      state: "backend-owned",
    },
    {
      id: "result-state-output",
      label: "Result stdout stderr",
      detail: "Result state, stdout, stderr, and exit code are normalized result fields, not live UI output.",
      state: "capture-contract",
    },
    {
      id: "operator-accepted-continuity",
      label: "Operator accepted state",
      detail: "Operator accepted state and audit continuity link result review to timeline without persisting from the UI.",
      state: "continuity",
    },
  ],
};

const RECOVERY_AUDIT_RECORD: ReleaseGradeAuditTrailRecord = {
  id: "recoveryAuditRecord",
  label: "Recovery",
  title: "recoveryAuditRecord",
  summary:
    "Recovery audit record preview captures rollback, retry, restore, stop, explain-failure, manual-review, safety-stop, partial-recovery, and operator decision records without executing recovery.",
  state: "manual-review",
  items: [
    {
      id: "recovery-options",
      label: "Rollback retry restore",
      detail: "Rollback, retry, restore, stop, and explain-failure choices are operator decision records.",
      state: "manual-review",
    },
    {
      id: "recovery-safety",
      label: "Manual review safety stop",
      detail: "Manual review, safety stop, and partial recovery require backend-owned capture and explicit operator approval.",
      state: "needs-approval",
    },
    {
      id: "recovery-no-execution",
      label: "No recovery execution",
      detail: "The cockpit previews recovery audit copy and does not execute rollback, retry, restore, or stop actions.",
      state: "blocked",
    },
  ],
};

const MEMORY_AUDIT_RECORD: ReleaseGradeAuditTrailRecord = {
  id: "memoryAuditRecord",
  label: "Memory",
  title: "memoryAuditRecord",
  summary:
    "Memory audit record preview captures proposed memory, scope, retention, risk, redaction, evidence support, operator approval, and denied memory paths without promoting memory automatically.",
  state: "needs-approval",
  items: [
    {
      id: "memory-proposal",
      label: "Proposed memory scope",
      detail: "Proposed memory, scope, retention, risk, and redaction are reviewed before any promotion.",
      state: "review-only",
    },
    {
      id: "memory-evidence-approval",
      label: "Evidence support approval",
      detail: "Evidence support and explicit operator approval are required before backend-owned memory promotion.",
      state: "needs-approval",
    },
    {
      id: "memory-denied-paths",
      label: "Denied memory paths",
      detail: "Hidden memory promotion, automatic memory promotion, UI memory persistence, and secret memory remain denied.",
      state: "denied",
    },
  ],
};

const DENIED_PATH_AUDIT_RECORD: ReleaseGradeAuditTrailRecord = {
  id: "deniedPathAuditRecord",
  label: "Denied Paths",
  title: "deniedPathAuditRecord",
  summary:
    "Denied path audit record preview captures denied files, commands, models, providers, connectors, secrets, installs, deploys, ports, runtimes, persistence, recovery, memory, and frontend execution without mutating workflow state.",
  state: "denied",
  items: [
    {
      id: "denied-execution-sources",
      label: "Files commands frontend",
      detail: "Direct frontend file mutation, diff application, command execution, queue creation, transaction creation, snapshots, and frontend execution remain denied.",
      state: "denied",
    },
    {
      id: "denied-provider-runtime",
      label: "Models providers runtimes",
      detail: "Models, providers, connectors, secrets, installs, deploys, ports, runtimes, local starts, and process spawning remain denied.",
      state: "denied",
    },
    {
      id: "denied-persistence-recovery-memory",
      label: "Persistence recovery memory",
      detail: "Audit, approval, queue, transaction, evidence, result, memory persistence, recovery execution, and browser storage writes remain denied.",
      state: "denied",
    },
  ],
};

const OPERATOR_TIMELINE: ReleaseGradeAuditTrailRecord = {
  id: "operatorTimeline",
  label: "Operator Timeline",
  title: "operatorTimeline",
  summary:
    "Operator timeline previews how goal, context, compiler, proposal, approval, queue, transaction, apply, command, evidence, result, recovery, memory, and denied path records would line up for release-grade review.",
  state: "continuity",
  items: [
    {
      id: "timeline-intent",
      label: "Intent to proposal",
      detail: "Goal, context, compiler, and proposal records connect the operator intent to a reviewable work proposal.",
      state: "continuity",
    },
    {
      id: "timeline-approval-execution",
      label: "Approval to guarded action",
      detail: "Approval, queue, transaction, apply, and command records connect only when backend-owned guarded execution exists.",
      state: "backend-owned",
    },
    {
      id: "timeline-evidence-memory",
      label: "Evidence to memory",
      detail: "Evidence, result, recovery, memory review, and denied paths close the timeline without hidden persistence.",
      state: "continuity",
    },
  ],
};

const COCKPIT_SUMMARY: readonly ReleaseGradeAuditTrailItem[] = [
  {
    id: "cockpit-goal-context-compiler-proposal",
    label: "Goal Context Compiler Proposal",
    detail:
      "Goal, Context, Compiler, and Proposal records connect raw operator intent to a reviewable plan without calling models or executing work.",
    state: "continuity",
  },
  {
    id: "cockpit-approval-queue",
    label: "Approval Queue",
    detail:
      "Approval and Queue records connect only through explicit operator approval and backend-owned queue capture.",
    state: "needs-approval",
  },
  {
    id: "cockpit-transaction-apply-command",
    label: "Transaction Apply Command",
    detail:
      "Transaction, Apply, and Command records preview guarded backend action fields without frontend file writes or command execution.",
    state: "backend-owned",
  },
  {
    id: "cockpit-evidence-result-recovery",
    label: "Evidence Result Recovery",
    detail:
      "Evidence, Result, and Recovery records connect output, outcome, redaction, operator acceptance, and recovery decisions.",
    state: "capture-contract",
  },
  {
    id: "cockpit-memory-denied-timeline",
    label: "Memory Denied Paths Operator Timeline",
    detail:
      "Memory promotion review, denied path audit records, and operator timeline remain explicit, visible, and review-only from the cockpit.",
    state: "review-only",
  },
];

const RELEASE_GRADE_AUDIT_TRAIL_MODEL: ReleaseGradeAuditTrailModel = {
  auditTrailId: "codexforge-release-grade-audit-trail-1514-1529",
  auditTrailKind: "release-grade-audit-trail-preview",
  goalAuditRecord: GOAL_AUDIT_RECORD,
  contextAuditRecord: CONTEXT_AUDIT_RECORD,
  compilerAuditRecord: COMPILER_AUDIT_RECORD,
  proposalAuditRecord: PROPOSAL_AUDIT_RECORD,
  approvalAuditRecord: APPROVAL_AUDIT_RECORD,
  queueAuditRecord: QUEUE_AUDIT_RECORD,
  transactionAuditRecord: TRANSACTION_AUDIT_RECORD,
  applyCommandAuditRecord: APPLY_COMMAND_AUDIT_RECORD,
  evidenceResultAuditRecord: EVIDENCE_RESULT_AUDIT_RECORD,
  recoveryAuditRecord: RECOVERY_AUDIT_RECORD,
  memoryAuditRecord: MEMORY_AUDIT_RECORD,
  deniedPathAuditRecord: DENIED_PATH_AUDIT_RECORD,
  operatorTimeline: OPERATOR_TIMELINE,
  cockpitSummary: COCKPIT_SUMMARY,
  explicitSafetyLimits: EXPLICIT_SAFETY_LIMITS,
};

const RECORD_LOOKUP: Record<string, ReleaseGradeAuditTrailRecord> = {
  goalAuditRecord: GOAL_AUDIT_RECORD,
  contextAuditRecord: CONTEXT_AUDIT_RECORD,
  compilerAuditRecord: COMPILER_AUDIT_RECORD,
  proposalAuditRecord: PROPOSAL_AUDIT_RECORD,
  approvalAuditRecord: APPROVAL_AUDIT_RECORD,
  queueAuditRecord: QUEUE_AUDIT_RECORD,
  transactionAuditRecord: TRANSACTION_AUDIT_RECORD,
  applyCommandAuditRecord: APPLY_COMMAND_AUDIT_RECORD,
  evidenceResultAuditRecord: EVIDENCE_RESULT_AUDIT_RECORD,
  recoveryAuditRecord: RECOVERY_AUDIT_RECORD,
  memoryAuditRecord: MEMORY_AUDIT_RECORD,
  deniedPathAuditRecord: DENIED_PATH_AUDIT_RECORD,
  operatorTimeline: OPERATOR_TIMELINE,
};

const ALL_RECORD_IDS = [
  "goalAuditRecord",
  "contextAuditRecord",
  "compilerAuditRecord",
  "proposalAuditRecord",
  "approvalAuditRecord",
  "queueAuditRecord",
  "transactionAuditRecord",
  "applyCommandAuditRecord",
  "evidenceResultAuditRecord",
  "recoveryAuditRecord",
  "memoryAuditRecord",
  "deniedPathAuditRecord",
  "operatorTimeline",
] as const;

const ROUTES: readonly ReleaseGradeAuditTrailRouteDefinition[] = [
  {
    slug: "codexforge-cockpit",
    href: "/codexforge-cockpit",
    phase: "Cockpit",
    title: "Release-Grade Audit Trail",
    commandLabel: "Go to Unified CodexForge Cockpit",
    summary:
      "Cockpit audit trail summary keeps audit review in the normal user cockpit while phase pages remain dev test diagnostics only.",
    markerPhrases: RELEASE_GRADE_AUDIT_TRAIL_COCKPIT_MARKERS,
    recordIds: ALL_RECORD_IDS,
    devOnly: false,
  },
  {
    slug: "release-grade-audit-trail-boundary",
    href: "/release-grade-audit-trail-boundary",
    phase: "Phase 1514",
    title: "Release-Grade Audit Trail Boundary",
    commandLabel: "Go to Release-Grade Audit Trail Boundary",
    summary:
      "Defines the preview-only release-grade audit trail boundary before any future backend-owned audit capture can exist.",
    markerPhrases: [
      "Release-grade audit trail boundary",
      "Release-grade audit trail boundary does not persist audit logs from the UI",
      "Release-grade audit trail requires backend-owned audit capture",
      "Release-grade audit trail prepares trustworthy operator-visible audit records without broad execution",
      "Denied release-grade audit paths remain blocked",
      "Release-grade audit trail checklist",
    ],
    recordIds: ALL_RECORD_IDS,
    devOnly: true,
  },
  {
    slug: "goal-audit-record-preview",
    href: "/goal-audit-record-preview",
    phase: "Phase 1515",
    title: "Goal Audit Record Preview",
    commandLabel: "Go to Goal Audit Record Preview",
    summary: "Previews the backend-owned goal audit record shape without claiming execution happened.",
    markerPhrases: [
      "Goal audit record preview",
      "Goal audit record preview does not claim execution happened",
      "Goal audit record preview requires backend-owned audit capture",
      "Goal audit record previews raw goal normalized goal domain task target done criteria and operator timeline reference",
      "Denied goal audit paths remain blocked",
      "Goal audit record checklist",
    ],
    recordIds: ["goalAuditRecord", "operatorTimeline", "deniedPathAuditRecord"],
    devOnly: true,
  },
  {
    slug: "context-audit-record-preview",
    href: "/context-audit-record-preview",
    phase: "Phase 1516",
    title: "Context Audit Record Preview",
    commandLabel: "Go to Context Audit Record Preview",
    summary: "Previews workspace context audit fields without crawling arbitrary files from the UI.",
    markerPhrases: [
      "Context audit record preview",
      "Context audit record preview does not crawl arbitrary files from the UI",
      "Context audit record preview requires backend-owned audit capture",
      "Context audit record previews workspace identity project map stack files commands risks confidence and denied context boundaries",
      "Denied context audit paths remain blocked",
      "Context audit record checklist",
    ],
    recordIds: ["contextAuditRecord", "goalAuditRecord", "deniedPathAuditRecord"],
    devOnly: true,
  },
  {
    slug: "compiler-audit-record-preview",
    href: "/compiler-audit-record-preview",
    phase: "Phase 1517",
    title: "Compiler Audit Record Preview",
    commandLabel: "Go to Compiler Audit Record Preview",
    summary: "Previews compiler decision audit fields without calling models.",
    markerPhrases: [
      "Compiler audit record preview",
      "Compiler audit record preview does not call models",
      "Compiler audit record preview requires backend-owned audit capture",
      "Compiler audit record previews goal compiler decisions domain task target context files commands risk approval evidence done recovery and model tool hints",
      "Denied compiler audit paths remain blocked",
      "Compiler audit record checklist",
    ],
    recordIds: ["compilerAuditRecord", "goalAuditRecord", "contextAuditRecord", "deniedPathAuditRecord"],
    devOnly: true,
  },
  {
    slug: "proposal-audit-record-preview",
    href: "/proposal-audit-record-preview",
    phase: "Phase 1518",
    title: "Proposal Audit Record Preview",
    commandLabel: "Go to Proposal Audit Record Preview",
    summary: "Previews proposal audit fields without executing proposals.",
    markerPhrases: [
      "Proposal audit record preview",
      "Proposal audit record preview does not execute proposals",
      "Proposal audit record preview requires backend-owned audit capture",
      "Proposal audit record previews plan files diff commands risks approval hold evidence result recovery timeline and model tool handoff",
      "Denied proposal audit paths remain blocked",
      "Proposal audit record checklist",
    ],
    recordIds: ["proposalAuditRecord", "compilerAuditRecord", "approvalAuditRecord", "deniedPathAuditRecord"],
    devOnly: true,
  },
  {
    slug: "approval-audit-record-preview",
    href: "/approval-audit-record-preview",
    phase: "Phase 1519",
    title: "Approval Audit Record Preview",
    commandLabel: "Go to Approval Audit Record Preview",
    summary: "Previews approval audit fields without persisting approvals from the UI.",
    markerPhrases: [
      "Approval audit record preview",
      "Approval audit record preview does not persist approvals from the UI",
      "Approval audit record preview requires explicit human approval",
      "Approval audit record previews operator identity scope expiry approval freshness replay protection risk level files commands and denied paths",
      "Denied approval audit paths remain blocked",
      "Approval audit record checklist",
    ],
    recordIds: ["approvalAuditRecord", "proposalAuditRecord", "deniedPathAuditRecord"],
    devOnly: true,
  },
  {
    slug: "queue-audit-record-preview",
    href: "/queue-audit-record-preview",
    phase: "Phase 1520",
    title: "Queue Audit Record Preview",
    commandLabel: "Go to Queue Audit Record Preview",
    summary: "Previews queue audit state without creating queue jobs from the UI.",
    markerPhrases: [
      "Queue audit record preview",
      "Queue audit record preview does not create queue jobs from the UI",
      "Queue audit record preview requires backend-owned audit capture",
      "Queue audit record previews queue item approval preflight apply run evidence result audit blocked denied failed canceled manual review recovery and transitions",
      "Denied queue audit record paths remain blocked",
      "Queue audit record checklist",
    ],
    recordIds: ["queueAuditRecord", "approvalAuditRecord", "transactionAuditRecord", "deniedPathAuditRecord"],
    devOnly: true,
  },
  {
    slug: "transaction-audit-record-preview",
    href: "/transaction-audit-record-preview",
    phase: "Phase 1521",
    title: "Transaction Audit Record Preview",
    commandLabel: "Go to Transaction Audit Record Preview",
    summary: "Previews transaction audit fields without creating transactions from the UI.",
    markerPhrases: [
      "Transaction audit record preview",
      "Transaction audit record preview does not create transactions from the UI",
      "Transaction audit record preview requires backend-owned audit capture",
      "Transaction audit record previews intent preflight snapshot apply run validate evidence result audit rollback retry recovery and denied boundaries",
      "Denied transaction audit record paths remain blocked",
      "Transaction audit record checklist",
    ],
    recordIds: ["transactionAuditRecord", "queueAuditRecord", "applyCommandAuditRecord", "deniedPathAuditRecord"],
    devOnly: true,
  },
  {
    slug: "apply-command-audit-record-preview",
    href: "/apply-command-audit-record-preview",
    phase: "Phase 1522",
    title: "Apply Command Audit Record Preview",
    commandLabel: "Go to Apply Command Audit Record Preview",
    summary: "Previews apply and command audit fields without writing files or running commands from the UI.",
    markerPhrases: [
      "Apply command audit record preview",
      "Apply command audit record preview does not write files or run commands from the UI",
      "Apply command audit record preview requires backend-owned audit capture",
      "Apply command audit record previews guarded apply path guard diff command allowlist arguments working directory timeout stdout stderr exit code and denied commands",
      "Denied apply command audit paths remain blocked",
      "Apply command audit record checklist",
    ],
    recordIds: ["applyCommandAuditRecord", "transactionAuditRecord", "evidenceResultAuditRecord", "deniedPathAuditRecord"],
    devOnly: true,
  },
  {
    slug: "evidence-result-audit-record-preview",
    href: "/evidence-result-audit-record-preview",
    phase: "Phase 1523",
    title: "Evidence Result Audit Record Preview",
    commandLabel: "Go to Evidence Result Audit Record Preview",
    summary: "Previews evidence and result audit fields without persisting evidence or results from the UI.",
    markerPhrases: [
      "Evidence result audit record preview",
      "Evidence result audit record preview does not persist evidence or results from the UI",
      "Evidence result audit record preview requires backend-owned audit capture",
      "Evidence result audit record previews evidence references result state stdout stderr exit code redaction operator accepted state and audit continuity",
      "Denied evidence result audit paths remain blocked",
      "Evidence result audit record checklist",
    ],
    recordIds: ["evidenceResultAuditRecord", "applyCommandAuditRecord", "recoveryAuditRecord", "deniedPathAuditRecord"],
    devOnly: true,
  },
  {
    slug: "recovery-audit-record-preview",
    href: "/recovery-audit-record-preview",
    phase: "Phase 1524",
    title: "Recovery Audit Record Preview",
    commandLabel: "Go to Recovery Audit Record Preview",
    summary: "Previews recovery audit fields without executing recovery.",
    markerPhrases: [
      "Recovery audit record preview",
      "Recovery audit record preview does not execute recovery",
      "Recovery audit record preview requires backend-owned audit capture",
      "Recovery audit record previews rollback retry restore stop explain-failure manual-review safety-stop partial-recovery and operator decision records",
      "Denied recovery audit paths remain blocked",
      "Recovery audit record checklist",
    ],
    recordIds: ["recoveryAuditRecord", "evidenceResultAuditRecord", "operatorTimeline", "deniedPathAuditRecord"],
    devOnly: true,
  },
  {
    slug: "memory-audit-record-preview",
    href: "/memory-audit-record-preview",
    phase: "Phase 1525",
    title: "Memory Audit Record Preview",
    commandLabel: "Go to Memory Audit Record Preview",
    summary: "Previews memory promotion review audit fields without automatic memory promotion.",
    markerPhrases: [
      "Memory audit record preview",
      "Memory audit record preview does not promote memory automatically",
      "Memory audit record preview requires explicit operator approval before promotion",
      "Memory audit record previews proposed memory scope retention risk redaction evidence support operator approval and denied memory paths",
      "Denied memory audit paths remain blocked",
      "Memory audit record checklist",
    ],
    recordIds: ["memoryAuditRecord", "evidenceResultAuditRecord", "operatorTimeline", "deniedPathAuditRecord"],
    devOnly: true,
  },
  {
    slug: "denied-path-audit-record-preview",
    href: "/denied-path-audit-record-preview",
    phase: "Phase 1526",
    title: "Denied Path Audit Record Preview",
    commandLabel: "Go to Denied Path Audit Record Preview",
    summary: "Previews denied path audit fields without mutating workflow state.",
    markerPhrases: [
      "Denied path audit record preview",
      "Denied path audit record preview does not mutate workflow state",
      "Denied path audit record preview requires backend-owned audit capture",
      "Denied path audit record previews denied files commands models providers connectors secrets installs deploys ports runtimes persistence recovery memory and frontend execution",
      "Denied path audit paths remain blocked",
      "Denied path audit record checklist",
    ],
    recordIds: ["deniedPathAuditRecord", "operatorTimeline", "approvalAuditRecord", "memoryAuditRecord"],
    devOnly: true,
  },
  {
    slug: "cockpit-audit-trail-summary",
    href: "/cockpit-audit-trail-summary",
    phase: "Phase 1527",
    title: "Cockpit Audit Trail Summary",
    commandLabel: "Go to Cockpit Audit Trail Summary",
    summary: "Keeps release-grade audit trail review in the cockpit while phase pages remain dev test diagnostics only.",
    markerPhrases: [
      "Cockpit audit trail summary",
      "Cockpit audit trail summary keeps the cockpit as the normal user surface",
      "Cockpit audit trail summary does not persist audit logs from the cockpit",
      "Cockpit audit trail summary shows goal context compiler proposal approval queue transaction apply command evidence result recovery memory denied paths and operator timeline",
      "Phase pages remain dev test diagnostics only",
      "Cockpit audit trail checklist",
    ],
    recordIds: ALL_RECORD_IDS,
    devOnly: true,
  },
  {
    slug: "first-release-grade-audit-trail-candidate",
    href: "/first-release-grade-audit-trail-candidate",
    phase: "Phase 1528",
    title: "First Release-Grade Audit Trail Candidate",
    commandLabel: "Go to First Release-Grade Audit Trail Candidate",
    summary: "Combines the first release-grade audit trail candidate across every audit record preview.",
    markerPhrases: [
      "First release-grade audit trail candidate",
      "First release-grade audit trail candidate does not persist audit logs from the UI",
      "First release-grade audit trail candidate requires backend-owned audit capture",
      "Candidate combines goal context compiler proposal approval queue transaction apply command evidence result recovery memory denied paths and operator timeline",
      "Denied first release-grade audit paths remain blocked",
      "First release-grade audit trail checklist",
    ],
    recordIds: ALL_RECORD_IDS,
    devOnly: true,
  },
  {
    slug: "controlled-release-grade-audit-trail-release-candidate",
    href: "/controlled-release-grade-audit-trail-release-candidate",
    phase: "Phase 1529",
    title: "Controlled Release-Grade Audit Trail Release Candidate",
    commandLabel: "Go to Controlled Release-Grade Audit Trail Release Candidate",
    summary:
      "Controlled release-grade audit trail release candidate prepares backend-owned audit capture without frontend audit persistence.",
    markerPhrases: [
      "Controlled release-grade audit trail release candidate",
      "Controlled release-grade audit trail release candidate does not call models providers connectors write files apply diffs run commands create snapshots persist approvals create queues persist transactions persist evidence results audit promote memory release locks execute rollback retry recovery spawn processes bind ports install deploy start runtimes or write browser storage from the frontend",
      "Controlled release-grade audit trail release requires backend-owned audit capture",
      "Release candidate prepares CodexForge for backend-owned release-grade audit capture without frontend audit persistence",
      "Denied controlled release-grade audit paths remain blocked",
      "Controlled release-grade audit trail release checklist",
    ],
    recordIds: ALL_RECORD_IDS,
    devOnly: true,
  },
];

export function listReleaseGradeAuditTrailRouteDefinitions(): readonly ReleaseGradeAuditTrailRouteDefinition[] {
  return ROUTES;
}

export function getReleaseGradeAuditTrailRouteDefinition(
  slug: ReleaseGradeAuditTrailRouteSlug
): ReleaseGradeAuditTrailRouteDefinition {
  const route = ROUTES.find((candidate) => candidate.slug === slug);
  if (!route) return ROUTES[0];
  return route;
}

export function buildReleaseGradeAuditTrailRouteModel(
  slug: ReleaseGradeAuditTrailRouteSlug = "codexforge-cockpit"
): ReleaseGradeAuditTrailRouteModel {
  const route = getReleaseGradeAuditTrailRouteDefinition(slug);
  const records = route.recordIds.map((recordId) => RECORD_LOOKUP[recordId]).filter(Boolean);

  return {
    route,
    auditTrail: RELEASE_GRADE_AUDIT_TRAIL_MODEL,
    records,
    diagnosticRoutes: ROUTES.filter((candidate) => candidate.devOnly),
    cockpitMarkers: RELEASE_GRADE_AUDIT_TRAIL_COCKPIT_MARKERS,
    summary: summarizeReleaseGradeAuditTrailRoute(route, records),
  };
}

export function buildReleaseGradeAuditTrailModel(): ReleaseGradeAuditTrailRouteModel {
  return buildReleaseGradeAuditTrailRouteModel("codexforge-cockpit");
}

export function summarizeReleaseGradeAuditTrailRoute(
  route: ReleaseGradeAuditTrailRouteDefinition,
  records: readonly ReleaseGradeAuditTrailRecord[]
): string {
  return `${route.title} keeps ${records.length} audit records static, deterministic, preview-only, review-only, backend-owned, and blocked from frontend audit persistence or execution claims.`;
}

export function buildReleaseGradeAuditTrailStableKey(parts: readonly string[]): string {
  return parts.join("__");
}
