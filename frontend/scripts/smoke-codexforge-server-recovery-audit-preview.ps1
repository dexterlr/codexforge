param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-game-server-builder-smoke-helper.ps1") `
  -SmokeName "Phase 1606 Server Recovery Audit Preview" `
  -ScriptFile "smoke-codexforge-server-recovery-audit-preview.ps1" `
  -Domain "src\lib\codexforge\server-recovery-audit-preview" `
  -Route "src\app\server-recovery-audit-preview" `
  -MainPanel "GameServerBuilderRoutePanel" `
  -CommandLabel "Go to Server Recovery Audit Preview" `
  -RouteHref "/server-recovery-audit-preview" `
  -Markers @("Server recovery audit preview", "Server recovery audit preview does not execute rollback retry restore or recovery from the UI", "Server recovery audit preview requires explicit operator approval", "Server recovery audit preview shows rollback configs restore snapshots stop server retry validation explain failure manual review safety stop and audit continuity", "Denied server recovery audit paths remain blocked", "Server recovery audit checklist")
