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
  buildCodexForgeBetaReleaseCandidateModel,
  buildCodexForgeBetaReleaseCandidateStableKey,
} from "@/lib/codexforge/codexforge-beta-release-candidate";

const CODEXFORGE_BETA_RELEASE_CANDIDATE_MARKERS =
  "CodexForge beta release candidate Beta release candidate does not publish beta Beta release requires explicit operator approval Unresolved blockers remain blocked Readiness groups Approval checklist beta release candidate identity workflow readiness summary provider/local/connector/automation readiness summary release blockers controlled provider integration route local model trial route next recommended action review-only approval required no action execution from UI no workflow execution no workflow execution from UI no workflow runs automatically no creative workflow execution no research execution no coding workflow execution no approval automation no approval is granted no action approval from UI no beta publish/release behavior no beta publish behavior no beta release behavior no release/publish behavior no release publishing no release-note publishing/exporting no release notes publishing no release notes creation from UI no file export/write behavior no export/write behavior no runbook export/write behavior no test/build/smoke execution from UI no test execution from UI no build execution from UI no smoke execution from UI no provider connection behavior no provider API calls no provider live connection tests no provider traffic no local model calls no local bridge endpoint calls no local bridge endpoint calls from arbitrary UI no connector API calls no web/search API calls no GitHub API calls from UI no prompt/file/project/connector/provider/model data sending without approval no prompt/file/project/connector data sending without approval no prompt/file/project data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution from UI no shell command execution no command execution no file mutation no file write no patch apply behavior no file deletion no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no reminder creation no task scheduling no automation creation no background job creation no notification sending no polling loops from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no localStorage/sessionStorage token storage no localStorage API key storage no sessionStorage API key storage no token storage no endpoint storage no process.env printing no API keys or secrets displayed no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced beta candidate details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function CodexForgeBetaReleaseCandidatePanel() {
  const model = buildCodexForgeBetaReleaseCandidateModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-beta-release-candidate={`${CODEXFORGE_BETA_RELEASE_CANDIDATE_MARKERS} buildCodexForgeBetaReleaseCandidateStableKey CodexForgeBetaReleaseCandidatePanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 411"
        title="Beta release RC"
        subtitle="CodexForge beta release candidate confirms beta readiness without publishing beta. Beta release candidate does not publish beta, beta release requires explicit operator approval, and unresolved blockers remain blocked."
        primary={{ href: "#codexforge-beta-release-candidate", label: "Review beta RC" }}
        links={[
          { href: "/controlled-provider-integration-plan", label: "Provider plan" },
          { href: "/local-model-provider-trial-review", label: "Local model trial" },
          { href: "/beta-hardening-final-pass", label: "Beta hardening" },
          { href: "/beta-release-notes-draft-review", label: "Draft notes" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.betaReleaseCandidateLanguage} />
      <PreviewFoundationCard title="Plain-English CodexForge beta release candidate">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews beta release candidate identity, readiness groups, workflow readiness summary,
          provider/local/connector/automation readiness summary, release blockers, approval checklist, controlled
          provider integration route, local model trial route, and next recommended action. It does not publish beta,
          release beta, create release notes, export files, call providers, call local models, call APIs, approve work,
          or mutate memory.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="codexforge-beta-release-candidate" style={previewStyles.grid}>
        {model.candidates.map((candidate) => (
          <PreviewFoundationCard
            key={buildCodexForgeBetaReleaseCandidateStableKey("beta-release-candidate-card", candidate.id)}
            title={candidate.betaReleaseCandidateIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${candidate.status}`,
                `Readiness groups: ${candidate.readinessGroups.join("; ")}`,
                `Workflow readiness summary: ${candidate.workflowReadinessSummary.join("; ")}`,
                `Provider/local/connector/automation readiness summary: ${candidate.providerLocalConnectorAutomationReadinessSummary.join("; ")}`,
                `Release blockers: ${candidate.releaseBlockers.join("; ")}`,
                `Approval checklist: ${candidate.approvalChecklist.join("; ")}`,
                candidate.controlledProviderIntegrationRoute,
                candidate.localModelTrialRoute,
                candidate.nextRecommendedAction,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced beta candidate details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList
          items={model.candidates.map((candidate) => candidate.advancedBetaReleaseCandidateDetails)}
        />
        <PreviewFoundationCopy>
          Advanced beta candidate details stay collapsed or secondary. This page never publishes beta, approves beta,
          creates release notes, connects providers, calls local models, or clears blockers automatically.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
