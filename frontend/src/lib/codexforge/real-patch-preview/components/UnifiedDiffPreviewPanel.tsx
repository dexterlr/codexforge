import type { CSSProperties } from "react";
import type { UnifiedDiffPreview } from "../real-patch-preview-types";

export function UnifiedDiffPreviewPanel({ diffPreview }: { diffPreview: UnifiedDiffPreview | null }) {
  return (
    <section
      style={panel}
      data-codexforge-unified-diff-preview-panel="UnifiedDiffPreviewPanel renders preview-only unified diff no apply no file writes"
    >
      <div style={eyebrow}>Unified Diff Preview</div>
      {diffPreview ? (
        <>
          <strong style={title}>{diffPreview.previewOnlyLabel}</strong>
          <div style={meta}>
            <span>{diffPreview.mode}</span>
            <span>+{diffPreview.additions}</span>
            <span>-{diffPreview.removals}</span>
          </div>
          <pre style={pre} data-codexforge-unified-diff-overflow="overflowX auto preview-only no apply no file writes">{diffPreview.diffText}</pre>
          <p style={copy}>{diffPreview.notAppliedGuarantee}</p>
        </>
      ) : (
        <p style={copy}>Diff preview appears after preparation. It will be preview-only.</p>
      )}
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(251,191,36,0.22)", background: "rgba(120,53,15,0.14)", borderRadius: 8, display: "grid", gap: 9, minWidth: 0, padding: 12 };
const eyebrow: CSSProperties = { color: "#fde68a", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const title: CSSProperties = { color: "#fef3c7", fontSize: 13, lineHeight: 1.35, overflowWrap: "anywhere" };
const meta: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 6, color: "#fde68a", fontSize: 11, fontWeight: 800 };
const pre: CSSProperties = { background: "rgba(0,0,0,0.32)", border: "1px solid rgba(255,255,255,0.10)", borderRadius: 8, color: "#f8fafc", fontSize: 11, lineHeight: 1.45, margin: 0, maxHeight: 320, maxWidth: "100%", minWidth: 0, overflowX: "auto", overflowY: "auto", overflowWrap: "anywhere", wordBreak: "break-word", padding: 10, whiteSpace: "pre-wrap" };
const copy: CSSProperties = { color: "#fef3c7", fontSize: 12, lineHeight: 1.45, margin: 0, overflowWrap: "anywhere" };
