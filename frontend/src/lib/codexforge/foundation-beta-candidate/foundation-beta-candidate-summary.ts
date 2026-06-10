import type {
  FoundationBetaCandidate,
  FoundationBetaCandidateBoundary,
  FoundationBetaCandidateModel,
} from "./foundation-beta-candidate-types";
import { buildFoundationBetaCandidateStableKey } from "./foundation-beta-candidate-types";

export const FOUNDATION_BETA_CANDIDATE_LANGUAGE = [
  "Foundation beta candidate",
  "Foundation beta candidate remains review-only",
  "Beta does not publish or invite users automatically",
  "Beta approval requires explicit operator sign-off",
  "Foundation readiness summary",
  "Release recommendation",
] as const;

export function buildFoundationBetaCandidate(
  input: Omit<FoundationBetaCandidate, "id"> & { idHint: string }
): FoundationBetaCandidate {
  const { idHint, ...candidate } = input;
  return {
    id: buildFoundationBetaCandidateStableKey("foundation-beta-candidate", idHint, input.status),
    ...candidate,
  };
}

export function buildFoundationBetaCandidates(): FoundationBetaCandidate[] {
  return [
    buildFoundationBetaCandidate({
      idHint: "operator-trial-candidate",
      status: "ready-for-review",
      betaCandidateIdentity: "Beta candidate identity: foundation-beta-candidate-operator-trial-candidate.",
      foundationReadinessSummary: [
        "Foundation readiness summary: navigation, command palette, review inboxes, result history, approval queue, privacy audit, and secrets sweep are present for beta operator review.",
        "Foundation readiness summary: foundation release candidate, hardening matrix, and daily operator home surfaces remain visible as supporting evidence.",
      ],
      safetyReadinessSummary: [
        "Safety readiness summary: approval required language stays visible before trial intake.",
        "Safety readiness summary: provider, connector, web/search, local bridge, file, command, memory, and automation boundaries remain blocked from this page.",
      ],
      smokeStabilitySummary: [
        "Smoke stability summary: /full-smoke-suite-stability-pass reviews full smoke readiness without running tests from this page.",
        "Smoke stability summary: unresolved smoke failures stay blocked and smoke results require operator review.",
      ],
      operatorCockpitReadiness: [
        "Operator cockpit readiness: daily home, global review inbox, approval queue, result history, safety matrix, recovery playbook, beta intake, and feedback inbox have plain-English routes.",
        "Operator cockpit readiness: novice-friendly labels stay compact without duplicate menus or route chip clutter.",
      ],
      betaBlockers: [
        "Beta blockers: unresolved smoke failures, privacy gaps, secret exposure risks, missing approval sign-off, or unclear trial scope block beta.",
        "Beta blockers: any request to publish, invite users, call APIs, collect participant data, or ingest feedback automatically stays blocked.",
      ],
      betaTrialIntakeRoute:
        "Beta trial intake route: /beta-trial-intake-review reviews trial scope and participants after explicit approval.",
      feedbackInboxRoute:
        "Feedback inbox route: /beta-feedback-inbox reviews feedback categories without ingesting external feedback automatically.",
      releaseRecommendation:
        "Release recommendation: ready for beta candidate review only; beta approval requires explicit operator sign-off.",
      advancedBetaCandidateDetails:
        "Advanced beta candidate details: foundation beta candidate remains review-only. Beta does not publish or invite users automatically, beta approval requires explicit operator sign-off, and this page does not release, publish, send invites, collect participant data, fetch external feedback, ingest feedback, create issues, run tests, run builds, run smoke checks, run the full smoke suite, execute workflows, approve actions automatically, call provider APIs, call connector APIs, call web/search APIs, call local bridge endpoints, launch local tools, send prompt/file/project/connector/feedback data without approval, scan arbitrary projects, browse local files, crawl paths, read files, open files, run git commands, run shell commands, mutate files, write files, export files, apply patches, delete files, ingest memory, ingest RAG, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, create reminders, schedule tasks, create automations, create background jobs, send notifications, start polling loops, execute plugins, execute tools, execute agents, create an extension runtime executor, create an MCP runtime, call MCP tools, store tokens, store API keys in browser storage, print process.env, display secrets, install packages, remove route coverage, or vendor Ruflo/Odysseus code.",
    }),
    buildFoundationBetaCandidate({
      idHint: "blocked-missing-signoff",
      status: "blocked",
      betaCandidateIdentity: "Beta candidate identity: foundation-beta-candidate-blocked-missing-signoff.",
      foundationReadinessSummary: [
        "Foundation readiness summary: foundation evidence can be reviewed, but beta remains blocked until operator sign-off is recorded outside this page.",
      ],
      safetyReadinessSummary: [
        "Safety readiness summary: blocked safety, privacy, secret, smoke, or approval questions prevent beta candidate acceptance.",
      ],
      smokeStabilitySummary: [
        "Smoke stability summary: full smoke stability must be reviewed before beta trial intake opens.",
      ],
      operatorCockpitReadiness: [
        "Operator cockpit readiness: cockpit routes stay visible, but visibility is not approval.",
      ],
      betaBlockers: [
        "Beta blockers: missing explicit operator sign-off.",
        "Beta blockers: unresolved smoke, privacy, secrets, or trial-scope findings.",
      ],
      betaTrialIntakeRoute:
        "Beta trial intake route: /beta-trial-intake-review stays review-only and cannot send invites.",
      feedbackInboxRoute:
        "Feedback inbox route: /beta-feedback-inbox stays review-only and cannot ingest feedback.",
      releaseRecommendation:
        "Release recommendation: blocked until explicit sign-off and smoke stability review are complete.",
      advancedBetaCandidateDetails:
        "Advanced beta candidate details: blocked beta candidate review cannot publish, invite users, call APIs, mutate files, create issues, ingest feedback, run checks, or approve beta automatically.",
    }),
  ];
}

export function buildFoundationBetaCandidateBoundary(): FoundationBetaCandidateBoundary {
  return {
    foundationBetaCandidateReviewOnly: true,
    betaDoesNotPublishOrInviteUsersAutomatically: true,
    betaApprovalRequiresExplicitOperatorSignOff: true,
    actionsExecutedFromUi: false,
    actionsApprovedFromUi: false,
    approvalAutomationAllowedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    workflowAutomaticRunAllowed: false,
    providerApiCallsAllowedFromUi: false,
    connectorApiCallsAllowedFromUi: false,
    webSearchProviderCallsAllowedFromUi: false,
    localBridgeEndpointCallsAllowedFromUi: false,
    promptFileProjectConnectorFeedbackDataAutoSendAllowed: false,
    arbitraryProjectScanningAllowed: false,
    arbitraryLocalFileBrowsingAllowed: false,
    arbitraryPathCrawlingAllowed: false,
    arbitraryFileReadOpenAllowed: false,
    autoOpenLocalFilesAllowed: false,
    gitCommandExecutionAllowedFromUi: false,
    shellExecutionAllowedFromUi: false,
    commandExecutionAllowedFromUi: false,
    testExecutionFromUiAllowed: false,
    buildExecutionFromUiAllowed: false,
    smokeExecutionFromUiAllowed: false,
    fullSmokeSuiteExecutionFromUiAllowed: false,
    releasePublishAllowedFromUi: false,
    inviteSendingAllowedFromUi: false,
    participantDataCollectionAllowedFromUi: false,
    externalFeedbackFetchAllowedFromUi: false,
    feedbackIngestionAllowedFromUi: false,
    issueCreationAllowedFromUi: false,
    fileMutationAllowedFromUi: false,
    fileWriteAllowedFromUi: false,
    fileExportAllowedFromUi: false,
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
    tokenStorageAllowed: false,
    localStorageTokenStorageAllowed: false,
    sessionStorageTokenStorageAllowed: false,
    localStorageApiKeyStorageAllowed: false,
    sessionStorageApiKeyStorageAllowed: false,
    processEnvDisplayAllowed: false,
    secretsDisplayedAllowed: false,
    packageInstallAllowedFromUi: false,
    routeCoverageRemovalAllowed: false,
    thirdPartyCodeVendoredOrCopied: false,
  };
}

export function summarizeFoundationBetaCandidate(model: Pick<FoundationBetaCandidateModel, "candidates">): string {
  return `Foundation beta candidate prepares ${model.candidates.length} beta readiness review posture(s). Foundation beta candidate remains review-only, beta does not publish or invite users automatically, and beta approval requires explicit operator sign-off.`;
}

export function buildFoundationBetaCandidateModel(): FoundationBetaCandidateModel {
  const candidates = buildFoundationBetaCandidates();
  const model: FoundationBetaCandidateModel = {
    title: "Foundation beta candidate",
    summary: "",
    candidates,
    boundary: buildFoundationBetaCandidateBoundary(),
    betaCandidateLanguage: [...FOUNDATION_BETA_CANDIDATE_LANGUAGE],
    advancedDetails: [
      "Foundation beta candidate",
      "Beta candidate identity",
      "Foundation readiness summary",
      "Safety readiness summary",
      "Smoke stability summary",
      "Operator cockpit readiness",
      "Beta blockers",
      "Beta trial intake route",
      "Feedback inbox route",
      "Release recommendation",
      "Foundation beta candidate remains review-only",
      "Beta does not publish or invite users automatically",
      "Beta approval requires explicit operator sign-off",
      "advanced beta candidate details collapsed/secondary",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeFoundationBetaCandidate(model) };
}
