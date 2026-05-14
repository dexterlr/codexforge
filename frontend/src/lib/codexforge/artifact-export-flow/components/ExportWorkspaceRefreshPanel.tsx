"use client";

import { useState, type CSSProperties } from "react";
import { CODEXFORGE_ARTIFACT_WORKSPACE_ROOT } from "@/lib/codexforge/artifact-workspace";
import { buildArtifactExportFlowReactKey } from "@/lib/codexforge/artifact-export-flow";

type WorkspaceItem = {
  relativePath: string;
  sizeBytes: number;
  modifiedLabel: string;
  extensionAllowed: boolean;
};

export function ExportWorkspaceRefreshPanel({ onRefreshed }: { onRefreshed?: () => void }) {
  const [items, setItems] = useState<WorkspaceItem[]>([]);
  const [status, setStatus] = useState("Workspace list idle. Refresh reads metadata only.");
  const [loading, setLoading] = useState(false);

  async function refreshWorkspace() {
    setLoading(true);
    setStatus("Refreshing safe artifact workspace metadata.");
    try {
      const response = await fetch("/api/codexforge/artifacts/list", { method: "GET" });
      const data = (await response.json()) as { items?: WorkspaceItem[]; summary?: string; error?: string };
      setItems(Array.isArray(data.items) ? data.items : []);
      setStatus(data.summary || data.error || "Safe artifact workspace refreshed.");
      onRefreshed?.();
    } catch {
      setStatus("Workspace refresh failed before metadata could be read.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section style={panel} data-codexforge-workspace-refresh-panel="ExportWorkspaceRefreshPanel renders safe artifact workspace .codexforge/artifacts">
      <div style={header}>
        <span style={eyebrow}>Workspace refresh</span>
        <strong style={badge}>{CODEXFORGE_ARTIFACT_WORKSPACE_ROOT}</strong>
      </div>
      <button type="button" style={button} onClick={refreshWorkspace} disabled={loading}>
        Refresh artifact list
      </button>
      <p style={statusText}>{status}</p>
      <div style={itemsWrap}>
        {items.length === 0 ? <p style={empty}>No exported artifact metadata loaded.</p> : null}
        {items.map((item) => (
          <article key={buildArtifactExportFlowReactKey("workspace-item", item.relativePath)} style={itemCard}>
            <code style={pathText}>{item.relativePath}</code>
            <span>{item.sizeBytes} bytes</span>
            <span>{item.modifiedLabel}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(45,212,191,0.22)", background: "rgba(6,28,30,0.56)", borderRadius: 8, padding: 16, display: "grid", gap: 12, minWidth: 0 };
const header: CSSProperties = { display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, flexWrap: "wrap" };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const badge: CSSProperties = { border: "1px solid rgba(45,212,191,0.28)", color: "#ccfbf1", borderRadius: 7, padding: "5px 8px", fontSize: 11, overflowWrap: "anywhere" };
const button: CSSProperties = { width: "fit-content", border: "1px solid rgba(45,212,191,0.34)", background: "rgba(20,184,166,0.16)", color: "#ccfbf1", borderRadius: 8, padding: "8px 10px", fontSize: 12, fontWeight: 900, cursor: "pointer" };
const statusText: CSSProperties = { margin: 0, color: "#ccfbf1", fontSize: 12, lineHeight: 1.45 };
const itemsWrap: CSSProperties = { display: "grid", gap: 8, maxHeight: 260, overflow: "auto" };
const empty: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 12 };
const itemCard: CSSProperties = { border: "1px solid rgba(148,163,184,0.14)", background: "rgba(2,6,23,0.42)", borderRadius: 8, padding: 10, display: "grid", gap: 5, color: "#cbd5e1", fontSize: 12, minWidth: 0 };
const pathText: CSSProperties = { color: "#ccfbf1", whiteSpace: "normal", overflowWrap: "anywhere" };
