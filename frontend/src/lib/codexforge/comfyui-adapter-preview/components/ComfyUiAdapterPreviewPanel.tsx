"use client";

import type { CSSProperties, ReactNode } from "react";
import { useState } from "react";
import type { ComfyUiAdapterPreviewModel } from "../comfyui-adapter-types";
import { summarizeComfyUiAdapterPreview } from "../comfyui-adapter-preview-model";
import { ComfyUiAdapterEmptyState } from "./ComfyUiAdapterEmptyState";
import { ComfyUiAdapterSafetyNotice } from "./ComfyUiAdapterSafetyNotice";

export function buildComfyUiAdapterReactKey(...parts: Array<string | number | null | undefined>): string {
  return parts
    .map((part) => String(part ?? "empty").trim().toLowerCase().replace(/[^a-z0-9._/-]+/g, "-"))
    .filter(Boolean)
    .join(":");
}

export function ComfyUiAdapterPreviewPanel({ model }: { model: ComfyUiAdapterPreviewModel }) {
  const [copied, setCopied] = useState<string | null>(null);

  function copyText(label: string, text: string) {
    void navigator.clipboard?.writeText(text).then(() => setCopied(label)).catch(() => setCopied(null));
  }

  return (
    <main
      style={page}
      data-codexforge-comfyui-adapter-preview-panel="ComfyUiAdapterPreviewPanel renders ComfyUI Adapter Preview preview-only approval required no ComfyUI execution no endpoint call no command execution no file writes future executor boundary preserve latest-message authority copy workflow handoff allowed"
    >
      <section style={hero}>
        <div style={heroCopy}>
          <span style={eyebrow}>ComfyUI Adapter Preview v1</span>
          <h1 style={headline}>ComfyUI workflow preview</h1>
          <p style={lede}>
            Typed workflow manifest, prompt slots, model placeholder policy, seed policy, output placeholders, approval
            packet, and future executor handoff without launching ComfyUI or contacting a local endpoint.
          </p>
          <div style={actions}>
            <button type="button" style={button} onClick={() => copyText("handoff", model.handoff)}>
              Copy workflow handoff
            </button>
            <span style={pill}>{copied ? `${copied} copied` : "copy-only controls"}</span>
          </div>
        </div>
        <div style={metrics}>
          <Metric label="Nodes" value={String(model.summary.nodeCount)} />
          <Metric label="Prompts" value={String(model.summary.promptNodeCount)} />
          <Metric label="Outputs" value={String(model.summary.outputCount)} />
          <Metric label="Execution" value={model.summary.executionStatus} />
        </div>
      </section>

      <ComfyUiAdapterSafetyNotice />
      <ComfyUiAdapterEmptyState />

      <section style={summaryBand}>
        {summarizeComfyUiAdapterPreview(model).map((line, index) => (
          <span key={buildComfyUiAdapterReactKey("summary", line, index)}>{line}</span>
        ))}
      </section>

      <section style={grid}>
        <Panel title="Workflow nodes">
          {model.nodes.map((node) => (
            <article key={node.id} style={row}>
              <span style={rowTitle}>{node.label}</span>
              <span style={rowMeta}>{node.kind}</span>
              <p style={body}>{node.detail}</p>
            </article>
          ))}
        </Panel>
        <Panel title="Review policy">
          <p style={body}>{model.seedPolicy}</p>
          <p style={body}>{model.modelPolicy}</p>
          {model.safetyBoundaries.map((boundary) => (
            <span key={buildComfyUiAdapterReactKey("boundary", boundary)} style={chip}>{boundary}</span>
          ))}
        </Panel>
      </section>

      <section style={grid}>
        <Panel title="Output placeholders">
          {model.outputPlaceholders.map((output) => (
            <span key={buildComfyUiAdapterReactKey("output", output)} style={codeLine}>{output}</span>
          ))}
        </Panel>
        <Panel title="Approval packet">
          {model.approvalPacket.map((item, index) => (
            <p key={buildComfyUiAdapterReactKey("approval", item, index)} style={body}>{item}</p>
          ))}
        </Panel>
      </section>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div style={metric}>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section style={panel}>
      <h2 style={panelTitle}>{title}</h2>
      {children}
    </section>
  );
}

const safeText: CSSProperties = { minWidth: 0, maxWidth: "100%", overflowWrap: "anywhere", wordBreak: "break-word" };
const displayText: CSSProperties = { minWidth: 0, maxWidth: "100%", overflowWrap: "normal", wordBreak: "normal" };
const page: CSSProperties = { background: "transparent", color: "#f8fafc", display: "grid", gap: 16, minHeight: 0, minWidth: 0, width: "100%" };
const hero: CSSProperties = { border: "1px solid rgba(45,212,191,0.22)", background: "linear-gradient(135deg, rgba(8,13,28,0.98), rgba(20,47,60,0.72))", borderRadius: 8, display: "grid", gap: 16, gridTemplateColumns: "minmax(0, 1fr)", minWidth: 0, padding: 20, width: "100%" };
const heroCopy: CSSProperties = { display: "grid", gap: 10, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 12, fontWeight: 900, textTransform: "uppercase", ...safeText };
const headline: CSSProperties = { color: "#f8fafc", fontSize: "clamp(30px, 4vw, 52px)", letterSpacing: 0, lineHeight: 1.04, margin: 0, maxWidth: 980, ...displayText };
const lede: CSSProperties = { color: "#cbd5e1", fontSize: 15, lineHeight: 1.55, margin: 0, maxWidth: 900, ...safeText };
const actions: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8, minWidth: 0 };
const button: CSSProperties = { border: "1px solid rgba(45,212,191,0.24)", background: "rgba(20,184,166,0.12)", borderRadius: 8, color: "#ccfbf1", cursor: "pointer", fontSize: 12, fontWeight: 900, padding: "9px 11px", ...safeText };
const pill: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", borderRadius: 8, color: "#cbd5e1", fontSize: 12, fontWeight: 850, padding: "9px 11px", ...safeText };
const metrics: CSSProperties = { display: "grid", gap: 8, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 140px), 1fr))", minWidth: 0 };
const metric: CSSProperties = { border: "1px solid rgba(125,211,252,0.18)", background: "rgba(2,6,23,0.52)", borderRadius: 8, display: "grid", gap: 4, minWidth: 0, padding: 10, ...safeText };
const summaryBand: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", background: "rgba(15,23,42,0.66)", borderRadius: 8, color: "#dbeafe", display: "grid", gap: 8, fontSize: 13, minWidth: 0, padding: 12, ...safeText };
const grid: CSSProperties = { alignItems: "start", display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))", minWidth: 0 };
const panel: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", background: "rgba(8,13,28,0.82)", borderRadius: 8, display: "grid", gap: 10, minWidth: 0, padding: 12, ...safeText };
const panelTitle: CSSProperties = { fontSize: 18, lineHeight: 1.2, margin: 0, ...displayText };
const row: CSSProperties = { border: "1px solid rgba(148,163,184,0.12)", background: "rgba(2,6,23,0.36)", borderRadius: 8, display: "grid", gap: 5, minWidth: 0, padding: 10, ...safeText };
const rowTitle: CSSProperties = { color: "#f8fafc", fontSize: 13, fontWeight: 900, ...safeText };
const rowMeta: CSSProperties = { color: "#7dd3fc", fontSize: 11, fontWeight: 850, textTransform: "uppercase", ...safeText };
const body: CSSProperties = { color: "#cbd5e1", fontSize: 13, lineHeight: 1.45, margin: 0, ...safeText };
const chip: CSSProperties = { border: "1px solid rgba(45,212,191,0.18)", background: "rgba(20,184,166,0.08)", borderRadius: 8, color: "#ccfbf1", display: "inline-flex", fontSize: 12, fontWeight: 850, padding: "6px 8px", width: "fit-content", ...safeText };
const codeLine: CSSProperties = { border: "1px solid rgba(148,163,184,0.14)", background: "#020617", borderRadius: 8, color: "#dbeafe", fontFamily: "var(--font-geist-mono), ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace", fontSize: 12, overflowX: "auto", padding: 8, whiteSpace: "pre-wrap", ...safeText };
