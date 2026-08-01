import Link from "next/link";
import type { ComponentProps, CSSProperties, ReactNode } from "react";
import {
  getCodexForgePrimaryProductArea,
  type CodexForgeNormalCapabilityState,
} from "../../navigation-shell/primary-product-area-model";

type LinkHref = ComponentProps<typeof Link>["href"];

export type NormalProductWorkspaceContext = Readonly<{
  root: string;
  fileCount: number;
  selectedFile?: string | null;
}>;

export type NormalProductAction = Readonly<{
  label: string;
  href: LinkHref;
  description?: string;
}>;

export function NormalProductFrame({
  activePath,
  workspace,
  statusLabel,
  primaryAction,
  secondaryActions = [],
  children,
}: {
  activePath: string;
  workspace?: NormalProductWorkspaceContext;
  statusLabel?: string;
  primaryAction?: NormalProductAction;
  secondaryActions?: readonly NormalProductAction[];
  children?: ReactNode;
}) {
  const area = getCodexForgePrimaryProductArea(activePath);
  const action = primaryAction ?? area.primaryAction;
  const headingId = `normal-product-${area.href === "/" ? "home" : area.href.slice(1)}-title`;

  return (
    <section
      aria-labelledby={headingId}
      data-codexforge-normal-product-page={area.href}
      data-codexforge-page-contract="title purpose workspace primary-action empty loading error recovery responsive accessible"
      style={shell}
    >
      <style>{`
        @media (max-width: 720px) {
          [data-codexforge-normal-product-hero] {
            padding: 18px !important;
          }
          [data-codexforge-normal-product-actions] {
            display: grid !important;
            grid-template-columns: minmax(0, 1fr) !important;
          }
          [data-codexforge-normal-product-actions] a {
            justify-content: center !important;
            width: 100% !important;
          }
        }
      `}</style>
      <header data-codexforge-normal-product-hero="true" style={hero}>
        <div style={copy}>
          <div style={eyebrowRow}>
            <span style={eyebrow}>CodexForge</span>
            <span style={statePill(area.capabilityState)}>
              {statusLabel ?? capabilityLabel(area.capabilityState)}
            </span>
          </div>
          <h1 id={headingId} style={title}>
            {area.label}
          </h1>
          <p style={purpose}>{area.summary}</p>
        </div>

        {workspace ? (
          <section aria-label="Current workspace" style={workspaceCard}>
            <span style={cardLabel}>Current workspace</span>
            <strong style={workspaceRoot}>{workspace.root}</strong>
            <span style={cardCopy}>
              {workspace.fileCount > 0
                ? `${workspace.fileCount} bounded project file${workspace.fileCount === 1 ? "" : "s"} available for read-only review.`
                : "No project files are currently available in the bounded workspace."}
            </span>
            {workspace.selectedFile ? (
              <span style={cardCopy}>Selected file: {workspace.selectedFile}</span>
            ) : null}
          </section>
        ) : null}

        <nav
          aria-label={`${area.label} next actions`}
          data-codexforge-normal-product-actions="true"
          style={actions}
        >
          <Link href={action.href} style={primaryLink}>
            {action.label}
          </Link>
          {secondaryActions.map((secondary) => (
            <Link key={`${area.href}-${secondary.label}`} href={secondary.href} style={secondaryLink}>
              {secondary.label}
            </Link>
          ))}
        </nav>
      </header>

      <div data-codexforge-normal-product-result="true" style={content}>
        {children}
      </div>
    </section>
  );
}

function capabilityLabel(state: CodexForgeNormalCapabilityState): string {
  switch (state) {
    case "working":
      return "Available";
    case "partial":
      return "Available with limits";
    case "research-only":
      return "Research only";
    default:
      return "Review only";
  }
}

function statePill(state: CodexForgeNormalCapabilityState): CSSProperties {
  const color =
    state === "working"
      ? "#5eead4"
      : state === "research-only"
        ? "#c4b5fd"
        : state === "partial"
          ? "#7dd3fc"
          : "#fde68a";
  return { ...pill, color, borderColor: `${color}55`, background: `${color}12` };
}

const shell: CSSProperties = {
  display: "grid",
  gap: 16,
  minWidth: 0,
  width: "100%",
};

const hero: CSSProperties = {
  background:
    "radial-gradient(520px 240px at 8% 0%, rgba(45,212,191,0.12), transparent 65%), rgba(8,13,28,0.82)",
  border: "1px solid rgba(94,234,212,0.2)",
  borderRadius: 12,
  display: "grid",
  gap: 16,
  minWidth: 0,
  padding: 24,
};

const copy: CSSProperties = { display: "grid", gap: 8, minWidth: 0 };
const eyebrowRow: CSSProperties = { alignItems: "center", display: "flex", flexWrap: "wrap", gap: 8 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 11, fontWeight: 950, letterSpacing: ".08em", textTransform: "uppercase" };
const pill: CSSProperties = { border: "1px solid", borderRadius: 999, fontSize: 11, fontWeight: 900, lineHeight: 1.2, padding: "5px 8px" };
const title: CSSProperties = { fontSize: "clamp(30px, 5vw, 52px)", letterSpacing: "-0.035em", lineHeight: 1.02, margin: 0, overflowWrap: "anywhere" };
const purpose: CSSProperties = { color: "#cbd5e1", fontSize: 15, lineHeight: 1.6, margin: 0, maxWidth: 840, overflowWrap: "anywhere" };

const workspaceCard: CSSProperties = {
  background: "rgba(15,23,42,0.68)",
  border: "1px solid rgba(148,163,184,0.16)",
  borderRadius: 10,
  display: "grid",
  gap: 5,
  minWidth: 0,
  padding: 13,
};
const cardLabel: CSSProperties = { color: "#94a3b8", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const workspaceRoot: CSSProperties = { color: "#f8fafc", fontFamily: "var(--font-geist-mono), ui-monospace, monospace", fontSize: 12, lineHeight: 1.5, overflowWrap: "anywhere" };
const cardCopy: CSSProperties = { color: "#cbd5e1", fontSize: 12, lineHeight: 1.45, overflowWrap: "anywhere" };

const actions: CSSProperties = { alignItems: "stretch", display: "flex", flexWrap: "wrap", gap: 8, minWidth: 0 };
const linkBase: CSSProperties = { alignItems: "center", borderRadius: 9, display: "inline-flex", fontSize: 13, fontWeight: 900, justifyContent: "center", lineHeight: 1.3, minHeight: 42, padding: "10px 14px", textAlign: "center", textDecoration: "none" };
const primaryLink: CSSProperties = { ...linkBase, background: "#5eead4", border: "1px solid #5eead4", color: "#042f2e" };
const secondaryLink: CSSProperties = { ...linkBase, background: "rgba(15,23,42,0.72)", border: "1px solid rgba(125,211,252,0.2)", color: "#dbeafe" };
const content: CSSProperties = { display: "grid", gap: 16, minWidth: 0 };
