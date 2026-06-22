param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-unified-cockpit-smoke-helper.ps1") `
  -SmokeName "Phase 1208 First Unified Cockpit Candidate" `
  -ScriptFile "smoke-codexforge-first-unified-cockpit-candidate.ps1" `
  -Domain "src\lib\codexforge\first-unified-cockpit-candidate" `
  -Route "src\app\first-unified-cockpit-candidate" `
  -MainPanel "FirstUnifiedCockpitCandidatePanel" `
  -CommandLabel "Go to First Unified Cockpit Candidate" `
  -RouteHref "/first-unified-cockpit-candidate" `
  -Markers @("First unified cockpit candidate", "First unified cockpit candidate does not execute commands or write files", "First unified cockpit candidate requires explicit operator approval", "Candidate combines goal plan diff command approval execution evidence result recovery safety and dev-surface drawer", "Denied first unified cockpit paths remain blocked", "First unified cockpit checklist")
