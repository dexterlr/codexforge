param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-end-to-end-video-creation-dry-run-smoke-helper.ps1")

Invoke-CodexForgeEndToEndVideoCreationDryRunSmoke `
  -SmokeName "Phase 2833 Video Dry Run Storyboard Plan Wiring" `
  -ScriptFile "smoke-codexforge-video-dry-run-storyboard-plan-wiring.ps1" `
  -Route "video-dry-run-storyboard-plan-wiring" `
  -CommandLabel "Go to Video Dry Run Storyboard Plan Wiring" `
  -RouteHref "/video-dry-run-storyboard-plan-wiring" `
  -Phase "2833" `
  -Title "Video Dry Run Storyboard Plan Wiring"
