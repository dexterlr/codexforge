param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1851 Promotion Eligibility Checklist Preview"
  ScriptFile = "smoke-codexforge-promotion-eligibility-checklist-preview.ps1"
  Domain = "src\lib\codexforge\promotion-eligibility-checklist-preview"
  Route = "src\app\promotion-eligibility-checklist-preview"
  CommandLabel = "Go to Promotion Eligibility Checklist Preview"
  RouteHref = "/promotion-eligibility-checklist-preview"
  Markers = @("Promotion eligibility checklist preview", "Promotion eligibility checklist preview does not approve strategies persist checklist state auto promote versions or create trading instructions from the UI", "Promotion eligibility checklist preview requires deterministic synthetic eligibility rows only", "Promotion eligibility checklist preview shows simulated evidence check simulated risk check simulated mandate check simulated version check simulated operator review check and denied frontend persistence", "Denied promotion eligibility checklist paths remain blocked", "Promotion eligibility checklist checklist")
}
& (Join-Path $PSScriptRoot "codexforge-paper-strategy-promotion-gate-smoke-helper.ps1") @params
