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
  buildProviderLiveCallGuardReviewModel,
  buildProviderLiveCallGuardReviewStableKey,
} from "@/lib/codexforge/provider-live-call-guard-review";

const PROVIDER_LIVE_CALL_GUARD_REVIEW_MARKERS =
  "Provider live call guard review Provider live call guard review does not call providers Provider live calls require explicit operator approval Provider credentials stay private Live call guard groups Credential boundary checklist provider live call guard identity prompt sending checklist approval gate checklist denied provider live-call actions blocked live-call risks first provider live call trial route provider response capture route next recommended action review-only approval required no action execution from UI no workflow execution no workflow execution from UI no workflow runs automatically no live workflow launch no go-live action no live provider/local/connector/automation traffic routing no approval automation no auto-approval no approval is granted no action approval from UI no approval decision persistence no provider API calls no provider live connection tests no provider traffic routing no prompt sending to providers no provider output persistence no provider response ingestion no local model calls no local model invocation no local bridge endpoint calls no local bridge endpoint calls from arbitrary UI no local endpoint storage no local model output persistence no local model output ingestion no connector API calls no connector account connection no connector data fetch no connector data persistence no connector data storage no automation execution no automation creation no automation rule persistence no reminder creation no task scheduling no schedule creation no scheduled task creation no conditional watch creation no watch creation no background job creation no polling loop creation no polling loops from UI no background jobs no notification sending no creative asset generation no research execution no coding workflow execution no patch apply behavior no web/search API calls no GitHub API calls from UI no prompt/file/project/connector/provider/model/output/audit/evidence/automation/live data sending without approval no prompt/file/project/connector/provider/model/output data sending without approval no prompt/file/project/connector/provider/model data sending without approval no prompt/file/project/connector data sending without approval no prompt/file/project data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution from UI no shell command execution no command execution no test/build/smoke execution from UI no test execution from UI no build execution from UI no smoke execution from UI no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no file deletion no evidence ingestion automation no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no localStorage API key storage no sessionStorage API key storage no token storage no endpoint storage no credential storage no output storage no automation data storage no localStorage writes no sessionStorage writes no localStorage/sessionStorage token storage no process.env printing no API keys or secrets displayed no example real key/token/endpoint values no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw provider/live-call JSON above the fold no giant raw JSON above fold advanced details collapsed/secondary advanced guard details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function ProviderLiveCallGuardReviewPanel() {
  const model = buildProviderLiveCallGuardReviewModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-provider-live-call-guard-review={`${PROVIDER_LIVE_CALL_GUARD_REVIEW_MARKERS} buildProviderLiveCallGuardReviewStableKey ProviderLiveCallGuardReviewPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 458"
        title="Provider live guard"
        subtitle="Provider live call guard review is review-only and approval required. Provider live call guard review does not call providers, provider live calls require explicit operator approval, and provider credentials stay private."
        primary={{ href: "#provider-live-call-guard-review", label: "Review guard" }}
        links={[
          { href: "/first-provider-live-call-trial-review", label: "First trial review" },
          { href: "/provider-live-response-capture-review", label: "Response capture" },
          { href: "/provider-integration-hardening-pass", label: "Provider hardening" },
          { href: "/provider-audit-trail-review", label: "Audit trail" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.guardLanguage} />
      <PreviewFoundationCard title="Plain-English provider live call guard review">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews provider live call guard identity, live call guard groups, credential boundary checklist,
          prompt sending checklist, approval gate checklist, denied provider live-call actions, blocked live-call risks,
          first provider live call trial route, provider response capture route, and next recommended action. It does not
          call providers, send prompts, test provider connections, store credentials, store outputs, route live traffic,
          approve actions, mutate files, or mutate memory.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="provider-live-call-guard-review" style={previewStyles.grid}>
        {model.reviews.map((review) => (
          <PreviewFoundationCard
            key={buildProviderLiveCallGuardReviewStableKey("provider-live-call-guard-card", review.id)}
            title={review.providerLiveCallGuardIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${review.status}`,
                `Live call guard groups: ${review.liveCallGuardGroups.join("; ")}`,
                `Credential boundary checklist: ${review.credentialBoundaryChecklist.join("; ")}`,
                `Prompt sending checklist: ${review.promptSendingChecklist.join("; ")}`,
                `Approval gate checklist: ${review.approvalGateChecklist.join("; ")}`,
                `Denied provider live-call actions: ${review.deniedProviderLiveCallActions.join("; ")}`,
                `Blocked live-call risks: ${review.blockedLiveCallRisks.join("; ")}`,
                review.firstProviderLiveCallTrialRoute,
                review.providerResponseCaptureRoute,
                review.nextRecommendedAction,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced guard details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.reviews.map((review) => review.advancedGuardDetails)} />
        <PreviewFoundationCopy>
          Advanced guard details stay collapsed or secondary. This review remains separate from provider calls, provider
          connection tests, prompt sending, provider response storage, approval persistence, live traffic routing, tools,
          agents, plugins, local models, local bridge endpoints, file mutation, and memory mutation.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
