import type { ProductSmokeCoverageAudit, ProductSmokeCoverageItem, ProductSmokeStatus } from "./product-readiness-types";
import { buildProductReadinessStableKey } from "./product-readiness-types";

const SMOKE_ITEMS: readonly Omit<ProductSmokeCoverageItem, "id">[] = [
  { label: "Product Readiness Audit", script: "smoke-codexforge-product-readiness-audit.ps1", status: "covered", smokeScriptExists: true, managedSuiteInclusion: true, duplicateSuiteEntryRisk: false, targetedValidationCommand: "powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-product-readiness-audit.ps1", upstreamSmokeDependency: "smoke-codexforge-all.ps1", safetyAssertionsPresent: true, mojibakeAssertionsPresent: true, forbiddenDependencyAssertionsPresent: true, missingSmokeGap: "" },
  { label: "Continuity Handoff", script: "smoke-codexforge-continuity-handoff.ps1", status: "covered", smokeScriptExists: true, managedSuiteInclusion: true, duplicateSuiteEntryRisk: false, targetedValidationCommand: "powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-continuity-handoff.ps1", upstreamSmokeDependency: "smoke-codexforge-all.ps1", safetyAssertionsPresent: true, mojibakeAssertionsPresent: true, forbiddenDependencyAssertionsPresent: true, missingSmokeGap: "" },
  { label: "Brain Continuity", script: "smoke-codexforge-brain-continuity.ps1", status: "covered", smokeScriptExists: true, managedSuiteInclusion: true, duplicateSuiteEntryRisk: false, targetedValidationCommand: "powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-brain-continuity.ps1", upstreamSmokeDependency: "smoke-codexforge-all.ps1", safetyAssertionsPresent: true, mojibakeAssertionsPresent: true, forbiddenDependencyAssertionsPresent: true, missingSmokeGap: "" },
  { label: "Stabilization Command Center", script: "smoke-codexforge-stabilization-command-center.ps1", status: "covered", smokeScriptExists: true, managedSuiteInclusion: true, duplicateSuiteEntryRisk: false, targetedValidationCommand: "powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-stabilization-command-center.ps1", upstreamSmokeDependency: "smoke-codexforge-all.ps1", safetyAssertionsPresent: true, mojibakeAssertionsPresent: true, forbiddenDependencyAssertionsPresent: true, missingSmokeGap: "" },
  { label: "Command Palette", script: "smoke-codexforge-command-palette.ps1", status: "covered", smokeScriptExists: true, managedSuiteInclusion: true, duplicateSuiteEntryRisk: false, targetedValidationCommand: "powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-command-palette.ps1", upstreamSmokeDependency: "smoke-codexforge-all.ps1", safetyAssertionsPresent: true, mojibakeAssertionsPresent: true, forbiddenDependencyAssertionsPresent: true, missingSmokeGap: "" },
  { label: "File Reader v1 functional/read-only", script: "smoke-codexforge-local-project-reader.ps1", status: "covered", smokeScriptExists: true, managedSuiteInclusion: true, duplicateSuiteEntryRisk: false, targetedValidationCommand: "powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-local-project-reader.ps1", upstreamSmokeDependency: "smoke-codexforge-all.ps1", safetyAssertionsPresent: true, mojibakeAssertionsPresent: true, forbiddenDependencyAssertionsPresent: true, missingSmokeGap: "" },
  { label: "Patch Preview v1 functional/preview-only", script: "smoke-codexforge-real-patch-preview.ps1", status: "covered", smokeScriptExists: true, managedSuiteInclusion: true, duplicateSuiteEntryRisk: false, targetedValidationCommand: "powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-real-patch-preview.ps1", upstreamSmokeDependency: "smoke-codexforge-all.ps1", safetyAssertionsPresent: true, mojibakeAssertionsPresent: true, forbiddenDependencyAssertionsPresent: true, missingSmokeGap: "" },
  { label: "ComfyUI Adapter Preview", script: "smoke-codexforge-comfyui-adapter-preview.ps1", status: "covered", smokeScriptExists: true, managedSuiteInclusion: true, duplicateSuiteEntryRisk: false, targetedValidationCommand: "powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-codexforge-comfyui-adapter-preview.ps1", upstreamSmokeDependency: "smoke-codexforge-all.ps1", safetyAssertionsPresent: true, mojibakeAssertionsPresent: true, forbiddenDependencyAssertionsPresent: true, missingSmokeGap: "" },
] as const;

export function buildSmokeCoverageItem(input: Partial<ProductSmokeCoverageItem> & Pick<ProductSmokeCoverageItem, "label" | "script">): ProductSmokeCoverageItem {
  const status: ProductSmokeStatus =
    input.status ?? (input.duplicateSuiteEntryRisk ? "duplicate-risk" : input.smokeScriptExists === false ? "missing" : input.managedSuiteInclusion === false ? "partial" : "covered");
  return {
    id: input.id ?? buildProductReadinessStableKey("smoke-coverage", input.label),
    smokeScriptExists: true,
    managedSuiteInclusion: true,
    duplicateSuiteEntryRisk: false,
    targetedValidationCommand: `powershell -ExecutionPolicy Bypass -File .\\scripts\\${input.script}`,
    upstreamSmokeDependency: "smoke-codexforge-all.ps1",
    safetyAssertionsPresent: true,
    mojibakeAssertionsPresent: true,
    forbiddenDependencyAssertionsPresent: true,
    missingSmokeGap: "",
    ...input,
    status,
  };
}

export function buildSmokeCoverageAudit(items: readonly Partial<ProductSmokeCoverageItem>[] = SMOKE_ITEMS): ProductSmokeCoverageAudit {
  const coverage = items.map((item) => buildSmokeCoverageItem(item as ProductSmokeCoverageItem));
  const coveredCount = coverage.filter((item) => item.status === "covered").length;
  const missingCount = coverage.filter((item) => item.status === "missing").length;
  const duplicateRiskCount = coverage.filter((item) => item.duplicateSuiteEntryRisk || item.status === "duplicate-risk").length;
  return {
    id: "product-smoke-coverage-audit",
    items: coverage,
    coveredCount,
    missingCount,
    duplicateRiskCount,
    summary: summarizeSmokeCoverageAudit({ items: coverage, coveredCount, missingCount, duplicateRiskCount }),
  };
}

export function summarizeSmokeCoverageAudit(audit: Pick<ProductSmokeCoverageAudit, "items" | "coveredCount" | "missingCount" | "duplicateRiskCount">): string[] {
  return [
    `${audit.coveredCount}/${audit.items.length} smoke targets are covered.`,
    `${audit.missingCount} missing smoke gaps and ${audit.duplicateRiskCount} duplicate suite entry risks detected.`,
    "Managed suite inclusion and duplicate suite entry risk are checked before new feature work.",
  ];
}
