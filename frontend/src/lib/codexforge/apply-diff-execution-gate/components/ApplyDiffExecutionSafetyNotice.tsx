"use client";

import type { CSSProperties } from "react";

export function ApplyDiffExecutionSafetyNotice() {
  return (
    <section
      style={notice}
      data-codexforge-apply-diff-execution-safety="explicit operator approval required no silent execution apply-diff is approval-required execute route is the guarded boundary verification required after dispatch rollback plan required preserve latest-message authority"
    >
      <strong>Apply-Diff Execution Gate safety notice</strong>
      <p style={copy}>
        explicit operator approval required. no silent execution. apply-diff is approval-required. execute route is the
        guarded boundary. verification required after dispatch. rollback plan required. preserve latest-message
        authority.
      </p>
    </section>
  );
}

const notice: CSSProperties = {
  border: "1px solid rgba(250,204,21,0.24)",
  background: "rgba(113,63,18,0.18)",
  borderRadius: 8,
  color: "#fef3c7",
  padding: 12,
  display: "grid",
  gap: 6,
  minWidth: 0,
};
const copy: CSSProperties = { margin: 0, fontSize: 12, lineHeight: 1.45, overflowWrap: "anywhere" };
