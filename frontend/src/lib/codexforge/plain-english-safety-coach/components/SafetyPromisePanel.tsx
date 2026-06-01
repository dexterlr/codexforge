"use client";
import { buildSafetyPromise } from "../index";
import { card, muted } from "../../assisted-coding-mode/components/ComponentStyles";

export function SafetyPromisePanel() {
  const promise = buildSafetyPromise();
  return <article style={card}><h2>{promise.title}</h2><p style={muted}>{promise.promises.join(" | ")}</p></article>;
}
