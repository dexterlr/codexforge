import type { CSSProperties } from "react";

export function ReadOnlyExecutionSafetyNotice() {
  return (
    <section
      style={notice}
      data-codexforge-read-only-execution-safety-notice="Read-only execution only Mutation tools remain blocked explicit approval required no file mutation no graph mutation no auto-run"
    >
      <div style={eyebrow}>Read-only execution safety</div>
      <div style={copy}>
        <strong style={title}>Read-only execution only</strong>
        <p style={body}>
          Approved task steps can execute only read-file, list-files, search-project, or snapshot-project after
          explicit approval required data is visible in the request.
        </p>
        <p style={body}>
          Mutation tools remain blocked. The UI performs no file mutation, no command execution, no Brain graph
          mutation, no broker execution, no creative tool execution, and no external API call.
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
