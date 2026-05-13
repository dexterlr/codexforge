"use client";

import { useMemo, useState, type CSSProperties } from "react";
import type { CodexForgeBrainGraph } from "@/lib/codexforge/brain/graph";
import {
  buildBrainFocusModel,
  type CodexForgeBrainFocusLens,
} from "@/lib/codexforge/brain/runtime";
import { BrainFocusBreadcrumbs } from "./brain-focus-breadcrumbs";
import { BrainFocusInspector } from "./brain-focus-inspector";
import { BrainFocusLensCard } from "./brain-focus-lens-card";

type BrainFocusModePanelProps = {
  graph?: CodexForgeBrainGraph;
  selectedNodeId?: string | null;
};

export function BrainFocusModePanel({ graph, selectedNodeId }: BrainFocusModePanelProps) {
  const model = useMemo(
    () => buildBrainFocusModel({ graph, selectedNodeId, now: graph?.meta.updatedAt }),
    [graph, selectedNodeId]
  );
  const [selectedLensId, setSelectedLensId] = useState<string | null>(null);
  const selectedLens =
    model.lenses.find((lens) => lens.id === selectedLensId) ?? model.lenses[0] ?? null;
  const inspectorSignals = selectedLens?.signals ?? model.neighborhood.highlights;

  return (
    <section
      data-codexforge-brain-focus-mode-panel
      data-codexforge-brain-focus-readonly="true"
      style={panelStyle}
    >
      <div style={headerStyle}>
        <div>
          <div style={eyebrowStyle}>Brain focus mode</div>
          <h2 style={titleStyle}>Cognitive navigation focus</h2>
        </div>
        <span style={pillStyle}>read-only</span>
      </div>

      <div data-codexforge-brain-focus-summary style={summaryStyle}>
        <SummaryMetric label="Focus target" value={model.focusTarget.label} />
        <SummaryMetric label="Signals" value={String(model.summary.signalCount)} />
        <SummaryMetric label="Lenses" value={String(model.summary.lensCount)} />
        <SummaryMetric label="Paths" value={String(model.summary.pathCount)} />
      </div>

      <BrainFocusBreadcrumbs breadcrumbs={model.breadcrumbs} />

      <div data-codexforge-brain-focus-next-drilldown style={nextStyle}>
        <strong>Next safe drilldown</strong>
        <span>{model.summary.nextSafeDrilldown}</span>
      </div>

      <div style={layoutStyle}>
        <div style={mainStyle}>
          <section style={sectionStyle}>
            <div style={eyebrowStyle}>Top focus lenses</div>
            <div style={lensGridStyle}>
              {model.lenses.slice(0, 8).map((lens: CodexForgeBrainFocusLens) => (
                <BrainFocusLensCard
                  key={lens.id}
                  lens={lens}
                  active={selectedLens?.id === lens.id}
                  onInspect={setSelectedLensId}
                />
              ))}
            </div>
          </section>

          <section data-codexforge-brain-focus-neighborhood style={sectionStyle}>
            <div style={eyebrowStyle}>Neighborhood highlights</div>
            <div style={highlightGridStyle}>
              {model.neighborhood.highlights.slice(0, 10).map((signal) => (
                <div key={signal.id} style={highlightStyle}>
                  <strong>{signal.label}</strong>
                  <span>{signal.kind}</span>
                  <span>{signal.summary}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <BrainFocusInspector target={model.focusTarget} signals={inspectorSignals} />
      </div>
    </section>
  );
}

function SummaryMetric({ label, value }: { label: string; value: string }) {
  return (
    <div style={metricStyle}>
      <span style={eyebrowStyle}>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

const panelStyle: CSSProperties = {
  display: "grid",
  gap: 14,
  padding: 16,
  borderRadius: 8,
  border: "1px solid rgba(125,211,252,0.22)",
  background: "radial-gradient(circle at 18% 0%, rgba(14,165,233,0.20), transparent 34%), rgba(15,23,42,0.86)",
};

const headerStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: 12,
  alignItems: "start",
};

const summaryStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 140px), 1fr))",
  gap: 8,
};

const metricStyle: CSSProperties = {
  display: "grid",
  gap: 5,
  padding: 10,
  borderRadius: 8,
  border: "1px solid rgba(255,255,255,0.09)",
  background: "rgba(255,255,255,0.04)",
  minWidth: 0,
  fontSize: 12,
};

const nextStyle: CSSProperties = {
  display: "grid",
  gap: 5,
  padding: 11,
  borderRadius: 8,
  border: "1px solid rgba(34,197,94,0.18)",
  background: "rgba(34,197,94,0.08)",
  color: "rgba(220,252,231,0.92)",
  fontSize: 12,
  lineHeight: 1.5,
};

const layoutStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "minmax(0, 1fr) minmax(280px, 0.34fr)",
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
};

const lensGridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))",
  gap: 10,
};

const highlightGridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 210px), 1fr))",
  gap: 8,
};

const highlightStyle: CSSProperties = {
  display: "grid",
  gap: 5,
  padding: 10,
  borderRadius: 8,
  border: "1px solid rgba(255,255,255,0.09)",
  background: "rgba(255,255,255,0.04)",
  color: "rgba(226,232,240,0.75)",
  fontSize: 11,
  lineHeight: 1.4,
};

const pillStyle: CSSProperties = {
  borderRadius: 999,
  padding: "3px 7px",
  background: "rgba(14,165,233,0.14)",
  color: "rgba(186,230,253,0.92)",
  fontSize: 10,
  fontWeight: 900,
};

const eyebrowStyle: CSSProperties = {
  fontSize: 10,
  fontWeight: 900,
  letterSpacing: 0,
  textTransform: "uppercase",
  color: "rgba(186,230,253,0.86)",
};

const titleStyle: CSSProperties = {
  margin: "4px 0 0",
  fontSize: 18,
  lineHeight: 1.2,
};
