"use client";

import type { CSSProperties } from "react";
import type { CodexForgeBrainFocusBreadcrumb } from "@/lib/codexforge/brain/runtime";

type BrainFocusBreadcrumbsProps = {
  breadcrumbs: readonly CodexForgeBrainFocusBreadcrumb[];
};

export function BrainFocusBreadcrumbs({ breadcrumbs }: BrainFocusBreadcrumbsProps) {
  const ordered = [...breadcrumbs].sort((a, b) => {
    if (a.depth !== b.depth) return a.depth - b.depth;
    return a.id.localeCompare(b.id);
  });

  return (
    <div data-codexforge-brain-focus-breadcrumbs style={wrapStyle}>
      {ordered.length === 0 ? (
        <span style={emptyStyle}>No drilldown path selected.</span>
      ) : (
        ordered.map((breadcrumb, index) => (
          <span key={breadcrumb.id} style={crumbWrapStyle}>
            {index > 0 ? <span style={dividerStyle}>/</span> : null}
            <span style={crumbStyle} title={breadcrumb.summary}>
              <span style={depthStyle}>{breadcrumb.depth}</span>
              {breadcrumb.label}
            </span>
          </span>
        ))
      )}
    </div>
  );
}

const wrapStyle: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 6,
  alignItems: "center",
  padding: 10,
  borderRadius: 8,
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(255,255,255,0.04)",
  minWidth: 0,
};

const crumbWrapStyle: CSSProperties = {
  display: "inline-flex",
  gap: 6,
  alignItems: "center",
  minWidth: 0,
};

const crumbStyle: CSSProperties = {
  display: "inline-flex",
  gap: 6,
  alignItems: "center",
  maxWidth: 260,
  borderRadius: 999,
  padding: "5px 8px",
  background: "rgba(14,165,233,0.12)",
  color: "rgba(224,242,254,0.92)",
  fontSize: 11,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

const depthStyle: CSSProperties = {
  display: "inline-flex",
  justifyContent: "center",
  alignItems: "center",
  width: 16,
  height: 16,
  borderRadius: 999,
  background: "rgba(125,211,252,0.18)",
  fontSize: 10,
  fontWeight: 900,
  flex: "0 0 auto",
};

const dividerStyle: CSSProperties = {
  color: "rgba(186,230,253,0.45)",
  fontSize: 12,
};

const emptyStyle: CSSProperties = {
  color: "rgba(226,232,240,0.66)",
  fontSize: 12,
};
