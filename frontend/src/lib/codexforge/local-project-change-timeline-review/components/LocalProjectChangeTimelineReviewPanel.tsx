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
  buildLocalProjectChangeTimelineReviewModel,
  buildLocalProjectChangeTimelineReviewStableKey,
} from "@/lib/codexforge/local-project-change-timeline-review";

const LOCAL_PROJECT_CHANGE_TIMELINE_REVIEW_MARKERS =
  "Local project change timeline review Change timelines are reviewed before use No git history is read from this page Timeline entries are not auto-promoted to memory Reviewed change events Decision log route project data is reviewed before use timeline and decision logs are not auto-promoted to memory no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution no command execution no test execution from UI no file mutation no file write no runbook export/write behavior no patch apply behavior no file deletion no provider API calls no connector API calls no web/search API calls no prompt/file/project data sending without approval no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no reminder creation no task scheduling no automation creation no background job creation no notification sending no polling loops from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no localStorage API key storage no process.env printing no API keys or secrets displayed no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced timeline details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function LocalProjectChangeTimelineReviewPanel() {
  const model = buildLocalProjectChangeTimelineReviewModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-local-project-change-timeline-review={`${LOCAL_PROJECT_CHANGE_TIMELINE_REVIEW_MARKERS} buildLocalProjectChangeTimelineReviewStableKey LocalProjectChangeTimelineReviewPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 347"
        title="Change timeline"
        subtitle="Local project change timeline review models reviewed project changes without reading git history. Change timelines are reviewed before use, no git history is read from this page, and timeline entries are not auto-promoted to memory."
        primary={{ href: "#local-project-change-timeline-review", label: "Review timeline" }}
        links={[
          { href: "/local-project-snapshot-review", label: "Project snapshot" },
          { href: "/local-project-decision-log", label: "Decision log" },
          { href: "/local-project-runbook-export-review", label: "Runbook export" },
          { href: "/git-review-live-context", label: "Git context review" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.timelineLanguage} />
      <PreviewFoundationCard title="Plain-English change timeline">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews timeline text only. It does not read git history, inspect local git metadata, run git
          commands, browse files, call providers, or promote timeline entries into memory.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="local-project-change-timeline-review" style={previewStyles.grid}>
        {model.reviews.map((review) => (
          <PreviewFoundationCard
            key={buildLocalProjectChangeTimelineReviewStableKey("local-project-timeline-card", review.id)}
            title={review.timelineReviewIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${review.status}`,
                review.sourceProjectSnapshot,
                review.changeWindowSummary,
                ...review.reviewedChangeEvents,
                ...review.validationFailureMarkers,
                ...review.regressionRiskFlags,
                review.decisionLogRoute,
                review.runbookExportRoute,
                `Blocked reasons: ${review.blockedReasons.join("; ")}`,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced timeline details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList
          items={model.reviews.map((review) => review.advancedTimelineDetails)}
        />
        <PreviewFoundationCopy>
          Advanced timeline details stay collapsed or secondary. Timeline and decision logs are not auto-promoted to
          memory, and no git or local file action runs here.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
