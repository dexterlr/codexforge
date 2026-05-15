"use client";

import type { CSSProperties } from "react";

type BrainRecallSearchBoxProps = {
  query: string;
  onQueryChange: (query: string) => void;
};

export function BrainRecallSearchBox({ query, onQueryChange }: BrainRecallSearchBoxProps) {
  return (
    <label style={wrap}>
      <span style={label}>Search approved Brain memory</span>
      <input
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        placeholder='memory safety, kind:memory approval, status:active runtime, file:page-client brain'
        style={input}
      />
    </label>
  );
}

const wrap: CSSProperties = { display: "grid", gap: 6, minWidth: 0 };
const label: CSSProperties = { fontSize: 11, fontWeight: 900, textTransform: "uppercase", color: "#93c5fd", overflowWrap: "anywhere" };
const input: CSSProperties = {
  width: "100%",
  boxSizing: "border-box",
  border: "1px solid rgba(147,197,253,0.24)",
  background: "rgba(2,6,23,0.44)",
  color: "inherit",
  borderRadius: 8,
  padding: "11px 12px",
  outline: "none",
  fontSize: 13,
};
