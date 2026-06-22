param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-project-context-brain-smoke-helper.ps1") `
  -SmokeName "Phase 1409 Risk Zone Preview" `
  -ScriptFile "smoke-codexforge-risk-zone-preview.ps1" `
  -Domain "src\lib\codexforge\risk-zone-preview" `
  -Route "src\app\risk-zone-preview" `
  -MainPanel "ProjectContextBrainRoutePanel" `
  -CommandLabel "Go to Risk Zone Preview" `
  -RouteHref "/risk-zone-preview" `
  -Markers @("Risk zone preview", "Risk zone preview does not execute safety scans from the UI", "Risk zone preview requires explicit operator approval", "Risk zone preview highlights file mutation command execution provider calls connector calls secrets installs deploys ports runtimes persistence and recovery risks", "Denied risk zone paths remain blocked", "Risk zone checklist")
