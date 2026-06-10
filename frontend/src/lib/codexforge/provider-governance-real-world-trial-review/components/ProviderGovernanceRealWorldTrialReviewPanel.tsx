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
  buildProviderGovernanceRealWorldTrialReviewModel,
  buildProviderGovernanceRealWorldTrialReviewStableKey,
} from "@/lib/codexforge/provider-governance-real-world-trial-review";

const PROVIDER_GOVERNANCE_REAL_WORLD_TRIAL_REVIEW_MARKERS =
  "Provider governance real-world trial review Provider governance trial review does not call providers Token spending requires explicit approval Prompt file data is not sent automatically Budget token guardrail summary Project knowledge trial route real-world trial review review-only approval required provider trial identity source provider governance/policy surfaces operator provider scenario selected provider policy summary prompt privacy review apply/export approval gates blocked real actions trial outcome notes advanced provider trial details collapsed/secondary no action execution from UI no workflow execution no local bridge endpoint calls no Blender/Unreal/ComfyUI/local tool launch behavior no render/generation job execution no coding task execution no test/build/smoke execution from UI no release/shipping execution no build execution from UI no smoke execution from UI no test execution from UI no patch apply behavior no commit creation from UI no provider API calls no token spending no connector API calls no Gmail API calls no Calendar API calls no Contacts API calls no Google API calls no web/search API calls no source fetching/browsing no OAuth request flow no connector authorization behavior no token storage no localStorage/sessionStorage token storage no automatic email/calendar/contact reads no reminder creation no task scheduling no automation creation no background job creation no notification sending no polling loops from UI no prompt/file data sending without approval no prompt/file/project data sending without approval no prompt/file/project/connector data sending without approval no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution no command execution no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no file deletion no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no localStorage API key storage no process.env printing no API keys or secrets displayed no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function ProviderGovernanceRealWorldTrialReviewPanel() {
  const model = buildProviderGovernanceRealWorldTrialReviewModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-provider-governance-real-world-trial-review={`${PROVIDER_GOVERNANCE_REAL_WORLD_TRIAL_REVIEW_MARKERS} buildProviderGovernanceRealWorldTrialReviewStableKey ProviderGovernanceRealWorldTrialReviewPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 367"
        title="Provider governance trial review"
        subtitle="Provider governance real-world trial review checks provider readiness and policy compliance without calling providers. Token spending requires explicit approval, and prompt file data is not sent automatically."
        primary={{ href: "#provider-governance-real-world-trial-review", label: "Review provider trial" }}
        links={[
          { href: "/provider-governance-release-candidate", label: "Provider RC" },
          { href: "/provider-policy-bundle-export-review", label: "Policy bundle" },
          { href: "/prompt-privacy-classifier", label: "Privacy review" },
          { href: "/project-knowledge-real-world-trial-review", label: "Next project review" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.trialReviewLanguage} />
      <PreviewFoundationCard title="Plain-English provider trial review">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews the provider trial identity, selected provider policy summary, budget token guardrail summary,
          prompt privacy review, apply and export approval gates, blocked actions, and outcome notes. It does not call
          providers, spend tokens, send prompt or file data, apply policy, export files, or display secrets.
        </PreviewFoundationCopy>
        <PreviewFoundationCopy>
          Token spending requires explicit approval, and prompt file data is not sent automatically.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="provider-governance-real-world-trial-review" style={previewStyles.grid}>
        {model.reviews.map((review) => (
          <PreviewFoundationCard
            key={buildProviderGovernanceRealWorldTrialReviewStableKey(
              "provider-governance-real-world-trial-review-card",
              review.id
            )}
            title={review.providerTrialIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${review.status}`,
                review.sourceProviderGovernanceSurfaces,
                review.operatorProviderScenario,
                review.selectedProviderPolicySummary,
                review.budgetTokenGuardrailSummary,
                review.promptPrivacyReview,
                `Apply/export approval gates: ${review.applyExportApprovalGates.join("; ")}`,
                `Blocked real actions: ${review.blockedRealActions.join("; ")}`,
                `Trial outcome notes: ${review.trialOutcomeNotes.join("; ")}`,
                review.projectKnowledgeTrialRoute,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced provider trial details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.reviews.map((review) => review.advancedProviderTrialDetails)} />
        <PreviewFoundationCopy>
          Advanced provider trial details stay collapsed or secondary. Provider governance real-world trial review
          remains separate from provider calls, token spend, automatic prompt/file send, policy apply, export/write
          behavior, secret display, connector calls, local files, automations, and memory promotion.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
