param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 998 Universal Project Builder Safety Plan" `
  -ScriptFile "smoke-codexforge-universal-project-builder-safety-plan.ps1" `
  -Domain "src\lib\codexforge\universal-project-builder-safety-plan" `
  -Route "src\app\universal-project-builder-safety-plan" `
  -MainPanel "UniversalProjectBuilderSafetyPlanPanel" `
  -CommandLabel "Go to Universal Project Builder Safety Plan" `
  -Modules @("universal-project-builder-safety-plan-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildUniversalProjectBuilderSafetyPlanStableKey", "buildUniversalProjectBuilderSafetyPlan", "buildUniversalProjectBuilderSafetyPlanItems", "buildUniversalProjectBuilderSafetyPlanBoundary", "buildUniversalProjectBuilderSafetyPlanModel", "summarizeUniversalProjectBuilderSafetyPlan", "UNIVERSAL_PROJECT_BUILDER_SAFETY_PLAN_LANGUAGE") `
  -PhaseMarkers @("Universal project builder safety plan", "Universal project builder safety plan does not approve actions", "Universal project safety requires explicit operator approval", "Safety plans gate model routing backend adapters and project adapters", "Denied universal project safety paths remain blocked", "Universal project safety checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Universal project builder safety plan does not approve actions", "Universal project safety requires explicit operator approval", "Denied universal project safety paths remain blocked") `
  -RouteHref "/universal-project-builder-safety-plan"

Write-Host "[OK] CodexForge Phase 998 Universal Project Builder Safety Plan smoke passed."
