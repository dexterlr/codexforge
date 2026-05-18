"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import type { OperatorHomeHealthReport } from "../operator-home-types";
import { buildOperatorHomeStableKey } from "../operator-home-types";

type OperatorHomeStatusStripProps = {
  health: OperatorHomeHealthReport;
};

export function OperatorHomeStatusStrip({ health }: OperatorHomeStatusStripProps) {
  return (
    <section
      style={strip}
      data-codexforge-operator-home-status-strip="OperatorHomeStatusStrip renders Brain runtime Stabilization Patch/apply safety"
    >
      {health.dimensions.map((dimension) => (
        <Link
          key={buildOperatorHomeStableKey("health-strip", dimension.id)}
          href={dimension.route}
          style={item}
        >
          <span style={label}>{dimension.label}</span>
          <strong style={value}>{dimension.level}</strong>
        </Link>
      ))}
    </section>
  );
}

const safeText: CSSProperties = {
  minWidth: 0,
  maxWidth: "100%",
  overflowWrap: "anywhere",
  wordBreak: "break-word",
};

const strip: CSSProperties = {
  display: "grid",
  gap: 8,
  gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
  minWidth: 0,
};

const item: CSSProperties = {
  border: "1px solid rgba(148,163,184,0.16)",
  background: "rgba(15,23,42,0.52)",
  borderRadius: 8,
  color: "#f8fafc",
  display: "grid",
  gap: 5,
  minHeight: 78,
  minWidth: 0,
  padding: 12,
  textDecoration: "none",
  ...safeText,
};

const label: CSSProperties = {
  color: "#94a3b8",
  fontSize: 11,
  fontWeight: 850,
  textTransform: "uppercase",
  ...safeText,
};

const value: CSSProperties = {
  color: "#ccfbf1",
  fontSize: 16,
  lineHeight: 1.1,
  ...safeText,
};
