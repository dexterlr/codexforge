import Link from "next/link";
import type { CSSProperties } from "react";
import type { TaskActivationHandoff } from "@/lib/codexforge/task-activation";

export function TaskActivationHandoffPanel({
  handoff,
  copied,
  onCopy,
}: {
  handoff: TaskActivationHandoff | null;
  copied?: boolean;
  onCopy?: () => void;
}) {
  return (
    <section style={panel} data-codexforge-task-activation-handoff-panel>
      <div style={eyebrow}>Visible Jarvis handoff</div>
      <strong style={title}>Copy activation prompt into composer</strong>
      <p style={body}>
        This does not silently set activeTask or inject context. Copy the reviewed prompt into Jarvis only when you choose.
      </p>
      <pre style={prompt}>{handoff?.prompt ?? "Preview and prepare handoff before copying an activation prompt."}</pre>
      <div style={buttons}>
        <button type="button" onClick={onCopy} disabled={!handoff} style={button}>
          {copied ? "Copied" : "Copy activation prompt"}
        </button>
        <Link href="/jarvis" style={link}>
          Open Jarvis
        </Link>
      </div>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(45,212,191,0.20)", background: "rgba(8,13,24,0.82)", borderRadius: 8, padding: 14, display: "grid", gap: 10, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const title: CSSProperties = { color: "#f8fafc", overflowWrap: "anywhere" };
const body: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 12, lineHeight: 1.4, overflowWrap: "anywhere" };
const prompt: CSSProperties = { margin: 0, maxHeight: 300, overflow: "auto", whiteSpace: "pre-wrap", overflowWrap: "anywhere", color: "#dbeafe", border: "1px solid rgba(148,163,184,0.14)", background: "rgba(2,6,23,0.55)", borderRadius: 8, padding: 10, fontSize: 11, lineHeight: 1.45 };
const buttons: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8, minWidth: 0 };
const button: CSSProperties = { color: "#021014", border: "1px solid rgba(94,234,212,0.42)", background: "#5eead4", borderRadius: 8, padding: "9px 11px", fontSize: 12, fontWeight: 900, cursor: "pointer" };
const link: CSSProperties = { color: "#dbeafe", border: "1px solid rgba(125,211,252,0.18)", background: "rgba(14,165,233,0.08)", borderRadius: 8, padding: "9px 11px", textDecoration: "none", fontSize: 12, fontWeight: 850 };
