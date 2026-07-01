param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1934 Storyboard Card Grid Preview"
  ScriptFile = "smoke-codexforge-storyboard-card-grid-preview.ps1"
  Domain = "src\lib\codexforge\storyboard-card-grid-preview"
  Route = "src\app\storyboard-card-grid-preview"
  CommandLabel = "Go to Storyboard Card Grid Preview"
  RouteHref = "/storyboard-card-grid-preview"
  Markers = @("Storyboard card grid preview", "Storyboard card grid preview does not generate images call image providers persist storyboards or export boards from the UI", "Storyboard card grid preview requires backend-owned storyboard workflow before persistence", "Storyboard card grid preview shows simulated scene card simulated shot description simulated overlay note simulated transition note simulated image generation blocked state", "Denied storyboard card grid paths remain blocked", "Storyboard card grid checklist")
}
& (Join-Path $PSScriptRoot "codexforge-script-and-storyboard-workspace-smoke-helper.ps1") @params

