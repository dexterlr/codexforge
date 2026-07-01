param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1945 Controlled Script And Storyboard Workspace Release Candidate"
  ScriptFile = "smoke-codexforge-controlled-script-and-storyboard-workspace-release-candidate.ps1"
  Domain = "src\lib\codexforge\controlled-script-and-storyboard-workspace-release-candidate"
  Route = "src\app\controlled-script-and-storyboard-workspace-release-candidate"
  CommandLabel = "Go to Controlled Script And Storyboard Workspace Release Candidate"
  RouteHref = "/controlled-script-and-storyboard-workspace-release-candidate"
  Markers = @("Controlled script and storyboard workspace release candidate", "Controlled script and storyboard workspace release candidate does not render videos export files upload assets download assets call providers call models call connectors generate final scripts generate images generate videos generate voice synthesize audio publish posts schedule content write files persist scripts persist storyboards persist assets persist prompts persist jobs persist approvals dispatch workers create queues create artifacts run commands spawn processes bind ports install packages deploy runtimes start runtimes send prompts store credentials probe localhost write browser storage or guarantee performance from the frontend", "Controlled script and storyboard workspace release requires explicit operator approval", "Release candidate adds the Script And Storyboard Workspace as a review-only planning workspace without frontend generation rendering export provider calls model calls asset persistence prompt persistence job persistence approval persistence publishing scheduling or file mutation", "Denied controlled script and storyboard workspace paths remain blocked", "Controlled script and storyboard workspace checklist")
}
& (Join-Path $PSScriptRoot "codexforge-script-and-storyboard-workspace-smoke-helper.ps1") @params

