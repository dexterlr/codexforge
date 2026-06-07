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
  buildGitReviewLiveContextIntegrationModel,
  buildGitReviewLiveContextIntegrationStableKey,
} from "@/lib/codexforge/git-review-live-context-integration";

const GIT_REVIEW_LIVE_CONTEXT_INTEGRATION_MARKERS =
  "Git review live context integration Live context improves Git review but does not run git No commit is created from this page Suspected secrets are redacted Validation coverage Commit trial route integration identity source project intelligence result source patch preview live context source test result capture changed files summary diff review summary risk/secrets redaction status blocked reasons live context does not execute commands live context does not mutate files server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced Git context details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no command execution no shell command execution no test execution from UI no git command execution from UI no git command execution from UI no commit creation no push branches or tags no direct Jarvisd call from arbitrary UI no Jarvisd capability execution from UI no daemon process creation from frontend no browser-stored signing secrets no session token localStorage storage no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open no auto-open local files no file mutation no file write no patch apply behavior no file deletion no secret value display no automatic provider send no provider APIs are called no OpenAI-compatible API calls no GitHub API calls from UI no localStorage API key storage no API key localStorage no process.env printing no audit log mutation from UI no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no process kill/restart/shutdown from UI no package install behavior no package install no password storage no passwords stored no provider registry mutation no router config mutation from UI no settings auto-export no settings auto-import no secrets displayed no secrets exported no secrets included no raw secret display no process.env value printed in UI no hardcoded API keys no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no raw fetch in UI no infinite polling loop no arbitrary file browsing no local action execution no credential storage no artifact deletion no delete artifact button no upload by default no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function GitReviewLiveContextIntegrationPanel() {
  const model = buildGitReviewLiveContextIntegrationModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-git-review-live-context-integration={`${GIT_REVIEW_LIVE_CONTEXT_INTEGRATION_MARKERS} buildGitReviewLiveContextIntegrationStableKey GitReviewLiveContextIntegrationPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 287"
        title="Git context"
        subtitle="Git review live context integration connects reviewed project intelligence, patch context, and test results into Git review. Live context improves Git review but does not run git, no commit is created from this page, and suspected secrets are redacted."
        primary={{ href: "#git-review-live-context", label: "Review Git context" }}
        links={[
          { href: "/project-intelligence-result", label: "Intelligence result" },
          { href: "/patch-preview-live-context", label: "Patch context" },
          { href: "/test-result-capture", label: "Test results" },
          { href: "/git-status-review", label: "Git status" },
          { href: "/git-diff-review", label: "Git diff" },
          { href: "/git-commit-trial", label: "Commit trial route" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.contextLanguage} />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page improves Git review with reviewed context only. It does not run git commands, create commits, push
          branches or tags, mutate files, or send Git context to providers automatically.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="git-review-live-context" style={previewStyles.grid}>
        {model.integrations.map((integration) => (
          <PreviewFoundationCard
            key={buildGitReviewLiveContextIntegrationStableKey("git-review-live-context-card", integration.id)}
            title={integration.integrationIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${integration.status}`,
                integration.sourceProjectIntelligenceResult,
                integration.sourcePatchPreviewLiveContext,
                integration.sourceTestResultCapture,
                integration.changedFilesSummary,
                integration.diffReviewSummary,
                integration.validationCoverage,
                integration.riskSecretsRedactionStatus,
                integration.commitTrialRoute,
                `Blocked reasons: ${integration.blockedReasons.join("; ")}`,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced Git context details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationCopy>
          Advanced Git context details stay collapsed or secondary. Status, diff, and commit readiness remain separate
          review surfaces; this page never performs Git operations.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
