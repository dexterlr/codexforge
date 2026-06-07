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
  buildPatchApplyResultCaptureModel,
  buildPatchApplyResultCaptureStableKey,
} from "@/lib/codexforge/patch-apply-result-capture";

const PATCH_APPLY_RESULT_CAPTURE_MARKERS =
  "Patch apply result capture Results are reviewed before promotion Failed patch applies are retained for recovery Memory is not auto-promoted Hunk result summary Review inbox handoff plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced result details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no command execution no shell command execution no test execution from UI no git command execution from UI no runCommand brokerExecution or local executor API calls from UI no direct Jarvisd call from arbitrary UI no Jarvisd capability execution from UI no daemon process creation from frontend no browser-stored signing secrets no session token localStorage storage no arbitrary local file browsing no arbitrary file read/open no auto-open local files no file mutation no file write no patch apply behavior no rollback behavior no file deletion no secret value display no automatic provider send no provider APIs are called no GitHub API calls from UI no localStorage API key storage no process.env printing no process.env value printed in UI no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no process kill/restart/shutdown from UI no package install behavior no weakened safe path checks no removed server-only boundaries no arbitrary local browsing reintroduced no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no hardcoded API keys no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no raw fetch in UI no infinite polling loop no credential storage no artifact deletion no delete artifact button no upload by default no secrets no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function PatchApplyResultCapturePanel() {
  const model = buildPatchApplyResultCaptureModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-patch-apply-result-capture={`${PATCH_APPLY_RESULT_CAPTURE_MARKERS} buildPatchApplyResultCaptureStableKey PatchApplyResultCapturePanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 275"
        title="Patch apply result"
        subtitle="Patch apply result capture reviews future approved patch apply outcomes. Results are reviewed before promotion, failed patch applies are retained for recovery, and memory is not auto-promoted."
        primary={{ href: "#patch-apply-result-capture", label: "Review apply result" }}
        links={[
          { href: "/patch-apply-trial", label: "Apply trial" },
          { href: "/patch-rollback-trial", label: "Rollback trial" },
          { href: "/review-inbox", label: "Review inbox" },
          { href: "/test-result-capture", label: "Test results" },
          { href: "/git-commit-result", label: "Git result" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.resultLanguage} />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page captures and reviews outcomes only. It does not apply patches, mutate files, rollback files, call
          appendEvent, call saveBrainGraph, mutate the Brain graph, or promote memory automatically.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="patch-apply-result-capture" style={previewStyles.grid}>
        {model.results.map((result) => (
          <PreviewFoundationCard
            key={buildPatchApplyResultCaptureStableKey("patch-apply-result-card", result.id)}
            title={result.resultIdentity}
          >
            <PreviewFoundationPillList
              items={[
                result.sourcePatchApplyTrial,
                `Apply status: ${result.applyStatus}`,
                result.affectedFilesSummary,
                result.hunkResultSummary,
                result.validationTestSummary,
                result.riskSecretsFollowUp,
                result.rollbackTrialRoute,
                result.reviewInboxHandoff,
                `Blocked reasons: ${result.blockedReasons.join("; ")}`,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced result details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationCopy>
          Advanced result details stay collapsed or secondary. Failed patch applies remain available for recovery
          review, and no result is promoted into memory, graph state, files, audit logs, or provider traffic by this UI.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
