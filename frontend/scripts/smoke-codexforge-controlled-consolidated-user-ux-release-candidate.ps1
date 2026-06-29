param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-cockpit-navigation-cleanup-user-ux-smoke-helper.ps1") `
  -SmokeName "Phase 1737 Controlled Consolidated User UX Release Candidate" `
  -ScriptFile "smoke-codexforge-controlled-consolidated-user-ux-release-candidate.ps1" `
  -Domain "src\lib\codexforge\controlled-consolidated-user-ux-release-candidate" `
  -Route "src\app\controlled-consolidated-user-ux-release-candidate" `
  -CommandLabel "Go to Controlled Consolidated User UX Release Candidate" `
  -RouteHref "/controlled-consolidated-user-ux-release-candidate" `
  -Markers @("Controlled consolidated user UX release candidate", "Controlled consolidated user UX release candidate does not delete routes remove smoke coverage enable execution dispatch workers call models providers connectors run commands write files place trades move money connect brokers persist approvals persist evidence persist audit promote memory release locks spawn processes bind ports install deploy start runtimes send prompts store credentials probe localhost or write browser storage from the frontend", "Controlled consolidated user UX release requires explicit operator approval", "Release candidate makes /codexforge-cockpit the one normal user UX while preserving backend-owned diagnostics and phase route coverage", "Denied controlled consolidated user UX paths remain blocked", "Controlled consolidated user UX release checklist")
