param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2194 Caption Accessibility Planner Mock"
  ScriptFile = "smoke-codexforge-caption-accessibility-planner-mock.ps1"
  Domain = "src\lib\codexforge\caption-accessibility-planner-mock"
  Route = "src\app\caption-accessibility-planner-mock"
  CommandLabel = "Go to Caption Accessibility Planner Mock"
  RouteHref = "/caption-accessibility-planner-mock"
  Markers = @("Caption accessibility planner mock", "Caption accessibility planner mock uses local React state only and does not generate captions persist transcripts export subtitles or write files", "Caption accessibility planner mock includes caption style reading speed accessibility note and transcript dependency state", "Caption accessibility planner mock shows caption backend prerequisites clearly", "Denied caption persistence paths remain blocked", "Caption accessibility planner mock checklist")
}
& (Join-Path $PSScriptRoot "codexforge-interactive-video-workspace-ux-smoke-helper.ps1") @params
