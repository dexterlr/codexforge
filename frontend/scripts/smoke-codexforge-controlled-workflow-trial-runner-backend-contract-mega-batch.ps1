param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
Write-Host "=== CodexForge Controlled Workflow Trial Runner Backend Contract Mega Batch smoke ==="
& (Join-Path $PSScriptRoot "smoke-codexforge-workflow-trial-runner-contract-boundary-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-workflow-trial-runner-input-envelope-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-workflow-trial-runner-output-envelope-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-workflow-trial-runner-state-machine-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-workflow-trial-runner-approval-lock-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-workflow-trial-runner-execution-block-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-workflow-trial-runner-replay-block-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-workflow-trial-runner-idempotency-contract-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-workflow-trial-runner-audit-envelope-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-workflow-trial-runner-redaction-envelope-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-workflow-trial-runner-observability-envelope-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-workflow-trial-runner-cost-envelope-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-workflow-trial-runner-rate-envelope-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-workflow-trial-runner-privacy-envelope-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-workflow-trial-runner-safety-envelope-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-workflow-trial-runner-provider-gateway-contract-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-workflow-trial-runner-asset-storage-contract-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-workflow-trial-runner-audio-storage-contract-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-workflow-trial-runner-storyboard-contract-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-workflow-trial-runner-keyframe-contract-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-workflow-trial-runner-timeline-contract-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-workflow-trial-runner-render-queue-contract-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-workflow-trial-runner-worker-orchestration-contract-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-workflow-trial-runner-artifact-export-contract-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-workflow-trial-runner-publish-gateway-contract-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-workflow-trial-runner-retry-policy-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-workflow-trial-runner-fallback-policy-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-workflow-trial-runner-recovery-policy-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-workflow-trial-runner-operator-review-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-workflow-trial-runner-dry-result-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-workflow-trial-runner-readiness-gate-wiring.ps1") -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot "smoke-codexforge-controlled-workflow-trial-runner-backend-contract-completion.ps1") -BaseUrl $BaseUrl
Write-Host "[OK] CodexForge Controlled Workflow Trial Runner Backend Contract Mega Batch smoke passed."
