import type { CSSProperties } from "react";
import type { UnrealAdapterPreviewModel } from "../unreal-adapter-types";
import { summarizeUnrealAdapterSession } from "../index";
import { UnrealActorPlanPanel } from "./UnrealActorPlanPanel";
import { UnrealAdapterEmptyState } from "./UnrealAdapterEmptyState";
import { UnrealAdapterSafetyNotice } from "./UnrealAdapterSafetyNotice";
import { UnrealAssetPlanPanel } from "./UnrealAssetPlanPanel";
import { UnrealBlueprintPlanPanel } from "./UnrealBlueprintPlanPanel";
import { UnrealBuildSettingsPanel } from "./UnrealBuildSettingsPanel";
import { UnrealCommandPreviewPanel } from "./UnrealCommandPreviewPanel";
import { UnrealExecutionPacketPanel } from "./UnrealExecutionPacketPanel";
import { UnrealLevelModelPanel } from "./UnrealLevelModelPanel";
import { UnrealMaterialPlanPanel } from "./UnrealMaterialPlanPanel";
import { UnrealProjectInputPanel } from "./UnrealProjectInputPanel";
import { UnrealSafetyPolicyPanel } from "./UnrealSafetyPolicyPanel";
import { UnrealSequencerPlanPanel } from "./UnrealSequencerPlanPanel";

export function UnrealAdapterPreviewPanel({ model }: { model: UnrealAdapterPreviewModel }) {
  return (
    <main
      style={page}
      data-unreal-adapter-preview-panel="UnrealAdapterPreviewPanel renders"
      data-codexforge-focus-mode-layout="Focus Mode UX calm workflow layout"
      data-codexforge-shell-mode="shell without duplicate route chip cloud"
    >
      <section style={hero}>
        <div style={{ minWidth: 0 }}>
          <span style={eyebrow}>Unreal Adapter Preview v1</span>
          <h1 style={headline}>UnrealAdapterPreviewPanel renders</h1>
          <p style={lede}>
            Creative cinematic or level idea to typed Unreal level model, actor and asset plan, Blueprint preview,
            Sequencer camera plan, build warnings, command preview, and future executor packet. This route is
            preview-only: no Unreal execution, no Unreal Editor launch, no render execution, no package/build, no file
            writes, and no save actions. Link to Video Render Job Preview for Sequencer/render plan queue review.
          </p>
          <a href="/video-render" style={link}>Open Video Render Job Preview</a>
        </div>
        <div style={summaryGrid}>
          <Metric label="Actors" value={String(model.summary.actorCount)} />
          <Metric label="Assets" value={String(model.summary.assetCount)} />
          <Metric label="Blueprints" value={String(model.summary.blueprintCount)} />
          <Metric label="Shots" value={String(model.summary.sequencerShotCount)} />
        </div>
      </section>

      <UnrealAdapterSafetyNotice />
      <UnrealAdapterEmptyState />

      <section style={summaryBand}>
        {summarizeUnrealAdapterSession(model.summary).map((item, index) => (
          <span key={`unreal-summary-${index}-${item.slice(0, 12)}`}>{item}</span>
        ))}
      </section>

      <UnrealProjectInputPanel input={model.projectInput} />
      <UnrealLevelModelPanel model={model.levelModel} />
      <section style={twoColumn}>
        <UnrealActorPlanPanel plan={model.actorPlan} />
        <UnrealAssetPlanPanel plan={model.assetPlan} />
      </section>
      <section style={twoColumn}>
        <UnrealMaterialPlanPanel plan={model.materialPlan} />
        <UnrealBlueprintPlanPanel plan={model.blueprintPlan} />
      </section>
      <UnrealSequencerPlanPanel plan={model.sequencerPlan} />
      <UnrealBuildSettingsPanel settings={model.buildSettings} />
      <UnrealCommandPreviewPanel preview={model.commandPreview} />
      <section style={twoColumn}>
        <UnrealSafetyPolicyPanel policy={model.safetyPolicy} />
        <UnrealExecutionPacketPanel packet={model.executionPacket} />
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
const headline: CSSProperties = { margin: "8px 0", fontSize: "clamp(30px, 4vw, 52px)", lineHeight: 1.04, letterSpacing: 0, maxWidth: 980, minWidth: 0, overflowWrap: "normal", wordBreak: "normal", whiteSpace: "nowrap" };
const lede: CSSProperties = { margin: 0, color: "#cbd5e1", lineHeight: 1.55, maxWidth: 900, overflowWrap: "anywhere" };
const link: CSSProperties = { width: "fit-content", maxWidth: "100%", border: "1px solid rgba(94,234,212,0.28)", background: "rgba(20,184,166,0.12)", borderRadius: 8, padding: "8px 10px", color: "#ccfbf1", fontSize: 12, fontWeight: 900, textTransform: "uppercase", textDecoration: "none", overflowWrap: "anywhere" };
const summaryGrid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 130px), 1fr))", gap: 8, minWidth: 0 };
const metric: CSSProperties = { border: "1px solid rgba(125,211,252,0.18)", background: "rgba(2,6,23,0.52)", borderRadius: 8, padding: 10, display: "grid", gap: 4, minWidth: 0, maxWidth: "100%", overflowWrap: "anywhere" };
const summaryBand: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))", gap: 8, color: "#dbeafe", fontSize: 13, minWidth: 0, overflowWrap: "anywhere" };
const twoColumn: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))", gap: 16, minWidth: 0 };
