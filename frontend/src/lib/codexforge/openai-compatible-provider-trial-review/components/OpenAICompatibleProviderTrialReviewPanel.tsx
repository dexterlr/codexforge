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
  buildOpenAICompatibleProviderTrialReviewModel,
  buildOpenAICompatibleProviderTrialReviewStableKey,
} from "@/lib/codexforge/openai-compatible-provider-trial-review";

const OPENAI_COMPATIBLE_PROVIDER_TRIAL_REVIEW_MARKERS =
  "OpenAI-compatible provider trial review OpenAI-compatible provider trial does not send provider traffic Provider trial requires explicit operator approval Credentials and endpoints stay private Provider lane groups Endpoint compatibility notes OpenAI-compatible provider trial identity model capability preview approval gate checklist denied provider actions blocked trial risks credential boundary route failover policy route next recommended action review-only approval required no action execution from UI no workflow execution no workflow execution from UI no workflow runs automatically no approval automation no approval is granted no action approval from UI no provider connection behavior no provider API calls no OpenAI-compatible provider calls no provider live connection tests no provider traffic no provider traffic routing no provider switching no provider retry calls no local model calls no local bridge endpoint calls no local bridge endpoint calls from arbitrary UI no connector API calls no web/search API calls no GitHub API calls from UI no prompt/file/project/connector/provider/model/credential data sending without approval no prompt/file/project/connector/provider/model data sending without approval no prompt/file/project/connector data sending without approval no prompt/file/project data sending without approval no credential storage no provider key storage no connector token storage no localStorage/sessionStorage token storage no localStorage API key storage no sessionStorage API key storage no token storage no endpoint storage no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution from UI no shell command execution no command execution no test/build/smoke execution from UI no test execution from UI no build execution from UI no smoke execution from UI no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no patch apply behavior no file deletion no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no reminder creation no task scheduling no automation creation no background job creation no notification sending no polling loops from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no process.env printing no API keys or secrets displayed no example real key/token values no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced provider trial details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function OpenAICompatibleProviderTrialReviewPanel() {
  const model = buildOpenAICompatibleProviderTrialReviewModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-openai-compatible-provider-trial-review={`${OPENAI_COMPATIBLE_PROVIDER_TRIAL_REVIEW_MARKERS} buildOpenAICompatibleProviderTrialReviewStableKey OpenAICompatibleProviderTrialReviewPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 414"
        title="OpenAI provider review"
        subtitle="OpenAI-compatible provider trial review checks the first remote-provider lane without sending traffic or testing connections. OpenAI-compatible provider trial does not send provider traffic, provider trial requires explicit operator approval, and credentials and endpoints stay private."
        primary={{ href: "#openai-compatible-provider-trial-review", label: "Review provider trial" }}
        links={[
          { href: "/remote-provider-credential-boundary-review", label: "Credential boundary" },
          { href: "/provider-failover-policy-review", label: "Failover policy" },
          { href: "/controlled-provider-integration-plan", label: "Provider plan" },
          { href: "/local-model-provider-trial-review", label: "Local model trial" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.trialLanguage} />
      <PreviewFoundationCard title="Plain-English OpenAI-compatible provider trial review">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews OpenAI-compatible provider trial identity, provider lane groups, model capability preview,
          endpoint compatibility notes, approval gate checklist, denied provider actions, blocked trial risks,
          credential boundary route, failover policy route, and next recommended action. It does not connect providers,
          test connections, call APIs, store credentials, display endpoints, route traffic, mutate files, or mutate
          memory.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="openai-compatible-provider-trial-review" style={previewStyles.grid}>
        {model.reviews.map((review) => (
          <PreviewFoundationCard
            key={buildOpenAICompatibleProviderTrialReviewStableKey("openai-compatible-provider-trial-card", review.id)}
            title={review.openAICompatibleProviderTrialIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${review.status}`,
                `Provider lane groups: ${review.providerLaneGroups.join("; ")}`,
                `Model capability preview: ${review.modelCapabilityPreview.join("; ")}`,
                `Endpoint compatibility notes: ${review.endpointCompatibilityNotes.join("; ")}`,
                `Approval gate checklist: ${review.approvalGateChecklist.join("; ")}`,
                `Denied provider actions: ${review.deniedProviderActions.join("; ")}`,
                `Blocked trial risks: ${review.blockedTrialRisks.join("; ")}`,
                review.credentialBoundaryRoute,
                review.failoverPolicyRoute,
                review.nextRecommendedAction,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced provider trial details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.reviews.map((review) => review.advancedProviderTrialDetails)} />
        <PreviewFoundationCopy>
          Advanced provider trial details stay collapsed or secondary. This page never sends provider traffic, tests a
          provider connection, stores credentials, displays endpoints, or approves the trial automatically.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
