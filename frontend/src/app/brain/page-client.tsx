"use client";

import {
  CodexForgeGlobalNav,
  CodexForgeLocalActionBar,
} from "@/lib/codexforge/navigation";
import Link from "next/link";
import { BrainCommandCenter } from "@/lib/codexforge/brain/components/brain-command-center";
import { BrainFirstRunOnboarding } from "@/lib/codexforge/brain/components/brain-first-run-onboarding";
import { BrainGraphEmptyState } from "@/lib/codexforge/brain/components/brain-graph-empty-state";
import { BrainGraphErrorState } from "@/lib/codexforge/brain/components/brain-graph-error-state";
import { BrainGraphLoadingState } from "@/lib/codexforge/brain/components/brain-graph-loading-state";
import { BrainGraphView } from "@/lib/codexforge/brain/components/brain-graph-view";
import { BrainQualityGateStrip } from "@/lib/codexforge/brain/components/brain-quality-gate-strip";
import { buildStableReactKey } from "@/lib/codexforge/brain/components/brain-react-key";
import { BrainRecallPanel } from "@/lib/codexforge/brain-recall/components";
import {
  buildBrainPanelDataAdapters,
  buildBrainPanelIntegrationFixtureAdapters,
  buildBrainPanelIntegrationReadinessMap,
  buildBrainMemoryIngestionPlan,
  buildBrainFirstRunOnboardingPlan,
  buildCodexForgeBrainRuntimeSnapshot,
  evaluateBrainEmptyState,
  evaluateBrainGraphLoadState,
  evaluateBrainSeedQuality,
  mergeBrainMemoryIngestion,
  evaluateBrainSnapshotPanelGates,
  summarizeBrainPanelIntegrationReadiness,
  type CodexForgeBrainMemoryActivityEntry,
  type CodexForgeBrainMemoryIngestionSummary,
  type CodexForgeBrainLoadPhase,
} from "@/lib/codexforge/brain/runtime";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
} from "react";
import {
  buildAdjacency,
  buildNodeLookup,
  loadBrainGraph,
  saveBrainGraph,
  type CodexForgeBrainEdge,
  type CodexForgeBrainGraph,
  type CodexForgeBrainNode,
} from "@/lib/codexforge/brain/graph";
import type { CodexForgeBrainNodeKind } from "@/lib/codexforge/brain/graph/types";

type BrainStats = {
  nodeCount: number;
  edgeCount: number;
  updatedAtLabel: string;
  activeCount: number;
  pinnedCount: number;
  archivedCount: number;
  kindBreakdown: Array<{
    kind: CodexForgeBrainNodeKind;
    count: number;
  }>;
};

type BrainFilters = {
  query: string;
  selectedKind: CodexForgeBrainNodeKind | "all";
  showArchived: boolean;
  onlyPinned: boolean;
  sortBy: "updated" | "label" | "neighbors" | "importance";
};

type BrainNodeCard = {
  node: CodexForgeBrainNode;
  detail: string | null;
  neighbors: number;
  label: string;
  status: string;
  importance: string;
};

type ToastState = {
  kind: "ok" | "err";
  text: string;
} | null;

const MAX_DETAIL_LENGTH = 220;
const MAX_NEIGHBOR_PREVIEW = 8;
const MAX_EDGE_PREVIEW = 12;
const BRAIN_GRAPH_LOADING_LABEL = "Loading brain graph";
const BRAIN_MEMORY_ROOT_NODE_ID = "workspace:codexforge";
const BRAIN_MEMORY_ACTIVITY_STORAGE_KEY = "codexforge_activity_entries_v1";

function isRecord(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function clampText(text: string, max: number): string {
  return text.length <= max ? text : `${text.slice(0, Math.max(0, max - 3))}...`;
}

function formatDateTime(timestamp?: number): string {
  if (typeof timestamp !== "number" || !Number.isFinite(timestamp)) {
    return "-";
  }

  try {
    return new Date(timestamp).toLocaleString();
  } catch {
    return "-";
  }
}

function formatKindLabel(kind: string): string {
  return kind
    .split("-")
    .join(" ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function getNodeStatus(node: CodexForgeBrainNode): string {
  return node.meta.status ?? "idle";
}

function getNodeImportance(node: CodexForgeBrainNode): string {
  return node.meta.importance ?? "low";
}

function getNodePrimaryLabel(node: CodexForgeBrainNode): string {
  if (
    isRecord(node.data) &&
    typeof node.data.label === "string" &&
    node.data.label.trim()
  ) {
    return node.data.label.trim();
  }

  return `${formatKindLabel(node.kind)} ${node.id}`;
}

function getNodeDetail(node: CodexForgeBrainNode): string | null {
  if (!isRecord(node.data)) {
    return null;
  }

  const data = node.data as Record<string, unknown>;

  const candidateKeys = [
    "goal",
    "text",
    "content",
    "summary",
    "description",
    "repoPath",
    "filePath",
    "resultSummary",
    "value",
    "name",
    "nextAction",
  ] as const;

  for (const key of candidateKeys) {
    const rawValue = data[key];
    if (typeof rawValue === "string" && rawValue.trim()) {
      return clampText(rawValue.trim(), MAX_DETAIL_LENGTH);
    }
  }

  return null;
}

function getNodeSearchText(node: CodexForgeBrainNode): string {
  const parts: string[] = [
    node.id,
    node.kind,
    getNodePrimaryLabel(node),
    getNodeStatus(node),
    getNodeImportance(node),
  ];

  const detail = getNodeDetail(node);
  if (detail) {
    parts.push(detail);
  }

  if (isRecord(node.data)) {
    for (const value of Object.values(node.data)) {
      if (typeof value === "string" && value.trim()) {
        parts.push(value.trim());
      } else if (Array.isArray(value)) {
        for (const item of value) {
          if (typeof item === "string" && item.trim()) {
            parts.push(item.trim());
          }
        }
      }
    }
  }

  return parts.join(" ").toLowerCase();
}

function getAllKinds(graph: CodexForgeBrainGraph): CodexForgeBrainNodeKind[] {
  return Array.from(new Set(graph.nodes.map((node) => node.kind))).sort() as CodexForgeBrainNodeKind[];
}

function buildStats(graph: CodexForgeBrainGraph): BrainStats {
  const counts = new Map<CodexForgeBrainNodeKind, number>();

  let activeCount = 0;
  let pinnedCount = 0;
  let archivedCount = 0;

  for (const node of graph.nodes) {
    counts.set(node.kind, (counts.get(node.kind) ?? 0) + 1);

    if (node.meta.status === "active") {
      activeCount += 1;
    }

    if (node.meta.pinned === true) {
      pinnedCount += 1;
    }

    if (node.meta.archived === true) {
      archivedCount += 1;
    }
  }

  const kindBreakdown = Array.from(counts.entries())
    .sort((a, b) => {
      if (b[1] !== a[1]) return b[1] - a[1];
      return a[0].localeCompare(b[0]);
    })
    .map(([kind, count]) => ({ kind, count }));

  return {
    nodeCount: graph.nodes.length,
    edgeCount: graph.edges.length,
    updatedAtLabel: formatDateTime(graph.meta.updatedAt),
    activeCount,
    pinnedCount,
    archivedCount,
    kindBreakdown,
  };
}

function matchesFilters(node: CodexForgeBrainNode, filters: BrainFilters): boolean {
  if (!filters.showArchived && node.meta.archived) {
    return false;
  }

  if (filters.onlyPinned && node.meta.pinned !== true) {
    return false;
  }

  if (filters.selectedKind !== "all" && node.kind !== filters.selectedKind) {
    return false;
  }

  const query = filters.query.trim().toLowerCase();
  if (!query) {
    return true;
  }

  return getNodeSearchText(node).includes(query);
}

function copyToClipboard(text: string): Promise<void> {
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    return navigator.clipboard.writeText(text);
  }

  return Promise.reject(new Error("Clipboard not available."));
}

function downloadJson(filename: string, value: unknown): void {
  const blob = new Blob([JSON.stringify(value, null, 2)], {
    type: "application/json;charset=utf-8",
  });

  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

function readBrainMemoryActivityEntries(): CodexForgeBrainMemoryActivityEntry[] {
  try {
    if (typeof window === "undefined") return [];

    const raw = window.localStorage.getItem(BRAIN_MEMORY_ACTIVITY_STORAGE_KEY);
    if (!raw) return [];

    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    const entries: CodexForgeBrainMemoryActivityEntry[] = [];

    for (const rawEntry of parsed) {
      if (!isRecord(rawEntry)) continue;

      const id = typeof rawEntry.id === "string" ? rawEntry.id.trim() : "";
      const date = typeof rawEntry.date === "string" ? rawEntry.date.trim() : "";
      const title = typeof rawEntry.title === "string" ? rawEntry.title.trim() : "";
      const category = rawEntry.category;

      if (!id || !date || !title) continue;
      if (
        category !== "note" &&
        category !== "plan" &&
        category !== "task" &&
        category !== "research" &&
        category !== "decision" &&
        category !== "execution" &&
        category !== "memory" &&
        category !== "legacy-metric"
      ) {
        continue;
      }

      const status = rawEntry.status;
      const tags = Array.isArray(rawEntry.tags)
        ? Array.from(
            new Set(
              rawEntry.tags
                .filter((item): item is string => typeof item === "string")
                .map((item) => item.trim())
                .filter(Boolean)
            )
          )
        : undefined;

      entries.push({
        id,
        date,
        title,
        category,
        summary:
          typeof rawEntry.summary === "string" && rawEntry.summary.trim()
            ? rawEntry.summary.trim()
            : undefined,
        status:
          status === "idea" ||
          status === "active" ||
          status === "done" ||
          status === "blocked"
            ? status
            : undefined,
        tags,
        notes:
          typeof rawEntry.notes === "string" && rawEntry.notes.trim()
            ? rawEntry.notes.trim()
            : undefined,
      });
    }

    return entries;
  } catch {
    return [];
  }
}

function summarizeEdge(
  edge: CodexForgeBrainEdge,
  currentNodeId: string,
  nodeLookup: Record<string, CodexForgeBrainNode>
): string {
  const direction = edge.from === currentNodeId ? "->" : "<-";
  const otherId = edge.from === currentNodeId ? edge.to : edge.from;
  const otherNode = nodeLookup[otherId];
  const otherLabel = otherNode ? getNodePrimaryLabel(otherNode) : otherId;
  const label = edge.label ? ` (${edge.label})` : "";

  return `${direction} ${edge.kind}${label} ${otherLabel}`;
}

function getKindSummaryLabel(kindBreakdown: BrainStats["kindBreakdown"]): string {
  if (kindBreakdown.length === 0) return "No nodes yet";

  return kindBreakdown
    .slice(0, 3)
    .map((entry) => `${formatKindLabel(entry.kind)} ${entry.count}`)
    .join(" / ");
}

function getImportanceRank(value: string): number {
  switch (value) {
    case "critical":
      return 5;
    case "high":
      return 4;
    case "medium":
      return 3;
    case "low":
      return 2;
    default:
      return 1;
  }
}

function buildWorkspacePrompt(node: CodexForgeBrainNode): string {
  const label = getNodePrimaryLabel(node);
  const detail = getNodeDetail(node);
  const status = getNodeStatus(node);
  const importance = getNodeImportance(node);

  return [
    "Use this CodexForge brain node as workspace context.",
    "",
    `Label: ${label}`,
    `Kind: ${formatKindLabel(node.kind)}`,
    `Node ID: ${node.id}`,
    `Status: ${status}`,
    `Importance: ${importance}`,
    detail ? `Detail: ${detail}` : "",
    "",
    "Please use this memory in the next response and suggest the best next action.",
  ]
    .filter(Boolean)
    .join("\n");
}

function getNodeDataLines(node: CodexForgeBrainNode): Array<{ key: string; value: string }> {
  if (!isRecord(node.data)) return [];

  const lines: Array<{ key: string; value: string }> = [];

  for (const [key, value] of Object.entries(node.data)) {
    if (typeof value === "string" && value.trim()) {
      lines.push({ key, value: clampText(value.trim(), 160) });
    } else if (typeof value === "number" || typeof value === "boolean") {
      lines.push({ key, value: String(value) });
    } else if (Array.isArray(value) && value.length > 0) {
      const preview = value
        .slice(0, 3)
        .map((item) => (typeof item === "string" ? item : JSON.stringify(item)))
        .join(", ");
      lines.push({
        key,
        value: clampText(preview, 160),
      });
    }
  }

  return lines.slice(0, 8);
}

function panelStyle(): CSSProperties {
  return {
    border: "1px solid rgba(125,211,252,0.18)",
    background:
      "linear-gradient(145deg, rgba(15,23,42,0.84), rgba(2,6,23,0.68)), radial-gradient(circle at 12% 0%, rgba(14,165,233,0.12), transparent 34%)",
    borderRadius: 24,
    padding: 18,
    backdropFilter: "blur(14px)",
    boxShadow: "0 18px 60px rgba(2,6,23,0.24), inset 0 1px 0 rgba(255,255,255,0.04)",
    minWidth: 0,
  };
}

function subPanelStyle(): CSSProperties {
  return {
    border: "1px solid rgba(125,211,252,0.13)",
    background:
      "linear-gradient(180deg, rgba(255,255,255,0.055), rgba(255,255,255,0.025))",
    borderRadius: 18,
    padding: 14,
    minWidth: 0,
    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.035)",
  };
}

function buttonStyle(danger = false): CSSProperties {
  return {
    appearance: "none",
    border: danger
      ? "1px solid rgba(239,68,68,0.35)"
      : "1px solid rgba(125,211,252,0.22)",
    background: danger
      ? "rgba(239,68,68,0.12)"
      : "linear-gradient(180deg, rgba(14,165,233,0.14), rgba(14,165,233,0.06))",
    color: "inherit",
    borderRadius: 14,
    padding: "10px 14px",
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
    minWidth: 0,
    maxWidth: "100%",
    overflowWrap: "anywhere",
    wordBreak: "break-word",
  };
}

const inputStyle: CSSProperties = {
  width: "100%",
  border: "1px solid rgba(125,211,252,0.2)",
  background: "rgba(2,6,23,0.36)",
  color: "inherit",
  borderRadius: 14,
  padding: "12px 14px",
  outline: "none",
  fontSize: 14,
  minWidth: 0,
};

const labelStyle: CSSProperties = {
  fontSize: 12,
  fontWeight: 800,
  opacity: 0.78,
  letterSpacing: 0,
  textTransform: "uppercase",
};

const safeWrapStyle: CSSProperties = {
  minWidth: 0,
  maxWidth: "100%",
  overflowWrap: "anywhere",
  wordBreak: "break-word",
};

const preStyle: CSSProperties = {
  margin: 0,
  whiteSpace: "pre-wrap",
  overflowWrap: "anywhere",
  overflow: "auto",
  maxHeight: 320,
  fontSize: 12,
  lineHeight: 1.55,
  fontFamily: "var(--font-geist-mono), ui-monospace, SFMono-Regular, monospace",
};

const kindPillStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  borderRadius: 999,
  padding: "6px 10px",
  background: "rgba(99,102,241,0.18)",
  border: "1px solid rgba(99,102,241,0.28)",
  fontSize: 12,
  fontWeight: 700,
  maxWidth: "100%",
  overflowWrap: "anywhere",
  wordBreak: "break-word",
  whiteSpace: "normal",
};

const metaPillStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  borderRadius: 999,
  padding: "6px 10px",
  background: "rgba(127,127,127,0.10)",
  border: "1px solid rgba(127,127,127,0.18)",
  fontSize: 12,
  maxWidth: "100%",
  overflowWrap: "anywhere",
  wordBreak: "break-word",
  whiteSpace: "normal",
};

function badgeStyle(text: string): CSSProperties {
  return {
    display: "inline-flex",
    alignItems: "center",
    borderRadius: 999,
    padding: "4px 8px",
    background:
      text === "Pinned" ? "rgba(34,197,94,0.18)" : "rgba(127,127,127,0.08)",
    border:
      text === "Pinned"
        ? "1px solid rgba(34,197,94,0.28)"
        : "1px solid rgba(127,127,127,0.18)",
    fontSize: 11,
    fontWeight: 700,
    maxWidth: "100%",
    overflowWrap: "anywhere",
    wordBreak: "break-word",
    whiteSpace: "normal",
  };
}

const sectionHeadingStyle: CSSProperties = {
  fontSize: 18,
  marginBottom: 12,
};

const subHeadingStyle: CSSProperties = {
  fontSize: 14,
  marginBottom: 10,
  opacity: 0.82,
};

const responsiveGridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
  gap: 14,
};

const densePanelOverflowGuardStyle: CSSProperties = {
  maxHeight: 520,
  overflow: "auto",
  minWidth: 0,
};

function StatCard(props: { label: string; value: string }) {
  return (
    <div style={panelStyle()}>
      <div style={{ display: "grid", gap: 8 }}>
        <span style={{ ...labelStyle, fontSize: 11 }}>{props.label}</span>
        <strong style={{ fontSize: 28, lineHeight: 1.1, ...safeWrapStyle }}>{props.value}</strong>
      </div>
    </div>
  );
}

function MiniStat(props: { label: string; value: string }) {
  return (
    <div
      style={{
        border: "1px solid rgba(127,127,127,0.14)",
        background: "rgba(127,127,127,0.04)",
        borderRadius: 16,
        padding: 12,
        display: "grid",
        gap: 6,
        minWidth: 0,
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.035)",
      }}
    >
      <span style={{ ...labelStyle, fontSize: 11 }}>{props.label}</span>
      <strong style={{ fontSize: 14, lineHeight: 1.4, ...safeWrapStyle }}>
        {props.value}
      </strong>
    </div>
  );
}

function RuntimeReadinessPanel({ stats }: { stats: BrainStats }) {
  const memoryKinds = stats.kindBreakdown
    .filter((entry) => ["memory", "decision", "note"].includes(entry.kind))
    .reduce((total, entry) => total + entry.count, 0);
  const taskKinds = stats.kindBreakdown
    .filter((entry) => ["task", "plan", "run"].includes(entry.kind))
    .reduce((total, entry) => total + entry.count, 0);
  const predictiveReady = stats.nodeCount > 0 && stats.edgeCount > 0;
  const memoryReady = memoryKinds > 0;
  const runtimeHealth = predictiveReady && memoryReady ? "ready" : "warming";
  const nextStep = predictiveReady
    ? "Inspect the selected focus node before routing context into files or chat."
    : "Add or refresh graph context before relying on predictive routing.";
  const memoryPersistenceReadiness = "approved memory events available for future merge";
  const brainMergeReadiness = "Brain merge review available: Preview only. No Brain graph mutation.";
  const approvedBrainMergeReadiness = "Approved Brain merge available in /memory: explicit approval updates local graph, then refresh /brain.";

  return (
    <section
      data-codexforge-brain-runtime-readiness
      data-codexforge-brain-overflow-guard
      data-codexforge-predictive-context-readiness={predictiveReady ? "ready" : "warming"}
      style={{
        ...panelStyle(),
        display: "grid",
        gap: 14,
        marginBottom: 18,
        background:
          "radial-gradient(circle at 8% 0%, rgba(34,197,94,0.13), transparent 36%), linear-gradient(145deg, rgba(15,23,42,0.88), rgba(2,6,23,0.72))",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 14,
          alignItems: "flex-start",
          flexWrap: "wrap",
        }}
      >
        <div>
          <span style={labelStyle}>Runtime health</span>
          <h2 style={{ margin: "6px 0 0", fontSize: 20, ...safeWrapStyle }}>
            Predictive context readiness
          </h2>
        </div>
        <span style={kindPillStyle}>Predictive context runtime</span>
      </div>

      <div
        data-codexforge-brain-readiness-grid
        data-codexforge-memory-persistence-readiness="approved memory events are available for future merge no automatic merge"
        data-codexforge-brain-merge-review="Review Brain event merge in /memory; explicit merge approval required"
        data-codexforge-approved-brain-merge-notice="Approved Brain merge applies only after explicit approval; use refresh to reload /brain graph"
        data-codexforge-brain-overflow-guard
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))",
          gap: 10,
          ...densePanelOverflowGuardStyle,
          maxHeight: 260,
        }}
      >
        <MiniStat label="Runtime health" value={runtimeHealth} />
        <MiniStat label="Predictive context readiness" value={predictiveReady ? "ready" : "warming"} />
        <MiniStat label="Memory readiness" value={memoryReady ? "ready" : "warming"} />
        <MiniStat label="Memory persistence" value={memoryPersistenceReadiness} />
        <MiniStat label="Brain merge readiness" value={brainMergeReadiness} />
        <MiniStat label="Approved merge" value={approvedBrainMergeReadiness} />
        <MiniStat label="Agent readiness" value={taskKinds > 0 ? "context available" : "placeholder"} />
      </div>

      <a href="/memory" style={buttonStyle()}>
        Review Brain event merge
      </a>

      <div
        style={{
          border: "1px solid rgba(127,127,127,0.14)",
          background: "rgba(2,6,23,0.28)",
          borderRadius: 16,
          padding: 12,
          fontSize: 13,
          lineHeight: 1.5,
          ...safeWrapStyle,
        }}
      >
        <strong>Next safe runtime step: </strong>
        {nextStep}
      </div>
    </section>
  );
}

function BrainMemoryIngestionPanel({
  summary,
  lastSummary,
  sparse,
  onIngest,
}: {
  summary: CodexForgeBrainMemoryIngestionSummary;
  lastSummary: CodexForgeBrainMemoryIngestionSummary | null;
  sparse: boolean;
  onIngest: () => void;
}) {
  const skipped = lastSummary
    ? lastSummary.skippedNodes + lastSummary.skippedEdges
    : 0;
  const lastResult = lastSummary
    ? `Added ${lastSummary.addedNodes} nodes and ${lastSummary.addedEdges} links. Skipped ${skipped} existing memories.`
    : "No ingestion run in this view yet.";

  return (
    <section
      data-codexforge-brain-memory-ingestion-panel
      data-codexforge-brain-readonly-source-safe
      data-codexforge-brain-repeat-safe-ingestion
      style={{
        ...panelStyle(),
        display: "grid",
        gap: 14,
        marginBottom: 18,
        background:
          "radial-gradient(circle at 8% 0%, rgba(45,212,191,0.13), transparent 36%), linear-gradient(145deg, rgba(15,23,42,0.88), rgba(2,6,23,0.72))",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 14,
          alignItems: "flex-start",
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "grid", gap: 6, minWidth: 0 }}>
          <span style={labelStyle}>Memory sources</span>
          <h2 style={{ margin: 0, fontSize: 20, ...safeWrapStyle }}>
            Deterministic project memory
          </h2>
          <p style={{ margin: 0, fontSize: 13, lineHeight: 1.55, opacity: 0.78, ...safeWrapStyle }}>
            {sparse
              ? "This graph is sparse. Real memory density comes from local project sources: routes, files, subsystems, decisions, plans, smokes, and activity entries."
              : "Project memory sources are ready to merge again. Stable IDs make repeated ingestion idempotent and skip existing memories."}
          </p>
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "flex-end" }}>
          <span style={kindPillStyle}>read-only sources</span>
          <button
            type="button"
            onClick={onIngest}
            style={buttonStyle()}
            data-codexforge-brain-seed-real-memory
          >
            Seed real memory
          </button>
        </div>
      </div>

      <div
        data-codexforge-brain-readiness-grid
        data-codexforge-brain-overflow-guard
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 190px), 1fr))",
          gap: 10,
          ...densePanelOverflowGuardStyle,
          maxHeight: 260,
        }}
      >
        <MiniStat label="Sources" value={String(summary.sourceCount)} />
        <MiniStat label="Projected nodes" value={String(summary.projectedNodeAdditions)} />
        <MiniStat label="Projected links" value={String(summary.projectedEdgeAdditions)} />
        <MiniStat
          label="Existing graph"
          value={`${summary.existingNodeCount} nodes / ${summary.existingEdgeCount} links`}
        />
        <MiniStat label="Source-safe" value="local read-only" />
        <MiniStat label="Last result" value={lastResult} />
      </div>

      <div
        style={{
          border: "1px solid rgba(127,127,127,0.14)",
          background: "rgba(2,6,23,0.28)",
          borderRadius: 16,
          padding: 12,
          fontSize: 13,
          lineHeight: 1.5,
          ...safeWrapStyle,
        }}
      >
        <strong>Idempotent merge: </strong>
        stable source IDs preserve existing graph data and skip duplicates on repeated ingestion.
      </div>
    </section>
  );
}

export default function BrainPageClient() {
  const [graph, setGraph] = useState<CodexForgeBrainGraph | null>(null);
  const [mounted, setMounted] = useState(false);
  const [loadComplete, setLoadComplete] = useState(false);
  const [loadPhase, setLoadPhase] =
    useState<CodexForgeBrainLoadPhase>("initializing");
  const [filters, setFilters] = useState<BrainFilters>({
    query: "",
    selectedKind: "all",
    showArchived: false,
    onlyPinned: false,
    sortBy: "updated",
  });
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [copied, setCopied] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [toast, setToast] = useState<ToastState>(null);
  const [keptEmptyGraph, setKeptEmptyGraph] = useState(false);
  const [activityEntries, setActivityEntries] = useState<CodexForgeBrainMemoryActivityEntry[]>([]);
  const [lastIngestionSummary, setLastIngestionSummary] =
    useState<CodexForgeBrainMemoryIngestionSummary | null>(null);

  const showToast = useCallback((kind: "ok" | "err", text: string) => {
    setToast({ kind, text });
    window.setTimeout(() => setToast(null), 1800);
  }, []);

  const refreshGraph = useCallback(() => {
    setLoadPhase("loading");
    setLoadComplete(false);

    try {
      const next = loadBrainGraph();
      setGraph(next);
      setActivityEntries(readBrainMemoryActivityEntries());

      setSelectedNodeId((current) => {
        if (!current) {
          return next.nodes[0]?.id ?? null;
        }

        return next.nodes.some((node) => node.id === current)
          ? current
          : (next.nodes[0]?.id ?? null);
      });

      setError("");
      setLoadComplete(true);
      setLoadPhase(
        next.nodes.length === 0 && next.edges.length === 0 ? "empty" : "loaded"
      );
    } catch (err) {
      const message =
        err instanceof Error && err.message.trim()
          ? err.message.trim()
          : "Failed to load brain graph.";
      setGraph(null);
      setSelectedNodeId(null);
      setError(message);
      setLoadComplete(true);
      setLoadPhase("error");
    }
  }, []);

  useEffect(() => {
    setMounted(true);
    refreshGraph();
  }, [refreshGraph]);

  const nodeLookup = useMemo(() => {
    return graph ? buildNodeLookup(graph.nodes) : {};
  }, [graph]);

  const adjacency = useMemo(() => {
    return graph ? buildAdjacency(graph.edges) : {};
  }, [graph]);

  const stats = useMemo(() => {
    return graph ? buildStats(graph) : null;
  }, [graph]);

  const kinds = useMemo(() => {
    return graph ? getAllKinds(graph) : [];
  }, [graph]);

  const filteredNodes = useMemo<BrainNodeCard[]>(() => {
    if (!graph) {
      return [];
    }

    const cards = graph.nodes
      .filter((node) => matchesFilters(node, filters))
      .map((node) => ({
        node,
        label: getNodePrimaryLabel(node),
        detail: getNodeDetail(node),
        neighbors: adjacency[node.id]?.length ?? 0,
        status: getNodeStatus(node),
        importance: getNodeImportance(node),
      }));

    cards.sort((a, b) => {
      const pinnedA = a.node.meta.pinned === true ? 1 : 0;
      const pinnedB = b.node.meta.pinned === true ? 1 : 0;

      if (pinnedA !== pinnedB) {
        return pinnedB - pinnedA;
      }

      if (filters.sortBy === "neighbors" && a.neighbors !== b.neighbors) {
        return b.neighbors - a.neighbors;
      }

      if (filters.sortBy === "importance") {
        const rankDiff = getImportanceRank(b.importance) - getImportanceRank(a.importance);
        if (rankDiff !== 0) {
          return rankDiff;
        }
      }

      if (filters.sortBy === "label") {
        return a.label.localeCompare(b.label);
      }

      const updatedA = a.node.meta.updatedAt ?? 0;
      const updatedB = b.node.meta.updatedAt ?? 0;

      if (updatedA !== updatedB) {
        return updatedB - updatedA;
      }

      return a.label.localeCompare(b.label);
    });

    return cards;
  }, [adjacency, filters, graph]);

  const selectedNode = useMemo(() => {
    if (!selectedNodeId || !graph) {
      return null;
    }

    return nodeLookup[selectedNodeId] ?? null;
  }, [graph, nodeLookup, selectedNodeId]);

  const selectedEdges = useMemo(() => {
    if (!selectedNode) return [];
    return adjacency[selectedNode.id] ?? [];
  }, [adjacency, selectedNode]);

  const selectedNeighborNodes = useMemo(() => {
    if (!selectedNode) return [];

    const seen = new Set<string>();
    const neighbors: CodexForgeBrainNode[] = [];

    for (const edge of selectedEdges) {
      const otherId = edge.from === selectedNode.id ? edge.to : edge.from;
      if (seen.has(otherId)) continue;

      const neighbor = nodeLookup[otherId];
      if (!neighbor) continue;

      seen.add(otherId);
      neighbors.push(neighbor);
    }

    neighbors.sort((a, b) =>
      getNodePrimaryLabel(a).localeCompare(getNodePrimaryLabel(b))
    );

    return neighbors;
  }, [nodeLookup, selectedEdges, selectedNode]);

  const selectedNodeRawJson = useMemo(() => {
    return selectedNode ? JSON.stringify(selectedNode, null, 2) : "";
  }, [selectedNode]);

  const selectedGraphJson = useMemo(() => {
    return graph ? JSON.stringify(graph, null, 2) : "";
  }, [graph]);

  const selectedNodeDataLines = useMemo(() => {
    return selectedNode ? getNodeDataLines(selectedNode) : [];
  }, [selectedNode]);

  const runtimeSnapshot = useMemo(() => {
    if (!graph) return null;

    try {
      return buildCodexForgeBrainRuntimeSnapshot({
        graph,
        selectedNodeId,
        now: graph.meta.updatedAt,
      });
    } catch {
      return null;
    }
  }, [graph, selectedNodeId]);

  const panelFixtureAdapters = useMemo(
    () => buildBrainPanelIntegrationFixtureAdapters(),
    []
  );

  const panelData = useMemo(() => {
    return buildBrainPanelDataAdapters({
      snapshot: runtimeSnapshot,
      fixtureAdapters: panelFixtureAdapters,
      now: runtimeSnapshot?.generatedAt ?? graph?.meta.updatedAt ?? 0,
      selectedNodeId,
    });
  }, [graph?.meta.updatedAt, panelFixtureAdapters, runtimeSnapshot, selectedNodeId]);

  const panelReadiness = useMemo(
    () => buildBrainPanelIntegrationReadinessMap(panelData),
    [panelData]
  );

  const panelIntegrationSummary = useMemo(
    () =>
      summarizeBrainPanelIntegrationReadiness(
        panelReadiness,
        runtimeSnapshot?.generatedAt ?? graph?.meta.updatedAt ?? 0
      ),
    [graph?.meta.updatedAt, panelReadiness, runtimeSnapshot?.generatedAt]
  );

  const graphLoadState = useMemo(
    () =>
      evaluateBrainGraphLoadState({
        mounted,
        loaded: loadComplete,
        graph,
        error,
      }),
    [error, graph, loadComplete, mounted]
  );

  const emptyState = useMemo(
    () =>
      evaluateBrainEmptyState({
        graph,
        error: error || null,
        includeResetAction: Boolean(graph),
      }),
    [error, graph]
  );

  const snapshotPanelGates = useMemo(
    () =>
      evaluateBrainSnapshotPanelGates({
        snapshot: runtimeSnapshot,
        panelData,
        panelReadiness,
        now: runtimeSnapshot?.generatedAt ?? graph?.meta.updatedAt ?? 0,
      }),
    [graph?.meta.updatedAt, panelData, panelReadiness, runtimeSnapshot]
  );

  const qualityGateSummary = useMemo(
    () => ({
      generatedAt: runtimeSnapshot?.generatedAt ?? graph?.meta.updatedAt ?? 0,
      readOnly: true as const,
      loadPhase: graphLoadState.phase,
      graphStatus: graphLoadState.status,
      snapshotStatus: snapshotPanelGates.snapshotStatus,
      panelStatus: snapshotPanelGates.panelStatus,
      sourceStatus: `${loadPhase} / ${snapshotPanelGates.livePanels.length} live / ${snapshotPanelGates.mixedPanels.length} mixed / ${snapshotPanelGates.fixturePanels.length} fixture`,
      gates: [
        graphLoadState.gate,
        snapshotPanelGates.snapshotGate,
        snapshotPanelGates.panelGate,
        ...(emptyState.isEmpty ? [emptyState.gate, ...emptyState.actions] : []),
      ],
      nextSafeAction: graphLoadState.gate.nextSafeAction,
    }),
    [
      emptyState.actions,
      emptyState.gate,
      emptyState.isEmpty,
      graph?.meta.updatedAt,
      graphLoadState.gate,
      graphLoadState.phase,
      graphLoadState.status,
      loadPhase,
      runtimeSnapshot?.generatedAt,
      snapshotPanelGates.fixturePanels.length,
      snapshotPanelGates.livePanels.length,
      snapshotPanelGates.mixedPanels.length,
      snapshotPanelGates.panelGate,
      snapshotPanelGates.panelStatus,
      snapshotPanelGates.snapshotGate,
      snapshotPanelGates.snapshotStatus,
    ]
  );

  const firstRunSeedPlan = useMemo(
    () =>
      evaluateBrainSeedQuality({
        existingGraph: graph,
        now: graph?.meta.updatedAt,
      }),
    [graph]
  );

  const firstRunOnboardingPlan = useMemo(
    () =>
      buildBrainFirstRunOnboardingPlan({
        hasGraph: Boolean(graph && (graph.nodes.length > 0 || graph.edges.length > 0)),
        previewAvailable: true,
        keptEmpty: keptEmptyGraph,
      }),
    [graph, keptEmptyGraph]
  );

  const memoryIngestionPlan = useMemo(() => {
    if (!graph) return null;
    return buildBrainMemoryIngestionPlan({
      existingGraph: graph,
      activityEntries,
    });
  }, [activityEntries, graph]);

  const handleCopyNode = useCallback(async () => {
    if (!selectedNodeRawJson) return;

    try {
      await copyToClipboard(selectedNodeRawJson);
      setCopied("node");
      showToast("ok", "Node JSON copied");
      window.setTimeout(() => setCopied(""), 1500);
    } catch (err) {
      const message =
        err instanceof Error && err.message.trim()
          ? err.message.trim()
          : "Could not copy node JSON.";
      setError(message);
      showToast("err", message);
    }
  }, [selectedNodeRawJson, showToast]);

  const handleCopyGraph = useCallback(async () => {
    if (!selectedGraphJson) return;

    try {
      await copyToClipboard(selectedGraphJson);
      setCopied("graph");
      showToast("ok", "Graph JSON copied");
      window.setTimeout(() => setCopied(""), 1500);
    } catch (err) {
      const message =
        err instanceof Error && err.message.trim()
          ? err.message.trim()
          : "Could not copy graph JSON.";
      setError(message);
      showToast("err", message);
    }
  }, [selectedGraphJson, showToast]);

  const handleCopyLoadDiagnostic = useCallback(async () => {
    const diagnostic = JSON.stringify(
      {
        phase: graphLoadState.phase,
        status: graphLoadState.status,
        reason: graphLoadState.gate.reason,
        evidence: graphLoadState.gate.evidence,
        error: graphLoadState.errorMessage ?? error,
      },
      null,
      2
    );

    try {
      await copyToClipboard(diagnostic);
      showToast("ok", "Load diagnostic copied");
    } catch (err) {
      const message =
        err instanceof Error && err.message.trim()
          ? err.message.trim()
          : "Could not copy load diagnostic.";
      setError(message);
      showToast("err", message);
    }
  }, [error, graphLoadState, showToast]);

  const handleCopyPrompt = useCallback(async () => {
    if (!selectedNode) return;

    try {
      await copyToClipboard(buildWorkspacePrompt(selectedNode));
      showToast("ok", "Workspace prompt copied");
    } catch (err) {
      const message =
        err instanceof Error && err.message.trim()
          ? err.message.trim()
          : "Could not copy workspace prompt.";
      setError(message);
      showToast("err", message);
    }
  }, [selectedNode, showToast]);

  const handleExportGraph = useCallback(() => {
    if (!graph) return;
    downloadJson("codexforge-brain-graph.json", graph);
    showToast("ok", "Graph exported");
  }, [graph, showToast]);

  const handlePinToggle = useCallback(() => {
    if (!graph || !selectedNode) return;

    try {
      const next: CodexForgeBrainGraph = {
        ...graph,
        nodes: graph.nodes.map((node) =>
          node.id === selectedNode.id
            ? {
                ...node,
                meta: {
                  ...node.meta,
                  pinned: !node.meta.pinned,
                  updatedAt: Date.now(),
                },
              }
            : node
        ),
        meta: {
          ...graph.meta,
          updatedAt: Date.now(),
        },
      };

      const saved = saveBrainGraph(next);
      setGraph(saved);
      setLoadComplete(true);
      setLoadPhase(saved.nodes.length === 0 && saved.edges.length === 0 ? "empty" : "loaded");
      showToast(
        "ok",
        selectedNode.meta.pinned ? "Node unpinned" : "Node pinned"
      );
      setError("");
    } catch (err) {
      const message =
        err instanceof Error && err.message.trim()
          ? err.message.trim()
          : "Could not update pin state.";
      setError(message);
      showToast("err", message);
    }
  }, [graph, selectedNode, showToast]);

  const handleArchiveToggle = useCallback(() => {
    if (!graph || !selectedNode) return;

    try {
      const next: CodexForgeBrainGraph = {
        ...graph,
        nodes: graph.nodes.map((node) =>
          node.id === selectedNode.id
            ? {
                ...node,
                meta: {
                  ...node.meta,
                  archived: !node.meta.archived,
                  updatedAt: Date.now(),
                },
              }
            : node
        ),
        meta: {
          ...graph.meta,
          updatedAt: Date.now(),
        },
      };

      const saved = saveBrainGraph(next);
      setGraph(saved);
      setLoadComplete(true);
      setLoadPhase(saved.nodes.length === 0 && saved.edges.length === 0 ? "empty" : "loaded");
      showToast(
        "ok",
        selectedNode.meta.archived ? "Node restored" : "Node archived"
      );
      setError("");
    } catch (err) {
      const message =
        err instanceof Error && err.message.trim()
          ? err.message.trim()
          : "Could not update archive state.";
      setError(message);
      showToast("err", message);
    }
  }, [graph, selectedNode, showToast]);

  const handleResetGraph = useCallback(() => {
    if (!graph) return;

    const confirmed = window.confirm(
      "Reset the local brain graph? This clears the saved graph in localStorage."
    );

    if (!confirmed) return;

    try {
      const empty: CodexForgeBrainGraph = {
        ...graph,
        nodes: [],
        edges: [],
        meta: {
          ...graph.meta,
          updatedAt: Date.now(),
        },
      };

      const saved = saveBrainGraph(empty);
      setGraph(saved);
      setSelectedNodeId(null);
      setError("");
      setLoadComplete(true);
      setLoadPhase("empty");
      showToast("ok", "Brain graph reset");
    } catch (err) {
      const message =
        err instanceof Error && err.message.trim()
          ? err.message.trim()
          : "Could not reset graph.";
      setError(message);
      showToast("err", message);
    }
  }, [graph, showToast]);

  const handleCreateStarterGraph = useCallback(() => {
    if (!graph) return;

    if (graph.nodes.length > 0 || graph.edges.length > 0) {
      showToast("err", "Starter graph creation is blocked because this graph already has data.");
      return;
    }

    if (firstRunSeedPlan.status === "blocked") {
      showToast("err", "Starter graph quality gates are blocked.");
      return;
    }

    try {
      const saved = saveBrainGraph(firstRunSeedPlan.graph);
      setGraph(saved);
      setSelectedNodeId(saved.nodes[0]?.id ?? null);
      setError("");
      setLoadComplete(true);
      setLoadPhase(saved.nodes.length === 0 && saved.edges.length === 0 ? "empty" : "loaded");
      setKeptEmptyGraph(false);
      showToast("ok", "Starter graph created");
    } catch (err) {
      const message =
        err instanceof Error && err.message.trim()
          ? err.message.trim()
          : "Could not create starter graph.";
      setError(message);
      showToast("err", message);
    }
  }, [firstRunSeedPlan, graph, showToast]);

  const handleIngestProjectMemory = useCallback(() => {
    if (!graph) return;

    try {
      const nextActivityEntries = readBrainMemoryActivityEntries();
      setActivityEntries(nextActivityEntries);

      const result = mergeBrainMemoryIngestion({
        existingGraph: graph,
        activityEntries: nextActivityEntries,
      });
      const saved = saveBrainGraph(result.graph);
      const skipped = result.summary.skippedNodes + result.summary.skippedEdges;

      setGraph(saved);
      setLastIngestionSummary(result.summary);
      setSelectedNodeId((current) => {
        if (current && saved.nodes.some((node) => node.id === current)) {
          return current;
        }

        return (
          saved.nodes.find((node) => node.id === BRAIN_MEMORY_ROOT_NODE_ID)?.id ??
          saved.nodes.find((node) => node.id === "route:/brain")?.id ??
          saved.nodes[0]?.id ??
          null
        );
      });
      setError("");
      setLoadComplete(true);
      setLoadPhase(saved.nodes.length === 0 && saved.edges.length === 0 ? "empty" : "loaded");
      showToast(
        "ok",
        `Added ${result.summary.addedNodes} nodes and ${result.summary.addedEdges} links. Skipped ${skipped} existing memories.`
      );
    } catch (err) {
      const message =
        err instanceof Error && err.message.trim()
          ? err.message.trim()
          : "Could not ingest project memory.";
      setError(message);
      showToast("err", message);
    }
  }, [graph, showToast]);

  const handleKeepEmptyGraph = useCallback(() => {
    setKeptEmptyGraph(true);
    showToast("ok", "Brain graph left empty");
  }, [showToast]);

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at 50% -12%, rgba(14,165,233,0.22), transparent 34%), radial-gradient(circle at 4% 18%, rgba(99,102,241,0.14), transparent 28%), linear-gradient(180deg, rgba(2,6,23,0.96), rgba(15,23,42,0.86) 54%, rgba(2,6,23,0.98)), var(--background)",
        color: "var(--foreground)",
        fontFamily:
          "var(--font-geist-sans), Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: 1680,
          margin: "0 auto",
          padding: "16px 18px 48px",
          minWidth: 0,
        }}
      >
        <CodexForgeGlobalNav compact />
        <Link href="/tasks" style={taskAutopilotLink}>
          Task Autopilot and Activate reviewed task: open /tasks to turn accepted memory-backed suggestions into reviewed plan previews; no graph mutation.
        </Link>

        <CodexForgeLocalActionBar
          title="Brain Command Center"
          subtitle="Graph memory, relationships, saved context, and workspace continuity"
          status={
            stats
              ? `${stats.nodeCount} nodes / ${stats.edgeCount} links`
              : graphLoadState.status
          }
        >
          <button type="button" onClick={refreshGraph} style={buttonStyle()}>
            Refresh
          </button>
          <button
            type="button"
            onClick={handleIngestProjectMemory}
            disabled={!graph}
            style={buttonStyle()}
            data-codexforge-brain-seed-real-memory
          >
            Seed real memory
          </button>
          <button type="button" onClick={handleCopyGraph} style={buttonStyle()}>
            {copied === "graph" ? "Graph copied" : "Copy graph JSON"}
          </button>
          <button type="button" onClick={handleExportGraph} style={buttonStyle()}>
            Export graph
          </button>
          <button type="button" onClick={handleResetGraph} style={buttonStyle(true)}>
            Reset graph
          </button>
        </CodexForgeLocalActionBar>

        {toast ? (
          <div
            style={{
              border:
                toast.kind === "ok"
                  ? "1px solid rgba(34,197,94,0.35)"
                  : "1px solid rgba(239,68,68,0.35)",
              background:
                toast.kind === "ok"
                  ? "rgba(34,197,94,0.12)"
                  : "rgba(239,68,68,0.12)",
              borderRadius: 16,
              padding: "12px 14px",
              fontSize: 14,
              ...safeWrapStyle,
            }}
          >
            {toast.text}
          </div>
        ) : null}

        {error ? (
          <div
            style={{
              border: "1px solid rgba(239,68,68,0.35)",
              background: "rgba(239,68,68,0.12)",
              color: "inherit",
              borderRadius: 16,
              padding: "12px 14px",
              fontSize: 14,
              ...safeWrapStyle,
            }}
          >
            {error}
          </div>
        ) : null}

        <BrainQualityGateStrip
          loadState={graphLoadState}
          snapshotPanelGates={snapshotPanelGates}
          summary={qualityGateSummary}
        />

        {graphLoadState.phase === "error" ? (
          <BrainGraphErrorState
            loadState={graphLoadState}
            onRetryLoad={refreshGraph}
            onCopyDiagnostic={handleCopyLoadDiagnostic}
          />
        ) : graphLoadState.phase === "initializing" ||
          graphLoadState.phase === "loading" ||
          !graph ||
          !stats ? (
          <div aria-label={BRAIN_GRAPH_LOADING_LABEL}>
            <BrainGraphLoadingState loadState={graphLoadState} />
          </div>
        ) : (
          <>
            {emptyState.isEmpty ? (
              <>
                <section
                  data-codexforge-brain-first-run-onboarding
                  data-codexforge-brain-empty-first-run
                  data-codexforge-brain-explicit-seed-action
                  data-codexforge-brain-create-starter-graph
                >
                  <BrainFirstRunOnboarding
                    seedPlan={firstRunSeedPlan}
                    onboardingPlan={firstRunOnboardingPlan}
                    onCreateStarterGraph={handleCreateStarterGraph}
                    onKeepEmptyGraph={handleKeepEmptyGraph}
                  />
                </section>
                <BrainGraphEmptyState
                  emptyState={emptyState}
                  onRefreshGraph={refreshGraph}
                  onResetGraph={handleResetGraph}
                />
              </>
            ) : null}

            <section
              data-codexforge-brain-layout-root
              data-codexforge-brain-responsive-grid
              style={{
                ...responsiveGridStyle,
                marginBottom: 14,
                gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 160px), 1fr))",
                gap: 10,
              }}
            >
              <StatCard label="Nodes" value={String(stats.nodeCount)} />
              <StatCard label="Edges" value={String(stats.edgeCount)} />
              <StatCard label="Active" value={String(stats.activeCount)} />
              <StatCard label="Pinned" value={String(stats.pinnedCount)} />
              <StatCard label="Archived" value={String(stats.archivedCount)} />
              <StatCard label="Last updated" value={stats.updatedAtLabel} />
            </section>

            {memoryIngestionPlan ? (
              <BrainMemoryIngestionPanel
                summary={memoryIngestionPlan.summary}
                lastSummary={lastIngestionSummary}
                sparse={graph.nodes.length < 12}
                onIngest={handleIngestProjectMemory}
              />
            ) : null}

            <section
              data-codexforge-brain-visual-memory-graph-hero
              data-codexforge-brain-graph-above-fold
              style={{
                marginBottom: 16,
                minWidth: 0,
              }}
            >
              <BrainGraphView
                graph={graph}
                selectedNodeId={selectedNodeId}
                onSelectNode={setSelectedNodeId}
                variant="hero"
              />
            </section>

            <RuntimeReadinessPanel stats={stats} />
            <section style={{ marginBottom: 18, minWidth: 0 }}>
              <BrainRecallPanel graph={graph} />
            </section>
            <BrainCommandCenter
              graph={graph}
              selectedNode={selectedNode}
              selectedNodeId={selectedNodeId}
              onSelectNode={setSelectedNodeId}
              runtimeSnapshot={runtimeSnapshot}
              panelData={panelData}
              panelReadiness={panelReadiness}
              panelIntegrationSummary={panelIntegrationSummary}
              qualityGateSummary={qualityGateSummary}
            />

            <section
              data-codexforge-brain-inspector-preserved
              data-codexforge-brain-responsive-grid
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 380px), 1fr))",
                gap: 18,
                alignItems: "start",
                minWidth: 0,
              }}
            >
              <aside
                style={{
                  ...panelStyle(),
                  position: "sticky",
                  top: 18,
                  display: "grid",
                  gap: 14,
                  maxHeight: "calc(100vh - 36px)",
                  overflow: "auto",
                  minWidth: 0,
                }}
                data-codexforge-brain-overflow-guard
              >
                <div style={{ display: "grid", gap: 12 }}>
                  <div>
                    <h2 style={{ fontSize: 18, marginBottom: 6 }}>
                      Graph explorer
                    </h2>
                    <p style={{ fontSize: 13, opacity: 0.72, lineHeight: 1.55, ...safeWrapStyle }}>
                      Filter memory nodes, inspect work context, and navigate
                      relationships across tasks, runs, plans, decisions, and files.
                    </p>
                  </div>

                  <label style={{ display: "grid", gap: 6 }}>
                    <span style={labelStyle}>Search</span>
                    <input
                      value={filters.query}
                      onChange={(event) =>
                        setFilters((current) => ({
                          ...current,
                          query: event.target.value,
                        }))
                      }
                      placeholder="Search id, label, text, goal, file path"
                      style={inputStyle}
                    />
                  </label>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 180px), 1fr))",
                      gap: 10,
                    }}
                  >
                    <label style={{ display: "grid", gap: 6 }}>
                      <span style={labelStyle}>Kind</span>
                      <select
                        value={filters.selectedKind}
                        onChange={(event) =>
                          setFilters((current) => ({
                            ...current,
                            selectedKind: event.target.value as
                              | CodexForgeBrainNodeKind
                              | "all",
                          }))
                        }
                        style={inputStyle}
                      >
                        <option value="all">All kinds</option>
                        {kinds.map((kind, index) => (
                          <option key={buildStableReactKey("brain-kind-option", [kind], index)} value={kind}>
                            {formatKindLabel(kind)}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label style={{ display: "grid", gap: 6 }}>
                      <span style={labelStyle}>Sort</span>
                      <select
                        value={filters.sortBy}
                        onChange={(event) =>
                          setFilters((current) => ({
                            ...current,
                            sortBy: event.target.value as BrainFilters["sortBy"],
                          }))
                        }
                        style={inputStyle}
                      >
                        <option value="updated">Recently updated</option>
                        <option value="label">Label</option>
                        <option value="neighbors">Most connected</option>
                        <option value="importance">Importance</option>
                      </select>
                    </label>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      gap: 16,
                      flexWrap: "wrap",
                    }}
                  >
                    <label
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                        fontSize: 13,
                        ...safeWrapStyle,
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={filters.showArchived}
                        onChange={(event) =>
                          setFilters((current) => ({
                            ...current,
                            showArchived: event.target.checked,
                          }))
                        }
                      />
                      Show archived
                    </label>

                    <label
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                        fontSize: 13,
                        ...safeWrapStyle,
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={filters.onlyPinned}
                        onChange={(event) =>
                          setFilters((current) => ({
                            ...current,
                            onlyPinned: event.target.checked,
                          }))
                        }
                      />
                      Only pinned
                    </label>
                  </div>
                </div>

                <div style={subPanelStyle()}>
                  <h3 style={subHeadingStyle}>Overview</h3>
                  <div style={{ fontSize: 13, lineHeight: 1.6, opacity: 0.82, ...safeWrapStyle }}>
                    {getKindSummaryLabel(stats.kindBreakdown)}
                  </div>
                </div>

                <div style={{ display: "grid", gap: 10, minHeight: 0 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: 10,
                      alignItems: "center",
                    }}
                  >
                    <h3 style={{ fontSize: 14, opacity: 0.84 }}>
                      Nodes ({filteredNodes.length})
                    </h3>
                    <span style={{ fontSize: 12, opacity: 0.64 }}>
                      total {graph.nodes.length}
                    </span>
                  </div>

                  <div
                    data-codexforge-brain-overflow-guard
                    style={{
                      overflow: "auto",
                      display: "grid",
                      gap: 10,
                      paddingRight: 4,
                      ...densePanelOverflowGuardStyle,
                    }}
                  >
                    {filteredNodes.length === 0 ? (
                      <div
                        style={{
                          border: "1px dashed rgba(127,127,127,0.25)",
                          borderRadius: 14,
                          padding: 16,
                          fontSize: 14,
                          opacity: 0.74,
                        }}
                      >
                        No nodes match the current filters.
                      </div>
                    ) : (
                      filteredNodes.map(({ node, detail, neighbors, label, status, importance }) => {
                        const isSelected = selectedNodeId === node.id;

                        return (
                          <button
                            key={node.id}
                            type="button"
                            onClick={() => setSelectedNodeId(node.id)}
                            style={{
                              textAlign: "left",
                              borderRadius: 18,
                              border: isSelected
                                ? "1px solid rgba(99,102,241,0.5)"
                                : "1px solid rgba(127,127,127,0.18)",
                              background: isSelected
                                ? "rgba(99,102,241,0.14)"
                                : "rgba(127,127,127,0.05)",
                              padding: 14,
                              cursor: "pointer",
                              display: "grid",
                              gap: 8,
                              minWidth: 0,
                              boxShadow: isSelected
                                ? "0 12px 40px rgba(99,102,241,0.16), inset 0 1px 0 rgba(255,255,255,0.05)"
                                : "inset 0 1px 0 rgba(255,255,255,0.035)",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "flex-start",
                                gap: 10,
                              }}
                            >
                              <div style={{ display: "grid", gap: 4, minWidth: 0 }}>
                                <strong style={{ fontSize: 14, ...safeWrapStyle }}>{label}</strong>
                                <span style={{ fontSize: 12, opacity: 0.72, ...safeWrapStyle }}>
                                  {formatKindLabel(node.kind)}
                                </span>
                              </div>

                              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                                {node.meta.pinned ? (
                                  <span style={badgeStyle("Pinned")}>Pinned</span>
                                ) : null}
                                {node.meta.archived ? (
                                  <span style={badgeStyle("Archived")}>Archived</span>
                                ) : null}
                              </div>
                            </div>

                            {detail ? (
                              <p
                                style={{
                                  fontSize: 13,
                                  lineHeight: 1.5,
                                  opacity: 0.82,
                                  ...safeWrapStyle,
                                }}
                              >
                                {detail}
                              </p>
                            ) : null}

                            <div
                              style={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 8,
                                fontSize: 12,
                                opacity: 0.72,
                                minWidth: 0,
                              }}
                            >
                              <span style={safeWrapStyle}>{status}</span>
                              <span>/</span>
                              <span style={safeWrapStyle}>{importance}</span>
                              <span>/</span>
                              <span style={safeWrapStyle}>{neighbors} links</span>
                            </div>
                          </button>
                        );
                      })
                    )}
                  </div>
                </div>
              </aside>

              <section
                style={{
                  display: "grid",
                  gap: 18,
                  minWidth: 0,
                }}
              >
                <div style={panelStyle()}>
                  {!selectedNode ? (
                    <div style={{ display: "grid", gap: 8 }}>
                      <h2 style={{ fontSize: 20 }}>No node selected</h2>
                      <p style={{ opacity: 0.76, lineHeight: 1.6 }}>
                        Pick a node from the left to inspect its metadata, raw
                        payload, and connections.
                      </p>
                    </div>
                  ) : (
                    <div style={{ display: "grid", gap: 18 }}>
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          justifyContent: "space-between",
                          gap: 14,
                          alignItems: "flex-start",
                        }}
                      >
                        <div style={{ display: "grid", gap: 8, minWidth: 0 }}>
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                              gap: 8,
                              alignItems: "center",
                            }}
                          >
                            <span style={kindPillStyle}>
                              {formatKindLabel(selectedNode.kind)}
                            </span>
                            <span style={metaPillStyle}>
                              status: {getNodeStatus(selectedNode)}
                            </span>
                            <span style={metaPillStyle}>
                              importance: {getNodeImportance(selectedNode)}
                            </span>
                          </div>

                          <div style={{ display: "grid", gap: 5, minWidth: 0 }}>
                            <h2 style={{ fontSize: "clamp(1.3rem, 2vw, 2rem)", ...safeWrapStyle }}>
                              {getNodePrimaryLabel(selectedNode)}
                            </h2>
                            <p
                              style={{
                                fontFamily:
                                  "var(--font-geist-mono), ui-monospace, SFMono-Regular, monospace",
                                fontSize: 12,
                                opacity: 0.68,
                                ...safeWrapStyle,
                              }}
                            >
                              {selectedNode.id}
                            </p>
                          </div>
                        </div>

                        <div
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 10,
                            minWidth: 0,
                          }}
                        >
                          <button
                            type="button"
                            onClick={handlePinToggle}
                            style={buttonStyle()}
                          >
                            {selectedNode.meta.pinned ? "Unpin" : "Pin"}
                          </button>
                          <button
                            type="button"
                            onClick={handleArchiveToggle}
                            style={buttonStyle(selectedNode.meta.archived === false)}
                          >
                            {selectedNode.meta.archived ? "Restore" : "Archive"}
                          </button>
                          <button
                            type="button"
                            onClick={handleCopyPrompt}
                            style={buttonStyle()}
                          >
                            Copy workspace prompt
                          </button>
                          <button
                            type="button"
                            onClick={handleCopyNode}
                            style={buttonStyle()}
                          >
                            {copied === "node" ? "Node copied" : "Copy node JSON"}
                          </button>
                        </div>
                      </div>

                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                          gap: 10,
                          minWidth: 0,
                        }}
                      >
                        <MiniStat
                          label="Created"
                          value={formatDateTime(selectedNode.meta.createdAt)}
                        />
                        <MiniStat
                          label="Updated"
                          value={formatDateTime(selectedNode.meta.updatedAt)}
                        />
                        <MiniStat
                          label="Archived"
                          value={selectedNode.meta.archived ? "Yes" : "No"}
                        />
                        <MiniStat
                          label="Pinned"
                          value={selectedNode.meta.pinned ? "Yes" : "No"}
                        />
                      </div>

                      {selectedNodeDataLines.length > 0 ? (
                        <div style={subPanelStyle()}>
                          <h3 style={subHeadingStyle}>Quick fields</h3>
                          <div
                            style={{
                              display: "grid",
                              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))",
                              gap: 10,
                            }}
                          >
                            {selectedNodeDataLines.map((item, index) => (
                              <div
                                key={buildStableReactKey("selected-node-data", [selectedNode.id, item.key], index)}
                                style={{
                                  border: "1px solid rgba(127,127,127,0.14)",
                                  background: "rgba(127,127,127,0.04)",
                                  borderRadius: 14,
                                  padding: 12,
                                  display: "grid",
                                  gap: 6,
                                  minWidth: 0,
                                }}
                              >
                                <span style={{ ...labelStyle, fontSize: 11 }}>
                                  {item.key}
                                </span>
                                <span
                                  style={{
                                    fontSize: 13,
                                    lineHeight: 1.5,
                                    opacity: 0.88,
                                    ...safeWrapStyle,
                                  }}
                                >
                                  {item.value}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : null}

                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
                          gap: 18,
                        }}
                      >
                        <div style={subPanelStyle()}>
                          <h3 style={subHeadingStyle}>Data</h3>
                          <pre style={preStyle}>
                            {JSON.stringify(selectedNode.data, null, 2)}
                          </pre>
                        </div>

                        <div style={subPanelStyle()}>
                          <h3 style={subHeadingStyle}>Meta</h3>
                          <pre style={preStyle}>
                            {JSON.stringify(selectedNode.meta, null, 2)}
                          </pre>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
                    gap: 18,
                  }}
                >
                  <div style={panelStyle()}>
                    <h3 style={sectionHeadingStyle}>Connected nodes</h3>
                    {!selectedNode ? (
                      <p style={{ opacity: 0.72 }}>
                        Select a node to inspect neighbors.
                      </p>
                    ) : selectedNeighborNodes.length === 0 ? (
                      <p style={{ opacity: 0.72 }}>No connected nodes.</p>
                    ) : (
                      <div style={{ display: "grid", gap: 10 }}>
                        {selectedNeighborNodes
                          .slice(0, MAX_NEIGHBOR_PREVIEW)
                          .map((neighbor) => (
                            <button
                              key={neighbor.id}
                              type="button"
                              onClick={() => setSelectedNodeId(neighbor.id)}
                              style={{
                                textAlign: "left",
                                border: "1px solid rgba(127,127,127,0.18)",
                                background: "rgba(127,127,127,0.05)",
                                borderRadius: 14,
                                padding: 12,
                                cursor: "pointer",
                                display: "grid",
                                gap: 6,
                                minWidth: 0,
                              }}
                            >
                              <strong style={{ fontSize: 14, ...safeWrapStyle }}>
                                {getNodePrimaryLabel(neighbor)}
                              </strong>
                              <span style={{ fontSize: 12, opacity: 0.72, ...safeWrapStyle }}>
                                {formatKindLabel(neighbor.kind)}
                              </span>
                              {getNodeDetail(neighbor) ? (
                                <span style={{ fontSize: 13, opacity: 0.8, ...safeWrapStyle }}>
                                  {getNodeDetail(neighbor)}
                                </span>
                              ) : null}
                            </button>
                          ))}

                        {selectedNeighborNodes.length > MAX_NEIGHBOR_PREVIEW ? (
                          <p style={{ fontSize: 12, opacity: 0.65 }}>
                            +{selectedNeighborNodes.length - MAX_NEIGHBOR_PREVIEW} more neighbors
                          </p>
                        ) : null}
                      </div>
                    )}
                  </div>

                  <div style={panelStyle()}>
                    <h3 style={sectionHeadingStyle}>Edges</h3>
                    {!selectedNode ? (
                      <p style={{ opacity: 0.72 }}>
                        Select a node to inspect edge details.
                      </p>
                    ) : selectedEdges.length === 0 ? (
                      <p style={{ opacity: 0.72 }}>No edges for this node.</p>
                    ) : (
                      <div style={{ display: "grid", gap: 10 }}>
                        {selectedEdges.slice(0, MAX_EDGE_PREVIEW).map((edge) => (
                          <div
                            key={edge.id}
                            style={{
                              border: "1px solid rgba(127,127,127,0.18)",
                              background: "rgba(127,127,127,0.05)",
                              borderRadius: 14,
                              padding: 12,
                              display: "grid",
                              gap: 6,
                              minWidth: 0,
                            }}
                          >
                            <strong style={{ fontSize: 14, ...safeWrapStyle }}>{edge.kind}</strong>
                            <span
                              style={{
                                fontFamily:
                                  "var(--font-geist-mono), ui-monospace, SFMono-Regular, monospace",
                                fontSize: 12,
                                opacity: 0.76,
                                ...safeWrapStyle,
                              }}
                            >
                              {edge.id}
                            </span>
                            <span style={{ fontSize: 13, opacity: 0.82, ...safeWrapStyle }}>
                              {summarizeEdge(edge, selectedNode.id, nodeLookup)}
                            </span>
                            {edge.label ? (
                              <span style={{ fontSize: 12, opacity: 0.7, ...safeWrapStyle }}>
                                label: {edge.label}
                              </span>
                            ) : null}
                          </div>
                        ))}

                        {selectedEdges.length > MAX_EDGE_PREVIEW ? (
                          <p style={{ fontSize: 12, opacity: 0.65 }}>
                            +{selectedEdges.length - MAX_EDGE_PREVIEW} more edges
                          </p>
                        ) : null}
                      </div>
                    )}
                  </div>
                </div>

                <div style={panelStyle()}>
                  <h3 style={sectionHeadingStyle}>Kind breakdown</h3>
                  {stats.kindBreakdown.length === 0 ? (
                    <p style={{ opacity: 0.72 }}>No graph data yet.</p>
                  ) : (
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                        gap: 10,
                      }}
                    >
                      {stats.kindBreakdown.map((entry, index) => (
                        <div
                          key={buildStableReactKey("kind-breakdown", [entry.kind], index)}
                          style={{
                            border: "1px solid rgba(127,127,127,0.18)",
                            background: "rgba(127,127,127,0.05)",
                            borderRadius: 16,
                            padding: 14,
                            display: "grid",
                            gap: 6,
                            minWidth: 0,
                          }}
                        >
                          <strong style={safeWrapStyle}>{formatKindLabel(entry.kind)}</strong>
                          <span style={{ fontSize: 24, fontWeight: 700 }}>
                            {entry.count}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div style={panelStyle()}>
                  <h3 style={sectionHeadingStyle}>Raw graph JSON</h3>
                  <pre style={{ ...preStyle, maxHeight: 420 }}>{selectedGraphJson}</pre>
                </div>
              </section>
            </section>
          </>
        )}
      </div>
    </main>
  );
}

const taskAutopilotLink: CSSProperties = {
  border: "1px solid rgba(45,212,191,0.18)",
  background: "rgba(20,184,166,0.08)",
  borderRadius: 8,
  color: "#dbeafe",
  display: "block",
  fontSize: 12,
  fontWeight: 850,
  lineHeight: 1.4,
  margin: "12px 0",
  padding: "9px 11px",
  textDecoration: "none",
  overflowWrap: "anywhere",
};
