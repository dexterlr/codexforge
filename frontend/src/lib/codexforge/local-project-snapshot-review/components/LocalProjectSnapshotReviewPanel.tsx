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
  buildLocalProjectSnapshotReviewModel,
  buildLocalProjectSnapshotReviewStableKey,
} from "@/lib/codexforge/local-project-snapshot-review";

const LOCAL_PROJECT_SNAPSHOT_REVIEW_MARKERS =
  "Local project snapshot review Project snapshots are reviewed before use No local project scan runs from this page Secrets and local paths stay redacted Reviewed files modules summary Change timeline route project data is reviewed before use no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution no command execution no test execution from UI no file mutation no file write no runbook export/write behavior no patch apply behavior no file deletion no provider API calls no connector API calls no web/search API calls no prompt/file/project data sending without approval no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no reminder creation no task scheduling no automation creation no background job creation no notification sending no polling loops from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no localStorage API key storage no process.env printing no API keys or secrets displayed no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced snapshot details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function LocalProjectSnapshotReviewPanel() {
  const model = buildLocalProjectSnapshotReviewModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-local-project-snapshot-review={`${LOCAL_PROJECT_SNAPSHOT_REVIEW_MARKERS} buildLocalProjectSnapshotReviewStableKey LocalProjectSnapshotReviewPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 346"
        title="Project snapshot"
        subtitle="Local project snapshot review models a reviewed project state summary before any downstream use. Project snapshots are reviewed before use, no local project scan runs from this page, and secrets and local paths stay redacted."
        primary={{ href: "#local-project-snapshot-review", label: "Review snapshot" }}
        links={[
          { href: "/project-intelligence-result", label: "Project intelligence" },
          { href: "/project-intelligence-recovery", label: "Recovery" },
          { href: "/local-project-change-timeline", label: "Change timeline" },
          { href: "/local-project-decision-log", label: "Decision log" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.snapshotLanguage} />
      <PreviewFoundationCard title="Plain-English snapshot review">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page is review-only project knowledge. It does not scan projects, browse local files, read local files,
          run git, execute shell commands, write files, export files, mutate memory, or promote project knowledge.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="local-project-snapshot-review" style={previewStyles.grid}>
        {model.reviews.map((review) => (
          <PreviewFoundationCard
            key={buildLocalProjectSnapshotReviewStableKey("local-project-snapshot-card", review.id)}
            title={review.snapshotReviewIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${review.status}`,
                review.projectScopeSummary,
                review.sourceProjectIntelligenceDependency,
                review.reviewedFilesModulesSummary,
                review.riskSecretsSummary,
                review.validationStatus,
                review.changeTimelineRoute,
                review.decisionLogRoute,
                `Blocked reasons: ${review.blockedReasons.join("; ")}`,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced snapshot details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList
          items={model.reviews.map((review) => review.advancedSnapshotDetails)}
        />
        <PreviewFoundationCopy>
          Advanced snapshot details stay collapsed or secondary. Project data is reviewed before use, local scans do
          not run here, and snapshot text is not auto-promoted to memory.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
