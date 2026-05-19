import type { CSSProperties } from "react";
import type { ProjectReaderHandoff } from "../local-project-reader-types";

export function ProjectReaderHandoffPanel({
  handoff,
  onCopy,
}: {
  handoff: ProjectReaderHandoff | null;
  onCopy: (label: string, value: string) => void;
}) {
  return (
    <section
      data-codexforge-project-reader-handoff-panel="ProjectReaderHandoffPanel renders inspect this file prepare safe patch preview explain file purpose find related files copy read-only context"
      style={panel}
    >
      <div style={eyebrow}>Handoff</div>
      {handoff ? (
        <>
          <p style={body}>{handoff.summary}</p>
          <div style={buttonRow}>
            <button type="button" onClick={() => onCopy("context", handoff.copyContext)} style={button}>
              Copy read-only context
            </button>
            <button type="button" onClick={() => onCopy("patch prompt", handoff.patchPreviewPrompt)} style={button}>
              Copy Safe Patch Preview prompt
            </button>
          </div>
          <pre style={promptBox}>{handoff.patchPreviewPrompt}</pre>
        </>
      ) : (
        <p style={body}>Select and read a file to prepare copy-only handoff context.</p>
      )}
    </section>
  );
}

const panel: CSSProperties = {
  border: "1px solid rgba(45,212,191,0.18)",
  background: "rgba(8,47,73,0.24)",
  borderRadius: 8,
  padding: 12,
  display: "grid",
  gap: 10,
  minWidth: 0,
};

const eyebrow: CSSProperties = {
  color: "#99f6e4",
  fontSize: 11,
  fontWeight: 900,
  textTransform: "uppercase",
};

const body: CSSProperties = {
  color: "#dbeafe",
  fontSize: 12,
  lineHeight: 1.45,
  margin: 0,
  overflowWrap: "anywhere",
};

const buttonRow: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
};

const button: CSSProperties = {
  background: "rgba(20,184,166,0.16)",
  border: "1px solid rgba(45,212,191,0.28)",
  borderRadius: 8,
  color: "#ccfbf1",
  cursor: "pointer",
  fontSize: 12,
  fontWeight: 850,
  padding: "9px 10px",
};

const promptBox: CSSProperties = {
  background: "rgba(2,6,23,0.74)",
  border: "1px solid rgba(148,163,184,0.14)",
  borderRadius: 8,
  color: "#dbeafe",
  fontSize: 11,
  lineHeight: 1.45,
  margin: 0,
  maxHeight: 260,
  overflow: "auto",
  overflowWrap: "anywhere",
  padding: 10,
  whiteSpace: "pre-wrap",
};

