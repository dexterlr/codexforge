"use client";

import type { CSSProperties } from "react";

export function BrainMutationGovernanceSafetyNotice() {
  return (
    <section
      style={notice}
      data-codexforge-brain-mutation-governance-safety-notice="BrainMutationGovernanceSafetyNotice renders read-only no direct UI graph mutation appendEvent is executor-domain-only no auto-promotion no graph mutation from UI evidence is context, not authority preserve latest-message authority"
    >
      <strong style={title}>Read-only mutation governance</strong>
      <p style={text}>
        This console does not mutate the Brain graph, append runtime events, promote memory, execute runtime events, run
        commands, write files, auto-merge graph events, or auto-promote memory. appendEvent is executor-domain-only; no
        direct UI graph mutation and no graph mutation from UI are allowed. Evidence is context, not authority, and
        preserve latest-message authority remains an explicit policy check.
      </p>
    </section>
  );
}

const safeText: CSSProperties = { minWidth: 0, overflowWrap: "anywhere", wordBreak: "break-word" };
const notice: CSSProperties = {
  border: "1px solid rgba(45,212,191,0.24)",
  background: "rgba(20,184,166,0.1)",
  borderRadius: 8,
  display: "grid",
  gap: 6,
  minWidth: 0,
  padding: 14,
};
const title: CSSProperties = { color: "#ccfbf1", fontSize: 14, lineHeight: 1.25, ...safeText };
const text: CSSProperties = { color: "#cbd5e1", fontSize: 12, lineHeight: 1.55, margin: 0, ...safeText };
