param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-unified-cockpit-smoke-helper.ps1") `
  -SmokeName "Phase 1194 Unified Cockpit Boundary" `
  -ScriptFile "smoke-codexforge-unified-cockpit-boundary.ps1" `
  -Domain "src\lib\codexforge\unified-cockpit-boundary" `
  -Route "src\app\unified-cockpit-boundary" `
  -MainPanel "UnifiedCockpitBoundaryPanel" `
  -CommandLabel "Go to Unified Cockpit Boundary" `
  -RouteHref "/unified-cockpit-boundary" `
  -Markers @("Unified cockpit boundary", "Unified cockpit boundary does not execute commands or write files", "Unified cockpit requires explicit operator approval before future execution", "Cockpit unifies goal plan diff command approval execution evidence result and recovery", "Phase pages are dev/test surfaces only", "Unified cockpit boundary checklist")
