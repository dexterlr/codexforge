param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-domain-pack-runner-smoke-helper.ps1") `
  -SmokeName "Phase 1625 Controlled Domain Pack Runner Release Candidate" `
  -ScriptFile "smoke-codexforge-controlled-domain-pack-runner-release-candidate.ps1" `
  -Domain "src\lib\codexforge\controlled-domain-pack-runner-release-candidate" `
  -Route "src\app\controlled-domain-pack-runner-release-candidate" `
  -MainPanel "DomainPackRunnerRoutePanel" `
  -CommandLabel "Go to Controlled Domain Pack Runner Release Candidate" `
  -RouteHref "/controlled-domain-pack-runner-release-candidate" `
  -Markers @("Controlled domain pack runner release candidate", "Controlled domain pack runner release candidate does not execute domain packs dispatch workers call local models models providers connectors write files apply diffs run commands create snapshots persist approvals create queues persist transactions persist evidence results audit promote memory release locks execute rollback retry recovery spawn processes bind ports install deploy start runtimes start game servers download mods download plugins send prompts store credentials probe localhost or write browser storage from the frontend", "Controlled domain pack runner release requires explicit operator approval", "Release candidate prepares CodexForge for backend-owned domain pack workflows without frontend domain execution", "Denied controlled domain pack runner paths remain blocked", "Controlled domain pack runner release checklist")
