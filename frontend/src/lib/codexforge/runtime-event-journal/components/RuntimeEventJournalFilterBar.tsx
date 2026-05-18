"use client";

import type { CSSProperties } from "react";
import type { RuntimeEventJournalFilterId } from "@/lib/codexforge/runtime-event-journal";

const FILTERS: RuntimeEventJournalFilterId[] = [
  "all",
  "requests",
  "approvals",
  "policy",
  "validation",
  "dry runs",
  "reducer previews",
  "blocked",
  "ready",
  "executed",
  "memory promotion",
  "review required",
];

export function RuntimeEventJournalFilterBar({
  active,
  search,
  onFilterChange,
  onSearchChange,
}: {
  active: RuntimeEventJournalFilterId;
  search: string;
  onFilterChange: (filter: RuntimeEventJournalFilterId) => void;
  onSearchChange: (search: string) => void;
}) {
  return (
    <section
      style={bar}
      data-codexforge-runtime-event-journal-filter-bar="RuntimeEventJournalFilterBar renders filters include memory promotion reducer previews review required"
    >
      <div style={filters}>
        {FILTERS.map((filter) => (
          <button
            key={`runtime-journal-filter-${filter}`}
            type="button"
            onClick={() => onFilterChange(filter)}
            style={filter === active ? activeButton : button}
          >
            {filter}
          </button>
        ))}
      </div>
      <input
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Search title, source, request, event type, or file"
        style={input}
        aria-label="Search runtime event journal"
      />
    </section>
  );
}

const safeText: CSSProperties = { minWidth: 0, overflowWrap: "anywhere", wordBreak: "break-word" };
const bar: CSSProperties = {
  border: "1px solid rgba(45,212,191,0.18)",
  background: "rgba(2,6,23,0.5)",
  borderRadius: 8,
  display: "grid",
  gap: 10,
  minWidth: 0,
  padding: 12,
};
const filters: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 7, minWidth: 0 };
const button: CSSProperties = { border: "1px solid rgba(148,163,184,0.14)", background: "rgba(255,255,255,0.03)", borderRadius: 8, color: "#cbd5e1", cursor: "pointer", fontSize: 11, fontWeight: 900, padding: "8px 9px", textTransform: "capitalize", ...safeText };
const activeButton: CSSProperties = { ...button, border: "1px solid rgba(45,212,191,0.28)", background: "rgba(20,184,166,0.12)", color: "#ccfbf1" };
const input: CSSProperties = { border: "1px solid rgba(125,211,252,0.18)", background: "rgba(2,6,23,0.55)", borderRadius: 8, color: "#e2e8f0", fontSize: 13, minWidth: 0, outline: "none", padding: "10px 11px", width: "100%", ...safeText };
