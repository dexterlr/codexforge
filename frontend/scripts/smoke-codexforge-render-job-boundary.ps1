param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1978 Render Job Boundary"
  ScriptFile = "smoke-codexforge-render-job-boundary.ps1"
  Domain = "src\lib\codexforge\render-job-boundary"
  Route = "src\app\render-job-boundary"
  CommandLabel = "Go to Render Job Boundary"
  RouteHref = "/render-job-boundary"
  Markers = @("Render job boundary", "Render job boundary does not render videos create render queues dispatch workers create artifacts export files upload assets download assets call providers call models call connectors generate images generate videos generate voice publish posts schedule content persist prompts persist jobs persist approvals persist render jobs persist queues persist artifacts persist captions persist transcripts persist audio persist rights or write files from the UI", "Render job boundary requires explicit operator approval", "Render job boundary prepares deterministic synthetic render readiness workflows without frontend rendering queue creation worker dispatch artifact persistence provider calls export or publishing", "Denied render job paths remain blocked", "Render job boundary checklist")
}
& (Join-Path $PSScriptRoot "codexforge-render-job-boundary-smoke-helper.ps1") @params

