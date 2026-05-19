import type { CSSProperties } from "react";
import { safeText } from "./codexforge-theme";

const buttonBase: CSSProperties = {
  alignItems: "center",
  borderRadius: 8,
  cursor: "pointer",
  display: "inline-flex",
  fontSize: 12,
  fontWeight: 900,
  justifyContent: "center",
  lineHeight: 1.2,
  minWidth: 0,
  padding: "8px 10px",
  textDecoration: "none",
  ...safeText,
};

export const subtleButton: CSSProperties = {
  ...buttonBase,
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(148,163,184,0.18)",
  color: "#dbeafe",
};

export const primaryButton: CSSProperties = {
  ...buttonBase,
  background: "linear-gradient(135deg, rgba(20,184,166,0.9), rgba(14,165,233,0.86))",
  border: "1px solid rgba(125,211,252,0.32)",
  color: "#021014",
};
