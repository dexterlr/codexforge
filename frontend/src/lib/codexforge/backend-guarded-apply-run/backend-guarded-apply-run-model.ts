export type BackendGuardedApplyRunRouteSlug =
  | "codexforge-cockpit"
  | "backend-guarded-apply-run-boundary"
  | "backend-guarded-apply-contract"
  | "backend-guarded-run-contract"
  | "backend-guarded-combined-apply-run-contract"
  | "backend-guarded-path-guard-contract"
  | "backend-guarded-command-guard-contract"
  | "backend-guarded-approval-enforcement-contract"
  | "backend-guarded-evidence-contract"
  | "backend-guarded-result-contract"
  | "backend-guarded-recovery-contract"
  | "backend-guarded-audit-contract"
  | "backend-guarded-queue-state-contract"
  | "backend-guarded-denied-path-review"
  | "backend-guarded-go-no-go-review"
  | "first-backend-guarded-apply-run-candidate"
  | "controlled-backend-guarded-apply-run-preview-release-candidate";

export type BackendGuardedApplyRunPanelState =
  | "blocked"
  | "preview-only"
  | "approval-required"
  | "dev-test-only";

export type BackendGuardedApplyRunChecklistItem = {
  id: string;
  label: string;
  detail: string;
  state: BackendGuardedApplyRunPanelState;
};

export type BackendGuardedApplyRunSurface = {
  id: string;
  title: string;
  eyebrow: string;
  state: BackendGuardedApplyRunPanelState;
  body: string;
  checklist: readonly BackendGuardedApplyRunChecklistItem[];
  placeholders: readonly string[];
};

export type BackendGuardedApplyRunRouteDefinition = {
  slug: BackendGuardedApplyRunRouteSlug;
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

export type BackendGuardedApplyRunRouteModel = {
  route: BackendGuardedApplyRunRouteDefinition;
  surfaces: readonly BackendGuardedApplyRunSurface[];
  globalSafetyCopy: readonly string[];
  targetFamilies: readonly string[];
  executionFlow: readonly string[];
  applyRequirements: readonly string[];
  runRequirements: readonly string[];
  guardRequirements: readonly string[];
  evidenceFields: readonly string[];
  resultStates: readonly string[];
  recoveryRequirements: readonly string[];
  auditRecords: readonly string[];
  queueStates: readonly string[];
  deniedPathMatrix: readonly string[];
  summary: string;
};

export const BACKEND_GUARDED_APPLY_RUN_COCKPIT_LANGUAGE = [
  "Backend guarded apply run contract",
  "Backend guarded apply contract",
  "Backend guarded run contract",
  "Backend guarded combined apply run contract",
  "Backend guarded path guard contract",
  "Backend guarded command guard contract",
  "Backend guarded approval enforcement contract",
  "Backend guarded evidence contract",
  "Backend guarded result contract",
  "Backend guarded recovery contract",
  "Backend guarded audit contract",
  "Backend guarded queue state contract",
  "Backend guarded denied path review",
  "Backend guarded go no-go review",
  "No real file mutation from the cockpit",
  "No real command execution from the cockpit",
  "No backend execution from the cockpit",
  "No apply or run execution from the cockpit",
].join(" | ");

const GLOBAL_SAFETY_COPY = [
  "Phase pages are dev/test surfaces only.",
  "Normal operation should happen in this cockpit.",
  "Backend guarded apply run requires explicit operator approval.",
  "The cockpit previews a backend-owned guarded apply/run contract and does not execute it.",
  "No real file mutation from the cockpit.",
  "No real command execution from the cockpit.",
  "No backend execution from the cockpit.",
  "No apply or run execution from the cockpit.",
  "No approval persistence from the cockpit.",
  "No queue persistence from the cockpit.",
  "No execution lock release from the cockpit.",
  "No evidence persistence from the cockpit.",
  "No result persistence from the cockpit.",
  "No audit persistence from the cockpit.",
  "No recovery execution from the cockpit.",
  "No model calls, provider calls, connector calls, adapter calls, runtime starts, process spawning, port binding, package installation, deployment, scaffold creation, prompt sending, approval persistence, queue persistence, evidence persistence, result persistence, audit persistence, export writing, recovery execution, rollback execution, retry execution, lock release, real operator trial execution, or memory promotion occurs from this preview.",
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

const EXECUTION_FLOW = [
  "approval handoff",
  "guarded apply contract",
  "guarded run contract",
  "combined apply/run contract",
  "path guard",
  "command guard",
  "approval enforcement",
  "evidence",
  "result",
  "recovery",
  "audit",
  "queue state",
  "denied paths",
  "go/no-go",
] as const;

const APPLY_REQUIREMENTS = [
  "workspace root containment",
  "diff preview",
  "generated file policy",
  "binary guard",
  "rollback plan",
  "evidence capture",
  "result capture",
  "audit reference",
] as const;

const RUN_REQUIREMENTS = [
  "command allowlist",
  "argument guard",
  "working-directory guard",
  "environment-name-only display",
  "timeout",
  "cancellation",
  "stdout capture",
  "stderr capture",
  "exit-code capture",
] as const;

const GUARD_REQUIREMENTS = [
  "explicit operator approval",
  "backend-owned authorization",
  "approval scope",
  "operator identity",
  "approval expiry",
  "denied path replay protection",
  "file-write path guard",
  "command allowlist",
  "working-directory guard",
  "environment guard",
] as const;

const EVIDENCE_FIELDS = [
  "diff",
  "command",
  "stdout",
  "stderr",
  "exit code",
  "approval timestamp",
  "redaction",
  "operator",
  "audit reference",
  "queue reference",
] as const;

const RESULT_STATES = [
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
] as const;

const RECOVERY_REQUIREMENTS = [
  "rollback",
  "retry",
  "stop",
  "restore",
  "explain-failure",
  "manual-review",
  "safety-stop",
  "partial-recovery",
] as const;

const AUDIT_RECORDS = [
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
] as const;

const QUEUE_STATES = [
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

const SURFACES: readonly BackendGuardedApplyRunSurface[] = [
  {
    id: "apply-run-boundary",
    title: "Backend guarded apply run boundary",
    eyebrow: "Boundary",
    state: "blocked",
    body: "Separates the frontend cockpit preview from future backend-owned guarded apply and command run services. The UI can describe the contract but cannot write files, run commands, approve execution, release locks, create queues, persist evidence, persist results, persist audit records, or execute recovery.",
    checklist: [
      {
        id: "boundary-preview-only",
        label: "Apply and run are blocked",
        detail: "The boundary is static preview copy and cannot execute apply or run actions from the cockpit.",
        state: "blocked",
      },
      {
        id: "boundary-backend-owned",
        label: "Backend ownership required",
        detail: "Future apply/run execution must be owned by backend guards after explicit operator approval.",
        state: "approval-required",
      },
    ],
    placeholders: ["approval handoff", "guarded apply", "guarded run", "frontend preview", "backend-owned execution"],
  },
  {
    id: "apply-contract",
    title: "Backend guarded apply contract",
    eyebrow: "Apply",
    state: "approval-required",
    body: "Defines path guard, diff preview, rollback, evidence, result, audit, queue, and recovery requirements for a future backend apply path without writing files or applying diffs.",
    checklist: [
      {
        id: "apply-no-file-write",
        label: "No file write",
        detail: "The contract does not mutate files, apply diffs, export artifacts, or persist evidence.",
        state: "blocked",
      },
      {
        id: "apply-guarded",
        label: "Guarded by backend",
        detail: "Future apply requires operator approval, backend path guard, diff preview, result capture, and recovery plan.",
        state: "approval-required",
      },
    ],
    placeholders: ["path guard", "diff preview", "rollback", "evidence", "result", "audit", "queue", "recovery"],
  },
  {
    id: "run-contract",
    title: "Backend guarded run contract",
    eyebrow: "Run",
    state: "approval-required",
    body: "Defines command allowlist, arguments, working directory, environment names, evidence, result, audit, queue, and recovery requirements for a future backend command run path without running commands.",
    checklist: [
      {
        id: "run-no-command",
        label: "No command execution",
        detail: "The contract does not run shell, git, test, build, smoke, runtime, adapter, or dry-run commands.",
        state: "blocked",
      },
      {
        id: "run-guarded",
        label: "Command guard required",
        detail: "Future run requires allowlist, argument guard, working-directory guard, environment guard, timeout, and output capture.",
        state: "approval-required",
      },
    ],
    placeholders: ["allowlist", "arguments", "working directory", "environment names", "stdout", "stderr", "exit code"],
  },
  {
    id: "combined-contract",
    title: "Backend guarded combined apply run contract",
    eyebrow: "Combined",
    state: "approval-required",
    body: "Defines apply then run ordering, evidence chaining, result capture, queue state, and recovery requirements for a future backend-owned combined path without writing files or running commands.",
    checklist: [
      {
        id: "combined-no-execution",
        label: "Apply/run blocked",
        detail: "The combined contract cannot write files, run commands, create jobs, or release execution locks.",
        state: "blocked",
      },
      {
        id: "combined-chain",
        label: "Evidence chain required",
        detail: "Future execution must chain apply evidence into run evidence and preserve result, audit, queue, and recovery references.",
        state: "approval-required",
      },
    ],
    placeholders: ["apply then run", "evidence chaining", "queue state", "result capture", "recovery contract"],
  },
  {
    id: "path-guard",
    title: "Backend guarded path guard contract",
    eyebrow: "Path guard",
    state: "approval-required",
    body: "Defines workspace root containment, traversal denial, generated file policy, binary guard, rollback requirements, and denied path handling without browsing arbitrary files or writing files.",
    checklist: [
      {
        id: "path-no-browse",
        label: "No arbitrary file browsing",
        detail: "The path guard contract is static and does not crawl, open, browse, or mutate arbitrary paths from the UI.",
        state: "blocked",
      },
      {
        id: "path-containment",
        label: "Containment required",
        detail: "Future backend apply must prove workspace root containment and deny traversal, binary mutation, and unapproved generated outputs.",
        state: "approval-required",
      },
    ],
    placeholders: ["workspace root", "traversal denial", "generated file policy", "binary guard", "rollback"],
  },
  {
    id: "command-guard",
    title: "Backend guarded command guard contract",
    eyebrow: "Command guard",
    state: "approval-required",
    body: "Defines command allowlist, argument guard, working-directory guard, environment-name-only display, timeout, cancellation, stdout, stderr, and exit-code capture without running commands.",
    checklist: [
      {
        id: "command-no-run",
        label: "No command run",
        detail: "The command guard contract does not start processes, open ports, call adapters, or execute shell commands.",
        state: "blocked",
      },
      {
        id: "command-guard-required",
        label: "Allowlist required",
        detail: "Future backend run must enforce command allowlist, argument guard, working-directory guard, and environment-name-only handling.",
        state: "approval-required",
      },
    ],
    placeholders: ["allowlist", "argument guard", "working directory", "environment names", "timeout", "cancellation"],
  },
  {
    id: "approval-enforcement",
    title: "Backend guarded approval enforcement contract",
    eyebrow: "Approval",
    state: "approval-required",
    body: "Defines operator identity, approval scope, expiry, denied paths, replay protection, and backend authorization checks without persisting approvals or releasing execution.",
    checklist: [
      {
        id: "approval-no-persist",
        label: "No approval persistence",
        detail: "The contract does not store approval decisions, approve execution, create queues, or release locks.",
        state: "blocked",
      },
      {
        id: "approval-human-required",
        label: "Human approval required",
        detail: "Future backend execution requires explicit human approval bound to scope, identity, expiry, and denied paths.",
        state: "approval-required",
      },
    ],
    placeholders: ["operator identity", "approval scope", "expiry", "denied paths", "replay protection"],
  },
  {
    id: "evidence-contract",
    title: "Backend guarded evidence contract",
    eyebrow: "Evidence",
    state: "approval-required",
    body: "Defines diff, command, stdout, stderr, exit code, approval timestamp, redaction, operator, audit, and queue references without persisting evidence.",
    checklist: [
      {
        id: "evidence-no-persist",
        label: "No evidence persistence",
        detail: "The evidence contract does not store output, write audit records, export files, or capture live backend data.",
        state: "blocked",
      },
      {
        id: "evidence-redaction",
        label: "Redaction required",
        detail: "Future evidence capture must redact secrets and bind evidence to approval, operator, queue, result, and audit references.",
        state: "approval-required",
      },
    ],
    placeholders: ["diff", "command", "stdout", "stderr", "exit code", "redaction", "operator", "queue"],
  },
  {
    id: "result-contract",
    title: "Backend guarded result contract",
    eyebrow: "Result",
    state: "approval-required",
    body: "Defines success, denied, blocked, failed, timeout, canceled, needs-review, manual-review, retryable, and recovered states without persisting results.",
    checklist: [
      {
        id: "result-no-persist",
        label: "No result persistence",
        detail: "The result contract does not store results, trigger recovery, transition queues, or promote memory.",
        state: "blocked",
      },
      {
        id: "result-state-required",
        label: "State machine required",
        detail: "Future backend execution must capture a bounded result state with evidence, recovery, audit, and queue references.",
        state: "approval-required",
      },
    ],
    placeholders: ["success", "denied", "blocked", "failed", "timeout", "canceled", "manual-review", "recovered"],
  },
  {
    id: "recovery-contract",
    title: "Backend guarded recovery contract",
    eyebrow: "Recovery",
    state: "approval-required",
    body: "Defines rollback, retry, stop, restore, explain-failure, manual-review, safety-stop, and partial-recovery requirements without executing recovery.",
    checklist: [
      {
        id: "recovery-no-execute",
        label: "No recovery execution",
        detail: "The recovery contract does not rollback, retry, restore, stop jobs, mutate files, run commands, or create recovery queues.",
        state: "blocked",
      },
      {
        id: "recovery-approval",
        label: "Approval required",
        detail: "Future recovery actions require explicit operator approval, audit linkage, result context, and safety-stop behavior.",
        state: "approval-required",
      },
    ],
    placeholders: ["rollback", "retry", "stop", "restore", "explain-failure", "safety-stop", "partial-recovery"],
  },
  {
    id: "audit-contract",
    title: "Backend guarded audit contract",
    eyebrow: "Audit",
    state: "approval-required",
    body: "Defines goal, plan, diff, apply, command, approval, evidence, result, recovery, queue, operator, and denied-path records without persisting audit logs.",
    checklist: [
      {
        id: "audit-no-persist",
        label: "No audit persistence",
        detail: "The audit contract does not write logs, store approvals, store evidence, store results, or release execution.",
        state: "blocked",
      },
      {
        id: "audit-complete",
        label: "Complete audit required",
        detail: "Future backend execution must link goal, plan, apply, run, approval, evidence, result, recovery, queue, operator, and denied paths.",
        state: "approval-required",
      },
    ],
    placeholders: ["goal", "plan", "diff", "apply", "command", "approval", "evidence", "result", "recovery", "queue"],
  },
  {
    id: "queue-state",
    title: "Backend guarded queue state contract",
    eyebrow: "Queue",
    state: "approval-required",
    body: "Defines preview, blocked, approved, queued, applying, running, completed, failed, timeout, canceled, recovered, and manual-review states without creating queue jobs.",
    checklist: [
      {
        id: "queue-no-create",
        label: "No queue job",
        detail: "The queue state contract does not create jobs, persist queue state, start workers, or release locks.",
        state: "blocked",
      },
      {
        id: "queue-state-required",
        label: "Queue contract required",
        detail: "Future backend execution must expose bounded queue states with approval, evidence, result, recovery, and audit references.",
        state: "approval-required",
      },
    ],
    placeholders: ["preview", "blocked", "approved", "queued", "applying", "running", "completed", "manual-review"],
  },
  {
    id: "denied-path-review",
    title: "Backend guarded denied path review",
    eyebrow: "Denied paths",
    state: "blocked",
    body: "Lists blocked prompts, models, providers, connectors, files, commands, git, tests, builds, smokes, runtimes, adapters, persistence, export, recovery, queues, deploy, install, scaffold, secrets, memory promotion, and backend execution without mutating workflow state.",
    checklist: [
      {
        id: "denied-no-mutation",
        label: "No workflow mutation",
        detail: "Denied path review does not change policy, persist denials, create queues, approve work, or release execution.",
        state: "blocked",
      },
      {
        id: "denied-remain-blocked",
        label: "Denied paths remain blocked",
        detail: "Future backend execution must reject every denied path unless an explicit backend-owned approval and guard contract allows it.",
        state: "approval-required",
      },
    ],
    placeholders: ["prompts", "models", "providers", "connectors", "files", "commands", "secrets", "backend execution"],
  },
  {
    id: "go-no-go-review",
    title: "Backend guarded go no-go review",
    eyebrow: "Go no-go",
    state: "approval-required",
    body: "Reports preview-only status, blocked apply, blocked run, and required future backend guards without releasing execution.",
    checklist: [
      {
        id: "go-no-go-no-release",
        label: "No execution release",
        detail: "Go no-go review does not approve, queue, release locks, run commands, write files, or execute backend services.",
        state: "blocked",
      },
      {
        id: "go-no-go-future",
        label: "Future guards required",
        detail: "A future go decision must verify approval, path guard, command guard, evidence, result, recovery, audit, queue, and denied paths.",
        state: "approval-required",
      },
    ],
    placeholders: ["preview-only", "blocked apply", "blocked run", "required backend guards", "go/no-go"],
  },
  {
    id: "first-candidate",
    title: "First backend guarded apply run candidate",
    eyebrow: "Candidate",
    state: "approval-required",
    body: "Combines apply contract, run contract, path guard, command guard, approval, evidence, result, recovery, audit, queue, denied paths, and go/no-go review without executing apply or run.",
    checklist: [
      {
        id: "candidate-no-execution",
        label: "Candidate is preview-only",
        detail: "The candidate cannot apply files, run commands, persist approvals, create queues, or execute recovery.",
        state: "blocked",
      },
      {
        id: "candidate-complete",
        label: "Contract complete",
        detail: "The candidate makes the backend-owned guarded apply/run contract reviewable from the cockpit.",
        state: "approval-required",
      },
    ],
    placeholders: ["apply", "run", "path guard", "command guard", "approval", "evidence", "result", "audit"],
  },
  {
    id: "release-candidate",
    title: "Controlled backend guarded apply run preview release candidate",
    eyebrow: "Release candidate",
    state: "approval-required",
    body: "Prepares CodexForge for future backend-owned guarded apply and run without calling models, writing files, running commands, persisting approvals, creating queues, releasing locks, persisting results, or executing recovery.",
    checklist: [
      {
        id: "release-no-execution",
        label: "Release candidate is preview-only",
        detail: "The release candidate stays static, deterministic, cockpit-centered, approval-gated, and blocked from backend execution.",
        state: "blocked",
      },
      {
        id: "release-future-backend",
        label: "Future backend path required",
        detail: "Future controlled apply/run requires backend-owned guards, evidence capture, result capture, audit, queue, recovery, and explicit operator approval.",
        state: "approval-required",
      },
    ],
    placeholders: ["release candidate", "backend-owned apply", "backend-owned run", "guards required", "execution blocked"],
  },
] as const;

const ALL_SURFACE_IDS = SURFACES.map((surface) => surface.id);

const ROUTES: readonly BackendGuardedApplyRunRouteDefinition[] = [
  {
    slug: "codexforge-cockpit",
    href: "/codexforge-cockpit",
    phase: "Cockpit",
    title: "Backend guarded apply run contract",
    commandLabel: "Go to Unified CodexForge Cockpit",
    summary: "Cockpit-centered preview-only backend guarded apply/run contract for future backend-owned apply and command run execution.",
    markerPhrases: BACKEND_GUARDED_APPLY_RUN_COCKPIT_LANGUAGE.split(" | "),
    deniedCopy: "Denied cockpit paths remain blocked: no real file mutation, no real command execution, no backend execution, no apply or run execution, no approval persistence, no queue persistence, no lock release, no evidence persistence, no result persistence, no audit persistence, no export writing, and no recovery execution.",
    approvalCopy: "A future backend guarded apply/run path requires explicit operator approval, backend-owned guards, file-write path guard, diff preview, command allowlist, command argument guard, working-directory guard, environment guard, evidence capture, result capture, audit, queue, denied path, go/no-go, and recovery contracts.",
    surfaceIds: ALL_SURFACE_IDS,
    devOnly: false,
  },
  {
    slug: "backend-guarded-apply-run-boundary",
    href: "/backend-guarded-apply-run-boundary",
    phase: "Phase 1322",
    title: "Backend guarded apply run boundary",
    commandLabel: "Go to Backend Guarded Apply Run Boundary",
    summary: "Apply run boundary separates frontend preview from backend-owned guarded apply and command run.",
    markerPhrases: [
      "Backend guarded apply run boundary",
      "Backend guarded apply run boundary does not execute apply or run",
      "Backend guarded apply run requires explicit operator approval",
      "Apply run boundary separates frontend preview from backend-owned guarded apply and command run",
      "Denied backend guarded apply run paths remain blocked",
      "Backend guarded apply run checklist",
    ],
    deniedCopy: "Denied backend guarded apply run paths remain blocked.",
    approvalCopy: "Backend guarded apply run requires explicit operator approval.",
    surfaceIds: ALL_SURFACE_IDS,
    devOnly: true,
  },
  {
    slug: "backend-guarded-apply-contract",
    href: "/backend-guarded-apply-contract",
    phase: "Phase 1323",
    title: "Backend guarded apply contract",
    commandLabel: "Go to Backend Guarded Apply Contract",
    summary: "Apply contract defines path guard diff rollback evidence result audit queue and recovery requirements.",
    markerPhrases: [
      "Backend guarded apply contract",
      "Backend guarded apply contract does not write files or apply diffs",
      "Backend guarded apply requires explicit operator approval",
      "Apply contract defines path guard diff rollback evidence result audit queue and recovery requirements",
      "Denied backend guarded apply paths remain blocked",
      "Backend guarded apply checklist",
    ],
    deniedCopy: "Denied backend guarded apply paths remain blocked.",
    approvalCopy: "Backend guarded apply requires explicit operator approval.",
    surfaceIds: ["apply-contract", "path-guard", "approval-enforcement", "evidence-contract", "result-contract", "recovery-contract", "audit-contract", "queue-state"],
    devOnly: true,
  },
  {
    slug: "backend-guarded-run-contract",
    href: "/backend-guarded-run-contract",
    phase: "Phase 1324",
    title: "Backend guarded run contract",
    commandLabel: "Go to Backend Guarded Run Contract",
    summary: "Run contract defines command allowlist arguments working directory environment names evidence result audit queue and recovery requirements.",
    markerPhrases: [
      "Backend guarded run contract",
      "Backend guarded run contract does not run commands",
      "Backend guarded run requires explicit operator approval",
      "Run contract defines command allowlist arguments working directory environment names evidence result audit queue and recovery requirements",
      "Denied backend guarded run paths remain blocked",
      "Backend guarded run checklist",
    ],
    deniedCopy: "Denied backend guarded run paths remain blocked.",
    approvalCopy: "Backend guarded run requires explicit operator approval.",
    surfaceIds: ["run-contract", "command-guard", "approval-enforcement", "evidence-contract", "result-contract", "recovery-contract", "audit-contract", "queue-state"],
    devOnly: true,
  },
  {
    slug: "backend-guarded-combined-apply-run-contract",
    href: "/backend-guarded-combined-apply-run-contract",
    phase: "Phase 1325",
    title: "Backend guarded combined apply run contract",
    commandLabel: "Go to Backend Guarded Combined Apply Run Contract",
    summary: "Combined contract defines apply then run ordering evidence chaining result capture queue state and recovery requirements.",
    markerPhrases: [
      "Backend guarded combined apply run contract",
      "Backend guarded combined apply run contract does not write files or run commands",
      "Backend guarded combined apply run requires explicit operator approval",
      "Combined contract defines apply then run ordering evidence chaining result capture queue state and recovery requirements",
      "Denied backend guarded combined apply run paths remain blocked",
      "Backend guarded combined apply run checklist",
    ],
    deniedCopy: "Denied backend guarded combined apply run paths remain blocked.",
    approvalCopy: "Backend guarded combined apply run requires explicit operator approval.",
    surfaceIds: ["combined-contract", "apply-contract", "run-contract", "path-guard", "command-guard", "evidence-contract", "result-contract", "recovery-contract", "audit-contract", "queue-state"],
    devOnly: true,
  },
  {
    slug: "backend-guarded-path-guard-contract",
    href: "/backend-guarded-path-guard-contract",
    phase: "Phase 1326",
    title: "Backend guarded path guard contract",
    commandLabel: "Go to Backend Guarded Path Guard Contract",
    summary: "Path guard contract defines workspace root containment traversal denial generated file policy binary guard and rollback requirements.",
    markerPhrases: [
      "Backend guarded path guard contract",
      "Backend guarded path guard contract does not browse arbitrary files or write files",
      "Backend guarded path guard requires explicit operator approval",
      "Path guard contract defines workspace root containment traversal denial generated file policy binary guard and rollback requirements",
      "Denied backend guarded path guard paths remain blocked",
      "Backend guarded path guard checklist",
    ],
    deniedCopy: "Denied backend guarded path guard paths remain blocked.",
    approvalCopy: "Backend guarded path guard requires explicit operator approval.",
    surfaceIds: ["path-guard", "apply-contract", "approval-enforcement", "evidence-contract", "recovery-contract", "audit-contract", "denied-path-review"],
    devOnly: true,
  },
  {
    slug: "backend-guarded-command-guard-contract",
    href: "/backend-guarded-command-guard-contract",
    phase: "Phase 1327",
    title: "Backend guarded command guard contract",
    commandLabel: "Go to Backend Guarded Command Guard Contract",
    summary: "Command guard contract defines allowlist arguments working directory environment-name-only display timeout cancellation stdout stderr and exit-code capture.",
    markerPhrases: [
      "Backend guarded command guard contract",
      "Backend guarded command guard contract does not run commands",
      "Backend guarded command guard requires explicit operator approval",
      "Command guard contract defines allowlist arguments working directory environment-name-only display timeout cancellation stdout stderr and exit-code capture",
      "Denied backend guarded command guard paths remain blocked",
      "Backend guarded command guard checklist",
    ],
    deniedCopy: "Denied backend guarded command guard paths remain blocked.",
    approvalCopy: "Backend guarded command guard requires explicit operator approval.",
    surfaceIds: ["command-guard", "run-contract", "approval-enforcement", "evidence-contract", "result-contract", "recovery-contract", "audit-contract", "denied-path-review"],
    devOnly: true,
  },
  {
    slug: "backend-guarded-approval-enforcement-contract",
    href: "/backend-guarded-approval-enforcement-contract",
    phase: "Phase 1328",
    title: "Backend guarded approval enforcement contract",
    commandLabel: "Go to Backend Guarded Approval Enforcement Contract",
    summary: "Approval enforcement contract defines operator identity approval scope expiry denied paths replay protection and backend authorization checks.",
    markerPhrases: [
      "Backend guarded approval enforcement contract",
      "Backend guarded approval enforcement contract does not persist approvals or release execution",
      "Backend guarded approval enforcement requires explicit human approval",
      "Approval enforcement contract defines operator identity approval scope expiry denied paths replay protection and backend authorization checks",
      "Denied backend guarded approval enforcement paths remain blocked",
      "Backend guarded approval enforcement checklist",
    ],
    deniedCopy: "Denied backend guarded approval enforcement paths remain blocked.",
    approvalCopy: "Backend guarded approval enforcement requires explicit human approval.",
    surfaceIds: ["approval-enforcement", "apply-contract", "run-contract", "combined-contract", "audit-contract", "queue-state", "denied-path-review"],
    devOnly: true,
  },
  {
    slug: "backend-guarded-evidence-contract",
    href: "/backend-guarded-evidence-contract",
    phase: "Phase 1329",
    title: "Backend guarded evidence contract",
    commandLabel: "Go to Backend Guarded Evidence Contract",
    summary: "Evidence contract defines diff command stdout stderr exit code approval timestamp redaction operator audit and queue references.",
    markerPhrases: [
      "Backend guarded evidence contract",
      "Backend guarded evidence contract does not persist evidence",
      "Backend guarded evidence requires explicit operator approval",
      "Evidence contract defines diff command stdout stderr exit code approval timestamp redaction operator audit and queue references",
      "Denied backend guarded evidence paths remain blocked",
      "Backend guarded evidence checklist",
    ],
    deniedCopy: "Denied backend guarded evidence paths remain blocked.",
    approvalCopy: "Backend guarded evidence requires explicit operator approval.",
    surfaceIds: ["evidence-contract", "apply-contract", "run-contract", "combined-contract", "approval-enforcement", "result-contract", "audit-contract", "queue-state"],
    devOnly: true,
  },
  {
    slug: "backend-guarded-result-contract",
    href: "/backend-guarded-result-contract",
    phase: "Phase 1330",
    title: "Backend guarded result contract",
    commandLabel: "Go to Backend Guarded Result Contract",
    summary: "Result contract defines success denied blocked failed timeout canceled needs-review manual-review retryable and recovered states.",
    markerPhrases: [
      "Backend guarded result contract",
      "Backend guarded result contract does not persist results",
      "Backend guarded result requires explicit operator approval",
      "Result contract defines success denied blocked failed timeout canceled needs-review manual-review retryable and recovered states",
      "Denied backend guarded result paths remain blocked",
      "Backend guarded result checklist",
    ],
    deniedCopy: "Denied backend guarded result paths remain blocked.",
    approvalCopy: "Backend guarded result requires explicit operator approval.",
    surfaceIds: ["result-contract", "evidence-contract", "recovery-contract", "audit-contract", "queue-state", "go-no-go-review"],
    devOnly: true,
  },
  {
    slug: "backend-guarded-recovery-contract",
    href: "/backend-guarded-recovery-contract",
    phase: "Phase 1331",
    title: "Backend guarded recovery contract",
    commandLabel: "Go to Backend Guarded Recovery Contract",
    summary: "Recovery contract defines rollback retry stop restore explain-failure manual-review safety-stop and partial-recovery requirements.",
    markerPhrases: [
      "Backend guarded recovery contract",
      "Backend guarded recovery contract does not execute recovery",
      "Backend guarded recovery requires explicit operator approval",
      "Recovery contract defines rollback retry stop restore explain-failure manual-review safety-stop and partial-recovery requirements",
      "Denied backend guarded recovery paths remain blocked",
      "Backend guarded recovery checklist",
    ],
    deniedCopy: "Denied backend guarded recovery paths remain blocked.",
    approvalCopy: "Backend guarded recovery requires explicit operator approval.",
    surfaceIds: ["recovery-contract", "result-contract", "evidence-contract", "audit-contract", "queue-state", "go-no-go-review"],
    devOnly: true,
  },
  {
    slug: "backend-guarded-audit-contract",
    href: "/backend-guarded-audit-contract",
    phase: "Phase 1332",
    title: "Backend guarded audit contract",
    commandLabel: "Go to Backend Guarded Audit Contract",
    summary: "Audit contract defines goal plan diff apply command approval evidence result recovery queue operator and denied-path records.",
    markerPhrases: [
      "Backend guarded audit contract",
      "Backend guarded audit contract does not persist audit logs",
      "Backend guarded audit requires explicit operator approval",
      "Audit contract defines goal plan diff apply command approval evidence result recovery queue operator and denied-path records",
      "Denied backend guarded audit paths remain blocked",
      "Backend guarded audit checklist",
    ],
    deniedCopy: "Denied backend guarded audit paths remain blocked.",
    approvalCopy: "Backend guarded audit requires explicit operator approval.",
    surfaceIds: ["audit-contract", "approval-enforcement", "apply-contract", "run-contract", "evidence-contract", "result-contract", "recovery-contract", "queue-state", "denied-path-review"],
    devOnly: true,
  },
  {
    slug: "backend-guarded-queue-state-contract",
    href: "/backend-guarded-queue-state-contract",
    phase: "Phase 1333",
    title: "Backend guarded queue state contract",
    commandLabel: "Go to Backend Guarded Queue State Contract",
    summary: "Queue state contract defines preview blocked approved queued applying running completed failed timeout canceled recovered and manual-review states.",
    markerPhrases: [
      "Backend guarded queue state contract",
      "Backend guarded queue state contract does not create queue jobs",
      "Backend guarded queue state requires explicit operator approval",
      "Queue state contract defines preview blocked approved queued applying running completed failed timeout canceled recovered and manual-review states",
      "Denied backend guarded queue state paths remain blocked",
      "Backend guarded queue state checklist",
    ],
    deniedCopy: "Denied backend guarded queue state paths remain blocked.",
    approvalCopy: "Backend guarded queue state requires explicit operator approval.",
    surfaceIds: ["queue-state", "approval-enforcement", "combined-contract", "evidence-contract", "result-contract", "recovery-contract", "audit-contract"],
    devOnly: true,
  },
  {
    slug: "backend-guarded-denied-path-review",
    href: "/backend-guarded-denied-path-review",
    phase: "Phase 1334",
    title: "Backend guarded denied path review",
    commandLabel: "Go to Backend Guarded Denied Path Review",
    summary: "Denied path review lists blocked prompts models providers connectors files commands git tests builds smokes runtimes adapters persistence export recovery queues deploy install scaffold secrets memory promotion and backend execution.",
    markerPhrases: [
      "Backend guarded denied path review",
      "Backend guarded denied path review does not mutate workflow state",
      "Backend guarded denied path review requires explicit operator approval",
      "Denied path review lists blocked prompts models providers connectors files commands git tests builds smokes runtimes adapters persistence export recovery queues deploy install scaffold secrets memory promotion and backend execution",
      "Denied backend guarded paths remain blocked",
      "Backend guarded denied path checklist",
    ],
    deniedCopy: "Denied backend guarded paths remain blocked.",
    approvalCopy: "Backend guarded denied path review requires explicit operator approval.",
    surfaceIds: ["denied-path-review", "apply-run-boundary", "path-guard", "command-guard", "approval-enforcement", "go-no-go-review"],
    devOnly: true,
  },
  {
    slug: "backend-guarded-go-no-go-review",
    href: "/backend-guarded-go-no-go-review",
    phase: "Phase 1335",
    title: "Backend guarded go no-go review",
    commandLabel: "Go to Backend Guarded Go No Go Review",
    summary: "Go no-go review reports preview-only status blocked apply run and required future backend guards.",
    markerPhrases: [
      "Backend guarded go no-go review",
      "Backend guarded go no-go review does not release execution",
      "Backend guarded go no-go review requires explicit operator approval",
      "Go no-go review reports preview-only status blocked apply run and required future backend guards",
      "Denied backend guarded go no-go paths remain blocked",
      "Backend guarded go no-go checklist",
    ],
    deniedCopy: "Denied backend guarded go no-go paths remain blocked.",
    approvalCopy: "Backend guarded go no-go review requires explicit operator approval.",
    surfaceIds: ["go-no-go-review", "approval-enforcement", "apply-contract", "run-contract", "evidence-contract", "result-contract", "recovery-contract", "audit-contract", "queue-state", "denied-path-review"],
    devOnly: true,
  },
  {
    slug: "first-backend-guarded-apply-run-candidate",
    href: "/first-backend-guarded-apply-run-candidate",
    phase: "Phase 1336",
    title: "First backend guarded apply run candidate",
    commandLabel: "Go to First Backend Guarded Apply Run Candidate",
    summary: "Candidate combines apply contract run contract path guard command guard approval evidence result recovery audit queue denied paths and go no-go review.",
    markerPhrases: [
      "First backend guarded apply run candidate",
      "First backend guarded apply run candidate does not execute apply or run",
      "First backend guarded apply run candidate requires explicit operator approval",
      "Candidate combines apply contract run contract path guard command guard approval evidence result recovery audit queue denied paths and go no-go review",
      "Denied first backend guarded apply run paths remain blocked",
      "First backend guarded apply run checklist",
    ],
    deniedCopy: "Denied first backend guarded apply run paths remain blocked.",
    approvalCopy: "First backend guarded apply run candidate requires explicit operator approval.",
    surfaceIds: ALL_SURFACE_IDS,
    devOnly: true,
  },
  {
    slug: "controlled-backend-guarded-apply-run-preview-release-candidate",
    href: "/controlled-backend-guarded-apply-run-preview-release-candidate",
    phase: "Phase 1337",
    title: "Controlled backend guarded apply run preview release candidate",
    commandLabel: "Go to Controlled Backend Guarded Apply Run Preview Release Candidate",
    summary: "Release candidate prepares CodexForge for future backend-owned guarded apply and run without executing it.",
    markerPhrases: [
      "Controlled backend guarded apply run preview release candidate",
      "Controlled backend guarded apply run preview release candidate does not call models write files run commands persist approvals create queues release locks persist results or execute recovery",
      "Controlled backend guarded apply run preview release requires explicit operator approval",
      "Release candidate prepares CodexForge for future backend-owned guarded apply and run without executing it",
      "Denied controlled backend guarded apply run paths remain blocked",
      "Controlled backend guarded apply run preview release checklist",
    ],
    deniedCopy: "Denied controlled backend guarded apply run paths remain blocked.",
    approvalCopy: "Controlled backend guarded apply run preview release requires explicit operator approval.",
    surfaceIds: ALL_SURFACE_IDS,
    devOnly: true,
  },
] as const;

export function buildBackendGuardedApplyRunStableKey(parts: readonly string[]): string {
  return parts.join(":").toLowerCase().replace(/[^a-z0-9:/-]+/g, "-");
}

export function listBackendGuardedApplyRunRouteDefinitions(): readonly BackendGuardedApplyRunRouteDefinition[] {
  return ROUTES;
}

export function getBackendGuardedApplyRunRouteDefinition(
  slug: BackendGuardedApplyRunRouteSlug
): BackendGuardedApplyRunRouteDefinition {
  return ROUTES.find((candidate) => candidate.slug === slug) ?? ROUTES[0];
}

export function buildBackendGuardedApplyRunRouteModel(
  slug: BackendGuardedApplyRunRouteSlug = "codexforge-cockpit"
): BackendGuardedApplyRunRouteModel {
  const route = getBackendGuardedApplyRunRouteDefinition(slug);
  const surfaces = route.surfaceIds
    .map((surfaceId) => SURFACES.find((surface) => surface.id === surfaceId))
    .filter((surface): surface is BackendGuardedApplyRunSurface => Boolean(surface));

  return {
    route,
    surfaces,
    globalSafetyCopy: GLOBAL_SAFETY_COPY,
    targetFamilies: TARGET_FAMILIES,
    executionFlow: EXECUTION_FLOW,
    applyRequirements: APPLY_REQUIREMENTS,
    runRequirements: RUN_REQUIREMENTS,
    guardRequirements: GUARD_REQUIREMENTS,
    evidenceFields: EVIDENCE_FIELDS,
    resultStates: RESULT_STATES,
    recoveryRequirements: RECOVERY_REQUIREMENTS,
    auditRecords: AUDIT_RECORDS,
    queueStates: QUEUE_STATES,
    deniedPathMatrix: DENIED_PATH_MATRIX,
    summary: summarizeBackendGuardedApplyRunRoute(route, surfaces),
  };
}

export function buildBackendGuardedApplyRunModel(): BackendGuardedApplyRunRouteModel {
  return buildBackendGuardedApplyRunRouteModel("codexforge-cockpit");
}

export function summarizeBackendGuardedApplyRunRoute(
  route: BackendGuardedApplyRunRouteDefinition,
  surfaces: readonly BackendGuardedApplyRunSurface[]
): string {
  return `${route.title} keeps ${surfaces.length} backend guarded apply/run surfaces static, deterministic, preview-only, approval-gated, and blocked from apply, run, persistence, recovery, and backend execution.`;
}

export function summarizeBackendGuardedApplyRunRouteModel(
  model = buildBackendGuardedApplyRunModel()
): string {
  return model.summary;
}
