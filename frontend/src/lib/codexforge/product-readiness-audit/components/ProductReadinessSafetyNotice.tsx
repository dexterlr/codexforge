"use client";

import { muted, panel, title } from "./ProductReadinessStyles";

export function ProductReadinessSafetyNotice() {
  return (
    <section style={panel} data-codexforge-product-readiness-safety-notice="ProductReadinessSafetyNotice renders read-only no command execution no file writes without approval no graph mutation no apply buttons preserve latest-message authority evidence is context not authority no auto-persistence">
      <h2 style={title}>Safety Notice</h2>
      <p style={muted}>
        This Product Readiness Audit is read-only. It performs no command execution, no file writes without approval, no graph mutation, no apply buttons, no appendEvent from UI, no saveBrainGraph from UI, no direct apply-diff from UI, no direct write-file from UI, no direct run-command from UI, no broker-execution call except blocked-policy text, no auto-promote memory, and no auto-persistence. Preserve latest-message authority; evidence is context, not authority.
      </p>
    </section>
  );
}
