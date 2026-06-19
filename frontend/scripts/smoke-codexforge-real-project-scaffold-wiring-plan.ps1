param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 785 Real Project Scaffold Wiring Plan" `
  -ScriptFile "smoke-codexforge-real-project-scaffold-wiring-plan.ps1" `
  -Domain "src\lib\codexforge\real-project-scaffold-wiring-plan" `
  -Route "src\app\real-project-scaffold-wiring-plan" `
  -MainPanel "RealProjectScaffoldWiringPlanPanel" `
  -CommandLabel "Go to Real Project Scaffold Wiring Plan" `
  -Modules @("real-project-scaffold-wiring-plan-model.ts", "index.ts") `
  -Components @("RealProjectScaffoldWiringPlanPanel.tsx", "index.ts") `
  -Exports @("buildRealProjectScaffoldWiringPlanStableKey", "buildRealProjectScaffoldWiringPlan", "buildRealProjectScaffoldWiringPlanItems", "buildRealProjectScaffoldWiringPlanBoundary", "buildRealProjectScaffoldWiringPlanModel", "summarizeRealProjectScaffoldWiringPlan", "REAL_PROJECT_SCAFFOLD_WIRING_PLAN_LANGUAGE") `
  -PhaseMarkers @("Real Project Scaffold Wiring Plan", "Real project scaffold wiring plan does not create projects", "Project scaffold wiring requires explicit operator approval", "wiring plan only", "not executable from UI", "approval required", "local bridge required", "sandbox required", "evidence required", "what this unlocks next", "scaffold boundary", "project type", "template", "target path", "file write dependency", "command/runtime dependency", "Original medieval fantasy", "No copied franchise assets") `
  -PlainEnglish @("Real Project Scaffold Wiring Plan identity", "wiring plan only", "not executable from UI", "approval required", "local bridge required", "sandbox required", "evidence required", "what this unlocks next", "Real project scaffold wiring plan does not create projects") `
  -RouteHref "/real-project-scaffold-wiring-plan"

Write-Host "[OK] CodexForge Phase 785 real project scaffold wiring plan smoke passed."
