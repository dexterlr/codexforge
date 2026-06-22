export type ProjectContextBrainRouteSlug =
  | "codexforge-cockpit"
  | "project-context-brain-boundary"
  | "workspace-identity-packet"
  | "project-map-preview"
  | "framework-runtime-detection-preview"
  | "package-tooling-detection-preview"
  | "important-files-preview"
  | "command-candidate-preview"
  | "risk-zone-preview"
  | "denied-context-boundary"
  | "evidence-needs-preview"
  | "result-expectation-preview"
  | "recovery-implication-preview"
  | "context-confidence-review"
  | "cockpit-project-context-summary"
  | "first-project-context-brain-candidate"
  | "controlled-project-context-brain-release-candidate";

export type ProjectContextBrainKind =
  | "project-context-brain-v1"
  | "project-context-brain-boundary"
  | "workspace-identity-packet"
  | "project-map-preview"
  | "framework-runtime-detection-preview"
  | "package-tooling-detection-preview"
  | "important-files-preview"
  | "command-candidate-preview"
  | "risk-zone-preview"
  | "denied-context-boundary"
  | "evidence-needs-preview"
  | "result-expectation-preview"
  | "recovery-implication-preview"
  | "context-confidence-review"
  | "cockpit-project-context-summary"
  | "project-context-brain-candidate"
  | "project-context-brain-release-candidate";

export type ProjectContextBrainState =
  | "known"
  | "inferred"
  | "unknown"
  | "blocked"
  | "needs-approval"
  | "preview-only";

export type ProjectContextBrainItem = {
  id: string;
  label: string;
  detail: string;
  state: ProjectContextBrainState;
};

export type ProjectContextBrainSection = {
  id: string;
  label: string;
  title: string;
  summary: string;
  state: ProjectContextBrainState;
  items: readonly ProjectContextBrainItem[];
};

export type ProjectContextBrainConfidence = {
  known: readonly string[];
  inferred: readonly string[];
  unknown: readonly string[];
  blocked: readonly string[];
  needsApproval: readonly string[];
};

export type ProjectContextBrainModel = {
  contextBrainId: string;
  contextBrainKind: ProjectContextBrainKind;
  workspaceIdentity: ProjectContextBrainSection;
  projectMap: ProjectContextBrainSection;
  frameworkRuntimeHints: ProjectContextBrainSection;
  packageToolingHints: ProjectContextBrainSection;
  importantFiles: ProjectContextBrainSection;
  commandCandidates: ProjectContextBrainSection;
  riskZones: ProjectContextBrainSection;
  deniedContextBoundaries: ProjectContextBrainSection;
  evidenceNeeds: ProjectContextBrainSection;
  resultExpectations: ProjectContextBrainSection;
  recoveryImplications: ProjectContextBrainSection;
  contextConfidence: ProjectContextBrainConfidence;
  cockpitSummary: readonly ProjectContextBrainItem[];
  explicitSafetyLimits: readonly string[];
};

export type ProjectContextBrainRouteDefinition = {
  slug: ProjectContextBrainRouteSlug;
  href: string;
  phase: string;
  title: string;
  commandLabel: string;
  summary: string;
  markerPhrases: readonly string[];
  sectionIds: readonly string[];
  devOnly: boolean;
};

export type ProjectContextBrainRouteModel = {
  route: ProjectContextBrainRouteDefinition;
  contextBrain: ProjectContextBrainModel;
  sections: readonly ProjectContextBrainSection[];
  diagnosticRoutes: readonly ProjectContextBrainRouteDefinition[];
  cockpitMarkers: readonly string[];
  summary: string;
};

export const PROJECT_CONTEXT_BRAIN_COCKPIT_MARKERS = [
  "Project Context Brain v1",
  "Project",
  "Stack",
  "Files",
  "Commands",
  "Risks",
  "Evidence",
  "Result",
  "Recovery",
  "Confidence",
  "No arbitrary file crawling from the cockpit",
  "No secret reads from the cockpit",
  "No runtime probes from the cockpit",
  "No direct command execution from the cockpit",
  "No automatic memory promotion from the cockpit",
  "Backend-owned context inspection remains required",
  "Explicit operator approval remains required",
] as const;

const EXPLICIT_SAFETY_LIMITS = [
  "Project Context Brain v1 is preview-only.",
  "It does not crawl arbitrary files from the UI.",
  "It does not execute discovery commands from the UI.",
  "It does not read secrets.",
  "It does not display environment values.",
  "It does not call models.",
  "It does not call providers.",
  "It does not call connectors.",
  "It does not promote memory automatically.",
  "It prepares a future backend-owned context inspection path.",
  "Backend-owned guarded execution remains required for real actions.",
  "Explicit operator approval remains required.",
] as const;

const WORKSPACE_IDENTITY: ProjectContextBrainSection = {
  id: "workspace-identity",
  label: "Project",
  title: "Workspace identity packet",
  summary:
    "CodexForge can describe the expected workspace identity as static cockpit context without reading secrets or running branch discovery.",
  state: "preview-only",
  items: [
    {
      id: "workspace-root",
      label: "Root path",
      detail: "Canonical workspace: C:\\ai-lab\\projects\\openclaw-workspace\\repos\\health-tracker\\frontend.",
      state: "known",
    },
    {
      id: "project-name",
      label: "Project name",
      detail: "Project identity candidate: health-tracker frontend with CodexForge cockpit surfaces.",
      state: "known",
    },
    {
      id: "branch-hint",
      label: "Branch hint",
      detail: "Branch hint is not inspected from the cockpit and needs backend-owned approval before live confirmation.",
      state: "needs-approval",
    },
    {
      id: "package-hint",
      label: "Package hint",
      detail: "Package hint points at a frontend package workspace, but package metadata is not crawled from the cockpit.",
      state: "inferred",
    },
    {
      id: "workspace-boundary",
      label: "Workspace boundary",
      detail: "Context stays inside the requested frontend workspace until guarded backend inspection is approved.",
      state: "blocked",
    },
  ],
};

const PROJECT_MAP: ProjectContextBrainSection = {
  id: "project-map",
  label: "Project",
  title: "Project map preview",
  summary:
    "Project map preview names expected app, source, config, script, docs, tests, and diagnostics areas without live UI crawling.",
  state: "preview-only",
  items: [
    {
      id: "app-folders",
      label: "App folders",
      detail: "App route folders are expected under src/app and remain review-only from the cockpit.",
      state: "inferred",
    },
    {
      id: "source-folders",
      label: "Source folders",
      detail: "CodexForge source modules are expected under src/lib/codexforge.",
      state: "inferred",
    },
    {
      id: "config-folders",
      label: "Config folders",
      detail: "Config hints remain candidates until backend-owned inspection confirms framework files.",
      state: "needs-approval",
    },
    {
      id: "scripts-docs-tests",
      label: "Scripts, docs, tests",
      detail: "Smoke scripts, checkpoint docs, and test locations are listed as context candidates, not opened from UI.",
      state: "preview-only",
    },
  ],
};

const FRAMEWORK_RUNTIME_HINTS: ProjectContextBrainSection = {
  id: "framework-runtime-hints",
  label: "Stack",
  title: "Framework runtime detection preview",
  summary:
    "Framework runtime detection preview shows likely Next, React, TypeScript, Node, package manager, and local runtime hints without probes.",
  state: "preview-only",
  items: [
    {
      id: "next-react",
      label: "Next and React",
      detail: "App Router pages and client components suggest a Next and React frontend.",
      state: "inferred",
    },
    {
      id: "typescript",
      label: "TypeScript",
      detail: "Route and library files use .ts and .tsx naming patterns.",
      state: "inferred",
    },
    {
      id: "node-runtime",
      label: "Node runtime",
      detail: "Node runtime is a package context hint only; the cockpit does not start local runtimes.",
      state: "needs-approval",
    },
    {
      id: "runtime-probes-blocked",
      label: "Runtime probes",
      detail: "Runtime probes, process checks, and port checks stay blocked from the cockpit.",
      state: "blocked",
    },
  ],
};

const PACKAGE_TOOLING_HINTS: ProjectContextBrainSection = {
  id: "package-tooling-hints",
  label: "Stack",
  title: "Package tooling detection preview",
  summary:
    "Package tooling detection preview lists package manager scripts, build commands, smoke commands, lint commands, and dependency risk hints as review-only candidates.",
  state: "preview-only",
  items: [
    {
      id: "package-manager",
      label: "Package manager",
      detail: "Package manager details remain candidates until backend-owned package inspection is approved.",
      state: "needs-approval",
    },
    {
      id: "script-hints",
      label: "Script hints",
      detail: "Build, smoke, validation, and hygiene scripts are command candidates only.",
      state: "preview-only",
    },
    {
      id: "dependency-risk",
      label: "Dependency risk",
      detail: "Dependency risk hints require reviewed package metadata and do not install packages.",
      state: "needs-approval",
    },
  ],
};

const IMPORTANT_FILES: ProjectContextBrainSection = {
  id: "important-files",
  label: "Files",
  title: "Important files preview",
  summary:
    "Important files preview highlights package config, routes, cockpit modules, smoke scripts, checkpoint docs, and safety files without opening arbitrary paths.",
  state: "preview-only",
  items: [
    {
      id: "package-config",
      label: "Package config",
      detail: "Package config would matter for scripts, dependencies, and framework hints after approval.",
      state: "needs-approval",
    },
    {
      id: "routes",
      label: "Routes",
      detail: "src/app route pages define the user-visible review surfaces.",
      state: "known",
    },
    {
      id: "cockpit-modules",
      label: "Cockpit modules",
      detail: "src/lib/codexforge cockpit modules define normal user cockpit content.",
      state: "known",
    },
    {
      id: "smoke-checkpoint-safety",
      label: "Smoke, checkpoint, safety",
      detail: "Smoke scripts, checkpoint docs, and safety boundary files are important evidence anchors.",
      state: "preview-only",
    },
  ],
};

const COMMAND_CANDIDATES: ProjectContextBrainSection = {
  id: "command-candidates",
  label: "Commands",
  title: "Command candidate preview",
  summary:
    "Command candidate preview lists likely build, smoke, validation, and hygiene commands as review-only candidates and does not run them.",
  state: "preview-only",
  items: [
    {
      id: "build-candidate",
      label: "Build candidate",
      detail: "Build command candidates remain blocked until explicit approval and backend-owned execution.",
      state: "blocked",
    },
    {
      id: "smoke-candidate",
      label: "Smoke candidate",
      detail: "Smoke script candidates remain review-only and cannot be started from the cockpit.",
      state: "blocked",
    },
    {
      id: "validation-candidate",
      label: "Validation candidate",
      detail: "Validation and hygiene commands require operator approval before future guarded execution.",
      state: "needs-approval",
    },
  ],
};

const RISK_ZONES: ProjectContextBrainSection = {
  id: "risk-zones",
  label: "Risks",
  title: "Risk zone preview",
  summary:
    "Risk zone preview highlights file mutation, command execution, provider calls, connector calls, secrets, installs, deploys, ports, runtimes, persistence, and recovery risks.",
  state: "preview-only",
  items: [
    {
      id: "mutation-command-risk",
      label: "Mutation and commands",
      detail: "File mutation and command execution are blocked from the frontend cockpit.",
      state: "blocked",
    },
    {
      id: "external-call-risk",
      label: "Models, providers, connectors",
      detail: "Model, provider, and connector calls are blocked from Project Context Brain v1.",
      state: "blocked",
    },
    {
      id: "secret-runtime-risk",
      label: "Secrets and runtimes",
      detail: "Secret reads, environment value display, installs, deploys, port binding, and runtime starts stay blocked.",
      state: "blocked",
    },
    {
      id: "persistence-recovery-risk",
      label: "Persistence and recovery",
      detail: "Approval, queue, evidence, result, audit, memory, rollback, retry, and recovery persistence or execution stay blocked.",
      state: "blocked",
    },
  ],
};

const DENIED_CONTEXT_BOUNDARIES: ProjectContextBrainSection = {
  id: "denied-context-boundaries",
  label: "Risks",
  title: "Denied context boundary",
  summary:
    "Denied context boundary blocks arbitrary browsing, secrets, environment values, provider calls, connectors, model calls, commands, writes, installs, deploys, ports, runtimes, persistence, and automatic memory promotion.",
  state: "blocked",
  items: [
    {
      id: "no-arbitrary-browsing",
      label: "No arbitrary browsing",
      detail: "The cockpit does not browse arbitrary files or crawl arbitrary paths.",
      state: "blocked",
    },
    {
      id: "no-secret-env",
      label: "No secrets",
      detail: "Secrets and environment values are not read or displayed.",
      state: "blocked",
    },
    {
      id: "no-external-calls",
      label: "No external calls",
      detail: "Model, provider, and connector calls remain denied.",
      state: "blocked",
    },
    {
      id: "no-persistence",
      label: "No persistence",
      detail: "Approvals, queues, evidence, results, audit, and memory promotion are not persisted from the UI.",
      state: "blocked",
    },
  ],
};

const EVIDENCE_NEEDS: ProjectContextBrainSection = {
  id: "evidence-needs",
  label: "Evidence",
  title: "Evidence needs preview",
  summary:
    "Evidence needs preview lists project map evidence, command evidence, diff evidence, approval evidence, result evidence, audit evidence, and recovery evidence.",
  state: "preview-only",
  items: [
    {
      id: "project-map-evidence",
      label: "Project map evidence",
      detail: "Project map evidence needs guarded backend inspection before it can be trusted.",
      state: "needs-approval",
    },
    {
      id: "command-diff-evidence",
      label: "Command and diff evidence",
      detail: "Command and diff evidence are expected records for future backend-owned runs.",
      state: "preview-only",
    },
    {
      id: "approval-result-audit",
      label: "Approval, result, audit",
      detail: "Approval, result, and audit evidence remain backend-owned future capture.",
      state: "needs-approval",
    },
    {
      id: "recovery-evidence",
      label: "Recovery evidence",
      detail: "Recovery evidence is required before rollback, retry, restore, or manual-review action.",
      state: "needs-approval",
    },
  ],
};

const RESULT_EXPECTATIONS: ProjectContextBrainSection = {
  id: "result-expectations",
  label: "Result",
  title: "Result expectation preview",
  summary:
    "Result expectation preview defines success, blocked, denied, failed, timeout, manual-review, retryable, and recovered expectations for future backend-owned runs.",
  state: "preview-only",
  items: [
    {
      id: "success-blocked-denied",
      label: "Success, blocked, denied",
      detail: "Success requires evidence; blocked and denied are valid safe outcomes.",
      state: "preview-only",
    },
    {
      id: "failed-timeout",
      label: "Failed and timeout",
      detail: "Failure and timeout require result evidence and operator review.",
      state: "preview-only",
    },
    {
      id: "manual-review-retryable",
      label: "Manual review and retryable",
      detail: "Manual-review and retryable states do not trigger automatic retry from the cockpit.",
      state: "blocked",
    },
    {
      id: "recovered",
      label: "Recovered",
      detail: "Recovered is a documented result state for future backend-owned recovery only.",
      state: "needs-approval",
    },
  ],
};

const RECOVERY_IMPLICATIONS: ProjectContextBrainSection = {
  id: "recovery-implications",
  label: "Recovery",
  title: "Recovery implication preview",
  summary:
    "Recovery implication preview explains rollback, retry, restore, stop, explain-failure, manual-review, safety-stop, and partial-recovery implications without executing recovery.",
  state: "preview-only",
  items: [
    {
      id: "rollback-retry-restore",
      label: "Rollback, retry, restore",
      detail: "Rollback, retry, and restore are implications only and need approval.",
      state: "needs-approval",
    },
    {
      id: "stop-explain-failure",
      label: "Stop and explain failure",
      detail: "Stop and explain-failure states are safe review outcomes.",
      state: "preview-only",
    },
    {
      id: "manual-safety-stop",
      label: "Manual review and safety stop",
      detail: "Manual-review and safety-stop hold action until the operator approves the next step.",
      state: "blocked",
    },
    {
      id: "partial-recovery",
      label: "Partial recovery",
      detail: "Partial recovery requires evidence before future backend-owned action.",
      state: "needs-approval",
    },
  ],
};

const CONTEXT_CONFIDENCE: ProjectContextBrainConfidence = {
  known: [
    "Canonical workspace path is supplied by checkpoint context.",
    "The cockpit is the normal user surface.",
    "Phase pages remain dev test diagnostics only.",
  ],
  inferred: [
    "Next, React, TypeScript, and Node are visible as framework/runtime hints.",
    "CodexForge modules and smoke scripts are important context anchors.",
  ],
  unknown: [
    "Live branch, full package metadata, and full dependency graph are not confirmed from the cockpit.",
    "Exact test topology remains unknown until approved backend-owned inspection.",
  ],
  blocked: [
    "Arbitrary file crawling, secret reads, runtime probes, command execution, provider calls, model calls, connector calls, and automatic memory promotion are blocked.",
  ],
  needsApproval: [
    "Backend-owned context inspection needs explicit operator approval before real discovery evidence can exist.",
  ],
};

const COCKPIT_SUMMARY: readonly ProjectContextBrainItem[] = [
  {
    id: "cockpit-project",
    label: "Project",
    detail: "CodexForge thinks this is the health-tracker frontend workspace with CodexForge cockpit routes.",
    state: "known",
  },
  {
    id: "cockpit-stack",
    label: "Stack",
    detail: "Framework/runtime hints point to Next, React, TypeScript, Node, and package tooling candidates.",
    state: "inferred",
  },
  {
    id: "cockpit-files",
    label: "Files",
    detail: "Important files would include package config, routes, cockpit modules, smoke scripts, checkpoint docs, and safety files.",
    state: "preview-only",
  },
  {
    id: "cockpit-commands",
    label: "Commands",
    detail: "Likely command candidates cover build, smoke, validation, and hygiene, but remain review-only.",
    state: "blocked",
  },
  {
    id: "cockpit-risks",
    label: "Risks",
    detail: "Risk zones include file mutation, commands, external calls, secrets, installs, deploys, ports, runtimes, persistence, and recovery.",
    state: "blocked",
  },
  {
    id: "cockpit-evidence",
    label: "Evidence",
    detail: "Evidence expectations cover project map, command, diff, approval, result, audit, and recovery records.",
    state: "needs-approval",
  },
  {
    id: "cockpit-result",
    label: "Result",
    detail: "Result expectations include success, blocked, denied, failed, timeout, manual-review, retryable, and recovered states.",
    state: "preview-only",
  },
  {
    id: "cockpit-recovery",
    label: "Recovery",
    detail: "Recovery implications remain preview-only and cannot run rollback, retry, restore, stop, or partial recovery from the cockpit.",
    state: "blocked",
  },
  {
    id: "cockpit-confidence",
    label: "Confidence",
    detail: "Known, inferred, unknown, blocked, and needs-approval context levels are shown without overclaiming.",
    state: "preview-only",
  },
];

const PROJECT_CONTEXT_BRAIN: ProjectContextBrainModel = {
  contextBrainId: "codexforge-project-context-brain-v1-1402-1417",
  contextBrainKind: "project-context-brain-v1",
  workspaceIdentity: WORKSPACE_IDENTITY,
  projectMap: PROJECT_MAP,
  frameworkRuntimeHints: FRAMEWORK_RUNTIME_HINTS,
  packageToolingHints: PACKAGE_TOOLING_HINTS,
  importantFiles: IMPORTANT_FILES,
  commandCandidates: COMMAND_CANDIDATES,
  riskZones: RISK_ZONES,
  deniedContextBoundaries: DENIED_CONTEXT_BOUNDARIES,
  evidenceNeeds: EVIDENCE_NEEDS,
  resultExpectations: RESULT_EXPECTATIONS,
  recoveryImplications: RECOVERY_IMPLICATIONS,
  contextConfidence: CONTEXT_CONFIDENCE,
  cockpitSummary: COCKPIT_SUMMARY,
  explicitSafetyLimits: EXPLICIT_SAFETY_LIMITS,
};

const ALL_SECTIONS = [
  WORKSPACE_IDENTITY,
  PROJECT_MAP,
  FRAMEWORK_RUNTIME_HINTS,
  PACKAGE_TOOLING_HINTS,
  IMPORTANT_FILES,
  COMMAND_CANDIDATES,
  RISK_ZONES,
  DENIED_CONTEXT_BOUNDARIES,
  EVIDENCE_NEEDS,
  RESULT_EXPECTATIONS,
  RECOVERY_IMPLICATIONS,
] as const;

const ROUTES: readonly ProjectContextBrainRouteDefinition[] = [
  {
    slug: "codexforge-cockpit",
    href: "/codexforge-cockpit",
    phase: "Project Context Brain v1",
    title: "Cockpit project context summary",
    commandLabel: "Go to Unified CodexForge Cockpit",
    summary: "Concise cockpit-centered project context brain summary for normal users.",
    markerPhrases: PROJECT_CONTEXT_BRAIN_COCKPIT_MARKERS,
    sectionIds: ALL_SECTIONS.map((section) => section.id),
    devOnly: false,
  },
  {
    slug: "project-context-brain-boundary",
    href: "/project-context-brain-boundary",
    phase: "Phase 1402",
    title: "Project context brain boundary",
    commandLabel: "Go to Project Context Brain Boundary",
    summary: "Project context brain boundary prepares local project understanding without broad execution.",
    markerPhrases: [
      "Project context brain boundary",
      "Project context brain boundary does not crawl arbitrary files from the UI",
      "Project context brain requires explicit operator approval for backend-owned inspection",
      "Project context brain prepares local project understanding without broad execution",
      "Denied project context paths remain blocked",
      "Project context brain checklist",
    ],
    sectionIds: ["denied-context-boundaries", "workspace-identity", "project-map"],
    devOnly: true,
  },
  {
    slug: "workspace-identity-packet",
    href: "/workspace-identity-packet",
    phase: "Phase 1403",
    title: "Workspace identity packet",
    commandLabel: "Go to Workspace Identity Packet",
    summary: "Workspace identity packet previews root path, project name, branch hint, package hint, and workspace boundary.",
    markerPhrases: [
      "Workspace identity packet",
      "Workspace identity packet does not read secrets",
      "Workspace identity packet requires explicit operator approval for backend-owned inspection",
      "Workspace identity previews root path project name branch hint package hint and workspace boundary",
      "Denied workspace identity paths remain blocked",
      "Workspace identity checklist",
    ],
    sectionIds: ["workspace-identity", "denied-context-boundaries", "context-confidence"],
    devOnly: true,
  },
  {
    slug: "project-map-preview",
    href: "/project-map-preview",
    phase: "Phase 1404",
    title: "Project map preview",
    commandLabel: "Go to Project Map Preview",
    summary: "Project map preview shows expected project areas without live UI crawling.",
    markerPhrases: [
      "Project map preview",
      "Project map preview does not browse arbitrary files from the UI",
      "Project map preview requires explicit operator approval for backend-owned inspection",
      "Project map previews app folders source folders config folders scripts docs tests and diagnostics without live UI crawling",
      "Denied project map paths remain blocked",
      "Project map checklist",
    ],
    sectionIds: ["project-map", "important-files", "denied-context-boundaries"],
    devOnly: true,
  },
  {
    slug: "framework-runtime-detection-preview",
    href: "/framework-runtime-detection-preview",
    phase: "Phase 1405",
    title: "Framework runtime detection preview",
    commandLabel: "Go to Framework Runtime Detection Preview",
    summary: "Framework runtime detection preview shows likely stack hints without starting runtimes.",
    markerPhrases: [
      "Framework runtime detection preview",
      "Framework runtime detection preview does not execute runtime probes",
      "Framework runtime detection preview requires explicit operator approval",
      "Framework runtime detection previews Next React TypeScript Node package manager and local runtime hints without starting runtimes",
      "Denied framework runtime detection paths remain blocked",
      "Framework runtime detection checklist",
    ],
    sectionIds: ["framework-runtime-hints", "package-tooling-hints", "risk-zones"],
    devOnly: true,
  },
  {
    slug: "package-tooling-detection-preview",
    href: "/package-tooling-detection-preview",
    phase: "Phase 1406",
    title: "Package tooling detection preview",
    commandLabel: "Go to Package Tooling Detection Preview",
    summary: "Package tooling detection preview lists script and dependency hints without package installs.",
    markerPhrases: [
      "Package tooling detection preview",
      "Package tooling detection preview does not install packages or run package scripts",
      "Package tooling detection preview requires explicit operator approval",
      "Package tooling detection previews package manager scripts build commands smoke commands lint commands and dependency risk hints",
      "Denied package tooling paths remain blocked",
      "Package tooling checklist",
    ],
    sectionIds: ["package-tooling-hints", "command-candidates", "risk-zones"],
    devOnly: true,
  },
  {
    slug: "important-files-preview",
    href: "/important-files-preview",
    phase: "Phase 1407",
    title: "Important files preview",
    commandLabel: "Go to Important Files Preview",
    summary: "Important files preview lists context anchors without arbitrary file opening.",
    markerPhrases: [
      "Important files preview",
      "Important files preview does not open arbitrary files from the UI",
      "Important files preview requires explicit operator approval",
      "Important files preview highlights package config routes cockpit modules smoke scripts checkpoint docs and safety files",
      "Denied important file paths remain blocked",
      "Important files checklist",
    ],
    sectionIds: ["important-files", "project-map", "denied-context-boundaries"],
    devOnly: true,
  },
  {
    slug: "command-candidate-preview",
    href: "/command-candidate-preview",
    phase: "Phase 1408",
    title: "Command candidate preview",
    commandLabel: "Go to Command Candidate Preview",
    summary: "Command candidate preview lists likely commands as review-only candidates.",
    markerPhrases: [
      "Command candidate preview",
      "Command candidate preview does not run commands",
      "Command candidate preview requires explicit operator approval",
      "Command candidate preview lists likely build smoke validation and hygiene commands as review-only candidates",
      "Denied command candidate paths remain blocked",
      "Command candidate checklist",
    ],
    sectionIds: ["command-candidates", "package-tooling-hints", "risk-zones"],
    devOnly: true,
  },
  {
    slug: "risk-zone-preview",
    href: "/risk-zone-preview",
    phase: "Phase 1409",
    title: "Risk zone preview",
    commandLabel: "Go to Risk Zone Preview",
    summary: "Risk zone preview highlights areas requiring guarded backend ownership.",
    markerPhrases: [
      "Risk zone preview",
      "Risk zone preview does not execute safety scans from the UI",
      "Risk zone preview requires explicit operator approval",
      "Risk zone preview highlights file mutation command execution provider calls connector calls secrets installs deploys ports runtimes persistence and recovery risks",
      "Denied risk zone paths remain blocked",
      "Risk zone checklist",
    ],
    sectionIds: ["risk-zones", "denied-context-boundaries", "evidence-needs"],
    devOnly: true,
  },
  {
    slug: "denied-context-boundary",
    href: "/denied-context-boundary",
    phase: "Phase 1410",
    title: "Denied context boundary",
    commandLabel: "Go to Denied Context Boundary",
    summary: "Denied context boundary defines what Project Context Brain v1 cannot do from the frontend.",
    markerPhrases: [
      "Denied context boundary",
      "Denied context boundary does not mutate workflow state",
      "Denied context boundary requires explicit operator approval",
      "Denied context boundary blocks arbitrary browsing secrets environment values provider calls connectors model calls commands writes installs deploys ports runtimes persistence and automatic memory promotion",
      "Denied context paths remain blocked",
      "Denied context checklist",
    ],
    sectionIds: ["denied-context-boundaries", "risk-zones", "context-confidence"],
    devOnly: true,
  },
  {
    slug: "evidence-needs-preview",
    href: "/evidence-needs-preview",
    phase: "Phase 1411",
    title: "Evidence needs preview",
    commandLabel: "Go to Evidence Needs Preview",
    summary: "Evidence needs preview lists evidence categories for future backend-owned runs.",
    markerPhrases: [
      "Evidence needs preview",
      "Evidence needs preview does not persist evidence from the UI",
      "Evidence needs preview requires explicit operator approval",
      "Evidence needs preview lists project map evidence command evidence diff evidence approval evidence result evidence audit evidence and recovery evidence",
      "Denied evidence needs paths remain blocked",
      "Evidence needs checklist",
    ],
    sectionIds: ["evidence-needs", "result-expectations", "denied-context-boundaries"],
    devOnly: true,
  },
  {
    slug: "result-expectation-preview",
    href: "/result-expectation-preview",
    phase: "Phase 1412",
    title: "Result expectation preview",
    commandLabel: "Go to Result Expectation Preview",
    summary: "Result expectation preview names expected future backend-owned result states.",
    markerPhrases: [
      "Result expectation preview",
      "Result expectation preview does not persist results from the UI",
      "Result expectation preview requires explicit operator approval",
      "Result expectation preview defines success blocked denied failed timeout manual-review retryable and recovered expectations for future backend-owned runs",
      "Denied result expectation paths remain blocked",
      "Result expectation checklist",
    ],
    sectionIds: ["result-expectations", "evidence-needs", "recovery-implications"],
    devOnly: true,
  },
  {
    slug: "recovery-implication-preview",
    href: "/recovery-implication-preview",
    phase: "Phase 1413",
    title: "Recovery implication preview",
    commandLabel: "Go to Recovery Implication Preview",
    summary: "Recovery implication preview explains recovery states without executing recovery.",
    markerPhrases: [
      "Recovery implication preview",
      "Recovery implication preview does not execute recovery",
      "Recovery implication preview requires explicit operator approval",
      "Recovery implication preview explains rollback retry restore stop explain-failure manual-review safety-stop and partial-recovery implications",
      "Denied recovery implication paths remain blocked",
      "Recovery implication checklist",
    ],
    sectionIds: ["recovery-implications", "result-expectations", "risk-zones"],
    devOnly: true,
  },
  {
    slug: "context-confidence-review",
    href: "/context-confidence-review",
    phase: "Phase 1414",
    title: "Context confidence review",
    commandLabel: "Go to Context Confidence Review",
    summary: "Context confidence review separates known, inferred, unknown, blocked, and needs-approval levels.",
    markerPhrases: [
      "Context confidence review",
      "Context confidence review does not overclaim project understanding",
      "Context confidence review requires explicit operator approval for backend-owned inspection",
      "Context confidence review shows known inferred unknown blocked and needs-approval context levels",
      "Denied context confidence paths remain blocked",
      "Context confidence checklist",
    ],
    sectionIds: ["workspace-identity", "framework-runtime-hints", "denied-context-boundaries"],
    devOnly: true,
  },
  {
    slug: "cockpit-project-context-summary",
    href: "/cockpit-project-context-summary",
    phase: "Phase 1415",
    title: "Cockpit project context summary",
    commandLabel: "Go to Cockpit Project Context Summary",
    summary: "Cockpit project context summary keeps the cockpit as the normal user surface.",
    markerPhrases: [
      "Cockpit project context summary",
      "Cockpit project context summary keeps the cockpit as the normal user surface",
      "Cockpit project context summary does not broaden execution",
      "Cockpit project context summary shows project stack files commands risks evidence result recovery and confidence",
      "Phase pages remain dev test diagnostics only",
      "Cockpit project context checklist",
    ],
    sectionIds: ["workspace-identity", "framework-runtime-hints", "important-files", "command-candidates", "risk-zones", "evidence-needs", "result-expectations", "recovery-implications"],
    devOnly: true,
  },
  {
    slug: "first-project-context-brain-candidate",
    href: "/first-project-context-brain-candidate",
    phase: "Phase 1416",
    title: "First project context brain candidate",
    commandLabel: "Go to First Project Context Brain Candidate",
    summary: "First project context brain candidate combines workspace identity, map, stack, tooling, files, commands, risks, evidence, result, recovery, and confidence.",
    markerPhrases: [
      "First project context brain candidate",
      "First project context brain candidate does not execute inspection from the frontend",
      "First project context brain candidate requires explicit operator approval",
      "Candidate combines workspace identity project map framework runtime package tooling important files command candidates risk zones evidence result recovery and confidence",
      "Denied first project context brain paths remain blocked",
      "First project context brain checklist",
    ],
    sectionIds: ALL_SECTIONS.map((section) => section.id),
    devOnly: true,
  },
  {
    slug: "controlled-project-context-brain-release-candidate",
    href: "/controlled-project-context-brain-release-candidate",
    phase: "Phase 1417",
    title: "Controlled project context brain release candidate",
    commandLabel: "Go to Controlled Project Context Brain Release Candidate",
    summary: "Controlled project context brain release candidate prepares backend-owned project context inspection without broad execution.",
    markerPhrases: [
      "Controlled project context brain release candidate",
      "Controlled project context brain release candidate does not call models browse arbitrary files write files run commands persist approvals create queues persist evidence results audit or promote memory from the frontend",
      "Controlled project context brain release requires explicit operator approval",
      "Release candidate prepares CodexForge for backend-owned project context inspection without broad execution",
      "Denied controlled project context brain paths remain blocked",
      "Controlled project context brain release checklist",
    ],
    sectionIds: ALL_SECTIONS.map((section) => section.id),
    devOnly: true,
  },
] as const;

export function buildProjectContextBrainStableKey(parts: readonly string[]): string {
  return parts.join(":").toLowerCase().replace(/[^a-z0-9:/-]+/g, "-");
}

export function listProjectContextBrainRouteDefinitions(): readonly ProjectContextBrainRouteDefinition[] {
  return ROUTES;
}

export function getProjectContextBrainRouteDefinition(
  slug: ProjectContextBrainRouteSlug
): ProjectContextBrainRouteDefinition {
  return ROUTES.find((candidate) => candidate.slug === slug) ?? ROUTES[0];
}

export function buildProjectContextBrainModel(): ProjectContextBrainModel {
  return PROJECT_CONTEXT_BRAIN;
}

export function buildProjectContextBrainRouteModel(
  slug: ProjectContextBrainRouteSlug = "codexforge-cockpit"
): ProjectContextBrainRouteModel {
  const route = getProjectContextBrainRouteDefinition(slug);
  const sections = route.sectionIds
    .map((sectionId) => ALL_SECTIONS.find((section) => section.id === sectionId))
    .filter((section): section is ProjectContextBrainSection => Boolean(section));

  return {
    route,
    contextBrain: PROJECT_CONTEXT_BRAIN,
    sections: sections.length > 0 ? sections : ALL_SECTIONS,
    diagnosticRoutes: ROUTES.filter((candidate) => candidate.devOnly),
    cockpitMarkers: PROJECT_CONTEXT_BRAIN_COCKPIT_MARKERS,
    summary: summarizeProjectContextBrainRoute(route),
  };
}

export function summarizeProjectContextBrainRouteModel(model: ProjectContextBrainRouteModel): string {
  return [
    model.route.phase,
    model.route.title,
    model.route.summary,
    model.contextBrain.contextBrainId,
    "cockpit is the normal user surface",
    "phase pages remain dev test diagnostics only",
    "broad execution still blocked",
  ].join(" | ");
}

function summarizeProjectContextBrainRoute(route: ProjectContextBrainRouteDefinition): string {
  return [route.phase, route.title, route.summary, "Explicit operator approval remains required"].join(" | ");
}
