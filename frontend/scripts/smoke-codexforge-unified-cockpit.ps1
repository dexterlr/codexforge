param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-unified-cockpit-smoke-helper.ps1") `
  -SmokeName "Unified CodexForge Cockpit" `
  -ScriptFile "smoke-codexforge-unified-cockpit.ps1" `
  -Domain "src\lib\codexforge\unified-cockpit" `
  -Route "src\app\codexforge-cockpit" `
  -MainPanel "UnifiedCodexForgeCockpitPanel" `
  -CommandLabel "Go to Unified CodexForge Cockpit" `
  -RouteHref "/codexforge-cockpit" `
  -Markers @("Unified CodexForge Cockpit", "One cockpit for goal plan approval execution evidence result and recovery", "Normal users should not need to navigate phase pages", "File writes remain blocked until explicit operator approval", "Commands remain blocked until explicit operator approval", "No real command execution from the cockpit", "No real file mutation from the cockpit", "Unified cockpit checklist")
