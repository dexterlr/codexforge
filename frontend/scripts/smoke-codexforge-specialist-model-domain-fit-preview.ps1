param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-model-router-v2-smoke-helper.ps1") `
  -SmokeName "Phase 1535 Specialist Model Domain Fit Preview" `
  -ScriptFile "smoke-codexforge-specialist-model-domain-fit-preview.ps1" `
  -Domain "src\lib\codexforge\specialist-model-domain-fit-preview" `
  -Route "src\app\specialist-model-domain-fit-preview" `
  -MainPanel "ModelRouterV2RoutePanel" `
  -CommandLabel "Go to Specialist Model Domain Fit Preview" `
  -RouteHref "/specialist-model-domain-fit-preview" `
  -Markers @("Specialist model domain fit preview", "Specialist model domain fit preview does not call specialist models", "Specialist model domain fit preview requires explicit operator approval", "Specialist model domain fit explains coding research creative image video trading data game server and domain-specific routing justification", "Denied specialist model paths remain blocked", "Specialist model domain fit checklist")
