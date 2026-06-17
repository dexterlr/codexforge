param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 620 Command Execution Approval Boundary" `
  -ScriptFile "smoke-codexforge-command-execution-approval-boundary.ps1" `
  -Domain "src\lib\codexforge\command-execution-approval-boundary" `
  -Route "src\app\command-execution-approval-boundary" `
  -MainPanel "CommandExecutionApprovalBoundaryPanel" `
  -CommandLabel "Go to Command Execution Approval Boundary" `
  -Modules @("command-execution-approval-boundary-types.ts", "command-execution-approval-boundary-summary.ts", "index.ts") `
  -Components @("CommandExecutionApprovalBoundaryPanel.tsx", "index.ts") `
  -Exports @("buildCommandExecutionApprovalBoundaryStableKey", "buildCommandExecutionApprovalBoundary", "buildCommandExecutionApprovalBoundaries", "buildCommandExecutionApprovalBoundaryBoundary", "buildCommandExecutionApprovalBoundaryModel", "summarizeCommandExecutionApprovalBoundary", "COMMAND_EXECUTION_APPROVAL_BOUNDARY_LANGUAGE") `
  -PhaseMarkers @("Command execution approval boundary", "Command execution approval boundary does not run commands", "Command execution requires explicit operator approval", "Unsafe commands stay blocked", "Command risk groups", "Working-directory checklist") `
  -PlainEnglish @("Command execution boundary identity", "Command preview checklist", "Environment/secrets checklist", "Timeout/logging checklist", "Denied command actions", "Unresolved command blockers", "Local runtime boundary route", "Recovery boundary route", "Next recommended action") `
  -RouteHref "/command-execution-approval-boundary"

Write-Host "[OK] CodexForge Phase 620 command execution approval boundary smoke passed."
