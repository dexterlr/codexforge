param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-plan-diff-command-composer-smoke-helper.ps1") `
  -SmokeName "Phase 1443 Result Expectation Packet" `
  -ScriptFile "smoke-codexforge-result-expectation-packet.ps1" `
  -Domain "src\lib\codexforge\result-expectation-packet" `
  -Route "src\app\result-expectation-packet" `
  -MainPanel "PlanDiffCommandComposerRoutePanel" `
  -CommandLabel "Go to Result Expectation Packet" `
  -RouteHref "/result-expectation-packet" `
  -Markers @("Result expectation packet", "Result expectation packet does not claim execution happened", "Result expectation packet requires explicit operator approval before execution", "Result expectation packet defines success blocked denied failed timeout manual-review retryable recovered and operator-accepted outcomes", "Denied result expectation packet paths remain blocked", "Result expectation checklist")
