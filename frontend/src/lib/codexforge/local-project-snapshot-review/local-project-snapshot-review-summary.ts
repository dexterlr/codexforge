import type {
  LocalProjectSnapshotReview,
  LocalProjectSnapshotReviewBoundary,
  LocalProjectSnapshotReviewModel,
} from "./local-project-snapshot-review-types";
import { buildLocalProjectSnapshotReviewStableKey } from "./local-project-snapshot-review-types";

export const LOCAL_PROJECT_SNAPSHOT_REVIEW_LANGUAGE = [
  "Local project snapshot review",
  "Project snapshots are reviewed before use",
  "No local project scan runs from this page",
  "Secrets and local paths stay redacted",
  "Reviewed files modules summary",
  "Change timeline route",
] as const;

export function buildLocalProjectSnapshotReview(
  input: Omit<LocalProjectSnapshotReview, "id"> & { idHint: string }
): LocalProjectSnapshotReview {
  const { idHint, ...review } = input;
  return {
    id: buildLocalProjectSnapshotReviewStableKey(
      "local-project-snapshot-review",
      idHint,
      input.status
    ),
    ...review,
  };
}

export function buildLocalProjectSnapshotReviews(): LocalProjectSnapshotReview[] {
  return [
    buildLocalProjectSnapshotReview({
      idHint: "reviewed-project-intelligence",
      status: "ready-for-review",
      snapshotReviewIdentity:
        "Snapshot review identity: local-project-snapshot-review-reviewed-project-intelligence.",
      projectScopeSummary:
        "Project scope summary: canonical CodexForge frontend only, summarized from already reviewed project intelligence metadata.",
      sourceProjectIntelligenceDependency:
        "Source dependency on project intelligence: /project-intelligence-result provides the reviewed index, search, dependency, and risk context before this snapshot is used.",
      reviewedFilesModulesSummary:
        "Reviewed files/modules summary: route, component, model, registry, and smoke-script areas are summarized as review text, not by reading local files from this page.",
      riskSecretsSummary:
        "Risk/secrets summary: secrets and local paths stay redacted, sensitive indicators remain summarized, and raw path values are not displayed.",
      validationStatus:
        "Validation status: ready for human review; no local project scan runs from this page and no validation command is executed.",
      changeTimelineRoute:
        "Change timeline route: /local-project-change-timeline keeps reviewed changes separate from snapshot review.",
      decisionLogRoute:
        "Decision log route: /local-project-decision-log captures decisions only after the snapshot is reviewed.",
      blockedReasons: [
        "Project snapshots are reviewed before use",
        "No local project scan runs from this page",
        "Secrets and local paths stay redacted",
      ],
      advancedSnapshotDetails:
        "Advanced snapshot details: this page does not scan arbitrary local projects, browse local files, crawl paths, read files, open files, run git commands, run shell commands, run tests, write files, export files, apply patches, delete files, call providers, call connectors, ingest memory, promote memory, mutate Brain graph, call appendEvent, call saveBrainGraph, execute plugins, execute tools, execute agents, create an MCP runtime, start polling loops, create reminders, create schedules, create automations, create background jobs, send notifications, install packages, or vendor Ruflo/Odysseus code.",
    }),
    buildLocalProjectSnapshotReview({
      idHint: "blocked-missing-reviewed-intelligence",
      status: "blocked",
      snapshotReviewIdentity:
        "Snapshot review identity: local-project-snapshot-review-blocked-missing-reviewed-intelligence.",
      projectScopeSummary:
        "Project scope summary: blocked until reviewed project intelligence confirms the intended local project scope.",
      sourceProjectIntelligenceDependency:
        "Source dependency on project intelligence: blocked until /project-intelligence-result is reviewed and accepted.",
      reviewedFilesModulesSummary:
        "Reviewed files/modules summary: unavailable because the page will not read arbitrary local files to fill the gap.",
      riskSecretsSummary:
        "Risk/secrets summary: blocked by default; secrets and local paths stay redacted even when source context is missing.",
      validationStatus:
        "Validation status: blocked; no local scan, git command, shell command, or test command is run to recover automatically.",
      changeTimelineRoute:
        "Change timeline route: /local-project-change-timeline remains available after snapshot review is complete.",
      decisionLogRoute:
        "Decision log route: /local-project-decision-log remains blocked until reviewed snapshot context exists.",
      blockedReasons: [
        "Reviewed project intelligence is missing",
        "No local project scan runs from this page",
        "Secrets and local paths stay redacted",
      ],
      advancedSnapshotDetails:
        "Advanced snapshot details: blocked snapshot review cannot infer scope by scanning paths, reading files, reading git history, calling providers, writing files, exporting files, or promoting memory.",
    }),
  ];
}

export function buildLocalProjectSnapshotReviewBoundary(): LocalProjectSnapshotReviewBoundary {
  return {
    projectSnapshotsReviewedBeforeUse: true,
    localProjectScanRunsFromPage: false,
    secretsAndLocalPathsRedacted: true,
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

export function summarizeLocalProjectSnapshotReview(
  model: Pick<LocalProjectSnapshotReviewModel, "reviews">
): string {
  return `Local project snapshot review prepares ${model.reviews.length} reviewed snapshot state(s). Project snapshots are reviewed before use, no local project scan runs from this page, and secrets and local paths stay redacted.`;
}

export function buildLocalProjectSnapshotReviewModel(): LocalProjectSnapshotReviewModel {
  const reviews = buildLocalProjectSnapshotReviews();
  const model: LocalProjectSnapshotReviewModel = {
    title: "Local project snapshot review",
    summary: "",
    reviews,
    boundary: buildLocalProjectSnapshotReviewBoundary(),
    snapshotLanguage: [...LOCAL_PROJECT_SNAPSHOT_REVIEW_LANGUAGE],
    advancedDetails: [
      "Local project snapshot review",
      "Project snapshots are reviewed before use",
      "No local project scan runs from this page",
      "Secrets and local paths stay redacted",
      "Snapshot review identity",
      "Project scope summary",
      "Source dependency on project intelligence",
      "Reviewed files modules summary",
      "Reviewed files/modules summary",
      "Risk/secrets summary",
      "Validation status",
      "Change timeline route",
      "Decision log route",
      "Blocked reasons",
      "Advanced snapshot details collapsed/secondary",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeLocalProjectSnapshotReview(model) };
}
