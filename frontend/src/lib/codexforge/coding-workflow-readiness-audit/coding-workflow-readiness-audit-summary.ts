import type {
  CodingWorkflowReadinessAudit,
  CodingWorkflowReadinessAuditBoundary,
  CodingWorkflowReadinessAuditModel,
} from "./coding-workflow-readiness-audit-types";
import { buildCodingWorkflowReadinessAuditStableKey } from "./coding-workflow-readiness-audit-types";

export const CODING_WORKFLOW_READINESS_AUDIT_LANGUAGE = [
  "Coding workflow readiness audit",
  "Coding readiness audit does not apply code",
  "Code changes require explicit operator approval",
  "Validation is required before merge",
  "Supported coding workflow groups",
  "Approval and apply gates",
] as const;

export function buildCodingWorkflowReadinessAudit(
  input: Omit<CodingWorkflowReadinessAudit, "id"> & { idHint: string }
): CodingWorkflowReadinessAudit {
  const { idHint, ...audit } = input;
  return {
    id: buildCodingWorkflowReadinessAuditStableKey("coding-workflow-readiness-audit", idHint, input.status),
    ...audit,
  };
}

export function buildCodingWorkflowReadinessAudits(): CodingWorkflowReadinessAudit[] {
  return [
    buildCodingWorkflowReadinessAudit({
      idHint: "review-only-coding-workflow-readiness",
      status: "ready-for-review",
      codingWorkflowReadinessIdentity:
        "Coding workflow readiness identity: coding-workflow-readiness-audit-review-only-coding-workflow-readiness.",
      supportedCodingWorkflowGroups: [
        "Supported coding workflow groups: change planning, patch preview, approval packet review, apply gate review, validation planning, result capture review, recovery planning, and release handoff.",
        "Supported coding workflow groups: every group is static and review-only here; coding readiness audit does not apply code.",
      ],
      repoProjectBoundarySummary: [
        "Repo/project boundary summary: reviewed target repo, allowed workspace, project context, redaction status, rollback note, and operator approval are required before future coding execution.",
        "Repo/project boundary summary: this audit does not scan arbitrary local projects, browse local files, read local files, write files, or run git or shell commands.",
      ],
      validationChecklist: [
        "Validation checklist: define the expected tests, build checks, smoke checks, manual QA notes, rollback verification, and merge blocker status before code can be merged.",
        "Validation checklist: validation is required before merge and this page does not run tests, builds, smoke checks, or shell commands.",
      ],
      approvalApplyGates: [
        "Approval and apply gates: code changes require explicit operator approval, reviewed diff scope, rollback plan, validation plan, and separate apply boundary.",
        "Approval and apply gates: apply behavior stays unavailable from this audit page.",
      ],
      deniedCodingActions: [
        "Denied coding actions: patch application, file mutation, file write, file deletion, shell command execution, git command execution, test execution, build execution, smoke execution, commit creation, provider calls, and memory mutation.",
        "Denied coding actions: no code is applied and no approval is granted automatically.",
      ],
      blockedCodingReadinessRisks: [
        "Blocked coding readiness risks: missing approval, missing validation plan, unsafe repo boundary, missing rollback note, unresolved merge blockers, and any request to apply code from this page.",
        "Blocked coding readiness risks: direct patch application or command execution keeps readiness blocked.",
      ],
      creativeReadinessRoute:
        "Creative readiness route: /creative-workflow-readiness-audit reviews creative readiness without generating assets.",
      operatorCockpitRoute:
        "Operator cockpit route: /operator-cockpit-release-candidate reviews cockpit readiness without executing workflows.",
      nextRecommendedAction:
        "Next recommended action: review creative workflow readiness and then return to the operator cockpit release candidate.",
      advancedCodingReadinessDetails:
        "Advanced coding readiness details: coding workflow readiness audit is review-only. Coding readiness audit does not apply code, code changes require explicit operator approval, and validation is required before merge. It does not run coding workflows, apply patches, apply code, run tests, run builds, run smoke checks, run shell commands, run git commands, create commits, call providers, call connectors, call web/search APIs, call GitHub APIs, call local bridge endpoints, send prompt/file/project/connector/provider/workflow data without approval, scan projects, browse local files, crawl paths, read local files, open local files, auto-open files, mutate files, write files, delete files, export files, ingest memory, ingest RAG, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, create reminders, schedule tasks, create automations, create background jobs, send notifications, start polling loops, execute plugins, execute tools, execute agents, create an extension runtime executor, create an MCP runtime, call MCP tools, store tokens, store API keys, print process.env, display secrets, publish releases, install packages, remove route coverage, or vendor Ruflo/Odysseus code.",
    }),
    buildCodingWorkflowReadinessAudit({
      idHint: "blocked-code-apply-request",
      status: "blocked",
      codingWorkflowReadinessIdentity:
        "Coding workflow readiness identity: coding-workflow-readiness-audit-blocked-code-apply-request.",
      supportedCodingWorkflowGroups: [
        "Supported coding workflow groups: blocked request handling for coding workflow readiness.",
      ],
      repoProjectBoundarySummary: [
        "Repo/project boundary summary: blocked because the request asks this page to touch files, scan projects, or run commands.",
      ],
      validationChecklist: [
        "Validation checklist: blocked because validation must be reviewed before merge and cannot run from this page.",
      ],
      approvalApplyGates: [
        "Approval and apply gates: blocked because code changes require explicit operator approval and a separate apply gate.",
      ],
      deniedCodingActions: [
        "Denied coding actions: patch application, tests, builds, smoke checks, shell commands, git commands, commits, file mutation, and memory mutation remain blocked.",
      ],
      blockedCodingReadinessRisks: [
        "Blocked coding readiness risks: unapproved code application cannot become readiness from this audit page.",
      ],
      creativeReadinessRoute:
        "Creative readiness route: /creative-workflow-readiness-audit remains review-only.",
      operatorCockpitRoute:
        "Operator cockpit route: /operator-cockpit-release-candidate remains review-only.",
      nextRecommendedAction:
        "Next recommended action: keep the coding action blocked and document the missing approval or validation gate.",
      advancedCodingReadinessDetails:
        "Advanced coding readiness details: blocked coding readiness cannot recover by applying code, running commands, running tests, writing files, creating commits, or promoting memory.",
    }),
  ];
}

export function buildCodingWorkflowReadinessAuditBoundary(): CodingWorkflowReadinessAuditBoundary {
  return {
    codingWorkflowReadinessAuditReviewOnly: true,
    codingReadinessAuditDoesNotApplyCode: true,
    codeChangesRequireExplicitOperatorApproval: true,
    validationRequiredBeforeMerge: true,
    actionsExecutedFromUi: false,
    actionsApprovedFromUi: false,
    approvalAutomationAllowedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    codingWorkflowExecutionAllowedFromUi: false,
    patchApplyAllowedFromUi: false,
    codeApplyAllowedFromUi: false,
    testExecutionFromUiAllowed: false,
    buildExecutionFromUiAllowed: false,
    smokeExecutionFromUiAllowed: false,
    testBuildSmokeExecutionAllowedFromUi: false,
    shellExecutionAllowedFromUi: false,
    gitCommandExecutionAllowedFromUi: false,
    commandExecutionAllowedFromUi: false,
    localBridgeEndpointCallsAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    connectorApiCallsAllowedFromUi: false,
    webSearchProviderCallsAllowedFromUi: false,
    githubApiCallsAllowedFromUi: false,
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

export function summarizeCodingWorkflowReadinessAudit(
  model: Pick<CodingWorkflowReadinessAuditModel, "audits">
): string {
  return `Coding workflow readiness audit prepares ${model.audits.length} coding readiness posture(s). Coding readiness audit does not apply code, code changes require explicit operator approval, and validation is required before merge.`;
}

export function buildCodingWorkflowReadinessAuditModel(): CodingWorkflowReadinessAuditModel {
  const audits = buildCodingWorkflowReadinessAudits();
  const model: CodingWorkflowReadinessAuditModel = {
    title: "Coding workflow readiness audit",
    summary: "",
    audits,
    boundary: buildCodingWorkflowReadinessAuditBoundary(),
    readinessLanguage: [...CODING_WORKFLOW_READINESS_AUDIT_LANGUAGE],
    advancedDetails: [
      "Coding workflow readiness audit",
      "coding workflow readiness identity",
      "Supported coding workflow groups",
      "repo/project boundary summary",
      "validation checklist",
      "Approval and apply gates",
      "denied coding actions",
      "blocked coding readiness risks",
      "creative readiness route",
      "operator cockpit route",
      "next recommended action",
      "Coding readiness audit does not apply code",
      "Code changes require explicit operator approval",
      "Validation is required before merge",
      "advanced coding readiness details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeCodingWorkflowReadinessAudit(model) };
}
