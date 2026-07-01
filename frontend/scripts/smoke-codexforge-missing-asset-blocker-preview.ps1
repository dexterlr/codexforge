param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1955 Missing Asset Blocker Preview"
  ScriptFile = "smoke-codexforge-missing-asset-blocker-preview.ps1"
  Domain = "src\lib\codexforge\missing-asset-blocker-preview"
  Route = "src\app\missing-asset-blocker-preview"
  CommandLabel = "Go to Missing Asset Blocker Preview"
  RouteHref = "/missing-asset-blocker-preview"
  Markers = @("Missing asset blocker preview", "Missing asset blocker preview does not create upload jobs dispatch workers persist queues or bypass rights review from the UI", "Missing asset blocker preview requires deterministic synthetic blocker rows only", "Missing asset blocker preview shows simulated missing b-roll simulated missing product shot simulated missing music license simulated missing logo simulated missing approval and backend prerequisite", "Denied missing asset blocker paths remain blocked", "Missing asset blocker checklist")
}
& (Join-Path $PSScriptRoot "codexforge-asset-and-shot-planning-workspace-smoke-helper.ps1") @params

