param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 978 Game Deployment Plan Preview" `
  -ScriptFile "smoke-codexforge-game-deployment-plan-preview.ps1" `
  -Domain "src\lib\codexforge\game-deployment-plan-preview" `
  -Route "src\app\game-deployment-plan-preview" `
  -MainPanel "GameDeploymentPlanPreviewPanel" `
  -CommandLabel "Go to Game Deployment Plan Preview" `
  -Modules @("game-deployment-plan-preview-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildGameDeploymentPlanPreviewStableKey", "buildGameDeploymentPlanPreview", "buildGameDeploymentPlanPreviewItems", "buildGameDeploymentPlanPreviewBoundary", "buildGameDeploymentPlanPreviewModel", "summarizeGameDeploymentPlanPreview", "GAME_DEPLOYMENT_PLAN_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Game deployment plan preview", "Game deployment plan preview does not deploy servers", "Game deployment planning requires explicit operator approval", "Deployment plans support hosted local and private game targets", "Denied game deployment plan paths remain blocked", "Game deployment plan checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Game deployment plan preview does not deploy servers", "Game deployment planning requires explicit operator approval", "Denied game deployment plan paths remain blocked") `
  -RouteHref "/game-deployment-plan-preview"

Write-Host "[OK] CodexForge Phase 978 Game Deployment Plan Preview smoke passed."