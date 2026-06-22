param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-plan-diff-command-composer-smoke-helper.ps1") `
  -SmokeName "Phase 1438 Command Preview Packet" `
  -ScriptFile "smoke-codexforge-command-preview-packet.ps1" `
  -Domain "src\lib\codexforge\command-preview-packet" `
  -Route "src\app\command-preview-packet" `
  -MainPanel "PlanDiffCommandComposerRoutePanel" `
  -CommandLabel "Go to Command Preview Packet" `
  -RouteHref "/command-preview-packet" `
  -Markers @("Command preview packet", "Command preview packet does not run commands", "Command preview packet requires explicit operator approval", "Command preview packet lists build smoke validation lint test and hygiene command candidates as review-only commands", "Denied command preview paths remain blocked", "Command preview checklist")
