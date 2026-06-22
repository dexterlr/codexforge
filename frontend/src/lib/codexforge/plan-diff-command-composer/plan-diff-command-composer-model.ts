export type PlanDiffCommandComposerRouteSlug =
  | "codexforge-cockpit"
  | "plan-diff-command-composer-boundary"
  | "plan-step-packet"
  | "file-impact-plan-preview"
  | "diff-preview-packet"
  | "command-preview-packet"
  | "risk-review-packet"
  | "approval-packet-preview"
  | "execution-hold-preview"
  | "evidence-expectation-packet"
  | "result-expectation-packet"
  | "recovery-plan-preview"
  | "audit-timeline-preview"
  | "model-tool-handoff-preview"
  | "cockpit-work-proposal-summary"
  | "first-plan-diff-command-composer-candidate"
  | "controlled-plan-diff-command-composer-release-candidate";

export type PlanDiffCommandComposerKind =
  | "plan-diff-command-composer-v1"
  | "plan-diff-command-composer-boundary"
  | "plan-step-packet"
  | "file-impact-plan-preview"
  | "diff-preview-packet"
  | "command-preview-packet"
  | "risk-review-packet"
  | "approval-packet-preview"
  | "execution-hold-preview"
  | "evidence-expectation-packet"
  | "result-expectation-packet"
  | "recovery-plan-preview"
  | "audit-timeline-preview"
  | "model-tool-handoff-preview"
  | "cockpit-work-proposal-summary"
  | "plan-diff-command-composer-candidate"
  | "plan-diff-command-composer-release-candidate";

export type PlanDiffCommandComposerState =
  | "preview-only"
  | "review-only"
  | "expected"
  | "needs-approval"
  | "blocked";

export type PlanDiffCommandComposerItem = {
  id: string;
  label: string;
  detail: string;
  state: PlanDiffCommandComposerState;
};

export type PlanDiffCommandComposerSection = {
  id: string;
  label: string;
  title: string;
  summary: string;
  state: PlanDiffCommandComposerState;
  items: readonly PlanDiffCommandComposerItem[];
};

export type PlanDiffCommandComposerModel = {
  composerId: string;
  composerKind: PlanDiffCommandComposerKind;
  compiledGoalRef: string;
  projectContextRef: string;
  planSteps: PlanDiffCommandComposerSection;
  fileImpactPlan: PlanDiffCommandComposerSection;
  diffPreview: PlanDiffCommandComposerSection;
  commandPreview: PlanDiffCommandComposerSection;
  riskReview: PlanDiffCommandComposerSection;
  approvalPacket: PlanDiffCommandComposerSection;
  executionHold: PlanDiffCommandComposerSection;
  evidenceExpectations: PlanDiffCommandComposerSection;
  resultExpectations: PlanDiffCommandComposerSection;
  recoveryPlan: PlanDiffCommandComposerSection;
  auditTimeline: PlanDiffCommandComposerSection;
  modelToolHandoff: PlanDiffCommandComposerSection;
  deniedComposerBoundaries: PlanDiffCommandComposerSection;
  cockpitSummary: readonly PlanDiffCommandComposerItem[];
  explicitSafetyLimits: readonly string[];
};

export type PlanDiffCommandComposerRouteDefinition = {
  slug: PlanDiffCommandComposerRouteSlug;
  href: string;
  phase: string;
  title: string;
  commandLabel: string;
  summary: string;
  markerPhrases: readonly string[];
  sectionIds: readonly string[];
  devOnly: boolean;
};

export type PlanDiffCommandComposerRouteModel = {
  route: PlanDiffCommandComposerRouteDefinition;
  composer: PlanDiffCommandComposerModel;
  sections: readonly PlanDiffCommandComposerSection[];
  diagnosticRoutes: readonly PlanDiffCommandComposerRouteDefinition[];
  cockpitMarkers: readonly string[];
  summary: string;
};

export const PLAN_DIFF_COMMAND_COMPOSER_COCKPIT_MARKERS = [
  "Plan Diff Command Composer v1",
  "Plan",
  "Files",
  "Diff",
  "Commands",
  "Risks",
  "Approval",
  "Hold",
  "Evidence",
  "Result",
  "Recovery",
  "Timeline",
  "Model Tool Handoff",
  "No plan execution from the cockpit",
  "No diff application from the cockpit",
  "No command execution from the cockpit",
  "No model calls from the cockpit",
  "No provider calls from the cockpit",
  "No connector calls from the cockpit",
  "Backend-owned work proposal execution remains required",
  "Explicit operator approval remains required",
] as const;

const EXPLICIT_SAFETY_LIMITS = [
  "Plan Diff Command Composer v1 is preview-only.",
  "It does not call models.",
  "It does not call providers.",
  "It does not call connectors.",
  "It does not execute the plan.",
  "It does not write files.",
  "It does not apply diffs.",
  "It does not run commands.",
  "It does not persist approvals.",
  "It does not create queues.",
  "It does not promote memory automatically.",
  "It prepares a future backend-owned apply/run proposal path.",
  "Backend-owned guarded execution remains required for real actions.",
  "Explicit operator approval remains required.",
] as const;

const COMPILED_GOAL_REF = "goal-compiler-v1:controlled-goal-compiler-release-candidate:phase-1433";
const PROJECT_CONTEXT_REF = "project-context-brain-v1:controlled-project-context-brain-release-candidate:phase-1417";

const PLAN_STEPS: PlanDiffCommandComposerSection = {
  id: "plan-steps",
  label: "Plan",
  title: "Plan step packet",
  summary:
    "Plan step packet previews ordered actions, dependencies, risks, files, commands, evidence, and done criteria without executing steps.",
  state: "preview-only",
  items: [
    {
      id: "plan-order",
      label: "Ordered actions",
      detail: "Preview the intended work order from compiled goal through review, approval, guarded execution, evidence, and result handling.",
      state: "review-only",
    },
    {
      id: "plan-dependencies",
      label: "Dependencies and done criteria",
      detail: "Each step names expected dependencies, file and command touchpoints, evidence needs, and done criteria before any backend action exists.",
      state: "expected",
    },
    {
      id: "plan-no-execute",
      label: "No step execution",
      detail: "Plan step packet does not execute steps and requires explicit operator approval before execution.",
      state: "blocked",
    },
  ],
};

const FILE_IMPACT_PLAN: PlanDiffCommandComposerSection = {
  id: "file-impact-plan",
  label: "Files",
  title: "File impact plan preview",
  summary:
    "File impact plan preview describes new, modified, reviewed, blocked, rollback-relevant, and evidence-relevant files without writing files.",
  state: "preview-only",
  items: [
    {
      id: "file-impact-categories",
      label: "Impact categories",
      detail: "New, modified, reviewed, blocked, rollback-relevant, and evidence-relevant files can be listed before approval.",
      state: "expected",
    },
    {
      id: "file-impact-path-guard",
      label: "Path guard status",
      detail: "A future backend-owned path guard would still need to review approved scope before file mutation can exist.",
      state: "needs-approval",
    },
    {
      id: "file-impact-no-write",
      label: "No file writes",
      detail: "File impact plan preview does not write files, browse arbitrary files, apply changes, or persist file evidence from the UI.",
      state: "blocked",
    },
  ],
};

const DIFF_PREVIEW: PlanDiffCommandComposerSection = {
  id: "diff-preview",
  label: "Diff",
  title: "Diff preview packet",
  summary:
    "Diff preview packet shows proposed changes, path guard status, rollback readiness, evidence needs, and denied paths without applying diffs.",
  state: "preview-only",
  items: [
    {
      id: "diff-proposed",
      label: "Proposed changes",
      detail: "Future proposals may show file path, intent, patch summary, guard status, rollback notes, evidence needs, and denied path findings.",
      state: "review-only",
    },
    {
      id: "diff-rollback",
      label: "Rollback readiness",
      detail: "Rollback readiness is previewed as a requirement; rollback execution remains backend-owned and approval-gated.",
      state: "expected",
    },
    {
      id: "diff-no-apply",
      label: "No diff application",
      detail: "Diff preview packet does not apply diffs and requires explicit operator approval.",
      state: "blocked",
    },
  ],
};

const COMMAND_PREVIEW: PlanDiffCommandComposerSection = {
  id: "command-preview",
  label: "Commands",
  title: "Command preview packet",
  summary:
    "Command preview packet lists build, smoke, validation, lint, test, and hygiene command candidates as review-only commands.",
  state: "preview-only",
  items: [
    {
      id: "command-candidates",
      label: "Command candidates",
      detail: "Build, smoke, validation, lint, test, and hygiene command candidates can be listed with purpose, scope, risk, and expected evidence.",
      state: "review-only",
    },
    {
      id: "command-guards",
      label: "Command guards",
      detail: "Future guarded command execution would require explicit operator approval, command allowlist checks, arguments, working directory, environment guard, and evidence capture.",
      state: "needs-approval",
    },
    {
      id: "command-no-run",
      label: "No command run",
      detail: "Command preview packet does not run commands, spawn processes, start runtimes, bind ports, install packages, deploy, or run adapters.",
      state: "blocked",
    },
  ],
};

const RISK_REVIEW: PlanDiffCommandComposerSection = {
  id: "risk-review",
  label: "Risks",
  title: "Risk review packet",
  summary:
    "Risk review packet reviews files, commands, models, providers, connectors, runtimes, secrets, installs, deploys, persistence, recovery, and audit risks.",
  state: "preview-only",
  items: [
    {
      id: "risk-categories",
      label: "Risk categories",
      detail: "Files, commands, models, providers, connectors, runtimes, secrets, installs, deploys, persistence, recovery, and audit are reviewed as blocked or approval-gated risk categories.",
      state: "review-only",
    },
    {
      id: "risk-no-scan",
      label: "No UI safety scan",
      detail: "Risk review packet does not execute safety scans from the UI or inspect secrets.",
      state: "blocked",
    },
    {
      id: "risk-approval",
      label: "Approval required",
      detail: "Risk review packet requires explicit operator approval before any guarded backend action can proceed.",
      state: "needs-approval",
    },
  ],
};

const APPROVAL_PACKET: PlanDiffCommandComposerSection = {
  id: "approval-packet",
  label: "Approval",
  title: "Approval packet preview",
  summary:
    "Approval packet preview defines operator identity, scope, expiry, files, commands, model tool needs, risk level, evidence requirements, and denied paths.",
  state: "preview-only",
  items: [
    {
      id: "approval-contents",
      label: "Approval contents",
      detail: "Operator identity, scope, expiry, files, commands, model tool needs, risk level, evidence requirements, and denied paths are preview fields.",
      state: "expected",
    },
    {
      id: "approval-human",
      label: "Explicit human approval",
      detail: "Approval packet preview requires explicit human approval before real work can move to backend-owned guarded execution.",
      state: "needs-approval",
    },
    {
      id: "approval-no-persist",
      label: "No approval persistence",
      detail: "Approval packet preview does not persist approvals, create queues, store signoff, or hide approval requirements from the operator.",
      state: "blocked",
    },
  ],
};

const EXECUTION_HOLD: PlanDiffCommandComposerSection = {
  id: "execution-hold",
  label: "Hold",
  title: "Execution hold preview",
  summary:
    "Execution hold preview keeps apply, run, model, provider, connector, queue, persistence, recovery, and audit capture behind backend-owned guards.",
  state: "blocked",
  items: [
    {
      id: "hold-guarded",
      label: "Backend-owned guards",
      detail: "Apply, run, model, provider, connector, queue, persistence, recovery, and audit capture remain behind backend-owned guards.",
      state: "blocked",
    },
    {
      id: "hold-approval",
      label: "Approval lock",
      detail: "Execution hold preview requires explicit operator approval and does not release execution from the frontend.",
      state: "needs-approval",
    },
    {
      id: "hold-no-runtime",
      label: "No runtime release",
      detail: "The hold does not start local runtimes, open ports, run adapters, execute tools, or schedule background work.",
      state: "blocked",
    },
  ],
};

const EVIDENCE_EXPECTATIONS: PlanDiffCommandComposerSection = {
  id: "evidence-expectations",
  label: "Evidence",
  title: "Evidence expectation packet",
  summary:
    "Evidence expectation packet lists required diff, command stdout, stderr, exit code, approval, result, audit, recovery, and model tool evidence.",
  state: "preview-only",
  items: [
    {
      id: "evidence-required",
      label: "Required evidence",
      detail: "Diff, command stdout, stderr, exit code, approval, result, audit, recovery, and model tool evidence are expected before trust can be claimed.",
      state: "expected",
    },
    {
      id: "evidence-no-persist",
      label: "No evidence persistence",
      detail: "Evidence expectation packet does not persist evidence from the UI, attach files, save logs, or create audit records.",
      state: "blocked",
    },
    {
      id: "evidence-approval",
      label: "Approval requirement",
      detail: "Evidence capture remains backend-owned and approval-gated for future execution.",
      state: "needs-approval",
    },
  ],
};

const RESULT_EXPECTATIONS: PlanDiffCommandComposerSection = {
  id: "result-expectations",
  label: "Result",
  title: "Result expectation packet",
  summary:
    "Result expectation packet defines success, blocked, denied, failed, timeout, manual-review, retryable, recovered, and operator-accepted outcomes.",
  state: "preview-only",
  items: [
    {
      id: "result-outcomes",
      label: "Outcome vocabulary",
      detail: "Success, blocked, denied, failed, timeout, manual-review, retryable, recovered, and operator-accepted outcomes are preview states.",
      state: "review-only",
    },
    {
      id: "result-no-claim",
      label: "No execution claim",
      detail: "Result expectation packet does not claim execution happened, validation passed, files changed, or commands ran.",
      state: "blocked",
    },
    {
      id: "result-approval",
      label: "Approval before execution",
      detail: "Execution and result capture require explicit operator approval before any real result can exist.",
      state: "needs-approval",
    },
  ],
};

const RECOVERY_PLAN: PlanDiffCommandComposerSection = {
  id: "recovery-plan",
  label: "Recovery",
  title: "Recovery plan preview",
  summary:
    "Recovery plan preview explains rollback, retry, restore, stop, explain-failure, manual-review, safety-stop, and partial-recovery paths.",
  state: "preview-only",
  items: [
    {
      id: "recovery-paths",
      label: "Recovery paths",
      detail: "Rollback, retry, restore, stop, explain-failure, manual-review, safety-stop, and partial-recovery paths are visible as review-only options.",
      state: "review-only",
    },
    {
      id: "recovery-no-execute",
      label: "No recovery execution",
      detail: "Recovery plan preview does not execute recovery, rollback, retry, restore, stop, or partial recovery from the frontend.",
      state: "blocked",
    },
    {
      id: "recovery-approval",
      label: "Approval required",
      detail: "Recovery actions require explicit operator approval plus backend-owned evidence and result capture.",
      state: "needs-approval",
    },
  ],
};

const AUDIT_TIMELINE: PlanDiffCommandComposerSection = {
  id: "audit-timeline",
  label: "Timeline",
  title: "Audit timeline preview",
  summary:
    "Audit timeline preview shows goal, context, plan, diff, command, approval, evidence, result, recovery, model tool, and denied-path records.",
  state: "preview-only",
  items: [
    {
      id: "timeline-records",
      label: "Record sequence",
      detail: "Goal context, plan, diff, command, approval, evidence, result, recovery, model tool, and denied-path records define the future audit sequence.",
      state: "review-only",
    },
    {
      id: "timeline-no-persist",
      label: "No audit persistence",
      detail: "Audit timeline preview does not persist audit logs from the UI or store evidence/result/audit records.",
      state: "blocked",
    },
    {
      id: "timeline-backend",
      label: "Backend capture required",
      detail: "Audit capture remains backend-owned and approval-gated for real actions.",
      state: "needs-approval",
    },
  ],
};

const MODEL_TOOL_HANDOFF: PlanDiffCommandComposerSection = {
  id: "model-tool-handoff",
  label: "Model Tool Handoff",
  title: "Model tool handoff preview",
  summary:
    "Model tool handoff preview explains local, private, cheapest capable, paid, pro, specialist, and domain-fit routing handoff without executing calls.",
  state: "preview-only",
  items: [
    {
      id: "handoff-routing",
      label: "Routing hints",
      detail: "Local, private, cheapest capable, paid, pro, specialist, and domain-fit routing handoff hints remain deterministic preview labels.",
      state: "review-only",
    },
    {
      id: "handoff-no-calls",
      label: "No calls",
      detail: "Model tool handoff preview does not call models providers connectors or tools.",
      state: "blocked",
    },
    {
      id: "handoff-approval",
      label: "Approval required",
      detail: "Any future model or tool handoff requires explicit operator approval and backend-owned guard enforcement.",
      state: "needs-approval",
    },
  ],
};

const DENIED_COMPOSER_BOUNDARIES: PlanDiffCommandComposerSection = {
  id: "denied-composer-boundaries",
  label: "Denied",
  title: "Denied composer boundaries",
  summary:
    "Denied composer boundaries keep Plan Diff Command Composer v1 from becoming an executor, file writer, diff applier, command runner, model caller, connector caller, persistence layer, queue, or memory promotion surface.",
  state: "blocked",
  items: [
    {
      id: "denied-execution",
      label: "Execution denied",
      detail: "Plan execution, broad backend execution, adapter execution, local runtime starts, port binding, install, deployment, background processes, and process spawning stay blocked.",
      state: "blocked",
    },
    {
      id: "denied-mutation",
      label: "Mutation denied",
      detail: "Direct frontend file mutation, file writes, diff application, broad apply, rollback, retry, recovery, scaffold, package/export writes, and secret reads stay blocked.",
      state: "blocked",
    },
    {
      id: "denied-persistence",
      label: "Persistence denied",
      detail: "Approval persistence, queue persistence, evidence persistence, result persistence, audit persistence, environment value display, API key storage, and automatic memory promotion stay blocked.",
      state: "blocked",
    },
    {
      id: "denied-external",
      label: "External calls denied",
      detail: "Models, providers, connectors, tools, browsers, arbitrary file browsing, network calls, and local bridge calls stay blocked from the composer UI.",
      state: "blocked",
    },
  ],
};

const COCKPIT_SUMMARY: readonly PlanDiffCommandComposerItem[] = [
  {
    id: "cockpit-plan",
    label: "Plan",
    detail: "Shows what plan steps CodexForge proposes, including dependencies, risks, files, commands, evidence, and done criteria.",
    state: "preview-only",
  },
  {
    id: "cockpit-files",
    label: "Files",
    detail: "Shows what files may be changed, reviewed, blocked, rollback-relevant, or evidence-relevant without writing files.",
    state: "review-only",
  },
  {
    id: "cockpit-diff",
    label: "Diff",
    detail: "Shows what diff preview would be reviewed, including path guard status, rollback readiness, evidence needs, and denied paths.",
    state: "review-only",
  },
  {
    id: "cockpit-commands",
    label: "Commands",
    detail: "Shows what commands may be needed as review-only build, smoke, validation, lint, test, and hygiene candidates.",
    state: "blocked",
  },
  {
    id: "cockpit-risks",
    label: "Risks",
    detail: "Shows what risks apply across files, commands, models, providers, connectors, runtimes, secrets, installs, deploys, persistence, recovery, and audit.",
    state: "review-only",
  },
  {
    id: "cockpit-approval",
    label: "Approval",
    detail: "Shows what approval packet would be required, including operator identity, scope, expiry, files, commands, model tool needs, risk level, evidence, and denied paths.",
    state: "needs-approval",
  },
  {
    id: "cockpit-hold",
    label: "Hold",
    detail: "Explains why execution is held: no plan execution, diff application, command execution, model calls, provider calls, connector calls, queue creation, or persistence happens yet.",
    state: "blocked",
  },
  {
    id: "cockpit-evidence",
    label: "Evidence",
    detail: "Shows what evidence expectations matter across diff, command stdout, stderr, exit code, approval, result, audit, recovery, and model tool records.",
    state: "expected",
  },
  {
    id: "cockpit-result",
    label: "Result",
    detail: "Shows result expectations for success, blocked, denied, failed, timeout, manual-review, retryable, recovered, and operator-accepted outcomes without claiming execution happened.",
    state: "review-only",
  },
  {
    id: "cockpit-recovery",
    label: "Recovery",
    detail: "Shows what recovery plan is available as review-only rollback, retry, restore, stop, explain-failure, manual-review, safety-stop, and partial-recovery paths.",
    state: "review-only",
  },
  {
    id: "cockpit-timeline",
    label: "Timeline",
    detail: "Shows what audit timeline would be captured by future backend-owned audit capture, without persisting audit logs from the UI.",
    state: "expected",
  },
  {
    id: "cockpit-handoff",
    label: "Model Tool Handoff",
    detail: "Shows Model/Tool Handoff hints for local, private, cheapest capable, paid, pro, specialist, and domain-fit routing without model, provider, connector, or tool calls.",
    state: "preview-only",
  },
];

const PLAN_DIFF_COMMAND_COMPOSER: PlanDiffCommandComposerModel = {
  composerId: "codexforge-plan-diff-command-composer-v1-1434-1449",
  composerKind: "plan-diff-command-composer-v1",
  compiledGoalRef: COMPILED_GOAL_REF,
  projectContextRef: PROJECT_CONTEXT_REF,
  planSteps: PLAN_STEPS,
  fileImpactPlan: FILE_IMPACT_PLAN,
  diffPreview: DIFF_PREVIEW,
  commandPreview: COMMAND_PREVIEW,
  riskReview: RISK_REVIEW,
  approvalPacket: APPROVAL_PACKET,
  executionHold: EXECUTION_HOLD,
  evidenceExpectations: EVIDENCE_EXPECTATIONS,
  resultExpectations: RESULT_EXPECTATIONS,
  recoveryPlan: RECOVERY_PLAN,
  auditTimeline: AUDIT_TIMELINE,
  modelToolHandoff: MODEL_TOOL_HANDOFF,
  deniedComposerBoundaries: DENIED_COMPOSER_BOUNDARIES,
  cockpitSummary: COCKPIT_SUMMARY,
  explicitSafetyLimits: EXPLICIT_SAFETY_LIMITS,
};

const ALL_SECTIONS = [
  PLAN_STEPS,
  FILE_IMPACT_PLAN,
  DIFF_PREVIEW,
  COMMAND_PREVIEW,
  RISK_REVIEW,
  APPROVAL_PACKET,
  EXECUTION_HOLD,
  EVIDENCE_EXPECTATIONS,
  RESULT_EXPECTATIONS,
  RECOVERY_PLAN,
  AUDIT_TIMELINE,
  MODEL_TOOL_HANDOFF,
  DENIED_COMPOSER_BOUNDARIES,
] as const;

const ROUTES: readonly PlanDiffCommandComposerRouteDefinition[] = [
  {
    slug: "codexforge-cockpit",
    href: "/codexforge-cockpit",
    phase: "Plan Diff Command Composer v1",
    title: "Cockpit work proposal summary",
    commandLabel: "Go to Unified CodexForge Cockpit",
    summary: "Concise cockpit-centered Plan Diff Command Composer v1 work proposal summary for normal users.",
    markerPhrases: PLAN_DIFF_COMMAND_COMPOSER_COCKPIT_MARKERS,
    sectionIds: ALL_SECTIONS.map((section) => section.id),
    devOnly: false,
  },
  {
    slug: "plan-diff-command-composer-boundary",
    href: "/plan-diff-command-composer-boundary",
    phase: "Phase 1434",
    title: "Plan diff command composer boundary",
    commandLabel: "Go to Plan Diff Command Composer Boundary",
    summary: "Plan diff command composer boundary prepares work proposals without broad execution.",
    markerPhrases: [
      "Plan diff command composer boundary",
      "Plan diff command composer boundary does not execute plans",
      "Plan diff command composer requires explicit operator approval before execution",
      "Plan diff command composer prepares work proposals without broad execution",
      "Denied plan diff command composer paths remain blocked",
      "Plan diff command composer checklist",
    ],
    sectionIds: ["denied-composer-boundaries", "plan-steps", "execution-hold"],
    devOnly: true,
  },
  {
    slug: "plan-step-packet",
    href: "/plan-step-packet",
    phase: "Phase 1435",
    title: "Plan step packet",
    commandLabel: "Go to Plan Step Packet",
    summary: "Plan step packet previews ordered actions, dependencies, risks, files, commands, evidence, and done criteria.",
    markerPhrases: [
      "Plan step packet",
      "Plan step packet does not execute steps",
      "Plan step packet requires explicit operator approval before execution",
      "Plan step packet previews ordered actions dependencies risks files commands evidence and done criteria",
      "Denied plan step paths remain blocked",
      "Plan step checklist",
    ],
    sectionIds: ["plan-steps", "file-impact-plan", "command-preview"],
    devOnly: true,
  },
  {
    slug: "file-impact-plan-preview",
    href: "/file-impact-plan-preview",
    phase: "Phase 1436",
    title: "File impact plan preview",
    commandLabel: "Go to File Impact Plan Preview",
    summary: "File impact plan preview describes file categories without writing files.",
    markerPhrases: [
      "File impact plan preview",
      "File impact plan preview does not write files",
      "File impact plan preview requires explicit operator approval",
      "File impact plan preview describes new modified reviewed blocked rollback-relevant and evidence-relevant files",
      "Denied file impact plan paths remain blocked",
      "File impact plan checklist",
    ],
    sectionIds: ["file-impact-plan", "diff-preview", "denied-composer-boundaries"],
    devOnly: true,
  },
  {
    slug: "diff-preview-packet",
    href: "/diff-preview-packet",
    phase: "Phase 1437",
    title: "Diff preview packet",
    commandLabel: "Go to Diff Preview Packet",
    summary: "Diff preview packet shows proposed changes without applying diffs.",
    markerPhrases: [
      "Diff preview packet",
      "Diff preview packet does not apply diffs",
      "Diff preview packet requires explicit operator approval",
      "Diff preview packet shows proposed changes path guard status rollback readiness evidence needs and denied paths",
      "Denied diff preview paths remain blocked",
      "Diff preview checklist",
    ],
    sectionIds: ["diff-preview", "file-impact-plan", "recovery-plan"],
    devOnly: true,
  },
  {
    slug: "command-preview-packet",
    href: "/command-preview-packet",
    phase: "Phase 1438",
    title: "Command preview packet",
    commandLabel: "Go to Command Preview Packet",
    summary: "Command preview packet lists review-only command candidates without running commands.",
    markerPhrases: [
      "Command preview packet",
      "Command preview packet does not run commands",
      "Command preview packet requires explicit operator approval",
      "Command preview packet lists build smoke validation lint test and hygiene command candidates as review-only commands",
      "Denied command preview paths remain blocked",
      "Command preview checklist",
    ],
    sectionIds: ["command-preview", "evidence-expectations", "denied-composer-boundaries"],
    devOnly: true,
  },
  {
    slug: "risk-review-packet",
    href: "/risk-review-packet",
    phase: "Phase 1439",
    title: "Risk review packet",
    commandLabel: "Go to Risk Review Packet",
    summary: "Risk review packet reviews safety-sensitive proposal categories without UI scans.",
    markerPhrases: [
      "Risk review packet",
      "Risk review packet does not execute safety scans from the UI",
      "Risk review packet requires explicit operator approval",
      "Risk review packet reviews files commands models providers connectors runtimes secrets installs deploys persistence recovery and audit risks",
      "Denied risk review paths remain blocked",
      "Risk review checklist",
    ],
    sectionIds: ["risk-review", "denied-composer-boundaries", "approval-packet"],
    devOnly: true,
  },
  {
    slug: "approval-packet-preview",
    href: "/approval-packet-preview",
    phase: "Phase 1440",
    title: "Approval packet preview",
    commandLabel: "Go to Approval Packet Preview",
    summary: "Approval packet preview defines approval requirements without persisting approvals.",
    markerPhrases: [
      "Approval packet preview",
      "Approval packet preview does not persist approvals",
      "Approval packet preview requires explicit human approval",
      "Approval packet preview defines operator identity scope expiry files commands model tool needs risk level evidence requirements and denied paths",
      "Denied approval packet paths remain blocked",
      "Approval packet checklist",
    ],
    sectionIds: ["approval-packet", "risk-review", "execution-hold"],
    devOnly: true,
  },
  {
    slug: "execution-hold-preview",
    href: "/execution-hold-preview",
    phase: "Phase 1441",
    title: "Execution hold preview",
    commandLabel: "Go to Execution Hold Preview",
    summary: "Execution hold preview keeps real work behind backend-owned guards.",
    markerPhrases: [
      "Execution hold preview",
      "Execution hold preview does not release execution",
      "Execution hold preview requires explicit operator approval",
      "Execution hold preview keeps apply run model provider connector queue persistence recovery and audit capture behind backend-owned guards",
      "Denied execution hold paths remain blocked",
      "Execution hold checklist",
    ],
    sectionIds: ["execution-hold", "approval-packet", "denied-composer-boundaries"],
    devOnly: true,
  },
  {
    slug: "evidence-expectation-packet",
    href: "/evidence-expectation-packet",
    phase: "Phase 1442",
    title: "Evidence expectation packet",
    commandLabel: "Go to Evidence Expectation Packet",
    summary: "Evidence expectation packet lists expected records without UI persistence.",
    markerPhrases: [
      "Evidence expectation packet",
      "Evidence expectation packet does not persist evidence from the UI",
      "Evidence expectation packet requires explicit operator approval",
      "Evidence expectation packet lists required diff command stdout stderr exit code approval result audit recovery and model tool evidence",
      "Denied evidence expectation paths remain blocked",
      "Evidence expectation checklist",
    ],
    sectionIds: ["evidence-expectations", "result-expectations", "audit-timeline"],
    devOnly: true,
  },
  {
    slug: "result-expectation-packet",
    href: "/result-expectation-packet",
    phase: "Phase 1443",
    title: "Result expectation packet",
    commandLabel: "Go to Result Expectation Packet",
    summary: "Result expectation packet defines outcomes without claiming execution happened.",
    markerPhrases: [
      "Result expectation packet",
      "Result expectation packet does not claim execution happened",
      "Result expectation packet requires explicit operator approval before execution",
      "Result expectation packet defines success blocked denied failed timeout manual-review retryable recovered and operator-accepted outcomes",
      "Denied result expectation packet paths remain blocked",
      "Result expectation checklist",
    ],
    sectionIds: ["result-expectations", "evidence-expectations", "recovery-plan"],
    devOnly: true,
  },
  {
    slug: "recovery-plan-preview",
    href: "/recovery-plan-preview",
    phase: "Phase 1444",
    title: "Recovery plan preview",
    commandLabel: "Go to Recovery Plan Preview",
    summary: "Recovery plan preview explains possible recovery paths without executing recovery.",
    markerPhrases: [
      "Recovery plan preview",
      "Recovery plan preview does not execute recovery",
      "Recovery plan preview requires explicit operator approval",
      "Recovery plan preview explains rollback retry restore stop explain-failure manual-review safety-stop and partial-recovery paths",
      "Denied recovery plan paths remain blocked",
      "Recovery plan checklist",
    ],
    sectionIds: ["recovery-plan", "result-expectations", "audit-timeline"],
    devOnly: true,
  },
  {
    slug: "audit-timeline-preview",
    href: "/audit-timeline-preview",
    phase: "Phase 1445",
    title: "Audit timeline preview",
    commandLabel: "Go to Audit Timeline Preview",
    summary: "Audit timeline preview shows future audit records without UI persistence.",
    markerPhrases: [
      "Audit timeline preview",
      "Audit timeline preview does not persist audit logs from the UI",
      "Audit timeline preview requires backend-owned audit capture",
      "Audit timeline preview shows goal context plan diff command approval evidence result recovery model tool and denied-path records",
      "Denied audit timeline paths remain blocked",
      "Audit timeline checklist",
    ],
    sectionIds: ["audit-timeline", "evidence-expectations", "denied-composer-boundaries"],
    devOnly: true,
  },
  {
    slug: "model-tool-handoff-preview",
    href: "/model-tool-handoff-preview",
    phase: "Phase 1446",
    title: "Model tool handoff preview",
    commandLabel: "Go to Model Tool Handoff Preview",
    summary: "Model tool handoff preview explains routing handoff without executing calls.",
    markerPhrases: [
      "Model tool handoff preview",
      "Model tool handoff preview does not call models providers connectors or tools",
      "Model tool handoff preview requires explicit operator approval",
      "Model tool handoff preview explains local private cheapest capable paid pro specialist and domain-fit routing handoff without executing calls",
      "Denied model tool handoff paths remain blocked",
      "Model tool handoff checklist",
    ],
    sectionIds: ["model-tool-handoff", "approval-packet", "denied-composer-boundaries"],
    devOnly: true,
  },
  {
    slug: "cockpit-work-proposal-summary",
    href: "/cockpit-work-proposal-summary",
    phase: "Phase 1447",
    title: "Cockpit work proposal summary",
    commandLabel: "Go to Cockpit Work Proposal Summary",
    summary: "Cockpit work proposal summary keeps the cockpit as the normal user surface.",
    markerPhrases: [
      "Cockpit work proposal summary",
      "Cockpit work proposal summary keeps the cockpit as the normal user surface",
      "Cockpit work proposal summary does not broaden execution",
      "Cockpit work proposal summary shows plan files diff commands risks approval hold evidence result recovery timeline and model tool handoff",
      "Phase pages remain dev test diagnostics only",
      "Cockpit work proposal checklist",
    ],
    sectionIds: ALL_SECTIONS.map((section) => section.id),
    devOnly: true,
  },
  {
    slug: "first-plan-diff-command-composer-candidate",
    href: "/first-plan-diff-command-composer-candidate",
    phase: "Phase 1448",
    title: "First plan diff command composer candidate",
    commandLabel: "Go to First Plan Diff Command Composer Candidate",
    summary: "First plan diff command composer candidate combines the full work proposal packet.",
    markerPhrases: [
      "First plan diff command composer candidate",
      "First plan diff command composer candidate does not execute composed work",
      "First plan diff command composer candidate requires explicit operator approval",
      "Candidate combines plan steps file impact diff preview command preview risk approval hold evidence result recovery audit and model tool handoff",
      "Denied first plan diff command composer paths remain blocked",
      "First plan diff command composer checklist",
    ],
    sectionIds: ALL_SECTIONS.map((section) => section.id),
    devOnly: true,
  },
  {
    slug: "controlled-plan-diff-command-composer-release-candidate",
    href: "/controlled-plan-diff-command-composer-release-candidate",
    phase: "Phase 1449",
    title: "Controlled plan diff command composer release candidate",
    commandLabel: "Go to Controlled Plan Diff Command Composer Release Candidate",
    summary: "Controlled plan diff command composer release candidate prepares backend-owned work proposal approval without broad execution.",
    markerPhrases: [
      "Controlled plan diff command composer release candidate",
      "Controlled plan diff command composer release candidate does not call models providers connectors write files apply diffs run commands persist approvals create queues persist evidence results audit or promote memory from the frontend",
      "Controlled plan diff command composer release requires explicit operator approval",
      "Release candidate prepares CodexForge for backend-owned work proposal approval without broad execution",
      "Denied controlled plan diff command composer paths remain blocked",
      "Controlled plan diff command composer release checklist",
    ],
    sectionIds: ALL_SECTIONS.map((section) => section.id),
    devOnly: true,
  },
] as const;

export function buildPlanDiffCommandComposerStableKey(parts: readonly string[]): string {
  return parts.join(":").toLowerCase().replace(/[^a-z0-9:/-]+/g, "-");
}

export function listPlanDiffCommandComposerRouteDefinitions(): readonly PlanDiffCommandComposerRouteDefinition[] {
  return ROUTES;
}

export function getPlanDiffCommandComposerRouteDefinition(
  slug: PlanDiffCommandComposerRouteSlug
): PlanDiffCommandComposerRouteDefinition {
  return ROUTES.find((candidate) => candidate.slug === slug) ?? ROUTES[0];
}

export function buildPlanDiffCommandComposerModel(): PlanDiffCommandComposerModel {
  return PLAN_DIFF_COMMAND_COMPOSER;
}

export function buildPlanDiffCommandComposerRouteModel(
  slug: PlanDiffCommandComposerRouteSlug = "codexforge-cockpit"
): PlanDiffCommandComposerRouteModel {
  const route = getPlanDiffCommandComposerRouteDefinition(slug);
  const sections = route.sectionIds
    .map((sectionId) => ALL_SECTIONS.find((section) => section.id === sectionId))
    .filter((section): section is PlanDiffCommandComposerSection => Boolean(section));

  return {
    route,
    composer: PLAN_DIFF_COMMAND_COMPOSER,
    sections: sections.length > 0 ? sections : ALL_SECTIONS,
    diagnosticRoutes: ROUTES.filter((candidate) => candidate.devOnly),
    cockpitMarkers: PLAN_DIFF_COMMAND_COMPOSER_COCKPIT_MARKERS,
    summary: summarizePlanDiffCommandComposerRoute(route),
  };
}

export function summarizePlanDiffCommandComposerRouteModel(model: PlanDiffCommandComposerRouteModel): string {
  return [
    model.route.phase,
    model.route.title,
    model.route.summary,
    model.composer.composerId,
    "cockpit is the normal user surface",
    "phase pages remain dev test diagnostics only",
    "broad execution still blocked",
  ].join(" | ");
}

function summarizePlanDiffCommandComposerRoute(route: PlanDiffCommandComposerRouteDefinition): string {
  return [route.phase, route.title, route.summary, "Explicit operator approval remains required"].join(" | ");
}
