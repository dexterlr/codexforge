import type { CSSProperties } from "react";
import type { TaskActivationRequest } from "@/lib/codexforge/task-activation";

export function TaskActivationRequestPanel({ request }: { request: TaskActivationRequest | null }) {
  return (
    <section style={panel} data-codexforge-task-activation-request-panel>
      <div style={eyebrow}>Activation request</div>
      <h2 style={heading}>{request?.suggestedTaskTitle ?? "Select and accept a suggestion"}</h2>
      <p style={body}>
        {request
          ? request.noRunGuarantee
          : "Accepted task suggestions can build an activation request after review approval."}
      </p>
      {request ? (
        <div style={grid}>
          <Info label="Request" value={request.id} />
          <Info label="Suggestion" value={request.taskSuggestionId} />
          <Info label="Approval" value={request.approved ? "approved" : "explicit review approval required"} />
          <Info label="Readiness" value={request.activationReadiness} />
          <Info label="Domain" value={request.domain} />
          <Info label="Steps" value={String(request.steps.length)} />
        </div>
      ) : null}
    </section>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div style={info}>
      <span style={labelStyle}>{label}</span>
      <strong style={valueStyle}>{value}</strong>
    </div>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(148,163,184,0.18)", background: "rgba(15,23,42,0.62)", borderRadius: 8, padding: 16, display: "grid", gap: 10, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#67e8f9", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const heading: CSSProperties = { margin: 0, fontSize: 20, letterSpacing: 0, overflowWrap: "anywhere" };
const body: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 13, lineHeight: 1.45, overflowWrap: "anywhere" };
const grid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 190px), 1fr))", gap: 8, minWidth: 0 };
const info: CSSProperties = { border: "1px solid rgba(148,163,184,0.14)", background: "rgba(2,6,23,0.4)", borderRadius: 8, padding: 10, display: "grid", gap: 4, minWidth: 0 };
const labelStyle: CSSProperties = { color: "#94a3b8", fontSize: 10, fontWeight: 900, textTransform: "uppercase" };
const valueStyle: CSSProperties = { color: "#f8fafc", fontSize: 12, overflowWrap: "anywhere" };
