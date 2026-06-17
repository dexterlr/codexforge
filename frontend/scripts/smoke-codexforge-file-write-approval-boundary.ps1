param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 619 File Write Approval Boundary" `
  -ScriptFile "smoke-codexforge-file-write-approval-boundary.ps1" `
  -Domain "src\lib\codexforge\file-write-approval-boundary" `
  -Route "src\app\file-write-approval-boundary" `
  -MainPanel "FileWriteApprovalBoundaryPanel" `
  -CommandLabel "Go to File Write Approval Boundary" `
  -Modules @("file-write-approval-boundary-types.ts", "file-write-approval-boundary-summary.ts", "index.ts") `
  -Components @("FileWriteApprovalBoundaryPanel.tsx", "index.ts") `
  -Exports @("buildFileWriteApprovalBoundaryStableKey", "buildFileWriteApprovalBoundary", "buildFileWriteApprovalBoundaries", "buildFileWriteApprovalBoundaryBoundary", "buildFileWriteApprovalBoundaryModel", "summarizeFileWriteApprovalBoundary", "FILE_WRITE_APPROVAL_BOUNDARY_LANGUAGE") `
  -PhaseMarkers @("File write approval boundary", "File write approval boundary does not write files", "File writes require explicit operator approval", "Unsafe file writes stay blocked", "File operation groups", "Diff preview checklist") `
  -PlainEnglish @("File write boundary identity", "Create/update/delete/rename/move preview checklist", "Path allowlist/denylist checklist", "Rollback checklist", "Denied file actions", "Unresolved file write blockers", "Evidence boundary route", "Recovery boundary route", "Next recommended action") `
  -RouteHref "/file-write-approval-boundary"

Write-Host "[OK] CodexForge Phase 619 file write approval boundary smoke passed."
