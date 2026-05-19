import type { CSSProperties } from "react";
import type { RealPatchPreviewRollbackPlan } from "../real-patch-preview-types";

export function PatchPreviewRollbackPanel({ plan }: { plan: RealPatchPreviewRollbackPlan | null }) {
  return (
    <section
      style={panel}
      data-codexforge-patch-preview-rollback-panel="PatchPreviewRollbackPanel renders git restore git revert preview-only rollback"
    >
      <div style={eyebrow}>Patch Preview Rollback</div>
      {plan ? (
        <>
          <p style={copy}>{plan.summary}</p>
          <div style={list}>
            {plan.options.map((option) => (
              <div key={option.id} style={item}>
                <strong>{option.label}</strong>
                <span>{option.detail}</span>
                {option.command ? <code style={code}>{option.command}</code> : null}
              </div>
            ))}
          </div>
        </>
      ) : (
        <p style={copy}>Rollback plan appears after preparation.</p>
      )}
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", background: "rgba(15,23,42,0.58)", borderRadius: 8, display: "grid", gap: 9, minWidth: 0, padding: 12 };
const eyebrow: CSSProperties = { color: "#93c5fd", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const copy: CSSProperties = { color: "#dbeafe", fontSize: 12, lineHeight: 1.45, margin: 0, overflowWrap: "anywhere" };
const list: CSSProperties = { display: "grid", gap: 7 };
const item: CSSProperties = { border: "1px solid rgba(255,255,255,0.08)", background: "rgba(0,0,0,0.18)", borderRadius: 8, display: "grid", gap: 4, fontSize: 11, lineHeight: 1.4, overflowWrap: "anywhere", padding: 8 };
const code: CSSProperties = { color: "#bfdbfe", whiteSpace: "pre-wrap" };
