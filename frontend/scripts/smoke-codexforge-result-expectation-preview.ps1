param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-project-context-brain-smoke-helper.ps1") `
  -SmokeName "Phase 1412 Result Expectation Preview" `
  -ScriptFile "smoke-codexforge-result-expectation-preview.ps1" `
  -Domain "src\lib\codexforge\result-expectation-preview" `
  -Route "src\app\result-expectation-preview" `
  -MainPanel "ProjectContextBrainRoutePanel" `
  -CommandLabel "Go to Result Expectation Preview" `
  -RouteHref "/result-expectation-preview" `
  -Markers @("Result expectation preview", "Result expectation preview does not persist results from the UI", "Result expectation preview requires explicit operator approval", "Result expectation preview defines success blocked denied failed timeout manual-review retryable and recovered expectations for future backend-owned runs", "Denied result expectation paths remain blocked", "Result expectation checklist")
