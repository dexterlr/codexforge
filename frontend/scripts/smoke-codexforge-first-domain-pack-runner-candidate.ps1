param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-domain-pack-runner-smoke-helper.ps1") `
  -SmokeName "Phase 1624 First Domain Pack Runner Candidate" `
  -ScriptFile "smoke-codexforge-first-domain-pack-runner-candidate.ps1" `
  -Domain "src\lib\codexforge\first-domain-pack-runner-candidate" `
  -Route "src\app\first-domain-pack-runner-candidate" `
  -MainPanel "DomainPackRunnerRoutePanel" `
  -CommandLabel "Go to First Domain Pack Runner Candidate" `
  -RouteHref "/first-domain-pack-runner-candidate" `
  -Markers @("First domain pack runner candidate", "First domain pack runner candidate does not execute domain packs from the UI", "First domain pack runner candidate requires explicit operator approval", "Candidate combines catalog goal intake classifier worker route plan artifacts commands approvals evidence results audit recovery front shell and hold-before-execution", "Denied first domain pack runner paths remain blocked", "First domain pack runner checklist")
