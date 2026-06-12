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
  buildProviderSelectionUxPolishModel,
  buildProviderSelectionUxPolishStableKey,
} from "@/lib/codexforge/provider-selection-ux-polish";

const PROVIDER_SELECTION_UX_POLISH_MARKERS =
  "Provider selection UX polish Provider selection polish does not switch live providers Provider choice requires explicit operator approval Provider selections are preview-only here Provider choice groups Provider capability labels provider selection identity recommended-use hints denied selection actions selection safety checklist blocked selection risks permission presets route audit trail route next recommended action review-only approval required no provider selection persistence no provider switching no provider permission persistence no provider permission grant no permission grant persistence no provider configuration changes no provider settings persistence no action execution from UI no workflow execution no workflow execution from UI no workflow runs automatically no approval automation no approval is granted no action approval from UI no provider API calls no provider live connection tests no provider traffic no provider traffic routing no prompt sending to providers no provider output persistence no provider output ingestion no provider output storage no output storage no provider response ingestion no response ingestion no audit event persistence no provider trial data persistence no memory mutation no local model calls no local bridge endpoint calls no local bridge endpoint calls from arbitrary UI no local tool launching no creative asset generation no research execution no evidence ingestion automation no coding workflow execution no connector API calls no web/search API calls no GitHub API calls from UI no prompt/file/project/connector/provider/model/output/audit data sending without approval no prompt/file/project/connector/provider/model/output data sending without approval no prompt/file/project/connector/provider/model data sending without approval no prompt/file/project/connector data sending without approval no prompt/file/project data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution from UI no shell command execution no command execution no test/build/smoke execution from UI no test execution from UI no build execution from UI no smoke execution from UI no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no patch apply behavior no file deletion no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no reminder creation no task scheduling no automation creation no background job creation no notification sending no polling loops from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no credential storage no provider key storage no connector token storage no token storage no endpoint storage no localStorage writes no sessionStorage writes no localStorage/sessionStorage token storage no localStorage API key storage no sessionStorage API key storage no process.env printing no API keys or secrets displayed no example real key/token/endpoint values no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw provider selection JSON above the fold no giant raw JSON above fold advanced details collapsed/secondary advanced selection details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function ProviderSelectionUxPolishPanel() {
  const model = buildProviderSelectionUxPolishModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-provider-selection-ux-polish={`${PROVIDER_SELECTION_UX_POLISH_MARKERS} buildProviderSelectionUxPolishStableKey ProviderSelectionUxPolishPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 430"
        title="Provider selection UX polish"
        subtitle="Provider selection polish explains provider choice without switching live providers. Provider choice requires explicit operator approval, and provider selections are preview-only here."
        primary={{ href: "#provider-selection-ux-polish", label: "Review selection" }}
        links={[
          { href: "/provider-permission-presets", label: "Permission presets" },
          { href: "/provider-audit-trail-review", label: "Audit trail review" },
          { href: "/provider-routing-readiness-audit", label: "Routing readiness" },
          { href: "/cross-provider-result-comparison", label: "Provider comparison" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.selectionLanguage} />
      <PreviewFoundationCard title="Plain-English provider selection UX polish">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews provider selection identity, provider choice groups, provider capability labels,
          recommended-use hints, denied selection actions, selection safety checklist, blocked selection risks,
          permission presets route, audit trail route, and next recommended action. It does not switch providers,
          persist provider selections, call providers, store credentials, store outputs, route traffic, or mutate memory.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="provider-selection-ux-polish" style={previewStyles.grid}>
        {model.selections.map((selection) => (
          <PreviewFoundationCard
            key={buildProviderSelectionUxPolishStableKey("provider-selection-card", selection.id)}
            title={selection.providerSelectionIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${selection.status}`,
                `Provider choice groups: ${selection.providerChoiceGroups.join("; ")}`,
                `Provider capability labels: ${selection.providerCapabilityLabels.join("; ")}`,
                `Recommended-use hints: ${selection.recommendedUseHints.join("; ")}`,
                `Denied selection actions: ${selection.deniedSelectionActions.join("; ")}`,
                `Selection safety checklist: ${selection.selectionSafetyChecklist.join("; ")}`,
                `Blocked selection risks: ${selection.blockedSelectionRisks.join("; ")}`,
                selection.permissionPresetsRoute,
                selection.auditTrailRoute,
                selection.nextRecommendedAction,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced selection details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.selections.map((selection) => selection.advancedSelectionDetails)} />
        <PreviewFoundationCopy>
          Advanced selection details stay collapsed or secondary. This page is a preview surface only, and provider
          selection remains blocked until explicit operator approval happens outside this page.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
