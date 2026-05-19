import type { ContinuityHandoffBrainPosture, ContinuityHandoffMemoryPosture, ContinuityHandoffNextActionPlan, ContinuityHandoffPacket, ContinuityHandoffPacketSection, ContinuityHandoffRiskSummary, ContinuityHandoffRollbackPosture, ContinuityHandoffState, ContinuityHandoffValidationPlan } from "./continuity-handoff-types";
import { buildContinuityHandoffStableKey } from "./continuity-handoff-types";

export function buildContinuityHandoffSection(title: string, lines: readonly string[]): ContinuityHandoffPacketSection {
  return {
    id: buildContinuityHandoffStableKey("handoff-section", title),
    title,
    lines: lines.map((line) => line.trim()).filter(Boolean),
  };
}

export function buildContinuityHandoffPacket(input: {
  state: ContinuityHandoffState;
  risks: ContinuityHandoffRiskSummary;
  validationPlan: ContinuityHandoffValidationPlan;
  rollbackPosture: ContinuityHandoffRollbackPosture;
  memoryPosture: ContinuityHandoffMemoryPosture;
  brainPosture: ContinuityHandoffBrainPosture;
  nextActions: ContinuityHandoffNextActionPlan;
}): ContinuityHandoffPacket {
  const sections = [
    buildContinuityHandoffSection("Current State", input.state.summary),
    buildContinuityHandoffSection("What Changed", ["Phase 53 adds a deterministic, copyable, review-first continuity handoff packet model and /handoff UI.", "No Brain graph, snapshot, runtime event, memory, command, or file mutation is performed."]),
    buildContinuityHandoffSection("Validation Results", ["Validation results are manual only until the operator runs commands.", ...input.validationPlan.summary]),
    buildContinuityHandoffSection("Known Risks", input.risks.items.map((risk) => `${risk.title}: ${risk.detail} Mitigation: ${risk.mitigation}`)),
    buildContinuityHandoffSection("Memory Posture", input.memoryPosture.summary),
    buildContinuityHandoffSection("Brain Continuity Posture", input.brainPosture.summary),
    buildContinuityHandoffSection("Runtime Event Posture", ["Runtime Event Journal is review-only.", "No appendEvent from UI.", "No runtime event execution from handoff UI."]),
    buildContinuityHandoffSection("Snapshot / Restore Posture", ["Snapshot Manager remains inspect-only.", "Snapshot Restore Gate preview only.", "Brain graph restore blocked by default."]),
    buildContinuityHandoffSection("Rollback Posture", input.rollbackPosture.summary),
    buildContinuityHandoffSection("Next Safe Actions", input.nextActions.summary),
    buildContinuityHandoffSection("Commands To Run Manually", input.validationPlan.commands.map((command) => command.command)),
    buildContinuityHandoffSection("Do Not Do", ["Do not mutate Brain graph.", "Do not restore snapshots.", "Do not append runtime events.", "Do not promote memory.", "Do not execute tools.", "Do not persist handoff packets automatically.", "Do not call broker-execution, apply-diff, write-file, or run-command from handoff UI.", "Preserve latest-message authority."]),
    buildContinuityHandoffSection("Recommended Next Phase", ["After all validation passes, recommend commit clean checkpoint, tag smoke-suite clean if appropriate, then create the next phase prompt from this packet."]),
  ];
  const text = sections.map((section) => [`## ${section.title}`, ...section.lines.map((line) => `- ${line}`)].join("\n")).join("\n\n");
  return {
    id: buildContinuityHandoffStableKey("handoff-packet", input.state.id, input.nextActions.selected.action),
    title: "CodexForge Continuity Handoff Packet",
    sections,
    text,
    summary: summarizeContinuityHandoffPacket(sections),
  };
}

export function summarizeContinuityHandoffPacket(sectionsOrPacket: readonly ContinuityHandoffPacketSection[] | ContinuityHandoffPacket): string[] {
  const sections = "sections" in sectionsOrPacket ? sectionsOrPacket.sections : sectionsOrPacket;
  return [
    `${sections.length} packet sections are ready.`,
    "Packet is compact, deterministic, copyable, plain-text, and safe for the next Codex session.",
    "Packet includes Current State, Validation Results, Known Risks, Memory Posture, Brain Continuity Posture, Rollback Posture, Next Safe Actions, Commands To Run Manually, Do Not Do, and Recommended Next Phase.",
  ];
}
