param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-model-router-v2-smoke-helper.ps1") `
  -SmokeName "Phase 1539 Model Approval Gate Preview" `
  -ScriptFile "smoke-codexforge-model-approval-gate-preview.ps1" `
  -Domain "src\lib\codexforge\model-approval-gate-preview" `
  -Route "src\app\model-approval-gate-preview" `
  -MainPanel "ModelRouterV2RoutePanel" `
  -CommandLabel "Go to Model Approval Gate Preview" `
  -RouteHref "/model-approval-gate-preview" `
  -Markers @("Model approval gate preview", "Model approval gate preview does not persist approvals from the UI", "Model approval gate preview requires explicit human approval", "Model approval gate preview shows model choice provider class privacy class cost class prompt payload evidence result audit and expiry scope", "Denied model approval paths remain blocked", "Model approval gate checklist")
