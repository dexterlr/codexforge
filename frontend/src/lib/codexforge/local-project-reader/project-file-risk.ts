import type {
  ProjectFileRiskFactor,
  ProjectFileRiskLevel,
  ProjectFileRiskReport,
  ProjectReaderEntry,
} from "./local-project-reader-types";
import { normalizeProjectReaderPath } from "./project-file-metadata";

type RiskInput = string | Pick<ProjectReaderEntry, "path" | "sizeBytes" | "binary" | "generated">;

function riskPath(input: RiskInput): string {
  return normalizeProjectReaderPath(typeof input === "string" ? input : input.path).toLowerCase();
}

function riskSize(input: RiskInput): number | undefined {
  return typeof input === "string" ? undefined : input.sizeBytes;
}

function riskBinary(input: RiskInput): boolean {
  return typeof input === "string" ? false : input.binary === true;
}

function riskGenerated(input: RiskInput): boolean {
  return typeof input === "string" ? false : input.generated === true;
}

function buildFactor(
  id: string,
  label: string,
  points: number,
  level: ProjectFileRiskLevel
): ProjectFileRiskFactor {
  return { id, label, points, level };
}

function collectProjectFileRiskFactors(input: RiskInput): ProjectFileRiskFactor[] {
  const path = riskPath(input);
  const size = riskSize(input);
  const factors: ProjectFileRiskFactor[] = [];

  if (path.includes("/api/") && path.endsWith("/route.ts")) {
    factors.push(buildFactor("api-route", "API route boundary", 35, "high"));
  }

  if (path.includes("storage") || path.includes("persistence") || path.includes("database")) {
    factors.push(buildFactor("storage-persistence", "storage/persistence boundary", 35, "high"));
  }

  if (path.includes("brain") || path.includes("graph") || path.includes("runtime")) {
    factors.push(buildFactor("graph-runtime", "Brain graph/runtime boundary", 45, "critical"));
  }

  if (path.includes("patch") || path.includes("apply-diff") || path.includes("apply") || path.includes("diff")) {
    factors.push(buildFactor("patch-apply-diff", "patch/apply/diff mutation-sensitive workflow", 40, "critical"));
  }

  if (path.includes("write-file") || path.includes("writefile") || path.includes("run-command")) {
    factors.push(buildFactor("write-run-command", "write-file or run-command execution boundary", 50, "critical"));
  }

  if (path.includes("scripts/smoke-codexforge")) {
    factors.push(buildFactor("smoke-suite", "smoke suite validation surface", 25, "medium"));
  }

  if (path.includes("/layout.") || path.endsWith("layout.tsx") || path.includes("/app/")) {
    factors.push(buildFactor("route-shell-layout", "route shell/layout surface", 18, "medium"));
  }

  if (
    path.endsWith("package.json") ||
    path.endsWith("tsconfig.json") ||
    path.includes("next.config") ||
    path.includes("eslint.config")
  ) {
    factors.push(buildFactor("package-config", "package/config boundary", 30, "high"));
  }

  if (typeof size === "number" && size > 512 * 1024) {
    factors.push(buildFactor("large-file", "large file", 30, "high"));
  }

  if (riskBinary(input)) {
    factors.push(buildFactor("unknown-binary", "unknown binary", 100, "blocked"));
  }

  if (riskGenerated(input) || path.includes("/.next/") || path.includes("/dist/") || path.includes("/build/")) {
    factors.push(buildFactor("generated-output", "generated/build output", 100, "blocked"));
  }

  if (path.includes("policy") || path.includes("safety") || path.includes("approval")) {
    factors.push(buildFactor("safety-policy-boundary", "safety policy boundary", 35, "high"));
  }

  return factors;
}

export function scoreProjectFileRisk(input: RiskInput): number {
  return collectProjectFileRiskFactors(input).reduce((total, factor) => total + factor.points, 0);
}

export function classifyProjectFileRisk(input: RiskInput | number): ProjectFileRiskLevel {
  const score = typeof input === "number" ? input : scoreProjectFileRisk(input);
  const hasBlocked =
    typeof input === "number" ? false : collectProjectFileRiskFactors(input).some((factor) => factor.level === "blocked");

  if (hasBlocked) return "blocked";
  if (score >= 85) return "critical";
  if (score >= 45) return "high";
  if (score >= 20) return "medium";
  return "low";
}

export function buildProjectFileRiskReport(input: RiskInput): ProjectFileRiskReport {
  const path = normalizeProjectReaderPath(typeof input === "string" ? input : input.path);
  const factors = collectProjectFileRiskFactors(input);
  const score = factors.reduce((total, factor) => total + factor.points, 0);
  const level = classifyProjectFileRisk(input);
  const summary =
    factors.length > 0
      ? `${path} has ${level} risk from ${factors.map((factor) => factor.label).join(", ")}.`
      : `${path} has low deterministic reader risk.`;

  return {
    path,
    score,
    level,
    factors,
    summary,
    safeHandling:
      level === "blocked"
        ? "Do not preview as text; keep read-only and require a safer artifact-specific viewer."
        : "Inspect first, keep read-only evidence, and use Safe Patch Preview for any edit plan.",
  };
}

export function summarizeProjectFileRisk(report: ProjectFileRiskReport): string {
  return `${report.level.toUpperCase()} risk (${report.score}). ${report.safeHandling}`;
}

