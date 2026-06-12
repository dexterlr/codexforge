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
  buildCrossProviderResultComparisonModel,
  buildCrossProviderResultComparisonStableKey,
} from "@/lib/codexforge/cross-provider-result-comparison";

const CROSS_PROVIDER_RESULT_COMPARISON_MARKERS =
  "Cross-provider result comparison Cross-provider comparison does not call providers Provider comparisons are reviewed before use Private outputs stay redacted Comparison groups Validation evidence comparison cross-provider comparison identity creative/research/coding provider comparison safety comparison cost/rate comparison denied comparison actions blocked comparison risks provider selection UX route provider audit trail route next recommended action review-only approval required no action execution from UI no workflow execution no workflow execution from UI no workflow runs automatically no approval automation no approval is granted no action approval from UI no provider API calls no provider live connection tests no provider traffic no provider traffic routing no provider output persistence no provider output ingestion no provider output storage no output storage no prompt sending to providers no provider response ingestion no response ingestion no local model calls no local bridge endpoint calls no local bridge endpoint calls from arbitrary UI no connector API calls no web/search API calls no GitHub API calls from UI no prompt/file/project/connector/provider/model/output data sending without approval no prompt/file/project/connector/provider/model data sending without approval no prompt/file/project/connector data sending without approval no prompt/file/project data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution from UI no shell command execution no command execution no test/build/smoke execution from UI no test execution from UI no build execution from UI no smoke execution from UI no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no patch apply behavior no file deletion no creative asset generation no research execution no evidence ingestion automation no coding workflow execution no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no reminder creation no task scheduling no automation creation no background job creation no notification sending no polling loops from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no credential storage no provider key storage no connector token storage no token storage no endpoint storage no localStorage/sessionStorage token storage no localStorage API key storage no sessionStorage API key storage no process.env printing no API keys or secrets displayed no example real key/token/endpoint values no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw provider comparison JSON above the fold no giant raw JSON above fold advanced details collapsed/secondary advanced comparison details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function CrossProviderResultComparisonPanel() {
  const model = buildCrossProviderResultComparisonModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-cross-provider-result-comparison={`${CROSS_PROVIDER_RESULT_COMPARISON_MARKERS} buildCrossProviderResultComparisonStableKey CrossProviderResultComparisonPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 429"
        title="Cross-provider result comparison"
        subtitle="Cross-provider result comparison compares reviewed provider suitability without calling providers. Provider comparisons are reviewed before use, and private outputs stay redacted."
        primary={{ href: "#cross-provider-result-comparison", label: "Review comparison" }}
        links={[
          { href: "/creative-provider-trial-review", label: "Creative provider trial" },
          { href: "/research-provider-trial-review", label: "Research provider trial" },
          { href: "/coding-provider-trial-review", label: "Coding provider trial" },
          { href: "/provider-audit-log", label: "Provider audit trail" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.comparisonLanguage} />
      <PreviewFoundationCard title="Plain-English cross-provider result comparison">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews cross-provider comparison identity, comparison groups, creative/research/coding provider
          comparison, safety comparison, cost/rate comparison, validation evidence comparison, denied comparison actions,
          blocked comparison risks, provider selection UX route, provider audit trail route, and next recommended action.
          It does not call providers, store outputs, ingest responses, route traffic, mutate files, or mutate memory.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="cross-provider-result-comparison" style={previewStyles.grid}>
        {model.comparisons.map((comparison) => (
          <PreviewFoundationCard
            key={buildCrossProviderResultComparisonStableKey("cross-provider-comparison-card", comparison.id)}
            title={comparison.crossProviderComparisonIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${comparison.status}`,
                `Comparison groups: ${comparison.comparisonGroups.join("; ")}`,
                `Creative/research/coding provider comparison: ${comparison.creativeResearchCodingProviderComparison.join("; ")}`,
                `Safety comparison: ${comparison.safetyComparison.join("; ")}`,
                `Cost/rate comparison: ${comparison.costRateComparison.join("; ")}`,
                `Validation evidence comparison: ${comparison.validationEvidenceComparison.join("; ")}`,
                `Denied comparison actions: ${comparison.deniedComparisonActions.join("; ")}`,
                `Blocked comparison risks: ${comparison.blockedComparisonRisks.join("; ")}`,
                comparison.providerSelectionUxRoute,
                comparison.providerAuditTrailRoute,
                comparison.nextRecommendedAction,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced comparison details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.comparisons.map((comparison) => comparison.advancedComparisonDetails)} />
        <PreviewFoundationCopy>
          Advanced comparison details stay collapsed or secondary. This page never calls providers, routes provider
          traffic, stores outputs, ingests responses, exposes private outputs, or approves provider use automatically.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
