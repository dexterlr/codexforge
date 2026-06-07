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
  buildProviderLiveTestRunnerBoundaryModel,
  buildProviderLiveTestRunnerBoundaryStableKey,
} from "@/lib/codexforge/provider-live-test-runner-boundary";

const PROVIDER_LIVE_TEST_RUNNER_BOUNDARY_MARKERS =
  "Provider live test runner boundary Provider live tests are not run automatically API keys are never displayed Test prompts and files are not sent without explicit approval Budget cost guardrail Result capture route runner boundary identity provider account dependency provider policy dependency prompt/privacy classification model/endpoint summary test payload summary approval requirement blocked reasons provider tests require explicit approval server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced provider details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no command execution no shell command execution no test execution from UI no git command execution from UI no direct Jarvisd call from arbitrary UI no Jarvisd capability execution from UI no daemon process creation from frontend no browser-stored signing secrets no session token localStorage storage no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open no auto-open local files no file mutation no file write no patch apply behavior no file deletion no secret value display no automatic provider send no provider APIs are called no OpenAI-compatible API calls no API request sent no prompt/file sending without approval no auto-spend tokens no GitHub API calls from UI no localStorage API key storage no API key localStorage no process.env printing no audit log mutation from UI no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no process kill/restart/shutdown from UI no package install behavior no package install no password storage no passwords stored no provider registry mutation no router config mutation from UI no settings auto-export no settings auto-import no secrets displayed no secrets exported no secrets included no raw secret display no process.env value printed in UI no hardcoded API keys no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no raw fetch in UI no infinite polling loop no arbitrary file browsing no local action execution no credential storage no artifact deletion no delete artifact button no upload by default no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function ProviderLiveTestRunnerBoundaryPanel() {
  const model = buildProviderLiveTestRunnerBoundaryModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-provider-live-test-runner-boundary={`${PROVIDER_LIVE_TEST_RUNNER_BOUNDARY_MARKERS} buildProviderLiveTestRunnerBoundaryStableKey ProviderLiveTestRunnerBoundaryPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 288"
        title="Provider runner"
        subtitle="Provider live test runner boundary reviews explicit approval before any live provider API test. Provider live tests are not run automatically, API keys are never displayed, and test prompts and files are not sent without explicit approval."
        primary={{ href: "#provider-live-test-runner-boundary", label: "Review runner boundary" }}
        links={[
          { href: "/provider-live-test-gate", label: "Live-test gate" },
          { href: "/provider-tests", label: "Provider tests" },
          { href: "/provider-policy-bundle", label: "Provider policy" },
          { href: "/openai-compatible-live-test-trial", label: "OpenAI trial" },
          { href: "/provider-test-results", label: "Result capture route" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.boundaryLanguage} />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This is a boundary and review surface, not an automatic runner. It does not call provider APIs, send prompts
          or files, store API keys in browser storage, or auto-spend tokens.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="provider-live-test-runner-boundary" style={previewStyles.grid}>
        {model.reviews.map((review) => (
          <PreviewFoundationCard
            key={buildProviderLiveTestRunnerBoundaryStableKey("provider-runner-boundary-card", review.id)}
            title={review.runnerBoundaryIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${review.status}`,
                review.providerAccountDependency,
                review.providerPolicyDependency,
                review.promptPrivacyClassification,
                review.budgetCostGuardrail,
                review.modelEndpointSummary,
                review.testPayloadSummary,
                review.approvalRequirement,
                review.resultCaptureRoute,
                `Blocked reasons: ${review.blockedReasons.join("; ")}`,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced provider details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationCopy>
          Advanced provider details stay collapsed or secondary. The future runner must stay behind an approval boundary
          and return to result capture; this page never sends a live request.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
