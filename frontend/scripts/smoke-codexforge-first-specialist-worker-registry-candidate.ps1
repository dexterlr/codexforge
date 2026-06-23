param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-specialist-worker-registry-smoke-helper.ps1") `
  -SmokeName "Phase 1592 First Specialist Worker Registry Candidate" `
  -ScriptFile "smoke-codexforge-first-specialist-worker-registry-candidate.ps1" `
  -Domain "src\lib\codexforge\first-specialist-worker-registry-candidate" `
  -Route "src\app\first-specialist-worker-registry-candidate" `
  -MainPanel "SpecialistWorkerRegistryRoutePanel" `
  -CommandLabel "Go to First Specialist Worker Registry Candidate" `
  -RouteHref "/first-specialist-worker-registry-candidate" `
  -Markers @("First specialist worker registry candidate", "First specialist worker registry candidate does not dispatch workers from the UI", "First specialist worker registry candidate requires explicit operator approval", "Candidate combines coding research game server web app docs data creative video trading QA audit recovery worker profiles and routing fit", "Denied first specialist worker registry paths remain blocked", "First specialist worker registry checklist")
