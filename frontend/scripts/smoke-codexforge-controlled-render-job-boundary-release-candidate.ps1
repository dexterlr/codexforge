param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1993 Controlled Render Job Boundary Release Candidate"
  ScriptFile = "smoke-codexforge-controlled-render-job-boundary-release-candidate.ps1"
  Domain = "src\lib\codexforge\controlled-render-job-boundary-release-candidate"
  Route = "src\app\controlled-render-job-boundary-release-candidate"
  CommandLabel = "Go to Controlled Render Job Boundary Release Candidate"
  RouteHref = "/controlled-render-job-boundary-release-candidate"
  Markers = @("Controlled render job boundary release candidate", "Controlled render job boundary release candidate does not render videos create render queues dispatch workers create artifacts export files upload assets download assets store media call providers call models call connectors generate images generate videos generate voice synthesize audio publish posts schedule content write files persist render jobs persist queues persist artifacts persist captions persist transcripts persist audio persist assets persist rights persist prompts persist jobs persist approvals run commands spawn processes bind ports install packages deploy runtimes start runtimes send prompts store credentials probe localhost write browser storage or guarantee performance from the frontend", "Controlled render job boundary release requires explicit operator approval", "Release candidate adds the Render Job Boundary as a review-only planning workspace without frontend rendering queue creation worker dispatch artifact persistence export provider calls model calls media persistence rights persistence prompt persistence job persistence approval persistence publishing scheduling or file mutation", "Denied controlled render job boundary paths remain blocked", "Controlled render job boundary checklist")
}
& (Join-Path $PSScriptRoot "codexforge-render-job-boundary-smoke-helper.ps1") @params

