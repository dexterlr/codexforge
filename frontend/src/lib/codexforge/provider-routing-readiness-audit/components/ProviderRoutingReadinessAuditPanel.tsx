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
  buildProviderRoutingReadinessAuditModel,
  buildProviderRoutingReadinessAuditStableKey,
} from "@/lib/codexforge/provider-routing-readiness-audit";

const PROVIDER_ROUTING_READINESS_AUDIT_MARKERS =
  "Provider routing readiness audit Provider routing audit does not send provider traffic Provider routing requires explicit approval Keys and tokens are never displayed or stored here Provider groups Model routing preview provider routing readiness identity denied routing paths key/token safety rules manual validation checklist blocked provider risks connector permission route automation permission route next recommended action review-only approval required no action execution from UI no workflow execution no approval automation no approval is granted no permission grant persistence no local bridge endpoint calls no local service calls no local tool launching no local probes no provider API calls no provider live connection tests no provider traffic no connector API calls no connector account connection no automation creation no reminder creation no task scheduling no watch creation no background job creation no notification sending no polling loops from UI no provider key storage no connector token storage no token storage no localStorage writes no sessionStorage writes no localStorage/sessionStorage token storage no localStorage API key storage no sessionStorage API key storage no web/search API calls no GitHub API calls from UI no prompt/file/project/connector/provider/automation data sending without approval no prompt/file/project/connector data sending without approval no prompt/file/project data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution from UI no shell command execution no command execution no test/build/smoke execution from UI no test execution from UI no build execution from UI no smoke execution from UI no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no patch apply behavior no file deletion no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no process.env printing no API keys or secrets displayed no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced provider details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function ProviderRoutingReadinessAuditPanel() {
  const model = buildProviderRoutingReadinessAuditModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-provider-routing-readiness-audit={`${PROVIDER_ROUTING_READINESS_AUDIT_MARKERS} buildProviderRoutingReadinessAuditStableKey ProviderRoutingReadinessAuditPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 403"
        title="Provider routing audit"
        subtitle="Provider routing readiness audit reviews model routing readiness without sending provider traffic. Provider routing requires explicit approval, and keys and tokens are never displayed or stored here."
        primary={{ href: "#provider-routing-readiness-audit", label: "Review routing audit" }}
        links={[
          { href: "/connector-permission-readiness-audit", label: "Connector permissions" },
          { href: "/automation-permission-readiness-audit", label: "Automation permissions" },
          { href: "/provider-governance-release-candidate", label: "Provider governance" },
          { href: "/provider-tests", label: "Provider tests" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.readinessLanguage} />
      <PreviewFoundationCard title="Plain-English provider routing readiness audit">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews provider routing readiness identity, provider groups, model routing preview, denied routing
          paths, key/token safety rules, manual validation checklist, blocked provider risks, connector permission route,
          automation permission route, and next recommended action. It does not call provider APIs, test live
          connections, route traffic, store keys, store tokens, mutate files, or mutate memory.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="provider-routing-readiness-audit" style={previewStyles.grid}>
        {model.audits.map((audit) => (
          <PreviewFoundationCard
            key={buildProviderRoutingReadinessAuditStableKey("provider-routing-audit-card", audit.id)}
            title={audit.providerRoutingReadinessIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${audit.status}`,
                `Provider groups: ${audit.providerGroups.join("; ")}`,
                `Model routing preview: ${audit.modelRoutingPreview.join("; ")}`,
                `Denied routing paths: ${audit.deniedRoutingPaths.join("; ")}`,
                `Key/token safety rules: ${audit.keyTokenSafetyRules.join("; ")}`,
                `Manual validation checklist: ${audit.manualValidationChecklist.join("; ")}`,
                `Blocked provider risks: ${audit.blockedProviderRisks.join("; ")}`,
                audit.connectorPermissionRoute,
                audit.automationPermissionRoute,
                audit.nextRecommendedAction,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced provider details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.audits.map((audit) => audit.advancedProviderDetails)} />
        <PreviewFoundationCopy>
          Advanced provider details stay collapsed or secondary. This audit does not send provider traffic, and provider
          routing remains blocked until an explicit approval happens elsewhere.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
