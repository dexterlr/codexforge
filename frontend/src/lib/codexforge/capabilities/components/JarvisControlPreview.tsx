"use client";

import type { CSSProperties } from "react";

export function JarvisControlPreview() {
  return (
    <section
      data-codexforge-jarvis-control-preview
      data-codexforge-explicit-session-consent="Jarvis/PC bridge requires explicit session consent"
      data-codexforge-camera-defaults="camera panel says no recording/storage/transmission by default"
      style={panel}
    >
      <div style={eyebrow}>Jarvis control preview</div>
      <h2 style={title}>PC bridge and camera stay consent-bound</h2>
      <div style={grid}>
        <Control label="Local PC bridge" value="planned" detail="Explicit session consent required; no silent desktop control." />
        <Control label="Camera inspection" value="planned" detail="No recording/storage/transmission by default; visible active state required before future use." />
        <Control label="Active state" value="off" detail="Future use must show a clear active indicator and operator stop boundary." />
      </div>
    </section>
  );
}

function Control({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <div style={control}>
      <span style={controlLabel}>{label}</span>
      <strong>{value}</strong>
      <span style={detailText}>{detail}</span>
    </div>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(56,189,248,0.22)", background: "rgba(8,47,73,0.28)", borderRadius: 8, padding: 14, display: "grid", gap: 10 };
const eyebrow: CSSProperties = { fontSize: 11, fontWeight: 900, textTransform: "uppercase", color: "#bae6fd" };
const title: CSSProperties = { margin: 0, fontSize: 18, letterSpacing: 0 };
const grid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 210px), 1fr))", gap: 8 };
const control: CSSProperties = { display: "grid", gap: 5, border: "1px solid rgba(255,255,255,0.10)", background: "rgba(0,0,0,0.16)", borderRadius: 8, padding: 10, fontSize: 12, lineHeight: 1.45 };
const controlLabel: CSSProperties = { fontSize: 11, textTransform: "uppercase", opacity: 0.65, fontWeight: 900 };
const detailText: CSSProperties = { opacity: 0.78, overflowWrap: "anywhere" };
