param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2217 Controlled Interactive Video Workspace Completion Candidate"
  ScriptFile = "smoke-codexforge-controlled-interactive-video-workspace-completion-candidate.ps1"
  Domain = "src\lib\codexforge\controlled-interactive-video-workspace-completion-candidate"
  Route = "src\app\controlled-interactive-video-workspace-completion-candidate"
  CommandLabel = "Go to Controlled Interactive Video Workspace Completion Candidate"
  RouteHref = "/controlled-interactive-video-workspace-completion-candidate"
  Markers = @("Controlled interactive video workspace completion candidate", "Controlled interactive video workspace completion candidate does not persist projects call providers call models call connectors send prompts upload files download files render videos export files publish content schedule content create artifacts create APIs create services bind ports spawn workers run commands deploy runtimes store credentials store tokens write browser storage or guarantee performance from the frontend", "Controlled interactive video workspace completion candidate closes the UX pass and marks readiness for First Backend Wiring Boundary Mega Batch v1", "Controlled interactive video workspace completion candidate keeps all protected actions blocked pending backend wiring", "Denied interactive workspace completion paths remain blocked", "Controlled interactive video workspace completion checklist")
}
& (Join-Path $PSScriptRoot "codexforge-interactive-video-workspace-ux-smoke-helper.ps1") @params
