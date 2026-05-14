"use client";

import type { CSSProperties } from "react";
import { CodexForgeLocalActionBar } from "@/lib/codexforge/navigation";
import type { CreativeContext } from "../creative-types";
import { ArtifactGalleryPanel } from "./ArtifactGalleryPanel";
import { BlenderScenePlanPanel } from "./BlenderScenePlanPanel";
import { ComfyUIWorkflowPanel } from "./ComfyUIWorkflowPanel";
import { CreativeApprovalBoundary } from "./CreativeApprovalBoundary";
import { CreativeBriefPanel } from "./CreativeBriefPanel";
import { CreativePatchHandoffPanel } from "./CreativePatchHandoffPanel";
import { ProductionPlanBoard } from "./ProductionPlanBoard";
import { RenderQueuePreview } from "./RenderQueuePreview";
import { StoryboardPanel } from "./StoryboardPanel";
import { UnrealLevelPlanPanel } from "./UnrealLevelPlanPanel";

export function CreativeProductionStudio({ context }: { context: CreativeContext }) {
  return (
    <main
      data-codexforge-creative-production-studio
      data-codexforge-creative-preview-only="preview-only"
      data-codexforge-creative-approval-required="approval required before execution"
      style={page}
    >
      <CodexForgeLocalActionBar
        title="Creative Production Studio"
        subtitle="Creative brief to production plan to artifact pipeline preview, with Safe Patch Preview handoff as the approval boundary"
        status="preview-only"
      >
        <a href="/runs" style={runLink}>Open Operator Run Center</a>
        <a href="/bridge" style={runLink}>Bridge readiness</a>
        <a href="/artifacts" style={runLink}>Artifact Executor</a>
        <span style={statusPill}>approval required before execution</span>
        <span style={statusPill}>No render execution</span>
        <span style={statusPill}>No Blender execution</span>
        <span style={statusPill}>No Unreal execution</span>
        <span style={statusPill}>No ComfyUI execution</span>
      </CodexForgeLocalActionBar>

      <CreativeBriefPanel brief={context.brief} />
      <ProductionPlanBoard plan={context.productionPlan} />
      <StoryboardPanel storyboard={context.storyboard} />
      <section style={twoColumn}>
        <BlenderScenePlanPanel plan={context.blenderScenePlan} />
        <ComfyUIWorkflowPanel plan={context.comfyuiWorkflowPlan} />
      </section>
      <UnrealLevelPlanPanel plan={context.unrealLevelPlan} />
      <RenderQueuePreview queue={context.renderQueuePreview} />
      <ArtifactGalleryPanel gallery={context.artifactGallery} />
      <CreativePatchHandoffPanel handoff={context.patchHandoff} />
      <CreativeApprovalBoundary boundary={context.approvalBoundary} />
    </main>
  );
}

const page: CSSProperties = { minHeight: "100vh", background: "#030712", color: "#f8fafc", padding: "28px min(4vw, 44px)", display: "grid", gap: 16 };
const hero: CSSProperties = { border: "1px solid rgba(125,211,252,0.18)", background: "linear-gradient(135deg, rgba(8,13,28,0.98), rgba(15,23,42,0.82))", borderRadius: 8, padding: 20, display: "grid", gridTemplateColumns: "minmax(0, 1.4fr) minmax(min(100%, 280px), 0.6fr)", gap: 16, alignItems: "end" };
const heroText: CSSProperties = { display: "grid", gap: 8, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#67e8f9", fontSize: 12, fontWeight: 900, textTransform: "uppercase" };
const headline: CSSProperties = { margin: 0, fontSize: 42, lineHeight: 1.05, letterSpacing: 0 };
const subhead: CSSProperties = { margin: 0, color: "#cbd5e1", fontSize: 15, lineHeight: 1.55, maxWidth: 760 };
const linkRow: CSSProperties = { display: "flex", gap: 8, flexWrap: "wrap" };
const runLink: CSSProperties = { width: "fit-content", border: "1px solid rgba(125,211,252,0.22)", background: "rgba(14,165,233,0.12)", borderRadius: 8, padding: "8px 10px", color: "#e0f2fe", fontSize: 12, fontWeight: 900, textTransform: "uppercase", textDecoration: "none" };
const statusGrid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 150px), 1fr))", gap: 8 };
const statusPill: CSSProperties = { border: "1px solid rgba(148,163,184,0.2)", background: "rgba(2,6,23,0.58)", borderRadius: 8, padding: "9px 10px", color: "#dbeafe", fontSize: 12, fontWeight: 800, textTransform: "uppercase", textAlign: "center" };
const twoColumn: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 360px), 1fr))", gap: 16 };
