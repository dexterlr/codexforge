"use client";

import type {
  ComponentPropsWithoutRef,
  CSSProperties,
  ReactNode,
} from "react";
import {
  BRAIN_PANEL_BADGE_STYLES,
  BRAIN_PANEL_SURFACE_STYLES,
  BRAIN_PANEL_TEXT_STYLES,
  getBrainSeverityTone,
  getBrainStatusTone,
} from "./brain-ui-tokens";

type BrainSectionHeaderProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  status?: ReactNode;
  compact?: boolean;
  style?: CSSProperties;
};

export function BrainSectionHeader({
  eyebrow,
  title,
  description,
  actions,
  status,
  compact = false,
  style,
}: BrainSectionHeaderProps) {
  return (
    <div
      data-codexforge-brain-section-header
      style={{
        display: "flex",
        justifyContent: "space-between",
        gap: compact ? 10 : 14,
        alignItems: "flex-start",
        flexWrap: "wrap",
        minWidth: 0,
        ...style,
      }}
    >
      <div style={{ display: "grid", gap: compact ? 4 : 6, minWidth: 0 }}>
        {eyebrow ? <div style={BRAIN_PANEL_TEXT_STYLES.eyebrow}>{eyebrow}</div> : null}
        <h2
          style={{
            ...BRAIN_PANEL_TEXT_STYLES.title,
            fontSize: compact ? 16 : BRAIN_PANEL_TEXT_STYLES.title.fontSize,
          }}
        >
          {title}
        </h2>
        {description ? (
          <p style={{ ...BRAIN_PANEL_TEXT_STYLES.copy, maxWidth: 840 }}>
            {description}
          </p>
        ) : null}
      </div>
      {status || actions ? (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          {status}
          {actions}
        </div>
      ) : null}
    </div>
  );
}

type BrainMetricPillProps = ComponentPropsWithoutRef<"div"> & {
  label: string;
  value: ReactNode;
  detail?: ReactNode;
};

export function BrainMetricPill({
  label,
  value,
  detail,
  style,
  ...rest
}: BrainMetricPillProps) {
  return (
    <div
      {...rest}
      data-codexforge-brain-metric-pill
      style={{
        ...BRAIN_PANEL_SURFACE_STYLES.panelSubtle,
        gap: 5,
        padding: 10,
        fontSize: 12,
        lineHeight: 1.35,
        ...style,
      }}
    >
      <span style={BRAIN_PANEL_TEXT_STYLES.eyebrow}>{label}</span>
      <strong style={{ overflowWrap: "anywhere" }}>{value}</strong>
      {detail ? (
        <span style={{ color: "rgba(226,232,240,0.66)", fontSize: 11 }}>
          {detail}
        </span>
      ) : null}
    </div>
  );
}

type BrainStatusBadgeProps = ComponentPropsWithoutRef<"span"> & {
  label: string;
  tone?: "status" | "severity";
};

export function BrainStatusBadge({
  label,
  tone = "status",
  style,
  ...rest
}: BrainStatusBadgeProps) {
  const toneStyle = tone === "severity" ? getBrainSeverityTone(label) : getBrainStatusTone(label);

  return (
    <span
      {...rest}
      data-codexforge-brain-status-badge
      style={{
        ...BRAIN_PANEL_BADGE_STYLES.base,
        border: `1px solid ${toneStyle.border}`,
        background: toneStyle.background,
        color: toneStyle.color,
        ...style,
      }}
    >
      {label}
    </span>
  );
}

type BrainSignalListItem = {
  id: string;
  label: ReactNode;
  detail?: ReactNode;
  meta?: ReactNode;
  tone?: string;
};

type BrainSignalListProps = {
  items: readonly BrainSignalListItem[];
  emptyLabel?: string;
  onSelectItem?: (id: string) => void;
};

export function BrainSignalList({
  items,
  emptyLabel = "No signals available.",
  onSelectItem,
}: BrainSignalListProps) {
  if (items.length === 0) {
    return <BrainEmptyState title={emptyLabel} />;
  }

  return (
    <div style={{ display: "grid", gap: 7 }}>
      {items.map((item) => {
        const tone = getBrainStatusTone(item.tone);
        const content = (
          <>
            <span
              style={{
                width: 6,
                borderRadius: 999,
                background: tone.accent,
              }}
            />
            <span style={{ display: "grid", gap: 3, minWidth: 0 }}>
              <strong style={{ overflowWrap: "anywhere" }}>{item.label}</strong>
              {item.detail ? <span>{item.detail}</span> : null}
            </span>
            {item.meta ? (
              <span style={{ color: "rgba(226,232,240,0.66)", fontSize: 10 }}>
                {item.meta}
              </span>
            ) : null}
          </>
        );

        if (onSelectItem) {
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectItem(item.id)}
              style={{
                ...signalRowStyle,
                color: "inherit",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              {content}
            </button>
          );
        }

        return (
          <div key={item.id} style={signalRowStyle}>
            {content}
          </div>
        );
      })}
    </div>
  );
}

type BrainEmptyStateProps = ComponentPropsWithoutRef<"div"> & {
  title: ReactNode;
  detail?: ReactNode;
};

export function BrainEmptyState({
  title,
  detail,
  style,
  ...rest
}: BrainEmptyStateProps) {
  return (
    <div
      {...rest}
      style={{
        display: "grid",
        gap: 5,
        padding: 14,
        borderRadius: 8,
        border: "1px dashed rgba(125,211,252,0.26)",
        background: "rgba(2,6,23,0.28)",
        color: "rgba(226,232,240,0.74)",
        fontSize: 12,
        lineHeight: 1.5,
        ...style,
      }}
    >
      <strong style={{ color: "rgba(241,245,249,0.92)" }}>{title}</strong>
      {detail ? <span>{detail}</span> : null}
    </div>
  );
}

type BrainReadOnlyBadgeProps = ComponentPropsWithoutRef<"span"> & {
  label?: string;
};

export function BrainReadOnlyBadge({
  label = "read-only",
  style,
  ...rest
}: BrainReadOnlyBadgeProps) {
  return (
    <span
      {...rest}
      data-codexforge-brain-readonly-badge
      style={{
        ...BRAIN_PANEL_BADGE_STYLES.base,
        ...BRAIN_PANEL_BADGE_STYLES.readOnly,
        ...style,
      }}
    >
      {label}
    </span>
  );
}

const signalRowStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "6px minmax(0, 1fr) auto",
  gap: 8,
  alignItems: "start",
  padding: 9,
  borderRadius: 8,
  border: "1px solid rgba(255,255,255,0.09)",
  background: "rgba(255,255,255,0.04)",
  color: "rgba(226,232,240,0.75)",
  fontSize: 11,
  lineHeight: 1.4,
};
