import type { CSSProperties } from "react";
import type { ProjectFileSearchResult } from "../local-project-reader-types";
import { buildLocalProjectReaderStableKey } from "../local-project-reader-types";

export function ProjectFileList({
  results,
  selectedPath,
  onSelectPath,
}: {
  results: ProjectFileSearchResult[];
  selectedPath: string;
  onSelectPath: (path: string) => void;
}) {
  return (
    <section
      data-codexforge-project-file-list="ProjectFileList renders file list path name category risk tokens"
      style={panel}
    >
      <div style={header}>
        <div style={eyebrow}>File list</div>
        <span style={count}>{results.length} shown</span>
      </div>
      <div style={list}>
        {results.slice(0, 120).map((result, index) => {
          const active = result.file.path === selectedPath;
          return (
            <button
              key={buildLocalProjectReaderStableKey("file-list", result.file.path, index)}
              type="button"
              onClick={() => onSelectPath(result.file.path)}
              style={row(active)}
              title={result.file.path}
            >
              <span style={fileName}>{result.file.name}</span>
              <span style={filePath}>{result.file.path}</span>
              <span style={metaLine}>
                {result.file.category} - {result.file.risk} - score {result.score}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function row(active: boolean): CSSProperties {
  return {
    border: active ? "1px solid rgba(52,211,153,0.42)" : "1px solid rgba(148,163,184,0.12)",
    background: active ? "rgba(16,185,129,0.13)" : "rgba(15,23,42,0.56)",
    borderRadius: 8,
    color: "#e5e7eb",
    cursor: "pointer",
    display: "grid",
    gap: 4,
    minWidth: 0,
    padding: 10,
    textAlign: "left",
  };
}

const panel: CSSProperties = {
  border: "1px solid rgba(148,163,184,0.16)",
  background: "rgba(2,6,23,0.68)",
  borderRadius: 8,
  padding: 12,
  display: "grid",
  gap: 10,
  minWidth: 0,
};

const header: CSSProperties = {
  alignItems: "center",
  display: "flex",
  justifyContent: "space-between",
  gap: 10,
};

const eyebrow: CSSProperties = {
  color: "#93c5fd",
  fontSize: 11,
  fontWeight: 900,
  textTransform: "uppercase",
};

const count: CSSProperties = {
  color: "#bfdbfe",
  fontSize: 11,
  fontWeight: 850,
};

const list: CSSProperties = {
  display: "grid",
  gap: 7,
  maxHeight: 420,
  overflow: "auto",
};

const fileName: CSSProperties = {
  fontSize: 13,
  fontWeight: 900,
  lineHeight: 1.25,
  overflowWrap: "anywhere",
};

const filePath: CSSProperties = {
  color: "#94a3b8",
  fontSize: 11,
  lineHeight: 1.35,
  overflowWrap: "anywhere",
};

const metaLine: CSSProperties = {
  color: "#7dd3fc",
  fontSize: 10,
  fontWeight: 850,
  overflowWrap: "anywhere",
  textTransform: "uppercase",
};

