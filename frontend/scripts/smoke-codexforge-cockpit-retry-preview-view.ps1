param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-unified-cockpit-smoke-helper.ps1") `
  -SmokeName "Phase 1218 Cockpit Retry Preview View" `
  -ScriptFile "smoke-codexforge-cockpit-retry-preview-view.ps1" `
  -Domain "src\lib\codexforge\cockpit-retry-preview-view" `
  -Route "src\app\cockpit-retry-preview-view" `
  -MainPanel "CockpitEvidenceResultRecoveryRoutePanel" `
  -CommandLabel "Go to Cockpit Retry Preview View" `
  -RouteHref "/cockpit-retry-preview-view" `
  -Markers @("Cockpit retry preview view", "Cockpit retry preview view does not execute retry", "Retry preview requires explicit operator approval before future retry", "Retry preview shows guarded command retry and file-write retry as blocked previews", "Denied cockpit retry paths remain blocked", "Cockpit retry preview checklist")

