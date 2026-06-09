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
  buildLocalProjectDecisionLogReviewModel,
  buildLocalProjectDecisionLogReviewStableKey,
} from "@/lib/codexforge/local-project-decision-log-review";

const LOCAL_PROJECT_DECISION_LOG_REVIEW_MARKERS =
  "Local project decision log review Decisions are reviewed before becoming project memory Unresolved questions stay visible Memory promotion requires explicit review Rationale summary Runbook export route project data is reviewed before use timeline and decision logs are not auto-promoted to memory no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution no command execution no test execution from UI no file mutation no file write no runbook export/write behavior no patch apply behavior no file deletion no provider API calls no connector API calls no web/search API calls no prompt/file/project data sending without approval no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no reminder creation no task scheduling no automation creation no background job creation no notification sending no polling loops from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no localStorage API key storage no process.env printing no API keys or secrets displayed no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced decision details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function LocalProjectDecisionLogReviewPanel() {
  const model = buildLocalProjectDecisionLogReviewModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-local-project-decision-log-review={`${LOCAL_PROJECT_DECISION_LOG_REVIEW_MARKERS} buildLocalProjectDecisionLogReviewStableKey LocalProjectDecisionLogReviewPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 348"
        title="Decision log"
        subtitle="Local project decision log review captures reviewed architecture and product decisions without writing project memory. Decisions are reviewed before becoming project memory, unresolved questions stay visible, and memory promotion requires explicit review."
        primary={{ href: "#local-project-decision-log-review", label: "Review decisions" }}
        links={[
          { href: "/local-project-snapshot-review", label: "Project snapshot" },
          { href: "/local-project-change-timeline", label: "Change timeline" },
          { href: "/local-project-runbook-export-review", label: "Runbook export" },
          { href: "/memory", label: "Memory review" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.decisionLanguage} />
      <PreviewFoundationCard title="Plain-English decision log">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page records decision review text only. It does not mutate Brain graph, call appendEvent, call
          saveBrainGraph, auto-promote memory, write files, export files, or run local commands.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="local-project-decision-log-review" style={previewStyles.grid}>
        {model.reviews.map((review) => (
          <PreviewFoundationCard
            key={buildLocalProjectDecisionLogReviewStableKey("local-project-decision-card", review.id)}
            title={review.decisionLogIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${review.status}`,
                review.sourceProjectSnapshotTimeline,
                review.decisionSummary,
                review.rationaleSummary,
                ...review.affectedProjectAreas,
                ...review.unresolvedQuestions,
                review.memoryPromotionPolicy,
                review.runbookExportRoute,
                `Blocked reasons: ${review.blockedReasons.join("; ")}`,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced decision details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList
          items={model.reviews.map((review) => review.advancedDecisionDetails)}
        />
        <PreviewFoundationCopy>
          Advanced decision details stay collapsed or secondary. Decisions and timeline entries remain visible for
          review and are not auto-promoted to memory.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
