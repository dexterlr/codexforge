param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1923 Video Voiceover Planning Boundary Preview"
  ScriptFile = "smoke-codexforge-video-voiceover-planning-boundary-preview.ps1"
  Domain = "src\lib\codexforge\video-voiceover-planning-boundary-preview"
  Route = "src\app\video-voiceover-planning-boundary-preview"
  CommandLabel = "Go to Video Voiceover Planning Boundary Preview"
  RouteHref = "/video-voiceover-planning-boundary-preview"
  Markers = @("Video voiceover planning boundary preview", "Video voiceover planning boundary preview does not synthesize voice call voice providers store audio or export voice files from the UI", "Video voiceover planning boundary preview requires backend-owned voice workflow and approval", "Video voiceover planning boundary preview shows simulated voice tone simulated read pace simulated narration note simulated consent note simulated voice generation blocked state", "Denied video voiceover planning paths remain blocked", "Video voiceover planning checklist")
}
& (Join-Path $PSScriptRoot "codexforge-video-creation-domain-smoke-helper.ps1") @params
