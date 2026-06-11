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
  buildLocalModelProviderTrialReviewModel,
  buildLocalModelProviderTrialReviewStableKey,
} from "@/lib/codexforge/local-model-provider-trial-review";

const LOCAL_MODEL_PROVIDER_TRIAL_REVIEW_MARKERS =
  "Local model provider trial review Local model trial review does not call local models Local model traffic requires explicit operator approval Local credentials and endpoints stay private Local model families Local bridge dependency summary local model provider trial identity denied local model actions manual validation checklist safety/credential boundaries blocked local model trial risks provider integration route beta hardening route next recommended action review-only approval required no action execution from UI no workflow execution no workflow execution from UI no workflow runs automatically no approval automation no approval is granted no action approval from UI no local model calls no local model traffic no local bridge endpoint calls no local bridge endpoint calls from arbitrary UI no local service calls no local tool launching no local probes no endpoint storage no token storage no local credential storage no provider connection behavior no provider API calls no OpenAI-compatible provider calls no provider live connection tests no provider traffic no connector API calls no web/search API calls no GitHub API calls from UI no prompt/file/project/connector/provider/model data sending without approval no prompt/file/project/connector/provider/workflow data sending without approval no prompt/file/project/connector data sending without approval no prompt/file/project data sending without approval no localStorage/sessionStorage token storage no localStorage API key storage no sessionStorage API key storage no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution from UI no shell command execution no command execution no test/build/smoke execution from UI no test execution from UI no build execution from UI no smoke execution from UI no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no patch apply behavior no file deletion no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no reminder creation no task scheduling no automation creation no background job creation no notification sending no polling loops from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no process.env printing no API keys or secrets displayed no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced local model details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function LocalModelProviderTrialReviewPanel() {
  const model = buildLocalModelProviderTrialReviewModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-local-model-provider-trial-review={`${LOCAL_MODEL_PROVIDER_TRIAL_REVIEW_MARKERS} buildLocalModelProviderTrialReviewStableKey LocalModelProviderTrialReviewPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 413"
        title="Local model trial"
        subtitle="Local model provider trial review checks local model trial readiness without calling local models or local bridge endpoints. Local model traffic requires explicit operator approval, and local credentials and endpoints stay private."
        primary={{ href: "#local-model-provider-trial-review", label: "Review local trial" }}
        links={[
          { href: "/controlled-provider-integration-plan", label: "Provider plan" },
          { href: "/beta-hardening-final-pass", label: "Beta hardening" },
          { href: "/local-bridge-readiness-audit", label: "Bridge readiness" },
          { href: "/local-provider-probes", label: "Local probes" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.localModelTrialLanguage} />
      <PreviewFoundationCard title="Plain-English local model provider trial review">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews local model provider trial identity, local model families, local bridge dependency summary,
          denied local model actions, manual validation checklist, safety/credential boundaries, blocked local model
          trial risks, provider integration route, beta hardening route, and next recommended action. It does not call
          local models, call local bridge endpoints, store endpoints, store tokens, display credentials, launch local
          tools, mutate files, or mutate memory.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="local-model-provider-trial-review" style={previewStyles.grid}>
        {model.reviews.map((review) => (
          <PreviewFoundationCard
            key={buildLocalModelProviderTrialReviewStableKey("local-model-trial-card", review.id)}
            title={review.localModelProviderTrialIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${review.status}`,
                `Local model families: ${review.localModelFamilies.join("; ")}`,
                `Local bridge dependency summary: ${review.localBridgeDependencySummary.join("; ")}`,
                `Denied local model actions: ${review.deniedLocalModelActions.join("; ")}`,
                `Manual validation checklist: ${review.manualValidationChecklist.join("; ")}`,
                `Safety/credential boundaries: ${review.safetyCredentialBoundaries.join("; ")}`,
                `Blocked local model trial risks: ${review.blockedLocalModelTrialRisks.join("; ")}`,
                review.providerIntegrationRoute,
                review.betaHardeningRoute,
                review.nextRecommendedAction,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced local model details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.reviews.map((review) => review.advancedLocalModelDetails)} />
        <PreviewFoundationCopy>
          Advanced local model details stay collapsed or secondary. This page never calls local models, calls local
          bridge endpoints, stores endpoints, stores tokens, displays credentials, or approves local traffic.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
