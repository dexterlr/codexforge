import type { CSSProperties } from "react";
import type { UnrealCommandPreview } from "../unreal-adapter-types";
import { buildUnrealAdapterReactKey } from "../index";
import { badgeRow, button, code, panel, titleStyle } from "./UnrealPanelShared";

export function UnrealCommandPreviewPanel({ preview }: { preview: UnrealCommandPreview }) {
  const copyCommandPreview = () => {
    void navigator.clipboard?.writeText(preview.previewText);
  };

  return (
    <section style={panel} data-unreal-command-preview-panel="UnrealCommandPreviewPanel renders">
      <div style={header}>
        <h2 style={titleStyle}>UnrealCommandPreviewPanel renders</h2>
        <button type="button" style={button} onClick={copyCommandPreview}>Copy command preview</button>
      </div>
      <div style={badgeRow}>
        <span>copy command preview allowed</span>
        <span>preview only comment</span>
        <span>no Unreal execution</span>
        <span>no Unreal Editor launch</span>
        <span>no render execution</span>
        <span>no package/build</span>
      </div>
      <pre style={code} data-codexforge-unreal-command-preview-overflow="overflowX auto safe wrapping no Unreal execution no file writes">{preview.previewText}</pre>
      <ul style={list}>{preview.safetySummary.map((item, index) => <li key={buildUnrealAdapterReactKey("command", item, index)}>{item}</li>)}</ul>
    </section>
  );
}

const header: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap", alignItems: "center" };
const list: CSSProperties = { margin: 0, paddingLeft: 18, color: "#cbd5e1", lineHeight: 1.5 };
