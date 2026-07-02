param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2010 Controlled Video Creation Workspace Boundary"
  ScriptFile = "smoke-codexforge-controlled-video-creation-workspace-boundary.ps1"
  Domain = "src\lib\codexforge\controlled-video-creation-workspace-boundary"
  Route = "src\app\controlled-video-creation-workspace-boundary"
  CommandLabel = "Go to Controlled Video Creation Workspace Boundary"
  RouteHref = "/controlled-video-creation-workspace-boundary"
  Markers = @("Controlled video creation workspace boundary", "Controlled video creation workspace boundary does not generate videos generate images generate voice generate final scripts send prompts call providers call models call connectors render videos create render queues dispatch workers create artifacts export files download files upload files publish posts schedule content persist scripts persist storyboards persist assets persist audio persist captions persist transcripts persist rights persist approvals persist prompts persist jobs persist renders persist exports persist revisions persist publish state or write files from the UI", "Controlled video creation workspace boundary requires explicit operator approval", "Denied controlled video creation workspace paths remain blocked", "Controlled video creation workspace boundary checklist")
}
& (Join-Path $PSScriptRoot "codexforge-controlled-video-creation-workspace-smoke-helper.ps1") @params

