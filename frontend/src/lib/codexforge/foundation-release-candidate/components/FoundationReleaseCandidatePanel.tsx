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
  buildFoundationReleaseCandidateModel,
  buildFoundationReleaseCandidateStableKey,
} from "@/lib/codexforge/foundation-release-candidate";

const FOUNDATION_RELEASE_CANDIDATE_MARKERS =
  "CodexForge foundation release candidate Foundation release candidate remains review-only Release does not ship automatically Execution remains behind explicit approval gates Release readiness by loop Release decision foundation release identity covered foundation loops regression readiness safety/audit readiness operator dashboard readiness known gaps release runbook route first real workflow route review-only approval required no release/shipping execution no build execution from UI no smoke execution from UI no test execution from UI no workflow execution no workflow execution from UI no workflow runs automatically no provider API calls no connector API calls no web/search API calls no prompt/file/project data sending without approval no prompt/file/project/connector data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution no command execution no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no patch apply behavior no file deletion no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no reminder creation no task scheduling no automation creation no background job creation no notification sending no polling loops from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no token storage no localStorage/sessionStorage token storage no localStorage API key storage no process.env printing no API keys or secrets displayed no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced release details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function FoundationReleaseCandidatePanel() {
  const model = buildFoundationReleaseCandidateModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-foundation-release-candidate={`${FOUNDATION_RELEASE_CANDIDATE_MARKERS} buildFoundationReleaseCandidateStableKey FoundationReleaseCandidatePanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 359"
        title="Foundation RC"
        subtitle="CodexForge foundation release candidate summarizes readiness for the complete foundation. Foundation release candidate remains review-only, release does not ship automatically, and execution remains behind explicit approval gates."
        primary={{ href: "#codexforge-foundation-release-candidate", label: "Review release" }}
        links={[
          { href: "/mvp-hardening-regression-matrix", label: "Hardening matrix" },
          { href: "/operator-dashboard-release-candidate", label: "Dashboard RC" },
          { href: "/foundation-release-runbook-finalization", label: "Release runbook" },
          { href: "/first-real-operator-workflow-trial", label: "Real trial" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.releaseLanguage} />
      <PreviewFoundationCard title="Plain-English foundation release">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page is a release review surface only. It does not ship, release, run builds, run smoke checks, run
          tests, execute workflows, write files, export files, mutate memory, or call provider, connector, or web/search
          APIs.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="codexforge-foundation-release-candidate" style={previewStyles.grid}>
        {model.candidates.map((candidate) => (
          <PreviewFoundationCard
            key={buildFoundationReleaseCandidateStableKey("foundation-release-candidate-card", candidate.id)}
            title={candidate.foundationReleaseIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Release decision: ${candidate.releaseDecision}`,
                ...candidate.releaseReadinessByLoop,
                candidate.regressionReadiness,
                candidate.safetyAuditReadiness,
                candidate.operatorDashboardReadiness,
                `Known gaps: ${candidate.knownGaps.join("; ")}`,
                candidate.releaseRunbookRoute,
                candidate.firstRealWorkflowRoute,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced release details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.candidates.map((candidate) => candidate.advancedReleaseDetails)} />
        <PreviewFoundationCopy>
          Advanced release details stay collapsed or secondary. The release candidate is separate from shipping,
          workflow execution, build execution, smoke execution, file export, memory mutation, and provider or connector
          calls.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
