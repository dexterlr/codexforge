import type {
  DailyUseOnboardingPolish,
  DailyUseOnboardingPolishBoundary,
  DailyUseOnboardingPolishModel,
} from "./daily-use-onboarding-polish-types";
import { buildDailyUseOnboardingPolishStableKey } from "./daily-use-onboarding-polish-types";

export const DAILY_USE_ONBOARDING_POLISH_LANGUAGE = [
  "Daily use onboarding polish",
  "Onboarding polish does not change settings",
  "Onboarding does not run workflows automatically",
  "Approval gates remain visible",
  "First-day operator path",
  "Recommended review sequence",
] as const;

export function buildDailyUseOnboardingPolish(
  input: Omit<DailyUseOnboardingPolish, "id"> & { idHint: string }
): DailyUseOnboardingPolish {
  const { idHint, ...review } = input;
  return {
    id: buildDailyUseOnboardingPolishStableKey("daily-use-onboarding-polish", idHint, input.status),
    ...review,
  };
}

export function buildDailyUseOnboardingPolishes(): DailyUseOnboardingPolish[] {
  return [
    buildDailyUseOnboardingPolish({
      idHint: "first-day-review-path",
      status: "ready-for-review",
      onboardingPolishIdentity:
        "Onboarding polish identity: daily-use-onboarding-polish-first-day-review-path.",
      firstDayOperatorPath: [
        "First-day operator path: start with the daily operator home, then review onboarding, preferences, personalization, and saved review views in order.",
        "First-day operator path: keep review-only pages separate from any workflow execution or settings update.",
      ],
      noviceExpertEntryPoints: [
        "Novice entry point: /novice-mode-guided-flow-polish explains safe review steps in plain English.",
        "Expert entry point: /expert-mode-fast-path-review previews faster navigation while keeping approval gates visible.",
      ],
      recommendedReviewSequence: [
        "Recommended review sequence: daily onboarding, operator preferences, workspace personalization, saved review views, then beta release notes if needed.",
        "Recommended review sequence: review blocked onboarding risks before any operator tries a real workflow.",
      ],
      safetyCheckpointReminders: [
        "Safety checkpoint reminders: onboarding polish does not change settings.",
        "Safety checkpoint reminders: onboarding does not run workflows automatically.",
        "Safety checkpoint reminders: approval gates remain visible.",
      ],
      blockedOnboardingRisks: [
        "Blocked onboarding risks: requests to save preferences, persist layouts, save views, execute workflows, call APIs, mutate files, or promote memory stay blocked.",
        "Blocked onboarding risks: private project, connector, preference, and file details are not sent anywhere from this page.",
      ],
      operatorPreferencesRoute:
        "Operator preferences route: /operator-preferences-review previews preference groups without saving preferences.",
      savedReviewViewsRoute:
        "Saved review views route: /saved-review-views previews view presets without storing them.",
      nextRecommendedAction:
        "Next recommended action: review operator preferences next, then workspace personalization, without changing settings from onboarding.",
      advancedOnboardingDetails:
        "Advanced onboarding details: daily use onboarding polish is review-only. Onboarding polish does not change settings, onboarding does not run workflows automatically, approval gates remain visible, and this page does not save preferences, persist personalization, store saved views, write browser storage, call provider APIs, call connector APIs, call web/search APIs, call GitHub APIs, call local bridge endpoints, run workflows, run shell commands, run git commands, run tests, run builds, run smoke checks, mutate files, write files, export files, apply patches, delete files, read arbitrary local files, browse arbitrary local files, scan arbitrary projects, ingest memory, ingest RAG, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, create reminders, schedule tasks, create automations, create background jobs, send notifications, start polling loops, execute plugins, execute tools, execute agents, create an extension runtime executor, create an MCP runtime, call MCP tools, store tokens, store API keys, print process.env, display secrets, install packages, remove route coverage, or vendor Ruflo/Odysseus code.",
    }),
    buildDailyUseOnboardingPolish({
      idHint: "blocked-settings-shortcut",
      status: "blocked",
      onboardingPolishIdentity:
        "Onboarding polish identity: daily-use-onboarding-polish-blocked-settings-shortcut.",
      firstDayOperatorPath: [
        "First-day operator path: blocked when onboarding is asked to skip review or change settings.",
      ],
      noviceExpertEntryPoints: [
        "Novice entry point: /novice-mode-guided-flow-polish keeps the blocked reason plain.",
        "Expert entry point: /expert-mode-fast-path-review cannot bypass the approval checkpoint.",
      ],
      recommendedReviewSequence: [
        "Recommended review sequence: return to preferences review before any real settings request is approved elsewhere.",
      ],
      safetyCheckpointReminders: [
        "Safety checkpoint reminders: onboarding polish does not change settings.",
        "Safety checkpoint reminders: approval gates remain visible.",
      ],
      blockedOnboardingRisks: [
        "Blocked onboarding risks: shortcuts that imply automatic workflow execution, preference saving, or layout persistence remain blocked.",
      ],
      operatorPreferencesRoute:
        "Operator preferences route: /operator-preferences-review remains the safe review handoff.",
      savedReviewViewsRoute:
        "Saved review views route: /saved-review-views remains preview-only.",
      nextRecommendedAction:
        "Next recommended action: keep the onboarding item blocked until a manual operator approval path exists outside this page.",
      advancedOnboardingDetails:
        "Advanced onboarding details: blocked onboarding cannot recover by saving settings, running workflows, writing storage, calling APIs, reading files, launching tools, mutating memory, or approving work from this page.",
    }),
  ];
}

export function buildDailyUseOnboardingPolishBoundary(): DailyUseOnboardingPolishBoundary {
  return {
    dailyUseOnboardingPolishReviewOnly: true,
    onboardingPolishDoesNotChangeSettings: true,
    onboardingDoesNotRunWorkflowsAutomatically: true,
    approvalGatesRemainVisible: true,
    settingsMutationAllowedFromUi: false,
    preferencePersistenceAllowedFromUi: false,
    personalizationPersistenceAllowedFromUi: false,
    savedViewPersistenceAllowedFromUi: false,
    localStorageWritesAllowedFromUi: false,
    sessionStorageWritesAllowedFromUi: false,
    actionsExecutedFromUi: false,
    actionsApprovedFromUi: false,
    approvalAutomationAllowedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    workflowAutomaticRunAllowed: false,
    providerApiCallsAllowedFromUi: false,
    connectorApiCallsAllowedFromUi: false,
    webSearchProviderCallsAllowedFromUi: false,
    githubApiCallsAllowedFromUi: false,
    localBridgeEndpointCallsAllowedFromUi: false,
    promptFileProjectConnectorPreferenceDataAutoSendAllowed: false,
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

export function summarizeDailyUseOnboardingPolish(
  model: Pick<DailyUseOnboardingPolishModel, "reviews">
): string {
  return `Daily use onboarding polish prepares ${model.reviews.length} first-day operator review posture(s). Onboarding polish does not change settings, onboarding does not run workflows automatically, and approval gates remain visible.`;
}

export function buildDailyUseOnboardingPolishModel(): DailyUseOnboardingPolishModel {
  const reviews = buildDailyUseOnboardingPolishes();
  const model: DailyUseOnboardingPolishModel = {
    title: "Daily use onboarding polish",
    summary: "",
    reviews,
    boundary: buildDailyUseOnboardingPolishBoundary(),
    onboardingLanguage: [...DAILY_USE_ONBOARDING_POLISH_LANGUAGE],
    advancedDetails: [
      "Daily use onboarding polish",
      "Onboarding polish identity",
      "First-day operator path",
      "Novice/expert entry points",
      "Recommended review sequence",
      "Safety checkpoint reminders",
      "Blocked onboarding risks",
      "Operator preferences route",
      "Saved review views route",
      "Next recommended action",
      "Onboarding polish does not change settings",
      "Onboarding does not run workflows automatically",
      "Approval gates remain visible",
      "advanced onboarding details collapsed/secondary",
      "no preference persistence",
      "no saved view persistence",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeDailyUseOnboardingPolish(model) };
}
