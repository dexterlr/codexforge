param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-unified-cockpit-smoke-helper.ps1") `
  -SmokeName "Phase 1222 Cockpit Evidence Export Preview" `
  -ScriptFile "smoke-codexforge-cockpit-evidence-export-preview.ps1" `
  -Domain "src\lib\codexforge\cockpit-evidence-export-preview" `
  -Route "src\app\cockpit-evidence-export-preview" `
  -MainPanel "CockpitEvidenceResultRecoveryRoutePanel" `
  -CommandLabel "Go to Cockpit Evidence Export Preview" `
  -RouteHref "/cockpit-evidence-export-preview" `
  -Markers @("Cockpit evidence export preview", "Cockpit evidence export preview does not write export files", "Evidence export preview requires explicit operator approval before future export", "Export preview shows markdown json and bundle options as blocked previews", "Denied cockpit evidence export paths remain blocked", "Cockpit evidence export checklist")

