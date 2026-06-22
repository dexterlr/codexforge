param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-unified-cockpit-smoke-helper.ps1") `
  -SmokeName "Phase 1217 Cockpit Rollback Preview View" `
  -ScriptFile "smoke-codexforge-cockpit-rollback-preview-view.ps1" `
  -Domain "src\lib\codexforge\cockpit-rollback-preview-view" `
  -Route "src\app\cockpit-rollback-preview-view" `
  -MainPanel "CockpitEvidenceResultRecoveryRoutePanel" `
  -CommandLabel "Go to Cockpit Rollback Preview View" `
  -RouteHref "/cockpit-rollback-preview-view" `
  -Markers @("Cockpit rollback preview view", "Cockpit rollback preview view does not execute rollback", "Rollback preview requires explicit operator approval before future rollback", "Rollback preview shows reverse file write and restore plan without mutation", "Denied cockpit rollback paths remain blocked", "Cockpit rollback preview checklist")

