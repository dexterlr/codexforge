export type GuidedOperatorRunRouteSlug =
  | "codexforge-cockpit"
  | "guided-operator-run-boundary"
  | "guided-operator-goal-confirmation"
  | "guided-operator-plan-review"
  | "guided-operator-diff-review"
  | "guided-operator-command-review"
  | "guided-operator-approval-confirmation"
  | "guided-operator-hold-state-review"
  | "guided-operator-evidence-review"
  | "guided-operator-result-review"
  | "guided-operator-recovery-review"
  | "guided-operator-timeline-review"
  | "guided-operator-friction-review"
  | "guided-operator-safety-interlocks"
  | "guided-operator-completion-checklist"
  | "first-guided-operator-run-candidate"
  | "controlled-guided-operator-run-hardening-release-candidate";

export type GuidedOperatorRunPanelState = "blocked" | "preview-only" | "approval-required" | "dev-test-only";

export type GuidedOperatorRunChecklistItem = {
  id: string;
  label: string;
  detail: string;
  state: GuidedOperatorRunPanelState;
};

export type GuidedOperatorRunSurface = {
  id: string;
  title: string;
  eyebrow: string;
  state: GuidedOperatorRunPanelState;
  body: string;
  checklist: readonly GuidedOperatorRunChecklistItem[];
  placeholders: readonly string[];
};

export type GuidedOperatorRunRouteDefinition = {
  slug: GuidedOperatorRunRouteSlug;
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

export type GuidedOperatorRunRouteModel = {
  route: GuidedOperatorRunRouteDefinition;
  surfaces: readonly GuidedOperatorRunSurface[];
  globalSafetyCopy: readonly string[];
  targetFamilies: readonly string[];
  resultStates: readonly string[];
  recoveryOptions: readonly string[];
  timelineStages: readonly string[];
  summary: string;
};

export const FIRST_GUIDED_OPERATOR_RUN_COCKPIT_LANGUAGE = [
  "First guided operator run",
  "Guided operator goal confirmation",
  "Guided operator plan review",
  "Guided operator diff review",
  "Guided operator command review",
  "Guided operator approval confirmation",
  "Guided operator hold state review",
  "Guided operator evidence review",
  "Guided operator result review",
  "Guided operator recovery review",
  "Guided operator timeline review",
  "Guided operator friction review",
  "Guided operator safety interlocks",
  "Guided operator completion checklist",
  "No real file mutation from the cockpit",
  "No real command execution from the cockpit",
].join(" | ");

const GLOBAL_SAFETY_COPY = [
  "Phase pages are dev/test surfaces only.",
  "Normal operation should happen in this cockpit.",
  "File writes remain blocked until explicit operator approval.",
  "Commands remain blocked until explicit operator approval.",
  "No provider/model/connector/runtime execution occurs from this cockpit in this batch.",
  "No real mutation occurs from this cockpit in this batch.",
  "No real file mutation from the cockpit.",
  "No real command execution from the cockpit.",
  "The guided operator run is a static preview in this batch.",
  "No prompts, model calls, provider calls, connector calls, adapter calls, runtime starts, file writes, commands, approvals, evidence, results, audit logs, exports, recovery, retry, rollback, queue jobs, or memory promotion persist from this preview.",
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

const RESULT_STATES = [
  "success",
  "denied",
  "blocked",
  "failed",
  "timeout",
  "needs-review",
  "manual-review",
  "approval-required",
  "preview-only",
] as const;

const RECOVERY_OPTIONS = ["rollback", "retry", "stop", "restore", "explain failure", "manual review"] as const;

const TIMELINE_STAGES = [
  "goal confirmation",
  "plan review",
  "diff review",
  "command review",
  "approval confirmation",
  "hold state review",
  "evidence review",
  "result review",
  "recovery review",
  "timeline review",
  "friction review",
  "safety interlocks",
  "completion checklist",
] as const;

const SURFACES: readonly GuidedOperatorRunSurface[] = [
  {
    id: "run-boundary",
    title: "Guided operator run boundary",
    eyebrow: "Boundary",
    state: "blocked",
    body: "Defines the guided run as a one-page preview that unifies goal, plan, diff, command, approval, holds, evidence, result, recovery, timeline, and completion without calling models, writing files, or running commands.",
    checklist: [
      {
        id: "run-boundary-preview-only",
        label: "Preview-only run boundary",
        detail: "The run packet is deterministic review content and cannot mutate files, create queues, persist approvals, or execute adapters.",
        state: "preview-only",
      },
      {
        id: "run-boundary-denied-paths",
        label: "Denied paths remain blocked",
        detail: "Models, providers, connectors, commands, runtimes, adapters, file writes, persistence, recovery, exports, and memory promotion stay blocked.",
        state: "blocked",
      },
    ],
    placeholders: ["run boundary", "operator intent", "approval guard", "denied paths"],
  },
  {
    id: "goal-confirmation",
    title: "Guided operator goal confirmation",
    eyebrow: "Goal",
    state: "approval-required",
    body: "Restates what the operator asked for across broad build-anything targets before any future model routing, prompt sending, or execution can exist.",
    checklist: [
      {
        id: "goal-confirmation-plain-language",
        label: "Plain language goal",
        detail: "The operator sees the requested outcome, target family, constraints, and acceptance criteria before action.",
        state: "preview-only",
      },
      {
        id: "goal-confirmation-model-routing-blocked",
        label: "Model routing blocked",
        detail: "Prompt sending and model routing require explicit operator approval in a future backend-owned path.",
        state: "blocked",
      },
    ],
    placeholders: ["operator request", "target family", "acceptance criteria", "prompt blocked"],
  },
  {
    id: "plan-review",
    title: "Guided operator plan review",
    eyebrow: "Plan",
    state: "approval-required",
    body: "Explains intended file changes, commands, risks, evidence, result, and recovery in plain language without executing the plan.",
    checklist: [
      {
        id: "plan-review-step-by-step",
        label: "Step-by-step plan",
        detail: "The plan preview names intended changes, command intent, evidence expectations, result states, and recovery options.",
        state: "preview-only",
      },
      {
        id: "plan-review-execution-blocked",
        label: "Execution blocked",
        detail: "No future plan can execute until explicit operator approval, guards, evidence, result capture, audit, and recovery contract exist.",
        state: "blocked",
      },
    ],
    placeholders: ["intended files", "intended commands", "risk review", "evidence plan", "recovery plan"],
  },
  {
    id: "diff-review",
    title: "Guided operator diff review",
    eyebrow: "Diff",
    state: "blocked",
    body: "Shows before, after, path guard, rollback, and denied mutation language without writing files or applying diffs.",
    checklist: [
      {
        id: "diff-review-path-guard",
        label: "Path guard visible",
        detail: "Every future file path must be bounded and previewed before approval.",
        state: "approval-required",
      },
      {
        id: "diff-review-write-blocked",
        label: "File writes blocked",
        detail: "No patch apply, scaffold, export, rollback, retry, restore, or file mutation is available from the UI.",
        state: "blocked",
      },
    ],
    placeholders: ["path guard", "before preview", "after preview", "diff preview", "rollback preview"],
  },
  {
    id: "command-review",
    title: "Guided operator command review",
    eyebrow: "Command",
    state: "blocked",
    body: "Explains allowlist, arguments, working directory, environment names, evidence, result, and recovery without running shell, git, test, build, smoke, runtime, or server commands.",
    checklist: [
      {
        id: "command-review-allowlist",
        label: "Allowlist visible",
        detail: "The preview names the command policy only; it cannot spawn a process or open a port.",
        state: "preview-only",
      },
      {
        id: "command-review-execution-blocked",
        label: "Command execution blocked",
        detail: "Shell, git, test, build, smoke, runtime, server, adapter, and background execution remain blocked.",
        state: "blocked",
      },
    ],
    placeholders: ["allowlist", "arguments", "working directory", "environment names", "stdout placeholder"],
  },
  {
    id: "approval-confirmation",
    title: "Guided operator approval confirmation",
    eyebrow: "Approval",
    state: "approval-required",
    body: "Explains exactly what would be approved and what remains blocked while avoiding approval persistence or hidden approvals.",
    checklist: [
      {
        id: "approval-confirmation-human",
        label: "Human approval required",
        detail: "Approval is a future explicit human decision, not a stored state in this preview.",
        state: "approval-required",
      },
      {
        id: "approval-confirmation-no-persistence",
        label: "No approval persistence",
        detail: "No queue job, approval record, execution lock release, or backend action is created.",
        state: "blocked",
      },
    ],
    placeholders: ["approval scope", "operator identity placeholder", "blocked actions", "future approval contract"],
  },
  {
    id: "hold-state",
    title: "Guided operator hold state review",
    eyebrow: "Hold",
    state: "blocked",
    body: "Keeps file mutation, command execution, persistence, export, recovery, and queues blocked while the operator reviews the packet.",
    checklist: [
      {
        id: "hold-state-locks-held",
        label: "Execution locks held",
        detail: "The preview does not release file, command, persistence, export, recovery, runtime, adapter, or queue locks.",
        state: "blocked",
      },
      {
        id: "hold-state-next-action",
        label: "Next action is review",
        detail: "The only available next action is human review of the static packet.",
        state: "preview-only",
      },
    ],
    placeholders: ["file hold", "command hold", "persistence hold", "queue hold", "recovery hold"],
  },
  {
    id: "evidence-review",
    title: "Guided operator evidence review",
    eyebrow: "Evidence",
    state: "preview-only",
    body: "Shows what diff, command, stdout, stderr, exit code, approval timestamp, and audit evidence would show without persisting evidence.",
    checklist: [
      {
        id: "evidence-review-fields",
        label: "Evidence fields visible",
        detail: "Diff, command, stdout, stderr, exit code, approval timestamp, and audit placeholders are visible as static labels.",
        state: "preview-only",
      },
      {
        id: "evidence-review-no-store",
        label: "Evidence persistence blocked",
        detail: "No evidence record, export, audit log, result record, queue transition, or memory update is written.",
        state: "blocked",
      },
    ],
    placeholders: ["diff evidence", "stdout", "stderr", "exit code", "approval timestamp", "audit trail"],
  },
  {
    id: "result-review",
    title: "Guided operator result review",
    eyebrow: "Result",
    state: "preview-only",
    body: "Explains success, denied, blocked, failed, timeout, needs-review, and manual-review states without persisting results or triggering decisions.",
    checklist: [
      {
        id: "result-review-states",
        label: "Result states visible",
        detail: "Success, denied, blocked, failed, timeout, needs-review, and manual-review are deterministic labels only.",
        state: "preview-only",
      },
      {
        id: "result-review-no-store",
        label: "Result persistence blocked",
        detail: "No result store, audit entry, queue update, memory promotion, retry, rollback, or recovery action is triggered.",
        state: "blocked",
      },
    ],
    placeholders: ["success", "denied", "blocked", "failed", "timeout", "needs-review", "manual-review"],
  },
  {
    id: "recovery-review",
    title: "Guided operator recovery review",
    eyebrow: "Recovery",
    state: "blocked",
    body: "Shows rollback, retry, stop, restore, explain-failure, and manual-review options as blocked previews.",
    checklist: [
      {
        id: "recovery-review-options",
        label: "Recovery options visible",
        detail: "Rollback, retry, stop, restore, explain-failure, and manual-review are visible as future options.",
        state: "preview-only",
      },
      {
        id: "recovery-review-execution-blocked",
        label: "Recovery execution blocked",
        detail: "No rollback, retry, restore, command, file mutation, adapter action, export, or queue transition is released.",
        state: "blocked",
      },
    ],
    placeholders: ["rollback", "retry", "stop", "restore", "explain failure", "manual review"],
  },
  {
    id: "timeline-review",
    title: "Guided operator timeline review",
    eyebrow: "Timeline",
    state: "preview-only",
    body: "Shows goal, plan, diff, command, risk, approval, holds, evidence, result, recovery, and completion without persisting audit logs.",
    checklist: [
      {
        id: "timeline-review-sequence",
        label: "Timeline sequence visible",
        detail: "The operator can scan the full run from goal confirmation to completion checklist on one page.",
        state: "preview-only",
      },
      {
        id: "timeline-review-no-audit-store",
        label: "Audit persistence blocked",
        detail: "No audit log, approval decision, evidence record, result record, export, queue record, or memory update is written.",
        state: "blocked",
      },
    ],
    placeholders: ["goal", "plan", "diff", "command", "approval", "evidence", "result", "recovery", "completion"],
  },
  {
    id: "friction-review",
    title: "Guided operator friction review",
    eyebrow: "Friction",
    state: "preview-only",
    body: "Identifies confusing labels, missing next steps, unsafe ambiguity, and overloaded phase navigation without mutating workflow state.",
    checklist: [
      {
        id: "friction-review-confusion",
        label: "Confusion markers visible",
        detail: "Labels, next steps, ambiguity, and phase navigation friction are named for review.",
        state: "preview-only",
      },
      {
        id: "friction-review-no-state-change",
        label: "Workflow state unchanged",
        detail: "The preview does not save preferences, mutate workflow state, create queues, or persist approvals.",
        state: "blocked",
      },
    ],
    placeholders: ["confusing labels", "missing next steps", "unsafe ambiguity", "phase navigation overload"],
  },
  {
    id: "safety-interlocks",
    title: "Guided operator safety interlocks",
    eyebrow: "Interlocks",
    state: "blocked",
    body: "Blocks file writes, commands, models, providers, connectors, runtimes, adapters, persistence, export, recovery, queues, and memory promotion until explicit operator approval and future backend guards exist.",
    checklist: [
      {
        id: "safety-interlocks-blocked-actions",
        label: "Blocked actions explicit",
        detail: "File writes, commands, models, providers, connectors, runtimes, adapters, persistence, export, recovery, queues, and memory promotion are blocked.",
        state: "blocked",
      },
      {
        id: "safety-interlocks-approval",
        label: "Approval still required",
        detail: "Future action requires explicit approval plus file-write path guard, diff preview, command allowlist, evidence, result, audit, and recovery contract.",
        state: "approval-required",
      },
    ],
    placeholders: ["file write block", "command block", "model block", "provider block", "connector block", "recovery block"],
  },
  {
    id: "completion-checklist",
    title: "Guided operator completion checklist",
    eyebrow: "Completion",
    state: "approval-required",
    body: "Shows reviewed goal, plan, diff, command, approval, evidence, result, recovery, timeline, and denied paths without marking real work complete.",
    checklist: [
      {
        id: "completion-checklist-reviewed",
        label: "Review checkpoints visible",
        detail: "Goal, plan, diff, command, approval, evidence, result, recovery, timeline, and denied paths are represented.",
        state: "preview-only",
      },
      {
        id: "completion-checklist-not-complete",
        label: "No real completion",
        detail: "The preview does not mark real work complete, persist completion, write outputs, export files, or promote memory.",
        state: "blocked",
      },
    ],
    placeholders: ["goal reviewed", "plan reviewed", "diff reviewed", "command reviewed", "denied paths reviewed"],
  },
] as const;

const ALL_SURFACE_IDS = SURFACES.map((surface) => surface.id);

const ROUTES: readonly GuidedOperatorRunRouteDefinition[] = [
  {
    slug: "codexforge-cockpit",
    href: "/codexforge-cockpit",
    phase: "Cockpit",
    title: "First guided operator run",
    commandLabel: "Go to Unified CodexForge Cockpit",
    summary: "Cockpit preview of the first guided operator run.",
    markerPhrases: [
      "First guided operator run",
      "Guided operator goal confirmation",
      "Guided operator plan review",
      "Guided operator diff review",
      "Guided operator command review",
      "Guided operator approval confirmation",
      "Guided operator hold state review",
      "Guided operator evidence review",
      "Guided operator result review",
      "Guided operator recovery review",
      "Guided operator timeline review",
      "Guided operator friction review",
      "Guided operator safety interlocks",
      "Guided operator completion checklist",
      "No real file mutation from the cockpit",
      "No real command execution from the cockpit",
    ],
    deniedCopy: "Denied guided operator run cockpit paths remain blocked: no file mutation, command execution, model call, provider call, connector call, runtime start, adapter execution, persistence, export, recovery, queue creation, or memory promotion.",
    approvalCopy: "Future guided operator runs require explicit operator approval before model routing, file writes, command execution, evidence persistence, result persistence, recovery, queue transitions, or completion.",
    surfaceIds: ALL_SURFACE_IDS,
    devOnly: false,
  },
  {
    slug: "guided-operator-run-boundary",
    href: "/guided-operator-run-boundary",
    phase: "Phase 1258",
    title: "Guided operator run boundary",
    commandLabel: "Go to Guided Operator Run Boundary",
    summary: "Guided operator run boundary unifies the first run as preview-only and approval-gated.",
    markerPhrases: [
      "Guided operator run boundary",
      "Guided operator run boundary does not call models write files or run commands",
      "Guided operator run requires explicit operator approval",
      "Guided operator run unifies goal plan diff command approval holds evidence result recovery timeline and completion",
      "Denied guided operator run paths remain blocked",
      "Guided operator run checklist",
    ],
    deniedCopy: "Denied guided operator run paths remain blocked.",
    approvalCopy: "Guided operator run requires explicit operator approval.",
    surfaceIds: ["run-boundary", "goal-confirmation", "plan-review", "safety-interlocks", "completion-checklist"],
    devOnly: true,
  },
  {
    slug: "guided-operator-goal-confirmation",
    href: "/guided-operator-goal-confirmation",
    phase: "Phase 1259",
    title: "Guided operator goal confirmation",
    commandLabel: "Go to Guided Operator Goal Confirmation",
    summary: "Goal confirmation explains what the operator asked for before any action.",
    markerPhrases: [
      "Guided operator goal confirmation",
      "Guided operator goal confirmation does not send prompts or call models",
      "Guided operator goal confirmation requires explicit operator approval before future model routing",
      "Goal confirmation explains what the operator asked for before any action",
      "Denied guided operator goal paths remain blocked",
      "Guided operator goal confirmation checklist",
    ],
    deniedCopy: "Denied guided operator goal paths remain blocked.",
    approvalCopy: "Guided operator goal confirmation requires explicit operator approval before future model routing.",
    surfaceIds: ["goal-confirmation", "run-boundary", "plan-review", "safety-interlocks"],
    devOnly: true,
  },
  {
    slug: "guided-operator-plan-review",
    href: "/guided-operator-plan-review",
    phase: "Phase 1260",
    title: "Guided operator plan review",
    commandLabel: "Go to Guided Operator Plan Review",
    summary: "Plan review explains intended file changes commands risks evidence result and recovery in plain language.",
    markerPhrases: [
      "Guided operator plan review",
      "Guided operator plan review does not execute plans",
      "Guided operator plan review requires explicit operator approval before future execution",
      "Plan review explains intended file changes commands risks evidence result and recovery in plain language",
      "Denied guided operator plan paths remain blocked",
      "Guided operator plan review checklist",
    ],
    deniedCopy: "Denied guided operator plan paths remain blocked.",
    approvalCopy: "Guided operator plan review requires explicit operator approval before future execution.",
    surfaceIds: ["plan-review", "goal-confirmation", "diff-review", "command-review", "evidence-review", "recovery-review"],
    devOnly: true,
  },
  {
    slug: "guided-operator-diff-review",
    href: "/guided-operator-diff-review",
    phase: "Phase 1261",
    title: "Guided operator diff review",
    commandLabel: "Go to Guided Operator Diff Review",
    summary: "Diff review explains before after path guard rollback and denied mutation.",
    markerPhrases: [
      "Guided operator diff review",
      "Guided operator diff review does not write files",
      "Guided operator diff review requires explicit operator approval before future apply",
      "Diff review explains before after path guard rollback and denied mutation",
      "Denied guided operator diff paths remain blocked",
      "Guided operator diff review checklist",
    ],
    deniedCopy: "Denied guided operator diff paths remain blocked.",
    approvalCopy: "Guided operator diff review requires explicit operator approval before future apply.",
    surfaceIds: ["diff-review", "plan-review", "approval-confirmation", "hold-state", "recovery-review"],
    devOnly: true,
  },
  {
    slug: "guided-operator-command-review",
    href: "/guided-operator-command-review",
    phase: "Phase 1262",
    title: "Guided operator command review",
    commandLabel: "Go to Guided Operator Command Review",
    summary: "Command review explains allowlist arguments working directory environment evidence result and recovery.",
    markerPhrases: [
      "Guided operator command review",
      "Guided operator command review does not run commands",
      "Guided operator command review requires explicit operator approval before future execution",
      "Command review explains allowlist arguments working directory environment evidence result and recovery",
      "Denied guided operator command paths remain blocked",
      "Guided operator command review checklist",
    ],
    deniedCopy: "Denied guided operator command paths remain blocked.",
    approvalCopy: "Guided operator command review requires explicit operator approval before future execution.",
    surfaceIds: ["command-review", "plan-review", "approval-confirmation", "hold-state", "evidence-review", "result-review"],
    devOnly: true,
  },
  {
    slug: "guided-operator-approval-confirmation",
    href: "/guided-operator-approval-confirmation",
    phase: "Phase 1263",
    title: "Guided operator approval confirmation",
    commandLabel: "Go to Guided Operator Approval Confirmation",
    summary: "Approval confirmation explains exactly what would be approved and what remains blocked.",
    markerPhrases: [
      "Guided operator approval confirmation",
      "Guided operator approval confirmation does not approve actions",
      "Guided operator approval confirmation requires explicit human approval",
      "Approval confirmation explains exactly what would be approved and what remains blocked",
      "Denied guided operator approval paths remain blocked",
      "Guided operator approval confirmation checklist",
    ],
    deniedCopy: "Denied guided operator approval paths remain blocked.",
    approvalCopy: "Guided operator approval confirmation requires explicit human approval.",
    surfaceIds: ["approval-confirmation", "diff-review", "command-review", "hold-state", "safety-interlocks"],
    devOnly: true,
  },
  {
    slug: "guided-operator-hold-state-review",
    href: "/guided-operator-hold-state-review",
    phase: "Phase 1264",
    title: "Guided operator hold state review",
    commandLabel: "Go to Guided Operator Hold State Review",
    summary: "Hold state review keeps file mutation command execution persistence export recovery and queues blocked.",
    markerPhrases: [
      "Guided operator hold state review",
      "Guided operator hold state review does not release execution locks",
      "Guided operator hold state review requires explicit operator approval",
      "Hold state review keeps file mutation command execution persistence export recovery and queues blocked",
      "Denied guided operator hold paths remain blocked",
      "Guided operator hold state checklist",
    ],
    deniedCopy: "Denied guided operator hold paths remain blocked.",
    approvalCopy: "Guided operator hold state review requires explicit operator approval.",
    surfaceIds: ["hold-state", "approval-confirmation", "diff-review", "command-review", "safety-interlocks"],
    devOnly: true,
  },
  {
    slug: "guided-operator-evidence-review",
    href: "/guided-operator-evidence-review",
    phase: "Phase 1265",
    title: "Guided operator evidence review",
    commandLabel: "Go to Guided Operator Evidence Review",
    summary: "Evidence review explains what diff command stdout stderr exit code approval timestamp and audit evidence would show.",
    markerPhrases: [
      "Guided operator evidence review",
      "Guided operator evidence review does not persist evidence",
      "Guided operator evidence review requires explicit operator approval before future persistence",
      "Evidence review explains what diff command stdout stderr exit code approval timestamp and audit evidence would show",
      "Denied guided operator evidence paths remain blocked",
      "Guided operator evidence review checklist",
    ],
    deniedCopy: "Denied guided operator evidence paths remain blocked.",
    approvalCopy: "Guided operator evidence review requires explicit operator approval before future persistence.",
    surfaceIds: ["evidence-review", "diff-review", "command-review", "approval-confirmation", "timeline-review"],
    devOnly: true,
  },
  {
    slug: "guided-operator-result-review",
    href: "/guided-operator-result-review",
    phase: "Phase 1266",
    title: "Guided operator result review",
    commandLabel: "Go to Guided Operator Result Review",
    summary: "Result review explains success denied blocked failed timeout needs-review and manual-review states.",
    markerPhrases: [
      "Guided operator result review",
      "Guided operator result review does not persist results",
      "Guided operator result review requires explicit operator approval before future persistence",
      "Result review explains success denied blocked failed timeout needs-review and manual-review states",
      "Denied guided operator result paths remain blocked",
      "Guided operator result review checklist",
    ],
    deniedCopy: "Denied guided operator result paths remain blocked.",
    approvalCopy: "Guided operator result review requires explicit operator approval before future persistence.",
    surfaceIds: ["result-review", "evidence-review", "recovery-review", "timeline-review", "completion-checklist"],
    devOnly: true,
  },
  {
    slug: "guided-operator-recovery-review",
    href: "/guided-operator-recovery-review",
    phase: "Phase 1267",
    title: "Guided operator recovery review",
    commandLabel: "Go to Guided Operator Recovery Review",
    summary: "Recovery review explains rollback retry stop restore explain-failure and manual-review options as blocked previews.",
    markerPhrases: [
      "Guided operator recovery review",
      "Guided operator recovery review does not execute recovery",
      "Guided operator recovery review requires explicit operator approval before future recovery",
      "Recovery review explains rollback retry stop restore explain-failure and manual-review options as blocked previews",
      "Denied guided operator recovery paths remain blocked",
      "Guided operator recovery review checklist",
    ],
    deniedCopy: "Denied guided operator recovery paths remain blocked.",
    approvalCopy: "Guided operator recovery review requires explicit operator approval before future recovery.",
    surfaceIds: ["recovery-review", "result-review", "evidence-review", "hold-state", "safety-interlocks"],
    devOnly: true,
  },
  {
    slug: "guided-operator-timeline-review",
    href: "/guided-operator-timeline-review",
    phase: "Phase 1268",
    title: "Guided operator timeline review",
    commandLabel: "Go to Guided Operator Timeline Review",
    summary: "Timeline review shows goal plan diff command risk approval holds evidence result recovery and completion.",
    markerPhrases: [
      "Guided operator timeline review",
      "Guided operator timeline review does not persist audit logs",
      "Guided operator timeline review requires explicit operator approval before future persistence",
      "Timeline review shows goal plan diff command risk approval holds evidence result recovery and completion",
      "Denied guided operator timeline paths remain blocked",
      "Guided operator timeline review checklist",
    ],
    deniedCopy: "Denied guided operator timeline paths remain blocked.",
    approvalCopy: "Guided operator timeline review requires explicit operator approval before future persistence.",
    surfaceIds: ["timeline-review", "goal-confirmation", "plan-review", "approval-confirmation", "result-review", "completion-checklist"],
    devOnly: true,
  },
  {
    slug: "guided-operator-friction-review",
    href: "/guided-operator-friction-review",
    phase: "Phase 1269",
    title: "Guided operator friction review",
    commandLabel: "Go to Guided Operator Friction Review",
    summary: "Friction review identifies confusing labels missing next steps unsafe ambiguity and overloaded phase navigation.",
    markerPhrases: [
      "Guided operator friction review",
      "Guided operator friction review does not mutate workflow state",
      "Guided operator friction review requires explicit operator approval before future workflow changes",
      "Friction review identifies confusing labels missing next steps unsafe ambiguity and overloaded phase navigation",
      "Denied guided operator friction paths remain blocked",
      "Guided operator friction review checklist",
    ],
    deniedCopy: "Denied guided operator friction paths remain blocked.",
    approvalCopy: "Guided operator friction review requires explicit operator approval before future workflow changes.",
    surfaceIds: ["friction-review", "timeline-review", "goal-confirmation", "plan-review", "completion-checklist"],
    devOnly: true,
  },
  {
    slug: "guided-operator-safety-interlocks",
    href: "/guided-operator-safety-interlocks",
    phase: "Phase 1270",
    title: "Guided operator safety interlocks",
    commandLabel: "Go to Guided Operator Safety Interlocks",
    summary: "Safety interlocks block file writes commands models providers connectors runtimes adapters persistence export recovery queues and memory promotion.",
    markerPhrases: [
      "Guided operator safety interlocks",
      "Guided operator safety interlocks do not release actions",
      "Guided operator safety interlocks require explicit operator approval",
      "Safety interlocks block file writes commands models providers connectors runtimes adapters persistence export recovery queues and memory promotion",
      "Denied guided operator safety paths remain blocked",
      "Guided operator safety interlocks checklist",
    ],
    deniedCopy: "Denied guided operator safety paths remain blocked.",
    approvalCopy: "Guided operator safety interlocks require explicit operator approval.",
    surfaceIds: ["safety-interlocks", "run-boundary", "approval-confirmation", "hold-state", "completion-checklist"],
    devOnly: true,
  },
  {
    slug: "guided-operator-completion-checklist",
    href: "/guided-operator-completion-checklist",
    phase: "Phase 1271",
    title: "Guided operator completion checklist",
    commandLabel: "Go to Guided Operator Completion Checklist",
    summary: "Completion checklist shows reviewed goal plan diff command approval evidence result recovery timeline and denied paths.",
    markerPhrases: [
      "Guided operator completion checklist",
      "Guided operator completion checklist does not mark real work complete",
      "Guided operator completion checklist requires explicit operator approval before future completion",
      "Completion checklist shows reviewed goal plan diff command approval evidence result recovery timeline and denied paths",
      "Denied guided operator completion paths remain blocked",
      "Guided operator completion checklist",
    ],
    deniedCopy: "Denied guided operator completion paths remain blocked.",
    approvalCopy: "Guided operator completion checklist requires explicit operator approval before future completion.",
    surfaceIds: ["completion-checklist", "goal-confirmation", "plan-review", "timeline-review", "safety-interlocks"],
    devOnly: true,
  },
  {
    slug: "first-guided-operator-run-candidate",
    href: "/first-guided-operator-run-candidate",
    phase: "Phase 1272",
    title: "First guided operator run candidate",
    commandLabel: "Go to First Guided Operator Run Candidate",
    summary: "Candidate combines goal confirmation plan review diff review command review approval holds evidence result recovery timeline friction safety and completion.",
    markerPhrases: [
      "First guided operator run candidate",
      "First guided operator run candidate does not call models write files run commands persist evidence or execute recovery",
      "First guided operator run candidate requires explicit operator approval",
      "Candidate combines goal confirmation plan review diff review command review approval holds evidence result recovery timeline friction safety and completion",
      "Denied first guided operator run paths remain blocked",
      "First guided operator run checklist",
    ],
    deniedCopy: "Denied first guided operator run paths remain blocked.",
    approvalCopy: "First guided operator run candidate requires explicit operator approval.",
    surfaceIds: ALL_SURFACE_IDS,
    devOnly: true,
  },
  {
    slug: "controlled-guided-operator-run-hardening-release-candidate",
    href: "/controlled-guided-operator-run-hardening-release-candidate",
    phase: "Phase 1273",
    title: "Controlled guided operator run hardening release candidate",
    commandLabel: "Go to Controlled Guided Operator Run Hardening Release Candidate",
    summary: "Release candidate makes the first guided operator run safer clearer and easier to use.",
    markerPhrases: [
      "Controlled guided operator run hardening release candidate",
      "Controlled guided operator run hardening release candidate does not call models write files run commands persist results or execute recovery",
      "Controlled guided operator run hardening release requires explicit operator approval",
      "Release candidate makes the first guided operator run safer clearer and easier to use",
      "Denied controlled guided operator run paths remain blocked",
      "Controlled guided operator run hardening release checklist",
    ],
    deniedCopy: "Denied controlled guided operator run paths remain blocked.",
    approvalCopy: "Controlled guided operator run hardening release requires explicit operator approval.",
    surfaceIds: ALL_SURFACE_IDS,
    devOnly: true,
  },
] as const;

export function buildGuidedOperatorRunStableKey(parts: readonly string[]): string {
  return parts.join(":").toLowerCase().replace(/[^a-z0-9:/-]+/g, "-");
}

export function listGuidedOperatorRunRouteDefinitions(): readonly GuidedOperatorRunRouteDefinition[] {
  return ROUTES;
}

export function getGuidedOperatorRunRouteDefinition(slug: GuidedOperatorRunRouteSlug): GuidedOperatorRunRouteDefinition {
  return ROUTES.find((candidate) => candidate.slug === slug) ?? ROUTES[0];
}

export function buildGuidedOperatorRunRouteModel(
  slug: GuidedOperatorRunRouteSlug = "codexforge-cockpit"
): GuidedOperatorRunRouteModel {
  const route = getGuidedOperatorRunRouteDefinition(slug);
  const surfaces = route.surfaceIds
    .map((surfaceId) => SURFACES.find((surface) => surface.id === surfaceId))
    .filter((surface): surface is GuidedOperatorRunSurface => Boolean(surface));

  return {
    route,
    surfaces,
    globalSafetyCopy: GLOBAL_SAFETY_COPY,
    targetFamilies: TARGET_FAMILIES,
    resultStates: RESULT_STATES,
    recoveryOptions: RECOVERY_OPTIONS,
    timelineStages: TIMELINE_STAGES,
    summary: summarizeGuidedOperatorRunRoute(route, surfaces),
  };
}

export function buildGuidedOperatorRunModel(): GuidedOperatorRunRouteModel {
  return buildGuidedOperatorRunRouteModel("codexforge-cockpit");
}

export function summarizeGuidedOperatorRunRoute(
  route: GuidedOperatorRunRouteDefinition,
  surfaces: readonly GuidedOperatorRunSurface[]
): string {
  return `${route.title} keeps ${surfaces.length} guided operator run surfaces static, deterministic, preview-only, approval-gated, and blocked from real mutation or command execution.`;
}

export function summarizeGuidedOperatorRunRouteModel(model = buildGuidedOperatorRunModel()): string {
  return model.summary;
}
