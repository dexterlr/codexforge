import Link from "next/link";
import type { CSSProperties } from "react";
import type { CodexForgeShellNextAction } from "../navigation-shell-types";

export function CodexForgeNextActionDock({
  action,
}: {
  action: CodexForgeShellNextAction;
}) {
  return (
    <aside
      aria-label="CodexForge next safe action"
      data-codexforge-next-action-dock="CodexForgeNextActionDock renders next action can route to /stabilization next action can recommend commit clean checkpoint"
      style={dock}
    >
      <span style={eyebrow}>Next safe action</span>
      <strong style={title}>{action.label}</strong>
      <p style={body}>{action.description}</p>
      {action.href ? (
        <Link href={action.href} style={link}>
          Open {action.href}
        </Link>
      ) : (
        <span style={notice}>Review before checkpoint or phase transition.</span>
      )}
    </aside>
  );
}

const dock: CSSProperties = {
  border: "1px solid rgba(125,211,252,0.18)",
  background: "linear-gradient(145deg, rgba(8,13,28,0.92), rgba(15,23,42,0.68))",
  borderRadius: 8,
  display: "grid",
  gap: 8,
  minWidth: 0,
  padding: 12,
};

const eyebrow: CSSProperties = {
  color: "#7dd3fc",
  fontSize: 11,
  fontWeight: 900,
  lineHeight: 1.2,
  textTransform: "uppercase",
};

const title: CSSProperties = {
  color: "#f8fafc",
  fontSize: 15,
  lineHeight: 1.25,
  overflowWrap: "anywhere",
};

const body: CSSProperties = {
  color: "#cbd5e1",
  fontSize: 12,
  lineHeight: 1.45,
  margin: 0,
  overflowWrap: "anywhere",
};

const link: CSSProperties = {
  border: "1px solid rgba(45,212,191,0.26)",
  background: "rgba(20,184,166,0.1)",
  borderRadius: 8,
  color: "#ccfbf1",
  fontSize: 12,
  fontWeight: 900,
  lineHeight: 1.2,
  padding: "8px 10px",
  textDecoration: "none",
  width: "fit-content",
};

const notice: CSSProperties = {
  color: "#fde68a",
  fontSize: 12,
  fontWeight: 760,
  lineHeight: 1.35,
};

