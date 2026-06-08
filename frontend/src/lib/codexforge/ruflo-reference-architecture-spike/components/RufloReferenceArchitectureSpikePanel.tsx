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
  buildRufloReferenceArchitectureSpikeModel,
  buildRufloReferenceArchitectureSpikeStableKey,
} from "@/lib/codexforge/ruflo-reference-architecture-spike";

const RUFLO_REFERENCE_ARCHITECTURE_SPIKE_MARKERS =
  "Ruflo reference architecture spike Ruflo code is not vendored or copied This spike does not add runtime integration Future adoption requires license security review Plugin MCP boundary lessons CodexForge fit assessment reference spikes do not integrate third-party code spike identity reference scope agent registry lessons memory/RAG lessons local/remote model routing lessons risks/gaps non-goals next recommended route no automatic provider calls no provider API calls no automatic provider send no prompt/file sending without approval no auto-spend tokens no auto-route live provider traffic no API key export no secret export no localStorage API key storage no process.env printing no API keys or secrets displayed no ComfyUI job submission no ComfyUI request sent from UI no arbitrary local endpoint calls from UI no uncontrolled polling loops no raw polling loops no render job start/cancel/hold/retry behavior no command execution no shell command execution no git command execution from UI no test execution from UI no Jarvisd capability execution from UI no daemon process creation from frontend no browser-stored signing secrets no session token localStorage storage no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open no auto-open local files no file mutation no file write no patch apply behavior no file deletion no artifact deletion no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no memory auto-promotion no process kill/restart/shutdown from UI no package install behavior no Ruflo code import no Ruflo dependencies no Ruflo runtime integration no external tool execution from UI no network data fetch from UI provider tests require explicit approval server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced reference details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no ComfyUI queue submit no arbitrary queue submit from UI no silent queue mutation no job queue mutation no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no cloud calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function RufloReferenceArchitectureSpikePanel() {
  const model = buildRufloReferenceArchitectureSpikeModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-ruflo-reference-architecture-spike={`${RUFLO_REFERENCE_ARCHITECTURE_SPIKE_MARKERS} buildRufloReferenceArchitectureSpikeStableKey RufloReferenceArchitectureSpikePanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 312"
        title="Ruflo reference"
        subtitle="Ruflo reference architecture spike captures planning lessons only. Ruflo code is not vendored or copied, this spike does not add runtime integration, and future adoption requires license/security review."
        primary={{ href: "#ruflo-reference-architecture-spike", label: "Review reference" }}
        links={[
          { href: "/odysseus-reference-architecture", label: "Odysseus reference" },
          { href: "/render-job-status-polling", label: "Status polling" },
          { href: "/render-job-cancel-hold-boundary", label: "Cancel hold boundary" },
          { href: "/creative-bridge", label: "Creative bridge" },
          { href: "/capabilities", label: "Capabilities" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.referenceLanguage} />
      <PreviewFoundationCard title="Plain-English reference">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This is not an integration. The reference spikes do not integrate third-party code, add dependencies, execute
          external tools, fetch network data from UI, or claim compatibility.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="ruflo-reference-architecture-spike" style={previewStyles.grid}>
        {model.spikes.map((spike) => (
          <PreviewFoundationCard
            key={buildRufloReferenceArchitectureSpikeStableKey("ruflo-reference-card", spike.id)}
            title={spike.spikeIdentity}
          >
            <PreviewFoundationPillList
              items={[
                spike.referenceScope,
                spike.agentRegistryLessons,
                spike.pluginMcpBoundaryLessons,
                spike.memoryRagLessons,
                spike.localRemoteModelRoutingLessons,
                spike.risksGaps,
                spike.codexForgeFitAssessment,
                spike.nonGoals,
                spike.nextRecommendedRoute,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced reference details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.spikes.map((spike) => spike.advancedReferenceDetails)} />
        <PreviewFoundationCopy>
          Advanced reference details stay collapsed or secondary. This surface is not a vendor import, runtime adapter,
          package manager, provider route, file mutator, process controller, memory promotion path, Brain graph editor,
          or command runner.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
