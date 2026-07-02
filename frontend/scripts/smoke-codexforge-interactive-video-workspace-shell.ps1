param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2186 Interactive Video Workspace Shell"
  ScriptFile = "smoke-codexforge-interactive-video-workspace-shell.ps1"
  Domain = "src\lib\codexforge\interactive-video-workspace-shell"
  Route = "src\app\interactive-video-workspace-shell"
  CommandLabel = "Go to Interactive Video Workspace Shell"
  RouteHref = "/interactive-video-workspace-shell"
  Markers = @("Interactive video workspace shell", "Interactive video workspace shell uses local React state only and does not persist projects call providers call models call connectors upload files download files render videos export videos publish content schedule content create APIs create services run commands or write browser storage", "Interactive video workspace shell makes the cockpit feel like a real product while backend execution remains blocked", "Interactive video workspace shell requires backend wiring before generation rendering export publishing or persistence", "Denied interactive workspace execution paths remain blocked", "Interactive video workspace shell checklist")
}
& (Join-Path $PSScriptRoot "codexforge-interactive-video-workspace-ux-smoke-helper.ps1") @params
