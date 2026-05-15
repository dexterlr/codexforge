"use client";

import type { CSSProperties } from "react";
import type { GroundedFixRecommendationPolicy } from "../grounded-fix-types";

export function FixRecommendationPolicyPanel({ policy }: { policy: GroundedFixRecommendationPolicy }) {
  return (
    <section data-codexforge-grounded-fix-policy-panel="FixRecommendationPolicyPanel renders policy blocks apply mutation command execution requires Safe Patch Preview low confidence investigation-needed" style={card}>
      <h3 style={title}>Recommendation policy</h3>
      <span>{policy.allowed ? "Recommendation display allowed" : "Recommendation blocked"}</span>
      <span>Apply blocked: {String(policy.applyBlocked)}</span>
      <span>Mutation blocked: {String(policy.mutationBlocked)}</span>
      <span>Command execution blocked: {String(policy.commandExecutionBlocked)}</span>
      <span>Safe Patch Preview required: {String(policy.fileEditsRequireSafePatchPreview)}</span>
    </section>
  );
}

const card: CSSProperties = { border: "1px solid rgba(251,191,36,0.2)", background: "rgba(120,53,15,0.18)", borderRadius: 8, padding: 12, display: "grid", gap: 6, minWidth: 0, fontSize: 12, lineHeight: 1.45, overflowWrap: "anywhere" };
const title: CSSProperties = { margin: 0, fontSize: 14, letterSpacing: 0 };
