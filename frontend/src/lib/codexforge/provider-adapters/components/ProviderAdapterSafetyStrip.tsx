"use client";

import type { CSSProperties } from "react";

export function ProviderAdapterSafetyStrip() {
  return (
    <section style={strip} data-codexforge-provider-adapter-safety-strip="No live provider calls yet No raw password storage No localStorage secrets No browser cookie storage no unsafe execution buttons">
      <strong>No live provider calls yet</strong>
      <span>No raw password storage</span>
      <span>No localStorage secrets</span>
      <span>Adapters describe capabilities and safe setup only</span>
    </section>
  );
}

const strip: CSSProperties = {
  alignItems: "center",
  background: "rgba(20,83,45,0.16)",
  border: "1px solid rgba(45,212,191,0.2)",
  borderRadius: 8,
  color: "#dcfce7",
  display: "flex",
  flexWrap: "wrap",
  fontSize: 13,
  gap: 10,
  justifyContent: "space-between",
  padding: "10px 12px",
};
