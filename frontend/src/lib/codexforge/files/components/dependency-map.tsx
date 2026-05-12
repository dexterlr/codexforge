"use client";

import type { CSSProperties } from "react";
import type { CodexForgeFileDependency, CodexForgeFileNode } from "../types";

type DependencyMapProps = {
  file: CodexForgeFileNode;
  dependencies: CodexForgeFileDependency[];
};

export function DependencyMap({ file, dependencies }: DependencyMapProps) {
  const active = dependencies.filter(
    (dependency) => dependency.fromPath === file.path || dependency.toPath === file.path
  );

  return (
    <section data-codexforge-dependency-map style={panel}>
      <div style={eyebrow}>Dependency map</div>
      <div style={map}>
        <div style={node}>{file.name}</div>
        {active.map((dependency) => (
          <div key={dependency.id} style={edge}>
            <span style={kind}>{dependency.kind}</span>
            <span style={target}>
              {dependency.fromPath === file.path ? dependency.toPath : dependency.fromPath}
            </span>
            <p style={summary}>{dependency.summary}</p>
          </div>
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

const map: CSSProperties = {
  display: "grid",
  gap: 8,
};

const node: CSSProperties = {
  border: "1px solid rgba(99,102,241,0.42)",
  background: "rgba(99,102,241,0.16)",
  borderRadius: 8,
  padding: 10,
  fontSize: 12,
  fontWeight: 900,
};

const edge: CSSProperties = {
  borderLeft: "2px solid rgba(52,211,153,0.55)",
  padding: "4px 0 4px 10px",
  display: "grid",
  gap: 4,
};

const kind: CSSProperties = {
  fontSize: 10,
  textTransform: "uppercase",
  opacity: 0.62,
  fontWeight: 900,
};

const target: CSSProperties = {
  fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
  fontSize: 11,
  overflowWrap: "anywhere",
};

const summary: CSSProperties = {
  margin: 0,
  fontSize: 12,
  lineHeight: 1.4,
  opacity: 0.74,
};
