"use client";

import type { CSSProperties } from "react";
import type {
  CodexForgeBrainFocusSignal,
  CodexForgeBrainFocusTarget,
} from "@/lib/codexforge/brain/runtime";

type BrainFocusInspectorProps = {
  target: CodexForgeBrainFocusTarget;
  signals: readonly CodexForgeBrainFocusSignal[];
};

export function BrainFocusInspector({ target, signals }: BrainFocusInspectorProps) {
  const orderedSignals = [...signals].sort((a, b) => {
    if (b.relevance !== a.relevance) return b.relevance - a.relevance;
    return a.id.localeCompare(b.id);
  });

  return (
    <aside data-codexforge-brain-focus-inspector style={inspectorStyle}>
      <div>
        <div style={eyebrowStyle}>Focus inspector</div>
        <h3 style={titleStyle}>{target.label}</h3>
        <p style={copyStyle}>{target.summary}</p>
      </div>

      <div style={metaGridStyle}>
        <Metric label="Kind" value={target.kind} />
        <Metric label="Severity" value={target.severity} />
        <Metric label="Relevance" value={target.relevance.toFixed(2)} />
        <Metric label="Status" value={target.status} />
      </div>

      <div style={boundaryStyle}>
        <strong>Read-only:</strong> {target.readOnly ? "true" : "false"} / <strong>Approval:</strong>{" "}
        {target.approvalRequired ? "required" : "not required"}
      </div>

      <section style={sectionStyle}>
        <div style={eyebrowStyle}>Evidence and reasons</div>
        <List items={[...target.reasons, ...target.evidence].slice(0, 8)} />
      </section>

      <section style={sectionStyle}>
        <div style={eyebrowStyle}>Related signals</div>
        <div style={signalListStyle}>
          {orderedSignals.slice(0, 8).map((signal) => (
            <div
              key={signal.id}
              style={signalStyle}
              data-codexforge-brain-focus-signal-kind={signal.kind}
              data-codexforge-brain-focus-signal-readonly={signal.readOnly ? "true" : "false"}
            >
              <div style={signalHeaderStyle}>
                <strong>{signal.label}</strong>
                <span>{signal.kind}</span>
              </div>
              <span>{signal.summary}</span>
              <span>
                relevance {signal.relevance.toFixed(2)} / approval{" "}
                {signal.approvalRequired ? "required" : "clear"}
              </span>
              <span>{signal.nextSafeDrilldown}</span>
            </div>
          ))}
        </div>
      </section>

      <div style={nextStyle}>{target.nextSafeDrilldown}</div>
    </aside>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div style={metricStyle}>
      <span style={eyebrowStyle}>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function List({ items }: { items: readonly string[] }) {
  if (items.length === 0) {
    return <span style={copyStyle}>No evidence attached.</span>;
  }

  return (
    <div style={listStyle}>
      {items.map((item) => (
        <span key={item}>{item}</span>
      ))}
    </div>
  );
}

const inspectorStyle: CSSProperties = {
  display: "grid",
  gap: 12,
  padding: 14,
  borderRadius: 8,
  border: "1px solid rgba(125,211,252,0.20)",
  background: "rgba(2,6,23,0.34)",
  minWidth: 0,
};

const metaGridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: 8,
};

const metricStyle: CSSProperties = {
  display: "grid",
  gap: 4,
  padding: 9,
  borderRadius: 8,
  border: "1px solid rgba(255,255,255,0.09)",
  background: "rgba(255,255,255,0.04)",
  minWidth: 0,
  fontSize: 11,
};

const boundaryStyle: CSSProperties = {
  padding: 10,
  borderRadius: 8,
  border: "1px solid rgba(251,191,36,0.18)",
  background: "rgba(251,191,36,0.08)",
  color: "rgba(254,243,199,0.92)",
  fontSize: 12,
  lineHeight: 1.45,
};

const sectionStyle: CSSProperties = {
  display: "grid",
  gap: 8,
};

const listStyle: CSSProperties = {
  display: "grid",
  gap: 5,
  color: "rgba(226,232,240,0.72)",
  fontSize: 11,
  lineHeight: 1.35,
};

const signalListStyle: CSSProperties = {
  display: "grid",
  gap: 8,
};

const signalStyle: CSSProperties = {
  display: "grid",
  gap: 5,
  padding: 9,
  borderRadius: 8,
  border: "1px solid rgba(255,255,255,0.09)",
  background: "rgba(255,255,255,0.04)",
  color: "rgba(226,232,240,0.76)",
  fontSize: 11,
  lineHeight: 1.4,
};

const signalHeaderStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: 8,
  color: "rgba(240,249,255,0.92)",
};

const nextStyle: CSSProperties = {
  padding: 10,
  borderRadius: 8,
  border: "1px solid rgba(34,197,94,0.18)",
  background: "rgba(34,197,94,0.08)",
  color: "rgba(220,252,231,0.92)",
  fontSize: 12,
  lineHeight: 1.45,
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

const copyStyle: CSSProperties = {
  margin: "6px 0 0",
  color: "rgba(226,232,240,0.72)",
  fontSize: 12,
  lineHeight: 1.5,
};
