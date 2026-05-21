"use client";

import type { CSSProperties } from "react";
import type { ProductSimplificationSafetyBadge } from "../product-simplification-types";

export function SimplifiedSafetyBadge({ label }: { label: ProductSimplificationSafetyBadge }) {
  return (
    <span style={badge} data-codexforge-simplified-safety-badge="SimplifiedSafetyBadge renders Review first Approval required No auto-run No file writes Preview only Simulation only Design only">
      {label}
    </span>
  );
}

const badge: CSSProperties = {
  border: "1px solid rgba(45,212,191,0.3)",
  borderRadius: 8,
  color: "#ccfbf1",
  display: "inline-flex",
  fontSize: 11,
  fontWeight: 900,
  lineHeight: 1.2,
  padding: "6px 8px",
  whiteSpace: "nowrap",
};
