param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-model-router-v2-smoke-helper.ps1") `
  -SmokeName "Phase 1544 First Model Router v2 Candidate" `
  -ScriptFile "smoke-codexforge-first-model-router-v2-candidate.ps1" `
  -Domain "src\lib\codexforge\first-model-router-v2-candidate" `
  -Route "src\app\first-model-router-v2-candidate" `
  -MainPanel "ModelRouterV2RoutePanel" `
  -CommandLabel "Go to First Model Router v2 Candidate" `
  -RouteHref "/first-model-router-v2-candidate" `
  -Markers @("First model router v2 candidate", "First model router v2 candidate does not call models from the UI", "First model router v2 candidate requires explicit operator approval", "Candidate combines capability local private cheapest capable paid pro specialist privacy cost prompt approval fallback denial evidence result and audit", "Denied first model router paths remain blocked", "First model router v2 checklist")
