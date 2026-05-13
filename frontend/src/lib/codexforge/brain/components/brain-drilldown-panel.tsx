"use client";

import { useMemo, type CSSProperties } from "react";
import type { CodexForgeBrainGraph } from "@/lib/codexforge/brain/graph";
import {
  buildBrainFocusModel,
  summarizeBrainDrilldownPath,
} from "@/lib/codexforge/brain/runtime";
import { BrainFocusBreadcrumbs } from "./brain-focus-breadcrumbs";
import { BrainFocusInspector } from "./brain-focus-inspector";

type BrainDrilldownPanelProps = {
  graph?: CodexForgeBrainGraph;
  selectedNodeId?: string | null;
};

export function BrainDrilldownPanel({ graph, selectedNodeId }: BrainDrilldownPanelProps) {
  const model = useMemo(
    () => buildBrainFocusModel({ graph, selectedNodeId, now: graph?.meta.updatedAt }),
    [graph, selectedNodeId]
  );

  return (
    <section
      data-codexforge-brain-drilldown-panel
      data-codexforge-brain-drilldown-readonly="true"
      style={panelStyle}
    >
      <div style={headerStyle}>
        <div>
          <div style={eyebrowStyle}>Cognitive drilldown</div>
          <h2 style={titleStyle}>Read-only navigation paths</h2>
        </div>
        <span style={pillStyle}>no execution</span>
      </div>

      <BrainFocusBreadcrumbs breadcrumbs={model.breadcrumbs} />

      <div style={layoutStyle}>
        <div style={mainStyle}>
          {model.drilldownPaths.map((path) => (
            <section
              key={path.id}
              data-codexforge-brain-drilldown-path
              style={pathStyle}
            >
              <div style={pathHeaderStyle}>
                <div>
                  <div style={eyebrowStyle}>{path.id}</div>
                  <h3 style={pathTitleStyle}>{path.label}</h3>
                </div>
                <span style={pathPillStyle}>{path.approvalRequired ? "approval boundary" : "read-only"}</span>
              </div>
              <p style={copyStyle}>{summarizeBrainDrilldownPath(path)}</p>
              <div style={surfaceGridStyle}>
                {path.relatedSurfaces.map((surface) => (
                  <span
                    key={`${path.id}:${surface}`}
                    data-codexforge-brain-drilldown-related-surface
                    style={surfaceStyle}
                  >
                    {surface}
                  </span>
                ))}
              </div>
              <div style={stepGridStyle}>
                {path.steps.map((step) => (
                  <div
                    key={step.id}
                    data-codexforge-brain-drilldown-step
                    style={stepStyle}
                  >
                    <div style={stepHeaderStyle}>
                      <strong>{step.depth + 1}. {step.label}</strong>
                      <span>{step.kind}</span>
                    </div>
                    <span>{step.summary}</span>
                    <span>{step.whyItMatters}</span>
                    <span>{step.nextSafeDrilldown}</span>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <BrainFocusInspector
          target={model.focusTarget}
          signals={model.neighborhood.highlights}
        />
      </div>
    </section>
  );
}

const panelStyle: CSSProperties = {
  display: "grid",
  gap: 14,
  padding: 16,
  borderRadius: 8,
  border: "1px solid rgba(125,211,252,0.22)",
  background: "radial-gradient(circle at 20% 0%, rgba(14,165,233,0.18), transparent 32%), rgba(15,23,42,0.84)",
};

const headerStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: 12,
  alignItems: "start",
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

const pathStyle: CSSProperties = {
  display: "grid",
  gap: 10,
  padding: 12,
  borderRadius: 8,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(255,255,255,0.045)",
};

const pathHeaderStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: 12,
  alignItems: "start",
};

const pathTitleStyle: CSSProperties = {
  margin: "4px 0 0",
  fontSize: 15,
  lineHeight: 1.25,
};

const pathPillStyle: CSSProperties = {
  borderRadius: 999,
  padding: "3px 7px",
  background: "rgba(251,191,36,0.12)",
  color: "rgba(254,243,199,0.92)",
  fontSize: 10,
  fontWeight: 900,
  whiteSpace: "nowrap",
};

const surfaceGridStyle: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 6,
};

const surfaceStyle: CSSProperties = {
  borderRadius: 999,
  padding: "4px 8px",
  border: "1px solid rgba(125,211,252,0.16)",
  background: "rgba(14,165,233,0.08)",
  color: "rgba(224,242,254,0.86)",
  fontSize: 10,
  fontWeight: 800,
};

const stepGridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 210px), 1fr))",
  gap: 8,
};

const stepStyle: CSSProperties = {
  display: "grid",
  gap: 5,
  padding: 9,
  borderRadius: 8,
  border: "1px solid rgba(255,255,255,0.09)",
  background: "rgba(255,255,255,0.04)",
  color: "rgba(226,232,240,0.74)",
  fontSize: 11,
  lineHeight: 1.4,
};

const stepHeaderStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: 8,
  color: "rgba(240,249,255,0.94)",
};

const copyStyle: CSSProperties = {
  margin: 0,
  color: "rgba(226,232,240,0.72)",
  fontSize: 12,
  lineHeight: 1.5,
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
