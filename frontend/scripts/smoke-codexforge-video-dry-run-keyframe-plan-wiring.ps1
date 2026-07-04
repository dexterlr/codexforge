param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-end-to-end-video-creation-dry-run-smoke-helper.ps1")

Invoke-CodexForgeEndToEndVideoCreationDryRunSmoke `
  -SmokeName "Phase 2834 Video Dry Run Keyframe Plan Wiring" `
  -ScriptFile "smoke-codexforge-video-dry-run-keyframe-plan-wiring.ps1" `
  -Route "video-dry-run-keyframe-plan-wiring" `
  -CommandLabel "Go to Video Dry Run Keyframe Plan Wiring" `
  -RouteHref "/video-dry-run-keyframe-plan-wiring" `
  -Phase "2834" `
  -Title "Video Dry Run Keyframe Plan Wiring"
