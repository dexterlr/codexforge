param(
  [string]$BaseUrl = "http://localhost:3000"
)

$ErrorActionPreference = "Stop"

function Assert-True {
  param(
    [Parameter(Mandatory = $true)][bool]$Condition,
    [Parameter(Mandatory = $true)][string]$Name
  )

  if (-not $Condition) {
    throw "[FAIL] $Name"
  }

  Write-Host "[PASS] $Name"
}

function Invoke-CodexForgeExecute {
  param(
    [Parameter(Mandatory = $true)][hashtable]$Body,
    [int[]]$AllowedStatus = @(200)
  )

  $json = $Body | ConvertTo-Json -Depth 30

  try {
    $response = Invoke-WebRequest `
      -Uri "$BaseUrl/api/codexforge/tools/execute" `
      -Method POST `
      -ContentType "application/json" `
      -Body $json `
      -UseBasicParsing
  } catch {
    $response = $_.Exception.Response

    if (-not $response) {
      throw
    }

    $reader = New-Object System.IO.StreamReader($response.GetResponseStream())
    $errorContent = $reader.ReadToEnd()

    $response = [pscustomobject]@{
      StatusCode = [int]$response.StatusCode
      Content = $errorContent
    }
  }

  $statusCode = [int]$response.StatusCode
  $raw = [string]$response.Content

  if ($AllowedStatus -notcontains $statusCode) {
    Write-Host "--- Request ---"
    Write-Host $json
    Write-Host "--- Response status ---"
    Write-Host $statusCode
    Write-Host "--- Response body ---"
    Write-Host $raw
    throw "[FAIL] Unexpected HTTP status $statusCode. Expected: $($AllowedStatus -join ', ')"
  }

  return @{
    StatusCode = $statusCode
    Body = $raw | ConvertFrom-Json
    Raw = $raw
  }
}

Write-Host ""
Write-Host "=== CodexForge direct approval retry API smoke ==="
Write-Host "Base URL: $BaseUrl"

$initial = Invoke-CodexForgeExecute `
  -AllowedStatus @(428) `
  -Body @{
    toolName = "render-job"
    mode = "execute"
    input = @{
      scene = "approval retry smoke"
      frames = 1
      quality = "preview"
    }
    context = @{
      domain = "blender"
      agentRuntimePolicy = @{
        approvalTools = @("render-job", "video-render")
        blockedTools = @()
      }
      agentTeam = @{
        primaryRole = "blender-operator"
        approvalTools = @("render-job", "video-render")
      }
    }
  }

Assert-True ($initial.StatusCode -eq 428) "initial render-job requires approval"
Assert-True ($null -ne $initial.Body.toolPolicySummary) "initial response includes visible tool policy"
Assert-True ($null -ne $initial.Body.toolPolicyReplayRequest) "initial response includes replay request"
Assert-True ($initial.Body.toolPolicySummary.requiresApproval -eq $true) "initial visible policy requires approval"
Assert-True ($initial.Body.toolPolicySummary.approvalSatisfied -eq $false) "initial visible policy approval not satisfied"
Assert-True ([string]::IsNullOrWhiteSpace($initial.Body.toolPolicySummary.approvalId) -eq $false) "initial visible policy includes approval id"
Assert-True ($initial.Body.toolPolicyReplayRequest.toolName -eq "render-job") "replay request preserves tool name"
Assert-True ($initial.Body.toolPolicyReplayRequest.mode -eq "execute") "replay request preserves execute mode"
Assert-True ($initial.Body.toolPolicyReplayRequest.input.scene -eq "approval retry smoke") "replay request preserves input"
Assert-True ($initial.Body.toolPolicyReplayRequest.context.domain -eq "blender") "replay request preserves context domain"

$approvalId = [string]$initial.Body.toolPolicySummary.approvalId
$replay = $initial.Body.toolPolicyReplayRequest

$approved = Invoke-CodexForgeExecute `
  -AllowedStatus @(200) `
  -Body @{
    toolName = $replay.toolName
    mode = $replay.mode
    input = $replay.input
    context = $replay.context
    approvalState = @{
      approved = $true
      approvalId = $approvalId
      approvedBy = "smoke-test"
      approvedAt = "2026-05-08T00:00:00.000Z"
    }
    metadata = @{
      approvalRetry = $true
      approvalId = $approvalId
    }
  }

Assert-True ($approved.StatusCode -eq 200) "approved replay returns HTTP 200"
Assert-True ($approved.Body.ok -eq $true) "approved replay response ok true"
Assert-True ($null -ne $approved.Body.result) "approved replay includes execution result"
Assert-True ($approved.Body.meta.policySource -eq "allowed") "approved replay policy allowed before executor dispatch"
Assert-True ($approved.Body.meta.requiresApproval -eq $true) "approved replay still identifies approval-gated tool"
Assert-True ($approved.Body.meta.approvalSatisfied -eq $true) "approved replay marks approval satisfied"
Assert-True ($approved.Body.meta.approvalId -eq $approvalId) "approved replay preserves approval id"
Assert-True ($approved.Body.meta.approvalSatisfied -eq $true) "approved replay meta marks approval satisfied"
Assert-True ($approved.Body.meta.approvalId -eq $approvalId) "approved replay meta preserves approval id"
Assert-True ($approved.Raw -notmatch "Tool execution requires explicit approval before running") "approved replay does not re-trigger missing approval rejection"
Assert-True ($approved.Raw -notmatch "Unknown tool") "approved replay does not hit unknown-tool executor boundary"
Assert-True ($approved.Body.result.ok -eq $true) "approved replay tool result ok true"
Assert-True ($approved.Body.result.data.executionMode -eq "local-safe-simulated") "approved replay uses local-safe render adapter"

Write-Host "[OK] CodexForge direct approval retry API smoke passed."
