"use client";

import type { CSSProperties } from "react";
import type { RuntimeEventRequest, RuntimeEventRequestValidation } from "../runtime-event-executor-types";

export function RuntimeEventRequestPanel({ request, validation }: { request: RuntimeEventRequest; validation: RuntimeEventRequestValidation }) {
  return (
    <section style={panel} data-codexforge-runtime-event-request-panel="RuntimeEventRequestPanel renders">
      <strong>Runtime Event Request</strong>
      <span style={meta}>{request.requestedEventType}</span>
      <p style={text}>{validation.valid ? "Request is structurally valid." : validation.blockedReasons.join(", ")}</p>
      <pre style={pre}>{JSON.stringify({ id: request.id, sourceGateId: request.sourceGateId, evidenceRefs: request.evidenceRefs }, null, 2)}</pre>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", background: "rgba(2,6,23,0.42)", borderRadius: 8, padding: 12, display: "grid", gap: 8, minWidth: 0 };
const meta: CSSProperties = { color: "#5eead4", fontSize: 12, fontWeight: 900, overflowWrap: "anywhere" };
const text: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 12, lineHeight: 1.5, overflowWrap: "anywhere" };
const pre: CSSProperties = { margin: 0, color: "#dbeafe", fontSize: 11, lineHeight: 1.45, whiteSpace: "pre-wrap", overflowWrap: "anywhere" };
