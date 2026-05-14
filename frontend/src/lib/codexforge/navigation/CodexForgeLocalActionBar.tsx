"use client";

import type { CSSProperties, ReactNode } from "react";

type CodexForgeLocalActionBarProps = {
  title: string;
  subtitle?: string;
  status?: string;
  children?: ReactNode;
  style?: CSSProperties;
};

export function CodexForgeLocalActionBar({
  title,
  subtitle,
  status,
  children,
  style,
}: CodexForgeLocalActionBarProps) {
  return (
    <section
      data-codexforge-local-action-bar
      style={{
        ...bar,
        ...style,
      }}
    >
      <div style={copyWrap}>
        <div style={titleRow}>
          <div style={titleStyle}>{title}</div>
          {status ? <div style={statusPill}>{status}</div> : null}
        </div>
        {subtitle ? <div style={subtitleStyle}>{subtitle}</div> : null}
      </div>

      {children ? <div style={actionsWrap}>{children}</div> : null}
    </section>
  );
}

const safeText: CSSProperties = {
  minWidth: 0,
  maxWidth: "100%",
  overflowWrap: "anywhere",
  wordBreak: "break-word",
};

const bar: CSSProperties = {
  width: "100%",
  maxWidth: "100%",
  boxSizing: "border-box",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 12,
  flexWrap: "wrap",
  padding: "10px 12px",
  borderRadius: 12,
  border: "1px solid rgba(148,163,184,0.16)",
  background:
    "linear-gradient(135deg, rgba(8,13,28,0.62), rgba(15,23,42,0.42)), rgba(2,6,23,0.50)",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
  color: "white",
  ...safeText,
};

const copyWrap: CSSProperties = {
  display: "grid",
  gap: 3,
  flex: "1 1 240px",
  ...safeText,
};

const titleRow: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  flexWrap: "wrap",
  ...safeText,
};

const titleStyle: CSSProperties = {
  fontSize: 15,
  fontWeight: 950,
  letterSpacing: 0,
  lineHeight: 1.2,
  ...safeText,
};

const subtitleStyle: CSSProperties = {
  fontSize: 12,
  lineHeight: 1.4,
  opacity: 0.72,
  ...safeText,
};

const statusPill: CSSProperties = {
  padding: "4px 7px",
  borderRadius: 999,
  border: "1px solid rgba(45,212,191,0.24)",
  background: "rgba(45,212,191,0.08)",
  color: "rgba(204,251,241,0.92)",
  fontSize: 10,
  fontWeight: 900,
  textTransform: "uppercase",
  letterSpacing: 0,
  ...safeText,
};

const actionsWrap: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  gap: 8,
  flexWrap: "wrap",
  flex: "0 1 auto",
  minWidth: 0,
  maxWidth: "100%",
};
