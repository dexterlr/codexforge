param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1873 Change Control To Version Registry Trace Preview"
  ScriptFile = "smoke-codexforge-change-control-to-version-registry-trace-preview.ps1"
  Domain = "src\lib\codexforge\change-control-to-version-registry-trace-preview"
  Route = "src\app\change-control-to-version-registry-trace-preview"
  CommandLabel = "Go to Change Control To Version Registry Trace Preview"
  RouteHref = "/change-control-to-version-registry-trace-preview"
  Markers = @("Change control to version registry trace preview", "Change control to version registry trace preview does not persist versions create branches write files apply diffs or promote strategies from the UI", "Change control to version registry trace preview requires backend-owned version registry workflow", "Change control to version registry trace preview shows simulated change packet simulated draft version simulated evidence requirement simulated approval requirement simulated denied frontend persistence", "Denied change control to version registry trace paths remain blocked", "Change control to version registry trace checklist")
}
& (Join-Path $PSScriptRoot "codexforge-paper-trading-end-to-end-review-smoke-helper.ps1") @params
