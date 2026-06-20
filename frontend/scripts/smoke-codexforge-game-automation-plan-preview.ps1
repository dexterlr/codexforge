param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 976 Game Automation Plan Preview" `
  -ScriptFile "smoke-codexforge-game-automation-plan-preview.ps1" `
  -Domain "src\lib\codexforge\game-automation-plan-preview" `
  -Route "src\app\game-automation-plan-preview" `
  -MainPanel "GameAutomationPlanPreviewPanel" `
  -CommandLabel "Go to Game Automation Plan Preview" `
  -Modules @("game-automation-plan-preview-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildGameAutomationPlanPreviewStableKey", "buildGameAutomationPlanPreview", "buildGameAutomationPlanPreviewItems", "buildGameAutomationPlanPreviewBoundary", "buildGameAutomationPlanPreviewModel", "summarizeGameAutomationPlanPreview", "GAME_AUTOMATION_PLAN_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Game automation plan preview", "Game automation plan preview does not create automations", "Game automation planning requires explicit operator approval", "Automation plans support admin and server workflow review", "Denied game automation plan paths remain blocked", "Game automation plan checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Game automation plan preview does not create automations", "Game automation planning requires explicit operator approval", "Denied game automation plan paths remain blocked") `
  -RouteHref "/game-automation-plan-preview"

Write-Host "[OK] CodexForge Phase 976 Game Automation Plan Preview smoke passed."