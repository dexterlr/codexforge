param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 980 Game Evidence Capture Plan" `
  -ScriptFile "smoke-codexforge-game-evidence-capture-plan.ps1" `
  -Domain "src\lib\codexforge\game-evidence-capture-plan" `
  -Route "src\app\game-evidence-capture-plan" `
  -MainPanel "GameEvidenceCapturePlanPanel" `
  -CommandLabel "Go to Game Evidence Capture Plan" `
  -Modules @("game-evidence-capture-plan-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildGameEvidenceCapturePlanStableKey", "buildGameEvidenceCapturePlan", "buildGameEvidenceCapturePlanItems", "buildGameEvidenceCapturePlanBoundary", "buildGameEvidenceCapturePlanModel", "summarizeGameEvidenceCapturePlan", "GAME_EVIDENCE_CAPTURE_PLAN_LANGUAGE") `
  -PhaseMarkers @("Game evidence capture plan", "Game evidence capture plan does not persist evidence", "Game evidence capture requires explicit operator approval", "Evidence plans route game outputs to shared review", "Denied game evidence capture paths remain blocked", "Game evidence capture checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Game evidence capture plan does not persist evidence", "Game evidence capture requires explicit operator approval", "Denied game evidence capture paths remain blocked") `
  -RouteHref "/game-evidence-capture-plan"

Write-Host "[OK] CodexForge Phase 980 Game Evidence Capture Plan smoke passed."