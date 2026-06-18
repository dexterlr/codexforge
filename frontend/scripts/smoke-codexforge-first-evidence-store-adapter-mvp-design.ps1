param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 717 First Evidence Store Adapter MVP Design" `
  -ScriptFile "smoke-codexforge-first-evidence-store-adapter-mvp-design.ps1" `
  -Domain "src\lib\codexforge\first-evidence-store-adapter-mvp-design" `
  -Route "src\app\first-evidence-store-adapter-mvp-design" `
  -MainPanel "FirstEvidenceStoreAdapterMvpDesignPanel" `
  -CommandLabel "Go to First Evidence Store Adapter MVP Design" `
  -Modules @("first-evidence-store-adapter-mvp-design-model.ts", "index.ts") `
  -Components @("FirstEvidenceStoreAdapterMvpDesignPanel.tsx", "index.ts") `
  -Exports @("buildFirstEvidenceStoreAdapterMvpDesignStableKey", "buildFirstEvidenceStoreAdapterMvpDesign", "buildFirstEvidenceStoreAdapterMvpDesigns", "buildFirstEvidenceStoreAdapterMvpDesignBoundary", "buildFirstEvidenceStoreAdapterMvpDesignModel", "summarizeFirstEvidenceStoreAdapterMvpDesign", "FIRST_EVIDENCE_STORE_ADAPTER_MVP_DESIGN_LANGUAGE") `
  -PhaseMarkers @("First Evidence Store Adapter MVP Design", "First evidence store adapter MVP design does not store or ingest evidence", "Evidence store adapter MVP requires explicit operator approval", "Evidence interface shape", "Source/citation policy", "Redaction policy", "Retention policy", "Privacy/audit policy", "Test harness needs", "Implementation blockers") `
  -PlainEnglish @("First Evidence Store Adapter MVP Design identity", "MVP design only", "not implemented yet", "adapter not executable from UI", "What this unlocks next", "Next recommended action", "ready for implementation gates") `
  -RouteHref "/first-evidence-store-adapter-mvp-design"

Write-Host "[OK] CodexForge Phase 717 first evidence store adapter mvp design smoke passed."
