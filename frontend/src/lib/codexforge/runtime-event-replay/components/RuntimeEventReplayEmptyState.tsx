import Link from "next/link";
import type { CSSProperties } from "react";

export function RuntimeEventReplayEmptyState() {
  return (
    <section
      style={empty}
      data-codexforge-runtime-event-replay-empty-state="RuntimeEventReplayEmptyState renders preview-only no graph mutation no appendEvent no event execution"
    >
      <strong>No replay events selected</strong>
      <span>Select runtime journal events and a graph snapshot before trusting a reducer preview.</span>
      <Link href="/runtime-journal" style={link}>Open Runtime Event Journal</Link>
    </section>
  );
}

const empty: CSSProperties = {
  border: "1px solid rgba(148,163,184,0.16)",
  background: "rgba(2,6,23,0.42)",
  borderRadius: 8,
  color: "#cbd5e1",
  display: "grid",
  gap: 8,
  lineHeight: 1.5,
  minWidth: 0,
  padding: 14,
  overflowWrap: "anywhere",
};

const link: CSSProperties = {
  border: "1px solid rgba(125,211,252,0.2)",
  background: "rgba(14,165,233,0.1)",
  borderRadius: 8,
  color: "#e0f2fe",
  fontSize: 12,
  fontWeight: 900,
  padding: "8px 10px",
  textDecoration: "none",
  width: "fit-content",
  maxWidth: "100%",
  overflowWrap: "anywhere",
};
