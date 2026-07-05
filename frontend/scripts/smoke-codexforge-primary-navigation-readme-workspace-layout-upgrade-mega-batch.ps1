param([string]$BaseUrl = 'http://localhost:3000')

$ErrorActionPreference = 'Stop'
Write-Host '=== CodexForge Primary Navigation README Workspace Layout Upgrade Mega Batch smoke ==='
& (Join-Path $PSScriptRoot 'smoke-codexforge-primary-navigation-upgrade-boundary-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-primary-navigation-product-areas-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-primary-navigation-operator-cockpit-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-primary-navigation-generate-area-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-primary-navigation-projects-area-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-primary-navigation-assets-area-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-primary-navigation-providers-area-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-primary-navigation-workflows-area-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-primary-navigation-trading-area-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-primary-navigation-audit-runs-area-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-primary-navigation-settings-safety-area-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-primary-navigation-developer-checkpoints-area-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-workspace-layout-action-first-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-workspace-layout-generation-chat-first-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-workspace-layout-approval-state-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-workspace-layout-output-preview-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-workspace-layout-safety-audit-panel-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-workspace-layout-technical-details-lower-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-readme-god-tier-project-overview-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-readme-current-status-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-readme-live-readiness-boundary-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-readme-roadmap-next-steps-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-docs-handoff-god-tier-update-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-docs-checkpoint-history-preservation-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-docs-operator-runbook-update-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-docs-developer-runbook-update-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-docs-safety-boundary-summary-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-docs-live-provider-bridge-summary-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-docs-navigation-model-summary-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-docs-next-session-resume-point-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-product-shell-readiness-gate-wiring.ps1') -BaseUrl $BaseUrl
& (Join-Path $PSScriptRoot 'smoke-codexforge-primary-navigation-readme-workspace-layout-upgrade-completion.ps1') -BaseUrl $BaseUrl
Write-Host '[OK] CodexForge Primary Navigation README Workspace Layout Upgrade Mega Batch smoke passed.'
