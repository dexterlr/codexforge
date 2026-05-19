import type { CSSProperties } from "react";
import { codexforgeUxTheme, safeText } from "./codexforge-theme";

export const pageShell: CSSProperties = {
  background: codexforgeUxTheme.background,
  color: codexforgeUxTheme.text,
  display: "grid",
  gap: 16,
  minHeight: "100vh",
  minWidth: 0,
  padding: "18px min(4vw, 44px)",
  ...safeText,
};

export const contentGrid: CSSProperties = {
  display: "grid",
  gap: 16,
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
  minWidth: 0,
};

export const cockpitGrid: CSSProperties = {
  alignItems: "start",
  display: "grid",
  gap: 16,
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
  minWidth: 0,
};

export const metricGrid: CSSProperties = {
  display: "grid",
  gap: 8,
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 140px), 1fr))",
  minWidth: 0,
};

export const actionRow: CSSProperties = {
  alignItems: "center",
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
  minWidth: 0,
};

export const scrollPanel: CSSProperties = {
  maxHeight: 460,
  minWidth: 0,
  overflowX: "auto",
  overflowY: "auto",
};
