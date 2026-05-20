"use client";

import type { SandboxCancellationPlan } from "../creative-execution-sandbox-types";
import { buildCreativeExecutionSandboxReactKey } from "../creative-execution-sandbox-types";
import { SandboxList, SandboxPanel, pill, safeText, titleStyle } from "./shared";

export function SandboxCancellationPanel({ plan }: { plan: SandboxCancellationPlan }) {
  return (
    <SandboxPanel marker="SandboxCancellationPanel renders">
      <h2 style={titleStyle}>Cancellation</h2>
      <span style={pill}>{plan.status}</span>
      <p style={{ margin: 0, color: "#cbd5e1", ...safeText }}>{plan.noLocalProcessToKill}</p>
      <p style={{ margin: 0, color: "#cbd5e1", ...safeText }}>{plan.noRealRenderToStop}</p>
      <div style={{ display: "grid", gap: 8, minWidth: 0 }}>
        {plan.events.map((event) => (
          <article key={buildCreativeExecutionSandboxReactKey("cancel", event.eventId, event.order)} style={{ border: "1px solid rgba(148,163,184,0.14)", borderRadius: 8, padding: 10, display: "grid", gap: 5, minWidth: 0 }}>
            <strong style={safeText}>{event.order}. {event.label}</strong>
            <span style={pill}>{event.status}</span>
            <span style={{ color: "#cbd5e1", ...safeText }}>{event.detail}</span>
          </article>
        ))}
      </div>
      <SandboxList title="Cancellation summary" items={plan.summary} />
    </SandboxPanel>
  );
}
