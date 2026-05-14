"use client";

import type { CSSProperties } from "react";

export function BridgeBlockedActionNotice() {
  return (
    <section style={panel} data-codexforge-bridge-blocked-action-notice="BridgeBlockedActionNotice renders">
      <span style={eyebrow}>Blocked actions</span>
      <h2 style={title}>Preview-only boundary is active</h2>
      <p style={copy}>
        no silent desktop control, no camera access without consent, broker execution blocked,
        no file mutation without preview/approval, and no command execution from bridge UI.
      </p>
      <p style={copy}>
        Blender, Unreal, and ComfyUI are shown as readiness previews only; the bridge does not execute creative tools.
      </p>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(251,113,133,0.26)", background: "rgba(32,8,18,0.82)", borderRadius: 8, padding: 16, display: "grid", gap: 8 };
const eyebrow: CSSProperties = { color: "#fda4af", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const title: CSSProperties = { margin: 0, fontSize: 20, letterSpacing: 0 };
const copy: CSSProperties = { margin: 0, color: "#fee2e2", fontSize: 13, lineHeight: 1.55 };
