export type EndToEndBuildFixWorkflowRouteSlug =
  | "codexforge-cockpit"
  | "end-to-end-build-fix-workflow-boundary"
  | "build-fix-goal-intake-packet"
  | "build-fix-project-context-packet"
  | "build-fix-plan-summary-packet"
  | "build-fix-file-diff-packet"
  | "build-fix-command-preview-packet"
  | "build-fix-risk-review-packet"
  | "build-fix-approval-ticket-packet"
  | "build-fix-apply-hold-packet"
  | "build-fix-command-hold-packet"
  | "build-fix-evidence-packet"
  | "build-fix-result-decision-packet"
  | "build-fix-recovery-packet"
  | "build-fix-audit-timeline-packet"
  | "first-end-to-end-build-fix-candidate"
  | "controlled-end-to-end-build-fix-workflow-release-candidate";

export type EndToEndBuildFixWorkflowPanelState = "blocked" | "preview-only" | "approval-required" | "dev-test-only";

export type EndToEndBuildFixWorkflowChecklistItem = {
  id: string;
  label: string;
  detail: string;
  state: EndToEndBuildFixWorkflowPanelState;
};

export type EndToEndBuildFixWorkflowSurface = {
  id: string;
  title: string;
  eyebrow: string;
  state: EndToEndBuildFixWorkflowPanelState;
  body: string;
  checklist: readonly EndToEndBuildFixWorkflowChecklistItem[];
  placeholders: readonly string[];
};

export type EndToEndBuildFixWorkflowRouteDefinition = {
  slug: EndToEndBuildFixWorkflowRouteSlug;
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

export type EndToEndBuildFixWorkflowRouteModel = {
  route: EndToEndBuildFixWorkflowRouteDefinition;
  surfaces: readonly EndToEndBuildFixWorkflowSurface[];
  globalSafetyCopy: readonly string[];
  targetFamilies: readonly string[];
  resultStates: readonly string[];
  recoveryOptions: readonly string[];
  timelineStages: readonly string[];
  summary: string;
};

export const FIRST_END_TO_END_BUILD_FIX_WORKFLOW_COCKPIT_LANGUAGE = [
  "First end-to-end build fix workflow",
  "Build fix goal intake packet",
  "Build fix project context packet",
  "Build fix plan summary packet",
  "Build fix file diff packet",
  "Build fix command preview packet",
  "Build fix risk review packet",
  "Build fix approval ticket packet",
  "Build fix apply hold packet",
  "Build fix command hold packet",
  "Build fix evidence packet",
  "Build fix result decision packet",
  "Build fix recovery packet",
  "Build fix audit timeline packet",
  "No real file mutation from the cockpit",
  "No real command execution from the cockpit",
].join(" | ");

const GLOBAL_SAFETY_COPY = [
  "Phase pages are dev/test surfaces only.",
  "Normal users should work from the cockpit.",
  "The first end-to-end build fix workflow is preview-only in this batch.",
  "File writes remain blocked until explicit operator approval.",
  "Commands remain blocked until explicit operator approval.",
  "No real file mutation from the cockpit.",
  "No real command execution from the cockpit.",
  "No provider/model/connector/runtime execution occurs from this cockpit in this batch.",
  "No real mutation occurs from this cockpit in this batch.",
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

const RESULT_STATES = ["accept", "retry", "rollback", "explain", "manual review", "success", "denied", "blocked", "failed", "timeout", "needs-review"] as const;

const RECOVERY_OPTIONS = ["rollback", "retry", "stop", "restore", "explain failure", "manual review"] as const;

const TIMELINE_STAGES = [
  "operator goal",
  "project context",
  "plan summary",
  "file diff preview",
  "command preview",
  "risk review",
  "approval ticket",
  "apply hold",
  "command hold",
  "evidence preview",
  "result decision",
  "recovery options",
  "audit timeline",
  "operator signoff",
  "release candidate",
] as const;

const SURFACES: readonly EndToEndBuildFixWorkflowSurface[] = [
  {
    id: "goal-intake",
    title: "Build fix goal intake packet",
    eyebrow: "Goal",
    state: "preview-only",
    body: "Static goal intake accepts build-anything repair goals without sending prompts, calling models, selecting providers, or creating queue jobs.",
    checklist: [
      {
        id: "goal-intake-broad-targets",
        label: "Broad target families",
        detail: "Apps, websites, dashboards, games, tools, research, automation, creative, trading, data, documentation, integrations, and local projects are all represented.",
        state: "preview-only",
      },
      {
        id: "goal-intake-model-routing-blocked",
        label: "Model routing blocked",
        detail: "Future model routing requires explicit operator approval before any prompt leaves the cockpit.",
        state: "blocked",
      },
    ],
    placeholders: ["operator goal placeholder", "target family placeholder", "acceptance criteria placeholder"],
  },
  {
    id: "project-context",
    title: "Build fix project context packet",
    eyebrow: "Context",
    state: "preview-only",
    body: "Project context is a bounded summary placeholder; it does not browse arbitrary files, index workspaces, read secrets, or inspect environment values.",
    checklist: [
      {
        id: "project-context-bounded",
        label: "Bounded workspace summary",
        detail: "The preview names workspace, route family, relevant files, and constraints as static review copy only.",
        state: "preview-only",
      },
      {
        id: "project-context-secrets-blocked",
        label: "Secrets withheld",
        detail: "Credential reads, environment values, browser storage, arbitrary traversal, and live indexing stay blocked.",
        state: "blocked",
      },
    ],
    placeholders: ["workspace placeholder", "route family placeholder", "bounded file list placeholder"],
  },
  {
    id: "plan-summary",
    title: "Build fix plan summary packet",
    eyebrow: "Plan",
    state: "approval-required",
    body: "Plan summary connects goal, context, diff, command, risk, evidence, result, recovery, and audit without executing any step.",
    checklist: [
      {
        id: "plan-summary-end-to-end",
        label: "End-to-end sequence",
        detail: "Every workflow stage appears as deterministic review data before any future execution request.",
        state: "preview-only",
      },
      {
        id: "plan-summary-execution-blocked",
        label: "Execution blocked",
        detail: "No file writer, command runner, provider, connector, adapter, runtime, dry-run, or recovery path is released.",
        state: "blocked",
      },
    ],
    placeholders: ["step list placeholder", "dependency placeholder", "validation preview placeholder"],
  },
  {
    id: "file-diff",
    title: "Build fix file diff packet",
    eyebrow: "Diff",
    state: "blocked",
    body: "File diff packet shows path guard, before preview, after preview, diff preview, and rollback preview without writing files or applying patches.",
    checklist: [
      {
        id: "file-diff-path-guard",
        label: "Path guard visible",
        detail: "The target path is a preview-only review value and cannot mutate the local workspace.",
        state: "blocked",
      },
      {
        id: "file-diff-rollback-preview",
        label: "Rollback preview visible",
        detail: "Rollback remains a future recovery contract and cannot execute from this UI.",
        state: "preview-only",
      },
    ],
    placeholders: ["path guard placeholder", "before placeholder", "after placeholder", "diff placeholder", "rollback placeholder"],
  },
  {
    id: "command-preview",
    title: "Build fix command preview packet",
    eyebrow: "Command",
    state: "blocked",
    body: "Command preview shows allowlist, arguments, working directory, environment names, evidence readiness, result readiness, and recovery readiness without running commands.",
    checklist: [
      {
        id: "command-preview-allowlist",
        label: "Allowlist preview",
        detail: "The command is metadata only and cannot start a shell, build, test, smoke, git, runtime, or server process.",
        state: "blocked",
      },
      {
        id: "command-preview-environment",
        label: "Environment values withheld",
        detail: "Only environment names can be represented; values, secrets, tokens, and credentials remain unread.",
        state: "blocked",
      },
    ],
    placeholders: ["command placeholder", "argument placeholder", "working directory placeholder", "environment name placeholder"],
  },
  {
    id: "risk-review",
    title: "Build fix risk review packet",
    eyebrow: "Risk",
    state: "approval-required",
    body: "Risk review explains denied file mutation, command execution, secrets traversal, install, deploy, runtime, adapter, provider, connector, and model paths.",
    checklist: [
      {
        id: "risk-review-denied-paths",
        label: "Denied paths visible",
        detail: "File writes, commands, shell, git, tests, builds, smokes, installs, deploys, runtimes, adapters, providers, connectors, and models remain blocked.",
        state: "blocked",
      },
      {
        id: "risk-review-approval-required",
        label: "Approval required",
        detail: "Future action requires explicit operator approval plus guards, evidence, result, audit, and recovery contracts.",
        state: "approval-required",
      },
    ],
    placeholders: ["file mutation risk", "command risk", "secret traversal risk", "adapter risk", "provider risk"],
  },
  {
    id: "approval-ticket",
    title: "Build fix approval ticket packet",
    eyebrow: "Approval",
    state: "approval-required",
    body: "Approval ticket is a non-persistent human gate preview and cannot approve actions, create queues, release locks, or persist decisions.",
    checklist: [
      {
        id: "approval-ticket-human",
        label: "Human approval required",
        detail: "Future file writes, commands, evidence persistence, result persistence, recovery, and audit require explicit operator approval.",
        state: "approval-required",
      },
      {
        id: "approval-ticket-no-persistence",
        label: "No approval persistence",
        detail: "The preview does not save approval state, queue state, operator signoff, result decisions, audit logs, or memory.",
        state: "blocked",
      },
    ],
    placeholders: ["ticket placeholder", "operator placeholder", "approval state placeholder"],
  },
  {
    id: "apply-hold",
    title: "Build fix apply hold packet",
    eyebrow: "Apply hold",
    state: "blocked",
    body: "Apply hold keeps diff apply and file mutation blocked while the operator reviews the proposed change.",
    checklist: [
      {
        id: "apply-hold-no-write",
        label: "File mutation blocked",
        detail: "No file writer, patch applier, scaffold, export, rollback, retry, or restore action is released.",
        state: "blocked",
      },
      {
        id: "apply-hold-approval",
        label: "Approval still required",
        detail: "Future apply requires explicit approval, path guard, diff preview, evidence capture, result capture, audit, and rollback contract.",
        state: "approval-required",
      },
    ],
    placeholders: ["apply hold placeholder", "mutation blocked placeholder", "operator approval placeholder"],
  },
  {
    id: "command-hold",
    title: "Build fix command hold packet",
    eyebrow: "Command hold",
    state: "blocked",
    body: "Command hold keeps build, test, smoke, git, runtime, server, shell, and adapter execution blocked.",
    checklist: [
      {
        id: "command-hold-no-run",
        label: "Command execution blocked",
        detail: "No process spawning, port binding, runtime start, command runner, shell, git, test, build, smoke, or server start occurs.",
        state: "blocked",
      },
      {
        id: "command-hold-approval",
        label: "Approval still required",
        detail: "Future execution requires approval, allowlist, argument guard, working-directory guard, environment guard, evidence, result, and recovery.",
        state: "approval-required",
      },
    ],
    placeholders: ["command hold placeholder", "execution blocked placeholder", "allowlist placeholder"],
  },
  {
    id: "evidence",
    title: "Build fix evidence packet",
    eyebrow: "Evidence",
    state: "preview-only",
    body: "Evidence packet shows diff, command, stdout, stderr, exit code, approval, operator, timestamp, and audit placeholders without persisting evidence.",
    checklist: [
      {
        id: "evidence-placeholders",
        label: "Output placeholders only",
        detail: "stdout, stderr, exit code, timestamp, and operator labels are future capture fields, not runtime output.",
        state: "preview-only",
      },
      {
        id: "evidence-no-store",
        label: "Evidence persistence blocked",
        detail: "No evidence record, export, audit log, result record, queue item, or memory update is written.",
        state: "blocked",
      },
    ],
    placeholders: ["diff evidence placeholder", "stdout placeholder", "stderr placeholder", "exit code placeholder", "timestamp placeholder"],
  },
  {
    id: "result-decision",
    title: "Build fix result decision packet",
    eyebrow: "Decision",
    state: "approval-required",
    body: "Result decision shows accept, retry, rollback, explain, manual review, success, denied, blocked, failed, timeout, and needs-review states without persisting decisions.",
    checklist: [
      {
        id: "result-decision-states",
        label: "Decision states visible",
        detail: "All decision states are deterministic preview copy and cannot trigger automatic actions.",
        state: "preview-only",
      },
      {
        id: "result-decision-no-store",
        label: "Result persistence blocked",
        detail: "No result store, audit entry, approval update, queue transition, memory promotion, retry, rollback, or recovery action is triggered.",
        state: "blocked",
      },
    ],
    placeholders: ["accept placeholder", "retry placeholder", "rollback placeholder", "explain placeholder", "needs-review placeholder"],
  },
  {
    id: "recovery",
    title: "Build fix recovery packet",
    eyebrow: "Recovery",
    state: "blocked",
    body: "Recovery packet shows rollback, retry, stop, restore, explain failure, and manual review options as blocked previews.",
    checklist: [
      {
        id: "recovery-options-visible",
        label: "Recovery options visible",
        detail: "Rollback, retry, stop, restore, explain failure, and manual review are labels only.",
        state: "preview-only",
      },
      {
        id: "recovery-execution-blocked",
        label: "Recovery execution blocked",
        detail: "No rollback, retry, restore, recovery, command, file mutation, adapter execution, export, or queue transition is released.",
        state: "blocked",
      },
    ],
    placeholders: ["rollback placeholder", "retry placeholder", "stop placeholder", "restore placeholder", "manual review placeholder"],
  },
  {
    id: "audit-timeline",
    title: "Build fix audit timeline packet",
    eyebrow: "Audit",
    state: "preview-only",
    body: "Audit timeline shows goal, context, plan, diff, command, risk, approval, evidence, result, recovery, and operator placeholders without persisting audit logs.",
    checklist: [
      {
        id: "audit-timeline-stages",
        label: "Timeline placeholders visible",
        detail: "The run timeline links every build/fix stage in one deterministic cockpit flow.",
        state: "preview-only",
      },
      {
        id: "audit-timeline-no-store",
        label: "Audit persistence blocked",
        detail: "No audit log, approval decision, evidence record, result record, queue record, export, or memory update is written.",
        state: "blocked",
      },
    ],
    placeholders: ["goal audit placeholder", "context audit placeholder", "operator placeholder", "signoff placeholder"],
  },
  {
    id: "operator-signoff",
    title: "Operator signoff and release candidate",
    eyebrow: "Signoff",
    state: "approval-required",
    body: "Operator signoff and release-candidate status remain marker language only; they do not approve, persist, execute, release, deploy, or promote memory.",
    checklist: [
      {
        id: "operator-signoff-human",
        label: "Human signoff required",
        detail: "Future release movement requires explicit operator approval and backend-owned safety contracts.",
        state: "approval-required",
      },
      {
        id: "operator-signoff-no-release",
        label: "No automatic release",
        detail: "The preview cannot create jobs, write exports, apply diffs, run commands, deploy, or mark live execution as ready.",
        state: "blocked",
      },
    ],
    placeholders: ["signoff placeholder", "release candidate placeholder", "go/no-go placeholder"],
  },
] as const;

const ALL_SURFACE_IDS = SURFACES.map((surface) => surface.id);

const ROUTES: readonly EndToEndBuildFixWorkflowRouteDefinition[] = [
  {
    slug: "codexforge-cockpit",
    href: "/codexforge-cockpit",
    phase: "Cockpit",
    title: "First end-to-end build fix workflow",
    commandLabel: "Go to Unified CodexForge Cockpit",
    summary: "Cockpit preview for the first end-to-end build/fix workflow keeps operator goal, context, plan, diff, command, risk, approval, holds, evidence, result, recovery, audit, signoff, and release candidate status in one place.",
    markerPhrases: [
      "First end-to-end build fix workflow",
      "Build fix goal intake packet",
      "Build fix project context packet",
      "Build fix plan summary packet",
      "Build fix file diff packet",
      "Build fix command preview packet",
      "Build fix risk review packet",
      "Build fix approval ticket packet",
      "Build fix apply hold packet",
      "Build fix command hold packet",
      "Build fix evidence packet",
      "Build fix result decision packet",
      "Build fix recovery packet",
      "Build fix audit timeline packet",
      "No real file mutation from the cockpit",
      "No real command execution from the cockpit",
    ],
    deniedCopy: "Denied first end-to-end build fix workflow paths remain blocked from prompt sending, model calls, provider calls, connector calls, file mutation, command execution, shell/git/test/build/smoke execution, runtime starts, process spawning, port binding, evidence persistence, result persistence, audit persistence, export writing, recovery, rollback, retry, queue creation, hidden approval, and automatic memory promotion.",
    approvalCopy: "Future end-to-end build/fix workflows require explicit operator approval, file-write path guard, diff preview, command allowlist, command guards, evidence capture, result capture, audit, and recovery contract.",
    surfaceIds: ALL_SURFACE_IDS,
    devOnly: false,
  },
  {
    slug: "end-to-end-build-fix-workflow-boundary",
    href: "/end-to-end-build-fix-workflow-boundary",
    phase: "Phase 1242",
    title: "End-to-end build fix workflow boundary",
    commandLabel: "Go to End to End Build Fix Workflow Boundary",
    summary: "Workflow unifies goal context plan diff command risk approval evidence result recovery and audit.",
    markerPhrases: [
      "End-to-end build fix workflow boundary",
      "End-to-end build fix workflow boundary does not call models write files or run commands",
      "End-to-end build fix workflow requires explicit operator approval",
      "Workflow unifies goal context plan diff command risk approval evidence result recovery and audit",
      "Denied end-to-end build fix workflow paths remain blocked",
      "End-to-end build fix workflow checklist",
    ],
    deniedCopy: "Denied end-to-end build fix workflow paths remain blocked.",
    approvalCopy: "End-to-end build fix workflow requires explicit operator approval.",
    surfaceIds: ["goal-intake", "project-context", "plan-summary", "file-diff", "command-preview", "risk-review", "approval-ticket"],
    devOnly: true,
  },
  {
    slug: "build-fix-goal-intake-packet",
    href: "/build-fix-goal-intake-packet",
    phase: "Phase 1243",
    title: "Build fix goal intake packet",
    commandLabel: "Go to Build Fix Goal Intake Packet",
    summary: "Goal intake supports apps websites dashboards games tools research workflows data integrations and general local projects.",
    markerPhrases: [
      "Build fix goal intake packet",
      "Build fix goal intake packet does not send prompts or call models",
      "Build fix goal intake requires explicit operator approval before future model routing",
      "Goal intake supports apps websites dashboards games tools research workflows data integrations and general local projects",
      "Denied build fix goal intake paths remain blocked",
      "Build fix goal intake checklist",
    ],
    deniedCopy: "Denied build fix goal intake paths remain blocked.",
    approvalCopy: "Build fix goal intake requires explicit operator approval before future model routing.",
    surfaceIds: ["goal-intake", "approval-ticket", "risk-review"],
    devOnly: true,
  },
  {
    slug: "build-fix-project-context-packet",
    href: "/build-fix-project-context-packet",
    phase: "Phase 1244",
    title: "Build fix project context packet",
    commandLabel: "Go to Build Fix Project Context Packet",
    summary: "Project context shows bounded workspace summary without reading secrets.",
    markerPhrases: [
      "Build fix project context packet",
      "Build fix project context packet does not browse arbitrary files",
      "Build fix project context requires explicit operator approval before future indexing",
      "Project context shows bounded workspace summary without reading secrets",
      "Denied build fix project context paths remain blocked",
      "Build fix project context checklist",
    ],
    deniedCopy: "Denied build fix project context paths remain blocked.",
    approvalCopy: "Build fix project context requires explicit operator approval before future indexing.",
    surfaceIds: ["project-context", "risk-review", "audit-timeline"],
    devOnly: true,
  },
  {
    slug: "build-fix-plan-summary-packet",
    href: "/build-fix-plan-summary-packet",
    phase: "Phase 1245",
    title: "Build fix plan summary packet",
    commandLabel: "Go to Build Fix Plan Summary Packet",
    summary: "Plan summary shows file diff command preview risk evidence result and recovery steps.",
    markerPhrases: [
      "Build fix plan summary packet",
      "Build fix plan summary packet does not execute plans",
      "Build fix plan summary requires explicit operator approval before future execution",
      "Plan summary shows file diff command preview risk evidence result and recovery steps",
      "Denied build fix plan paths remain blocked",
      "Build fix plan summary checklist",
    ],
    deniedCopy: "Denied build fix plan paths remain blocked.",
    approvalCopy: "Build fix plan summary requires explicit operator approval before future execution.",
    surfaceIds: ["plan-summary", "file-diff", "command-preview", "risk-review", "evidence", "result-decision", "recovery"],
    devOnly: true,
  },
  {
    slug: "build-fix-file-diff-packet",
    href: "/build-fix-file-diff-packet",
    phase: "Phase 1246",
    title: "Build fix file diff packet",
    commandLabel: "Go to Build Fix File Diff Packet",
    summary: "File diff packet shows path guard before after diff and rollback preview.",
    markerPhrases: [
      "Build fix file diff packet",
      "Build fix file diff packet does not write files",
      "Build fix file diff requires explicit operator approval before future apply",
      "File diff packet shows path guard before after diff and rollback preview",
      "Denied build fix file diff paths remain blocked",
      "Build fix file diff checklist",
    ],
    deniedCopy: "Denied build fix file diff paths remain blocked.",
    approvalCopy: "Build fix file diff requires explicit operator approval before future apply.",
    surfaceIds: ["file-diff", "apply-hold", "recovery", "risk-review"],
    devOnly: true,
  },
  {
    slug: "build-fix-command-preview-packet",
    href: "/build-fix-command-preview-packet",
    phase: "Phase 1247",
    title: "Build fix command preview packet",
    commandLabel: "Go to Build Fix Command Preview Packet",
    summary: "Command preview packet shows allowlist arguments working directory environment evidence result and recovery readiness.",
    markerPhrases: [
      "Build fix command preview packet",
      "Build fix command preview packet does not run commands",
      "Build fix command preview requires explicit operator approval before future execution",
      "Command preview packet shows allowlist arguments working directory environment evidence result and recovery readiness",
      "Denied build fix command preview paths remain blocked",
      "Build fix command preview checklist",
    ],
    deniedCopy: "Denied build fix command preview paths remain blocked.",
    approvalCopy: "Build fix command preview requires explicit operator approval before future execution.",
    surfaceIds: ["command-preview", "command-hold", "evidence", "result-decision", "recovery", "risk-review"],
    devOnly: true,
  },
  {
    slug: "build-fix-risk-review-packet",
    href: "/build-fix-risk-review-packet",
    phase: "Phase 1248",
    title: "Build fix risk review packet",
    commandLabel: "Go to Build Fix Risk Review Packet",
    summary: "Risk review explains file mutation command execution secrets traversal install deploy runtime adapter provider connector and model risks.",
    markerPhrases: [
      "Build fix risk review packet",
      "Build fix risk review packet does not approve or execute actions",
      "Build fix risk review requires explicit operator approval",
      "Risk review explains file mutation command execution secrets traversal install deploy runtime adapter provider connector and model risks",
      "Denied build fix risk paths remain blocked",
      "Build fix risk review checklist",
    ],
    deniedCopy: "Denied build fix risk paths remain blocked.",
    approvalCopy: "Build fix risk review requires explicit operator approval.",
    surfaceIds: ["risk-review", "file-diff", "command-preview", "approval-ticket"],
    devOnly: true,
  },
  {
    slug: "build-fix-approval-ticket-packet",
    href: "/build-fix-approval-ticket-packet",
    phase: "Phase 1249",
    title: "Build fix approval ticket packet",
    commandLabel: "Go to Build Fix Approval Ticket Packet",
    summary: "Approval ticket keeps file writes commands evidence persistence result persistence recovery and audit blocked.",
    markerPhrases: [
      "Build fix approval ticket packet",
      "Build fix approval ticket packet does not approve actions",
      "Build fix approval ticket requires explicit human approval",
      "Approval ticket keeps file writes commands evidence persistence result persistence recovery and audit blocked",
      "Denied build fix approval paths remain blocked",
      "Build fix approval ticket checklist",
    ],
    deniedCopy: "Denied build fix approval paths remain blocked.",
    approvalCopy: "Build fix approval ticket requires explicit human approval.",
    surfaceIds: ["approval-ticket", "apply-hold", "command-hold", "evidence", "result-decision", "recovery", "audit-timeline"],
    devOnly: true,
  },
  {
    slug: "build-fix-apply-hold-packet",
    href: "/build-fix-apply-hold-packet",
    phase: "Phase 1250",
    title: "Build fix apply hold packet",
    commandLabel: "Go to Build Fix Apply Hold Packet",
    summary: "Apply hold keeps diff apply and file mutation blocked.",
    markerPhrases: [
      "Build fix apply hold packet",
      "Build fix apply hold packet does not write files",
      "Build fix apply hold requires explicit operator approval",
      "Apply hold keeps diff apply and file mutation blocked",
      "Denied build fix apply paths remain blocked",
      "Build fix apply hold checklist",
    ],
    deniedCopy: "Denied build fix apply paths remain blocked.",
    approvalCopy: "Build fix apply hold requires explicit operator approval.",
    surfaceIds: ["apply-hold", "file-diff", "approval-ticket", "risk-review"],
    devOnly: true,
  },
  {
    slug: "build-fix-command-hold-packet",
    href: "/build-fix-command-hold-packet",
    phase: "Phase 1251",
    title: "Build fix command hold packet",
    commandLabel: "Go to Build Fix Command Hold Packet",
    summary: "Command hold keeps build test smoke git runtime and shell execution blocked.",
    markerPhrases: [
      "Build fix command hold packet",
      "Build fix command hold packet does not run commands",
      "Build fix command hold requires explicit operator approval",
      "Command hold keeps build test smoke git runtime and shell execution blocked",
      "Denied build fix command hold paths remain blocked",
      "Build fix command hold checklist",
    ],
    deniedCopy: "Denied build fix command hold paths remain blocked.",
    approvalCopy: "Build fix command hold requires explicit operator approval.",
    surfaceIds: ["command-hold", "command-preview", "approval-ticket", "risk-review"],
    devOnly: true,
  },
  {
    slug: "build-fix-evidence-packet",
    href: "/build-fix-evidence-packet",
    phase: "Phase 1252",
    title: "Build fix evidence packet",
    commandLabel: "Go to Build Fix Evidence Packet",
    summary: "Evidence packet shows diff command stdout stderr exit code approval operator timestamp and audit placeholders.",
    markerPhrases: [
      "Build fix evidence packet",
      "Build fix evidence packet does not persist evidence",
      "Build fix evidence requires explicit operator approval before future persistence",
      "Evidence packet shows diff command stdout stderr exit code approval operator timestamp and audit placeholders",
      "Denied build fix evidence paths remain blocked",
      "Build fix evidence checklist",
    ],
    deniedCopy: "Denied build fix evidence paths remain blocked.",
    approvalCopy: "Build fix evidence requires explicit operator approval before future persistence.",
    surfaceIds: ["evidence", "file-diff", "command-preview", "approval-ticket", "audit-timeline"],
    devOnly: true,
  },
  {
    slug: "build-fix-result-decision-packet",
    href: "/build-fix-result-decision-packet",
    phase: "Phase 1253",
    title: "Build fix result decision packet",
    commandLabel: "Go to Build Fix Result Decision Packet",
    summary: "Result decision shows accept retry rollback explain manual review success denied blocked failed timeout and needs-review states.",
    markerPhrases: [
      "Build fix result decision packet",
      "Build fix result decision packet does not persist results or make automatic decisions",
      "Build fix result decision requires explicit operator approval before future action",
      "Result decision shows accept retry rollback explain manual review success denied blocked failed timeout and needs-review states",
      "Denied build fix result paths remain blocked",
      "Build fix result decision checklist",
    ],
    deniedCopy: "Denied build fix result paths remain blocked.",
    approvalCopy: "Build fix result decision requires explicit operator approval before future action.",
    surfaceIds: ["result-decision", "evidence", "recovery", "audit-timeline"],
    devOnly: true,
  },
  {
    slug: "build-fix-recovery-packet",
    href: "/build-fix-recovery-packet",
    phase: "Phase 1254",
    title: "Build fix recovery packet",
    commandLabel: "Go to Build Fix Recovery Packet",
    summary: "Recovery packet shows rollback retry stop restore explain failure and manual review options as blocked previews.",
    markerPhrases: [
      "Build fix recovery packet",
      "Build fix recovery packet does not execute recovery",
      "Build fix recovery requires explicit operator approval before future recovery",
      "Recovery packet shows rollback retry stop restore explain failure and manual review options as blocked previews",
      "Denied build fix recovery paths remain blocked",
      "Build fix recovery checklist",
    ],
    deniedCopy: "Denied build fix recovery paths remain blocked.",
    approvalCopy: "Build fix recovery requires explicit operator approval before future recovery.",
    surfaceIds: ["recovery", "result-decision", "file-diff", "command-preview", "audit-timeline"],
    devOnly: true,
  },
  {
    slug: "build-fix-audit-timeline-packet",
    href: "/build-fix-audit-timeline-packet",
    phase: "Phase 1255",
    title: "Build fix audit timeline packet",
    commandLabel: "Go to Build Fix Audit Timeline Packet",
    summary: "Audit timeline shows goal context plan diff command risk approval evidence result recovery and operator placeholders.",
    markerPhrases: [
      "Build fix audit timeline packet",
      "Build fix audit timeline packet does not persist audit logs",
      "Build fix audit timeline requires explicit operator approval before future persistence",
      "Audit timeline shows goal context plan diff command risk approval evidence result recovery and operator placeholders",
      "Denied build fix audit timeline paths remain blocked",
      "Build fix audit timeline checklist",
    ],
    deniedCopy: "Denied build fix audit timeline paths remain blocked.",
    approvalCopy: "Build fix audit timeline requires explicit operator approval before future persistence.",
    surfaceIds: ["audit-timeline", "goal-intake", "project-context", "plan-summary", "approval-ticket", "evidence", "result-decision", "recovery"],
    devOnly: true,
  },
  {
    slug: "first-end-to-end-build-fix-candidate",
    href: "/first-end-to-end-build-fix-candidate",
    phase: "Phase 1256",
    title: "First end-to-end build fix candidate",
    commandLabel: "Go to First End to End Build Fix Candidate",
    summary: "Candidate combines goal context plan diff command risk approval holds evidence result recovery audit and cockpit flow.",
    markerPhrases: [
      "First end-to-end build fix candidate",
      "First end-to-end build fix candidate does not call models write files run commands persist evidence or execute recovery",
      "First end-to-end build fix candidate requires explicit operator approval",
      "Candidate combines goal context plan diff command risk approval holds evidence result recovery audit and cockpit flow",
      "Denied first end-to-end build fix paths remain blocked",
      "First end-to-end build fix checklist",
    ],
    deniedCopy: "Denied first end-to-end build fix paths remain blocked.",
    approvalCopy: "First end-to-end build fix candidate requires explicit operator approval.",
    surfaceIds: ALL_SURFACE_IDS,
    devOnly: true,
  },
  {
    slug: "controlled-end-to-end-build-fix-workflow-release-candidate",
    href: "/controlled-end-to-end-build-fix-workflow-release-candidate",
    phase: "Phase 1257",
    title: "Controlled end-to-end build fix workflow release candidate",
    commandLabel: "Go to Controlled End to End Build Fix Workflow Release Candidate",
    summary: "Release candidate moves CodexForge toward the first usable controlled build fix loop.",
    markerPhrases: [
      "Controlled end-to-end build fix workflow release candidate",
      "Controlled end-to-end build fix workflow release candidate does not call models write files run commands persist results or execute recovery",
      "Controlled end-to-end build fix workflow release requires explicit operator approval",
      "Release candidate moves CodexForge toward the first usable controlled build fix loop",
      "Denied controlled end-to-end build fix workflow paths remain blocked",
      "Controlled end-to-end build fix workflow release checklist",
    ],
    deniedCopy: "Denied controlled end-to-end build fix workflow paths remain blocked.",
    approvalCopy: "Controlled end-to-end build fix workflow release requires explicit operator approval.",
    surfaceIds: ALL_SURFACE_IDS,
    devOnly: true,
  },
] as const;

export function buildEndToEndBuildFixWorkflowStableKey(parts: readonly string[]): string {
  return parts.join(":").toLowerCase().replace(/[^a-z0-9:/-]+/g, "-");
}

export function listEndToEndBuildFixWorkflowRouteDefinitions(): readonly EndToEndBuildFixWorkflowRouteDefinition[] {
  return ROUTES;
}

export function getEndToEndBuildFixWorkflowRouteDefinition(
  slug: EndToEndBuildFixWorkflowRouteSlug
): EndToEndBuildFixWorkflowRouteDefinition {
  return ROUTES.find((candidate) => candidate.slug === slug) ?? ROUTES[0];
}

export function buildEndToEndBuildFixWorkflowRouteModel(
  slug: EndToEndBuildFixWorkflowRouteSlug = "codexforge-cockpit"
): EndToEndBuildFixWorkflowRouteModel {
  const route = getEndToEndBuildFixWorkflowRouteDefinition(slug);
  const surfaces = route.surfaceIds
    .map((surfaceId) => SURFACES.find((surface) => surface.id === surfaceId))
    .filter((surface): surface is EndToEndBuildFixWorkflowSurface => Boolean(surface));

  return {
    route,
    surfaces,
    globalSafetyCopy: GLOBAL_SAFETY_COPY,
    targetFamilies: TARGET_FAMILIES,
    resultStates: RESULT_STATES,
    recoveryOptions: RECOVERY_OPTIONS,
    timelineStages: TIMELINE_STAGES,
    summary: summarizeEndToEndBuildFixWorkflowRoute(route, surfaces),
  };
}

export function buildEndToEndBuildFixWorkflowModel(): EndToEndBuildFixWorkflowRouteModel {
  return buildEndToEndBuildFixWorkflowRouteModel("codexforge-cockpit");
}

export function summarizeEndToEndBuildFixWorkflowRoute(
  route: EndToEndBuildFixWorkflowRouteDefinition,
  surfaces: readonly EndToEndBuildFixWorkflowSurface[]
): string {
  return `${route.title} keeps ${surfaces.length} end-to-end build fix workflow surfaces static, deterministic, preview-only, approval-gated, and blocked from real mutation or command execution.`;
}

export function summarizeEndToEndBuildFixWorkflowRouteModel(
  model = buildEndToEndBuildFixWorkflowModel()
): string {
  return model.summary;
}
