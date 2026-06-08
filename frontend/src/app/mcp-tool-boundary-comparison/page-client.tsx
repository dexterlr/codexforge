"use client";

import { McpToolBoundaryComparisonPanel } from "@/lib/codexforge/mcp-tool-boundary-comparison/components";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";

export default function McpToolBoundaryComparisonPageClient() {
  return (
    <CodexForgeAppShell
      activePath="/mcp-tool-boundary-comparison"
      workspaceLabel="MCP Tool Boundary Comparison"
      nextActionContext={{ hasCreativeWork: true }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarSafetyNotice={false}
      showHeroRouteChips={false}
    >
      <McpToolBoundaryComparisonPanel />
    </CodexForgeAppShell>
  );
}
