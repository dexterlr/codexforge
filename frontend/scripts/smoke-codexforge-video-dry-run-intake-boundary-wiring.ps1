param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-end-to-end-video-creation-dry-run-smoke-helper.ps1")

Invoke-CodexForgeEndToEndVideoCreationDryRunSmoke `
  -SmokeName "Phase 2826 Video Dry Run Intake Boundary Wiring" `
  -ScriptFile "smoke-codexforge-video-dry-run-intake-boundary-wiring.ps1" `
  -Route "video-dry-run-intake-boundary-wiring" `
  -CommandLabel "Go to Video Dry Run Intake Boundary Wiring" `
  -RouteHref "/video-dry-run-intake-boundary-wiring" `
  -Phase "2826" `
  -Title "Video Dry Run Intake Boundary Wiring"
