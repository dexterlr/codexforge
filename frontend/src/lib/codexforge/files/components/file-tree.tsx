"use client";

import type { CSSProperties } from "react";
import { calculateFileRisk } from "../file-risk";
import {
  buildCodexForgeFileReactKey,
  getCodexForgeFileCategory,
} from "../file-search";
import type { CodexForgeFileNode } from "../types";
import { FileRiskBadge } from "./file-risk-badge";

type FileTreeProps = {
  files: CodexForgeFileNode[];
  selectedPath: string;
  onSelectPath: (path: string) => void;
};

export function FileTree({ files, selectedPath, onSelectPath }: FileTreeProps) {
  const groups = groupFiles(files);

  return (
    <section data-codexforge-file-tree data-codexforge-files-overflow-guard style={panel}>
      <div style={sectionHeader}>
        <div>
          <div style={eyebrow}>File graph</div>
          <h2 style={title}>{files.length} indexed files</h2>
        </div>
        <span style={shortcut}>Enter opens</span>
      </div>

      <div style={list}>
        {groups.map((group, groupIndex) => (
          <div
            key={buildCodexForgeFileReactKey("file-tree-group", [group.category], groupIndex)}
            style={groupBlock}
          >
            <div style={groupHeader}>
              <span>{group.category}</span>
              <span>{group.files.length}</span>
            </div>
            {group.files.map((file, fileIndex) => {
              const selected = file.path === selectedPath;
              const risk = calculateFileRisk(file);

              return (
                <button
                  key={buildCodexForgeFileReactKey("file-tree-file", [group.category, file.path], fileIndex)}
                  type="button"
                  onClick={() => onSelectPath(file.path)}
                  style={{
                    ...row,
                    borderColor: selected ? "rgba(99,102,241,0.6)" : "rgba(255,255,255,0.10)",
                    background: selected ? "rgba(99,102,241,0.18)" : "rgba(255,255,255,0.04)",
                  }}
                >
                  <div style={rowTop}>
                    <div style={{ minWidth: 0 }}>
                      <strong style={name}>{file.name}</strong>
                      <div style={path}>{file.path}</div>
                    </div>
                    <FileRiskBadge file={file} />
                  </div>
                  <div style={rowMeta}>
                    <span>{file.kind}</span>
                    <span>{file.extension || "no extension"}</span>
                    <span>{file.ownerArea}</span>
                    <span>{file.dependencyIds.length} links</span>
                    <span>{risk.signals.length} signals</span>
                  </div>
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </section>
  );
}

function groupFiles(files: CodexForgeFileNode[]): Array<{ category: string; files: CodexForgeFileNode[] }> {
  const order = [
    "App routes",
    "API routes",
    "Components",
    "Runtime",
    "Tools",
    "Brain",
    "Docs",
    "Scripts",
    "Config",
    "Tests/Smoke",
    "Library",
  ];
  const byCategory = new Map<string, CodexForgeFileNode[]>();

  for (const file of files) {
    const category = getCodexForgeFileCategory(file);
    byCategory.set(category, [...(byCategory.get(category) ?? []), file]);
  }

  return Array.from(byCategory.entries())
    .map(([category, groupedFiles]) => ({
      category,
      files: [...groupedFiles].sort((a, b) => a.path.localeCompare(b.path)),
    }))
    .sort((a, b) => {
      const orderA = order.indexOf(a.category);
      const orderB = order.indexOf(b.category);
      if (orderA !== orderB) return (orderA === -1 ? order.length : orderA) - (orderB === -1 ? order.length : orderB);
      return a.category.localeCompare(b.category);
    });
}

const panel: CSSProperties = {
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(255,255,255,0.045)",
  borderRadius: 8,
  padding: 12,
  display: "grid",
  gap: 12,
  minHeight: 0,
};

const sectionHeader: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: 12,
  alignItems: "flex-start",
};

const eyebrow: CSSProperties = {
  fontSize: 11,
  fontWeight: 900,
  textTransform: "uppercase",
  opacity: 0.62,
};

const title: CSSProperties = {
  margin: "4px 0 0",
  fontSize: 15,
};

const shortcut: CSSProperties = {
  border: "1px solid rgba(255,255,255,0.14)",
  borderRadius: 7,
  padding: "4px 7px",
  fontSize: 11,
  opacity: 0.74,
};

const list: CSSProperties = {
  display: "grid",
  gap: 12,
  overflow: "auto",
  maxHeight: 680,
  paddingRight: 2,
};

const groupBlock: CSSProperties = {
  display: "grid",
  gap: 8,
};

const groupHeader: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: 8,
  color: "rgba(255,255,255,0.72)",
  fontSize: 11,
  fontWeight: 900,
  textTransform: "uppercase",
  borderBottom: "1px solid rgba(255,255,255,0.08)",
  paddingBottom: 6,
};

const row: CSSProperties = {
  width: "100%",
  textAlign: "left",
  color: "inherit",
  border: "1px solid",
  borderRadius: 8,
  padding: 10,
  cursor: "pointer",
  display: "grid",
  gap: 8,
};

const rowTop: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: 10,
  alignItems: "flex-start",
};

const name: CSSProperties = {
  display: "block",
  fontSize: 13,
};

const path: CSSProperties = {
  marginTop: 3,
  fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
  fontSize: 11,
  opacity: 0.68,
  overflowWrap: "anywhere",
};

const rowMeta: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 7,
  fontSize: 11,
  opacity: 0.72,
};
