import type { UniversalExecutionReviewPacket } from "../universal-execution-review-kit";
import { buildUniversalExecutionReviewStableKey as buildProjectScaffoldHardeningPassStableKey } from "../universal-execution-review-kit";
import {
  buildControlledBuilderReviewAdvancedDetails,
  buildControlledBuilderReviewBoundary,
  buildControlledBuilderReviewModel,
  buildControlledBuilderReviewPacket,
  buildControlledBuilderReviewSections,
  summarizeControlledBuilderReview,
  type ControlledBuilderReviewPacketInput,
} from "../controlled-builder-dry-run-review-kit";

export { buildProjectScaffoldHardeningPassStableKey };

export const PROJECT_SCAFFOLD_HARDENING_PASS_LANGUAGE = [
  "Project scaffold hardening pass",
  "Project scaffold hardening pass does not apply changes",
  "Hardening changes require explicit operator approval",
  "File hardening",
  "Command hardening",
  "Runtime hardening",
  "Provider hardening",
  "Connector hardening",
  "Evidence/result/recovery hardening",
] as const;

const PROJECT_SCAFFOLD_HARDENING_PASS_ADVANCED_DETAILS = [
  "Project scaffold hardening pass identity",
  "File hardening",
  "Command hardening",
  "Runtime hardening",
  "Provider hardening",
  "Connector hardening",
  "Evidence/result/recovery hardening",
  "Next recommended action",
  "advanced project scaffold hardening pass details collapsed/secondary",
] as const;

export function buildProjectScaffoldHardeningPass(input: ControlledBuilderReviewPacketInput): UniversalExecutionReviewPacket {
  return buildControlledBuilderReviewPacket("project-scaffold-hardening-pass", input);
}

export function buildProjectScaffoldHardeningPasses(): UniversalExecutionReviewPacket[] {
  return [
    buildProjectScaffoldHardeningPass({
      idHint: "project-scaffold-hardening-pass",
      status: "blocked",
      identity: "Project scaffold hardening pass identity: project-scaffold-hardening-pass lists hardening requirements without applying code, config, policy, scaffold, runtime, provider, connector, evidence, result, or recovery changes.",
      sections: buildControlledBuilderReviewSections(
        { label: "File hardening", items: ["File hardening: path allowlists, denylist rules, diff preview, template provenance, rollback notes, and file ownership must be reviewed before future writes."] },
        { label: "Command hardening", items: ["Command hardening: working directory, command allowlist, timeout, logs, env/secrets redaction, and failure handling need explicit approval before execution."] },
        { label: "Runtime hardening", items: ["Runtime hardening: port, network, process lifecycle, stop plan, runtime logs, local bridge boundaries, and server launch gates remain blocked."] },
        { label: "Provider hardening", items: ["Provider hardening: prompt preview, redaction, cost/rate limit, output handling, and no provider/model calls without explicit approval."] },
        { label: "Connector hardening", items: ["Connector hardening: account permission, data scope, fetch/mutation split, redaction, and audit review before connector access."] },
        { label: "Evidence/result/recovery hardening", items: ["Evidence/result/recovery hardening: no automatic capture, ingestion, storage, reuse, retry, rollback, memory promotion, or Brain mutation."] },
      ),
      routes: ["/project-scaffold-recovery-review", "/file-write-controlled-trial-plan", "/universal-builder-controlled-trial-candidate"],
      nextRecommendedAction: "Next recommended action: keep hardening recommendations review-only until an operator approves each concrete change under the relevant boundary.",
      advancedDetails: buildControlledBuilderReviewAdvancedDetails("project scaffold hardening pass", PROJECT_SCAFFOLD_HARDENING_PASS_LANGUAGE, PROJECT_SCAFFOLD_HARDENING_PASS_ADVANCED_DETAILS),
    }),
  ];
}

export function buildProjectScaffoldHardeningPassBoundary() {
  return buildControlledBuilderReviewBoundary();
}

export function summarizeProjectScaffoldHardeningPass(model: { projectScaffoldHardeningPasses: readonly UniversalExecutionReviewPacket[] }): string {
  return summarizeControlledBuilderReview("Project scaffold hardening pass", model.projectScaffoldHardeningPasses, "Hardening changes require explicit operator approval.");
}

export function buildProjectScaffoldHardeningPassModel() {
  const projectScaffoldHardeningPasses = buildProjectScaffoldHardeningPasses();
  const summary = summarizeProjectScaffoldHardeningPass({ projectScaffoldHardeningPasses });
  const model = buildControlledBuilderReviewModel({
    phase: "Phase 638",
    title: "Project scaffold hardening pass",
    summary,
    subtitle: "Review scaffold hardening requirements without applying changes.",
    primaryLabel: "Review scaffold hardening",
    anchor: "project-scaffold-hardening-pass",
    plainEnglishTitle: "Plain-English scaffold hardening pass",
    plainEnglishCopy: "This page turns scaffold risks into clear hardening gates. It does not change files, policies, commands, runtimes, providers, connectors, evidence, results, or recovery behavior.",
    language: PROJECT_SCAFFOLD_HARDENING_PASS_LANGUAGE,
    markers: PROJECT_SCAFFOLD_HARDENING_PASS_LANGUAGE,
    links: [
      { href: "/project-scaffold-recovery-review", label: "Recovery review" },
      { href: "/file-write-controlled-trial-plan", label: "File trial plan" },
      { href: "/universal-builder-controlled-trial-candidate", label: "Builder candidate" },
    ],
    packets: projectScaffoldHardeningPasses,
    advancedSummary: "Advanced project scaffold hardening pass details",
    advancedDetails: [...PROJECT_SCAFFOLD_HARDENING_PASS_ADVANCED_DETAILS],
    advancedCopy: "advanced project scaffold hardening pass details collapsed/secondary. This route does not apply hardening changes, update settings, persist policy, write files, run commands, call providers, call connectors, or trigger recovery.",
    dataScope: "project-scaffold-hardening-pass buildProjectScaffoldHardeningPassStableKey ProjectScaffoldHardeningPassPanel",
  });
  return { ...model, projectScaffoldHardeningPasses };
}
