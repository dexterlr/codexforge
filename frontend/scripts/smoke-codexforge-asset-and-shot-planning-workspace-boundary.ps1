param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1946 Asset And Shot Planning Workspace Boundary"
  ScriptFile = "smoke-codexforge-asset-and-shot-planning-workspace-boundary.ps1"
  Domain = "src\lib\codexforge\asset-and-shot-planning-workspace-boundary"
  Route = "src\app\asset-and-shot-planning-workspace-boundary"
  CommandLabel = "Go to Asset And Shot Planning Workspace Boundary"
  RouteHref = "/asset-and-shot-planning-workspace-boundary"
  Markers = @("Asset and shot planning workspace boundary", "Asset and shot planning workspace boundary does not upload assets download assets store media render videos export files call providers call models call connectors generate images generate videos generate voice publish posts schedule content persist prompts persist jobs persist approvals persist scripts persist storyboards persist assets persist rights or write files from the UI", "Asset and shot planning workspace boundary requires explicit operator approval", "Asset and shot planning workspace boundary prepares deterministic synthetic asset and shot planning workflows without frontend upload download rendering export provider calls asset persistence rights persistence or publishing", "Denied asset and shot planning workspace paths remain blocked", "Asset and shot planning workspace boundary checklist")
}
& (Join-Path $PSScriptRoot "codexforge-asset-and-shot-planning-workspace-smoke-helper.ps1") @params

