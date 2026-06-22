export type GuardedApplyRunDryRunRouteSlug =
  | "codexforge-cockpit"
  | "guarded-apply-run-dry-run-boundary"
  | "dry-run-apply-packet"
  | "dry-run-run-packet"
  | "dry-run-combined-apply-run-packet"
  | "dry-run-path-guard-evaluation"
  | "dry-run-command-guard-evaluation"
  | "dry-run-approval-verification"
  | "dry-run-evidence-preview"
  | "dry-run-result-preview"
  | "dry-run-recovery-preview"
  | "dry-run-audit-preview"
  | "dry-run-queue-preview"
  | "dry-run-denied-path-matrix"
  | "dry-run-go-no-go-review"
  | "first-guarded-apply-run-dry-run-candidate"
  | "controlled-guarded-apply-run-dry-run-release-candidate";

export type GuardedApplyRunDryRunPanelState =
  | "blocked"
  | "dry-run-only"
  | "approval-required"
  | "preview-only"
  | "dev-test-only";

export type GuardedApplyRunDryRunChecklistItem = {
  id: string;
  label: string;
  detail: string;
  state: GuardedApplyRunDryRunPanelState;
};

export type GuardedApplyRunDryRunSurface = {
  id: string;
  title: string;
  eyebrow: string;
  state: GuardedApplyRunDryRunPanelState;
  body: string;
  checklist: readonly GuardedApplyRunDryRunChecklistItem[];
  placeholders: readonly string[];
};

export type GuardedApplyRunDryRunPacket = {
  packetId: string;
  packetKind: string;
  goal: string;
  workspaceBoundary: string;
  approvalState: string;
  applyPreview: readonly string[];
  runPreview: readonly string[];
  pathGuardEvaluation: readonly string[];
  commandGuardEvaluation: readonly string[];
  evidencePreview: readonly string[];
  resultPreview: readonly string[];
  recoveryPreview: readonly string[];
  auditPreview: readonly string[];
  queuePreview: readonly string[];
  deniedPathMatrix: readonly string[];
  goNoGoDecision: string;
  explicitNonExecutionGuarantees: readonly string[];
};

export type GuardedApplyRunDryRunRouteDefinition = {
  slug: GuardedApplyRunDryRunRouteSlug;
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

export type GuardedApplyRunDryRunRouteModel = {
  route: GuardedApplyRunDryRunRouteDefinition;
  packet: GuardedApplyRunDryRunPacket;
  surfaces: readonly GuardedApplyRunDryRunSurface[];
  globalSafetyCopy: readonly string[];
  targetFamilies: readonly string[];
  packetReviewFlow: readonly string[];
  summary: string;
};

export const GUARDED_APPLY_RUN_DRY_RUN_COCKPIT_LANGUAGE = [
  "Guarded apply run dry-run packet",
  "Dry-run apply packet",
  "Dry-run run packet",
  "Dry-run combined apply run packet",
  "Dry-run path guard evaluation",
  "Dry-run command guard evaluation",
  "Dry-run approval verification",
  "Dry-run evidence preview",
  "Dry-run result preview",
  "Dry-run recovery preview",
  "Dry-run audit preview",
  "Dry-run queue preview",
  "Dry-run denied path matrix",
  "Dry-run go no-go review",
  "No real file mutation from the cockpit",
  "No real command execution from the cockpit",
  "No backend execution from the cockpit",
  "No apply or run execution from the cockpit",
  "Dry-run packet is not executable from the UI",
  "Dry-run packet does not persist approvals",
  "Dry-run packet does not persist queue state",
  "Dry-run packet does not persist evidence results or audit",
].join(" | ");

const GLOBAL_SAFETY_COPY = [
  "This is a dry-run packet.",
  "It is not executable from the UI.",
  "It does not mutate files.",
  "It does not run commands.",
  "It does not persist approvals.",
  "It does not persist queue state.",
  "It does not persist evidence.",
  "It does not persist results.",
  "It does not persist audit.",
  "It is shaped for future backend-owned guarded execution after explicit approval.",
  "Normal operation should happen in /codexforge-cockpit.",
  "Phase pages are dev/test diagnostics only.",
  "No model calls, provider calls, connector calls, adapter calls, runtime starts, process spawning, port binding, package installation, deployment, scaffold creation, prompt sending, approval persistence, queue persistence, evidence persistence, result persistence, audit persistence, export writing, recovery execution, rollback execution, retry execution, lock release, backend execution, apply execution, run execution, real operator trial execution, or memory promotion occurs from this preview.",
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

const PACKET_REVIEW_FLOW = [
  "proposed apply packet",
  "proposed command packet",
  "guard results",
  "approval verification",
  "queue preview",
  "evidence preview",
  "result preview",
  "recovery preview",
  "audit preview",
  "go/no-go decision",
  "execution held reason",
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
  "backend execution",
] as const;

const DRY_RUN_PACKET: GuardedApplyRunDryRunPacket = {
  packetId: "codexforge-guarded-apply-run-dry-run-1338-1353",
  packetKind: "guarded-apply-run-dry-run-packet",
  goal:
    "Preview how a future backend-owned guarded apply/run packet could be packaged after explicit operator approval while keeping every action non-executing.",
  workspaceBoundary:
    "Canonical workspace containment is represented as static review copy only; the UI does not browse arbitrary files, read secrets, mutate paths, or apply diffs.",
  approvalState:
    "not-approved-preview-only; explicit human approval is required before any future backend-owned guarded execution path can exist.",
  applyPreview: [
    "dry-run apply packet only",
    "path guard preview",
    "diff preview placeholder",
    "rollback requirement",
    "evidence requirement",
    "result requirement",
    "audit requirement",
    "queue requirement",
    "recovery requirement",
  ],
  runPreview: [
    "dry-run run packet only",
    "command allowlist preview",
    "argument guard preview",
    "working-directory guard preview",
    "environment-name-only preview",
    "timeout and cancellation preview",
    "stdout stderr exit-code capture requirements",
    "evidence result audit queue recovery requirements",
  ],
  pathGuardEvaluation: [
    "workspace root containment preview",
    "traversal denial preview",
    "generated file policy preview",
    "binary guard preview",
    "rollback requirement preview",
    "denied path evaluation preview",
  ],
  commandGuardEvaluation: [
    "command allowlist preview",
    "argument guard preview",
    "working-directory guard preview",
    "environment-name-only display preview",
    "timeout preview",
    "cancellation preview",
    "stdout stderr exit-code capture preview",
  ],
  evidencePreview: [
    "diff reference placeholder",
    "command reference placeholder",
    "stdout placeholder",
    "stderr placeholder",
    "exit code placeholder",
    "approval timestamp placeholder",
    "redaction requirement",
    "operator audit reference",
    "queue reference",
  ],
  resultPreview: [
    "success",
    "denied",
    "blocked",
    "failed",
    "timeout",
    "canceled",
    "needs-review",
    "manual-review",
    "retryable",
    "recovered",
  ],
  recoveryPreview: [
    "rollback preview",
    "retry preview",
    "stop preview",
    "restore preview",
    "explain-failure preview",
    "manual-review preview",
    "safety-stop preview",
    "partial-recovery preview",
  ],
  auditPreview: [
    "goal",
    "plan",
    "diff",
    "apply",
    "command",
    "approval",
    "evidence",
    "result",
    "recovery",
    "queue",
    "operator",
    "denied-path",
  ],
  queuePreview: [
    "preview",
    "blocked",
    "approved",
    "queued",
    "applying",
    "running",
    "completed",
    "failed",
    "timeout",
    "canceled",
    "recovered",
    "manual-review",
  ],
  deniedPathMatrix: DENIED_PATH_MATRIX,
  goNoGoDecision:
    "No-go for execution: dry-run packet preview only; apply, run, backend execution, persistence, recovery, and lock release remain held.",
  explicitNonExecutionGuarantees: GLOBAL_SAFETY_COPY,
} as const;

const SURFACES: readonly GuardedApplyRunDryRunSurface[] = [
  {
    id: "dry-run-boundary",
    title: "Guarded apply run dry-run boundary",
    eyebrow: "Boundary",
    state: "blocked",
    body:
      "Separates cockpit preview from any future backend-owned guarded apply and command run path. The packet is shaped for approval review, but the UI cannot execute apply, execute run, persist approval, create queues, release locks, persist evidence, persist results, persist audit, or execute recovery.",
    checklist: [
      {
        id: "boundary-no-execution",
        label: "Apply and run blocked",
        detail: "Guarded apply run dry-run boundary does not execute apply or run.",
        state: "blocked",
      },
      {
        id: "boundary-approval",
        label: "Approval required",
        detail: "Guarded apply run dry-run requires explicit operator approval before future backend-owned execution.",
        state: "approval-required",
      },
    ],
    placeholders: ["frontend preview", "future backend-owned execution", "apply hold", "run hold", "approval hold"],
  },
  {
    id: "apply-packet",
    title: "Dry-run apply packet",
    eyebrow: "Apply",
    state: "dry-run-only",
    body:
      "Previews a future apply package with path guard, diff, rollback, evidence, result, audit, queue, and recovery requirements while writing no files and applying no diffs.",
    checklist: [
      {
        id: "apply-no-write",
        label: "No file write",
        detail: "Dry-run apply packet does not write files or apply diffs.",
        state: "blocked",
      },
      {
        id: "apply-approval",
        label: "Approval required",
        detail: "Dry-run apply packet requires explicit operator approval.",
        state: "approval-required",
      },
    ],
    placeholders: ["path guard", "diff preview", "rollback", "evidence", "result", "audit", "queue", "recovery"],
  },
  {
    id: "run-packet",
    title: "Dry-run run packet",
    eyebrow: "Run",
    state: "dry-run-only",
    body:
      "Previews command allowlist, arguments, working directory, environment names, evidence, result, audit, queue, and recovery requirements while running no commands.",
    checklist: [
      {
        id: "run-no-command",
        label: "No command execution",
        detail: "Dry-run run packet does not run commands.",
        state: "blocked",
      },
      {
        id: "run-approval",
        label: "Approval required",
        detail: "Dry-run run packet requires explicit operator approval.",
        state: "approval-required",
      },
    ],
    placeholders: ["allowlist", "arguments", "working directory", "environment names", "stdout", "stderr", "exit code"],
  },
  {
    id: "combined-packet",
    title: "Dry-run combined apply run packet",
    eyebrow: "Combined",
    state: "dry-run-only",
    body:
      "Previews apply then run ordering, evidence chaining, result capture, queue state, and recovery requirements while writing no files and running no commands.",
    checklist: [
      {
        id: "combined-no-execution",
        label: "Apply/run blocked",
        detail: "Dry-run combined apply run packet does not write files or run commands.",
        state: "blocked",
      },
      {
        id: "combined-approval",
        label: "Approval required",
        detail: "Dry-run combined apply run packet requires explicit operator approval.",
        state: "approval-required",
      },
    ],
    placeholders: ["apply then run", "evidence chaining", "result capture", "queue state", "recovery"],
  },
  {
    id: "path-guard-evaluation",
    title: "Dry-run path guard evaluation",
    eyebrow: "Path guard",
    state: "dry-run-only",
    body:
      "Previews workspace root containment, traversal denial, generated file policy, binary guard, and rollback requirements without browsing arbitrary files or writing files.",
    checklist: [
      {
        id: "path-no-write",
        label: "No arbitrary path mutation",
        detail: "Dry-run path guard evaluation does not browse arbitrary files or write files.",
        state: "blocked",
      },
      {
        id: "path-approval",
        label: "Approval required",
        detail: "Dry-run path guard evaluation requires explicit operator approval.",
        state: "approval-required",
      },
    ],
    placeholders: ["workspace root", "traversal denial", "generated file policy", "binary guard", "rollback"],
  },
  {
    id: "command-guard-evaluation",
    title: "Dry-run command guard evaluation",
    eyebrow: "Command guard",
    state: "dry-run-only",
    body:
      "Previews command allowlist, arguments, working directory, environment-name-only display, timeout, cancellation, stdout, stderr, and exit-code capture without running commands.",
    checklist: [
      {
        id: "command-no-run",
        label: "No command run",
        detail: "Dry-run command guard evaluation does not run commands.",
        state: "blocked",
      },
      {
        id: "command-approval",
        label: "Approval required",
        detail: "Dry-run command guard evaluation requires explicit operator approval.",
        state: "approval-required",
      },
    ],
    placeholders: ["allowlist", "arguments", "working directory", "environment-name-only display", "timeout", "cancellation"],
  },
  {
    id: "approval-verification",
    title: "Dry-run approval verification",
    eyebrow: "Approval",
    state: "approval-required",
    body:
      "Previews operator identity, approval scope, expiry, denied paths, replay protection, and backend authorization checks without persisting approvals or releasing execution.",
    checklist: [
      {
        id: "approval-no-persist",
        label: "No approval persistence",
        detail: "Dry-run approval verification does not persist approvals or release execution.",
        state: "blocked",
      },
      {
        id: "approval-human",
        label: "Human approval required",
        detail: "Dry-run approval verification requires explicit human approval.",
        state: "approval-required",
      },
    ],
    placeholders: ["operator identity", "approval scope", "expiry", "denied paths", "replay protection", "authorization"],
  },
  {
    id: "evidence-preview",
    title: "Dry-run evidence preview",
    eyebrow: "Evidence",
    state: "preview-only",
    body:
      "Shows diff, command, stdout, stderr, exit code, approval timestamp, redaction, operator, audit, and queue references without capturing or persisting runtime evidence.",
    checklist: [
      {
        id: "evidence-no-persist",
        label: "No evidence persistence",
        detail: "Dry-run evidence preview does not persist evidence.",
        state: "blocked",
      },
      {
        id: "evidence-approval",
        label: "Approval required",
        detail: "Dry-run evidence preview requires explicit operator approval.",
        state: "approval-required",
      },
    ],
    placeholders: ["diff", "command", "stdout", "stderr", "exit code", "redaction", "operator", "queue"],
  },
  {
    id: "result-preview",
    title: "Dry-run result preview",
    eyebrow: "Result",
    state: "preview-only",
    body:
      "Shows success, denied, blocked, failed, timeout, canceled, needs-review, manual-review, retryable, and recovered states without claiming execution happened or persisting results.",
    checklist: [
      {
        id: "result-no-persist",
        label: "No result persistence",
        detail: "Dry-run result preview does not persist results.",
        state: "blocked",
      },
      {
        id: "result-approval",
        label: "Approval required",
        detail: "Dry-run result preview requires explicit operator approval.",
        state: "approval-required",
      },
    ],
    placeholders: DRY_RUN_PACKET.resultPreview,
  },
  {
    id: "recovery-preview",
    title: "Dry-run recovery preview",
    eyebrow: "Recovery",
    state: "preview-only",
    body:
      "Shows rollback, retry, stop, restore, explain-failure, manual-review, safety-stop, and partial-recovery options as non-executing preview actions.",
    checklist: [
      {
        id: "recovery-no-execute",
        label: "No recovery execution",
        detail: "Dry-run recovery preview does not execute recovery.",
        state: "blocked",
      },
      {
        id: "recovery-approval",
        label: "Approval required",
        detail: "Dry-run recovery preview requires explicit operator approval.",
        state: "approval-required",
      },
    ],
    placeholders: DRY_RUN_PACKET.recoveryPreview,
  },
  {
    id: "audit-preview",
    title: "Dry-run audit preview",
    eyebrow: "Audit",
    state: "preview-only",
    body:
      "Shows goal, plan, diff, apply, command, approval, evidence, result, recovery, queue, operator, and denied-path records without persisting audit logs.",
    checklist: [
      {
        id: "audit-no-persist",
        label: "No audit persistence",
        detail: "Dry-run audit preview does not persist audit logs.",
        state: "blocked",
      },
      {
        id: "audit-approval",
        label: "Approval required",
        detail: "Dry-run audit preview requires explicit operator approval.",
        state: "approval-required",
      },
    ],
    placeholders: DRY_RUN_PACKET.auditPreview,
  },
  {
    id: "queue-preview",
    title: "Dry-run queue preview",
    eyebrow: "Queue",
    state: "preview-only",
    body:
      "Shows preview, blocked, approved, queued, applying, running, completed, failed, timeout, canceled, recovered, and manual-review states without persistence or queue creation.",
    checklist: [
      {
        id: "queue-no-create",
        label: "No queue job",
        detail: "Dry-run queue preview does not create queue jobs.",
        state: "blocked",
      },
      {
        id: "queue-approval",
        label: "Approval required",
        detail: "Dry-run queue preview requires explicit operator approval.",
        state: "approval-required",
      },
    ],
    placeholders: DRY_RUN_PACKET.queuePreview,
  },
  {
    id: "denied-path-matrix",
    title: "Dry-run denied path matrix",
    eyebrow: "Denied paths",
    state: "blocked",
    body:
      "Lists blocked prompts, models, providers, connectors, files, commands, git, tests, builds, smokes, runtimes, adapters, persistence, export, recovery, queues, deploy, install, scaffold, secrets, memory promotion, and backend execution without mutating workflow state.",
    checklist: [
      {
        id: "denied-no-mutation",
        label: "No workflow mutation",
        detail: "Dry-run denied path matrix does not mutate workflow state.",
        state: "blocked",
      },
      {
        id: "denied-approval",
        label: "Approval required",
        detail: "Dry-run denied path matrix requires explicit operator approval.",
        state: "approval-required",
      },
    ],
    placeholders: DENIED_PATH_MATRIX,
  },
  {
    id: "go-no-go-review",
    title: "Dry-run go no-go review",
    eyebrow: "Go no-go",
    state: "blocked",
    body:
      "Reports dry-run-only status, blocked apply and run, and required future backend guards without releasing execution.",
    checklist: [
      {
        id: "go-no-go-no-release",
        label: "No execution release",
        detail: "Dry-run go no-go review does not release execution.",
        state: "blocked",
      },
      {
        id: "go-no-go-approval",
        label: "Approval required",
        detail: "Dry-run go no-go review requires explicit operator approval.",
        state: "approval-required",
      },
    ],
    placeholders: ["dry-run-only", "blocked apply", "blocked run", "future backend guards", "no-go"],
  },
  {
    id: "first-candidate",
    title: "First guarded apply run dry-run candidate",
    eyebrow: "Candidate",
    state: "dry-run-only",
    body:
      "Combines apply packet, run packet, path guard, command guard, approval, evidence, result, recovery, audit, queue, denied paths, and go/no-go review without executing apply or run.",
    checklist: [
      {
        id: "candidate-no-execute",
        label: "No apply or run",
        detail: "First guarded apply run dry-run candidate does not execute apply or run.",
        state: "blocked",
      },
      {
        id: "candidate-approval",
        label: "Approval required",
        detail: "First guarded apply run dry-run candidate requires explicit operator approval.",
        state: "approval-required",
      },
    ],
    placeholders: ["apply packet", "run packet", "guards", "approval", "evidence", "result", "recovery", "audit", "queue"],
  },
  {
    id: "release-candidate",
    title: "Controlled guarded apply run dry-run release candidate",
    eyebrow: "Release candidate",
    state: "dry-run-only",
    body:
      "Prepares CodexForge for future backend-owned guarded apply and run without calling models, writing files, running commands, persisting approvals, creating queues, releasing locks, persisting results, or executing recovery.",
    checklist: [
      {
        id: "release-no-execute",
        label: "No execution",
        detail:
          "Controlled guarded apply run dry-run release candidate does not call models write files run commands persist approvals create queues release locks persist results or execute recovery.",
        state: "blocked",
      },
      {
        id: "release-approval",
        label: "Approval required",
        detail: "Controlled guarded apply run dry-run release requires explicit operator approval.",
        state: "approval-required",
      },
    ],
    placeholders: ["future backend-owned guarded apply", "future backend-owned guarded run", "dry-run only", "no execution"],
  },
] as const;

const ALL_SURFACE_IDS = SURFACES.map((surface) => surface.id);

const ROUTES: readonly GuardedApplyRunDryRunRouteDefinition[] = [
  {
    slug: "codexforge-cockpit",
    href: "/codexforge-cockpit",
    phase: "Cockpit",
    title: "Guarded apply run dry-run packet",
    commandLabel: "Go to Unified CodexForge Cockpit",
    summary:
      "Cockpit preview of proposed apply packet, proposed command packet, guard results, approval verification, queue preview, evidence result recovery preview, audit preview, go/no-go decision, and why execution is still held.",
    markerPhrases: [
      "Guarded apply run dry-run packet",
      "Dry-run apply packet",
      "Dry-run run packet",
      "Dry-run combined apply run packet",
      "Dry-run path guard evaluation",
      "Dry-run command guard evaluation",
      "Dry-run approval verification",
      "Dry-run evidence preview",
      "Dry-run result preview",
      "Dry-run recovery preview",
      "Dry-run audit preview",
      "Dry-run queue preview",
      "Dry-run denied path matrix",
      "Dry-run go no-go review",
      "No real file mutation from the cockpit",
      "No real command execution from the cockpit",
      "No backend execution from the cockpit",
      "No apply or run execution from the cockpit",
      "Dry-run packet is not executable from the UI",
      "Dry-run packet does not persist approvals",
      "Dry-run packet does not persist queue state",
      "Dry-run packet does not persist evidence results or audit",
    ],
    deniedCopy:
      "Denied dry-run packet paths remain blocked: no real file mutation, no real command execution, no backend execution, no apply or run execution, no approval persistence, no queue persistence, no evidence persistence, no result persistence, no audit persistence, and no recovery execution.",
    approvalCopy:
      "Guarded apply run dry-run packet requires explicit operator approval before any future backend-owned guarded apply/run execution path can be considered.",
    surfaceIds: ALL_SURFACE_IDS,
    devOnly: false,
  },
  {
    slug: "guarded-apply-run-dry-run-boundary",
    href: "/guarded-apply-run-dry-run-boundary",
    phase: "Phase 1338",
    title: "Guarded apply run dry-run boundary",
    commandLabel: "Go to Guarded Apply Run Dry-Run Boundary",
    summary: "Dry-run boundary separates frontend preview from future backend-owned guarded apply and command run.",
    markerPhrases: [
      "Guarded apply run dry-run boundary",
      "Guarded apply run dry-run boundary does not execute apply or run",
      "Guarded apply run dry-run requires explicit operator approval",
      "Dry-run boundary separates frontend preview from future backend-owned guarded apply and command run",
      "Denied guarded apply run dry-run paths remain blocked",
      "Guarded apply run dry-run checklist",
    ],
    deniedCopy: "Denied guarded apply run dry-run paths remain blocked.",
    approvalCopy: "Guarded apply run dry-run requires explicit operator approval.",
    surfaceIds: ["dry-run-boundary", "apply-packet", "run-packet", "combined-packet", "go-no-go-review"],
    devOnly: true,
  },
  {
    slug: "dry-run-apply-packet",
    href: "/dry-run-apply-packet",
    phase: "Phase 1339",
    title: "Dry-run apply packet",
    commandLabel: "Go to Dry-Run Apply Packet",
    summary: "Apply packet previews path guard diff rollback evidence result audit queue and recovery requirements.",
    markerPhrases: [
      "Dry-run apply packet",
      "Dry-run apply packet does not write files or apply diffs",
      "Dry-run apply packet requires explicit operator approval",
      "Apply packet previews path guard diff rollback evidence result audit queue and recovery requirements",
      "Denied dry-run apply packet paths remain blocked",
      "Dry-run apply packet checklist",
    ],
    deniedCopy: "Denied dry-run apply packet paths remain blocked.",
    approvalCopy: "Dry-run apply packet requires explicit operator approval.",
    surfaceIds: ["apply-packet", "path-guard-evaluation", "approval-verification", "evidence-preview", "result-preview", "audit-preview", "queue-preview", "recovery-preview"],
    devOnly: true,
  },
  {
    slug: "dry-run-run-packet",
    href: "/dry-run-run-packet",
    phase: "Phase 1340",
    title: "Dry-run run packet",
    commandLabel: "Go to Dry-Run Run Packet",
    summary: "Run packet previews command allowlist arguments working directory environment names evidence result audit queue and recovery requirements.",
    markerPhrases: [
      "Dry-run run packet",
      "Dry-run run packet does not run commands",
      "Dry-run run packet requires explicit operator approval",
      "Run packet previews command allowlist arguments working directory environment names evidence result audit queue and recovery requirements",
      "Denied dry-run run packet paths remain blocked",
      "Dry-run run packet checklist",
    ],
    deniedCopy: "Denied dry-run run packet paths remain blocked.",
    approvalCopy: "Dry-run run packet requires explicit operator approval.",
    surfaceIds: ["run-packet", "command-guard-evaluation", "approval-verification", "evidence-preview", "result-preview", "audit-preview", "queue-preview", "recovery-preview"],
    devOnly: true,
  },
  {
    slug: "dry-run-combined-apply-run-packet",
    href: "/dry-run-combined-apply-run-packet",
    phase: "Phase 1341",
    title: "Dry-run combined apply run packet",
    commandLabel: "Go to Dry-Run Combined Apply Run Packet",
    summary: "Combined packet previews apply then run ordering evidence chaining result capture queue state and recovery requirements.",
    markerPhrases: [
      "Dry-run combined apply run packet",
      "Dry-run combined apply run packet does not write files or run commands",
      "Dry-run combined apply run packet requires explicit operator approval",
      "Combined packet previews apply then run ordering evidence chaining result capture queue state and recovery requirements",
      "Denied dry-run combined apply run paths remain blocked",
      "Dry-run combined apply run checklist",
    ],
    deniedCopy: "Denied dry-run combined apply run paths remain blocked.",
    approvalCopy: "Dry-run combined apply run packet requires explicit operator approval.",
    surfaceIds: ["combined-packet", "apply-packet", "run-packet", "path-guard-evaluation", "command-guard-evaluation", "evidence-preview", "result-preview", "queue-preview", "recovery-preview"],
    devOnly: true,
  },
  {
    slug: "dry-run-path-guard-evaluation",
    href: "/dry-run-path-guard-evaluation",
    phase: "Phase 1342",
    title: "Dry-run path guard evaluation",
    commandLabel: "Go to Dry-Run Path Guard Evaluation",
    summary: "Path guard evaluation previews workspace root containment traversal denial generated file policy binary guard and rollback requirements.",
    markerPhrases: [
      "Dry-run path guard evaluation",
      "Dry-run path guard evaluation does not browse arbitrary files or write files",
      "Dry-run path guard evaluation requires explicit operator approval",
      "Path guard evaluation previews workspace root containment traversal denial generated file policy binary guard and rollback requirements",
      "Denied dry-run path guard paths remain blocked",
      "Dry-run path guard checklist",
    ],
    deniedCopy: "Denied dry-run path guard paths remain blocked.",
    approvalCopy: "Dry-run path guard evaluation requires explicit operator approval.",
    surfaceIds: ["path-guard-evaluation", "apply-packet", "approval-verification", "denied-path-matrix", "recovery-preview"],
    devOnly: true,
  },
  {
    slug: "dry-run-command-guard-evaluation",
    href: "/dry-run-command-guard-evaluation",
    phase: "Phase 1343",
    title: "Dry-run command guard evaluation",
    commandLabel: "Go to Dry-Run Command Guard Evaluation",
    summary: "Command guard evaluation previews allowlist arguments working directory environment-name-only display timeout cancellation stdout stderr and exit-code capture.",
    markerPhrases: [
      "Dry-run command guard evaluation",
      "Dry-run command guard evaluation does not run commands",
      "Dry-run command guard evaluation requires explicit operator approval",
      "Command guard evaluation previews allowlist arguments working directory environment-name-only display timeout cancellation stdout stderr and exit-code capture",
      "Denied dry-run command guard paths remain blocked",
      "Dry-run command guard checklist",
    ],
    deniedCopy: "Denied dry-run command guard paths remain blocked.",
    approvalCopy: "Dry-run command guard evaluation requires explicit operator approval.",
    surfaceIds: ["command-guard-evaluation", "run-packet", "approval-verification", "evidence-preview", "result-preview", "denied-path-matrix"],
    devOnly: true,
  },
  {
    slug: "dry-run-approval-verification",
    href: "/dry-run-approval-verification",
    phase: "Phase 1344",
    title: "Dry-run approval verification",
    commandLabel: "Go to Dry-Run Approval Verification",
    summary: "Approval verification previews operator identity approval scope expiry denied paths replay protection and backend authorization checks.",
    markerPhrases: [
      "Dry-run approval verification",
      "Dry-run approval verification does not persist approvals or release execution",
      "Dry-run approval verification requires explicit human approval",
      "Approval verification previews operator identity approval scope expiry denied paths replay protection and backend authorization checks",
      "Denied dry-run approval verification paths remain blocked",
      "Dry-run approval verification checklist",
    ],
    deniedCopy: "Denied dry-run approval verification paths remain blocked.",
    approvalCopy: "Dry-run approval verification requires explicit human approval.",
    surfaceIds: ["approval-verification", "apply-packet", "run-packet", "combined-packet", "queue-preview", "audit-preview", "denied-path-matrix"],
    devOnly: true,
  },
  {
    slug: "dry-run-evidence-preview",
    href: "/dry-run-evidence-preview",
    phase: "Phase 1345",
    title: "Dry-run evidence preview",
    commandLabel: "Go to Dry-Run Evidence Preview",
    summary: "Evidence preview shows diff command stdout stderr exit code approval timestamp redaction operator audit and queue references without capturing runtime evidence.",
    markerPhrases: [
      "Dry-run evidence preview",
      "Dry-run evidence preview does not persist evidence",
      "Dry-run evidence preview requires explicit operator approval",
      "Evidence preview shows diff command stdout stderr exit code approval timestamp redaction operator audit and queue references without capturing runtime evidence",
      "Denied dry-run evidence paths remain blocked",
      "Dry-run evidence checklist",
    ],
    deniedCopy: "Denied dry-run evidence paths remain blocked.",
    approvalCopy: "Dry-run evidence preview requires explicit operator approval.",
    surfaceIds: ["evidence-preview", "apply-packet", "run-packet", "approval-verification", "result-preview", "audit-preview", "queue-preview"],
    devOnly: true,
  },
  {
    slug: "dry-run-result-preview",
    href: "/dry-run-result-preview",
    phase: "Phase 1346",
    title: "Dry-run result preview",
    commandLabel: "Go to Dry-Run Result Preview",
    summary: "Result preview shows success denied blocked failed timeout canceled needs-review manual-review retryable and recovered states without claiming execution happened.",
    markerPhrases: [
      "Dry-run result preview",
      "Dry-run result preview does not persist results",
      "Dry-run result preview requires explicit operator approval",
      "Result preview shows success denied blocked failed timeout canceled needs-review manual-review retryable and recovered states without claiming execution happened",
      "Denied dry-run result paths remain blocked",
      "Dry-run result checklist",
    ],
    deniedCopy: "Denied dry-run result paths remain blocked.",
    approvalCopy: "Dry-run result preview requires explicit operator approval.",
    surfaceIds: ["result-preview", "evidence-preview", "recovery-preview", "audit-preview", "queue-preview", "go-no-go-review"],
    devOnly: true,
  },
  {
    slug: "dry-run-recovery-preview",
    href: "/dry-run-recovery-preview",
    phase: "Phase 1347",
    title: "Dry-run recovery preview",
    commandLabel: "Go to Dry-Run Recovery Preview",
    summary: "Recovery preview shows rollback retry stop restore explain-failure manual-review safety-stop and partial-recovery options as non-executing preview actions.",
    markerPhrases: [
      "Dry-run recovery preview",
      "Dry-run recovery preview does not execute recovery",
      "Dry-run recovery preview requires explicit operator approval",
      "Recovery preview shows rollback retry stop restore explain-failure manual-review safety-stop and partial-recovery options as non-executing preview actions",
      "Denied dry-run recovery paths remain blocked",
      "Dry-run recovery checklist",
    ],
    deniedCopy: "Denied dry-run recovery paths remain blocked.",
    approvalCopy: "Dry-run recovery preview requires explicit operator approval.",
    surfaceIds: ["recovery-preview", "result-preview", "evidence-preview", "audit-preview", "queue-preview", "go-no-go-review"],
    devOnly: true,
  },
  {
    slug: "dry-run-audit-preview",
    href: "/dry-run-audit-preview",
    phase: "Phase 1348",
    title: "Dry-run audit preview",
    commandLabel: "Go to Dry-Run Audit Preview",
    summary: "Audit preview shows goal plan diff apply command approval evidence result recovery queue operator and denied-path records without persistence.",
    markerPhrases: [
      "Dry-run audit preview",
      "Dry-run audit preview does not persist audit logs",
      "Dry-run audit preview requires explicit operator approval",
      "Audit preview shows goal plan diff apply command approval evidence result recovery queue operator and denied-path records without persistence",
      "Denied dry-run audit paths remain blocked",
      "Dry-run audit checklist",
    ],
    deniedCopy: "Denied dry-run audit paths remain blocked.",
    approvalCopy: "Dry-run audit preview requires explicit operator approval.",
    surfaceIds: ["audit-preview", "approval-verification", "apply-packet", "run-packet", "evidence-preview", "result-preview", "recovery-preview", "queue-preview", "denied-path-matrix"],
    devOnly: true,
  },
  {
    slug: "dry-run-queue-preview",
    href: "/dry-run-queue-preview",
    phase: "Phase 1349",
    title: "Dry-run queue preview",
    commandLabel: "Go to Dry-Run Queue Preview",
    summary: "Queue preview shows preview blocked approved queued applying running completed failed timeout canceled recovered and manual-review states without persistence.",
    markerPhrases: [
      "Dry-run queue preview",
      "Dry-run queue preview does not create queue jobs",
      "Dry-run queue preview requires explicit operator approval",
      "Queue preview shows preview blocked approved queued applying running completed failed timeout canceled recovered and manual-review states without persistence",
      "Denied dry-run queue paths remain blocked",
      "Dry-run queue checklist",
    ],
    deniedCopy: "Denied dry-run queue paths remain blocked.",
    approvalCopy: "Dry-run queue preview requires explicit operator approval.",
    surfaceIds: ["queue-preview", "approval-verification", "combined-packet", "evidence-preview", "result-preview", "recovery-preview", "audit-preview"],
    devOnly: true,
  },
  {
    slug: "dry-run-denied-path-matrix",
    href: "/dry-run-denied-path-matrix",
    phase: "Phase 1350",
    title: "Dry-run denied path matrix",
    commandLabel: "Go to Dry-Run Denied Path Matrix",
    summary: "Denied path matrix lists blocked prompts models providers connectors files commands git tests builds smokes runtimes adapters persistence export recovery queues deploy install scaffold secrets memory promotion and backend execution.",
    markerPhrases: [
      "Dry-run denied path matrix",
      "Dry-run denied path matrix does not mutate workflow state",
      "Dry-run denied path matrix requires explicit operator approval",
      "Denied path matrix lists blocked prompts models providers connectors files commands git tests builds smokes runtimes adapters persistence export recovery queues deploy install scaffold secrets memory promotion and backend execution",
      "Denied dry-run paths remain blocked",
      "Dry-run denied path checklist",
    ],
    deniedCopy: "Denied dry-run paths remain blocked.",
    approvalCopy: "Dry-run denied path matrix requires explicit operator approval.",
    surfaceIds: ["denied-path-matrix", "dry-run-boundary", "path-guard-evaluation", "command-guard-evaluation", "approval-verification", "go-no-go-review"],
    devOnly: true,
  },
  {
    slug: "dry-run-go-no-go-review",
    href: "/dry-run-go-no-go-review",
    phase: "Phase 1351",
    title: "Dry-run go no-go review",
    commandLabel: "Go to Dry-Run Go No Go Review",
    summary: "Go no-go review reports dry-run-only status blocked apply run and required future backend guards.",
    markerPhrases: [
      "Dry-run go no-go review",
      "Dry-run go no-go review does not release execution",
      "Dry-run go no-go review requires explicit operator approval",
      "Go no-go review reports dry-run-only status blocked apply run and required future backend guards",
      "Denied dry-run go no-go paths remain blocked",
      "Dry-run go no-go checklist",
    ],
    deniedCopy: "Denied dry-run go no-go paths remain blocked.",
    approvalCopy: "Dry-run go no-go review requires explicit operator approval.",
    surfaceIds: ["go-no-go-review", "approval-verification", "apply-packet", "run-packet", "evidence-preview", "result-preview", "recovery-preview", "audit-preview", "queue-preview", "denied-path-matrix"],
    devOnly: true,
  },
  {
    slug: "first-guarded-apply-run-dry-run-candidate",
    href: "/first-guarded-apply-run-dry-run-candidate",
    phase: "Phase 1352",
    title: "First guarded apply run dry-run candidate",
    commandLabel: "Go to First Guarded Apply Run Dry-Run Candidate",
    summary: "Candidate combines apply packet run packet path guard command guard approval evidence result recovery audit queue denied paths and go no-go review.",
    markerPhrases: [
      "First guarded apply run dry-run candidate",
      "First guarded apply run dry-run candidate does not execute apply or run",
      "First guarded apply run dry-run candidate requires explicit operator approval",
      "Candidate combines apply packet run packet path guard command guard approval evidence result recovery audit queue denied paths and go no-go review",
      "Denied first guarded apply run dry-run paths remain blocked",
      "First guarded apply run dry-run checklist",
    ],
    deniedCopy: "Denied first guarded apply run dry-run paths remain blocked.",
    approvalCopy: "First guarded apply run dry-run candidate requires explicit operator approval.",
    surfaceIds: ALL_SURFACE_IDS,
    devOnly: true,
  },
  {
    slug: "controlled-guarded-apply-run-dry-run-release-candidate",
    href: "/controlled-guarded-apply-run-dry-run-release-candidate",
    phase: "Phase 1353",
    title: "Controlled guarded apply run dry-run release candidate",
    commandLabel: "Go to Controlled Guarded Apply Run Dry-Run Release Candidate",
    summary: "Release candidate prepares CodexForge for future backend-owned guarded apply and run without executing it.",
    markerPhrases: [
      "Controlled guarded apply run dry-run release candidate",
      "Controlled guarded apply run dry-run release candidate does not call models write files run commands persist approvals create queues release locks persist results or execute recovery",
      "Controlled guarded apply run dry-run release requires explicit operator approval",
      "Release candidate prepares CodexForge for future backend-owned guarded apply and run without executing it",
      "Denied controlled guarded apply run dry-run paths remain blocked",
      "Controlled guarded apply run dry-run release checklist",
    ],
    deniedCopy: "Denied controlled guarded apply run dry-run paths remain blocked.",
    approvalCopy: "Controlled guarded apply run dry-run release requires explicit operator approval.",
    surfaceIds: ALL_SURFACE_IDS,
    devOnly: true,
  },
] as const;

export function buildGuardedApplyRunDryRunStableKey(parts: readonly string[]): string {
  return parts.join(":").toLowerCase().replace(/[^a-z0-9:/-]+/g, "-");
}

export function listGuardedApplyRunDryRunRouteDefinitions(): readonly GuardedApplyRunDryRunRouteDefinition[] {
  return ROUTES;
}

export function getGuardedApplyRunDryRunRouteDefinition(
  slug: GuardedApplyRunDryRunRouteSlug
): GuardedApplyRunDryRunRouteDefinition {
  return ROUTES.find((candidate) => candidate.slug === slug) ?? ROUTES[0];
}

export function buildGuardedApplyRunDryRunRouteModel(
  slug: GuardedApplyRunDryRunRouteSlug = "codexforge-cockpit"
): GuardedApplyRunDryRunRouteModel {
  const route = getGuardedApplyRunDryRunRouteDefinition(slug);
  const surfaces = route.surfaceIds
    .map((surfaceId) => SURFACES.find((surface) => surface.id === surfaceId))
    .filter((surface): surface is GuardedApplyRunDryRunSurface => Boolean(surface));

  return {
    route,
    packet: DRY_RUN_PACKET,
    surfaces,
    globalSafetyCopy: GLOBAL_SAFETY_COPY,
    targetFamilies: TARGET_FAMILIES,
    packetReviewFlow: PACKET_REVIEW_FLOW,
    summary: summarizeGuardedApplyRunDryRunRoute(route, surfaces),
  };
}

export function buildGuardedApplyRunDryRunModel(): GuardedApplyRunDryRunRouteModel {
  return buildGuardedApplyRunDryRunRouteModel("codexforge-cockpit");
}

export function summarizeGuardedApplyRunDryRunRoute(
  route: GuardedApplyRunDryRunRouteDefinition,
  surfaces: readonly GuardedApplyRunDryRunSurface[]
): string {
  return `${route.title} keeps ${surfaces.length} guarded apply/run dry-run packet surfaces static, deterministic, approval-gated, preview-only, and blocked from apply, run, persistence, recovery, and backend execution.`;
}

export function summarizeGuardedApplyRunDryRunRouteModel(
  model = buildGuardedApplyRunDryRunModel()
): string {
  return model.summary;
}
