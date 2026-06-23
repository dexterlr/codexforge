param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-local-model-bridge-smoke-helper.ps1") `
  -SmokeName "Phase 1577 Controlled Local Model Bridge Release Candidate" `
  -ScriptFile "smoke-codexforge-controlled-local-model-bridge-release-candidate.ps1" `
  -Domain "src\lib\codexforge\controlled-local-model-bridge-release-candidate" `
  -Route "src\app\controlled-local-model-bridge-release-candidate" `
  -MainPanel "LocalModelBridgeRoutePanel" `
  -CommandLabel "Go to Controlled Local Model Bridge Release Candidate" `
  -RouteHref "/controlled-local-model-bridge-release-candidate" `
  -Markers @("Controlled local model bridge release candidate", "Controlled local model bridge release candidate does not call local models models providers connectors write files apply diffs run commands create snapshots persist approvals create queues persist transactions persist evidence results audit promote memory release locks execute rollback retry recovery spawn processes bind ports install deploy start runtimes send prompts store credentials probe localhost or write browser storage from the frontend", "Controlled local model bridge release requires explicit operator approval", "Release candidate prepares CodexForge for backend-owned local model bridge without frontend model calls", "Denied controlled local model bridge paths remain blocked", "Controlled local model bridge release checklist")
