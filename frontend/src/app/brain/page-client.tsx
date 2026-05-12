"use client";

import Link from "next/link";
import { BrainGraphView } from "@/lib/codexforge/brain/components/brain-graph-view";
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
    border: "1px solid rgba(127,127,127,0.16)",
    background: "rgba(127,127,127,0.06)",
    borderRadius: 24,
    padding: 18,
    backdropFilter: "blur(10px)",
    boxShadow: "0 8px 30px rgba(0,0,0,0.10)",
  };
}

function subPanelStyle(): CSSProperties {
  return {
    border: "1px solid rgba(127,127,127,0.14)",
    background: "rgba(127,127,127,0.04)",
    borderRadius: 18,
    padding: 14,
    minWidth: 0,
  };
}

function buttonStyle(danger = false): CSSProperties {
  return {
    appearance: "none",
    border: danger
      ? "1px solid rgba(239,68,68,0.35)"
      : "1px solid rgba(127,127,127,0.2)",
    background: danger ? "rgba(239,68,68,0.12)" : "rgba(127,127,127,0.08)",
    color: "inherit",
    borderRadius: 14,
    padding: "10px 14px",
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
  };
}

const inputStyle: CSSProperties = {
  width: "100%",
  border: "1px solid rgba(127,127,127,0.22)",
  background: "rgba(127,127,127,0.06)",
  color: "inherit",
  borderRadius: 14,
  padding: "12px 14px",
  outline: "none",
  fontSize: 14,
};

const labelStyle: CSSProperties = {
  fontSize: 12,
  fontWeight: 700,
  opacity: 0.74,
  letterSpacing: "0.03em",
  textTransform: "uppercase",
};

const preStyle: CSSProperties = {
  margin: 0,
  whiteSpace: "pre-wrap",
  wordBreak: "break-word",
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
};

const metaPillStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  borderRadius: 999,
  padding: "6px 10px",
  background: "rgba(127,127,127,0.10)",
  border: "1px solid rgba(127,127,127,0.18)",
  fontSize: 12,
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

function StatCard(props: { label: string; value: string }) {
  return (
    <div style={panelStyle()}>
      <div style={{ display: "grid", gap: 8 }}>
        <span style={{ ...labelStyle, fontSize: 11 }}>{props.label}</span>
        <strong style={{ fontSize: 28, lineHeight: 1.1 }}>{props.value}</strong>
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
      }}
    >
      <span style={{ ...labelStyle, fontSize: 11 }}>{props.label}</span>
      <strong style={{ fontSize: 14, lineHeight: 1.4 }}>{props.value}</strong>
    </div>
  );
}

export default function BrainPageClient() {
  const [graph, setGraph] = useState<CodexForgeBrainGraph | null>(null);
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

  const showToast = useCallback((kind: "ok" | "err", text: string) => {
    setToast({ kind, text });
    window.setTimeout(() => setToast(null), 1800);
  }, []);

  const refreshGraph = useCallback(() => {
    try {
      const next = loadBrainGraph();
      setGraph(next);

      setSelectedNodeId((current) => {
        if (!current) {
          return next.nodes[0]?.id ?? null;
        }

        return next.nodes.some((node) => node.id === current)
          ? current
          : (next.nodes[0]?.id ?? null);
      });

      setError("");
    } catch (err) {
      setError(
        err instanceof Error && err.message.trim()
          ? err.message.trim()
          : "Failed to load brain graph."
      );
    }
  }, []);

  useEffect(() => {
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

  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top, rgba(99,102,241,0.16), transparent 28%), var(--background)",
        color: "var(--foreground)",
      }}
    >
      <div
        style={{
          maxWidth: 1500,
          margin: "0 auto",
          padding: "24px 20px 48px",
        }}
      >
        <header
          style={{
            display: "grid",
            gap: 14,
            marginBottom: 20,
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              gap: 16,
              alignItems: "flex-start",
            }}
          >
            <div style={{ display: "grid", gap: 10 }}>
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  flexWrap: "wrap",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    display: "inline-flex",
                    width: "fit-content",
                    padding: "6px 10px",
                    borderRadius: 999,
                    border: "1px solid rgba(127,127,127,0.2)",
                    background: "rgba(127,127,127,0.08)",
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                  }}
                >
                  CodexForge Brain
                </span>

                <Link href="/ai" style={buttonStyle()}>
                  Open workspace
                </Link>
                <Link href="/history" style={buttonStyle()}>
                  Activity
                </Link>
              </div>

              <div style={{ display: "grid", gap: 6 }}>
                <h1
                  style={{
                    fontSize: "clamp(1.8rem, 2.8vw, 3rem)",
                    lineHeight: 1.05,
                  }}
                >
                  Local graph memory workspace
                </h1>
                <p
                  style={{
                    maxWidth: 980,
                    opacity: 0.82,
                    fontSize: 15,
                    lineHeight: 1.6,
                  }}
                >
                  This is the CodexForge memory control surface. Inspect graph
                  nodes and relationships, review saved context, promote useful
                  memory, and prepare context to send back into the main workspace.
                </p>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 10,
                justifyContent: "flex-end",
              }}
            >
              <button type="button" onClick={refreshGraph} style={buttonStyle()}>
                Refresh
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
            </div>
          </div>

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
              }}
            >
              {error}
            </div>
          ) : null}
        </header>

        {!graph || !stats ? (
          <div style={panelStyle()}>
            <p style={{ opacity: 0.8 }}>Loading brain graph'</p>
          </div>
        ) : (
          <>
            <section
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: 14,
                marginBottom: 18,
              }}
            >
              <StatCard label="Nodes" value={String(stats.nodeCount)} />
              <StatCard label="Edges" value={String(stats.edgeCount)} />
              <StatCard label="Active" value={String(stats.activeCount)} />
              <StatCard label="Pinned" value={String(stats.pinnedCount)} />
              <StatCard label="Archived" value={String(stats.archivedCount)} />
              <StatCard label="Last updated" value={stats.updatedAtLabel} />
            </section>
            <BrainGraphView
              graph={graph}
              selectedNodeId={selectedNodeId}
              onSelectNode={setSelectedNodeId}
            />

            <section
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(320px, 430px) minmax(0, 1fr)",
                gap: 18,
                alignItems: "start",
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
                  overflow: "hidden",
                }}
              >
                <div style={{ display: "grid", gap: 12 }}>
                  <div>
                    <h2 style={{ fontSize: 18, marginBottom: 6 }}>
                      Graph explorer
                    </h2>
                    <p style={{ fontSize: 13, opacity: 0.72 }}>
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
                      placeholder="Search id, label, text, goal, file path'"
                      style={inputStyle}
                    />
                  </label>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
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
                        {kinds.map((kind) => (
                          <option key={kind} value={kind}>
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
                        whiteSpace: "nowrap",
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
                        whiteSpace: "nowrap",
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
                  <div style={{ fontSize: 13, lineHeight: 1.6, opacity: 0.82 }}>
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
                    style={{
                      overflow: "auto",
                      display: "grid",
                      gap: 10,
                      paddingRight: 4,
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
                              <div style={{ display: "grid", gap: 4 }}>
                                <strong style={{ fontSize: 14 }}>{label}</strong>
                                <span style={{ fontSize: 12, opacity: 0.72 }}>
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
                              }}
                            >
                              <span>{status}</span>
                              <span>'</span>
                              <span>{importance}</span>
                              <span>'</span>
                              <span>{neighbors} links</span>
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
                        <div style={{ display: "grid", gap: 8 }}>
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

                          <div style={{ display: "grid", gap: 5 }}>
                            <h2 style={{ fontSize: "clamp(1.3rem, 2vw, 2rem)" }}>
                              {getNodePrimaryLabel(selectedNode)}
                            </h2>
                            <p
                              style={{
                                fontFamily:
                                  "var(--font-geist-mono), ui-monospace, SFMono-Regular, monospace",
                                fontSize: 12,
                                opacity: 0.68,
                                wordBreak: "break-all",
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
                              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                              gap: 10,
                            }}
                          >
                            {selectedNodeDataLines.map((item) => (
                              <div
                                key={item.key}
                                style={{
                                  border: "1px solid rgba(127,127,127,0.14)",
                                  background: "rgba(127,127,127,0.04)",
                                  borderRadius: 14,
                                  padding: 12,
                                  display: "grid",
                                  gap: 6,
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
                                    wordBreak: "break-word",
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
                          gridTemplateColumns: "minmax(0, 1.2fr) minmax(320px, 0.8fr)",
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
                    gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
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
                              }}
                            >
                              <strong style={{ fontSize: 14 }}>
                                {getNodePrimaryLabel(neighbor)}
                              </strong>
                              <span style={{ fontSize: 12, opacity: 0.72 }}>
                                {formatKindLabel(neighbor.kind)}
                              </span>
                              {getNodeDetail(neighbor) ? (
                                <span style={{ fontSize: 13, opacity: 0.8 }}>
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
                            }}
                          >
                            <strong style={{ fontSize: 14 }}>{edge.kind}</strong>
                            <span
                              style={{
                                fontFamily:
                                  "var(--font-geist-mono), ui-monospace, SFMono-Regular, monospace",
                                fontSize: 12,
                                opacity: 0.76,
                                wordBreak: "break-all",
                              }}
                            >
                              {edge.id}
                            </span>
                            <span style={{ fontSize: 13, opacity: 0.82 }}>
                              {summarizeEdge(edge, selectedNode.id, nodeLookup)}
                            </span>
                            {edge.label ? (
                              <span style={{ fontSize: 12, opacity: 0.7 }}>
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
                      {stats.kindBreakdown.map((entry) => (
                        <div
                          key={entry.kind}
                          style={{
                            border: "1px solid rgba(127,127,127,0.18)",
                            background: "rgba(127,127,127,0.05)",
                            borderRadius: 16,
                            padding: 14,
                            display: "grid",
                            gap: 6,
                          }}
                        >
                          <strong>{formatKindLabel(entry.kind)}</strong>
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
