"use client";
import type { DemoScript } from "../operator-demo-types";
import { eyebrow, list, panel, title } from "./DemoStyles";
export function DemoScriptPanel({ script }: { script: DemoScript }) { return <section style={panel} data-codexforge-demo-script="DemoScriptPanel renders Start at /start Choose coding flow Pick safe file Preview change Review guarded apply request Capture apply evidence Capture validation result Review workflow results See run history Show release audit"><span style={eyebrow}>Script</span><h2 style={title}>{script.title}</h2><ol style={list}>{script.steps.map((step) => <li key={step.id}>{step.title}: {step.route}</li>)}</ol></section>; }
