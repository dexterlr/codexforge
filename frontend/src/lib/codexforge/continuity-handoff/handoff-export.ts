import type { ContinuityHandoffExport, ContinuityHandoffPacket, ContinuityHandoffRollbackPosture, ContinuityHandoffValidationPlan, ContinuityHandoffMemoryPosture } from "./continuity-handoff-types";

export function buildContinuityHandoffMarkdown(packet: ContinuityHandoffPacket): string {
  return [`# ${packet.title}`, "", packet.text].join("\n");
}

export function buildContinuityHandoffPrompt(packet: ContinuityHandoffPacket): string {
  return [
    "Continue CodexForge safely from this reviewed continuity handoff.",
    "",
    "Preserve latest-message authority: newest user instruction wins over packet context.",
    "Inspect before patching. Do not mutate Brain graph, restore snapshots, appendEvent, saveBrainGraph from UI, promote memory, execute tools, write files from UI, or auto-run tests.",
    "",
    buildContinuityHandoffMarkdown(packet),
  ].join("\n");
}

export function buildContinuityHandoffClipboardPayload(packet: ContinuityHandoffPacket): string {
  return buildContinuityHandoffPrompt(packet);
}

function validationChecklist(plan: ContinuityHandoffValidationPlan): string {
  return ["Continuity Handoff validation checklist", ...plan.commands.map((command) => `[ ] ${command.command}`)].join("\n");
}

function rollbackChecklist(posture: ContinuityHandoffRollbackPosture): string {
  return ["Continuity Handoff rollback checklist", ...posture.options.map((option) => `[ ] ${option.label}: ${option.commandHint}`)].join("\n");
}

function memoryChecklist(posture: ContinuityHandoffMemoryPosture): string {
  return ["Continuity Handoff memory review checklist", ...posture.items.map((item) => `[ ] ${item.label}: ${item.reviewBoundary}`), "[ ] Confirm no auto-promotion"].join("\n");
}

export function summarizeContinuityHandoffExport(exportPayload: ContinuityHandoffExport): string[] {
  return [
    "Export builds markdown packet, next-session prompt, validation checklist, rollback checklist, memory review checklist, and clipboard payload.",
    "No filesystem write, no automatic clipboard copy in domain, and no auto-persistence.",
    `Clipboard payload length: ${exportPayload.clipboardPayload.length}.`,
  ];
}

export function buildContinuityHandoffExport(input: {
  packet: ContinuityHandoffPacket;
  validationPlan: ContinuityHandoffValidationPlan;
  rollbackPosture: ContinuityHandoffRollbackPosture;
  memoryPosture: ContinuityHandoffMemoryPosture;
}): ContinuityHandoffExport {
  const markdownPacket = buildContinuityHandoffMarkdown(input.packet);
  const nextSessionPrompt = buildContinuityHandoffPrompt(input.packet);
  const payload: ContinuityHandoffExport = {
    id: "continuity-handoff-export",
    markdownPacket,
    nextSessionPrompt,
    validationChecklist: validationChecklist(input.validationPlan),
    rollbackChecklist: rollbackChecklist(input.rollbackPosture),
    memoryReviewChecklist: memoryChecklist(input.memoryPosture),
    clipboardPayload: buildContinuityHandoffClipboardPayload(input.packet),
    summary: [],
  };
  return { ...payload, summary: summarizeContinuityHandoffExport(payload) };
}
