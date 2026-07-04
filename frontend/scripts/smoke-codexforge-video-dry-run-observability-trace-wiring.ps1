param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-end-to-end-video-creation-dry-run-smoke-helper.ps1")

Invoke-CodexForgeEndToEndVideoCreationDryRunSmoke `
  -SmokeName "Phase 2850 Video Dry Run Observability Trace Wiring" `
  -ScriptFile "smoke-codexforge-video-dry-run-observability-trace-wiring.ps1" `
  -Route "video-dry-run-observability-trace-wiring" `
  -CommandLabel "Go to Video Dry Run Observability Trace Wiring" `
  -RouteHref "/video-dry-run-observability-trace-wiring" `
  -Phase "2850" `
  -Title "Video Dry Run Observability Trace Wiring"
