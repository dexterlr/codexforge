"use client";

import type { CSSProperties } from "react";
import type { RuntimeEventPayloadValidation } from "../runtime-event-executor-types";

export function RuntimeEventValidationPanel({ validation }: { validation: RuntimeEventPayloadValidation }) {
  return (
    <section style={panel} data-codexforge-runtime-event-validation-panel="RuntimeEventValidationPanel renders validation checks memory.promoted payload">
      <strong>Runtime Event Validation</strong>
      <p style={text}>{validation.valid ? "Payload valid." : validation.blockedReasons.join(", ")}</p>
      <p style={text}>{validation.summary.join(" ")}</p>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", background: "rgba(2,6,23,0.42)", borderRadius: 8, padding: 12, display: "grid", gap: 8, minWidth: 0 };
const text: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 12, lineHeight: 1.5, overflowWrap: "anywhere" };
