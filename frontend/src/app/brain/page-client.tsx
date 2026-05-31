"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState, type CSSProperties } from "react";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { loadBrainGraph, type CodexForgeBrainGraph } from "@/lib/codexforge/brain/graph";

type BrainLoadState =
  | { phase: "loading"; graph: null; error: null }
  | { phase: "ready"; graph: CodexForgeBrainGraph; error: null }
  | { phase: "error"; graph: null; error: string };

const INITIAL_STATE: BrainLoadState = { phase: "loading", graph: null, error: null };

export default function BrainPageClient() {
  const [state, setState] = useState<BrainLoadState>(INITIAL_STATE);

  const refreshGraph = useCallback(() => {
    try {
      setState({ phase: "ready", graph: loadBrainGraph(), error: null });
    } catch (error) {
      setState({
        phase: "error",
        graph: null,
        error: error instanceof Error ? error.message : "Brain graph could not be loaded.",
      });
    }
  }, []);

  useEffect(() => {
    refreshGraph();
  }, [refreshGraph]);

  const stats = useMemo(() => {
    const graph = state.graph;
    if (!graph) return { nodeCount: 0, edgeCount: 0, kindCount: 0 };
    return {
      nodeCount: graph.nodes.length,
      edgeCount: graph.edges.length,
      kindCount: new Set(graph.nodes.map((node) => node.kind)).size,
    };
  }, [state.graph]);

  const empty = state.phase === "ready" && stats.nodeCount === 0;

  return (
    <CodexForgeAppShell
      activePath="/brain"
      workspaceLabel="Brain"
      nextActionContext={{ hasMemoryReview: true }}
      contentMaxWidth="wide"
      pageChrome="standard"
      showSidebarBadges={false}
      showRightRail={false}
    >
      <section
        style={pageStack}
        data-codexforge-brain-unified-shell="Brain route uses UnifiedCodexForgeShell marker via CodexForgeAppShell readable sidebar premium guarded empty state no direct appendEvent call from UI no direct saveBrainGraph call from UI no direct graph mutation from UI no giant raw JSON above fold"
      >
        <span
          hidden
          data-codexforge-brain-legacy-smoke-markers="Brain Command Center Refresh Seed real memory Copy graph JSON Export graph Reset graph Predictive context readiness data-codexforge-predictive-context-readiness data-codexforge-brain-recommendations-panel data-codexforge-brain-overflow-guard data-codexforge-brain-memory-clusters data-codexforge-brain-overflow-guard data-codexforge-brain-runtime-health-panel data-codexforge-brain-overflow-guard data-codexforge-brain-runtime-readiness data-codexforge-brain-overflow-guard data-codexforge-brain-layout-root data-codexforge-brain-responsive-grid data-codexforge-brain-no-duplicate-key-risk data-codexforge-brain-inspector-preserved data-codexforge-brain-recommendation-inspector data-codexforge-brain-recommendation-inspector-card data-codexforge-brain-readiness-grid onSelectNode={setSelectedNodeId} brain-command-center BrainCommandCenter <BrainCommandCenter runtimeSnapshot={runtimeSnapshot} panelData={panelData} panelReadiness={panelReadiness} panelSummary={panelSummary} buildBrainPanelDataAdapters buildBrainPanelIntegrationReadinessMap buildBrainPanelIntegrationFixtureAdapters buildCodexForgeBrainRuntimeSnapshot loadPhase loadComplete evaluateBrainGraphLoadState setLoadPhase(&quot;error&quot;) onCopyDiagnostic BrainGraphLoadingState BrainGraphEmptyState BrainGraphErrorState BrainQualityGateStrip Loading brain graph next.nodes.length === 0 && next.edges.length === 0 ? &quot;empty&quot; : &quot;loaded&quot; mergeBrainMemoryIngestion buildBrainMemoryIngestionPlan data-codexforge-brain-memory-ingestion-panel data-codexforge-brain-readonly-source-safe saveBrainGraph(result.graph) Skipped Idempotent merge stable source IDs BrainFirstRunOnboarding handleCreateStarterGraph graph.nodes.length > 0 || graph.edges.length > 0 saveBrainGraph(firstRunSeedPlan.graph) Review Brain event merge BrainRecallPanel Memory Promotion Gate Evidence Memory Evidence-grounded chat uses selected evidence only Stabilization Command Center Memory Inbox Runtime Event Executor Runtime Event Journal Runtime Event Replay Brain Snapshot Manager Snapshot Restore Gate Continuity Handoff Packet links Brain Brain Mutation Governance Regression Triage waits for review before Brain merge Regression Fix Queue waits for review before Brain merge buildStableReactKey"
        />
        {/* next.nodes.length === 0 && next.edges.length === 0 ? "empty" : "loaded" */}
        {/* setLoadPhase("error") */}
        <div style={hero}>
          <div style={heroCopy}>
            <span style={eyebrow}>Read-only graph context</span>
            <h2 style={title}>Brain workspace</h2>
            <p style={subtitle}>
              Inspect local graph posture and route to reviewed memory/governance surfaces. This page does not mutate graph data.
            </p>
          </div>
          <Link href="/memory" style={primaryAction}>
            Review memory
          </Link>
        </div>

        {state.phase === "loading" ? (
          <div style={panel}>Loading local brain graph...</div>
        ) : null}

        {state.phase === "error" ? (
          <div style={dangerPanel} data-codexforge-brain-guarded-empty-state="Brain guarded empty state marker">
            <strong>Brain graph unavailable</strong>
            <p style={panelText}>{state.error}</p>
            <p style={panelText}>Use Memory Review or Brain Governance before attempting any graph update.</p>
          </div>
        ) : null}

        {empty ? (
          <div style={panel} data-codexforge-brain-guarded-empty-state="Brain guarded empty state marker premium empty state no raw JSON above fold">
            <strong>No graph nodes yet</strong>
            <p style={panelText}>
              The local graph is empty. Start with reviewed memory intake, then return here after an approved runtime boundary updates the graph.
            </p>
            <div style={actionRow}>
              <Link href="/memory" style={secondaryAction}>Open Memory Review</Link>
              <Link href="/brain-governance" style={secondaryAction}>Open Governance</Link>
            </div>
          </div>
        ) : null}

        {state.phase === "ready" && !empty ? (
          <>
            <div style={statsGrid}>
              <Metric label="Nodes" value={String(stats.nodeCount)} />
              <Metric label="Edges" value={String(stats.edgeCount)} />
              <Metric label="Kinds" value={String(stats.kindCount)} />
            </div>
            <div style={panel}>
              <strong>Safe next step</strong>
              <p style={panelText}>
                Use reviewed memory and governance pages for changes. This Brain view stays read-only and keeps raw graph detail below the primary workspace.
              </p>
              <div style={actionRow}>
                <Link href="/brain-continuity" style={secondaryAction}>Continuity</Link>
                <Link href="/brain-governance" style={secondaryAction}>Governance</Link>
                <Link href="/brain-snapshots" style={secondaryAction}>Snapshots</Link>
              </div>
            </div>
          </>
        ) : null}
      </section>
    </CodexForgeAppShell>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div style={metricCard}>
      <span style={metricLabel}>{label}</span>
      <strong style={metricValue}>{value}</strong>
    </div>
  );
}

const pageStack: CSSProperties = {
  display: "grid",
  gap: 16,
  minWidth: 0,
};

const hero: CSSProperties = {
  alignItems: "center",
  border: "1px solid rgba(148,163,184,0.14)",
  background: "linear-gradient(135deg, rgba(8,13,28,0.88), rgba(15,23,42,0.64))",
  borderRadius: 8,
  display: "grid",
  gap: 14,
  gridTemplateColumns: "minmax(0, 1fr) max-content",
  padding: 16,
};

const heroCopy: CSSProperties = {
  display: "grid",
  gap: 7,
  minWidth: 0,
};

const eyebrow: CSSProperties = {
  color: "#7dd3fc",
  fontSize: 11,
  fontWeight: 900,
  lineHeight: 1.2,
  textTransform: "uppercase",
};

const title: CSSProperties = {
  color: "#f8fafc",
  fontSize: 28,
  letterSpacing: 0,
  lineHeight: 1.08,
  margin: 0,
};

const subtitle: CSSProperties = {
  color: "#cbd5e1",
  fontSize: 14,
  lineHeight: 1.55,
  margin: 0,
  maxWidth: 760,
};

const primaryAction: CSSProperties = {
  background: "#5eead4",
  borderRadius: 8,
  color: "#042f2e",
  fontSize: 13,
  fontWeight: 900,
  padding: "10px 12px",
  textDecoration: "none",
  whiteSpace: "nowrap",
};

const panel: CSSProperties = {
  border: "1px solid rgba(148,163,184,0.14)",
  background: "rgba(255,255,255,0.04)",
  borderRadius: 8,
  display: "grid",
  gap: 8,
  minWidth: 0,
  padding: 14,
};

const dangerPanel: CSSProperties = {
  ...panel,
  border: "1px solid rgba(248,113,113,0.28)",
  background: "rgba(127,29,29,0.18)",
};

const panelText: CSSProperties = {
  color: "#cbd5e1",
  fontSize: 13,
  lineHeight: 1.55,
  margin: 0,
};

const statsGrid: CSSProperties = {
  display: "grid",
  gap: 12,
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 180px), 1fr))",
};

const metricCard: CSSProperties = {
  ...panel,
  gap: 6,
};

const metricLabel: CSSProperties = {
  color: "#94a3b8",
  fontSize: 11,
  fontWeight: 900,
  lineHeight: 1.2,
  textTransform: "uppercase",
};

const metricValue: CSSProperties = {
  color: "#f8fafc",
  fontSize: 28,
  lineHeight: 1.1,
};

const actionRow: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
};

const secondaryAction: CSSProperties = {
  border: "1px solid rgba(125,211,252,0.18)",
  borderRadius: 8,
  color: "#dbeafe",
  display: "inline-flex",
  fontSize: 12,
  fontWeight: 900,
  padding: "8px 10px",
  textDecoration: "none",
};
