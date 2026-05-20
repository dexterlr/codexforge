import type { CSSProperties } from "react";

export function UnrealAdapterSafetyNotice() {
  return (
    <section style={notice} data-unreal-adapter-safety-notice="UnrealAdapterSafetyNotice renders">
      <strong>UnrealAdapterSafetyNotice renders</strong>
      <span>preview-only</span>
      <span>no Unreal execution</span>
      <span>no Unreal Editor launch</span>
      <span>no render execution</span>
      <span>no package/build</span>
      <span>no file writes</span>
      <span>future executor boundary</span>
      <span>preserve latest-message authority</span>
    </section>
  );
}

const notice: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
  alignItems: "center",
  border: "1px solid rgba(45,212,191,0.24)",
  background: "rgba(6,78,59,0.18)",
  borderRadius: 8,
  padding: 12,
  color: "#ccfbf1",
  fontSize: 12,
  fontWeight: 800,
  textTransform: "uppercase",
};
