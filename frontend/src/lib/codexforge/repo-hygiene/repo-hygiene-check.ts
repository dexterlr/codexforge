import type { RepoHygieneCheck } from "./repo-hygiene-types";

export function buildRepoHygieneCheck(): RepoHygieneCheck[] {
  return [
    {
      id: "root-ignore-expanded",
      label: "Root ignore coverage",
      category: "ignore",
      status: "pass",
      evidence: "Root ignore rules cover dependency folders, build output, caches, env files, runtime state, and generated repo maps.",
      nextStep: "Keep source, smoke scripts, package locks, README files, and real docs reviewable.",
      safetyCritical: true,
    },
    {
      id: "canonical-workspace-documented",
      label: "Canonical workspace",
      category: "workspace",
      status: "pass",
      evidence: "The active frontend path is documented in docs/WORKSPACE_MAP.md.",
      nextStep: "Treat duplicate copies as unverified until a maintainer documents them.",
      safetyCritical: false,
    },
    {
      id: "tracked-generated-audit",
      label: "Legacy generated clutter",
      category: "generated",
      status: "manual",
      evidence: "Pre-existing tracked operator state and scratch maps were found and left untouched.",
      nextStep: "Review tracked generated-looking files in a separate explicit cleanup.",
      safetyCritical: true,
    },
    {
      id: "test-script-real-validation",
      label: "Package test script",
      category: "test",
      status: "pass",
      evidence: "The placeholder package test was replaced with a typecheck-backed validation script.",
      nextStep: "Keep smoke coverage separate from the default test script unless CI asks for broader validation.",
      safetyCritical: false,
    },
    {
      id: "env-safety",
      label: "Secret and env safety",
      category: "secret",
      status: "review",
      evidence: "No tracked env files were found, and local env files remain ignored.",
      nextStep: "Do not expose server env values, browser secret storage, provider calls, or generated local state in UI.",
      safetyCritical: true,
    },
    {
      id: "docs-map-created",
      label: "Docs map",
      category: "docs",
      status: "pass",
      evidence: "Workspace, audit, and structure map docs now explain canonical paths and cleanup boundaries.",
      nextStep: "Keep future route/domain additions reflected in the structure map.",
      safetyCritical: false,
    },
  ];
}
