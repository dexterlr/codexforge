"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import type { OperatorHomeLaunchCard as OperatorHomeLaunchCardModel } from "../operator-home-types";

type OperatorHomeLaunchCardProps = {
  card: OperatorHomeLaunchCardModel;
};

export function OperatorHomeLaunchCard({ card }: OperatorHomeLaunchCardProps) {
  return (
    <Link
      href={card.href}
      style={cardStyle}
      data-codexforge-operator-home-launch-card="OperatorHomeLaunchCard renders"
    >
      <div style={topRow}>
        <span style={badge}>{card.badge}</span>
        <span style={posture}>{card.riskPosture}</span>
      </div>
      <div style={titleRow}>
        <h3 style={title}>{card.label}</h3>
        <span aria-hidden="true" style={arrow}>
          -&gt;
        </span>
      </div>
      <p style={description}>{card.description}</p>
      <div style={bottomRow}>
        <span style={readiness}>{card.readiness}</span>
        <span style={path}>{card.href}</span>
      </div>
    </Link>
  );
}

const safeText: CSSProperties = {
  minWidth: 0,
  maxWidth: "100%",
  overflowWrap: "anywhere",
  wordBreak: "break-word",
};

const cardStyle: CSSProperties = {
  border: "1px solid rgba(148,163,184,0.16)",
  background:
    "linear-gradient(145deg, rgba(15,23,42,0.72), rgba(2,6,23,0.58))",
  borderRadius: 8,
  color: "#f8fafc",
  display: "grid",
  gap: 10,
  minHeight: 176,
  minWidth: 0,
  padding: 14,
  textDecoration: "none",
  ...safeText,
};

const topRow: CSSProperties = {
  alignItems: "center",
  display: "flex",
  gap: 8,
  justifyContent: "space-between",
  minWidth: 0,
};

const badge: CSSProperties = {
  border: "1px solid rgba(45,212,191,0.22)",
  background: "rgba(20,184,166,0.1)",
  borderRadius: 8,
  color: "#ccfbf1",
  fontSize: 11,
  fontWeight: 900,
  padding: "4px 7px",
  ...safeText,
};

const posture: CSSProperties = {
  color: "#c7d2fe",
  fontSize: 10,
  fontWeight: 900,
  textTransform: "uppercase",
  ...safeText,
};

const titleRow: CSSProperties = {
  alignItems: "start",
  display: "flex",
  gap: 10,
  justifyContent: "space-between",
  minWidth: 0,
};

const title: CSSProperties = {
  fontSize: 18,
  lineHeight: 1.15,
  margin: 0,
  ...safeText,
};

const arrow: CSSProperties = {
  color: "#5eead4",
  flex: "0 0 auto",
  fontWeight: 900,
};

const description: CSSProperties = {
  color: "#cbd5e1",
  fontSize: 13,
  lineHeight: 1.5,
  margin: 0,
  ...safeText,
};

const bottomRow: CSSProperties = {
  alignItems: "center",
  display: "flex",
  gap: 8,
  justifyContent: "space-between",
  marginTop: "auto",
  minWidth: 0,
};

const readiness: CSSProperties = {
  color: "#93c5fd",
  fontSize: 11,
  fontWeight: 900,
  textTransform: "uppercase",
  ...safeText,
};

const path: CSSProperties = {
  color: "#94a3b8",
  fontFamily:
    "var(--font-geist-mono), ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
  fontSize: 11,
  ...safeText,
};
