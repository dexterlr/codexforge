param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 727 First Adapter Implementation Test Harness" `
  -ScriptFile "smoke-codexforge-first-adapter-implementation-test-harness.ps1" `
  -Domain "src\lib\codexforge\first-adapter-implementation-test-harness" `
  -Route "src\app\first-adapter-implementation-test-harness" `
  -MainPanel "FirstAdapterImplementationTestHarnessPanel" `
  -CommandLabel "Go to First Adapter Implementation Test Harness" `
  -Modules @("first-adapter-implementation-test-harness-model.ts", "index.ts") `
  -Components @("FirstAdapterImplementationTestHarnessPanel.tsx", "index.ts") `
  -Exports @("buildFirstAdapterImplementationTestHarnessStableKey", "buildFirstAdapterImplementationTestHarness", "buildFirstAdapterImplementationTestHarnesses", "buildFirstAdapterImplementationTestHarnessBoundary", "buildFirstAdapterImplementationTestHarnessModel", "summarizeFirstAdapterImplementationTestHarness", "FIRST_ADAPTER_IMPLEMENTATION_TEST_HARNESS_LANGUAGE") `
  -PhaseMarkers @("First Adapter Implementation Test Harness", "First adapter implementation test harness does not run adapters or tests from UI", "Adapter implementation tests require explicit operator approval", "File adapter harness", "Command adapter harness", "Runtime adapter harness", "Provider adapter harness", "Connector adapter harness", "Automation adapter harness", "Evidence/result adapter harness", "Recovery adapter harness", "Packaging adapter harness", "Creative adapter harness", "Research adapter harness", "Chatbot adapter harness", "Game/server adapter harness", "Implementation blockers") `
  -PlainEnglish @("First Adapter Implementation Test Harness identity", "MVP design only", "not implemented yet", "adapter not executable from UI", "What this unlocks next", "Next recommended action", "ready for implementation gates") `
  -RouteHref "/first-adapter-implementation-test-harness"

Write-Host "[OK] CodexForge Phase 727 first adapter implementation test harness smoke passed."
