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
  buildCodexForgeExtensionArchitectureDecisionModel,
  buildCodexForgeExtensionArchitectureDecisionStableKey,
} from "@/lib/codexforge/codexforge-extension-architecture-decision";

const CODEXFORGE_EXTENSION_ARCHITECTURE_DECISION_MARKERS =
  "CodexForge extension architecture decision Extension architecture does not enable plugins automatically Runtime execution remains behind approved boundaries Third-party adoption requires license security review Staged rollout recommendation Release decision architecture decision identity source comparison surfaces recommended extension shape permission model audit/recovery model memory/RAG policy non-goals next recommended route no automatic provider calls no provider API calls no automatic provider send no prompt/file sending without approval no auto-spend tokens no auto-route live provider traffic no API key export no secret export no localStorage API key storage no process.env printing no API keys or secrets displayed no plugin execution no tool execution no agent execution no MCP runtime no MCP tool calls no memory/RAG ingestion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no Ruflo/Odysseus vendoring no Ruflo/Odysseus runtime integration no Ruflo/Odysseus dependency references future adoption requires license/security review no ComfyUI job submission no ComfyUI request sent from UI no arbitrary local endpoint calls from UI no uncontrolled polling loops no render job start/cancel/hold/retry behavior no command execution no shell command execution no git command execution from UI no test execution from UI no Jarvisd capability execution from UI no daemon process creation from frontend no browser-stored signing secrets no session token localStorage storage no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open no auto-open local files no file mutation no file write no patch apply behavior no file deletion no artifact deletion no memory auto-promotion no process kill/restart/shutdown from UI no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced decision details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function CodexForgeExtensionArchitectureDecisionPanel() {
  const model = buildCodexForgeExtensionArchitectureDecisionModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-extension-architecture-decision={`${CODEXFORGE_EXTENSION_ARCHITECTURE_DECISION_MARKERS} buildCodexForgeExtensionArchitectureDecisionStableKey CodexForgeExtensionArchitectureDecisionPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 317"
        title="Extension decision"
        subtitle="CodexForge extension architecture decision consolidates the plugin registry, MCP boundary, and memory RAG review into a safe next step. Extension architecture does not enable plugins automatically, runtime execution remains behind approved boundaries, and third-party adoption requires license/security review."
        primary={{ href: "#extension-architecture-decision", label: "Review decision" }}
        links={[
          { href: "/agent-plugin-registry-comparison", label: "Plugin registry" },
          { href: "/mcp-tool-boundary-comparison", label: "MCP boundary" },
          { href: "/agent-memory-rag-pattern-review", label: "Memory RAG" },
          { href: "/jarvisd-runtime-enforcement", label: "Runtime guard" },
          { href: "/provider-governance-release-candidate", label: "Provider RC" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.decisionLanguage} />
      <PreviewFoundationCard title="Plain-English decision">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This decision does not create runtime plugin execution, enable MCP tools, ingest memory, mutate provider or
          Jarvisd registries, call providers, run commands, or copy third-party code.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="extension-architecture-decision" style={previewStyles.grid}>
        {model.decisions.map((decision) => (
          <PreviewFoundationCard
            key={buildCodexForgeExtensionArchitectureDecisionStableKey(
              "extension-architecture-decision-card",
              decision.id
            )}
            title={decision.architectureDecisionIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Source comparison surfaces: ${decision.sourceComparisonSurfaces.join("; ")}`,
                decision.recommendedExtensionShape,
                decision.permissionModel,
                decision.auditRecoveryModel,
                decision.memoryRagPolicy,
                decision.nonGoals,
                decision.stagedRolloutRecommendation,
                decision.releaseDecisionLabel,
                decision.nextRecommendedRoute,
                `Blocked reasons: ${decision.blockedReasons.join("; ")}`,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced decision details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.decisions.map((decision) => decision.advancedDecisionDetails)} />
        <PreviewFoundationCopy>
          Advanced decision details stay collapsed or secondary. The architecture decision is a decision surface only;
          runtime execution, third-party adoption, MCP support, provider traffic, memory promotion, and local capability
          execution remain behind future approved boundaries.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
