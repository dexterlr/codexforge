param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 767 Actual Recovery Boundary" `
  -ScriptFile "smoke-codexforge-actual-recovery-boundary.ps1" `
  -Domain "src\lib\codexforge\actual-recovery-boundary" `
  -Route "src\app\actual-recovery-boundary" `
  -MainPanel "ActualRecoveryBoundaryPanel" `
  -CommandLabel "Go to Actual Recovery Boundary" `
  -Modules @("actual-recovery-boundary-model.ts", "index.ts") `
  -Components @("ActualRecoveryBoundaryPanel.tsx", "index.ts") `
  -Exports @("buildActualRecoveryBoundaryStableKey", "buildActualRecoveryBoundary", "buildActualRecoveryBoundaryItems", "buildActualRecoveryBoundaryBoundary", "buildActualRecoveryBoundaryModel", "summarizeActualRecoveryBoundary", "ACTUAL_RECOVERY_BOUNDARY_LANGUAGE") `
  -PhaseMarkers @("Actual Recovery Boundary", "Actual recovery boundary does not trigger recovery or retry from UI", "Recovery execution requires explicit operator approval", "Boundary packet fields", "failure source", "recovery mode", "retry scope", "rollback target", "cleanup plan", "escalation path", "approval state", "audit link", "evidence/result links", "blocked actions") `
  -PlainEnglish @("Actual Recovery Boundary identity", "boundary packet only", "not executable from UI", "approval required", "dry-run required", "audit required", "does not trigger recovery or retry from UI") `
  -RouteHref "/actual-recovery-boundary"

Write-Host "[OK] CodexForge Phase 767 actual recovery boundary smoke passed."
