param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1961 Controlled Asset And Shot Planning Workspace Release Candidate"
  ScriptFile = "smoke-codexforge-controlled-asset-and-shot-planning-workspace-release-candidate.ps1"
  Domain = "src\lib\codexforge\controlled-asset-and-shot-planning-workspace-release-candidate"
  Route = "src\app\controlled-asset-and-shot-planning-workspace-release-candidate"
  CommandLabel = "Go to Controlled Asset And Shot Planning Workspace Release Candidate"
  RouteHref = "/controlled-asset-and-shot-planning-workspace-release-candidate"
  Markers = @("Controlled asset and shot planning workspace release candidate", "Controlled asset and shot planning workspace release candidate does not render videos export files upload assets download assets store media call providers call models call connectors generate images generate videos generate voice synthesize audio publish posts schedule content write files persist scripts persist storyboards persist assets persist rights persist prompts persist jobs persist approvals dispatch workers create queues create artifacts run commands spawn processes bind ports install packages deploy runtimes start runtimes send prompts store credentials probe localhost write browser storage or guarantee performance from the frontend", "Controlled asset and shot planning workspace release requires explicit operator approval", "Release candidate adds the Asset And Shot Planning Workspace as a review-only planning workspace without frontend upload download rendering export provider calls model calls asset persistence rights persistence prompt persistence job persistence approval persistence publishing scheduling or file mutation", "Denied controlled asset and shot planning workspace paths remain blocked", "Controlled asset and shot planning workspace checklist")
}
& (Join-Path $PSScriptRoot "codexforge-asset-and-shot-planning-workspace-smoke-helper.ps1") @params

