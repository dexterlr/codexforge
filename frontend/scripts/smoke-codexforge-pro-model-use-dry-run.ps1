param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 895 Pro Model Use Dry-Run" `
  -ScriptFile "smoke-codexforge-pro-model-use-dry-run.ps1" `
  -Domain "src\lib\codexforge\pro-model-use-dry-run" `
  -Route "src\app\pro-model-use-dry-run" `
  -MainPanel "ProModelUseDryRunPanel" `
  -CommandLabel "Go to Pro Model Use Dry-Run" `
  -Modules @("pro-model-use-dry-run-model.ts", "index.ts") `
  -Components @("ProModelUseDryRunPanel.tsx", "index.ts") `
  -Exports @("buildProModelUseDryRunStableKey", "buildProModelUseDryRun", "buildProModelUseDryRunItems", "buildProModelUseDryRunBoundary", "buildProModelUseDryRunModel", "summarizeProModelUseDryRun", "PRO_MODEL_USE_DRY_RUN_LANGUAGE") `
  -PhaseMarkers @("Pro model use dry-run", "Pro model use dry-run does not call pro models", "Pro model use requires explicit operator approval", "Pro models use shared CodexForge memory and knowledge", "Denied pro model-use paths remain blocked", "Pro model-use checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Pro model use dry-run does not call pro models", "Pro model use requires explicit operator approval", "Denied pro model-use paths remain blocked") `
  -RouteHref "/pro-model-use-dry-run"

Write-Host "[OK] CodexForge Phase 895 Pro model use dry-run smoke passed."

