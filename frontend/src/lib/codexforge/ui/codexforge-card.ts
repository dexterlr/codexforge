import type { CSSProperties } from "react";
import { codexforgeUxTheme, safeText } from "./codexforge-theme";

export const card: CSSProperties = {
  background: codexforgeUxTheme.panel,
  border: `1px solid ${codexforgeUxTheme.border}`,
  borderRadius: 8,
  display: "grid",
  gap: 10,
  minWidth: 0,
  padding: 12,
  ...safeText,
};

export const cockpitCard = card;

export const compactCard: CSSProperties = {
  ...card,
  gap: 8,
  padding: 10,
};

export const cardHeader: CSSProperties = {
  alignItems: "start",
  display: "flex",
  flexWrap: "wrap",
  gap: 10,
  justifyContent: "space-between",
  minWidth: 0,
  ...safeText,
};

export const emptyState: CSSProperties = {
  ...card,
  color: "#cbd5e1",
  lineHeight: 1.45,
  textAlign: "left",
};

export const dangerNotice: CSSProperties = {
  ...card,
  background: "rgba(127,29,29,0.18)",
  border: "1px solid rgba(248,113,113,0.28)",
  color: "#fecaca",
};

export const safetyNotice: CSSProperties = {
  ...card,
  background: "rgba(20,184,166,0.08)",
  border: `1px solid ${codexforgeUxTheme.borderStrong}`,
  color: "#ccfbf1",
};
