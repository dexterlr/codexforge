import Link from "next/link";
import type { CSSProperties } from "react";
import type { CodexForgeNavigationSection } from "../navigation-shell-types";
import { CodexForgeShellSafetyNotice } from "./CodexForgeShellSafetyNotice";

export function CodexForgeSidebar({
  sections,
  activeHref,
}: {
  sections: readonly CodexForgeNavigationSection[];
  activeHref: string;
}) {
  return (
    <aside
      aria-label="CodexForge command-deck navigation"
      data-codexforge-sidebar="CodexForgeSidebar renders responsive command-deck navigation AI Workspace Brain Files Stabilization"
      style={sidebar}
    >
      <Link href="/" style={brand}>
        <span aria-hidden="true" style={mark} />
        <span style={brandText}>
          <strong style={brandTitle}>CodexForge</strong>
          <span style={brandSubtitle}>Unified shell</span>
        </span>
      </Link>

      <nav style={nav}>
        {sections.map((section) => (
          <div key={`sidebar-${section.id}`} style={sectionBlock}>
            <div style={sectionLabel}>{section.label}</div>
            {section.routes.map((route) => (
              <Link
                key={`sidebar-${route.href}`}
                href={route.href}
                title={route.description}
                aria-current={route.href === activeHref ? "page" : undefined}
                style={route.href === activeHref ? activeLink : link}
              >
                <span style={routeLabel}>{route.label}</span>
                <span style={badge}>{route.badge}</span>
              </Link>
            ))}
          </div>
        ))}
      </nav>

      <CodexForgeShellSafetyNotice />
    </aside>
  );
}

const safeText: CSSProperties = {
  minWidth: 0,
  overflowWrap: "anywhere",
  wordBreak: "break-word",
};

const sidebar: CSSProperties = {
  alignSelf: "start",
  border: "1px solid rgba(148,163,184,0.14)",
  background: "linear-gradient(180deg, rgba(8,13,28,0.94), rgba(2,6,23,0.82))",
  borderRadius: 8,
  display: "grid",
  gap: 12,
  minWidth: 0,
  padding: 12,
  position: "sticky",
  top: 12,
  maxHeight: "calc(100vh - 24px)",
  overflowY: "auto",
};

const brand: CSSProperties = {
  alignItems: "center",
  color: "#f8fafc",
  display: "flex",
  gap: 9,
  minWidth: 0,
  textDecoration: "none",
};

const mark: CSSProperties = {
  background: "linear-gradient(135deg, rgba(20,184,166,0.95), rgba(14,165,233,0.88))",
  borderRadius: 8,
  boxShadow: "0 12px 36px rgba(20,184,166,0.16)",
  flex: "0 0 auto",
  height: 28,
  width: 28,
};

const brandText: CSSProperties = {
  display: "grid",
  gap: 2,
  lineHeight: 1.1,
  ...safeText,
};

const brandTitle: CSSProperties = {
  fontSize: 15,
  letterSpacing: 0,
  ...safeText,
};

const brandSubtitle: CSSProperties = {
  color: "#94a3b8",
  fontSize: 11,
  fontWeight: 760,
  ...safeText,
};

const nav: CSSProperties = {
  display: "grid",
  gap: 11,
  minWidth: 0,
};

const sectionBlock: CSSProperties = {
  display: "grid",
  gap: 5,
  minWidth: 0,
};

const sectionLabel: CSSProperties = {
  color: "#7dd3fc",
  fontSize: 10,
  fontWeight: 900,
  lineHeight: 1.2,
  padding: "0 6px",
  textTransform: "uppercase",
  ...safeText,
};

const linkBase: CSSProperties = {
  alignItems: "center",
  borderRadius: 8,
  display: "grid",
  gap: 4,
  gridTemplateColumns: "minmax(0, 1fr) auto",
  minWidth: 0,
  padding: "8px 9px",
  textDecoration: "none",
};

const link: CSSProperties = {
  ...linkBase,
  color: "#cbd5e1",
};

const activeLink: CSSProperties = {
  ...linkBase,
  background: "rgba(20,184,166,0.13)",
  border: "1px solid rgba(45,212,191,0.22)",
  color: "#f8fafc",
};

const routeLabel: CSSProperties = {
  fontSize: 12,
  fontWeight: 850,
  lineHeight: 1.25,
  ...safeText,
};

const badge: CSSProperties = {
  color: "#94a3b8",
  fontSize: 10,
  fontWeight: 850,
  lineHeight: 1.2,
  maxWidth: 92,
  overflowWrap: "anywhere",
  textAlign: "right",
};
