param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-unified-cockpit-smoke-helper.ps1") `
  -SmokeName "Phase 1215 Cockpit Result Decision View" `
  -ScriptFile "smoke-codexforge-cockpit-result-decision-view.ps1" `
  -Domain "src\lib\codexforge\cockpit-result-decision-view" `
  -Route "src\app\cockpit-result-decision-view" `
  -MainPanel "CockpitEvidenceResultRecoveryRoutePanel" `
  -CommandLabel "Go to Cockpit Result Decision View" `
  -RouteHref "/cockpit-result-decision-view" `
  -Markers @("Cockpit result decision view", "Cockpit result decision view does not make automatic decisions", "Result decision requires explicit operator approval before future action", "Result decision shows accept retry rollback explain and needs-review options as previews", "Denied cockpit result decision paths remain blocked", "Cockpit result decision checklist")

