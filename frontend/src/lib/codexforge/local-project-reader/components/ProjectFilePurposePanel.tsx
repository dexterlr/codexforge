import type { CSSProperties } from "react";
import type { ProjectFilePurpose } from "../local-project-reader-types";
import { buildLocalProjectReaderStableKey } from "../local-project-reader-types";

export function ProjectFilePurposePanel({ purpose }: { purpose: ProjectFilePurpose | null }) {
  return (
    <section
      data-codexforge-project-file-purpose-panel="ProjectFilePurposePanel renders deterministic purpose page.tsx route.ts smoke-codexforge"
      style={panel}
    >
      <div style={eyebrow}>Purpose</div>
      {purpose ? (
        <>
          <strong style={title}>{purpose.kind}</strong>
          <p style={body}>{purpose.summary}</p>
          <div style={evidenceList}>
            {purpose.evidence.map((item, index) => (
              <span key={buildLocalProjectReaderStableKey("purpose", purpose.path, item, index)} style={chip}>
                {item}
              </span>
            ))}
          </div>
          <p style={body}>{purpose.suggestedInspection}</p>
        </>
      ) : (
        <p style={body}>Select a file to infer deterministic purpose.</p>
      )}
    </section>
  );
}

const panel: CSSProperties = {
  border: "1px solid rgba(148,163,184,0.16)",
  background: "rgba(15,23,42,0.68)",
  borderRadius: 8,
  padding: 12,
  display: "grid",
  gap: 9,
  minWidth: 0,
};

const eyebrow: CSSProperties = {
  color: "#93c5fd",
  fontSize: 11,
  fontWeight: 900,
  textTransform: "uppercase",
};

const title: CSSProperties = {
  color: "#f8fafc",
  fontSize: 15,
  lineHeight: 1.3,
  overflowWrap: "anywhere",
};

const body: CSSProperties = {
  color: "#cbd5e1",
  fontSize: 12,
  lineHeight: 1.45,
  margin: 0,
  overflowWrap: "anywhere",
};

const evidenceList: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 7,
};

const chip: CSSProperties = {
  border: "1px solid rgba(125,211,252,0.20)",
  borderRadius: 8,
  color: "#bfdbfe",
  fontSize: 11,
  fontWeight: 850,
  padding: "6px 8px",
};

