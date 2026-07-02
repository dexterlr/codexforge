param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2211 Controlled Interactive Video Workspace Release Candidate"
  ScriptFile = "smoke-codexforge-controlled-interactive-video-workspace-release-candidate.ps1"
  Domain = "src\lib\codexforge\controlled-interactive-video-workspace-release-candidate"
  Route = "src\app\controlled-interactive-video-workspace-release-candidate"
  CommandLabel = "Go to Controlled Interactive Video Workspace Release Candidate"
  RouteHref = "/controlled-interactive-video-workspace-release-candidate"
  Markers = @("Controlled interactive video workspace release candidate", "Controlled interactive video workspace release candidate does not persist projects call providers call models call connectors send prompts upload files download files render videos export files publish content schedule content create artifacts create APIs create services run commands spawn processes bind ports deploy runtimes store credentials store tokens write browser storage or guarantee performance from the frontend", "Controlled interactive video workspace release candidate makes the workspace interactive using local React state only", "Controlled interactive video workspace release candidate requires backend wiring before protected actions", "Denied controlled interactive workspace paths remain blocked", "Controlled interactive video workspace release candidate checklist")
}
& (Join-Path $PSScriptRoot "codexforge-interactive-video-workspace-ux-smoke-helper.ps1") @params
