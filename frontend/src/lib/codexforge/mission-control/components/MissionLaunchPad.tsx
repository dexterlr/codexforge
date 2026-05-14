"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { buildMissionControlReactKey, type MissionSurfaceRegistry } from "../mission-control-types";

const LAUNCH_IDS = ["brain", "files", "capabilities", "runs", "bridge", "creative", "artifacts", "production"] as const;

export function MissionLaunchPad({ registry }: { registry: MissionSurfaceRegistry }) {
  const surfaces = registry.surfaces.filter((surface) => LAUNCH_IDS.includes(surface.id as (typeof LAUNCH_IDS)[number]));

  return (
    <section style={section} data-mission-component="MissionLaunchPad renders">
      <h2 style={heading}>Launch Pad</h2>
      <div style={grid}>
        {surfaces.map((surface) => (
          <Link key={buildMissionControlReactKey("launch", surface.id)} href={surface.href} style={link}>
            <span style={label}>{surface.label}</span>
            <span style={meta}>{surface.readiness}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

const section: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", background: "rgba(15,23,42,0.42)", borderRadius: 8, padding: 16, display: "grid", gap: 12, minWidth: 0 };
const heading: CSSProperties = { margin: 0, fontSize: 20 };
const grid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(145px, 1fr))", gap: 10 };
const link: CSSProperties = { color: "#f8fafc", textDecoration: "none", border: "1px solid rgba(45,212,191,0.18)", background: "rgba(20,184,166,0.08)", borderRadius: 8, padding: 12, display: "grid", gap: 6, minWidth: 0 };
const label: CSSProperties = { fontWeight: 900, overflowWrap: "anywhere" };
const meta: CSSProperties = { color: "#cbd5e1", fontSize: 11, fontWeight: 900, textTransform: "uppercase", overflowWrap: "anywhere" };
