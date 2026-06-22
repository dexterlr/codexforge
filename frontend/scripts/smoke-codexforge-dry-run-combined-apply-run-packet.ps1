param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-guarded-apply-run-dry-run-smoke-helper.ps1") `
  -SmokeName "Phase 1341 Dry-Run Combined Apply Run Packet" `
  -ScriptFile "smoke-codexforge-dry-run-combined-apply-run-packet.ps1" `
  -Domain "src\lib\codexforge\dry-run-combined-apply-run-packet" `
  -Route "src\app\dry-run-combined-apply-run-packet" `
  -MainPanel "GuardedApplyRunDryRunRoutePanel" `
  -CommandLabel "Go to Dry-Run Combined Apply Run Packet" `
  -RouteHref "/dry-run-combined-apply-run-packet" `
  -Markers @("Dry-run combined apply run packet", "Dry-run combined apply run packet does not write files or run commands", "Dry-run combined apply run packet requires explicit operator approval", "Combined packet previews apply then run ordering evidence chaining result capture queue state and recovery requirements", "Denied dry-run combined apply run paths remain blocked", "Dry-run combined apply run checklist")
