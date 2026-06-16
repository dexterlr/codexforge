import type { LaunchBoundaryAudit, LaunchBoundaryAuditBoundary, LaunchBoundaryAuditModel } from "./launch-boundary-audit-types";
import { buildLaunchBoundaryAuditStableKey } from "./launch-boundary-audit-types";

export const LAUNCH_BOUNDARY_AUDIT_LANGUAGE = [
  "Launch boundary audit",
  "Launch boundary audit does not run boundary probes",
  "Launch boundary approval requires explicit operator approval",
  "Unresolved launch boundary blockers stay blocked",
  "Boundary audit groups",
  "File test project execution checklist",
] as const;

const LAUNCH_BOUNDARY_AUDIT_SAFETY_DETAILS = [
  "review-only",
  "approval required",
  "no action execution from UI",
  "no boundary probe execution",
  "no Daily Beta 1 launch",
  "no Daily Beta 1 launch execution",
  "no launch approval automation",
  "no go/no-go auto-pass",
  "no approval packet send behavior",
  "no rollback trigger",
  "no monitoring job creation",
  "no polling loop creation",
  "no notification sending",
  "no support runbook publish/send behavior",
  "no controlled launch execution",
  "no go-live behavior",
  "no provider API calls",
  "no provider traffic routing",
  "no prompt sending to providers",
  "no provider output persistence",
  "no local model calls",
  "no local bridge endpoint calls",
  "no connector API calls",
  "no connector data fetch",
  "no connector data persistence",
  "no automation execution",
  "no automation creation",
  "no reminder creation",
  "no task scheduling",
  "no schedule creation",
  "no conditional watch creation",
  "no approval decision persistence",
  "no policy auto-apply",
  "no settings persistence",
  "no preference persistence",
  "no patch apply behavior",
  "no file mutation",
  "no file write",
  "no file deletion",
  "no export/write behavior",
  "no command execution",
  "no shell/git/test/build/smoke execution from UI",
  "no creative asset generation",
  "no research execution",
  "no coding workflow execution",
  "no web/search API calls",
  "no GitHub API calls from UI",
  "no Minecraft/project/server build execution yet",
  "no copyrighted franchise asset/name/logo/map/dialogue/music copying",
  "no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live/beta/policy/settings/daily/rollout/release/boundary/e2e/activation/launch data sending without approval",
  "no arbitrary project scanning",
  "no arbitrary local file browsing",
  "no arbitrary path crawling",
  "no arbitrary file read/open from UI",
  "no auto-open local files",
  "no memory/RAG ingestion",
  "no memory auto-promotion",
  "no Brain graph mutation",
  "no appendEvent/saveBrainGraph calls from UI",
  "no plugin execution",
  "no tool execution",
  "no agent execution",
  "no extension runtime executor",
  "no MCP runtime",
  "no MCP tool calls",
  "no localStorage API key storage",
  "no sessionStorage API key storage",
  "no token storage",
  "no endpoint storage",
  "no credential storage",
  "no output storage",
  "no connector data storage",
  "no automation data storage",
  "no process.env printing",
  "no API keys or secrets displayed",
  "no example real key/token/endpoint values",
  "no route coverage removal",
  "no duplicate route hrefs",
  "no duplicate shortLabel values",
  "no Ruflo/Odysseus vendoring",
  "no package install behavior",
  "checkpoint documentation smoke still exists and remains registered",
  "server-only path boundary markers remain intact",
  "no Math.random",
  "no Date.now",
  "no mojibake",
  "no obvious duplicate React key patterns",
  "actual server/build/project execution still requires approved execution boundaries",
] as const;

export function buildLaunchBoundaryAudit(input: Omit<LaunchBoundaryAudit, "id"> & { idHint: string }): LaunchBoundaryAudit {
  const { idHint, ...launchBoundaryAudit } = input;
  return { id: buildLaunchBoundaryAuditStableKey("launch-boundary-audit", idHint, input.status), ...launchBoundaryAudit };
}

export function buildLaunchBoundaryAudits(): LaunchBoundaryAudit[] {
  return [
    buildLaunchBoundaryAudit({
      idHint: "daily-beta-1-launch-boundary-audit",
      status: "blocked",
      launchBoundaryAuditIdentity: "Launch boundary audit identity: daily-beta-1-launch-boundary-audit reviews launch-time execution boundaries without probing them.",
      boundaryAuditGroups: [
        "Boundary audit groups: provider, local model, connector, automation, file/test/project execution, evidence/logging/audit, rollback, stop, credential, output, and memory boundaries.",
        "Boundary audit groups remain review-only; the page does not probe, unlock, or sign off any boundary automatically.",
      ],
      providerLocalConnectorAutomationBoundaryChecklist: [
        "Provider/local/connector/automation boundary checklist: provider calls, local model calls, local bridge endpoints, connector API calls, connector data fetches, automation creation, schedules, reminders, watches, polling loops, and notifications stay blocked from UI execution.",
        "Provider/local/connector/automation boundary checklist confirms that launch governance is visible, not executable, until explicit operator approval and bounded implementations exist.",
      ],
      fileTestProjectExecutionChecklist: [
        "File test project execution checklist: file writes, file deletion, patch apply, shell, git, test, build, smoke, project scanning, local file browsing, and arbitrary path crawling stay blocked.",
        "File test project execution checklist: actual server/build/project execution still requires approved execution boundaries, so an original medieval fantasy server inspired by ice, fire, castles, houses, and kingdoms remains planning-only here.",
      ],
      evidenceLoggingAuditChecklist: [
        "Evidence/logging/audit checklist: this page does not ingest evidence, store provider or model outputs, print process.env values, persist credentials, or mutate the Brain graph.",
        "Evidence/logging/audit checklist keeps audit context readable while launch evidence and audit data sending remain approval-gated.",
      ],
      rollbackStopChecklist: [
        "Rollback/stop checklist: rollback triggers, stop actions, background jobs, monitoring jobs, and notifications require explicit operator approval outside this review page.",
        "Rollback/stop checklist keeps unsafe shortcuts blocked until a bounded rollback implementation is reviewed and approved.",
      ],
      deniedAuditActions: [
        "Denied audit actions: run boundary probes, approve launch boundaries, launch Daily Beta 1, go live, send packets, pass go/no-go, trigger rollback, start monitoring jobs, publish support runbooks, create automations, execute workflows, call providers, call local models, call connectors, mutate files, run commands, or persist credentials or outputs.",
      ],
      unresolvedBoundaryAuditBlockers: [
        "Unresolved launch boundary blockers stay blocked: missing provider approval, missing local model approval, missing connector approval, missing automation approval, missing file/test/project execution approval, missing rollback approval, missing monitoring approval, and missing evidence retention approval.",
      ],
      launchApprovalPacketRoute: "Launch approval packet route: /launch-approval-packet packages approval context without sending or approving launch.",
      launchGoNoGoRoute: "Launch go/no-go route: /launch-go-no-go-review reviews the operator decision without launching or approving automatically.",
      nextRecommendedAction: "Next recommended action: keep Daily Beta 1 unlaunched, resolve boundary blockers, then review the launch approval packet before any operator go/no-go discussion.",
      advancedLaunchBoundaryAuditDetails: `Advanced launch boundary audit details: ${LAUNCH_BOUNDARY_AUDIT_SAFETY_DETAILS.join("; ")}.`,
    }),
  ];
}

export function buildLaunchBoundaryAuditBoundary(): LaunchBoundaryAuditBoundary {
  return { reviewOnly: true, approvalRequired: true, boundaryProbeExecutionAllowedFromUi: false, launchBoundaryApprovalAutomationAllowedFromUi: false, workflowExecutionAllowedFromUi: false, providerApiCallsAllowedFromUi: false, localModelCallsAllowedFromUi: false, connectorApiCallsAllowedFromUi: false, automationCreationAllowedFromUi: false, fileMutationAllowedFromUi: false, commandExecutionAllowedFromUi: false, dailyBetaOneLaunchAllowedFromUi: false, memoryMutationAllowedFromUi: false, credentialStorageAllowed: false, outputStorageAllowed: false };
}

export function summarizeLaunchBoundaryAudit(model: Pick<LaunchBoundaryAuditModel, "launchBoundaryAudits">): string {
  return "Launch boundary audit reviews " + model.launchBoundaryAudits.length + " launch boundary packet without running boundary probes. Launch boundary approval requires explicit operator approval, and unresolved launch boundary blockers stay blocked.";
}

export function buildLaunchBoundaryAuditModel(): LaunchBoundaryAuditModel {
  const launchBoundaryAudits = buildLaunchBoundaryAudits();
  const model: LaunchBoundaryAuditModel = {
    title: "Launch boundary audit",
    summary: "",
    launchBoundaryAudits,
    boundary: buildLaunchBoundaryAuditBoundary(),
    language: [...LAUNCH_BOUNDARY_AUDIT_LANGUAGE],
    advancedDetails: [
      "Launch boundary audit",
      "Launch boundary audit identity",
      "Boundary audit groups",
      "Provider local connector automation boundary checklist",
      "File test project execution checklist",
      "Evidence logging audit checklist",
      "Rollback stop checklist",
      "Denied audit actions",
      "Unresolved launch boundary blockers",
      "Launch approval packet route",
      "Launch go/no-go route",
      "Next recommended action",
      "Launch boundary audit does not run boundary probes",
      "Launch boundary approval requires explicit operator approval",
      "Unresolved launch boundary blockers stay blocked",
      "advanced launch boundary audit details collapsed/secondary",
      ...LAUNCH_BOUNDARY_AUDIT_SAFETY_DETAILS,
    ],
  };
  return { ...model, summary: summarizeLaunchBoundaryAudit(model) };
}
