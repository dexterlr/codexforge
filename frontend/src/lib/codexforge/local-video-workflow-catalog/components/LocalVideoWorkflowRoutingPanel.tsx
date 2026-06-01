"use client";

import type { CSSProperties } from "react";
import type { LocalVideoWorkflowRouting } from "../local-video-workflow-types";

export function LocalVideoWorkflowRoutingPanel({ routing }: { routing: LocalVideoWorkflowRouting }) {
  return <div style={box}><strong>Routing</strong><p style={copy}>{routing.localFirstReason}</p><p style={copy}>{routing.cloudFallbackRule}</p><p style={copy}>{routing.approvalBoundary}</p></div>;
}

const box: CSSProperties = { borderTop: "1px solid rgba(148,163,184,0.16)", display: "grid", gap: 6, paddingTop: 10 };
const copy: CSSProperties = { color: "#cbd5e1", fontSize: 13, lineHeight: 1.45, margin: 0 };
