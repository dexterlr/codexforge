param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-broker-execution-boundary-smoke-helper.ps1") `
  -SmokeName "Phase 1752 First Broker Execution Boundary Candidate" `
  -ScriptFile "smoke-codexforge-first-broker-execution-boundary-candidate.ps1" `
  -Domain "src\lib\codexforge\first-broker-execution-boundary-candidate" `
  -Route "src\app\first-broker-execution-boundary-candidate" `
  -CommandLabel "Go to First Broker Execution Boundary Candidate" `
  -RouteHref "/first-broker-execution-boundary-candidate" `
  -Markers @("First broker execution boundary candidate", "First broker execution boundary candidate does not enable broker workflows live trading order placement credential storage account reads or dispatch from the UI", "First broker execution boundary candidate requires explicit operator approval", "Candidate combines broker adapter contract credential boundary account read boundary order preview validation approval dispatch result error kill switch risk governor audit evidence cockpit summary and denied broker paths", "Denied first broker execution boundary paths remain blocked", "First broker execution boundary checklist")
