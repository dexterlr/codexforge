"use client";

import type { CSSProperties } from "react";
import type { ValidationOutputReview } from "../index";

export function ValidationOutputReviewPanel({ review }: { review: ValidationOutputReview }) {
  return (
    <section style={panel} data-codexforge-validation-output-review-panel="ValidationOutputReviewPanel renders output review does not fabricate output supplied manual cap output no command execution">
      <div style={header}><span style={eyebrow}>Output</span><strong>{review.status}</strong></div>
      <h2 style={title}>Validation output review</h2>
      <p style={copy}>Output is supplied manually unless an existing guarded Validation Runner safely provides it. This review does not fabricate output.</p>
      {review.items.length ? review.items.map((item) => (
        <article key={`output-review-${item.id}`} style={itemBox}>
          <strong>{item.command}</strong>
          <span>{item.status}: {item.nextAction}</span>
        </article>
      )) : <span style={muted}>No output supplied yet.</span>}
    </section>
  );
}

const panel: CSSProperties = { background: "rgba(15,23,42,0.68)", border: "1px solid rgba(148,163,184,0.18)", borderRadius: 8, display: "grid", gap: 10, minWidth: 0, padding: 14 };
const header: CSSProperties = { alignItems: "center", display: "flex", gap: 8, justifyContent: "space-between", minWidth: 0 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const title: CSSProperties = { fontSize: 17, lineHeight: 1.2, margin: 0, overflowWrap: "normal" };
const copy: CSSProperties = { color: "#cbd5e1", fontSize: 13, lineHeight: 1.45, margin: 0 };
const itemBox: CSSProperties = { background: "rgba(2,6,23,0.38)", borderRadius: 8, display: "grid", gap: 4, padding: 8 };
const muted: CSSProperties = { color: "#94a3b8", fontSize: 12 };
