"use client";
import { buildDefaultFirstTaskScenario } from "../index";
import { card, muted } from "../../assisted-coding-mode/components/ComponentStyles";

export function FirstTaskScenarioPanel() {
  const scenario = buildDefaultFirstTaskScenario();
  return <article style={card}><h2>{scenario.title}</h2><p>{scenario.safeTask}</p><p style={muted}>{scenario.subtitle}</p></article>;
}
