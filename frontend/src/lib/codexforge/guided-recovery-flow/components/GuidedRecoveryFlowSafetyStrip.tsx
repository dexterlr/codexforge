"use client";
import { card, muted } from "./ComponentStyles";

export function GuidedRecoveryFlowSafetyStrip() {
  return <aside style={card}><strong>Safe recovery</strong><p style={muted}>no automatic rollback | no command execution buttons | no auto-run | approval required | preserve latest-message authority</p></aside>;
}
