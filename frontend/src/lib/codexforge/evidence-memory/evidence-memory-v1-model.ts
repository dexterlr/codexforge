export type EvidenceMemoryRouteSlug =
  | "codexforge-cockpit"
  | "evidence-memory-boundary"
  | "goal-memory-snapshot-preview"
  | "context-memory-snapshot-preview"
  | "plan-memory-snapshot-preview"
  | "diff-memory-snapshot-preview"
  | "command-memory-snapshot-preview"
  | "approval-memory-snapshot-preview"
  | "evidence-memory-packet"
  | "result-memory-packet"
  | "recovery-memory-packet"
  | "audit-memory-packet"
  | "denied-memory-boundary"
  | "memory-promotion-review"
  | "cockpit-evidence-memory-summary"
  | "first-evidence-memory-candidate"
  | "controlled-evidence-memory-release-candidate";

export type EvidenceMemoryKind =
  | "evidence-memory-v1"
  | "evidence-memory-boundary"
  | "goal-memory-snapshot-preview"
  | "context-memory-snapshot-preview"
  | "plan-memory-snapshot-preview"
  | "diff-memory-snapshot-preview"
  | "command-memory-snapshot-preview"
  | "approval-memory-snapshot-preview"
  | "evidence-memory-packet"
  | "result-memory-packet"
  | "recovery-memory-packet"
  | "audit-memory-packet"
  | "denied-memory-boundary"
  | "memory-promotion-review"
  | "evidence-memory-candidate"
  | "evidence-memory-release-candidate";

export type EvidenceMemoryState = "preview-only" | "review-only" | "expected" | "needs-approval" | "blocked";

export type EvidenceMemoryItem = {
  id: string;
  label: string;
  detail: string;
  state: EvidenceMemoryState;
};

export type EvidenceMemorySection = {
  id: string;
  label: string;
  title: string;
  summary: string;
  state: EvidenceMemoryState;
  items: readonly EvidenceMemoryItem[];
};

export type EvidenceMemoryModel = {
  evidenceMemoryId: string;
  evidenceMemoryKind: EvidenceMemoryKind;
  goalMemorySnapshot: EvidenceMemorySection;
  contextMemorySnapshot: EvidenceMemorySection;
  planMemorySnapshot: EvidenceMemorySection;
  diffMemorySnapshot: EvidenceMemorySection;
  commandMemorySnapshot: EvidenceMemorySection;
  approvalMemorySnapshot: EvidenceMemorySection;
  evidenceMemoryPacket: EvidenceMemorySection;
  resultMemoryPacket: EvidenceMemorySection;
  recoveryMemoryPacket: EvidenceMemorySection;
  auditMemoryPacket: EvidenceMemorySection;
  deniedMemoryBoundaries: EvidenceMemorySection;
  memoryPromotionReview: EvidenceMemorySection;
  cockpitSummary: readonly EvidenceMemoryItem[];
  explicitSafetyLimits: readonly string[];
};

export type EvidenceMemoryRouteDefinition = {
  slug: EvidenceMemoryRouteSlug;
  href: string;
  phase: string;
  title: string;
  commandLabel: string;
  summary: string;
  markerPhrases: readonly string[];
  sectionIds: readonly string[];
  devOnly: boolean;
};

export type EvidenceMemoryRouteModel = {
  route: EvidenceMemoryRouteDefinition;
  memory: EvidenceMemoryModel;
  sections: readonly EvidenceMemorySection[];
  diagnosticRoutes: readonly EvidenceMemoryRouteDefinition[];
  cockpitMarkers: readonly string[];
  summary: string;
};

export const EVIDENCE_MEMORY_COCKPIT_MARKERS = [
  "Evidence Memory v1",
  "Remembered Goal",
  "Remembered Context",
  "Remembered Plan",
  "Remembered Files",
  "Remembered Commands",
  "Approval Memory",
  "Evidence Memory",
  "Result Memory",
  "Recovery Memory",
  "Audit Memory",
  "Memory Review",
  "Denied Memory",
  "No automatic memory promotion from the cockpit",
  "No memory persistence from the cockpit",
  "No browser storage writes from the cockpit",
  "No secret memory from the cockpit",
  "Backend-owned evidence memory remains required",
  "Explicit operator approval remains required",
] as const;

const EXPLICIT_SAFETY_LIMITS = [
  "Evidence Memory v1 is preview-only.",
  "It does not persist memory from the UI.",
  "It does not promote memory automatically.",
  "It does not write browser storage.",
  "It does not store secrets.",
  "It does not call models.",
  "It does not call providers.",
  "It does not call connectors.",
  "It does not execute commands.",
  "It does not write files.",
  "It does not apply diffs.",
  "It does not persist approvals.",
  "It does not persist evidence/results/audit from the UI.",
  "It prepares a future backend-owned evidence memory path.",
  "Memory promotion must be explicit, scoped, reviewable, and operator-approved.",
  "Backend-owned guarded execution remains required for real actions.",
  "Explicit operator approval remains required.",
] as const;

const GOAL_MEMORY_SNAPSHOT: EvidenceMemorySection = {
  id: "goal-memory-snapshot",
  label: "Remembered Goal",
  title: "Goal memory snapshot preview",
  summary:
    "Goal memory snapshot preview captures the operator goal, normalized goal, domain, task target, and done criteria as review-only memory.",
  state: "preview-only",
  items: [
    {
      id: "goal-operator-wanted",
      label: "Operator wanted",
      detail: "Records what the operator asked for, the normalized target, the domain, task type, and done criteria without sending prompts.",
      state: "review-only",
    },
    {
      id: "goal-review-only",
      label: "Review-only goal memory",
      detail: "Goal memory snapshot preview does not promote memory automatically and requires explicit operator approval before promotion.",
      state: "needs-approval",
    },
    {
      id: "goal-denied",
      label: "Denied goal memory",
      detail: "Hidden goal promotion, secret capture, arbitrary file context, and provider payload memory remain blocked.",
      state: "blocked",
    },
  ],
};

const CONTEXT_MEMORY_SNAPSHOT: EvidenceMemorySection = {
  id: "context-memory-snapshot",
  label: "Remembered Context",
  title: "Context memory snapshot preview",
  summary:
    "Context memory snapshot preview captures workspace identity, project map, stack, files, command candidates, risks, and confidence as review-only memory.",
  state: "preview-only",
  items: [
    {
      id: "context-used",
      label: "Context used",
      detail: "Records deterministic project context signals already presented for review: workspace identity, project map, stack, files, commands, risks, and confidence.",
      state: "review-only",
    },
    {
      id: "context-no-crawl",
      label: "No arbitrary crawl",
      detail: "Context memory snapshot preview does not crawl arbitrary files from the UI or read secrets.",
      state: "blocked",
    },
    {
      id: "context-approval",
      label: "Promotion approval",
      detail: "Context memory snapshot preview requires explicit operator approval before promotion.",
      state: "needs-approval",
    },
  ],
};

const PLAN_MEMORY_SNAPSHOT: EvidenceMemorySection = {
  id: "plan-memory-snapshot",
  label: "Remembered Plan",
  title: "Plan memory snapshot preview",
  summary:
    "Plan memory snapshot preview captures plan steps, dependencies, risks, file impacts, command expectations, approval scope, and done criteria.",
  state: "preview-only",
  items: [
    {
      id: "plan-proposed",
      label: "Proposed plan",
      detail: "Records what plan was proposed, the dependencies, risk notes, file impacts, command expectations, approval scope, and done criteria.",
      state: "review-only",
    },
    {
      id: "plan-no-execute",
      label: "No plan execution",
      detail: "Plan memory snapshot preview does not execute plans, create queues, release locks, or run backend actions.",
      state: "blocked",
    },
    {
      id: "plan-approval",
      label: "Promotion approval",
      detail: "Plan memory snapshot preview requires explicit operator approval before promotion.",
      state: "needs-approval",
    },
  ],
};

const DIFF_MEMORY_SNAPSHOT: EvidenceMemorySection = {
  id: "diff-memory-snapshot",
  label: "Remembered Files",
  title: "Diff memory snapshot preview",
  summary:
    "Diff memory snapshot preview captures proposed file changes, path guard status, rollback readiness, evidence needs, and denied paths.",
  state: "preview-only",
  items: [
    {
      id: "diff-expected",
      label: "Expected file changes",
      detail: "Records expected file paths, diff intent, path guard status, rollback readiness, evidence needs, and denied paths.",
      state: "review-only",
    },
    {
      id: "diff-no-apply",
      label: "No diff application",
      detail: "Diff memory snapshot preview does not apply diffs, write files, or execute rollback from the frontend.",
      state: "blocked",
    },
    {
      id: "diff-approval",
      label: "Promotion approval",
      detail: "Diff memory snapshot preview requires explicit operator approval before promotion.",
      state: "needs-approval",
    },
  ],
};

const COMMAND_MEMORY_SNAPSHOT: EvidenceMemorySection = {
  id: "command-memory-snapshot",
  label: "Remembered Commands",
  title: "Command memory snapshot preview",
  summary:
    "Command memory snapshot preview captures command candidates, allowlist status, arguments, working directory, timeout, evidence, and denied commands.",
  state: "preview-only",
  items: [
    {
      id: "command-candidates",
      label: "Expected commands",
      detail: "Records command candidates, allowlist status, arguments, working directory, timeout, evidence expectations, and denied commands.",
      state: "review-only",
    },
    {
      id: "command-no-run",
      label: "No command execution",
      detail: "Command memory snapshot preview does not run commands, spawn processes, start runtimes, bind ports, install, deploy, or run adapters.",
      state: "blocked",
    },
    {
      id: "command-approval",
      label: "Promotion approval",
      detail: "Command memory snapshot preview requires explicit operator approval before promotion.",
      state: "needs-approval",
    },
  ],
};

const APPROVAL_MEMORY_SNAPSHOT: EvidenceMemorySection = {
  id: "approval-memory-snapshot",
  label: "Approval Memory",
  title: "Approval memory snapshot preview",
  summary:
    "Approval memory snapshot preview captures approval scope, expiry, operator identity, files, commands, model tool needs, risk level, and denied paths.",
  state: "preview-only",
  items: [
    {
      id: "approval-scope",
      label: "Approval scope",
      detail: "Records proposed approval scope, expiry, operator identity, files, commands, model tool needs, risk level, and denied paths.",
      state: "review-only",
    },
    {
      id: "approval-no-persist",
      label: "No approval persistence",
      detail: "Approval memory snapshot preview does not persist approvals or store signoff from the UI.",
      state: "blocked",
    },
    {
      id: "approval-human",
      label: "Human approval",
      detail: "Approval memory snapshot preview requires explicit human approval before promotion.",
      state: "needs-approval",
    },
  ],
};

const EVIDENCE_MEMORY_PACKET: EvidenceMemorySection = {
  id: "evidence-memory-packet",
  label: "Evidence Memory",
  title: "Evidence memory packet",
  summary:
    "Evidence memory packet captures diff, command stdout, stderr, exit code, approval, result, audit, recovery, and model tool evidence references.",
  state: "preview-only",
  items: [
    {
      id: "evidence-references",
      label: "Evidence references",
      detail: "Records reviewable references for diff, command stdout, stderr, exit code, approval, result, audit, recovery, and model tool evidence.",
      state: "expected",
    },
    {
      id: "evidence-no-persist",
      label: "No evidence persistence",
      detail: "Evidence memory packet does not persist evidence from the UI, attach logs, or save audit records.",
      state: "blocked",
    },
    {
      id: "evidence-approval",
      label: "Promotion approval",
      detail: "Evidence memory packet requires explicit operator approval before promotion.",
      state: "needs-approval",
    },
  ],
};

const RESULT_MEMORY_PACKET: EvidenceMemorySection = {
  id: "result-memory-packet",
  label: "Result Memory",
  title: "Result memory packet",
  summary:
    "Result memory packet captures success, blocked, denied, failed, timeout, manual-review, retryable, recovered, and operator-accepted outcomes.",
  state: "preview-only",
  items: [
    {
      id: "result-states",
      label: "Result states",
      detail: "Records important result vocabulary: success, blocked, denied, failed, timeout, manual-review, retryable, recovered, and operator-accepted.",
      state: "review-only",
    },
    {
      id: "result-no-persist",
      label: "No result persistence",
      detail: "Result memory packet does not persist results from the UI or claim execution happened.",
      state: "blocked",
    },
    {
      id: "result-approval",
      label: "Promotion approval",
      detail: "Result memory packet requires explicit operator approval before promotion.",
      state: "needs-approval",
    },
  ],
};

const RECOVERY_MEMORY_PACKET: EvidenceMemorySection = {
  id: "recovery-memory-packet",
  label: "Recovery Memory",
  title: "Recovery memory packet",
  summary:
    "Recovery memory packet captures rollback, retry, restore, stop, explain-failure, manual-review, safety-stop, and partial-recovery options.",
  state: "preview-only",
  items: [
    {
      id: "recovery-options",
      label: "Recovery options",
      detail: "Records what recovery options were available: rollback, retry, restore, stop, explain-failure, manual-review, safety-stop, and partial recovery.",
      state: "review-only",
    },
    {
      id: "recovery-no-execute",
      label: "No recovery execution",
      detail: "Recovery memory packet does not execute recovery, rollback, retry, restore, stop, or partial recovery from the UI.",
      state: "blocked",
    },
    {
      id: "recovery-approval",
      label: "Promotion approval",
      detail: "Recovery memory packet requires explicit operator approval before promotion.",
      state: "needs-approval",
    },
  ],
};

const AUDIT_MEMORY_PACKET: EvidenceMemorySection = {
  id: "audit-memory-packet",
  label: "Audit Memory",
  title: "Audit memory packet",
  summary:
    "Audit memory packet captures goal, context, plan, diff, command, approval, evidence, result, recovery, model tool, operator, and denied-path records.",
  state: "preview-only",
  items: [
    {
      id: "audit-records",
      label: "Audit timeline",
      detail: "Records the audit timeline that matters: goal, context, plan, diff, command, approval, evidence, result, recovery, model tool, operator, and denied paths.",
      state: "review-only",
    },
    {
      id: "audit-no-persist",
      label: "No audit persistence",
      detail: "Audit memory packet does not persist audit logs from the UI or store evidence/result/audit records.",
      state: "blocked",
    },
    {
      id: "audit-approval",
      label: "Promotion approval",
      detail: "Audit memory packet requires explicit operator approval before promotion.",
      state: "needs-approval",
    },
  ],
};

const DENIED_MEMORY_BOUNDARIES: EvidenceMemorySection = {
  id: "denied-memory-boundaries",
  label: "Denied Memory",
  title: "Denied memory boundary",
  summary:
    "Denied memory boundary blocks secrets, environment values, credentials, tokens, private keys, arbitrary files, hidden approvals, hidden memory, provider payloads, connector payloads, and automatic promotion.",
  state: "blocked",
  items: [
    {
      id: "denied-secrets",
      label: "Secret memory blocked",
      detail: "Secrets, environment values, credentials, tokens, private keys, API keys, and browser credentials must not be remembered.",
      state: "blocked",
    },
    {
      id: "denied-hidden",
      label: "Hidden memory blocked",
      detail: "Hidden approvals, hidden memory promotion, provider payloads, connector payloads, broad project memory, and automatic promotion remain blocked.",
      state: "blocked",
    },
    {
      id: "denied-ui-mutation",
      label: "UI mutation blocked",
      detail: "The UI does not mutate memory state, write browser storage, persist queues, persist approvals, or persist evidence/results/audit.",
      state: "blocked",
    },
  ],
};

const MEMORY_PROMOTION_REVIEW: EvidenceMemorySection = {
  id: "memory-promotion-review",
  label: "Memory Review",
  title: "Memory promotion review",
  summary:
    "Memory promotion review shows proposed memory scope, retention, risk, redaction, evidence support, operator approval, and rollback implications.",
  state: "needs-approval",
  items: [
    {
      id: "promotion-scope",
      label: "Promotion scope",
      detail: "Shows proposed scope, retention, risk, redaction needs, evidence support, operator approval state, and rollback implications.",
      state: "review-only",
    },
    {
      id: "promotion-explicit",
      label: "Explicit promotion only",
      detail: "Memory promotion review does not promote memory automatically and requires explicit operator approval.",
      state: "needs-approval",
    },
    {
      id: "promotion-denied",
      label: "Denied promotion paths",
      detail: "Automatic promotion, hidden retention, unscoped memory, secret memory, and provider or connector payload memory stay blocked.",
      state: "blocked",
    },
  ],
};

const COCKPIT_SUMMARY: readonly EvidenceMemoryItem[] = [
  {
    id: "cockpit-remembered-goal",
    label: "Remembered Goal",
    detail: "What the operator wanted, normalized goal, domain, task target, and done criteria can be reviewed before promotion.",
    state: "review-only",
  },
  {
    id: "cockpit-remembered-context",
    label: "Remembered Context",
    detail: "Workspace identity, project map, stack, files, command candidates, risks, and confidence can be remembered only after scoped approval.",
    state: "needs-approval",
  },
  {
    id: "cockpit-remembered-plan",
    label: "Remembered Plan",
    detail: "Plan steps, dependencies, risks, expected files, expected commands, approval scope, and done criteria stay review-only.",
    state: "review-only",
  },
  {
    id: "cockpit-remembered-files",
    label: "Remembered Files",
    detail: "Expected file paths, diff intent, path guard status, rollback readiness, evidence needs, and denied paths can be reviewed without applying diffs.",
    state: "blocked",
  },
  {
    id: "cockpit-remembered-commands",
    label: "Remembered Commands",
    detail: "Command candidates, allowlist status, arguments, working directory, timeout, evidence, and denied commands stay non-executable.",
    state: "blocked",
  },
  {
    id: "cockpit-approval-memory",
    label: "Approval Memory",
    detail: "Approval scope, expiry, operator identity, files, commands, model tool needs, risk level, and denied paths require human review.",
    state: "needs-approval",
  },
  {
    id: "cockpit-evidence-memory",
    label: "Evidence Memory",
    detail: "Diff, stdout, stderr, exit code, approval, result, audit, recovery, and model tool evidence references can support future runs.",
    state: "expected",
  },
  {
    id: "cockpit-result-memory",
    label: "Result Memory",
    detail: "Success, blocked, denied, failed, timeout, manual-review, retryable, recovered, and operator-accepted outcomes can guide future runs.",
    state: "review-only",
  },
  {
    id: "cockpit-recovery-memory",
    label: "Recovery Memory",
    detail: "Rollback, retry, restore, stop, explain-failure, manual-review, safety-stop, and partial-recovery options remain review-only.",
    state: "review-only",
  },
  {
    id: "cockpit-audit-memory",
    label: "Audit Memory",
    detail: "Goal, context, plan, diff, command, approval, evidence, result, recovery, model tool, operator, and denied-path records define the future audit path.",
    state: "expected",
  },
  {
    id: "cockpit-memory-review",
    label: "Memory Review",
    detail: "Proposed memory scope, retention, risk, redaction, evidence support, operator approval, and rollback implications must be explicit.",
    state: "needs-approval",
  },
  {
    id: "cockpit-denied-memory",
    label: "Denied Memory",
    detail: "Secrets, environment values, credentials, tokens, private keys, arbitrary files, hidden approvals, hidden memory, provider payloads, connector payloads, and automatic promotion stay blocked.",
    state: "blocked",
  },
];

const EVIDENCE_MEMORY: EvidenceMemoryModel = {
  evidenceMemoryId: "codexforge-evidence-memory-v1-1450-1465",
  evidenceMemoryKind: "evidence-memory-v1",
  goalMemorySnapshot: GOAL_MEMORY_SNAPSHOT,
  contextMemorySnapshot: CONTEXT_MEMORY_SNAPSHOT,
  planMemorySnapshot: PLAN_MEMORY_SNAPSHOT,
  diffMemorySnapshot: DIFF_MEMORY_SNAPSHOT,
  commandMemorySnapshot: COMMAND_MEMORY_SNAPSHOT,
  approvalMemorySnapshot: APPROVAL_MEMORY_SNAPSHOT,
  evidenceMemoryPacket: EVIDENCE_MEMORY_PACKET,
  resultMemoryPacket: RESULT_MEMORY_PACKET,
  recoveryMemoryPacket: RECOVERY_MEMORY_PACKET,
  auditMemoryPacket: AUDIT_MEMORY_PACKET,
  deniedMemoryBoundaries: DENIED_MEMORY_BOUNDARIES,
  memoryPromotionReview: MEMORY_PROMOTION_REVIEW,
  cockpitSummary: COCKPIT_SUMMARY,
  explicitSafetyLimits: EXPLICIT_SAFETY_LIMITS,
};

const ALL_SECTIONS = [
  GOAL_MEMORY_SNAPSHOT,
  CONTEXT_MEMORY_SNAPSHOT,
  PLAN_MEMORY_SNAPSHOT,
  DIFF_MEMORY_SNAPSHOT,
  COMMAND_MEMORY_SNAPSHOT,
  APPROVAL_MEMORY_SNAPSHOT,
  EVIDENCE_MEMORY_PACKET,
  RESULT_MEMORY_PACKET,
  RECOVERY_MEMORY_PACKET,
  AUDIT_MEMORY_PACKET,
  DENIED_MEMORY_BOUNDARIES,
  MEMORY_PROMOTION_REVIEW,
] as const;

const ROUTES: readonly EvidenceMemoryRouteDefinition[] = [
  {
    slug: "codexforge-cockpit",
    href: "/codexforge-cockpit",
    phase: "Evidence Memory v1",
    title: "Cockpit evidence memory summary",
    commandLabel: "Go to Unified CodexForge Cockpit",
    summary: "Concise cockpit-centered Evidence Memory v1 summary for normal users.",
    markerPhrases: EVIDENCE_MEMORY_COCKPIT_MARKERS,
    sectionIds: ALL_SECTIONS.map((section) => section.id),
    devOnly: false,
  },
  {
    slug: "evidence-memory-boundary",
    href: "/evidence-memory-boundary",
    phase: "Phase 1450",
    title: "Evidence memory boundary",
    commandLabel: "Go to Evidence Memory Boundary",
    summary: "Evidence memory boundary prepares reviewable run memory without hidden persistence.",
    markerPhrases: [
      "Evidence memory boundary",
      "Evidence memory boundary does not persist memory from the UI",
      "Evidence memory requires explicit operator approval before promotion",
      "Evidence memory prepares reviewable run memory without hidden persistence",
      "Denied evidence memory paths remain blocked",
      "Evidence memory checklist",
    ],
    sectionIds: ["denied-memory-boundaries", "memory-promotion-review", "evidence-memory-packet"],
    devOnly: true,
  },
  {
    slug: "goal-memory-snapshot-preview",
    href: "/goal-memory-snapshot-preview",
    phase: "Phase 1451",
    title: "Goal memory snapshot preview",
    commandLabel: "Go to Goal Memory Snapshot Preview",
    summary: "Goal memory snapshot preview captures operator intent as review-only memory.",
    markerPhrases: [
      "Goal memory snapshot preview",
      "Goal memory snapshot preview does not promote memory automatically",
      "Goal memory snapshot preview requires explicit operator approval before promotion",
      "Goal memory snapshot captures operator goal normalized goal domain task target and done criteria as review-only memory",
      "Denied goal memory paths remain blocked",
      "Goal memory snapshot checklist",
    ],
    sectionIds: ["goal-memory-snapshot", "memory-promotion-review", "denied-memory-boundaries"],
    devOnly: true,
  },
  {
    slug: "context-memory-snapshot-preview",
    href: "/context-memory-snapshot-preview",
    phase: "Phase 1452",
    title: "Context memory snapshot preview",
    commandLabel: "Go to Context Memory Snapshot Preview",
    summary: "Context memory snapshot preview captures context signals without arbitrary UI crawling.",
    markerPhrases: [
      "Context memory snapshot preview",
      "Context memory snapshot preview does not crawl arbitrary files from the UI",
      "Context memory snapshot preview requires explicit operator approval before promotion",
      "Context memory snapshot captures workspace identity project map stack files command candidates risks and confidence as review-only memory",
      "Denied context memory paths remain blocked",
      "Context memory snapshot checklist",
    ],
    sectionIds: ["context-memory-snapshot", "denied-memory-boundaries", "memory-promotion-review"],
    devOnly: true,
  },
  {
    slug: "plan-memory-snapshot-preview",
    href: "/plan-memory-snapshot-preview",
    phase: "Phase 1453",
    title: "Plan memory snapshot preview",
    commandLabel: "Go to Plan Memory Snapshot Preview",
    summary: "Plan memory snapshot preview captures the proposed plan without executing plans.",
    markerPhrases: [
      "Plan memory snapshot preview",
      "Plan memory snapshot preview does not execute plans",
      "Plan memory snapshot preview requires explicit operator approval before promotion",
      "Plan memory snapshot captures plan steps dependencies risks file impacts command expectations approval scope and done criteria",
      "Denied plan memory paths remain blocked",
      "Plan memory snapshot checklist",
    ],
    sectionIds: ["plan-memory-snapshot", "goal-memory-snapshot", "memory-promotion-review"],
    devOnly: true,
  },
  {
    slug: "diff-memory-snapshot-preview",
    href: "/diff-memory-snapshot-preview",
    phase: "Phase 1454",
    title: "Diff memory snapshot preview",
    commandLabel: "Go to Diff Memory Snapshot Preview",
    summary: "Diff memory snapshot preview captures proposed file changes without applying diffs.",
    markerPhrases: [
      "Diff memory snapshot preview",
      "Diff memory snapshot preview does not apply diffs",
      "Diff memory snapshot preview requires explicit operator approval before promotion",
      "Diff memory snapshot captures proposed file changes path guard status rollback readiness evidence needs and denied paths",
      "Denied diff memory paths remain blocked",
      "Diff memory snapshot checklist",
    ],
    sectionIds: ["diff-memory-snapshot", "recovery-memory-packet", "denied-memory-boundaries"],
    devOnly: true,
  },
  {
    slug: "command-memory-snapshot-preview",
    href: "/command-memory-snapshot-preview",
    phase: "Phase 1455",
    title: "Command memory snapshot preview",
    commandLabel: "Go to Command Memory Snapshot Preview",
    summary: "Command memory snapshot preview captures command candidates without running commands.",
    markerPhrases: [
      "Command memory snapshot preview",
      "Command memory snapshot preview does not run commands",
      "Command memory snapshot preview requires explicit operator approval before promotion",
      "Command memory snapshot captures command candidates allowlist status arguments working directory timeout evidence and denied commands",
      "Denied command memory paths remain blocked",
      "Command memory snapshot checklist",
    ],
    sectionIds: ["command-memory-snapshot", "evidence-memory-packet", "denied-memory-boundaries"],
    devOnly: true,
  },
  {
    slug: "approval-memory-snapshot-preview",
    href: "/approval-memory-snapshot-preview",
    phase: "Phase 1456",
    title: "Approval memory snapshot preview",
    commandLabel: "Go to Approval Memory Snapshot Preview",
    summary: "Approval memory snapshot preview captures approval scope without persisting approvals.",
    markerPhrases: [
      "Approval memory snapshot preview",
      "Approval memory snapshot preview does not persist approvals",
      "Approval memory snapshot preview requires explicit human approval before promotion",
      "Approval memory snapshot captures approval scope expiry operator identity files commands model tool needs risk level and denied paths",
      "Denied approval memory paths remain blocked",
      "Approval memory snapshot checklist",
    ],
    sectionIds: ["approval-memory-snapshot", "memory-promotion-review", "denied-memory-boundaries"],
    devOnly: true,
  },
  {
    slug: "evidence-memory-packet",
    href: "/evidence-memory-packet",
    phase: "Phase 1457",
    title: "Evidence memory packet",
    commandLabel: "Go to Evidence Memory Packet",
    summary: "Evidence memory packet captures reviewable evidence references without UI persistence.",
    markerPhrases: [
      "Evidence memory packet",
      "Evidence memory packet does not persist evidence from the UI",
      "Evidence memory packet requires explicit operator approval before promotion",
      "Evidence memory packet captures diff command stdout stderr exit code approval result audit recovery and model tool evidence references",
      "Denied evidence memory packet paths remain blocked",
      "Evidence memory packet checklist",
    ],
    sectionIds: ["evidence-memory-packet", "result-memory-packet", "audit-memory-packet"],
    devOnly: true,
  },
  {
    slug: "result-memory-packet",
    href: "/result-memory-packet",
    phase: "Phase 1458",
    title: "Result memory packet",
    commandLabel: "Go to Result Memory Packet",
    summary: "Result memory packet captures important result states without UI persistence.",
    markerPhrases: [
      "Result memory packet",
      "Result memory packet does not persist results from the UI",
      "Result memory packet requires explicit operator approval before promotion",
      "Result memory packet captures success blocked denied failed timeout manual-review retryable recovered and operator-accepted outcomes",
      "Denied result memory paths remain blocked",
      "Result memory packet checklist",
    ],
    sectionIds: ["result-memory-packet", "evidence-memory-packet", "recovery-memory-packet"],
    devOnly: true,
  },
  {
    slug: "recovery-memory-packet",
    href: "/recovery-memory-packet",
    phase: "Phase 1459",
    title: "Recovery memory packet",
    commandLabel: "Go to Recovery Memory Packet",
    summary: "Recovery memory packet captures recovery options without executing recovery.",
    markerPhrases: [
      "Recovery memory packet",
      "Recovery memory packet does not execute recovery",
      "Recovery memory packet requires explicit operator approval before promotion",
      "Recovery memory packet captures rollback retry restore stop explain-failure manual-review safety-stop and partial-recovery options",
      "Denied recovery memory paths remain blocked",
      "Recovery memory packet checklist",
    ],
    sectionIds: ["recovery-memory-packet", "result-memory-packet", "denied-memory-boundaries"],
    devOnly: true,
  },
  {
    slug: "audit-memory-packet",
    href: "/audit-memory-packet",
    phase: "Phase 1460",
    title: "Audit memory packet",
    commandLabel: "Go to Audit Memory Packet",
    summary: "Audit memory packet captures audit timeline records without UI persistence.",
    markerPhrases: [
      "Audit memory packet",
      "Audit memory packet does not persist audit logs from the UI",
      "Audit memory packet requires explicit operator approval before promotion",
      "Audit memory packet captures goal context plan diff command approval evidence result recovery model tool operator and denied-path records",
      "Denied audit memory paths remain blocked",
      "Audit memory packet checklist",
    ],
    sectionIds: ["audit-memory-packet", "evidence-memory-packet", "denied-memory-boundaries"],
    devOnly: true,
  },
  {
    slug: "denied-memory-boundary",
    href: "/denied-memory-boundary",
    phase: "Phase 1461",
    title: "Denied memory boundary",
    commandLabel: "Go to Denied Memory Boundary",
    summary: "Denied memory boundary blocks sensitive and hidden memory paths.",
    markerPhrases: [
      "Denied memory boundary",
      "Denied memory boundary does not mutate memory state",
      "Denied memory boundary requires explicit operator approval before promotion",
      "Denied memory boundary blocks secrets environment values credentials tokens private keys arbitrary files hidden approvals hidden memory provider payloads connector payloads and automatic promotion",
      "Denied memory paths remain blocked",
      "Denied memory checklist",
    ],
    sectionIds: ["denied-memory-boundaries", "memory-promotion-review", "approval-memory-snapshot"],
    devOnly: true,
  },
  {
    slug: "memory-promotion-review",
    href: "/memory-promotion-review",
    phase: "Phase 1462",
    title: "Memory promotion review",
    commandLabel: "Go to Memory Promotion Review",
    summary: "Memory promotion review shows scoped promotion requirements without automatic promotion.",
    markerPhrases: [
      "Memory promotion review",
      "Memory promotion review does not promote memory automatically",
      "Memory promotion review requires explicit operator approval",
      "Memory promotion review shows proposed memory scope retention risk redaction evidence support operator approval and rollback implications",
      "Denied memory promotion paths remain blocked",
      "Memory promotion checklist",
    ],
    sectionIds: ["memory-promotion-review", "denied-memory-boundaries", "evidence-memory-packet"],
    devOnly: true,
  },
  {
    slug: "cockpit-evidence-memory-summary",
    href: "/cockpit-evidence-memory-summary",
    phase: "Phase 1463",
    title: "Cockpit evidence memory summary",
    commandLabel: "Go to Cockpit Evidence Memory Summary",
    summary: "Cockpit evidence memory summary keeps the cockpit as the normal user surface.",
    markerPhrases: [
      "Cockpit evidence memory summary",
      "Cockpit evidence memory summary keeps the cockpit as the normal user surface",
      "Cockpit evidence memory summary does not persist memory from the cockpit",
      "Cockpit evidence memory summary shows remembered goal context plan files commands approval evidence result recovery audit and denied memory",
      "Phase pages remain dev test diagnostics only",
      "Cockpit evidence memory checklist",
    ],
    sectionIds: ALL_SECTIONS.map((section) => section.id),
    devOnly: true,
  },
  {
    slug: "first-evidence-memory-candidate",
    href: "/first-evidence-memory-candidate",
    phase: "Phase 1464",
    title: "First evidence memory candidate",
    commandLabel: "Go to First Evidence Memory Candidate",
    summary: "First evidence memory candidate combines the complete reviewable evidence memory shape.",
    markerPhrases: [
      "First evidence memory candidate",
      "First evidence memory candidate does not persist memory automatically",
      "First evidence memory candidate requires explicit operator approval",
      "Candidate combines goal context plan diff command approval evidence result recovery audit denied memory and promotion review",
      "Denied first evidence memory paths remain blocked",
      "First evidence memory checklist",
    ],
    sectionIds: ALL_SECTIONS.map((section) => section.id),
    devOnly: true,
  },
  {
    slug: "controlled-evidence-memory-release-candidate",
    href: "/controlled-evidence-memory-release-candidate",
    phase: "Phase 1465",
    title: "Controlled evidence memory release candidate",
    commandLabel: "Go to Controlled Evidence Memory Release Candidate",
    summary: "Controlled evidence memory release candidate prepares backend-owned evidence memory without hidden persistence.",
    markerPhrases: [
      "Controlled evidence memory release candidate",
      "Controlled evidence memory release candidate does not call models providers connectors write files apply diffs run commands persist approvals create queues persist evidence results audit promote memory or write browser storage from the frontend",
      "Controlled evidence memory release requires explicit operator approval",
      "Release candidate prepares CodexForge for backend-owned evidence memory without hidden persistence",
      "Denied controlled evidence memory paths remain blocked",
      "Controlled evidence memory release checklist",
    ],
    sectionIds: ALL_SECTIONS.map((section) => section.id),
    devOnly: true,
  },
] as const;

export function buildEvidenceMemoryV1StableKey(parts: readonly string[]): string {
  return parts.join(":").toLowerCase().replace(/[^a-z0-9:/-]+/g, "-");
}

export function listEvidenceMemoryRouteDefinitions(): readonly EvidenceMemoryRouteDefinition[] {
  return ROUTES;
}

export function getEvidenceMemoryRouteDefinition(slug: EvidenceMemoryRouteSlug): EvidenceMemoryRouteDefinition {
  return ROUTES.find((candidate) => candidate.slug === slug) ?? ROUTES[0];
}

export function buildEvidenceMemoryModel(): EvidenceMemoryModel {
  return EVIDENCE_MEMORY;
}

export function buildEvidenceMemoryRouteModel(
  slug: EvidenceMemoryRouteSlug = "codexforge-cockpit"
): EvidenceMemoryRouteModel {
  const route = getEvidenceMemoryRouteDefinition(slug);
  const sections = route.sectionIds
    .map((sectionId) => ALL_SECTIONS.find((section) => section.id === sectionId))
    .filter((section): section is EvidenceMemorySection => Boolean(section));

  return {
    route,
    memory: EVIDENCE_MEMORY,
    sections: sections.length > 0 ? sections : ALL_SECTIONS,
    diagnosticRoutes: ROUTES.filter((candidate) => candidate.devOnly),
    cockpitMarkers: EVIDENCE_MEMORY_COCKPIT_MARKERS,
    summary: summarizeEvidenceMemoryRoute(route),
  };
}

export function summarizeEvidenceMemoryRouteModel(model: EvidenceMemoryRouteModel): string {
  return [
    model.route.phase,
    model.route.title,
    model.route.summary,
    model.memory.evidenceMemoryId,
    "cockpit is the normal user surface",
    "phase pages remain dev test diagnostics only",
    "broad execution still blocked",
    "automatic memory promotion still blocked",
  ].join(" | ");
}

function summarizeEvidenceMemoryRoute(route: EvidenceMemoryRouteDefinition): string {
  return [route.phase, route.title, route.summary, "Explicit operator approval remains required"].join(" | ");
}
