param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-plan-diff-command-composer-smoke-helper.ps1") `
  -SmokeName "Phase 1442 Evidence Expectation Packet" `
  -ScriptFile "smoke-codexforge-evidence-expectation-packet.ps1" `
  -Domain "src\lib\codexforge\evidence-expectation-packet" `
  -Route "src\app\evidence-expectation-packet" `
  -MainPanel "PlanDiffCommandComposerRoutePanel" `
  -CommandLabel "Go to Evidence Expectation Packet" `
  -RouteHref "/evidence-expectation-packet" `
  -Markers @("Evidence expectation packet", "Evidence expectation packet does not persist evidence from the UI", "Evidence expectation packet requires explicit operator approval", "Evidence expectation packet lists required diff command stdout stderr exit code approval result audit recovery and model tool evidence", "Denied evidence expectation paths remain blocked", "Evidence expectation checklist")
