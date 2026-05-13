param(
  [string]$BaseUrl = "http://localhost:3000"
)

$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$helperPath = Join-Path $root "src/lib/codexforge/chat/agent-runtime-visibility.ts"
$panelPath = Join-Path $root "src/lib/codexforge/chat/components/agent-runtime-panel.tsx"
$routePath = Join-Path $root "src/app/api/codexforge/chat/route.ts"
$structuredPath = Join-Path $root "src/lib/codexforge/chat/components/structured-reply-block.tsx"
$allSmokePath = Join-Path $PSScriptRoot "smoke-codexforge-all.ps1"

function Assert-True {
  param(
    [bool]$Condition,
    [string]$Message
  )

  if (-not $Condition) {
    throw "[FAIL] $Message"
  }

  Write-Host "[PASS] $Message"
}

function Read-Text {
  param([string]$Path)
  return Get-Content -Raw -Path $Path
}

Write-Host "=== CodexForge Agent runtime UX smoke ==="
Write-Host "Base URL: $BaseUrl"

Assert-True (Test-Path $helperPath) "agent-runtime-visibility.ts exists"
Assert-True (Test-Path $panelPath) "agent-runtime-panel.tsx exists"

$helper = Read-Text $helperPath
$panel = Read-Text $panelPath
$route = Read-Text $routePath
$structured = Read-Text $structuredPath
$allSmoke = Read-Text $allSmokePath

foreach ($exportName in @(
  "buildVisibleAgentRuntimeSummary",
  "summarizeVisibleAgentRuntime",
  "shouldShowAgentRuntimePanel"
)) {
  Assert-True ($helper.Contains($exportName)) "helper exports $exportName"
}

Assert-True ($panel.Contains("export function AgentRuntimePanel")) "panel exports AgentRuntimePanel"

foreach ($marker in @(
  "data-codexforge-agent-runtime-panel",
  "data-codexforge-agent-primary",
  "data-codexforge-agent-support",
  "data-codexforge-agent-reviewers",
  "data-codexforge-agent-readonly-steps",
  "data-codexforge-agent-approval-steps",
  "data-codexforge-agent-blocked-steps",
  "data-codexforge-agent-review-gates",
  "data-codexforge-agent-next-action"
)) {
  Assert-True ($panel.Contains($marker)) "panel includes marker $marker"
}

Assert-True ($route.Contains("agent-runtime-visibility")) "chat route imports agent runtime visibility"
Assert-True ($route.Contains("buildVisibleAgentRuntimeSummary")) "chat route uses buildVisibleAgentRuntimeSummary"
Assert-True ($route.Contains("orchestrateCodexForgeAgentRuntime")) "chat route uses Phase 5A orchestration"
Assert-True ($structured.Contains("agent-runtime-panel")) "structured reply UI imports AgentRuntimePanel"
Assert-True ($structured.Contains("<AgentRuntimePanel")) "structured reply UI renders AgentRuntimePanel"

foreach ($header in @(
  "x-codexforge-agent-runtime-primary",
  "x-codexforge-agent-runtime-reviewers",
  "x-codexforge-agent-runtime-confidence"
)) {
  Assert-True ($route.Contains($header)) "route exposes header $header"
}

foreach ($visibleText in @(
  "Agent runtime route",
  "Agent runtime review gates",
  "Agent runtime risks",
  "Agent runtime next safe action",
  "Why route was chosen",
  "Agent confidence"
)) {
  Assert-True ($route.Contains($visibleText)) "visible high-risk response can include $visibleText"
}

Assert-True ($route.Contains("VerificationAgent")) "high-risk mutation output includes VerificationAgent"
Assert-True ($route.Contains("RiskAnalysisAgent")) "high-risk mutation output includes RiskAnalysisAgent"
Assert-True ($route.Contains("Approval-required:")) "approval-required steps are surfaced separately"
Assert-True ($route.Contains("Read-only:")) "read-only steps are surfaced separately"
Assert-True ($route.Contains("Blocked:")) "blocked steps are surfaced separately"
Assert-True ($helper.Contains("approvalRequiredSteps")) "helper exposes approval-required steps separately"
Assert-True ($helper.Contains("blockedSteps")) "helper exposes blocked steps separately"

$combinedNewUx = "$helper`n$panel"
$forbiddenNewUxPatterns = @(
  "brain-graph",
  "Math.random",
  "d3-force",
  "vector database",
  "vectordb",
  "embedding",
  "embeddings",
  "fetch",
  "XMLHttpRequest",
  "WebSocket",
  "OpenAI",
  "api-key",
  "apiKey",
  "process.env",
  "from `"fs`"",
  "from 'fs'",
  "child_process",
  [char]0xFFFD
)

foreach ($pattern in $forbiddenNewUxPatterns) {
  Assert-True (-not $combinedNewUx.Contains($pattern)) "new UX/helper excludes forbidden pattern $pattern"
}

foreach ($pattern in @(
  ".execute(",
  "runTool",
  "executeTool",
  "apply-diff",
  "write-file",
  "run-command"
)) {
  Assert-True (-not $combinedNewUx.Contains($pattern)) "new agent runtime UX does not directly execute tools: $pattern"
}

Assert-True (-not $route.Contains("from `"@/lib/codexforge/brain/brain-graph`"")) "route does not import legacy brain-graph"
Assert-True (-not $helper.Contains("from `"@/lib/codexforge/brain/brain-graph`"")) "helper does not import legacy brain-graph"

$agentRuntimeUxCount = ([regex]::Matches($allSmoke, 'Name\s*=\s*"Agent runtime UX"')).Count
Assert-True ($agentRuntimeUxCount -eq 1) "managed smoke suite includes Agent runtime UX exactly once"
Assert-True ($allSmoke.Contains("smoke-codexforge-agent-runtime-ux.ps1")) "managed smoke suite includes Agent runtime UX script"

Write-Host "[OK] CodexForge Agent runtime UX smoke passed."
