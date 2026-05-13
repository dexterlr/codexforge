"use client";

import type { CSSProperties } from "react";
import { calculateFileRisk } from "../file-risk";
import { inferSafeNextActions } from "../file-intelligence";
import type { CodexForgeFileNode } from "../types";
import { FileRiskBadge } from "./file-risk-badge";

type FileInspectorProps = {
  file: CodexForgeFileNode;
};

export function FileInspector({ file }: FileInspectorProps) {
  const risk = calculateFileRisk(file);
  const safeNextAction = inferSafeNextActions(file)[0] ?? "summarize";
  const suggestedValidation = file.kind === "smoke"
    ? "Run this smoke script after approved edits."
    : file.path.includes("/files/")
      ? "Run build plus Files Command Center smoke after approved edits."
      : file.path.includes("/app/api/")
        ? "Run build, server smoke, and nearest route validation after approved edits."
        : "Run build and the nearest CodexForge smoke after approved edits.";

  return (
    <section data-codexforge-file-inspector style={panel}>
      <div style={top}>
        <div style={{ minWidth: 0 }}>
          <div style={eyebrow}>Inspector</div>
          <h2 style={title}>{file.name}</h2>
          <p style={path}>{file.path}</p>
        </div>
        <FileRiskBadge file={file} />
      </div>

      <p style={summary}>{file.summary}</p>

      <div style={metrics}>
        <Metric label="Owner" value={file.ownerArea} />
        <Metric label="Kind" value={file.kind} />
        <Metric label="Type" value={file.extension || "text"} />
        <Metric label="Lines" value={String(file.lineCount)} />
        <Metric label="Risk" value={`${risk.level} ${risk.score}/100`} />
        <Metric label="Mode" value="read-only" />
      </div>

      <div style={block}>
        <h3 style={heading}>Architecture role</h3>
        <p style={body}>{file.architectureRole}</p>
      </div>

      <div style={block}>
        <h3 style={heading}>Why it matters</h3>
        <p style={body}>{risk.summary}</p>
      </div>

      <div style={metrics}>
        <Metric label="Safe next action" value={safeNextAction} />
        <Metric label="Suggested validation" value={suggestedValidation} />
      </div>

      <div style={block}>
        <h3 style={heading}>Signals</h3>
        <div style={signalList}>
          {risk.signals.map((signal) => (
            <div key={signal.id} style={signalRow}>
              <strong>{signal.label}</strong>
              <span>{signal.reason}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={tagWrap}>
        {file.tags.map((tag) => (
          <span key={tag} style={tagPill}>
            {tag}
          </span>
        ))}
      </div>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div style={metric}>
      <span style={metricLabel}>{label}</span>
      <strong style={metricValue}>{value}</strong>
    </div>
  );
}

const panel: CSSProperties = {
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(255,255,255,0.045)",
  borderRadius: 8,
  padding: 14,
  display: "grid",
  gap: 14,
};

const top: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: 12,
};

const eyebrow: CSSProperties = {
  fontSize: 11,
  fontWeight: 900,
  textTransform: "uppercase",
  opacity: 0.62,
};

const title: CSSProperties = {
  margin: "4px 0 0",
  fontSize: 20,
};

const path: CSSProperties = {
  margin: "5px 0 0",
  fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
  fontSize: 12,
  opacity: 0.68,
  overflowWrap: "anywhere",
};

const summary: CSSProperties = {
  margin: 0,
  fontSize: 13,
  lineHeight: 1.55,
  opacity: 0.84,
};

const metrics: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 140px), 1fr))",
  gap: 8,
};

const metric: CSSProperties = {
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(0,0,0,0.18)",
  borderRadius: 8,
  padding: 10,
  minWidth: 0,
};

const metricLabel: CSSProperties = {
  display: "block",
  fontSize: 10,
  textTransform: "uppercase",
  opacity: 0.58,
  fontWeight: 800,
};

const metricValue: CSSProperties = {
  display: "block",
  marginTop: 5,
  fontSize: 12,
  overflowWrap: "anywhere",
};

const block: CSSProperties = {
  display: "grid",
  gap: 8,
};

const heading: CSSProperties = {
  margin: 0,
  fontSize: 13,
};

const body: CSSProperties = {
  margin: 0,
  fontSize: 13,
  lineHeight: 1.5,
  opacity: 0.8,
};

const signalList: CSSProperties = {
  display: "grid",
  gap: 7,
};

const signalRow: CSSProperties = {
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(255,255,255,0.035)",
  borderRadius: 8,
  padding: 9,
  display: "grid",
  gap: 4,
  fontSize: 12,
  lineHeight: 1.45,
};

const tagWrap: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 7,
};

const tagPill: CSSProperties = {
  border: "1px solid rgba(255,255,255,0.13)",
  background: "rgba(255,255,255,0.05)",
  borderRadius: 7,
  padding: "5px 8px",
  fontSize: 11,
  fontWeight: 700,
};
