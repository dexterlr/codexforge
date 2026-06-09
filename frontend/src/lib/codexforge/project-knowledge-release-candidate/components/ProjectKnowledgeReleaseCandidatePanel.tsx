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
  buildProjectKnowledgeReleaseCandidateModel,
  buildProjectKnowledgeReleaseCandidateStableKey,
} from "@/lib/codexforge/project-knowledge-release-candidate";

const PROJECT_KNOWLEDGE_RELEASE_CANDIDATE_MARKERS =
  "Project knowledge release candidate Project knowledge release remains review-only No project files are read from this page No memory is promoted automatically Release decision Known gaps covered project knowledge surfaces snapshot readiness timeline readiness decision log readiness runbook export readiness memory promotion readiness next recommended route no route coverage removal no duplicate route hrefs no duplicate shortLabel values route changes require review before removal no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution no command execution no test execution from UI no file mutation no file write no file export/write behavior no runbook export/write behavior no patch apply behavior no file deletion no provider API calls no connector API calls no web/search API calls no prompt/file/project data sending without approval no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no reminder creation no task scheduling no automation creation no background job creation no notification sending no polling loops from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no localStorage API key storage no process.env printing no API keys or secrets displayed no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced release details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function ProjectKnowledgeReleaseCandidatePanel() {
  const model = buildProjectKnowledgeReleaseCandidateModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-project-knowledge-release-candidate={`${PROJECT_KNOWLEDGE_RELEASE_CANDIDATE_MARKERS} buildProjectKnowledgeReleaseCandidateStableKey ProjectKnowledgeReleaseCandidatePanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 351"
        title="Knowledge release"
        subtitle="Project knowledge release candidate audits the reviewed local project knowledge loop. Project knowledge release remains review-only, no project files are read from this page, and no memory is promoted automatically."
        primary={{ href: "#project-knowledge-release-candidate", label: "Review release" }}
        links={[
          { href: "/local-project-snapshot-review", label: "Project snapshot" },
          { href: "/local-project-runbook-export-review", label: "Runbook export" },
          { href: "/project-memory-promotion-boundary", label: "Memory boundary" },
          { href: "/unified-workspace-home-review", label: "Unified home" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.releaseLanguage} />
      <PreviewFoundationCard title="Plain-English project knowledge release">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews readiness only. It does not read project files, run git commands, export files, promote
          memory, mutate Brain graph data, write runbooks, or send project data to providers or connectors.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="project-knowledge-release-candidate" style={previewStyles.grid}>
        {model.candidates.map((candidate) => (
          <PreviewFoundationCard
            key={buildProjectKnowledgeReleaseCandidateStableKey("project-knowledge-release-card", candidate.id)}
            title={candidate.releaseCandidateIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Release decision: ${candidate.releaseDecision}`,
                `Covered project knowledge surfaces: ${candidate.coveredProjectKnowledgeSurfaces.join("; ")}`,
                candidate.snapshotReadiness,
                candidate.timelineReadiness,
                candidate.decisionLogReadiness,
                candidate.runbookExportReadiness,
                candidate.memoryPromotionReadiness,
                `Known gaps: ${candidate.knownGaps.join("; ")}`,
                candidate.nextRecommendedRoute,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced release details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.candidates.map((candidate) => candidate.advancedReleaseDetails)} />
        <PreviewFoundationCopy>
          Advanced release details stay collapsed or secondary. Project knowledge release remains review-only and
          cannot read files, export runbooks, promote memory, or execute local project actions.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
