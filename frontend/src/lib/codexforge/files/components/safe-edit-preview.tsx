"use client";

import type { CSSProperties } from "react";
import type { CodexForgeFileAction, CodexForgeFileNode } from "../types";

type SafeEditPreviewProps = {
  file: CodexForgeFileNode;
  action: CodexForgeFileAction;
};

export function SafeEditPreview({ file, action }: SafeEditPreviewProps) {
  const preview = file.safeEditPreview;

  return (
    <section data-codexforge-safe-edit-preview style={panel}>
      <div style={header}>
        <div>
          <div style={eyebrow}>Safe edit preview</div>
          <h2 style={title}>{action}</h2>
        </div>
        <span style={lock}>preview-only</span>
      </div>

      <p style={body}>
        {preview.summary} This surface is preview-only: no overwrite happens
        without preview and approval, and Phase 3 does not mutate project files.
      </p>

      <div style={workflow}>
        <strong>Future guarded workflow</strong>
        <span>inspect -&gt; plan -&gt; preview diff -&gt; approve -&gt; apply via guarded tool</span>
      </div>

      <div style={grid}>
        <HintBlock title="Plan" items={preview.proposedSteps} />
        <HintBlock title="Risk" items={preview.riskHints} />
        <HintBlock title="Rollback" items={preview.rollbackHints} />
        <HintBlock title="Tests" items={preview.testHints} />
      </div>
    </section>
  );
}

function HintBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div style={block}>
      <h3 style={blockTitle}>{title}</h3>
      <ul style={list}>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

const panel: CSSProperties = {
  border: "1px solid rgba(16,185,129,0.24)",
  background: "linear-gradient(180deg, rgba(16,185,129,0.10), rgba(255,255,255,0.04))",
  borderRadius: 8,
  padding: 14,
  display: "grid",
  gap: 12,
};

const header: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: 12,
  alignItems: "flex-start",
};

const eyebrow: CSSProperties = {
  fontSize: 11,
  fontWeight: 900,
  textTransform: "uppercase",
  opacity: 0.68,
};

const title: CSSProperties = {
  margin: "4px 0 0",
  fontSize: 16,
  textTransform: "capitalize",
};

const lock: CSSProperties = {
  border: "1px solid rgba(16,185,129,0.38)",
  background: "rgba(16,185,129,0.13)",
  color: "#A7F3D0",
  borderRadius: 8,
  padding: "6px 9px",
  fontSize: 11,
  fontWeight: 900,
  textTransform: "uppercase",
};

const body: CSSProperties = {
  margin: 0,
  fontSize: 13,
  lineHeight: 1.55,
  opacity: 0.86,
};

const grid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 160px), 1fr))",
  gap: 8,
};

const workflow: CSSProperties = {
  border: "1px solid rgba(16,185,129,0.22)",
  background: "rgba(0,0,0,0.18)",
  borderRadius: 8,
  padding: 10,
  display: "grid",
  gap: 5,
  fontSize: 12,
  lineHeight: 1.5,
  overflowWrap: "anywhere",
};

const block: CSSProperties = {
  border: "1px solid rgba(255,255,255,0.11)",
  background: "rgba(0,0,0,0.18)",
  borderRadius: 8,
  padding: 10,
};

const blockTitle: CSSProperties = {
  margin: "0 0 7px",
  fontSize: 12,
};

const list: CSSProperties = {
  margin: 0,
  paddingLeft: 16,
  fontSize: 12,
  lineHeight: 1.45,
  opacity: 0.78,
};
