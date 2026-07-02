param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2025 Controlled Video Creation Workspace Release Candidate"
  ScriptFile = "smoke-codexforge-controlled-video-creation-workspace-release-candidate.ps1"
  Domain = "src\lib\codexforge\controlled-video-creation-workspace-release-candidate"
  Route = "src\app\controlled-video-creation-workspace-release-candidate"
  CommandLabel = "Go to Controlled Video Creation Workspace Release Candidate"
  RouteHref = "/controlled-video-creation-workspace-release-candidate"
  Markers = @("Controlled video creation workspace release candidate", "Controlled video creation workspace release candidate does not render videos generate videos generate images generate voice generate final scripts send prompts call providers call models call connectors export files download files upload assets publish posts schedule content create artifacts store media synthesize audio write files persist scripts persist storyboards persist assets persist audio persist captions persist transcripts persist rights persist approvals persist prompts persist jobs persist renders persist exports persist revisions persist publish state dispatch workers create queues run commands spawn processes bind ports install packages deploy runtimes start runtimes store credentials probe localhost write browser storage or guarantee performance from the frontend", "Controlled video creation workspace release requires explicit operator approval", "Denied controlled video creation workspace paths remain blocked", "Controlled video creation workspace checklist")
}
& (Join-Path $PSScriptRoot "codexforge-controlled-video-creation-workspace-smoke-helper.ps1") @params

