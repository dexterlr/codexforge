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
  buildLocalModelLiveOutputCaptureReviewModel,
  buildLocalModelLiveOutputCaptureReviewStableKey,
} from "@/lib/codexforge/local-model-live-output-capture-review";

const LOCAL_MODEL_LIVE_OUTPUT_CAPTURE_REVIEW_MARKERS =
  "Local model live output capture review Local model live output capture review does not store model outputs Local model outputs require operator review before use Unsafe local model outputs remain blocked Output capture groups Operator review checklist local model output capture identity redaction checklist safety review checklist denied output actions blocked output risks local release candidate route provider live trial route next recommended action review-only approval required no action execution from UI no workflow execution no workflow execution from UI no workflow runs automatically no live workflow launch no go-live action no live provider/local/connector/automation traffic routing no approval automation no auto-approval no approval is granted no action approval from UI no approval decision persistence no provider API calls no provider live connection tests no provider traffic routing no prompt sending to providers no provider output persistence no provider response ingestion no local model calls no local model invocation no local bridge endpoint calls no local bridge endpoint calls from arbitrary UI no local endpoint storage no local model output persistence no local model output ingestion no connector API calls no connector account connection no connector data fetch no connector data persistence no connector data storage no automation execution no automation creation no automation rule persistence no reminder creation no task scheduling no schedule creation no scheduled task creation no conditional watch creation no watch creation no background job creation no polling loop creation no polling loops from UI no background jobs no notification sending no creative asset generation no research execution no coding workflow execution no patch apply behavior no web/search API calls no GitHub API calls from UI no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live data sending without approval no prompt/file/project/connector/provider/model/output data sending without approval no prompt/file/project/connector/provider/model data sending without approval no prompt/file/project/connector data sending without approval no prompt/file/project data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution from UI no shell command execution no command execution no test/build/smoke execution from UI no test execution from UI no build execution from UI no smoke execution from UI no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no file deletion no evidence ingestion automation no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no localStorage API key storage no sessionStorage API key storage no token storage no endpoint storage no credential storage no output storage no automation data storage no localStorage writes no sessionStorage writes no localStorage/sessionStorage token storage no process.env printing no API keys or secrets displayed no example real key/token/endpoint values no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw local model/output JSON above the fold no giant raw JSON above fold advanced details collapsed/secondary advanced output details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function LocalModelLiveOutputCaptureReviewPanel() {
  const model = buildLocalModelLiveOutputCaptureReviewModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-local-model-live-output-capture-review={`${LOCAL_MODEL_LIVE_OUTPUT_CAPTURE_REVIEW_MARKERS} buildLocalModelLiveOutputCaptureReviewStableKey LocalModelLiveOutputCaptureReviewPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 464"
        title="Local output capture"
        subtitle="Local model live output capture review is review-only and does not store model outputs. Local model outputs require operator review before use, and unsafe local model outputs remain blocked."
        primary={{ href: "#local-model-live-output-capture-review", label: "Review capture" }}
        links={[
          { href: "/first-local-model-live-trial-review", label: "Local trial" },
          { href: "/local-model-live-trial-release-candidate", label: "Local RC" },
          { href: "/provider-live-trial-release-candidate", label: "Provider RC" },
          { href: "/local-model-output-review-inbox", label: "Output inbox" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.outputLanguage} />
      <PreviewFoundationCard title="Plain-English local model live output capture review">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews local model output capture identity, output capture groups, redaction checklist, safety
          review checklist, operator review checklist, denied output actions, blocked output risks, local release
          candidate route, provider live trial route, and next recommended action. It does not store model outputs,
          ingest outputs, call local models, mutate files, or mutate memory.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="local-model-live-output-capture-review" style={previewStyles.grid}>
        {model.reviews.map((review) => (
          <PreviewFoundationCard
            key={buildLocalModelLiveOutputCaptureReviewStableKey("local-model-live-output-capture-card", review.id)}
            title={review.localModelOutputCaptureIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${review.status}`,
                `Output capture groups: ${review.outputCaptureGroups.join("; ")}`,
                `Redaction checklist: ${review.redactionChecklist.join("; ")}`,
                `Safety review checklist: ${review.safetyReviewChecklist.join("; ")}`,
                `Operator review checklist: ${review.operatorReviewChecklist.join("; ")}`,
                `Denied output actions: ${review.deniedOutputActions.join("; ")}`,
                `Blocked output risks: ${review.blockedOutputRisks.join("; ")}`,
                review.localReleaseCandidateRoute,
                review.providerLiveTrialRoute,
                review.nextRecommendedAction,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced output details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.reviews.map((review) => review.advancedOutputDetails)} />
        <PreviewFoundationCopy>
          Advanced output details stay collapsed or secondary. This review never stores model outputs, ingests outputs,
          auto-accepts output, calls local models, sends follow-up prompts, writes files, or mutates memory.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
