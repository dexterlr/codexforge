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
Write-Host "=== CodexForge Apply Validation Hardening smoke ==="
Write-Host "Base URL: $BaseUrl"

$domainDir = "src\lib\codexforge\apply-validation-hardening"
$componentDir = Join-Path $domainDir "components"
$indexPath = Join-Path $domainDir "index.ts"
$routePath = "src\app\apply-validation\page.tsx"
$clientPath = "src\app\apply-validation\page-client.tsx"
$allSmokePath = "scripts\smoke-codexforge-all.ps1"

Assert-DirectoryExists $domainDir
Assert-DirectoryExists $componentDir

foreach ($module in @(
  "apply-validation-hardening-types.ts",
  "hardened-apply-input.ts",
  "hardened-apply-policy.ts",
  "hardened-diff-safety.ts",
  "hardened-rollback-plan.ts",
  "hardened-validation-plan.ts",
  "validation-output-review.ts",
  "validation-result-routing.ts",
  "coding-flow-completion.ts",
  "apply-validation-next-action.ts",
  "apply-validation-hardening-summary.ts",
  "index.ts"
)) { Assert-FileExists (Join-Path $domainDir $module) }

foreach ($component in @(
  "ApplyValidationHardeningPanel.tsx",
  "HardenedApplyInputPanel.tsx",
  "HardenedApplyPolicyPanel.tsx",
  "HardenedDiffSafetyPanel.tsx",
  "HardenedRollbackPlanPanel.tsx",
  "HardenedValidationPlanPanel.tsx",
  "ValidationOutputReviewPanel.tsx",
  "ValidationResultRoutingPanel.tsx",
  "CodingFlowCompletionPanel.tsx",
  "ApplyValidationNextActionPanel.tsx",
  "ApplyValidationSafetyStrip.tsx",
  "ApplyValidationEmptyState.tsx"
)) { Assert-FileExists (Join-Path $componentDir $component) }

Assert-FileExists $routePath
Assert-FileExists $clientPath

$indexSource = Get-Content -Raw $indexPath
$domainSource = (Get-ChildItem $domainDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$uiSource = (Get-ChildItem $componentDir -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$routeSource = (Get-Content -Raw $routePath) + "`n" + (Get-Content -Raw $clientPath)
$codeFlowSource = Get-Content -Raw "src\app\code-flow\page-client.tsx"
$filesSource = Get-Content -Raw "src\app\files\page-client.tsx"
$validationSource = Get-Content -Raw "src\app\validation\page-client.tsx"
$closedLoopSource = Get-Content -Raw "src\app\closed-loop\page.tsx"
$wizardSource = (Get-ChildItem "src\lib\codexforge\workflow-wizard" -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$simplificationSource = (Get-ChildItem "src\lib\codexforge\product-simplification" -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$commandSource = (Get-ChildItem "src\lib\codexforge\command-palette" -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$readinessSource = (Get-Content -Raw "src\app\readiness\page-client.tsx") + "`n" + ((Get-ChildItem "src\lib\codexforge\product-readiness-audit" -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n")
$consolidationSource = (Get-Content -Raw "src\app\consolidation\page-client.tsx") + "`n" + ((Get-ChildItem "src\lib\codexforge\consolidation" -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n")
$missionSource = (Get-Content -Raw "src\app\mission\page-client.tsx") + "`n" + ((Get-ChildItem "src\lib\codexforge\mission-control" -File | Sort-Object FullName | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n")
$allSmoke = Get-Content -Raw $allSmokePath
$hardeningSource = $domainSource + "`n" + $uiSource + "`n" + $routeSource

foreach ($export in @(
  "buildHardenedApplyInput",
  "validateHardenedApplyInput",
  "buildHardenedApplyPolicy",
  "isHardenedApplyAllowed",
  "buildHardenedDiffSafety",
  "buildHardenedDiffSafetyCheck",
  "buildHardenedRollbackPlan",
  "buildHardenedRollbackOption",
  "buildHardenedValidationPlan",
  "buildHardenedValidationCommand",
  "selectHardenedValidationCommands",
  "buildValidationOutputReview",
  "buildValidationOutputReviewItem",
  "buildValidationResultRouting",
  "buildValidationResultRoute",
  "buildCodingFlowCompletion",
  "buildCodingFlowCompletionChecklist",
  "selectApplyValidationNextAction",
  "buildApplyValidationNextActionPlan",
  "buildApplyValidationHardeningSummary"
)) { Assert-Contains $indexSource $export "index exports $export" }

foreach ($render in @(
  "ApplyValidationHardeningPanel renders",
  "HardenedApplyInputPanel renders",
  "HardenedApplyPolicyPanel renders",
  "HardenedDiffSafetyPanel renders",
  "HardenedRollbackPlanPanel renders",
  "HardenedValidationPlanPanel renders",
  "ValidationOutputReviewPanel renders",
  "ValidationResultRoutingPanel renders",
  "CodingFlowCompletionPanel renders",
  "ApplyValidationNextActionPanel renders",
  "ApplyValidationSafetyStrip renders",
  "ApplyValidationEmptyState renders"
)) { Assert-Contains $uiSource $render "$render" }

Assert-Contains $routeSource "ApplyValidationHardeningPanel" "/apply-validation imports/renders ApplyValidationHardeningPanel"
Assert-Contains $routeSource "Apply safely" "/apply-validation says Apply safely"
Assert-Contains $routeSource "validate" "/apply-validation says validate"
Assert-Contains $uiSource "no auto-apply" "UI says no auto-apply"
Assert-Contains $uiSource "no auto-run" "UI says no auto-run"
Assert-Contains $uiSource "approval required" "UI says approval required"
Assert-Contains $uiSource "rollback" "UI says rollback"
Assert-Contains $uiSource "preserve latest-message authority" "UI says preserve latest-message authority"
Assert-Contains $routeSource "Focus Mode UX calm workflow layout markers" "route uses Focus Mode UX or calm workflow layout markers"
Assert-Contains $routeSource "shell without duplicate route chip cloud" "route uses shell without duplicate route chip cloud"
Assert-Contains $uiSource "whiteSpace: `"nowrap`"" "route hero title does not vertically wrap"
Assert-NotContains $uiSource "overflowWrap: `"anywhere`"" "display headings do not use overflowWrap:anywhere"

Assert-Contains $domainSource "Policy blocks missing preview diff" "policy blocks missing preview diff"
Assert-Contains $domainSource "Policy blocks missing approval" "policy blocks missing approval"
Assert-Contains $domainSource "Policy requires rollback plan" "policy requires rollback plan"
Assert-Contains $domainSource "path-traversal-check" "diff safety checks path traversal"
Assert-Contains $domainSource "binary-patch-check" "diff safety checks binary patch"
Assert-Contains $domainSource "secrets-in-diff-check" "diff safety checks secrets in diff"
Assert-Contains $domainSource "git restore" "rollback plan mentions git restore"
Assert-Contains $domainSource "git revert" "rollback plan mentions git revert"
Assert-Contains $domainSource "npm run build" "validation plan includes npm run build"
Assert-Contains $domainSource "npm run smoke:codexforge:server" "validation plan includes npm run smoke:codexforge:server"
Assert-Contains $domainSource "git diff --check" "validation plan includes git diff --check"
Assert-Contains $domainSource "smoke-codexforge-real-coding-flow.ps1" "validation plan maps real-coding-flow to smoke-codexforge-real-coding-flow.ps1"
Assert-Contains $domainSource "doesNotFabricateOutput: true" "output review does not fabricate output"
Assert-Contains $domainSource "Build fail routes to closed-loop fix workflow" "result routing maps build fail to closed-loop"
Assert-Contains $domainSource "Smoke fail routes to regression triage / closed-loop" "result routing maps smoke fail to regression triage or closed-loop"
Assert-Contains $domainSource "git status --short" "completion guidance includes git status --short"
Assert-Contains $domainSource "git diff --stat" "completion guidance includes git diff --stat"
Assert-Contains $domainSource "Missing preview routes to Real Patch Preview" "next action routes missing preview to Real Patch Preview"
Assert-Contains $domainSource "Failing output routes to Closed Loop" "next action routes failing output to Closed Loop"

Assert-Contains $codeFlowSource "Apply Validation Hardening" "/code-flow references Apply Validation Hardening if integrated"
Assert-Contains $filesSource "Apply Validation Hardening" "/files references Apply Validation Hardening if integrated"
Assert-Contains $validationSource "Apply Validation Hardening" "/validation references Apply Validation Hardening if integrated"
Assert-Contains $closedLoopSource "Apply Validation Hardening" "/closed-loop references Apply Validation Hardening if integrated"
Assert-Contains $wizardSource "/apply-validation" "Workflow Wizard references /apply-validation if integrated"
Assert-Contains $simplificationSource "Apply safely, then validate" "Product Simplification references Apply safely then validate if integrated"
Assert-Contains $commandSource "Go to Apply and Validation" "Command Palette includes Go to Apply and Validation if integrated"
Assert-Contains $readinessSource "Apply Validation Hardening" "Product Readiness references Apply Validation Hardening if integrated"
Assert-Contains $consolidationSource "Apply Validation Hardening" "Consolidation references Apply Validation Hardening if integrated"
Assert-Contains $missionSource "Apply Validation Hardening" "Mission Control references Apply Validation Hardening if integrated"

Assert-Contains $uiSource "no giant raw JSON above fold" "no giant raw JSON above fold"
Assert-Contains $uiSource "advanced details are collapsed or visually secondary" "advanced details are collapsed or visually secondary"
Assert-Contains $uiSource "no unsafe execution buttons" "no unsafe execution buttons"
Assert-NotContains $hardeningSource "appendEvent(" "no direct appendEvent call from UI"
Assert-NotContains $hardeningSource "saveBrainGraph(" "no direct saveBrainGraph call from UI"
Assert-NotContains $hardeningSource "nodes.push" "no direct graph mutation from UI"
Assert-NotContains $hardeningSource "applyDiff(" "no direct apply-diff call from UI"
Assert-NotContains $hardeningSource "writeFile(" "no direct write-file call from UI"
Assert-NotContains $hardeningSource "runCommand(" "no direct run-command call from UI"
Assert-NotContains $hardeningSource "fetch(" "no external network dependency in apply-validation-hardening files"
Assert-NotContains $hardeningSource "chromadb" "no vector database dependency"
Assert-NotContains $hardeningSource "OPENAI_API_KEY" "no OpenAI/API-key dependency in apply-validation-hardening files"
Assert-NotMatches $hardeningSource "(api[_-]?key|secret|token|password)\s*[:=]\s*['""][^'""]+" "no hardcoded API keys"
Assert-NotContains $hardeningSource "localStorage.setItem" "no localStorage API key storage"
Assert-NotContains $uiSource "process.env." "no process.env value printed in UI"
Assert-NotContains $hardeningSource "Math.random(" "no Math.random"
Assert-NotContains $hardeningSource "Date.now(" "no Date.now for deterministic layout/ids"
Assert-NotContains $hardeningSource "from `"d3-force`"" "no d3-force"
Assert-NotMatches $hardeningSource "[\u00c3\u00c2]" "no mojibake"
Assert-Contains $domainSource "buildApplyValidationStableKey" "stable key helper or stable key patterns exist"
Assert-CountExactly $allSmoke "smoke-codexforge-apply-validation-hardening.ps1" 1 "managed smoke suite includes Apply Validation Hardening exactly once"

Write-Host ""
Write-Host "[PASS] CodexForge Apply Validation Hardening smoke passed."
