import type { CSSProperties } from "react";
import type { BlenderAdapterPreviewModel } from "../blender-adapter-types";
import { summarizeBlenderAdapterSession } from "../index";
import { BlenderAdapterEmptyState } from "./BlenderAdapterEmptyState";
import { BlenderAdapterSafetyNotice } from "./BlenderAdapterSafetyNotice";
import { BlenderCameraPlanPanel } from "./BlenderCameraPlanPanel";
import { BlenderExecutionPacketPanel } from "./BlenderExecutionPacketPanel";
import { BlenderLightingPlanPanel } from "./BlenderLightingPlanPanel";
import { BlenderMaterialPlanPanel } from "./BlenderMaterialPlanPanel";
import { BlenderObjectPlanPanel } from "./BlenderObjectPlanPanel";
import { BlenderPythonPreviewPanel } from "./BlenderPythonPreviewPanel";
import { BlenderRenderSettingsPanel } from "./BlenderRenderSettingsPanel";
import { BlenderSafetyPolicyPanel } from "./BlenderSafetyPolicyPanel";
import { BlenderSceneInputPanel } from "./BlenderSceneInputPanel";
import { BlenderSceneModelPanel } from "./BlenderSceneModelPanel";

export function BlenderAdapterPreviewPanel({ model }: { model: BlenderAdapterPreviewModel }) {
  return (
    <main style={page} data-blender-adapter-preview-panel="BlenderAdapterPreviewPanel renders">
      <section style={hero}>
        <div style={{ minWidth: 0 }}>
          <span style={eyebrow}>Blender Adapter Preview v1</span>
          <h1 style={headline}>BlenderAdapterPreviewPanel renders</h1>
          <p style={lede}>
            Creative scene plan to typed Blender scene model to structured Blender Python script preview. This route is
            preview-only: no Blender execution, no render execution, no file writes, and no save actions.
            Safety policy links to Local Bridge Health for the Blender local health target before future execution.
            Cross-link to Video Render Job Preview for render queue and future executor packet planning, or Unreal Adapter Preview for cinematic/level handoff planning.
          </p>
          <a href="/video-render" style={link}>Open Video Render Job Preview</a>
          <a href="/local-bridge-health" style={link}>Open Local Bridge Health</a>
          <a href="/creative-executor" style={link}>Open Guarded Creative Executor</a>
          <a href="/unreal" style={link}>Open Unreal Adapter Preview</a>
        </div>
        <div style={summaryGrid}>
          <Metric label="Objects" value={String(model.summary.objectCount)} />
          <Metric label="Materials" value={String(model.summary.materialCount)} />
          <Metric label="Lights" value={String(model.summary.lightCount)} />
          <Metric label="Shots" value={String(model.summary.cameraShotCount)} />
        </div>
      </section>

      <BlenderAdapterSafetyNotice />
      <BlenderAdapterEmptyState />

      <section style={summaryBand}>
        {summarizeBlenderAdapterSession(model.summary).map((item, index) => (
          <span key={`blender-summary-${index}-${item.slice(0, 12)}`}>{item}</span>
        ))}
      </section>

      <BlenderSceneInputPanel input={model.sceneInput} />
      <BlenderSceneModelPanel model={model.sceneModel} />
      <section style={twoColumn}>
        <BlenderObjectPlanPanel plan={model.objectPlan} />
        <BlenderMaterialPlanPanel plan={model.materialPlan} />
      </section>
      <section style={twoColumn}>
        <BlenderLightingPlanPanel plan={model.lightingPlan} />
        <BlenderCameraPlanPanel plan={model.cameraPlan} />
      </section>
      <BlenderRenderSettingsPanel settings={model.renderSettings} />
      <BlenderPythonPreviewPanel preview={model.pythonPreview} />
      <section style={twoColumn}>
        <BlenderSafetyPolicyPanel policy={model.safetyPolicy} />
        <BlenderExecutionPacketPanel packet={model.executionPacket} />
      </section>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return <div style={metric}><span>{label}</span><strong>{value}</strong></div>;
}

const page: CSSProperties = { minHeight: 0, background: "transparent", color: "#f8fafc", padding: 0, display: "grid", gap: 16, minWidth: 0, maxWidth: "100%", overflowX: "clip" };
const hero: CSSProperties = { display: "grid", gridTemplateColumns: "minmax(0, 1fr)", gap: 16, alignItems: "end", border: "1px solid rgba(45,212,191,0.22)", background: "linear-gradient(135deg, rgba(8,13,28,0.98), rgba(20,47,60,0.72))", borderRadius: 8, padding: 20, minWidth: 0, width: "100%" };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 12, fontWeight: 900, textTransform: "uppercase" };
const headline: CSSProperties = { margin: "8px 0", fontSize: "clamp(30px, 4vw, 52px)", lineHeight: 1.04, letterSpacing: 0, maxWidth: 980, minWidth: 0, overflowWrap: "normal", wordBreak: "normal" };
const lede: CSSProperties = { margin: 0, color: "#cbd5e1", lineHeight: 1.55, maxWidth: 820, overflowWrap: "anywhere" };
const link: CSSProperties = { width: "fit-content", maxWidth: "100%", border: "1px solid rgba(94,234,212,0.28)", background: "rgba(20,184,166,0.12)", borderRadius: 8, padding: "8px 10px", color: "#ccfbf1", fontSize: 12, fontWeight: 900, textTransform: "uppercase", textDecoration: "none", overflowWrap: "anywhere" };
const summaryGrid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 130px), 1fr))", gap: 8, minWidth: 0 };
const metric: CSSProperties = { border: "1px solid rgba(125,211,252,0.18)", background: "rgba(2,6,23,0.52)", borderRadius: 8, padding: 10, display: "grid", gap: 4, minWidth: 0, maxWidth: "100%", overflowWrap: "anywhere" };
const summaryBand: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))", gap: 8, color: "#dbeafe", fontSize: 13, minWidth: 0, overflowWrap: "anywhere" };
const twoColumn: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))", gap: 16, minWidth: 0 };
