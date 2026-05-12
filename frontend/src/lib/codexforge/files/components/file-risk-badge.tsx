"use client";

import type { CSSProperties } from "react";
import { calculateFileRisk } from "../file-risk";
import type { CodexForgeFileNode, CodexForgeFileRiskLevel } from "../types";

type FileRiskBadgeProps = {
  file: CodexForgeFileNode;
};

const COLORS: Record<CodexForgeFileRiskLevel, { bg: string; border: string; text: string }> = {
  low: { bg: "rgba(16,185,129,0.14)", border: "rgba(16,185,129,0.34)", text: "#A7F3D0" },
  medium: { bg: "rgba(245,158,11,0.14)", border: "rgba(245,158,11,0.34)", text: "#FDE68A" },
  high: { bg: "rgba(249,115,22,0.14)", border: "rgba(249,115,22,0.38)", text: "#FDBA74" },
  critical: { bg: "rgba(239,68,68,0.16)", border: "rgba(239,68,68,0.42)", text: "#FCA5A5" },
};

export function FileRiskBadge({ file }: FileRiskBadgeProps) {
  const risk = calculateFileRisk(file);
  const color = COLORS[risk.level];

  return (
    <span
      data-codexforge-file-risk-badge
      style={{
        ...badge,
        background: color.bg,
        borderColor: color.border,
        color: color.text,
      }}
      title={risk.summary}
    >
      {risk.level} {risk.score}
    </span>
  );
}

const badge: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  minWidth: 74,
  border: "1px solid",
  borderRadius: 8,
  padding: "5px 8px",
  fontSize: 11,
  fontWeight: 800,
  textTransform: "uppercase",
};
