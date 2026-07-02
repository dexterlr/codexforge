param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2022 No Hidden Generation Boundary Preview"
  ScriptFile = "smoke-codexforge-no-hidden-generation-boundary-preview.ps1"
  Domain = "src\lib\codexforge\no-hidden-generation-boundary-preview"
  Route = "src\app\no-hidden-generation-boundary-preview"
  CommandLabel = "Go to No Hidden Generation Boundary Preview"
  RouteHref = "/no-hidden-generation-boundary-preview"
  Markers = @("No hidden generation boundary preview", "No hidden generation boundary preview blocks hidden prompt sends hidden provider calls hidden model calls hidden connector calls hidden image generation hidden video generation hidden voice generation hidden render controls hidden export controls hidden upload download controls hidden publish controls hidden schedule controls and hidden persistence", "No hidden generation boundary preview requires backend-owned provider gateway render service export service artifact storage publish gateway approval capture and explicit operator approval", "Denied no hidden generation paths remain blocked", "No hidden generation boundary checklist")
}
& (Join-Path $PSScriptRoot "codexforge-controlled-video-creation-workspace-smoke-helper.ps1") @params

