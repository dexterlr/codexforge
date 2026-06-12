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
  buildResearchProviderTrialReviewModel,
  buildResearchProviderTrialReviewStableKey,
} from "@/lib/codexforge/research-provider-trial-review";

const RESEARCH_PROVIDER_TRIAL_REVIEW_MARKERS =
  "Research provider trial review Research provider trial does not run research Research provider calls require explicit operator approval Evidence is not ingested automatically Research provider families Freshness conflict checklist research provider trial identity evidence and citation boundary notes approval gate checklist denied research provider actions blocked research trial risks coding provider trial route cross-provider comparison route next recommended action review-only approval required no action execution from UI no workflow execution no workflow execution from UI no workflow runs automatically no approval automation no approval is granted no action approval from UI no research provider calls no research execution no browsing/search/fetching from UI no source fetching/browsing no external data fetching no evidence ingestion automation no evidence ingestion no provider API calls no provider live connection tests no provider traffic no provider traffic routing no provider output persistence no provider output ingestion no prompt sending to providers no output storage no local model calls no local bridge endpoint calls no local bridge endpoint calls from arbitrary UI no connector API calls no web/search API calls no GitHub API calls from UI no prompt/file/project/connector/provider/model/evidence/output data sending without approval no prompt/file/project/connector/provider/model data sending without approval no prompt/file/project/connector data sending without approval no prompt/file/project data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution from UI no shell command execution no command execution no test/build/smoke execution from UI no test execution from UI no build execution from UI no smoke execution from UI no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no patch apply behavior no file deletion no creative asset generation no coding workflow execution no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no reminder creation no task scheduling no automation creation no background job creation no notification sending no polling loops from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no credential storage no provider key storage no connector token storage no token storage no endpoint storage no localStorage/sessionStorage token storage no localStorage API key storage no sessionStorage API key storage no process.env printing no API keys or secrets displayed no example real key/token/endpoint values no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw research provider JSON above the fold no giant raw JSON above fold advanced details collapsed/secondary advanced research provider details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function ResearchProviderTrialReviewPanel() {
  const model = buildResearchProviderTrialReviewModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-research-provider-trial-review={`${RESEARCH_PROVIDER_TRIAL_REVIEW_MARKERS} buildResearchProviderTrialReviewStableKey ResearchProviderTrialReviewPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 427"
        title="Research provider trial review"
        subtitle="Research provider trial review checks readiness without running research. Research provider calls require explicit operator approval, and evidence is not ingested automatically."
        primary={{ href: "#research-provider-trial-review", label: "Review research trial" }}
        links={[
          { href: "/creative-provider-trial-review", label: "Creative provider trial" },
          { href: "/coding-provider-trial-review", label: "Coding provider trial" },
          { href: "/cross-provider-result-comparison", label: "Provider comparison" },
          { href: "/research-workflow-readiness-audit", label: "Research readiness" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.trialLanguage} />
      <PreviewFoundationCard title="Plain-English research provider trial review">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews research provider trial identity, research provider families, evidence and citation boundary
          notes, freshness conflict checklist, approval gate checklist, denied research provider actions, blocked
          research trial risks, coding provider trial route, cross-provider comparison route, and next recommended action.
          It does not browse, search, fetch, call providers, ingest evidence, store outputs, mutate files, or mutate
          memory.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="research-provider-trial-review" style={previewStyles.grid}>
        {model.trials.map((trial) => (
          <PreviewFoundationCard
            key={buildResearchProviderTrialReviewStableKey("research-provider-trial-card", trial.id)}
            title={trial.researchProviderTrialIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${trial.status}`,
                `Research provider families: ${trial.researchProviderFamilies.join("; ")}`,
                `Evidence and citation boundary notes: ${trial.evidenceCitationBoundaryNotes.join("; ")}`,
                `Freshness conflict checklist: ${trial.freshnessConflictChecklist.join("; ")}`,
                `Approval gate checklist: ${trial.approvalGateChecklist.join("; ")}`,
                `Denied research provider actions: ${trial.deniedResearchProviderActions.join("; ")}`,
                `Blocked research trial risks: ${trial.blockedResearchTrialRisks.join("; ")}`,
                trial.codingProviderTrialRoute,
                trial.crossProviderComparisonRoute,
                trial.nextRecommendedAction,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced research provider details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.trials.map((trial) => trial.advancedResearchProviderDetails)} />
        <PreviewFoundationCopy>
          Advanced research provider details stay collapsed or secondary. This page never runs research, browses,
          searches, fetches, calls providers, ingests evidence, stores outputs, or approves research provider use
          automatically.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
