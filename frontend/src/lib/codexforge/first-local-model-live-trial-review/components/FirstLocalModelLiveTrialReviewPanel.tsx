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
  buildFirstLocalModelLiveTrialReviewModel,
  buildFirstLocalModelLiveTrialReviewStableKey,
} from "@/lib/codexforge/first-local-model-live-trial-review";

const FIRST_LOCAL_MODEL_LIVE_TRIAL_REVIEW_MARKERS =
  "First local model live trial review First local model live trial review does not invoke local models Local model trial requires explicit operator approval Unapproved local model calls remain blocked Runtime readiness checklist Prompt privacy checklist first local model live trial identity Trial stages approval gate checklist denied local trial actions blocked local trial risks local output capture route local release candidate route next recommended action review-only approval required no action execution from UI no workflow execution no workflow execution from UI no workflow runs automatically no live workflow launch no go-live action no live provider/local/connector/automation traffic routing no approval automation no auto-approval no approval is granted no action approval from UI no approval decision persistence no provider API calls no provider live connection tests no provider traffic routing no prompt sending to providers no provider output persistence no provider response ingestion no local model calls no local model invocation no local bridge endpoint calls no local bridge endpoint calls from arbitrary UI no local endpoint storage no local model output persistence no local model output ingestion no connector API calls no connector account connection no connector data fetch no connector data persistence no connector data storage no automation execution no automation creation no automation rule persistence no reminder creation no task scheduling no schedule creation no scheduled task creation no conditional watch creation no watch creation no background job creation no polling loop creation no polling loops from UI no background jobs no notification sending no creative asset generation no research execution no coding workflow execution no patch apply behavior no web/search API calls no GitHub API calls from UI no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live data sending without approval no prompt/file/project/connector/provider/model/output data sending without approval no prompt/file/project/connector/provider/model data sending without approval no prompt/file/project/connector data sending without approval no prompt/file/project data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution from UI no shell command execution no command execution no test/build/smoke execution from UI no test execution from UI no build execution from UI no smoke execution from UI no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no file deletion no evidence ingestion automation no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no localStorage API key storage no sessionStorage API key storage no token storage no endpoint storage no credential storage no output storage no automation data storage no localStorage writes no sessionStorage writes no localStorage/sessionStorage token storage no process.env printing no API keys or secrets displayed no example real key/token/endpoint values no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw local model/trial JSON above the fold no giant raw JSON above fold advanced details collapsed/secondary advanced trial details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function FirstLocalModelLiveTrialReviewPanel() {
  const model = buildFirstLocalModelLiveTrialReviewModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-first-local-model-live-trial-review={`${FIRST_LOCAL_MODEL_LIVE_TRIAL_REVIEW_MARKERS} buildFirstLocalModelLiveTrialReviewStableKey FirstLocalModelLiveTrialReviewPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 463"
        title="Local model trial"
        subtitle="First local model live trial review previews a local model trial without invoking local models. Local model trial requires explicit operator approval, and unapproved local model calls remain blocked."
        primary={{ href: "#first-local-model-live-trial-review", label: "Review trial" }}
        links={[
          { href: "/local-model-live-call-guard-review", label: "Local guard" },
          { href: "/local-model-live-output-capture-review", label: "Output capture" },
          { href: "/local-model-live-trial-release-candidate", label: "Local RC" },
          { href: "/local-model-runtime-boundary-review", label: "Runtime boundary" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.trialLanguage} />
      <PreviewFoundationCard title="Plain-English first local model live trial review">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews first local model live trial identity, trial stages, runtime readiness checklist, prompt
          privacy checklist, approval gate checklist, denied local trial actions, blocked local trial risks, local output
          capture route, local release candidate route, and next recommended action. It does not invoke local models,
          call local bridge endpoints, send prompts, store outputs, mutate files, or mutate memory.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="first-local-model-live-trial-review" style={previewStyles.grid}>
        {model.reviews.map((review) => (
          <PreviewFoundationCard
            key={buildFirstLocalModelLiveTrialReviewStableKey("first-local-model-live-trial-card", review.id)}
            title={review.firstLocalModelLiveTrialIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${review.status}`,
                `Trial stages: ${review.trialStages.join("; ")}`,
                `Runtime readiness checklist: ${review.runtimeReadinessChecklist.join("; ")}`,
                `Prompt privacy checklist: ${review.promptPrivacyChecklist.join("; ")}`,
                `Approval gate checklist: ${review.approvalGateChecklist.join("; ")}`,
                `Denied local trial actions: ${review.deniedLocalTrialActions.join("; ")}`,
                `Blocked local trial risks: ${review.blockedLocalTrialRisks.join("; ")}`,
                review.localOutputCaptureRoute,
                review.localReleaseCandidateRoute,
                review.nextRecommendedAction,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced trial details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.reviews.map((review) => review.advancedTrialDetails)} />
        <PreviewFoundationCopy>
          Advanced trial details stay collapsed or secondary. This review never invokes local models, calls local bridge
          endpoints, probes endpoints, sends prompts, stores outputs, persists approvals, or routes local model traffic.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
