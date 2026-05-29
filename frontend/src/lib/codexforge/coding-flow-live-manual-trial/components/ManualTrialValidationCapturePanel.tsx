"use client";
import type { ManualTrialValidationCapture } from "../live-manual-trial-types";
import { copy, eyebrow, list, panel, title } from "./ManualTrialComponentStyles";

export function ManualTrialValidationCapturePanel({ validation }: { validation: ManualTrialValidationCapture }) {
  return <section style={panel} data-codexforge-manual-trial-validation="ManualTrialValidationCapturePanel renders Copy validation commands no auto-run no fabricated output"><span style={eyebrow}>Validation</span><h2 style={title}>Copy validation commands</h2><ul style={list}>{validation.commands.map((command) => <li key={command}>{command}</li>)}</ul><p style={copy}>{validation.copyTemplate}</p></section>;
}
