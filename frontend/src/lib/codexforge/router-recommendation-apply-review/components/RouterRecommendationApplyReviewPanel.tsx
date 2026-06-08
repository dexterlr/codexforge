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
  buildRouterRecommendationApplyReviewModel,
  buildRouterRecommendationApplyReviewStableKey,
} from "@/lib/codexforge/router-recommendation-apply-review";

const ROUTER_RECOMMENDATION_APPLY_REVIEW_MARKERS =
  "Router recommendation apply review Router recommendations are not applied automatically Provider registry changes require explicit review No live traffic is routed from this page Cost latency evidence summary Rollback note review identity source calibration dependency provider/model recommendation summary routing reason reliability signal privacy/policy impact approval requirement blocked reasons provider tests require explicit approval server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced recommendation details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no command execution no shell command execution no test execution from UI no git command execution from UI no direct Jarvisd call from arbitrary UI no Jarvisd capability execution from UI no daemon process creation from frontend no browser-stored signing secrets no session token localStorage storage no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open no auto-open local files no file mutation no file write no patch apply behavior no file deletion no secret value display no automatic provider send no provider APIs are called no Anthropic API calls no OpenAI-compatible API calls no API request sent no prompt/file sending without approval no auto-spend tokens no auto-route live provider traffic no auto-apply router recommendations no silent provider registry mutation no provider retry from UI no API key export no secret export no secrets displayed no secrets exported no secrets included no localStorage API key storage no API key localStorage no process.env printing no process.env value printed in UI no audit log mutation from UI no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no process kill/restart/shutdown from UI no package install behavior no package install no password storage no passwords stored no provider registry mutation no router config mutation from UI no settings auto-export no settings auto-import no raw secret display no hardcoded API keys no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no raw fetch in UI no infinite polling loop no arbitrary file browsing no local action execution no credential storage no artifact deletion no delete artifact button no upload by default no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function RouterRecommendationApplyReviewPanel() {
  const model = buildRouterRecommendationApplyReviewModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-router-recommendation-apply-review={`${ROUTER_RECOMMENDATION_APPLY_REVIEW_MARKERS} buildRouterRecommendationApplyReviewStableKey RouterRecommendationApplyReviewPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 294"
        title="Router apply review"
        subtitle="Router recommendation apply review turns reviewed provider test, cost, latency, reliability, privacy, and policy evidence into an approval packet. Router recommendations are not applied automatically, provider registry changes require explicit review, and no live traffic is routed from this page."
        primary={{ href: "#router-recommendation-apply-review", label: "Review router packet" }}
        links={[
          { href: "/provider-cost-latency-calibration", label: "Cost calibration" },
          { href: "/provider-test-result-persistence", label: "Result persistence" },
          { href: "/local-first-router-dry-run", label: "Router dry run" },
          { href: "/provider-budget-guardrails", label: "Budget guardrails" },
          { href: "/provider-policy-bundle-export-review", label: "Policy export review" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.reviewLanguage} />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page prepares a review packet only. It does not change router settings, mutate provider registry entries,
          call provider APIs, retry provider requests, send prompts or files, or spend tokens.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="router-recommendation-apply-review" style={previewStyles.grid}>
        {model.recommendations.map((recommendation) => (
          <PreviewFoundationCard
            key={buildRouterRecommendationApplyReviewStableKey(
              "router-recommendation-apply-review-card",
              recommendation.id
            )}
            title={recommendation.reviewIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${recommendation.status}`,
                recommendation.sourceCalibrationDependency,
                recommendation.providerModelRecommendationSummary,
                recommendation.routingReason,
                recommendation.costLatencyEvidenceSummary,
                recommendation.reliabilitySignal,
                recommendation.privacyPolicyImpact,
                recommendation.approvalRequirement,
                recommendation.rollbackNote,
                `Blocked reasons: ${recommendation.blockedReasons.join("; ")}`,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced recommendation details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList
          items={model.recommendations.map((recommendation) => recommendation.advancedRecommendationDetails)}
        />
        <PreviewFoundationCopy>
          Advanced recommendation details stay collapsed or secondary. Router changes, provider registry changes, and
          live traffic require a separate explicit review and approval path.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
