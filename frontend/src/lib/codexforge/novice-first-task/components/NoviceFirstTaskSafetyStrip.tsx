"use client";
import { strip } from "../../assisted-coding-mode/components/ComponentStyles";

export function NoviceFirstTaskSafetyStrip() {
  return <section style={strip}><strong>No auto-apply</strong><span>No auto-run</span><span>Approval required</span><span>Validation stays separate</span></section>;
}
