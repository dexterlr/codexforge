param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
Write-Host '=== CodexForge First Real Provider Call Guard Mega Batch smoke ==='
& (Join-Path $PSScriptRoot 'smoke-codexforge-first-real-provider-call-guard-boundary-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-first-real-provider-call-intent-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-first-real-provider-call-approval-packet-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-first-real-provider-call-credential-reference-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-first-real-provider-call-token-reference-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-first-real-provider-call-request-envelope-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-first-real-provider-call-response-envelope-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-first-real-provider-call-error-envelope-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-first-real-provider-call-dry-lock-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-first-real-provider-call-execution-block-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-first-real-provider-call-preflight-checklist-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-first-real-provider-call-prompt-redaction-preview-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-first-real-provider-call-cost-estimate-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-first-real-provider-call-rate-estimate-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-first-real-provider-call-privacy-gate-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-first-real-provider-call-safety-gate-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-first-real-provider-call-region-policy-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-first-real-provider-call-data-retention-policy-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-first-real-provider-call-timeout-policy-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-first-real-provider-call-retry-policy-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-first-real-provider-call-fallback-policy-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-first-real-provider-call-recovery-policy-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-first-real-provider-call-audit-packet-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-first-real-provider-call-observability-trace-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-first-real-provider-call-result-review-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-first-real-provider-call-provider-registry-handoff-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-first-real-provider-call-routing-handoff-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-first-real-provider-call-execution-bridge-handoff-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-first-real-provider-call-runner-handoff-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-first-real-provider-call-operator-review-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-first-real-provider-call-readiness-gate-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-first-real-provider-call-guard-completion.ps1') -BaseUrl $BaseUrl
Write-Host '[OK] CodexForge First Real Provider Call Guard Mega Batch smoke passed.'
