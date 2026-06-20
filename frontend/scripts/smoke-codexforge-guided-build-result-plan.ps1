param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1031 Guided Build Result Plan" `
  -ScriptFile "smoke-codexforge-guided-build-result-plan.ps1" `
  -Domain "src\lib\codexforge\guided-build-result-plan" `
  -Route "src\app\guided-build-result-plan" `
  -MainPanel "GuidedBuildResultPlanPanel" `
  -CommandLabel "Go to Guided Build Result Plan" `
  -Modules @("guided-build-result-plan-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildGuidedBuildResultPlanStableKey", "buildGuidedBuildResultPlan", "buildGuidedBuildResultPlanItems", "buildGuidedBuildResultPlanBoundary", "buildGuidedBuildResultPlanModel", "summarizeGuidedBuildResultPlan", "GUIDED_BUILD_RESULT_PLAN_LANGUAGE") `
  -PhaseMarkers @("Guided build result plan", "Guided build result plan does not persist results", "Result plan review requires explicit operator approval", "Result plans route outputs through shared result review", "Denied guided build result paths remain blocked", "Guided build result checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Guided build result plan does not persist results", "Result plan review requires explicit operator approval", "Denied guided build result paths remain blocked") `
  -RouteHref "/guided-build-result-plan"

Write-Host "[OK] CodexForge Phase 1031 Guided Build Result Plan smoke passed."
