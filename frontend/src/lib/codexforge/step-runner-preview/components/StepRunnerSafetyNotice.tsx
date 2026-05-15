import type { CSSProperties } from "react";

export function StepRunnerSafetyNotice() {
  return (
    <section
      style={notice}
      data-codexforge-step-runner-safety-notice="No step execution in Phase 25 Future run requires approval no file mutation dry run plan approval packet"
    >
      <div style={eyebrow}>Step Runner safety</div>
      <div style={copy}>
        <strong style={title}>No step execution in Phase 25</strong>
        <p style={body}>
          Approved Step Runner Preview prepares visible input, policy posture, tool plan, approval packet, dry run plan,
          result preview, and ledger only.
        </p>
        <p style={body}>
          Future run requires approval. The UI performs no file mutation, no command execution, no Brain graph mutation,
          no memory mutation, no broker execution, no AI calls, and no network calls.
        </p>
      </div>
    </section>
  );
}

const notice: CSSProperties = {
  border: "1px solid rgba(248,113,113,0.28)",
  background: "rgba(127,29,29,0.16)",
  borderRadius: 8,
  padding: 14,
  display: "grid",
  gap: 8,
  minWidth: 0,
};
const copy: CSSProperties = { display: "grid", gap: 6, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#fecaca", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const title: CSSProperties = { color: "#f8fafc", overflowWrap: "anywhere" };
const body: CSSProperties = { margin: 0, color: "#fecaca", fontSize: 12, lineHeight: 1.45, overflowWrap: "anywhere" };
