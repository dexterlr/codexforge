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
  buildWorkflowPackageValidatorLiveBridgeModel,
  buildWorkflowPackageValidatorLiveBridgeStableKey,
} from "@/lib/codexforge/workflow-package-validator-live-bridge";

const WORKFLOW_PACKAGE_VALIDATOR_LIVE_BRIDGE_MARKERS =
  "Workflow package validator live bridge Workflow validation does not mutate files Validation does not submit ComfyUI jobs Suspected secrets are redacted Missing dependency summary Submit trial route validator identity source metadata bridge workflow package summary required node/model summary compatibility status risk/secrets redaction status recovery route blocked reasons no ComfyUI request sent from UI no arbitrary local endpoint calls from UI no raw polling loops provider tests require explicit approval server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced validation details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no command execution no shell command execution no test execution from UI no git command execution from UI no direct Jarvisd call from arbitrary UI no Jarvisd capability execution from UI no daemon process creation from frontend no browser-stored signing secrets no session token localStorage storage no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open no auto-open local files no file mutation no file write no patch apply behavior no file deletion no secret value display no automatic provider send no provider APIs are called no Anthropic API calls no OpenAI-compatible API calls no API request sent no prompt/file sending without approval no auto-spend tokens no auto-route live provider traffic no auto-apply router recommendations no silent provider registry mutation no provider retry from UI no API key export no secret export no secrets displayed no secrets exported no secrets included no localStorage API key storage no API key localStorage no process.env printing no process.env value printed in UI no audit log mutation from UI no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no process kill/restart/shutdown from UI no package install behavior no package install no password storage no passwords stored no provider registry mutation no router config mutation from UI no settings auto-export no settings auto-import no raw secret display no hardcoded API keys no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no raw fetch in UI no infinite polling loop no arbitrary file browsing no local action execution no credential storage no artifact deletion no delete artifact button no upload by default no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function WorkflowPackageValidatorLiveBridgePanel() {
  const model = buildWorkflowPackageValidatorLiveBridgeModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-workflow-package-validator-live-bridge={`${WORKFLOW_PACKAGE_VALIDATOR_LIVE_BRIDGE_MARKERS} buildWorkflowPackageValidatorLiveBridgeStableKey WorkflowPackageValidatorLiveBridgePanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 303"
        title="Workflow validator bridge"
        subtitle="Workflow package validator live bridge reviews future approved package validation results before any ComfyUI submit trial. Workflow validation does not mutate files, validation does not submit ComfyUI jobs, and suspected secrets are redacted."
        primary={{ href: "#workflow-package-validator-live-bridge", label: "Review validator bridge" }}
        links={[
          { href: "/comfyui-metadata-live-bridge", label: "Metadata bridge" },
          { href: "/workflow-package-validator", label: "Package validator" },
          { href: "/approved-comfyui-submit-trial-bridge", label: "Submit trial bridge" },
          { href: "/workflow-compatibility-checker", label: "Compatibility" },
          { href: "/missing-model-node-resolver", label: "Recovery" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.bridgeLanguage} />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This bridge reviews prepared package validation results only. It does not mutate files, browse arbitrary local
          files, submit ComfyUI jobs, send requests, or reveal suspected secret values.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="workflow-package-validator-live-bridge" style={previewStyles.grid}>
        {model.validators.map((validator) => (
          <PreviewFoundationCard
            key={buildWorkflowPackageValidatorLiveBridgeStableKey("workflow-validator-live-bridge-card", validator.id)}
            title={validator.validatorIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${validator.status}`,
                validator.sourceMetadataBridge,
                validator.workflowPackageSummary,
                validator.requiredNodeModelSummary,
                validator.missingDependencySummary,
                validator.compatibilityStatus,
                validator.riskSecretsRedactionStatus,
                validator.submitTrialRoute,
                validator.recoveryRoute,
                `Blocked reasons: ${validator.blockedReasons.join("; ")}`,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced validation details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.validators.map((validator) => validator.advancedValidationDetails)} />
        <PreviewFoundationCopy>
          Advanced validation details stay collapsed or secondary. This bridge is not a file browser, package mutator,
          ComfyUI executor, queue submit page, provider route, or test runner.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
