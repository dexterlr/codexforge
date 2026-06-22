param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-plan-diff-command-composer-smoke-helper.ps1") `
  -SmokeName "Phase 1441 Execution Hold Preview" `
  -ScriptFile "smoke-codexforge-execution-hold-preview.ps1" `
  -Domain "src\lib\codexforge\execution-hold-preview" `
  -Route "src\app\execution-hold-preview" `
  -MainPanel "PlanDiffCommandComposerRoutePanel" `
  -CommandLabel "Go to Execution Hold Preview" `
  -RouteHref "/execution-hold-preview" `
  -Markers @("Execution hold preview", "Execution hold preview does not release execution", "Execution hold preview requires explicit operator approval", "Execution hold preview keeps apply run model provider connector queue persistence recovery and audit capture behind backend-owned guards", "Denied execution hold paths remain blocked", "Execution hold checklist")
