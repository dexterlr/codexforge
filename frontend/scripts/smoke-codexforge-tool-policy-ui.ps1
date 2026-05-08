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
$routePath = "src\app\api\codexforge\tools\execute\route.ts"

foreach ($path in @($guardPath, $visibilityPath, $panelPath, $routePath)) {
  if (-not (Test-Path $path)) {
    throw "[FAIL] Missing expected file: $path"
  }

  Write-Host "[PASS] file exists: $path"
}

$guard = Get-Content -Raw $guardPath
$visibility = Get-Content -Raw $visibilityPath
$panel = Get-Content -Raw $panelPath
$route = Get-Content -Raw $routePath

Assert-Contains $guard "approvalId: string | null;" "guard decision approval id contract"
Assert-Contains $guard "approvalState: CodexForgeToolApprovalState;" "guard decision approval state contract"
Assert-Contains $guard "function buildPendingApprovalId" "guard deterministic pending approval id helper"
Assert-Contains $guard "codexforge-approval" "guard approval id namespace"

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

Assert-Contains $route "serializeVisibleToolPolicy" "execute route serializes visible policy"
Assert-Contains $route "approvalId?: string | null;" "execute route error meta approval id contract"
Assert-Contains $route "approvalId: toolPolicyDecision.approvalId" "execute route maps approval id"
Assert-Contains $route "requiresApproval: toolPolicyDecision.requiresApproval" "execute route maps requires approval"
Assert-Contains $route "policySource: toolPolicyDecision.source" "execute route maps policy source"

Write-Host "[OK] CodexForge tool-policy UI smoke passed."
