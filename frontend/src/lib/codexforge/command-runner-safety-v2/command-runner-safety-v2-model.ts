export type CommandRunnerSafetyV2RouteSlug =
  | "codexforge-cockpit"
  | "command-runner-safety-boundary"
  | "command-allowlist-policy-v2"
  | "command-argument-parser-guard"
  | "command-working-directory-guard"
  | "command-environment-redaction-guard"
  | "command-timeout-cancellation-guard"
  | "stdout-stderr-capture-contract"
  | "exit-code-normalization-contract"
  | "shell-escalation-denial"
  | "dangerous-command-denial"
  | "install-deploy-port-runtime-denial"
  | "command-evidence-packet"
  | "command-result-packet"
  | "cockpit-command-safety-summary"
  | "first-command-runner-safety-v2-candidate"
  | "controlled-command-runner-safety-v2-release-candidate";

export type CommandRunnerSafetyV2Kind =
  | "command-runner-safety-v2-preview"
  | "command-runner-safety-boundary"
  | "command-allowlist-policy-v2"
  | "command-argument-parser-guard"
  | "command-working-directory-guard"
  | "command-environment-redaction-guard"
  | "command-timeout-cancellation-guard"
  | "stdout-stderr-capture-contract"
  | "exit-code-normalization-contract"
  | "shell-escalation-denial"
  | "dangerous-command-denial"
  | "install-deploy-port-runtime-denial"
  | "command-evidence-packet"
  | "command-result-packet"
  | "first-command-runner-safety-v2-candidate"
  | "controlled-command-runner-safety-v2-release-candidate";

export type CommandRunnerSafetyV2PanelState =
  | "preview-only"
  | "review-only"
  | "backend-owned"
  | "needs-approval"
  | "blocked"
  | "denied"
  | "manual-review"
  | "capture-contract"
  | "normalized";

export type CommandRunnerSafetyV2Item = {
  id: string;
  label: string;
  detail: string;
  state: CommandRunnerSafetyV2PanelState;
};

export type CommandRunnerSafetyV2Section = {
  id: string;
  label: string;
  title: string;
  summary: string;
  state: CommandRunnerSafetyV2PanelState;
  items: readonly CommandRunnerSafetyV2Item[];
};

export type CommandRunnerSafetyV2DeniedBoundary = CommandRunnerSafetyV2Item;

export type CommandRunnerSafetyV2Model = {
  commandSafetyId: string;
  commandSafetyKind: CommandRunnerSafetyV2Kind;
  commandCandidateRef: string;
  transactionRef: string;
  queueItemRef: string;
  allowlistPolicy: CommandRunnerSafetyV2Section;
  argumentParserGuard: CommandRunnerSafetyV2Section;
  workingDirectoryGuard: CommandRunnerSafetyV2Section;
  environmentRedactionGuard: CommandRunnerSafetyV2Section;
  timeoutCancellationGuard: CommandRunnerSafetyV2Section;
  stdoutStderrCaptureContract: CommandRunnerSafetyV2Section;
  exitCodeNormalizationContract: CommandRunnerSafetyV2Section;
  shellEscalationDenial: CommandRunnerSafetyV2Section;
  dangerousCommandDenial: CommandRunnerSafetyV2Section;
  installDeployPortRuntimeDenial: CommandRunnerSafetyV2Section;
  commandEvidencePacket: CommandRunnerSafetyV2Section;
  commandResultPacket: CommandRunnerSafetyV2Section;
  deniedCommandBoundaries: readonly CommandRunnerSafetyV2DeniedBoundary[];
  cockpitSummary: readonly CommandRunnerSafetyV2Item[];
  explicitSafetyLimits: readonly string[];
};

export type CommandRunnerSafetyV2RouteDefinition = {
  slug: CommandRunnerSafetyV2RouteSlug;
  href: string;
  phase: string;
  title: string;
  commandLabel: string;
  summary: string;
  markerPhrases: readonly string[];
  sectionIds: readonly string[];
  devOnly: boolean;
};

export type CommandRunnerSafetyV2RouteModel = {
  route: CommandRunnerSafetyV2RouteDefinition;
  commandSafety: CommandRunnerSafetyV2Model;
  sections: readonly CommandRunnerSafetyV2Section[];
  diagnosticRoutes: readonly CommandRunnerSafetyV2RouteDefinition[];
  cockpitMarkers: readonly string[];
  summary: string;
};

export const COMMAND_RUNNER_SAFETY_V2_COCKPIT_MARKERS = [
  "Command Runner Safety v2",
  "Command",
  "Allowlist",
  "Arguments",
  "Working Directory",
  "Environment",
  "Timeout",
  "Cancel",
  "Stdout",
  "Stderr",
  "Exit Code",
  "Denied Commands",
  "Evidence",
  "Result",
  "No command execution from the cockpit",
  "No process spawning from the cockpit",
  "No environment values from the cockpit",
  "No shell escalation from the cockpit",
  "No install deploy port or runtime execution from the cockpit",
  "Backend-owned command execution remains required",
  "Explicit operator approval remains required",
] as const;

const EXPLICIT_SAFETY_LIMITS = [
  "Command Runner Safety v2 is preview-only from the frontend.",
  "It does not run commands from the UI.",
  "It does not spawn processes from the UI.",
  "It does not expose environment values.",
  "It does not persist evidence/results/audit from the UI.",
  "It does not release execution from the frontend.",
  "It prepares a future backend-owned guarded command path.",
  "Backend-owned guarded execution remains required for real command execution.",
  "Explicit operator approval remains required.",
] as const;

const ALLOWLIST_POLICY: CommandRunnerSafetyV2Section = {
  id: "allowlist-policy",
  label: "Allowlist",
  title: "allowlistPolicy",
  summary:
    "Allowlist policy v2 previews allowed command families, denied command families, review reasons, and backend-owned enforcement without making any allowlisted command executable from the UI.",
  state: "needs-approval",
  items: [
    {
      id: "allowlist-reviewed-command-family",
      label: "Reviewed command family",
      detail:
        "A future command candidate must match a named family, expected purpose, and explicit operator approval before backend-owned execution can be considered.",
      state: "review-only",
    },
    {
      id: "allowlist-denied-family",
      label: "Denied command family",
      detail:
        "Shell entry, destructive mutation, credential access, installs, deploys, port binding, runtime starts, and unknown families remain denied by policy.",
      state: "denied",
    },
    {
      id: "allowlist-backend-enforcement",
      label: "Backend-owned enforcement",
      detail:
        "Frontend review copy is not enforcement; future backend-owned command execution must enforce the allowlist again.",
      state: "backend-owned",
    },
  ],
};

const ARGUMENT_PARSER_GUARD: CommandRunnerSafetyV2Section = {
  id: "argument-parser-guard",
  label: "Arguments",
  title: "argumentParserGuard",
  summary:
    "Argument parser guard previews tokenization, unsafe flag denial, shell operator denial, chained command denial, redirection denial, traversal denial, encoded payload denial, and unknown argument denial.",
  state: "blocked",
  items: [
    {
      id: "argument-token-review",
      label: "Token review",
      detail:
        "Command text is previewed as command plus arguments so reviewers can see how flags, values, and positionals would be interpreted.",
      state: "review-only",
    },
    {
      id: "argument-unsafe-patterns",
      label: "Unsafe patterns",
      detail:
        "Unsafe flags, shell operators, chained commands, redirection, traversal, encoded payloads, and unknown arguments stay blocked.",
      state: "denied",
    },
    {
      id: "argument-no-run",
      label: "No parsed command run",
      detail: "Argument parsing is a preview contract and does not run parsed commands from the UI.",
      state: "blocked",
    },
  ],
};

const WORKING_DIRECTORY_GUARD: CommandRunnerSafetyV2Section = {
  id: "working-directory-guard",
  label: "Working Directory",
  title: "workingDirectoryGuard",
  summary:
    "Working directory guard previews workspace root containment, traversal denial, repository boundary checks, generated output path review, and manual review when a path cannot be proven safe.",
  state: "backend-owned",
  items: [
    {
      id: "working-directory-containment",
      label: "Workspace containment",
      detail:
        "A future backend guard must prove the command working directory stays inside the approved workspace and repository boundary.",
      state: "backend-owned",
    },
    {
      id: "working-directory-traversal",
      label: "Traversal denied",
      detail:
        "Traversal, parent escape, symlink ambiguity, unchecked generated output paths, and broad root paths move to denied or manual review.",
      state: "denied",
    },
    {
      id: "working-directory-no-change",
      label: "No UI directory changes",
      detail: "The frontend does not change directories and does not run commands from any working directory.",
      state: "blocked",
    },
  ],
};

const ENVIRONMENT_REDACTION_GUARD: CommandRunnerSafetyV2Section = {
  id: "environment-redaction-guard",
  label: "Environment",
  title: "environmentRedactionGuard",
  summary:
    "Environment redaction guard previews environment names only and blocks raw values, secrets, tokens, credentials, keys, and any environment value display from the frontend.",
  state: "denied",
  items: [
    {
      id: "environment-names-only",
      label: "Names only",
      detail:
        "Review surfaces may show environment variable names and sensitivity categories only; raw values are never shown.",
      state: "review-only",
    },
    {
      id: "environment-secret-block",
      label: "Secrets blocked",
      detail:
        "Secrets, tokens, credentials, keys, raw values, credential paths, and derived secret fragments remain blocked from UI display.",
      state: "denied",
    },
    {
      id: "environment-no-read",
      label: "No environment reads",
      detail: "Command environment redaction guard does not read or display environment values.",
      state: "blocked",
    },
  ],
};

const TIMEOUT_CANCELLATION_GUARD: CommandRunnerSafetyV2Section = {
  id: "timeout-cancellation-guard",
  label: "Timeout",
  title: "timeoutCancellationGuard",
  summary:
    "Timeout and cancellation guard previews maximum duration, manual stop behavior, cancellation boundaries, backend-owned process control, and operator review before any future command run.",
  state: "backend-owned",
  items: [
    {
      id: "timeout-limit",
      label: "Timeout limit",
      detail:
        "Future backend-owned execution must apply a fixed maximum duration and capture timeout as a normalized outcome.",
      state: "backend-owned",
    },
    {
      id: "cancel-boundary",
      label: "Cancel boundary",
      detail:
        "Cancel is a backend-owned process-control operation; the cockpit may preview the rule but cannot start or cancel processes.",
      state: "blocked",
    },
    {
      id: "manual-stop",
      label: "Manual stop",
      detail:
        "Manual stop requires explicit operator intent and backend-owned enforcement before a real process can be stopped.",
      state: "needs-approval",
    },
  ],
};

const STDOUT_STDERR_CAPTURE_CONTRACT: CommandRunnerSafetyV2Section = {
  id: "stdout-stderr-capture-contract",
  label: "Stdout",
  title: "stdoutStderrCaptureContract",
  summary:
    "Stdout stderr capture contract previews stdout, stderr, truncation, redaction, timestamps, exit code references, and evidence linkage without capturing live output from the UI.",
  state: "capture-contract",
  items: [
    {
      id: "stdout-contract",
      label: "Stdout contract",
      detail:
        "Stdout capture must include truncation limits, redaction, timestamps, and evidence references when future backend-owned execution exists.",
      state: "capture-contract",
    },
    {
      id: "stderr-contract",
      label: "Stderr contract",
      detail:
        "Stderr capture follows the same truncation, redaction, timestamp, and evidence linkage contract as stdout.",
      state: "capture-contract",
    },
    {
      id: "capture-no-live-output",
      label: "No live output",
      detail: "Stdout stderr capture contract does not capture live output from the UI.",
      state: "blocked",
    },
  ],
};

const EXIT_CODE_NORMALIZATION_CONTRACT: CommandRunnerSafetyV2Section = {
  id: "exit-code-normalization-contract",
  label: "Exit Code",
  title: "exitCodeNormalizationContract",
  summary:
    "Exit code normalization contract maps zero, nonzero, timeout, canceled, denied, blocked, failed, and manual-review outcomes into deterministic result states.",
  state: "normalized",
  items: [
    {
      id: "exit-zero-nonzero",
      label: "Zero and nonzero",
      detail:
        "Zero is normalized separately from nonzero so result decisions do not depend on ad hoc string parsing.",
      state: "normalized",
    },
    {
      id: "exit-special-outcomes",
      label: "Special outcomes",
      detail:
        "Timeout, canceled, denied, blocked, failed, and manual-review outcomes are first-class normalized states.",
      state: "normalized",
    },
    {
      id: "exit-no-command-run",
      label: "No command run",
      detail: "Exit code normalization contract does not run commands and requires backend-owned result capture.",
      state: "blocked",
    },
  ],
};

const SHELL_ESCALATION_DENIAL: CommandRunnerSafetyV2Section = {
  id: "shell-escalation-denial",
  label: "Shell escalation",
  title: "shellEscalationDenial",
  summary:
    "Shell escalation denial blocks chained shell operators, subshells, pipes, redirection, encoded execution, privilege escalation, and arbitrary shell entry.",
  state: "denied",
  items: [
    {
      id: "shell-operator-block",
      label: "Shell operators denied",
      detail:
        "Chained operators, pipes, redirects, subshells, shell entrypoints, encoded invocation, and expansion tricks remain denied.",
      state: "denied",
    },
    {
      id: "shell-privilege-block",
      label: "Privilege escalation denied",
      detail:
        "Privilege escalation, shell-based permission bypass, and arbitrary shell entry require denial rather than review-only approval.",
      state: "denied",
    },
    {
      id: "shell-no-ui",
      label: "No shell from UI",
      detail: "Shell escalation denial does not execute shell commands from the UI.",
      state: "blocked",
    },
  ],
};

const DANGEROUS_COMMAND_DENIAL: CommandRunnerSafetyV2Section = {
  id: "dangerous-command-denial",
  label: "Denied Commands",
  title: "dangerousCommandDenial",
  summary:
    "Dangerous command denial blocks destructive filesystem commands, credential access, network exfiltration, process killing, service control, registry mutation, and unsafe git operations.",
  state: "denied",
  items: [
    {
      id: "dangerous-filesystem",
      label: "Destructive commands denied",
      detail:
        "Destructive filesystem mutation, broad deletion, forced overwrite, recursive path mutation, and unsafe git operations stay blocked.",
      state: "denied",
    },
    {
      id: "dangerous-credential-network",
      label: "Credential and network denial",
      detail:
        "Credential access, secret reads, network exfiltration, service control, process killing, and registry mutation are denied command paths.",
      state: "denied",
    },
    {
      id: "dangerous-no-run",
      label: "Denied commands do not run",
      detail: "Dangerous command denial does not run denied commands.",
      state: "blocked",
    },
  ],
};

const INSTALL_DEPLOY_PORT_RUNTIME_DENIAL: CommandRunnerSafetyV2Section = {
  id: "install-deploy-port-runtime-denial",
  label: "Install deploy runtime",
  title: "installDeployPortRuntimeDenial",
  summary:
    "Install deploy port runtime denial blocks package installs, deploy commands, server starts, port binding, background processes, runtime launches, and daemonized tasks.",
  state: "denied",
  items: [
    {
      id: "install-deploy-denied",
      label: "Install and deploy denied",
      detail:
        "Package installs, deployment commands, scaffold expansion, and package manager mutation remain denied from the frontend.",
      state: "denied",
    },
    {
      id: "port-runtime-denied",
      label: "Ports and runtimes denied",
      detail:
        "Server starts, runtime launches, port binding, background processes, daemonized tasks, and local service starts remain denied.",
      state: "denied",
    },
    {
      id: "install-runtime-no-run",
      label: "No runtime execution",
      detail: "Install deploy port runtime denial does not install, deploy, bind ports, or start runtimes.",
      state: "blocked",
    },
  ],
};

const COMMAND_EVIDENCE_PACKET: CommandRunnerSafetyV2Section = {
  id: "command-evidence-packet",
  label: "Evidence",
  title: "commandEvidencePacket",
  summary:
    "Command evidence packet previews command text, allowlist decision, arguments, working directory, environment names, timeout, stdout, stderr, exit code, redaction, and audit references without persisting evidence from the UI.",
  state: "capture-contract",
  items: [
    {
      id: "evidence-fields",
      label: "Evidence fields",
      detail:
        "Command text, allowlist, arguments, working directory, environment names, timeout, stdout, stderr, exit code, redaction, and audit references are listed as future backend-owned evidence.",
      state: "capture-contract",
    },
    {
      id: "evidence-no-persist",
      label: "No UI evidence persistence",
      detail: "Command evidence packet does not persist evidence from the UI.",
      state: "blocked",
    },
    {
      id: "evidence-backend-owned",
      label: "Backend-owned evidence",
      detail: "Command evidence packet requires backend-owned evidence capture.",
      state: "backend-owned",
    },
  ],
};

const COMMAND_RESULT_PACKET: CommandRunnerSafetyV2Section = {
  id: "command-result-packet",
  label: "Result",
  title: "commandResultPacket",
  summary:
    "Command result packet previews success, blocked, denied, failed, timeout, canceled, manual-review, retryable, recovered, and operator-accepted command outcomes without persisting results from the UI.",
  state: "normalized",
  items: [
    {
      id: "result-outcomes",
      label: "Result outcomes",
      detail:
        "Success, blocked, denied, failed, timeout, canceled, manual-review, retryable, recovered, and operator-accepted outcomes are deterministic result states.",
      state: "normalized",
    },
    {
      id: "result-no-persist",
      label: "No UI result persistence",
      detail: "Command result packet does not persist results from the UI.",
      state: "blocked",
    },
    {
      id: "result-backend-owned",
      label: "Backend-owned result",
      detail: "Command result packet requires backend-owned result capture.",
      state: "backend-owned",
    },
  ],
};

const DENIED_COMMAND_BOUNDARIES: readonly CommandRunnerSafetyV2DeniedBoundary[] = [
  {
    id: "denied-direct-frontend-command",
    label: "Direct frontend command execution",
    detail: "Direct frontend command execution remains blocked.",
    state: "denied",
  },
  {
    id: "denied-process-spawn",
    label: "Process spawning",
    detail: "Direct frontend process spawning remains blocked.",
    state: "denied",
  },
  {
    id: "denied-shell-escalation",
    label: "Shell escalation",
    detail: "Shell escalation, chained commands, subshells, pipes, and redirection remain blocked.",
    state: "denied",
  },
  {
    id: "denied-env-values",
    label: "Environment values",
    detail: "Environment value display and secret reads remain blocked.",
    state: "denied",
  },
  {
    id: "denied-install-deploy-runtime",
    label: "Install deploy port runtime",
    detail: "Installs, deploys, port binding, runtime starts, and background processes remain blocked.",
    state: "denied",
  },
  {
    id: "denied-ui-persistence",
    label: "UI persistence",
    detail: "Approval, evidence, result, audit, queue, transaction, and browser storage persistence remain blocked.",
    state: "denied",
  },
];

const COCKPIT_SUMMARY: readonly CommandRunnerSafetyV2Item[] = [
  {
    id: "cockpit-command",
    label: "Command",
    detail: "Shows the future command candidate text for review only; the cockpit cannot run it.",
    state: "review-only",
  },
  {
    id: "cockpit-allowlist",
    label: "Allowlist",
    detail: "Explains why the command is allowlisted, denied, or moved to manual review.",
    state: "needs-approval",
  },
  {
    id: "cockpit-arguments",
    label: "Arguments",
    detail: "Shows how arguments are parsed and guarded against unsafe flags, shell operators, traversal, and unknown values.",
    state: "blocked",
  },
  {
    id: "cockpit-working-directory",
    label: "Working Directory",
    detail: "Constrains future command execution to approved workspace and repository boundaries.",
    state: "backend-owned",
  },
  {
    id: "cockpit-environment",
    label: "Environment",
    detail: "Shows environment names only because raw environment values, secrets, tokens, credentials, and keys remain redacted.",
    state: "denied",
  },
  {
    id: "cockpit-timeout",
    label: "Timeout",
    detail: "Previews duration limits and timeout outcomes for future backend-owned execution.",
    state: "backend-owned",
  },
  {
    id: "cockpit-cancel",
    label: "Cancel",
    detail: "Explains manual stop and cancellation boundaries without starting or stopping processes from the cockpit.",
    state: "blocked",
  },
  {
    id: "cockpit-stdout",
    label: "Stdout",
    detail: "Defines stdout capture with redaction, truncation, timestamps, and evidence linkage.",
    state: "capture-contract",
  },
  {
    id: "cockpit-stderr",
    label: "Stderr",
    detail: "Defines stderr capture with the same redaction, truncation, timestamps, and evidence linkage.",
    state: "capture-contract",
  },
  {
    id: "cockpit-exit-code",
    label: "Exit Code",
    detail: "Normalizes zero, nonzero, timeout, canceled, denied, blocked, failed, and manual-review outcomes.",
    state: "normalized",
  },
  {
    id: "cockpit-denied-commands",
    label: "Denied Commands",
    detail: "Keeps shell escalation, dangerous commands, installs, deploys, port binding, and runtime starts denied.",
    state: "denied",
  },
  {
    id: "cockpit-evidence",
    label: "Evidence",
    detail: "Previews the future command evidence packet without persisting evidence from the cockpit.",
    state: "capture-contract",
  },
  {
    id: "cockpit-result",
    label: "Result",
    detail: "Previews result states without persisting results or audit from the cockpit.",
    state: "normalized",
  },
];

const COMMAND_RUNNER_SAFETY_V2_MODEL: CommandRunnerSafetyV2Model = {
  commandSafetyId: "codexforge-command-runner-safety-v2-1498-1513",
  commandSafetyKind: "command-runner-safety-v2-preview",
  commandCandidateRef: "command-candidate-review-preview-1498",
  transactionRef: "apply-run-transaction-ref-preview-1497",
  queueItemRef: "backend-execution-queue-ref-preview-1481",
  allowlistPolicy: ALLOWLIST_POLICY,
  argumentParserGuard: ARGUMENT_PARSER_GUARD,
  workingDirectoryGuard: WORKING_DIRECTORY_GUARD,
  environmentRedactionGuard: ENVIRONMENT_REDACTION_GUARD,
  timeoutCancellationGuard: TIMEOUT_CANCELLATION_GUARD,
  stdoutStderrCaptureContract: STDOUT_STDERR_CAPTURE_CONTRACT,
  exitCodeNormalizationContract: EXIT_CODE_NORMALIZATION_CONTRACT,
  shellEscalationDenial: SHELL_ESCALATION_DENIAL,
  dangerousCommandDenial: DANGEROUS_COMMAND_DENIAL,
  installDeployPortRuntimeDenial: INSTALL_DEPLOY_PORT_RUNTIME_DENIAL,
  commandEvidencePacket: COMMAND_EVIDENCE_PACKET,
  commandResultPacket: COMMAND_RESULT_PACKET,
  deniedCommandBoundaries: DENIED_COMMAND_BOUNDARIES,
  cockpitSummary: COCKPIT_SUMMARY,
  explicitSafetyLimits: EXPLICIT_SAFETY_LIMITS,
};

const SECTION_LOOKUP: Record<string, CommandRunnerSafetyV2Section> = {
  allowlistPolicy: ALLOWLIST_POLICY,
  argumentParserGuard: ARGUMENT_PARSER_GUARD,
  workingDirectoryGuard: WORKING_DIRECTORY_GUARD,
  environmentRedactionGuard: ENVIRONMENT_REDACTION_GUARD,
  timeoutCancellationGuard: TIMEOUT_CANCELLATION_GUARD,
  stdoutStderrCaptureContract: STDOUT_STDERR_CAPTURE_CONTRACT,
  exitCodeNormalizationContract: EXIT_CODE_NORMALIZATION_CONTRACT,
  shellEscalationDenial: SHELL_ESCALATION_DENIAL,
  dangerousCommandDenial: DANGEROUS_COMMAND_DENIAL,
  installDeployPortRuntimeDenial: INSTALL_DEPLOY_PORT_RUNTIME_DENIAL,
  commandEvidencePacket: COMMAND_EVIDENCE_PACKET,
  commandResultPacket: COMMAND_RESULT_PACKET,
};

const ALL_SECTION_IDS = [
  "allowlistPolicy",
  "argumentParserGuard",
  "workingDirectoryGuard",
  "environmentRedactionGuard",
  "timeoutCancellationGuard",
  "stdoutStderrCaptureContract",
  "exitCodeNormalizationContract",
  "shellEscalationDenial",
  "dangerousCommandDenial",
  "installDeployPortRuntimeDenial",
  "commandEvidencePacket",
  "commandResultPacket",
] as const;

const ROUTES: readonly CommandRunnerSafetyV2RouteDefinition[] = [
  {
    slug: "codexforge-cockpit",
    href: "/codexforge-cockpit",
    phase: "Cockpit",
    title: "Command Runner Safety v2",
    commandLabel: "Go to Unified CodexForge Cockpit",
    summary:
      "Cockpit command safety summary keeps command review in the normal user cockpit while phase pages remain dev test diagnostics only.",
    markerPhrases: COMMAND_RUNNER_SAFETY_V2_COCKPIT_MARKERS,
    sectionIds: ALL_SECTION_IDS,
    devOnly: false,
  },
  {
    slug: "command-runner-safety-boundary",
    href: "/command-runner-safety-boundary",
    phase: "Phase 1498",
    title: "Command Runner Safety Boundary",
    commandLabel: "Go to Command Runner Safety Boundary",
    summary:
      "Defines the preview-only command safety boundary before any future backend-owned guarded command execution can exist.",
    markerPhrases: [
      "Command runner safety boundary",
      "Command runner safety boundary does not run commands from the UI",
      "Command runner safety requires explicit operator approval before execution",
      "Command runner safety prepares backend-owned guarded command execution without broad execution",
      "Denied command runner safety paths remain blocked",
      "Command runner safety checklist",
    ],
    sectionIds: ALL_SECTION_IDS,
    devOnly: true,
  },
  {
    slug: "command-allowlist-policy-v2",
    href: "/command-allowlist-policy-v2",
    phase: "Phase 1499",
    title: "Command Allowlist Policy v2",
    commandLabel: "Go to Command Allowlist Policy v2",
    summary:
      "Defines review-only allowed command families, denied command families, and backend-owned enforcement expectations.",
    markerPhrases: [
      "Command allowlist policy v2",
      "Command allowlist policy v2 does not execute allowlisted commands from the UI",
      "Command allowlist policy v2 requires explicit operator approval",
      "Command allowlist policy v2 defines review-only allowed command families denied command families and backend-owned enforcement",
      "Denied command allowlist paths remain blocked",
      "Command allowlist policy checklist",
    ],
    sectionIds: ["allowlistPolicy", "dangerousCommandDenial", "installDeployPortRuntimeDenial"],
    devOnly: true,
  },
  {
    slug: "command-argument-parser-guard",
    href: "/command-argument-parser-guard",
    phase: "Phase 1500",
    title: "Command Argument Parser Guard",
    commandLabel: "Go to Command Argument Parser Guard",
    summary:
      "Previews parsed command arguments and denied argument patterns without running parsed commands.",
    markerPhrases: [
      "Command argument parser guard",
      "Command argument parser guard does not run parsed commands",
      "Command argument parser guard requires explicit operator approval",
      "Command argument parser guard checks unsafe flags shell operators chained commands redirection traversal encoded payloads and unknown arguments",
      "Denied command argument paths remain blocked",
      "Command argument parser checklist",
    ],
    sectionIds: ["argumentParserGuard", "shellEscalationDenial", "dangerousCommandDenial"],
    devOnly: true,
  },
  {
    slug: "command-working-directory-guard",
    href: "/command-working-directory-guard",
    phase: "Phase 1501",
    title: "Command Working Directory Guard",
    commandLabel: "Go to Command Working Directory Guard",
    summary:
      "Previews workspace root containment, traversal denial, repository boundaries, and generated output path review.",
    markerPhrases: [
      "Command working directory guard",
      "Command working directory guard does not change directories or run commands from the UI",
      "Command working directory guard requires explicit operator approval",
      "Command working directory guard checks workspace root containment traversal denial repository boundary and generated output paths",
      "Denied command working directory paths remain blocked",
      "Command working directory checklist",
    ],
    sectionIds: ["workingDirectoryGuard", "argumentParserGuard", "dangerousCommandDenial"],
    devOnly: true,
  },
  {
    slug: "command-environment-redaction-guard",
    href: "/command-environment-redaction-guard",
    phase: "Phase 1502",
    title: "Command Environment Redaction Guard",
    commandLabel: "Go to Command Environment Redaction Guard",
    summary:
      "Previews environment names only and blocks secrets, tokens, credentials, keys, and raw values.",
    markerPhrases: [
      "Command environment redaction guard",
      "Command environment redaction guard does not read or display environment values",
      "Command environment redaction guard requires explicit operator approval",
      "Command environment redaction guard shows environment names only and blocks secrets tokens credentials keys and raw values",
      "Denied command environment paths remain blocked",
      "Command environment redaction checklist",
    ],
    sectionIds: ["environmentRedactionGuard", "commandEvidencePacket"],
    devOnly: true,
  },
  {
    slug: "command-timeout-cancellation-guard",
    href: "/command-timeout-cancellation-guard",
    phase: "Phase 1503",
    title: "Command Timeout Cancellation Guard",
    commandLabel: "Go to Command Timeout Cancellation Guard",
    summary:
      "Previews timeout limits, cancellation boundaries, manual stop, and backend-owned process control.",
    markerPhrases: [
      "Command timeout cancellation guard",
      "Command timeout cancellation guard does not start or cancel processes from the UI",
      "Command timeout cancellation guard requires explicit operator approval",
      "Command timeout cancellation guard previews timeout limits cancellation boundaries manual stop and backend-owned process control",
      "Denied command timeout cancellation paths remain blocked",
      "Command timeout cancellation checklist",
    ],
    sectionIds: ["timeoutCancellationGuard", "exitCodeNormalizationContract", "commandResultPacket"],
    devOnly: true,
  },
  {
    slug: "stdout-stderr-capture-contract",
    href: "/stdout-stderr-capture-contract",
    phase: "Phase 1504",
    title: "Stdout Stderr Capture Contract",
    commandLabel: "Go to Stdout Stderr Capture Contract",
    summary:
      "Defines stdout, stderr, truncation, redaction, timestamps, exit code references, and evidence linkage.",
    markerPhrases: [
      "Stdout stderr capture contract",
      "Stdout stderr capture contract does not capture live output from the UI",
      "Stdout stderr capture contract requires backend-owned command execution",
      "Stdout stderr capture contract defines stdout stderr truncation redaction timestamps exit code references and evidence linkage",
      "Denied stdout stderr capture paths remain blocked",
      "Stdout stderr capture checklist",
    ],
    sectionIds: ["stdoutStderrCaptureContract", "environmentRedactionGuard", "commandEvidencePacket"],
    devOnly: true,
  },
  {
    slug: "exit-code-normalization-contract",
    href: "/exit-code-normalization-contract",
    phase: "Phase 1505",
    title: "Exit Code Normalization Contract",
    commandLabel: "Go to Exit Code Normalization Contract",
    summary:
      "Maps backend-owned command results into deterministic zero, nonzero, timeout, canceled, denied, blocked, failed, and manual-review states.",
    markerPhrases: [
      "Exit code normalization contract",
      "Exit code normalization contract does not run commands",
      "Exit code normalization contract requires backend-owned result capture",
      "Exit code normalization contract maps zero nonzero timeout canceled denied blocked failed and manual-review outcomes",
      "Denied exit code normalization paths remain blocked",
      "Exit code normalization checklist",
    ],
    sectionIds: ["exitCodeNormalizationContract", "commandResultPacket"],
    devOnly: true,
  },
  {
    slug: "shell-escalation-denial",
    href: "/shell-escalation-denial",
    phase: "Phase 1506",
    title: "Shell Escalation Denial",
    commandLabel: "Go to Shell Escalation Denial",
    summary:
      "Blocks chained shell operators, subshells, pipes, redirection, encoded execution, privilege escalation, and arbitrary shell entry.",
    markerPhrases: [
      "Shell escalation denial",
      "Shell escalation denial does not execute shell commands from the UI",
      "Shell escalation denial requires explicit operator approval",
      "Shell escalation denial blocks chained shell operators subshells pipes redirection encoded execution privilege escalation and arbitrary shell entry",
      "Denied shell escalation paths remain blocked",
      "Shell escalation denial checklist",
    ],
    sectionIds: ["shellEscalationDenial", "argumentParserGuard", "dangerousCommandDenial"],
    devOnly: true,
  },
  {
    slug: "dangerous-command-denial",
    href: "/dangerous-command-denial",
    phase: "Phase 1507",
    title: "Dangerous Command Denial",
    commandLabel: "Go to Dangerous Command Denial",
    summary:
      "Blocks dangerous command families including destructive filesystem commands, credential access, network exfiltration, and unsafe git operations.",
    markerPhrases: [
      "Dangerous command denial",
      "Dangerous command denial does not run denied commands",
      "Dangerous command denial requires explicit operator approval",
      "Dangerous command denial blocks destructive filesystem commands credential access network exfiltration process killing service control registry mutation and unsafe git operations",
      "Denied dangerous command paths remain blocked",
      "Dangerous command denial checklist",
    ],
    sectionIds: ["dangerousCommandDenial", "shellEscalationDenial", "installDeployPortRuntimeDenial"],
    devOnly: true,
  },
  {
    slug: "install-deploy-port-runtime-denial",
    href: "/install-deploy-port-runtime-denial",
    phase: "Phase 1508",
    title: "Install Deploy Port Runtime Denial",
    commandLabel: "Go to Install Deploy Port Runtime Denial",
    summary:
      "Keeps installs, deploys, port binding, server starts, runtime launches, and background process paths denied.",
    markerPhrases: [
      "Install deploy port runtime denial",
      "Install deploy port runtime denial does not install deploy bind ports or start runtimes",
      "Install deploy port runtime denial requires explicit operator approval",
      "Install deploy port runtime denial blocks package installs deploy commands server starts port binding background processes runtime launches and daemonized tasks",
      "Denied install deploy port runtime paths remain blocked",
      "Install deploy port runtime checklist",
    ],
    sectionIds: ["installDeployPortRuntimeDenial", "dangerousCommandDenial", "timeoutCancellationGuard"],
    devOnly: true,
  },
  {
    slug: "command-evidence-packet",
    href: "/command-evidence-packet",
    phase: "Phase 1509",
    title: "Command Evidence Packet",
    commandLabel: "Go to Command Evidence Packet",
    summary:
      "Previews the command evidence packet fields and backend-owned evidence capture requirement.",
    markerPhrases: [
      "Command evidence packet",
      "Command evidence packet does not persist evidence from the UI",
      "Command evidence packet requires backend-owned evidence capture",
      "Command evidence packet previews command text allowlist arguments working directory environment names timeout stdout stderr exit code redaction and audit references",
      "Denied command evidence paths remain blocked",
      "Command evidence checklist",
    ],
    sectionIds: ["commandEvidencePacket", "stdoutStderrCaptureContract", "environmentRedactionGuard"],
    devOnly: true,
  },
  {
    slug: "command-result-packet",
    href: "/command-result-packet",
    phase: "Phase 1510",
    title: "Command Result Packet",
    commandLabel: "Go to Command Result Packet",
    summary:
      "Previews result states and backend-owned result capture requirements without persisting results from the UI.",
    markerPhrases: [
      "Command result packet",
      "Command result packet does not persist results from the UI",
      "Command result packet requires backend-owned result capture",
      "Command result packet previews success blocked denied failed timeout canceled manual-review retryable recovered and operator-accepted command outcomes",
      "Denied command result paths remain blocked",
      "Command result checklist",
    ],
    sectionIds: ["commandResultPacket", "exitCodeNormalizationContract", "commandEvidencePacket"],
    devOnly: true,
  },
  {
    slug: "cockpit-command-safety-summary",
    href: "/cockpit-command-safety-summary",
    phase: "Phase 1511",
    title: "Cockpit Command Safety Summary",
    commandLabel: "Go to Cockpit Command Safety Summary",
    summary:
      "Keeps command safety review centered in the cockpit while phase pages remain dev test diagnostics only.",
    markerPhrases: [
      "Cockpit command safety summary",
      "Cockpit command safety summary keeps the cockpit as the normal user surface",
      "Cockpit command safety summary does not run commands from the cockpit",
      "Cockpit command safety summary shows command allowlist arguments working directory environment timeout cancel stdout stderr exit code denied commands evidence and result",
      "Phase pages remain dev test diagnostics only",
      "Cockpit command safety checklist",
    ],
    sectionIds: ALL_SECTION_IDS,
    devOnly: true,
  },
  {
    slug: "first-command-runner-safety-v2-candidate",
    href: "/first-command-runner-safety-v2-candidate",
    phase: "Phase 1512",
    title: "First Command Runner Safety v2 Candidate",
    commandLabel: "Go to First Command Runner Safety v2 Candidate",
    summary:
      "Combines the first command runner safety v2 candidate across allowlist, argument, working directory, environment, timeout, output, exit, denial, evidence, and result contracts.",
    markerPhrases: [
      "First command runner safety v2 candidate",
      "First command runner safety v2 candidate does not execute commands from the UI",
      "First command runner safety v2 candidate requires explicit operator approval",
      "Candidate combines allowlist argument guard working directory guard environment redaction timeout cancellation output capture exit normalization denial evidence and result",
      "Denied first command runner safety paths remain blocked",
      "First command runner safety checklist",
    ],
    sectionIds: ALL_SECTION_IDS,
    devOnly: true,
  },
  {
    slug: "controlled-command-runner-safety-v2-release-candidate",
    href: "/controlled-command-runner-safety-v2-release-candidate",
    phase: "Phase 1513",
    title: "Controlled Command Runner Safety v2 Release Candidate",
    commandLabel: "Go to Controlled Command Runner Safety v2 Release Candidate",
    summary:
      "Controlled command runner safety v2 release candidate prepares backend-owned guarded command execution without frontend command execution.",
    markerPhrases: [
      "Controlled command runner safety v2 release candidate",
      "Controlled command runner safety v2 release candidate does not call models providers connectors write files apply diffs run commands create snapshots persist approvals create queues persist transactions persist evidence results audit promote memory release locks execute rollback retry recovery spawn processes bind ports install deploy start runtimes or write browser storage from the frontend",
      "Controlled command runner safety v2 release requires explicit operator approval",
      "Release candidate prepares CodexForge for backend-owned guarded command execution without frontend command execution",
      "Denied controlled command runner safety paths remain blocked",
      "Controlled command runner safety release checklist",
    ],
    sectionIds: ALL_SECTION_IDS,
    devOnly: true,
  },
];

export function listCommandRunnerSafetyV2RouteDefinitions(): readonly CommandRunnerSafetyV2RouteDefinition[] {
  return ROUTES;
}

export function getCommandRunnerSafetyV2RouteDefinition(
  slug: CommandRunnerSafetyV2RouteSlug
): CommandRunnerSafetyV2RouteDefinition {
  const route = ROUTES.find((candidate) => candidate.slug === slug);
  if (!route) return ROUTES[0];
  return route;
}

export function buildCommandRunnerSafetyV2RouteModel(
  slug: CommandRunnerSafetyV2RouteSlug = "codexforge-cockpit"
): CommandRunnerSafetyV2RouteModel {
  const route = getCommandRunnerSafetyV2RouteDefinition(slug);
  const sections = route.sectionIds.map((sectionId) => SECTION_LOOKUP[sectionId]).filter(Boolean);

  return {
    route,
    commandSafety: COMMAND_RUNNER_SAFETY_V2_MODEL,
    sections,
    diagnosticRoutes: ROUTES.filter((candidate) => candidate.devOnly),
    cockpitMarkers: COMMAND_RUNNER_SAFETY_V2_COCKPIT_MARKERS,
    summary: summarizeCommandRunnerSafetyV2Route(route, sections),
  };
}

export function buildCommandRunnerSafetyV2Model(): CommandRunnerSafetyV2RouteModel {
  return buildCommandRunnerSafetyV2RouteModel("codexforge-cockpit");
}

export function summarizeCommandRunnerSafetyV2Route(
  route: CommandRunnerSafetyV2RouteDefinition,
  sections: readonly CommandRunnerSafetyV2Section[]
): string {
  return `${route.title} keeps ${sections.length} command safety sections static, deterministic, preview-only, review-only, backend-owned, and blocked from frontend command execution.`;
}

export function buildCommandRunnerSafetyV2StableKey(parts: readonly string[]): string {
  return parts.join("__");
}
