import type {
  ProviderRoutingReadinessAudit,
  ProviderRoutingReadinessAuditBoundary,
  ProviderRoutingReadinessAuditModel,
} from "./provider-routing-readiness-audit-types";
import { buildProviderRoutingReadinessAuditStableKey } from "./provider-routing-readiness-audit-types";

export const PROVIDER_ROUTING_READINESS_AUDIT_LANGUAGE = [
  "Provider routing readiness audit",
  "Provider routing audit does not send provider traffic",
  "Provider routing requires explicit approval",
  "Keys and tokens are never displayed or stored here",
  "Provider groups",
  "Model routing preview",
] as const;

export function buildProviderRoutingReadinessAudit(
  input: Omit<ProviderRoutingReadinessAudit, "id"> & { idHint: string }
): ProviderRoutingReadinessAudit {
  const { idHint, ...audit } = input;
  return {
    id: buildProviderRoutingReadinessAuditStableKey("provider-routing-readiness-audit", idHint, input.status),
    ...audit,
  };
}

export function buildProviderRoutingReadinessAudits(): ProviderRoutingReadinessAudit[] {
  return [
    buildProviderRoutingReadinessAudit({
      idHint: "review-only-model-routing",
      status: "ready-for-review",
      providerRoutingReadinessIdentity:
        "Provider routing readiness identity: provider-routing-readiness-audit-review-only-model-routing.",
      providerGroups: [
        "Provider groups: local model candidates, approved cloud candidates, blocked experimental candidates, and manual review fallback.",
        "Provider groups: every group is a static preview and no provider is contacted.",
      ],
      modelRoutingPreview: [
        "Model routing preview: private project work defaults to local or manual review until explicit approval permits a provider route.",
        "Model routing preview: cloud routing remains advisory and does not send provider traffic.",
      ],
      deniedRoutingPaths: [
        "Denied routing paths: live provider traffic, provider API calls, provider connection tests, automatic retries, token spending, prompt/file/project sends, key display, token display, and provider settings mutation.",
        "Denied routing paths: denied provider paths remain blocked until an operator approves a future route outside this page.",
      ],
      keyTokenSafetyRules: [
        "Key/token safety rules: Keys and tokens are never displayed or stored here.",
        "Key/token safety rules: browser storage, localStorage, sessionStorage, process.env display, secret display, and raw credential echoing stay blocked.",
      ],
      manualValidationChecklist: [
        "Manual validation checklist: review provider group labels, fallback reason, data sensitivity, approval owner, budget rule, and token/key handling outside this UI.",
        "Manual validation checklist: confirm the intended model route manually before any future provider traffic is approved.",
      ],
      blockedProviderRisks: [
        "Blocked provider risks: any request to test a live connection, send prompts, send files, spend tokens, store keys, show tokens, call APIs, or mutate provider settings blocks readiness.",
        "Blocked provider risks: provider routing requires explicit approval and this page cannot grant it.",
      ],
      connectorPermissionRoute:
        "Connector permission route: /connector-permission-readiness-audit reviews connector permissions without connecting accounts.",
      automationPermissionRoute:
        "Automation permission route: /automation-permission-readiness-audit reviews automation permissions without creating schedules or tasks.",
      nextRecommendedAction:
        "Next recommended action: review connector and automation permission readiness before any future provider routing approval packet.",
      advancedProviderDetails:
        "Advanced provider details: provider routing readiness audit is review-only. Provider routing audit does not send provider traffic, provider routing requires explicit approval, and keys and tokens are never displayed or stored here. It does not call provider APIs, test live connections, spend tokens, route live traffic, send prompts, send files, send project data, store keys, store tokens, mutate provider settings, call connectors, connect accounts, create automations, persist permission grants, call local bridge endpoints, call local services, launch local tools, scan projects, browse local files, read local files, mutate files, write files, delete files, export files, run workflows, execute actions, approve actions, automate approval, run shell commands, run git commands, run tests, run builds, run smoke checks, apply patches, ingest memory, ingest RAG, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, create reminders, schedule tasks, create watches, create background jobs, send notifications, execute plugins, execute tools, execute agents, create an MCP runtime, call MCP tools, print process.env, display secrets, remove route coverage, install packages, or vendor Ruflo/Odysseus code.",
    }),
    buildProviderRoutingReadinessAudit({
      idHint: "blocked-provider-traffic-request",
      status: "blocked",
      providerRoutingReadinessIdentity:
        "Provider routing readiness identity: provider-routing-readiness-audit-blocked-provider-traffic-request.",
      providerGroups: [
        "Provider groups: blocked because the request asks for live provider traffic.",
      ],
      modelRoutingPreview: [
        "Model routing preview: no model route is activated from this audit.",
      ],
      deniedRoutingPaths: [
        "Denied routing paths: provider calls, live tests, token spending, prompt sends, file sends, and credential storage remain blocked.",
      ],
      keyTokenSafetyRules: [
        "Key/token safety rules: keys and tokens stay redacted and unstored.",
      ],
      manualValidationChecklist: [
        "Manual validation checklist: return to approval review before attempting a future provider route.",
      ],
      blockedProviderRisks: [
        "Blocked provider risks: live connection testing and provider traffic are outside this audit.",
      ],
      connectorPermissionRoute:
        "Connector permission route: /connector-permission-readiness-audit remains review-only.",
      automationPermissionRoute:
        "Automation permission route: /automation-permission-readiness-audit remains review-only.",
      nextRecommendedAction:
        "Next recommended action: keep provider traffic blocked and document the missing approval.",
      advancedProviderDetails:
        "Advanced provider details: blocked provider routing cannot recover by sending provider traffic, testing connections, showing credentials, storing keys, storing tokens, or sending prompt/file/project data.",
    }),
  ];
}

export function buildProviderRoutingReadinessAuditBoundary(): ProviderRoutingReadinessAuditBoundary {
  return {
    providerRoutingReadinessAuditReviewOnly: true,
    providerRoutingAuditDoesNotSendProviderTraffic: true,
    providerRoutingRequiresExplicitApproval: true,
    keysAndTokensNeverDisplayedOrStoredHere: true,
    actionsExecutedFromUi: false,
    actionsApprovedFromUi: false,
    approvalAutomationAllowedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    liveProviderTrafficAllowedFromUi: false,
    providerConnectionTestsAllowedFromUi: false,
    providerKeyStorageAllowedFromUi: false,
    providerTokenStorageAllowedFromUi: false,
    connectorApiCallsAllowedFromUi: false,
    connectorAccountConnectionAllowedFromUi: false,
    automationCreationAllowedFromUi: false,
    permissionGrantPersistenceAllowedFromUi: false,
    localBridgeEndpointCallsAllowedFromUi: false,
    localServiceCallsAllowedFromUi: false,
    localToolLaunchingAllowedFromUi: false,
    localFileReadScanAllowedFromUi: false,
    fileMutationAllowedFromUi: false,
    memoryMutationAllowedFromUi: false,
    brainGraphMutationAllowed: false,
    appendEventAllowedFromUi: false,
    saveBrainGraphAllowedFromUi: false,
    shellExecutionAllowedFromUi: false,
    gitCommandExecutionAllowedFromUi: false,
    commandExecutionAllowedFromUi: false,
    testBuildSmokeExecutionAllowedFromUi: false,
    processEnvDisplayAllowed: false,
    secretsDisplayedAllowed: false,
    pluginExecutionAllowedFromUi: false,
    toolExecutionAllowedFromUi: false,
    agentExecutionAllowedFromUi: false,
    mcpRuntimeCreated: false,
    mcpToolCallsAllowedFromUi: false,
    routeCoverageRemovalAllowed: false,
    thirdPartyCodeVendoredOrCopied: false,
  };
}

export function summarizeProviderRoutingReadinessAudit(
  model: Pick<ProviderRoutingReadinessAuditModel, "audits">
): string {
  return `Provider routing readiness audit prepares ${model.audits.length} provider routing posture(s). Provider routing audit does not send provider traffic, provider routing requires explicit approval, and keys and tokens are never displayed or stored here.`;
}

export function buildProviderRoutingReadinessAuditModel(): ProviderRoutingReadinessAuditModel {
  const audits = buildProviderRoutingReadinessAudits();
  const model: ProviderRoutingReadinessAuditModel = {
    title: "Provider routing readiness audit",
    summary: "",
    audits,
    boundary: buildProviderRoutingReadinessAuditBoundary(),
    readinessLanguage: [...PROVIDER_ROUTING_READINESS_AUDIT_LANGUAGE],
    advancedDetails: [
      "Provider routing readiness audit",
      "provider routing readiness identity",
      "Provider groups",
      "Model routing preview",
      "denied routing paths",
      "key/token safety rules",
      "Manual validation checklist",
      "blocked provider risks",
      "connector permission route",
      "automation permission route",
      "next recommended action",
      "Provider routing audit does not send provider traffic",
      "Provider routing requires explicit approval",
      "Keys and tokens are never displayed or stored here",
      "advanced provider details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeProviderRoutingReadinessAudit(model) };
}
