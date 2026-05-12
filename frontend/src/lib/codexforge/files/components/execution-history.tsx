"use client";

import type { CSSProperties } from "react";
import type { CodexForgeFileNode } from "../types";

export function ExecutionHistory({ file }: { file: CodexForgeFileNode }) {
  return (
    <section data-codexforge-execution-history style={panel}>
      <div style={eyebrow}>Execution history</div>
      <div style={list}>
        {file.executionHistory.map((item) => (
          <article key={item.id} style={row}>
            <div style={rowTop}>
              <strong>{item.status}</strong>
              <span>{item.timestamp.slice(0, 10)}</span>
            </div>
            <code style={command}>{item.command}</code>
            <p style={body}>{item.summary}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

const panel: CSSProperties = {
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(255,255,255,0.04)",
  borderRadius: 8,
  padding: 12,
  display: "grid",
  gap: 10,
};

const eyebrow: CSSProperties = {
  fontSize: 11,
  fontWeight: 900,
  textTransform: "uppercase",
  opacity: 0.62,
};

const list: CSSProperties = {
  display: "grid",
  gap: 8,
};

const row: CSSProperties = {
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(0,0,0,0.18)",
  borderRadius: 8,
  padding: 10,
  display: "grid",
  gap: 6,
};

const rowTop: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: 8,
  fontSize: 12,
  textTransform: "uppercase",
};

const command: CSSProperties = {
  fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
  fontSize: 11,
  opacity: 0.78,
  overflowWrap: "anywhere",
};

const body: CSSProperties = {
  margin: 0,
  fontSize: 12,
  lineHeight: 1.4,
  opacity: 0.72,
};
