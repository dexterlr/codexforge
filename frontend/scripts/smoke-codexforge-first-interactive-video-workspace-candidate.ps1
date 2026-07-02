param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2210 First Interactive Video Workspace Candidate"
  ScriptFile = "smoke-codexforge-first-interactive-video-workspace-candidate.ps1"
  Domain = "src\lib\codexforge\first-interactive-video-workspace-candidate"
  Route = "src\app\first-interactive-video-workspace-candidate"
  CommandLabel = "Go to First Interactive Video Workspace Candidate"
  RouteHref = "/first-interactive-video-workspace-candidate"
  Markers = @("First interactive video workspace candidate", "First interactive video workspace candidate combines local project brief script storyboard shot asset audio caption brand rights approval readiness timeline and blocked action centre without persistence or backend execution", "First interactive video workspace candidate requires backend wiring before generation render export publish schedule upload download or save", "First interactive video workspace candidate keeps diagnostic contract links secondary", "Denied first interactive workspace candidate paths remain blocked", "First interactive video workspace candidate checklist")
}
& (Join-Path $PSScriptRoot "codexforge-interactive-video-workspace-ux-smoke-helper.ps1") @params
