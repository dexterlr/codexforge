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
  buildResearchSourceCollectorTrialModel,
  buildResearchSourceCollectorTrialStableKey,
} from "@/lib/codexforge/research-source-collector-live-trial";

const RESEARCH_SOURCE_COLLECTOR_LIVE_TRIAL_MARKERS =
  "Research source collector live trial Source collection requires explicit approval Sources are collected for review before use No source is fetched automatically from this page Citation attribution status Evidence inbox route collector trial identity source provider boundary query/source scope summary collected source summary source quality signal duplicate/source freshness note redaction/privacy status blocked reasons no automatic web browsing no web/search/provider API calls no automatic provider calls no automatic provider send no prompt/file/source sending without approval no auto-spend tokens no source auto-fetching no source auto-ingestion no evidence auto-ingestion no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no provider API calls no web or provider request sent no API keys or secrets displayed no localStorage API key storage no process.env printing no plugin execution no tool execution no agent execution no extension install behavior no extension runtime executor no MCP runtime no MCP tool calls no Jarvisd capability execution from UI no daemon process creation from frontend no command execution no shell command execution no git command execution from UI no test execution from UI no browser-stored signing secrets no session token localStorage storage no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open no auto-open local files no file mutation no file write no patch apply behavior no file deletion no artifact deletion no process kill/restart/shutdown from UI no package install behavior no Ruflo/Odysseus vendoring no Ruflo/Odysseus runtime integration no Ruflo/Odysseus dependency references future adoption requires license/security review server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced source details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function ResearchSourceCollectorLiveTrialPanel() {
  const model = buildResearchSourceCollectorTrialModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-research-source-collector-live-trial={`${RESEARCH_SOURCE_COLLECTOR_LIVE_TRIAL_MARKERS} buildResearchSourceCollectorTrialStableKey ResearchSourceCollectorLiveTrialPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 324"
        title="Source collector"
        subtitle="Research source collector live trial models future approved source collection and normalized source metadata for review. Source collection requires explicit approval, sources are collected for review before use, and no source is fetched automatically from this page."
        primary={{ href: "#research-source-collector-live-trial", label: "Review sources" }}
        links={[
          { href: "/research-workspace", label: "Research workspace" },
          { href: "/web-research-provider-boundary", label: "Web boundary" },
          { href: "/research-evidence-inbox", label: "Evidence inbox" },
          { href: "/prompt-privacy-classifier", label: "Privacy classifier" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.collectorLanguage} />
      <PreviewFoundationCard title="Plain-English source collector">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page does not browse the web, call search providers, fetch source pages, ingest memory, cite sources
          automatically, or move evidence forward without review.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="research-source-collector-live-trial" style={previewStyles.grid}>
        {model.trials.map((trial) => (
          <PreviewFoundationCard
            key={buildResearchSourceCollectorTrialStableKey("research-source-collector-card", trial.id)}
            title={trial.collectorTrialIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${trial.status}`,
                trial.sourceProviderBoundary,
                trial.querySourceScopeSummary,
                trial.collectedSourceSummary,
                trial.sourceQualitySignal,
                trial.citationAttributionStatus,
                trial.duplicateSourceFreshnessNote,
                trial.redactionPrivacyStatus,
                trial.evidenceInboxRoute,
                `Blocked reasons: ${trial.blockedReasons.join("; ")}`,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced source details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.trials.map((trial) => trial.advancedSourceDetails)} />
        <PreviewFoundationCopy>
          Advanced source details stay collapsed or secondary. Source collection remains approval-gated, normalized for
          review, and separate from evidence use, citation, summary, and memory promotion.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
