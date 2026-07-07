export const JARVIS_UNIFIED_WORKSPACE_SHELL_PANEL_IDS = [
  "status-overview",
  "capability-grid",
  "planner",
  "permission",
  "approval",
  "audit",
  "result-ledger",
  "memory-boundary",
  "kill-switch",
  "blocked-action",
  "dry-run",
  "adapter-status",
  "risk-tier",
  "specialist-navigation",
  "operator-review",
  "no-execution-guard",
  "regression-coverage",
  "readiness",
  "completion",
] as const;

export type JarvisUnifiedWorkspaceShellPanelId =
  (typeof JARVIS_UNIFIED_WORKSPACE_SHELL_PANEL_IDS)[number];

export type JarvisUnifiedWorkspaceShellPanelDefinition = Readonly<{
  id: JarvisUnifiedWorkspaceShellPanelId;
  label: string;
  badge: string;
  marker: string;
  summary: string;
}>;

export const JARVIS_UNIFIED_WORKSPACE_SHELL_PANEL_DEFINITIONS = [
  {
    id: "status-overview",
    label: "Status Overview",
    badge: "Shared status",
    marker: "shared status overview only",
    summary: "Shared status posture remains visible across every Jarvis workspace shell.",
  },
  {
    id: "capability-grid",
    label: "Capability Grid",
    badge: "Shared capability",
    marker: "shared capability grid only",
    summary: "Capability review stays shared so specialist shells inherit one common control plane view.",
  },
  {
    id: "planner",
    label: "Planner Panel",
    badge: "Planner",
    marker: "shared planner panel only",
    summary: "Planner posture stays shared and review-only across all workspaces.",
  },
  {
    id: "permission",
    label: "Permission Panel",
    badge: "Permission",
    marker: "shared permission panel only",
    summary: "Permission posture stays shared instead of being reimplemented per workspace.",
  },
  {
    id: "approval",
    label: "Approval Panel",
    badge: "Approval",
    marker: "shared approval panel only",
    summary: "Approval posture stays centralized inside Jarvis.",
  },
  {
    id: "audit",
    label: "Audit Panel",
    badge: "Audit",
    marker: "shared audit panel only",
    summary: "Audit posture stays shared across every workspace shell.",
  },
  {
    id: "result-ledger",
    label: "Result Ledger Panel",
    badge: "Result ledger",
    marker: "shared result ledger panel only",
    summary: "Result ledger posture stays shared across command center and specialist pages.",
  },
  {
    id: "memory-boundary",
    label: "Memory Boundary Panel",
    badge: "Memory boundary",
    marker: "shared memory boundary panel only",
    summary: "Memory boundary review remains shared and enforced across all specialist workspaces.",
  },
  {
    id: "kill-switch",
    label: "Kill Switch Panel",
    badge: "Kill switch",
    marker: "shared kill switch panel only",
    summary: "Hard kill switch review stays visible everywhere.",
  },
  {
    id: "blocked-action",
    label: "Blocked Action Panel",
    badge: "Blocked actions",
    marker: "shared blocked action panel only",
    summary: "Blocked action posture stays shared and explicit across all workspaces.",
  },
  {
    id: "dry-run",
    label: "Dry-Run Panel",
    badge: "Dry run",
    marker: "shared dry-run panel only",
    summary: "Dry-run posture stays shared instead of being delegated to specialist pages.",
  },
  {
    id: "adapter-status",
    label: "Adapter Status Panel",
    badge: "Adapter status",
    marker: "shared adapter status panel only",
    summary: "Adapter readiness stays visible in one shared review layer.",
  },
  {
    id: "risk-tier",
    label: "Risk Tier Panel",
    badge: "Risk",
    marker: "shared risk tier panel only",
    summary: "Risk posture stays shared while specialist pages remain review-only.",
  },
  {
    id: "specialist-navigation",
    label: "Specialist Navigation",
    badge: "Navigation",
    marker: "specialist navigation review only",
    summary: "Jarvis navigation makes specialist pages feel like apps/workspaces inside Jarvis.",
  },
  {
    id: "operator-review",
    label: "Operator Review",
    badge: "Operator gate",
    marker: "operator review required before any execution",
    summary: "Operator review remains mandatory before any future backend-owned execution path.",
  },
  {
    id: "no-execution-guard",
    label: "No-Execution Guard",
    badge: "Execution block",
    marker: "no direct frontend execution",
    summary: "Frontend execution remains blocked across all Jarvis workspace shells.",
  },
  {
    id: "regression-coverage",
    label: "Regression Coverage",
    badge: "Regression",
    marker: "specialist pages remain review-only",
    summary: "Regression coverage keeps specialist pages review-only and shared panels intact.",
  },
  {
    id: "readiness",
    label: "Readiness",
    badge: "Readiness",
    marker: "disabled by default",
    summary: "Readiness stays disabled by default until later backend-owned adapter batches arrive.",
  },
  {
    id: "completion",
    label: "Completion",
    badge: "Completion",
    marker:
      "unified workspace shells completion does not enable provider/render/export/publish/workers/trading/automation",
    summary: "Completion keeps the entire workspace shell foundation review-only and execution-blocked.",
  },
] satisfies readonly JarvisUnifiedWorkspaceShellPanelDefinition[];

export function getJarvisUnifiedWorkspaceShellPanelDefinition(
  panelId: JarvisUnifiedWorkspaceShellPanelId
) {
  return (
    JARVIS_UNIFIED_WORKSPACE_SHELL_PANEL_DEFINITIONS.find(
      (panel) => panel.id === panelId
    ) ?? JARVIS_UNIFIED_WORKSPACE_SHELL_PANEL_DEFINITIONS[0]
  );
}
