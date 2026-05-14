"use client";

import type { CSSProperties } from "react";
import type { ProductionPack } from "../production-pack-types";

export function ProductionPackSafetyNotice({ pack }: { pack: ProductionPack }) {
  return (
    <section style={panel} data-codexforge-production-pack-safety-notice="ProductionPackSafetyNotice renders">
      <span style={eyebrow}>Safety boundary</span>
      <strong style={title}>Safe artifact workspace</strong>
      <p style={body}>
        {pack.safetyBoundary}. Export requests default approved false, explicit export approval required,
        source mutation blocked, and targets stay under .codexforge/artifacts.
      </p>
    </section>
  );
}

const panel: CSSProperties = { border: "1px solid rgba(45,212,191,0.24)", background: "rgba(6,78,59,0.18)", borderRadius: 8, padding: 16, display: "grid", gap: 8, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const title: CSSProperties = { color: "#ecfeff", fontSize: 18, overflowWrap: "anywhere" };
const body: CSSProperties = { margin: 0, color: "#ccfbf1", fontSize: 13, lineHeight: 1.5, overflowWrap: "anywhere" };
