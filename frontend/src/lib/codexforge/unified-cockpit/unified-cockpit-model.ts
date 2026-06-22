export type UnifiedCockpitRouteSlug =
  | "codexforge-cockpit"
  | "unified-cockpit-boundary"
  | "cockpit-goal-intake-panel"
  | "cockpit-plan-summary-panel"
  | "cockpit-file-write-diff-panel"
  | "cockpit-command-preview-panel"
  | "cockpit-approval-queue-panel"
  | "cockpit-execution-state-panel"
  | "cockpit-evidence-panel"
  | "cockpit-result-panel"
  | "cockpit-recovery-panel"
  | "cockpit-safety-coach-panel"
  | "cockpit-dev-surface-drawer"
  | "cockpit-single-page-navigation-contract"
  | "cockpit-mvp-empty-state"
  | "first-unified-cockpit-candidate"
  | "controlled-unified-cockpit-release-candidate"
  | "cockpit-evidence-result-recovery-boundary"
  | "cockpit-evidence-stream-model"
  | "cockpit-file-evidence-view"
  | "cockpit-command-evidence-view"
  | "cockpit-result-summary-model"
  | "cockpit-result-decision-view"
  | "cockpit-recovery-option-model"
  | "cockpit-rollback-preview-view"
  | "cockpit-retry-preview-view"
  | "cockpit-explain-failure-view"
  | "cockpit-audit-trail-view"
  | "cockpit-run-timeline-view"
  | "cockpit-evidence-export-preview"
  | "cockpit-recovery-safety-gate"
  | "first-cockpit-evidence-result-recovery-candidate"
  | "controlled-cockpit-evidence-result-recovery-release-candidate";

export type UnifiedCockpitPanelState = "blocked" | "preview-only" | "approval-required" | "dev-test-only";

export type UnifiedCockpitChecklistItem = {
  id: string;
  label: string;
  detail: string;
  state: UnifiedCockpitPanelState;
};

export type UnifiedCockpitPanel = {
  id: string;
  title: string;
  eyebrow: string;
  state: UnifiedCockpitPanelState;
  body: string;
  checklist: readonly UnifiedCockpitChecklistItem[];
  evidence: readonly string[];
};

export type UnifiedCockpitDevRoute = {
  slug: Exclude<UnifiedCockpitRouteSlug, "codexforge-cockpit">;
  href: string;
  phase: string;
  label: string;
  commandLabel: string;
};

export type UnifiedCockpitRouteDefinition = {
  slug: UnifiedCockpitRouteSlug;
  href: string;
  phase: string;
  title: string;
  commandLabel: string;
  summary: string;
  markerPhrases: readonly string[];
  deniedCopy: string;
  approvalCopy: string;
  panelIds: readonly string[];
  devOnly: boolean;
};

export type UnifiedCockpitRouteModel = {
  route: UnifiedCockpitRouteDefinition;
  panels: readonly UnifiedCockpitPanel[];
  devRoutes: readonly UnifiedCockpitDevRoute[];
  globalSafetyCopy: readonly string[];
  targetFamilies: readonly string[];
  summary: string;
};

export const UNIFIED_CODEXFORGE_COCKPIT_LANGUAGE = [
  "Unified CodexForge Cockpit",
  "One cockpit for goal plan approval execution evidence result and recovery",
  "Normal users should not need to navigate phase pages",
  "File writes remain blocked until explicit operator approval",
  "Commands remain blocked until explicit operator approval",
  "No real command execution from the cockpit",
  "No real file mutation from the cockpit",
  "Cockpit evidence stream",
  "Cockpit result summary",
  "Cockpit recovery options",
  "Cockpit audit trail",
  "Cockpit run timeline",
  "Cockpit evidence export preview",
  "Evidence result and recovery remain preview-only",
  "No evidence persistence from the cockpit",
  "No result persistence from the cockpit",
  "No recovery execution from the cockpit",
  "Unified cockpit checklist",
].join(" | ");

const GLOBAL_SAFETY_COPY = [
  "Phase pages are dev/test surfaces only.",
  "Normal operation should happen in this cockpit.",
  "File writes remain blocked until explicit operator approval.",
  "Commands remain blocked until explicit operator approval.",
  "No provider/model/connector/runtime execution occurs from this cockpit in this batch.",
  "No real mutation occurs from this cockpit in this batch.",
  "No real command execution from the cockpit.",
  "No real file mutation from the cockpit.",
  "Evidence result and recovery remain preview-only.",
  "No evidence persistence from the cockpit.",
  "No result persistence from the cockpit.",
  "No recovery execution from the cockpit.",
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

const DEV_ROUTES: readonly UnifiedCockpitDevRoute[] = [
  {
    slug: "unified-cockpit-boundary",
    href: "/unified-cockpit-boundary",
    phase: "1194",
    label: "Unified Cockpit Boundary",
    commandLabel: "Go to Unified Cockpit Boundary",
  },
  {
    slug: "cockpit-goal-intake-panel",
    href: "/cockpit-goal-intake-panel",
    phase: "1195",
    label: "Cockpit Goal Intake Panel",
    commandLabel: "Go to Cockpit Goal Intake Panel",
  },
  {
    slug: "cockpit-plan-summary-panel",
    href: "/cockpit-plan-summary-panel",
    phase: "1196",
    label: "Cockpit Plan Summary Panel",
    commandLabel: "Go to Cockpit Plan Summary Panel",
  },
  {
    slug: "cockpit-file-write-diff-panel",
    href: "/cockpit-file-write-diff-panel",
    phase: "1197",
    label: "Cockpit File Write Diff Panel",
    commandLabel: "Go to Cockpit File Write Diff Panel",
  },
  {
    slug: "cockpit-command-preview-panel",
    href: "/cockpit-command-preview-panel",
    phase: "1198",
    label: "Cockpit Command Preview Panel",
    commandLabel: "Go to Cockpit Command Preview Panel",
  },
  {
    slug: "cockpit-approval-queue-panel",
    href: "/cockpit-approval-queue-panel",
    phase: "1199",
    label: "Cockpit Approval Queue Panel",
    commandLabel: "Go to Cockpit Approval Queue Panel",
  },
  {
    slug: "cockpit-execution-state-panel",
    href: "/cockpit-execution-state-panel",
    phase: "1200",
    label: "Cockpit Execution State Panel",
    commandLabel: "Go to Cockpit Execution State Panel",
  },
  {
    slug: "cockpit-evidence-panel",
    href: "/cockpit-evidence-panel",
    phase: "1201",
    label: "Cockpit Evidence Panel",
    commandLabel: "Go to Cockpit Evidence Panel",
  },
  {
    slug: "cockpit-result-panel",
    href: "/cockpit-result-panel",
    phase: "1202",
    label: "Cockpit Result Panel",
    commandLabel: "Go to Cockpit Result Panel",
  },
  {
    slug: "cockpit-recovery-panel",
    href: "/cockpit-recovery-panel",
    phase: "1203",
    label: "Cockpit Recovery Panel",
    commandLabel: "Go to Cockpit Recovery Panel",
  },
  {
    slug: "cockpit-safety-coach-panel",
    href: "/cockpit-safety-coach-panel",
    phase: "1204",
    label: "Cockpit Safety Coach Panel",
    commandLabel: "Go to Cockpit Safety Coach Panel",
  },
  {
    slug: "cockpit-dev-surface-drawer",
    href: "/cockpit-dev-surface-drawer",
    phase: "1205",
    label: "Cockpit Dev Surface Drawer",
    commandLabel: "Go to Cockpit Dev Surface Drawer",
  },
  {
    slug: "cockpit-single-page-navigation-contract",
    href: "/cockpit-single-page-navigation-contract",
    phase: "1206",
    label: "Cockpit Single Page Navigation Contract",
    commandLabel: "Go to Cockpit Single Page Navigation Contract",
  },
  {
    slug: "cockpit-mvp-empty-state",
    href: "/cockpit-mvp-empty-state",
    phase: "1207",
    label: "Cockpit MVP Empty State",
    commandLabel: "Go to Cockpit MVP Empty State",
  },
  {
    slug: "first-unified-cockpit-candidate",
    href: "/first-unified-cockpit-candidate",
    phase: "1208",
    label: "First Unified Cockpit Candidate",
    commandLabel: "Go to First Unified Cockpit Candidate",
  },
  {
    slug: "controlled-unified-cockpit-release-candidate",
    href: "/controlled-unified-cockpit-release-candidate",
    phase: "1209",
    label: "Controlled Unified Cockpit Release Candidate",
    commandLabel: "Go to Controlled Unified Cockpit Release Candidate",
  },
  {
    slug: "cockpit-evidence-result-recovery-boundary",
    href: "/cockpit-evidence-result-recovery-boundary",
    phase: "1210",
    label: "Cockpit Evidence Result Recovery Boundary",
    commandLabel: "Go to Cockpit Evidence Result Recovery Boundary",
  },
  {
    slug: "cockpit-evidence-stream-model",
    href: "/cockpit-evidence-stream-model",
    phase: "1211",
    label: "Cockpit Evidence Stream Model",
    commandLabel: "Go to Cockpit Evidence Stream Model",
  },
  {
    slug: "cockpit-file-evidence-view",
    href: "/cockpit-file-evidence-view",
    phase: "1212",
    label: "Cockpit File Evidence View",
    commandLabel: "Go to Cockpit File Evidence View",
  },
  {
    slug: "cockpit-command-evidence-view",
    href: "/cockpit-command-evidence-view",
    phase: "1213",
    label: "Cockpit Command Evidence View",
    commandLabel: "Go to Cockpit Command Evidence View",
  },
  {
    slug: "cockpit-result-summary-model",
    href: "/cockpit-result-summary-model",
    phase: "1214",
    label: "Cockpit Result Summary Model",
    commandLabel: "Go to Cockpit Result Summary Model",
  },
  {
    slug: "cockpit-result-decision-view",
    href: "/cockpit-result-decision-view",
    phase: "1215",
    label: "Cockpit Result Decision View",
    commandLabel: "Go to Cockpit Result Decision View",
  },
  {
    slug: "cockpit-recovery-option-model",
    href: "/cockpit-recovery-option-model",
    phase: "1216",
    label: "Cockpit Recovery Option Model",
    commandLabel: "Go to Cockpit Recovery Option Model",
  },
  {
    slug: "cockpit-rollback-preview-view",
    href: "/cockpit-rollback-preview-view",
    phase: "1217",
    label: "Cockpit Rollback Preview View",
    commandLabel: "Go to Cockpit Rollback Preview View",
  },
  {
    slug: "cockpit-retry-preview-view",
    href: "/cockpit-retry-preview-view",
    phase: "1218",
    label: "Cockpit Retry Preview View",
    commandLabel: "Go to Cockpit Retry Preview View",
  },
  {
    slug: "cockpit-explain-failure-view",
    href: "/cockpit-explain-failure-view",
    phase: "1219",
    label: "Cockpit Explain Failure View",
    commandLabel: "Go to Cockpit Explain Failure View",
  },
  {
    slug: "cockpit-audit-trail-view",
    href: "/cockpit-audit-trail-view",
    phase: "1220",
    label: "Cockpit Audit Trail View",
    commandLabel: "Go to Cockpit Audit Trail View",
  },
  {
    slug: "cockpit-run-timeline-view",
    href: "/cockpit-run-timeline-view",
    phase: "1221",
    label: "Cockpit Run Timeline View",
    commandLabel: "Go to Cockpit Run Timeline View",
  },
  {
    slug: "cockpit-evidence-export-preview",
    href: "/cockpit-evidence-export-preview",
    phase: "1222",
    label: "Cockpit Evidence Export Preview",
    commandLabel: "Go to Cockpit Evidence Export Preview",
  },
  {
    slug: "cockpit-recovery-safety-gate",
    href: "/cockpit-recovery-safety-gate",
    phase: "1223",
    label: "Cockpit Recovery Safety Gate",
    commandLabel: "Go to Cockpit Recovery Safety Gate",
  },
  {
    slug: "first-cockpit-evidence-result-recovery-candidate",
    href: "/first-cockpit-evidence-result-recovery-candidate",
    phase: "1224",
    label: "First Cockpit Evidence Result Recovery Candidate",
    commandLabel: "Go to First Cockpit Evidence Result Recovery Candidate",
  },
  {
    slug: "controlled-cockpit-evidence-result-recovery-release-candidate",
    href: "/controlled-cockpit-evidence-result-recovery-release-candidate",
    phase: "1225",
    label: "Controlled Cockpit Evidence Result Recovery Release Candidate",
    commandLabel: "Go to Controlled Cockpit Evidence Result Recovery Release Candidate",
  },
] as const;

const PANELS: readonly UnifiedCockpitPanel[] = [
  {
    id: "goal-intake",
    title: "Goal Intake",
    eyebrow: "Build-anything request",
    state: "preview-only",
    body: "Static goal review accepts broad local-first goals without sending prompts or routing to models.",
    checklist: [
      {
        id: "goal-intake-targets",
        label: "Broad target families visible",
        detail: "Games, apps, websites, dashboards, tools, research, automation, creative, trading, data, documentation, integrations, and local projects are all represented.",
        state: "preview-only",
      },
      {
        id: "goal-intake-model-routing-blocked",
        label: "Model routing blocked",
        detail: "Future model routing requires explicit operator approval before prompts leave the cockpit.",
        state: "blocked",
      },
    ],
    evidence: ["Goal text placeholder", "Target family placeholder", "Denied model-routing placeholder"],
  },
  {
    id: "plan-summary",
    title: "Plan Summary",
    eyebrow: "Single-page plan",
    state: "approval-required",
    body: "Plan readiness, file-write readiness, and command-runner readiness are visible together while execution remains blocked.",
    checklist: [
      {
        id: "plan-summary-file-write-ready",
        label: "File-write spine linked",
        detail: "The controlled real guarded file-write slice feeds the cockpit as review language only.",
        state: "approval-required",
      },
      {
        id: "plan-summary-command-ready",
        label: "Command-runner spine linked",
        detail: "The controlled real guarded command-runner slice feeds the cockpit as review language only.",
        state: "approval-required",
      },
    ],
    evidence: ["Plan outline placeholder", "File-write readiness placeholder", "Command readiness placeholder"],
  },
  {
    id: "file-write-diff",
    title: "File-Write Diff Preview",
    eyebrow: "Mutation blocked",
    state: "blocked",
    body: "Diff preview shows target path guard, proposed diff, approval, evidence, result, and rollback readiness without applying patches.",
    checklist: [
      {
        id: "file-write-path-guard",
        label: "Path guard preview",
        detail: "Target paths are shown as bounded review placeholders; no arbitrary file browsing or mutation occurs.",
        state: "blocked",
      },
      {
        id: "file-write-rollback-ready",
        label: "Rollback readiness preview",
        detail: "Rollback notes are visible as future recovery requirements, not executable recovery.",
        state: "preview-only",
      },
    ],
    evidence: ["Path guard placeholder", "Diff placeholder", "Rollback readiness placeholder"],
  },
  {
    id: "command-preview",
    title: "Command Preview",
    eyebrow: "Execution blocked",
    state: "blocked",
    body: "Command preview shows allowlist, arguments, working directory, environment, evidence, result, and recovery readiness without running commands.",
    checklist: [
      {
        id: "command-allowlist-preview",
        label: "Allowlist review",
        detail: "Allowed command families are represented as static metadata only.",
        state: "blocked",
      },
      {
        id: "command-environment-redacted",
        label: "Environment values withheld",
        detail: "Environment variable names may be previewed in future, but values and secrets remain unread.",
        state: "blocked",
      },
    ],
    evidence: ["Command string placeholder", "Argument placeholder", "Exit-code placeholder"],
  },
  {
    id: "approval-queue",
    title: "Approval Queue",
    eyebrow: "Human gate",
    state: "approval-required",
    body: "Queue rows are static review placeholders; no approval decisions persist and no real queue jobs are created.",
    checklist: [
      {
        id: "approval-file-write-blocked",
        label: "File writes blocked",
        detail: "Future writes remain pending until explicit operator approval exists.",
        state: "blocked",
      },
      {
        id: "approval-command-blocked",
        label: "Commands blocked",
        detail: "Future commands remain pending until explicit operator approval exists.",
        state: "blocked",
      },
    ],
    evidence: ["Approval ticket placeholder", "Operator identity placeholder", "Denied path placeholder"],
  },
  {
    id: "execution-state",
    title: "Execution State",
    eyebrow: "State preview",
    state: "blocked",
    body: "Blocked, pending, approved, running, failed, and complete states are shown as previews; the cockpit does not release execution.",
    checklist: [
      {
        id: "execution-lock-held",
        label: "Execution lock held",
        detail: "No execution lock is released from the cockpit in this batch.",
        state: "blocked",
      },
      {
        id: "execution-states-visible",
        label: "Preview states visible",
        detail: "State language is deterministic and static for review.",
        state: "preview-only",
      },
    ],
    evidence: ["Blocked state placeholder", "Pending state placeholder", "Complete state placeholder"],
  },
  {
    id: "evidence",
    title: "Evidence",
    eyebrow: "Capture preview",
    state: "preview-only",
    body: "Diff, stdout, stderr, exit code, approval, and operator placeholders are visible without persisting evidence.",
    checklist: [
      {
        id: "evidence-no-persistence",
        label: "Persistence blocked",
        detail: "Evidence storage requires explicit operator approval in a future backend-owned flow.",
        state: "blocked",
      },
      {
        id: "evidence-output-placeholders",
        label: "Output placeholders only",
        detail: "stdout, stderr, and exit code are preview labels, not captured runtime output.",
        state: "preview-only",
      },
    ],
    evidence: ["stdout placeholder", "stderr placeholder", "operator placeholder"],
  },
  {
    id: "result",
    title: "Result",
    eyebrow: "Outcome preview",
    state: "preview-only",
    body: "Success, denied, blocked, failed, timeout, and needs-review states are visible without result persistence.",
    checklist: [
      {
        id: "result-state-language",
        label: "Outcome states visible",
        detail: "Result copy is deterministic static review language.",
        state: "preview-only",
      },
      {
        id: "result-no-storage",
        label: "Result storage blocked",
        detail: "No output or result is stored from this cockpit.",
        state: "blocked",
      },
    ],
    evidence: ["Result status placeholder", "Needs-review placeholder", "Denied result placeholder"],
  },
  {
    id: "recovery",
    title: "Recovery",
    eyebrow: "Recovery preview",
    state: "preview-only",
    body: "Rollback, retry, stop, restore, and explain-failure options are previews and cannot execute recovery.",
    checklist: [
      {
        id: "recovery-actions-preview",
        label: "Recovery options visible",
        detail: "Rollback, retry, stop, restore, and explain-failure appear as non-executable review states.",
        state: "preview-only",
      },
      {
        id: "recovery-execution-blocked",
        label: "Recovery execution blocked",
        detail: "Future recovery requires explicit operator approval.",
        state: "blocked",
      },
    ],
    evidence: ["Rollback placeholder", "Retry placeholder", "Explain-failure placeholder"],
  },
  {
    id: "safety-coach",
    title: "Safety Coach",
    eyebrow: "Approval-safe guidance",
    state: "approval-required",
    body: "Safety coach explains why file writes, commands, providers, runtimes, and adapters remain blocked and cannot override approval.",
    checklist: [
      {
        id: "safety-no-override",
        label: "No approval override",
        detail: "Safety copy cannot approve, persist, or execute anything.",
        state: "blocked",
      },
      {
        id: "safety-blocked-arms",
        label: "Execution arms blocked",
        detail: "Providers, connectors, runtimes, adapters, file writes, and commands remain approval-gated.",
        state: "blocked",
      },
    ],
    evidence: ["Denied reason placeholder", "Approval requirement placeholder", "Blocked adapter placeholder"],
  },
  {
    id: "dev-surface-drawer",
    title: "Dev Surface Drawer",
    eyebrow: "Phase routes",
    state: "dev-test-only",
    body: "Phase pages remain deep-linkable dev/test diagnostics; normal users should use the cockpit instead of phase pages.",
    checklist: [
      {
        id: "dev-surfaces-labelled",
        label: "Dev/test labels visible",
        detail: "Every phase link is grouped behind explicit dev/test language.",
        state: "dev-test-only",
      },
      {
        id: "dev-surfaces-no-execution",
        label: "No phase execution",
        detail: "Opening a phase page does not execute commands, writes, models, providers, runtimes, or adapters.",
        state: "blocked",
      },
    ],
    evidence: ["Dev route list", "Phase badge list", "Cockpit-preferred note"],
  },
  {
    id: "single-page-navigation",
    title: "Single-Page Navigation",
    eyebrow: "Normal path",
    state: "preview-only",
    body: "Goal, plan, approval, execution, evidence, result, and recovery stay in one cockpit so normal users do not need multi-page phase navigation.",
    checklist: [
      {
        id: "single-page-contract",
        label: "One cockpit contract",
        detail: "The cockpit route is the preferred normal user surface.",
        state: "preview-only",
      },
      {
        id: "phase-routes-deep-linkable",
        label: "Phase diagnostics preserved",
        detail: "Phase routes remain deep-linkable dev/test diagnostics.",
        state: "dev-test-only",
      },
    ],
    evidence: ["Cockpit route placeholder", "Dev route placeholder", "No navigation side effects placeholder"],
  },
  {
    id: "empty-state",
    title: "MVP Empty State",
    eyebrow: "No active run",
    state: "preview-only",
    body: "Empty state guides the operator to enter a goal and review the plan before any action can be requested.",
    checklist: [
      {
        id: "empty-state-goal-first",
        label: "Goal first",
        detail: "The operator starts with a goal review, then plan review, then explicit approval in a future batch.",
        state: "preview-only",
      },
      {
        id: "empty-state-actions-blocked",
        label: "Actions blocked",
        detail: "No models, commands, providers, connectors, adapters, runtimes, or file writes run from the empty state.",
        state: "blocked",
      },
    ],
    evidence: ["Goal placeholder", "Plan placeholder", "Approval placeholder"],
  },
] as const;

const ROUTES: readonly UnifiedCockpitRouteDefinition[] = [
  {
    slug: "codexforge-cockpit",
    href: "/codexforge-cockpit",
    phase: "Cockpit",
    title: "Unified CodexForge Cockpit",
    commandLabel: "Go to Unified CodexForge Cockpit",
    summary: "One cockpit for goal plan approval execution evidence result and recovery",
    markerPhrases: [
      "Unified CodexForge Cockpit",
      "One cockpit for goal plan approval execution evidence result and recovery",
      "Normal users should not need to navigate phase pages",
      "File writes remain blocked until explicit operator approval",
      "Commands remain blocked until explicit operator approval",
      "No real command execution from the cockpit",
      "No real file mutation from the cockpit",
      "Cockpit evidence stream",
      "Cockpit result summary",
      "Cockpit recovery options",
      "Cockpit audit trail",
      "Cockpit run timeline",
      "Cockpit evidence export preview",
      "Evidence result and recovery remain preview-only",
      "No evidence persistence from the cockpit",
      "No result persistence from the cockpit",
      "No recovery execution from the cockpit",
      "Unified cockpit checklist",
    ],
    deniedCopy: "Denied cockpit paths remain blocked: no real mutation, no command execution, no provider calls, no runtime starts, and no adapter execution.",
    approvalCopy: "Future file writes and commands must pass explicit operator approval with guards, evidence, result capture, and recovery contract.",
    panelIds: [
      "goal-intake",
      "plan-summary",
      "file-write-diff",
      "command-preview",
      "approval-queue",
      "execution-state",
      "evidence",
      "result",
      "recovery",
      "safety-coach",
      "dev-surface-drawer",
      "single-page-navigation",
      "empty-state",
    ],
    devOnly: false,
  },
  {
    slug: "unified-cockpit-boundary",
    href: "/unified-cockpit-boundary",
    phase: "Phase 1194",
    title: "Unified cockpit boundary",
    commandLabel: "Go to Unified Cockpit Boundary",
    summary: "Cockpit unifies goal plan diff command approval execution evidence result and recovery.",
    markerPhrases: [
      "Unified cockpit boundary",
      "Unified cockpit boundary does not execute commands or write files",
      "Unified cockpit requires explicit operator approval before future execution",
      "Cockpit unifies goal plan diff command approval execution evidence result and recovery",
      "Phase pages are dev/test surfaces only",
      "Unified cockpit boundary checklist",
    ],
    deniedCopy: "Denied unified cockpit boundary paths remain blocked.",
    approvalCopy: "Future execution requires explicit operator approval before any real action.",
    panelIds: ["goal-intake", "plan-summary", "file-write-diff", "command-preview", "approval-queue"],
    devOnly: true,
  },
  {
    slug: "cockpit-goal-intake-panel",
    href: "/cockpit-goal-intake-panel",
    phase: "Phase 1195",
    title: "Cockpit goal intake panel",
    commandLabel: "Go to Cockpit Goal Intake Panel",
    summary: "Goal intake supports apps websites dashboards games research workflows data and integrations.",
    markerPhrases: [
      "Cockpit goal intake panel",
      "Cockpit goal intake panel does not send prompts",
      "Goal intake requires explicit operator approval before future model routing",
      "Goal intake supports apps websites dashboards games research workflows data and integrations",
      "Denied cockpit goal intake paths remain blocked",
      "Cockpit goal intake checklist",
    ],
    deniedCopy: "Denied cockpit goal intake paths remain blocked.",
    approvalCopy: "Future model routing requires explicit operator approval before prompts leave the local-first cockpit.",
    panelIds: ["goal-intake", "safety-coach", "empty-state"],
    devOnly: true,
  },
  {
    slug: "cockpit-plan-summary-panel",
    href: "/cockpit-plan-summary-panel",
    phase: "Phase 1196",
    title: "Cockpit plan summary panel",
    commandLabel: "Go to Cockpit Plan Summary Panel",
    summary: "Plan summary shows file-write and command-runner readiness in one page.",
    markerPhrases: [
      "Cockpit plan summary panel",
      "Cockpit plan summary panel does not execute plans",
      "Plan summary requires explicit operator approval before future execution",
      "Plan summary shows file-write and command-runner readiness in one page",
      "Denied cockpit plan paths remain blocked",
      "Cockpit plan summary checklist",
    ],
    deniedCopy: "Denied cockpit plan paths remain blocked.",
    approvalCopy: "Future plan execution requires explicit operator approval.",
    panelIds: ["plan-summary", "file-write-diff", "command-preview", "approval-queue"],
    devOnly: true,
  },
  {
    slug: "cockpit-file-write-diff-panel",
    href: "/cockpit-file-write-diff-panel",
    phase: "Phase 1197",
    title: "Cockpit file-write diff panel",
    commandLabel: "Go to Cockpit File Write Diff Panel",
    summary: "Diff panel shows path guard diff approval evidence result and rollback readiness.",
    markerPhrases: [
      "Cockpit file-write diff panel",
      "Cockpit file-write diff panel does not write files",
      "File-write diff panel requires explicit operator approval before future apply",
      "Diff panel shows path guard diff approval evidence result and rollback readiness",
      "Denied cockpit file-write paths remain blocked",
      "Cockpit file-write diff checklist",
    ],
    deniedCopy: "Denied cockpit file-write paths remain blocked.",
    approvalCopy: "Future apply requires explicit operator approval with path guard, evidence, result, and rollback contract.",
    panelIds: ["file-write-diff", "approval-queue", "evidence", "result", "recovery"],
    devOnly: true,
  },
  {
    slug: "cockpit-command-preview-panel",
    href: "/cockpit-command-preview-panel",
    phase: "Phase 1198",
    title: "Cockpit command preview panel",
    commandLabel: "Go to Cockpit Command Preview Panel",
    summary: "Command panel shows allowlist arguments working directory environment evidence result and recovery readiness.",
    markerPhrases: [
      "Cockpit command preview panel",
      "Cockpit command preview panel does not run commands",
      "Command preview panel requires explicit operator approval before future execution",
      "Command panel shows allowlist arguments working directory environment evidence result and recovery readiness",
      "Denied cockpit command paths remain blocked",
      "Cockpit command preview checklist",
    ],
    deniedCopy: "Denied cockpit command paths remain blocked.",
    approvalCopy: "Future command execution requires explicit operator approval with allowlist, argument, working-directory, environment, evidence, result, and recovery guards.",
    panelIds: ["command-preview", "approval-queue", "execution-state", "evidence", "result", "recovery"],
    devOnly: true,
  },
  {
    slug: "cockpit-approval-queue-panel",
    href: "/cockpit-approval-queue-panel",
    phase: "Phase 1199",
    title: "Cockpit approval queue panel",
    commandLabel: "Go to Cockpit Approval Queue Panel",
    summary: "Approval queue keeps file writes and commands blocked.",
    markerPhrases: [
      "Cockpit approval queue panel",
      "Cockpit approval queue panel does not approve actions",
      "Approval queue requires explicit human approval",
      "Approval queue keeps file writes and commands blocked",
      "Denied cockpit approval paths remain blocked",
      "Cockpit approval queue checklist",
    ],
    deniedCopy: "Denied cockpit approval paths remain blocked.",
    approvalCopy: "Human approval is required before any future action can move past preview.",
    panelIds: ["approval-queue", "file-write-diff", "command-preview", "safety-coach"],
    devOnly: true,
  },
  {
    slug: "cockpit-execution-state-panel",
    href: "/cockpit-execution-state-panel",
    phase: "Phase 1200",
    title: "Cockpit execution state panel",
    commandLabel: "Go to Cockpit Execution State Panel",
    summary: "Execution state shows blocked pending approved running failed and complete preview states.",
    markerPhrases: [
      "Cockpit execution state panel",
      "Cockpit execution state panel does not release execution",
      "Execution state requires explicit operator approval before future run",
      "Execution state shows blocked pending approved running failed and complete preview states",
      "Denied cockpit execution paths remain blocked",
      "Cockpit execution state checklist",
    ],
    deniedCopy: "Denied cockpit execution paths remain blocked.",
    approvalCopy: "Future run state transitions require explicit operator approval and backend-owned guards.",
    panelIds: ["execution-state", "approval-queue", "evidence", "result"],
    devOnly: true,
  },
  {
    slug: "cockpit-evidence-panel",
    href: "/cockpit-evidence-panel",
    phase: "Phase 1201",
    title: "Cockpit evidence panel",
    commandLabel: "Go to Cockpit Evidence Panel",
    summary: "Evidence panel shows diff stdout stderr exit code approval and operator placeholders.",
    markerPhrases: [
      "Cockpit evidence panel",
      "Cockpit evidence panel does not persist evidence",
      "Evidence panel requires explicit operator approval before future persistence",
      "Evidence panel shows diff stdout stderr exit code approval and operator placeholders",
      "Denied cockpit evidence paths remain blocked",
      "Cockpit evidence checklist",
    ],
    deniedCopy: "Denied cockpit evidence paths remain blocked.",
    approvalCopy: "Future evidence persistence requires explicit operator approval.",
    panelIds: ["evidence", "file-write-diff", "command-preview", "result"],
    devOnly: true,
  },
  {
    slug: "cockpit-result-panel",
    href: "/cockpit-result-panel",
    phase: "Phase 1202",
    title: "Cockpit result panel",
    commandLabel: "Go to Cockpit Result Panel",
    summary: "Result panel shows success denied blocked failed timeout and needs-review states.",
    markerPhrases: [
      "Cockpit result panel",
      "Cockpit result panel does not persist results",
      "Result panel requires explicit operator approval before future persistence",
      "Result panel shows success denied blocked failed timeout and needs-review states",
      "Denied cockpit result paths remain blocked",
      "Cockpit result checklist",
    ],
    deniedCopy: "Denied cockpit result paths remain blocked.",
    approvalCopy: "Future result persistence requires explicit operator approval.",
    panelIds: ["result", "evidence", "recovery", "safety-coach"],
    devOnly: true,
  },
  {
    slug: "cockpit-recovery-panel",
    href: "/cockpit-recovery-panel",
    phase: "Phase 1203",
    title: "Cockpit recovery panel",
    commandLabel: "Go to Cockpit Recovery Panel",
    summary: "Recovery panel shows rollback retry stop restore and explain-failure options as previews.",
    markerPhrases: [
      "Cockpit recovery panel",
      "Cockpit recovery panel does not execute recovery",
      "Recovery panel requires explicit operator approval before future recovery",
      "Recovery panel shows rollback retry stop restore and explain-failure options as previews",
      "Denied cockpit recovery paths remain blocked",
      "Cockpit recovery checklist",
    ],
    deniedCopy: "Denied cockpit recovery paths remain blocked.",
    approvalCopy: "Future recovery requires explicit operator approval.",
    panelIds: ["recovery", "result", "evidence", "approval-queue"],
    devOnly: true,
  },
  {
    slug: "cockpit-safety-coach-panel",
    href: "/cockpit-safety-coach-panel",
    phase: "Phase 1204",
    title: "Cockpit safety coach panel",
    commandLabel: "Go to Cockpit Safety Coach Panel",
    summary: "Safety coach explains why file writes commands providers runtimes and adapters remain blocked.",
    markerPhrases: [
      "Cockpit safety coach panel",
      "Cockpit safety coach panel does not override approval",
      "Safety coach requires explicit operator approval before any future execution",
      "Safety coach explains why file writes commands providers runtimes and adapters remain blocked",
      "Denied cockpit safety coach paths remain blocked",
      "Cockpit safety coach checklist",
    ],
    deniedCopy: "Denied cockpit safety coach paths remain blocked.",
    approvalCopy: "Safety guidance cannot override explicit operator approval.",
    panelIds: ["safety-coach", "approval-queue", "file-write-diff", "command-preview"],
    devOnly: true,
  },
  {
    slug: "cockpit-dev-surface-drawer",
    href: "/cockpit-dev-surface-drawer",
    phase: "Phase 1205",
    title: "Cockpit dev surface drawer",
    commandLabel: "Go to Cockpit Dev Surface Drawer",
    summary: "Dev surface drawer labels phase pages as dev/test surfaces only.",
    markerPhrases: [
      "Cockpit dev surface drawer",
      "Cockpit dev surface drawer does not execute phase pages",
      "Dev surface drawer requires explicit operator intent to browse dev/test routes",
      "Dev surface drawer labels phase pages as dev/test surfaces only",
      "Normal users should use the cockpit instead of phase pages",
      "Cockpit dev surface drawer checklist",
    ],
    deniedCopy: "Denied cockpit dev surface drawer paths remain blocked.",
    approvalCopy: "Browsing dev/test diagnostics requires explicit operator intent.",
    panelIds: ["dev-surface-drawer", "single-page-navigation", "safety-coach"],
    devOnly: true,
  },
  {
    slug: "cockpit-single-page-navigation-contract",
    href: "/cockpit-single-page-navigation-contract",
    phase: "Phase 1206",
    title: "Cockpit single-page navigation contract",
    commandLabel: "Go to Cockpit Single Page Navigation Contract",
    summary: "Single-page navigation keeps goal plan approval execution evidence result and recovery in one cockpit.",
    markerPhrases: [
      "Cockpit single-page navigation contract",
      "Cockpit single-page navigation contract does not execute navigation side effects",
      "Single-page navigation keeps goal plan approval execution evidence result and recovery in one cockpit",
      "Phase routes remain deep-linkable dev/test diagnostics",
      "Normal users should not need multi-page phase navigation",
      "Cockpit single-page navigation checklist",
    ],
    deniedCopy: "Denied cockpit single-page navigation paths remain blocked.",
    approvalCopy: "Future execution remains approval-gated even when navigation is consolidated.",
    panelIds: ["single-page-navigation", "goal-intake", "plan-summary", "approval-queue"],
    devOnly: true,
  },
  {
    slug: "cockpit-mvp-empty-state",
    href: "/cockpit-mvp-empty-state",
    phase: "Phase 1207",
    title: "Cockpit MVP empty state",
    commandLabel: "Go to Cockpit MVP Empty State",
    summary: "Empty state guides the operator to enter a goal and review plan before action.",
    markerPhrases: [
      "Cockpit MVP empty state",
      "Cockpit MVP empty state does not call models or run commands",
      "MVP empty state requires explicit operator approval before future execution",
      "Empty state guides the operator to enter a goal and review plan before action",
      "Denied cockpit empty state paths remain blocked",
      "Cockpit MVP empty state checklist",
    ],
    deniedCopy: "Denied cockpit empty state paths remain blocked.",
    approvalCopy: "Future execution from an empty state requires explicit operator approval.",
    panelIds: ["empty-state", "goal-intake", "plan-summary", "safety-coach"],
    devOnly: true,
  },
  {
    slug: "first-unified-cockpit-candidate",
    href: "/first-unified-cockpit-candidate",
    phase: "Phase 1208",
    title: "First unified cockpit candidate",
    commandLabel: "Go to First Unified Cockpit Candidate",
    summary: "Candidate combines goal plan diff command approval execution evidence result recovery safety and dev-surface drawer.",
    markerPhrases: [
      "First unified cockpit candidate",
      "First unified cockpit candidate does not execute commands or write files",
      "First unified cockpit candidate requires explicit operator approval",
      "Candidate combines goal plan diff command approval execution evidence result recovery safety and dev-surface drawer",
      "Denied first unified cockpit paths remain blocked",
      "First unified cockpit checklist",
    ],
    deniedCopy: "Denied first unified cockpit paths remain blocked.",
    approvalCopy: "Candidate remains approval-gated before any future execution.",
    panelIds: [
      "goal-intake",
      "plan-summary",
      "file-write-diff",
      "command-preview",
      "approval-queue",
      "execution-state",
      "evidence",
      "result",
      "recovery",
      "safety-coach",
      "dev-surface-drawer",
    ],
    devOnly: true,
  },
  {
    slug: "controlled-unified-cockpit-release-candidate",
    href: "/controlled-unified-cockpit-release-candidate",
    phase: "Phase 1209",
    title: "Controlled unified cockpit release candidate",
    commandLabel: "Go to Controlled Unified Cockpit Release Candidate",
    summary: "Release candidate makes the cockpit the preferred normal user surface.",
    markerPhrases: [
      "Controlled unified cockpit release candidate",
      "Controlled unified cockpit release candidate does not call models execute commands or write files",
      "Controlled unified cockpit release requires explicit operator approval",
      "Release candidate makes the cockpit the preferred normal user surface",
      "Denied controlled unified cockpit paths remain blocked",
      "Controlled unified cockpit release checklist",
    ],
    deniedCopy: "Denied controlled unified cockpit paths remain blocked.",
    approvalCopy: "Controlled release remains approval-gated before models, commands, files, providers, runtimes, connectors, or adapters can run.",
    panelIds: [
      "goal-intake",
      "plan-summary",
      "file-write-diff",
      "command-preview",
      "approval-queue",
      "execution-state",
      "evidence",
      "result",
      "recovery",
      "safety-coach",
      "dev-surface-drawer",
      "single-page-navigation",
      "empty-state",
    ],
    devOnly: true,
  },
] as const;

export function buildUnifiedCockpitStableKey(parts: readonly string[]): string {
  return parts.join(":").toLowerCase().replace(/[^a-z0-9:/-]+/g, "-");
}

export function listUnifiedCockpitDevRoutes(): readonly UnifiedCockpitDevRoute[] {
  return DEV_ROUTES;
}

export function listUnifiedCockpitRouteDefinitions(): readonly UnifiedCockpitRouteDefinition[] {
  return ROUTES;
}

export function getUnifiedCockpitRouteDefinition(slug: UnifiedCockpitRouteSlug): UnifiedCockpitRouteDefinition {
  const route = ROUTES.find((candidate) => candidate.slug === slug);
  if (!route) return ROUTES[0];
  return route;
}

export function buildUnifiedCockpitRouteModel(slug: UnifiedCockpitRouteSlug = "codexforge-cockpit"): UnifiedCockpitRouteModel {
  const route = getUnifiedCockpitRouteDefinition(slug);
  const panels = route.panelIds
    .map((panelId) => PANELS.find((panel) => panel.id === panelId))
    .filter((panel): panel is UnifiedCockpitPanel => Boolean(panel));

  return {
    route,
    panels,
    devRoutes: DEV_ROUTES,
    globalSafetyCopy: GLOBAL_SAFETY_COPY,
    targetFamilies: TARGET_FAMILIES,
    summary: summarizeUnifiedCockpitRoute(route, panels),
  };
}

export function buildUnifiedCockpitModel(): UnifiedCockpitRouteModel {
  return buildUnifiedCockpitRouteModel("codexforge-cockpit");
}

export function summarizeUnifiedCockpitRoute(
  route: UnifiedCockpitRouteDefinition,
  panels: readonly UnifiedCockpitPanel[]
): string {
  return `${route.title} keeps ${panels.length} cockpit panel previews static, deterministic, approval-gated, and blocked from real execution.`;
}

export function summarizeUnifiedCockpitRouteModel(model: UnifiedCockpitRouteModel): string {
  return model.summary;
}
