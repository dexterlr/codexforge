param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-guarded-apply-run-dry-run-smoke-helper.ps1") `
  -SmokeName "Phase 1340 Dry-Run Run Packet" `
  -ScriptFile "smoke-codexforge-dry-run-run-packet.ps1" `
  -Domain "src\lib\codexforge\dry-run-run-packet" `
  -Route "src\app\dry-run-run-packet" `
  -MainPanel "GuardedApplyRunDryRunRoutePanel" `
  -CommandLabel "Go to Dry-Run Run Packet" `
  -RouteHref "/dry-run-run-packet" `
  -Markers @("Dry-run run packet", "Dry-run run packet does not run commands", "Dry-run run packet requires explicit operator approval", "Run packet previews command allowlist arguments working directory environment names evidence result audit queue and recovery requirements", "Denied dry-run run packet paths remain blocked", "Dry-run run packet checklist")
