"use client";

import type { CSSProperties } from "react";
import type {
  CodexForgeBrainOnboardingPlan,
  CodexForgeBrainSeedGraphPlan,
} from "@/lib/codexforge/brain/runtime";
import { BrainSeedGraphPanel } from "./brain-seed-graph-panel";

type BrainFirstRunOnboardingProps = {
  seedPlan: CodexForgeBrainSeedGraphPlan;
  onboardingPlan: CodexForgeBrainOnboardingPlan;
  onCreateStarterGraph: () => void;
  onKeepEmptyGraph?: () => void;
};

export function BrainFirstRunOnboarding({
  seedPlan,
  onboardingPlan,
  onCreateStarterGraph,
  onKeepEmptyGraph,
}: BrainFirstRunOnboardingProps) {
  return (
    <section
      data-codexforge-brain-first-run-onboarding
      data-codexforge-brain-empty-first-run
      style={panelStyle}
    >
      <div style={introStyle}>
        <span style={eyebrowStyle}>Empty Brain first run</span>
        <h2 style={titleStyle}>Start with an inspectable cognitive graph</h2>
        <p style={copyStyle}>
          Your Brain graph loaded successfully, but it has no nodes yet. You can
          keep it empty, or create a deterministic starter graph that explains
          CodexForge runtime concepts before real workspace activity arrives.
        </p>
        <div style={policyRowStyle}>
          <span
            data-codexforge-brain-no-silent-seed
            data-codexforge-brain-explicit-seed-action
            style={policyPillStyle}
          >
            Explicit action required
          </span>
          <span
            data-codexforge-brain-no-overwrite-seed
            style={policyPillStyle}
          >
            Existing graph protected
          </span>
          <span style={policyPillStyle}>Preview before creation</span>
        </div>
      </div>

      <BrainSeedGraphPanel
        seedPlan={seedPlan}
        onboardingPlan={onboardingPlan}
        onCreateStarterGraph={onCreateStarterGraph}
        onKeepEmptyGraph={onKeepEmptyGraph}
      />
    </section>
  );
}

const panelStyle: CSSProperties = {
  display: "grid",
  gap: 14,
  marginBottom: 18,
};

const introStyle: CSSProperties = {
  display: "grid",
  gap: 10,
  padding: 16,
  borderRadius: 8,
  border: "1px solid rgba(125,211,252,0.22)",
  background: "rgba(2,6,23,0.44)",
};

const titleStyle: CSSProperties = {
  margin: 0,
  fontSize: 24,
  lineHeight: 1.12,
};

const copyStyle: CSSProperties = {
  margin: 0,
  color: "rgba(226,232,240,0.78)",
  fontSize: 13,
  lineHeight: 1.55,
  maxWidth: 940,
};

const policyRowStyle: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: 8,
};

const policyPillStyle: CSSProperties = {
  display: "inline-flex",
  borderRadius: 999,
  padding: "6px 10px",
  border: "1px solid rgba(34,197,94,0.22)",
  background: "rgba(34,197,94,0.08)",
  color: "rgba(220,252,231,0.94)",
  fontSize: 11,
  fontWeight: 900,
};

const eyebrowStyle: CSSProperties = {
  fontSize: 10,
  fontWeight: 900,
  letterSpacing: 0,
  textTransform: "uppercase",
  color: "rgba(186,230,253,0.86)",
};
