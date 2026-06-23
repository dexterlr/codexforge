param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-specialist-worker-registry-smoke-helper.ps1") `
  -SmokeName "Phase 1593 Controlled Specialist Worker Registry Release Candidate" `
  -ScriptFile "smoke-codexforge-controlled-specialist-worker-registry-release-candidate.ps1" `
  -Domain "src\lib\codexforge\controlled-specialist-worker-registry-release-candidate" `
  -Route "src\app\controlled-specialist-worker-registry-release-candidate" `
  -MainPanel "SpecialistWorkerRegistryRoutePanel" `
  -CommandLabel "Go to Controlled Specialist Worker Registry Release Candidate" `
  -RouteHref "/controlled-specialist-worker-registry-release-candidate" `
  -Markers @("Controlled specialist worker registry release candidate", "Controlled specialist worker registry release candidate does not dispatch workers call local models models providers connectors write files apply diffs run commands create snapshots persist approvals create queues persist transactions persist evidence results audit promote memory release locks execute rollback retry recovery spawn processes bind ports install deploy start runtimes send prompts store credentials probe localhost or write browser storage from the frontend", "Controlled specialist worker registry release requires explicit operator approval", "Release candidate prepares CodexForge for backend-owned specialist worker routing without frontend worker execution", "Denied controlled specialist worker registry paths remain blocked", "Controlled specialist worker registry release checklist")
