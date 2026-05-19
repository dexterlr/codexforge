import type { CSSProperties } from "react";

export const vrTextGuard: CSSProperties = { minWidth: 0, overflowWrap: "anywhere" };
export const vrCard: CSSProperties = {
  border: "1px solid rgba(125,211,252,0.22)",
  background: "rgba(8,13,28,0.78)",
  borderRadius: 8,
  display: "grid",
  gap: 10,
  minWidth: 0,
  padding: 12,
};
export const vrTitle: CSSProperties = { color: "#e0f2fe", fontSize: 14, fontWeight: 900, lineHeight: 1.25, ...vrTextGuard };
export const vrCopy: CSSProperties = { color: "#cbd5e1", fontSize: 12, lineHeight: 1.45, margin: 0, ...vrTextGuard };
export const vrList: CSSProperties = { display: "grid", gap: 6, margin: 0, padding: 0, listStyle: "none", minWidth: 0 };
export const vrPill: CSSProperties = {
  border: "1px solid rgba(148,163,184,0.2)",
  borderRadius: 8,
  color: "#dbeafe",
  fontSize: 11,
  fontWeight: 800,
  padding: "5px 7px",
  width: "fit-content",
  maxWidth: "100%",
  ...vrTextGuard,
};
export const vrButton: CSSProperties = {
  border: "1px solid rgba(125,211,252,0.3)",
  background: "rgba(14,165,233,0.12)",
  borderRadius: 8,
  color: "#e0f2fe",
  cursor: "pointer",
  fontSize: 12,
  fontWeight: 900,
  padding: "8px 10px",
};
export const vrInput: CSSProperties = {
  border: "1px solid rgba(148,163,184,0.25)",
  background: "rgba(2,6,23,0.72)",
  borderRadius: 8,
  color: "#e5e7eb",
  fontSize: 12,
  lineHeight: 1.45,
  minWidth: 0,
  padding: 9,
  width: "100%",
};
