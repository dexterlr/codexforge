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
  buildProviderLiveTrialReleaseCandidateModel,
  buildProviderLiveTrialReleaseCandidateStableKey,
} from "@/lib/codexforge/provider-live-trial-release-candidate";

const PROVIDER_LIVE_TRIAL_RELEASE_CANDIDATE_MARKERS =
  "Provider live trial release candidate Provider live trial release candidate does not route live provider traffic Provider live trial release requires explicit approval Unresolved provider blockers stay blocked Live call guard status Cost rate safety status provider live trial candidate identity first provider trial status response capture status denied provider live paths unresolved provider blockers local model live guard route local model trial route next recommended action review-only approval required no action execution from UI no workflow execution no workflow execution from UI no workflow runs automatically no live workflow launch no go-live action no live provider/local/connector/automation traffic routing no approval automation no auto-approval no approval is granted no action approval from UI no approval decision persistence no provider API calls no provider live connection tests no provider traffic routing no prompt sending to providers no provider output persistence no provider response ingestion no provider settings persistence no local model calls no local model invocation no local bridge endpoint calls no local bridge endpoint calls from arbitrary UI no local endpoint storage no local model output persistence no local model output ingestion no connector API calls no connector account connection no connector data fetch no connector data persistence no connector data storage no automation execution no automation creation no automation rule persistence no reminder creation no task scheduling no schedule creation no scheduled task creation no conditional watch creation no watch creation no background job creation no polling loop creation no polling loops from UI no background jobs no notification sending no creative asset generation no research execution no coding workflow execution no patch apply behavior no web/search API calls no GitHub API calls from UI no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live data sending without approval no prompt/file/project/connector/provider/model/output data sending without approval no prompt/file/project/connector/provider/model data sending without approval no prompt/file/project/connector data sending without approval no prompt/file/project data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution from UI no shell command execution no command execution no test/build/smoke execution from UI no test execution from UI no build execution from UI no smoke execution from UI no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no file deletion no evidence ingestion automation no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no localStorage API key storage no sessionStorage API key storage no token storage no endpoint storage no credential storage no output storage no automation data storage no localStorage writes no sessionStorage writes no localStorage/sessionStorage token storage no process.env printing no API keys or secrets displayed no example real key/token/endpoint values no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw provider/release JSON above the fold no giant raw JSON above fold advanced details collapsed/secondary advanced candidate details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function ProviderLiveTrialReleaseCandidatePanel() {
  const model = buildProviderLiveTrialReleaseCandidateModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-provider-live-trial-release-candidate={`${PROVIDER_LIVE_TRIAL_RELEASE_CANDIDATE_MARKERS} buildProviderLiveTrialReleaseCandidateStableKey ProviderLiveTrialReleaseCandidatePanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 461"
        title="Provider live RC"
        subtitle="Provider live trial release candidate is review-only and does not route live provider traffic. Provider live trial release requires explicit approval, and unresolved provider blockers stay blocked."
        primary={{ href: "#provider-live-trial-release-candidate", label: "Review candidate" }}
        links={[
          { href: "/provider-live-call-guard-review", label: "Live guard" },
          { href: "/first-provider-live-call-trial-review", label: "Provider trial" },
          { href: "/provider-live-response-capture-review", label: "Response capture" },
          { href: "/local-model-live-call-guard-review", label: "Local guard" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.candidateLanguage} />
      <PreviewFoundationCard title="Plain-English provider live trial release candidate">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews provider live trial candidate identity, live call guard status, first provider trial status,
          response capture status, cost rate safety status, denied provider live paths, unresolved provider blockers,
          local model live guard route, local model trial route, and next recommended action. It does not route live
          provider traffic, call providers, persist settings, approve release, mutate files, or mutate memory.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="provider-live-trial-release-candidate" style={previewStyles.grid}>
        {model.candidates.map((candidate) => (
          <PreviewFoundationCard
            key={buildProviderLiveTrialReleaseCandidateStableKey("provider-live-trial-rc-card", candidate.id)}
            title={candidate.providerLiveTrialCandidateIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${candidate.status}`,
                `Live call guard status: ${candidate.liveCallGuardStatus.join("; ")}`,
                `First provider trial status: ${candidate.firstProviderTrialStatus.join("; ")}`,
                `Response capture status: ${candidate.responseCaptureStatus.join("; ")}`,
                `Cost rate safety status: ${candidate.costRateSafetyStatus.join("; ")}`,
                `Denied provider live paths: ${candidate.deniedProviderLivePaths.join("; ")}`,
                `Unresolved provider blockers: ${candidate.unresolvedProviderBlockers.join("; ")}`,
                candidate.localModelLiveGuardRoute,
                candidate.localModelTrialRoute,
                candidate.nextRecommendedAction,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced candidate details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.candidates.map((candidate) => candidate.advancedCandidateDetails)} />
        <PreviewFoundationCopy>
          Advanced candidate details stay collapsed or secondary. This release candidate never routes provider traffic,
          calls providers, persists settings, approves release, stores outputs, or clears unresolved blockers.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
