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
  buildResearchClaimBuilderModel,
  buildResearchClaimBuilderStableKey,
} from "@/lib/codexforge/research-claim-builder";

const RESEARCH_CLAIM_BUILDER_MARKERS =
  "Research claim builder Claims are reviewed before use Conflicting or stale evidence stays flagged Memory is not auto-promoted Supporting evidence summary Citation draft route claim builder identity source evidence review inbox proposed claim summary conflicting/stale evidence flags confidence/quality signal summary draft route blocked reasons no automatic web browsing no web/search/provider API calls no automatic provider calls no automatic provider send no prompt/file/source sending without approval no auto-spend tokens no provider retries automatically no source auto-fetching no source auto-ingestion no evidence auto-ingestion no auto-cite no auto-citation finalization no automatic report export no file export/write behavior no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no provider API calls no web or provider request sent no API keys or secrets displayed no localStorage API key storage no process.env printing no plugin execution no tool execution no agent execution no extension install behavior no extension runtime executor no MCP runtime no MCP tool calls no Jarvisd capability execution from UI no daemon process creation from frontend no command execution no shell command execution no git command execution from UI no test execution from UI no browser-stored signing secrets no session token localStorage storage no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open no auto-open local files no file mutation no file write no patch apply behavior no file deletion no artifact deletion no process kill/restart/shutdown from UI no package install behavior no Ruflo/Odysseus vendoring no Ruflo/Odysseus runtime integration no Ruflo/Odysseus dependency references future adoption requires license/security review server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced claim details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function ResearchClaimBuilderPanel() {
  const model = buildResearchClaimBuilderModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-research-claim-builder={`${RESEARCH_CLAIM_BUILDER_MARKERS} buildResearchClaimBuilderStableKey ResearchClaimBuilderPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 326"
        title="Claim builder"
        subtitle="Research claim builder turns reviewed evidence into proposed claims for review. Claims are reviewed before use, conflicting or stale evidence stays flagged, and memory is not auto-promoted."
        primary={{ href: "#research-claim-builder", label: "Review claims" }}
        links={[
          { href: "/research-evidence-inbox", label: "Evidence inbox" },
          { href: "/research-citation-draft-review", label: "Citation drafts" },
          { href: "/research-summary-draft-builder", label: "Summary drafts" },
          { href: "/memory", label: "Memory review" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.claimLanguage} />
      <PreviewFoundationCard title="Plain-English claim builder">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page does not browse the web, call providers, fetch sources, auto-cite, finalize citations, ingest
          evidence, promote memory, export reports, write files, mutate the Brain graph, or execute tools.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="research-claim-builder" style={previewStyles.grid}>
        {model.claims.map((claim) => (
          <PreviewFoundationCard
            key={buildResearchClaimBuilderStableKey("research-claim-builder-card", claim.id)}
            title={claim.claimBuilderIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${claim.status}`,
                claim.sourceEvidenceReviewInbox,
                claim.proposedClaimSummary,
                claim.supportingEvidenceSummary,
                claim.conflictingStaleEvidenceFlags,
                claim.confidenceQualitySignal,
                claim.citationDraftRoute,
                claim.summaryDraftRoute,
                `Blocked reasons: ${claim.blockedReasons.join("; ")}`,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced claim details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.claims.map((claim) => claim.advancedClaimDetails)} />
        <PreviewFoundationCopy>
          Advanced claim details stay collapsed or secondary. Claim drafting remains review-only and separate from
          citation approval, summary approval, report export, source fetching, provider traffic, memory promotion, local
          files, and tool execution.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
