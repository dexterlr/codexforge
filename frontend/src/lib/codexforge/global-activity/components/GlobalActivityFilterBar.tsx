"use client";

import type { CSSProperties } from "react";
import type { GlobalActivityFilterId } from "../global-activity-types";

const FILTERS: GlobalActivityFilterId[] = ["all", "blockers", "warnings", "review required", "verification", "regression", "patch workflow", "apply gates", "memory", "creative", "stabilization", "safety"];

export function GlobalActivityFilterBar({ active, search, onFilterChange, onSearchChange }: { active: GlobalActivityFilterId; search: string; onFilterChange: (filter: GlobalActivityFilterId) => void; onSearchChange: (search: string) => void }) {
  return (
    <section style={bar} data-codexforge-global-activity-filter-bar="GlobalActivityFilterBar renders filters include blockers filters include review required filters include patch workflow">
      <div style={filters}>
        {FILTERS.map((filter) => (
          <button key={filter} type="button" onClick={() => onFilterChange(filter)} style={active === filter ? activeButton : button}>
            {filter}
          </button>
        ))}
      </div>
      <input value={search} onChange={(event) => onSearchChange(event.target.value)} placeholder="Search label, detail, source, surface, or file" style={input} />
    </section>
  );
}

const bar: CSSProperties = { border: "1px solid rgba(148,163,184,0.14)", background: "rgba(15,23,42,0.62)", borderRadius: 8, padding: 12, display: "grid", gap: 10, minWidth: 0 };
const filters: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8, minWidth: 0 };
const button: CSSProperties = { border: "1px solid rgba(148,163,184,0.18)", background: "rgba(2,6,23,0.52)", color: "#cbd5e1", borderRadius: 8, padding: "8px 10px", fontSize: 12, fontWeight: 850, cursor: "pointer" };
const activeButton: CSSProperties = { ...button, border: "1px solid rgba(45,212,191,0.34)", background: "rgba(20,184,166,0.14)", color: "#ccfbf1" };
const input: CSSProperties = { width: "100%", boxSizing: "border-box", border: "1px solid rgba(148,163,184,0.18)", background: "rgba(2,6,23,0.72)", color: "#f8fafc", borderRadius: 8, padding: "10px 11px", fontSize: 13, outline: "none", minWidth: 0 };
