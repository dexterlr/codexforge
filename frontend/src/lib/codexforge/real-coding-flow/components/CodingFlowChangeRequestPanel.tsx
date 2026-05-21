"use client";

import type { CSSProperties } from "react";
import type { CodingFlowChangeRequest } from "../real-coding-flow-types";

export function CodingFlowChangeRequestPanel({ request }: { request: CodingFlowChangeRequest }) {
  return (
    <section style={panel} data-codexforge-coding-flow-change-request-panel="CodingFlowChangeRequestPanel renders Describe what you want changed Keep it specific You can preview before anything is applied change request validation blocks missing file change request validation blocks missing change text">
      <h2 style={title}>Describe change</h2>
      <p style={copy}>Describe what you want changed. Keep it specific. You can preview before anything is applied.</p>
      <div style={status}>{request.readyForPreview ? "Ready for preview" : request.blockedReasons.join(" ")}</div>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", borderRadius: 8, display: "grid", gap: 10, minWidth: 0, padding: 14 };
const title: CSSProperties = { fontSize: 16, lineHeight: 1.25, margin: 0, overflowWrap: "normal" };
const copy: CSSProperties = { color: "#cbd5e1", fontSize: 13, lineHeight: 1.45, margin: 0 };
const status: CSSProperties = { color: "#dbeafe", fontSize: 12, overflowWrap: "break-word" };
