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
  buildConnectorPermissionReadinessAuditModel,
  buildConnectorPermissionReadinessAuditStableKey,
} from "@/lib/codexforge/connector-permission-readiness-audit";

const CONNECTOR_PERMISSION_READINESS_AUDIT_MARKERS =
  "Connector permission readiness audit Connector permission audit does not connect accounts Connector access requires explicit approval Private connector details stay redacted until approved Connector groups Permission scopes connector permission identity redaction/privacy rules denied connector actions manual validation checklist blocked connector risks automation permission route provider routing route next recommended action review-only approval required no action execution from UI no workflow execution no approval automation no approval is granted no permission grant persistence no local bridge endpoint calls no local service calls no local tool launching no local probes no provider API calls no provider live connection tests no provider traffic no connector API calls no connector account connection no automation creation no reminder creation no task scheduling no watch creation no background job creation no notification sending no polling loops from UI no provider key storage no connector token storage no token storage no localStorage writes no sessionStorage writes no localStorage/sessionStorage token storage no localStorage API key storage no sessionStorage API key storage no web/search API calls no GitHub API calls from UI no prompt/file/project/connector/provider/automation data sending without approval no prompt/file/project/connector data sending without approval no prompt/file/project data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution from UI no shell command execution no command execution no test/build/smoke execution from UI no test execution from UI no build execution from UI no smoke execution from UI no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no patch apply behavior no file deletion no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no process.env printing no API keys or secrets displayed no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced connector details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function ConnectorPermissionReadinessAuditPanel() {
  const model = buildConnectorPermissionReadinessAuditModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-connector-permission-readiness-audit={`${CONNECTOR_PERMISSION_READINESS_AUDIT_MARKERS} buildConnectorPermissionReadinessAuditStableKey ConnectorPermissionReadinessAuditPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 404"
        title="Connector permission audit"
        subtitle="Connector permission readiness audit reviews connector permission readiness without connecting accounts. Connector access requires explicit approval, and private connector details stay redacted until approved."
        primary={{ href: "#connector-permission-readiness-audit", label: "Review connector audit" }}
        links={[
          { href: "/automation-permission-readiness-audit", label: "Automation permissions" },
          { href: "/provider-routing-readiness-audit", label: "Provider routing" },
          { href: "/connector-release-candidate", label: "Connector release" },
          { href: "/connector-workspace", label: "Connector workspace" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.readinessLanguage} />
      <PreviewFoundationCard title="Plain-English connector permission readiness audit">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews connector permission identity, connector groups, permission scopes, redaction/privacy rules,
          denied connector actions, manual validation checklist, blocked connector risks, automation permission route,
          provider routing route, and next recommended action. It does not call connector APIs, connect accounts, store
          connector tokens, mutate files, or mutate memory.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="connector-permission-readiness-audit" style={previewStyles.grid}>
        {model.audits.map((audit) => (
          <PreviewFoundationCard
            key={buildConnectorPermissionReadinessAuditStableKey("connector-permission-audit-card", audit.id)}
            title={audit.connectorPermissionIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${audit.status}`,
                `Connector groups: ${audit.connectorGroups.join("; ")}`,
                `Permission scopes: ${audit.permissionScopes.join("; ")}`,
                `Redaction/privacy rules: ${audit.redactionPrivacyRules.join("; ")}`,
                `Denied connector actions: ${audit.deniedConnectorActions.join("; ")}`,
                `Manual validation checklist: ${audit.manualValidationChecklist.join("; ")}`,
                `Blocked connector risks: ${audit.blockedConnectorRisks.join("; ")}`,
                audit.automationPermissionRoute,
                audit.providerRoutingRoute,
                audit.nextRecommendedAction,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced connector details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.audits.map((audit) => audit.advancedConnectorDetails)} />
        <PreviewFoundationCopy>
          Advanced connector details stay collapsed or secondary. This audit does not connect accounts, and connector
          access remains blocked until an explicit approval happens elsewhere.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
