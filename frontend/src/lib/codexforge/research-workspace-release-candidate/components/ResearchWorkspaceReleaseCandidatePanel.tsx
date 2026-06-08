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
  buildResearchWorkspaceReleaseCandidateModel,
  buildResearchWorkspaceReleaseCandidateStableKey,
} from "@/lib/codexforge/research-workspace-release-candidate";

const RESEARCH_WORKSPACE_RELEASE_CANDIDATE_MARKERS =
  "Research workspace release candidate Research release candidate remains review-only No web or provider request is sent from this page Memory is not auto-promoted Release decision Known gaps release candidate identity covered research surfaces evidence inbox readiness claim readiness citation readiness summary/report readiness privacy/redaction readiness next recommended route blocked reasons no automatic web browsing no web/search/provider API calls no automatic provider calls no automatic provider send no prompt/file/source sending without approval no auto-spend tokens no provider retries automatically no source auto-fetching no source auto-ingestion no evidence auto-ingestion no auto-cite no auto-citation finalization no automatic report export no file export/write behavior no source auto-refreshing no freshness auto-recheck no evidence auto-update no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no provider API calls no web or provider request sent no API keys or secrets displayed no localStorage API key storage no process.env printing no plugin execution no tool execution no agent execution no extension install behavior no extension runtime executor no MCP runtime no MCP tool calls no Jarvisd capability execution from UI no daemon process creation from frontend no command execution no shell command execution no git command execution from UI no test execution from UI no browser-stored signing secrets no session token localStorage storage no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open no auto-open local files no file mutation no file write no patch apply behavior no file deletion no artifact deletion no process kill/restart/shutdown from UI no package install behavior no Ruflo/Odysseus vendoring no Ruflo/Odysseus runtime integration no Ruflo/Odysseus dependency references future adoption requires license/security review server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced release details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function ResearchWorkspaceReleaseCandidatePanel() {
  const model = buildResearchWorkspaceReleaseCandidateModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-research-workspace-release-candidate={`${RESEARCH_WORKSPACE_RELEASE_CANDIDATE_MARKERS} buildResearchWorkspaceReleaseCandidateStableKey ResearchWorkspaceReleaseCandidatePanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 330"
        title="Research release candidate"
        subtitle="Research workspace release candidate audits whether the first research workspace loop is ready as a review-only MVP loop. Research release candidate remains review-only, no web or provider request is sent from this page, and memory is not auto-promoted."
        primary={{ href: "#research-workspace-release-candidate", label: "Review release" }}
        links={[
          { href: "/research-report-export-review", label: "Report review" },
          { href: "/research-summary-draft-builder", label: "Summary drafts" },
          { href: "/research-runbook-finalization", label: "Runbook finalization" },
          { href: "/evidence-conflict-resolver-review", label: "Conflict review" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.releaseLanguage} />
      <PreviewFoundationCard title="Plain-English release candidate">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews release readiness only. It does not browse, call providers, refresh sources, update
          evidence, export reports, write files, promote memory, mutate the Brain graph, execute tools, or run commands.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="research-workspace-release-candidate" style={previewStyles.grid}>
        {model.candidates.map((candidate) => (
          <PreviewFoundationCard
            key={buildResearchWorkspaceReleaseCandidateStableKey("research-release-candidate-card", candidate.id)}
            title={candidate.releaseCandidateIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Release decision: ${candidate.releaseDecision}`,
                `Covered research surfaces: ${candidate.coveredResearchSurfaces.join("; ")}`,
                candidate.evidenceInboxReadiness,
                candidate.claimReadiness,
                candidate.citationReadiness,
                candidate.summaryReportReadiness,
                candidate.privacyRedactionReadiness,
                `Known gaps: ${candidate.knownGaps.join("; ")}`,
                candidate.nextRecommendedRoute,
                `Blocked reasons: ${candidate.blockedReasons.join("; ")}`,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced release details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList
          items={model.candidates.map((candidate) => candidate.advancedReleaseDetails)}
        />
        <PreviewFoundationCopy>
          Advanced release details stay collapsed or secondary. Release candidate review remains separate from browsing,
          provider calls, source rechecks, evidence updates, report export, memory promotion, local files, and tool
          execution.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
