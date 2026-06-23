param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-command-runner-safety-v2-smoke-helper.ps1") `
  -SmokeName "Phase 1513 Controlled Command Runner Safety v2 Release Candidate" `
  -ScriptFile "smoke-codexforge-controlled-command-runner-safety-v2-release-candidate.ps1" `
  -Domain "src\lib\codexforge\controlled-command-runner-safety-v2-release-candidate" `
  -Route "src\app\controlled-command-runner-safety-v2-release-candidate" `
  -MainPanel "CommandRunnerSafetyV2RoutePanel" `
  -CommandLabel "Go to Controlled Command Runner Safety v2 Release Candidate" `
  -RouteHref "/controlled-command-runner-safety-v2-release-candidate" `
  -Markers @("Controlled command runner safety v2 release candidate", "Controlled command runner safety v2 release candidate does not call models providers connectors write files apply diffs run commands create snapshots persist approvals create queues persist transactions persist evidence results audit promote memory release locks execute rollback retry recovery spawn processes bind ports install deploy start runtimes or write browser storage from the frontend", "Controlled command runner safety v2 release requires explicit operator approval", "Release candidate prepares CodexForge for backend-owned guarded command execution without frontend command execution", "Denied controlled command runner safety paths remain blocked", "Controlled command runner safety release checklist")
