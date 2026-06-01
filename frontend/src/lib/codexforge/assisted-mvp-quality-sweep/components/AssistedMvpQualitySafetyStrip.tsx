"use client";
import { strip } from "../../assisted-coding-mode/components/ComponentStyles";

export function AssistedMvpQualitySafetyStrip() {
  return <section style={strip}><strong>No hidden mutation</strong><span>No auto-apply</span><span>No auto-run</span><span>Approval required</span></section>;
}
