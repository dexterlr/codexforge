param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1030 Guided Build Evidence Plan" `
  -ScriptFile "smoke-codexforge-guided-build-evidence-plan.ps1" `
  -Domain "src\lib\codexforge\guided-build-evidence-plan" `
  -Route "src\app\guided-build-evidence-plan" `
  -MainPanel "GuidedBuildEvidencePlanPanel" `
  -CommandLabel "Go to Guided Build Evidence Plan" `
  -Modules @("guided-build-evidence-plan-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildGuidedBuildEvidencePlanStableKey", "buildGuidedBuildEvidencePlan", "buildGuidedBuildEvidencePlanItems", "buildGuidedBuildEvidencePlanBoundary", "buildGuidedBuildEvidencePlanModel", "summarizeGuidedBuildEvidencePlan", "GUIDED_BUILD_EVIDENCE_PLAN_LANGUAGE") `
  -PhaseMarkers @("Guided build evidence plan", "Guided build evidence plan does not persist evidence", "Evidence plan review requires explicit operator approval", "Evidence plans route outputs through shared evidence review", "Denied guided build evidence paths remain blocked", "Guided build evidence checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Guided build evidence plan does not persist evidence", "Evidence plan review requires explicit operator approval", "Denied guided build evidence paths remain blocked") `
  -RouteHref "/guided-build-evidence-plan"

Write-Host "[OK] CodexForge Phase 1030 Guided Build Evidence Plan smoke passed."
