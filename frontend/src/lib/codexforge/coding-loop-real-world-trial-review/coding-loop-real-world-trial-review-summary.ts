import type {
  CodingLoopRealWorldTrialReview,
  CodingLoopRealWorldTrialReviewBoundary,
  CodingLoopRealWorldTrialReviewModel,
} from "./coding-loop-real-world-trial-review-types";
import { buildCodingLoopRealWorldTrialReviewStableKey } from "./coding-loop-real-world-trial-review-types";

export const CODING_LOOP_REAL_WORLD_TRIAL_REVIEW_LANGUAGE = [
  "Coding loop real-world trial review",
  "Coding trial review does not execute actions",
  "Patches and commits require explicit approval",
  "Validation evidence is reviewed before use",
  "Proposed coding task",
  "Patch apply boundaries",
] as const;

export function buildCodingLoopRealWorldTrialReview(
  input: Omit<CodingLoopRealWorldTrialReview, "id"> & { idHint: string }
): CodingLoopRealWorldTrialReview {
  const { idHint, ...review } = input;
  return {
    id: buildCodingLoopRealWorldTrialReviewStableKey(
      "coding-loop-real-world-trial-review",
      idHint,
      input.status
    ),
    ...review,
  };
}

export function buildCodingLoopRealWorldTrialReviews(): CodingLoopRealWorldTrialReview[] {
  return [
    buildCodingLoopRealWorldTrialReview({
      idHint: "operator-wording-change-review",
      status: "ready-for-review",
      codingTrialIdentity:
        "Coding trial identity: coding-loop-real-world-trial-review-operator-wording-change-review.",
      sourceFirstRealOperatorWorkflowTrial:
        "Source first real operator workflow trial: /first-real-operator-workflow-trial supplies the real operator scenario, approval gates, blocked real actions, and manual validation expectations.",
      operatorScenario:
        "Operator scenario: a real operator reviews a narrow coding change request and records expected gates before any task, patch, command, test, build, smoke check, commit, or file mutation exists.",
      proposedCodingTask:
        "Proposed coding task: update one novice-facing review sentence after the operator confirms the target route, risk, approval packet, validation evidence plan, and rollback note.",
      expectedApprovalGates: [
        "Expected approval gates: operator approval before any future patch preview becomes actionable.",
        "Expected approval gates: explicit approval before patch apply behavior, file mutation, command execution, test execution, build execution, smoke execution, or commit creation.",
        "Expected approval gates: validation evidence is reviewed before use and remains separate from proof of safety.",
      ],
      patchApplyBoundaries: [
        "Patch apply boundaries: this page does not apply patches, generate patch application requests, mutate files, delete files, or export files.",
        "Patch apply boundaries: patches and commits require explicit approval on a separate approval-gated route.",
        "Patch apply boundaries: git commands, shell commands, and test commands stay blocked from this review page.",
      ],
      validationEvidenceSummary:
        "Validation evidence summary: expected evidence includes the operator note, reviewed target route, planned manual validation checklist, and pasted command output only after a separate approved command run.",
      blockedRealActions: [
        "Blocked real actions: coding task execution, workflow execution, command execution, shell execution, git command execution, test execution, build execution, smoke execution, patch apply behavior, commit creation, file mutation, file write, file export, and file deletion.",
        "Blocked real actions: provider API calls, connector API calls, Gmail API calls, Calendar API calls, Contacts API calls, Google API calls, web/search API calls, source fetching/browsing, OAuth request flow, connector authorization, token storage, reminders, schedules, automations, background jobs, notifications, polling loops, memory/RAG ingestion, memory auto-promotion, Brain graph mutation, plugin execution, tool execution, agent execution, extension runtime executor, MCP runtime, and MCP tool calls.",
      ],
      trialOutcomeNotes: [
        "Trial outcome notes: ready when the real operator confirms the scenario is narrow and every real action remains approval-gated.",
        "Trial outcome notes: memory promotion remains blocked until approved, and real evidence is reviewed before use.",
      ],
      nextLoopRoute:
        "Next loop route: /research-loop-real-world-trial-review reviews the research loop trial without browsing or provider calls.",
      advancedCodingTrialDetails:
        "Advanced coding trial details: coding loop real-world trial review is review-only and does not execute actions, run workflows, run coding tasks, run commands, run shell commands, run git commands, run tests, run builds, run smoke checks, apply patches, create commits, mutate files, write files, delete files, export files, call provider APIs, call connector APIs, call Gmail Calendar Contacts or Google APIs, call web/search APIs, fetch sources, browse sources, request OAuth, authorize connectors, store tokens, store API keys, scan arbitrary projects, browse arbitrary local files, crawl arbitrary paths, open arbitrary files, create reminders, schedule tasks, create automations, create background jobs, send notifications, start polling loops, ingest memory, ingest RAG, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, execute plugins, execute tools, execute agents, create an extension runtime executor, create an MCP runtime, call MCP tools, print process.env, display secrets, install packages, remove route coverage, or vendor Ruflo/Odysseus code.",
    }),
    buildCodingLoopRealWorldTrialReview({
      idHint: "blocked-unapproved-patch",
      status: "blocked",
      codingTrialIdentity:
        "Coding trial identity: coding-loop-real-world-trial-review-blocked-unapproved-patch.",
      sourceFirstRealOperatorWorkflowTrial:
        "Source first real operator workflow trial: blocked until /first-real-operator-workflow-trial has an approved operator scenario and reviewed validation evidence plan.",
      operatorScenario:
        "Operator scenario: blocked when a request asks this review page to run a task, inspect arbitrary local files, apply a patch, create a commit, run validation, call a provider, or promote memory.",
      proposedCodingTask:
        "Proposed coding task: blocked until the operator supplies explicit approval, target boundaries, patch apply boundaries, validation evidence summary, and rollback notes.",
      expectedApprovalGates: [
        "Expected approval gates: explicit approval is missing.",
        "Expected approval gates: validation evidence cannot be used until reviewed.",
      ],
      patchApplyBoundaries: [
        "Patch apply boundaries: patch apply behavior remains blocked.",
        "Patch apply boundaries: commit creation remains blocked.",
      ],
      validationEvidenceSummary:
        "Validation evidence summary: blocked because no reviewed validation evidence exists.",
      blockedRealActions: [
        "Blocked real actions: every real coding, command, file, provider, connector, automation, memory, plugin, tool, agent, and MCP action remains blocked.",
      ],
      trialOutcomeNotes: [
        "Trial outcome notes: blocked until approval and evidence review are explicit.",
      ],
      nextLoopRoute:
        "Next loop route: /research-loop-real-world-trial-review remains the next review-only loop after the coding trial is reviewed.",
      advancedCodingTrialDetails:
        "Advanced coding trial details: blocked coding reviews cannot recover by executing tasks, running commands, applying patches, creating commits, writing files, calling APIs, reading connectors, scheduling work, sending notifications, storing tokens, promoting memory, mutating Brain graph data, or creating an MCP runtime.",
    }),
  ];
}

export function buildCodingLoopRealWorldTrialReviewBoundary(): CodingLoopRealWorldTrialReviewBoundary {
  return {
    codingTrialReviewOnly: true,
    codingTrialReviewDoesNotExecuteActions: true,
    patchesAndCommitsRequireExplicitApproval: true,
    validationEvidenceReviewedBeforeUse: true,
    realEvidenceReviewedBeforeUse: true,
    memoryPromotionBlockedUntilApproved: true,
    actionsExecutedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    codingTaskExecutionAllowedFromUi: false,
    taskExecutionAllowedFromUi: false,
    testExecutionFromUiAllowed: false,
    buildExecutionFromUiAllowed: false,
    smokeExecutionFromUiAllowed: false,
    commandExecutionAllowedFromUi: false,
    shellExecutionAllowedFromUi: false,
    gitCommandExecutionAllowedFromUi: false,
    commitCreationAllowedFromUi: false,
    patchApplyAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    connectorApiCallsAllowedFromUi: false,
    gmailApiCallsAllowedFromUi: false,
    calendarApiCallsAllowedFromUi: false,
    contactsApiCallsAllowedFromUi: false,
    googleApiCallsAllowedFromUi: false,
    webSearchProviderCallsAllowedFromUi: false,
    webBrowsingAllowedFromUi: false,
    sourceAutoFetchAllowed: false,
    oauthRequestFlowAllowedFromUi: false,
    connectorAuthorizationAllowedFromUi: false,
    connectorDataReadFromPageAllowed: false,
    automaticEmailReadsAllowed: false,
    automaticCalendarReadsAllowed: false,
    automaticContactReadsAllowed: false,
    tokenStorageAllowed: false,
    localStorageTokenStorageAllowed: false,
    sessionStorageTokenStorageAllowed: false,
    localStorageApiKeyStorageAllowed: false,
    promptFileProjectDataAutoSendAllowed: false,
    promptFileProjectConnectorDataAutoSendAllowed: false,
    arbitraryProjectScanningAllowed: false,
    arbitraryLocalFileBrowsingAllowed: false,
    arbitraryPathCrawlingAllowed: false,
    arbitraryFileReadOpenAllowed: false,
    autoOpenLocalFilesAllowed: false,
    fileMutationAllowedFromUi: false,
    fileWriteAllowedFromUi: false,
    fileExportAllowedFromUi: false,
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
    processEnvDisplayAllowed: false,
    secretsDisplayedAllowed: false,
    packageInstallAllowedFromUi: false,
    routeCoverageRemovalAllowed: false,
    thirdPartyCodeVendoredOrCopied: false,
  };
}

export function summarizeCodingLoopRealWorldTrialReview(
  model: Pick<CodingLoopRealWorldTrialReviewModel, "reviews">
): string {
  return `Coding loop real-world trial review prepares ${model.reviews.length} coding trial posture(s). Coding trial review does not execute actions, patches and commits require explicit approval, and validation evidence is reviewed before use.`;
}

export function buildCodingLoopRealWorldTrialReviewModel(): CodingLoopRealWorldTrialReviewModel {
  const reviews = buildCodingLoopRealWorldTrialReviews();
  const model: CodingLoopRealWorldTrialReviewModel = {
    title: "Coding loop real-world trial review",
    summary: "",
    reviews,
    boundary: buildCodingLoopRealWorldTrialReviewBoundary(),
    trialReviewLanguage: [...CODING_LOOP_REAL_WORLD_TRIAL_REVIEW_LANGUAGE],
    advancedDetails: [
      "Coding loop real-world trial review",
      "Coding trial review does not execute actions",
      "Patches and commits require explicit approval",
      "Validation evidence is reviewed before use",
      "Real evidence is reviewed before use",
      "Memory promotion remains blocked until approved",
      "Coding trial identity",
      "Source first real operator workflow trial",
      "Operator scenario",
      "Proposed coding task",
      "Expected approval gates",
      "Patch apply boundaries",
      "Validation evidence summary",
      "Blocked real actions",
      "Trial outcome notes",
      "Next loop route",
      "advanced coding trial details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeCodingLoopRealWorldTrialReview(model) };
}
