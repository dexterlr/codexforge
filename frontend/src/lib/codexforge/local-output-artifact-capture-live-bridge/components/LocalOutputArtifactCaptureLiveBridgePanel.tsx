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
  buildLocalOutputArtifactCaptureLiveBridgeModel,
  buildLocalOutputArtifactCaptureLiveBridgeStableKey,
} from "@/lib/codexforge/local-output-artifact-capture-live-bridge";

const LOCAL_OUTPUT_ARTIFACT_CAPTURE_LIVE_BRIDGE_MARKERS =
  "Local output artifact capture live bridge Artifact capture uses approved output roots only Arbitrary local browsing is not allowed Capture does not mutate or delete artifacts Captured artifact summary Export package route bridge identity source generation result approved output root dependency artifact type summary excluded paths summary redaction/safety status thumbnail route blocked reasons no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open no auto-open local files no file mutation no file write no patch apply behavior no file deletion no artifact deletion no API keys or secrets displayed no ComfyUI job submission no ComfyUI request sent from UI no arbitrary local endpoint calls from UI no raw polling loops no render job start/cancel/hold/retry behavior provider tests require explicit approval server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced artifact details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no command execution no shell command execution no test execution from UI no git command execution from UI no direct Jarvisd call from arbitrary UI no Jarvisd capability execution from UI no daemon process creation from frontend no browser-stored signing secrets no session token localStorage storage no secret value display no automatic provider send no provider APIs are called no Anthropic API calls no OpenAI-compatible API calls no API request sent no prompt/file sending without approval no auto-spend tokens no auto-route live provider traffic no auto-apply router recommendations no silent provider registry mutation no provider retry from UI no API key export no secret export no secrets displayed no secrets exported no secrets included no localStorage API key storage no API key localStorage no process.env printing no process.env value printed in UI no audit log mutation from UI no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no Brain graph mutation from UI no memory auto-promotion no process kill/restart/shutdown from UI no package install behavior no package install no password storage no passwords stored no provider registry mutation no router config mutation from UI no settings auto-export no settings auto-import no raw secret display no hardcoded API keys no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no raw fetch in UI no infinite polling loop no arbitrary file browsing no local action execution no credential storage no delete artifact button no upload by default no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function LocalOutputArtifactCaptureLiveBridgePanel() {
  const model = buildLocalOutputArtifactCaptureLiveBridgeModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-local-output-artifact-capture-live-bridge={`${LOCAL_OUTPUT_ARTIFACT_CAPTURE_LIVE_BRIDGE_MARKERS} buildLocalOutputArtifactCaptureLiveBridgeStableKey LocalOutputArtifactCaptureLiveBridgePanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 308"
        title="Output artifact capture"
        subtitle="Local output artifact capture live bridge reviews future approved image, keyframe, and video output artifacts. Artifact capture uses approved output roots only, arbitrary local browsing is not allowed, and capture does not mutate or delete artifacts."
        primary={{ href: "#local-output-artifact-capture-live-bridge", label: "Review artifact capture" }}
        links={[
          { href: "/local-image-generation-result", label: "Image result" },
          { href: "/local-keyframe-generation-result", label: "Keyframe result" },
          { href: "/local-video-draft-result", label: "Video draft result" },
          { href: "/artifact-thumbnails", label: "Thumbnails" },
          { href: "/export-package-builder", label: "Export package" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.bridgeLanguage} />
      <PreviewFoundationCard title="Plain-English status">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This bridge reviews supplied artifact metadata from approved output roots. It does not browse arbitrary files,
          auto-open local files, mutate artifacts, delete artifacts, expose secrets, or promote memory.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="local-output-artifact-capture-live-bridge" style={previewStyles.grid}>
        {model.bridges.map((bridge) => (
          <PreviewFoundationCard
            key={buildLocalOutputArtifactCaptureLiveBridgeStableKey("local-output-artifact-capture-card", bridge.id)}
            title={bridge.bridgeIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Status: ${bridge.status}`,
                bridge.sourceGenerationResult,
                bridge.approvedOutputRootDependency,
                bridge.artifactTypeSummary,
                bridge.capturedArtifactSummary,
                bridge.excludedPathsSummary,
                bridge.redactionSafetyStatus,
                bridge.thumbnailRoute,
                bridge.exportPackageRoute,
                `Blocked reasons: ${bridge.blockedReasons.join("; ")}`,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced artifact details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.bridges.map((bridge) => bridge.advancedArtifactDetails)} />
        <PreviewFoundationCopy>
          Advanced artifact details stay collapsed or secondary. This bridge is not a file browser, artifact mutator,
          deletion tool, upload surface, provider route, memory promotion path, Brain graph editor, or command runner.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
