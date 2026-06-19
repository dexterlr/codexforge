param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 894 Paid Model Use Dry-Run" `
  -ScriptFile "smoke-codexforge-paid-model-use-dry-run.ps1" `
  -Domain "src\lib\codexforge\paid-model-use-dry-run" `
  -Route "src\app\paid-model-use-dry-run" `
  -MainPanel "PaidModelUseDryRunPanel" `
  -CommandLabel "Go to Paid Model Use Dry-Run" `
  -Modules @("paid-model-use-dry-run-model.ts", "index.ts") `
  -Components @("PaidModelUseDryRunPanel.tsx", "index.ts") `
  -Exports @("buildPaidModelUseDryRunStableKey", "buildPaidModelUseDryRun", "buildPaidModelUseDryRunItems", "buildPaidModelUseDryRunBoundary", "buildPaidModelUseDryRunModel", "summarizePaidModelUseDryRun", "PAID_MODEL_USE_DRY_RUN_LANGUAGE") `
  -PhaseMarkers @("Paid model use dry-run", "Paid model use dry-run does not call paid models", "Paid model use requires explicit operator approval", "Paid models use shared CodexForge memory and knowledge", "Denied paid model-use paths remain blocked", "Paid model-use checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Paid model use dry-run does not call paid models", "Paid model use requires explicit operator approval", "Denied paid model-use paths remain blocked") `
  -RouteHref "/paid-model-use-dry-run"

Write-Host "[OK] CodexForge Phase 894 Paid model use dry-run smoke passed."

