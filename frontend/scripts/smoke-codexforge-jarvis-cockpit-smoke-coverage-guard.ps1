param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2246 Jarvis Cockpit Smoke Coverage Guard"
  ScriptFile = "smoke-codexforge-jarvis-cockpit-smoke-coverage-guard.ps1"
  Domain = "jarvis-cockpit-smoke-coverage-guard"
  Route = "jarvis-cockpit-smoke-coverage-guard"
  CommandLabel = "Go to Jarvis Cockpit Smoke Coverage Guard"
  RouteHref = "/jarvis-cockpit-smoke-coverage-guard"
  Markers = @("Jarvis cockpit smoke coverage guard", "Jarvis cockpit smoke coverage guard verifies the Jarvis visual batch has targeted smoke scripts and full smoke registration without removing previous smoke coverage", "Jarvis cockpit smoke coverage guard keeps smoke scanning scoped to Jarvis visual batch-owned files to avoid false positives from old helper rules", "Jarvis cockpit smoke coverage guard preserves checkpoint smoke coverage", "Denied Jarvis smoke coverage regression paths remain blocked", "Jarvis cockpit smoke coverage checklist")
}
& (Join-Path $PSScriptRoot "codexforge-jarvis-cockpit-visual-smoke-helper.ps1") @params
