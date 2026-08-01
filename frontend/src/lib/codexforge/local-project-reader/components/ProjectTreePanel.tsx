import type { CSSProperties } from "react";
import type { ProjectTreeModel } from "../local-project-reader-types";
import { buildLocalProjectReaderStableKey } from "../local-project-reader-types";

export function ProjectTreePanel({
  tree,
  selectedPath,
  onSelectPath,
}: {
  tree: ProjectTreeModel;
  selectedPath: string;
  onSelectPath: (path: string) => void;
}) {
  return (
    <section
      data-codexforge-project-tree-panel="ProjectTreePanel renders real project tree stable keys"
      style={panel}
    >
      <div style={header}>
        <div>
          <div style={eyebrow}>Project tree</div>
          <strong>{tree.summary.fileCount} files</strong>
        </div>
        <span style={pill}>{tree.summary.directoryCount} dirs</span>
      </div>
      <div style={treeList}>
        {tree.flattened.slice(0, 240).map((node, index) => {
          const active = node.path === selectedPath;
          return (
            <button
              key={buildLocalProjectReaderStableKey("tree", node.path, index)}
              type="button"
              disabled={!node.selectable}
              aria-pressed={node.selectable ? active : undefined}
              onClick={() => node.selectable && onSelectPath(node.path)}
              style={treeRow(active, node.selectable, node.depth)}
              title={node.path}
            >
              <span style={kind}>{node.type === "directory" ? "dir" : node.extension || "file"}</span>
              <span style={pathText}>{node.path}</span>
              <span style={risk}>{node.riskHint}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function treeRow(active: boolean, selectable: boolean, depth: number): CSSProperties {
  return {
    alignItems: "center",
    border: active ? "1px solid rgba(45,212,191,0.42)" : "1px solid rgba(148,163,184,0.12)",
    background: active ? "rgba(20,184,166,0.15)" : "rgba(15,23,42,0.54)",
    borderRadius: 8,
    color: selectable ? "#e2e8f0" : "#64748b",
    cursor: selectable ? "pointer" : "default",
    display: "grid",
    gap: 8,
    gridTemplateColumns: "42px minmax(0, 1fr) auto",
    minWidth: 0,
    opacity: selectable ? 1 : 0.76,
    padding: "8px 9px",
    paddingLeft: Math.min(28, depth * 8) + 9,
    textAlign: "left",
  };
}

const panel: CSSProperties = {
  border: "1px solid rgba(148,163,184,0.16)",
  background: "rgba(2,6,23,0.70)",
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
  minWidth: 0,
};

const eyebrow: CSSProperties = {
  color: "#93c5fd",
  fontSize: 11,
  fontWeight: 900,
  textTransform: "uppercase",
};

const pill: CSSProperties = {
  border: "1px solid rgba(125,211,252,0.20)",
  borderRadius: 8,
  color: "#bfdbfe",
  fontSize: 11,
  fontWeight: 850,
  padding: "5px 7px",
};

const treeList: CSSProperties = {
  display: "grid",
  gap: 6,
  maxHeight: 660,
  minWidth: 0,
  overflow: "auto",
};

const kind: CSSProperties = {
  color: "#7dd3fc",
  fontSize: 10,
  fontWeight: 900,
  textTransform: "uppercase",
};

const pathText: CSSProperties = {
  fontSize: 12,
  fontWeight: 760,
  lineHeight: 1.35,
  overflowWrap: "anywhere",
};

const risk: CSSProperties = {
  color: "#94a3b8",
  fontSize: 10,
  fontWeight: 850,
  textTransform: "uppercase",
};
