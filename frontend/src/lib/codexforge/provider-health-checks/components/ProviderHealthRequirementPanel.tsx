import type { CSSProperties } from "react";
export function ProviderHealthRequirementPanel({ nextFix }: { nextFix: string }) { return <section style={panel}><h2 style={title}>What to fix next</h2><p style={copy}>{nextFix}</p></section>; }
const panel: CSSProperties = { background: "rgba(20,83,45,0.16)", border: "1px solid rgba(45,212,191,0.2)", borderRadius: 8, padding: 14 };
const title: CSSProperties = { fontSize: 18, letterSpacing: 0, margin: 0 };
const copy: CSSProperties = { color: "#d1fae5", fontSize: 13, lineHeight: 1.45, margin: "6px 0 0" };
