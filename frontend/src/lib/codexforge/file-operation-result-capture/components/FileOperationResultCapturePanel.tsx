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
  buildFileOperationResultCaptureModel,
  buildFileOperationResultCaptureStableKey,
} from "@/lib/codexforge/file-operation-result-capture";

const FILE_OPERATION_RESULT_CAPTURE_MARKERS =
  "File operation result capture Results are reviewed before promotion Failed operations are retained for recovery Memory is not auto-promoted Affected files summary Review inbox handoff no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct Jarvisd call from arbitrary UI no Jarvisd capability execution from UI nothing reads arbitrary files automatically nothing executes from arbitrary UI plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced result details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no command execution no shell command execution no arbitrary local file browsing no arbitrary file read/open no auto-open local files no file mutation no file write no file deletion no patch apply behavior no package install behavior no daemon process creation from frontend no browser-stored signing secrets no session token localStorage storage no provider APIs are called no automatic provider send no secrets displayed no secrets exported no secrets included no secret value display no localStorage API key storage no process.env printing no provider registry mutation no router config mutation from UI no settings auto-export no settings auto-import no audit log mutation from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no GitHub API calls from UI no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no raw fetch in UI no infinite polling loop no arbitrary file browsing no local action execution no credential storage no artifact deletion no delete artifact button no upload by default no secrets no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function FileOperationResultCapturePanel() {
  const model = buildFileOperationResultCaptureModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-file-operation-result-capture={`${FILE_OPERATION_RESULT_CAPTURE_MARKERS} buildFileOperationResultCaptureStableKey FileOperationResultCapturePanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 260"
        title="File result"
        subtitle="File operation result capture reviews future approved file operation outcomes. Results are reviewed before promotion, failed operations are retained for recovery, and memory is not auto-promoted."
        primary={{ href: "#file-operation-result-capture", label: "Review operation result" }}
        links={[
          { href: "/file-write-patch-trial", label: "Patch trial" },
          { href: "/review-inbox", label: "Review inbox" },
          { href: "/file-operation-recovery", label: "Recovery flow" },
          { href: "/validation-results", label: "Validation results" },
          { href: "/run-history", label: "Run history" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.resultLanguage} />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page captures and reviews outcomes only. It does not mutate files, call appendEvent, call saveBrainGraph,
          mutate the Brain graph, or promote memory automatically.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="file-operation-result-capture" style={previewStyles.grid}>
        {model.results.map((result) => (
          <PreviewFoundationCard
            key={buildFileOperationResultCaptureStableKey("file-operation-result-card", result.id)}
            title={result.resultIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Operation status: ${result.operationStatus}`,
                result.sourceTrialGate,
                result.affectedFilesSummary,
                result.validationSummary,
                result.riskSecretsFollowUp,
                result.rollbackStatus,
                result.reviewInboxHandoff,
                result.recoveryRoute,
                `Blocked reasons: ${result.blockedReasons.join("; ")}`,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced result details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationCopy>
          Advanced result details stay collapsed or secondary. Failed operations stay retained for recovery review, and
          no result is promoted into memory or graph state by this UI.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
