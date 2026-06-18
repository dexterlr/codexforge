param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 687 Connector Adapter Preview" `
  -ScriptFile "smoke-codexforge-connector-adapter-preview.ps1" `
  -Domain "src\\lib\\codexforge\\connector-adapter-preview" `
  -Route "src\\app\\connector-adapter-preview" `
  -MainPanel "ConnectorAdapterPreviewPanel" `
  -CommandLabel "Go to Connector Adapter Preview" `
  -Modules @("connector-adapter-preview-model.ts", "index.ts") `
  -Components @("ConnectorAdapterPreviewPanel.tsx", "index.ts") `
  -Exports @("buildConnectorAdapterPreviewStableKey", "buildConnectorAdapterPreview", "buildConnectorAdapterPreviews", "buildConnectorAdapterPreviewBoundary", "buildConnectorAdapterPreviewModel", "summarizeConnectorAdapterPreview", "CONNECTOR_ADAPTER_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Connector adapter preview", "Connector adapter preview does not connect accounts or fetch connector data", "Connector execution requires explicit operator approval", "Connector scope", "Account permissions", "Fetch/mutation type", "Redaction/audit", "Result review", "Denied actions", "no live adapter implementation", "no adapter execution", "no adapter preview execution") `
  -PlainEnglish @("Connector adapter preview identity", "Connector scope", "Account permissions", "Fetch/mutation type", "Redaction/audit", "Result review", "Denied actions", "Unresolved blockers", "What this unlocks later", "Next recommended action") `
  -RouteHref "/connector-adapter-preview"

Write-Host "[OK] CodexForge Phase 687 connector adapter preview smoke passed."
