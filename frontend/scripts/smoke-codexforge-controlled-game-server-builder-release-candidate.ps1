param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-game-server-builder-smoke-helper.ps1") `
  -SmokeName "Phase 1609 Controlled Game Server Builder Release Candidate" `
  -ScriptFile "smoke-codexforge-controlled-game-server-builder-release-candidate.ps1" `
  -Domain "src\lib\codexforge\controlled-game-server-builder-release-candidate" `
  -Route "src\app\controlled-game-server-builder-release-candidate" `
  -MainPanel "GameServerBuilderRoutePanel" `
  -CommandLabel "Go to Controlled Game Server Builder Release Candidate" `
  -RouteHref "/controlled-game-server-builder-release-candidate" `
  -Markers @("Controlled game server builder release candidate", "Controlled game server builder release candidate does not dispatch workers call local models models providers connectors write files apply diffs run commands create snapshots persist approvals create queues persist transactions persist evidence results audit promote memory release locks execute rollback retry recovery spawn processes bind ports install deploy start runtimes start game servers download mods download plugins send prompts store credentials probe localhost or write browser storage from the frontend", "Controlled game server builder release requires explicit operator approval", "Release candidate prepares CodexForge for backend-owned game server domain workflows without frontend server execution", "Denied controlled game server builder paths remain blocked", "Controlled game server builder release checklist")
