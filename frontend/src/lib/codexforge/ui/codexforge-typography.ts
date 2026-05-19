import type { CSSProperties } from "react";
import { codexforgeUxTheme, normalTextWrap, safeCodeText, safeText } from "./codexforge-theme";

export const displayTitle: CSSProperties = {
  color: codexforgeUxTheme.text,
  fontSize: "clamp(34px, 4vw, 56px)",
  fontWeight: 950,
  letterSpacing: 0,
  lineHeight: 1.04,
  margin: 0,
  maxWidth: 980,
  ...normalTextWrap,
};

export const sectionTitle: CSSProperties = {
  color: codexforgeUxTheme.text,
  fontSize: 22,
  fontWeight: 900,
  letterSpacing: 0,
  lineHeight: 1.12,
  margin: 0,
  maxWidth: 860,
  ...normalTextWrap,
};

export const bodyText: CSSProperties = {
  color: "#cbd5e1",
  fontSize: 14,
  lineHeight: 1.55,
  margin: 0,
  ...safeText,
};

export const pathText: CSSProperties = {
  ...safeText,
  fontFamily: "var(--font-geist-mono), ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
};

export const commandText: CSSProperties = {
  ...safeText,
  fontFamily: "var(--font-geist-mono), ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
};

export const codeText: CSSProperties = {
  ...safeCodeText,
  fontFamily: "var(--font-geist-mono), ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
};

export const safeBodyText = bodyText;
export const safePathText = pathText;
export const safeCommandText = commandText;
export const safeCodePanel: CSSProperties = {
  ...codeText,
  background: "#020617",
  border: `1px solid ${codexforgeUxTheme.border}`,
  borderRadius: 8,
  color: "#dbeafe",
  fontSize: 12,
  lineHeight: 1.45,
  margin: 0,
  padding: 12,
};

export const cockpitHeroTitle = displayTitle;
export const cockpitHeroSubtitle: CSSProperties = {
  ...bodyText,
  color: "#dbeafe",
  fontSize: 15,
  maxWidth: 980,
};

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
  ...safeCodePanel,
  background: "#020617",
  border: `1px solid ${codexforgeUxTheme.border}`,
  borderRadius: 8,
  color: "#dbeafe",
  fontSize: 12,
  lineHeight: 1.45,
  margin: 0,
  padding: 12,
};
