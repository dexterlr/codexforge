param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1935 Shot Intent Note Preview"
  ScriptFile = "smoke-codexforge-shot-intent-note-preview.ps1"
  Domain = "src\lib\codexforge\shot-intent-note-preview"
  Route = "src\app\shot-intent-note-preview"
  CommandLabel = "Go to Shot Intent Note Preview"
  RouteHref = "/shot-intent-note-preview"
  Markers = @("Shot intent note preview", "Shot intent note preview does not capture camera footage upload assets transcode media or persist shot lists from the UI", "Shot intent note preview requires deterministic synthetic shot planning only", "Shot intent note preview shows simulated shot purpose simulated framing note simulated motion note simulated duration target simulated backend storage prerequisite", "Denied shot intent note paths remain blocked", "Shot intent note checklist")
}
& (Join-Path $PSScriptRoot "codexforge-script-and-storyboard-workspace-smoke-helper.ps1") @params

