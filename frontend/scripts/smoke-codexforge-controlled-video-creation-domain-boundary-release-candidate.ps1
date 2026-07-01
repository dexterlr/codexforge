param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1929 Controlled Video Creation Domain Boundary Release Candidate"
  ScriptFile = "smoke-codexforge-controlled-video-creation-domain-boundary-release-candidate.ps1"
  Domain = "src\lib\codexforge\controlled-video-creation-domain-boundary-release-candidate"
  Route = "src\app\controlled-video-creation-domain-boundary-release-candidate"
  CommandLabel = "Go to Controlled Video Creation Domain Boundary Release Candidate"
  RouteHref = "/controlled-video-creation-domain-boundary-release-candidate"
  Markers = @("Controlled video creation domain boundary release candidate", "Controlled video creation domain boundary release candidate does not render videos export files upload assets download assets call providers call models call connectors generate images generate videos generate voice synthesize audio publish posts schedule content write files persist assets persist prompts persist jobs persist approvals dispatch workers create queues create artifacts run commands spawn processes bind ports install packages deploy runtimes start runtimes send prompts store credentials probe localhost write browser storage or guarantee performance from the frontend", "Controlled video creation domain boundary release requires explicit operator approval", "Release candidate starts the Video Creation Domain Pack as a review-only planning workspace without frontend rendering export provider calls model calls asset persistence prompt persistence job persistence approval persistence publishing scheduling or file mutation", "Denied controlled video creation domain paths remain blocked", "Controlled video creation domain boundary checklist")
}
& (Join-Path $PSScriptRoot "codexforge-video-creation-domain-smoke-helper.ps1") @params
