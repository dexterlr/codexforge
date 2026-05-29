import Link from "next/link";
import type { CSSProperties } from "react";
import type { QualityAuditRouteMap } from "../full-system-quality-audit-types";

type Props = { routeMap: QualityAuditRouteMap };

export function QualityAuditRouteMapPanel({ routeMap }: Props) {
  return (
    <section style={panel} data-codexforge-quality-audit-route-map-panel="QualityAuditRouteMapPanel renders canonical MVP path /code-flow/live-run /guarded-apply-mvp /apply-evidence /validation-results /workflow-results /run-history">
      <h2 style={title}>Coding MVP path</h2>
      <div style={routeGrid}>
        {routeMap.routes.map((route) => (
          <Link key={route} href={route} style={routeLink}>{route}</Link>
        ))}
      </div>
      <p style={body}>Failed validation routes to /closed-loop. Release review routes to /code-flow/release-audit.</p>
    </section>
  );
}

const panel: CSSProperties = { background: "rgba(15,23,42,0.72)", border: "1px solid rgba(125,211,252,0.16)", borderRadius: 8, display: "grid", gap: 10, minWidth: 0, padding: 14 };
const title: CSSProperties = { fontSize: 16, lineHeight: 1.25, margin: 0 };
const routeGrid: CSSProperties = { display: "grid", gap: 8, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 180px), 1fr))" };
const routeLink: CSSProperties = { border: "1px solid rgba(125,211,252,0.18)", borderRadius: 8, color: "#dbeafe", fontSize: 12, fontWeight: 850, minWidth: 0, overflowWrap: "break-word", padding: "8px 10px", textDecoration: "none" };
const body: CSSProperties = { color: "#cbd5e1", fontSize: 12, lineHeight: 1.5, margin: 0 };
