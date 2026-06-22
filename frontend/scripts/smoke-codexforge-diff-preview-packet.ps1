param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-plan-diff-command-composer-smoke-helper.ps1") `
  -SmokeName "Phase 1437 Diff Preview Packet" `
  -ScriptFile "smoke-codexforge-diff-preview-packet.ps1" `
  -Domain "src\lib\codexforge\diff-preview-packet" `
  -Route "src\app\diff-preview-packet" `
  -MainPanel "PlanDiffCommandComposerRoutePanel" `
  -CommandLabel "Go to Diff Preview Packet" `
  -RouteHref "/diff-preview-packet" `
  -Markers @("Diff preview packet", "Diff preview packet does not apply diffs", "Diff preview packet requires explicit operator approval", "Diff preview packet shows proposed changes path guard status rollback readiness evidence needs and denied paths", "Denied diff preview paths remain blocked", "Diff preview checklist")
