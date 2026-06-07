import type {
  TestPlannerLiveContextBoundary,
  TestPlannerLiveContextIntegration,
  TestPlannerLiveContextIntegrationModel,
} from "./test-planner-live-context-integration-types";
import { buildTestPlannerLiveContextIntegrationStableKey } from "./test-planner-live-context-integration-types";

export const TEST_PLANNER_LIVE_CONTEXT_INTEGRATION_LANGUAGE = [
  "Test planner live context integration",
  "Live context improves test planning but does not run tests",
  "Commands are not executed from this page",
  "Env values and secrets are never displayed",
  "Recommended test scope",
  "Execution trial route",
] as const;

export function buildTestPlannerLiveContextIntegration(
  input: Omit<TestPlannerLiveContextIntegration, "id"> & { idHint: string }
): TestPlannerLiveContextIntegration {
  const { idHint, ...integration } = input;
  return {
    id: buildTestPlannerLiveContextIntegrationStableKey(
      "test-planner-live-context-integration",
      idHint,
      input.status,
      input.confidence
    ),
    ...integration,
  };
}

export function buildTestPlannerLiveContextIntegrations(): TestPlannerLiveContextIntegration[] {
  return [
    buildTestPlannerLiveContextIntegration({
      idHint: "reviewed-patch-context-test-plan",
      status: "review-ready",
      confidence: "medium",
      integrationIdentity:
        "Integration identity: test-planner-live-context-reviewed-patch, a planning-only bridge from reviewed project intelligence and patch preview context into test planning.",
      sourceProjectIntelligenceResult:
        "Source project intelligence result: /project-intelligence-result supplies reviewed scope, dependency notes, findings summary, and redaction status before test planning uses context.",
      sourcePatchPreviewLiveContext:
        "Source patch preview live context: /patch-preview-live-context supplies affected files, hunk intent, dependency risk, rollback note, and blocked reasons without applying patches.",
      affectedFilesModulesSummary:
        "Affected files/modules summary: route, component, typed model, command registry, navigation registry, and smoke-script areas are summarized from reviewed metadata only.",
      recommendedTestScope:
        "Recommended test scope: focused smoke coverage for the new route, model exports, registry entries, and safety markers before wider managed-suite validation.",
      recommendedCommandSummary:
        "Recommended command summary: plan the smallest reviewed smoke command that covers the changed surface; commands are not executed from this page.",
      riskSecretsRedactionStatus:
        "Risk/secrets redaction status: suspected secrets remain redacted, env values and secrets are never displayed, and raw sensitive snippets stay out of the planner.",
      confidenceCoverageNote:
        "Confidence/coverage note: medium confidence because reviewed project and patch context are present, but real test results still require a separate approved execution path.",
      executionTrialRoute:
        "Execution trial route: /test-execution-trial remains the separate review surface before any future local test execution boundary.",
      blockedReasons: [
        "Live context improves test planning but does not run tests",
        "Commands are not executed from this page",
        "Env values and secrets are never displayed",
      ],
      advancedContextDetails:
        "Advanced context details: live context does not execute commands, run tests, mutate files, browse arbitrary files, call providers, send prompts, call Jarvisd capabilities, mutate Brain graph, call appendEvent, call saveBrainGraph, or auto-promote memory.",
    }),
    buildTestPlannerLiveContextIntegration({
      idHint: "blocked-missing-live-context",
      status: "blocked",
      confidence: "blocked",
      integrationIdentity:
        "Integration identity: test-planner-live-context-blocked-source.",
      sourceProjectIntelligenceResult:
        "Source project intelligence result: blocked because reviewed project intelligence is missing, stale, or still waiting on redaction follow-up.",
      sourcePatchPreviewLiveContext:
        "Source patch preview live context: blocked because /patch-preview-live-context has no reviewed patch context packet.",
      affectedFilesModulesSummary:
        "Affected files/modules summary: unavailable while source context is blocked; this page does not inspect local paths to guess coverage.",
      recommendedTestScope:
        "Recommended test scope: blocked until reviewed project intelligence and patch preview context identify intended scope.",
      recommendedCommandSummary:
        "Recommended command summary: none. The planner does not infer commands from arbitrary UI context and does not run tests automatically.",
      riskSecretsRedactionStatus:
        "Risk/secrets redaction status: blocked and redacted by default; secret values and env values are never displayed.",
      confidenceCoverageNote:
        "Confidence/coverage note: blocked because coverage cannot be assessed without reviewed source context.",
      executionTrialRoute:
        "Execution trial route: /test-execution-trial stays blocked until reviewed planning context exists.",
      blockedReasons: [
        "Source project intelligence missing",
        "Patch preview live context missing",
        "Redaction status not reviewed",
      ],
      advancedContextDetails:
        "Advanced context details: blocked live context cannot run commands, run tests, open files, read files, write files, apply patches, or send data to providers.",
    }),
  ];
}

export function buildTestPlannerLiveContextBoundary(): TestPlannerLiveContextBoundary {
  return {
    reviewedProjectIntelligenceRequired: true,
    reviewedPatchPreviewLiveContextRequired: true,
    liveContextRunsTestsAllowed: false,
    commandsExecutedFromPageAllowed: false,
    commandExecutionAllowedFromUi: false,
    shellExecutionAllowedFromUi: false,
    gitCommandExecutionAllowedFromUi: false,
    testExecutionFromUiAllowed: false,
    localActionExecutionAllowedFromUi: false,
    arbitraryLocalBrowsingAllowed: false,
    arbitraryPathCrawlingAllowed: false,
    arbitraryFileReadOpenAllowed: false,
    autoOpenLocalFilesAllowed: false,
    rawFetchAllowedFromUi: false,
    fileMutationAllowedFromUi: false,
    fileWriteAllowedFromUi: false,
    fileDeletionAllowedFromUi: false,
    patchApplyAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    openAiCompatibleApiCallsAllowedFromUi: false,
    automaticProviderSendAllowed: false,
    promptOrFileAutoSendAllowed: false,
    autoSpendTokensAllowed: false,
    secretValuesDisplayedAllowed: false,
    apiKeyLocalStorageAllowed: false,
    sessionTokenStorageAllowedInBrowser: false,
    signingMaterialStorageAllowedInBrowser: false,
    processEnvDisplayAllowed: false,
    jarvisdCapabilityExecutionAllowedFromUi: false,
    daemonProcessCreationAllowedFromFrontend: false,
    appendEventAllowedFromUi: false,
    saveBrainGraphAllowedFromUi: false,
    brainGraphMutationAllowed: false,
    memoryAutoPromotionAllowed: false,
    processKillRestartShutdownAllowedFromUi: false,
    packageInstallAllowedFromUi: false,
  };
}

export function summarizeTestPlannerLiveContextIntegration(
  model: Pick<TestPlannerLiveContextIntegrationModel, "integrations">
): string {
  return `Test planner live context integration prepares ${model.integrations.length} reviewed planning context shape(s). Live context improves test planning but does not run tests, commands are not executed from this page, and env values and secrets are never displayed.`;
}

export function buildTestPlannerLiveContextIntegrationModel(): TestPlannerLiveContextIntegrationModel {
  const integrations = buildTestPlannerLiveContextIntegrations();
  const model: TestPlannerLiveContextIntegrationModel = {
    title: "Test planner live context integration",
    summary: "",
    integrations,
    boundary: buildTestPlannerLiveContextBoundary(),
    contextLanguage: [...TEST_PLANNER_LIVE_CONTEXT_INTEGRATION_LANGUAGE],
    advancedDetails: [
      "Test planner live context integration",
      "Live context improves test planning but does not run tests",
      "Commands are not executed from this page",
      "Env values and secrets are never displayed",
      "Integration identity",
      "Source project intelligence result",
      "Source patch preview live context",
      "Affected files/modules summary",
      "Recommended test scope",
      "Recommended command summary",
      "Risk/secrets redaction status",
      "Confidence/coverage note",
      "Execution trial route",
      "Blocked reasons",
      "Advanced context details collapsed/secondary",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeTestPlannerLiveContextIntegration(model) };
}
