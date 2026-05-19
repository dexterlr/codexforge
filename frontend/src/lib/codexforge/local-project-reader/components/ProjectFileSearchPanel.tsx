import type { CSSProperties } from "react";
import type { ProjectFileSearchSummary } from "../local-project-reader-types";

export function ProjectFileSearchPanel({
  query,
  onQueryChange,
  summary,
  onRefresh,
  loading,
}: {
  query: string;
  onQueryChange: (query: string) => void;
  summary: ProjectFileSearchSummary;
  onRefresh: () => void;
  loading: boolean;
}) {
  return (
    <section
      data-codexforge-project-file-search-panel="ProjectFileSearchPanel renders deterministic path name extension category purpose risk keyword search"
      style={panel}
    >
      <label style={label}>
        <span style={eyebrow}>File search</span>
        <input
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="path:src name:page ext:.tsx category:route risk:high keyword"
          style={input}
        />
      </label>
      <div style={footer}>
        <span style={summaryText}>{summary.text}</span>
        <button type="button" onClick={onRefresh} style={button} disabled={loading}>
          {loading ? "Refreshing" : "Refresh read-only snapshot"}
        </button>
      </div>
    </section>
  );
}

const panel: CSSProperties = {
  border: "1px solid rgba(148,163,184,0.16)",
  background: "rgba(15,23,42,0.72)",
  borderRadius: 8,
  padding: 12,
  display: "grid",
  gap: 10,
  minWidth: 0,
};

const label: CSSProperties = {
  display: "grid",
  gap: 6,
  minWidth: 0,
};

const eyebrow: CSSProperties = {
  color: "#93c5fd",
  fontSize: 11,
  fontWeight: 900,
  textTransform: "uppercase",
};

const input: CSSProperties = {
  background: "rgba(2,6,23,0.86)",
  border: "1px solid rgba(148,163,184,0.20)",
  borderRadius: 8,
  boxSizing: "border-box",
  color: "#f8fafc",
  fontSize: 13,
  minWidth: 0,
  outline: "none",
  padding: "11px 12px",
  width: "100%",
};

const footer: CSSProperties = {
  alignItems: "center",
  display: "flex",
  flexWrap: "wrap",
  gap: 10,
  justifyContent: "space-between",
  minWidth: 0,
};

const summaryText: CSSProperties = {
  color: "#cbd5e1",
  fontSize: 12,
  lineHeight: 1.4,
  overflowWrap: "anywhere",
};

const button: CSSProperties = {
  background: "rgba(14,165,233,0.14)",
  border: "1px solid rgba(125,211,252,0.26)",
  borderRadius: 8,
  color: "#dbeafe",
  cursor: "pointer",
  fontSize: 12,
  fontWeight: 850,
  padding: "9px 10px",
};

