param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 982 Game Recovery Plan Preview" `
  -ScriptFile "smoke-codexforge-game-recovery-plan-preview.ps1" `
  -Domain "src\lib\codexforge\game-recovery-plan-preview" `
  -Route "src\app\game-recovery-plan-preview" `
  -MainPanel "GameRecoveryPlanPreviewPanel" `
  -CommandLabel "Go to Game Recovery Plan Preview" `
  -Modules @("game-recovery-plan-preview-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildGameRecoveryPlanPreviewStableKey", "buildGameRecoveryPlanPreview", "buildGameRecoveryPlanPreviewItems", "buildGameRecoveryPlanPreviewBoundary", "buildGameRecoveryPlanPreviewModel", "summarizeGameRecoveryPlanPreview", "GAME_RECOVERY_PLAN_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Game recovery plan preview", "Game recovery plan preview does not trigger recovery", "Game recovery planning requires explicit operator approval", "Recovery plans include rollback backup and restore review", "Denied game recovery plan paths remain blocked", "Game recovery plan checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Game recovery plan preview does not trigger recovery", "Game recovery planning requires explicit operator approval", "Denied game recovery plan paths remain blocked") `
  -RouteHref "/game-recovery-plan-preview"

Write-Host "[OK] CodexForge Phase 982 Game Recovery Plan Preview smoke passed."