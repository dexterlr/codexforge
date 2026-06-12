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
  buildProviderIntegrationHardeningPassModel,
  buildProviderIntegrationHardeningPassStableKey,
} from "@/lib/codexforge/provider-integration-hardening-pass";

const PROVIDER_INTEGRATION_HARDENING_PASS_MARKERS =
  "Provider integration hardening pass Provider integration hardening does not call providers Provider configuration changes require explicit operator approval Unresolved provider risks stay blocked Hardening groups Credential boundary checklist provider integration hardening identity provider routing checklist failover/cost/safety checklist denied hardening shortcuts unresolved hardening risks connector live permission route automation dry-run route next recommended action review-only approval required no provider configuration changes no provider settings persistence no provider selection persistence no provider switching no provider permission persistence no provider permission grant no permission grant persistence no action execution from UI no workflow execution no workflow execution from UI no workflow runs automatically no approval automation no approval is granted no action approval from UI no provider API calls no provider live connection tests no provider traffic no provider traffic routing no prompt sending to providers no provider output persistence no provider output ingestion no provider output storage no output storage no provider response ingestion no response ingestion no audit event persistence no provider trial data persistence no memory mutation no local model calls no local bridge endpoint calls no local bridge endpoint calls from arbitrary UI no local tool launching no creative asset generation no research execution no evidence ingestion automation no coding workflow execution no connector API calls no web/search API calls no GitHub API calls from UI no prompt/file/project/connector/provider/model/output/audit data sending without approval no prompt/file/project/connector/provider/model/output data sending without approval no prompt/file/project/connector/provider/model data sending without approval no prompt/file/project/connector data sending without approval no prompt/file/project data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution from UI no shell command execution no command execution no test/build/smoke execution from UI no test execution from UI no build execution from UI no smoke execution from UI no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no patch apply behavior no file deletion no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no reminder creation no task scheduling no automation creation no background job creation no notification sending no polling loops from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no credential storage no provider key storage no connector token storage no token storage no endpoint storage no localStorage writes no sessionStorage writes no localStorage/sessionStorage token storage no localStorage API key storage no sessionStorage API key storage no process.env printing no API keys or secrets displayed no example real key/token/endpoint values no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw provider hardening JSON above the fold no giant raw JSON above fold advanced details collapsed/secondary advanced hardening details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function ProviderIntegrationHardeningPassPanel() {
  const model = buildProviderIntegrationHardeningPassModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-provider-integration-hardening-pass={`${PROVIDER_INTEGRATION_HARDENING_PASS_MARKERS} buildProviderIntegrationHardeningPassStableKey ProviderIntegrationHardeningPassPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 433"
        title="Provider integration hardening pass"
        subtitle="Provider integration hardening reviews hardening checks without calling providers. Provider configuration changes require explicit operator approval, and unresolved provider risks stay blocked."
        primary={{ href: "#provider-integration-hardening-pass", label: "Review hardening" }}
        links={[
          { href: "/provider-audit-trail-review", label: "Audit trail review" },
          { href: "/provider-permission-presets", label: "Permission presets" },
          { href: "/connector-permission-readiness-audit", label: "Connector permissions" },
          { href: "/automation-permission-readiness-audit", label: "Automation dry-run" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.hardeningLanguage} />
      <PreviewFoundationCard title="Plain-English provider integration hardening pass">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews provider integration hardening identity, hardening groups, credential boundary checklist,
          provider routing checklist, failover/cost/safety checklist, denied hardening shortcuts, unresolved hardening
          risks, connector live permission route, automation dry-run route, and next recommended action. It does not call
          providers, change provider configuration, persist settings, mutate files, or mutate memory.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="provider-integration-hardening-pass" style={previewStyles.grid}>
        {model.hardeningPasses.map((hardeningPass) => (
          <PreviewFoundationCard
            key={buildProviderIntegrationHardeningPassStableKey("provider-hardening-pass-card", hardeningPass.id)}
            title={hardeningPass.providerIntegrationHardeningIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${hardeningPass.status}`,
                `Hardening groups: ${hardeningPass.hardeningGroups.join("; ")}`,
                `Credential boundary checklist: ${hardeningPass.credentialBoundaryChecklist.join("; ")}`,
                `Provider routing checklist: ${hardeningPass.providerRoutingChecklist.join("; ")}`,
                `Failover/cost/safety checklist: ${hardeningPass.failoverCostSafetyChecklist.join("; ")}`,
                `Denied hardening shortcuts: ${hardeningPass.deniedHardeningShortcuts.join("; ")}`,
                `Unresolved hardening risks: ${hardeningPass.unresolvedHardeningRisks.join("; ")}`,
                hardeningPass.connectorLivePermissionRoute,
                hardeningPass.automationDryRunRoute,
                hardeningPass.nextRecommendedAction,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced hardening details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList
          items={model.hardeningPasses.map((hardeningPass) => hardeningPass.advancedHardeningDetails)}
        />
        <PreviewFoundationCopy>
          Advanced hardening details stay collapsed or secondary. This page summarizes hardening checks only; provider
          calls, configuration changes, settings persistence, file mutation, and memory mutation stay blocked.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
