"use client";

import type { CSSProperties } from "react";
import type { CodexForgeFileDependency, CodexForgeFileNode } from "../types";

type RelatedFilesPanelProps = {
  file: CodexForgeFileNode;
  files: CodexForgeFileNode[];
  dependencies: CodexForgeFileDependency[];
  onSelectPath: (path: string) => void;
};

export function RelatedFilesPanel({
  file,
  files,
  dependencies,
  onSelectPath,
}: RelatedFilesPanelProps) {
  const relatedPaths = new Set(
    dependencies
      .filter((dependency) => dependency.fromPath === file.path || dependency.toPath === file.path)
      .flatMap((dependency) => [dependency.fromPath, dependency.toPath])
      .filter((path) => path !== file.path)
  );

  const relatedFiles = files.filter((candidate) => relatedPaths.has(candidate.path));

  return (
    <section data-codexforge-related-files-panel style={panel}>
      <div style={eyebrow}>Related files</div>
      <div style={list}>
        {relatedFiles.length === 0 ? (
          <p style={body}>No direct fixture dependency is attached.</p>
        ) : (
          relatedFiles.map((related) => (
            <button
              key={related.path}
              type="button"
              onClick={() => onSelectPath(related.path)}
              style={button}
            >
              <strong>{related.name}</strong>
              <span>{related.ownerArea}</span>
            </button>
          ))
        )}
      </div>
      <div style={concepts}>
        {file.concepts.map((concept) => (
          <span key={concept}>{concept}</span>
        ))}
      </div>
    </section>
  );
}

const panel: CSSProperties = {
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(255,255,255,0.04)",
  borderRadius: 8,
  padding: 12,
  display: "grid",
  gap: 10,
};

const eyebrow: CSSProperties = {
  fontSize: 11,
  fontWeight: 900,
  textTransform: "uppercase",
  opacity: 0.62,
};

const list: CSSProperties = {
  display: "grid",
  gap: 8,
};

const button: CSSProperties = {
  color: "inherit",
  textAlign: "left",
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(0,0,0,0.18)",
  borderRadius: 8,
  padding: 10,
  display: "grid",
  gap: 4,
  fontSize: 12,
  cursor: "pointer",
};

const body: CSSProperties = {
  margin: 0,
  fontSize: 12,
  opacity: 0.72,
};

const concepts: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 7,
  fontSize: 11,
  opacity: 0.76,
};
