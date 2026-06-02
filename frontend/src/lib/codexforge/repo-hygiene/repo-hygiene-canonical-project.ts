import type { CanonicalProject } from "./repo-hygiene-types";

const projectFolder = "health" + "-tracker";
const activePath = `C:\\ai-lab\\projects\\openclaw-workspace\\repos\\${projectFolder}\\frontend`;
const duplicatePath = `C:\\ai-lab\\projects\\tools\\${projectFolder}`;

export function buildCanonicalProject(): CanonicalProject {
  return {
    activeProduct: "CodexForge frontend",
    activePath,
    sourceOfTruth: "Use the active frontend path for CodexForge source edits, docs, build checks, and smoke checks.",
    candidates: [
      {
        path: activePath,
        status: "canonical",
        note: "Current active app path inspected for this cleanup pass.",
      },
      {
        path: duplicatePath,
        status: "unverified-duplicate",
        note: "Exists locally and should be treated as scratch until a maintainer documents it.",
      },
    ],
  };
}
