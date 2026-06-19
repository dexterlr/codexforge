param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 776 Adapter Execution Operator Runbook" `
  -ScriptFile "smoke-codexforge-adapter-execution-operator-runbook.ps1" `
  -Domain "src\lib\codexforge\adapter-execution-operator-runbook" `
  -Route "src\app\adapter-execution-operator-runbook" `
  -MainPanel "AdapterExecutionOperatorRunbookPanel" `
  -CommandLabel "Go to Adapter Execution Operator Runbook" `
  -Modules @("adapter-execution-operator-runbook-model.ts", "index.ts") `
  -Components @("AdapterExecutionOperatorRunbookPanel.tsx", "index.ts") `
  -Exports @("buildAdapterExecutionOperatorRunbookStableKey", "buildAdapterExecutionOperatorRunbook", "buildAdapterExecutionOperatorRunbookItems", "buildAdapterExecutionOperatorRunbookBoundary", "buildAdapterExecutionOperatorRunbookModel", "summarizeAdapterExecutionOperatorRunbook", "ADAPTER_EXECUTION_OPERATOR_RUNBOOK_LANGUAGE") `
  -PhaseMarkers @("Adapter Execution Operator Runbook", "Adapter execution operator runbook does not execute adapters", "Operator execution requires explicit operator approval", "operator responsibilities", "approval flow", "dry-run flow", "execution observation", "failure response", "rollback", "validation", "release/handoff", "unresolved blockers") `
  -PlainEnglish @("Adapter Execution Operator Runbook identity", "boundary packet only", "not executable from UI", "approval required", "dry-run required", "audit required", "does not execute adapters") `
  -RouteHref "/adapter-execution-operator-runbook"

Write-Host "[OK] CodexForge Phase 776 adapter execution operator runbook smoke passed."
