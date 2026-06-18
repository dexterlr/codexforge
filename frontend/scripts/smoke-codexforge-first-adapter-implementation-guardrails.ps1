param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 726 First Adapter Implementation Guardrails" `
  -ScriptFile "smoke-codexforge-first-adapter-implementation-guardrails.ps1" `
  -Domain "src\lib\codexforge\first-adapter-implementation-guardrails" `
  -Route "src\app\first-adapter-implementation-guardrails" `
  -MainPanel "FirstAdapterImplementationGuardrailsPanel" `
  -CommandLabel "Go to First Adapter Implementation Guardrails" `
  -Modules @("first-adapter-implementation-guardrails-model.ts", "index.ts") `
  -Components @("FirstAdapterImplementationGuardrailsPanel.tsx", "index.ts") `
  -Exports @("buildFirstAdapterImplementationGuardrailsStableKey", "buildFirstAdapterImplementationGuardrails", "buildFirstAdapterImplementationGuardrailsItems", "buildFirstAdapterImplementationGuardrailsBoundary", "buildFirstAdapterImplementationGuardrailsModel", "summarizeFirstAdapterImplementationGuardrails", "FIRST_ADAPTER_IMPLEMENTATION_GUARDRAILS_LANGUAGE") `
  -PhaseMarkers @("First Adapter Implementation Guardrails", "First adapter implementation guardrails do not implement or execute adapters", "Adapter implementation guardrails require explicit operator approval before enforcement", "Cross-adapter approval", "Audit guardrails", "Redaction guardrails", "Path guardrails", "Command guardrails", "Provider guardrails", "Connector guardrails", "Automation guardrails", "Storage guardrails", "Recovery guardrails", "Export guardrails", "Implementation blockers") `
  -PlainEnglish @("First Adapter Implementation Guardrails identity", "MVP design only", "not implemented yet", "adapter not executable from UI", "What this unlocks next", "Next recommended action", "ready for implementation gates") `
  -RouteHref "/first-adapter-implementation-guardrails"

Write-Host "[OK] CodexForge Phase 726 first adapter implementation guardrails smoke passed."
