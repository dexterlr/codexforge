"use client";
import { copy, eyebrow, panel, title } from "./ManualTrialComponentStyles";

export function ManualTrialEmptyState() {
  return <section style={panel} data-codexforge-manual-trial-empty="ManualTrialEmptyState renders plain English no giant raw JSON above fold"><span style={eyebrow}>Empty state</span><h2 style={title}>No trial result yet</h2><p style={copy}>Start guided manual trial, then paste evidence and validation output before deciding pass or fail.</p></section>;
}
