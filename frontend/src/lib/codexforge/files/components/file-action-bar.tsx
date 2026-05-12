"use client";

import type { CSSProperties } from "react";
import { getAvailableFileActions } from "../file-intelligence";
import type { CodexForgeFileAction, CodexForgeFileNode } from "../types";

type FileActionBarProps = {
  file: CodexForgeFileNode;
  activeAction: CodexForgeFileAction;
  onAction: (action: CodexForgeFileAction) => void;
};

export function FileActionBar({ file, activeAction, onAction }: FileActionBarProps) {
  return (
    <section data-codexforge-file-action-bar style={panel}>
      <div style={header}>
        <div>
          <div style={eyebrow}>Preview command rail</div>
          <h2 style={title}>Actions for {file.name}</h2>
        </div>
        <span style={status}>inert in Phase 3A</span>
      </div>

      <div style={actions}>
        {getAvailableFileActions().map((action) => {
          const selected = action === activeAction;
          return (
            <button
              key={action}
              type="button"
              onClick={() => onAction(action)}
              style={{
                ...button,
                background: selected ? "rgba(16,185,129,0.18)" : "rgba(255,255,255,0.05)",
                borderColor: selected ? "rgba(16,185,129,0.42)" : "rgba(255,255,255,0.12)",
              }}
            >
              {action}
            </button>
          );
        })}
      </div>
    </section>
  );
}

const panel: CSSProperties = {
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(255,255,255,0.045)",
  borderRadius: 8,
  padding: 12,
  display: "grid",
  gap: 12,
};

const header: CSSProperties = {
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
  fontSize: 14,
};

const status: CSSProperties = {
  border: "1px solid rgba(255,255,255,0.14)",
  borderRadius: 7,
  padding: "5px 8px",
  fontSize: 11,
  opacity: 0.76,
};

const actions: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
};

const button: CSSProperties = {
  color: "inherit",
  border: "1px solid",
  borderRadius: 8,
  padding: "8px 10px",
  fontSize: 12,
  fontWeight: 800,
  cursor: "pointer",
  textTransform: "capitalize",
};
