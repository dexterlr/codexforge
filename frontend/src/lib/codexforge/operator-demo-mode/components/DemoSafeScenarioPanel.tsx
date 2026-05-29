"use client";
import type { DemoSafeScenario } from "../operator-demo-types";
import { copy, eyebrow, list, panel, title } from "./DemoStyles";
export function DemoSafeScenarioPanel({ scenario }: { scenario: DemoSafeScenario }) { return <section style={panel} data-codexforge-demo-safe-scenario="DemoSafeScenarioPanel renders safe demo scenario only no secrets no generated files"><span style={eyebrow}>Safe scenario</span><h2 style={title}>{scenario.title}</h2><p style={copy}>{scenario.change}</p><ul style={list}>{scenario.blockedClaims.map((claim) => <li key={claim}>{claim}</li>)}</ul></section>; }
