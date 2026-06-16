param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-launch-governance-phase-smoke-helper.ps1") `
  -PhaseName "Phase 609 First Controlled Launch Plan" `
  -ScriptFile "smoke-codexforge-first-controlled-launch-plan.ps1" `
  -Domain "src\lib\codexforge\first-controlled-launch-plan" `
  -Route "src\app\first-controlled-launch-plan" `
  -MainPanel "FirstControlledLaunchPlanPanel" `
  -CommandLabel "Go to First Controlled Launch Plan" `
  -Modules @("first-controlled-launch-plan-types.ts", "first-controlled-launch-plan-summary.ts", "index.ts") `
  -Components @("FirstControlledLaunchPlanPanel.tsx", "index.ts") `
  -Exports @("buildFirstControlledLaunchPlanStableKey", "buildFirstControlledLaunchPlan", "buildFirstControlledLaunchPlans", "buildFirstControlledLaunchPlanBoundary", "buildFirstControlledLaunchPlanModel", "summarizeFirstControlledLaunchPlan", "FIRST_CONTROLLED_LAUNCH_PLAN_LANGUAGE") `
  -PhaseMarkers @("First controlled launch plan", "First controlled launch plan does not execute launch", "Controlled launch actions require explicit operator approval", "Unapproved controlled launch paths remain blocked", "Launch stage groups", "Boundary approval checklist") `
  -PlainEnglish @("First controlled launch plan identity", "Operator task checklist", "Rollback monitoring checklist", "Evidence result recovery checklist", "Denied launch plan actions", "Unresolved launch plan blockers", "Controlled launch review route", "Controlled launch evidence route", "Next recommended action") `
  -RouteHref "/first-controlled-launch-plan"

Write-Host "[OK] CodexForge Phase 609 first controlled launch plan smoke passed."
