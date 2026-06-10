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
  buildProjectKnowledgeRealWorldTrialReviewModel,
  buildProjectKnowledgeRealWorldTrialReviewStableKey,
} from "@/lib/codexforge/project-knowledge-real-world-trial-review";

const PROJECT_KNOWLEDGE_REAL_WORLD_TRIAL_REVIEW_MARKERS =
  "Project knowledge real-world trial review Project knowledge trial review does not scan files Project memory promotion requires explicit approval Secrets and local paths stay redacted Snapshot timeline decision runbook readiness Unified trial report route real-world trial review review-only approval required project knowledge trial identity source project knowledge release candidate operator project scenario memory promotion boundary redaction checklist blocked real actions trial outcome notes advanced project knowledge trial details collapsed/secondary no action execution from UI no workflow execution no local bridge endpoint calls no Blender/Unreal/ComfyUI/local tool launch behavior no render/generation job execution no coding task execution no test/build/smoke execution from UI no release/shipping execution no build execution from UI no smoke execution from UI no test execution from UI no patch apply behavior no commit creation from UI no provider API calls no token spending no connector API calls no Gmail API calls no Calendar API calls no Contacts API calls no Google API calls no web/search API calls no source fetching/browsing no OAuth request flow no connector authorization behavior no token storage no localStorage/sessionStorage token storage no automatic email/calendar/contact reads no reminder creation no task scheduling no automation creation no background job creation no notification sending no polling loops from UI no prompt/file/project data sending without approval no prompt/file/project/connector data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution no command execution no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no file deletion no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no localStorage API key storage no process.env printing no API keys or secrets displayed no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function ProjectKnowledgeRealWorldTrialReviewPanel() {
  const model = buildProjectKnowledgeRealWorldTrialReviewModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-project-knowledge-real-world-trial-review={`${PROJECT_KNOWLEDGE_REAL_WORLD_TRIAL_REVIEW_MARKERS} buildProjectKnowledgeRealWorldTrialReviewStableKey ProjectKnowledgeRealWorldTrialReviewPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 368"
        title="Project knowledge trial review"
        subtitle="Project knowledge real-world trial review checks local project knowledge readiness without scanning files. Project memory promotion requires explicit approval, and secrets and local paths stay redacted."
        primary={{ href: "#project-knowledge-real-world-trial-review", label: "Review project trial" }}
        links={[
          { href: "/project-knowledge-release-candidate", label: "Knowledge RC" },
          { href: "/local-project-snapshot-review", label: "Snapshot" },
          { href: "/project-memory-promotion-boundary", label: "Memory boundary" },
          { href: "/unified-workspace-real-world-trial-report", label: "Unified report" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.trialReviewLanguage} />
      <PreviewFoundationCard title="Plain-English project knowledge trial review">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews the project knowledge trial identity, operator project scenario, snapshot timeline decision
          runbook readiness, memory promotion boundary, redaction checklist, blocked actions, and outcome notes. It does
          not scan files, read local files, run git commands, export runbooks, or promote memory.
        </PreviewFoundationCopy>
        <PreviewFoundationCopy>
          Project memory promotion requires explicit approval, and secrets and local paths stay redacted.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="project-knowledge-real-world-trial-review" style={previewStyles.grid}>
        {model.reviews.map((review) => (
          <PreviewFoundationCard
            key={buildProjectKnowledgeRealWorldTrialReviewStableKey(
              "project-knowledge-real-world-trial-review-card",
              review.id
            )}
            title={review.projectKnowledgeTrialIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${review.status}`,
                review.sourceProjectKnowledgeReleaseCandidate,
                review.operatorProjectScenario,
                review.snapshotTimelineDecisionRunbookReadiness,
                review.memoryPromotionBoundary,
                `Redaction checklist: ${review.redactionChecklist.join("; ")}`,
                `Blocked real actions: ${review.blockedRealActions.join("; ")}`,
                `Trial outcome notes: ${review.trialOutcomeNotes.join("; ")}`,
                review.unifiedTrialReportRoute,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced project knowledge trial details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.reviews.map((review) => review.advancedProjectKnowledgeTrialDetails)} />
        <PreviewFoundationCopy>
          Advanced project knowledge trial details stay collapsed or secondary. Project knowledge real-world trial review
          remains separate from file scanning, local file browsing, git commands, runbook export, file mutation,
          provider calls, connector calls, automations, and memory promotion.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
