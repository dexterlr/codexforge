import type {
  LocalProjectRunbookExportReview,
  LocalProjectRunbookExportReviewBoundary,
  LocalProjectRunbookExportReviewModel,
} from "./local-project-runbook-export-review-types";
import { buildLocalProjectRunbookExportReviewStableKey } from "./local-project-runbook-export-review-types";

export const LOCAL_PROJECT_RUNBOOK_EXPORT_REVIEW_LANGUAGE = [
  "Local project runbook export review",
  "Project runbook export requires review",
  "No runbook file is written from this page",
  "Sensitive data and secrets are excluded",
  "Export format options",
  "Approval requirement",
] as const;

export function buildLocalProjectRunbookExportReview(
  input: Omit<LocalProjectRunbookExportReview, "id"> & { idHint: string }
): LocalProjectRunbookExportReview {
  const { idHint, ...review } = input;
  return {
    id: buildLocalProjectRunbookExportReviewStableKey(
      "local-project-runbook-export-review",
      idHint,
      input.status
    ),
    ...review,
  };
}

export function buildLocalProjectRunbookExportReviews(): LocalProjectRunbookExportReview[] {
  return [
    buildLocalProjectRunbookExportReview({
      idHint: "reviewed-local-project-handoff",
      status: "ready-for-review",
      runbookExportIdentity:
        "Runbook export identity: local-project-runbook-export-review-reviewed-local-project-handoff.",
      sourceSnapshotTimelineDecisionLog:
        "Source snapshot/timeline/decision log: reviewed local project snapshot, change timeline, and decision log must be accepted before runbook handoff.",
      includedProjectSections: [
        "Included project sections: project scope summary.",
        "Included project sections: reviewed files/modules summary.",
        "Included project sections: reviewed change events.",
        "Included project sections: decision summary, rationale summary, unresolved questions, and validation handoff.",
      ],
      excludedSensitiveData: [
        "Excluded sensitive data: secrets, API keys, raw local paths, provider payloads, private connector data, and unreviewed file contents.",
        "Excluded sensitive data: sensitive data and secrets are excluded from the runbook package.",
      ],
      operatorChecklist: [
        "Operator checklist: confirm snapshot review is accepted.",
        "Operator checklist: confirm change timeline review is accepted.",
        "Operator checklist: confirm decision log review is accepted.",
        "Operator checklist: confirm no runbook file is written from this page.",
      ],
      validationHandoff:
        "Validation handoff: runbook package remains review text; validation commands are not run from this page.",
      exportFormatOptions: [
        "Export format options: Markdown handoff text after explicit review.",
        "Export format options: JSON-like review packet for a future approved exporter.",
        "Export format options: operator checklist summary for manual handoff.",
      ],
      approvalRequirement:
        "Approval requirement: project runbook export requires review and a separate approved export boundary before any file is written.",
      nextRecommendedRoute:
        "Next recommended route: /handoff can carry reviewed context without writing a runbook file from this page.",
      blockedReasons: [
        "Project runbook export requires review",
        "No runbook file is written from this page",
        "Sensitive data and secrets are excluded",
      ],
      advancedRunbookDetails:
        "Advanced runbook details: this page does not write runbook files, export files, download files, scan arbitrary local projects, browse local files, crawl paths, read files, open files, read git history, run git commands, run shell commands, run tests, write files, apply patches, delete files, call providers, call connectors, ingest memory, auto-promote memory, mutate Brain graph, call appendEvent, call saveBrainGraph, execute plugins, execute tools, execute agents, create an MCP runtime, start polling loops, create reminders, create schedules, create automations, create background jobs, send notifications, install packages, or vendor Ruflo/Odysseus code.",
    }),
    buildLocalProjectRunbookExportReview({
      idHint: "blocked-missing-decision-log",
      status: "blocked",
      runbookExportIdentity:
        "Runbook export identity: local-project-runbook-export-review-blocked-missing-decision-log.",
      sourceSnapshotTimelineDecisionLog:
        "Source snapshot/timeline/decision log: blocked until snapshot, timeline, and decision log review are complete.",
      includedProjectSections: [
        "Included project sections: blocked until reviewed sources exist.",
      ],
      excludedSensitiveData: [
        "Excluded sensitive data: secrets, API keys, raw local paths, and unreviewed files stay excluded by default.",
      ],
      operatorChecklist: [
        "Operator checklist: review snapshot first.",
        "Operator checklist: review change timeline second.",
        "Operator checklist: review decision log third.",
      ],
      validationHandoff:
        "Validation handoff: blocked; no command or test runs from this page to recover automatically.",
      exportFormatOptions: [
        "Export format options: unavailable until review is complete.",
      ],
      approvalRequirement:
        "Approval requirement: blocked because project runbook export requires review and a separate export boundary.",
      nextRecommendedRoute:
        "Next recommended route: /local-project-decision-log resolves decision review before runbook export review continues.",
      blockedReasons: [
        "Decision log review missing",
        "No runbook file is written from this page",
        "Sensitive data and secrets are excluded",
      ],
      advancedRunbookDetails:
        "Advanced runbook details: blocked runbook review cannot write files, export files, read local files, call providers, or promote memory.",
    }),
  ];
}

export function buildLocalProjectRunbookExportReviewBoundary(): LocalProjectRunbookExportReviewBoundary {
  return {
    projectRunbookExportRequiresReview: true,
    runbookFileWrittenFromPage: false,
    sensitiveDataAndSecretsExcluded: true,
    arbitraryProjectScanningAllowed: false,
    arbitraryLocalFileBrowsingAllowed: false,
    arbitraryPathCrawlingAllowed: false,
    arbitraryFileReadOpenAllowed: false,
    autoOpenLocalFilesAllowed: false,
    commandExecutionAllowedFromUi: false,
    shellExecutionAllowedFromUi: false,
    gitCommandExecutionAllowedFromUi: false,
    testExecutionFromUiAllowed: false,
    connectorApiCallsAllowedFromUi: false,
    webSearchProviderCallsAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    promptFileProjectDataAutoSendAllowed: false,
    fileMutationAllowedFromUi: false,
    fileWriteAllowedFromUi: false,
    fileExportAllowedFromUi: false,
    runbookFileWriteAllowedFromUi: false,
    runbookExportAllowedFromUi: false,
    patchApplyAllowedFromUi: false,
    fileDeletionAllowedFromUi: false,
    memoryIngestionAllowedFromUi: false,
    ragIngestionAllowedFromUi: false,
    memoryAutoPromotionAllowed: false,
    brainGraphMutationAllowed: false,
    appendEventAllowedFromUi: false,
    saveBrainGraphAllowedFromUi: false,
    reminderCreationAllowedFromUi: false,
    taskSchedulingAllowedFromUi: false,
    automationCreationAllowedFromUi: false,
    backgroundJobCreationAllowedFromUi: false,
    notificationSendingAllowedFromUi: false,
    pollingLoopAllowedFromUi: false,
    pluginExecutionAllowedFromUi: false,
    toolExecutionAllowedFromUi: false,
    agentExecutionAllowedFromUi: false,
    extensionRuntimeExecutorCreated: false,
    mcpRuntimeCreated: false,
    mcpToolCallsAllowedFromUi: false,
    localStorageApiKeyStorageAllowed: false,
    processEnvDisplayAllowed: false,
    secretsDisplayedAllowed: false,
    packageInstallAllowedFromUi: false,
    thirdPartyCodeVendoredOrCopied: false,
  };
}

export function summarizeLocalProjectRunbookExportReview(
  model: Pick<LocalProjectRunbookExportReviewModel, "reviews">
): string {
  return `Local project runbook export review prepares ${model.reviews.length} reviewed runbook package state(s). Project runbook export requires review, no runbook file is written from this page, and sensitive data and secrets are excluded.`;
}

export function buildLocalProjectRunbookExportReviewModel(): LocalProjectRunbookExportReviewModel {
  const reviews = buildLocalProjectRunbookExportReviews();
  const model: LocalProjectRunbookExportReviewModel = {
    title: "Local project runbook export review",
    summary: "",
    reviews,
    boundary: buildLocalProjectRunbookExportReviewBoundary(),
    runbookLanguage: [...LOCAL_PROJECT_RUNBOOK_EXPORT_REVIEW_LANGUAGE],
    advancedDetails: [
      "Local project runbook export review",
      "Project runbook export requires review",
      "No runbook file is written from this page",
      "Sensitive data and secrets are excluded",
      "Runbook export identity",
      "Source snapshot/timeline/decision log",
      "Included project sections",
      "Excluded sensitive data",
      "Operator checklist",
      "Validation handoff",
      "Export format options",
      "Approval requirement",
      "Next recommended route",
      "Blocked reasons",
      "Advanced runbook details collapsed/secondary",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeLocalProjectRunbookExportReview(model) };
}
