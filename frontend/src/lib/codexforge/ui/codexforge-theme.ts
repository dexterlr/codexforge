import type { CSSProperties } from "react";

export const codexforgeUxTheme = {
  background:
    "radial-gradient(760px 460px at 10% 5%, rgba(20,184,166,0.16), transparent 58%)," +
    "radial-gradient(860px 520px at 84% 8%, rgba(14,165,233,0.14), transparent 58%)," +
    "linear-gradient(180deg, #02040a 0%, #050814 100%)",
  panel: "rgba(8,13,28,0.82)",
  panelSoft: "rgba(255,255,255,0.035)",
  border: "rgba(148,163,184,0.16)",
  borderStrong: "rgba(45,212,191,0.28)",
  text: "#f8fafc",
  textMuted: "#94a3b8",
  accent: "#5eead4",
} as const;

export const safeText: CSSProperties = {
  minWidth: 0,
  maxWidth: "100%",
  overflowWrap: "anywhere",
  wordBreak: "break-word",
};

export const safeCodeText: CSSProperties = {
  ...safeText,
  overflowX: "auto",
  whiteSpace: "pre-wrap",
};
