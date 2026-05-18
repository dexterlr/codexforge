import Link from "next/link";
import type { CSSProperties } from "react";
import type { CodexForgeNavigationSection } from "../navigation-shell-types";

export function CodexForgeWorkspaceMap({
  sections,
  activeHref,
}: {
  sections: readonly CodexForgeNavigationSection[];
  activeHref: string;
}) {
  return (
    <section
      aria-label="CodexForge workspace map"
      data-codexforge-workspace-map="CodexForgeWorkspaceMap renders sections include Command Cognition Engineering Stabilization"
      style={wrap}
    >
      {sections.map((section) => (
        <div key={section.id} style={sectionPanel}>
          <div style={sectionHeader}>
            <strong style={sectionTitle}>{section.label}</strong>
            <span style={sectionCount}>{section.routes.length}</span>
          </div>
          <p style={sectionDescription}>{section.description}</p>
          <div style={routeList}>
            {section.routes.map((route) => (
              <Link
                key={`${section.id}-${route.href}`}
                href={route.href}
                style={route.href === activeHref ? activeRoute : routeLink}
              >
                {route.label}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

const safeText: CSSProperties = {
  minWidth: 0,
  overflowWrap: "anywhere",
  wordBreak: "break-word",
};

const wrap: CSSProperties = {
  display: "grid",
  gap: 10,
  minWidth: 0,
};

const sectionPanel: CSSProperties = {
  border: "1px solid rgba(148,163,184,0.13)",
  background: "rgba(255,255,255,0.035)",
  borderRadius: 8,
  display: "grid",
  gap: 7,
  minWidth: 0,
  padding: 10,
};

const sectionHeader: CSSProperties = {
  alignItems: "center",
  display: "flex",
  gap: 8,
  justifyContent: "space-between",
  minWidth: 0,
};

const sectionTitle: CSSProperties = {
  color: "#f8fafc",
  fontSize: 12,
  lineHeight: 1.25,
  ...safeText,
};

const sectionCount: CSSProperties = {
  color: "#94a3b8",
  fontSize: 11,
  fontWeight: 850,
};

const sectionDescription: CSSProperties = {
  color: "#94a3b8",
  fontSize: 11,
  lineHeight: 1.35,
  margin: 0,
  ...safeText,
};

const routeList: CSSProperties = {
  display: "grid",
  gap: 5,
  minWidth: 0,
};

const routeLinkBase: CSSProperties = {
  borderRadius: 8,
  fontSize: 12,
  fontWeight: 760,
  lineHeight: 1.25,
  padding: "6px 7px",
  textDecoration: "none",
  ...safeText,
};

const routeLink: CSSProperties = {
  ...routeLinkBase,
  color: "#cbd5e1",
};

const activeRoute: CSSProperties = {
  ...routeLinkBase,
  background: "rgba(20,184,166,0.12)",
  color: "#ccfbf1",
};

