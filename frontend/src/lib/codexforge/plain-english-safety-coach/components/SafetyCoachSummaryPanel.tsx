"use client";
import { summarizeSafetyCoachSession } from "../index";
import { card } from "../../assisted-coding-mode/components/ComponentStyles";

export function SafetyCoachSummaryPanel() {
  return <article style={card}><h2>Session summary</h2><p>{summarizeSafetyCoachSession()}</p></article>;
}
