param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 634 Project Scaffold Dry-Run Plan" `
  -ScriptFile "smoke-codexforge-project-scaffold-dry-run-plan.ps1" `
  -Domain "src\lib\codexforge\project-scaffold-dry-run-plan" `
  -Route "src\app\project-scaffold-dry-run-plan" `
  -MainPanel "ProjectScaffoldDryRunPlanPanel" `
  -CommandLabel "Go to Project Scaffold Dry-Run Plan" `
  -Modules @("project-scaffold-dry-run-plan-model.ts", "index.ts") `
  -Components @("ProjectScaffoldDryRunPlanPanel.tsx", "index.ts") `
  -Exports @("buildProjectScaffoldDryRunPlanStableKey", "buildProjectScaffoldDryRunPlan", "buildProjectScaffoldDryRunPlans", "buildProjectScaffoldDryRunPlanBoundary", "buildProjectScaffoldDryRunPlanModel", "summarizeProjectScaffoldDryRunPlan", "PROJECT_SCAFFOLD_DRY_RUN_PLAN_LANGUAGE") `
  -PhaseMarkers @("Project scaffold dry-run plan", "Project scaffold dry-run plan does not create projects", "Scaffold creation requires explicit operator approval", "Scaffold target types", "Original medieval fantasy", "No copied franchise assets") `
  -PlainEnglish @("Project scaffold dry-run identity", "Scaffold target types", "Safe game/server example", "Denied scaffold actions", "Unresolved scaffold blockers", "Next recommended action") `
  -RouteHref "/project-scaffold-dry-run-plan"

Write-Host "[OK] CodexForge Phase 634 project scaffold dry-run plan smoke passed."
