param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1947 Shot List Planning Preview"
  ScriptFile = "smoke-codexforge-shot-list-planning-preview.ps1"
  Domain = "src\lib\codexforge\shot-list-planning-preview"
  Route = "src\app\shot-list-planning-preview"
  CommandLabel = "Go to Shot List Planning Preview"
  RouteHref = "/shot-list-planning-preview"
  Markers = @("Shot list planning preview", "Shot list planning preview does not capture footage upload media transcode files persist shot lists or create files from the UI", "Shot list planning preview requires deterministic synthetic shot planning rows only", "Shot list planning preview shows simulated shot name simulated framing note simulated motion note simulated duration target simulated backend storage prerequisite", "Denied shot list planning paths remain blocked", "Shot list planning checklist")
}
& (Join-Path $PSScriptRoot "codexforge-asset-and-shot-planning-workspace-smoke-helper.ps1") @params

