param(
  [Parameter(Mandatory = $true)][string]$SmokeName,
  [Parameter(Mandatory = $true)][string]$ScriptFile,
  [Parameter(Mandatory = $true)][string]$Domain,
  [Parameter(Mandatory = $true)][string]$Route,
  [Parameter(Mandatory = $true)][string]$CommandLabel,
  [Parameter(Mandatory = $true)][string]$RouteHref,
  [Parameter(Mandatory = $true)][string]$ContractFamily,
  [Parameter(Mandatory = $true)][string[]]$Markers
)

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

function Assert-Contains {
  param([AllowEmptyString()][string]$Haystack, [string]$Needle, [string]$Name)
  if (-not $Haystack.Contains($Needle)) { throw ("[FAIL] Missing " + $Name + ": " + $Needle) }
  Write-Host ("[PASS] " + $Name)
}
function Assert-NotMatches {
  param([AllowEmptyString()][string]$Haystack, [string]$Pattern, [string]$Name)
  if ($Haystack -match $Pattern) { throw ("[FAIL] Unexpected " + $Name + ": " + $Pattern) }
  Write-Host ("[PASS] " + $Name)
}

foreach ($path in @($Domain, $Route, (Join-Path $Route "page.tsx"), (Join-Path $Route "page-client.tsx"), (Join-Path "scripts" $ScriptFile))) {
  if (-not (Test-Path $path)) { throw ("[FAIL] Missing path: " + $path) }
  Write-Host ("[PASS] path exists " + $path)
}

$sourceParts = @()
foreach ($scanRoot in @("src\lib\codexforge\approval-capture-contract-boundary", $Domain, $Route, (Join-Path "scripts" $ScriptFile))) {
  $sourceParts += Get-ChildItem -Recurse -File $scanRoot | ForEach-Object { Get-Content -Raw $_.FullName }
}
$source = $sourceParts -join [Environment]::NewLine
$navigationRegistry = Get-Content -Raw "src\lib\codexforge\navigation-shell\navigation-route-registry.ts"
$navigationTypes = Get-Content -Raw "src\lib\codexforge\navigation-shell\navigation-shell-types.ts"
$commandRegistry = Get-Content -Raw "src\lib\codexforge\command-palette\command-registry.ts"
$allSmoke = Get-Content -Raw "scripts\smoke-codexforge-all.ps1"

Assert-Contains $source "ApprovalRightsAuditContractRoutePanel" "shared route panel"
if ($ContractFamily -eq "ApprovalCapture") { Assert-Contains $source "ApprovalCaptureContractBoundaryCockpitSummaryPanel" "approval capture cockpit summary panel" }
if ($ContractFamily -eq "RightsConsentAudit") { Assert-Contains $source "RightsConsentAuditContractBoundaryCockpitSummaryPanel" "rights consent audit cockpit summary panel" }
if ($ContractFamily -eq "Foundation") { Assert-Contains $source "FoundationContractsCompletionCandidateCockpitSummaryPanel" "foundation completion cockpit summary panel" }
Assert-Contains $source $RouteHref "route href source"
Assert-Contains $source $CommandLabel "command label source"
Assert-Contains $navigationRegistry $RouteHref "navigation route href"
Assert-Contains $navigationTypes ('| "' + $RouteHref + '"') "route type coverage"
Assert-Contains $commandRegistry ('"' + $RouteHref + '": true') "command availability coverage"
Assert-Contains $commandRegistry ('href: "' + $RouteHref + '"') "command route coverage"
Assert-Contains $commandRegistry $CommandLabel "command palette label"
Assert-Contains $allSmoke $SmokeName "all-smoke name"
Assert-Contains $allSmoke $ScriptFile "all-smoke script file"
$escapedRouteHref = [regex]::Escape($RouteHref)
$commandHrefPattern = 'href:\s*"' + $escapedRouteHref + '"'
$commandHrefCount = ([regex]::Matches($commandRegistry, $commandHrefPattern)).Count
if ($commandHrefCount -ne 1) { throw ("[FAIL] Duplicate command palette href count for " + $RouteHref + ": " + $commandHrefCount) }
foreach ($marker in $Markers) { Assert-Contains $source $marker ("marker " + $marker) }
foreach ($safetyMarker in @(
  "Approval Capture Contract",
  "Approval Capture Contract Boundary",
  "Approval Request Schema",
  "Operator Attestation",
  "Multi Step Approval Chain",
  "Approval Expiration Policy",
  "Approval Revocation Policy",
  "Approval Evidence Packet",
  "Approval Denial Ledger",
  "Approval Escalation Policy",
  "Approval Audit Event",
  "Frontend Approval Persistence Blocked",
  "Review-only approval capture contract",
  "Synthetic data only",
  "No approval persistence from the cockpit",
  "No approval mutation from the cockpit",
  "No signature capture from the cockpit",
  "No identity verification from the cockpit",
  "No account authorization from the cockpit",
  "No export approval from the cockpit",
  "No publish approval from the cockpit",
  "No render approval from the cockpit",
  "No frontend approval persistence",
  "No frontend evidence persistence",
  "No frontend audit persistence",
  "No frontend credential storage",
  "No frontend token storage",
  "No frontend file mutation",
  "No frontend persistence",
  "Backend-owned approval capture remains required",
  "Backend-owned identity binding remains required",
  "Backend-owned evidence storage remains required",
  "Backend-owned audit trail remains required",
  "Backend-owned approval revocation remains required",
  "Operator review remains required",
  "Explicit operator approval remains required",
  "Rights Consent Audit Contract",
  "Rights Consent Audit Contract Boundary",
  "Rights Evidence Schema",
  "Consent Evidence Schema",
  "Likeness Consent Contract",
  "Music Rights Contract",
  "Brand Legal Review Contract",
  "Usage License Policy",
  "Consent Expiration Policy",
  "Consent Revocation Policy",
  "Immutable Audit Ledger",
  "Audit Redaction Policy",
  "Audit Retention Policy",
  "Frontend Rights Consent Persistence Blocked",
  "Review-only rights consent audit contract",
  "No rights clearance from the cockpit",
  "No consent approval from the cockpit",
  "No likeness approval from the cockpit",
  "No music clearance from the cockpit",
  "No legal approval from the cockpit",
  "No license grant from the cockpit",
  "No audit persistence from the cockpit",
  "No rights persistence from the cockpit",
  "No consent persistence from the cockpit",
  "No frontend rights persistence",
  "No frontend consent persistence",
  "Backend-owned rights workflow remains required",
  "Backend-owned consent workflow remains required",
  "Backend-owned legal review remains required",
  "Backend-owned audit ledger remains required",
  "Backend-owned redaction policy remains required",
  "Backend-owned retention policy remains required",
  "Unified Approval Rights Audit Release Gate",
  "Controlled Foundation Contracts Completion Candidate",
  "approvalCaptureContractId",
  "approvalCaptureContractKind",
  "rightsConsentAuditContractId",
  "rightsConsentAuditContractKind",
  "cockpitSummary",
  "explicitSafetyLimits"
)) { Assert-Contains $source $safetyMarker ("safety marker " + $safetyMarker) }
Assert-NotMatches $source 'key=\{(item|label|constraint|badge|entry|step|route|profile|record|section)\}' "banned duplicate-prone React keys"
Assert-NotMatches $source 'Math\.random|Date\.now|crypto\.randomUUID' "nondeterministic key or data generators"
Assert-NotMatches $source 'fetch\(|XMLHttpRequest|EventSource|WebSocket|localStorage|sessionStorage|spawn\(|exec\(' "runtime/provider/command/browser side-effect APIs"
$unsafeApiNames = @(("run"+"Command"),("append"+"Event"),("write"+"File"),("save"+"BrainGraph"),("render"+"Video"),("export"+"Video"),("upload"+"Asset"),("download"+"Asset"),("publish"+"Post"),("schedule"+"Post"),("call"+"Provider"),("call"+"Model"),("send"+"Prompt"),("dispatch"+"Worker"),("create"+"Artifact"),("persist"+"Asset"),("persist"+"Prompt"),("persist"+"Job"),("persist"+"Rights"),("store"+"Media"),("create"+"RenderQueue"),("start"+"Render"),("retry"+"Render"),("persist"+"Artifact"),("create"+"Export"),("download"+"File"),("publish"+"Video"),("schedule"+"Video"),("generate"+"Video"),("generate"+"Image"),("generate"+"Voice"),("create"+"Api"),("start"+"Service"),("deploy"+"Runtime"),("store"+"Credential"),("store"+"ApiKey"),("dispatch"+"Request"),("persist"+"Response"),("upload"+"Audio"),("download"+"Audio"),("persist"+"Audio"),("persist"+"Transcript"),("persist"+"Caption"),("spawn"+"Process"),("bind"+"Port"),("run"+"Shell"),("authorize"+"Account"),("store"+"Token"),("call"+"SocialApi"),("capture"+"Signature"),("verify"+"Identity"),("grant"+"License"),("approve"+"Consent"),("clear"+"Rights"),("persist"+"Consent"),("persist"+"Approval"),("persist"+"Audit"))
$unsafeApiNamePattern = ($unsafeApiNames | ForEach-Object { [regex]::Escape($_) }) -join "|"
Assert-NotMatches $source $unsafeApiNamePattern "unsafe camelCase execution or persistence API names"
Write-Host ("[OK] " + $SmokeName + " static approval rights audit contract smoke passed.")
