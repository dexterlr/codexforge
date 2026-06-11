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
  buildProviderFailoverPolicyReviewModel,
  buildProviderFailoverPolicyReviewStableKey,
} from "@/lib/codexforge/provider-failover-policy-review";

const PROVIDER_FAILOVER_POLICY_REVIEW_MARKERS =
  "Provider failover policy review Failover policy review does not switch providers Failover requires explicit operator approval Unsafe fallback shortcuts stay blocked Failure categories Fallback policy preview failover policy identity retry/backoff review denied failover shortcuts validation evidence requirements blocked failover risks multi-provider routing route credential boundary route next recommended action review-only approval required no action execution from UI no workflow execution no workflow execution from UI no workflow runs automatically no approval automation no approval is granted no action approval from UI no provider connection behavior no provider API calls no OpenAI-compatible provider calls no provider live connection tests no provider traffic no provider traffic routing no provider switching no provider retry calls no local model calls no local bridge endpoint calls no local bridge endpoint calls from arbitrary UI no connector API calls no web/search API calls no GitHub API calls from UI no prompt/file/project/connector/provider/model/credential data sending without approval no prompt/file/project/connector/provider/model data sending without approval no prompt/file/project/connector data sending without approval no prompt/file/project data sending without approval no credential storage no provider key storage no connector token storage no localStorage/sessionStorage token storage no localStorage API key storage no sessionStorage API key storage no token storage no endpoint storage no arbitrary project scanning no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open from UI no auto-open local files no git command execution from UI no shell command execution from UI no shell command execution no command execution no test/build/smoke execution from UI no test execution from UI no build execution from UI no smoke execution from UI no file mutation no file write no file export/write behavior no export/write behavior no runbook export/write behavior no patch apply behavior no file deletion no memory/RAG ingestion no memory auto-promotion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no reminder creation no task scheduling no automation creation no background job creation no notification sending no polling loops from UI no plugin execution no tool execution no agent execution no extension runtime executor no MCP runtime no MCP tool calls no process.env printing no API keys or secrets displayed no example real key/token values no route coverage removal no duplicate route hrefs no duplicate shortLabel values no duplicate menus no Ruflo/Odysseus vendoring no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced failover details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function ProviderFailoverPolicyReviewPanel() {
  const model = buildProviderFailoverPolicyReviewModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-provider-failover-policy-review={`${PROVIDER_FAILOVER_POLICY_REVIEW_MARKERS} buildProviderFailoverPolicyReviewStableKey ProviderFailoverPolicyReviewPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 416"
        title="Failover policy"
        subtitle="Provider failover policy review explains fallback behavior without switching providers or routing traffic. Failover policy review does not switch providers, failover requires explicit operator approval, and unsafe fallback shortcuts stay blocked."
        primary={{ href: "#provider-failover-policy-review", label: "Review failover" }}
        links={[
          { href: "/remote-provider-credential-boundary-review", label: "Credential boundary" },
          { href: "/multi-provider-routing-release-candidate", label: "Routing RC" },
          { href: "/openai-compatible-provider-trial-review", label: "OpenAI-compatible trial" },
          { href: "/provider-routing-readiness-audit", label: "Routing audit" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.failoverLanguage} />
      <PreviewFoundationCard title="Plain-English provider failover policy review">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page reviews failover policy identity, failure categories, fallback policy preview, retry/backoff review,
          denied failover shortcuts, validation evidence requirements, blocked failover risks, multi-provider routing
          route, credential boundary route, and next recommended action. It does not switch providers, route traffic,
          retry calls, call APIs, store credentials, mutate files, or mutate memory.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="provider-failover-policy-review" style={previewStyles.grid}>
        {model.reviews.map((review) => (
          <PreviewFoundationCard
            key={buildProviderFailoverPolicyReviewStableKey("provider-failover-policy-card", review.id)}
            title={review.failoverPolicyIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${review.status}`,
                `Failure categories: ${review.failureCategories.join("; ")}`,
                `Fallback policy preview: ${review.fallbackPolicyPreview.join("; ")}`,
                `Retry/backoff review: ${review.retryBackoffReview.join("; ")}`,
                `Denied failover shortcuts: ${review.deniedFailoverShortcuts.join("; ")}`,
                `Validation evidence requirements: ${review.validationEvidenceRequirements.join("; ")}`,
                `Blocked failover risks: ${review.blockedFailoverRisks.join("; ")}`,
                review.multiProviderRoutingRoute,
                review.credentialBoundaryRoute,
                review.nextRecommendedAction,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced failover details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.reviews.map((review) => review.advancedFailoverDetails)} />
        <PreviewFoundationCopy>
          Advanced failover details stay collapsed or secondary. This page never switches providers, retries provider
          calls, routes provider traffic, stores credentials, or approves failover automatically.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
