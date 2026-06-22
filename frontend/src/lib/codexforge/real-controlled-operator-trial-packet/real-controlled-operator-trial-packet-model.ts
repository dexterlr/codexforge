export type RealControlledOperatorTrialPacketRouteSlug =
  | "codexforge-cockpit"
  | "real-controlled-operator-trial-packet-boundary"
  | "real-trial-goal-packet"
  | "real-trial-project-context-packet"
  | "real-trial-file-write-packet"
  | "real-trial-command-packet"
  | "real-trial-approval-packet"
  | "real-trial-execution-hold-packet"
  | "real-trial-evidence-capture-packet"
  | "real-trial-result-capture-packet"
  | "real-trial-recovery-packet"
  | "real-trial-audit-packet"
  | "real-trial-operator-checklist"
  | "real-trial-denied-path-checklist"
  | "real-trial-go-no-go-review"
  | "first-real-controlled-operator-trial-candidate"
  | "controlled-real-operator-trial-packet-release-candidate";

export type RealControlledOperatorTrialPacketPanelState =
  | "blocked"
  | "preview-only"
  | "approval-required"
  | "dev-test-only";

export type RealControlledOperatorTrialPacketChecklistItem = {
  id: string;
  label: string;
  detail: string;
  state: RealControlledOperatorTrialPacketPanelState;
};

export type RealControlledOperatorTrialPacketSurface = {
  id: string;
  title: string;
  eyebrow: string;
  state: RealControlledOperatorTrialPacketPanelState;
  body: string;
  checklist: readonly RealControlledOperatorTrialPacketChecklistItem[];
  placeholders: readonly string[];
};

export type RealControlledOperatorTrialPacketRouteDefinition = {
  slug: RealControlledOperatorTrialPacketRouteSlug;
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

export type RealControlledOperatorTrialPacketRouteModel = {
  route: RealControlledOperatorTrialPacketRouteDefinition;
  surfaces: readonly RealControlledOperatorTrialPacketSurface[];
  globalSafetyCopy: readonly string[];
  targetFamilies: readonly string[];
  packetFlow: readonly string[];
  deniedPathMatrix: readonly string[];
  resultStates: readonly string[];
  recoveryOptions: readonly string[];
  futureBackendGuards: readonly string[];
  summary: string;
};

export const REAL_CONTROLLED_OPERATOR_TRIAL_PACKET_COCKPIT_LANGUAGE = [
  "Real controlled operator trial packet",
  "Real trial goal packet",
  "Real trial project context packet",
  "Real trial file write packet",
  "Real trial command packet",
  "Real trial approval packet",
  "Real trial execution hold packet",
  "Real trial evidence capture packet",
  "Real trial result capture packet",
  "Real trial recovery packet",
  "Real trial audit packet",
  "Real trial operator checklist",
  "Real trial denied path checklist",
  "Real trial go no-go review",
  "No real file mutation from the cockpit",
  "No real command execution from the cockpit",
  "No real operator trial execution from the cockpit",
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
  "No real operator trial execution from the cockpit.",
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

const PACKET_FLOW = [
  "goal",
  "project context",
  "proposed file write",
  "proposed command",
  "approval packet",
  "execution hold",
  "evidence capture plan",
  "result capture plan",
  "recovery plan",
  "audit packet",
  "operator checklist",
  "denied path checklist",
  "go/no-go review",
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

const RECOVERY_OPTIONS = ["rollback", "retry", "stop", "restore", "explain-failure", "manual-review"] as const;

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
  "recovery contract",
] as const;

const SURFACES: readonly RealControlledOperatorTrialPacketSurface[] = [
  {
    id: "packet-boundary",
    title: "Real controlled operator trial packet boundary",
    eyebrow: "Boundary",
    state: "blocked",
    body: "Defines the first real controlled operator trial packet as a preview-only review packet. It prepares goal, context, file write, command, approval, hold, evidence, result, recovery, audit, checklist, denied paths, and go/no-go review without executing the real trial.",
    checklist: [
      {
        id: "packet-boundary-no-execution",
        label: "Real trial execution blocked",
        detail: "The packet does not call models, write files, run commands, persist approvals, create queues, release locks, persist evidence or results, or execute recovery.",
        state: "blocked",
      },
      {
        id: "packet-boundary-approval-required",
        label: "Explicit approval required",
        detail: "Future execution remains behind operator approval plus backend-owned guards for file writes, commands, evidence, results, audit, and recovery.",
        state: "approval-required",
      },
    ],
    placeholders: ["packet boundary", "future controlled run", "blocked execution", "approval gate"],
  },
  {
    id: "goal-packet",
    title: "Real trial goal packet",
    eyebrow: "Goal",
    state: "approval-required",
    body: "Describes the real operator request before execution can be considered across games, apps, websites, dashboards, tools, research, automation, creative, trading, data, documentation, integration, and general project targets.",
    checklist: [
      {
        id: "goal-packet-request-visible",
        label: "Operator request visible",
        detail: "The goal is shown as review text and does not send prompts, call models, route providers, or persist hidden approval.",
        state: "preview-only",
      },
      {
        id: "goal-packet-model-routing-blocked",
        label: "Future model routing blocked",
        detail: "Any future model routing requires explicit operator approval before a prompt can leave the cockpit.",
        state: "blocked",
      },
    ],
    placeholders: ["operator goal", "target family", "constraints", "acceptance criteria"],
  },
  {
    id: "project-context-packet",
    title: "Real trial project context packet",
    eyebrow: "Context",
    state: "approval-required",
    body: "Shows bounded workspace context for a future controlled run without arbitrary browsing, secret reads, credential exposure, or indexing execution.",
    checklist: [
      {
        id: "project-context-bounded",
        label: "Bounded context only",
        detail: "Context remains static review content and does not browse arbitrary files, read secrets, call connectors, or start indexing.",
        state: "preview-only",
      },
      {
        id: "project-context-approval-required",
        label: "Indexing approval required",
        detail: "Future indexing or broader context collection requires explicit operator approval and backend-owned path guards.",
        state: "approval-required",
      },
    ],
    placeholders: ["workspace root", "allowed context", "secret redaction", "bounded indexing"],
  },
  {
    id: "file-write-packet",
    title: "Real trial file write packet",
    eyebrow: "File write",
    state: "approval-required",
    body: "Shows a proposed target path guard, before state, after state, diff preview, rollback plan, and denied mutation review without writing files or applying diffs.",
    checklist: [
      {
        id: "file-write-preview-only",
        label: "Mutation blocked",
        detail: "The packet does not write files, apply diffs, persist approvals, persist evidence, export files, or execute rollback.",
        state: "blocked",
      },
      {
        id: "file-write-path-guard",
        label: "Path guard required",
        detail: "Future file writes require explicit approval, backend path guard, diff preview, evidence capture, result capture, audit, and rollback contract.",
        state: "approval-required",
      },
    ],
    placeholders: ["target path guard", "before state", "after state", "diff preview", "rollback preview"],
  },
  {
    id: "command-packet",
    title: "Real trial command packet",
    eyebrow: "Command",
    state: "approval-required",
    body: "Shows a proposed allowlisted command, argument guard, working directory guard, environment names, evidence plan, result plan, and recovery readiness without running commands.",
    checklist: [
      {
        id: "command-preview-only",
        label: "Command execution blocked",
        detail: "The packet does not run shell commands, git commands, tests, builds, smokes, runtimes, adapters, or dry-run execution.",
        state: "blocked",
      },
      {
        id: "command-guards-required",
        label: "Command guards required",
        detail: "Future command execution requires explicit approval, allowlist, argument guard, working-directory guard, environment guard, evidence capture, result capture, audit, and recovery contract.",
        state: "approval-required",
      },
    ],
    placeholders: ["allowlist", "arguments", "working directory", "environment names", "stdout stderr exit code"],
  },
  {
    id: "approval-packet",
    title: "Real trial approval packet",
    eyebrow: "Approval",
    state: "approval-required",
    body: "Explains exactly what would be approved in a future run and what remains blocked. It does not approve actions, persist approvals, release locks, or create queue jobs.",
    checklist: [
      {
        id: "approval-no-persistence",
        label: "Approval persistence blocked",
        detail: "The packet records no approval decision and creates no queue, lock release, backend run, or hidden approval.",
        state: "blocked",
      },
      {
        id: "approval-human-required",
        label: "Human approval required",
        detail: "A future operator must explicitly approve the final guarded packet before any real action can be considered.",
        state: "approval-required",
      },
    ],
    placeholders: ["approval scope", "operator identity placeholder", "timestamp placeholder", "blocked action list"],
  },
  {
    id: "execution-hold-packet",
    title: "Real trial execution hold packet",
    eyebrow: "Hold",
    state: "blocked",
    body: "Keeps file writes, commands, models, providers, connectors, runtimes, adapters, persistence, recovery, exports, queues, and memory promotion blocked until future explicit approval and backend guards exist.",
    checklist: [
      {
        id: "execution-hold-no-release",
        label: "Lock release blocked",
        detail: "The packet does not release execution locks, create runs, start runtimes, spawn processes, bind ports, or execute adapters.",
        state: "blocked",
      },
      {
        id: "execution-hold-future-guard",
        label: "Backend guard required",
        detail: "Future release requires a backend-owned execution lock, approval check, audit packet, evidence capture, result capture, and recovery contract.",
        state: "approval-required",
      },
    ],
    placeholders: ["blocked execution", "locked queue", "held file write", "held command", "held adapters"],
  },
  {
    id: "evidence-capture-packet",
    title: "Real trial evidence capture packet",
    eyebrow: "Evidence",
    state: "approval-required",
    body: "Lists diff, command, stdout, stderr, exit code, approval timestamp, operator, and audit placeholders without persisting evidence or capturing live output.",
    checklist: [
      {
        id: "evidence-no-persistence",
        label: "Evidence persistence blocked",
        detail: "The packet does not persist evidence, write audit logs, export files, read secrets, or store live outputs.",
        state: "blocked",
      },
      {
        id: "evidence-plan-ready",
        label: "Evidence plan ready",
        detail: "Future evidence capture requires explicit approval and backend-owned evidence storage policy.",
        state: "approval-required",
      },
    ],
    placeholders: ["diff", "stdout", "stderr", "exit code", "approval timestamp", "operator"],
  },
  {
    id: "result-capture-packet",
    title: "Real trial result capture packet",
    eyebrow: "Result",
    state: "approval-required",
    body: "Lists success, denied, blocked, failed, timeout, needs-review, and manual-review states without persisting results, queue state, or memory.",
    checklist: [
      {
        id: "result-no-persistence",
        label: "Result persistence blocked",
        detail: "The packet does not persist results, store outputs, trigger recovery, create queue transitions, or promote memory.",
        state: "blocked",
      },
      {
        id: "result-states-reviewed",
        label: "Result states reviewed",
        detail: "Future result capture requires explicit approval plus backend-owned evidence, audit, and retention policies.",
        state: "approval-required",
      },
    ],
    placeholders: ["success", "denied", "blocked", "failed", "timeout", "needs-review", "manual-review"],
  },
  {
    id: "recovery-packet",
    title: "Real trial recovery packet",
    eyebrow: "Recovery",
    state: "approval-required",
    body: "Lists rollback, retry, stop, restore, explain-failure, and manual-review options as blocked previews without executing recovery.",
    checklist: [
      {
        id: "recovery-no-execution",
        label: "Recovery execution blocked",
        detail: "The packet does not execute rollback, retry, restore, recovery, commands, adapters, exports, or file mutation.",
        state: "blocked",
      },
      {
        id: "recovery-contract-required",
        label: "Recovery contract required",
        detail: "Future recovery requires explicit approval, backend-owned recovery contract, audit trail, and result capture.",
        state: "approval-required",
      },
    ],
    placeholders: ["rollback", "retry", "stop", "restore", "explain-failure", "manual-review"],
  },
  {
    id: "audit-packet",
    title: "Real trial audit packet",
    eyebrow: "Audit",
    state: "approval-required",
    body: "Lists goal, context, file write, command, approval, hold, evidence, result, recovery, operator, and denied-path placeholders without persisting audit logs.",
    checklist: [
      {
        id: "audit-no-persistence",
        label: "Audit persistence blocked",
        detail: "The packet writes no audit logs, approval records, evidence, results, queues, exports, or recovery actions.",
        state: "blocked",
      },
      {
        id: "audit-contract-required",
        label: "Audit contract required",
        detail: "Future audit capture requires explicit approval and backend-owned audit retention and redaction policy.",
        state: "approval-required",
      },
    ],
    placeholders: ["goal", "context", "file write", "command", "approval", "hold", "evidence", "result", "recovery", "denied paths"],
  },
  {
    id: "operator-checklist",
    title: "Real trial operator checklist",
    eyebrow: "Checklist",
    state: "approval-required",
    body: "Confirms goal, context, file write, command, approval, hold, evidence, result, recovery, audit, and denied paths without marking real work complete.",
    checklist: [
      {
        id: "operator-checklist-no-complete",
        label: "Completion blocked",
        detail: "The checklist does not mark real work complete, persist completion, export files, or promote memory.",
        state: "blocked",
      },
      {
        id: "operator-checklist-review",
        label: "Operator review required",
        detail: "A future operator must verify every packet before a backend-owned approval path can consider execution.",
        state: "approval-required",
      },
    ],
    placeholders: ["goal checked", "context checked", "file write checked", "command checked", "denied paths checked"],
  },
  {
    id: "denied-path-checklist",
    title: "Real trial denied path checklist",
    eyebrow: "Denied paths",
    state: "blocked",
    body: "Lists blocked prompts, models, providers, connectors, files, commands, git, tests, builds, smokes, runtimes, adapters, persistence, export, recovery, queues, deploy, install, scaffold, secrets, and memory promotion.",
    checklist: [
      {
        id: "denied-path-no-mutation",
        label: "Workflow state unchanged",
        detail: "The checklist does not mutate workflow state, persist policy, approve actions, create queues, or release locks.",
        state: "blocked",
      },
      {
        id: "denied-path-approval-required",
        label: "Approval required to revisit",
        detail: "Future controlled execution must keep every denied path blocked unless an explicit guarded backend contract permits it.",
        state: "approval-required",
      },
    ],
    placeholders: ["prompts", "models", "providers", "files", "commands", "tests", "builds", "secrets", "memory promotion"],
  },
  {
    id: "go-no-go-review",
    title: "Real trial go no-go review",
    eyebrow: "Go/no-go",
    state: "blocked",
    body: "Reports preview-only status, blocked execution, and required future backend guards without releasing execution or starting a real operator trial.",
    checklist: [
      {
        id: "go-no-go-no-release",
        label: "No-go by default",
        detail: "The review does not release execution, approve actions, create queues, persist decisions, or start a run.",
        state: "blocked",
      },
      {
        id: "go-no-go-guards-required",
        label: "Backend guards required",
        detail: "Future go requires explicit approval, file-write path guard, command guards, evidence capture, result capture, audit, and recovery contract.",
        state: "approval-required",
      },
    ],
    placeholders: ["preview-only", "blocked execution", "required guards", "manual review", "future go/no-go"],
  },
  {
    id: "first-candidate",
    title: "First real controlled operator trial candidate",
    eyebrow: "Candidate",
    state: "approval-required",
    body: "Combines goal, context, file write, command, approval, hold, evidence, result, recovery, audit, operator checklist, denied path checklist, and go/no-go review as the first candidate packet.",
    checklist: [
      {
        id: "first-candidate-no-execution",
        label: "Candidate does not run",
        detail: "The candidate does not call models, write files, run commands, persist approvals, create queues, release locks, persist results, or execute recovery.",
        state: "blocked",
      },
      {
        id: "first-candidate-operator-required",
        label: "Operator approval required",
        detail: "The candidate is a future review packet only until explicit operator approval and backend guards exist.",
        state: "approval-required",
      },
    ],
    placeholders: ["candidate packet", "combined checklist", "denied paths", "go/no-go"],
  },
  {
    id: "release-candidate",
    title: "Controlled real operator trial packet release candidate",
    eyebrow: "Release candidate",
    state: "approval-required",
    body: "Prepares CodexForge for a future real controlled operator trial without executing it, calling models, writing files, running commands, persisting approvals, creating queues, releasing locks, persisting results, or executing recovery.",
    checklist: [
      {
        id: "release-candidate-preview-only",
        label: "Release candidate is preview-only",
        detail: "The packet stays static, deterministic, cockpit-centered, and approval-gated.",
        state: "preview-only",
      },
      {
        id: "release-candidate-guards-required",
        label: "Future guards required",
        detail: "A real controlled trial still needs explicit approval plus backend-owned path, command, environment, evidence, result, audit, and recovery guards.",
        state: "approval-required",
      },
    ],
    placeholders: ["release candidate", "future trial", "backend guards", "approval gate"],
  },
] as const;

const ALL_SURFACE_IDS = SURFACES.map((surface) => surface.id);

const ROUTES: readonly RealControlledOperatorTrialPacketRouteDefinition[] = [
  {
    slug: "codexforge-cockpit",
    href: "/codexforge-cockpit",
    phase: "Cockpit",
    title: "Real controlled operator trial packet",
    commandLabel: "Go to Unified CodexForge Cockpit",
    summary: "Cockpit-centered preview-only packet for a future real controlled operator trial.",
    markerPhrases: REAL_CONTROLLED_OPERATOR_TRIAL_PACKET_COCKPIT_LANGUAGE.split(" | "),
    deniedCopy: "Denied cockpit paths remain blocked: no real file mutation, no real command execution, no real operator trial execution, no approval persistence, no queue persistence, no lock release, no evidence persistence, no result persistence, no audit persistence, no export writing, and no recovery execution.",
    approvalCopy: "A future real controlled operator trial requires explicit operator approval, backend-owned guards, file-write path guard, diff preview, command allowlist, command argument guard, working-directory guard, environment guard, evidence capture, result capture, audit, and recovery contract.",
    surfaceIds: ALL_SURFACE_IDS,
    devOnly: false,
  },
  {
    slug: "real-controlled-operator-trial-packet-boundary",
    href: "/real-controlled-operator-trial-packet-boundary",
    phase: "Phase 1290",
    title: "Real controlled operator trial packet boundary",
    commandLabel: "Go to Real Controlled Operator Trial Packet Boundary",
    summary: "Trial packet prepares goal context file write command approval hold evidence result recovery and audit.",
    markerPhrases: [
      "Real controlled operator trial packet boundary",
      "Real controlled operator trial packet boundary does not execute the real trial",
      "Real controlled operator trial packet requires explicit operator approval",
      "Trial packet prepares goal context file write command approval hold evidence result recovery and audit",
      "Denied real controlled operator trial paths remain blocked",
      "Real controlled operator trial packet checklist",
    ],
    deniedCopy: "Denied real controlled operator trial paths remain blocked.",
    approvalCopy: "Real controlled operator trial packet requires explicit operator approval.",
    surfaceIds: ALL_SURFACE_IDS,
    devOnly: true,
  },
  {
    slug: "real-trial-goal-packet",
    href: "/real-trial-goal-packet",
    phase: "Phase 1291",
    title: "Real trial goal packet",
    commandLabel: "Go to Real Trial Goal Packet",
    summary: "Goal packet describes the real operator request before execution can be considered.",
    markerPhrases: [
      "Real trial goal packet",
      "Real trial goal packet does not call models or send prompts",
      "Real trial goal packet requires explicit operator approval before future model routing",
      "Goal packet describes the real operator request before execution can be considered",
      "Denied real trial goal paths remain blocked",
      "Real trial goal checklist",
    ],
    deniedCopy: "Denied real trial goal paths remain blocked.",
    approvalCopy: "Real trial goal packet requires explicit operator approval before future model routing.",
    surfaceIds: ["goal-packet", "approval-packet", "execution-hold-packet", "denied-path-checklist"],
    devOnly: true,
  },
  {
    slug: "real-trial-project-context-packet",
    href: "/real-trial-project-context-packet",
    phase: "Phase 1292",
    title: "Real trial project context packet",
    commandLabel: "Go to Real Trial Project Context Packet",
    summary: "Project context packet shows bounded workspace context without exposing secret values.",
    markerPhrases: [
      "Real trial project context packet",
      "Real trial project context packet does not browse arbitrary files or read secrets",
      "Real trial project context requires explicit operator approval before future indexing",
      "Project context packet shows bounded workspace context without exposing secret values",
      "Denied real trial project context paths remain blocked",
      "Real trial project context checklist",
    ],
    deniedCopy: "Denied real trial project context paths remain blocked.",
    approvalCopy: "Real trial project context requires explicit operator approval before future indexing.",
    surfaceIds: ["project-context-packet", "goal-packet", "approval-packet", "denied-path-checklist"],
    devOnly: true,
  },
  {
    slug: "real-trial-file-write-packet",
    href: "/real-trial-file-write-packet",
    phase: "Phase 1293",
    title: "Real trial file write packet",
    commandLabel: "Go to Real Trial File Write Packet",
    summary: "File write packet shows target path guard before after diff rollback and denied mutation review.",
    markerPhrases: [
      "Real trial file write packet",
      "Real trial file write packet does not write files or apply diffs",
      "Real trial file write packet requires explicit operator approval",
      "File write packet shows target path guard before after diff rollback and denied mutation review",
      "Denied real trial file write paths remain blocked",
      "Real trial file write checklist",
    ],
    deniedCopy: "Denied real trial file write paths remain blocked.",
    approvalCopy: "Real trial file write packet requires explicit operator approval.",
    surfaceIds: ["file-write-packet", "approval-packet", "evidence-capture-packet", "result-capture-packet", "recovery-packet"],
    devOnly: true,
  },
  {
    slug: "real-trial-command-packet",
    href: "/real-trial-command-packet",
    phase: "Phase 1294",
    title: "Real trial command packet",
    commandLabel: "Go to Real Trial Command Packet",
    summary: "Command packet shows allowlist arguments working directory environment names evidence result and recovery readiness.",
    markerPhrases: [
      "Real trial command packet",
      "Real trial command packet does not run commands",
      "Real trial command packet requires explicit operator approval",
      "Command packet shows allowlist arguments working directory environment names evidence result and recovery readiness",
      "Denied real trial command paths remain blocked",
      "Real trial command checklist",
    ],
    deniedCopy: "Denied real trial command paths remain blocked.",
    approvalCopy: "Real trial command packet requires explicit operator approval.",
    surfaceIds: ["command-packet", "approval-packet", "evidence-capture-packet", "result-capture-packet", "recovery-packet"],
    devOnly: true,
  },
  {
    slug: "real-trial-approval-packet",
    href: "/real-trial-approval-packet",
    phase: "Phase 1295",
    title: "Real trial approval packet",
    commandLabel: "Go to Real Trial Approval Packet",
    summary: "Approval packet explains exactly what would be approved and what remains blocked.",
    markerPhrases: [
      "Real trial approval packet",
      "Real trial approval packet does not approve actions or persist approvals",
      "Real trial approval packet requires explicit human approval",
      "Approval packet explains exactly what would be approved and what remains blocked",
      "Denied real trial approval paths remain blocked",
      "Real trial approval checklist",
    ],
    deniedCopy: "Denied real trial approval paths remain blocked.",
    approvalCopy: "Real trial approval packet requires explicit human approval.",
    surfaceIds: ["approval-packet", "file-write-packet", "command-packet", "execution-hold-packet", "audit-packet"],
    devOnly: true,
  },
  {
    slug: "real-trial-execution-hold-packet",
    href: "/real-trial-execution-hold-packet",
    phase: "Phase 1296",
    title: "Real trial execution hold packet",
    commandLabel: "Go to Real Trial Execution Hold Packet",
    summary: "Execution hold packet keeps file writes commands models providers connectors runtimes adapters persistence recovery exports queues and memory promotion blocked.",
    markerPhrases: [
      "Real trial execution hold packet",
      "Real trial execution hold packet does not release execution locks",
      "Real trial execution hold packet requires explicit operator approval",
      "Execution hold packet keeps file writes commands models providers connectors runtimes adapters persistence recovery exports queues and memory promotion blocked",
      "Denied real trial execution hold paths remain blocked",
      "Real trial execution hold checklist",
    ],
    deniedCopy: "Denied real trial execution hold paths remain blocked.",
    approvalCopy: "Real trial execution hold packet requires explicit operator approval.",
    surfaceIds: ["execution-hold-packet", "approval-packet", "denied-path-checklist", "go-no-go-review"],
    devOnly: true,
  },
  {
    slug: "real-trial-evidence-capture-packet",
    href: "/real-trial-evidence-capture-packet",
    phase: "Phase 1297",
    title: "Real trial evidence capture packet",
    commandLabel: "Go to Real Trial Evidence Capture Packet",
    summary: "Evidence capture packet lists diff command stdout stderr exit code approval timestamp operator and audit placeholders.",
    markerPhrases: [
      "Real trial evidence capture packet",
      "Real trial evidence capture packet does not persist evidence",
      "Real trial evidence capture packet requires explicit operator approval",
      "Evidence capture packet lists diff command stdout stderr exit code approval timestamp operator and audit placeholders",
      "Denied real trial evidence paths remain blocked",
      "Real trial evidence capture checklist",
    ],
    deniedCopy: "Denied real trial evidence paths remain blocked.",
    approvalCopy: "Real trial evidence capture packet requires explicit operator approval.",
    surfaceIds: ["evidence-capture-packet", "file-write-packet", "command-packet", "audit-packet"],
    devOnly: true,
  },
  {
    slug: "real-trial-result-capture-packet",
    href: "/real-trial-result-capture-packet",
    phase: "Phase 1298",
    title: "Real trial result capture packet",
    commandLabel: "Go to Real Trial Result Capture Packet",
    summary: "Result capture packet lists success denied blocked failed timeout needs-review and manual-review states.",
    markerPhrases: [
      "Real trial result capture packet",
      "Real trial result capture packet does not persist results",
      "Real trial result capture packet requires explicit operator approval",
      "Result capture packet lists success denied blocked failed timeout needs-review and manual-review states",
      "Denied real trial result paths remain blocked",
      "Real trial result capture checklist",
    ],
    deniedCopy: "Denied real trial result paths remain blocked.",
    approvalCopy: "Real trial result capture packet requires explicit operator approval.",
    surfaceIds: ["result-capture-packet", "evidence-capture-packet", "recovery-packet", "audit-packet"],
    devOnly: true,
  },
  {
    slug: "real-trial-recovery-packet",
    href: "/real-trial-recovery-packet",
    phase: "Phase 1299",
    title: "Real trial recovery packet",
    commandLabel: "Go to Real Trial Recovery Packet",
    summary: "Recovery packet lists rollback retry stop restore explain-failure and manual-review options as blocked previews.",
    markerPhrases: [
      "Real trial recovery packet",
      "Real trial recovery packet does not execute recovery",
      "Real trial recovery packet requires explicit operator approval",
      "Recovery packet lists rollback retry stop restore explain-failure and manual-review options as blocked previews",
      "Denied real trial recovery paths remain blocked",
      "Real trial recovery checklist",
    ],
    deniedCopy: "Denied real trial recovery paths remain blocked.",
    approvalCopy: "Real trial recovery packet requires explicit operator approval.",
    surfaceIds: ["recovery-packet", "result-capture-packet", "audit-packet", "go-no-go-review"],
    devOnly: true,
  },
  {
    slug: "real-trial-audit-packet",
    href: "/real-trial-audit-packet",
    phase: "Phase 1300",
    title: "Real trial audit packet",
    commandLabel: "Go to Real Trial Audit Packet",
    summary: "Audit packet lists goal context file write command approval hold evidence result recovery operator and denied-path placeholders.",
    markerPhrases: [
      "Real trial audit packet",
      "Real trial audit packet does not persist audit logs",
      "Real trial audit packet requires explicit operator approval",
      "Audit packet lists goal context file write command approval hold evidence result recovery operator and denied-path placeholders",
      "Denied real trial audit paths remain blocked",
      "Real trial audit checklist",
    ],
    deniedCopy: "Denied real trial audit paths remain blocked.",
    approvalCopy: "Real trial audit packet requires explicit operator approval.",
    surfaceIds: ["audit-packet", "goal-packet", "project-context-packet", "file-write-packet", "command-packet", "approval-packet"],
    devOnly: true,
  },
  {
    slug: "real-trial-operator-checklist",
    href: "/real-trial-operator-checklist",
    phase: "Phase 1301",
    title: "Real trial operator checklist",
    commandLabel: "Go to Real Trial Operator Checklist",
    summary: "Operator checklist confirms goal context file write command approval hold evidence result recovery audit and denied paths.",
    markerPhrases: [
      "Real trial operator checklist",
      "Real trial operator checklist does not mark real work complete",
      "Real trial operator checklist requires explicit operator approval",
      "Operator checklist confirms goal context file write command approval hold evidence result recovery audit and denied paths",
      "Denied real trial operator checklist paths remain blocked",
      "Real trial operator checklist",
    ],
    deniedCopy: "Denied real trial operator checklist paths remain blocked.",
    approvalCopy: "Real trial operator checklist requires explicit operator approval.",
    surfaceIds: ["operator-checklist", "audit-packet", "denied-path-checklist", "go-no-go-review"],
    devOnly: true,
  },
  {
    slug: "real-trial-denied-path-checklist",
    href: "/real-trial-denied-path-checklist",
    phase: "Phase 1302",
    title: "Real trial denied path checklist",
    commandLabel: "Go to Real Trial Denied Path Checklist",
    summary: "Denied path checklist lists blocked prompts models providers connectors files commands git tests builds smokes runtimes adapters persistence export recovery queues deploy install scaffold secrets and memory promotion.",
    markerPhrases: [
      "Real trial denied path checklist",
      "Real trial denied path checklist does not mutate workflow state",
      "Real trial denied path checklist requires explicit operator approval",
      "Denied path checklist lists blocked prompts models providers connectors files commands git tests builds smokes runtimes adapters persistence export recovery queues deploy install scaffold secrets and memory promotion",
      "Denied real trial checklist paths remain blocked",
      "Real trial denied path checklist",
    ],
    deniedCopy: "Denied real trial checklist paths remain blocked.",
    approvalCopy: "Real trial denied path checklist requires explicit operator approval.",
    surfaceIds: ["denied-path-checklist", "execution-hold-packet", "approval-packet", "go-no-go-review"],
    devOnly: true,
  },
  {
    slug: "real-trial-go-no-go-review",
    href: "/real-trial-go-no-go-review",
    phase: "Phase 1303",
    title: "Real trial go no-go review",
    commandLabel: "Go to Real Trial Go No Go Review",
    summary: "Go no-go review reports preview-only status blocked execution and required future backend guards.",
    markerPhrases: [
      "Real trial go no-go review",
      "Real trial go no-go review does not release execution",
      "Real trial go no-go review requires explicit operator approval",
      "Go no-go review reports preview-only status blocked execution and required future backend guards",
      "Denied real trial go no-go paths remain blocked",
      "Real trial go no-go checklist",
    ],
    deniedCopy: "Denied real trial go no-go paths remain blocked.",
    approvalCopy: "Real trial go no-go review requires explicit operator approval.",
    surfaceIds: ["go-no-go-review", "operator-checklist", "denied-path-checklist", "execution-hold-packet"],
    devOnly: true,
  },
  {
    slug: "first-real-controlled-operator-trial-candidate",
    href: "/first-real-controlled-operator-trial-candidate",
    phase: "Phase 1304",
    title: "First real controlled operator trial candidate",
    commandLabel: "Go to First Real Controlled Operator Trial Candidate",
    summary: "Candidate combines goal context file write command approval hold evidence result recovery audit operator checklist denied path checklist and go no-go review.",
    markerPhrases: [
      "First real controlled operator trial candidate",
      "First real controlled operator trial candidate does not execute the real trial",
      "First real controlled operator trial candidate requires explicit operator approval",
      "Candidate combines goal context file write command approval hold evidence result recovery audit operator checklist denied path checklist and go no-go review",
      "Denied first real controlled operator trial paths remain blocked",
      "First real controlled operator trial checklist",
    ],
    deniedCopy: "Denied first real controlled operator trial paths remain blocked.",
    approvalCopy: "First real controlled operator trial candidate requires explicit operator approval.",
    surfaceIds: ALL_SURFACE_IDS,
    devOnly: true,
  },
  {
    slug: "controlled-real-operator-trial-packet-release-candidate",
    href: "/controlled-real-operator-trial-packet-release-candidate",
    phase: "Phase 1305",
    title: "Controlled real operator trial packet release candidate",
    commandLabel: "Go to Controlled Real Operator Trial Packet Release Candidate",
    summary: "Release candidate prepares CodexForge for a future real controlled operator trial without executing it.",
    markerPhrases: [
      "Controlled real operator trial packet release candidate",
      "Controlled real operator trial packet release candidate does not call models write files run commands persist approvals create queues release locks persist results or execute recovery",
      "Controlled real operator trial packet release requires explicit operator approval",
      "Release candidate prepares CodexForge for a future real controlled operator trial without executing it",
      "Denied controlled real operator trial packet paths remain blocked",
      "Controlled real operator trial packet release checklist",
    ],
    deniedCopy: "Denied controlled real operator trial packet paths remain blocked.",
    approvalCopy: "Controlled real operator trial packet release requires explicit operator approval.",
    surfaceIds: ALL_SURFACE_IDS,
    devOnly: true,
  },
] as const;

export function buildRealControlledOperatorTrialPacketStableKey(parts: readonly string[]): string {
  return parts.join(":").toLowerCase().replace(/[^a-z0-9:/-]+/g, "-");
}

export function listRealControlledOperatorTrialPacketRouteDefinitions(): readonly RealControlledOperatorTrialPacketRouteDefinition[] {
  return ROUTES;
}

export function getRealControlledOperatorTrialPacketRouteDefinition(
  slug: RealControlledOperatorTrialPacketRouteSlug
): RealControlledOperatorTrialPacketRouteDefinition {
  return ROUTES.find((candidate) => candidate.slug === slug) ?? ROUTES[0];
}

export function buildRealControlledOperatorTrialPacketRouteModel(
  slug: RealControlledOperatorTrialPacketRouteSlug = "codexforge-cockpit"
): RealControlledOperatorTrialPacketRouteModel {
  const route = getRealControlledOperatorTrialPacketRouteDefinition(slug);
  const surfaces = route.surfaceIds
    .map((surfaceId) => SURFACES.find((surface) => surface.id === surfaceId))
    .filter((surface): surface is RealControlledOperatorTrialPacketSurface => Boolean(surface));

  return {
    route,
    surfaces,
    globalSafetyCopy: GLOBAL_SAFETY_COPY,
    targetFamilies: TARGET_FAMILIES,
    packetFlow: PACKET_FLOW,
    deniedPathMatrix: DENIED_PATH_MATRIX,
    resultStates: RESULT_STATES,
    recoveryOptions: RECOVERY_OPTIONS,
    futureBackendGuards: FUTURE_BACKEND_GUARDS,
    summary: summarizeRealControlledOperatorTrialPacketRoute(route, surfaces),
  };
}

export function buildRealControlledOperatorTrialPacketModel(): RealControlledOperatorTrialPacketRouteModel {
  return buildRealControlledOperatorTrialPacketRouteModel("codexforge-cockpit");
}

export function summarizeRealControlledOperatorTrialPacketRoute(
  route: RealControlledOperatorTrialPacketRouteDefinition,
  surfaces: readonly RealControlledOperatorTrialPacketSurface[]
): string {
  return `${route.title} keeps ${surfaces.length} real controlled operator trial packet surfaces static, deterministic, preview-only, approval-gated, and blocked from real trial execution.`;
}

export function summarizeRealControlledOperatorTrialPacketRouteModel(
  model = buildRealControlledOperatorTrialPacketModel()
): string {
  return model.summary;
}
