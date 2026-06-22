export type CockpitEvidenceResultRecoveryRouteSlug =
  | "codexforge-cockpit"
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

export type CockpitEvidenceResultRecoveryPanelState = "blocked" | "preview-only" | "approval-required" | "dev-test-only";

export type CockpitEvidenceResultRecoveryItem = {
  id: string;
  label: string;
  detail: string;
  state: CockpitEvidenceResultRecoveryPanelState;
};

export type CockpitEvidenceResultRecoverySurface = {
  id: string;
  title: string;
  eyebrow: string;
  state: CockpitEvidenceResultRecoveryPanelState;
  body: string;
  items: readonly CockpitEvidenceResultRecoveryItem[];
  placeholders: readonly string[];
};

export type CockpitEvidenceResultRecoveryRouteDefinition = {
  slug: CockpitEvidenceResultRecoveryRouteSlug;
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

export type CockpitEvidenceResultRecoveryRouteModel = {
  route: CockpitEvidenceResultRecoveryRouteDefinition;
  surfaces: readonly CockpitEvidenceResultRecoverySurface[];
  globalSafetyCopy: readonly string[];
  resultStates: readonly string[];
  recoveryOptions: readonly string[];
  timelineStages: readonly string[];
  exportOptions: readonly string[];
  summary: string;
};

export const CODEXFORGE_COCKPIT_EVIDENCE_RESULT_RECOVERY_LANGUAGE = [
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
].join(" | ");

const GLOBAL_SAFETY_COPY = [
  "Evidence result and recovery remain preview-only.",
  "No evidence persistence from the cockpit.",
  "No result persistence from the cockpit.",
  "No recovery execution from the cockpit.",
  "Future evidence persistence requires explicit operator approval.",
  "Future result persistence requires explicit operator approval.",
  "Future rollback retry restore export command and file mutation remain blocked until approved.",
  "No models, providers, connectors, adapters, runtimes, commands, file writes, exports, recovery, or persistence are started from these surfaces.",
] as const;

const RESULT_STATES = ["success", "denied", "blocked", "failed", "timeout", "needs-review"] as const;

const RECOVERY_OPTIONS = ["rollback", "retry", "stop", "restore", "explain", "manual-review"] as const;

const TIMELINE_STAGES = ["goal", "plan", "approval", "execution", "evidence", "result", "recovery"] as const;

const EXPORT_OPTIONS = ["markdown preview", "json preview", "bundle preview"] as const;

const SURFACES: readonly CockpitEvidenceResultRecoverySurface[] = [
  {
    id: "evidence-stream",
    title: "Cockpit evidence stream",
    eyebrow: "Phase 1211",
    state: "preview-only",
    body: "Evidence stream lists planned file, command, approval, operator, and timestamp placeholders without persistence.",
    items: [
      {
        id: "evidence-stream-planned-file",
        label: "Planned file evidence",
        detail: "Path, diff, approval, and rollback placeholders stay review-only.",
        state: "preview-only",
      },
      {
        id: "evidence-stream-planned-command",
        label: "Planned command evidence",
        detail: "Command, working directory, stdout, stderr, and exit-code placeholders are not captured output.",
        state: "preview-only",
      },
      {
        id: "evidence-stream-approval-needed",
        label: "Persistence blocked",
        detail: "Future evidence persistence requires explicit operator approval.",
        state: "blocked",
      },
    ],
    placeholders: ["planned file placeholder", "planned command placeholder", "approval placeholder", "operator placeholder", "timestamp placeholder"],
  },
  {
    id: "file-evidence",
    title: "Cockpit file evidence view",
    eyebrow: "Phase 1212",
    state: "blocked",
    body: "File evidence shows path guard, diff, before, after, approval, and rollback placeholders without writing files.",
    items: [
      {
        id: "file-evidence-path-guard",
        label: "Path guard placeholder",
        detail: "Target path review is static and cannot browse arbitrary files or mutate paths.",
        state: "blocked",
      },
      {
        id: "file-evidence-before-after",
        label: "Before and after placeholders",
        detail: "Before and after content are review labels, not captured snapshots.",
        state: "preview-only",
      },
      {
        id: "file-evidence-rollback",
        label: "Rollback placeholder",
        detail: "Rollback remains a future approved recovery contract, not an executable action.",
        state: "blocked",
      },
    ],
    placeholders: ["path guard placeholder", "diff placeholder", "before placeholder", "after placeholder", "approval placeholder", "rollback placeholder"],
  },
  {
    id: "command-evidence",
    title: "Cockpit command evidence view",
    eyebrow: "Phase 1213",
    state: "blocked",
    body: "Command evidence shows command, stdout, stderr, exit code, working directory, and approval placeholders without running commands.",
    items: [
      {
        id: "command-evidence-command",
        label: "Command placeholder",
        detail: "The command string is static review copy and cannot execute.",
        state: "blocked",
      },
      {
        id: "command-evidence-output",
        label: "Output placeholders",
        detail: "stdout, stderr, and exit code are planned evidence fields, not runtime output.",
        state: "preview-only",
      },
      {
        id: "command-evidence-working-directory",
        label: "Working directory placeholder",
        detail: "Working directory review stays behind future explicit approval and guards.",
        state: "approval-required",
      },
    ],
    placeholders: ["command placeholder", "stdout placeholder", "stderr placeholder", "exit code placeholder", "working directory placeholder", "approval placeholder"],
  },
  {
    id: "result-summary",
    title: "Cockpit result summary",
    eyebrow: "Phase 1214",
    state: "preview-only",
    body: "Result summary supports success, denied, blocked, failed, timeout, and needs-review states without result persistence.",
    items: [
      {
        id: "result-summary-states",
        label: "Outcome states visible",
        detail: "success, denied, blocked, failed, timeout, and needs-review are deterministic preview states.",
        state: "preview-only",
      },
      {
        id: "result-summary-no-storage",
        label: "Result persistence blocked",
        detail: "No result or output is stored from the cockpit.",
        state: "blocked",
      },
      {
        id: "result-summary-approval",
        label: "Approval before future persistence",
        detail: "Future result persistence requires explicit operator approval.",
        state: "approval-required",
      },
    ],
    placeholders: ["success placeholder", "denied placeholder", "blocked placeholder", "failed placeholder", "timeout placeholder", "needs-review placeholder"],
  },
  {
    id: "result-decision",
    title: "Cockpit result decision view",
    eyebrow: "Phase 1215",
    state: "approval-required",
    body: "Result decision shows accept, retry, rollback, explain, and needs-review options as previews without automatic decisions.",
    items: [
      {
        id: "result-decision-accept",
        label: "Accept preview",
        detail: "Accept is a reviewed outcome label and does not persist a decision.",
        state: "preview-only",
      },
      {
        id: "result-decision-retry-rollback",
        label: "Retry and rollback previews",
        detail: "Retry and rollback remain blocked until future explicit approval.",
        state: "blocked",
      },
      {
        id: "result-decision-explain",
        label: "Explain preview",
        detail: "Failure explanation is deterministic copy and does not call models.",
        state: "preview-only",
      },
    ],
    placeholders: ["accept preview", "retry preview", "rollback preview", "explain preview", "needs-review preview"],
  },
  {
    id: "recovery-options",
    title: "Cockpit recovery options",
    eyebrow: "Phase 1216",
    state: "blocked",
    body: "Recovery options include rollback, retry, stop, restore, explain, and manual-review previews without executing recovery.",
    items: [
      {
        id: "recovery-options-rollback",
        label: "Rollback preview",
        detail: "Rollback remains blocked until explicit operator approval.",
        state: "blocked",
      },
      {
        id: "recovery-options-retry",
        label: "Retry preview",
        detail: "Retry remains a planned option and does not start a command or file-write attempt.",
        state: "blocked",
      },
      {
        id: "recovery-options-manual",
        label: "Manual review preview",
        detail: "Manual review is the safe fallback when recovery cannot be approved.",
        state: "approval-required",
      },
    ],
    placeholders: ["rollback option", "retry option", "stop option", "restore option", "explain option", "manual-review option"],
  },
  {
    id: "rollback-preview",
    title: "Cockpit rollback preview view",
    eyebrow: "Phase 1217",
    state: "blocked",
    body: "Rollback preview shows reverse file write and restore plan language without mutation.",
    items: [
      {
        id: "rollback-preview-reverse-write",
        label: "Reverse file write preview",
        detail: "Reverse write steps are displayed as review-only placeholders.",
        state: "blocked",
      },
      {
        id: "rollback-preview-restore-plan",
        label: "Restore plan preview",
        detail: "Restore plan stays blocked until future approval and evidence exist.",
        state: "blocked",
      },
    ],
    placeholders: ["reverse file write placeholder", "restore plan placeholder", "approval placeholder", "no mutation placeholder"],
  },
  {
    id: "retry-preview",
    title: "Cockpit retry preview view",
    eyebrow: "Phase 1218",
    state: "blocked",
    body: "Retry preview shows guarded command retry and file-write retry as blocked previews.",
    items: [
      {
        id: "retry-preview-command",
        label: "Guarded command retry preview",
        detail: "Command retry does not execute and remains behind approval.",
        state: "blocked",
      },
      {
        id: "retry-preview-file",
        label: "File-write retry preview",
        detail: "File-write retry does not mutate files and remains behind approval.",
        state: "blocked",
      },
    ],
    placeholders: ["guarded command retry placeholder", "file-write retry placeholder", "blocked retry placeholder"],
  },
  {
    id: "explain-failure",
    title: "Cockpit explain failure view",
    eyebrow: "Phase 1219",
    state: "preview-only",
    body: "Explain failure shows deterministic failure categories without provider calls or model assistance.",
    items: [
      {
        id: "explain-failure-policy",
        label: "Policy block category",
        detail: "Explains denied approval, blocked path, or missing guard as deterministic copy.",
        state: "preview-only",
      },
      {
        id: "explain-failure-runtime",
        label: "Runtime unavailable category",
        detail: "Explains runtime unavailable as a category without probing local runtimes.",
        state: "preview-only",
      },
      {
        id: "explain-failure-model-blocked",
        label: "Model assistance blocked",
        detail: "Future model assistance requires explicit operator approval.",
        state: "blocked",
      },
    ],
    placeholders: ["policy block", "missing approval", "guard mismatch", "timeout", "manual review"],
  },
  {
    id: "audit-trail",
    title: "Cockpit audit trail",
    eyebrow: "Phase 1220",
    state: "preview-only",
    body: "Audit trail shows approval, evidence, result, recovery, and operator placeholders without persisting audit logs.",
    items: [
      {
        id: "audit-trail-approval",
        label: "Approval placeholder",
        detail: "Approval references are planned audit fields and do not persist decisions.",
        state: "approval-required",
      },
      {
        id: "audit-trail-evidence-result",
        label: "Evidence and result placeholders",
        detail: "Evidence and result references are preview-only.",
        state: "preview-only",
      },
      {
        id: "audit-trail-no-logs",
        label: "Audit persistence blocked",
        detail: "No audit log is written from the cockpit.",
        state: "blocked",
      },
    ],
    placeholders: ["approval placeholder", "evidence placeholder", "result placeholder", "recovery placeholder", "operator placeholder"],
  },
  {
    id: "run-timeline",
    title: "Cockpit run timeline",
    eyebrow: "Phase 1221",
    state: "preview-only",
    body: "Run timeline shows goal, plan, approval, execution, evidence, result, and recovery stages without creating run records.",
    items: [
      {
        id: "run-timeline-stages",
        label: "End-to-end stages",
        detail: "Goal, plan, approval, execution, evidence, result, and recovery are visible in one sequence.",
        state: "preview-only",
      },
      {
        id: "run-timeline-no-record",
        label: "Run records blocked",
        detail: "No run record is created or persisted from the cockpit.",
        state: "blocked",
      },
    ],
    placeholders: ["goal stage", "plan stage", "approval stage", "execution stage", "evidence stage", "result stage", "recovery stage"],
  },
  {
    id: "evidence-export-preview",
    title: "Cockpit evidence export preview",
    eyebrow: "Phase 1222",
    state: "blocked",
    body: "Evidence export preview shows markdown, json, and bundle options as blocked previews without writing export files.",
    items: [
      {
        id: "evidence-export-markdown",
        label: "Markdown preview",
        detail: "Markdown export is a blocked option label.",
        state: "blocked",
      },
      {
        id: "evidence-export-json",
        label: "Json preview",
        detail: "Json export is a blocked option label.",
        state: "blocked",
      },
      {
        id: "evidence-export-bundle",
        label: "Bundle preview",
        detail: "Bundle export is a blocked option label.",
        state: "blocked",
      },
    ],
    placeholders: ["markdown preview", "json preview", "bundle preview", "export approval placeholder"],
  },
  {
    id: "recovery-safety-gate",
    title: "Cockpit recovery safety gate",
    eyebrow: "Phase 1223",
    state: "approval-required",
    body: "Recovery safety gate blocks rollback, retry, restore, export, command, and file mutation until approved.",
    items: [
      {
        id: "recovery-safety-actions-blocked",
        label: "Recovery actions blocked",
        detail: "Rollback, retry, restore, and export cannot run from the cockpit.",
        state: "blocked",
      },
      {
        id: "recovery-safety-execution-blocked",
        label: "Execution arms blocked",
        detail: "Command and file mutation remain blocked until explicit operator approval.",
        state: "blocked",
      },
      {
        id: "recovery-safety-approval",
        label: "Approval required",
        detail: "Future recovery release requires explicit operator approval and evidence.",
        state: "approval-required",
      },
    ],
    placeholders: ["rollback blocked", "retry blocked", "restore blocked", "export blocked", "command blocked", "file mutation blocked"],
  },
] as const;

const ROUTES: readonly CockpitEvidenceResultRecoveryRouteDefinition[] = [
  {
    slug: "codexforge-cockpit",
    href: "/codexforge-cockpit",
    phase: "Cockpit",
    title: "Cockpit evidence result recovery overview",
    commandLabel: "Go to Unified CodexForge Cockpit",
    summary: "Unified CodexForge Cockpit now previews evidence stream result summary recovery options audit trail run timeline and export preview.",
    markerPhrases: [
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
    ],
    deniedCopy: "Denied cockpit evidence result recovery paths remain blocked from persistence, export, rollback, retry, recovery, command execution, and file mutation.",
    approvalCopy: "Future evidence, result, export, rollback, retry, recovery, command, or file mutation actions require explicit operator approval.",
    surfaceIds: [
      "evidence-stream",
      "file-evidence",
      "command-evidence",
      "result-summary",
      "result-decision",
      "recovery-options",
      "rollback-preview",
      "retry-preview",
      "explain-failure",
      "audit-trail",
      "run-timeline",
      "evidence-export-preview",
      "recovery-safety-gate",
    ],
    devOnly: false,
  },
  {
    slug: "cockpit-evidence-result-recovery-boundary",
    href: "/cockpit-evidence-result-recovery-boundary",
    phase: "Phase 1210",
    title: "Cockpit evidence result recovery boundary",
    commandLabel: "Go to Cockpit Evidence Result Recovery Boundary",
    summary: "Cockpit unifies evidence result and recovery in one place.",
    markerPhrases: [
      "Cockpit evidence result recovery boundary",
      "Cockpit evidence result recovery boundary does not persist evidence results or recovery actions",
      "Cockpit evidence result recovery requires explicit operator approval",
      "Cockpit unifies evidence result and recovery in one place",
      "Denied cockpit evidence result recovery paths remain blocked",
      "Cockpit evidence result recovery checklist",
    ],
    deniedCopy: "Denied cockpit evidence result recovery paths remain blocked.",
    approvalCopy: "Cockpit evidence result recovery requires explicit operator approval before future persistence or recovery.",
    surfaceIds: ["evidence-stream", "result-summary", "recovery-options", "audit-trail", "run-timeline", "recovery-safety-gate"],
    devOnly: true,
  },
  {
    slug: "cockpit-evidence-stream-model",
    href: "/cockpit-evidence-stream-model",
    phase: "Phase 1211",
    title: "Cockpit evidence stream model",
    commandLabel: "Go to Cockpit Evidence Stream Model",
    summary: "Evidence stream shows planned file command approval operator and timestamp placeholders.",
    markerPhrases: [
      "Cockpit evidence stream model",
      "Cockpit evidence stream model does not persist evidence",
      "Evidence stream requires explicit operator approval before future persistence",
      "Evidence stream shows planned file command approval operator and timestamp placeholders",
      "Denied cockpit evidence stream paths remain blocked",
      "Cockpit evidence stream checklist",
    ],
    deniedCopy: "Denied cockpit evidence stream paths remain blocked.",
    approvalCopy: "Evidence stream requires explicit operator approval before future persistence.",
    surfaceIds: ["evidence-stream", "audit-trail", "run-timeline"],
    devOnly: true,
  },
  {
    slug: "cockpit-file-evidence-view",
    href: "/cockpit-file-evidence-view",
    phase: "Phase 1212",
    title: "Cockpit file evidence view",
    commandLabel: "Go to Cockpit File Evidence View",
    summary: "File evidence view shows path guard diff before after approval and rollback placeholders.",
    markerPhrases: [
      "Cockpit file evidence view",
      "Cockpit file evidence view does not write files or persist evidence",
      "File evidence view requires explicit operator approval before future persistence",
      "File evidence view shows path guard diff before after approval and rollback placeholders",
      "Denied cockpit file evidence paths remain blocked",
      "Cockpit file evidence checklist",
    ],
    deniedCopy: "Denied cockpit file evidence paths remain blocked.",
    approvalCopy: "File evidence view requires explicit operator approval before future persistence.",
    surfaceIds: ["file-evidence", "evidence-stream", "rollback-preview", "recovery-safety-gate"],
    devOnly: true,
  },
  {
    slug: "cockpit-command-evidence-view",
    href: "/cockpit-command-evidence-view",
    phase: "Phase 1213",
    title: "Cockpit command evidence view",
    commandLabel: "Go to Cockpit Command Evidence View",
    summary: "Command evidence view shows command stdout stderr exit code working directory and approval placeholders.",
    markerPhrases: [
      "Cockpit command evidence view",
      "Cockpit command evidence view does not run commands or persist evidence",
      "Command evidence view requires explicit operator approval before future persistence",
      "Command evidence view shows command stdout stderr exit code working directory and approval placeholders",
      "Denied cockpit command evidence paths remain blocked",
      "Cockpit command evidence checklist",
    ],
    deniedCopy: "Denied cockpit command evidence paths remain blocked.",
    approvalCopy: "Command evidence view requires explicit operator approval before future persistence.",
    surfaceIds: ["command-evidence", "evidence-stream", "retry-preview", "recovery-safety-gate"],
    devOnly: true,
  },
  {
    slug: "cockpit-result-summary-model",
    href: "/cockpit-result-summary-model",
    phase: "Phase 1214",
    title: "Cockpit result summary model",
    commandLabel: "Go to Cockpit Result Summary Model",
    summary: "Result summary supports success denied blocked failed timeout and needs-review states.",
    markerPhrases: [
      "Cockpit result summary model",
      "Cockpit result summary model does not persist results",
      "Result summary requires explicit operator approval before future persistence",
      "Result summary supports success denied blocked failed timeout and needs-review states",
      "Denied cockpit result summary paths remain blocked",
      "Cockpit result summary checklist",
    ],
    deniedCopy: "Denied cockpit result summary paths remain blocked.",
    approvalCopy: "Result summary requires explicit operator approval before future persistence.",
    surfaceIds: ["result-summary", "result-decision", "audit-trail"],
    devOnly: true,
  },
  {
    slug: "cockpit-result-decision-view",
    href: "/cockpit-result-decision-view",
    phase: "Phase 1215",
    title: "Cockpit result decision view",
    commandLabel: "Go to Cockpit Result Decision View",
    summary: "Result decision shows accept retry rollback explain and needs-review options as previews.",
    markerPhrases: [
      "Cockpit result decision view",
      "Cockpit result decision view does not make automatic decisions",
      "Result decision requires explicit operator approval before future action",
      "Result decision shows accept retry rollback explain and needs-review options as previews",
      "Denied cockpit result decision paths remain blocked",
      "Cockpit result decision checklist",
    ],
    deniedCopy: "Denied cockpit result decision paths remain blocked.",
    approvalCopy: "Result decision requires explicit operator approval before future action.",
    surfaceIds: ["result-decision", "result-summary", "recovery-options", "explain-failure"],
    devOnly: true,
  },
  {
    slug: "cockpit-recovery-option-model",
    href: "/cockpit-recovery-option-model",
    phase: "Phase 1216",
    title: "Cockpit recovery option model",
    commandLabel: "Go to Cockpit Recovery Option Model",
    summary: "Recovery options include rollback retry stop restore explain and manual-review previews.",
    markerPhrases: [
      "Cockpit recovery option model",
      "Cockpit recovery option model does not execute recovery",
      "Recovery option requires explicit operator approval before future recovery",
      "Recovery options include rollback retry stop restore explain and manual-review previews",
      "Denied cockpit recovery option paths remain blocked",
      "Cockpit recovery option checklist",
    ],
    deniedCopy: "Denied cockpit recovery option paths remain blocked.",
    approvalCopy: "Recovery option requires explicit operator approval before future recovery.",
    surfaceIds: ["recovery-options", "rollback-preview", "retry-preview", "explain-failure", "recovery-safety-gate"],
    devOnly: true,
  },
  {
    slug: "cockpit-rollback-preview-view",
    href: "/cockpit-rollback-preview-view",
    phase: "Phase 1217",
    title: "Cockpit rollback preview view",
    commandLabel: "Go to Cockpit Rollback Preview View",
    summary: "Rollback preview shows reverse file write and restore plan without mutation.",
    markerPhrases: [
      "Cockpit rollback preview view",
      "Cockpit rollback preview view does not execute rollback",
      "Rollback preview requires explicit operator approval before future rollback",
      "Rollback preview shows reverse file write and restore plan without mutation",
      "Denied cockpit rollback paths remain blocked",
      "Cockpit rollback preview checklist",
    ],
    deniedCopy: "Denied cockpit rollback paths remain blocked.",
    approvalCopy: "Rollback preview requires explicit operator approval before future rollback.",
    surfaceIds: ["rollback-preview", "file-evidence", "recovery-safety-gate"],
    devOnly: true,
  },
  {
    slug: "cockpit-retry-preview-view",
    href: "/cockpit-retry-preview-view",
    phase: "Phase 1218",
    title: "Cockpit retry preview view",
    commandLabel: "Go to Cockpit Retry Preview View",
    summary: "Retry preview shows guarded command retry and file-write retry as blocked previews.",
    markerPhrases: [
      "Cockpit retry preview view",
      "Cockpit retry preview view does not execute retry",
      "Retry preview requires explicit operator approval before future retry",
      "Retry preview shows guarded command retry and file-write retry as blocked previews",
      "Denied cockpit retry paths remain blocked",
      "Cockpit retry preview checklist",
    ],
    deniedCopy: "Denied cockpit retry paths remain blocked.",
    approvalCopy: "Retry preview requires explicit operator approval before future retry.",
    surfaceIds: ["retry-preview", "command-evidence", "file-evidence", "recovery-safety-gate"],
    devOnly: true,
  },
  {
    slug: "cockpit-explain-failure-view",
    href: "/cockpit-explain-failure-view",
    phase: "Phase 1219",
    title: "Cockpit explain failure view",
    commandLabel: "Go to Cockpit Explain Failure View",
    summary: "Explain failure shows deterministic failure categories without provider calls.",
    markerPhrases: [
      "Cockpit explain failure view",
      "Cockpit explain failure view does not call models",
      "Explain failure requires explicit operator approval before future model assistance",
      "Explain failure shows deterministic failure categories without provider calls",
      "Denied cockpit explain failure paths remain blocked",
      "Cockpit explain failure checklist",
    ],
    deniedCopy: "Denied cockpit explain failure paths remain blocked.",
    approvalCopy: "Explain failure requires explicit operator approval before future model assistance.",
    surfaceIds: ["explain-failure", "result-decision", "audit-trail"],
    devOnly: true,
  },
  {
    slug: "cockpit-audit-trail-view",
    href: "/cockpit-audit-trail-view",
    phase: "Phase 1220",
    title: "Cockpit audit trail view",
    commandLabel: "Go to Cockpit Audit Trail View",
    summary: "Audit trail shows approval evidence result recovery and operator placeholders.",
    markerPhrases: [
      "Cockpit audit trail view",
      "Cockpit audit trail view does not persist audit logs",
      "Audit trail requires explicit operator approval before future persistence",
      "Audit trail shows approval evidence result recovery and operator placeholders",
      "Denied cockpit audit paths remain blocked",
      "Cockpit audit trail checklist",
    ],
    deniedCopy: "Denied cockpit audit paths remain blocked.",
    approvalCopy: "Audit trail requires explicit operator approval before future persistence.",
    surfaceIds: ["audit-trail", "evidence-stream", "result-summary", "recovery-options"],
    devOnly: true,
  },
  {
    slug: "cockpit-run-timeline-view",
    href: "/cockpit-run-timeline-view",
    phase: "Phase 1221",
    title: "Cockpit run timeline view",
    commandLabel: "Go to Cockpit Run Timeline View",
    summary: "Run timeline shows goal plan approval execution evidence result and recovery stages.",
    markerPhrases: [
      "Cockpit run timeline view",
      "Cockpit run timeline view does not create run records",
      "Run timeline requires explicit operator approval before future persistence",
      "Run timeline shows goal plan approval execution evidence result and recovery stages",
      "Denied cockpit run timeline paths remain blocked",
      "Cockpit run timeline checklist",
    ],
    deniedCopy: "Denied cockpit run timeline paths remain blocked.",
    approvalCopy: "Run timeline requires explicit operator approval before future persistence.",
    surfaceIds: ["run-timeline", "evidence-stream", "result-summary", "recovery-options"],
    devOnly: true,
  },
  {
    slug: "cockpit-evidence-export-preview",
    href: "/cockpit-evidence-export-preview",
    phase: "Phase 1222",
    title: "Cockpit evidence export preview",
    commandLabel: "Go to Cockpit Evidence Export Preview",
    summary: "Export preview shows markdown json and bundle options as blocked previews.",
    markerPhrases: [
      "Cockpit evidence export preview",
      "Cockpit evidence export preview does not write export files",
      "Evidence export preview requires explicit operator approval before future export",
      "Export preview shows markdown json and bundle options as blocked previews",
      "Denied cockpit evidence export paths remain blocked",
      "Cockpit evidence export checklist",
    ],
    deniedCopy: "Denied cockpit evidence export paths remain blocked.",
    approvalCopy: "Evidence export preview requires explicit operator approval before future export.",
    surfaceIds: ["evidence-export-preview", "evidence-stream", "audit-trail", "recovery-safety-gate"],
    devOnly: true,
  },
  {
    slug: "cockpit-recovery-safety-gate",
    href: "/cockpit-recovery-safety-gate",
    phase: "Phase 1223",
    title: "Cockpit recovery safety gate",
    commandLabel: "Go to Cockpit Recovery Safety Gate",
    summary: "Recovery safety gate blocks rollback retry restore export command and file mutation until approved.",
    markerPhrases: [
      "Cockpit recovery safety gate",
      "Cockpit recovery safety gate does not release recovery",
      "Recovery safety gate requires explicit operator approval",
      "Recovery safety gate blocks rollback retry restore export command and file mutation until approved",
      "Denied cockpit recovery safety paths remain blocked",
      "Cockpit recovery safety checklist",
    ],
    deniedCopy: "Denied cockpit recovery safety paths remain blocked.",
    approvalCopy: "Recovery safety gate requires explicit operator approval.",
    surfaceIds: ["recovery-safety-gate", "rollback-preview", "retry-preview", "evidence-export-preview"],
    devOnly: true,
  },
  {
    slug: "first-cockpit-evidence-result-recovery-candidate",
    href: "/first-cockpit-evidence-result-recovery-candidate",
    phase: "Phase 1224",
    title: "First cockpit evidence result recovery candidate",
    commandLabel: "Go to First Cockpit Evidence Result Recovery Candidate",
    summary: "Candidate combines evidence stream file evidence command evidence result decision recovery audit timeline and export previews.",
    markerPhrases: [
      "First cockpit evidence result recovery candidate",
      "First cockpit evidence result recovery candidate does not persist evidence results or execute recovery",
      "First cockpit evidence result recovery candidate requires explicit operator approval",
      "Candidate combines evidence stream file evidence command evidence result decision recovery audit timeline and export previews",
      "Denied first cockpit evidence result recovery paths remain blocked",
      "First cockpit evidence result recovery checklist",
    ],
    deniedCopy: "Denied first cockpit evidence result recovery paths remain blocked.",
    approvalCopy: "First cockpit evidence result recovery candidate requires explicit operator approval.",
    surfaceIds: [
      "evidence-stream",
      "file-evidence",
      "command-evidence",
      "result-summary",
      "result-decision",
      "recovery-options",
      "audit-trail",
      "run-timeline",
      "evidence-export-preview",
      "recovery-safety-gate",
    ],
    devOnly: true,
  },
  {
    slug: "controlled-cockpit-evidence-result-recovery-release-candidate",
    href: "/controlled-cockpit-evidence-result-recovery-release-candidate",
    phase: "Phase 1225",
    title: "Controlled cockpit evidence result recovery release candidate",
    commandLabel: "Go to Controlled Cockpit Evidence Result Recovery Release Candidate",
    summary: "Release candidate moves CodexForge toward one cockpit for evidence result and recovery.",
    markerPhrases: [
      "Controlled cockpit evidence result recovery release candidate",
      "Controlled cockpit evidence result recovery release candidate does not call models execute commands write files persist results or execute recovery",
      "Controlled cockpit evidence result recovery release requires explicit operator approval",
      "Release candidate moves CodexForge toward one cockpit for evidence result and recovery",
      "Denied controlled cockpit evidence result recovery paths remain blocked",
      "Controlled cockpit evidence result recovery release checklist",
    ],
    deniedCopy: "Denied controlled cockpit evidence result recovery paths remain blocked.",
    approvalCopy: "Controlled cockpit evidence result recovery release requires explicit operator approval.",
    surfaceIds: [
      "evidence-stream",
      "file-evidence",
      "command-evidence",
      "result-summary",
      "result-decision",
      "recovery-options",
      "rollback-preview",
      "retry-preview",
      "explain-failure",
      "audit-trail",
      "run-timeline",
      "evidence-export-preview",
      "recovery-safety-gate",
    ],
    devOnly: true,
  },
] as const;

export function buildCockpitEvidenceResultRecoveryStableKey(parts: readonly string[]): string {
  return parts.join(":").toLowerCase().replace(/[^a-z0-9:/-]+/g, "-");
}

export function listCockpitEvidenceResultRecoveryRouteDefinitions(): readonly CockpitEvidenceResultRecoveryRouteDefinition[] {
  return ROUTES;
}

export function getCockpitEvidenceResultRecoveryRouteDefinition(
  slug: CockpitEvidenceResultRecoveryRouteSlug
): CockpitEvidenceResultRecoveryRouteDefinition {
  const route = ROUTES.find((candidate) => candidate.slug === slug);
  return route ?? ROUTES[0];
}

export function buildCockpitEvidenceResultRecoveryRouteModel(
  slug: CockpitEvidenceResultRecoveryRouteSlug = "codexforge-cockpit"
): CockpitEvidenceResultRecoveryRouteModel {
  const route = getCockpitEvidenceResultRecoveryRouteDefinition(slug);
  const surfaces = route.surfaceIds
    .map((surfaceId) => SURFACES.find((surface) => surface.id === surfaceId))
    .filter((surface): surface is CockpitEvidenceResultRecoverySurface => Boolean(surface));

  return {
    route,
    surfaces,
    globalSafetyCopy: GLOBAL_SAFETY_COPY,
    resultStates: RESULT_STATES,
    recoveryOptions: RECOVERY_OPTIONS,
    timelineStages: TIMELINE_STAGES,
    exportOptions: EXPORT_OPTIONS,
    summary: summarizeCockpitEvidenceResultRecoveryRoute(route, surfaces),
  };
}

export function buildCockpitEvidenceResultRecoveryModel(): CockpitEvidenceResultRecoveryRouteModel {
  return buildCockpitEvidenceResultRecoveryRouteModel("codexforge-cockpit");
}

export function summarizeCockpitEvidenceResultRecoveryRoute(
  route: CockpitEvidenceResultRecoveryRouteDefinition,
  surfaces: readonly CockpitEvidenceResultRecoverySurface[]
): string {
  return `${route.title} keeps ${surfaces.length} evidence result recovery surfaces preview-only, deterministic, approval-gated, and blocked from persistence or execution.`;
}

export function summarizeCockpitEvidenceResultRecoveryRouteModel(
  model = buildCockpitEvidenceResultRecoveryModel()
): string {
  return model.summary;
}

