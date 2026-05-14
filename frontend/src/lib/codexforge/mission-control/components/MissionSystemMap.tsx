"use client";

import type { CSSProperties } from "react";
import { buildMissionControlReactKey, type MissionSystemMap as MissionSystemMapModel } from "../mission-control-types";

export function MissionSystemMap({ map }: { map: MissionSystemMapModel }) {
  return (
    <section style={section} data-mission-component="MissionSystemMap renders">
      <Header title="System Map" note="Product-system handoffs, not brain graph schema." />
      <div style={nodeGrid}>
        {map.nodes.map((node) => (
          <div key={buildMissionControlReactKey("node", node.id)} style={nodeCard}>
            <div style={nodeTitle}>{node.label}</div>
            <div style={nodeDetail}>{node.detail}</div>
          </div>
        ))}
      </div>
      <div style={edgeGrid}>
        {map.edges.map((edge) => (
          <div key={buildMissionControlReactKey("edge", edge.id)} style={edgeCard}>
            <span style={edgeRoute}>{edge.from} -&gt; {edge.to}</span>
            <span style={edgeText}>{edge.label}</span>
            <span style={edgeSafety}>{edge.safety}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function Header({ title, note }: { title: string; note: string }) {
  return <div style={header}><h2 style={heading}>{title}</h2><p style={noteStyle}>{note}</p></div>;
}

const section: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", background: "rgba(15,23,42,0.5)", borderRadius: 8, padding: 16, display: "grid", gap: 14, minWidth: 0 };
const header: CSSProperties = { display: "grid", gap: 4 };
const heading: CSSProperties = { margin: 0, fontSize: 20, letterSpacing: 0 };
const noteStyle: CSSProperties = { margin: 0, color: "#94a3b8", fontSize: 13, lineHeight: 1.5 };
const nodeGrid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 10 };
const nodeCard: CSSProperties = { border: "1px solid rgba(45,212,191,0.16)", background: "rgba(20,184,166,0.07)", borderRadius: 8, padding: 12, minWidth: 0 };
const nodeTitle: CSSProperties = { fontWeight: 900, overflowWrap: "anywhere" };
const nodeDetail: CSSProperties = { color: "#cbd5e1", fontSize: 12, lineHeight: 1.45, marginTop: 4 };
const edgeGrid: CSSProperties = { display: "grid", gap: 8 };
const edgeCard: CSSProperties = { display: "grid", gridTemplateColumns: "minmax(150px, 0.45fr) minmax(0, 1fr) minmax(110px, 0.22fr)", gap: 10, alignItems: "center", border: "1px solid rgba(148,163,184,0.14)", background: "rgba(2,6,23,0.45)", borderRadius: 8, padding: 10, minWidth: 0 };
const edgeRoute: CSSProperties = { color: "#5eead4", fontSize: 12, fontWeight: 900, overflowWrap: "anywhere" };
const edgeText: CSSProperties = { color: "#e2e8f0", fontSize: 13, lineHeight: 1.45, overflowWrap: "anywhere" };
const edgeSafety: CSSProperties = { color: "#cbd5e1", fontSize: 11, fontWeight: 900, textTransform: "uppercase", overflowWrap: "anywhere" };
