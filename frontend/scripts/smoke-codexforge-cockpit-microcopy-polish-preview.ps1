param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2236 Cockpit Microcopy Polish Preview"
  ScriptFile = "smoke-codexforge-cockpit-microcopy-polish-preview.ps1"
  Domain = "cockpit-microcopy-polish-preview"
  Route = "cockpit-microcopy-polish-preview"
  CommandLabel = "Go to Cockpit Microcopy Polish Preview"
  RouteHref = "/cockpit-microcopy-polish-preview"
  Markers = @("Cockpit microcopy polish preview", "Cockpit microcopy polish preview improves labels explanations blocked action text and premium product language across the cockpit", "Cockpit microcopy polish preview does not claim backend features are live or working", "Cockpit microcopy polish preview avoids unproven CI live execution or fully working claims", "Denied cockpit microcopy regression paths remain blocked", "Cockpit microcopy polish checklist")
}
& (Join-Path $PSScriptRoot "codexforge-jarvis-cockpit-visual-smoke-helper.ps1") @params
