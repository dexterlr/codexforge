"use client";
import type { ManualTrialStepRunner } from "../live-manual-trial-types";
import { copy, eyebrow, list, panel, title } from "./ManualTrialComponentStyles";

export function ManualTrialStepRunnerPanel({ runner }: { runner: ManualTrialStepRunner }) {
  return <section style={panel} data-codexforge-manual-trial-step-runner="ManualTrialStepRunnerPanel renders Open Start or Code Flow Live Run Pick safe file Describe harmless wording change Preview patch Review guarded apply request Capture apply evidence Run validation manually Paste/capture validation result Review workflow result Review run history Decide pass/fail"><span style={eyebrow}>Checklist</span><h2 style={title}>{runner.title}</h2><ol style={list}>{runner.steps.map((step) => <li key={step.id}><strong>{step.title}</strong><br /><span style={copy}>{step.primaryAction} at {step.route}</span></li>)}</ol></section>;
}
