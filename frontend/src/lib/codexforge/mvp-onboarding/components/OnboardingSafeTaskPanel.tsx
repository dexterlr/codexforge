"use client";
import Link from "next/link";
import { buildOnboardingSafeTask } from "../index";
import { buttonLike, card, muted } from "./ComponentStyles";

export function OnboardingSafeTaskPanel() {
  const task = buildOnboardingSafeTask();
  return <section style={card}><strong>{task.title}</strong><p style={muted}>{task.detail}</p><Link href={task.route} style={buttonLike}>Open assisted mode</Link></section>;
}
