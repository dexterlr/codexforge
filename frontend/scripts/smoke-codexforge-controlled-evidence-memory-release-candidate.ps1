param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-evidence-memory-smoke-helper.ps1") `
  -SmokeName "Phase 1465 Controlled Evidence Memory Release Candidate" `
  -ScriptFile "smoke-codexforge-controlled-evidence-memory-release-candidate.ps1" `
  -Domain "src\lib\codexforge\controlled-evidence-memory-release-candidate" `
  -Route "src\app\controlled-evidence-memory-release-candidate" `
  -MainPanel "EvidenceMemoryRoutePanel" `
  -CommandLabel "Go to Controlled Evidence Memory Release Candidate" `
  -RouteHref "/controlled-evidence-memory-release-candidate" `
  -Markers @("Controlled evidence memory release candidate", "Controlled evidence memory release candidate does not call models providers connectors write files apply diffs run commands persist approvals create queues persist evidence results audit promote memory or write browser storage from the frontend", "Controlled evidence memory release requires explicit operator approval", "Release candidate prepares CodexForge for backend-owned evidence memory without hidden persistence", "Denied controlled evidence memory paths remain blocked", "Controlled evidence memory release checklist")
