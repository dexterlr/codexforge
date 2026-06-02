import type { GeneratedFilePolicy } from "./repo-hygiene-types";

export function buildGeneratedFilePolicy(): GeneratedFilePolicy {
  return {
    id: "codexforge-generated-file-policy",
    ignoredPatterns: [
      "node_modules/",
      ".next/",
      "out/",
      "dist/",
      "build/",
      "coverage/",
      ".turbo/",
      ".cache/",
      ".venv/",
      "__pycache__/",
      ".pytest_cache/",
      ".operator/",
      ".codexforge/",
      ".checkpoints/",
      "_codexforge-backups/",
      "unpushed-patches/",
      "all-files.txt",
      "repo-index.txt",
      "src-tree.txt",
    ],
    reviewableWork: [
      "source files",
      "README files",
      "real docs",
      "smoke scripts",
      "package metadata",
      "package lockfiles",
    ],
    neverCommit: [
      "local env files",
      "provider secrets",
      "runtime checkpoints",
      "dependency folders",
      "build output",
      "local patch bundles",
      "generated repo map dumps",
    ],
    policySummary: "Generated folders and local runtime state are not product work and should stay out of review.",
  };
}
