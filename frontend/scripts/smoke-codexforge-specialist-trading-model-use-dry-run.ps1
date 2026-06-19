param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 900 Specialist Trading Model Use Dry-Run" `
  -ScriptFile "smoke-codexforge-specialist-trading-model-use-dry-run.ps1" `
  -Domain "src\lib\codexforge\specialist-trading-model-use-dry-run" `
  -Route "src\app\specialist-trading-model-use-dry-run" `
  -MainPanel "SpecialistTradingModelUseDryRunPanel" `
  -CommandLabel "Go to Specialist Trading Model Use Dry-Run" `
  -Modules @("specialist-trading-model-use-dry-run-model.ts", "index.ts") `
  -Components @("SpecialistTradingModelUseDryRunPanel.tsx", "index.ts") `
  -Exports @("buildSpecialistTradingModelUseDryRunStableKey", "buildSpecialistTradingModelUseDryRun", "buildSpecialistTradingModelUseDryRunItems", "buildSpecialistTradingModelUseDryRunBoundary", "buildSpecialistTradingModelUseDryRunModel", "summarizeSpecialistTradingModelUseDryRun", "SPECIALIST_TRADING_MODEL_USE_DRY_RUN_LANGUAGE") `
  -PhaseMarkers @("Specialist trading model use dry-run", "Specialist trading model use dry-run does not call trading models", "Trading model use requires explicit operator approval", "Trading models use shared CodexForge memory and knowledge", "Denied trading model-use paths remain blocked", "Specialist trading model-use checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Specialist trading model use dry-run does not call trading models", "Trading model use requires explicit operator approval", "Denied trading model-use paths remain blocked") `
  -RouteHref "/specialist-trading-model-use-dry-run"

Write-Host "[OK] CodexForge Phase 900 Specialist trading model use dry-run smoke passed."

