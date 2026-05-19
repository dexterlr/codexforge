import type { CSSProperties } from "react";
import type { ProjectFileMetadata } from "../local-project-reader-types";

export function ProjectFileMetadataPanel({ metadata }: { metadata: ProjectFileMetadata | null }) {
  return (
    <section
      data-codexforge-project-file-metadata-panel="ProjectFileMetadataPanel renders file metadata read-only posture safe preview eligibility"
      style={panel}
    >
      <div style={eyebrow}>Metadata</div>
      {metadata ? (
        <div style={grid}>
          <Field label="Path" value={metadata.path} />
          <Field label="Category" value={metadata.category} />
          <Field label="Role" value={metadata.probableRole} />
          <Field label="Language" value={metadata.language} />
          <Field label="Size" value={metadata.sizeLabel} />
          <Field label="Lines" value={metadata.lineCount === null ? "unknown" : String(metadata.lineCount)} />
          <Field label="Imports" value={metadata.importCount === null ? "unknown" : String(metadata.importCount)} />
          <Field label="Exports" value={metadata.exportCount === null ? "unknown" : String(metadata.exportCount)} />
          <Field label="Preview" value={metadata.safePreviewEligibility} />
          <Field label="Posture" value={metadata.readOnlyPosture} />
        </div>
      ) : (
        <p style={body}>Select a file to see deterministic metadata.</p>
      )}
    </section>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div style={field}>
      <span style={labelStyle}>{label}</span>
      <strong style={valueStyle}>{value}</strong>
    </div>
  );
}

const panel: CSSProperties = {
  border: "1px solid rgba(148,163,184,0.16)",
  background: "rgba(15,23,42,0.68)",
  borderRadius: 8,
  padding: 12,
  display: "grid",
  gap: 10,
  minWidth: 0,
};

const eyebrow: CSSProperties = {
  color: "#93c5fd",
  fontSize: 11,
  fontWeight: 900,
  textTransform: "uppercase",
};

const grid: CSSProperties = {
  display: "grid",
  gap: 8,
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 150px), 1fr))",
  minWidth: 0,
};

const field: CSSProperties = {
  border: "1px solid rgba(148,163,184,0.12)",
  background: "rgba(2,6,23,0.48)",
  borderRadius: 8,
  display: "grid",
  gap: 4,
  minWidth: 0,
  padding: 9,
};

const labelStyle: CSSProperties = {
  color: "#94a3b8",
  fontSize: 10,
  fontWeight: 850,
  textTransform: "uppercase",
};

const valueStyle: CSSProperties = {
  color: "#f8fafc",
  fontSize: 12,
  lineHeight: 1.3,
  overflowWrap: "anywhere",
};

const body: CSSProperties = {
  color: "#cbd5e1",
  fontSize: 12,
  lineHeight: 1.45,
  margin: 0,
};

