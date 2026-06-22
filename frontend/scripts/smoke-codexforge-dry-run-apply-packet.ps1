param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-guarded-apply-run-dry-run-smoke-helper.ps1") `
  -SmokeName "Phase 1339 Dry-Run Apply Packet" `
  -ScriptFile "smoke-codexforge-dry-run-apply-packet.ps1" `
  -Domain "src\lib\codexforge\dry-run-apply-packet" `
  -Route "src\app\dry-run-apply-packet" `
  -MainPanel "GuardedApplyRunDryRunRoutePanel" `
  -CommandLabel "Go to Dry-Run Apply Packet" `
  -RouteHref "/dry-run-apply-packet" `
  -Markers @("Dry-run apply packet", "Dry-run apply packet does not write files or apply diffs", "Dry-run apply packet requires explicit operator approval", "Apply packet previews path guard diff rollback evidence result audit queue and recovery requirements", "Denied dry-run apply packet paths remain blocked", "Dry-run apply packet checklist")
