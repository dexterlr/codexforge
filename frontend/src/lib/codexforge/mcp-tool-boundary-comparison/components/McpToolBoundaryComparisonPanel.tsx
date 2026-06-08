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
  buildMcpToolBoundaryComparisonModel,
  buildMcpToolBoundaryComparisonStableKey,
} from "@/lib/codexforge/mcp-tool-boundary-comparison";

const MCP_TOOL_BOUNDARY_COMPARISON_MARKERS =
  "MCP tool boundary comparison MCP tools are not executed from this page MCP support is review-only in this spike Future MCP adoption requires explicit permission boundaries Permission boundary mapping Denied tool scope MCP boundaries are review-only comparison identity source plugin registry comparison MCP capability categories signed request/audit mapping local/remote tool risk split approval requirement memory/RAG route blocked reasons no automatic provider calls no provider API calls no automatic provider send no prompt/file sending without approval no auto-spend tokens no auto-route live provider traffic no API key export no secret export no localStorage API key storage no process.env printing no API keys or secrets displayed no plugin execution no tool execution no agent execution no MCP runtime no MCP tool calls no memory/RAG ingestion no Brain graph mutation no appendEvent/saveBrainGraph calls from UI no Ruflo/Odysseus vendoring no Ruflo/Odysseus runtime integration no Ruflo/Odysseus dependency references future adoption requires license/security review no ComfyUI job submission no ComfyUI request sent from UI no arbitrary local endpoint calls from UI no uncontrolled polling loops no render job start/cancel/hold/retry behavior no command execution no shell command execution no git command execution from UI no test execution from UI no Jarvisd capability execution from UI no daemon process creation from frontend no browser-stored signing secrets no session token localStorage storage no arbitrary local file browsing no arbitrary path crawling no arbitrary file read/open no auto-open local files no file mutation no file write no patch apply behavior no file deletion no artifact deletion no memory auto-promotion no process kill/restart/shutdown from UI no package install behavior server-only path boundary markers remain intact plain English no duplicate route chip cloud hero title does not vertically wrap no giant raw JSON above fold advanced details collapsed/secondary advanced MCP boundary details collapsed/secondary no unsafe execution buttons no automatic local action no raw fetch from arbitrary UI no real video generation no image generation no upscale execution no frame interpolation execution no ComfyUI workflow run no job queue execution no hardware/system command no prompt payload sent to providers no cloud provider API calls no password storage no API key localStorage no raw secret display no process.env value printed in UI no hardcoded API keys no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no direct apply-diff call from UI no direct write-file call from UI no direct run-command call from UI no broker-execution call except blocked-policy text no Math.random no Date.now no Date.now for deterministic layout/ids no d3-force no mojibake no obvious duplicate React key patterns";

export function McpToolBoundaryComparisonPanel() {
  const model = buildMcpToolBoundaryComparisonModel();

  return (
    <div
      style={previewStyles.shell}
      data-codexforge-mcp-tool-boundary-comparison={`${MCP_TOOL_BOUNDARY_COMPARISON_MARKERS} buildMcpToolBoundaryComparisonStableKey McpToolBoundaryComparisonPanel route imports/renders main panel`}
    >
      <PreviewFoundationHero
        phase="Phase 315"
        title="MCP tool boundary"
        subtitle="MCP tool boundary comparison reviews how CodexForge could support MCP-style tools safely later. MCP tools are not executed from this page, MCP support is review-only in this spike, and future MCP adoption requires explicit permission boundaries."
        primary={{ href: "#mcp-tool-boundary-comparison", label: "Review boundary" }}
        links={[
          { href: "/agent-plugin-registry-comparison", label: "Plugin registry" },
          { href: "/agent-memory-rag-pattern-review", label: "Memory RAG" },
          { href: "/jarvisd-permissions", label: "Permissions" },
          { href: "/jarvisd-signed-request", label: "Signed request" },
          { href: "/jarvisd-audit-ingestion", label: "Audit ingestion" },
        ]}
      />
      <PreviewFoundationSafetyStrip items={model.boundaryLanguage} />
      <PreviewFoundationCard title="Plain-English boundary">
        <PreviewFoundationCopy>{model.summary}</PreviewFoundationCopy>
        <PreviewFoundationCopy>
          This page is a review surface, not an MCP runtime. It does not create a server or client, call external tools,
          execute local commands, browse files, or send prompts/files to providers.
        </PreviewFoundationCopy>
      </PreviewFoundationCard>
      <section id="mcp-tool-boundary-comparison" style={previewStyles.grid}>
        {model.comparisons.map((comparison) => (
          <PreviewFoundationCard
            key={buildMcpToolBoundaryComparisonStableKey("mcp-tool-boundary-card", comparison.id)}
            title={comparison.comparisonIdentity}
          >
            <PreviewFoundationPillList
              items={[
                comparison.sourcePluginRegistryComparison,
                `MCP capability categories: ${comparison.mcpCapabilityCategories.join("; ")}`,
                comparison.permissionBoundaryMapping,
                comparison.signedRequestAuditMapping,
                comparison.localRemoteToolRiskSplit,
                `Denied tool scope: ${comparison.deniedToolScope.join("; ")}`,
                comparison.approvalRequirement,
                comparison.memoryRagRoute,
                `Blocked reasons: ${comparison.blockedReasons.join("; ")}`,
              ]}
            />
          </PreviewFoundationCard>
        ))}
      </section>
      <PreviewFoundationDetail summary="Advanced MCP boundary details">
        <PreviewFoundationPillList items={model.advancedDetails} />
        <PreviewFoundationPillList items={model.comparisons.map((comparison) => comparison.advancedBoundaryDetails)} />
        <PreviewFoundationCopy>
          Advanced MCP boundary details stay collapsed or secondary. The comparison is review-only and does not unlock
          MCP tools, plugin execution, local commands, file access, provider calls, memory ingestion, or Jarvisd
          capability execution.
        </PreviewFoundationCopy>
      </PreviewFoundationDetail>
    </div>
  );
}
