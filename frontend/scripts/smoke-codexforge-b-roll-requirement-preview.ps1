param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1949 B-Roll Requirement Preview"
  ScriptFile = "smoke-codexforge-b-roll-requirement-preview.ps1"
  Domain = "src\lib\codexforge\b-roll-requirement-preview"
  Route = "src\app\b-roll-requirement-preview"
  CommandLabel = "Go to B-Roll Requirement Preview"
  RouteHref = "/b-roll-requirement-preview"
  Markers = @("B-roll requirement preview", "B-roll requirement preview does not download stock footage upload footage store media or clear rights from the UI", "B-roll requirement preview requires backend-owned asset storage and rights review", "B-roll requirement preview shows simulated b-roll need simulated source option simulated rights note simulated shot purpose simulated storage prerequisite", "Denied b-roll requirement paths remain blocked", "B-roll requirement checklist")
}
& (Join-Path $PSScriptRoot "codexforge-asset-and-shot-planning-workspace-smoke-helper.ps1") @params

