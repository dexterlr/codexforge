import type { CSSProperties } from "react";
import type { PatchPreviewContext } from "../real-patch-preview-types";

export function PatchContextPanel({ context }: { context: PatchPreviewContext | null }) {
  return (
    <section
      style={panel}
      data-codexforge-patch-context-panel="PatchContextPanel renders supplied file data capped context no filesystem reads"
    >
      <div style={eyebrow}>Patch Context</div>
      {context ? (
        <>
          <strong style={title}>{context.filePath}</strong>
          <div style={meta}>
            <span>{context.lineCount} lines</span>
            <span>{context.truncated ? "truncated" : "within cap"}</span>
            <span>{context.fileMetadata.category}</span>
            <span>{context.fileRisk.level} reader risk</span>
          </div>
          <p style={copy}>{context.filePurpose.summary}</p>
          <div style={list}>
            {context.relatedWorkflowHints.slice(0, 4).map((hint) => (
              <span key={hint}>{hint}</span>
            ))}
          </div>
          <p style={copy}>{context.noFilesystemReadGuarantee}</p>
        </>
      ) : (
        <p style={copy}>Context appears after preparing a preview from supplied file data.</p>
      )}
    </section>
  );
}

const panel: CSSProperties = {
  border: "1px solid rgba(148,163,184,0.16)",
  background: "rgba(15,23,42,0.58)",
  borderRadius: 8,
  display: "grid",
  gap: 9,
  minWidth: 0,
  padding: 12,
};

const eyebrow: CSSProperties = { color: "#93c5fd", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const title: CSSProperties = { fontSize: 13, overflowWrap: "anywhere" };
const meta: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 6, color: "#bfdbfe", fontSize: 11, fontWeight: 800 };
const copy: CSSProperties = { color: "#dbeafe", fontSize: 12, lineHeight: 1.45, margin: 0, overflowWrap: "anywhere" };
const list: CSSProperties = { display: "grid", gap: 5, color: "#cbd5e1", fontSize: 11, lineHeight: 1.4, overflowWrap: "anywhere" };
