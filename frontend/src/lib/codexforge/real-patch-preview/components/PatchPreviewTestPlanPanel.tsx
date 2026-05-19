import type { CSSProperties } from "react";
import type { RealPatchPreviewTestPlan } from "../real-patch-preview-types";

export function PatchPreviewTestPlanPanel({ plan }: { plan: RealPatchPreviewTestPlan | null }) {
  return (
    <section
      style={panel}
      data-codexforge-patch-preview-test-plan-panel="PatchPreviewTestPlanPanel renders npm run build git diff --check copy commands only"
    >
      <div style={eyebrow}>Patch Preview Test Plan</div>
      {plan ? (
        <>
          <p style={copy}>{plan.summary}</p>
          <div style={list}>
            {plan.commands.map((command) => (
              <code key={command} style={code}>{command}</code>
            ))}
          </div>
          <p style={copy}>{plan.copyOnlyNotice}</p>
        </>
      ) : (
        <p style={copy}>Test plan appears after preparation. Commands are copy-only.</p>
      )}
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(52,211,153,0.20)", background: "rgba(20,83,45,0.14)", borderRadius: 8, display: "grid", gap: 9, minWidth: 0, padding: 12 };
const eyebrow: CSSProperties = { color: "#bbf7d0", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const copy: CSSProperties = { color: "#dcfce7", fontSize: 12, lineHeight: 1.45, margin: 0, overflowWrap: "anywhere" };
const list: CSSProperties = { display: "grid", gap: 6 };
const code: CSSProperties = { background: "rgba(0,0,0,0.24)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 8, color: "#f8fafc", fontSize: 11, lineHeight: 1.4, overflowWrap: "anywhere", padding: 8, whiteSpace: "pre-wrap" };
