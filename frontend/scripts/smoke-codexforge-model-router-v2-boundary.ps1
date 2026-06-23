param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-model-router-v2-smoke-helper.ps1") `
  -SmokeName "Phase 1530 Model Router v2 Boundary" `
  -ScriptFile "smoke-codexforge-model-router-v2-boundary.ps1" `
  -Domain "src\lib\codexforge\model-router-v2-boundary" `
  -Route "src\app\model-router-v2-boundary" `
  -MainPanel "ModelRouterV2RoutePanel" `
  -CommandLabel "Go to Model Router v2 Boundary" `
  -RouteHref "/model-router-v2-boundary" `
  -Markers @("Model router v2 boundary", "Model router v2 boundary does not call models from the UI", "Model router v2 requires explicit operator approval before provider use", "Model router v2 prepares backend-owned provider-gated model selection without hidden routing", "Denied model router paths remain blocked", "Model router v2 checklist")
