param(
  [Parameter(Mandatory = $true)][string]$SmokeName,
  [Parameter(Mandatory = $true)][string]$ScriptFile,
  [Parameter(Mandatory = $true)][string]$Domain,
  [Parameter(Mandatory = $true)][string]$Route,
  [Parameter(Mandatory = $true)][string]$MainPanel,
  [Parameter(Mandatory = $true)][string]$CommandLabel,
  [Parameter(Mandatory = $true)][string]$RouteHref,
  [Parameter(Mandatory = $true)][string[]]$Markers
)

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

function Assert-Contains {
  param([AllowEmptyString()][string]$Haystack, [string]$Needle, [string]$Name)
  if (-not $Haystack.Contains($Needle)) { throw "[FAIL] Missing $Name`: $Needle" }
  Write-Host "[PASS] $Name"
}

function Assert-NotMatches {
  param([AllowEmptyString()][string]$Haystack, [string]$Pattern, [string]$Name)
  if ($Haystack -match $Pattern) { throw "[FAIL] Unexpected $Name`: $Pattern" }
  Write-Host "[PASS] $Name"
}

foreach ($path in @($Domain, $Route, (Join-Path $Route "page.tsx"), (Join-Path $Route "page-client.tsx"), (Join-Path "scripts" $ScriptFile))) {
  if (-not (Test-Path $path)) { throw "[FAIL] Missing path: $path" }
  Write-Host "[PASS] path exists $path"
}

$sourceParts = @()
foreach ($scanRoot in @($Domain, $Route, "src\lib\codexforge\release-grade-audit-trail", "src\lib\codexforge\unified-cockpit")) {
  $sourceParts += Get-ChildItem -Recurse -File $scanRoot | ForEach-Object { Get-Content -Raw $_.FullName }
}
$source = $sourceParts -join "`n"
$navigationRegistry = Get-Content -Raw "src\lib\codexforge\navigation-shell\navigation-route-registry.ts"
$commandRegistry = Get-Content -Raw "src\lib\codexforge\command-palette\command-registry.ts"
$allSmoke = Get-Content -Raw "scripts\smoke-codexforge-all.ps1"

Assert-Contains $source $MainPanel "main panel source"
Assert-Contains $source $RouteHref "route href source"
Assert-Contains $source $CommandLabel "command label source"
Assert-Contains $navigationRegistry $RouteHref "navigation route href"
Assert-Contains $navigationRegistry $CommandLabel.Replace("Go to ", "") "navigation label"
Assert-Contains $commandRegistry $RouteHref "command route href"
Assert-Contains $commandRegistry $CommandLabel "command palette label"
Assert-Contains $allSmoke $SmokeName "all-smoke name"
Assert-Contains $allSmoke $ScriptFile "all-smoke script file"

foreach ($marker in $Markers) {
  Assert-Contains $source $marker "marker $marker"
}

foreach ($safetyMarker in @(
  "Release-Grade Audit Trail",
  "Goal",
  "Context",
  "Compiler",
  "Proposal",
  "Approval",
  "Queue",
  "Transaction",
  "Apply",
  "Command",
  "Evidence",
  "Result",
  "Recovery",
  "Memory",
  "Denied Paths",
  "Operator Timeline",
  "No audit persistence from the cockpit",
  "No execution claims from the cockpit",
  "No hidden approval from the cockpit",
  "No hidden memory promotion from the cockpit",
  "Backend-owned audit capture remains required",
  "Explicit operator approval remains required",
  "Release-Grade Audit Trail is preview-only from the frontend.",
  "It does not persist audit logs from the UI.",
  "It does not create real audit records from the UI.",
  "It does not claim execution happened.",
  "It does not persist approvals from the UI.",
  "It does not persist evidence/results/memory from the UI.",
  "It does not release execution from the frontend.",
  "It prepares a future backend-owned audit capture path.",
  "Backend-owned guarded execution remains required for real actions.",
  "auditTrailId",
  "auditTrailKind",
  "goalAuditRecord",
  "contextAuditRecord",
  "compilerAuditRecord",
  "proposalAuditRecord",
  "approvalAuditRecord",
  "queueAuditRecord",
  "transactionAuditRecord",
  "applyCommandAuditRecord",
  "evidenceResultAuditRecord",
  "recoveryAuditRecord",
  "memoryAuditRecord",
  "deniedPathAuditRecord",
  "operatorTimeline",
  "cockpitSummary",
  "explicitSafetyLimits",
  "Phase pages remain dev test diagnostics only",
  "frontend audit persistence still blocked",
  "backend-owned audit capture remains required"
)) {
  Assert-Contains $source $safetyMarker "safety marker $safetyMarker"
}

Assert-NotMatches $source 'key=\{(item|label|constraint|badge|entry|step|route)\}' "banned duplicate-prone React keys"
Assert-NotMatches $source 'Math\.random|Date\.now|crypto\.randomUUID' "nondeterministic key or data generators"
Assert-NotMatches $source 'fetch\(|localStorage|sessionStorage|runCommand|writeFile|spawn\(|exec\(' "runtime/provider/command/file side-effect APIs"

Write-Host "[OK] $SmokeName static release-grade audit trail smoke passed."
