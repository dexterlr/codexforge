param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-model-router-v2-smoke-helper.ps1") `
  -SmokeName "Phase 1545 Controlled Model Router v2 Release Candidate" `
  -ScriptFile "smoke-codexforge-controlled-model-router-v2-release-candidate.ps1" `
  -Domain "src\lib\codexforge\controlled-model-router-v2-release-candidate" `
  -Route "src\app\controlled-model-router-v2-release-candidate" `
  -MainPanel "ModelRouterV2RoutePanel" `
  -CommandLabel "Go to Controlled Model Router v2 Release Candidate" `
  -RouteHref "/controlled-model-router-v2-release-candidate" `
  -Markers @("Controlled model router v2 release candidate", "Controlled model router v2 release candidate does not call models providers connectors write files apply diffs run commands create snapshots persist approvals create queues persist transactions persist evidence results audit promote memory release locks execute rollback retry recovery spawn processes bind ports install deploy start runtimes send prompts store credentials or write browser storage from the frontend", "Controlled model router v2 release requires explicit operator approval", "Release candidate prepares CodexForge for backend-owned provider-gated model routing without frontend model calls", "Denied controlled model router paths remain blocked", "Controlled model router v2 release checklist")
