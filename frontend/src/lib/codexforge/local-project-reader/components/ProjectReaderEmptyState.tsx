import type { CSSProperties } from "react";

export function ProjectReaderEmptyState({ reason = "No project files are available yet." }: { reason?: string }) {
  return (
    <section
      data-codexforge-project-reader-empty-state="ProjectReaderEmptyState renders API unavailable clear unavailable state"
      style={panel}
    >
      <div style={title}>Project reader unavailable</div>
      <p style={body}>{reason}</p>
      <p style={body}>Use the read-only refresh action when the local API is available.</p>
    </section>
  );
}

const panel: CSSProperties = {
  border: "1px solid rgba(248,113,113,0.24)",
  background: "rgba(127,29,29,0.16)",
  borderRadius: 8,
  padding: 16,
  display: "grid",
  gap: 8,
  minWidth: 0,
};

const title: CSSProperties = {
  color: "#fecaca",
  fontSize: 15,
  fontWeight: 900,
  lineHeight: 1.25,
  overflowWrap: "anywhere",
};

const body: CSSProperties = {
  color: "#fee2e2",
  fontSize: 12,
  lineHeight: 1.45,
  margin: 0,
  overflowWrap: "anywhere",
};

