import type { CSSProperties } from "react";

export function ArtifactIngestionSafetyNotice() {
  return (
    <section
      style={panel}
      data-codexforge-artifact-ingestion-safety="review before promotion no direct graph mutation read-only future-promotion memory candidates brain signals"
    >
      <span style={eyebrow}>Ingestion safety</span>
      <h3 style={title}>Review Before Promotion</h3>
      <p style={copy}>
        Artifact ingestion is read-only candidate generation. It creates memory candidates and brain signals for operator review before promotion, with no direct graph mutation and no persistence writes.
      </p>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(45,212,191,0.22)", background: "rgba(8,15,28,0.86)", borderRadius: 8, padding: 14, display: "grid", gap: 8, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const title: CSSProperties = { margin: 0, color: "#f8fafc", fontSize: 18, lineHeight: 1.2, letterSpacing: 0 };
const copy: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 13, lineHeight: 1.5 };
