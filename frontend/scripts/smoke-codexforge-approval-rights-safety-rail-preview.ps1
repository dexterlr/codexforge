param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$params = @{
  SmokeName = "Phase 2226 Approval Rights Safety Rail Preview"
  ScriptFile = "smoke-codexforge-approval-rights-safety-rail-preview.ps1"
  Domain = "srclibcodexforge${route.slug}"
  Route = "srcapp${route.slug}"
  CommandLabel = "Go to Approval Rights Safety Rail Preview"
  RouteHref = "/approval-rights-safety-rail-preview"
  Markers = @("Approval rights safety rail preview", "Approval rights safety rail preview adds a high-end safety rail for approvals rights consent audit brand legal and operator gates", "Approval rights safety rail preview does not persist approvals clear rights approve consent grant licenses verify identity or mutate audit logs", "Approval rights safety rail preview keeps backend-owned approval and audit workflows required", "Denied approval rights safety rail execution paths remain blocked", "Approval rights safety rail checklist")
}
& (Join-Path $PSScriptRoot "codexforge-jarvis-cockpit-visual-smoke-helper.ps1") @params
