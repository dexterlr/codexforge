param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 1072 Guarded Domain Handoff Preview" `
  -ScriptFile "smoke-codexforge-guarded-domain-handoff-preview.ps1" `
  -Domain "src\lib\codexforge\guarded-domain-handoff-preview" `
  -Route "src\app\guarded-domain-handoff-preview" `
  -MainPanel "GuardedDomainHandoffPreviewPanel" `
  -CommandLabel "Go to Guarded Domain Handoff Preview" `
  -Modules @("guarded-domain-handoff-preview-model.ts", "index.ts") `
  -Components @("index.ts") `
  -Exports @("buildGuardedDomainHandoffPreviewStableKey", "buildGuardedDomainHandoffPreview", "buildGuardedDomainHandoffPreviewItems", "buildGuardedDomainHandoffPreviewBoundary", "buildGuardedDomainHandoffPreviewModel", "summarizeGuardedDomainHandoffPreview", "GUARDED_DOMAIN_HANDOFF_PREVIEW_LANGUAGE") `
  -PhaseMarkers @("Guarded domain handoff preview", "Guarded domain handoff preview does not execute domain adapters", "Domain handoff requires explicit operator approval", "Domain handoffs support games apps research creative trading automation data docs and integrations", "Denied guarded domain handoff paths remain blocked", "Guarded domain handoff checklist") `
  -PlainEnglish @("review-only", "not executable from UI", "approval required", "Guarded domain handoff preview does not execute domain adapters", "Domain handoff requires explicit operator approval", "Denied guarded domain handoff paths remain blocked") `
  -RouteHref "/guarded-domain-handoff-preview"

Write-Host "[OK] CodexForge Phase 1072 Guarded Domain Handoff Preview smoke passed."
