param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-unified-cockpit-smoke-helper.ps1") `
  -SmokeName "Phase 1206 Cockpit Single-Page Navigation Contract" `
  -ScriptFile "smoke-codexforge-cockpit-single-page-navigation-contract.ps1" `
  -Domain "src\lib\codexforge\cockpit-single-page-navigation-contract" `
  -Route "src\app\cockpit-single-page-navigation-contract" `
  -MainPanel "CockpitSinglePageNavigationContractPanel" `
  -CommandLabel "Go to Cockpit Single Page Navigation Contract" `
  -RouteHref "/cockpit-single-page-navigation-contract" `
  -Markers @("Cockpit single-page navigation contract", "Cockpit single-page navigation contract does not execute navigation side effects", "Single-page navigation keeps goal plan approval execution evidence result and recovery in one cockpit", "Phase routes remain deep-linkable dev/test diagnostics", "Normal users should not need multi-page phase navigation", "Cockpit single-page navigation checklist")
