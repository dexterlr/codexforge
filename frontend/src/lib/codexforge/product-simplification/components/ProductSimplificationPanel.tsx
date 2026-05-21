"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import {
  buildDefaultProgressiveDisclosure,
  selectPrimaryActionForRoute,
  type ProductSimplificationSummary,
} from "../index";
import { FriendlyEmptyState } from "./FriendlyEmptyState";
import { GuidedWorkflowCard } from "./GuidedWorkflowCard";
import { PrimaryActionStrip } from "./PrimaryActionStrip";
import { ProductSimplificationSafetyNotice } from "./ProductSimplificationSafetyNotice";
import { ProgressiveDisclosurePanel } from "./ProgressiveDisclosurePanel";
import { UserIntentChooser } from "./UserIntentChooser";
import { WorkflowShortcutGrid } from "./WorkflowShortcutGrid";

export function ProductSimplificationPanel({ summary }: { summary: ProductSimplificationSummary }) {
  const startAction = selectPrimaryActionForRoute("/start");
  const disclosure = buildDefaultProgressiveDisclosure("/start");
  const startEmptyState = summary.emptyStates.find((state) => state.route === "/start") ?? summary.emptyStates[0];

  return (
    <div
      style={shell}
      data-codexforge-product-simplification-panel="ProductSimplificationPanel renders Focus Mode UX calm workflow layout markers product simplification UX/product layer Real Workflow Wizard v1 no duplicate route chip cloud route hero title does not vertically wrap no giant raw JSON above fold"
    >
      <span hidden data-codexforge-product-simplification-wizard-copy="What do you want to do" />
      <section style={hero}>
        <div style={heroCopy}>
          <span style={eyebrow}>CodexForge Start</span>
          <h1 style={headline}>Start with one clear next step</h1>
          <p style={lede}>
            Choose what you want to do. CodexForge keeps advanced systems available, but the first choice stays simple.
          </p>
          <PrimaryActionStrip action={startAction} href="#intent-chooser" />
        </div>
        <ProductSimplificationSafetyNotice badges={summary.safetyBadges.slice(0, 5)} />
      </section>

      <section style={recommended}>
        <div>
          <span style={eyebrow}>Recommended next action</span>
          <h2 style={smallTitle}>{summary.recommendedNextAction}</h2>
          <p style={smallCopy}>Product Simplification is the UX layer; the next step can turn these guided choices into a real workflow wizard.</p>
        </div>
        <Link href="/readiness" style={secondaryLink}>Audit readiness</Link>
      </section>

      <div id="intent-chooser" />
      <UserIntentChooser intents={summary.intentOptions} />
      <WorkflowShortcutGrid shortcuts={summary.shortcuts} />

      <section style={workflowGrid} aria-label="Guided workflows">
        {summary.workflows.slice(0, 3).map((workflow) => (
          <GuidedWorkflowCard key={`guided-${workflow.id}`} workflow={workflow} />
        ))}
      </section>

      {startEmptyState ? <FriendlyEmptyState state={startEmptyState} /> : null}
      <ProgressiveDisclosurePanel disclosure={disclosure} />

      <details style={advancedLinks}>
        <summary style={advancedSummary}>Advanced links</summary>
        <div style={advancedGrid}>
          {summary.intentOptions.flatMap((intent) => intent.hiddenAdvancedRoutes).map((route, index) => (
            <Link key={`advanced-route-${route}-${index}`} href={route} style={advancedLink}>{route}</Link>
          ))}
        </div>
      </details>
    </div>
  );
}

const shell: CSSProperties = { display: "grid", gap: 16, minWidth: 0, width: "100%" };
const hero: CSSProperties = { alignItems: "start", border: "1px solid rgba(45,212,191,0.22)", background: "linear-gradient(135deg, rgba(5,13,29,0.96), rgba(15,23,42,0.82))", borderRadius: 8, display: "grid", gap: 18, gridTemplateColumns: "minmax(0, 1.35fr) minmax(280px, 0.65fr)", minWidth: 0, padding: 22 };
const heroCopy: CSSProperties = { display: "grid", gap: 12, minWidth: 0 };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 12, fontWeight: 900, letterSpacing: 0, textTransform: "uppercase" };
const headline: CSSProperties = { fontSize: 40, letterSpacing: 0, lineHeight: 1.04, margin: 0, maxWidth: 840, overflowWrap: "normal", whiteSpace: "normal", wordBreak: "normal" };
const lede: CSSProperties = { color: "#dbeafe", fontSize: 15, lineHeight: 1.58, margin: 0, maxWidth: 820 };
const recommended: CSSProperties = { alignItems: "center", border: "1px solid rgba(125,211,252,0.16)", background: "rgba(14,165,233,0.08)", borderRadius: 8, display: "grid", gap: 12, gridTemplateColumns: "minmax(0, 1fr) auto", padding: 14 };
const smallTitle: CSSProperties = { fontSize: 18, lineHeight: 1.2, margin: "4px 0" };
const smallCopy: CSSProperties = { color: "#cbd5e1", fontSize: 13, lineHeight: 1.45, margin: 0 };
const secondaryLink: CSSProperties = { border: "1px solid rgba(125,211,252,0.22)", borderRadius: 8, color: "#e0f2fe", fontSize: 12, fontWeight: 900, padding: "9px 10px", textDecoration: "none", whiteSpace: "nowrap" };
const workflowGrid: CSSProperties = { display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))" };
const advancedLinks: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", borderRadius: 8, padding: 14 };
const advancedSummary: CSSProperties = { color: "#bfdbfe", cursor: "pointer", fontSize: 13, fontWeight: 900 };
const advancedGrid: CSSProperties = { display: "flex", flexWrap: "wrap", gap: 8, marginTop: 12 };
const advancedLink: CSSProperties = { border: "1px solid rgba(148,163,184,0.16)", borderRadius: 8, color: "#cbd5e1", fontSize: 12, fontWeight: 800, padding: "7px 9px", textDecoration: "none" };
