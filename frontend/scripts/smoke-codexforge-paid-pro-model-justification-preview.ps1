param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-model-router-v2-smoke-helper.ps1") `
  -SmokeName "Phase 1534 Paid Pro Model Justification Preview" `
  -ScriptFile "smoke-codexforge-paid-pro-model-justification-preview.ps1" `
  -Domain "src\lib\codexforge\paid-pro-model-justification-preview" `
  -Route "src\app\paid-pro-model-justification-preview" `
  -MainPanel "ModelRouterV2RoutePanel" `
  -CommandLabel "Go to Paid Pro Model Justification Preview" `
  -RouteHref "/paid-pro-model-justification-preview" `
  -Markers @("Paid pro model justification preview", "Paid pro model justification preview does not call paid or pro models", "Paid pro model justification preview requires explicit operator approval", "Paid pro model justification explains capability gap privacy tradeoff cost class expected benefit and denied cheaper alternatives", "Denied paid pro model paths remain blocked", "Paid pro model justification checklist")
