param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2221 Readiness Orb Cluster Preview"
  ScriptFile = "smoke-codexforge-readiness-orb-cluster-preview.ps1"
  Domain = "readiness-orb-cluster-preview"
  Route = "readiness-orb-cluster-preview"
  CommandLabel = "Go to Readiness Orb Cluster Preview"
  RouteHref = "/readiness-orb-cluster-preview"
  Markers = @("Readiness orb cluster preview", "Readiness orb cluster preview adds visual readiness orbs for script storyboard assets audio captions rights approvals render export and publish", "Readiness orb cluster preview computes display readiness from local mock state only and does not persist readiness create jobs dispatch workers or call services", "Readiness orb cluster preview keeps backend wiring required", "Denied readiness orb execution paths remain blocked", "Readiness orb cluster checklist")
}
& (Join-Path $PSScriptRoot "codexforge-jarvis-cockpit-visual-smoke-helper.ps1") @params
