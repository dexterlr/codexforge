param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 892 Local Model Use Dry-Run" `
  -ScriptFile "smoke-codexforge-local-model-use-dry-run.ps1" `
  -Domain "src\lib\codexforge\local-model-use-dry-run" `
  -Route "src\app\local-model-use-dry-run" `
  -MainPanel "LocalModelUseDryRunPanel" `
  -CommandLabel "Go to Local Model Use Dry-Run" `
  -Modules @("local-model-use-dry-run-model.ts", "index.ts") `
  -Components @("LocalModelUseDryRunPanel.tsx", "index.ts") `
  -Exports @("buildLocalModelUseDryRunStableKey", "buildLocalModelUseDryRun", "buildLocalModelUseDryRunItems", "buildLocalModelUseDryRunBoundary", "buildLocalModelUseDryRunModel", "summarizeLocalModelUseDryRun", "LOCAL_MODEL_USE_DRY_RUN_LANGUAGE") `
  -PhaseMarkers @("Local model use dry-run", "Local model use dry-run does not call local models", "Local model use requires explicit operator approval", "Local models use shared CodexForge memory and knowledge", "Denied local model-use paths remain blocked", "Local model-use checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Local model use dry-run does not call local models", "Local model use requires explicit operator approval", "Denied local model-use paths remain blocked") `
  -RouteHref "/local-model-use-dry-run"

Write-Host "[OK] CodexForge Phase 892 Local model use dry-run smoke passed."

