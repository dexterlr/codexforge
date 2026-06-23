param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-model-router-v2-smoke-helper.ps1") `
  -SmokeName "Phase 1540 Model Fallback Route Preview" `
  -ScriptFile "smoke-codexforge-model-fallback-route-preview.ps1" `
  -Domain "src\lib\codexforge\model-fallback-route-preview" `
  -Route "src\app\model-fallback-route-preview" `
  -MainPanel "ModelRouterV2RoutePanel" `
  -CommandLabel "Go to Model Fallback Route Preview" `
  -RouteHref "/model-fallback-route-preview" `
  -Markers @("Model fallback route preview", "Model fallback route preview does not call fallback models", "Model fallback route preview requires explicit operator approval", "Model fallback route preview shows local fallback cheaper fallback safer fallback manual review and blocked fallback states", "Denied model fallback paths remain blocked", "Model fallback route checklist")
