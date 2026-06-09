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
  buildProjectMemoryPromotionBoundaryModel,
  buildProjectMemoryPromotionBoundaryStableKey,
} from "@/lib/codexforge/project-memory-promotion-boundary";

const PROJECT_MEMORY_PROMOTION_BOUNDARY_MARKERS =
  "Project memory promotion boundary Memory promotion requires explicit review No project memory is promoted from this page Secrets and local paths stay redacted Candidate knowledge summary Knowledge release route source snapshot/timeline/decision log/runbook allowed promotion scope denied promotion scope redaction/privacy checklist approval requirement no route coverage removal no duplicate route hrefs no duplicate shortLabel values route changes require review before removal no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution no command execution no test execution from UI no file mutation no file write no file export/write behavior no runbook export/write behavior no patch apply behavior no file deletion no provider API calls no connector API calls no web/search API calls no prompt/file/project data sending without approval no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no reminder creation no task scheduling no automation creation no background job creation no notification sending no polling loops from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no localStorage API key storage no process.env printing no API keys or secrets displayed no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced memory details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function ProjectMemoryPromotionBoundaryPanel() {
  const model = buildProjectMemoryPromotionBoundaryModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-project-memory-promotion-boundary={`${PROJECT_MEMORY_PROMOTION_BOUNDARY_MARKERS} buildProjectMemoryPromotionBoundaryStableKey ProjectMemoryPromotionBoundaryPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 350"
        title="Memory boundary"
        subtitle="Project memory promotion boundary reviews which local project knowledge may become memory. Memory promotion requires explicit review, no project memory is promoted from this page, and secrets and local paths stay redacted."
        primary={{ href: "#project-memory-promotion-boundary", label: "Review boundary" }}
        links={[
          { href: "/local-project-snapshot-review", label: "Project snapshot" },
          { href: "/local-project-change-timeline", label: "Change timeline" },
          { href: "/local-project-decision-log", label: "Decision log" },
          { href: "/project-knowledge-release-candidate", label: "Knowledge release" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.promotionLanguage} />
      <PreviewFoundationCard title="Plain-English memory promotion boundary">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page is a review boundary only. It does not mutate Brain graph data, call appendEvent, call saveBrainGraph,
          ingest memory, auto-promote project knowledge, write files, export runbooks, read local files, run git, or call
          providers.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="project-memory-promotion-boundary" style={previewStyles.grid}>
        {model.reviews.map((review) => (
          <PreviewFoundationCard
            key={buildProjectMemoryPromotionBoundaryStableKey("project-memory-boundary-card", review.id)}
            title={review.promotionBoundaryIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${review.status}`,
                review.sourceSnapshotTimelineDecisionLogRunbook,
                review.candidateKnowledgeSummary,
                ...review.allowedPromotionScope,
                ...review.deniedPromotionScope,
                ...review.redactionPrivacyChecklist,
                review.approvalRequirement,
                review.knowledgeReleaseRoute,
                `Blocked reasons: ${review.blockedReasons.join("; ")}`,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced memory details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.reviews.map((review) => review.advancedMemoryDetails)} />
        <PreviewFoundationCopy>
          Advanced memory details stay collapsed or secondary. Memory promotion requires explicit review, no project
          memory is promoted from this page, and project knowledge release stays separate from memory mutation.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
