import type {
  ResearchWorkflowReadinessAudit,
  ResearchWorkflowReadinessAuditBoundary,
  ResearchWorkflowReadinessAuditModel,
} from "./research-workflow-readiness-audit-types";
import { buildResearchWorkflowReadinessAuditStableKey } from "./research-workflow-readiness-audit-types";

export const RESEARCH_WORKFLOW_READINESS_AUDIT_LANGUAGE = [
  "Research workflow readiness audit",
  "Research readiness audit does not run research",
  "Research execution requires explicit operator approval",
  "Evidence is not ingested automatically",
  "Supported research workflow groups",
  "Freshness conflict checklist",
] as const;

export function buildResearchWorkflowReadinessAudit(
  input: Omit<ResearchWorkflowReadinessAudit, "id"> & { idHint: string }
): ResearchWorkflowReadinessAudit {
  const { idHint, ...audit } = input;
  return {
    id: buildResearchWorkflowReadinessAuditStableKey("research-workflow-readiness-audit", idHint, input.status),
    ...audit,
  };
}

export function buildResearchWorkflowReadinessAudits(): ResearchWorkflowReadinessAudit[] {
  return [
    buildResearchWorkflowReadinessAudit({
      idHint: "review-only-research-workflow-readiness",
      status: "ready-for-review",
      researchWorkflowReadinessIdentity:
        "Research workflow readiness identity: research-workflow-readiness-audit-review-only-research-workflow-readiness.",
      supportedResearchWorkflowGroups: [
        "Supported research workflow groups: research planning, source scope review, evidence packet review, claim review, citation draft review, freshness and conflict review, report review, and handoff planning.",
        "Supported research workflow groups: every group is review-only here; research readiness audit does not run research.",
      ],
      evidenceDependencySummary: [
        "Evidence dependency summary: evidence packets need source metadata, freshness notes, conflict flags, redaction status, citation readiness, and reviewer notes before use.",
        "Evidence dependency summary: evidence is not ingested automatically and this page does not fetch, browse, search, cite, summarize, or promote evidence.",
      ],
      connectorProviderBoundarySummary: [
        "Connector/provider boundary summary: connectors, providers, web search, GitHub, and local bridge routes require separate explicit approval before any future research execution.",
        "Connector/provider boundary summary: this audit does not call connectors, providers, web/search APIs, GitHub APIs, or local bridge endpoints.",
      ],
      freshnessConflictChecklist: [
        "Freshness conflict checklist: identify stale dates, conflicting claims, missing publisher details, sensitive evidence, unresolved source quality notes, and missing approval notes.",
        "Freshness conflict checklist: conflicts remain visible and blocked until explicitly reviewed elsewhere.",
      ],
      deniedResearchActions: [
        "Denied research actions: browsing, searching, fetching, source collection, provider calls, connector calls, evidence ingestion, memory ingestion, report export, file mutation, and workflow execution.",
        "Denied research actions: research execution requires explicit operator approval and no approval is granted here.",
      ],
      blockedResearchReadinessRisks: [
        "Blocked research readiness risks: automatic browse/search/fetch requests, unresolved freshness, unresolved conflicts, missing redaction, missing source metadata, and automatic evidence ingestion.",
        "Blocked research readiness risks: any request to run research from this page keeps readiness blocked.",
      ],
      codingReadinessRoute:
        "Coding readiness route: /coding-workflow-readiness-audit reviews coding readiness without applying code.",
      operatorCockpitRoute:
        "Operator cockpit route: /operator-cockpit-release-candidate reviews cockpit readiness without executing workflows.",
      nextRecommendedAction:
        "Next recommended action: review coding workflow readiness and then return to the operator cockpit release candidate.",
      advancedResearchReadinessDetails:
        "Advanced research readiness details: research workflow readiness audit is review-only. Research readiness audit does not run research, research execution requires explicit operator approval, and evidence is not ingested automatically. It does not browse, search, fetch, collect sources, call providers, call connectors, call web/search APIs, call GitHub APIs, call local bridge endpoints, send prompt/file/project/connector/provider/workflow data without approval, ingest evidence, update evidence, ingest memory, ingest RAG, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, scan projects, browse local files, crawl paths, read local files, open local files, auto-open files, mutate files, write files, delete files, export files, apply patches, run shell commands, run git commands, run tests, run builds, run smoke checks, create reminders, schedule tasks, create automations, create background jobs, send notifications, start polling loops, execute plugins, execute tools, execute agents, create an extension runtime executor, create an MCP runtime, call MCP tools, store tokens, store API keys, print process.env, display secrets, publish releases, install packages, remove route coverage, or vendor Ruflo/Odysseus code.",
    }),
    buildResearchWorkflowReadinessAudit({
      idHint: "blocked-research-execution-request",
      status: "blocked",
      researchWorkflowReadinessIdentity:
        "Research workflow readiness identity: research-workflow-readiness-audit-blocked-research-execution-request.",
      supportedResearchWorkflowGroups: [
        "Supported research workflow groups: blocked request handling for research workflow readiness.",
      ],
      evidenceDependencySummary: [
        "Evidence dependency summary: blocked because the request asks this page to fetch or ingest evidence.",
      ],
      connectorProviderBoundarySummary: [
        "Connector/provider boundary summary: blocked because connector, provider, web, GitHub, or local bridge calls are outside this page.",
      ],
      freshnessConflictChecklist: [
        "Freshness conflict checklist: unresolved freshness and conflict details stay visible and blocked.",
      ],
      deniedResearchActions: [
        "Denied research actions: browsing, searching, fetching, ingestion, provider calls, connector calls, report export, and memory promotion remain blocked.",
      ],
      blockedResearchReadinessRisks: [
        "Blocked research readiness risks: automatic research requests cannot become readiness from this audit page.",
      ],
      codingReadinessRoute:
        "Coding readiness route: /coding-workflow-readiness-audit remains review-only.",
      operatorCockpitRoute:
        "Operator cockpit route: /operator-cockpit-release-candidate remains review-only.",
      nextRecommendedAction:
        "Next recommended action: keep the research action blocked and document the missing approval.",
      advancedResearchReadinessDetails:
        "Advanced research readiness details: blocked research readiness cannot recover by browsing, searching, fetching, ingesting evidence, calling APIs, writing files, exporting reports, or promoting memory.",
    }),
  ];
}

export function buildResearchWorkflowReadinessAuditBoundary(): ResearchWorkflowReadinessAuditBoundary {
  return {
    researchWorkflowReadinessAuditReviewOnly: true,
    researchReadinessAuditDoesNotRunResearch: true,
    researchExecutionRequiresExplicitOperatorApproval: true,
    evidenceNotIngestedAutomatically: true,
    actionsExecutedFromUi: false,
    actionsApprovedFromUi: false,
    approvalAutomationAllowedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    researchExecutionAllowedFromUi: false,
    browsingAllowedFromUi: false,
    searchAllowedFromUi: false,
    sourceFetchAllowedFromUi: false,
    externalDataFetchingAllowedFromUi: false,
    evidenceIngestionAllowedFromUi: false,
    evidenceAutoIngestionAllowed: false,
    sourceAutoIngestionAllowed: false,
    sourceAutoFetchAllowed: false,
    providerApiCallsAllowedFromUi: false,
    connectorApiCallsAllowedFromUi: false,
    webSearchProviderCallsAllowedFromUi: false,
    githubApiCallsAllowedFromUi: false,
    localBridgeEndpointCallsAllowedFromUi: false,
    promptFileProjectConnectorProviderWorkflowDataAutoSendAllowed: false,
    arbitraryProjectScanningAllowed: false,
    arbitraryLocalFileBrowsingAllowed: false,
    arbitraryPathCrawlingAllowed: false,
    arbitraryFileReadOpenAllowed: false,
    autoOpenLocalFilesAllowed: false,
    fileMutationAllowedFromUi: false,
    fileWriteAllowedFromUi: false,
    fileExportAllowedFromUi: false,
    fileDeletionAllowedFromUi: false,
    patchApplyAllowedFromUi: false,
    memoryIngestionAllowedFromUi: false,
    ragIngestionAllowedFromUi: false,
    memoryAutoPromotionAllowed: false,
    brainGraphMutationAllowed: false,
    appendEventAllowedFromUi: false,
    saveBrainGraphAllowedFromUi: false,
    shellExecutionAllowedFromUi: false,
    gitCommandExecutionAllowedFromUi: false,
    commandExecutionAllowedFromUi: false,
    testBuildSmokeExecutionAllowedFromUi: false,
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

export function summarizeResearchWorkflowReadinessAudit(
  model: Pick<ResearchWorkflowReadinessAuditModel, "audits">
): string {
  return `Research workflow readiness audit prepares ${model.audits.length} research readiness posture(s). Research readiness audit does not run research, research execution requires explicit operator approval, and evidence is not ingested automatically.`;
}

export function buildResearchWorkflowReadinessAuditModel(): ResearchWorkflowReadinessAuditModel {
  const audits = buildResearchWorkflowReadinessAudits();
  const model: ResearchWorkflowReadinessAuditModel = {
    title: "Research workflow readiness audit",
    summary: "",
    audits,
    boundary: buildResearchWorkflowReadinessAuditBoundary(),
    readinessLanguage: [...RESEARCH_WORKFLOW_READINESS_AUDIT_LANGUAGE],
    advancedDetails: [
      "Research workflow readiness audit",
      "research workflow readiness identity",
      "Supported research workflow groups",
      "evidence dependency summary",
      "connector/provider boundary summary",
      "Freshness conflict checklist",
      "denied research actions",
      "blocked research readiness risks",
      "coding readiness route",
      "operator cockpit route",
      "next recommended action",
      "Research readiness audit does not run research",
      "Research execution requires explicit operator approval",
      "Evidence is not ingested automatically",
      "advanced research readiness details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeResearchWorkflowReadinessAudit(model) };
}
