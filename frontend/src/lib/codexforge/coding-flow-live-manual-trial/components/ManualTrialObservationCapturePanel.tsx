"use client";
import type { ManualTrialObservationCapture } from "../live-manual-trial-types";
import { copy, eyebrow, list, panel, title } from "./ManualTrialComponentStyles";

export function ManualTrialObservationCapturePanel({ capture }: { capture: ManualTrialObservationCapture }) {
  return <section style={panel} data-codexforge-manual-trial-observation="ManualTrialObservationCapturePanel renders Copy checklist trial report"><span style={eyebrow}>Observations</span><h2 style={title}>Capture what happened</h2><ul style={list}>{capture.prompts.map((prompt) => <li key={prompt}>{prompt}</li>)}</ul><p style={copy}>{capture.copyTemplate}</p></section>;
}
