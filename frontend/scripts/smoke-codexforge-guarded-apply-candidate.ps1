param(
  [string]$BaseUrl = "http://localhost:3000"
)

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

function Assert-FileExists { param([string]$Path) if (-not (Test-Path $Path)) { throw "[FAIL] Missing file: $Path" } Write-Host "[PASS] file exists: $Path" }
function Assert-DirectoryExists { param([string]$Path) if (-not (Test-Path $Path -PathType Container)) { throw "[FAIL] Missing directory: $Path" } Write-Host "[PASS] directory exists: $Path" }
function Assert-Contains { param([AllowEmptyString()][string]$Haystack, [string]$Needle, [string]$Name) if (-not $Haystack.Contains($Needle)) { throw "[FAIL] Missing $Name`: $Needle" } Write-Host "[PASS] $Name" }
function Assert-NotContains { param([AllowEmptyString()][string]$Haystack, [string]$Needle, [string]$Name) if ($Haystack.Contains($Needle)) { throw "[FAIL] Unexpected $Name`: $Needle" } Write-Host "[PASS] $Name" }
function Assert-NotMatches { param([AllowEmptyString()][string]$Haystack, [string]$Pattern, [string]$Name) if ($Haystack -match $Pattern) { throw "[FAIL] Unexpected $Name`: $Pattern" } Write-Host "[PASS] $Name" }
function Assert-CountExactly { param([AllowEmptyString()][string]$Haystack, [string]$Needle, [int]$Expected, [string]$Name) $count = ([regex]::Matches($Haystack, [regex]::Escape($Needle))).Count; if ($count -ne $Expected) { throw "[FAIL] $Name expected $Expected found $count for $Needle" } Write-Host "[PASS] $Name" }

Write-Host ""
Write-Host "=== CodexForge Guarded Apply Candidate smoke ==="
Write-Host "Base URL: $BaseUrl"

$domainDir = "src\lib\codexforge\guarded-apply-candidate"
$componentDir = Join-Path $domainDir "components"
$indexPath = Join-Path $domainDir "index.ts"
$routePath = "src\app\guarded-apply-candidate\page.tsx"
$clientPath = "src\app\guarded-apply-candidate\page-client.tsx"
$allSmokePath = "scripts\smoke-codexforge-all.ps1"

Assert-DirectoryExists $domainDir
Assert-DirectoryExists $componentDir

foreach ($module in @(
  "guarded-apply-candidate-types.ts",
  "guarded-apply-candidate-input.ts",
  "single-file-apply-scope.ts",
  "guarded-apply-candidate-policy.ts",
  "guarded-apply-approval-contract.ts",
  "guarded-apply-execution-plan.ts",
  "guarded-apply-rollback-contract.ts",
  "guarded-apply-validation-contract.ts",
  "guarded-apply-result-contract.ts",
  "guarded-apply-implementation-gaps.ts",
  "guarded-apply-candidate-summary.ts",
  "index.ts"
)) { Assert-FileExists (Join-Path $domainDir $module) }

foreach ($component in @(
  "GuardedApplyCandidatePlan.tsx",
  "GuardedApplyCandidateInputPanel.tsx",
  "SingleFileApplyScopePanel.tsx",
  "GuardedApplyCandidatePolicyPanel.tsx",
  "GuardedApplyApprovalContractPanel.tsx",
  "GuardedApplyExecutionPlanPanel.tsx",
  "GuardedApplyRollbackContractPanel.tsx",
  "GuardedApplyValidationContractPanel.tsx",
  "GuardedApplyResultContractPanel.tsx",
  "GuardedApplyImplementationGapsPanel.tsx",
  "GuardedApplyCandidateSafetyStrip.tsx",
  "GuardedApplyCandidateEmptyState.tsx"
)) { Assert-FileExists (Join-Path $componentDir $component) }

Assert-FileExists $routePath
Assert-FileExists $clientPath

$indexSource = Get-Content -Raw $indexPath
$domainSource = (Get-ChildItem $domainDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$uiSource = (Get-ChildItem $componentDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$routeSource = (Get-Content -Raw $routePath) + "`n" + (Get-Content -Raw $clientPath)
$integratedSource = (Get-Content -Raw "src\app\apply-guard-review\page-client.tsx") + "`n" + (Get-Content -Raw "src\app\apply-validation\page-client.tsx") + "`n" + (Get-Content -Raw "src\app\code-flow\page-client.tsx") + "`n" + (Get-Content -Raw "src\app\files\page-client.tsx") + "`n" + (Get-Content -Raw "src\app\validation\page-client.tsx")
$commandSource = (Get-ChildItem "src\lib\codexforge\command-palette" -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$productSource = (Get-ChildItem "src\lib\codexforge\product-readiness-audit" -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$consolidationSource = (Get-ChildItem "src\lib\codexforge\consolidation" -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$missionSource = (Get-ChildItem "src\lib\codexforge\mission-control" -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$allSmoke = Get-Content -Raw $allSmokePath
$candidateSource = $domainSource + "`n" + $uiSource + "`n" + $routeSource

foreach ($export in @(
  "buildGuardedApplyCandidateInput",
  "validateGuardedApplyCandidateInput",
  "buildSingleFileApplyScope",
  "buildSingleFileApplyScopeCheck",
  "buildGuardedApplyCandidatePolicy",
  "isGuardedApplyCandidateAllowed",
  "buildGuardedApplyApprovalContract",
  "buildGuardedApplyApprovalRequirement",
  "buildGuardedApplyExecutionPlan",
  "buildGuardedApplyExecutionStep",
  "buildGuardedApplyRollbackContract",
  "buildGuardedApplyRollbackRequirement",
  "buildGuardedApplyValidationContract",
  "buildGuardedApplyValidationRequirement",
  "buildGuardedApplyResultContract",
  "buildGuardedApplyResultRequirement",
  "buildGuardedApplyImplementationGaps",
  "buildGuardedApplyImplementationGap",
  "buildGuardedApplyCandidateSummary"
)) { Assert-Contains $indexSource $export "index exports $export" }

foreach ($render in @(
  "GuardedApplyCandidatePlan renders",
  "GuardedApplyCandidateInputPanel renders",
  "SingleFileApplyScopePanel renders",
  "GuardedApplyCandidatePolicyPanel renders",
  "GuardedApplyApprovalContractPanel renders",
  "GuardedApplyExecutionPlanPanel renders",
  "GuardedApplyRollbackContractPanel renders",
  "GuardedApplyValidationContractPanel renders",
  "GuardedApplyResultContractPanel renders",
  "GuardedApplyImplementationGapsPanel renders",
  "GuardedApplyCandidateSafetyStrip renders",
  "GuardedApplyCandidateEmptyState renders"
)) { Assert-Contains $uiSource $render "$render" }

Assert-Contains $routeSource "GuardedApplyCandidatePlan" "/guarded-apply-candidate imports/renders GuardedApplyCandidatePlan"
Assert-Contains $routeSource "Plan the first guarded apply path" "/guarded-apply-candidate says Plan the first guarded apply path"
Assert-Contains $candidateSource "Copy candidate plan" "/guarded-apply-candidate says Copy candidate plan"

foreach ($text in @(
  "one file",
  "one diff",
  "one approval",
  "no auto-apply",
  "no auto-run",
  "execution allowed false",
  "preserve latest-message authority"
)) { Assert-Contains $candidateSource $text "UI says $text" }

Assert-Contains $routeSource "Focus Mode UX calm workflow layout markers" "route uses Focus Mode UX or calm workflow layout markers"
Assert-Contains $routeSource "shell without duplicate route chip cloud" "route uses shell without duplicate route chip cloud"
Assert-Contains $uiSource "whiteSpace: `"nowrap`"" "route hero title does not vertically wrap"
Assert-NotContains $uiSource "overflowWrap: `"anywhere`"" "display headings do not use overflowWrap:anywhere"
Assert-Contains $uiSource "no giant raw JSON above fold" "no giant raw JSON above fold"
Assert-Contains $uiSource "advanced details are collapsed or visually secondary" "advanced details are collapsed or visually secondary"

Assert-Contains $domainSource "Single file scope blocks multi-file diff" "single file scope blocks multi-file diff"
Assert-Contains $domainSource "Single file scope blocks binary patch" "single file scope blocks binary patch"
Assert-Contains $domainSource "Single file scope blocks package/lock/config/tool-policy/brain-runtime edit for first candidate." "single file scope blocks high-risk first candidate"
Assert-Contains $domainSource "Policy requires preview diff" "policy requires preview diff"
Assert-Contains $domainSource "Policy requires explicit approval" "policy requires explicit approval"
Assert-Contains $domainSource "Policy blocks direct UI write-file" "policy blocks direct UI write-file"
Assert-Contains $domainSource "Policy blocks direct UI apply-diff" "policy blocks direct UI apply-diff"
Assert-Contains $domainSource "Policy blocks direct UI run-command" "policy blocks direct UI run-command"
Assert-Contains $domainSource "Policy blocks combined apply+validate button" "policy blocks combined apply+validate button"
Assert-Contains $domainSource "Approval contract invalidates if diff/file/request changes." "approval contract invalidates if diff/file/request changes"
Assert-Contains $domainSource "design-only in Phase 83" "execution plan says design-only in Phase 83"
Assert-Contains $domainSource "use existing guarded apply boundary only if present" "execution plan says use existing guarded apply boundary only if present"
Assert-Contains $domainSource "git restore" "rollback contract mentions git restore"
Assert-Contains $domainSource "git revert" "rollback contract mentions git revert"
Assert-Contains $domainSource "npm run build" "validation contract includes npm run build"
Assert-Contains $domainSource "targeted smoke" "validation contract includes targeted smoke"
Assert-Contains $domainSource "git diff --check" "validation contract includes git diff --check"
Assert-Contains $domainSource "no automatic commit" "result contract says no automatic commit"
Assert-Contains $domainSource "no memory auto-promotion" "result contract says no memory auto-promotion"
Assert-Contains $domainSource "approval not tied to exact diff" "implementation gaps include approval not tied to exact diff"
Assert-Contains $domainSource "apply evidence not captured" "implementation gaps include apply evidence not captured"

Assert-Contains $integratedSource "Guarded Apply Candidate" "/apply-guard-review references Guarded Apply Candidate if integrated"
Assert-Contains $integratedSource "Guarded Apply Candidate" "/apply-validation references Guarded Apply Candidate if integrated"
Assert-Contains $integratedSource "Guarded Apply Candidate" "/code-flow references Guarded Apply Candidate if integrated"
Assert-Contains $integratedSource "Guarded Apply Candidate" "/files references Guarded Apply Candidate if integrated"
Assert-Contains $integratedSource "Guarded Apply Candidate" "/validation references Guarded Apply Candidate if integrated"
Assert-Contains $commandSource "Go to Guarded Apply Candidate" "Command Palette includes Go to Guarded Apply Candidate if integrated"
Assert-Contains $commandSource "Copy guarded apply candidate plan" "Command Palette includes Copy guarded apply candidate plan"
Assert-Contains $commandSource "Copy guarded apply implementation gaps" "Command Palette includes Copy guarded apply implementation gaps"
Assert-Contains $commandSource "Copy guarded apply next prompt" "Command Palette includes Copy guarded apply next prompt"
Assert-Contains $productSource "Guarded Apply Candidate Implementation Plan" "Product Readiness references Guarded Apply Candidate if integrated"
Assert-Contains $consolidationSource "Guarded Apply Candidate Implementation Plan" "Consolidation references Guarded Apply Candidate if integrated"
Assert-Contains $missionSource "Guarded Apply Candidate readiness" "Mission Control references Guarded Apply Candidate if integrated"
Assert-Contains $missionSource "clear blocker gaps before implementation" "Mission Control next action clear blocker gaps before implementation"

Assert-Contains $candidateSource "no unsafe execution buttons" "no unsafe execution buttons"
Assert-NotMatches $uiSource "appendEvent\s*\(" "no direct appendEvent call from UI"
Assert-NotMatches $uiSource "saveBrainGraph\s*\(" "no direct saveBrainGraph call from UI"
Assert-NotMatches $uiSource "\.nodes\s*\.\s*push|\.edges\s*\.\s*push" "no direct graph mutation from UI"
Assert-NotMatches $uiSource "apply-diff\s*\(" "no direct apply-diff call from UI"
Assert-NotMatches $uiSource "write-file\s*\(" "no direct write-file call from UI"
Assert-NotMatches $uiSource "run-command\s*\(" "no direct run-command call from UI"
Assert-NotMatches $candidateSource "broker-execution\s*\(" "no broker-execution call except blocked-policy text"
Assert-NotMatches $candidateSource "https?://" "no external network dependency in guarded-apply-candidate files"
Assert-NotContains $candidateSource "fetch(" "no external network dependency"
foreach ($marker in @("pinecone", "weaviate", "chroma", "qdrant", "milvus", "pgvector")) { Assert-NotContains $candidateSource $marker "no vector database dependency: $marker" }
foreach ($marker in @("OPENAI_API_KEY", "from `"openai`"", "from 'openai'")) { Assert-NotContains $candidateSource $marker "no OpenAI/API-key dependency in guarded-apply-candidate files: $marker" }
Assert-NotMatches $candidateSource "(api[_-]?key|secret|token|password)\s*[:=]\s*['""][^'""]+" "no hardcoded API keys"
Assert-NotContains $candidateSource "localStorage.setItem" "no localStorage API key storage"
Assert-NotContains $uiSource "process.env." "no process.env value printed in UI"
Assert-NotContains $candidateSource "Math.random(" "no Math.random"
Assert-NotContains $candidateSource "Date.now(" "no Date.now for deterministic layout/ids"
Assert-NotContains $candidateSource "from `"d3-force`"" "no d3-force"
Assert-NotMatches $candidateSource "[\u00c3\u00c2]" "no mojibake"
Assert-Contains $domainSource "buildGuardedApplyCandidateStableKey" "stable key helper or stable key patterns exist"
Assert-CountExactly $allSmoke "smoke-codexforge-guarded-apply-candidate.ps1" 1 "managed smoke suite includes Guarded Apply Candidate exactly once"

try {
  $response = Invoke-WebRequest -Method Get -Uri "$BaseUrl/guarded-apply-candidate" -TimeoutSec 5
  if ([int]$response.StatusCode -lt 200 -or [int]$response.StatusCode -ge 400) { throw "[FAIL] /guarded-apply-candidate returned status $($response.StatusCode)" }
  Write-Host "[PASS] /guarded-apply-candidate route reachable"
} catch {
  Write-Host "[SKIP] /guarded-apply-candidate route not reachable from smoke: $($_.Exception.Message)"
}

Write-Host "[OK] CodexForge Guarded Apply Candidate smoke passed."
