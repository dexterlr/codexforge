export type ControlledExecutionReadinessGateRouteSlug =
  | "codexforge-cockpit"
  | "controlled-execution-readiness-gate-boundary"
  | "execution-readiness-goal-lock"
  | "execution-readiness-plan-lock"
  | "execution-readiness-diff-lock"
  | "execution-readiness-command-lock"
  | "execution-readiness-approval-lock"
  | "execution-readiness-evidence-lock"
  | "execution-readiness-result-lock"
  | "execution-readiness-recovery-lock"
  | "execution-readiness-audit-lock"
  | "execution-readiness-safety-lock"
  | "execution-readiness-operator-signoff"
  | "execution-readiness-denied-path-matrix"
  | "execution-readiness-go-no-go-summary"
  | "first-controlled-execution-readiness-candidate"
  | "controlled-execution-readiness-gate-release-candidate";

export type ControlledExecutionReadinessGatePanelState = "blocked" | "preview-only" | "approval-required" | "dev-test-only";

export type ControlledExecutionReadinessGateChecklistItem = {
  id: string;
  label: string;
  detail: string;
  state: ControlledExecutionReadinessGatePanelState;
};

export type ControlledExecutionReadinessGateSurface = {
  id: string;
  title: string;
  eyebrow: string;
  state: ControlledExecutionReadinessGatePanelState;
  body: string;
  checklist: readonly ControlledExecutionReadinessGateChecklistItem[];
  placeholders: readonly string[];
};

export type ControlledExecutionReadinessGateRouteDefinition = {
  slug: ControlledExecutionReadinessGateRouteSlug;
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

export type ControlledExecutionReadinessGateRouteModel = {
  route: ControlledExecutionReadinessGateRouteDefinition;
  surfaces: readonly ControlledExecutionReadinessGateSurface[];
  globalSafetyCopy: readonly string[];
  targetFamilies: readonly string[];
  readinessChecks: readonly string[];
  deniedPathMatrix: readonly string[];
  resultStates: readonly string[];
  recoveryOptions: readonly string[];
  summary: string;
};

export const CONTROLLED_EXECUTION_READINESS_GATE_COCKPIT_LANGUAGE = [
  "Controlled execution readiness gate",
  "Execution readiness goal lock",
  "Execution readiness plan lock",
  "Execution readiness diff lock",
  "Execution readiness command lock",
  "Execution readiness approval lock",
  "Execution readiness evidence lock",
  "Execution readiness result lock",
  "Execution readiness recovery lock",
  "Execution readiness audit lock",
  "Execution readiness safety lock",
  "Execution readiness operator signoff",
  "Execution readiness denied path matrix",
  "Execution readiness go no-go summary",
  "No real file mutation from the cockpit",
  "No real command execution from the cockpit",
  "No execution lock release from the cockpit",
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
  "No execution lock release from the cockpit.",
  "The controlled execution readiness gate is preview-only and cannot release execution.",
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

const READINESS_CHECKS = [
  "goal lock",
  "plan lock",
  "diff lock",
  "command lock",
  "approval lock",
  "evidence lock",
  "result lock",
  "recovery lock",
  "audit lock",
  "safety lock",
  "operator signoff",
  "denied path matrix",
  "go/no-go summary",
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

const RESULT_STATES = ["success", "denied", "blocked", "failed", "timeout", "needs-review", "manual-review"] as const;

const RECOVERY_OPTIONS = ["rollback", "retry", "stop", "restore", "explain failure", "manual review"] as const;

const SURFACES: readonly ControlledExecutionReadinessGateSurface[] = [
  {
    id: "gate-boundary",
    title: "Controlled execution readiness gate boundary",
    eyebrow: "Boundary",
    state: "blocked",
    body: "Defines the final preview-only preflight boundary before any future controlled operator run can exist. It checks goal, plan, diff, command, approval, evidence, result, recovery, audit, safety, signoff, denied paths, and go/no-go posture without releasing execution.",
    checklist: [
      {
        id: "gate-boundary-no-release",
        label: "Execution remains held",
        detail: "The gate does not release file writes, commands, queues, adapters, runtimes, persistence, exports, recovery, or memory promotion.",
        state: "blocked",
      },
      {
        id: "gate-boundary-approval-required",
        label: "Explicit operator approval required",
        detail: "Future execution still needs explicit approval, file-write path guard, diff preview, command allowlist, evidence capture, result capture, audit, and recovery contract.",
        state: "approval-required",
      },
    ],
    placeholders: ["readiness gate", "future run boundary", "approval guard", "execution hold"],
  },
  {
    id: "goal-lock",
    title: "Execution readiness goal lock",
    eyebrow: "Goal",
    state: "approval-required",
    body: "Confirms the operator goal, target family, constraints, and acceptance criteria are reviewed before future model routing or execution readiness can pass.",
    checklist: [
      {
        id: "goal-lock-reviewed",
        label: "Goal reviewed",
        detail: "The operator sees the requested outcome across broad build-anything targets before execution readiness can pass.",
        state: "preview-only",
      },
      {
        id: "goal-lock-model-routing-blocked",
        label: "Model routing blocked",
        detail: "The preview cannot call models, send prompts, route providers, or store hidden approval.",
        state: "blocked",
      },
    ],
    placeholders: ["operator goal", "target family", "constraints", "acceptance criteria"],
  },
  {
    id: "plan-lock",
    title: "Execution readiness plan lock",
    eyebrow: "Plan",
    state: "approval-required",
    body: "Confirms planned file and command actions are reviewed before future execution readiness can pass while the plan itself remains non-executable.",
    checklist: [
      {
        id: "plan-lock-actions-reviewed",
        label: "Planned actions reviewed",
        detail: "The preview names intended files, commands, evidence, result states, and recovery expectations.",
        state: "preview-only",
      },
      {
        id: "plan-lock-no-execution",
        label: "Plan execution blocked",
        detail: "The plan does not apply diffs, run commands, start runtimes, invoke adapters, create queues, or persist approvals.",
        state: "blocked",
      },
    ],
    placeholders: ["planned files", "planned commands", "risk review", "operator review"],
  },
  {
    id: "diff-lock",
    title: "Execution readiness diff lock",
    eyebrow: "Diff",
    state: "blocked",
    body: "Confirms path guard, before state, after state, diff preview, rollback preview, and denied mutation review before future execution readiness can pass.",
    checklist: [
      {
        id: "diff-lock-path-guard",
        label: "Path guard visible",
        detail: "Future file paths must be bounded, previewed, and approval-gated before mutation.",
        state: "approval-required",
      },
      {
        id: "diff-lock-no-write",
        label: "File mutation blocked",
        detail: "No file write, patch apply, export writing, rollback, restore, scaffold, or retry is available from the UI.",
        state: "blocked",
      },
    ],
    placeholders: ["path guard", "before state", "after state", "diff preview", "rollback preview"],
  },
  {
    id: "command-lock",
    title: "Execution readiness command lock",
    eyebrow: "Command",
    state: "blocked",
    body: "Confirms allowlist, arguments, working directory, environment, evidence, result, and recovery review before future command readiness can pass.",
    checklist: [
      {
        id: "command-lock-allowlist",
        label: "Allowlist reviewed",
        detail: "Command policy is visible as static text only; shell, git, test, build, smoke, runtime, server, and adapter execution remain blocked.",
        state: "blocked",
      },
      {
        id: "command-lock-evidence-result-recovery",
        label: "Evidence result recovery reviewed",
        detail: "Stdout, stderr, exit code, result state, and recovery expectations are placeholders, not captured runtime output.",
        state: "preview-only",
      },
    ],
    placeholders: ["allowlist", "arguments", "working directory", "environment names", "stdout", "stderr"],
  },
  {
    id: "approval-lock",
    title: "Execution readiness approval lock",
    eyebrow: "Approval",
    state: "approval-required",
    body: "Confirms approval scope, operator signoff, and blocked actions before future execution readiness can pass without persisting approval decisions.",
    checklist: [
      {
        id: "approval-lock-human",
        label: "Human approval required",
        detail: "Approval is a future explicit human decision, not a stored state in this preview.",
        state: "approval-required",
      },
      {
        id: "approval-lock-no-persistence",
        label: "Approval persistence blocked",
        detail: "No approval record, queue job, lock release, audit write, result write, or hidden approval is created.",
        state: "blocked",
      },
    ],
    placeholders: ["approval scope", "operator signoff", "blocked actions", "future approval contract"],
  },
  {
    id: "evidence-lock",
    title: "Execution readiness evidence lock",
    eyebrow: "Evidence",
    state: "preview-only",
    body: "Confirms diff, command, stdout, stderr, exit code, approval timestamp, and audit placeholders before future evidence readiness can pass.",
    checklist: [
      {
        id: "evidence-lock-placeholders",
        label: "Evidence placeholders visible",
        detail: "Evidence fields are deterministic labels only and are not persisted.",
        state: "preview-only",
      },
      {
        id: "evidence-lock-no-store",
        label: "Evidence persistence blocked",
        detail: "No evidence record, export, audit log, result record, queue transition, or memory update is written.",
        state: "blocked",
      },
    ],
    placeholders: ["diff", "command", "stdout", "stderr", "exit code", "approval timestamp", "audit"],
  },
  {
    id: "result-lock",
    title: "Execution readiness result lock",
    eyebrow: "Result",
    state: "preview-only",
    body: "Confirms success, denied, blocked, failed, timeout, needs-review, and manual-review states before future result readiness can pass.",
    checklist: [
      {
        id: "result-lock-states",
        label: "Result states visible",
        detail: "All result states are static labels and cannot trigger workflow transitions.",
        state: "preview-only",
      },
      {
        id: "result-lock-no-store",
        label: "Result persistence blocked",
        detail: "No result store, audit entry, queue update, memory promotion, retry, rollback, or recovery action is triggered.",
        state: "blocked",
      },
    ],
    placeholders: ["success", "denied", "blocked", "failed", "timeout", "needs-review", "manual-review"],
  },
  {
    id: "recovery-lock",
    title: "Execution readiness recovery lock",
    eyebrow: "Recovery",
    state: "blocked",
    body: "Confirms rollback, retry, stop, restore, explain-failure, and manual-review options before future recovery readiness can pass.",
    checklist: [
      {
        id: "recovery-lock-options",
        label: "Recovery options visible",
        detail: "Recovery options are future choices only and cannot execute from the UI.",
        state: "preview-only",
      },
      {
        id: "recovery-lock-execution-blocked",
        label: "Recovery execution blocked",
        detail: "No rollback, retry, restore, command, file mutation, adapter action, export, or queue transition is released.",
        state: "blocked",
      },
    ],
    placeholders: ["rollback", "retry", "stop", "restore", "explain failure", "manual review"],
  },
  {
    id: "audit-lock",
    title: "Execution readiness audit lock",
    eyebrow: "Audit",
    state: "preview-only",
    body: "Confirms goal, plan, diff, command, approval, evidence, result, recovery, safety, and signoff placeholders before future audit readiness can pass.",
    checklist: [
      {
        id: "audit-lock-placeholders",
        label: "Audit placeholders visible",
        detail: "Every readiness checkpoint is represented as deterministic review text.",
        state: "preview-only",
      },
      {
        id: "audit-lock-no-store",
        label: "Audit persistence blocked",
        detail: "No audit log, approval record, evidence record, result record, export, queue record, or memory update is written.",
        state: "blocked",
      },
    ],
    placeholders: ["goal", "plan", "diff", "command", "approval", "evidence", "result", "recovery", "safety", "signoff"],
  },
  {
    id: "safety-lock",
    title: "Execution readiness safety lock",
    eyebrow: "Safety",
    state: "blocked",
    body: "Blocks file writes, commands, models, providers, connectors, runtimes, adapters, persistence, export, recovery, queues, and memory promotion.",
    checklist: [
      {
        id: "safety-lock-blocked-actions",
        label: "Blocked actions explicit",
        detail: "File writes, commands, models, providers, connectors, runtimes, adapters, persistence, export, recovery, queues, and memory promotion stay blocked.",
        state: "blocked",
      },
      {
        id: "safety-lock-future-guards",
        label: "Future guards required",
        detail: "A future real run needs explicit approval, path guard, diff preview, command allowlist, evidence capture, result capture, audit, and recovery contract.",
        state: "approval-required",
      },
    ],
    placeholders: ["file writes", "commands", "models", "providers", "connectors", "adapters", "queues", "memory promotion"],
  },
  {
    id: "operator-signoff",
    title: "Execution readiness operator signoff",
    eyebrow: "Signoff",
    state: "approval-required",
    body: "Confirms goal, plan, diff, command, approval, evidence, result, recovery, audit, safety, and denied paths are reviewed without persisting signoff.",
    checklist: [
      {
        id: "operator-signoff-reviewed",
        label: "Signoff checklist visible",
        detail: "All readiness checkpoints appear in one review packet before future execution readiness can pass.",
        state: "preview-only",
      },
      {
        id: "operator-signoff-no-persistence",
        label: "Signoff persistence blocked",
        detail: "No signoff record, approval decision, lock release, queue job, result record, evidence record, or audit write occurs.",
        state: "blocked",
      },
    ],
    placeholders: ["goal", "plan", "diff", "command", "approval", "evidence", "result", "recovery", "audit", "safety"],
  },
  {
    id: "denied-path-matrix",
    title: "Execution readiness denied path matrix",
    eyebrow: "Denied paths",
    state: "blocked",
    body: "Lists blocked prompts, models, providers, connectors, files, commands, git, tests, builds, smokes, runtimes, adapters, persistence, export, recovery, queues, deploy, install, scaffold, secrets, and memory promotion paths.",
    checklist: [
      {
        id: "denied-path-matrix-visible",
        label: "Denied paths visible",
        detail: "Every denied class is visible as static review copy.",
        state: "preview-only",
      },
      {
        id: "denied-path-matrix-no-state-change",
        label: "Workflow state unchanged",
        detail: "The matrix does not mutate workflow state, persist policy, create queues, or approve actions.",
        state: "blocked",
      },
    ],
    placeholders: DENIED_PATH_MATRIX,
  },
  {
    id: "go-no-go-summary",
    title: "Execution readiness go no-go summary",
    eyebrow: "Go/no-go",
    state: "approval-required",
    body: "Reports preview-only status, blocked execution, and required future backend guards without releasing execution.",
    checklist: [
      {
        id: "go-no-go-status",
        label: "No-go for real execution",
        detail: "The current gate can only say preview-ready; real execution remains blocked until future backend guards exist.",
        state: "blocked",
      },
      {
        id: "go-no-go-guards",
        label: "Future backend guards listed",
        detail: "Approval, path guard, diff preview, command allowlist, evidence capture, result capture, audit, and recovery contract remain mandatory.",
        state: "approval-required",
      },
    ],
    placeholders: ["preview-only", "blocked execution", "backend guards", "operator approval", "no-go for execution"],
  },
] as const;

const ALL_SURFACE_IDS = SURFACES.map((surface) => surface.id);

const ROUTES: readonly ControlledExecutionReadinessGateRouteDefinition[] = [
  {
    slug: "codexforge-cockpit",
    href: "/codexforge-cockpit",
    phase: "Cockpit",
    title: "Controlled execution readiness gate",
    commandLabel: "Go to Unified CodexForge Cockpit",
    summary: "Cockpit preview of the controlled execution readiness gate before any future real operator run.",
    markerPhrases: [
      "Controlled execution readiness gate",
      "Execution readiness goal lock",
      "Execution readiness plan lock",
      "Execution readiness diff lock",
      "Execution readiness command lock",
      "Execution readiness approval lock",
      "Execution readiness evidence lock",
      "Execution readiness result lock",
      "Execution readiness recovery lock",
      "Execution readiness audit lock",
      "Execution readiness safety lock",
      "Execution readiness operator signoff",
      "Execution readiness denied path matrix",
      "Execution readiness go no-go summary",
      "No real file mutation from the cockpit",
      "No real command execution from the cockpit",
      "No execution lock release from the cockpit",
    ],
    deniedCopy: "Denied controlled execution readiness cockpit paths remain blocked: no prompts, model calls, provider calls, connector calls, file mutation, command execution, git, tests, builds, smokes, runtime starts, adapter execution, persistence, exports, recovery, queues, deploys, installs, scaffolds, secret reads, or memory promotion.",
    approvalCopy: "Future controlled operator runs require explicit operator approval plus file-write path guard, diff preview, command allowlist, command guards, evidence capture, result capture, audit, recovery contract, and readiness gate pass.",
    surfaceIds: ALL_SURFACE_IDS,
    devOnly: false,
  },
  {
    slug: "controlled-execution-readiness-gate-boundary",
    href: "/controlled-execution-readiness-gate-boundary",
    phase: "Phase 1274",
    title: "Controlled execution readiness gate boundary",
    commandLabel: "Go to Controlled Execution Readiness Gate Boundary",
    summary: "Controlled execution readiness gate boundary verifies every future-run prerequisite while execution remains blocked.",
    markerPhrases: [
      "Controlled execution readiness gate boundary",
      "Controlled execution readiness gate boundary does not release execution",
      "Controlled execution readiness gate requires explicit operator approval",
      "Readiness gate checks goal plan diff command approval evidence result recovery audit safety and operator signoff",
      "Denied controlled execution readiness paths remain blocked",
      "Controlled execution readiness gate checklist",
    ],
    deniedCopy: "Denied controlled execution readiness paths remain blocked.",
    approvalCopy: "Controlled execution readiness gate requires explicit operator approval.",
    surfaceIds: ALL_SURFACE_IDS,
    devOnly: true,
  },
  {
    slug: "execution-readiness-goal-lock",
    href: "/execution-readiness-goal-lock",
    phase: "Phase 1275",
    title: "Execution readiness goal lock",
    commandLabel: "Go to Execution Readiness Goal Lock",
    summary: "Goal lock confirms the operator goal is reviewed before execution readiness can pass.",
    markerPhrases: [
      "Execution readiness goal lock",
      "Execution readiness goal lock does not call models or send prompts",
      "Execution readiness goal lock requires explicit operator approval before future model routing",
      "Goal lock confirms the operator goal is reviewed before execution readiness can pass",
      "Denied execution readiness goal paths remain blocked",
      "Execution readiness goal lock checklist",
    ],
    deniedCopy: "Denied execution readiness goal paths remain blocked.",
    approvalCopy: "Execution readiness goal lock requires explicit operator approval before future model routing.",
    surfaceIds: ["goal-lock", "gate-boundary", "safety-lock", "operator-signoff"],
    devOnly: true,
  },
  {
    slug: "execution-readiness-plan-lock",
    href: "/execution-readiness-plan-lock",
    phase: "Phase 1276",
    title: "Execution readiness plan lock",
    commandLabel: "Go to Execution Readiness Plan Lock",
    summary: "Plan lock confirms planned file and command actions are reviewed before execution readiness can pass.",
    markerPhrases: [
      "Execution readiness plan lock",
      "Execution readiness plan lock does not execute plans",
      "Execution readiness plan lock requires explicit operator approval",
      "Plan lock confirms planned file and command actions are reviewed before execution readiness can pass",
      "Denied execution readiness plan paths remain blocked",
      "Execution readiness plan lock checklist",
    ],
    deniedCopy: "Denied execution readiness plan paths remain blocked.",
    approvalCopy: "Execution readiness plan lock requires explicit operator approval.",
    surfaceIds: ["plan-lock", "goal-lock", "diff-lock", "command-lock", "safety-lock"],
    devOnly: true,
  },
  {
    slug: "execution-readiness-diff-lock",
    href: "/execution-readiness-diff-lock",
    phase: "Phase 1277",
    title: "Execution readiness diff lock",
    commandLabel: "Go to Execution Readiness Diff Lock",
    summary: "Diff lock confirms path guard before after diff rollback and denied mutation review before execution readiness can pass.",
    markerPhrases: [
      "Execution readiness diff lock",
      "Execution readiness diff lock does not write files or apply diffs",
      "Execution readiness diff lock requires explicit operator approval",
      "Diff lock confirms path guard before after diff rollback and denied mutation review before execution readiness can pass",
      "Denied execution readiness diff paths remain blocked",
      "Execution readiness diff lock checklist",
    ],
    deniedCopy: "Denied execution readiness diff paths remain blocked.",
    approvalCopy: "Execution readiness diff lock requires explicit operator approval.",
    surfaceIds: ["diff-lock", "plan-lock", "approval-lock", "recovery-lock", "safety-lock"],
    devOnly: true,
  },
  {
    slug: "execution-readiness-command-lock",
    href: "/execution-readiness-command-lock",
    phase: "Phase 1278",
    title: "Execution readiness command lock",
    commandLabel: "Go to Execution Readiness Command Lock",
    summary: "Command lock confirms allowlist arguments working directory environment evidence result and recovery review before execution readiness can pass.",
    markerPhrases: [
      "Execution readiness command lock",
      "Execution readiness command lock does not run commands",
      "Execution readiness command lock requires explicit operator approval",
      "Command lock confirms allowlist arguments working directory environment evidence result and recovery review before execution readiness can pass",
      "Denied execution readiness command paths remain blocked",
      "Execution readiness command lock checklist",
    ],
    deniedCopy: "Denied execution readiness command paths remain blocked.",
    approvalCopy: "Execution readiness command lock requires explicit operator approval.",
    surfaceIds: ["command-lock", "plan-lock", "approval-lock", "evidence-lock", "result-lock", "recovery-lock"],
    devOnly: true,
  },
  {
    slug: "execution-readiness-approval-lock",
    href: "/execution-readiness-approval-lock",
    phase: "Phase 1279",
    title: "Execution readiness approval lock",
    commandLabel: "Go to Execution Readiness Approval Lock",
    summary: "Approval lock confirms approval scope operator signoff and blocked actions before execution readiness can pass.",
    markerPhrases: [
      "Execution readiness approval lock",
      "Execution readiness approval lock does not approve actions or persist approvals",
      "Execution readiness approval lock requires explicit human approval",
      "Approval lock confirms approval scope operator signoff and blocked actions before execution readiness can pass",
      "Denied execution readiness approval paths remain blocked",
      "Execution readiness approval lock checklist",
    ],
    deniedCopy: "Denied execution readiness approval paths remain blocked.",
    approvalCopy: "Execution readiness approval lock requires explicit human approval.",
    surfaceIds: ["approval-lock", "operator-signoff", "denied-path-matrix", "safety-lock"],
    devOnly: true,
  },
  {
    slug: "execution-readiness-evidence-lock",
    href: "/execution-readiness-evidence-lock",
    phase: "Phase 1280",
    title: "Execution readiness evidence lock",
    commandLabel: "Go to Execution Readiness Evidence Lock",
    summary: "Evidence lock confirms diff command stdout stderr exit code approval timestamp and audit placeholders before execution readiness can pass.",
    markerPhrases: [
      "Execution readiness evidence lock",
      "Execution readiness evidence lock does not persist evidence",
      "Execution readiness evidence lock requires explicit operator approval",
      "Evidence lock confirms diff command stdout stderr exit code approval timestamp and audit placeholders before execution readiness can pass",
      "Denied execution readiness evidence paths remain blocked",
      "Execution readiness evidence lock checklist",
    ],
    deniedCopy: "Denied execution readiness evidence paths remain blocked.",
    approvalCopy: "Execution readiness evidence lock requires explicit operator approval.",
    surfaceIds: ["evidence-lock", "diff-lock", "command-lock", "approval-lock", "audit-lock"],
    devOnly: true,
  },
  {
    slug: "execution-readiness-result-lock",
    href: "/execution-readiness-result-lock",
    phase: "Phase 1281",
    title: "Execution readiness result lock",
    commandLabel: "Go to Execution Readiness Result Lock",
    summary: "Result lock confirms success denied blocked failed timeout needs-review and manual-review states before execution readiness can pass.",
    markerPhrases: [
      "Execution readiness result lock",
      "Execution readiness result lock does not persist results",
      "Execution readiness result lock requires explicit operator approval",
      "Result lock confirms success denied blocked failed timeout needs-review and manual-review states before execution readiness can pass",
      "Denied execution readiness result paths remain blocked",
      "Execution readiness result lock checklist",
    ],
    deniedCopy: "Denied execution readiness result paths remain blocked.",
    approvalCopy: "Execution readiness result lock requires explicit operator approval.",
    surfaceIds: ["result-lock", "evidence-lock", "recovery-lock", "audit-lock", "go-no-go-summary"],
    devOnly: true,
  },
  {
    slug: "execution-readiness-recovery-lock",
    href: "/execution-readiness-recovery-lock",
    phase: "Phase 1282",
    title: "Execution readiness recovery lock",
    commandLabel: "Go to Execution Readiness Recovery Lock",
    summary: "Recovery lock confirms rollback retry stop restore explain-failure and manual-review options before execution readiness can pass.",
    markerPhrases: [
      "Execution readiness recovery lock",
      "Execution readiness recovery lock does not execute recovery",
      "Execution readiness recovery lock requires explicit operator approval",
      "Recovery lock confirms rollback retry stop restore explain-failure and manual-review options before execution readiness can pass",
      "Denied execution readiness recovery paths remain blocked",
      "Execution readiness recovery lock checklist",
    ],
    deniedCopy: "Denied execution readiness recovery paths remain blocked.",
    approvalCopy: "Execution readiness recovery lock requires explicit operator approval.",
    surfaceIds: ["recovery-lock", "result-lock", "audit-lock", "safety-lock", "operator-signoff"],
    devOnly: true,
  },
  {
    slug: "execution-readiness-audit-lock",
    href: "/execution-readiness-audit-lock",
    phase: "Phase 1283",
    title: "Execution readiness audit lock",
    commandLabel: "Go to Execution Readiness Audit Lock",
    summary: "Audit lock confirms goal plan diff command approval evidence result recovery safety and signoff placeholders before execution readiness can pass.",
    markerPhrases: [
      "Execution readiness audit lock",
      "Execution readiness audit lock does not persist audit logs",
      "Execution readiness audit lock requires explicit operator approval",
      "Audit lock confirms goal plan diff command approval evidence result recovery safety and signoff placeholders before execution readiness can pass",
      "Denied execution readiness audit paths remain blocked",
      "Execution readiness audit lock checklist",
    ],
    deniedCopy: "Denied execution readiness audit paths remain blocked.",
    approvalCopy: "Execution readiness audit lock requires explicit operator approval.",
    surfaceIds: ["audit-lock", "goal-lock", "plan-lock", "evidence-lock", "result-lock", "operator-signoff"],
    devOnly: true,
  },
  {
    slug: "execution-readiness-safety-lock",
    href: "/execution-readiness-safety-lock",
    phase: "Phase 1284",
    title: "Execution readiness safety lock",
    commandLabel: "Go to Execution Readiness Safety Lock",
    summary: "Safety lock blocks file writes commands models providers connectors runtimes adapters persistence export recovery queues and memory promotion.",
    markerPhrases: [
      "Execution readiness safety lock",
      "Execution readiness safety lock does not release actions",
      "Execution readiness safety lock requires explicit operator approval",
      "Safety lock blocks file writes commands models providers connectors runtimes adapters persistence export recovery queues and memory promotion",
      "Denied execution readiness safety paths remain blocked",
      "Execution readiness safety lock checklist",
    ],
    deniedCopy: "Denied execution readiness safety paths remain blocked.",
    approvalCopy: "Execution readiness safety lock requires explicit operator approval.",
    surfaceIds: ["safety-lock", "gate-boundary", "approval-lock", "denied-path-matrix", "go-no-go-summary"],
    devOnly: true,
  },
  {
    slug: "execution-readiness-operator-signoff",
    href: "/execution-readiness-operator-signoff",
    phase: "Phase 1285",
    title: "Execution readiness operator signoff",
    commandLabel: "Go to Execution Readiness Operator Signoff",
    summary: "Operator signoff confirms goal plan diff command approval evidence result recovery audit safety and denied paths.",
    markerPhrases: [
      "Execution readiness operator signoff",
      "Execution readiness operator signoff does not persist signoff or approve execution",
      "Execution readiness operator signoff requires explicit human approval",
      "Operator signoff confirms goal plan diff command approval evidence result recovery audit safety and denied paths",
      "Denied execution readiness signoff paths remain blocked",
      "Execution readiness operator signoff checklist",
    ],
    deniedCopy: "Denied execution readiness signoff paths remain blocked.",
    approvalCopy: "Execution readiness operator signoff requires explicit human approval.",
    surfaceIds: ["operator-signoff", "goal-lock", "plan-lock", "approval-lock", "audit-lock", "safety-lock"],
    devOnly: true,
  },
  {
    slug: "execution-readiness-denied-path-matrix",
    href: "/execution-readiness-denied-path-matrix",
    phase: "Phase 1286",
    title: "Execution readiness denied path matrix",
    commandLabel: "Go to Execution Readiness Denied Path Matrix",
    summary: "Denied path matrix lists blocked prompts models providers connectors files commands git tests builds smokes runtimes adapters persistence export recovery queues deploy install scaffold secrets and memory promotion.",
    markerPhrases: [
      "Execution readiness denied path matrix",
      "Execution readiness denied path matrix does not mutate workflow state",
      "Execution readiness denied path matrix requires explicit operator approval",
      "Denied path matrix lists blocked prompts models providers connectors files commands git tests builds smokes runtimes adapters persistence export recovery queues deploy install scaffold secrets and memory promotion",
      "Denied execution readiness matrix paths remain blocked",
      "Execution readiness denied path matrix checklist",
    ],
    deniedCopy: "Denied execution readiness matrix paths remain blocked.",
    approvalCopy: "Execution readiness denied path matrix requires explicit operator approval.",
    surfaceIds: ["denied-path-matrix", "safety-lock", "approval-lock", "go-no-go-summary"],
    devOnly: true,
  },
  {
    slug: "execution-readiness-go-no-go-summary",
    href: "/execution-readiness-go-no-go-summary",
    phase: "Phase 1287",
    title: "Execution readiness go no-go summary",
    commandLabel: "Go to Execution Readiness Go No Go Summary",
    summary: "Go no-go summary reports preview-only status blocked execution and required future backend guards.",
    markerPhrases: [
      "Execution readiness go no-go summary",
      "Execution readiness go no-go summary does not release execution",
      "Execution readiness go no-go summary requires explicit operator approval",
      "Go no-go summary reports preview-only status blocked execution and required future backend guards",
      "Denied execution readiness go no-go paths remain blocked",
      "Execution readiness go no-go checklist",
    ],
    deniedCopy: "Denied execution readiness go no-go paths remain blocked.",
    approvalCopy: "Execution readiness go no-go summary requires explicit operator approval.",
    surfaceIds: ["go-no-go-summary", "result-lock", "recovery-lock", "operator-signoff", "safety-lock"],
    devOnly: true,
  },
  {
    slug: "first-controlled-execution-readiness-candidate",
    href: "/first-controlled-execution-readiness-candidate",
    phase: "Phase 1288",
    title: "First controlled execution readiness candidate",
    commandLabel: "Go to First Controlled Execution Readiness Candidate",
    summary: "Candidate combines every lock, signoff, denied path matrix, and go/no-go summary.",
    markerPhrases: [
      "First controlled execution readiness candidate",
      "First controlled execution readiness candidate does not release execution",
      "First controlled execution readiness candidate requires explicit operator approval",
      "Candidate combines goal lock plan lock diff lock command lock approval lock evidence lock result lock recovery lock audit lock safety lock signoff denied path matrix and go no-go summary",
      "Denied first controlled execution readiness paths remain blocked",
      "First controlled execution readiness checklist",
    ],
    deniedCopy: "Denied first controlled execution readiness paths remain blocked.",
    approvalCopy: "First controlled execution readiness candidate requires explicit operator approval.",
    surfaceIds: ALL_SURFACE_IDS,
    devOnly: true,
  },
  {
    slug: "controlled-execution-readiness-gate-release-candidate",
    href: "/controlled-execution-readiness-gate-release-candidate",
    phase: "Phase 1289",
    title: "Controlled execution readiness gate release candidate",
    commandLabel: "Go to Controlled Execution Readiness Gate Release Candidate",
    summary: "Release candidate prepares CodexForge for a future real controlled operator run without executing it.",
    markerPhrases: [
      "Controlled execution readiness gate release candidate",
      "Controlled execution readiness gate release candidate does not call models write files run commands persist approvals create queues release locks persist results or execute recovery",
      "Controlled execution readiness gate release requires explicit operator approval",
      "Release candidate prepares CodexForge for a future real controlled operator run without executing it",
      "Denied controlled execution readiness gate paths remain blocked",
      "Controlled execution readiness gate release checklist",
    ],
    deniedCopy: "Denied controlled execution readiness gate paths remain blocked.",
    approvalCopy: "Controlled execution readiness gate release requires explicit operator approval.",
    surfaceIds: ALL_SURFACE_IDS,
    devOnly: true,
  },
] as const;

export function buildControlledExecutionReadinessGateStableKey(parts: readonly string[]): string {
  return parts.join(":").toLowerCase().replace(/[^a-z0-9:/-]+/g, "-");
}

export function listControlledExecutionReadinessGateRouteDefinitions(): readonly ControlledExecutionReadinessGateRouteDefinition[] {
  return ROUTES;
}

export function getControlledExecutionReadinessGateRouteDefinition(
  slug: ControlledExecutionReadinessGateRouteSlug
): ControlledExecutionReadinessGateRouteDefinition {
  return ROUTES.find((candidate) => candidate.slug === slug) ?? ROUTES[0];
}

export function buildControlledExecutionReadinessGateRouteModel(
  slug: ControlledExecutionReadinessGateRouteSlug = "codexforge-cockpit"
): ControlledExecutionReadinessGateRouteModel {
  const route = getControlledExecutionReadinessGateRouteDefinition(slug);
  const surfaces = route.surfaceIds
    .map((surfaceId) => SURFACES.find((surface) => surface.id === surfaceId))
    .filter((surface): surface is ControlledExecutionReadinessGateSurface => Boolean(surface));

  return {
    route,
    surfaces,
    globalSafetyCopy: GLOBAL_SAFETY_COPY,
    targetFamilies: TARGET_FAMILIES,
    readinessChecks: READINESS_CHECKS,
    deniedPathMatrix: DENIED_PATH_MATRIX,
    resultStates: RESULT_STATES,
    recoveryOptions: RECOVERY_OPTIONS,
    summary: summarizeControlledExecutionReadinessGateRoute(route, surfaces),
  };
}

export function buildControlledExecutionReadinessGateModel(): ControlledExecutionReadinessGateRouteModel {
  return buildControlledExecutionReadinessGateRouteModel("codexforge-cockpit");
}

export function summarizeControlledExecutionReadinessGateRoute(
  route: ControlledExecutionReadinessGateRouteDefinition,
  surfaces: readonly ControlledExecutionReadinessGateSurface[]
): string {
  return `${route.title} keeps ${surfaces.length} controlled execution readiness surfaces static, deterministic, preview-only, approval-gated, and blocked from real mutation or command execution.`;
}

export function summarizeControlledExecutionReadinessGateRouteModel(
  model = buildControlledExecutionReadinessGateModel()
): string {
  return model.summary;
}
