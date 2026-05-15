import type { CSSProperties } from "react";

export function ExecutionReadinessSafetyNotice() {
  return (
    <section
      style={notice}
      data-codexforge-execution-readiness-safety-notice="execution blocked until approval no auto-run Safe Patch Preview command execution requires approval file mutation requires approval"
    >
      <div style={eyebrow}>Execution readiness safety</div>
      <div style={copy}>
        <strong style={title}>execution blocked until approval</strong>
        <p style={body}>
          Active Task Execution Readiness is analysis only. It does not auto-run tasks, does not mutate files, does
          not mutate memory, and does not mutate Brain graph state.
        </p>
        <p style={body}>
          Safe Patch Preview is required before mutation. command execution requires approval. file mutation requires
          approval. No plan, diff, tool, or test approval is auto-granted.
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
const eyebrow: CSSProperties = {
  color: "#fecaca",
  fontSize: 11,
  fontWeight: 900,
  textTransform: "uppercase",
};
const title: CSSProperties = {
  color: "#f8fafc",
  overflowWrap: "anywhere",
};
const body: CSSProperties = {
  margin: 0,
  color: "#fecaca",
  fontSize: 12,
  lineHeight: 1.45,
  overflowWrap: "anywhere",
};
