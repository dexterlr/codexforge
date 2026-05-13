"use client";

import { useMemo, useState, type CSSProperties } from "react";
import { buildFilesCommandPalette } from "../file-command-palette";
import { buildCodexForgeFileReactKey } from "../file-search";
import type { CodexForgeFileWorkflow } from "../file-workflow";

export function FilesCommandPalette({ workflow }: { workflow: CodexForgeFileWorkflow }) {
  const [open, setOpen] = useState(false);
  const commands = useMemo(() => buildFilesCommandPalette(workflow), [workflow]);

  return (
    <section data-codexforge-files-command-palette style={panel}>
      <div style={top}>
        <div>
          <div style={eyebrow}>Command palette</div>
          <strong>Read-only file commands</strong>
        </div>
        <button type="button" onClick={() => setOpen((current) => !current)} style={button}>
          Ctrl/Cmd+K
        </button>
      </div>
      <p style={body}>Search files, focus the selected file, show risk, prepare a safe plan, or copy/open context hints.</p>
      {open ? (
        <div style={list}>
          {commands.map((command, index) => (
            <div
              key={buildCodexForgeFileReactKey("files-command", [workflow.selectedFile.path, command.id], index)}
              style={commandCard}
            >
              <strong>{command.label}</strong>
              <span>{command.detail}</span>
            </div>
          ))}
        </div>
      ) : null}
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

const top: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  gap: 10,
  alignItems: "flex-start",
};

const eyebrow: CSSProperties = {
  fontSize: 11,
  fontWeight: 900,
  textTransform: "uppercase",
  opacity: 0.64,
};

const button: CSSProperties = {
  border: "1px solid rgba(255,255,255,0.14)",
  background: "rgba(0,0,0,0.24)",
  color: "white",
  borderRadius: 8,
  padding: "8px 10px",
  fontSize: 12,
  fontWeight: 900,
  cursor: "pointer",
};

const body: CSSProperties = {
  margin: 0,
  fontSize: 12,
  lineHeight: 1.45,
  opacity: 0.78,
};

const list: CSSProperties = {
  display: "grid",
  gap: 7,
  maxHeight: 320,
  overflow: "auto",
};

const commandCard: CSSProperties = {
  border: "1px solid rgba(255,255,255,0.10)",
  background: "rgba(0,0,0,0.18)",
  borderRadius: 8,
  padding: 10,
  display: "grid",
  gap: 4,
  fontSize: 12,
  lineHeight: 1.4,
};
