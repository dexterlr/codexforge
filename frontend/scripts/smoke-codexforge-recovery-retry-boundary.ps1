param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 627 Recovery Retry Boundary" `
  -ScriptFile "smoke-codexforge-recovery-retry-boundary.ps1" `
  -Domain "src\lib\codexforge\recovery-retry-boundary" `
  -Route "src\app\recovery-retry-boundary" `
  -MainPanel "RecoveryRetryBoundaryPanel" `
  -CommandLabel "Go to Recovery Retry Boundary" `
  -Modules @("recovery-retry-boundary-types.ts", "recovery-retry-boundary-summary.ts", "index.ts") `
  -Components @("RecoveryRetryBoundaryPanel.tsx", "index.ts") `
  -Exports @("buildRecoveryRetryBoundaryStableKey", "buildRecoveryRetryBoundary", "buildRecoveryRetryBoundaries", "buildRecoveryRetryBoundaryBoundary", "buildRecoveryRetryBoundaryModel", "summarizeRecoveryRetryBoundary", "RECOVERY_RETRY_BOUNDARY_LANGUAGE") `
  -PhaseMarkers @("Recovery retry boundary", "Recovery/retry boundary does not trigger recovery or retry", "Recovery/retry actions require explicit operator approval", "Unsafe recovery shortcuts stay blocked", "Recovery groups", "Retry checklist") `
  -PlainEnglish @("Recovery/retry boundary identity", "Rollback checklist", "Escalation checklist", "Operator decision checklist", "Denied recovery actions", "Unresolved recovery blockers", "Packaging/export boundary route", "Workflow profile registry route", "Next recommended action") `
  -RouteHref "/recovery-retry-boundary"

Write-Host "[OK] CodexForge Phase 627 recovery retry boundary smoke passed."
