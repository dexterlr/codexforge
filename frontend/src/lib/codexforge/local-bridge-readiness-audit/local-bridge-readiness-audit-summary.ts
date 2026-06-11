import type {
  LocalBridgeReadinessAudit,
  LocalBridgeReadinessAuditBoundary,
  LocalBridgeReadinessAuditModel,
} from "./local-bridge-readiness-audit-types";
import { buildLocalBridgeReadinessAuditStableKey } from "./local-bridge-readiness-audit-types";

export const LOCAL_BRIDGE_READINESS_AUDIT_LANGUAGE = [
  "Local bridge readiness audit",
  "Local bridge audit does not call local services",
  "Local bridge checks require explicit operator approval",
  "Blocked local actions stay blocked",
  "Covered bridge areas",
  "Manual validation checklist",
] as const;

export function buildLocalBridgeReadinessAudit(
  input: Omit<LocalBridgeReadinessAudit, "id"> & { idHint: string }
): LocalBridgeReadinessAudit {
  const { idHint, ...audit } = input;
  return {
    id: buildLocalBridgeReadinessAuditStableKey("local-bridge-readiness-audit", idHint, input.status),
    ...audit,
  };
}

export function buildLocalBridgeReadinessAudits(): LocalBridgeReadinessAudit[] {
  return [
    buildLocalBridgeReadinessAudit({
      idHint: "review-only-bridge-readiness",
      status: "ready-for-review",
      localBridgeReadinessIdentity:
        "Local bridge readiness identity: local-bridge-readiness-audit-review-only-bridge-readiness.",
      coveredBridgeAreas: [
        "Covered bridge areas: bridge identity, health boundary, approval posture, denied local actions, setup notes, operator validation, and handoff routes.",
        "Covered bridge areas: local service status is reviewed from static readiness language only; no local service is called.",
      ],
      healthBoundarySummary: [
        "Health boundary summary: Local bridge audit does not call local services.",
        "Health boundary summary: Local bridge checks require explicit operator approval before any future health check can run.",
      ],
      deniedLocalActions: [
        "Denied local actions: local bridge endpoints, local services, local probes, local tools, arbitrary project scans, file reads, file writes, shell commands, git commands, tests, builds, smoke checks, and memory mutation.",
        "Denied local actions: blocked local actions stay blocked on this page.",
      ],
      manualValidationChecklist: [
        "Manual validation checklist: confirm the bridge owner, allowed health target list, operator approval path, blocked action list, and rollback notes outside this UI.",
        "Manual validation checklist: record validation evidence manually; this page does not run probes, launch tools, mutate files, or mutate memory.",
      ],
      blockedReadinessRisks: [
        "Blocked readiness risks: any request to call a local bridge endpoint, launch a local tool, scan a project, read files, write files, run commands, or run probes blocks readiness.",
        "Blocked readiness risks: missing operator approval keeps every local check in review-only mode.",
      ],
      providerRoutingRoute:
        "Provider routing route: /provider-routing-readiness-audit reviews provider routing without sending provider traffic.",
      connectorPermissionRoute:
        "Connector permission route: /connector-permission-readiness-audit reviews connector permissions without connecting accounts.",
      nextRecommendedAction:
        "Next recommended action: review the provider routing and connector permission audits before any future local bridge approval packet.",
      advancedLocalBridgeDetails:
        "Advanced local bridge details: local bridge readiness audit is review-only. Local bridge audit does not call local services, local bridge checks require explicit operator approval, and blocked local actions stay blocked. It does not call local bridge endpoints, call local services, launch tools, run probes, run workflows, execute actions, approve actions, automate approval, test providers, call provider APIs, call connector APIs, connect accounts, create automations, persist permission grants, store credentials, scan projects, browse local files, read local files, mutate files, write files, delete files, export files, run shell commands, run git commands, run tests, run builds, run smoke checks, apply patches, mutate memory, ingest RAG, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, create reminders, schedule tasks, create watches, create background jobs, send notifications, execute plugins, execute tools, execute agents, create an MCP runtime, call MCP tools, print process.env, display secrets, remove route coverage, install packages, or vendor Ruflo/Odysseus code.",
    }),
    buildLocalBridgeReadinessAudit({
      idHint: "blocked-local-action-request",
      status: "blocked",
      localBridgeReadinessIdentity:
        "Local bridge readiness identity: local-bridge-readiness-audit-blocked-local-action-request.",
      coveredBridgeAreas: [
        "Covered bridge areas: blocked request handling for local bridge readiness.",
      ],
      healthBoundarySummary: [
        "Health boundary summary: a blocked request cannot become a health probe from this page.",
      ],
      deniedLocalActions: [
        "Denied local actions: local services, endpoints, probes, tools, files, commands, memory, and automations stay blocked.",
      ],
      manualValidationChecklist: [
        "Manual validation checklist: return to operator approval and safe target review before any future bridge check.",
      ],
      blockedReadinessRisks: [
        "Blocked readiness risks: direct local service calls and local tool launches remain release blockers.",
      ],
      providerRoutingRoute:
        "Provider routing route: /provider-routing-readiness-audit remains review-only.",
      connectorPermissionRoute:
        "Connector permission route: /connector-permission-readiness-audit remains review-only.",
      nextRecommendedAction:
        "Next recommended action: keep the local action blocked and document the missing approval.",
      advancedLocalBridgeDetails:
        "Advanced local bridge details: blocked local bridge readiness cannot recover by calling local services, launching tools, scanning files, running commands, approving permissions, or mutating memory.",
    }),
  ];
}

export function buildLocalBridgeReadinessAuditBoundary(): LocalBridgeReadinessAuditBoundary {
  return {
    localBridgeReadinessAuditReviewOnly: true,
    localBridgeAuditDoesNotCallLocalServices: true,
    localBridgeChecksRequireExplicitOperatorApproval: true,
    blockedLocalActionsStayBlocked: true,
    actionsExecutedFromUi: false,
    actionsApprovedFromUi: false,
    approvalAutomationAllowedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    localBridgeEndpointCallsAllowedFromUi: false,
    localServiceCallsAllowedFromUi: false,
    localToolLaunchingAllowedFromUi: false,
    localProbeExecutionAllowedFromUi: false,
    localFileReadScanAllowedFromUi: false,
    localFileMutationAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    connectorApiCallsAllowedFromUi: false,
    automationCreationAllowedFromUi: false,
    permissionGrantPersistenceAllowedFromUi: false,
    memoryMutationAllowedFromUi: false,
    brainGraphMutationAllowed: false,
    appendEventAllowedFromUi: false,
    saveBrainGraphAllowedFromUi: false,
    shellExecutionAllowedFromUi: false,
    gitCommandExecutionAllowedFromUi: false,
    commandExecutionAllowedFromUi: false,
    testBuildSmokeExecutionAllowedFromUi: false,
    tokenStorageAllowed: false,
    secretDisplayAllowed: false,
    processEnvDisplayAllowed: false,
    pluginExecutionAllowedFromUi: false,
    toolExecutionAllowedFromUi: false,
    agentExecutionAllowedFromUi: false,
    mcpRuntimeCreated: false,
    mcpToolCallsAllowedFromUi: false,
    routeCoverageRemovalAllowed: false,
    thirdPartyCodeVendoredOrCopied: false,
  };
}

export function summarizeLocalBridgeReadinessAudit(
  model: Pick<LocalBridgeReadinessAuditModel, "audits">
): string {
  return `Local bridge readiness audit prepares ${model.audits.length} bridge readiness posture(s). Local bridge audit does not call local services, local bridge checks require explicit operator approval, and blocked local actions stay blocked.`;
}

export function buildLocalBridgeReadinessAuditModel(): LocalBridgeReadinessAuditModel {
  const audits = buildLocalBridgeReadinessAudits();
  const model: LocalBridgeReadinessAuditModel = {
    title: "Local bridge readiness audit",
    summary: "",
    audits,
    boundary: buildLocalBridgeReadinessAuditBoundary(),
    readinessLanguage: [...LOCAL_BRIDGE_READINESS_AUDIT_LANGUAGE],
    advancedDetails: [
      "Local bridge readiness audit",
      "local bridge readiness identity",
      "Covered bridge areas",
      "health boundary summary",
      "denied local actions",
      "Manual validation checklist",
      "blocked readiness risks",
      "provider routing route",
      "connector permission route",
      "next recommended action",
      "Local bridge audit does not call local services",
      "Local bridge checks require explicit operator approval",
      "Blocked local actions stay blocked",
      "advanced local bridge details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeLocalBridgeReadinessAudit(model) };
}
