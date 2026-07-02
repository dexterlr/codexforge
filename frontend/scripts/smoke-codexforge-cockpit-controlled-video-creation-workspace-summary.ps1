param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2023 Cockpit Controlled Video Creation Workspace Summary"
  ScriptFile = "smoke-codexforge-cockpit-controlled-video-creation-workspace-summary.ps1"
  Domain = "src\lib\codexforge\cockpit-controlled-video-creation-workspace-summary"
  Route = "src\app\cockpit-controlled-video-creation-workspace-summary"
  CommandLabel = "Go to Cockpit Controlled Video Creation Workspace Summary"
  RouteHref = "/cockpit-controlled-video-creation-workspace-summary"
  Markers = @("Cockpit controlled video creation workspace summary", "Cockpit controlled video creation workspace summary keeps the cockpit as the normal user surface", "Cockpit controlled video creation workspace summary does not generate videos generate images generate voice generate final scripts send prompts call providers call models call connectors render videos create render queues dispatch workers create artifacts export files download files upload files publish posts schedule content persist scripts persist storyboards persist assets persist audio persist captions persist transcripts persist rights persist approvals persist prompts persist jobs persist renders persist exports persist revisions persist publish state or write files from the cockpit", "Phase pages remain dev test diagnostics only", "Cockpit controlled video creation workspace checklist")
}
& (Join-Path $PSScriptRoot "codexforge-controlled-video-creation-workspace-smoke-helper.ps1") @params

