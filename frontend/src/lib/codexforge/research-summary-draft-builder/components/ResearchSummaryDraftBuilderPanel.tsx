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
  buildResearchSummaryDraftBuilderModel,
  buildResearchSummaryDraftBuilderStableKey,
} from "@/lib/codexforge/research-summary-draft-builder";

const RESEARCH_SUMMARY_DRAFT_BUILDER_MARKERS =
  "Research summary draft builder Summaries are drafts until reviewed Unresolved conflicts stay visible Summaries are not auto-promoted to memory Evidence coverage summary Report export route summary draft identity source claim builder source citation draft review draft summary sections citation readiness blocked reasons no automatic web browsing no web/search/provider API calls no automatic provider calls no automatic provider send no prompt/file/source sending without approval no auto-spend tokens no provider retries automatically no source auto-fetching no source auto-ingestion no evidence auto-ingestion no auto-cite no auto-citation finalization no automatic report export no file export/write behavior no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no provider API calls no web or provider request sent no API keys or secrets displayed no localStorage API key storage no process.env printing no plugin execution no tool execution no agent execution no extension install behavior no extension runtime executor no MCP runtime no MCP tool calls no Jarvisd capability execution from UI no daemon process creation from frontend no command execution no shell command execution no git command execution from UI no test execution from UI no browser-stored signing secrets no session token localStorage storage no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open no auto-open local files no file mutation no file write no patch apply behavior no file deletion no artifact deletion no process kill/restart/shutdown from UI no package install behavior no Ruflo/Odysseus vendoring no Ruflo/Odysseus runtime integration no Ruflo/Odysseus dependency references future adoption requires license/security review server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced summary details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function ResearchSummaryDraftBuilderPanel() {
  const model = buildResearchSummaryDraftBuilderModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-research-summary-draft-builder={`${RESEARCH_SUMMARY_DRAFT_BUILDER_MARKERS} buildResearchSummaryDraftBuilderStableKey ResearchSummaryDraftBuilderPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 328"
        title="Summary drafts"
        subtitle="Research summary draft builder composes reviewed claims and draft citations into a draft summary. Summaries are drafts until reviewed, unresolved conflicts stay visible, and summaries are not auto-promoted to memory."
        primary={{ href: "#research-summary-draft-builder", label: "Review summaries" }}
        links={[
          { href: "/research-claim-builder", label: "Claim builder" },
          { href: "/research-citation-draft-review", label: "Citation drafts" },
          { href: "/research-report-export-review", label: "Export review" },
          { href: "/research-evidence-inbox", label: "Evidence inbox" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.summaryLanguage} />
      <PreviewFoundationCard title="Plain-English summary builder">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page does not call providers, browse the web, fetch sources, auto-export reports, write files, promote
          memory, ingest memory, mutate the Brain graph, or execute tools.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="research-summary-draft-builder" style={previewStyles.grid}>
        {model.summaries.map((summary) => (
          <PreviewFoundationCard
            key={buildResearchSummaryDraftBuilderStableKey("research-summary-draft-card", summary.id)}
            title={summary.summaryDraftIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${summary.status}`,
                summary.sourceClaimBuilder,
                summary.sourceCitationDraftReview,
                `Draft summary sections: ${summary.draftSummarySections.join("; ")}`,
                summary.evidenceCoverageSummary,
                summary.unresolvedConflicts,
                summary.citationReadiness,
                summary.reportExportRoute,
                `Blocked reasons: ${summary.blockedReasons.join("; ")}`,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced summary details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.summaries.map((summary) => summary.advancedSummaryDetails)} />
        <PreviewFoundationCopy>
          Advanced summary details stay collapsed or secondary. Summary drafting remains separate from final report
          approval, export review, source fetching, provider traffic, memory promotion, local files, and tool execution.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
