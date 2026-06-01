"use client";
import { buildDefaultAssistedCodingGoals } from "../index";
import { card, muted } from "./ComponentStyles";

export function AssistedCodingGoalPanel() {
  return <section style={card}><strong>Coding goals</strong>{buildDefaultAssistedCodingGoals().map((goal) => <p key={goal.id} style={muted}>{goal.title}: {goal.plainEnglish}</p>)}</section>;
}
