param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-model-router-v2-smoke-helper.ps1") `
  -SmokeName "Phase 1541 Model Denial Route Preview" `
  -ScriptFile "smoke-codexforge-model-denial-route-preview.ps1" `
  -Domain "src\lib\codexforge\model-denial-route-preview" `
  -Route "src\app\model-denial-route-preview" `
  -MainPanel "ModelRouterV2RoutePanel" `
  -CommandLabel "Go to Model Denial Route Preview" `
  -RouteHref "/model-denial-route-preview" `
  -Markers @("Model denial route preview", "Model denial route preview does not mutate workflow state", "Model denial route preview requires explicit operator approval", "Model denial route preview blocks secret payloads private context provider disallowed high-cost unapproved specialist connector leakage and unsupported capability routes", "Denied model route paths remain blocked", "Model denial route checklist")
