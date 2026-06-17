param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 623 Connector Access Approval Boundary" `
  -ScriptFile "smoke-codexforge-connector-access-approval-boundary.ps1" `
  -Domain "src\lib\codexforge\connector-access-approval-boundary" `
  -Route "src\app\connector-access-approval-boundary" `
  -MainPanel "ConnectorAccessApprovalBoundaryPanel" `
  -CommandLabel "Go to Connector Access Approval Boundary" `
  -Modules @("connector-access-approval-boundary-types.ts", "connector-access-approval-boundary-summary.ts", "index.ts") `
  -Components @("ConnectorAccessApprovalBoundaryPanel.tsx", "index.ts") `
  -Exports @("buildConnectorAccessApprovalBoundaryStableKey", "buildConnectorAccessApprovalBoundary", "buildConnectorAccessApprovalBoundaries", "buildConnectorAccessApprovalBoundaryBoundary", "buildConnectorAccessApprovalBoundaryModel", "summarizeConnectorAccessApprovalBoundary", "CONNECTOR_ACCESS_APPROVAL_BOUNDARY_LANGUAGE") `
  -PhaseMarkers @("Connector access approval boundary", "Connector access approval boundary does not connect accounts or fetch connector data", "Connector access requires explicit operator approval", "Unsafe connector access stays blocked", "Connector groups", "Data scope checklist") `
  -PlainEnglish @("Connector boundary identity", "Account/permission checklist", "Fetch/mutation checklist", "Redaction/audit checklist", "Denied connector actions", "Unresolved connector blockers", "Evidence boundary route", "Result review boundary route", "Next recommended action") `
  -RouteHref "/connector-access-approval-boundary"

Write-Host "[OK] CodexForge Phase 623 connector access approval boundary smoke passed."
