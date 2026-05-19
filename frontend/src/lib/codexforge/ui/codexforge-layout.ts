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

export const appMainLayout: CSSProperties = {
  minWidth: 0,
  width: "100%",
};

export const appContentFrame: CSSProperties = {
  margin: "0 auto",
  maxWidth: 1680,
  minWidth: 0,
  width: "100%",
};

export const cockpitPage: CSSProperties = {
  display: "grid",
  gap: 16,
  minWidth: 0,
  width: "100%",
};

export const cockpitHero: CSSProperties = {
  border: "1px solid rgba(45,212,191,0.22)",
  background: "linear-gradient(135deg, rgba(5,13,29,0.96), rgba(15,23,42,0.82))",
  borderRadius: 8,
  display: "grid",
  gap: 18,
  gridTemplateColumns: "minmax(0, 1fr)",
  minWidth: 0,
  padding: 20,
  width: "100%",
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

export const cockpitTwoColumn: CSSProperties = {
  alignItems: "start",
  display: "grid",
  gap: 16,
  gridTemplateColumns: "minmax(0, 1fr) minmax(280px, 420px)",
  minWidth: 0,
  width: "100%",
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
