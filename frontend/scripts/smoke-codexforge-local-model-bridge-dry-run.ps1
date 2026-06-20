param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 909 Local Model Bridge Dry-Run" `
  -ScriptFile "smoke-codexforge-local-model-bridge-dry-run.ps1" `
  -Domain "src\lib\codexforge\local-model-bridge-dry-run" `
  -Route "src\app\local-model-bridge-dry-run" `
  -MainPanel "LocalModelBridgeDryRunPanel" `
  -CommandLabel "Go to Local Model Bridge Dry-Run" `
  -Modules @("local-model-bridge-dry-run-model.ts", "index.ts") `
  -Components @("LocalModelBridgeDryRunPanel.tsx", "index.ts") `
  -Exports @("buildLocalModelBridgeDryRunStableKey", "buildLocalModelBridgeDryRun", "buildLocalModelBridgeDryRunItems", "buildLocalModelBridgeDryRunBoundary", "buildLocalModelBridgeDryRunModel", "summarizeLocalModelBridgeDryRun", "LOCAL_MODEL_BRIDGE_DRY_RUN_LANGUAGE") `
  -PhaseMarkers @("Local model bridge dry-run", "Local model bridge dry-run does not probe local runtimes", "Local model bridge use requires explicit operator approval", "Local model bridge uses shared CodexForge memory and knowledge", "Denied local model bridge paths remain blocked", "Local model bridge checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Local model bridge dry-run does not probe local runtimes", "Local model bridge use requires explicit operator approval", "Denied local model bridge paths remain blocked") `
  -RouteHref "/local-model-bridge-dry-run"

Write-Host "[OK] CodexForge Phase 909 local model bridge dry-run smoke passed."
