param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-end-to-end-video-creation-dry-run-smoke-helper.ps1")

Invoke-CodexForgeEndToEndVideoCreationDryRunSmoke `
  -SmokeName "Phase 2836 Video Dry Run Render Queue Handoff Wiring" `
  -ScriptFile "smoke-codexforge-video-dry-run-render-queue-handoff-wiring.ps1" `
  -Route "video-dry-run-render-queue-handoff-wiring" `
  -CommandLabel "Go to Video Dry Run Render Queue Handoff Wiring" `
  -RouteHref "/video-dry-run-render-queue-handoff-wiring" `
  -Phase "2836" `
  -Title "Video Dry Run Render Queue Handoff Wiring"
