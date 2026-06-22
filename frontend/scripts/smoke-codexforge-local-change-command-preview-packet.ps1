param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-unified-cockpit-smoke-helper.ps1") `
  -SmokeName "Phase 1230 Local Change Command Preview Packet" `
  -ScriptFile "smoke-codexforge-local-change-command-preview-packet.ps1" `
  -Domain "src\lib\codexforge\local-change-command-preview-packet" `
  -Route "src\app\local-change-command-preview-packet" `
  -MainPanel "FirstLocalChangeTrialRoutePanel" `
  -CommandLabel "Go to Local Change Command Preview Packet" `
  -RouteHref "/local-change-command-preview-packet" `
  -Markers @("Local change command preview packet", "Local change command preview packet does not run commands", "Local change command preview requires explicit operator approval before future execution", "Command preview packet shows allowlist arguments working directory environment evidence and result readiness", "Denied local change command preview paths remain blocked", "Local change command preview checklist")
