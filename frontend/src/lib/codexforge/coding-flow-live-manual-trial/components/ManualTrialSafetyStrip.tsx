"use client";
import { copy, panel } from "./ManualTrialComponentStyles";

export function ManualTrialSafetyStrip() {
  return <section style={panel} data-codexforge-manual-trial-safety="ManualTrialSafetyStrip renders no auto-apply no auto-run approval required preserve latest-message authority no unsafe execution buttons"><p style={copy}>Manual only: no auto-apply, no auto-run, approval required, preserve latest-message authority.</p></section>;
}
