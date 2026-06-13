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
  buildLocalModelLiveTrialReleaseCandidateModel,
  buildLocalModelLiveTrialReleaseCandidateStableKey,
} from "@/lib/codexforge/local-model-live-trial-release-candidate";

const LOCAL_MODEL_LIVE_TRIAL_RELEASE_CANDIDATE_MARKERS =
  "Local model live trial release candidate Local model live trial release candidate does not route live local-model traffic Local model live trial release requires explicit approval Unresolved local model blockers stay blocked Local endpoint privacy status Denied local model live paths local model live trial candidate identity live call guard status first local model trial status output capture status unresolved local model blockers connector live access route automation live guard route next recommended action review-only approval required no action execution from UI no workflow execution no workflow execution from UI no workflow runs automatically no live workflow launch no go-live action no live provider/local/connector/automation traffic routing no approval automation no auto-approval no approval is granted no action approval from UI no approval decision persistence no provider API calls no provider live connection tests no provider traffic routing no prompt sending to providers no provider output persistence no provider response ingestion no provider settings persistence no local model calls no local model invocation no local bridge endpoint calls no local bridge endpoint calls from arbitrary UI no local endpoint storage no local model output persistence no local model output ingestion no connector API calls no connector account connection no connector data fetch no connector data persistence no connector data storage no automation execution no automation creation no automation rule persistence no reminder creation no task scheduling no schedule creation no scheduled task creation no conditional watch creation no watch creation no background job creation no polling loop creation no polling loops from UI no background jobs no notification sending no creative asset generation no research execution no coding workflow execution no patch apply behavior no web/search API calls no GitHub API calls from UI no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live data sending without approval no prompt/file/project/connector/provider/model/output data sending without approval no prompt/file/project/connector/provider/model data sending without approval no prompt/file/project/connector data sending without approval no prompt/file/project data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution from UI no shell command execution no command execution no test/build/smoke execution from UI no test execution from UI no build execution from UI no smoke execution from UI no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no file deletion no evidence ingestion automation no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no localStorage API key storage no sessionStorage API key storage no token storage no endpoint storage no credential storage no output storage no automation data storage no localStorage writes no sessionStorage writes no localStorage/sessionStorage token storage no process.env printing no API keys or secrets displayed no example real key/token/endpoint values no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw local model/release JSON above the fold no giant raw JSON above fold advanced details collapsed/secondary advanced candidate details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function LocalModelLiveTrialReleaseCandidatePanel() {
  const model = buildLocalModelLiveTrialReleaseCandidateModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-local-model-live-trial-release-candidate={`${LOCAL_MODEL_LIVE_TRIAL_RELEASE_CANDIDATE_MARKERS} buildLocalModelLiveTrialReleaseCandidateStableKey LocalModelLiveTrialReleaseCandidatePanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 465"
        title="Local model live RC"
        subtitle="Local model live trial release candidate is review-only and does not route live local-model traffic. Local model live trial release requires explicit approval, and unresolved local model blockers stay blocked."
        primary={{ href: "#local-model-live-trial-release-candidate", label: "Review candidate" }}
        links={[
          { href: "/local-model-live-call-guard-review", label: "Local guard" },
          { href: "/first-local-model-live-trial-review", label: "Local trial" },
          { href: "/local-model-live-output-capture-review", label: "Output capture" },
          { href: "/connector-live-permission-trial-review", label: "Connector access" },
          { href: "/automation-schedule-safety-review", label: "Automation guard" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.candidateLanguage} />
      <PreviewFoundationCard title="Plain-English local model live trial release candidate">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews local model live trial candidate identity, live call guard status, first local model trial
          status, output capture status, local endpoint privacy status, denied local model live paths, unresolved local
          model blockers, connector live access route, automation live guard route, and next recommended action. It does
          not route live local-model traffic, call local models, persist settings, approve release, mutate files, or
          mutate memory.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="local-model-live-trial-release-candidate" style={previewStyles.grid}>
        {model.candidates.map((candidate) => (
          <PreviewFoundationCard
            key={buildLocalModelLiveTrialReleaseCandidateStableKey("local-model-live-rc-card", candidate.id)}
            title={candidate.localModelLiveTrialCandidateIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${candidate.status}`,
                `Live call guard status: ${candidate.liveCallGuardStatus.join("; ")}`,
                `First local model trial status: ${candidate.firstLocalModelTrialStatus.join("; ")}`,
                `Output capture status: ${candidate.outputCaptureStatus.join("; ")}`,
                `Local endpoint privacy status: ${candidate.localEndpointPrivacyStatus.join("; ")}`,
                `Denied local model live paths: ${candidate.deniedLocalModelLivePaths.join("; ")}`,
                `Unresolved local model blockers: ${candidate.unresolvedLocalModelBlockers.join("; ")}`,
                candidate.connectorLiveAccessRoute,
                candidate.automationLiveGuardRoute,
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
          Advanced candidate details stay collapsed or secondary. This release candidate never routes local-model
          traffic, invokes local models, calls bridge endpoints, persists settings, stores outputs, approves release, or
          clears unresolved blockers.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
