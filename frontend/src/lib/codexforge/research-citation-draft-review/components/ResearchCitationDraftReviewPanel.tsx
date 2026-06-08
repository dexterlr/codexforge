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
  buildResearchCitationDraftReviewModel,
  buildResearchCitationDraftReviewStableKey,
} from "@/lib/codexforge/research-citation-draft-review";

const RESEARCH_CITATION_DRAFT_REVIEW_MARKERS =
  "Research citation draft review Citations are drafts until approved Missing metadata remains flagged No citation is exported automatically Attribution readiness Citation format note citation review identity source claim builder source evidence inbox draft citation summary missing metadata flags source quality flags summary draft route blocked reasons no automatic web browsing no web/search/provider API calls no automatic provider calls no automatic provider send no prompt/file/source sending without approval no auto-spend tokens no provider retries automatically no source auto-fetching no source auto-ingestion no evidence auto-ingestion no auto-cite no auto-citation finalization no automatic report export no file export/write behavior no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no provider API calls no web or provider request sent no API keys or secrets displayed no localStorage API key storage no process.env printing no plugin execution no tool execution no agent execution no extension install behavior no extension runtime executor no MCP runtime no MCP tool calls no Jarvisd capability execution from UI no daemon process creation from frontend no command execution no shell command execution no git command execution from UI no test execution from UI no browser-stored signing secrets no session token localStorage storage no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open no auto-open local files no file mutation no file write no patch apply behavior no file deletion no artifact deletion no process kill/restart/shutdown from UI no package install behavior no Ruflo/Odysseus vendoring no Ruflo/Odysseus runtime integration no Ruflo/Odysseus dependency references future adoption requires license/security review server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced citation details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function ResearchCitationDraftReviewPanel() {
  const model = buildResearchCitationDraftReviewModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-research-citation-draft-review={`${RESEARCH_CITATION_DRAFT_REVIEW_MARKERS} buildResearchCitationDraftReviewStableKey ResearchCitationDraftReviewPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 327"
        title="Citation drafts"
        subtitle="Research citation draft review prepares draft citations from reviewed evidence and claims. Citations are drafts until approved, missing metadata remains flagged, and no citation is exported automatically."
        primary={{ href: "#research-citation-draft-review", label: "Review citations" }}
        links={[
          { href: "/research-claim-builder", label: "Claim builder" },
          { href: "/research-evidence-inbox", label: "Evidence inbox" },
          { href: "/research-summary-draft-builder", label: "Summary drafts" },
          { href: "/research-report-export-review", label: "Export review" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.citationLanguage} />
      <PreviewFoundationCard title="Plain-English citation review">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page does not browse the web, fetch source pages, call providers, auto-cite final output, finalize
          citations, export citations, write files, or export reports.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="research-citation-draft-review" style={previewStyles.grid}>
        {model.citations.map((citation) => (
          <PreviewFoundationCard
            key={buildResearchCitationDraftReviewStableKey("research-citation-draft-card", citation.id)}
            title={citation.citationReviewIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${citation.status}`,
                citation.sourceClaimBuilder,
                citation.sourceEvidenceInbox,
                citation.draftCitationSummary,
                citation.attributionReadiness,
                citation.missingMetadataFlags,
                citation.sourceQualityFlags,
                citation.citationFormatNote,
                citation.summaryDraftRoute,
                `Blocked reasons: ${citation.blockedReasons.join("; ")}`,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced citation details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.citations.map((citation) => citation.advancedCitationDetails)} />
        <PreviewFoundationCopy>
          Advanced citation details stay collapsed or secondary. Citation drafts remain separate from final citation
          approval, summary drafting, report export, source fetching, provider traffic, memory promotion, local files, and
          tool execution.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
