param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-end-to-end-video-creation-dry-run-smoke-helper.ps1")

Invoke-CodexForgeEndToEndVideoCreationDryRunSmoke `
  -SmokeName "Phase 2835 Video Dry Run Timeline Plan Wiring" `
  -ScriptFile "smoke-codexforge-video-dry-run-timeline-plan-wiring.ps1" `
  -Route "video-dry-run-timeline-plan-wiring" `
  -CommandLabel "Go to Video Dry Run Timeline Plan Wiring" `
  -RouteHref "/video-dry-run-timeline-plan-wiring" `
  -Phase "2835" `
  -Title "Video Dry Run Timeline Plan Wiring"
