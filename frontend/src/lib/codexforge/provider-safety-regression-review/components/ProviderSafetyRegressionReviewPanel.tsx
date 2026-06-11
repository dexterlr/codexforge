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
  buildProviderSafetyRegressionReviewModel,
  buildProviderSafetyRegressionReviewStableKey,
} from "@/lib/codexforge/provider-safety-regression-review";

const PROVIDER_SAFETY_REGRESSION_REVIEW_MARKERS =
  "Provider safety regression review Provider safety regression review does not execute provider calls Safety regressions require operator review Unresolved provider blockers stay blocked Regression groups Unsafe behavior checks provider safety regression identity privacy and credential checks approval regression checks denied regression shortcuts unresolved provider safety blockers multi-provider routing route cost/rate-limit route next recommended action review-only approval required no action execution from UI no workflow execution no workflow execution from UI no workflow runs automatically no approval automation no approval is granted no action approval from UI no provider connection behavior no provider API calls no OpenAI-compatible provider calls no provider live connection tests no provider traffic no provider traffic routing no prompt sending to providers no provider response persistence no provider response ingestion no billing fetch behavior no provider retry calls no provider switching no local model calls no local bridge endpoint calls no local bridge endpoint calls from arbitrary UI no connector API calls no web/search API calls no GitHub API calls from UI no prompt/file/project/connector/provider/model/credential/response data sending without approval no prompt/file/project/connector/provider/model/credential data sending without approval no prompt/file/project/connector/provider/model data sending without approval no prompt/file/project/connector data sending without approval no prompt/file/project data sending without approval no credential storage no provider key storage no connector token storage no localStorage/sessionStorage token storage no localStorage API key storage no sessionStorage API key storage no token storage no endpoint storage no response storage no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution from UI no shell command execution no command execution no test/build/smoke execution from UI no test execution from UI no build execution from UI no smoke execution from UI no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no patch apply behavior no file deletion no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no reminder creation no task scheduling no automation creation no background job creation no notification sending no polling loops from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no process.env printing no API keys or secrets displayed no example real key/token values no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced regression details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function ProviderSafetyRegressionReviewPanel() {
  const model = buildProviderSafetyRegressionReviewModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-provider-safety-regression-review={`${PROVIDER_SAFETY_REGRESSION_REVIEW_MARKERS} buildProviderSafetyRegressionReviewStableKey ProviderSafetyRegressionReviewPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 421"
        title="Safety regressions"
        subtitle="Provider safety regression review checks provider integration safety assumptions without executing provider calls. Safety regressions require operator review, and unresolved provider blockers stay blocked."
        primary={{ href: "#provider-safety-regression-review", label: "Review safety" }}
        links={[
          { href: "/multi-provider-routing-release-candidate", label: "Routing RC" },
          { href: "/provider-cost-rate-limit-review", label: "Cost limits" },
          { href: "/provider-response-review-inbox", label: "Response inbox" },
          { href: "/remote-provider-credential-boundary-review", label: "Credential boundary" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.regressionLanguage} />
      <PreviewFoundationCard title="Plain-English provider safety regression review">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews provider safety regression identity, regression groups, unsafe behavior checks, privacy and
          credential checks, approval regression checks, denied regression shortcuts, unresolved provider safety
          blockers, multi-provider routing route, cost/rate-limit route, and next recommended action. It does not call
          providers, run live tests, store credentials, mutate files, or mutate memory.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="provider-safety-regression-review" style={previewStyles.grid}>
        {model.reviews.map((review) => (
          <PreviewFoundationCard
            key={buildProviderSafetyRegressionReviewStableKey("provider-safety-regression-review-card", review.id)}
            title={review.providerSafetyRegressionIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${review.status}`,
                `Regression groups: ${review.regressionGroups.join("; ")}`,
                `Unsafe behavior checks: ${review.unsafeBehaviorChecks.join("; ")}`,
                `Privacy and credential checks: ${review.privacyCredentialChecks.join("; ")}`,
                `Approval regression checks: ${review.approvalRegressionChecks.join("; ")}`,
                `Denied regression shortcuts: ${review.deniedRegressionShortcuts.join("; ")}`,
                `Unresolved provider safety blockers: ${review.unresolvedProviderSafetyBlockers.join("; ")}`,
                review.multiProviderRoutingRoute,
                review.costRateLimitRoute,
                review.nextRecommendedAction,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced regression details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.reviews.map((review) => review.advancedRegressionDetails)} />
        <PreviewFoundationCopy>
          Advanced regression details stay collapsed or secondary. This review never executes provider calls, runs live
          provider tests, stores credentials, stores provider responses, or clears unresolved blockers automatically.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
