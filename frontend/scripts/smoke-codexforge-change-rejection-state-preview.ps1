param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1828 Change Rejection State Preview"
  ScriptFile = "smoke-codexforge-change-rejection-state-preview.ps1"
  Domain = "src\lib\codexforge\change-rejection-state-preview"
  Route = "src\app\change-rejection-state-preview"
  CommandLabel = "Go to Change Rejection State Preview"
  RouteHref = "/change-rejection-state-preview"
  Markers = @("Change rejection state preview", "Change rejection state preview does not mutate strategy rules delete proposals write audit state or persist rejection from the UI", "Change rejection state preview requires backend-owned review workflow", "Change rejection state preview shows simulated rejection reason simulated evidence gap simulated risk concern simulated mandate conflict simulated next review note and denied frontend persistence", "Denied change rejection state paths remain blocked", "Change rejection state checklist")
}
& (Join-Path $PSScriptRoot "codexforge-strategy-change-control-workflow-smoke-helper.ps1") @params