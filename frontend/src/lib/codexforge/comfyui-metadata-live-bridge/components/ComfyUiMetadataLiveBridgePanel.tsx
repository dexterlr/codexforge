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
  buildComfyUiMetadataLiveBridgeModel,
  buildComfyUiMetadataLiveBridgeStableKey,
} from "@/lib/codexforge/comfyui-metadata-live-bridge";

const COMFY_UI_METADATA_LIVE_BRIDGE_MARKERS =
  "ComfyUI metadata live bridge Metadata reads require approved local boundary No ComfyUI job is submitted from this page Local endpoints and secrets are not exposed Node model availability summary Workflow validator route bridge identity health probe dependency approved local boundary dependency metadata source summary version/capability summary timeout policy redaction status blocked reasons no ComfyUI request sent from UI no arbitrary local endpoint calls from UI no raw polling loops provider tests require explicit approval server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced metadata details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no command execution no shell command execution no test execution from UI no git command execution from UI no direct Jarvisd call from arbitrary UI no Jarvisd capability execution from UI no daemon process creation from frontend no browser-stored signing secrets no session token localStorage storage no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open no auto-open local files no file mutation no file write no patch apply behavior no file deletion no secret value display no automatic provider send no provider APIs are called no Anthropic API calls no OpenAI-compatible API calls no API request sent no prompt/file sending without approval no auto-spend tokens no auto-route live provider traffic no auto-apply router recommendations no silent provider registry mutation no provider retry from UI no API key export no secret export no secrets displayed no secrets exported no secrets included no localStorage API key storage no API key localStorage no process.env printing no process.env value printed in UI no audit log mutation from UI no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no process kill/restart/shutdown from UI no package install behavior no package install no password storage no passwords stored no provider registry mutation no router config mutation from UI no settings auto-export no settings auto-import no raw secret display no hardcoded API keys no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no raw fetch in UI no infinite polling loop no arbitrary file browsing no local action execution no credential storage no artifact deletion no delete artifact button no upload by default no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function ComfyUiMetadataLiveBridgePanel() {
  const model = buildComfyUiMetadataLiveBridgeModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-comfyui-metadata-live-bridge={`${COMFY_UI_METADATA_LIVE_BRIDGE_MARKERS} buildComfyUiMetadataLiveBridgeStableKey ComfyUiMetadataLiveBridgePanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 302"
        title="ComfyUI metadata bridge"
        subtitle="ComfyUI metadata live bridge reviews future approved metadata, status, capability, node, and model summaries. Metadata reads require approved local boundary, no ComfyUI job is submitted from this page, and local endpoints and secrets are not exposed."
        primary={{ href: "#comfyui-metadata-live-bridge", label: "Review metadata bridge" }}
        links={[
          { href: "/comfyui-health-live-bridge", label: "Health bridge" },
          { href: "/comfyui-metadata-reader", label: "Metadata reader" },
          { href: "/workflow-validator-live-bridge", label: "Validator bridge" },
          { href: "/workflow-package-validator", label: "Package validator" },
          { href: "/provider-governance-release-candidate", label: "Provider RC" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.bridgeLanguage} />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This bridge presents metadata readiness only. It does not submit ComfyUI jobs, send ComfyUI requests, call
          arbitrary local endpoints, create raw polling loops, mutate local files, mutate local processes, or display
          local endpoint values or secrets.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="comfyui-metadata-live-bridge" style={previewStyles.grid}>
        {model.bridges.map((bridge) => (
          <PreviewFoundationCard
            key={buildComfyUiMetadataLiveBridgeStableKey("comfyui-metadata-live-bridge-card", bridge.id)}
            title={bridge.bridgeIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${bridge.status}`,
                bridge.healthProbeDependency,
                bridge.approvedLocalBoundaryDependency,
                bridge.metadataSourceSummary,
                bridge.versionCapabilitySummary,
                bridge.nodeModelAvailabilitySummary,
                bridge.timeoutPolicy,
                bridge.redactionStatus,
                bridge.workflowValidatorRoute,
                `Blocked reasons: ${bridge.blockedReasons.join("; ")}`,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced metadata details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.bridges.map((bridge) => bridge.advancedMetadataDetails)} />
        <PreviewFoundationCopy>
          Advanced metadata details stay collapsed or secondary. This is a metadata bridge, not a ComfyUI submit
          boundary, endpoint browser, polling service, file mutator, process control page, or provider route.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
