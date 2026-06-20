param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 919 Model Router Evidence Capture Review" `
  -ScriptFile "smoke-codexforge-model-router-evidence-capture-review.ps1" `
  -Domain "src\lib\codexforge\model-router-evidence-capture-review" `
  -Route "src\app\model-router-evidence-capture-review" `
  -MainPanel "ModelRouterEvidenceCaptureReviewPanel" `
  -CommandLabel "Go to Model Router Evidence Capture Review" `
  -Modules @("model-router-evidence-capture-review-model.ts", "index.ts") `
  -Components @("ModelRouterEvidenceCaptureReviewPanel.tsx", "index.ts") `
  -Exports @("buildModelRouterEvidenceCaptureReviewStableKey", "buildModelRouterEvidenceCaptureReview", "buildModelRouterEvidenceCaptureReviewItems", "buildModelRouterEvidenceCaptureReviewBoundary", "buildModelRouterEvidenceCaptureReviewModel", "summarizeModelRouterEvidenceCaptureReview", "MODEL_ROUTER_EVIDENCE_CAPTURE_REVIEW_LANGUAGE") `
  -PhaseMarkers @("Model router evidence capture review", "Model router evidence capture review does not persist model outputs", "Evidence capture requires explicit operator approval", "Model outputs return through shared evidence review", "Denied evidence capture paths remain blocked", "Model evidence capture checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Model router evidence capture review does not persist model outputs", "Evidence capture requires explicit operator approval", "Denied evidence capture paths remain blocked") `
  -RouteHref "/model-router-evidence-capture-review"

Write-Host "[OK] CodexForge Phase 919 model router evidence capture review smoke passed."
