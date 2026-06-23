param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-specialist-worker-registry-smoke-helper.ps1") `
  -SmokeName "Phase 1589 Audit Worker Profile Preview" `
  -ScriptFile "smoke-codexforge-audit-worker-profile-preview.ps1" `
  -Domain "src\lib\codexforge\audit-worker-profile-preview" `
  -Route "src\app\audit-worker-profile-preview" `
  -MainPanel "SpecialistWorkerRegistryRoutePanel" `
  -CommandLabel "Go to Audit Worker Profile Preview" `
  -RouteHref "/audit-worker-profile-preview" `
  -Markers @("Audit worker profile preview", "Audit worker profile preview does not persist audit logs from the UI", "Audit worker profile preview requires backend-owned audit capture", "Audit worker profile preview covers goal context compiler proposal approval queue transaction command evidence result recovery memory denied paths and operator timeline", "Denied audit worker paths remain blocked", "Audit worker profile checklist")
