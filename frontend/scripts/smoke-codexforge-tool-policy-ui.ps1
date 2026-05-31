param(
  [string]$BaseUrl = "http://localhost:3000"
)

$ErrorActionPreference = "Stop"

function Assert-Contains {
  param(
    [Parameter(Mandatory = $true)][string]$Content,
    [Parameter(Mandatory = $true)][string]$Needle,
    [Parameter(Mandatory = $true)][string]$Name
  )

  if (-not $Content.Contains($Needle)) {
    throw "[FAIL] Missing expected $Name marker: $Needle"
  }

  Write-Host "[PASS] $Name"
}

function Assert-NotContains {
  param(
    [Parameter(Mandatory = $true)][string]$Content,
    [Parameter(Mandatory = $true)][string]$Needle,
    [Parameter(Mandatory = $true)][string]$Name
  )

  if ($Content.Contains($Needle)) {
    throw "[FAIL] Found forbidden $Name marker: $Needle"
  }

  Write-Host "[PASS] $Name"
}

Write-Host ""
Write-Host "=== CodexForge tool-policy UI smoke ==="
Write-Host "Base URL: $BaseUrl"

$guardPath = "src\lib\codexforge\tools\tool-policy-guard.ts"
$visibilityPath = "src\lib\codexforge\tools\tool-policy-visibility.ts"
$panelPath = "src\lib\codexforge\chat\components\tool-policy-decision-panel.tsx"
$blockPath = "src\lib\codexforge\chat\components\structured-reply-block.tsx"
$routePath = "src\app\api\codexforge\tools\execute\route.ts"
$lifecyclePath = "src\lib\codexforge\tools\tool-approval-lifecycle.ts"
$retryPath = "src\lib\codexforge\tools\tool-approval-retry.ts"
$serverPath = "src\lib\codexforge\tools\server.ts"
$renderJobPath = "src\lib\codexforge\tools\render-job.ts"

foreach ($path in @($guardPath, $visibilityPath, $panelPath, $blockPath, $routePath, $lifecyclePath, $retryPath, $serverPath, $renderJobPath)) {
  if (-not (Test-Path $path)) {
    throw "[FAIL] Missing expected file: $path"
  }

  Write-Host "[PASS] file exists: $path"
}

$guard = Get-Content -Raw $guardPath
$visibility = Get-Content -Raw $visibilityPath
$panel = Get-Content -Raw $panelPath
$block = Get-Content -Raw $blockPath
$route = Get-Content -Raw $routePath
$lifecycle = Get-Content -Raw $lifecyclePath
$retry = Get-Content -Raw $retryPath
$server = Get-Content -Raw $serverPath
$renderJob = Get-Content -Raw $renderJobPath

Assert-Contains $guard "approvalId: string | null;" "guard decision approval id contract"
Assert-Contains $guard "approvalState: CodexForgeToolApprovalState;" "guard decision approval state contract"
Assert-Contains $guard "function buildPendingApprovalId" "guard deterministic pending approval id helper"
Assert-Contains $guard "codexforge-approval" "guard approval id namespace"

Assert-Contains $lifecycle "CodexForgeToolApprovalLifecycleStatus" "approval lifecycle status type"
Assert-Contains $lifecycle "buildApprovedToolApprovalState" "approval lifecycle approved state builder"
Assert-Contains $lifecycle "buildDeniedToolApprovalState" "approval lifecycle denied state builder"
Assert-Contains $lifecycle "buildToolApprovalLifecycleSnapshot" "approval lifecycle snapshot builder"

Assert-Contains $retry "buildToolApprovalRetryRequest" "retry request builder"
Assert-Contains $retry "retryApprovedToolPolicy" "approved retry execute route helper"
Assert-Contains $retry "/api/codexforge/tools/execute" "retry uses execute route"
Assert-Contains $retry "approvalState" "retry forwards approval state"
Assert-Contains $retry "approvalRetry" "retry marks approval retry input"
Assert-Contains $retry "CodexForgeToolApprovalReplayRequest" "retry replay request contract"
Assert-Contains $retry "replayRequest" "retry accepts replay request"
Assert-Contains $retry "...replayInput" "retry preserves original tool input"
Assert-Contains $retry "...replayContext" "retry preserves original tool context"
Assert-Contains $retry "request: CodexForgeToolApprovalRetryRequest" "retry result exposes replayed request"
Assert-Contains $retry 'kind: "accepted"' "retry accepted result discriminant"
Assert-Contains $retry 'kind: "rejected"' "retry rejected result discriminant"
Assert-Contains $retry 'kind: "error"' "retry error result discriminant"
Assert-Contains $retry "return response.ok" "retry branches by HTTP outcome"
Assert-Contains $server '| "render-job"' "server exposes render-job type"
Assert-Contains $server '"render-job": renderJobTool' "server registers render-job executable"
Assert-Contains $renderJob 'local-safe-simulated' "render-job uses local-safe simulated adapter"
Assert-Contains $renderJob 'no Blender process or external renderer was launched' "render-job declares no side effects"

Assert-Contains $visibility "CodexForgeVisibleToolPolicy" "visible policy type"
Assert-Contains $visibility "approvalId?: string | null;" "visible approval id contract"
Assert-Contains $visibility "requiresApproval?: boolean;" "visible requires approval contract"
Assert-Contains $visibility "approvalSatisfied?: boolean;" "visible approval satisfied contract"
Assert-Contains $visibility "Approval ID:" "visible approval id audit"
Assert-Contains $visibility "approvalId: decision.approvalId" "visible maps approval id"
Assert-Contains $visibility "requiresApproval: decision.requiresApproval" "visible maps requires approval"
Assert-Contains $visibility "approvalSatisfied: decision.approvalSatisfied" "visible maps approval satisfied"

Assert-Contains $panel "ToolPolicyDecisionPanel" "panel component"
Assert-Contains $panel "data-codexforge-tool-policy-panel" "panel root marker"
Assert-Contains $panel "data-codexforge-tool-policy-tone" "panel tone marker"
Assert-Contains $panel "data-codexforge-tool-policy-approval-id" "panel approval id marker"
Assert-Contains $panel "Approval ID:" "panel approval id label"
Assert-Contains $panel "data-codexforge-tool-policy-approval-id-label" "panel approval id label marker"
Assert-Contains $panel "data-codexforge-tool-policy-actions" "panel approval actions marker"
Assert-Contains $panel "data-codexforge-tool-policy-approve" "panel approve action marker"
Assert-Contains $panel "data-codexforge-tool-policy-deny" "panel deny action marker"
Assert-Contains $panel "data-codexforge-tool-policy-retry" "panel retry action marker"
Assert-Contains $panel "data-codexforge-tool-policy-approval-state" "panel approval state marker"
Assert-Contains $panel "onApproveTool" "panel approve callback contract"
Assert-Contains $panel "onDenyTool" "panel deny callback contract"
Assert-Contains $panel "onRetryTool" "panel retry callback contract"
Assert-Contains $panel "retryApprovedToolPolicy" "panel invokes approved retry helper"
Assert-Contains $panel "data-codexforge-tool-policy-retry-result" "panel retry result marker"
Assert-Contains $panel "data-codexforge-tool-policy-retry-status" "panel retry status marker"
Assert-Contains $panel "const [retrying, setRetrying] = useState(false);" "panel retrying state hook"
Assert-Contains $panel "setRetryResult" "panel retry result state setter"
Assert-Contains $panel 'kind: "error"' "panel retry error discriminant"
Assert-Contains $panel "if (!approvedPayload || !visible) return;" "panel retry visible null guard"
Assert-Contains $panel "replayRequest?: CodexForgeToolApprovalReplayRequest | null;" "panel replay request prop"
Assert-Contains $panel "replayRequest," "panel forwards replay request"
Assert-Contains $panel "compact = false," "panel destructuring anchor"
Assert-Contains $panel "replayRequest," "panel destructures replay request"
Assert-Contains $panel "replayRequest?: CodexForgeToolApprovalReplayRequest | null;" "panel replay request typed prop"

Assert-Contains $route "serializeVisibleToolPolicy" "execute route serializes visible policy"
Assert-Contains $route "approvalId?: string | null;" "execute route error meta approval id contract"
Assert-Contains $route "approvalId: toolPolicyDecision.approvalId" "execute route maps approval id"
Assert-Contains $route "requiresApproval: toolPolicyDecision.requiresApproval" "execute route maps requires approval"
Assert-Contains $route "policySource: toolPolicyDecision.source" "execute route maps policy source"
Assert-Contains $route "type ExecuteToolReplayRequest" "execute route replay request type"
Assert-Contains $route "buildToolPolicyReplayRequest" "execute route replay helper"
Assert-Contains $route "toolPolicyReplayRequest" "execute route serializes replay request"
Assert-Contains $route "input: normalizeInput(body.input)" "execute route preserves replay input"
Assert-Contains $route "context: normalizeInput(body.context)" "execute route preserves replay context"

Write-Host "[OK] CodexForge tool-policy UI smoke passed."

Assert-Contains $block "getStructuredToolPolicyReplayRequest" "structured block replay extraction helper"
Assert-Contains $block "isToolApprovalReplayRequest" "structured block replay guard"
Assert-Contains $block "toolPolicyReplayRequest" "structured block reads replay request"
Assert-Contains $block "replayRequest={getStructuredToolPolicyReplayRequest(structured)}" "structured block passes replay request"
$resultPanelSourcePath = "src\lib\codexforge\chat\components\tool-execution-result-panel.tsx"
$decisionPanelSourcePath = "src\lib\codexforge\chat\components\tool-policy-decision-panel.tsx"
$resultPanelSource = Get-Content -Raw $resultPanelSourcePath
$decisionPanelSource = Get-Content -Raw $decisionPanelSourcePath

Assert-Contains $resultPanelSource "export function ToolExecutionResultPanel" "result panel component export marker"
Assert-Contains $resultPanelSource "data-codexforge-tool-execution-result-panel" "result panel root marker"
Assert-Contains $resultPanelSource "Approval id" "result panel approval id label"
Assert-Contains $resultPanelSource "Policy source" "result panel policy source label"
Assert-Contains $resultPanelSource "Result summary" "result panel summary label"
Assert-Contains $resultPanelSource "Job stage" "result panel job stage label"
Assert-Contains $resultPanelSource "Adapter" "result panel adapter label"
Assert-Contains $resultPanelSource "local-safe-render-job" "result panel local-safe adapter marker"
Assert-Contains $resultPanelSource "sideEffect" "result panel sideEffect marker"
Assert-Contains $resultPanelSource "{toolName} - {resultStatus}" "result panel ASCII status separator"
foreach ($markerCode in @(0x00C3, 0x0192, 0x00C2, 0xFFFD)) {
  $marker = [string][char]$markerCode
  Assert-NotContains $resultPanelSource $marker "result panel mojibake marker absent: U+$($markerCode.ToString("X4"))"
}
Assert-Contains $decisionPanelSource "tool-execution-result-panel" "decision panel imports result panel"
Assert-Contains $decisionPanelSource "<ToolExecutionResultPanel" "decision panel renders result panel"
$toolExecutionEventsSource = Get-Content -Raw "src\lib\codexforge\chat\tool-execution-events.ts"
$chatHookSource = Get-Content -Raw "src\lib\codexforge\chat\use-codexforge-chat.ts"
$chatMessageSource = Get-Content -Raw "src\lib\codexforge\chat\components\chat-message.tsx"
$rendererSource = Get-Content -Raw "src\lib\codexforge\chat\client-renderers.tsx"
$structuredBlockSource = Get-Content -Raw "src\lib\codexforge\chat\components\structured-reply-block.tsx"
$engineCardSource = Get-Content -Raw "src\lib\codexforge\chat\components\engine-state-card.tsx"
$decisionPanelSource = Get-Content -Raw "src\lib\codexforge\chat\components\tool-policy-decision-panel.tsx"
$resultPanelSource = Get-Content -Raw "src\lib\codexforge\chat\components\tool-execution-result-panel.tsx"

Assert-Contains $toolExecutionEventsSource "export type CodexForgeToolExecutionEvent" "durable tool execution event type"
Assert-Contains $toolExecutionEventsSource "buildCodexForgeToolExecutionEventFromRetryResult" "durable event builder"
Assert-Contains $toolExecutionEventsSource "isSuccessfulCodexForgeToolExecutionRetryResult" "successful retry guard"
Assert-Contains $toolExecutionEventsSource "local-safe-render-job" "durable event local-safe adapter marker"
Assert-Contains $toolExecutionEventsSource "sideEffect" "durable event sideEffect marker"
Assert-Contains $decisionPanelSource "onToolExecutionResult?.(executionEvent)" "decision panel emits durable execution event"
Assert-Contains $structuredBlockSource "onToolExecutionResult" "structured block forwards execution event callback"
Assert-Contains $rendererSource "onToolExecutionResult" "structured renderer forwards execution event callback"
Assert-Contains $chatMessageSource "onToolExecutionResult" "chat message forwards execution event callback"
Assert-Contains $chatHookSource "toolExecutionEvents" "chat hook stores durable execution events"
Assert-Contains $chatHookSource "recordToolExecutionResult" "chat hook exposes execution event recorder"
Assert-Contains $engineCardSource "latestToolExecutionEvent" "engine card accepts latest execution event"
Assert-Contains $engineCardSource "data-codexforge-persisted-tool-execution-result" "engine card renders persisted execution event"
Assert-Contains $engineCardSource "data-codexforge-tool-execution-event-count" "engine card renders execution event count"
Assert-Contains $resultPanelSource "executionEvent?: CodexForgeToolExecutionEvent" "result panel accepts persisted execution event"
Assert-Contains $resultPanelSource "visibleContentJson" "result panel renders persisted content JSON"

# Durable approved tool execution event hardening.
Assert-Contains $toolExecutionEventsSource "approvalId: string;" "durable event captures approval id"
Assert-Contains $toolExecutionEventsSource "policySource: string;" "durable event captures policy source"
Assert-Contains $toolExecutionEventsSource "approvalSatisfied: boolean;" "durable event captures approval satisfied"
Assert-Contains $toolExecutionEventsSource "executionMode: string;" "durable event captures execution mode"
Assert-Contains $toolExecutionEventsSource "sideEffect: string;" "durable event captures side effect"
Assert-Contains $toolExecutionEventsSource "contentJson: JsonRecord;" "durable event captures content JSON"
Assert-Contains $toolExecutionEventsSource "retryResult: unknown;" "durable event keeps retry payload"
Assert-Contains $toolExecutionEventsSource "retry.body" "durable builder reads retry body"
Assert-Contains $toolExecutionEventsSource "body.result" "durable builder reads execution result"
Assert-Contains $toolExecutionEventsSource "content.json" "durable builder reads result content JSON"
Assert-Contains $toolExecutionEventsSource "toolPolicySummary" "durable builder reads visible policy summary"
Assert-Contains $toolExecutionEventsSource "approvalSatisfied" "durable builder preserves approval state"
Assert-Contains $toolExecutionEventsSource "MAX_TOOL_EXECUTION_EVENTS" "durable event cap constant exists"
Assert-Contains $toolExecutionEventsSource "meta.approvalSatisfied === true" "durable builder reads meta approval satisfied as boolean"
Assert-Contains $toolExecutionEventsSource "toolPolicy.approvalSatisfied === true" "durable builder reads policy approval satisfied as boolean"
Assert-Contains $toolExecutionEventsSource "toolPolicySummary.approvalSatisfied === true" "durable builder reads visible approval satisfied as boolean"
Assert-NotContains $toolExecutionEventsSource "asBooleanOrNull" "durable builder does not keep nullable approval satisfied helper"
Assert-NotContains $toolExecutionEventsSource "approvalSatisfied: boolean | null;" "durable event approval satisfied is never nullable"

# Callback chain hardening: approved retry result must travel from panel to durable hook state.
Assert-Contains $decisionPanelSource "buildCodexForgeToolExecutionEventFromRetryResult(result)" "decision panel builds durable event from retry result"
Assert-Contains $decisionPanelSource "onToolExecutionResult?.(executionEvent)" "decision panel forwards durable event callback"
Assert-Contains $structuredBlockSource "onToolExecutionResult?: (event: CodexForgeToolExecutionEvent) => void" "structured block types execution event callback"
Assert-Contains $structuredBlockSource "onToolExecutionResult={onToolExecutionResult}" "structured block forwards callback to policy panel"
Assert-Contains $rendererSource "onToolExecutionResult?: (event: CodexForgeToolExecutionEvent) => void" "renderer types execution event callback"
Assert-Contains $rendererSource "onToolExecutionResult={onToolExecutionResult}" "renderer forwards callback to structured block"
Assert-Contains $chatMessageSource "onToolExecutionResult?: (event: CodexForgeToolExecutionEvent) => void" "chat message types execution event callback"
Assert-Contains $chatMessageSource "renderStructuredReply(message.structured, onToolExecutionResult)" "chat message forwards callback into renderer"

# Hook persistence hardening: events must survive state transitions and reload.
Assert-Contains $chatHookSource "toolExecutionEvents: CodexForgeToolExecutionEvent[]" "execution state includes durable events"
Assert-Contains $chatHookSource "normalizeToolExecutionEvents(raw.toolExecutionEvents)" "stored execution events normalize on load"
Assert-Contains $chatHookSource "toolExecutionEvents: []," "idle execution initializes durable events"
Assert-Contains $chatHookSource "toolExecutionEvents: previous.toolExecutionEvents" "start execution preserves durable events"
Assert-Contains $chatHookSource "toolExecutionEvents: [" "recording appends durable event"
Assert-Contains $chatHookSource ".slice(-MAX_TOOL_EXECUTION_EVENTS)" "durable events are capped"
Assert-Contains $chatHookSource "latestToolExecutionEvent: executionState.toolExecutionEvents.at(-1) ?? null" "hook exposes latest durable event"
Assert-Contains $chatHookSource "toolExecutionEvents: executionState.toolExecutionEvents" "hook exposes durable event list"
Assert-Contains $chatHookSource "recordToolExecutionResult," "hook returns durable recorder"

# UI persistence hardening: stored event must be visible outside the transient retry panel.
Assert-Contains $engineCardSource "latestToolExecutionEvent?: CodexForgeToolExecutionEvent | null" "engine card accepts latest durable event prop"
Assert-Contains $engineCardSource "toolExecutionEventCount?: number" "engine card accepts durable event count"
Assert-Contains $engineCardSource "data-codexforge-tool-execution-event-count" "engine card exposes durable event count marker"
Assert-Contains $engineCardSource "data-codexforge-persisted-tool-execution-result" "engine card exposes persisted result marker"
Assert-Contains $engineCardSource "executionEvent={latestToolExecutionEvent}" "engine card renders persisted event through result panel"
Assert-Contains $resultPanelSource "executionEvent?.retryResult ?? retryResult" "result panel prefers persisted event retry payload"
Assert-Contains $resultPanelSource "const visibleContentJson = executionEvent?.contentJson ?? contentJson;" "result panel prefers persisted content JSON"
Assert-Contains $resultPanelSource "executionEvent?.metadata.adapter" "result panel prefers persisted adapter"
Assert-Contains $resultPanelSource "executionEvent?.sideEffect" "result panel prefers persisted side effect"
Assert-Contains $resultPanelSource "data-codexforge-tool-execution-local-safe" "result panel renders local-safe marker"
Assert-Contains $resultPanelSource "Local-safe simulated execution. No side effects were performed." "result panel explains local-safe execution"

# Page integration hardening: the main AI page must wire both recording and display.
$pageSource = Get-Content -Raw "src\app\ai\page.tsx"
Assert-Contains $pageSource "recordToolExecutionResult" "AI page receives durable event recorder"
Assert-Contains $pageSource "onToolExecutionResult={recordToolExecutionResult}" "AI page wires durable recorder to chat messages"
Assert-Contains $pageSource "latestToolExecutionEvent={latestToolExecutionEvent}" "AI page wires latest durable event to engine card"
Assert-Contains $pageSource "toolExecutionEventCount={toolExecutionEvents.length}" "AI page wires durable event count to engine card"
