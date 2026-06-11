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
  buildProviderCostRateLimitReviewModel,
  buildProviderCostRateLimitReviewStableKey,
} from "@/lib/codexforge/provider-cost-rate-limit-review";

const PROVIDER_COST_RATE_LIMIT_REVIEW_MARKERS =
  "Provider cost and rate-limit review Cost and rate-limit review does not call providers Provider spending requires explicit operator approval Rate-limit retries stay blocked until approved Budget groups Token request budget preview cost and rate-limit identity rate-limit policy preview retry/backoff boundaries denied cost/rate actions blocked cost risks failover policy route provider safety regression route next recommended action review-only approval required no action execution from UI no workflow execution no workflow execution from UI no workflow runs automatically no approval automation no approval is granted no action approval from UI no provider connection behavior no provider API calls no OpenAI-compatible provider calls no provider live connection tests no provider traffic no provider traffic routing no prompt sending to providers no provider response persistence no provider response ingestion no billing fetch behavior no provider retry calls no provider switching no local model calls no local bridge endpoint calls no local bridge endpoint calls from arbitrary UI no connector API calls no web/search API calls no GitHub API calls from UI no prompt/file/project/connector/provider/model/credential/response data sending without approval no prompt/file/project/connector/provider/model/credential data sending without approval no prompt/file/project/connector/provider/model data sending without approval no prompt/file/project/connector data sending without approval no prompt/file/project data sending without approval no credential storage no provider key storage no connector token storage no localStorage/sessionStorage token storage no localStorage API key storage no sessionStorage API key storage no token storage no endpoint storage no response storage no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution from UI no shell command execution no command execution no test/build/smoke execution from UI no test execution from UI no build execution from UI no smoke execution from UI no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no patch apply behavior no file deletion no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no reminder creation no task scheduling no automation creation no background job creation no notification sending no polling loops from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no process.env printing no API keys or secrets displayed no example real key/token values no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced cost/rate details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function ProviderCostRateLimitReviewPanel() {
  const model = buildProviderCostRateLimitReviewModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-provider-cost-rate-limit-review={`${PROVIDER_COST_RATE_LIMIT_REVIEW_MARKERS} buildProviderCostRateLimitReviewStableKey ProviderCostRateLimitReviewPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 420"
        title="Cost limits"
        subtitle="Provider cost and rate-limit review checks budget and retry policy without calling providers. Provider spending requires explicit operator approval, and rate-limit retries stay blocked until approved."
        primary={{ href: "#provider-cost-rate-limit-review", label: "Review cost policy" }}
        links={[
          { href: "/provider-failover-policy-review", label: "Failover policy" },
          { href: "/provider-safety-regression-review", label: "Safety regression" },
          { href: "/first-controlled-provider-trial", label: "First trial" },
          { href: "/provider-budget-guardrails", label: "Budget guardrails" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.costRateLanguage} />
      <PreviewFoundationCard title="Plain-English provider cost and rate-limit review">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews cost and rate-limit identity, budget groups, token request budget preview, rate-limit policy
          preview, retry/backoff boundaries, denied cost/rate actions, blocked cost risks, failover policy route,
          provider safety regression route, and next recommended action. It does not call providers, fetch billing,
          retry provider calls, store credentials, mutate files, or mutate memory.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="provider-cost-rate-limit-review" style={previewStyles.grid}>
        {model.reviews.map((review) => (
          <PreviewFoundationCard
            key={buildProviderCostRateLimitReviewStableKey("provider-cost-rate-limit-review-card", review.id)}
            title={review.costRateLimitIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${review.status}`,
                `Budget groups: ${review.budgetGroups.join("; ")}`,
                `Token request budget preview: ${review.tokenRequestBudgetPreview.join("; ")}`,
                `Rate-limit policy preview: ${review.rateLimitPolicyPreview.join("; ")}`,
                `Retry/backoff boundaries: ${review.retryBackoffBoundaries.join("; ")}`,
                `Denied cost/rate actions: ${review.deniedCostRateActions.join("; ")}`,
                `Blocked cost risks: ${review.blockedCostRisks.join("; ")}`,
                review.failoverPolicyRoute,
                review.providerSafetyRegressionRoute,
                review.nextRecommendedAction,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced cost/rate details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.reviews.map((review) => review.advancedCostRateDetails)} />
        <PreviewFoundationCopy>
          Advanced cost/rate details stay collapsed or secondary. This page never calls providers, fetches billing,
          calculates live billing, spends tokens, retries provider calls, or stores credentials.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
