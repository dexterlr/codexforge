param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1992 First Render Job Boundary Candidate"
  ScriptFile = "smoke-codexforge-first-render-job-boundary-candidate.ps1"
  Domain = "src\lib\codexforge\first-render-job-boundary-candidate"
  Route = "src\app\first-render-job-boundary-candidate"
  CommandLabel = "Go to First Render Job Boundary Candidate"
  RouteHref = "/first-render-job-boundary-candidate"
  Markers = @("First render job boundary candidate", "First render job boundary candidate does not enable rendering queue creation worker dispatch artifact creation export upload download provider calls model calls connector calls image generation video generation voice generation publishing scheduling file writes render job persistence queue persistence artifact persistence asset persistence rights persistence prompt persistence job persistence or approval persistence from the UI", "First render job boundary candidate requires explicit operator approval", "Candidate combines prerequisite checklist timeline readiness asset gate caption gate audio gate rights gate render settings render queue blocked worker dispatch blocked artifact persistence blocked render failure review export handoff blocked cockpit summary and denied paths", "Denied first render job boundary paths remain blocked", "First render job boundary checklist")
}
& (Join-Path $PSScriptRoot "codexforge-render-job-boundary-smoke-helper.ps1") @params

