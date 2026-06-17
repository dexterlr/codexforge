param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 671 Connector Adapter Contract Review" `
  -ScriptFile "smoke-codexforge-connector-adapter-contract-review.ps1" `
  -Domain "src\lib\codexforge\connector-adapter-contract-review" `
  -Route "src\app\connector-adapter-contract-review" `
  -MainPanel "ConnectorAdapterContractReviewPanel" `
  -CommandLabel "Go to Connector Adapter Contract Review" `
  -Modules @("connector-adapter-contract-review-model.ts", "index.ts") `
  -Components @("ConnectorAdapterContractReviewPanel.tsx", "index.ts") `
  -Exports @("buildConnectorAdapterContractReviewStableKey", "buildConnectorAdapterContractReview", "buildConnectorAdapterContractReviews", "buildConnectorAdapterContractReviewBoundary", "buildConnectorAdapterContractReviewModel", "summarizeConnectorAdapterContractReview", "CONNECTOR_ADAPTER_CONTRACT_REVIEW_LANGUAGE") `
  -PhaseMarkers @("Connector adapter contract review", "Connector adapter contract review does not connect accounts or fetch connector data", "Connector adapters require explicit operator approval", "Adapter not executable from UI", "Account permission", "Data scope", "Fetch/mutation", "Redaction/audit", "Result review", "Denied connector adapter actions") `
  -PlainEnglish @("Connector adapter contract review identity", "Account permission", "Data scope", "Fetch/mutation", "Redaction/audit", "Result review", "Denied connector adapter actions", "Unresolved connector adapter blockers", "What this unlocks later", "Next recommended action") `
  -RouteHref "/connector-adapter-contract-review"

Write-Host "[OK] CodexForge Phase 671 connector adapter contract review smoke passed."
