"use client";

import type { CSSProperties } from "react";

const ARTIFACTS = [
  {
    id: "storyboard-preview",
    title: "Storyboard preview",
    kind: "Image sequence",
    status: "Review-only",
    provenance: "Creative Production Studio sample context",
    risk: "No export or execution from this board.",
  },
  {
    id: "video-render-queue",
    title: "Video render queue",
    kind: "Video render queue / image sequence / frame / thumbnail / render log",
    status: "Preview-only",
    provenance: "Video Render Job Preview handoff at /video-render",
    risk: "No video render execution, no ffmpeg execution, and no file writes from this board. Next action can prepare Guarded Creative Executor handoff.",
  },
  {
    id: "blender-scene",
    title: "Blender scene packet",
    kind: "Scene plan",
    status: "Preview-only",
    provenance: "Blender Adapter Preview handoff",
    risk: "Python remains text preview until an approval boundary handles it.",
  },
  {
    id: "comfyui-workflow",
    title: "ComfyUI workflow manifest",
    kind: "Workflow",
    status: "Review-first",
    provenance: "ComfyUI Adapter Preview handoff",
    risk: "No ComfyUI execution call is available in this UI.",
  },
] as const;

export function CreativeArtifactReviewBoard() {
  const selected = ARTIFACTS[0];

  return (
    <main
      style={page}
      data-codexforge-creative-artifact-review-board="CreativeArtifactReviewBoard renders preview-only review-only artifact gallery readable inspector no duplicate route menus no execution no file writes preserve latest-message authority"
    >
      <section style={hero}>
        <div style={heroCopy}>
          <span style={eyebrow}>Review-only</span>
          <h1 style={title}>Artifact Review Board</h1>
          <p style={body}>
            Review creative outputs, provenance, risk, and handoff notes without exporting, executing, or mutating source files.
          </p>
        </div>
        <div style={statusStrip}>
          <span style={chip}>Preview-only</span>
          <span style={chip}>Approval-gated</span>
          <span style={chip}>No auto-run</span>
        </div>
      </section>

      <section style={layout}>
        <div style={gallery}>
          {ARTIFACTS.map((artifact) => (
            <article key={`artifact-review-${artifact.id}`} style={card}>
              <span style={eyebrow}>{artifact.kind}</span>
              <h2 style={cardTitle}>{artifact.title}</h2>
              <p style={body}>{artifact.provenance}</p>
              <span style={chip}>{artifact.status}</span>
            </article>
          ))}
        </div>
        <aside style={inspector}>
          <span style={eyebrow}>Inspector</span>
          <h2 style={cardTitle}>{selected.title}</h2>
          <p style={body}>{selected.risk}</p>
          <div style={metaGrid}>
            <span>Provenance</span>
            <strong>{selected.provenance}</strong>
            <span>Boundary</span>
            <strong>Review-first, copy-only handoff</strong>
            <span>Execution</span>
            <strong>Blocked in UI</strong>
          </div>
        </aside>
      </section>
    </main>
  );
}

const page: CSSProperties = { display: "grid", gap: 16, minWidth: 0, width: "100%" };
const hero: CSSProperties = {
  alignItems: "end",
  border: "1px solid rgba(45,212,191,0.18)",
  background: "rgba(8,13,28,0.72)",
  borderRadius: 8,
  display: "grid",
  gap: 14,
  gridTemplateColumns: "minmax(0, 1fr) auto",
  minWidth: 0,
  padding: 16,
};
const heroCopy: CSSProperties = { display: "grid", gap: 8, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#7dd3fc", fontSize: 11, fontWeight: 900, lineHeight: 1.2, textTransform: "uppercase" };
const title: CSSProperties = { color: "#f8fafc", fontSize: 34, letterSpacing: 0, lineHeight: 1.06, margin: 0, overflowWrap: "normal", wordBreak: "normal" };
const body: CSSProperties = { color: "#cbd5e1", fontSize: 13, lineHeight: 1.5, margin: 0, overflowWrap: "anywhere" };
const statusStrip: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "end", minWidth: 0 };
const chip: CSSProperties = {
  border: "1px solid rgba(45,212,191,0.2)",
  background: "rgba(20,184,166,0.08)",
  borderRadius: 8,
  color: "#ccfbf1",
  fontSize: 11,
  fontWeight: 900,
  lineHeight: 1.2,
  padding: "6px 8px",
};
const layout: CSSProperties = { alignItems: "start", display: "grid", gap: 16, gridTemplateColumns: "minmax(0, 1fr) minmax(300px, 360px)", minWidth: 0 };
const gallery: CSSProperties = { display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", minWidth: 0 };
const card: CSSProperties = { border: "1px solid rgba(148,163,184,0.14)", background: "rgba(2,6,23,0.62)", borderRadius: 8, display: "grid", gap: 9, minWidth: 0, padding: 14 };
const cardTitle: CSSProperties = { color: "#f8fafc", fontSize: 18, letterSpacing: 0, lineHeight: 1.18, margin: 0, overflowWrap: "normal", wordBreak: "normal" };
const inspector: CSSProperties = { ...card, position: "sticky", top: 12 };
const metaGrid: CSSProperties = { color: "#94a3b8", display: "grid", fontSize: 12, gap: 7, gridTemplateColumns: "100px minmax(0, 1fr)", lineHeight: 1.35, minWidth: 0 };
