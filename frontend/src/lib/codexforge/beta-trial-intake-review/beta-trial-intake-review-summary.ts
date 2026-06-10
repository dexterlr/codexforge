import type {
  BetaTrialIntakeReview,
  BetaTrialIntakeReviewBoundary,
  BetaTrialIntakeReviewModel,
} from "./beta-trial-intake-review-types";
import { buildBetaTrialIntakeReviewStableKey } from "./beta-trial-intake-review-types";

export const BETA_TRIAL_INTAKE_REVIEW_LANGUAGE = [
  "Beta trial intake review",
  "Beta trial intake requires explicit approval",
  "No invites are sent from this page",
  "Participant data is not collected automatically",
  "Participant criteria",
  "Risk privacy checklist",
] as const;

export function buildBetaTrialIntakeReview(
  input: Omit<BetaTrialIntakeReview, "id"> & { idHint: string }
): BetaTrialIntakeReview {
  const { idHint, ...review } = input;
  return {
    id: buildBetaTrialIntakeReviewStableKey("beta-trial-intake-review", idHint, input.status),
    ...review,
  };
}

export function buildBetaTrialIntakeReviews(): BetaTrialIntakeReview[] {
  return [
    buildBetaTrialIntakeReview({
      idHint: "operator-scope-review",
      status: "ready-for-review",
      betaIntakeIdentity: "Beta intake identity: beta-trial-intake-review-operator-scope-review.",
      trialScopeSummary: [
        "Trial scope summary: small operator-only beta focused on smoke stability review, daily cockpit flow, approval queue, result history, beta feedback review, privacy, and secrets boundaries.",
        "Trial scope summary: trial scope remains a reviewed proposal and does not start beta trials from this page.",
      ],
      participantCriteria: [
        "Participant criteria: operators understand review-only surfaces and can run validation commands outside the UI.",
        "Participant criteria: participants must accept that no private project data, connector data, or feedback is collected automatically.",
        "Participant criteria: participants must be approved through an explicit operator sign-off process before invitation.",
      ],
      riskPrivacyChecklist: [
        "Risk privacy checklist: no participant data is collected automatically.",
        "Risk privacy checklist: private project, prompt, connector, feedback, and secret details remain redacted until approved.",
        "Risk privacy checklist: feedback, local files, and external services are never fetched from this page.",
      ],
      approvalGates: [
        "Approval gates: beta trial intake requires explicit approval before any invite list is used.",
        "Approval gates: unresolved smoke, safety, privacy, or secrets blockers keep the intake blocked.",
      ],
      onboardingReadiness: [
        "Onboarding readiness: beta candidate, smoke stability, intake review, and feedback inbox routes are visible in plain English.",
        "Onboarding readiness: onboarding copy explains review-only posture before participant actions are considered.",
      ],
      feedbackInboxRoute:
        "Feedback inbox route: /beta-feedback-inbox reviews beta feedback categories after feedback is supplied through an approved process.",
      blockedIntakeReasons: [
        "Blocked intake reasons: missing explicit approval, unclear participant criteria, unresolved privacy or smoke risks, or any request to send invites from this page.",
        "Blocked intake reasons: participant data collection, connector reads, provider calls, web/search calls, or file scans remain blocked.",
      ],
      nextRecommendedAction:
        "Next recommended action: review /foundation-beta-candidate and obtain explicit operator sign-off before any external beta trial step.",
      advancedIntakeDetails:
        "Advanced intake details: beta trial intake review is review-only. Beta trial intake requires explicit approval, no invites are sent from this page, participant data is not collected automatically, and this page does not start beta trials, send invites, collect external data, fetch participant lists, call providers, call connectors, call web/search APIs, call local bridge endpoints, launch local tools, run tests, run builds, run smoke checks, run the full smoke suite, execute workflows, approve actions automatically, publish releases, ingest feedback, create issues, send prompt/file/project/connector/feedback data without approval, scan arbitrary projects, browse local files, crawl paths, read files, open files, run git commands, run shell commands, mutate files, write files, export files, apply patches, delete files, ingest memory, ingest RAG, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, create reminders, schedule tasks, create automations, create background jobs, send notifications, start polling loops, execute plugins, execute tools, execute agents, create an extension runtime executor, create an MCP runtime, call MCP tools, store tokens, store API keys in browser storage, print process.env, display secrets, install packages, remove route coverage, or vendor Ruflo/Odysseus code.",
    }),
    buildBetaTrialIntakeReview({
      idHint: "blocked-unapproved-participants",
      status: "blocked",
      betaIntakeIdentity: "Beta intake identity: beta-trial-intake-review-blocked-unapproved-participants.",
      trialScopeSummary: [
        "Trial scope summary: proposed participant scope is blocked until approval gates and privacy expectations are clear.",
      ],
      participantCriteria: [
        "Participant criteria: unapproved participants cannot be invited from this page.",
      ],
      riskPrivacyChecklist: [
        "Risk privacy checklist: participant details stay out of the UI until an approved intake process exists.",
      ],
      approvalGates: [
        "Approval gates: explicit approval is missing.",
      ],
      onboardingReadiness: [
        "Onboarding readiness: onboarding copy is incomplete for blocked participant scope.",
      ],
      feedbackInboxRoute:
        "Feedback inbox route: /beta-feedback-inbox remains available for review shape only and does not fetch feedback.",
      blockedIntakeReasons: [
        "Blocked intake reasons: explicit approval is missing.",
        "Blocked intake reasons: no invite may be sent and no participant data may be collected automatically.",
      ],
      nextRecommendedAction:
        "Next recommended action: keep intake blocked and return to /foundation-beta-candidate for operator sign-off.",
      advancedIntakeDetails:
        "Advanced intake details: blocked intake cannot recover by sending invites, collecting participant data, calling connectors, calling providers, fetching web data, mutating files, creating issues, or promoting memory from this page.",
    }),
  ];
}

export function buildBetaTrialIntakeReviewBoundary(): BetaTrialIntakeReviewBoundary {
  return {
    betaTrialIntakeReviewOnly: true,
    betaTrialIntakeRequiresExplicitApproval: true,
    noInvitesAreSentFromThisPage: true,
    participantDataIsNotCollectedAutomatically: true,
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

export function summarizeBetaTrialIntakeReview(model: Pick<BetaTrialIntakeReviewModel, "reviews">): string {
  return `Beta trial intake review prepares ${model.reviews.length} intake review posture(s). Beta trial intake requires explicit approval, no invites are sent from this page, and participant data is not collected automatically.`;
}

export function buildBetaTrialIntakeReviewModel(): BetaTrialIntakeReviewModel {
  const reviews = buildBetaTrialIntakeReviews();
  const model: BetaTrialIntakeReviewModel = {
    title: "Beta trial intake review",
    summary: "",
    reviews,
    boundary: buildBetaTrialIntakeReviewBoundary(),
    intakeLanguage: [...BETA_TRIAL_INTAKE_REVIEW_LANGUAGE],
    advancedDetails: [
      "Beta trial intake review",
      "Beta intake identity",
      "Trial scope summary",
      "Participant criteria",
      "Risk privacy checklist",
      "Approval gates",
      "Onboarding readiness",
      "Feedback inbox route",
      "Blocked intake reasons",
      "Next recommended action",
      "Beta trial intake requires explicit approval",
      "No invites are sent from this page",
      "Participant data is not collected automatically",
      "advanced intake details collapsed/secondary",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeBetaTrialIntakeReview(model) };
}
