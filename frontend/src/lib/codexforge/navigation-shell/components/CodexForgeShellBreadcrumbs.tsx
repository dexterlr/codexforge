import Link from "next/link";
import type { CSSProperties } from "react";
import type { CodexForgeRouteBreadcrumb } from "../navigation-shell-types";

export function CodexForgeShellBreadcrumbs({
  breadcrumbs,
}: {
  breadcrumbs: readonly CodexForgeRouteBreadcrumb[];
}) {
  return (
    <nav
      aria-label="CodexForge shell breadcrumbs"
      data-codexforge-shell-breadcrumbs="CodexForgeShellBreadcrumbs renders breadcrumbs are deterministic"
      style={wrap}
    >
      {breadcrumbs.map((item, index) => (
        <span key={`${item.href}-${index}-${item.label}`} style={crumbWrap}>
          {index > 0 ? <span style={separator}>/</span> : null}
          <Link href={item.href} style={crumb}>
            {item.label}
          </Link>
        </span>
      ))}
    </nav>
  );
}

const wrap: CSSProperties = {
  alignItems: "center",
  display: "flex",
  flexWrap: "wrap",
  gap: 6,
  minWidth: 0,
};

const crumbWrap: CSSProperties = {
  alignItems: "center",
  display: "inline-flex",
  gap: 6,
  minWidth: 0,
};

const crumb: CSSProperties = {
  color: "#cbd5e1",
  fontSize: 12,
  fontWeight: 780,
  lineHeight: 1.3,
  overflowWrap: "anywhere",
  textDecoration: "none",
};

const separator: CSSProperties = {
  color: "rgba(148,163,184,0.42)",
  fontSize: 12,
};

