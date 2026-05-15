"use client";

import type { CSSProperties } from "react";
import type { PseudoDiffPreview } from "../preview-diff-composer-types";

type Props = {
  preview: PseudoDiffPreview;
};

export function PseudoDiffPreviewPanel({ preview }: Props) {
  return (
    <section style={card} data-codexforge-preview-diff-composer-pseudo-diff="PseudoDiffPreviewPanel renders preview-only not an applyable patch">
      <div style={row}>
        <span style={eyebrow}>Pseudo Diff Preview</span>
        <span style={badge}>not an applyable patch</span>
      </div>
      {preview.files.map((file) => (
        <article key={file.id} style={fileCard}>
          <div style={row}>
            <code style={path}>{file.filePath}</code>
            <span style={kind}>{file.changeKind}</span>
          </div>
          <p style={copy}>{file.intentSummary}</p>
          {file.pseudoHunks.map((hunk) => (
            <pre key={hunk.id} style={pre}>{hunk.intentLines.join("\n")}</pre>
          ))}
          <p style={muted}>{file.riskWarning}</p>
          <p style={muted}>{file.verificationNote}</p>
        </article>
      ))}
    </section>
  );
}

const card: CSSProperties = { border: "1px solid rgba(251,191,36,0.2)", background: "rgba(120,53,15,0.16)", borderRadius: 8, padding: 12, display: "grid", gap: 8, minWidth: 0 };
const row: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 8, alignItems: "center", flexWrap: "wrap", minWidth: 0 };
const eyebrow: CSSProperties = { color: "#fcd34d", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const badge: CSSProperties = { border: "1px solid rgba(251,191,36,0.26)", background: "rgba(251,191,36,0.12)", borderRadius: 8, padding: "4px 7px", color: "#fde68a", fontSize: 11, fontWeight: 900 };
const fileCard: CSSProperties = { border: "1px solid rgba(251,191,36,0.14)", background: "rgba(2,6,23,0.42)", borderRadius: 8, padding: 9, display: "grid", gap: 7, minWidth: 0 };
const path: CSSProperties = { color: "#fde68a", fontSize: 12, overflowWrap: "anywhere", whiteSpace: "pre-wrap" };
const kind: CSSProperties = { color: "#fef3c7", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const copy: CSSProperties = { margin: 0, color: "#f8fafc", fontSize: 12, lineHeight: 1.45, overflowWrap: "anywhere" };
const muted: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 12, lineHeight: 1.45, overflowWrap: "anywhere" };
const pre: CSSProperties = { margin: 0, padding: 10, borderRadius: 8, background: "#020617", border: "1px solid rgba(148,163,184,0.16)", color: "#e2e8f0", fontSize: 12, whiteSpace: "pre-wrap", overflowWrap: "anywhere" };
