param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1919 Video Safety And Rights Boundary Preview"
  ScriptFile = "smoke-codexforge-video-safety-and-rights-boundary-preview.ps1"
  Domain = "src\lib\codexforge\video-safety-and-rights-boundary-preview"
  Route = "src\app\video-safety-and-rights-boundary-preview"
  CommandLabel = "Go to Video Safety And Rights Boundary Preview"
  RouteHref = "/video-safety-and-rights-boundary-preview"
  Markers = @("Video safety and rights boundary preview", "Video safety and rights boundary preview does not clear copyright license music approve brand use or publish content from the UI", "Video safety and rights boundary preview requires backend-owned rights review and operator approval", "Video safety and rights boundary preview shows simulated rights checklist simulated brand safety note simulated music rights note simulated source attribution note simulated approval requirement", "Denied video safety and rights paths remain blocked", "Video safety and rights checklist")
}
& (Join-Path $PSScriptRoot "codexforge-video-creation-domain-smoke-helper.ps1") @params
