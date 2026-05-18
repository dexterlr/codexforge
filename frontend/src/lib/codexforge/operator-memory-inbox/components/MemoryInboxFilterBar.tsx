"use client";

import type { CSSProperties } from "react";
import type { MemoryInboxPriorityClass, OperatorMemoryKind } from "../operator-memory-inbox-types";

export type MemoryInboxFilters = { query: string; kind: OperatorMemoryKind | "all"; priority: MemoryInboxPriorityClass | "all" };

export function MemoryInboxFilterBar({ filters, onChange }: { filters: MemoryInboxFilters; onChange: (filters: MemoryInboxFilters) => void }) {
  return (
    <section style={bar} data-codexforge-memory-inbox-filter-bar="MemoryInboxFilterBar renders">
      <input style={input} value={filters.query} onChange={(event) => onChange({ ...filters, query: event.target.value })} placeholder="Filter memory candidates" />
      <select style={input} value={filters.kind} onChange={(event) => onChange({ ...filters, kind: event.target.value as MemoryInboxFilters["kind"] })}>
        {["all", "implementation-detail", "verification-result", "regression-lesson", "fix-pattern", "safety-boundary", "workflow-preference", "architecture-note", "creative-production-note", "rollback-note", "follow-up", "unknown"].map((kind) => <option key={kind} value={kind}>{kind}</option>)}
      </select>
      <select style={input} value={filters.priority} onChange={(event) => onChange({ ...filters, priority: event.target.value as MemoryInboxFilters["priority"] })}>
        {["all", "urgent", "high", "normal", "low", "blocked"].map((priority) => <option key={priority} value={priority}>{priority}</option>)}
      </select>
    </section>
  );
}

const bar: CSSProperties = { display: "grid", gridTemplateColumns: "minmax(0, 1fr) repeat(2, minmax(min(100%, 210px), 0.25fr))", gap: 10, minWidth: 0 };
const input: CSSProperties = { border: "1px solid rgba(125,211,252,0.18)", background: "rgba(2,6,23,0.72)", color: "#f8fafc", borderRadius: 8, padding: "10px 11px", minWidth: 0, outline: "none" };
