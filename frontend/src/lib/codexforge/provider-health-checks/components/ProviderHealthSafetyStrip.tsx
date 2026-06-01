import type { CSSProperties } from "react";
export function ProviderHealthSafetyStrip() { return <section style={strip}>No provider API calls. No password storage. No API key localStorage. No process.env value printed in UI.</section>; }
const strip: CSSProperties = { background: "rgba(15,23,42,0.72)", border: "1px solid rgba(45,212,191,0.22)", borderRadius: 8, color: "#d1fae5", fontSize: 13, fontWeight: 800, padding: 12 };
