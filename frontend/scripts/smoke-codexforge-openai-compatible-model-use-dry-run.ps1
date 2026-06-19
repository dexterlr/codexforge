param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 891 OpenAI-Compatible Model Use Dry-Run" `
  -ScriptFile "smoke-codexforge-openai-compatible-model-use-dry-run.ps1" `
  -Domain "src\lib\codexforge\openai-compatible-model-use-dry-run" `
  -Route "src\app\openai-compatible-model-use-dry-run" `
  -MainPanel "OpenAICompatibleModelUseDryRunPanel" `
  -CommandLabel "Go to OpenAI-Compatible Model Use Dry-Run" `
  -Modules @("openai-compatible-model-use-dry-run-model.ts", "index.ts") `
  -Components @("OpenAICompatibleModelUseDryRunPanel.tsx", "index.ts") `
  -Exports @("buildOpenAICompatibleModelUseDryRunStableKey", "buildOpenAICompatibleModelUseDryRun", "buildOpenAICompatibleModelUseDryRunItems", "buildOpenAICompatibleModelUseDryRunBoundary", "buildOpenAICompatibleModelUseDryRunModel", "summarizeOpenAICompatibleModelUseDryRun", "OPENAI_COMPATIBLE_MODEL_USE_DRY_RUN_LANGUAGE") `
  -PhaseMarkers @("OpenAI-compatible model use dry-run", "OpenAI-compatible model use dry-run does not call APIs", "OpenAI-compatible model use requires explicit operator approval", "OpenAI-compatible models use shared CodexForge memory and knowledge", "Denied OpenAI-compatible model-use paths remain blocked", "OpenAI-compatible model-use checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "OpenAI-compatible model use dry-run does not call APIs", "OpenAI-compatible model use requires explicit operator approval", "Denied OpenAI-compatible model-use paths remain blocked") `
  -RouteHref "/openai-compatible-model-use-dry-run"

Write-Host "[OK] CodexForge Phase 891 OpenAI-compatible model use dry-run smoke passed."

