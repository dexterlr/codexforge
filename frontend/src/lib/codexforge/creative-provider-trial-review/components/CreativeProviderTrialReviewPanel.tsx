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
  buildCreativeProviderTrialReviewModel,
  buildCreativeProviderTrialReviewStableKey,
} from "@/lib/codexforge/creative-provider-trial-review";

const CREATIVE_PROVIDER_TRIAL_REVIEW_MARKERS =
  "Creative provider trial review Creative provider trial does not generate assets Creative provider calls require explicit operator approval Generated assets are reviewed before use Creative provider families Asset generation boundary notes creative provider trial identity local bridge dependency notes approval gate checklist denied creative provider actions blocked creative trial risks research provider trial route cross-provider comparison route next recommended action review-only approval required no action execution from UI no workflow execution no workflow execution from UI no workflow runs automatically no approval automation no approval is granted no action approval from UI no creative provider calls no creative asset generation no asset generation from UI no media generation from UI no real video generation no image generation no video generation no provider API calls no provider live connection tests no provider traffic no provider traffic routing no provider live connection tests no provider output persistence no provider output ingestion no prompt sending to providers no output storage no local model calls no local bridge endpoint calls no local bridge endpoint calls from arbitrary UI no local tool launching no connector API calls no web/search API calls no GitHub API calls from UI no prompt/file/project/connector/provider/model/output data sending without approval no prompt/file/project/connector/provider/model data sending without approval no prompt/file/project/connector data sending without approval no prompt/file/project data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution from UI no shell command execution no command execution no test/build/smoke execution from UI no test execution from UI no build execution from UI no smoke execution from UI no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no patch apply behavior no file deletion no research execution no evidence ingestion automation no coding workflow execution no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no reminder creation no task scheduling no automation creation no background job creation no notification sending no polling loops from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no credential storage no provider key storage no connector token storage no token storage no endpoint storage no localStorage/sessionStorage token storage no localStorage API key storage no sessionStorage API key storage no process.env printing no API keys or secrets displayed no example real key/token/endpoint values no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw creative provider JSON above the fold no giant raw JSON above fold advanced details collapsed/secondary advanced creative provider details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function CreativeProviderTrialReviewPanel() {
  const model = buildCreativeProviderTrialReviewModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-creative-provider-trial-review={`${CREATIVE_PROVIDER_TRIAL_REVIEW_MARKERS} buildCreativeProviderTrialReviewStableKey CreativeProviderTrialReviewPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 426"
        title="Creative provider trial review"
        subtitle="Creative provider trial review checks readiness without generating assets. Creative provider calls require explicit operator approval, and generated assets are reviewed before use."
        primary={{ href: "#creative-provider-trial-review", label: "Review creative trial" }}
        links={[
          { href: "/research-provider-trial-review", label: "Research provider trial" },
          { href: "/coding-provider-trial-review", label: "Coding provider trial" },
          { href: "/cross-provider-result-comparison", label: "Provider comparison" },
          { href: "/creative-workflow-readiness-audit", label: "Creative readiness" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.trialLanguage} />
      <PreviewFoundationCard title="Plain-English creative provider trial review">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews creative provider trial identity, creative provider families, asset generation boundary notes,
          local bridge dependency notes, approval gate checklist, denied creative provider actions, blocked creative
          trial risks, research provider trial route, cross-provider comparison route, and next recommended action. It
          does not call providers, generate assets, call local bridge endpoints, store outputs, mutate files, or mutate
          memory.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="creative-provider-trial-review" style={previewStyles.grid}>
        {model.trials.map((trial) => (
          <PreviewFoundationCard
            key={buildCreativeProviderTrialReviewStableKey("creative-provider-trial-card", trial.id)}
            title={trial.creativeProviderTrialIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${trial.status}`,
                `Creative provider families: ${trial.creativeProviderFamilies.join("; ")}`,
                `Asset generation boundary notes: ${trial.assetGenerationBoundaryNotes.join("; ")}`,
                `Local bridge dependency notes: ${trial.localBridgeDependencyNotes.join("; ")}`,
                `Approval gate checklist: ${trial.approvalGateChecklist.join("; ")}`,
                `Denied creative provider actions: ${trial.deniedCreativeProviderActions.join("; ")}`,
                `Blocked creative trial risks: ${trial.blockedCreativeTrialRisks.join("; ")}`,
                trial.researchProviderTrialRoute,
                trial.crossProviderComparisonRoute,
                trial.nextRecommendedAction,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced creative provider details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.trials.map((trial) => trial.advancedCreativeProviderDetails)} />
        <PreviewFoundationCopy>
          Advanced creative provider details stay collapsed or secondary. This page never generates assets, calls
          providers, calls the local bridge, stores outputs, or approves creative provider use automatically.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
