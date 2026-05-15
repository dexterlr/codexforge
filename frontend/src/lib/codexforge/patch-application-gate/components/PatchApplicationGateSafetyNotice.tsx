"use client";

import type { CSSProperties } from "react";

export function PatchApplicationGateSafetyNotice() {
  return (
    <section
      style={notice}
      data-codexforge-patch-application-gate-safety="explicit human approval required actual mutation remains blocked pseudo diff alone is not applyable apply-diff requires tool-policy approval current files must be verified rollback plan required preserve latest-message authority"
    >
      <strong>Patch Application Gate safety notice</strong>
      <span>
        Explicit human approval required. Actual mutation remains blocked. Pseudo diff alone is not applyable.
        apply-diff requires tool-policy approval. Current files must be verified. Rollback plan required. Preserve
        latest-message authority.
      </span>
    </section>
  );
}

const notice: CSSProperties = {
  border: "1px solid rgba(248,113,113,0.26)",
  background: "rgba(127,29,29,0.18)",
  borderRadius: 8,
  padding: 12,
  display: "grid",
  gap: 5,
  color: "#fee2e2",
  fontSize: 12,
  lineHeight: 1.5,
  overflowWrap: "anywhere",
};
