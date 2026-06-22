export type DailyTestableCockpitMvpRouteSlug =
  | "codexforge-cockpit"
  | "daily-testable-cockpit-boundary"
  | "cockpit-goal-composer-polish"
  | "cockpit-plan-summary-polish"
  | "cockpit-diff-preview-polish"
  | "cockpit-command-preview-polish"
  | "cockpit-approval-gate-polish"
  | "cockpit-execution-state-polish"
  | "cockpit-evidence-result-recovery-polish"
  | "cockpit-audit-timeline-polish"
  | "cockpit-safety-coach-polish"
  | "cockpit-dev-diagnostics-drawer-polish"
  | "cockpit-empty-loading-error-polish"
  | "cockpit-copy-trust-polish"
  | "cockpit-daily-test-checklist"
  | "first-daily-testable-cockpit-mvp-candidate"
  | "controlled-daily-testable-cockpit-mvp-release-candidate";

export type DailyTestableCockpitMvpKind =
  | "daily-testable-cockpit-mvp"
  | "daily-testable-cockpit-boundary"
  | "cockpit-goal-composer"
  | "cockpit-plan-summary"
  | "cockpit-diff-preview"
  | "cockpit-command-preview"
  | "cockpit-approval-gate"
  | "cockpit-execution-state"
  | "cockpit-evidence-result-recovery"
  | "cockpit-audit-timeline"
  | "cockpit-safety-coach"
  | "cockpit-dev-diagnostics-drawer"
  | "cockpit-empty-loading-error"
  | "cockpit-copy-trust"
  | "cockpit-daily-test-checklist"
  | "daily-testable-cockpit-mvp-candidate"
  | "daily-testable-cockpit-mvp-release-candidate";

export type DailyTestableCockpitMvpState =
  | "preview-held"
  | "approval-required"
  | "backend-owned"
  | "blocked"
  | "dev-diagnostics"
  | "daily-ready";

export type DailyTestableCockpitMvpChecklistItem = {
  id: string;
  label: string;
  detail: string;
  state: DailyTestableCockpitMvpState;
};

export type DailyTestableCockpitMvpSection = {
  id: string;
  label: string;
  title: string;
  state: DailyTestableCockpitMvpState;
  summary: string;
  operatorCopy: string;
  checklist: readonly DailyTestableCockpitMvpChecklistItem[];
  evidence: readonly string[];
};

export type DailyTestableCockpitMvpReleaseReadiness = {
  title: string;
  summary: string;
  checklist: readonly DailyTestableCockpitMvpChecklistItem[];
};

export type DailyTestableCockpitMvpModel = {
  cockpitMvpId: string;
  cockpitMvpKind: DailyTestableCockpitMvpKind;
  goalComposer: DailyTestableCockpitMvpSection;
  planSummary: DailyTestableCockpitMvpSection;
  diffPreview: DailyTestableCockpitMvpSection;
  commandPreview: DailyTestableCockpitMvpSection;
  approvalGate: DailyTestableCockpitMvpSection;
  executionState: DailyTestableCockpitMvpSection;
  evidenceResultRecovery: DailyTestableCockpitMvpSection;
  auditTimeline: DailyTestableCockpitMvpSection;
  safetyCoach: DailyTestableCockpitMvpSection;
  devDiagnosticsDrawer: DailyTestableCockpitMvpSection;
  emptyLoadingErrorStates: DailyTestableCockpitMvpSection;
  trustCopy: readonly string[];
  dailyTestChecklist: readonly DailyTestableCockpitMvpChecklistItem[];
  releaseReadiness: DailyTestableCockpitMvpReleaseReadiness;
  explicitSafetyLimits: readonly string[];
};

export type DailyTestableCockpitMvpRouteDefinition = {
  slug: DailyTestableCockpitMvpRouteSlug;
  href: string;
  phase: string;
  title: string;
  commandLabel: string;
  summary: string;
  markerPhrases: readonly string[];
  sectionIds: readonly string[];
  devOnly: boolean;
};

export type DailyTestableCockpitMvpRouteModel = {
  route: DailyTestableCockpitMvpRouteDefinition;
  cockpitMvp: DailyTestableCockpitMvpModel;
  sections: readonly DailyTestableCockpitMvpSection[];
  diagnosticRoutes: readonly DailyTestableCockpitMvpRouteDefinition[];
  cockpitMarkers: readonly string[];
  summary: string;
};

export const DAILY_TESTABLE_COCKPIT_MVP_COCKPIT_MARKERS = [
  "Daily-testable cockpit MVP",
  "Goal",
  "Plan",
  "Files",
  "Commands",
  "Approval",
  "Run State",
  "Evidence",
  "Result",
  "Recovery",
  "Timeline",
  "Safety",
  "Diagnostics",
  "One cockpit for normal users",
  "Phase pages are dev test diagnostics only",
  "No broad execution from the cockpit",
  "No direct file mutation from the cockpit",
  "No direct command execution from the cockpit",
  "No direct recovery execution from the cockpit",
  "Backend-owned guarded execution remains required",
  "Explicit operator approval remains required",
] as const;

const EXPLICIT_SAFETY_LIMITS = [
  "/codexforge-cockpit is the normal-user surface.",
  "Phase pages are dev/test diagnostics only.",
  "Cockpit MVP polish does not broaden execution.",
  "The frontend cockpit cannot directly mutate files.",
  "The frontend cockpit cannot directly run commands.",
  "Explicit operator approval remains required.",
  "Backend-owned guarded execution remains required.",
  "Broad execution remains blocked.",
  "Recovery, rollback, and retry remain approval-gated.",
  "Model/provider/connector calls remain blocked unless explicitly approved in a future provider-gated flow.",
  "No hidden approvals.",
  "No approval persistence from the UI.",
  "No queue persistence from the UI.",
  "Evidence, result, and audit persistence remain backend-owned future capture.",
  "No runtime starts, process spawning, port binding, deployment, install, secret reads, or automatic memory promotion.",
] as const;

const GOAL_COMPOSER: DailyTestableCockpitMvpSection = {
  id: "goal-composer",
  label: "Goal",
  title: "Goal composer",
  state: "preview-held",
  summary: "One plain goal box keeps operator intent visible before planning.",
  operatorCopy:
    "Goal intake is a draft. It does not call models and it cannot start backend-owned guarded execution.",
  checklist: [
    {
      id: "goal-one-box",
      label: "One goal box",
      detail: "The operator can read the goal without navigating phase pages.",
      state: "daily-ready",
    },
    {
      id: "goal-no-model-call",
      label: "No model call",
      detail: "Goal composer keeps goal intake separate from backend-owned guarded execution.",
      state: "blocked",
    },
  ],
  evidence: ["goal draft", "operator intent", "approval still required"],
};

const PLAN_SUMMARY: DailyTestableCockpitMvpSection = {
  id: "plan-summary",
  label: "Plan",
  title: "Plan summary",
  state: "preview-held",
  summary: "Plan shows the expected steps, risks, files, commands, approval, and evidence expectations.",
  operatorCopy:
    "Plan summary is review-only. It does not execute plans and it cannot release apply or run behavior.",
  checklist: [
    {
      id: "plan-plain-summary",
      label: "Plain plan",
      detail: "The cockpit shows the operator what would happen before any approval.",
      state: "daily-ready",
    },
    {
      id: "plan-execution-blocked",
      label: "Execution blocked",
      detail: "No direct execution from the plan summary.",
      state: "blocked",
    },
  ],
  evidence: ["step outline", "risk summary", "expected evidence"],
};

const DIFF_PREVIEW: DailyTestableCockpitMvpSection = {
  id: "diff-preview",
  label: "Files",
  title: "Files preview",
  state: "blocked",
  summary: "File changes show path guard status, rollback readiness, and denied paths before approval.",
  operatorCopy:
    "Files are preview-only. The cockpit cannot write files, apply diffs, or broaden path scope.",
  checklist: [
    {
      id: "files-guard-status",
      label: "Path guard visible",
      detail: "Allowed and denied paths are shown as operator review copy.",
      state: "backend-owned",
    },
    {
      id: "files-no-mutation",
      label: "No file mutation",
      detail: "No direct file mutation from the diff preview.",
      state: "blocked",
    },
  ],
  evidence: ["proposed paths", "denied paths", "rollback readiness"],
};

const COMMAND_PREVIEW: DailyTestableCockpitMvpSection = {
  id: "command-preview",
  label: "Commands",
  title: "Command preview",
  state: "blocked",
  summary:
    "Command preview shows allowlist status, arguments, working directory, timeout, stdout, stderr, and evidence expectations.",
  operatorCopy:
    "Commands are preview-only. The cockpit cannot run commands or start local runtime behavior.",
  checklist: [
    {
      id: "commands-allowlist",
      label: "Allowlist visible",
      detail: "Arguments, working directory, and timeout are shown before approval.",
      state: "backend-owned",
    },
    {
      id: "commands-no-run",
      label: "No command execution",
      detail: "No direct command execution from the command preview.",
      state: "blocked",
    },
  ],
  evidence: ["allowlist status", "stdout expectation", "stderr expectation"],
};

const APPROVAL_GATE: DailyTestableCockpitMvpSection = {
  id: "approval-gate",
  label: "Approval",
  title: "Approval gate",
  state: "approval-required",
  summary: "Approval shows scope, expiry, operator identity, backend authorization, and denied paths.",
  operatorCopy:
    "Approval is explicit and human-owned. The cockpit does not persist hidden approvals.",
  checklist: [
    {
      id: "approval-human",
      label: "Human approval",
      detail: "Explicit operator approval remains required before future execution.",
      state: "approval-required",
    },
    {
      id: "approval-no-hidden",
      label: "No hidden approval",
      detail: "No hidden approval from the cockpit.",
      state: "blocked",
    },
  ],
  evidence: ["scope", "expiry", "operator identity"],
};

const EXECUTION_STATE: DailyTestableCockpitMvpSection = {
  id: "execution-state",
  label: "Run State",
  title: "Run state",
  state: "backend-owned",
  summary:
    "Run state shows preview blocked approved queued applying running completed failed stopped manual-review and recovered states.",
  operatorCopy:
    "Run state is displayed from a guarded contract. The cockpit does not release execution from the frontend.",
  checklist: [
    {
      id: "run-state-full-list",
      label: "State list visible",
      detail: "The operator can see blocked, approved, running, failed, stopped, review, and recovered states.",
      state: "daily-ready",
    },
    {
      id: "run-state-no-ui-mutation",
      label: "No state mutation",
      detail: "No direct execution state mutation from the cockpit.",
      state: "blocked",
    },
  ],
  evidence: ["state timeline", "backend-owned guard", "manual review state"],
};

const EVIDENCE_RESULT_RECOVERY: DailyTestableCockpitMvpSection = {
  id: "evidence-result-recovery",
  label: "Evidence",
  title: "Evidence, result, and recovery",
  state: "approval-required",
  summary:
    "Evidence, result, and recovery show capture expectations, result states, recovery options, rollback readiness, retry readiness, and manual review.",
  operatorCopy:
    "Recovery is never executed from the cockpit. Rollback, retry, and recovery remain approval-gated.",
  checklist: [
    {
      id: "evidence-result-visible",
      label: "Evidence and result visible",
      detail: "Expected evidence and result states are shown without UI persistence.",
      state: "backend-owned",
    },
    {
      id: "recovery-no-execute",
      label: "No recovery execution",
      detail: "No direct recovery execution from the cockpit.",
      state: "blocked",
    },
  ],
  evidence: ["Evidence", "Result", "Recovery"],
};

const AUDIT_TIMELINE: DailyTestableCockpitMvpSection = {
  id: "audit-timeline",
  label: "Timeline",
  title: "Timeline",
  state: "backend-owned",
  summary:
    "Timeline shows goal, plan, diff, command, approval, evidence, result, recovery, operator, and denied-path records.",
  operatorCopy:
    "Audit capture remains backend-owned future capture. The cockpit does not persist audit logs from the UI.",
  checklist: [
    {
      id: "timeline-records",
      label: "Audit records visible",
      detail: "Operator-facing timeline labels every expected record type.",
      state: "daily-ready",
    },
    {
      id: "timeline-no-persistence",
      label: "No UI audit persistence",
      detail: "No direct audit persistence from the cockpit.",
      state: "blocked",
    },
  ],
  evidence: ["goal record", "approval record", "denied-path record"],
};

const SAFETY_COACH: DailyTestableCockpitMvpSection = {
  id: "safety-coach",
  label: "Safety",
  title: "Safety coach",
  state: "approval-required",
  summary:
    "Safety explains risk level, denied paths, approval scope, backend guard requirements, and recovery readiness.",
  operatorCopy:
    "Safety guidance cannot bypass approval, path guards, command guards, backend ownership, or recovery gates.",
  checklist: [
    {
      id: "safety-risk-visible",
      label: "Risk visible",
      detail: "The operator can see what is safe, blocked, and approval-gated.",
      state: "daily-ready",
    },
    {
      id: "safety-no-bypass",
      label: "No safety bypass",
      detail: "No safety bypass from the cockpit.",
      state: "blocked",
    },
  ],
  evidence: ["risk level", "approval scope", "backend guard requirement"],
};

const DEV_DIAGNOSTICS_DRAWER: DailyTestableCockpitMvpSection = {
  id: "dev-diagnostics-drawer",
  label: "Diagnostics",
  title: "Diagnostics drawer",
  state: "dev-diagnostics",
  summary: "Diagnostics link smoke-backed phase routes without replacing the cockpit.",
  operatorCopy:
    "Phase pages remain dev test diagnostics only. Normal users should stay in /codexforge-cockpit.",
  checklist: [
    {
      id: "diagnostics-links",
      label: "Smoke-backed links",
      detail: "The drawer links this daily-testable MVP batch for development review.",
      state: "dev-diagnostics",
    },
    {
      id: "diagnostics-not-navigation-maze",
      label: "Not normal navigation",
      detail: "Cockpit dev diagnostics drawer polish does not broaden normal user navigation.",
      state: "blocked",
    },
  ],
  evidence: ["dev route list", "smoke-backed markers", "cockpit-first copy"],
};

const EMPTY_LOADING_ERROR_STATES: DailyTestableCockpitMvpSection = {
  id: "empty-loading-error-states",
  label: "Status",
  title: "Empty, loading, and error states",
  state: "preview-held",
  summary: "Status states explain what is known, what is blocked, what needs approval, and what remains safe.",
  operatorCopy:
    "Fallback states do not execute actions and do not trigger automatic recovery from empty, loading, or error states.",
  checklist: [
    {
      id: "states-plain",
      label: "Plain status",
      detail: "The cockpit explains empty, loading, blocked, and error states without implying execution.",
      state: "daily-ready",
    },
    {
      id: "states-no-auto-recovery",
      label: "No automatic recovery",
      detail: "No automatic recovery from empty loading or error states.",
      state: "blocked",
    },
  ],
  evidence: ["empty state", "loading state", "error state"],
};

const TRUST_COPY = [
  "One cockpit for normal users.",
  "The cockpit holds previews until approval.",
  "Approved does not mean executed from the frontend.",
  "Blocked means the guard is working.",
  "Backend-owned guarded execution remains required.",
  "Phase pages are dev test diagnostics only.",
] as const;

const DAILY_TEST_CHECKLIST: readonly DailyTestableCockpitMvpChecklistItem[] = [
  {
    id: "daily-goal",
    label: "Goal",
    detail: "One goal is readable without phase-page navigation.",
    state: "daily-ready",
  },
  {
    id: "daily-plan",
    label: "Plan",
    detail: "Plan, files, commands, approval, and evidence expectations are visible.",
    state: "daily-ready",
  },
  {
    id: "daily-approval",
    label: "Approval",
    detail: "Explicit operator approval remains required.",
    state: "approval-required",
  },
  {
    id: "daily-execution",
    label: "Run State",
    detail: "Run state remains backend-owned and guarded.",
    state: "backend-owned",
  },
  {
    id: "daily-recovery",
    label: "Recovery",
    detail: "Recovery, rollback, and retry remain approval-gated.",
    state: "approval-required",
  },
  {
    id: "daily-diagnostics",
    label: "Diagnostics",
    detail: "Phase routes stay in the dev diagnostics drawer.",
    state: "dev-diagnostics",
  },
];

const RELEASE_READINESS: DailyTestableCockpitMvpReleaseReadiness = {
  title: "Daily MVP readiness",
  summary:
    "First daily-testable cockpit MVP candidate is ready for static review when every card is visible, approval-gated, and blocked from frontend execution.",
  checklist: [
    {
      id: "readiness-cockpit-first",
      label: "Cockpit first",
      detail: "/codexforge-cockpit is the normal-user surface.",
      state: "daily-ready",
    },
    {
      id: "readiness-diagnostics-only",
      label: "Diagnostics only",
      detail: "Phase pages remain dev test diagnostics only.",
      state: "dev-diagnostics",
    },
    {
      id: "readiness-execution-blocked",
      label: "Broad execution blocked",
      detail: "No broad execution from the cockpit.",
      state: "blocked",
    },
  ],
};

const COCKPIT_MVP: DailyTestableCockpitMvpModel = {
  cockpitMvpId: "codexforge-daily-testable-cockpit-mvp-1386-1401",
  cockpitMvpKind: "daily-testable-cockpit-mvp",
  goalComposer: GOAL_COMPOSER,
  planSummary: PLAN_SUMMARY,
  diffPreview: DIFF_PREVIEW,
  commandPreview: COMMAND_PREVIEW,
  approvalGate: APPROVAL_GATE,
  executionState: EXECUTION_STATE,
  evidenceResultRecovery: EVIDENCE_RESULT_RECOVERY,
  auditTimeline: AUDIT_TIMELINE,
  safetyCoach: SAFETY_COACH,
  devDiagnosticsDrawer: DEV_DIAGNOSTICS_DRAWER,
  emptyLoadingErrorStates: EMPTY_LOADING_ERROR_STATES,
  trustCopy: TRUST_COPY,
  dailyTestChecklist: DAILY_TEST_CHECKLIST,
  releaseReadiness: RELEASE_READINESS,
  explicitSafetyLimits: EXPLICIT_SAFETY_LIMITS,
};

const ALL_SECTIONS = [
  GOAL_COMPOSER,
  PLAN_SUMMARY,
  DIFF_PREVIEW,
  COMMAND_PREVIEW,
  APPROVAL_GATE,
  EXECUTION_STATE,
  EVIDENCE_RESULT_RECOVERY,
  AUDIT_TIMELINE,
  SAFETY_COACH,
  DEV_DIAGNOSTICS_DRAWER,
  EMPTY_LOADING_ERROR_STATES,
] as const;

const ROUTES: readonly DailyTestableCockpitMvpRouteDefinition[] = [
  {
    slug: "codexforge-cockpit",
    href: "/codexforge-cockpit",
    phase: "Daily MVP",
    title: "Daily-testable cockpit MVP",
    commandLabel: "Go to Unified CodexForge Cockpit",
    summary: "One cockpit for normal users with goal, plan, files, commands, approval, run state, evidence, result, recovery, timeline, safety, and diagnostics.",
    markerPhrases: DAILY_TESTABLE_COCKPIT_MVP_COCKPIT_MARKERS,
    sectionIds: ALL_SECTIONS.map((section) => section.id),
    devOnly: false,
  },
  {
    slug: "daily-testable-cockpit-boundary",
    href: "/daily-testable-cockpit-boundary",
    phase: "Phase 1386",
    title: "Daily-testable cockpit boundary",
    commandLabel: "Go to Daily-Testable Cockpit Boundary",
    summary: "Daily-testable boundary keeps the cockpit as the normal user surface.",
    markerPhrases: [
      "Daily-testable cockpit boundary",
      "Daily-testable cockpit boundary keeps the cockpit as the normal user surface",
      "Daily-testable cockpit boundary does not broaden execution",
      "Daily-testable cockpit requires explicit operator approval",
      "Phase pages remain dev test diagnostics only",
      "Daily-testable cockpit checklist",
    ],
    sectionIds: ["goal-composer", "approval-gate", "dev-diagnostics-drawer"],
    devOnly: true,
  },
  {
    slug: "cockpit-goal-composer-polish",
    href: "/cockpit-goal-composer-polish",
    phase: "Phase 1387",
    title: "Cockpit goal composer polish",
    commandLabel: "Go to Cockpit Goal Composer Polish",
    summary: "Goal composer keeps goal intake separate from execution.",
    markerPhrases: [
      "Cockpit goal composer polish",
      "Cockpit goal composer polish does not call models",
      "Cockpit goal composer polish requires explicit operator approval before execution",
      "Goal composer keeps goal intake separate from backend-owned guarded execution",
      "No direct execution from the goal composer",
      "Cockpit goal composer checklist",
    ],
    sectionIds: ["goal-composer", "approval-gate", "safety-coach"],
    devOnly: true,
  },
  {
    slug: "cockpit-plan-summary-polish",
    href: "/cockpit-plan-summary-polish",
    phase: "Phase 1388",
    title: "Cockpit plan summary polish",
    commandLabel: "Go to Cockpit Plan Summary Polish",
    summary: "Plan summary shows goal steps risks files commands approval and evidence expectations.",
    markerPhrases: [
      "Cockpit plan summary polish",
      "Cockpit plan summary polish does not execute plans",
      "Cockpit plan summary polish requires explicit operator approval before execution",
      "Plan summary shows goal steps risks files commands approval and evidence expectations",
      "No direct execution from the plan summary",
      "Cockpit plan summary checklist",
    ],
    sectionIds: ["plan-summary", "diff-preview", "command-preview", "approval-gate"],
    devOnly: true,
  },
  {
    slug: "cockpit-diff-preview-polish",
    href: "/cockpit-diff-preview-polish",
    phase: "Phase 1389",
    title: "Cockpit diff preview polish",
    commandLabel: "Go to Cockpit Diff Preview Polish",
    summary: "Diff preview shows file changes without writing files.",
    markerPhrases: [
      "Cockpit diff preview polish",
      "Cockpit diff preview polish does not write files or apply diffs",
      "Cockpit diff preview polish requires explicit operator approval",
      "Diff preview shows proposed file changes path guard status rollback readiness and denied paths",
      "No direct file mutation from the diff preview",
      "Cockpit diff preview checklist",
    ],
    sectionIds: ["diff-preview", "approval-gate", "evidence-result-recovery"],
    devOnly: true,
  },
  {
    slug: "cockpit-command-preview-polish",
    href: "/cockpit-command-preview-polish",
    phase: "Phase 1390",
    title: "Cockpit command preview polish",
    commandLabel: "Go to Cockpit Command Preview Polish",
    summary: "Command preview shows command readiness without running commands.",
    markerPhrases: [
      "Cockpit command preview polish",
      "Cockpit command preview polish does not run commands",
      "Cockpit command preview polish requires explicit operator approval",
      "Command preview shows allowlist status arguments working directory timeout stdout stderr and evidence expectations",
      "No direct command execution from the command preview",
      "Cockpit command preview checklist",
    ],
    sectionIds: ["command-preview", "approval-gate", "execution-state"],
    devOnly: true,
  },
  {
    slug: "cockpit-approval-gate-polish",
    href: "/cockpit-approval-gate-polish",
    phase: "Phase 1391",
    title: "Cockpit approval gate polish",
    commandLabel: "Go to Cockpit Approval Gate Polish",
    summary: "Approval gate shows scope and human approval boundaries.",
    markerPhrases: [
      "Cockpit approval gate polish",
      "Cockpit approval gate polish does not persist hidden approvals",
      "Cockpit approval gate polish requires explicit human approval",
      "Approval gate shows scope expiry operator identity backend authorization and denied paths",
      "No hidden approval from the cockpit",
      "Cockpit approval gate checklist",
    ],
    sectionIds: ["approval-gate", "safety-coach", "audit-timeline"],
    devOnly: true,
  },
  {
    slug: "cockpit-execution-state-polish",
    href: "/cockpit-execution-state-polish",
    phase: "Phase 1392",
    title: "Cockpit execution state polish",
    commandLabel: "Go to Cockpit Execution State Polish",
    summary: "Execution state remains backend-owned and guarded.",
    markerPhrases: [
      "Cockpit execution state polish",
      "Cockpit execution state polish does not release execution from the frontend",
      "Cockpit execution state polish requires backend-owned guarded execution",
      "Execution state shows preview blocked approved queued applying running completed failed stopped manual-review and recovered states",
      "No direct execution state mutation from the cockpit",
      "Cockpit execution state checklist",
    ],
    sectionIds: ["execution-state", "approval-gate", "audit-timeline"],
    devOnly: true,
  },
  {
    slug: "cockpit-evidence-result-recovery-polish",
    href: "/cockpit-evidence-result-recovery-polish",
    phase: "Phase 1393",
    title: "Cockpit evidence result recovery polish",
    commandLabel: "Go to Cockpit Evidence Result Recovery Polish",
    summary: "Evidence, result, and recovery remain preview-only and approval-gated.",
    markerPhrases: [
      "Cockpit evidence result recovery polish",
      "Cockpit evidence result recovery polish does not persist evidence results or execute recovery from the UI",
      "Cockpit evidence result recovery polish requires explicit operator approval",
      "Evidence result recovery shows evidence capture result states recovery options rollback readiness retry readiness and manual review",
      "No direct recovery execution from the cockpit",
      "Cockpit evidence result recovery checklist",
    ],
    sectionIds: ["evidence-result-recovery", "approval-gate", "safety-coach"],
    devOnly: true,
  },
  {
    slug: "cockpit-audit-timeline-polish",
    href: "/cockpit-audit-timeline-polish",
    phase: "Phase 1394",
    title: "Cockpit audit timeline polish",
    commandLabel: "Go to Cockpit Audit Timeline Polish",
    summary: "Timeline shows audit expectations without UI audit persistence.",
    markerPhrases: [
      "Cockpit audit timeline polish",
      "Cockpit audit timeline polish does not persist audit logs from the UI",
      "Cockpit audit timeline polish requires backend-owned audit capture",
      "Audit timeline shows goal plan diff command approval evidence result recovery operator and denied-path records",
      "No direct audit persistence from the cockpit",
      "Cockpit audit timeline checklist",
    ],
    sectionIds: ["audit-timeline", "approval-gate", "dev-diagnostics-drawer"],
    devOnly: true,
  },
  {
    slug: "cockpit-safety-coach-polish",
    href: "/cockpit-safety-coach-polish",
    phase: "Phase 1395",
    title: "Cockpit safety coach polish",
    commandLabel: "Go to Cockpit Safety Coach Polish",
    summary: "Safety coach explains risk without executing actions.",
    markerPhrases: [
      "Cockpit safety coach polish",
      "Cockpit safety coach polish does not execute actions",
      "Cockpit safety coach polish requires explicit operator approval before execution",
      "Safety coach explains risk level denied paths approval scope backend guard requirements and recovery readiness",
      "No safety bypass from the cockpit",
      "Cockpit safety coach checklist",
    ],
    sectionIds: ["safety-coach", "approval-gate", "evidence-result-recovery"],
    devOnly: true,
  },
  {
    slug: "cockpit-dev-diagnostics-drawer-polish",
    href: "/cockpit-dev-diagnostics-drawer-polish",
    phase: "Phase 1396",
    title: "Cockpit dev diagnostics drawer polish",
    commandLabel: "Go to Cockpit Dev Diagnostics Drawer Polish",
    summary: "Diagnostics drawer keeps phase pages as diagnostics only.",
    markerPhrases: [
      "Cockpit dev diagnostics drawer polish",
      "Cockpit dev diagnostics drawer polish keeps phase pages as diagnostics only",
      "Cockpit dev diagnostics drawer polish does not broaden normal user navigation",
      "Diagnostics drawer links smoke-backed routes without replacing the cockpit",
      "Phase pages remain dev test diagnostics only",
      "Cockpit dev diagnostics drawer checklist",
    ],
    sectionIds: ["dev-diagnostics-drawer", "safety-coach", "audit-timeline"],
    devOnly: true,
  },
  {
    slug: "cockpit-empty-loading-error-polish",
    href: "/cockpit-empty-loading-error-polish",
    phase: "Phase 1397",
    title: "Cockpit empty loading error polish",
    commandLabel: "Go to Cockpit Empty Loading Error Polish",
    summary: "Empty loading error states explain safety without fallback execution.",
    markerPhrases: [
      "Cockpit empty loading error polish",
      "Cockpit empty loading error polish does not execute fallback actions",
      "Cockpit empty loading error polish requires explicit operator approval before execution",
      "Empty loading error states explain what is known what is blocked what needs approval and what remains safe",
      "No automatic recovery from empty loading or error states",
      "Cockpit empty loading error checklist",
    ],
    sectionIds: ["empty-loading-error-states", "approval-gate", "safety-coach"],
    devOnly: true,
  },
  {
    slug: "cockpit-copy-trust-polish",
    href: "/cockpit-copy-trust-polish",
    phase: "Phase 1398",
    title: "Cockpit copy trust polish",
    commandLabel: "Go to Cockpit Copy Trust Polish",
    summary: "Trust copy states preview, approval, blocked, backend-owned, and recovery-gated states plainly.",
    markerPhrases: [
      "Cockpit copy trust polish",
      "Cockpit copy trust polish does not overclaim execution",
      "Cockpit copy trust polish requires explicit operator approval before execution",
      "Trust copy clearly states preview held approved blocked backend-owned and recovery-gated states",
      "No misleading execution claims from the cockpit",
      "Cockpit copy trust checklist",
    ],
    sectionIds: ["goal-composer", "plan-summary", "safety-coach"],
    devOnly: true,
  },
  {
    slug: "cockpit-daily-test-checklist",
    href: "/cockpit-daily-test-checklist",
    phase: "Phase 1399",
    title: "Cockpit daily test checklist",
    commandLabel: "Go to Cockpit Daily Test Checklist",
    summary: "Daily test checklist covers the whole cockpit without running tests from the UI.",
    markerPhrases: [
      "Cockpit daily test checklist",
      "Cockpit daily test checklist does not run tests from the UI",
      "Cockpit daily test checklist requires explicit operator approval before execution",
      "Daily test checklist covers goal plan diff command approval execution state evidence result recovery audit safety and diagnostics",
      "No test or smoke execution from the cockpit",
      "Cockpit daily test checklist",
    ],
    sectionIds: ["goal-composer", "plan-summary", "dev-diagnostics-drawer"],
    devOnly: true,
  },
  {
    slug: "first-daily-testable-cockpit-mvp-candidate",
    href: "/first-daily-testable-cockpit-mvp-candidate",
    phase: "Phase 1400",
    title: "First daily-testable cockpit MVP candidate",
    commandLabel: "Go to First Daily-Testable Cockpit MVP Candidate",
    summary: "Candidate combines the daily-testable cockpit product cards.",
    markerPhrases: [
      "First daily-testable cockpit MVP candidate",
      "First daily-testable cockpit MVP candidate does not broaden execution",
      "First daily-testable cockpit MVP candidate requires explicit operator approval",
      "Candidate combines goal plan files commands approval run state evidence result recovery timeline safety and diagnostics",
      "No broad execution from the cockpit MVP candidate",
      "First daily-testable cockpit MVP checklist",
    ],
    sectionIds: ALL_SECTIONS.map((section) => section.id),
    devOnly: true,
  },
  {
    slug: "controlled-daily-testable-cockpit-mvp-release-candidate",
    href: "/controlled-daily-testable-cockpit-mvp-release-candidate",
    phase: "Phase 1401",
    title: "Controlled daily-testable cockpit MVP release candidate",
    commandLabel: "Go to Controlled Daily-Testable Cockpit MVP Release Candidate",
    summary: "Release candidate makes the cockpit daily-testable while preserving backend-owned guarded execution.",
    markerPhrases: [
      "Controlled daily-testable cockpit MVP release candidate",
      "Controlled daily-testable cockpit MVP release candidate does not call models write files run commands persist approvals create queues release locks persist results or execute recovery from the frontend",
      "Controlled daily-testable cockpit MVP release requires explicit operator approval",
      "Release candidate makes the cockpit daily-testable while preserving backend-owned guarded execution",
      "Phase pages remain dev test diagnostics only",
      "Controlled daily-testable cockpit MVP release checklist",
    ],
    sectionIds: ALL_SECTIONS.map((section) => section.id),
    devOnly: true,
  },
] as const;

export function buildDailyTestableCockpitMvpStableKey(parts: readonly string[]): string {
  return parts.join(":").toLowerCase().replace(/[^a-z0-9:/-]+/g, "-");
}

export function listDailyTestableCockpitMvpRouteDefinitions(): readonly DailyTestableCockpitMvpRouteDefinition[] {
  return ROUTES;
}

export function getDailyTestableCockpitMvpRouteDefinition(
  slug: DailyTestableCockpitMvpRouteSlug
): DailyTestableCockpitMvpRouteDefinition {
  return ROUTES.find((candidate) => candidate.slug === slug) ?? ROUTES[0];
}

export function buildDailyTestableCockpitMvpModel(): DailyTestableCockpitMvpModel {
  return COCKPIT_MVP;
}

export function buildDailyTestableCockpitMvpRouteModel(
  slug: DailyTestableCockpitMvpRouteSlug = "codexforge-cockpit"
): DailyTestableCockpitMvpRouteModel {
  const route = getDailyTestableCockpitMvpRouteDefinition(slug);
  const sections = route.sectionIds
    .map((sectionId) => ALL_SECTIONS.find((section) => section.id === sectionId))
    .filter((section): section is DailyTestableCockpitMvpSection => Boolean(section));

  return {
    route,
    cockpitMvp: COCKPIT_MVP,
    sections: sections.length > 0 ? sections : ALL_SECTIONS,
    diagnosticRoutes: ROUTES.filter((candidate) => candidate.devOnly),
    cockpitMarkers: DAILY_TESTABLE_COCKPIT_MVP_COCKPIT_MARKERS,
    summary: summarizeDailyTestableCockpitMvpRoute(route),
  };
}

export function summarizeDailyTestableCockpitMvpRouteModel(model: DailyTestableCockpitMvpRouteModel): string {
  return [
    model.route.phase,
    model.route.title,
    model.route.summary,
    model.cockpitMvp.cockpitMvpId,
    "cockpit is the normal user surface",
    "phase pages remain dev test diagnostics only",
    "broad execution still blocked",
  ].join(" | ");
}

function summarizeDailyTestableCockpitMvpRoute(route: DailyTestableCockpitMvpRouteDefinition): string {
  return [route.phase, route.title, route.summary, "Explicit operator approval remains required"].join(" | ");
}
