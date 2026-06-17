import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import { buildUniversalExecutionReviewStableKey as buildFirstProjectScaffoldControlledTrialStableKey } from "../universal-execution-review-kit";
import {
  buildFirstControlledExecutionTrialAdvancedDetails,
  buildFirstControlledExecutionTrialBoundary,
  buildFirstControlledExecutionTrialModel,
  buildFirstControlledExecutionTrialPacket,
  buildFirstControlledExecutionTrialSections,
  summarizeFirstControlledExecutionTrial,
  type ControlledBuilderReviewPacketInput,
} from "../first-controlled-execution-trial-kit";

export { buildFirstProjectScaffoldControlledTrialStableKey };

export const FIRST_PROJECT_SCAFFOLD_CONTROLLED_TRIAL_LANGUAGE = [
  "First project scaffold controlled trial",
  "First project scaffold controlled trial does not create projects",
  "Project scaffold controlled trials require explicit operator approval",
  "Trial identity",
  "Scaffold scope",
  "Allowed targets",
  "Denied actions",
  "Approval checklist",
  "Evidence checklist",
  "Result checklist",
  "Recovery checklist",
  "Next action",
  "Original medieval fantasy",
  "No copied franchise assets",
] as const;

const FIRST_PROJECT_SCAFFOLD_CONTROLLED_TRIAL_ADVANCED_DETAILS = [
  "Trial identity",
  "Scaffold scope",
  "Allowed targets",
  "Denied actions",
  "Approval checklist",
  "Evidence checklist",
  "Result checklist",
  "Recovery checklist",
  "Next action",
  "advanced first project scaffold controlled trial details collapsed/secondary",
] as const;

export function buildFirstProjectScaffoldControlledTrial(input: ControlledBuilderReviewPacketInput): UniversalExecutionReviewPacket {
  return buildFirstControlledExecutionTrialPacket("first-project-scaffold-controlled-trial", input);
}

export function buildFirstProjectScaffoldControlledTrials(): UniversalExecutionReviewPacket[] {
  return [
    buildFirstProjectScaffoldControlledTrial({
      idHint: "first-project-scaffold-controlled-trial",
      status: "blocked",
      identity: "Trial identity: First project scaffold controlled trial does not create projects. It previews one operator-reviewed scaffold request without creating folders, files, repositories, workspaces, or servers.",
      sections: buildFirstControlledExecutionTrialSections(
        { label: "Scaffold scope", items: ["Scaffold scope: define project type, workspace label, starter structure, template provenance, dependency intent, and validation expectations before any future scaffold executor is considered."] },
        { label: "Allowed targets", items: ["Allowed targets: coding project, creative project, research project, chatbot project, automation project, connector project, and original game/server project remain review-only targets."] },
        { label: "Denied actions", items: ["Denied actions: create projects, write files, copy templates, install packages, run setup commands, start runtimes, call providers/models/connectors, create automations, package exports, or launch servers."] },
        { label: "Approval checklist", items: ["Approval checklist: operator confirms target path, template source, copyright/trademark posture, file-write boundary, command boundary, runtime boundary, evidence needs, result review, and recovery owner."] },
        { label: "Evidence checklist", items: ["Evidence checklist: target intent, template inventory, proposed file tree, denied action list, safety copy, and operator notes must be reviewed manually; no evidence is captured or ingested automatically."] },
        { label: "Result checklist", items: ["Result checklist: expected scaffold summary, changed-path preview, validation needs, acceptance decision, rejected output handling, and reuse gate stay approval required."] },
        { label: "Recovery checklist", items: ["Recovery checklist: rollback plan, cleanup owner, partial scaffold handling, retry gate, escalation path, and no automatic recovery trigger."] },
        { label: "Original medieval fantasy", items: ["Original medieval fantasy game/server example: original medieval fantasy server inspired by ice, fire, castles, houses, and kingdoms. No copied franchise assets, names, logos, maps, dialogue, music, character likenesses, or protected assets are allowed."] },
      ),
      routes: ["/first-project-scaffold-trial-review", "/first-file-write-controlled-trial", "/universal-builder-evidence-review"],
      nextRecommendedAction: "Next action: keep scaffold creation blocked, review the approval packet, and require explicit operator approval before any future scaffold implementation can create a project.",
      advancedDetails: buildFirstControlledExecutionTrialAdvancedDetails("first project scaffold controlled trial", FIRST_PROJECT_SCAFFOLD_CONTROLLED_TRIAL_LANGUAGE, FIRST_PROJECT_SCAFFOLD_CONTROLLED_TRIAL_ADVANCED_DETAILS),
    }),
  ];
}

export function buildFirstProjectScaffoldControlledTrialBoundary() {
  return buildFirstControlledExecutionTrialBoundary();
}

export function summarizeFirstProjectScaffoldControlledTrial(model: { firstProjectScaffoldControlledTrials: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeFirstControlledExecutionTrial("First project scaffold controlled trial", model.firstProjectScaffoldControlledTrials, "Project scaffold controlled trials require explicit operator approval.");
}

export function buildFirstProjectScaffoldControlledTrialModel() {
  const firstProjectScaffoldControlledTrials = buildFirstProjectScaffoldControlledTrials();
  const model = buildFirstControlledExecutionTrialModel({
    phase: "Phase 650",
    title: "First project scaffold controlled trial",
    summarySubject: "First project scaffold controlled trial",
    approvalCopy: "Project scaffold controlled trials require explicit operator approval.",
    subtitle: "Review the first controlled scaffold trial packet without creating projects.",
    primaryLabel: "Review scaffold trial",
    anchor: "first-project-scaffold-controlled-trial",
    plainEnglishTitle: "Plain-English first project scaffold controlled trial",
    plainEnglishCopy: "This page makes the first scaffold trial feel concrete while keeping it review-only. It shows what a real approved scaffold trial would need before anything can be created.",
    language: FIRST_PROJECT_SCAFFOLD_CONTROLLED_TRIAL_LANGUAGE,
    advancedDetails: [...FIRST_PROJECT_SCAFFOLD_CONTROLLED_TRIAL_ADVANCED_DETAILS],
    links: [
      { href: "/first-project-scaffold-trial-review", label: "Scaffold trial review" },
      { href: "/first-file-write-controlled-trial", label: "File write trial" },
      { href: "/universal-builder-evidence-review", label: "Builder evidence review" },
    ],
    packets: firstProjectScaffoldControlledTrials,
    advancedCopy: "advanced first project scaffold controlled trial details collapsed/secondary. This route does not create projects, write files, run commands, start runtimes, call providers/models, connect accounts, create automations, capture evidence, store results, trigger recovery, package exports, generate assets, browse research, create agents, join calls, monitor conditions, build servers, launch servers, or persist approval decisions.",
    dataScope: "first-project-scaffold-controlled-trial buildFirstProjectScaffoldControlledTrialStableKey FirstProjectScaffoldControlledTrialPanel",
  });
  return { ...model, firstProjectScaffoldControlledTrials };
}
