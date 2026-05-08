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
