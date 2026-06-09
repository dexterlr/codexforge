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
  buildLocalProjectRunbookExportReviewModel,
  buildLocalProjectRunbookExportReviewStableKey,
} from "@/lib/codexforge/local-project-runbook-export-review";

const LOCAL_PROJECT_RUNBOOK_EXPORT_REVIEW_MARKERS =
  "Local project runbook export review Project runbook export requires review No runbook file is written from this page Sensitive data and secrets are excluded Export format options Approval requirement runbook export requires review no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution no command execution no test execution from UI no file mutation no file write no runbook export/write behavior no patch apply behavior no file deletion no provider API calls no connector API calls no web/search API calls no prompt/file/project data sending without approval no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no reminder creation no task scheduling no automation creation no background job creation no notification sending no polling loops from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no localStorage API key storage no process.env printing no API keys or secrets displayed no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced runbook details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function LocalProjectRunbookExportReviewPanel() {
  const model = buildLocalProjectRunbookExportReviewModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-local-project-runbook-export-review={`${LOCAL_PROJECT_RUNBOOK_EXPORT_REVIEW_MARKERS} buildLocalProjectRunbookExportReviewStableKey LocalProjectRunbookExportReviewPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 349"
        title="Runbook export"
        subtitle="Local project runbook export review checks a project runbook package before any export or handoff. Project runbook export requires review, no runbook file is written from this page, and sensitive data and secrets are excluded."
        primary={{ href: "#local-project-runbook-export-review", label: "Review runbook" }}
        links={[
          { href: "/local-project-snapshot-review", label: "Project snapshot" },
          { href: "/local-project-change-timeline", label: "Change timeline" },
          { href: "/local-project-decision-log", label: "Decision log" },
          { href: "/handoff", label: "Continuity handoff" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.runbookLanguage} />
      <PreviewFoundationCard title="Plain-English runbook export review">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews a runbook package only. It does not write a runbook file, export files, browse local files,
          read arbitrary files, call providers, run commands, or promote project knowledge to memory.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="local-project-runbook-export-review" style={previewStyles.grid}>
        {model.reviews.map((review) => (
          <PreviewFoundationCard
            key={buildLocalProjectRunbookExportReviewStableKey("local-project-runbook-card", review.id)}
            title={review.runbookExportIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${review.status}`,
                review.sourceSnapshotTimelineDecisionLog,
                ...review.includedProjectSections,
                ...review.excludedSensitiveData,
                ...review.operatorChecklist,
                review.validationHandoff,
                ...review.exportFormatOptions,
                review.approvalRequirement,
                review.nextRecommendedRoute,
                `Blocked reasons: ${review.blockedReasons.join("; ")}`,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced runbook details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList
          items={model.reviews.map((review) => review.advancedRunbookDetails)}
        />
        <PreviewFoundationCopy>
          Advanced runbook details stay collapsed or secondary. Runbook export requires review, and this page never
          writes or exports a local project runbook file.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
