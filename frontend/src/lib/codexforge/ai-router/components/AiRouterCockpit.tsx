"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import {
  buildAiModelCatalog,
  buildAiRouteRecommendation,
  buildAiRoutingPolicy,
  buildAiUsageLedger,
  buildAiUsageLedgerItem,
  buildDefaultAiProviderProfiles,
  buildDefaultAiSubscriptionTiers,
  classifyAiTask,
} from "@/lib/codexforge/ai-router";
import { AiModelCatalogPanel } from "./AiModelCatalogPanel";
import { AiProviderProfilePanel } from "./AiProviderProfilePanel";
import { AiRouteRecommendationPanel } from "./AiRouteRecommendationPanel";
import { AiRouterSafetyNotice } from "./AiRouterSafetyNotice";
import { AiRoutingPolicyPanel } from "./AiRoutingPolicyPanel";
import { AiSubscriptionTierPanel } from "./AiSubscriptionTierPanel";
import { AiTokenBudgetPanel } from "./AiTokenBudgetPanel";
import { AiUsageLedgerPanel } from "./AiUsageLedgerPanel";

export function AiRouterCockpit() {
  const providers = buildDefaultAiProviderProfiles();
  const models = buildAiModelCatalog();
  const tiers = buildDefaultAiSubscriptionTiers();
  const policy = buildAiRoutingPolicy();
  const promptText =
    "Plan storyboard planning, ComfyUI workflow planning, Blender scene planning, Blender Adapter Preview scene plan drafting, Unreal cinematic/level planning, Unreal Blueprint reasoning, video render planning task example, creative executor review task example, creative sandbox review task example, real creative executor readiness audit task example, MVP planning task example, local bridge health review task example, health probe review task example, render queue planning, and render review with private local context, then use local or cheap models for packet summarization and draft render queue planning, premium only for high-risk execution review, premium only for complex cinematic/blueprint reasoning, and premium only for complex cross-pipeline planning.";
  const task = classifyAiTask(promptText);
  const recommendation = buildAiRouteRecommendation({
    task,
    promptText,
    policy,
    providers,
    models,
    tiers,
  });
  const ledger = buildAiUsageLedger([
    buildAiUsageLedgerItem({
      requestId: "ai-router-preview-chat",
      task,
      route: recommendation,
      timestampLabel: "preview",
    }),
  ]);

  return (
    <div style={shell}>
      <section style={hero}>
        <div style={{ minWidth: 0 }}>
          <span style={eyebrow}>CodexForge AI Router</span>
          <h1 style={headline}>Local-first subscription-efficient model routing cockpit</h1>
          <p style={lede}>
            Register provider, model, and subscription metadata, classify tasks, estimate approximate tokens, then
            recommend a deterministic route with a visible fallback route. No API keys stored and no provider calls.
            Creative planning examples include storyboard planning, ComfyUI workflow planning, Blender scene
            planning, Blender Adapter Preview scene plan drafting, Local Bridge Health review, health probe review, real creative executor readiness audit, MVP planning, Unreal cinematic/level planning, Unreal Blueprint
            reasoning, video render planning, creative executor review, creative sandbox review, draft render queue planning, and render review.
            Use local or cheap routing for packet summarization and draft planning, premium only for high-risk execution
            review, premium only for complex cinematic/blueprint reasoning, and premium only for complex cross-pipeline
            planning.
          </p>
        </div>
        <div style={linkRow}>
          <Link href="/ai" style={workspaceLink}>Open workspace</Link>
          <Link href="/ai-providers" style={secondaryLink}>Provider registry</Link>
          <Link href="/model-capabilities" style={secondaryLink}>Model capabilities</Link>
          <Link href="/task-router" style={secondaryLink}>Task router</Link>
          <Link href="/provider-adapters" style={secondaryLink}>Provider adapters</Link>
          <Link href="/credentials" style={secondaryLink}>Credential strategy</Link>
          <Link href="/token-router" style={secondaryLink}>Token router</Link>
        </div>
      </section>

      <AiRouterSafetyNotice />

      <section style={metricGrid}>
        <div style={metric}><span>Providers</span><strong>{providers.length}</strong></div>
        <div style={metric}><span>Models</span><strong>{models.length}</strong></div>
        <div style={metric}><span>Tiers</span><strong>{tiers.length}</strong></div>
        <div style={metric}><span>Fallback route</span><strong>{recommendation.fallbackRoute.length}</strong></div>
      </section>

      <div style={split}>
        <AiRouteRecommendationPanel route={recommendation} />
        <AiTokenBudgetPanel budget={recommendation.estimatedTokenBudget} />
      </div>

      <AiRoutingPolicyPanel policy={policy} />
      <AiProviderProfilePanel providers={providers} />
      <AiModelCatalogPanel models={models} />
      <AiSubscriptionTierPanel tiers={tiers} />
      <AiUsageLedgerPanel ledger={ledger} />
    </div>
  );
}

const shell: CSSProperties = {
  display: "grid",
  gap: 18,
  color: "#f8fafc",
  minWidth: 0,
  maxWidth: "100%",
  fontFamily:
    'var(--font-geist-sans), ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
};
const hero: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: 16,
  flexWrap: "wrap",
  border: "1px solid rgba(45,212,191,0.2)",
  background: "linear-gradient(135deg, rgba(8,13,28,0.95), rgba(15,23,42,0.68))",
  borderRadius: 8,
  minWidth: 0,
  padding: 18,
};
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const headline: CSSProperties = { fontSize: "clamp(28px, 5vw, 54px)", lineHeight: 1, margin: "8px 0", letterSpacing: 0, overflowWrap: "anywhere" };
const lede: CSSProperties = { maxWidth: 760, margin: 0, color: "rgba(226,232,240,0.76)", lineHeight: 1.55, fontSize: 14, overflowWrap: "anywhere" };
const workspaceLink: CSSProperties = { color: "#021014", background: "#5eead4", borderRadius: 8, padding: "10px 12px", textDecoration: "none", fontSize: 12, fontWeight: 900, maxWidth: "100%", overflowWrap: "anywhere" };
const linkRow: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8, alignContent: "flex-start" };
const secondaryLink: CSSProperties = { color: "#dbeafe", border: "1px solid rgba(125,211,252,0.18)", borderRadius: 8, padding: "10px 12px", textDecoration: "none", fontSize: 12, fontWeight: 900, maxWidth: "100%", overflowWrap: "anywhere" };
const metricGrid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 140px), 1fr))", gap: 10, minWidth: 0 };
const metric: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", background: "rgba(15,23,42,0.62)", borderRadius: 8, padding: 12, display: "grid", gap: 4, minWidth: 0, overflowWrap: "anywhere" };
const split: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", gap: 14, minWidth: 0 };
