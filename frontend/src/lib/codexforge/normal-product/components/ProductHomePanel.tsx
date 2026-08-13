import Link from "next/link";
import type { CSSProperties } from "react";
import { NormalProductFrame, type NormalProductWorkspaceContext } from "./NormalProductFrame";

const QUICK_LINKS = [
  { href: "/video-projects", label: "Projects", copy: "Confirm the bounded workspace and project setup path." },
  { href: "/files", label: "Files", copy: "Browse the approved project root without writing files." },
  { href: "/patch-preview-workbench", label: "Patch lifecycle", copy: "Understand explicit proposal, approval, application, and recovery boundaries; prepare real previews in Files." },
  { href: "/validation", label: "Validation", copy: "Prepare allowlisted checks and review supplied output." },
  { href: "/jarvis-audit", label: "Audit and Runs", copy: "Understand approvals, execution state, and results." },
  { href: "/jarvis-safety", label: "Safety and Settings", copy: "Review kill switches, data boundaries, and approval posture." },
] as const;

const FIRST_RUN_STEPS = [
  ["1", "Confirm a project", "Projects shows the repository-configured workspace. Browser project switching is not invented in this release."],
  ["2", "Describe one objective", "Use ordinary language in Jarvis. Clarify only what materially changes the safe plan."],
  ["3", "Review the boundary", "Check the exact model, provider, local-or-cloud transfer, token limit, permissions, and paid-cost posture."],
  ["4", "Approve, then execute", "Approval records the bounded plan. Execution remains a separate action and can still be blocked by either kill-switch checkpoint."],
  ["5", "Inspect and validate", "Review Files, proposed changes, allowlisted validation output, and the Audit trail before continuing."],
] as const;

const CREATOR_MODES = [
  { label: "General assistant", state: "Available with limits", copy: "Jarvis supports reviewed local-first text and code tasks through the guarded run loop." },
  { label: "Website and app creation", state: "Available with limits", copy: "Static Website/Browser App v0 is connected for one manually approved local generation, strict validation, isolated preview, one repair, and bounded export. It does not provide backend, deployment, or packages." },
  { label: "Browser-game creation", state: "Not connected yet", copy: "Playable generation, gameplay validation, assets, and packaging are future work." },
  { label: "Server and API creation", state: "Not connected yet", copy: "Scaffolding, local launch, health checks, storage, and tests are not yet an operational pipeline." },
  { label: "Video creation", state: "Planning only", copy: "Planning templates exist, but generation, timeline rendering, revision, and export are not connected or validated." },
] as const;

export function ProductHomePanel({ workspace }: { workspace: NormalProductWorkspaceContext }) {
  return (
    <NormalProductFrame
      activePath="/"
      workspace={workspace}
      secondaryActions={[{ label: "Open Projects", href: "/video-projects" }]}
    >
      <section aria-labelledby="home-trust-title" style={trustPanel}>
        <div>
          <span style={sectionEyebrow}>Local first, approval required</span>
          <h2 id="home-trust-title" style={sectionTitle}>A personal AI workspace that shows its boundaries</h2>
        </div>
        <p style={bodyCopy}>
          CodexForge prefers the admitted local model and keeps credentials on the server. You see the selected
          provider, data boundary, meaningful limits, and any cloud acknowledgement before approval. Approval never
          silently applies a patch, runs a command, downloads a model, or enables paid execution.
        </p>
      </section>

      <section aria-labelledby="home-quick-title" style={section}>
        <div>
          <span style={sectionEyebrow}>Working journey</span>
          <h2 id="home-quick-title" style={sectionTitle}>Go straight to the next review step</h2>
        </div>
        <div style={cardGrid}>
          {QUICK_LINKS.map((item) => (
            <Link key={item.href} href={item.href} style={linkCard}>
              <strong style={cardTitle}>{item.label}</strong>
              <span style={bodyCopy}>{item.copy}</span>
            </Link>
          ))}
        </div>
      </section>

      <section aria-labelledby="home-first-run-title" style={section} data-codexforge-first-run-guidance="existing-state-only no-browser-persistence">
        <div>
          <span style={sectionEyebrow}>First run</span>
          <h2 id="home-first-run-title" style={sectionTitle}>From a request to an auditable result</h2>
        </div>
        <ol style={stepList}>
          {FIRST_RUN_STEPS.map(([number, label, copy]) => (
            <li key={number} style={stepCard}>
              <span aria-hidden="true" style={stepNumber}>{number}</span>
              <div style={stepCopy}>
                <strong style={cardTitle}>{label}</strong>
                <span style={bodyCopy}>{copy}</span>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="home-creator-title" style={section} data-codexforge-creator-discoverability="honest-unavailable-states">
        <div>
          <span style={sectionEyebrow}>Product direction</span>
          <h2 id="home-creator-title" style={sectionTitle}>Creation modes, stated honestly</h2>
          <p style={bodyCopy}>Every future creator must connect real generation, preview, validation, repair, and export before it is called operational.</p>
        </div>
        <div style={cardGrid}>
          {CREATOR_MODES.map((mode) => (
            <article key={mode.label} style={plainCard}>
              <div style={cardHeadingRow}>
                <strong style={cardTitle}>{mode.label}</strong>
                <span style={mode.state === "Available with limits" ? availablePill : unavailablePill}>{mode.state}</span>
              </div>
              <p style={bodyCopy}>{mode.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <details style={diagnostics}>
        <summary style={diagnosticsSummary}>Developer Diagnostics</summary>
        <p style={bodyCopy}>Historical phase, wiring, smoke, and compatibility pages live outside the normal product journey.</p>
        <Link href="/developer-diagnostics-hub-preview" style={diagnosticsLink}>Open Developer Diagnostics</Link>
      </details>
    </NormalProductFrame>
  );
}

const section: CSSProperties = { background: "rgba(8,13,28,0.72)", border: "1px solid rgba(148,163,184,0.14)", borderRadius: 12, display: "grid", gap: 14, minWidth: 0, padding: 18 };
const trustPanel: CSSProperties = { ...section, background: "linear-gradient(135deg, rgba(20,184,166,0.11), rgba(14,165,233,0.06))", borderColor: "rgba(94,234,212,0.2)" };
const sectionEyebrow: CSSProperties = { color: "#7dd3fc", fontSize: 11, fontWeight: 950, letterSpacing: ".06em", textTransform: "uppercase" };
const sectionTitle: CSSProperties = { fontSize: "clamp(21px, 3vw, 30px)", letterSpacing: "-.02em", lineHeight: 1.15, margin: "5px 0 0", overflowWrap: "anywhere" };
const bodyCopy: CSSProperties = { color: "#cbd5e1", fontSize: 13, lineHeight: 1.55, margin: 0, overflowWrap: "anywhere" };
const cardGrid: CSSProperties = { display: "grid", gap: 10, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 250px), 1fr))", minWidth: 0 };
const plainCard: CSSProperties = { background: "rgba(15,23,42,0.62)", border: "1px solid rgba(148,163,184,0.14)", borderRadius: 10, display: "grid", gap: 8, minWidth: 0, padding: 13 };
const linkCard: CSSProperties = { ...plainCard, color: "#f8fafc", textDecoration: "none" };
const cardTitle: CSSProperties = { color: "#f8fafc", fontSize: 14, lineHeight: 1.35, overflowWrap: "anywhere" };
const cardHeadingRow: CSSProperties = { alignItems: "start", display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "space-between" };
const basePill: CSSProperties = { border: "1px solid", borderRadius: 999, fontSize: 10, fontWeight: 900, lineHeight: 1.2, padding: "4px 7px", whiteSpace: "nowrap" };
const availablePill: CSSProperties = { ...basePill, background: "rgba(20,184,166,.1)", borderColor: "rgba(94,234,212,.3)", color: "#99f6e4" };
const unavailablePill: CSSProperties = { ...basePill, background: "rgba(245,158,11,.08)", borderColor: "rgba(253,230,138,.26)", color: "#fde68a" };
const stepList: CSSProperties = { display: "grid", gap: 9, listStyle: "none", margin: 0, padding: 0 };
const stepCard: CSSProperties = { ...plainCard, alignItems: "start", gridTemplateColumns: "32px minmax(0, 1fr)" };
const stepNumber: CSSProperties = { alignItems: "center", background: "rgba(20,184,166,.14)", border: "1px solid rgba(94,234,212,.25)", borderRadius: 8, color: "#99f6e4", display: "inline-flex", fontSize: 12, fontWeight: 950, height: 28, justifyContent: "center", width: 28 };
const stepCopy: CSSProperties = { display: "grid", gap: 4, minWidth: 0 };
const diagnostics: CSSProperties = { background: "rgba(2,6,23,.58)", border: "1px solid rgba(148,163,184,.14)", borderRadius: 10, color: "#cbd5e1", padding: 13 };
const diagnosticsSummary: CSSProperties = { cursor: "pointer", fontSize: 13, fontWeight: 900 };
const diagnosticsLink: CSSProperties = { color: "#7dd3fc", display: "inline-flex", fontSize: 13, fontWeight: 900, marginTop: 10, textDecoration: "underline", textUnderlineOffset: 3 };
