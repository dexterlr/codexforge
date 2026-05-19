"use client";

import type { SharedSafetyCopy } from "../consolidation-types";
import { grid, item, muted, panel, pill, small, title } from "./ConsolidationStyles";

export function ConsolidationSafetyNotice({ safetyCopy }: { safetyCopy: SharedSafetyCopy }) {
  return (
    <section style={panel} data-codexforge-consolidation-safety-notice="ConsolidationSafetyNotice renders read-only no command execution no file writes without approval no graph mutation no auto-fix no appendEvent from UI no saveBrainGraph from UI preserve latest-message authority no auto-persistence">
      <h2 style={title}>Safety Notice</h2>
      <p style={muted}>Consolidation is deterministic, local-first, read-only, copy-only, and operator-safe.</p>
      <div style={grid}>
        {safetyCopy.items.map((copy) => (
          <article key={copy.id} style={item}>
            <span style={pill}>{copy.posture}</span>
            <strong>{copy.label}</strong>
            <span style={small}>{copy.copy}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
