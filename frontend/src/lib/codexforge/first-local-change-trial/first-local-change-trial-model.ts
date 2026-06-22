export type FirstLocalChangeTrialRouteSlug =
  | "codexforge-cockpit"
  | "first-local-change-trial-boundary"
  | "local-change-goal-packet"
  | "local-change-plan-packet"
  | "local-change-file-diff-packet"
  | "local-change-command-preview-packet"
  | "local-change-approval-ticket"
  | "local-change-apply-hold"
  | "local-change-command-hold"
  | "local-change-evidence-preview"
  | "local-change-result-preview"
  | "local-change-recovery-preview"
  | "local-change-audit-preview"
  | "local-change-cockpit-trial-view"
  | "local-change-denied-path-review"
  | "first-approved-local-change-candidate"
  | "controlled-first-local-change-trial-release-candidate";

export type FirstLocalChangeTrialPanelState = "blocked" | "preview-only" | "approval-required" | "dev-test-only";

export type FirstLocalChangeTrialChecklistItem = {
  id: string;
  label: string;
  detail: string;
  state: FirstLocalChangeTrialPanelState;
};

export type FirstLocalChangeTrialSurface = {
  id: string;
  title: string;
  eyebrow: string;
  state: FirstLocalChangeTrialPanelState;
  body: string;
  checklist: readonly FirstLocalChangeTrialChecklistItem[];
  placeholders: readonly string[];
};

export type FirstLocalChangeTrialRouteDefinition = {
  slug: FirstLocalChangeTrialRouteSlug;
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

export type FirstLocalChangeTrialRouteModel = {
  route: FirstLocalChangeTrialRouteDefinition;
  surfaces: readonly FirstLocalChangeTrialSurface[];
  globalSafetyCopy: readonly string[];
  targetFamilies: readonly string[];
  resultStates: readonly string[];
  recoveryOptions: readonly string[];
  timelineStages: readonly string[];
  summary: string;
};

export const FIRST_LOCAL_CHANGE_TRIAL_COCKPIT_LANGUAGE = [
  "First approved local change trial",
  "Local change goal packet",
  "Local change plan packet",
  "Local change file diff packet",
  "Local change command preview packet",
  "Local change approval ticket",
  "Local change apply hold",
  "Local change command hold",
  "Local change evidence preview",
  "Local change result preview",
  "Local change recovery preview",
  "Local change audit preview",
  "No real file mutation from the cockpit",
  "No real command execution from the cockpit",
].join(" | ");

const GLOBAL_SAFETY_COPY = [
  "Phase pages are dev/test surfaces only.",
  "Normal users should work from the cockpit.",
  "The first approved local change trial is preview-only in this batch.",
  "File writes remain blocked until explicit operator approval.",
  "Commands remain blocked until explicit operator approval.",
  "No real file mutation from the cockpit.",
  "No real command execution from the cockpit.",
  "No provider/model/connector/runtime execution occurs from this cockpit in this batch.",
  "No real mutation occurs from this cockpit in this batch.",
  "Evidence, result, audit, recovery, retry, rollback, export, queue, approval, and memory persistence remain blocked.",
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

const RESULT_STATES = ["success", "denied", "blocked", "failed", "timeout", "needs-review"] as const;

const RECOVERY_OPTIONS = ["rollback", "retry", "stop", "restore", "explain-failure", "manual-review"] as const;

const TIMELINE_STAGES = [
  "goal",
  "plan",
  "file diff",
  "command preview",
  "approval ticket",
  "apply hold",
  "command hold",
  "evidence",
  "result",
  "recovery",
  "audit",
] as const;

const SURFACES: readonly FirstLocalChangeTrialSurface[] = [
  {
    id: "goal-packet",
    title: "Local change goal packet",
    eyebrow: "Goal",
    state: "preview-only",
    body: "A tiny local project goal is described as static cockpit data without sending prompts, calling models, or selecting providers.",
    checklist: [
      {
        id: "goal-packet-tiny-change",
        label: "Tiny local project change",
        detail: "The example goal is small enough to inspect as a first trial but still passes through every approval checkpoint.",
        state: "preview-only",
      },
      {
        id: "goal-packet-model-routing-blocked",
        label: "Model routing blocked",
        detail: "Future model routing remains behind explicit operator approval and is not available from this preview.",
        state: "blocked",
      },
    ],
    placeholders: ["goal placeholder", "target family placeholder", "operator intent placeholder"],
  },
  {
    id: "plan-packet",
    title: "Local change plan packet",
    eyebrow: "Plan",
    state: "approval-required",
    body: "Plan steps connect goal, diff, command preview, approval, evidence, result, and recovery without executing the plan.",
    checklist: [
      {
        id: "plan-packet-sequence",
        label: "End-to-end preview sequence",
        detail: "Goal, plan, diff, command, approval, evidence, result, recovery, and audit appear in one deterministic loop.",
        state: "preview-only",
      },
      {
        id: "plan-packet-execution-blocked",
        label: "Plan execution blocked",
        detail: "No plan step can release a file writer, command runner, adapter, runtime, provider, or model.",
        state: "blocked",
      },
    ],
    placeholders: ["plan step placeholder", "dependency placeholder", "recovery step placeholder"],
  },
  {
    id: "file-diff-packet",
    title: "Local change file diff packet",
    eyebrow: "Diff",
    state: "blocked",
    body: "File diff packet shows a path guard, before preview, after preview, diff preview, and rollback preview without writing files.",
    checklist: [
      {
        id: "file-diff-path-guard",
        label: "Path guard visible",
        detail: "Target path review is static and bounded; it does not browse arbitrary files or mutate project files.",
        state: "blocked",
      },
      {
        id: "file-diff-rollback-preview",
        label: "Rollback preview visible",
        detail: "Rollback is represented as future recovery contract language and cannot execute.",
        state: "preview-only",
      },
    ],
    placeholders: ["path guard placeholder", "before placeholder", "after placeholder", "diff placeholder", "rollback placeholder"],
  },
  {
    id: "command-preview-packet",
    title: "Local change command preview packet",
    eyebrow: "Command",
    state: "blocked",
    body: "Command preview packet shows allowlist, arguments, working directory, environment names, evidence readiness, and result readiness without running commands.",
    checklist: [
      {
        id: "command-preview-allowlist",
        label: "Allowlist preview",
        detail: "The command is presented as metadata only and cannot start a shell, build, test, smoke, git, or runtime process.",
        state: "blocked",
      },
      {
        id: "command-preview-environment",
        label: "Environment values withheld",
        detail: "Environment placeholders do not read or reveal secrets, values, credentials, tokens, or local runtime state.",
        state: "blocked",
      },
    ],
    placeholders: ["command placeholder", "argument placeholder", "working directory placeholder", "environment name placeholder"],
  },
  {
    id: "approval-ticket",
    title: "Local change approval ticket",
    eyebrow: "Approval",
    state: "approval-required",
    body: "Approval ticket displays the future human gate as a non-persistent preview; it does not approve file writes or commands.",
    checklist: [
      {
        id: "approval-ticket-human",
        label: "Human approval required",
        detail: "The operator must explicitly approve before any future backend-owned flow can apply files or run commands.",
        state: "approval-required",
      },
      {
        id: "approval-ticket-no-persistence",
        label: "No approval persistence",
        detail: "The preview does not save decisions, create queue jobs, release locks, or promote memory.",
        state: "blocked",
      },
    ],
    placeholders: ["ticket id placeholder", "operator placeholder", "approval state placeholder"],
  },
  {
    id: "apply-hold",
    title: "Local change apply hold",
    eyebrow: "File mutation hold",
    state: "blocked",
    body: "Apply hold keeps file mutation blocked while the diff remains visible for review.",
    checklist: [
      {
        id: "apply-hold-no-write",
        label: "File mutation blocked",
        detail: "No file writer, patch applier, scaffold, export, rollback, or retry action is released from the UI.",
        state: "blocked",
      },
      {
        id: "apply-hold-approval",
        label: "Approval still required",
        detail: "Future apply requires explicit operator approval, path guard, diff preview, evidence capture, result capture, and rollback contract.",
        state: "approval-required",
      },
    ],
    placeholders: ["apply hold placeholder", "mutation blocked placeholder", "approval required placeholder"],
  },
  {
    id: "command-hold",
    title: "Local change command hold",
    eyebrow: "Execution hold",
    state: "blocked",
    body: "Command hold keeps command execution blocked while the validation command remains a preview.",
    checklist: [
      {
        id: "command-hold-no-run",
        label: "Command execution blocked",
        detail: "No shell, git, test, build, smoke, runtime, adapter, provider, connector, or automation command is executed.",
        state: "blocked",
      },
      {
        id: "command-hold-approval",
        label: "Approval still required",
        detail: "Future execution requires explicit operator approval, allowlist, argument guard, working-directory guard, environment guard, evidence capture, result capture, and recovery contract.",
        state: "approval-required",
      },
    ],
    placeholders: ["command hold placeholder", "execution blocked placeholder", "allowlist placeholder"],
  },
  {
    id: "evidence-preview",
    title: "Local change evidence preview",
    eyebrow: "Evidence",
    state: "preview-only",
    body: "Evidence preview shows diff, command, stdout, stderr, exit code, approval, and operator placeholders without persisting evidence.",
    checklist: [
      {
        id: "evidence-preview-output",
        label: "Output placeholders only",
        detail: "stdout, stderr, and exit code are labels for future captured evidence, not runtime output.",
        state: "preview-only",
      },
      {
        id: "evidence-preview-no-store",
        label: "Evidence persistence blocked",
        detail: "No evidence record, export, audit entry, result record, or queue item is written from this preview.",
        state: "blocked",
      },
    ],
    placeholders: ["diff evidence placeholder", "stdout placeholder", "stderr placeholder", "exit code placeholder", "approval placeholder"],
  },
  {
    id: "result-preview",
    title: "Local change result preview",
    eyebrow: "Result",
    state: "preview-only",
    body: "Result preview shows success, denied, blocked, failed, timeout, and needs-review states without persisting results.",
    checklist: [
      {
        id: "result-preview-states",
        label: "Result states visible",
        detail: "Every result state is deterministic review copy and cannot store or reuse command output.",
        state: "preview-only",
      },
      {
        id: "result-preview-no-store",
        label: "Result persistence blocked",
        detail: "No result store, memory promotion, audit record, export, or recovery action is triggered.",
        state: "blocked",
      },
    ],
    placeholders: ["success placeholder", "denied placeholder", "blocked placeholder", "failed placeholder", "timeout placeholder", "needs-review placeholder"],
  },
  {
    id: "recovery-preview",
    title: "Local change recovery preview",
    eyebrow: "Recovery",
    state: "blocked",
    body: "Recovery preview shows rollback, retry, stop, restore, and explain-failure options without executing recovery.",
    checklist: [
      {
        id: "recovery-preview-options",
        label: "Recovery options visible",
        detail: "Rollback, retry, stop, restore, explain-failure, and manual review are preview labels only.",
        state: "preview-only",
      },
      {
        id: "recovery-preview-execution-blocked",
        label: "Recovery execution blocked",
        detail: "No rollback, retry, restore, export, command, file mutation, or adapter execution is released.",
        state: "blocked",
      },
    ],
    placeholders: ["rollback placeholder", "retry placeholder", "stop placeholder", "restore placeholder", "explain-failure placeholder"],
  },
  {
    id: "audit-preview",
    title: "Local change audit preview",
    eyebrow: "Audit",
    state: "preview-only",
    body: "Audit preview shows goal, plan, approval, evidence, result, recovery, and operator placeholders without persisting audit logs.",
    checklist: [
      {
        id: "audit-preview-sequence",
        label: "Timeline placeholders visible",
        detail: "The audit timeline links goal, plan, diff, command, approval, evidence, result, recovery, and denial copy.",
        state: "preview-only",
      },
      {
        id: "audit-preview-no-store",
        label: "Audit persistence blocked",
        detail: "No audit log, approval decision, queue record, evidence record, result record, or memory update is written.",
        state: "blocked",
      },
    ],
    placeholders: ["goal audit placeholder", "plan audit placeholder", "approval audit placeholder", "operator placeholder"],
  },
  {
    id: "denied-path-review",
    title: "Local change denied path review",
    eyebrow: "Denied paths",
    state: "blocked",
    body: "Denied path review explains blocked file writes, commands, environment secrets, traversal, git mutation, install, deploy, runtime starts, adapters, and persistence.",
    checklist: [
      {
        id: "denied-path-file-command",
        label: "File and command paths blocked",
        detail: "File mutation, command execution, git mutation, test, build, smoke, install, deploy, and runtime starts remain denied.",
        state: "blocked",
      },
      {
        id: "denied-path-secrets",
        label: "Secrets and traversal blocked",
        detail: "Environment values, credentials, arbitrary traversal, connectors, providers, automations, and adapters remain unavailable.",
        state: "blocked",
      },
    ],
    placeholders: ["file write denied", "command denied", "secret denied", "traversal denied", "runtime denied"],
  },
] as const;

const ALL_SURFACE_IDS = SURFACES.map((surface) => surface.id);

const ROUTES: readonly FirstLocalChangeTrialRouteDefinition[] = [
  {
    slug: "codexforge-cockpit",
    href: "/codexforge-cockpit",
    phase: "Cockpit",
    title: "First approved local change trial",
    commandLabel: "Go to Unified CodexForge Cockpit",
    summary: "Cockpit preview for the first approved local project change trial keeps goal, plan, file diff, command preview, approval, holds, evidence, result, recovery, and audit in one place.",
    markerPhrases: [
      "First approved local change trial",
      "Local change goal packet",
      "Local change plan packet",
      "Local change file diff packet",
      "Local change command preview packet",
      "Local change approval ticket",
      "Local change apply hold",
      "Local change command hold",
      "Local change evidence preview",
      "Local change result preview",
      "Local change recovery preview",
      "Local change audit preview",
      "No real file mutation from the cockpit",
      "No real command execution from the cockpit",
    ],
    deniedCopy: "Denied first approved local change trial paths remain blocked from file mutation, command execution, environment secrets, traversal, git mutation, install, deploy, runtime starts, providers, connectors, adapters, persistence, recovery, retry, rollback, export, queues, hidden approvals, and automatic memory promotion.",
    approvalCopy: "Future local project changes require explicit operator approval, file-write path guard, diff preview, command allowlist, command guards, evidence capture, result capture, audit, and recovery contract.",
    surfaceIds: ALL_SURFACE_IDS,
    devOnly: false,
  },
  {
    slug: "first-local-change-trial-boundary",
    href: "/first-local-change-trial-boundary",
    phase: "Phase 1226",
    title: "First local change trial boundary",
    commandLabel: "Go to First Local Change Trial Boundary",
    summary: "Local change trial unifies goal plan diff command approval evidence result and recovery.",
    markerPhrases: [
      "First local change trial boundary",
      "First local change trial boundary does not write files or run commands",
      "First local change trial requires explicit operator approval",
      "Local change trial unifies goal plan diff command approval evidence result and recovery",
      "Denied first local change trial paths remain blocked",
      "First local change trial checklist",
    ],
    deniedCopy: "Denied first local change trial paths remain blocked.",
    approvalCopy: "First local change trial requires explicit operator approval.",
    surfaceIds: ["goal-packet", "plan-packet", "file-diff-packet", "command-preview-packet", "approval-ticket"],
    devOnly: true,
  },
  {
    slug: "local-change-goal-packet",
    href: "/local-change-goal-packet",
    phase: "Phase 1227",
    title: "Local change goal packet",
    commandLabel: "Go to Local Change Goal Packet",
    summary: "Goal packet describes a tiny local project change without sending prompts.",
    markerPhrases: [
      "Local change goal packet",
      "Local change goal packet does not call models",
      "Local change goal packet requires explicit operator approval before future model routing",
      "Goal packet describes a tiny local project change without sending prompts",
      "Denied local change goal paths remain blocked",
      "Local change goal checklist",
    ],
    deniedCopy: "Denied local change goal paths remain blocked.",
    approvalCopy: "Local change goal packet requires explicit operator approval before future model routing.",
    surfaceIds: ["goal-packet", "approval-ticket", "denied-path-review"],
    devOnly: true,
  },
  {
    slug: "local-change-plan-packet",
    href: "/local-change-plan-packet",
    phase: "Phase 1228",
    title: "Local change plan packet",
    commandLabel: "Go to Local Change Plan Packet",
    summary: "Plan packet shows file diff command preview evidence result and recovery steps.",
    markerPhrases: [
      "Local change plan packet",
      "Local change plan packet does not execute plans",
      "Local change plan requires explicit operator approval before future execution",
      "Plan packet shows file diff command preview evidence result and recovery steps",
      "Denied local change plan paths remain blocked",
      "Local change plan checklist",
    ],
    deniedCopy: "Denied local change plan paths remain blocked.",
    approvalCopy: "Local change plan requires explicit operator approval before future execution.",
    surfaceIds: ["plan-packet", "file-diff-packet", "command-preview-packet", "evidence-preview", "result-preview", "recovery-preview"],
    devOnly: true,
  },
  {
    slug: "local-change-file-diff-packet",
    href: "/local-change-file-diff-packet",
    phase: "Phase 1229",
    title: "Local change file diff packet",
    commandLabel: "Go to Local Change File Diff Packet",
    summary: "File diff packet shows path guard before after diff and rollback preview.",
    markerPhrases: [
      "Local change file diff packet",
      "Local change file diff packet does not write files",
      "Local change file diff requires explicit operator approval before future apply",
      "File diff packet shows path guard before after diff and rollback preview",
      "Denied local change file diff paths remain blocked",
      "Local change file diff checklist",
    ],
    deniedCopy: "Denied local change file diff paths remain blocked.",
    approvalCopy: "Local change file diff requires explicit operator approval before future apply.",
    surfaceIds: ["file-diff-packet", "apply-hold", "recovery-preview", "denied-path-review"],
    devOnly: true,
  },
  {
    slug: "local-change-command-preview-packet",
    href: "/local-change-command-preview-packet",
    phase: "Phase 1230",
    title: "Local change command preview packet",
    commandLabel: "Go to Local Change Command Preview Packet",
    summary: "Command preview packet shows allowlist arguments working directory environment evidence and result readiness.",
    markerPhrases: [
      "Local change command preview packet",
      "Local change command preview packet does not run commands",
      "Local change command preview requires explicit operator approval before future execution",
      "Command preview packet shows allowlist arguments working directory environment evidence and result readiness",
      "Denied local change command preview paths remain blocked",
      "Local change command preview checklist",
    ],
    deniedCopy: "Denied local change command preview paths remain blocked.",
    approvalCopy: "Local change command preview requires explicit operator approval before future execution.",
    surfaceIds: ["command-preview-packet", "command-hold", "evidence-preview", "result-preview", "denied-path-review"],
    devOnly: true,
  },
  {
    slug: "local-change-approval-ticket",
    href: "/local-change-approval-ticket",
    phase: "Phase 1231",
    title: "Local change approval ticket",
    commandLabel: "Go to Local Change Approval Ticket",
    summary: "Approval ticket keeps file writes and commands blocked.",
    markerPhrases: [
      "Local change approval ticket",
      "Local change approval ticket does not approve actions",
      "Local change approval ticket requires explicit human approval",
      "Approval ticket keeps file writes and commands blocked",
      "Denied local change approval paths remain blocked",
      "Local change approval checklist",
    ],
    deniedCopy: "Denied local change approval paths remain blocked.",
    approvalCopy: "Local change approval ticket requires explicit human approval.",
    surfaceIds: ["approval-ticket", "apply-hold", "command-hold", "audit-preview"],
    devOnly: true,
  },
  {
    slug: "local-change-apply-hold",
    href: "/local-change-apply-hold",
    phase: "Phase 1232",
    title: "Local change apply hold",
    commandLabel: "Go to Local Change Apply Hold",
    summary: "Apply hold keeps file mutation blocked.",
    markerPhrases: [
      "Local change apply hold",
      "Local change apply hold does not write files",
      "Local change apply hold requires explicit operator approval",
      "Apply hold keeps file mutation blocked",
      "Denied local change apply paths remain blocked",
      "Local change apply hold checklist",
    ],
    deniedCopy: "Denied local change apply paths remain blocked.",
    approvalCopy: "Local change apply hold requires explicit operator approval.",
    surfaceIds: ["apply-hold", "file-diff-packet", "approval-ticket", "denied-path-review"],
    devOnly: true,
  },
  {
    slug: "local-change-command-hold",
    href: "/local-change-command-hold",
    phase: "Phase 1233",
    title: "Local change command hold",
    commandLabel: "Go to Local Change Command Hold",
    summary: "Command hold keeps command execution blocked.",
    markerPhrases: [
      "Local change command hold",
      "Local change command hold does not run commands",
      "Local change command hold requires explicit operator approval",
      "Command hold keeps command execution blocked",
      "Denied local change command hold paths remain blocked",
      "Local change command hold checklist",
    ],
    deniedCopy: "Denied local change command hold paths remain blocked.",
    approvalCopy: "Local change command hold requires explicit operator approval.",
    surfaceIds: ["command-hold", "command-preview-packet", "approval-ticket", "denied-path-review"],
    devOnly: true,
  },
  {
    slug: "local-change-evidence-preview",
    href: "/local-change-evidence-preview",
    phase: "Phase 1234",
    title: "Local change evidence preview",
    commandLabel: "Go to Local Change Evidence Preview",
    summary: "Evidence preview shows file diff command stdout stderr exit code approval and operator placeholders.",
    markerPhrases: [
      "Local change evidence preview",
      "Local change evidence preview does not persist evidence",
      "Local change evidence preview requires explicit operator approval before future persistence",
      "Evidence preview shows file diff command stdout stderr exit code approval and operator placeholders",
      "Denied local change evidence paths remain blocked",
      "Local change evidence checklist",
    ],
    deniedCopy: "Denied local change evidence paths remain blocked.",
    approvalCopy: "Local change evidence preview requires explicit operator approval before future persistence.",
    surfaceIds: ["evidence-preview", "file-diff-packet", "command-preview-packet", "audit-preview"],
    devOnly: true,
  },
  {
    slug: "local-change-result-preview",
    href: "/local-change-result-preview",
    phase: "Phase 1235",
    title: "Local change result preview",
    commandLabel: "Go to Local Change Result Preview",
    summary: "Result preview shows success denied blocked failed timeout and needs-review states.",
    markerPhrases: [
      "Local change result preview",
      "Local change result preview does not persist results",
      "Local change result preview requires explicit operator approval before future persistence",
      "Result preview shows success denied blocked failed timeout and needs-review states",
      "Denied local change result paths remain blocked",
      "Local change result checklist",
    ],
    deniedCopy: "Denied local change result paths remain blocked.",
    approvalCopy: "Local change result preview requires explicit operator approval before future persistence.",
    surfaceIds: ["result-preview", "evidence-preview", "recovery-preview", "audit-preview"],
    devOnly: true,
  },
  {
    slug: "local-change-recovery-preview",
    href: "/local-change-recovery-preview",
    phase: "Phase 1236",
    title: "Local change recovery preview",
    commandLabel: "Go to Local Change Recovery Preview",
    summary: "Recovery preview shows rollback retry stop restore and explain-failure options.",
    markerPhrases: [
      "Local change recovery preview",
      "Local change recovery preview does not execute recovery",
      "Local change recovery preview requires explicit operator approval before future recovery",
      "Recovery preview shows rollback retry stop restore and explain-failure options",
      "Denied local change recovery paths remain blocked",
      "Local change recovery checklist",
    ],
    deniedCopy: "Denied local change recovery paths remain blocked.",
    approvalCopy: "Local change recovery preview requires explicit operator approval before future recovery.",
    surfaceIds: ["recovery-preview", "result-preview", "file-diff-packet", "command-preview-packet"],
    devOnly: true,
  },
  {
    slug: "local-change-audit-preview",
    href: "/local-change-audit-preview",
    phase: "Phase 1237",
    title: "Local change audit preview",
    commandLabel: "Go to Local Change Audit Preview",
    summary: "Audit preview shows goal plan approval evidence result recovery and operator placeholders.",
    markerPhrases: [
      "Local change audit preview",
      "Local change audit preview does not persist audit logs",
      "Local change audit preview requires explicit operator approval before future persistence",
      "Audit preview shows goal plan approval evidence result recovery and operator placeholders",
      "Denied local change audit paths remain blocked",
      "Local change audit checklist",
    ],
    deniedCopy: "Denied local change audit paths remain blocked.",
    approvalCopy: "Local change audit preview requires explicit operator approval before future persistence.",
    surfaceIds: ["audit-preview", "goal-packet", "plan-packet", "approval-ticket", "evidence-preview", "result-preview", "recovery-preview"],
    devOnly: true,
  },
  {
    slug: "local-change-cockpit-trial-view",
    href: "/local-change-cockpit-trial-view",
    phase: "Phase 1238",
    title: "Local change cockpit trial view",
    commandLabel: "Go to Local Change Cockpit Trial View",
    summary: "Cockpit trial view shows goal plan diff command approval evidence result recovery and audit in one place.",
    markerPhrases: [
      "Local change cockpit trial view",
      "Local change cockpit trial view does not write files or run commands",
      "Local change cockpit trial view requires explicit operator approval",
      "Cockpit trial view shows goal plan diff command approval evidence result recovery and audit in one place",
      "Denied local change cockpit trial paths remain blocked",
      "Local change cockpit trial checklist",
    ],
    deniedCopy: "Denied local change cockpit trial paths remain blocked.",
    approvalCopy: "Local change cockpit trial view requires explicit operator approval.",
    surfaceIds: ALL_SURFACE_IDS,
    devOnly: true,
  },
  {
    slug: "local-change-denied-path-review",
    href: "/local-change-denied-path-review",
    phase: "Phase 1239",
    title: "Local change denied path review",
    commandLabel: "Go to Local Change Denied Path Review",
    summary: "Denied path review explains blocked file writes commands env secrets traversal git mutation install deploy and runtime starts.",
    markerPhrases: [
      "Local change denied path review",
      "Local change denied path review does not mutate files or run commands",
      "Local change denied path review requires explicit operator approval",
      "Denied path review explains blocked file writes commands env secrets traversal git mutation install deploy and runtime starts",
      "Denied local change paths remain blocked",
      "Local change denied path checklist",
    ],
    deniedCopy: "Denied local change paths remain blocked.",
    approvalCopy: "Local change denied path review requires explicit operator approval.",
    surfaceIds: ["denied-path-review", "apply-hold", "command-hold", "approval-ticket"],
    devOnly: true,
  },
  {
    slug: "first-approved-local-change-candidate",
    href: "/first-approved-local-change-candidate",
    phase: "Phase 1240",
    title: "First approved local change candidate",
    commandLabel: "Go to First Approved Local Change Candidate",
    summary: "Candidate combines local goal plan diff command approval holds evidence result recovery audit and cockpit trial view.",
    markerPhrases: [
      "First approved local change candidate",
      "First approved local change candidate does not write files or run commands",
      "First approved local change candidate requires explicit operator approval",
      "Candidate combines local goal plan diff command approval holds evidence result recovery audit and cockpit trial view",
      "Denied first approved local change paths remain blocked",
      "First approved local change checklist",
    ],
    deniedCopy: "Denied first approved local change paths remain blocked.",
    approvalCopy: "First approved local change candidate requires explicit operator approval.",
    surfaceIds: ALL_SURFACE_IDS,
    devOnly: true,
  },
  {
    slug: "controlled-first-local-change-trial-release-candidate",
    href: "/controlled-first-local-change-trial-release-candidate",
    phase: "Phase 1241",
    title: "Controlled first local change trial release candidate",
    commandLabel: "Go to Controlled First Local Change Trial Release Candidate",
    summary: "Release candidate moves CodexForge toward the first approved local project change.",
    markerPhrases: [
      "Controlled first local change trial release candidate",
      "Controlled first local change trial release candidate does not call models write files run commands persist evidence or execute recovery",
      "Controlled first local change trial release requires explicit operator approval",
      "Release candidate moves CodexForge toward the first approved local project change",
      "Denied controlled first local change paths remain blocked",
      "Controlled first local change trial release checklist",
    ],
    deniedCopy: "Denied controlled first local change paths remain blocked.",
    approvalCopy: "Controlled first local change trial release requires explicit operator approval.",
    surfaceIds: ALL_SURFACE_IDS,
    devOnly: true,
  },
] as const;

export function buildFirstLocalChangeTrialStableKey(parts: readonly string[]): string {
  return parts.join(":").toLowerCase().replace(/[^a-z0-9:/-]+/g, "-");
}

export function listFirstLocalChangeTrialRouteDefinitions(): readonly FirstLocalChangeTrialRouteDefinition[] {
  return ROUTES;
}

export function getFirstLocalChangeTrialRouteDefinition(
  slug: FirstLocalChangeTrialRouteSlug
): FirstLocalChangeTrialRouteDefinition {
  return ROUTES.find((candidate) => candidate.slug === slug) ?? ROUTES[0];
}

export function buildFirstLocalChangeTrialRouteModel(
  slug: FirstLocalChangeTrialRouteSlug = "codexforge-cockpit"
): FirstLocalChangeTrialRouteModel {
  const route = getFirstLocalChangeTrialRouteDefinition(slug);
  const surfaces = route.surfaceIds
    .map((surfaceId) => SURFACES.find((surface) => surface.id === surfaceId))
    .filter((surface): surface is FirstLocalChangeTrialSurface => Boolean(surface));

  return {
    route,
    surfaces,
    globalSafetyCopy: GLOBAL_SAFETY_COPY,
    targetFamilies: TARGET_FAMILIES,
    resultStates: RESULT_STATES,
    recoveryOptions: RECOVERY_OPTIONS,
    timelineStages: TIMELINE_STAGES,
    summary: summarizeFirstLocalChangeTrialRoute(route, surfaces),
  };
}

export function buildFirstLocalChangeTrialModel(): FirstLocalChangeTrialRouteModel {
  return buildFirstLocalChangeTrialRouteModel("codexforge-cockpit");
}

export function summarizeFirstLocalChangeTrialRoute(
  route: FirstLocalChangeTrialRouteDefinition,
  surfaces: readonly FirstLocalChangeTrialSurface[]
): string {
  return `${route.title} keeps ${surfaces.length} first local change trial surfaces static, deterministic, preview-only, approval-gated, and blocked from real mutation or command execution.`;
}

export function summarizeFirstLocalChangeTrialRouteModel(
  model = buildFirstLocalChangeTrialModel()
): string {
  return model.summary;
}
