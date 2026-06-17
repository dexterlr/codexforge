param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 670 Provider Model Adapter Contract Review" `
  -ScriptFile "smoke-codexforge-provider-model-adapter-contract-review.ps1" `
  -Domain "src\lib\codexforge\provider-model-adapter-contract-review" `
  -Route "src\app\provider-model-adapter-contract-review" `
  -MainPanel "ProviderModelAdapterContractReviewPanel" `
  -CommandLabel "Go to Provider Model Adapter Contract Review" `
  -Modules @("provider-model-adapter-contract-review-model.ts", "index.ts") `
  -Components @("ProviderModelAdapterContractReviewPanel.tsx", "index.ts") `
  -Exports @("buildProviderModelAdapterContractReviewStableKey", "buildProviderModelAdapterContractReview", "buildProviderModelAdapterContractReviews", "buildProviderModelAdapterContractReviewBoundary", "buildProviderModelAdapterContractReviewModel", "summarizeProviderModelAdapterContractReview", "PROVIDER_MODEL_ADAPTER_CONTRACT_REVIEW_LANGUAGE") `
  -PhaseMarkers @("Provider/model adapter contract review", "Provider/model adapter contract review does not call providers or models", "Provider/model adapters require explicit operator approval", "Adapter not executable from UI", "Prompt input contract", "Redaction", "Cost/rate-limit", "Output handling", "Result review", "Denied provider/model adapter actions") `
  -PlainEnglish @("Provider/model adapter contract review identity", "Prompt input contract", "Redaction", "Cost/rate-limit", "Output handling", "Result review", "Denied provider/model adapter actions", "Unresolved provider/model adapter blockers", "What this unlocks later", "Next recommended action") `
  -RouteHref "/provider-model-adapter-contract-review"

Write-Host "[OK] CodexForge Phase 670 provider/model adapter contract review smoke passed."
