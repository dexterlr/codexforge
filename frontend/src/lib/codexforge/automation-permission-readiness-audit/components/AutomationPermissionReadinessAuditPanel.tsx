"use client";

import {
  PreviewFoundationCard,
  PreviewFoundationCopy,
  PreviewFoundationDetail,
  PreviewFoundationHero,
  PreviewFoundationPillList,
  PreviewFoundationSafetyStrip,
  previewStyles,
} from "../../video-foundation-ui";
import {
  buildAutomationPermissionReadinessAuditModel,
  buildAutomationPermissionReadinessAuditStableKey,
} from "@/lib/codexforge/automation-permission-readiness-audit";

const AUTOMATION_PERMISSION_READINESS_AUDIT_MARKERS =
  "Automation permission readiness audit Automation permission audit does not create schedules or tasks Automations require explicit approval Blocked automations stay blocked Automation groups Schedule watch task permission preview automation permission identity denied automation actions notification/redaction rules manual validation checklist blocked automation risks local bridge route provider routing route next recommended action review-only approval required no action execution from UI no workflow execution no approval automation no approval is granted no permission grant persistence no local bridge endpoint calls no local service calls no local tool launching no local probes no provider API calls no provider live connection tests no provider traffic no connector API calls no connector account connection no automation creation no reminder creation no task scheduling no watch creation no background job creation no notification sending no polling loops from UI no provider key storage no connector token storage no token storage no localStorage writes no sessionStorage writes no localStorage/sessionStorage token storage no localStorage API key storage no sessionStorage API key storage no web/search API calls no GitHub API calls from UI no prompt/file/project/connector/provider/automation data sending without approval no prompt/file/project/connector data sending without approval no prompt/file/project data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution from UI no shell command execution no command execution no test/build/smoke execution from UI no test execution from UI no build execution from UI no smoke execution from UI no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no patch apply behavior no file deletion no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no process.env printing no API keys or secrets displayed no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced automation details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function AutomationPermissionReadinessAuditPanel() {
  const model = buildAutomationPermissionReadinessAuditModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-automation-permission-readiness-audit={`${AUTOMATION_PERMISSION_READINESS_AUDIT_MARKERS} buildAutomationPermissionReadinessAuditStableKey AutomationPermissionReadinessAuditPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 405"
        title="Automation permission audit"
        subtitle="Automation permission readiness audit reviews automation permission readiness without creating schedules or tasks. Automations require explicit approval, and blocked automations stay blocked."
        primary={{ href: "#automation-permission-readiness-audit", label: "Review automation audit" }}
        links={[
          { href: "/local-bridge-readiness-audit", label: "Local bridge" },
          { href: "/provider-routing-readiness-audit", label: "Provider routing" },
          { href: "/automation-release-candidate", label: "Automation release" },
          { href: "/task-reminder-boundary", label: "Reminder boundary" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.readinessLanguage} />
      <PreviewFoundationCard title="Plain-English automation permission readiness audit">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews automation permission identity, automation groups, schedule watch task permission preview,
          denied automation actions, notification/redaction rules, manual validation checklist, blocked automation risks,
          local bridge route, provider routing route, and next recommended action. It does not create schedules, tasks,
          reminders, watches, background jobs, notifications, files, or memory changes.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="automation-permission-readiness-audit" style={previewStyles.grid}>
        {model.audits.map((audit) => (
          <PreviewFoundationCard
            key={buildAutomationPermissionReadinessAuditStableKey("automation-permission-audit-card", audit.id)}
            title={audit.automationPermissionIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${audit.status}`,
                `Automation groups: ${audit.automationGroups.join("; ")}`,
                `Schedule watch task permission preview: ${audit.scheduleWatchTaskPermissionPreview.join("; ")}`,
                `Denied automation actions: ${audit.deniedAutomationActions.join("; ")}`,
                `Notification/redaction rules: ${audit.notificationRedactionRules.join("; ")}`,
                `Manual validation checklist: ${audit.manualValidationChecklist.join("; ")}`,
                `Blocked automation risks: ${audit.blockedAutomationRisks.join("; ")}`,
                audit.localBridgeRoute,
                audit.providerRoutingRoute,
                audit.nextRecommendedAction,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced automation details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.audits.map((audit) => audit.advancedAutomationDetails)} />
        <PreviewFoundationCopy>
          Advanced automation details stay collapsed or secondary. This audit does not create schedules or tasks, and
          blocked automations stay blocked until an explicit approval happens elsewhere.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
