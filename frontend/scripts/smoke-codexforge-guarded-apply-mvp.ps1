param([string]$BaseUrl = "http://localhost:3000")
$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root
function Assert-FileExists { param([string]$Path) if (-not (Test-Path $Path)) { throw "[FAIL] Missing file: $Path" } Write-Host "[PASS] file exists: $Path" }
function Assert-DirectoryExists { param([string]$Path) if (-not (Test-Path $Path -PathType Container)) { throw "[FAIL] Missing directory: $Path" } Write-Host "[PASS] directory exists: $Path" }
function Assert-Contains { param([AllowEmptyString()][string]$Haystack,[string]$Needle,[string]$Name) if (-not $Haystack.Contains($Needle)) { throw "[FAIL] Missing $Name`: $Needle" } Write-Host "[PASS] $Name" }
function Assert-NotMatches { param([AllowEmptyString()][string]$Haystack,[string]$Pattern,[string]$Name) if ($Haystack -match $Pattern) { throw "[FAIL] Unexpected $Name`: $Pattern" } Write-Host "[PASS] $Name" }
function Assert-CountExactly { param([AllowEmptyString()][string]$Haystack,[string]$Needle,[int]$Expected,[string]$Name) $count = ([regex]::Matches($Haystack,[regex]::Escape($Needle))).Count; if ($count -ne $Expected) { throw "[FAIL] $Name expected $Expected found $count" } Write-Host "[PASS] $Name" }
Write-Host "=== CodexForge Guarded Apply MVP smoke ==="
$domainDir = "src\lib\codexforge\guarded-apply-mvp"; $componentDir = Join-Path $domainDir "components"; $routePath = "src\app\guarded-apply-mvp\page.tsx"; $clientPath = "src\app\guarded-apply-mvp\page-client.tsx"
Assert-DirectoryExists $domainDir; Assert-DirectoryExists $componentDir
foreach ($module in @("guarded-apply-mvp-types.ts","guarded-apply-mvp-request.ts","guarded-apply-mvp-policy.ts","guarded-apply-mvp-diff-contract.ts","guarded-apply-mvp-approval.ts","guarded-apply-mvp-boundary.ts","guarded-apply-mvp-result.ts","guarded-apply-mvp-next-action.ts","guarded-apply-mvp-summary.ts","index.ts")) { Assert-FileExists (Join-Path $domainDir $module) }
foreach ($component in @("GuardedApplyMvpPanel.tsx","GuardedApplyMvpRequestPanel.tsx","GuardedApplyMvpPolicyPanel.tsx","GuardedApplyMvpDiffContractPanel.tsx","GuardedApplyMvpApprovalPanel.tsx","GuardedApplyMvpBoundaryPanel.tsx","GuardedApplyMvpResultPanel.tsx","GuardedApplyMvpNextActionPanel.tsx","GuardedApplyMvpSafetyStrip.tsx","GuardedApplyMvpEmptyState.tsx")) { Assert-FileExists (Join-Path $componentDir $component) }
Assert-FileExists $routePath; Assert-FileExists $clientPath
$indexSource = Get-Content -Raw (Join-Path $domainDir "index.ts")
$domainSource = (Get-ChildItem $domainDir -File | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$uiSource = (Get-ChildItem $componentDir -File | ForEach-Object { Get-Content -Raw $_.FullName }) -join "`n"
$routeSource = (Get-Content -Raw $routePath) + "`n" + (Get-Content -Raw $clientPath)
$allSource = $domainSource + "`n" + $uiSource + "`n" + $routeSource
foreach ($export in @("buildGuardedApplyMvpRequest","validateGuardedApplyMvpRequest","buildGuardedApplyMvpPolicy","isGuardedApplyMvpAllowed","buildGuardedApplyMvpDiffContract","buildGuardedApplyMvpApproval","validateGuardedApplyMvpApproval","buildGuardedApplyMvpBoundary","evaluateGuardedApplyMvpBoundary","buildGuardedApplyMvpResult","selectGuardedApplyMvpNextAction","buildGuardedApplyMvpSummary")) { Assert-Contains $indexSource $export "index exports $export" }
foreach ($render in @("GuardedApplyMvpPanel renders","GuardedApplyMvpRequestPanel renders","GuardedApplyMvpPolicyPanel renders","GuardedApplyMvpDiffContractPanel renders","GuardedApplyMvpApprovalPanel renders","GuardedApplyMvpBoundaryPanel renders","GuardedApplyMvpResultPanel renders","GuardedApplyMvpNextActionPanel renders","GuardedApplyMvpSafetyStrip renders","GuardedApplyMvpEmptyState renders")) { Assert-Contains $uiSource $render $render }
foreach ($text in @("Guarded apply MVP","One file, one diff, one approval, then validate separately.","Review apply request","no auto-apply","no auto-run","approval required","preserve latest-message authority","Focus Mode UX calm workflow layout markers","shell without duplicate route chip cloud","route hero title does not vertically wrap","no giant raw JSON above fold","advanced details are collapsed or visually secondary","no unsafe execution buttons","one file only","one diff only","preview diff required","exact approval required","approval invalidated if file/diff/request changes","no binary patch","no direct UI apply-diff","no direct UI write-file","no direct UI run-command","no combined apply+validate button","rollback guidance required","buildGuardedApplyMvpStableKey")) { Assert-Contains $allSource $text "marker $text" }
Assert-Contains $routeSource "GuardedApplyMvpPanel" "route imports/renders main panel"
foreach ($bad in @("appendEvent\s*\(","saveBrainGraph\s*\(","\.nodes\s*\.\s*push|\.edges\s*\.\s*push","apply-diff\s*\(","write-file\s*\(","run-command\s*\(","broker-execution\s*\(","https?://","fetch\s*\(","OPENAI_API_KEY","localStorage.setItem","process\.env\.","Math\.random","Date\.now","d3-force","[\u00c3\u00c2]")) { Assert-NotMatches $allSource $bad "blocked marker absent $bad" }
Assert-Contains ((Get-Content -Raw "src\app\code-flow\page-client.tsx") + (Get-Content -Raw "src\app\files\page-client.tsx") + (Get-Content -Raw "src\app\apply-validation\page-client.tsx")) "/guarded-apply-mvp" "integrations mention guarded apply mvp"
Assert-CountExactly (Get-Content -Raw "scripts\smoke-codexforge-all.ps1") "smoke-codexforge-guarded-apply-mvp.ps1" 1 "managed smoke suite includes phase exactly once"
Write-Host "[OK] CodexForge Guarded Apply MVP smoke passed."
