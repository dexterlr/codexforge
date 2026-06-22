param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-plan-diff-command-composer-smoke-helper.ps1") `
  -SmokeName "Phase 1439 Risk Review Packet" `
  -ScriptFile "smoke-codexforge-risk-review-packet.ps1" `
  -Domain "src\lib\codexforge\risk-review-packet" `
  -Route "src\app\risk-review-packet" `
  -MainPanel "PlanDiffCommandComposerRoutePanel" `
  -CommandLabel "Go to Risk Review Packet" `
  -RouteHref "/risk-review-packet" `
  -Markers @("Risk review packet", "Risk review packet does not execute safety scans from the UI", "Risk review packet requires explicit operator approval", "Risk review packet reviews files commands models providers connectors runtimes secrets installs deploys persistence recovery and audit risks", "Denied risk review paths remain blocked", "Risk review checklist")
