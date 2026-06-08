import type {
  ResearchWorkspaceShell,
  ResearchWorkspaceShellBoundary,
  ResearchWorkspaceShellModel,
} from "./research-workspace-shell-types";
import { buildResearchWorkspaceShellStableKey } from "./research-workspace-shell-types";

export const RESEARCH_WORKSPACE_SHELL_LANGUAGE = [
  "Research workspace shell",
  "Research workspace does not browse automatically",
  "Sources are reviewed before use",
  "Research evidence is not auto-promoted to memory",
  "Evidence quality criteria",
  "Evidence inbox route",
] as const;

export function buildResearchWorkspaceShell(
  input: Omit<ResearchWorkspaceShell, "id"> & { idHint: string }
): ResearchWorkspaceShell {
  const { idHint, ...workspace } = input;
  return {
    id: buildResearchWorkspaceShellStableKey(
      "research-workspace-shell",
      idHint,
      input.status
    ),
    ...workspace,
  };
}

export function buildResearchWorkspaceShells(): ResearchWorkspaceShell[] {
  return [
    buildResearchWorkspaceShell({
      idHint: "approved-planning-review",
      status: "ready for review",
      workspaceIdentity:
        "Workspace identity: research-workspace-shell-approved-planning-review.",
      researchQuestionSummary:
        "Research question summary: prepare a reviewed plan for a future web research task before any web, provider, tool, or memory action can happen.",
      sourceRequirements: [
        "Prefer primary sources or official documentation when available",
        "Require citation details before a source can be used",
        "Keep source collection separate from evidence review",
      ],
      evidenceQualityCriteria: [
        "Relevant to the research question",
        "Traceable to a source route or reviewed source packet",
        "Flagged when stale, conflicting, incomplete, or sensitive",
      ],
      privacySensitivityClassification:
        "Privacy/sensitivity classification: low-risk public research plan, with sensitive prompts, private files, secrets, and memory context excluded.",
      providerWebBoundaryDependency:
        "Provider/web boundary dependency: /web-research-provider-boundary must review query scope, approval, privacy, and budget before any future call.",
      sourceCollectorRoute:
        "Source collector route: /research-source-collector-trial prepares reviewed source metadata without fetching sources automatically.",
      evidenceInboxRoute:
        "Evidence inbox route: /research-evidence-inbox reviews evidence packets before use, citation, summary, or memory promotion.",
      nonGoals: [
        "No automatic browsing",
        "No provider request",
        "No source ingestion",
        "No memory promotion",
        "No tool execution",
      ],
      blockedReasons: [
        "Research workspace does not browse automatically",
        "Sources are reviewed before use",
        "Research evidence is not auto-promoted to memory",
      ],
      advancedWorkspaceDetails:
        "Advanced workspace details: this shell does not browse the web, call providers, send prompts/files/sources, fetch sources, ingest evidence, mutate the Brain graph, call appendEvent, call saveBrainGraph, execute tools, execute agents, create MCP runtime, read local files, write files, or apply patches.",
    }),
    buildResearchWorkspaceShell({
      idHint: "blocked-auto-browse-request",
      status: "blocked",
      workspaceIdentity:
        "Workspace identity: research-workspace-shell-blocked-auto-browse-request.",
      researchQuestionSummary:
        "Research question summary: blocked when a task asks the workspace to browse, search, collect, cite, or promote evidence automatically.",
      sourceRequirements: [
        "Source scope must be narrow and reviewed",
        "Provider approval must be explicit",
        "Evidence review must remain separate from memory promotion",
      ],
      evidenceQualityCriteria: [
        "Block unreviewed source claims",
        "Block stale or conflicting evidence until reviewed",
        "Block sensitive or secret-bearing source packets",
      ],
      privacySensitivityClassification:
        "Privacy/sensitivity classification: blocked by default when the query includes private files, secrets, hidden memory context, or sensitive user data.",
      providerWebBoundaryDependency:
        "Provider/web boundary dependency: blocked until /web-research-provider-boundary can review explicit approval and allowed source scope.",
      sourceCollectorRoute:
        "Source collector route: /research-source-collector-trial stays unavailable for automatic collection.",
      evidenceInboxRoute:
        "Evidence inbox route: /research-evidence-inbox remains the human review checkpoint.",
      nonGoals: [
        "No web browsing from the shell",
        "No source auto-fetching",
        "No auto-citation",
        "No Brain graph mutation",
      ],
      blockedReasons: [
        "Automatic browsing requested",
        "Provider approval missing",
        "Evidence review boundary missing",
      ],
      advancedWorkspaceDetails:
        "Advanced workspace details: blocked requests cannot imply web/search/provider calls, prompt/file/source sending, token spend, source collection, source ingestion, memory/RAG ingestion, memory auto-promotion, plugin execution, tool execution, agent execution, MCP calls, command execution, local file access, or file mutation.",
    }),
  ];
}

export function buildResearchWorkspaceShellBoundary(): ResearchWorkspaceShellBoundary {
  return {
    researchWorkspaceReviewOnly: true,
    automaticWebBrowsingAllowed: false,
    webBrowsingAllowedFromUi: false,
    webResearchProviderCallsRequireExplicitApproval: true,
    webSearchProviderCallsAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    automaticProviderCallsAllowed: false,
    automaticProviderSendAllowed: false,
    promptOrFileAutoSendAllowed: false,
    promptFileSourceAutoSendAllowed: false,
    sourceAutoSendAllowed: false,
    sourceAutoFetchAllowed: false,
    sourceAutoIngestionAllowed: false,
    evidenceAutoIngestionAllowed: false,
    evidenceAutoCitationAllowed: false,
    memoryIngestionAllowedFromUi: false,
    ragIngestionAllowedFromUi: false,
    memoryAutoPromotionAllowed: false,
    brainGraphMutationAllowed: false,
    appendEventAllowedFromUi: false,
    saveBrainGraphAllowedFromUi: false,
    apiKeysDisplayedAllowed: false,
    secretValuesDisplayedAllowed: false,
    secretsDisplayedAllowed: false,
    apiKeyLocalStorageAllowed: false,
    localStorageApiKeyStorageAllowed: false,
    processEnvDisplayAllowed: false,
    autoSpendTokensAllowed: false,
    tokenSpendAllowedFromUi: false,
    providerRetryAllowedFromUi: false,
    pluginExecutionAllowedFromUi: false,
    toolExecutionAllowedFromUi: false,
    agentExecutionAllowedFromUi: false,
    extensionInstallAllowedFromUi: false,
    extensionRuntimeExecutorCreated: false,
    mcpRuntimeCreated: false,
    mcpServerCreated: false,
    mcpClientCreated: false,
    mcpToolCallsAllowedFromUi: false,
    jarvisdPermissionAutoGrantAllowed: false,
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

export function summarizeResearchWorkspaceShell(
  model: Pick<ResearchWorkspaceShellModel, "workspaces">
): string {
  return `Research workspace shell prepares ${model.workspaces.length} review workspace posture(s). Research workspace does not browse automatically, sources are reviewed before use, and research evidence is not auto-promoted to memory.`;
}

export function buildResearchWorkspaceShellModel(): ResearchWorkspaceShellModel {
  const workspaces = buildResearchWorkspaceShells();
  const model: ResearchWorkspaceShellModel = {
    title: "Research workspace shell",
    summary: "",
    workspaces,
    boundary: buildResearchWorkspaceShellBoundary(),
    workspaceLanguage: [...RESEARCH_WORKSPACE_SHELL_LANGUAGE],
    advancedDetails: [
      "Research workspace shell",
      "Research workspace does not browse automatically",
      "Sources are reviewed before use",
      "Research evidence is not auto-promoted to memory",
      "Workspace identity",
      "Research question summary",
      "Source requirements",
      "Evidence quality criteria",
      "Privacy/sensitivity classification",
      "Provider/web boundary dependency",
      "Source collector route",
      "Evidence inbox route",
      "Non-goals",
      "Blocked reasons",
      "Advanced workspace details collapsed/secondary",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeResearchWorkspaceShell(model) };
}
