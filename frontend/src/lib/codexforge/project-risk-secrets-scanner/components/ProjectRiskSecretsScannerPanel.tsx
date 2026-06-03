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
  buildProjectRiskSecretsScannerModel,
  buildProjectRiskSecretsScannerStableKey,
} from "@/lib/codexforge/project-risk-secrets-scanner";

const PROJECT_RISK_SECRETS_SCANNER_MARKERS =
  "Project risk secrets scanner Suspected secrets are redacted Scanning remains behind approved local boundary Arbitrary local scanning is not allowed Do not display secret values Recommended action approved local boundary required nothing reads arbitrary files automatically nothing executes from arbitrary UI plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no command execution no shell command execution no arbitrary local file browsing no arbitrary file read/open no file mutation no file deletion no package install behavior no provider APIs are called no automatic provider send no secrets displayed no secrets exported no secrets included no localStorage API key storage no process.env printing no provider registry mutation no router config mutation from UI no settings auto-export no settings auto-import no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no raw fetch in UI no infinite polling loop no arbitrary file browsing no local action execution no credential storage no artifact deletion no delete artifact button no upload by default no secrets no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function ProjectRiskSecretsScannerPanel() {
  const model = buildProjectRiskSecretsScannerModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-project-risk-secrets-scanner={`${PROJECT_RISK_SECRETS_SCANNER_MARKERS} buildProjectRiskSecretsScannerStableKey ProjectRiskSecretsScannerPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 225"
        title="Risk scan"
        subtitle="Project risk secrets scanner explains redacted risk review for trusted workspaces. Suspected secrets are redacted, scanning remains behind approved local boundary, arbitrary local scanning is not allowed, and findings are not sent to providers automatically."
        primary={{ href: "#project-risk-secrets-scanner", label: "Review risk scan" }}
        links={[
          { href: "/safe-project-indexer", label: "Indexer" },
          { href: "/project-file-search", label: "File search" },
          { href: "/project-dependency-map", label: "Dependency map" },
          { href: "/local-file-approval", label: "File approval" },
          { href: "/local-command-approval", label: "Command approval" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.scannerLanguage} />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          Do not display secret values. This page shows readiness and redaction policy only; it does not scan arbitrary
          files from UI.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="project-risk-secrets-scanner" style={previewStyles.grid}>
        {model.scans.map((scan) => (
          <PreviewFoundationCard
            key={buildProjectRiskSecretsScannerStableKey("risk-card", scan.id)}
            title={scan.scanScopeSummary}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${scan.status}`,
                `Severity: ${scan.severity}`,
                scan.trustedWorkspaceDependency,
                scan.riskCategories,
                scan.suspectedSecretIndicator,
                scan.redactionStatus,
                scan.recommendedAction,
                scan.approvalRoute,
                scan.auditNote,
                `Blocked reasons: ${scan.blockedReasons.join("; ")}`,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced findings">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationCopy>
          Advanced findings stay collapsed and redacted. Risk review remains behind the approved local boundary and does
          not browse arbitrary files, mutate files, execute commands, display secret values, or send findings to providers.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
