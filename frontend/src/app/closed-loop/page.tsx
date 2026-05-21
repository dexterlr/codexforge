import type { CSSProperties } from "react";
import Link from "next/link";
import { CodexForgeAppShell } from "@/lib/codexforge/navigation-shell";
import { card, cardHeader, cardText, cardTitle, contentGrid, safetyNotice } from "@/lib/codexforge/ui";

const WORKFLOW_STEPS = [
  {
    id: "triage",
    title: "Review regression",
    copy: "Start from stabilization evidence. Evidence is context, not proof.",
  },
  {
    id: "preview",
    title: "Prepare preview",
    copy: "Use Safe Patch Preview and Real Patch Preview before any apply boundary.",
  },
  {
    id: "approval",
    title: "Approval required",
    copy: "Patch apply and validation commands stay approval-gated and outside this UI.",
  },
  {
    id: "verify",
    title: "Paste validation output",
    copy: "Bring manual validation output back for review and next-action routing.",
  },
] as const;

export default function ClosedLoopPage() {
  return (
    <CodexForgeAppShell
      activePath="/closed-loop"
      workspaceLabel="Start fix loop"
      nextActionContext={{ hasRegressionOrFixWork: true }}
      focusMode
      contentMaxWidth="wide"
      pageChrome="minimal"
      showRightRail={false}
      showSidebarBadges={false}
      showSidebarSafetyNotice={false}
    >
      <section
        style={safetyNotice}
        data-codexforge-closed-loop-route="Closed Loop Fix Workflow preview-only approval required no command execution no file writes no apply-diff no run-command no broker-execution preserve latest-message authority"
      >
        <div style={cardHeader}>
          <h2 style={cardTitle}>Start fix loop</h2>
          <span style={pill}>No command execution</span>
          <span style={pill}>No file writes</span>
        </div>
        <p style={cardText}>
          Paste validation output or choose a failure first. Advanced bridge panels stay secondary while the next
          reviewed fix step stays visible.
        </p>
        <div style={linkRow}>
          <Link href="/code-flow" style={wizardLink}>Continue Code Flow</Link>
          <Link href="/start" style={wizardLink}>Back to wizard: failure review flow</Link>
        </div>
        <span hidden data-codexforge-closed-loop-code-flow="Continue Code Flow failed validation handoff can return to code flow no auto-fix" />
      </section>

      <section style={contentGrid} aria-label="Closed-loop workflow steps">
        {WORKFLOW_STEPS.map((step, index) => (
          <article key={`closed-loop-${step.id}`} style={card}>
            <span style={stepIndex}>{String(index + 1).padStart(2, "0")}</span>
            <h2 style={cardTitle}>{step.title}</h2>
            <p style={cardText}>{step.copy}</p>
          </article>
        ))}
      </section>
    </CodexForgeAppShell>
  );
}

const pill: CSSProperties = {
  border: "1px solid rgba(45,212,191,0.28)",
  borderRadius: 8,
  color: "#ccfbf1",
  fontSize: 11,
  fontWeight: 900,
  lineHeight: 1.2,
  padding: "5px 7px",
};

const stepIndex: CSSProperties = {
  color: "#5eead4",
  fontSize: 12,
  fontWeight: 900,
  lineHeight: 1.2,
};

const wizardLink: CSSProperties = {
  border: "1px solid rgba(125,211,252,0.18)",
  borderRadius: 8,
  color: "#dbeafe",
  display: "inline-flex",
  fontSize: 12,
  fontWeight: 900,
  padding: "8px 10px",
  textDecoration: "none",
  width: "fit-content",
};

const linkRow: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
};
