import { buildCanonicalProject } from "./repo-hygiene-canonical-project";
import { buildRepoHygieneCheck } from "./repo-hygiene-check";
import { buildGeneratedFilePolicy } from "./repo-hygiene-generated-file-policy";
import { buildRepoHygieneSecretPolicy } from "./repo-hygiene-secret-policy";
import { buildRepoHygieneTestScript } from "./repo-hygiene-test-script";
import type { RepoHygieneSummary } from "./repo-hygiene-types";

export function buildRepoHygieneSummary(): RepoHygieneSummary {
  return {
    title: "Repo hygiene",
    subtitle: "Keep generated files, secrets, tests, and workspace folders clean.",
    primaryAction: "Review cleanup checklist",
    checks: buildRepoHygieneCheck(),
    generatedFilePolicy: buildGeneratedFilePolicy(),
    canonicalProject: buildCanonicalProject(),
    testScript: buildRepoHygieneTestScript(),
    secretPolicy: buildRepoHygieneSecretPolicy(),
    manualActions: [
      "Review pre-existing tracked operator state before any explicit untracking pass.",
      "Review scratch docs and generated map dumps before removing them from version control.",
      "Document or archive duplicate project copies outside the canonical workspace.",
    ],
    safetyNotes: [
      "No deletion controls are exposed.",
      "No command execution controls are exposed.",
      "No provider or creative runtime calls are made.",
      "Brain and memory mutation paths are not invoked.",
    ],
  };
}

export function summarizeRepoHygiene(summary = buildRepoHygieneSummary()): string {
  const passCount = summary.checks.filter((check) => check.status === "pass").length;
  const manualCount = summary.checks.filter((check) => check.status === "manual").length;
  const reviewCount = summary.checks.filter((check) => check.status === "review").length;
  return `${summary.title}: ${passCount} pass, ${reviewCount} review, ${manualCount} manual actions; canonical path ${summary.canonicalProject.activePath}.`;
}
