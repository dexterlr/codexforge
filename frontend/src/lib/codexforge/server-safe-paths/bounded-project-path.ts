import path from "node:path";
import { normalizeSafeRelativePath, toPortableRelativePath } from "./bounded-workspace-path";

export function resolveImportSpecifierPath(fromPath: string, specifier: string): string | null {
  if (!specifier.startsWith(".") && !specifier.startsWith("@/")) return null;

  const normalizedFromPath = toPortableRelativePath(fromPath).replace(/^\/+/, "");
  const fromPathCheck = normalizeSafeRelativePath(normalizedFromPath);
  if (!fromPathCheck.safe || !fromPathCheck.normalizedRelativePath) return null;

  const base = specifier.startsWith("@/")
    ? `src/${specifier.slice(2)}`
    : path.posix.join(path.posix.dirname(fromPathCheck.normalizedRelativePath), specifier);

  const normalized = path.posix.normalize(toPortableRelativePath(base));
  const candidateCheck = normalizeSafeRelativePath(normalized);
  if (!candidateCheck.safe || !candidateCheck.normalizedRelativePath) return null;
  if (candidateCheck.normalizedRelativePath.startsWith("../")) return null;
  return candidateCheck.normalizedRelativePath;
}
