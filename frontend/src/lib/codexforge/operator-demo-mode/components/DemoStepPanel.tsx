"use client";
import type { DemoStep } from "../operator-demo-types";
import { copy, eyebrow, list, panel, title } from "./DemoStyles";
export function DemoStepPanel({ steps }: { steps: DemoStep[] }) { return <section style={panel} data-codexforge-demo-step="DemoStepPanel renders demo steps plain English"><span style={eyebrow}>Steps</span><h2 style={title}>Demo path</h2><ul style={list}>{steps.map((step) => <li key={step.id}>{step.order}. {step.talkingPoint} <span style={copy}>{step.route}</span></li>)}</ul></section>; }
