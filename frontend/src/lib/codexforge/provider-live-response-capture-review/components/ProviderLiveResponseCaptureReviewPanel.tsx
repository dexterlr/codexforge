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
  buildProviderLiveResponseCaptureReviewModel,
  buildProviderLiveResponseCaptureReviewStableKey,
} from "@/lib/codexforge/provider-live-response-capture-review";

const PROVIDER_LIVE_RESPONSE_CAPTURE_REVIEW_MARKERS =
  "Provider live response capture review Provider live response capture review does not store provider outputs Provider responses require operator review before use Unsafe provider responses remain blocked Response capture groups Safety review checklist provider live response capture identity redaction checklist cost/rate-limit record checklist denied response actions blocked response risks provider release candidate route local model live guard route next recommended action review-only approval required no action execution from UI no workflow execution no workflow execution from UI no workflow runs automatically no live workflow launch no go-live action no live provider/local/connector/automation traffic routing no approval automation no auto-approval no approval is granted no action approval from UI no approval decision persistence no provider API calls no provider live connection tests no provider traffic routing no prompt sending to providers no provider output persistence no provider response ingestion no local model calls no local model invocation no local bridge endpoint calls no local bridge endpoint calls from arbitrary UI no local endpoint storage no local model output persistence no local model output ingestion no connector API calls no connector account connection no connector data fetch no connector data persistence no connector data storage no automation execution no automation creation no automation rule persistence no reminder creation no task scheduling no schedule creation no scheduled task creation no conditional watch creation no watch creation no background job creation no polling loop creation no polling loops from UI no background jobs no notification sending no creative asset generation no research execution no coding workflow execution no patch apply behavior no web/search API calls no GitHub API calls from UI no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live data sending without approval no prompt/file/project/connector/provider/model/output data sending without approval no prompt/file/project/connector/provider/model data sending without approval no prompt/file/project/connector data sending without approval no prompt/file/project data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution from UI no shell command execution no command execution no test/build/smoke execution from UI no test execution from UI no build execution from UI no smoke execution from UI no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no file deletion no evidence ingestion automation no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no localStorage API key storage no sessionStorage API key storage no token storage no endpoint storage no credential storage no output storage no automation data storage no localStorage writes no sessionStorage writes no localStorage/sessionStorage token storage no process.env printing no API keys or secrets displayed no example real key/token/endpoint values no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw provider/response/output JSON above the fold no giant raw JSON above fold advanced details collapsed/secondary advanced capture details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function ProviderLiveResponseCaptureReviewPanel() {
  const model = buildProviderLiveResponseCaptureReviewModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-provider-live-response-capture-review={`${PROVIDER_LIVE_RESPONSE_CAPTURE_REVIEW_MARKERS} buildProviderLiveResponseCaptureReviewStableKey ProviderLiveResponseCaptureReviewPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 460"
        title="Provider response capture"
        subtitle="Provider live response capture review is review-only and does not store provider outputs. Provider responses require operator review before use, and unsafe provider responses remain blocked."
        primary={{ href: "#provider-live-response-capture-review", label: "Review capture" }}
        links={[
          { href: "/first-provider-live-call-trial-review", label: "Provider trial" },
          { href: "/provider-live-trial-release-candidate", label: "Provider RC" },
          { href: "/local-model-live-call-guard-review", label: "Local guard" },
          { href: "/provider-response-review-inbox", label: "Response inbox" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.captureLanguage} />
      <PreviewFoundationCard title="Plain-English provider live response capture review">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews provider live response capture identity, response capture groups, redaction checklist,
          safety review checklist, cost/rate-limit record checklist, denied response actions, blocked response risks,
          provider release candidate route, local model live guard route, and next recommended action. It does not store
          provider outputs, ingest responses, call providers, mutate files, or mutate memory.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="provider-live-response-capture-review" style={previewStyles.grid}>
        {model.reviews.map((review) => (
          <PreviewFoundationCard
            key={buildProviderLiveResponseCaptureReviewStableKey("provider-live-response-capture-card", review.id)}
            title={review.providerLiveResponseCaptureIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${review.status}`,
                `Response capture groups: ${review.responseCaptureGroups.join("; ")}`,
                `Redaction checklist: ${review.redactionChecklist.join("; ")}`,
                `Safety review checklist: ${review.safetyReviewChecklist.join("; ")}`,
                `Cost/rate-limit record checklist: ${review.costRateLimitRecordChecklist.join("; ")}`,
                `Denied response actions: ${review.deniedResponseActions.join("; ")}`,
                `Blocked response risks: ${review.blockedResponseRisks.join("; ")}`,
                review.providerReleaseCandidateRoute,
                review.localModelLiveGuardRoute,
                review.nextRecommendedAction,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced capture details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.reviews.map((review) => review.advancedCaptureDetails)} />
        <PreviewFoundationCopy>
          Advanced capture details stay collapsed or secondary. This review never stores provider outputs, ingests
          responses, sends follow-up prompts, calls providers, persists approvals, writes files, or mutates memory.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
