param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2041 Controlled Video Backend Service Contract Boundary Release Candidate"
  ScriptFile = "smoke-codexforge-controlled-video-backend-service-contract-boundary-release-candidate.ps1"
  Domain = "src\lib\codexforge\controlled-video-backend-service-contract-boundary-release-candidate"
  Route = "src\app\controlled-video-backend-service-contract-boundary-release-candidate"
  CommandLabel = "Go to Controlled Video Backend Service Contract Boundary Release Candidate"
  RouteHref = "/controlled-video-backend-service-contract-boundary-release-candidate"
  Markers = @("Controlled video backend service contract boundary release candidate", "Controlled video backend service contract boundary release candidate does not create backend services create APIs bind ports spawn workers run commands deploy runtimes start runtimes call providers call models call connectors send prompts store credentials generate images generate videos generate voice render videos create render queues dispatch workers create artifacts export files download files upload assets publish posts schedule content write files persist scripts persist storyboards persist assets persist audio persist captions persist transcripts persist rights persist approvals persist prompts persist jobs persist renders persist exports persist revisions persist publish state probe localhost write browser storage or guarantee performance from the frontend", "Controlled video backend service contract boundary release requires explicit operator approval", "Release candidate starts the backend contract lane as review-only contract planning without frontend service creation API creation command execution provider calls model calls render queue creation worker dispatch artifact persistence export download upload publishing scheduling credential storage or file mutation", "Denied controlled video backend service contract paths remain blocked", "Controlled video backend service contract checklist")
}
& (Join-Path $PSScriptRoot "codexforge-video-backend-service-contract-boundary-smoke-helper.ps1") @params
