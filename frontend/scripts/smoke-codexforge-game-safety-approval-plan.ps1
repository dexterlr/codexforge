param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 979 Game Safety Approval Plan" `
  -ScriptFile "smoke-codexforge-game-safety-approval-plan.ps1" `
  -Domain "src\lib\codexforge\game-safety-approval-plan" `
  -Route "src\app\game-safety-approval-plan" `
  -MainPanel "GameSafetyApprovalPlanPanel" `
  -CommandLabel "Go to Game Safety Approval Plan" `
  -Modules @("game-safety-approval-plan-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildGameSafetyApprovalPlanStableKey", "buildGameSafetyApprovalPlan", "buildGameSafetyApprovalPlanItems", "buildGameSafetyApprovalPlanBoundary", "buildGameSafetyApprovalPlanModel", "summarizeGameSafetyApprovalPlan", "GAME_SAFETY_APPROVAL_PLAN_LANGUAGE") `
  -PhaseMarkers @("Game safety approval plan", "Game safety approval plan does not approve actions", "Game safety approval requires explicit operator approval", "Safety plans gate server mods assets commands and deployment", "Denied game safety approval paths remain blocked", "Game safety approval checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Game safety approval plan does not approve actions", "Game safety approval requires explicit operator approval", "Denied game safety approval paths remain blocked") `
  -RouteHref "/game-safety-approval-plan"

Write-Host "[OK] CodexForge Phase 979 Game Safety Approval Plan smoke passed."