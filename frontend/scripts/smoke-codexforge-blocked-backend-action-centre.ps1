param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2202 Blocked Backend Action Centre"
  ScriptFile = "smoke-codexforge-blocked-backend-action-centre.ps1"
  Domain = "src\lib\codexforge\blocked-backend-action-centre"
  Route = "src\app\blocked-backend-action-centre"
  CommandLabel = "Go to Blocked Backend Action Centre"
  RouteHref = "/blocked-backend-action-centre"
  Markers = @("Blocked backend action centre", "Blocked backend action centre shows disabled or safe blocked buttons for generate script generate storyboard upload assets generate voice render video export video publish video and schedule post", "Blocked backend action centre does not call providers call models call connectors upload files download files render export publish schedule create APIs create services run commands or write browser storage", "Blocked backend action centre explains the backend contract that must be wired first for each action", "Denied backend action paths remain blocked", "Blocked backend action centre checklist")
}
& (Join-Path $PSScriptRoot "codexforge-interactive-video-workspace-ux-smoke-helper.ps1") @params
