param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-project-context-brain-smoke-helper.ps1") `
  -SmokeName "Phase 1410 Denied Context Boundary" `
  -ScriptFile "smoke-codexforge-denied-context-boundary.ps1" `
  -Domain "src\lib\codexforge\denied-context-boundary" `
  -Route "src\app\denied-context-boundary" `
  -MainPanel "ProjectContextBrainRoutePanel" `
  -CommandLabel "Go to Denied Context Boundary" `
  -RouteHref "/denied-context-boundary" `
  -Markers @("Denied context boundary", "Denied context boundary does not mutate workflow state", "Denied context boundary requires explicit operator approval", "Denied context boundary blocks arbitrary browsing secrets environment values provider calls connectors model calls commands writes installs deploys ports runtimes persistence and automatic memory promotion", "Denied context paths remain blocked", "Denied context checklist")
