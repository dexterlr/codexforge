"use client";
import { strip } from "../../assisted-coding-mode/components/ComponentStyles";

export function SafetyCoachStrip() {
  return <section style={strip}><strong>Preview means no change yet</strong><span>Apply needs approval</span><span>Validation is separate</span></section>;
}
