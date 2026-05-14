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
  gap: 10,
  flexWrap: "wrap",
  padding: "8px 10px",
  borderRadius: 10,
  border: "1px solid rgba(148,163,184,0.14)",
  background:
    "linear-gradient(135deg, rgba(8,13,28,0.54), rgba(15,23,42,0.34)), rgba(2,6,23,0.44)",
  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)",
  color: "white",
  fontFamily:
    'var(--font-geist-sans), ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
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
  fontSize: 14,
  fontWeight: 760,
  letterSpacing: 0,
  lineHeight: 1.2,
  ...safeText,
};

const subtitleStyle: CSSProperties = {
  fontSize: 11,
  lineHeight: 1.4,
  opacity: 0.68,
  ...safeText,
};

const statusPill: CSSProperties = {
  padding: "3px 7px",
  borderRadius: 999,
  border: "1px solid rgba(45,212,191,0.24)",
  background: "rgba(45,212,191,0.08)",
  color: "rgba(204,251,241,0.92)",
  fontSize: 10,
  fontWeight: 650,
  letterSpacing: 0,
  ...safeText,
};

const actionsWrap: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  gap: 6,
  flexWrap: "wrap",
  flex: "0 1 auto",
  minWidth: 0,
  maxWidth: "100%",
};
