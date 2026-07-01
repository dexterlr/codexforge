param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 1848 First Strategy Version Review Registry Candidate"
  ScriptFile = "smoke-codexforge-first-strategy-version-review-registry-candidate.ps1"
  Domain = "src\lib\codexforge\first-strategy-version-review-registry-candidate"
  Route = "src\app\first-strategy-version-review-registry-candidate"
  CommandLabel = "Go to First Strategy Version Review Registry Candidate"
  RouteHref = "/first-strategy-version-review-registry-candidate"
  Markers = @("First strategy version review registry candidate", "First strategy version review registry candidate does not enable financial advice recommendations buy sell instructions auto tuning strategy promotion rule mutation file writes version persistence approval persistence evidence persistence order placement or dispatch from the UI", "First strategy version review registry candidate requires explicit operator approval", "Candidate combines version lineage diff summary evidence links risk status mandate status approval state retirement state rollback note comparison matrix review checklist export boundary no auto promote boundary cockpit summary and denied paths", "Denied first strategy version review registry paths remain blocked", "First strategy version review registry checklist")
}
& (Join-Path $PSScriptRoot "codexforge-strategy-version-review-registry-smoke-helper.ps1") @params
