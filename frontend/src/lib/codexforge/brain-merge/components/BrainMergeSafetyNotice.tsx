"use client";

import type { CSSProperties } from "react";
import { BRAIN_MERGE_APPROVAL_BOUNDARY, BRAIN_MERGE_PREVIEW_NOTICE } from "../brain-merge-types";

export function BrainMergeSafetyNotice() {
  return (
    <section style={panel} data-codexforge-brain-merge-safety-notice>
      <strong style={title}>{BRAIN_MERGE_PREVIEW_NOTICE}</strong>
      <p style={copy}>
        persisted memory events to graph reduction preview to graph diff to merge safety review;
        {` ${BRAIN_MERGE_APPROVAL_BOUNDARY}.`} UI review cannot mutate source files, execute commands, or merge the Brain graph.
      </p>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(45,212,191,0.22)", background: "rgba(20,184,166,0.1)", borderRadius: 8, padding: 12, display: "grid", gap: 6, minWidth: 0 };
const title: CSSProperties = { color: "#ccfbf1", overflowWrap: "anywhere" };
const copy: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 13, lineHeight: 1.5, overflowWrap: "anywhere" };
