import type { CSSProperties } from "react";
import type { ProjectFilePreview } from "../local-project-reader-types";

export function ProjectFilePreviewPanel({
  preview,
  selectedPath,
  loading,
  error,
  onRead,
}: {
  preview: ProjectFilePreview | null;
  selectedPath: string;
  loading: boolean;
  error: string;
  onRead: () => void;
}) {
  return (
    <section
      data-codexforge-project-file-preview-panel="ProjectFilePreviewPanel renders read-only file preview no raw giant JSON"
      style={panel}
    >
      <div style={header}>
        <div>
          <div style={eyebrow}>Read-only preview</div>
          <strong style={selected}>{selectedPath || "No file selected"}</strong>
        </div>
        <button type="button" onClick={onRead} disabled={!selectedPath || loading} style={button}>
          {loading ? "Reading" : "Read preview"}
        </button>
      </div>
      {error ? <div style={errorBox}>{error}</div> : null}
      {preview ? (
        <>
          <pre
            style={previewBox}
            data-codexforge-file-path-panel-overflow="file path panels wrap safely overflowX auto no file writes"
            data-codexforge-file-preview-code-panel="codeBlock jsonPreview overflowX auto whiteSpace pre no overflowWrap anywhere no wordBreak break-word read-only no file writes"
          >
            {preview.contentExcerpt || preview.safetyNote}
          </pre>
          <div style={meta}>
            <span>{preview.lineCount} lines</span>
            <span>{preview.truncated ? "truncated" : "within cap"}</span>
            <span>{preview.detectedMarkers.join(", ") || "no markers"}</span>
          </div>
          <p style={note}>{preview.safetyNote}</p>
        </>
      ) : (
        <p style={note}>Select a file to read a capped, read-only excerpt.</p>
      )}
    </section>
  );
}

const panel: CSSProperties = {
  border: "1px solid rgba(148,163,184,0.16)",
  background: "rgba(2,6,23,0.72)",
  borderRadius: 8,
  padding: 12,
  display: "grid",
  gap: 10,
  minWidth: 0,
};

const header: CSSProperties = {
  alignItems: "start",
  display: "flex",
  gap: 10,
  justifyContent: "space-between",
  minWidth: 0,
  maxWidth: "100%",
};

const eyebrow: CSSProperties = {
  color: "#93c5fd",
  fontSize: 11,
  fontWeight: 900,
  textTransform: "uppercase",
};

const selected: CSSProperties = {
  display: "block",
  fontSize: 14,
  lineHeight: 1.35,
  overflowWrap: "anywhere",
  wordBreak: "break-word",
  maxWidth: "100%",
};

const button: CSSProperties = {
  background: "rgba(20,184,166,0.14)",
  border: "1px solid rgba(45,212,191,0.26)",
  borderRadius: 8,
  color: "#ccfbf1",
  cursor: "pointer",
  flex: "0 0 auto",
  fontSize: 12,
  fontWeight: 850,
  padding: "9px 10px",
};

const previewBox: CSSProperties = {
  background: "rgba(0,0,0,0.32)",
  border: "1px solid rgba(148,163,184,0.14)",
  borderRadius: 8,
  color: "#dbeafe",
  fontSize: 12,
  lineHeight: 1.45,
  margin: 0,
  maxHeight: 430,
  overflowX: "auto",
  overflowY: "auto",
  overflowWrap: "normal",
  wordBreak: "normal",
  padding: 12,
  whiteSpace: "pre",
  maxWidth: "100%",
  minWidth: 0,
};

const meta: CSSProperties = {
  color: "#93c5fd",
  display: "flex",
  flexWrap: "wrap",
  fontSize: 11,
  fontWeight: 850,
  gap: 8,
};

const note: CSSProperties = {
  color: "#cbd5e1",
  fontSize: 12,
  lineHeight: 1.45,
  margin: 0,
  overflowWrap: "anywhere",
  wordBreak: "break-word",
  maxWidth: "100%",
};

const errorBox: CSSProperties = {
  background: "rgba(127,29,29,0.22)",
  border: "1px solid rgba(248,113,113,0.22)",
  borderRadius: 8,
  color: "#fecaca",
  fontSize: 12,
  lineHeight: 1.4,
  padding: 10,
  overflowWrap: "anywhere",
};
