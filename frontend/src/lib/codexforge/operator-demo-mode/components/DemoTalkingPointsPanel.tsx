"use client";
import type { DemoTalkingPoints } from "../operator-demo-types";
import { eyebrow, list, panel, title } from "./DemoStyles";
export function DemoTalkingPointsPanel({ points }: { points: DemoTalkingPoints }) { return <section style={panel} data-codexforge-demo-talking-points="DemoTalkingPointsPanel renders What this proves What remains manual"><span style={eyebrow}>Talking points</span><h2 style={title}>What this proves</h2><ul style={list}>{points.proves.map((point) => <li key={point}>{point}</li>)}</ul><h2 style={title}>What remains manual</h2><ul style={list}>{points.remainsManual.map((point) => <li key={point}>{point}</li>)}</ul></section>; }
