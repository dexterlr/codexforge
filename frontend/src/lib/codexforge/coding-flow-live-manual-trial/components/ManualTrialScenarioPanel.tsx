"use client";
import type { ManualTrialScenario } from "../live-manual-trial-types";
import { copy, eyebrow, list, panel, title } from "./ManualTrialComponentStyles";

export function ManualTrialScenarioPanel({ scenario }: { scenario: ManualTrialScenario }) {
  return <section style={panel} data-codexforge-manual-trial-scenario="ManualTrialScenarioPanel renders harmless UI-copy or empty-state wording change safe file category only"><span style={eyebrow}>Scenario</span><h2 style={title}>{scenario.title}</h2><p style={copy}>{scenario.plainEnglishChange}</p><ul style={list}>{scenario.safetyNotes.map((note) => <li key={note}>{note}</li>)}</ul></section>;
}
