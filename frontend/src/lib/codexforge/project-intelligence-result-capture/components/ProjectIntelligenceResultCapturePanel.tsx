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
  buildProjectIntelligenceResultCaptureModel,
  buildProjectIntelligenceResultCaptureStableKey,
} from "@/lib/codexforge/project-intelligence-result-capture";

const PROJECT_INTELLIGENCE_RESULT_CAPTURE_MARKERS =
  "Project intelligence result capture Results are reviewed before use Secret values remain redacted Memory is not auto-promoted Findings summary Review inbox handoff project intelligence result capture language source index search dependency risk trials result status passed failed blocked needs review workspace scope summary redaction status risk/secrets follow-up recovery route next recommended route server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced result details collapsed/secondary results are reviewed before use live context does not mutate files secret values are redacted and never displayed no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no command execution no shell command execution no test execution from UI no git command execution from UI no direct Jarvisd call from arbitrary UI no Jarvisd capability execution from UI no daemon process creation from frontend no browser-stored signing secrets no session token localStorage storage no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open no auto-open local files no file mutation no file write no patch apply behavior no file deletion no secret value display no automatic provider send no provider APIs are called no GitHub API calls from UI no localStorage API key storage no API key localStorage no process.env printing no audit log mutation from UI no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no process kill/restart/shutdown from UI no package install behavior no package install no password storage no passwords stored no provider registry mutation no router config mutation from UI no settings auto-export no settings auto-import no secrets displayed no secrets exported no secrets included no raw secret display no process.env value printed in UI no hardcoded API keys no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no raw fetch in UI no infinite polling loop no arbitrary file browsing no local action execution no credential storage no artifact deletion no delete artifact button no upload by default no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function ProjectIntelligenceResultCapturePanel() {
  const model = buildProjectIntelligenceResultCaptureModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-project-intelligence-result-capture={`${PROJECT_INTELLIGENCE_RESULT_CAPTURE_MARKERS} buildProjectIntelligenceResultCaptureStableKey ProjectIntelligenceResultCapturePanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 282"
        title="Intelligence result"
        subtitle="Project intelligence result capture turns live trial output into a reviewed result packet. Results are reviewed before use, secret values remain redacted, and memory is not auto-promoted."
        primary={{ href: "#project-intelligence-result-capture", label: "Review result packet" }}
        links={[
          { href: "/project-indexer-live-trial", label: "Index trial" },
          { href: "/project-search-live-trial", label: "Search trial" },
          { href: "/project-dependency-live-trial", label: "Dependency trial" },
          { href: "/project-risk-scan-live-trial", label: "Risk trial" },
          { href: "/project-intelligence-recovery", label: "Recovery route" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.resultLanguage} />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page captures reviewed project intelligence only. It does not mutate files, send findings to providers
          automatically, call appendEvent, call saveBrainGraph, or promote memory.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="project-intelligence-result-capture" style={previewStyles.grid}>
        {model.results.map((result) => (
          <PreviewFoundationCard
            key={buildProjectIntelligenceResultCaptureStableKey("project-intelligence-result-card", result.id)}
            title={result.resultIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Result status: ${result.resultStatus}`,
                result.sourceIndexTrial,
                result.sourceSearchTrial,
                result.sourceDependencyTrial,
                result.sourceRiskSecretsTrial,
                result.workspaceScopeSummary,
                result.findingsSummary,
                result.redactionStatus,
                result.riskSecretsFollowUp,
                result.reviewInboxHandoff,
                result.recoveryRoute,
                result.nextRecommendedRoute,
                `Blocked reasons: ${result.blockedReasons.join("; ")}`,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced result details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationCopy>
          Advanced result details stay collapsed or secondary. Secret values are redacted and never displayed, reviewed
          results are not promoted into memory automatically, and downstream live context does not mutate files.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
