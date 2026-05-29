"use client";
import type { MvpPathStep } from "../mvp-working-path-types";
import { copy, eyebrow, list, panel, title } from "./MvpPathStyles";
export function MvpPathStepPanel({ steps }: { steps: MvpPathStep[] }) { return <section style={panel} data-codexforge-mvp-path-step="MvpPathStepPanel renders /start /code-flow/live-run /files /guarded-apply-mvp /apply-evidence /validation-results /workflow-results /run-history /closed-loop /code-flow/release-audit one primary action per step"><span style={eyebrow}>Steps</span><h2 style={title}>Locked MVP path</h2><ol style={list}>{steps.map((step) => <li key={step.id}>{step.route}: {step.primaryAction}</li>)}</ol></section>; }
