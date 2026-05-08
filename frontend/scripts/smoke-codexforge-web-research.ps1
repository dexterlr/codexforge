param(
  [string]$BaseUrl = "http://localhost:3000"
)

$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
Set-Location $root

function Assert-Contains {
  param(
    [Parameter(Mandatory = $true)][string]$Haystack,
    [Parameter(Mandatory = $true)][string]$Needle,
    [Parameter(Mandatory = $true)][string]$Name
  )

  if (-not $Haystack.Contains($Needle)) {
    throw "[FAIL] Missing expected $Name marker: $Needle"
  }

  Write-Host "[PASS] $Name"
}

function Assert-FileExists {
  param([Parameter(Mandatory = $true)][string]$Path)

  if (-not (Test-Path $Path)) {
    throw "[FAIL] Missing file: $Path"
  }

  Write-Host "[PASS] file exists: $Path"
}

function Invoke-JsonPost {
  param(
    [Parameter(Mandatory = $true)][string]$Uri,
    [Parameter(Mandatory = $true)]$Body
  )

  $json = $Body | ConvertTo-Json -Depth 12

  try {
    $response = Invoke-WebRequest `
      -Method Post `
      -Uri $Uri `
      -Body $json `
      -ContentType "application/json" `
      -TimeoutSec 10

    return @{
      StatusCode = [int]$response.StatusCode
      Body = $response.Content
      Json = $response.Content | ConvertFrom-Json
    }
  } catch {
    $statusCode = [int]$_.Exception.Response.StatusCode.value__
    $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
    $content = $reader.ReadToEnd()

    return @{
      StatusCode = $statusCode
      Body = $content
      Json = $content | ConvertFrom-Json
    }
  }
}

Write-Host ""
Write-Host "=== CodexForge web research smoke ==="
Write-Host "Base URL: $BaseUrl"

$executorPath = "src\lib\codexforge\tools\web-research-executor.ts"
$routePath = "src\app\api\codexforge\tools\web-research\route.ts"
$resultPanelPath = "src\lib\codexforge\chat\components\tool-execution-result-panel.tsx"
$capabilityPath = $null
$selfUpgradePath = "src\lib\codexforge\tools\self-upgrade-backlog.ts"

Assert-FileExists $executorPath
Assert-FileExists $routePath
Assert-FileExists $resultPanelPath

$executor = Get-Content -Raw $executorPath
$route = Get-Content -Raw $routePath
$resultPanel = Get-Content -Raw $resultPanelPath
$capability = ""
$selfUpgrade = Get-Content -Raw $selfUpgradePath

Assert-Contains $executor "CODEXFORGE_WEB_RESEARCH_VERSION" "executor version"
Assert-Contains $executor "executeCodexForgeWebResearch" "executor export"
Assert-Contains $executor "assertSafeWebResearchSource" "safe source guard"
Assert-Contains $executor "privateNetworkBlocked" "private network safety marker"
Assert-Contains $executor "MAX_SOURCES = 3" "source cap"
Assert-Contains $executor "MAX_BYTES_PER_SOURCE" "source byte cap"
Assert-Contains $executor "credentialHarvestingBlocked" "credential harvesting safety marker"
Assert-Contains $executor "memoryCandidates" "memory candidate contract"
Assert-Contains $executor "groundedContext" "grounded context contract"
Assert-Contains $executor "evidenceDigest" "grounded evidence digest"
Assert-Contains $executor "explicitSourcesOnly" "explicit sources only safety marker"
Assert-Contains $executor "noSilentBrowsing" "no silent browsing safety marker"

Assert-Contains $route "Web research requires explicit approval before network access." "approval required response"
Assert-Contains $route "toolPolicyReplayRequest" "replay request response"
Assert-Contains $route "noSilentBrowsing" "no silent browsing marker"
Assert-Contains $route "explicitSourcesOnly" "explicit source scope marker"
Assert-Contains $route "executeCodexForgeWebResearch" "route executor call"
Assert-Contains $panel "data-codexforge-web-research-source-results" "source results UI marker"
Assert-Contains $panel "data-codexforge-web-research-memory-candidates" "memory candidate review UI marker"
Assert-Contains $panel "data-codexforge-web-research-grounded-summary" "grounded summary UI marker"
Assert-Contains $panel "data-codexforge-web-research-evidence" "web research evidence UI marker"
Assert-Contains $resultPanel "data-codexforge-web-research-result" "result panel web research root marker"
Assert-Contains $resultPanel "Web research evidence" "result panel web research heading"
Assert-Contains $resultPanel "data-codexforge-web-research-citations" "result panel citation list marker"
Assert-Contains $resultPanel "data-codexforge-web-research-sources" "result panel source list marker"
Assert-Contains $resultPanel "data-codexforge-web-research-freshness" "result panel freshness marker"
Assert-Contains $resultPanel "data-codexforge-web-research-next-action" "result panel next action marker"
Assert-Contains $resultPanel "isWebResearchResult(visibleContentJson)" "result panel detects web research payload"

# Capability bridge is verified through the live /api/codexforge/tools/capabilities endpoint below.
Assert-Contains $selfUpgrade "approved-web-research-executor-v1" "self-upgrade backlog includes web research"

$capabilityResponse = Invoke-RestMethod -Method Get -Uri "$BaseUrl/api/codexforge/tools/capabilities" -TimeoutSec 5
$capabilityJson = $capabilityResponse | ConvertTo-Json -Depth 12
Assert-Contains $capabilityJson "web-research" "capabilities route includes web research"
Assert-Contains $capabilityJson "Web research" "capabilities route includes web research label"
Assert-Contains $capabilityJson "web-research-adapter" "capabilities route includes web research adapter id"

$getResponse = Invoke-RestMethod -Method Get -Uri "$BaseUrl/api/codexforge/tools/web-research" -TimeoutSec 5
if ($getResponse.ok -ne $true) {
  throw "[FAIL] web research GET route did not return ok true"
}
Write-Host "[PASS] GET route ok"

$approvalResponse = Invoke-JsonPost `
  -Uri "$BaseUrl/api/codexforge/tools/web-research" `
  -Body @{
    query = "CodexForge web research smoke"
    sources = @("https://example.com")
  }

if ($approvalResponse.StatusCode -ne 428) {
  throw "[FAIL] expected approval-required HTTP 428, got $($approvalResponse.StatusCode)"
}

if ($approvalResponse.Json.toolPolicySummary.requiresApproval -ne $true) {
  throw "[FAIL] approval-required response did not require approval"
}

if ($approvalResponse.Json.toolPolicySummary.approvalSatisfied -ne $false) {
  throw "[FAIL] approval-required response unexpectedly satisfied approval"
}

if (-not $approvalResponse.Json.toolPolicyReplayRequest) {
  throw "[FAIL] approval-required response missing replay request"
}

Write-Host "[PASS] approval gate blocks silent web access"

$approvedPlanResponse = Invoke-JsonPost `
  -Uri "$BaseUrl/api/codexforge/tools/web-research" `
  -Body @{
    query = "CodexForge source planning without network fetch"
    sources = @()
    approvalState = @{
      status = "approved"
    }
  }

if ($approvedPlanResponse.StatusCode -ne 200) {
  throw "[FAIL] expected approved plan-only HTTP 200, got $($approvedPlanResponse.StatusCode)"
}

if ($approvedPlanResponse.Json.result.mode -ne "research-plan-only") {
  throw "[FAIL] approved source-less request should remain research-plan-only"
}

if ($approvedPlanResponse.Json.result.needsSources -ne $true) {
  throw "[FAIL] approved source-less request should require explicit sources"
}

if ($approvedPlanResponse.Json.result.groundedContext.memoryCandidateCount -ne 0) {
  throw "[FAIL] source-less research should not create memory candidates"
}

if ($approvedPlanResponse.Json.result.safety.explicitSourcesOnly -ne $true) {
  throw "[FAIL] source-less research did not preserve explicit source safety"
}

Write-Host "[PASS] approved query without sources does not silently browse"

$blockedLocalResponse = Invoke-JsonPost `
  -Uri "$BaseUrl/api/codexforge/tools/web-research" `
  -Body @{
    query = "Should block localhost"
    sources = @("http://localhost:3000")
    approvalState = @{
      approved = $true
    }
  }

if ($blockedLocalResponse.StatusCode -ne 400) {
  throw "[FAIL] expected localhost source rejection HTTP 400, got $($blockedLocalResponse.StatusCode)"
}

Assert-Contains $blockedLocalResponse.Body "Blocked private or local network source" "private network rejection body"

Write-Host "[PASS] private network source blocked"
Write-Host "[OK] CodexForge web research smoke passed."
