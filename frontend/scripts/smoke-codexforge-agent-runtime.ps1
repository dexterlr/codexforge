param(
  [string]$BaseUrl = "http://localhost:3000"
)

$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$runtimeDir = Join-Path $root "src/lib/codexforge/agents/runtime"
$agentIndex = Join-Path $root "src/lib/codexforge/agents/index.ts"
$allSmoke = Join-Path $PSScriptRoot "smoke-codexforge-all.ps1"

function Assert-True {
  param(
    [bool]$Condition,
    [string]$Message
  )

  if (-not $Condition) {
    throw "[FAIL] $Message"
  }
}

function Read-Text {
  param([string]$Path)
  return Get-Content -Raw -Path $Path
}

Write-Host "=== CodexForge Agent runtime smoke ==="
Write-Host "Base URL: $BaseUrl"

Assert-True (Test-Path $runtimeDir) "Runtime directory is missing."

$requiredFiles = @(
  "agent-types.ts",
  "agent-registry.ts",
  "agent-events.ts",
  "agent-context.ts",
  "agent-router.ts",
  "agent-orchestrator.ts",
  "agent-review.ts",
  "agent-episode-bridge.ts",
  "agent-fixtures.ts",
  "index.ts"
)

foreach ($file in $requiredFiles) {
  Assert-True (Test-Path (Join-Path $runtimeDir $file)) "Missing runtime file: $file"
}

$indexText = Read-Text (Join-Path $runtimeDir "index.ts")
$requiredExports = @(
  "buildCodexForgeAgentRuntimeRegistry",
  "getCodexForgeAgentRuntimeProfile",
  "listCodexForgeAgentRuntimeProfiles",
  "createAgentRuntimeMessage",
  "createAgentRuntimeHandoff",
  "createAgentRuntimeReviewEvent",
  "mapAgentRuntimeMessageToBrainEvent",
  "buildAgentRuntimeContext",
  "summarizeAgentRuntimeContext",
  "selectAgentContextSignals",
  "routeCodexForgeAgentTask",
  "rankAgentRuntimeCandidates",
  "explainAgentRoute",
  "orchestrateCodexForgeAgentRuntime",
  "buildAgentRuntimePlan",
  "summarizeAgentRuntimePlan",
  "reviewAgentRuntimePlan",
  "buildAgentReviewChecklist",
  "summarizeAgentRuntimeReview",
  "createAgentRuntimeEpisode",
  "mapAgentPlanToEpisodeInput",
  "summarizeAgentEpisodeBridge",
  "buildAgentRuntimeFixtureTask",
  "buildAgentRuntimeFixtureContext",
  "buildAgentRuntimeFixturePlan"
)

foreach ($exportName in $requiredExports) {
  Assert-True ($indexText.Contains($exportName)) "Runtime index missing export: $exportName"
}

$agentIndexText = Read-Text $agentIndex
Assert-True ($agentIndexText.Contains('export * from "./runtime"')) "Agents index does not export runtime barrel."

$registryText = Read-Text (Join-Path $runtimeDir "agent-registry.ts")
$roles = @(
  "PlannerAgent",
  "ExecutionAgent",
  "VerificationAgent",
  "RefactorAgent",
  "ResearchAgent",
  "MemoryCuratorAgent",
  "GraphOptimizerAgent",
  "RiskAnalysisAgent"
)

foreach ($role in $roles) {
  Assert-True ($registryText.Contains($role)) "Registry missing role: $role"
}

$routerText = Read-Text (Join-Path $runtimeDir "agent-router.ts")
Assert-True ($routerText.Contains("routeCodexForgeAgentTask")) "Router missing routeCodexForgeAgentTask."
Assert-True ($routerText.Contains("explainAgentRoute")) "Router missing explainAgentRoute."

$orchestratorText = Read-Text (Join-Path $runtimeDir "agent-orchestrator.ts")
Assert-True ($orchestratorText.Contains("orchestrateCodexForgeAgentRuntime")) "Orchestrator missing orchestrateCodexForgeAgentRuntime."
Assert-True ($orchestratorText.Contains("buildAgentRuntimePlan")) "Orchestrator missing buildAgentRuntimePlan."

$reviewText = Read-Text (Join-Path $runtimeDir "agent-review.ts")
Assert-True ($reviewText.Contains("reviewAgentRuntimePlan")) "Review missing reviewAgentRuntimePlan."

$episodeText = Read-Text (Join-Path $runtimeDir "agent-episode-bridge.ts")
Assert-True ($episodeText.Contains("createAgentRuntimeEpisode")) "Episode bridge missing createAgentRuntimeEpisode."
Assert-True ($episodeText.Contains("mapAgentPlanToEpisodeInput")) "Episode bridge missing mapAgentPlanToEpisodeInput."

$eventsText = Read-Text (Join-Path $runtimeDir "agent-events.ts")
foreach ($eventConcept in @("appendOnly", "eventDriven", "message.created", "task.updated", "concept.synthesized", "failure.detected", "recovery.detected")) {
  Assert-True ($eventsText.Contains($eventConcept)) "Agent events missing runtime concept: $eventConcept"
}

$combinedRuntimeText = ($requiredFiles | ForEach-Object { Read-Text (Join-Path $runtimeDir $_) }) -join "`n"

$forbiddenPatterns = @(
  "brain-graph",
  "Math.random",
  "d3-force",
  "vector database",
  "vectordb",
  "embedding",
  "embeddings",
  "fetch(",
  "XMLHttpRequest",
  "WebSocket",
  "OpenAI",
  "api-key",
  "apiKey",
  "process.env",
  "from `"fs`"",
  "from 'fs'",
  "from `"path`"",
  "from 'path'",
  "child_process",
  [char]0xFFFD
)

foreach ($pattern in $forbiddenPatterns) {
  Assert-True (-not $combinedRuntimeText.Contains($pattern)) "Forbidden runtime pattern found: $pattern"
}

$fixturesText = Read-Text (Join-Path $runtimeDir "agent-fixtures.ts")
Assert-True ($fixturesText.Contains("high-risk-mutation")) "Fixtures missing high-risk mutation scenario."
Assert-True ($fixturesText.Contains("research")) "Fixtures missing research scenario."
Assert-True ($fixturesText.Contains("memory-curation")) "Fixtures missing memory-curation scenario."
Assert-True ($fixturesText.Contains("graph-optimization")) "Fixtures missing graph-optimization scenario."
Assert-True ($fixturesText.Contains("VerificationAgent")) "High-risk fixtures do not mention VerificationAgent."
Assert-True ($fixturesText.Contains("RiskAnalysisAgent")) "High-risk fixtures do not mention RiskAnalysisAgent."
Assert-True (-not $fixturesText.Contains("Date.now")) "Fixtures must not use Date.now."

$allSmokeText = Read-Text $allSmoke
$agentRuntimeCount = ([regex]::Matches($allSmokeText, 'Name\s*=\s*"Agent runtime"')).Count
Assert-True ($agentRuntimeCount -eq 1) "Managed smoke suite must include Agent runtime exactly once."
Assert-True ($allSmokeText.Contains("smoke-codexforge-agent-runtime.ps1")) "Managed smoke suite missing Agent runtime script path."

Write-Host "[OK] CodexForge Agent runtime smoke passed."
