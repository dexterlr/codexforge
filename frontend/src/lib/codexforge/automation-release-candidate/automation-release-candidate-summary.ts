import type {
  AutomationReleaseCandidate,
  AutomationReleaseCandidateBoundary,
  AutomationReleaseCandidateModel,
} from "./automation-release-candidate-types";
import { buildAutomationReleaseCandidateStableKey } from "./automation-release-candidate-types";

export const AUTOMATION_RELEASE_CANDIDATE_LANGUAGE = [
  "Automation release candidate",
  "Automation release candidate remains review-only",
  "Automations are not created automatically",
  "Background work remains disabled from UI",
  "Release decision",
  "Known gaps",
] as const;

export function buildAutomationReleaseCandidate(
  input: Omit<AutomationReleaseCandidate, "id"> & { idHint: string }
): AutomationReleaseCandidate {
  const { idHint, ...candidate } = input;
  return {
    id: buildAutomationReleaseCandidateStableKey(
      "automation-release-candidate",
      idHint,
      input.releaseDecision
    ),
    ...candidate,
  };
}

export function buildAutomationReleaseCandidates(): AutomationReleaseCandidate[] {
  return [
    buildAutomationReleaseCandidate({
      idHint: "review-only-automation-mvp",
      releaseDecision: "ready with fixes",
      releaseCandidateIdentity:
        "Release candidate identity: automation-release-candidate-review-only-automation-mvp.",
      coveredAutomationSurfaces: [
        "Covered automation surface: /operator-notification-center notification category shell.",
        "Covered automation surface: /task-reminder-boundary reminder approval boundary.",
        "Covered automation surface: /scheduled-research-check-boundary scheduled research approval boundary.",
        "Covered automation surface: /conditional-watch-review-inbox conditional watch review inbox.",
      ],
      reminderReadiness:
        "Reminder readiness: task reminder boundaries are written in plain English and require explicit approval; no reminder is created automatically.",
      scheduledResearchReadiness:
        "Scheduled research readiness: scheduled research boundaries require explicit approval; no research check is scheduled and no source is refreshed automatically.",
      conditionalWatchReadiness:
        "Conditional watch readiness: proposed watches are reviewed before activation; no watch is activated and no background check runs from the inbox.",
      notificationReadiness:
        "Notification readiness: notification center remains a shell; notification delivery is not enabled and no notification is sent.",
      auditRecoveryReadiness:
        "Audit/recovery readiness: manual handoff routes are visible, blocked reasons remain visible, and recovery stays review-only.",
      knownGaps: [
        "Known gap: no live reminder executor exists.",
        "Known gap: no approved scheduling runtime exists.",
        "Known gap: no notification delivery channel exists.",
        "Known gap: no background watch runner exists.",
      ],
      nextRecommendedRoute:
        "Next recommended route: /conditional-watch-review-inbox keeps proposed watches in manual review before any release decision changes.",
      advancedReleaseDetails:
        "Advanced release details: this automation release candidate remains review-only and does not create automations, create reminders, schedule tasks, create schedules, create watches, activate watches, create background jobs, run background work, create cron behavior, start interval timers, start polling loops, send notifications, call connector APIs, call Gmail APIs, call Calendar APIs, call Contacts APIs, call Google APIs, request OAuth, request connector authorization, read emails, read calendar events, read contacts, sync connector data, browse the web, call search providers, call provider APIs, fetch sources, refresh sources, recheck freshness, update evidence, ingest evidence, ingest memory, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, execute plugins, execute tools, execute agents, create an MCP runtime, call MCP tools, run commands, browse files, write files, apply patches, delete files, install packages, or vendor Ruflo/Odysseus code.",
    }),
    buildAutomationReleaseCandidate({
      idHint: "blocked-live-automation-request",
      releaseDecision: "blocked",
      releaseCandidateIdentity:
        "Release candidate identity: automation-release-candidate-blocked-live-automation-request.",
      coveredAutomationSurfaces: [
        "Covered automation surface: blocked live reminder or schedule request.",
        "Covered automation surface: blocked watch activation request.",
        "Covered automation surface: blocked notification delivery request.",
      ],
      reminderReadiness:
        "Reminder readiness: blocked if reminder creation is implied without explicit approval.",
      scheduledResearchReadiness:
        "Scheduled research readiness: blocked if any schedule, source refresh, provider request, or background check is implied.",
      conditionalWatchReadiness:
        "Conditional watch readiness: blocked if a proposed watch would activate, poll, or read data automatically.",
      notificationReadiness:
        "Notification readiness: blocked if notification delivery is implied before a separate delivery approval boundary exists.",
      auditRecoveryReadiness:
        "Audit/recovery readiness: blocked until all release gaps and denied scopes are visible in manual review.",
      knownGaps: [
        "Known gap: live activation is not approved.",
        "Known gap: background work boundary is not approved.",
        "Known gap: delivery channel boundary is not approved.",
      ],
      nextRecommendedRoute:
        "Next recommended route: /task-reminder-boundary or /scheduled-research-check-boundary resolves scope before release review continues.",
      advancedReleaseDetails:
        "Advanced release details: blocked automation release cannot imply automation creation, reminder creation, task scheduling, schedule creation, watch creation, watch activation, background checks, background jobs, cron behavior, interval timers, polling loops, notification sending, connector API calls, Google API calls, automatic email reads, automatic calendar reads, automatic contact reads, OAuth, connector authorization, token storage, secret display, web/search/provider API calls, source auto-fetching, source auto-refreshing, freshness auto-recheck, evidence auto-update, memory/RAG ingestion, memory auto-promotion, Brain graph mutation, plugin execution, tool execution, agent execution, MCP runtime, MCP tool calls, command execution, file mutation, patch application, file deletion, package install behavior, or third-party vendoring.",
    }),
  ];
}

export function buildAutomationReleaseCandidateBoundary(): AutomationReleaseCandidateBoundary {
  return {
    automationReleaseCandidateReviewOnly: true,
    automationsNotCreatedAutomatically: true,
    backgroundWorkDisabledFromUi: true,
    reminderCreationAllowedFromUi: false,
    scheduleCreationAllowedFromUi: false,
    taskSchedulingAllowedFromUi: false,
    automationCreationAllowedFromUi: false,
    watchCreationAllowedFromUi: false,
    watchActivationAllowedFromUi: false,
    backgroundCheckAllowedFromUi: false,
    backgroundJobCreationAllowedFromUi: false,
    backgroundWorkAllowedFromUi: false,
    notificationSendAllowedFromUi: false,
    notificationDeliveryAllowedFromUi: false,
    connectorApiCallsAllowedFromUi: false,
    googleApiCallsAllowedFromUi: false,
    gmailApiCallsAllowedFromUi: false,
    calendarApiCallsAllowedFromUi: false,
    contactsApiCallsAllowedFromUi: false,
    oauthRequestFlowAllowedFromUi: false,
    connectorAuthorizationAllowedFromUi: false,
    connectorTokenStorageAllowedFromUi: false,
    browserTokenStorageAllowed: false,
    localStorageTokenStorageAllowed: false,
    sessionStorageTokenStorageAllowed: false,
    tokensDisplayedAllowed: false,
    secretsDisplayedAllowed: false,
    privateConnectorValuesDisplayedAllowed: false,
    connectorDataReadFromPageAllowed: false,
    connectorSyncAllowedFromUi: false,
    automaticConnectorReadsAllowed: false,
    automaticEmailReadsAllowed: false,
    automaticCalendarReadsAllowed: false,
    automaticContactReadsAllowed: false,
    emailDraftSendAllowedFromUi: false,
    calendarEventMutationAllowedFromUi: false,
    contactMutationAllowedFromUi: false,
    automaticWebBrowsingAllowed: false,
    webBrowsingAllowedFromUi: false,
    webSearchProviderCallsAllowedFromUi: false,
    automaticProviderCallsAllowed: false,
    providerApiCallsAllowedFromUi: false,
    automaticProviderSendAllowed: false,
    promptOrFileAutoSendAllowed: false,
    promptFileSourceAutoSendAllowed: false,
    promptFileSourceConnectorAutoSendAllowed: false,
    sourceAutoSendAllowed: false,
    sourceAutoFetchAllowed: false,
    sourceAutoRefreshAllowed: false,
    freshnessAutoRecheckAllowed: false,
    evidenceAutoIngestionAllowed: false,
    evidenceAutoUpdateAllowed: false,
    memoryIngestionAllowedFromUi: false,
    ragIngestionAllowedFromUi: false,
    memoryAutoPromotionAllowed: false,
    brainGraphMutationAllowed: false,
    appendEventAllowedFromUi: false,
    saveBrainGraphAllowedFromUi: false,
    apiKeysDisplayedAllowed: false,
    secretValuesDisplayedAllowed: false,
    apiKeyLocalStorageAllowed: false,
    localStorageApiKeyStorageAllowed: false,
    processEnvDisplayAllowed: false,
    pluginExecutionAllowedFromUi: false,
    toolExecutionAllowedFromUi: false,
    agentExecutionAllowedFromUi: false,
    extensionRuntimeExecutorCreated: false,
    mcpRuntimeCreated: false,
    mcpServerCreated: false,
    mcpClientCreated: false,
    mcpToolCallsAllowedFromUi: false,
    jarvisdCapabilityExecutionAllowedFromUi: false,
    daemonProcessCreationAllowedFromFrontend: false,
    commandExecutionAllowedFromUi: false,
    shellExecutionAllowedFromUi: false,
    gitCommandExecutionAllowedFromUi: false,
    testExecutionFromUiAllowed: false,
    arbitraryLocalEndpointCallsAllowedFromUi: false,
    arbitraryLocalBrowsingAllowed: false,
    arbitraryPathCrawlingAllowed: false,
    arbitraryFileReadOpenAllowed: false,
    autoOpenLocalFilesAllowed: false,
    fileMutationAllowedFromUi: false,
    fileWriteAllowedFromUi: false,
    fileDeletionAllowedFromUi: false,
    artifactDeletionAllowed: false,
    patchApplyAllowedFromUi: false,
    processKillRestartShutdownAllowedFromUi: false,
    packageInstallAllowedFromUi: false,
    thirdPartyCodeVendoredOrCopied: false,
  };
}

export function summarizeAutomationReleaseCandidate(
  model: Pick<AutomationReleaseCandidateModel, "candidates">
): string {
  return `Automation release candidate audits ${model.candidates.length} release posture(s). Automation release candidate remains review-only, automations are not created automatically, and background work remains disabled from UI.`;
}

export function buildAutomationReleaseCandidateModel(): AutomationReleaseCandidateModel {
  const candidates = buildAutomationReleaseCandidates();
  const model: AutomationReleaseCandidateModel = {
    title: "Automation release candidate",
    summary: "",
    candidates,
    boundary: buildAutomationReleaseCandidateBoundary(),
    releaseLanguage: [...AUTOMATION_RELEASE_CANDIDATE_LANGUAGE],
    advancedDetails: [
      "Automation release candidate",
      "Automation release candidate remains review-only",
      "Automations are not created automatically",
      "Background work remains disabled from UI",
      "Release candidate identity",
      "Covered automation surfaces",
      "Reminder readiness",
      "Scheduled research readiness",
      "Conditional watch readiness",
      "Notification readiness",
      "Audit/recovery readiness",
      "Known gaps",
      "Release decision",
      "Next recommended route",
      "Advanced release details collapsed/secondary",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeAutomationReleaseCandidate(model) };
}
