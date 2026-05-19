"use client";

import { muted, panel, title } from "./ConsolidationStyles";

export function ConsolidationEmptyState() {
  return (
    <section style={panel} data-codexforge-consolidation-empty-state="ConsolidationEmptyState renders read-only empty state no command execution no file writes without approval no graph mutation preserve latest-message authority">
      <h2 style={title}>Consolidation Model Empty</h2>
      <p style={muted}>No consolidation data is available. Return to Operator Home or Product Readiness and keep this surface read-only.</p>
    </section>
  );
}
