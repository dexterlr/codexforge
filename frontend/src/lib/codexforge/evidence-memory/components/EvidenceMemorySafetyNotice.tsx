import type { CSSProperties } from "react";

export function EvidenceMemorySafetyNotice() {
  return (
    <section
      style={notice}
      data-codexforge-evidence-memory-safety-notice="EvidenceMemorySafetyNotice renders Review required before memory promotion no graph mutation memory is context, not authority Brain merge review required"
    >
      <strong style={title}>Review required before memory promotion</strong>
      <p style={copy}>
        Read-only execution evidence can become reviewable memory candidates only. There is no graph mutation,
        no auto-promotion, no automatic Brain merge, and memory is context, not authority.
      </p>
      <p style={copy}>Brain merge review required before any future merge flow can consider these candidates.</p>
    </section>
  );
}

const safeText: CSSProperties = { minWidth: 0, overflowWrap: "anywhere", wordBreak: "break-word" };
const notice: CSSProperties = { border: "1px solid rgba(251,191,36,0.24)", background: "rgba(251,191,36,0.08)", borderRadius: 8, padding: 14, display: "grid", gap: 6, minWidth: 0 };
const title: CSSProperties = { color: "#fde68a", fontSize: 14, lineHeight: 1.35, ...safeText };
const copy: CSSProperties = { margin: 0, color: "#fef3c7", fontSize: 12, lineHeight: 1.45, ...safeText };
