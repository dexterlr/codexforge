"use client";

import { useMemo, useState, type CSSProperties } from "react";
import type { CodexForgeBrainGraph } from "@/lib/codexforge/brain/graph";
import {
  buildKnowledgeTopology,
  buildRuntimeHealthDashboard,
  buildRuntimeHealthFixtureDashboard,
  runBrainRuntimeDiagnostics,
  summarizeBrainRuntimeDiagnostics,
  summarizeCognitiveSystemStatus,
  type CodexForgeBrainPanelDataAdapterResult,
  type CodexForgeRuntimeHealthSignal,
} from "@/lib/codexforge/brain/runtime";
import { BrainHealthInspector } from "./brain-health-inspector";
import { BrainSubsystemStatusCard } from "./brain-subsystem-status-card";
import { BrainReadOnlyBadge, BrainSectionHeader } from "./ui";
import { BrainLiveDataBoundary } from "./brain-live-data-boundary";

type BrainRuntimeHealthPanelProps = {
  graph?: CodexForgeBrainGraph;
  panelData?: CodexForgeBrainPanelDataAdapterResult;
};

export function BrainRuntimeHealthPanel({
  graph,
  panelData,
}: BrainRuntimeHealthPanelProps) {
  const dashboard = useMemo(() => {
    if (!graph || graph.nodes.length === 0) {
      return buildRuntimeHealthFixtureDashboard();
    }

    const diagnostics = runBrainRuntimeDiagnostics({
      graph,
      now: graph.meta.updatedAt,
      memoryCandidates: graph.nodes.filter((node) =>
        ["memory", "note", "decision", "concept"].includes(node.kind)
      ),
    });
    const topology = buildKnowledgeTopology({ graph, events: [], now: graph.meta.updatedAt });

    return buildRuntimeHealthDashboard({
      generatedAt: graph.meta.updatedAt,
      runtimeDiagnostics: diagnostics,
      topologySummary: topology.summary,
      smokeCoverageDescriptors: [
        { id: "brain-runtime", present: true, coverageLevel: 1, reason: "Brain runtime smoke descriptor supplied." },
        { id: "brain-command-center", present: true, coverageLevel: 1, reason: "Brain command center smoke descriptor supplied." },
        { id: "brain-recommendations", present: true, coverageLevel: 1, reason: "Brain recommendations smoke descriptor supplied." },
        { id: "brain-semantic-topology", present: true, coverageLevel: 1, reason: "Brain semantic topology smoke descriptor supplied." },
      ],
    });
  }, [graph]);
  const [selectedSignalId, setSelectedSignalId] = useState<string | null>(null);
  const selectedSignal =
    dashboard.signals.find((signal) => signal.id === selectedSignalId) ??
    dashboard.signals[0] ??
    null;

  return (
    <section
      data-codexforge-brain-runtime-health-panel
      data-codexforge-brain-overflow-guard
      style={panelStyle}
    >
      <BrainSectionHeader
        eyebrow="Runtime health dashboard"
        title="Cognitive runtime status"
        description="Read-only contract, diagnostics, subsystem, and next-safe-action telemetry."
        status={
          <div style={statusRowStyle}>
            <BrainLiveDataBoundary panelId="runtime-health" panelData={panelData} />
            <BrainReadOnlyBadge />
          </div>
        }
      />

      <div style={summaryGridStyle}>
        <Metric
          label="Health score"
          value={String(dashboard.healthScore)}
          marker="data-codexforge-brain-runtime-health-score"
        />
        <Metric label="State" value={dashboard.status} />
        <Metric
          label="Contract"
          value={dashboard.runtimeContract?.version ?? "fixture"}
          marker="data-codexforge-brain-runtime-contract-status"
        />
        <Metric
          label="Diagnostics"
          value={summarizeBrainRuntimeDiagnostics()}
          marker="data-codexforge-brain-runtime-diagnostic-status"
        />
      </div>

      <div style={calloutStyle}>{summarizeCognitiveSystemStatus(dashboard)}</div>

      <div data-codexforge-brain-runtime-health-next-action style={nextActionStyle}>
        <strong>{dashboard.summary.nextSafeAction.label}</strong>
        <span>{dashboard.summary.nextSafeAction.detail}</span>
      </div>

      <div style={layoutStyle}>
        <div style={mainStyle}>
          <section data-codexforge-brain-overflow-guard style={sectionStyle}>
            <div style={eyebrowStyle}>Top health signals</div>
            <div style={signalGridStyle}>
              {dashboard.signals.slice(0, 6).map((signal) => (
                <SignalButton
                  key={signal.id}
                  signal={signal}
                  active={selectedSignal?.id === signal.id}
                  onSelect={setSelectedSignalId}
                />
              ))}
            </div>
          </section>

          <section data-codexforge-brain-readiness-grid style={sectionStyle}>
            <div style={eyebrowStyle}>Subsystem hot path</div>
            <div style={subsystemGridStyle}>
              {dashboard.subsystemReadiness.slice(0, 4).map((subsystem) => (
                <BrainSubsystemStatusCard key={subsystem.id} subsystem={subsystem} />
              ))}
            </div>
          </section>
        </div>

        <BrainHealthInspector signal={selectedSignal} safety={dashboard.safetyPosture} />
      </div>
    </section>
  );
}

function Metric({
  label,
  value,
  marker,
}: {
  label: string;
  value: string;
  marker?: string;
}) {
  const markerProps = marker ? { [marker]: true } : {};
  return (
    <div {...markerProps} style={metricStyle}>
      <span style={eyebrowStyle}>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function SignalButton({
  signal,
  active,
  onSelect,
}: {
  signal: CodexForgeRuntimeHealthSignal;
  active: boolean;
  onSelect: (id: string) => void;
}) {
  return (
    <button
      type="button"
      data-codexforge-brain-runtime-health-signal
      onClick={() => onSelect(signal.id)}
      style={{
        ...signalStyle,
        borderColor: active ? "rgba(125,211,252,0.44)" : "rgba(255,255,255,0.09)",
      }}
    >
      <div style={signalHeaderStyle}>
        <strong>{signal.title}</strong>
        <span>{signal.severity}</span>
      </div>
      <span>{signal.detail}</span>
    </button>
  );
}

const panelStyle: CSSProperties = {
  display: "grid",
  gap: 14,
  padding: 16,
  borderRadius: 18,
  border: "1px solid rgba(125,211,252,0.24)",
  background: "radial-gradient(circle at 18% 0%, rgba(14,165,233,0.22), transparent 34%), linear-gradient(145deg, rgba(15,23,42,0.9), rgba(2,6,23,0.72))",
  minWidth: 0,
  maxHeight: 680,
  overflow: "auto",
  boxShadow: "0 18px 60px rgba(2,6,23,0.22), inset 0 1px 0 rgba(255,255,255,0.04)",
};

const statusRowStyle: CSSProperties = {
  display: "flex",
  gap: 8,
  alignItems: "center",
  flexWrap: "wrap",
};

const summaryGridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 170px), 1fr))",
  gap: 8,
};

const metricStyle: CSSProperties = {
  display: "grid",
  gap: 5,
  padding: 10,
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.09)",
  background: "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.025))",
  minWidth: 0,
  maxWidth: "100%",
  fontSize: 12,
  lineHeight: 1.35,
  overflowWrap: "anywhere",
  wordBreak: "break-word",
};

const calloutStyle: CSSProperties = {
  padding: 11,
  borderRadius: 8,
  border: "1px solid rgba(125,211,252,0.18)",
  background: "rgba(14,165,233,0.08)",
  fontSize: 12,
  lineHeight: 1.5,
  minWidth: 0,
  maxWidth: "100%",
  overflowWrap: "anywhere",
  wordBreak: "break-word",
};

const nextActionStyle: CSSProperties = {
  display: "grid",
  gap: 5,
  padding: 11,
  borderRadius: 8,
  border: "1px solid rgba(34,197,94,0.18)",
  background: "rgba(34,197,94,0.08)",
  color: "rgba(220,252,231,0.92)",
  fontSize: 12,
  lineHeight: 1.5,
  minWidth: 0,
  maxWidth: "100%",
  overflowWrap: "anywhere",
  wordBreak: "break-word",
};

const layoutStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))",
  gap: 12,
  alignItems: "start",
};

const mainStyle: CSSProperties = {
  display: "grid",
  gap: 12,
  minWidth: 0,
};

const sectionStyle: CSSProperties = {
  display: "grid",
  gap: 8,
  maxHeight: 340,
  overflow: "auto",
  minWidth: 0,
};

const signalGridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
  gap: 8,
};

const signalStyle: CSSProperties = {
  display: "grid",
  gap: 6,
  padding: 10,
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.09)",
  background: "rgba(255,255,255,0.045)",
  color: "inherit",
  textAlign: "left",
  cursor: "pointer",
  fontSize: 11,
  lineHeight: 1.45,
  minWidth: 0,
  maxWidth: "100%",
  overflowWrap: "anywhere",
  wordBreak: "break-word",
};

const signalHeaderStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: 8,
  flexWrap: "wrap",
};

const subsystemGridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
  gap: 8,
};

const eyebrowStyle: CSSProperties = {
  fontSize: 10,
  fontWeight: 900,
  letterSpacing: 0,
  textTransform: "uppercase",
  color: "rgba(186,230,253,0.86)",
};
