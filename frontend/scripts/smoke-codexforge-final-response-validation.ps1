param(
  [string]$BaseUrl = "http://localhost:3000"
)

$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "=== CodexForge final response validation smoke ==="
Write-Host "Base URL: $BaseUrl"

function Assert-True {
  param(
    [bool]$Condition,
    [string]$Message
  )

  if (-not $Condition) {
    throw "[FAIL] $Message"
  }

  Write-Host "[PASS] $Message"
}

function Invoke-CodexForgeChat {
  param(
    [string]$Text,
    [hashtable]$Context = @{}
  )

  $Body = @{
    messages = @(
      @{
        id = "user-final-validation-test"
        role = "user"
        text = $Text
        ts = [DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds()
        structured = $null
        source = "api"
      }
    )
    context = $Context
  } | ConvertTo-Json -Depth 30

  Invoke-RestMethod `
    -Method Post `
    -Uri "$BaseUrl/api/codexforge/chat" `
    -ContentType "application/json" `
    -Body $Body
}

function Get-Structured {
  param($Response)

  if (-not $Response.reply) {
    throw "[FAIL] Response missing reply payload."
  }

  if (-not $Response.reply.structured) {
    throw "[FAIL] Response missing structured payload."
  }

  return $Response.reply.structured
}

Write-Host ""
Write-Host "[RUN ] Product surface final validation"

$ProductResponse = Invoke-CodexForgeChat `
  -Text "Plan a god-tier landing page for CodexForge with sections, components, data, risks, and first implementation steps." `
  -Context @{
    mode = "local"
    projectName = "CodexForge"
    codexforgeCapabilities = @{
      structuredReplies = $true
      localExecution = $true
      approvals = $true
      diffPreviews = $true
      snapshots = $true
      brainGraph = $true
      domains = @("web")
    }
  }

$ProductStructured = Get-Structured $ProductResponse

Assert-True ($ProductResponse.ok -eq $true) "product response ok true"
Assert-True ($ProductResponse.meta.domain -eq "web") "product meta domain is web"
Assert-True ($ProductStructured.domain -eq "web") "product structured domain matches meta"
Assert-True ($ProductStructured.mode -eq "local") "product structured mode is local"
Assert-True ($ProductStructured.mode -ne "remote") "product structured mode is never remote"
Assert-True (-not $ProductStructured.execution) "product non-execution reply has no stale execution payload"
Assert-True (-not $ProductStructured.snapshot) "product planning reply has no stale snapshot payload"
Assert-True (-not $ProductStructured.approvals) "product planning reply has no stale approval payload"
Assert-True (-not $ProductStructured.diffPreviews) "product planning reply has no stale diff preview payload"
Assert-True ($ProductResponse.reply.text -match "Pages") "product visible text includes Pages"
Assert-True ($ProductResponse.reply.text -notmatch "Execution posture") "product visible text excludes Execution posture"
Assert-True ($ProductResponse.reply.text -notmatch "Engine trace") "product visible text excludes Engine trace"

Write-Host ""
Write-Host "[RUN ] Latest-message authority final validation"

$LatestResponse = Invoke-CodexForgeChat `
  -Text "Fix stale Active Task contamination. Use src/lib/codexforge/chat/use-codexforge-chat.ts as the target. No ChatMessage. No engine.ts. No engine-grounded-render. No approval-driven diff previews. No search-project/read-file stale evidence." `
  -Context @{
    mode = "local"
    projectName = "CodexForge"
    activePlan = @{
      goal = "Build approval-driven diff previews"
      nextAction = "Force stale safe inspection"
      domain = "automation"
      tags = @("stale", "approval-driven")
      notes = @("This stale active task must not win.")
    }
    execution = @{
      running = $true
      enginePhase = "awaiting_diff_approval"
      diffCount = 5
      snapshotFileCount = 12
    }
    codexforgeCapabilities = @{
      structuredReplies = $true
      localExecution = $true
      approvals = $true
      diffPreviews = $true
      snapshots = $true
      brainGraph = $true
      domains = @("debug")
    }
  }

$LatestStructured = Get-Structured $LatestResponse

Assert-True ($LatestResponse.ok -eq $true) "latest-message response ok true"
Assert-True ($LatestResponse.meta.domain -eq "debug") "latest-message meta domain is debug"
Assert-True ($LatestStructured.domain -eq "debug") "latest-message structured domain matches meta"
Assert-True ($LatestStructured.mode -eq "local-execution") "latest-message structured mode is local-execution"
Assert-True ($LatestStructured.mode -ne "remote") "latest-message structured mode is never remote"
Assert-True ($LatestStructured.execution.phase -eq "idle") "latest-message execution phase repaired to idle"
Assert-True ($LatestStructured.execution.diffCount -eq 0) "latest-message diff count repaired to zero"
Assert-True ($LatestStructured.snapshot.fileCount -eq 0) "latest-message snapshot file count repaired to zero"
Assert-True ($LatestResponse.reply.text -match "CodexForge latest-message authority") "latest-message visible text includes authority title"
Assert-True ($LatestResponse.reply.text -match "src/lib/codexforge/chat/use-codexforge-chat.ts") "latest-message visible text includes grounded target"
Assert-True ($LatestResponse.reply.text -match "No ChatMessage") "latest-message visible text blocks ChatMessage"
Assert-True ($LatestResponse.reply.text -match "No engine.ts") "latest-message visible text blocks engine.ts"
Assert-True ($LatestResponse.reply.text -match "No approval-driven diff previews") "latest-message visible text blocks stale approval preview route"

Write-Host ""
Write-Host "[RUN ] Static final validation seam assertions"

$RoutePath = Join-Path (Get-Location) "src\app\api\codexforge\chat\route.ts"
$RouteText = Get-Content -Raw $RoutePath

Assert-True ($RouteText -match "function validateFinalCodexForgeResponse") "route defines validateFinalCodexForgeResponse"
Assert-True ($RouteText -match "finalValidation\s*=\s*validateFinalCodexForgeResponse") "route invokes final validation before success response"
Assert-True ($RouteText -match "text: finalValidation\.text") "success response uses finalValidation text"
Assert-True ($RouteText -match "structured: finalValidation\.structured") "success response uses finalValidation structured payload"
Assert-True ($RouteText -match "\.\.\.finalValidation\.warnings") "final validation warnings are merged"
Assert-True ($RouteText -match 'args\.resolvedChatMode === "remote" \? "local" : args\.resolvedChatMode') "remote chat mode is mapped to structured local mode"
Assert-True ($RouteText -match "Final response removed stale execution payload from non-execution reply") "non-execution stale execution guard exists"
Assert-True ($RouteText -match "Final response enforced production-only response scrub") "production-only final scrub guard exists"

Write-Host ""
Write-Host "[OK] CodexForge final response validation smoke passed."
