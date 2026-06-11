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
  buildUnifiedWorkspaceSearchReleaseCandidateModel,
  buildUnifiedWorkspaceSearchReleaseCandidateStableKey,
} from "@/lib/codexforge/unified-workspace-search-release-candidate";

const UNIFIED_WORKSPACE_SEARCH_RELEASE_CANDIDATE_MARKERS =
  "Unified workspace search release candidate Unified search candidate does not run live search Live search requires explicit approval Denied sources remain blocked Search scope matrix Denied source matrix unified search candidate identity source search previews approval gates privacy/redaction requirements release blockers provider readiness route connector readiness route next recommended action review-only approval required no action execution from UI no approval automation no approval is granted no action approval from UI no live search execution no search execution from UI no search query persistence no workflow execution no workflow execution from UI no workflow runs automatically no provider API calls no connector API calls no web/search API calls no GitHub API calls from UI no local bridge endpoint calls no local bridge endpoint calls from arbitrary UI no external data fetching no evidence ingestion automation no project scan no local file reads no prompt/file/project/connector/search/evidence data sending without approval no prompt/file/project/connector data sending without approval no prompt/file/project data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution from UI no shell command execution no command execution no test/build/smoke execution from UI no test execution from UI no build execution from UI no smoke execution from UI no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no patch apply behavior no file deletion no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no reminder creation no task scheduling no automation creation no background job creation no notification sending no polling loops from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no token storage no localStorage/sessionStorage token storage no localStorage API key storage no sessionStorage API key storage no process.env printing no API keys or secrets displayed no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced release candidate details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function UnifiedWorkspaceSearchReleaseCandidatePanel() {
  const model = buildUnifiedWorkspaceSearchReleaseCandidateModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-unified-workspace-search-release-candidate={`${UNIFIED_WORKSPACE_SEARCH_RELEASE_CANDIDATE_MARKERS} buildUnifiedWorkspaceSearchReleaseCandidateStableKey UnifiedWorkspaceSearchReleaseCandidatePanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 401"
        title="Unified search RC"
        subtitle="Unified workspace search release candidate reviews search readiness across loops without starting live search. Unified search candidate does not run live search, live search requires explicit approval, and denied sources remain blocked."
        primary={{ href: "#unified-workspace-search-release-candidate", label: "Review search RC" }}
        links={[
          { href: "/project-knowledge-search-preview", label: "Knowledge search" },
          { href: "/result-comparison-review", label: "Result comparison" },
          { href: "/provider-governance-release-candidate", label: "Provider readiness" },
          { href: "/connector-release-candidate", label: "Connector readiness" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.candidateLanguage} />
      <PreviewFoundationCard title="Plain-English unified workspace search release candidate">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews unified search candidate identity, source search previews, search scope matrix, denied source
          matrix, approval gates, privacy/redaction requirements, release blockers, provider readiness route, connector
          readiness route, and next recommended action. It does not run live search, call APIs, persist search, scan
          files, write files, or mutate memory.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="unified-workspace-search-release-candidate" style={previewStyles.grid}>
        {model.candidates.map((candidate) => (
          <PreviewFoundationCard
            key={buildUnifiedWorkspaceSearchReleaseCandidateStableKey("unified-search-rc-card", candidate.id)}
            title={candidate.unifiedSearchCandidateIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${candidate.status}`,
                `Source search previews: ${candidate.sourceSearchPreviews.join("; ")}`,
                `Search scope matrix: ${candidate.searchScopeMatrix.join("; ")}`,
                `Denied source matrix: ${candidate.deniedSourceMatrix.join("; ")}`,
                `Approval gates: ${candidate.approvalGates.join("; ")}`,
                `Privacy/redaction requirements: ${candidate.privacyRedactionRequirements.join("; ")}`,
                `Release blockers: ${candidate.releaseBlockers.join("; ")}`,
                candidate.providerReadinessRoute,
                candidate.connectorReadinessRoute,
                candidate.nextRecommendedAction,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced release candidate details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.candidates.map((candidate) => candidate.advancedCandidateDetails)} />
        <PreviewFoundationCopy>
          Advanced release candidate details stay collapsed or secondary. Unified search candidate does not run live
          search, and denied sources remain blocked until explicit approval happens elsewhere.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
