import type {
  AutomationPermissionReadinessAudit,
  AutomationPermissionReadinessAuditBoundary,
  AutomationPermissionReadinessAuditModel,
} from "./automation-permission-readiness-audit-types";
import { buildAutomationPermissionReadinessAuditStableKey } from "./automation-permission-readiness-audit-types";

export const AUTOMATION_PERMISSION_READINESS_AUDIT_LANGUAGE = [
  "Automation permission readiness audit",
  "Automation permission audit does not create schedules or tasks",
  "Automations require explicit approval",
  "Blocked automations stay blocked",
  "Automation groups",
  "Schedule watch task permission preview",
] as const;

export function buildAutomationPermissionReadinessAudit(
  input: Omit<AutomationPermissionReadinessAudit, "id"> & { idHint: string }
): AutomationPermissionReadinessAudit {
  const { idHint, ...audit } = input;
  return {
    id: buildAutomationPermissionReadinessAuditStableKey("automation-permission-readiness-audit", idHint, input.status),
    ...audit,
  };
}

export function buildAutomationPermissionReadinessAudits(): AutomationPermissionReadinessAudit[] {
  return [
    buildAutomationPermissionReadinessAudit({
      idHint: "review-only-automation-scope",
      status: "ready-for-review",
      automationPermissionIdentity:
        "Automation permission identity: automation-permission-readiness-audit-review-only-automation-scope.",
      automationGroups: [
        "Automation groups: reminders, scheduled research, conditional watches, notification handoff, audit/recovery, and manual review.",
        "Automation groups: every automation group is a permission preview only; no schedule, task, watch, reminder, or background job is created.",
      ],
      scheduleWatchTaskPermissionPreview: [
        "Schedule watch task permission preview: schedules, watches, tasks, reminders, and background jobs remain blocked until explicit approval.",
        "Schedule watch task permission preview: this page reviews permission wording without activating automation.",
      ],
      deniedAutomationActions: [
        "Denied automation actions: create schedules, create tasks, create reminders, create watches, create automations, create background jobs, send notifications, refresh sources, ingest evidence, persist grants, and run workflows.",
        "Denied automation actions: blocked automations stay blocked on this page.",
      ],
      notificationRedactionRules: [
        "Notification/redaction rules: notification content stays redacted until approved.",
        "Notification/redaction rules: private connector details, provider details, task details, schedule details, secrets, tokens, and account values are not displayed or stored here.",
      ],
      manualValidationChecklist: [
        "Manual validation checklist: review automation owner, trigger source, approval owner, notification redaction, denied actions, recovery route, and audit evidence outside this UI.",
        "Manual validation checklist: confirm automations require explicit approval before any future schedule, task, watch, reminder, or notification is created.",
      ],
      blockedAutomationRisks: [
        "Blocked automation risks: any request to create schedules, create tasks, create reminders, create watches, send notifications, start background jobs, refresh sources, or persist permission grants blocks readiness.",
        "Blocked automation risks: automation permission audit does not create schedules or tasks and cannot approve automation access.",
      ],
      localBridgeRoute:
        "Local bridge route: /local-bridge-readiness-audit reviews local bridge readiness without calling local services.",
      providerRoutingRoute:
        "Provider routing route: /provider-routing-readiness-audit reviews provider routing without sending provider traffic.",
      nextRecommendedAction:
        "Next recommended action: review local bridge and provider routing readiness before any future automation approval packet.",
      advancedAutomationDetails:
        "Advanced automation details: automation permission readiness audit is review-only. Automation permission audit does not create schedules or tasks, automations require explicit approval, and blocked automations stay blocked. It does not create schedules, create tasks, create reminders, create watches, create automations, create background jobs, send notifications, run workflows, refresh sources, ingest evidence, persist permission grants, call connector APIs, connect accounts, call provider APIs, send provider traffic, call local bridge endpoints, call local services, launch local tools, scan projects, browse local files, read local files, mutate files, write files, delete files, export files, execute actions, approve actions, automate approval, run shell commands, run git commands, run tests, run builds, run smoke checks, apply patches, ingest memory, ingest RAG, auto-promote memory, mutate the Brain graph, call appendEvent, call saveBrainGraph, execute plugins, execute tools, execute agents, create an MCP runtime, call MCP tools, print process.env, display secrets, remove route coverage, install packages, or vendor Ruflo/Odysseus code.",
    }),
    buildAutomationPermissionReadinessAudit({
      idHint: "blocked-schedule-task-request",
      status: "blocked",
      automationPermissionIdentity:
        "Automation permission identity: automation-permission-readiness-audit-blocked-schedule-task-request.",
      automationGroups: [
        "Automation groups: blocked because the request asks to create schedules or tasks.",
      ],
      scheduleWatchTaskPermissionPreview: [
        "Schedule watch task permission preview: no schedule, watch, task, reminder, or background job is activated from this audit.",
      ],
      deniedAutomationActions: [
        "Denied automation actions: schedules, tasks, reminders, watches, automations, background jobs, and notifications remain blocked.",
      ],
      notificationRedactionRules: [
        "Notification/redaction rules: notification content and private details remain redacted.",
      ],
      manualValidationChecklist: [
        "Manual validation checklist: return to approval review before any future automation action.",
      ],
      blockedAutomationRisks: [
        "Blocked automation risks: schedule and task creation are outside this review-only audit.",
      ],
      localBridgeRoute:
        "Local bridge route: /local-bridge-readiness-audit remains review-only.",
      providerRoutingRoute:
        "Provider routing route: /provider-routing-readiness-audit remains review-only.",
      nextRecommendedAction:
        "Next recommended action: keep automation creation blocked and document the missing approval.",
      advancedAutomationDetails:
        "Advanced automation details: blocked automation permission readiness cannot recover by creating schedules, creating tasks, creating watches, creating reminders, creating background jobs, sending notifications, or persisting permission grants.",
    }),
  ];
}

export function buildAutomationPermissionReadinessAuditBoundary(): AutomationPermissionReadinessAuditBoundary {
  return {
    automationPermissionReadinessAuditReviewOnly: true,
    automationPermissionAuditDoesNotCreateSchedulesOrTasks: true,
    automationsRequireExplicitApproval: true,
    blockedAutomationsStayBlocked: true,
    actionsExecutedFromUi: false,
    actionsApprovedFromUi: false,
    approvalAutomationAllowedFromUi: false,
    workflowExecutionAllowedFromUi: false,
    automationCreationAllowedFromUi: false,
    scheduleCreationAllowedFromUi: false,
    taskSchedulingAllowedFromUi: false,
    reminderCreationAllowedFromUi: false,
    watchCreationAllowedFromUi: false,
    backgroundJobCreationAllowedFromUi: false,
    notificationSendingAllowedFromUi: false,
    permissionGrantPersistenceAllowedFromUi: false,
    connectorApiCallsAllowedFromUi: false,
    connectorAccountConnectionAllowedFromUi: false,
    providerApiCallsAllowedFromUi: false,
    providerTrafficAllowedFromUi: false,
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

export function summarizeAutomationPermissionReadinessAudit(
  model: Pick<AutomationPermissionReadinessAuditModel, "audits">
): string {
  return `Automation permission readiness audit prepares ${model.audits.length} automation permission posture(s). Automation permission audit does not create schedules or tasks, automations require explicit approval, and blocked automations stay blocked.`;
}

export function buildAutomationPermissionReadinessAuditModel(): AutomationPermissionReadinessAuditModel {
  const audits = buildAutomationPermissionReadinessAudits();
  const model: AutomationPermissionReadinessAuditModel = {
    title: "Automation permission readiness audit",
    summary: "",
    audits,
    boundary: buildAutomationPermissionReadinessAuditBoundary(),
    readinessLanguage: [...AUTOMATION_PERMISSION_READINESS_AUDIT_LANGUAGE],
    advancedDetails: [
      "Automation permission readiness audit",
      "automation permission identity",
      "Automation groups",
      "Schedule watch task permission preview",
      "denied automation actions",
      "notification/redaction rules",
      "Manual validation checklist",
      "blocked automation risks",
      "local bridge route",
      "provider routing route",
      "next recommended action",
      "Automation permission audit does not create schedules or tasks",
      "Automations require explicit approval",
      "Blocked automations stay blocked",
      "advanced automation details collapsed/secondary",
      "No route coverage removal",
      "Server-only path boundary markers remain intact",
    ],
  };
  return { ...model, summary: summarizeAutomationPermissionReadinessAudit(model) };
}
