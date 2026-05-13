"use client";

import type { CSSProperties, ReactNode } from "react";
import type {
  CodexForgeBrainPanelDataAdapterResult,
  CodexForgeBrainPanelDataSource,
  CodexForgeBrainPanelDataStatus,
  CodexForgeBrainPanelId,
} from "@/lib/codexforge/brain/runtime";

type BrainLiveDataBoundaryProps = {
  panelId: CodexForgeBrainPanelId;
  panelData?: CodexForgeBrainPanelDataAdapterResult;
  source?: CodexForgeBrainPanelDataSource;
  status?: CodexForgeBrainPanelDataStatus;
  label?: ReactNode;
};

export function BrainLiveDataBoundary({
  panelId,
  panelData,
  source,
  status,
  label,
}: BrainLiveDataBoundaryProps) {
  const effectiveSource = source ?? panelData?.source ?? "unavailable";
  const effectiveStatus = status ?? panelData?.status ?? "unavailable";

  return (
    <span
      data-codexforge-brain-live-data-boundary
      data-codexforge-brain-live-data-panel={panelId}
      data-codexforge-brain-panel-source-live={effectiveSource === "live" ? "true" : undefined}
      data-codexforge-brain-panel-source-fixture={effectiveSource === "fixture" ? "true" : undefined}
      data-codexforge-brain-panel-source-mixed={effectiveSource === "mixed" ? "true" : undefined}
      data-codexforge-brain-panel-source-unavailable={effectiveSource === "unavailable" ? "true" : undefined}
      data-codexforge-brain-panel-data-status={effectiveStatus}
      style={{
        ...badgeStyle,
        borderColor: sourceTone(effectiveSource).border,
        background: sourceTone(effectiveSource).background,
        color: sourceTone(effectiveSource).color,
      }}
      title={`${panelId}: ${effectiveSource} / ${effectiveStatus}`}
    >
      {label ?? `${effectiveSource} / ${effectiveStatus}`}
    </span>
  );
}

function sourceTone(source: CodexForgeBrainPanelDataSource): {
  border: string;
  background: string;
  color: string;
} {
  if (source === "live") {
    return {
      border: "rgba(34,197,94,0.26)",
      background: "rgba(34,197,94,0.10)",
      color: "rgba(220,252,231,0.94)",
    };
  }

  if (source === "mixed") {
    return {
      border: "rgba(125,211,252,0.28)",
      background: "rgba(14,165,233,0.12)",
      color: "rgba(224,242,254,0.94)",
    };
  }

  if (source === "fixture") {
    return {
      border: "rgba(251,191,36,0.24)",
      background: "rgba(251,191,36,0.10)",
      color: "rgba(254,243,199,0.94)",
    };
  }

  return {
    border: "rgba(148,163,184,0.22)",
    background: "rgba(148,163,184,0.08)",
    color: "rgba(226,232,240,0.72)",
  };
}

const badgeStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  borderRadius: 999,
  padding: "3px 8px",
  border: "1px solid rgba(148,163,184,0.22)",
  fontSize: 10,
  fontWeight: 900,
  letterSpacing: 0,
  whiteSpace: "nowrap",
  textTransform: "uppercase",
};
