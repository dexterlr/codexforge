param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-specialist-worker-registry-smoke-helper.ps1") `
  -SmokeName "Phase 1578 Specialist Worker Registry Boundary" `
  -ScriptFile "smoke-codexforge-specialist-worker-registry-boundary.ps1" `
  -Domain "src\lib\codexforge\specialist-worker-registry-boundary" `
  -Route "src\app\specialist-worker-registry-boundary" `
  -MainPanel "SpecialistWorkerRegistryRoutePanel" `
  -CommandLabel "Go to Specialist Worker Registry Boundary" `
  -RouteHref "/specialist-worker-registry-boundary" `
  -Markers @("Specialist worker registry boundary", "Specialist worker registry boundary does not dispatch workers from the UI", "Specialist worker registry requires explicit operator approval before worker execution", "Specialist worker registry prepares backend-owned worker routing without hidden dispatch", "Denied specialist worker registry paths remain blocked", "Specialist worker registry checklist")
