import React from "react";

export const page: React.CSSProperties = {
  minHeight: "100vh",
  padding: "clamp(16px, 4vw, 40px)",
  background:
    "radial-gradient(1200px 600px at 20% 10%, rgba(99,102,241,0.22), transparent 60%)," +
    "radial-gradient(900px 500px at 80% 20%, rgba(16,185,129,0.18), transparent 55%)," +
    "radial-gradient(700px 400px at 50% 90%, rgba(236,72,153,0.12), transparent 55%)," +
    "linear-gradient(180deg, #070A12 0%, #050710 100%)",
  color: "white",
  fontFamily:
    'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji"',
};

export const shell: React.CSSProperties = {
  width: "100%",
  maxWidth: 1220,
  margin: "0 auto",
  display: "grid",
  gap: 14,
};

export const topBar: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 12,
  padding: "12px 14px",
  borderRadius: 16,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(255,255,255,0.04)",
  backdropFilter: "blur(10px)",
  flexWrap: "wrap",
};

export const brandWrap: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 12,
};

export const brandOrb: React.CSSProperties = {
  width: 30,
  height: 30,
  borderRadius: 10,
  background: "linear-gradient(135deg, rgba(99,102,241,0.95), rgba(16,185,129,0.85))",
  boxShadow: "0 10px 30px rgba(99,102,241,0.18)",
};

export const brandTitle: React.CSSProperties = {
  fontWeight: 900,
  letterSpacing: 0.2,
};

export const brandSubtitle: React.CSSProperties = {
  fontSize: 12,
  opacity: 0.75,
};

export const navRow: React.CSSProperties = {
  display: "flex",
  gap: 10,
  flexWrap: "wrap",
  alignItems: "center",
};

export const heroCard: React.CSSProperties = {
  borderRadius: 22,
  border: "1px solid rgba(255,255,255,0.12)",
  background: "linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))",
  boxShadow: "0 30px 100px rgba(0,0,0,0.45)",
  overflow: "hidden",
};

export const heroGrid: React.CSSProperties = {
  padding: "clamp(18px, 3vw, 28px)",
  display: "grid",
  gap: 18,
};

export const eyebrow: React.CSSProperties = {
  fontSize: 12,
  letterSpacing: 1.2,
  textTransform: "uppercase",
  opacity: 0.72,
  fontWeight: 900,
};

export const heroTitle: React.CSSProperties = {
  margin: 0,
  fontSize: "clamp(28px, 4vw, 44px)",
  lineHeight: 1.05,
  letterSpacing: -0.8,
};

export const heroText: React.CSSProperties = {
  fontSize: 14,
  lineHeight: 1.65,
  opacity: 0.86,
  maxWidth: 820,
};

export const heroCardGrid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: 10,
};

export const miniInfoCard: React.CSSProperties = {
  padding: 12,
  borderRadius: 14,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(255,255,255,0.04)",
  display: "grid",
  gap: 4,
};

export const miniInfoLabel: React.CSSProperties = {
  fontSize: 11,
  opacity: 0.68,
  textTransform: "uppercase",
  letterSpacing: 0.8,
  fontWeight: 900,
};

export const miniInfoValue: React.CSSProperties = {
  fontSize: 14,
  fontWeight: 900,
};

export const mainCard: React.CSSProperties = {
  borderRadius: 22,
  border: "1px solid rgba(255,255,255,0.12)",
  background: "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))",
  boxShadow: "0 30px 100px rgba(0,0,0,0.45)",
  overflow: "hidden",
};

export const toolbar: React.CSSProperties = {
  padding: "16px 18px 0 18px",
  display: "flex",
  justifyContent: "space-between",
  gap: 12,
  alignItems: "center",
  flexWrap: "wrap",
};

export const workspaceLayout: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "320px minmax(0, 1fr)",
  gap: 14,
  padding: 18,
};

export const leftPanel: React.CSSProperties = {
  display: "grid",
  alignContent: "start",
  gap: 14,
  padding: 14,
  borderRadius: 16,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(255,255,255,0.03)",
};

export const chatPanel: React.CSSProperties = {
  display: "grid",
  gap: 12,
};

export const panelTitle: React.CSSProperties = {
  fontWeight: 900,
  fontSize: 14,
};

export const panelText: React.CSSProperties = {
  fontSize: 12,
  opacity: 0.8,
  lineHeight: 1.6,
};

export const panelBlock: React.CSSProperties = {
  display: "grid",
  gap: 8,
};

export const suggestionGrid: React.CSSProperties = {
  display: "grid",
  gap: 10,
};

export const suggestionButton: React.CSSProperties = {
  textAlign: "left",
  padding: "12px 12px",
  borderRadius: 14,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(255,255,255,0.04)",
  color: "white",
  cursor: "pointer",
  display: "grid",
  gap: 6,
};

export const suggestionLabel: React.CSSProperties = {
  fontWeight: 900,
  fontSize: 13,
};

export const suggestionText: React.CSSProperties = {
  fontSize: 12,
  opacity: 0.8,
  lineHeight: 1.5,
};

export const bulletList: React.CSSProperties = {
  margin: "0 0 0 18px",
  padding: 0,
  lineHeight: 1.7,
  opacity: 0.9,
  fontSize: 13,
};

export const messagesBox: React.CSSProperties = {
  height: "min(58vh, 620px)",
  overflow: "auto",
  padding: 12,
  borderRadius: 16,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(0,0,0,0.22)",
};

export const emptyState: React.CSSProperties = {
  display: "grid",
  gap: 12,
  alignContent: "start",
  minHeight: 220,
};

export const emptyTitle: React.CSSProperties = {
  fontWeight: 900,
  fontSize: 18,
};

export const emptyText: React.CSSProperties = {
  opacity: 0.84,
  lineHeight: 1.6,
  maxWidth: 700,
};

export const emptyExamples: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 10,
};

export const exampleChip: React.CSSProperties = {
  padding: "9px 12px",
  borderRadius: 999,
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(255,255,255,0.05)",
  fontSize: 12,
  fontWeight: 700,
};

export const messageStack: React.CSSProperties = {
  display: "grid",
  gap: 10,
};

export const messageBubble: React.CSSProperties = {
  maxWidth: 860,
  padding: "12px 12px",
  borderRadius: 14,
  border: "1px solid rgba(255,255,255,0.12)",
  whiteSpace: "pre-wrap",
  lineHeight: 1.55,
  display: "grid",
  gap: 10,
};

export const userBubble: React.CSSProperties = {
  background: "rgba(99,102,241,0.18)",
};

export const assistantBubble: React.CSSProperties = {
  background: "rgba(255,255,255,0.06)",
};

export const systemBubble: React.CSSProperties = {
  background: "rgba(16,185,129,0.10)",
};

export const messageMeta: React.CSSProperties = {
  display: "flex",
  gap: 10,
  alignItems: "center",
  justifyContent: "space-between",
  flexWrap: "wrap",
};

export const messageRole: React.CSSProperties = {
  fontSize: 12,
  opacity: 0.78,
  fontWeight: 800,
};

export const messageSource: React.CSSProperties = {
  fontSize: 11,
  opacity: 0.82,
  border: "1px solid rgba(255,255,255,0.14)",
  borderRadius: 999,
  padding: "3px 8px",
  background: "rgba(255,255,255,0.05)",
};

export const messageTime: React.CSSProperties = {
  fontSize: 11,
  opacity: 0.62,
};

export const messageText: React.CSSProperties = {
  fontSize: 14,
};

export const messageActions: React.CSSProperties = {
  display: "flex",
  gap: 8,
  flexWrap: "wrap",
};

export const structuredWrap: React.CSSProperties = {
  display: "grid",
  gap: 10,
};

export const structuredHero: React.CSSProperties = {
  display: "grid",
  gap: 6,
  padding: 12,
  borderRadius: 14,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(0,0,0,0.18)",
};

export const structuredHeroTitle: React.CSSProperties = {
  fontWeight: 900,
  fontSize: 15,
};

export const structuredHeroText: React.CSSProperties = {
  fontSize: 13,
  opacity: 0.86,
  lineHeight: 1.55,
};

export const structuredCard: React.CSSProperties = {
  display: "grid",
  gap: 8,
  padding: 12,
  borderRadius: 14,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(0,0,0,0.16)",
};

export const structuredTitle: React.CSSProperties = {
  fontWeight: 900,
  fontSize: 13,
};

export const structuredParagraph: React.CSSProperties = {
  fontSize: 13,
  lineHeight: 1.6,
  opacity: 0.9,
};

export const structuredList: React.CSSProperties = {
  display: "grid",
  gap: 8,
};

export const structuredListItem: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "14px minmax(0, 1fr)",
  gap: 8,
  alignItems: "start",
  fontSize: 13,
  lineHeight: 1.55,
};

export const structuredBullet: React.CSSProperties = {
  opacity: 0.75,
};

export const toolGrid: React.CSSProperties = {
  display: "grid",
  gap: 10,
};

export const toolCard: React.CSSProperties = {
  display: "grid",
  gap: 8,
  padding: 10,
  borderRadius: 12,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(255,255,255,0.04)",
};

export const toolHeader: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 10,
  flexWrap: "wrap",
};

export const toolName: React.CSSProperties = {
  fontSize: 13,
  fontWeight: 900,
};

export const toolDescription: React.CSSProperties = {
  fontSize: 12,
  opacity: 0.82,
  lineHeight: 1.6,
};

export const toolBadgeBase: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  borderRadius: 999,
  padding: "4px 8px",
  fontSize: 11,
  fontWeight: 800,
  border: "1px solid transparent",
};

export const toolBadgeReady: React.CSSProperties = {
  background: "rgba(16,185,129,0.16)",
  borderColor: "rgba(16,185,129,0.32)",
  color: "rgba(220,252,231,0.98)",
};

export const toolBadgeStub: React.CSSProperties = {
  background: "rgba(245,158,11,0.16)",
  borderColor: "rgba(245,158,11,0.32)",
  color: "rgba(254,243,199,0.98)",
};

export const toolBadgeUnavailable: React.CSSProperties = {
  background: "rgba(239,68,68,0.16)",
  borderColor: "rgba(239,68,68,0.32)",
  color: "rgba(254,226,226,0.98)",
};

export const statusCard: React.CSSProperties = {
  padding: 12,
  borderRadius: 14,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(255,255,255,0.04)",
  display: "grid",
  gap: 4,
};

export const composerWrap: React.CSSProperties = {
  display: "grid",
  gap: 10,
};

export const composer: React.CSSProperties = {
  width: "100%",
  padding: "14px 14px",
  borderRadius: 16,
  border: "1px solid rgba(255,255,255,0.16)",
  background: "rgba(255,255,255,0.06)",
  color: "white",
  outline: "none",
  resize: "vertical",
  minHeight: 110,
  font: "inherit",
};

export const composerFooter: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 12,
  flexWrap: "wrap",
};

export const composerHint: React.CSSProperties = {
  fontSize: 12,
  opacity: 0.72,
};

export const footerNote: React.CSSProperties = {
  fontSize: 12,
  opacity: 0.7,
  lineHeight: 1.5,
};

export const subtleText: React.CSSProperties = {
  fontSize: 12,
  opacity: 0.75,
};

export const pillBase: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  padding: "9px 12px",
  borderRadius: 12,
  fontWeight: 800,
  fontSize: 13,
  textDecoration: "none",
  userSelect: "none",
  border: "1px solid rgba(255,255,255,0.18)",
  background: "transparent",
  color: "white",
};

export const pillGhost: React.CSSProperties = {
  ...pillBase,
  opacity: 0.92,
};

export const pillGhostButton: React.CSSProperties = {
  ...pillBase,
  cursor: "pointer",
};

export const pillDanger: React.CSSProperties = {
  ...pillBase,
  background: "rgba(239,68,68,0.14)",
  border: "1px solid rgba(239,68,68,0.35)",
  color: "rgba(255,255,255,0.95)",
  cursor: "pointer",
};

export const tinyGhostButton: React.CSSProperties = {
  padding: "6px 10px",
  borderRadius: 10,
  border: "1px solid rgba(255,255,255,0.14)",
  background: "rgba(255,255,255,0.04)",
  color: "white",
  cursor: "pointer",
  fontSize: 12,
  fontWeight: 700,
};

export const sendButton: React.CSSProperties = {
  padding: "12px 16px",
  borderRadius: 14,
  fontWeight: 900,
  border: "1px solid rgba(255,255,255,0.18)",
  background: "linear-gradient(135deg, rgba(99,102,241,1) 0%, rgba(16,185,129,1) 100%)",
  color: "white",
  cursor: "pointer",
};

export const sendButtonDisabled: React.CSSProperties = {
  background: "rgba(255,255,255,0.10)",
  cursor: "not-allowed",
};

export const badge: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  padding: "6px 10px",
  borderRadius: 999,
  border: "1px solid rgba(255,255,255,0.14)",
  background: "rgba(255,255,255,0.05)",
  fontSize: 12,
  fontWeight: 800,
};