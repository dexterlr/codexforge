import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import { buildUniversalExecutionReviewStableKey as buildProjectScaffoldDryRunPlanStableKey } from "../universal-execution-review-kit";
import {
  buildControlledBuilderReviewAdvancedDetails,
  buildControlledBuilderReviewBoundary,
  buildControlledBuilderReviewModel,
  buildControlledBuilderReviewPacket,
  buildControlledBuilderReviewSections,
  summarizeControlledBuilderReview,
  type ControlledBuilderReviewPacketInput,
} from "../controlled-builder-dry-run-review-kit";

export { buildProjectScaffoldDryRunPlanStableKey };

export const PROJECT_SCAFFOLD_DRY_RUN_PLAN_LANGUAGE = [
  "Project scaffold dry-run plan",
  "Project scaffold dry-run plan does not create projects",
  "Scaffold creation requires explicit operator approval",
  "Scaffold target types",
  "Original medieval fantasy",
  "No copied franchise assets",
] as const;

const PROJECT_SCAFFOLD_DRY_RUN_PLAN_ADVANCED_DETAILS = [
  "Project scaffold dry-run identity",
  "Scaffold target types",
  "Safe game/server example",
  "Denied scaffold actions",
  "Unresolved scaffold blockers",
  "Next recommended action",
  "advanced project scaffold dry-run plan details collapsed/secondary",
] as const;

export function buildProjectScaffoldDryRunPlan(input: ControlledBuilderReviewPacketInput): UniversalExecutionReviewPacket {
  return buildControlledBuilderReviewPacket("project-scaffold-dry-run-plan", input);
}

export function buildProjectScaffoldDryRunPlans(): UniversalExecutionReviewPacket[] {
  return [
    buildProjectScaffoldDryRunPlan({
      idHint: "project-scaffold-dry-run-plan",
      status: "blocked",
      identity: "Project scaffold dry-run identity: project-scaffold-dry-run-plan defines a review-only scaffold plan without creating folders, files, repositories, workspaces, servers, or generated project assets.",
      sections: buildControlledBuilderReviewSections(
        { label: "Scaffold target types", items: ["Scaffold target types: coding project, creative project, research project, chatbot project, and game/server project are planned as review-only target lanes."] },
        { label: "Safe game/server example", items: ["Original medieval fantasy Minecraft server inspired by ice, fire, castles, houses, and kingdoms. No copied franchise assets, names, logos, maps, dialogue, music, character likenesses, or protected assets are allowed."] },
        { label: "Denied scaffold actions", items: ["Denied scaffold actions: create projects, create files, copy templates, install packages, run setup commands, start runtimes, call providers/models/connectors, create automations, capture evidence, package exports, or launch servers."] },
        { label: "Unresolved scaffold blockers", items: ["Unresolved scaffold blockers: missing approved scaffold executor, target path allowlist, template provenance review, file write approval, command approval, runtime approval, evidence review, result review, recovery review, and packaging boundary."] },
      ),
      routes: ["/file-write-controlled-trial-plan", "/command-execution-controlled-trial-plan", "/universal-builder-controlled-trial-candidate"],
      nextRecommendedAction: "Next recommended action: keep scaffold creation blocked, review the target type and blockers, then require explicit operator approval before any future scaffold executor can create a project.",
      advancedDetails: buildControlledBuilderReviewAdvancedDetails("project scaffold dry-run plan", PROJECT_SCAFFOLD_DRY_RUN_PLAN_LANGUAGE, PROJECT_SCAFFOLD_DRY_RUN_PLAN_ADVANCED_DETAILS),
    }),
  ];
}

export function buildProjectScaffoldDryRunPlanBoundary() {
  return buildControlledBuilderReviewBoundary();
}

export function summarizeProjectScaffoldDryRunPlan(model: { projectScaffoldDryRunPlans: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeControlledBuilderReview("Project scaffold dry-run plan", model.projectScaffoldDryRunPlans, "Scaffold creation requires explicit operator approval.");
}

export function buildProjectScaffoldDryRunPlanModel() {
  const projectScaffoldDryRunPlans = buildProjectScaffoldDryRunPlans();
  const summary = summarizeProjectScaffoldDryRunPlan({ projectScaffoldDryRunPlans });
  const model = buildControlledBuilderReviewModel({
    phase: "Phase 634",
    title: "Project scaffold dry-run plan",
    summary,
    subtitle: "Plan future project scaffolds in plain English without creating projects. Scaffold creation requires explicit operator approval.",
    primaryLabel: "Review scaffold plan",
    anchor: "project-scaffold-dry-run-plan",
    plainEnglishTitle: "Plain-English project scaffold dry-run plan",
    plainEnglishCopy: "This page prepares future coding, creative, research, chatbot, and game/server projects without creating any project. It shows what would need approval before a real scaffold can exist.",
    language: PROJECT_SCAFFOLD_DRY_RUN_PLAN_LANGUAGE,
    markers: PROJECT_SCAFFOLD_DRY_RUN_PLAN_LANGUAGE,
    links: [
      { href: "/file-write-controlled-trial-plan", label: "File write trial plan" },
      { href: "/command-execution-controlled-trial-plan", label: "Command trial plan" },
      { href: "/universal-builder-controlled-trial-candidate", label: "Universal builder candidate" },
    ],
    packets: projectScaffoldDryRunPlans,
    advancedSummary: "Advanced project scaffold dry-run plan details",
    advancedDetails: [...PROJECT_SCAFFOLD_DRY_RUN_PLAN_ADVANCED_DETAILS],
    advancedCopy: "advanced project scaffold dry-run plan details collapsed/secondary. This route does not create projects, write files, run setup commands, start runtimes, call providers, call connectors, create automations, package exports, or launch servers.",
    dataScope: "project-scaffold-dry-run-plan buildProjectScaffoldDryRunPlanStableKey ProjectScaffoldDryRunPlanPanel",
  });
  return { ...model, projectScaffoldDryRunPlans };
}
