param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1969 Lower Third And Supers Plan Preview"
  ScriptFile = "smoke-codexforge-lower-third-and-supers-plan-preview.ps1"
  Domain = "src\lib\codexforge\lower-third-and-supers-plan-preview"
  Route = "src\app\lower-third-and-supers-plan-preview"
  CommandLabel = "Go to Lower Third And Supers Plan Preview"
  RouteHref = "/lower-third-and-supers-plan-preview"
  Markers = @("Lower third and supers plan preview", "Lower third and supers plan preview does not render graphics burn overlays export videos or persist timeline elements from the UI", "Lower third and supers plan preview requires backend-owned render and timeline workflow", "Lower third and supers plan preview shows simulated lower third simulated callout text simulated overlay timing simulated brand note simulated render blocked state", "Denied lower third and supers plan paths remain blocked", "Lower third and supers plan checklist")
}
& (Join-Path $PSScriptRoot "codexforge-voiceover-and-caption-planning-workspace-smoke-helper.ps1") @params

