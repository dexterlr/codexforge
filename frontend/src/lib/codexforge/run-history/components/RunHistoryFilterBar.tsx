"use client";

import type { RunHistoryFilter } from "../run-history-types";
import { rhButton, rhPanel } from "./RunHistoryStyles";

export function RunHistoryFilterBar({ filters }: { filters: readonly RunHistoryFilter[] }) {
  return (
    <section style={{ ...rhPanel, alignItems: "center", display: "flex", flexWrap: "wrap" }} data-codexforge-run-history-filter-bar="RunHistoryFilterBar renders filters include needs review failed code fix memory candidate handoff ready">
      {filters.map((filter) => (
        <button key={`run-history-filter-${filter.filterId}`} type="button" style={{ ...rhButton, opacity: filter.selected ? 1 : 0.72 }} title={filter.description}>
          {filter.label} ({filter.count})
        </button>
      ))}
    </section>
  );
}
