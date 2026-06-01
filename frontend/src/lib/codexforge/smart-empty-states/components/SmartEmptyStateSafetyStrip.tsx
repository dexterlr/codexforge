"use client";
import { strip } from "../../assisted-coding-mode/components/ComponentStyles";

export function SmartEmptyStateSafetyStrip() {
  return <section style={strip}><strong>Helpful only</strong><span>No auto-apply</span><span>No auto-run</span><span>Approval required where files may change</span></section>;
}
