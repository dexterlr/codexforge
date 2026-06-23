param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-model-router-v2-smoke-helper.ps1") `
  -SmokeName "Phase 1533 Cheapest Capable Model Policy Preview" `
  -ScriptFile "smoke-codexforge-cheapest-capable-model-policy-preview.ps1" `
  -Domain "src\lib\codexforge\cheapest-capable-model-policy-preview" `
  -Route "src\app\cheapest-capable-model-policy-preview" `
  -MainPanel "ModelRouterV2RoutePanel" `
  -CommandLabel "Go to Cheapest Capable Model Policy Preview" `
  -RouteHref "/cheapest-capable-model-policy-preview" `
  -Markers @("Cheapest capable model policy preview", "Cheapest capable model policy preview does not call paid models", "Cheapest capable model policy preview requires explicit operator approval", "Cheapest capable model policy chooses the lowest-cost model that satisfies capability privacy context and evidence requirements", "Denied cheapest capable model paths remain blocked", "Cheapest capable model policy checklist")
