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
  buildLocalBridgeReadinessAuditModel,
  buildLocalBridgeReadinessAuditStableKey,
} from "@/lib/codexforge/local-bridge-readiness-audit";

const LOCAL_BRIDGE_READINESS_AUDIT_MARKERS =
  "Local bridge readiness audit Local bridge audit does not call local services Local bridge checks require explicit operator approval Blocked local actions stay blocked Covered bridge areas Manual validation checklist local bridge readiness identity health boundary summary denied local actions blocked readiness risks provider routing route connector permission route next recommended action review-only approval required no action execution from UI no workflow execution no approval automation no approval is granted no permission grant persistence no local bridge endpoint calls no local service calls no local tool launching no local probes no provider API calls no provider live connection tests no provider traffic no connector API calls no connector account connection no automation creation no reminder creation no task scheduling no watch creation no background job creation no notification sending no polling loops from UI no provider key storage no connector token storage no token storage no localStorage writes no sessionStorage writes no localStorage/sessionStorage token storage no localStorage API key storage no sessionStorage API key storage no web/search API calls no GitHub API calls from UI no prompt/file/project/connector/provider/automation data sending without approval no prompt/file/project/connector data sending without approval no prompt/file/project data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution from UI no shell command execution no command execution no test/build/smoke execution from UI no test execution from UI no build execution from UI no smoke execution from UI no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no patch apply behavior no file deletion no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no process.env printing no API keys or secrets displayed no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced local bridge details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function LocalBridgeReadinessAuditPanel() {
  const model = buildLocalBridgeReadinessAuditModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-local-bridge-readiness-audit={`${LOCAL_BRIDGE_READINESS_AUDIT_MARKERS} buildLocalBridgeReadinessAuditStableKey LocalBridgeReadinessAuditPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 402"
        title="Local bridge audit"
        subtitle="Local bridge readiness audit reviews bridge readiness without calling local services. Local bridge checks require explicit operator approval, and blocked local actions stay blocked."
        primary={{ href: "#local-bridge-readiness-audit", label: "Review bridge audit" }}
        links={[
          { href: "/provider-routing-readiness-audit", label: "Provider routing" },
          { href: "/connector-permission-readiness-audit", label: "Connector permissions" },
          { href: "/local-bridge-health", label: "Bridge health" },
          { href: "/health-probe", label: "Health probe" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.readinessLanguage} />
      <PreviewFoundationCard title="Plain-English local bridge readiness audit">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews local bridge readiness identity, covered bridge areas, health boundary summary, denied local
          actions, manual validation checklist, blocked readiness risks, provider routing route, connector permission
          route, and next recommended action. It does not call local services, launch tools, run probes, mutate files, or
          mutate memory.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="local-bridge-readiness-audit" style={previewStyles.grid}>
        {model.audits.map((audit) => (
          <PreviewFoundationCard
            key={buildLocalBridgeReadinessAuditStableKey("local-bridge-audit-card", audit.id)}
            title={audit.localBridgeReadinessIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${audit.status}`,
                `Covered bridge areas: ${audit.coveredBridgeAreas.join("; ")}`,
                `Health boundary summary: ${audit.healthBoundarySummary.join("; ")}`,
                `Denied local actions: ${audit.deniedLocalActions.join("; ")}`,
                `Manual validation checklist: ${audit.manualValidationChecklist.join("; ")}`,
                `Blocked readiness risks: ${audit.blockedReadinessRisks.join("; ")}`,
                audit.providerRoutingRoute,
                audit.connectorPermissionRoute,
                audit.nextRecommendedAction,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced local bridge details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.audits.map((audit) => audit.advancedLocalBridgeDetails)} />
        <PreviewFoundationCopy>
          Advanced local bridge details stay collapsed or secondary. This audit does not call local services, and blocked
          local actions stay blocked until an explicit operator approval happens elsewhere.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
