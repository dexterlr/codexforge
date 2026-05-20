"use client";

import type { SandboxLifecycle } from "../creative-execution-sandbox-types";
import { buildCreativeExecutionSandboxReactKey } from "../creative-execution-sandbox-types";
import { SandboxList, SandboxPanel, pill, safeText, titleStyle } from "./shared";

export function SandboxLifecyclePanel({ lifecycle }: { lifecycle: SandboxLifecycle }) {
  return (
    <SandboxPanel marker="SandboxLifecyclePanel renders">
      <h2 style={titleStyle}>Lifecycle</h2>
      <span style={pill}>{lifecycle.status}</span>
      <div style={{ display: "grid", gap: 8, minWidth: 0 }}>
        {lifecycle.events.map((event) => (
          <article key={buildCreativeExecutionSandboxReactKey("lifecycle", event.eventId, event.order)} style={{ border: "1px solid rgba(148,163,184,0.14)", borderRadius: 8, padding: 10, display: "grid", gap: 5, minWidth: 0 }}>
            <strong style={safeText}>{event.order}. {event.label}</strong>
            <span style={pill}>{event.kind}</span>
            <span style={{ color: "#cbd5e1", ...safeText }}>{event.detail}</span>
            <span style={{ color: "#99f6e4", fontSize: 12, ...safeText }}>{event.sideEffectSummary}</span>
          </article>
        ))}
      </div>
      <SandboxList title="Lifecycle summary" items={lifecycle.summary} />
    </SandboxPanel>
  );
}
