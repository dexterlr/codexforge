param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1991 Cockpit Render Job Boundary Summary"
  ScriptFile = "smoke-codexforge-cockpit-render-job-boundary-summary.ps1"
  Domain = "src\lib\codexforge\cockpit-render-job-boundary-summary"
  Route = "src\app\cockpit-render-job-boundary-summary"
  CommandLabel = "Go to Cockpit Render Job Boundary Summary"
  RouteHref = "/cockpit-render-job-boundary-summary"
  Markers = @("Cockpit render job boundary summary", "Cockpit render job boundary summary keeps the cockpit as the normal user surface", "Cockpit render job boundary summary does not render videos create render queues dispatch workers create artifacts export files upload assets download assets call providers call models call connectors generate images generate videos generate voice publish posts schedule content persist prompts persist jobs persist approvals persist render jobs persist queues persist artifacts persist captions persist transcripts persist audio persist rights or write files from the cockpit", "Cockpit render job boundary summary shows render prerequisites timeline readiness asset readiness caption readiness audio readiness rights approval render settings render queue blocked worker dispatch blocked artifact persistence blocked render failure review export handoff blocked and denied paths", "Phase pages remain dev test diagnostics only", "Cockpit render job boundary checklist")
}
& (Join-Path $PSScriptRoot "codexforge-render-job-boundary-smoke-helper.ps1") @params

