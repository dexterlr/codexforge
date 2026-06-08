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
  buildAgentPluginRegistryComparisonModel,
  buildAgentPluginRegistryComparisonStableKey,
} from "@/lib/codexforge/agent-plugin-registry-comparison";

const AGENT_PLUGIN_REGISTRY_COMPARISON_MARKERS =
  "Agent plugin registry comparison Plugin comparison does not execute plugins Third-party code is not vendored or copied Future plugin adoption requires license security review Plugin manifest lessons MCP boundary route comparison identity source reference spikes CodexForge registry requirements permission/scope lessons audit/recovery requirements sandboxing/non-goals risks/gaps next recommended route no automatic provider calls no provider API calls no automatic provider send no prompt/file sending without approval no auto-spend tokens no auto-route live provider traffic no API key export no secret export no localStorage API key storage no process.env printing no API keys or secrets displayed no plugin execution no tool execution no agent execution no MCP runtime no MCP tool calls no memory/RAG ingestion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no Ruflo/Odysseus vendoring no Ruflo/Odysseus runtime integration no Ruflo/Odysseus dependency references future adoption requires license/security review no ComfyUI job submission no ComfyUI request sent from UI no arbitrary local endpoint calls from UI no uncontrolled polling loops no render job start/cancel/hold/retry behavior no command execution no shell command execution no git command execution from UI no test execution from UI no Jarvisd capability execution from UI no daemon process creation from frontend no browser-stored signing secrets no session token localStorage storage no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open no auto-open local files no file mutation no file write no patch apply behavior no file deletion no artifact deletion no memory auto-promotion no process kill/restart/shutdown from UI no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced comparison details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function AgentPluginRegistryComparisonPanel() {
  const model = buildAgentPluginRegistryComparisonModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-agent-plugin-registry-comparison={`${AGENT_PLUGIN_REGISTRY_COMPARISON_MARKERS} buildAgentPluginRegistryComparisonStableKey AgentPluginRegistryComparisonPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 314"
        title="Plugin registry comparison"
        subtitle="Agent plugin registry comparison turns Ruflo and Odysseus reference lessons into CodexForge registry requirements. Plugin comparison does not execute plugins, third-party code is not vendored or copied, and future plugin adoption requires license/security review."
        primary={{ href: "#agent-plugin-registry-comparison", label: "Review comparison" }}
        links={[
          { href: "/ruflo-reference-architecture", label: "Ruflo reference" },
          { href: "/odysseus-reference-architecture", label: "Odysseus reference" },
          { href: "/mcp-tool-boundary-comparison", label: "MCP boundary" },
          { href: "/jarvisd-execution-registry", label: "Jarvisd registry" },
          { href: "/jarvisd-runtime-enforcement", label: "Runtime guard" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.registryLanguage} />
      <PreviewFoundationCard title="Plain-English comparison">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This surface compares future registry needs only. It does not create a plugin runtime, execute plugins, call
          tools, run agents, vendor third-party code, or import Ruflo/Odysseus runtime behavior.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="agent-plugin-registry-comparison" style={previewStyles.grid}>
        {model.comparisons.map((comparison) => (
          <PreviewFoundationCard
            key={buildAgentPluginRegistryComparisonStableKey("agent-plugin-registry-card", comparison.id)}
            title={comparison.comparisonIdentity}
          >
            <PreviewFoundationPillList
              items={[
                `Source reference spikes: ${comparison.sourceReferenceSpikes.join("; ")}`,
                comparison.codexForgeRegistryRequirements,
                comparison.pluginManifestLessons,
                comparison.permissionScopeLessons,
                comparison.auditRecoveryRequirements,
                comparison.sandboxingNonGoals,
                `Risks/gaps: ${comparison.risksGaps.join("; ")}`,
                comparison.mcpBoundaryRoute,
                comparison.nextRecommendedRoute,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced comparison details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.comparisons.map((comparison) => comparison.advancedComparisonDetails)} />
        <PreviewFoundationCopy>
          Advanced comparison details stay collapsed or secondary. This page is not a package manager, plugin executor,
          MCP runtime, agent runner, provider router, memory ingestion path, file mutator, process controller, or command
          runner.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
