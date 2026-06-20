param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 928 OpenAI-Compatible Router Trial Result" `
  -ScriptFile "smoke-codexforge-openai-compatible-router-trial-result.ps1" `
  -Domain "src\lib\codexforge\openai-compatible-router-trial-result" `
  -Route "src\app\openai-compatible-router-trial-result" `
  -MainPanel "OpenAICompatibleRouterTrialResultPanel" `
  -CommandLabel "Go to OpenAI-Compatible Router Trial Result" `
  -Modules @("openai-compatible-router-trial-result-model.ts", "index.ts") `
  -Components @("OpenAICompatibleRouterTrialResultPanel.tsx", "index.ts") `
  -Exports @("buildOpenAICompatibleRouterTrialResultStableKey", "buildOpenAICompatibleRouterTrialResult", "buildOpenAICompatibleRouterTrialResultItems", "buildOpenAICompatibleRouterTrialResultBoundary", "buildOpenAICompatibleRouterTrialResultModel", "summarizeOpenAICompatibleRouterTrialResult", "OPENAI_COMPATIBLE_ROUTER_TRIAL_RESULT_LANGUAGE") `
  -PhaseMarkers @("OpenAI-compatible router trial result", "OpenAI-compatible router trial result does not call APIs", "OpenAI-compatible trial results require explicit operator approval", "Trial results use shared CodexForge context", "Denied OpenAI-compatible trial result paths remain blocked", "OpenAI-compatible trial result checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "OpenAI-compatible router trial result does not call APIs", "OpenAI-compatible trial results require explicit operator approval", "Denied OpenAI-compatible trial result paths remain blocked") `
  -RouteHref "/openai-compatible-router-trial-result"

Write-Host "[OK] CodexForge Phase 928 OpenAI-compatible router trial result smoke passed."
