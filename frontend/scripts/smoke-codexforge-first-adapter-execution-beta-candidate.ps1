param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

& (Join-Path $PSScriptRoot "codexforge-universal-execution-phase-smoke-helper.ps1") `
  -PhaseName "Phase 777 First Adapter Execution Beta Candidate" `
  -ScriptFile "smoke-codexforge-first-adapter-execution-beta-candidate.ps1" `
  -Domain "src\lib\codexforge\first-adapter-execution-beta-candidate" `
  -Route "src\app\first-adapter-execution-beta-candidate" `
  -MainPanel "FirstAdapterExecutionBetaCandidatePanel" `
  -CommandLabel "Go to First Adapter Execution Beta Candidate" `
  -Modules @("first-adapter-execution-beta-candidate-model.ts", "index.ts") `
  -Components @("FirstAdapterExecutionBetaCandidatePanel.tsx", "index.ts") `
  -Exports @("buildFirstAdapterExecutionBetaCandidateStableKey", "buildFirstAdapterExecutionBetaCandidate", "buildFirstAdapterExecutionBetaCandidateItems", "buildFirstAdapterExecutionBetaCandidateBoundary", "buildFirstAdapterExecutionBetaCandidateModel", "summarizeFirstAdapterExecutionBetaCandidate", "FIRST_ADAPTER_EXECUTION_BETA_CANDIDATE_LANGUAGE") `
  -PhaseMarkers @("First Adapter Execution Beta Candidate", "First adapter execution beta candidate does not execute adapters from UI", "First adapter execution beta requires explicit operator approval", "actual file write boundary", "command runner boundary", "local runtime boundary", "evidence store boundary", "result store boundary", "recovery boundary", "packaging boundary", "project scaffold boundary", "approval packet", "dry-run packet", "audit packet", "failure packet", "sandbox packet", "validation packet", "operator runbook", "deferred families", "provider/model", "connector", "automation", "creative", "research", "chatbot", "game/server", "unresolved blockers", "next recommended action") `
  -PlainEnglish @("First Adapter Execution Beta Candidate identity", "boundary packet only", "not executable from UI", "approval required", "dry-run required", "audit required", "does not execute adapters from UI") `
  -RouteHref "/first-adapter-execution-beta-candidate"

Write-Host "[OK] CodexForge Phase 777 first adapter execution beta candidate smoke passed."
