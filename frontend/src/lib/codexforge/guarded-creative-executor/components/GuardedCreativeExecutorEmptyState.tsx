"use client";

import { panel, titleStyle } from "./shared";

export function GuardedCreativeExecutorEmptyState({ reason }: { reason: string }) {
  return (
    <section style={panel} data-guarded-creative-executor-empty-state="GuardedCreativeExecutorEmptyState renders empty state dry-run-first future guarded executor">
      <h2 style={titleStyle}>Guarded executor unavailable</h2>
      <p style={{ margin: 0, color: "#cbd5e1" }}>{reason}</p>
    </section>
  );
}
