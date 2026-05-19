import type { CSSProperties } from "react";
import { codexforgeUxTheme, safeCodeText, safeText } from "./codexforge-theme";

export const cardTitle: CSSProperties = {
  color: codexforgeUxTheme.text,
  fontSize: 16,
  fontWeight: 900,
  letterSpacing: 0,
  lineHeight: 1.25,
  margin: 0,
  ...safeText,
};

export const cardText: CSSProperties = {
  color: "#cbd5e1",
  fontSize: 13,
  lineHeight: 1.45,
  margin: 0,
  ...safeText,
};

export const codePreview: CSSProperties = {
  ...safeCodeText,
  background: "#020617",
  border: `1px solid ${codexforgeUxTheme.border}`,
  borderRadius: 8,
  color: "#dbeafe",
  fontSize: 12,
  lineHeight: 1.45,
  margin: 0,
  padding: 12,
};
