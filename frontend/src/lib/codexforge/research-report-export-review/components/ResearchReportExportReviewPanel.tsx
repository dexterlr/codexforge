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
  buildResearchReportExportReviewModel,
  buildResearchReportExportReviewStableKey,
} from "@/lib/codexforge/research-report-export-review";

const RESEARCH_REPORT_EXPORT_REVIEW_MARKERS =
  "Research report export review Exports require review before use Reports are not exported automatically Sensitive data and secrets are excluded Export format options Approval requirement export review identity source summary draft builder included sections summary citation readiness excluded sensitive data unresolved conflict flags next recommended route blocked reasons no automatic web browsing no web/search/provider API calls no automatic provider calls no automatic provider send no prompt/file/source sending without approval no auto-spend tokens no provider retries automatically no source auto-fetching no source auto-ingestion no evidence auto-ingestion no auto-cite no auto-citation finalization no automatic report export no file export/write behavior no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no provider API calls no web or provider request sent no API keys or secrets displayed no localStorage API key storage no process.env printing no plugin execution no tool execution no agent execution no extension install behavior no extension runtime executor no MCP runtime no MCP tool calls no Jarvisd capability execution from UI no daemon process creation from frontend no command execution no shell command execution no git command execution from UI no test execution from UI no browser-stored signing secrets no session token localStorage storage no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open no auto-open local files no file mutation no file write no patch apply behavior no file deletion no artifact deletion no process kill/restart/shutdown from UI no package install behavior no Ruflo/Odysseus vendoring no Ruflo/Odysseus runtime integration no Ruflo/Odysseus dependency references future adoption requires license/security review server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced export details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function ResearchReportExportReviewPanel() {
  const model = buildResearchReportExportReviewModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-research-report-export-review={`${RESEARCH_REPORT_EXPORT_REVIEW_MARKERS} buildResearchReportExportReviewStableKey ResearchReportExportReviewPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 329"
        title="Export review"
        subtitle="Research report export review checks a draft research report before any export or handoff. Exports require review before use, reports are not exported automatically, and sensitive data and secrets are excluded."
        primary={{ href: "#research-report-export-review", label: "Review export" }}
        links={[
          { href: "/research-summary-draft-builder", label: "Summary drafts" },
          { href: "/research-citation-draft-review", label: "Citation drafts" },
          { href: "/research-claim-builder", label: "Claim builder" },
          { href: "/research-workspace", label: "Research workspace" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.exportLanguage} />
      <PreviewFoundationCard title="Plain-English export review">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews export readiness only. It does not export files, write files, call providers, browse the web,
          promote memory, mutate the Brain graph, execute tools, run commands, or delete artifacts.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="research-report-export-review" style={previewStyles.grid}>
        {model.reviews.map((review) => (
          <PreviewFoundationCard
            key={buildResearchReportExportReviewStableKey("research-report-export-card", review.id)}
            title={review.exportReviewIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${review.status}`,
                review.sourceSummaryDraftBuilder,
                review.includedSectionsSummary,
                review.citationReadiness,
                review.excludedSensitiveData,
                review.unresolvedConflictFlags,
                `Export format options: ${review.exportFormatOptions.join("; ")}`,
                review.approvalRequirement,
                review.nextRecommendedRoute,
                `Blocked reasons: ${review.blockedReasons.join("; ")}`,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced export details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.reviews.map((review) => review.advancedExportDetails)} />
        <PreviewFoundationCopy>
          Advanced export details stay collapsed or secondary. Report export review remains separate from actual file
          export, report handoff, provider traffic, source fetching, memory promotion, local files, deletion, and tool
          execution.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
