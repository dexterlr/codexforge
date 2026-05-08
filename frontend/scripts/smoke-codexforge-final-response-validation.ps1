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
$RouteResponseUtilsPath = Join-Path (Get-Location) "src\lib\codexforge\chat\route-response-utils.ts"
Assert-True (Test-Path $RouteResponseUtilsPath) "route response utilities module exists"

$RouteResponseUtilsText = Get-Content -Raw $RouteResponseUtilsPath
Assert-True ($RouteResponseUtilsText -match "export function scrubProductionOnlyVisibleText") "route response utilities exports production scrub helper"
Assert-True ($RouteResponseUtilsText -match "export function isProductionOnlyPlanningRequest") "route response utilities exports production planning detector"
Assert-True ($RouteResponseUtilsText -match "export function boolHeader") "route response utilities exports boolean header helper"
Assert-True ($RouteResponseUtilsText -match "export function buildJsonHeaders") "route response utilities exports JSON header builder"
Assert-True ($RouteText -match "route-response-utils") "route imports route response utilities module"
Assert-True ($RouteText -notmatch "function scrubProductionOnlyVisibleText") "route no longer owns production scrub helper"
Assert-True ($RouteText -notmatch "function isProductionOnlyPlanningRequest") "route no longer owns production planning detector"
Assert-True ($RouteText -notmatch "function boolHeader") "route no longer owns boolean header helper"
Assert-True ($RouteText -notmatch "function buildJsonHeaders") "route no longer owns JSON header builder"

$LatestOverridePath = Join-Path (Get-Location) "src\lib\codexforge\chat\latest-message-override-response.ts"
$LatestContextPath = Join-Path (Get-Location) "src\lib\codexforge\chat\latest-message-override-context.ts"
Assert-True (Test-Path $LatestContextPath) "latest-message override context module exists"

$LatestContextText = Get-Content -Raw $LatestContextPath
Assert-True ($LatestContextText -match "export function buildRouteLatestMessageOverrideContext") "latest-message context module exports override context helper"
Assert-True ($LatestContextText -match "export function getLatestMessageOverridePreferredPath") "latest-message context module exports preferred path helper"
Assert-True ($RouteText -match "latest-message-override-context") "route imports latest-message context module"
Assert-True ($RouteText -notmatch "function buildRouteLatestMessageOverrideContext") "route no longer owns latest-message override context helper"
Assert-True ($RouteText -notmatch "function getLatestMessageOverridePreferredPath") "route no longer owns latest-message preferred path helper"
Assert-True (Test-Path $LatestOverridePath) "latest-message override response module exists"

$LatestOverrideText = Get-Content -Raw $LatestOverridePath
Assert-True ($LatestOverrideText -match "export function buildLatestMessageOverrideSuccessResponse") "latest-message module exports response builder"
Assert-True ($LatestOverrideText -match "type LatestMessageOverrideResponseDeps") "latest-message module has explicit dependency contract"
Assert-True ($LatestOverrideText -match "deps\.makeId\(\)") "latest-message module receives id factory dependency"
Assert-True ($LatestOverrideText -match "deps\.modelName") "latest-message module receives model name dependency"
Assert-True ($LatestOverrideText -notmatch "uid\(") "latest-message module does not capture route-local uid"
Assert-True ($LatestOverrideText -notmatch "MODEL_NAME") "latest-message module does not capture route-local model constant"
Assert-True ($RouteText -match "latest-message-override-response") "route imports latest-message override module"
Assert-True ($RouteText -match "makeId:\s*uid") "route passes latest-message id dependency"
Assert-True ($RouteText -match "modelName:\s*MODEL_NAME") "route passes latest-message model dependency"
Assert-True ($RouteText -notmatch "function buildLatestMessageOverrideSuccessResponse") "route no longer owns latest-message response builder"
$ResponseDefaultsPath = Join-Path (Get-Location) "src\lib\codexforge\chat\response-defaults.ts"
Assert-True (Test-Path $ResponseDefaultsPath) "response defaults module exists"

$ResponseDefaultsText = Get-Content -Raw $ResponseDefaultsPath
Assert-True ($ResponseDefaultsText -match "applyRouteVisibleStructuredDefaults") "response defaults exports visible structured defaults"
Assert-True ($ResponseDefaultsText -match "snapshotFileCount") "response defaults preserves execution snapshot defaults"
Assert-True ($ResponseDefaultsText -match "sampledPaths") "response defaults preserves snapshot sampled paths default"
Assert-True ($RouteText -match "response-defaults") "route imports response defaults module"
Assert-True ($RouteText -match "applyRouteVisibleStructuredDefaults") "route uses extracted visible structured defaults"
Assert-True ($RouteText -notmatch "function applyRouteVisibleStructuredDefaults") "route no longer owns visible structured defaults helper"
$ResponseContractPath = Join-Path (Get-Location) "src\lib\codexforge\chat\response-contract.ts"
Assert-True (Test-Path $ResponseContractPath) "response contract module exists"

$ResponseContractText = Get-Content -Raw $ResponseContractPath
Assert-True ($ResponseContractText -match "resolveCodexForgeResponseDomain") "response contract resolves final domain"
Assert-True ($ResponseContractText -match "resolveCodexForgeResponseProfile") "response contract resolves response profile"
Assert-True ($ResponseContractText -match "validateFinalCodexForgeResponse") "response contract validates final response"
Assert-True ($ResponseContractText -match "capabilityMatched") "response contract honors capability match authority"
Assert-True ($ResponseContractText -match [regex]::Escape('args.capabilityDomain !== "general"')) "response contract prioritizes non-general capability domain"
Assert-True ($ResponseContractText -match "Final response domain mismatch repaired") "response contract repairs domain mismatch"
Assert-True ($ResponseContractText -match "Final response removed stale execution payload") "response contract removes stale execution payload"
Assert-True ($ResponseContractText -match "Final response enforced production-only response scrub") "response contract enforces production-only scrub"
Assert-True ($RouteText -match "response-contract") "route imports response contract module"
Assert-True ($RouteText -match "resolveCodexForgeResponseDomain") "route uses extracted domain resolver"
Assert-True ($RouteText -match "resolveCodexForgeResponseProfile") "route uses extracted profile resolver"
Assert-True ($RouteText -notmatch "function resolveResponseDomain") "route no longer owns domain resolver"
Assert-True ($RouteText -notmatch "function resolveResponseProfile") "route no longer owns profile resolver"
Assert-True ($RouteText -notmatch "function validateFinalCodexForgeResponse") "route no longer owns final validation helper"

Assert-True ($RouteText -match "finalValidation\s*=\s*validateFinalCodexForgeResponse") "route invokes extracted final validation before success response"
Assert-True ($RouteText -match "text: finalValidation\.text") "success response uses finalValidation text"
Assert-True ($RouteText -match "structured: finalValidation\.structured") "success response uses finalValidation structured payload"
Assert-True ($RouteText -match "\.\.\.finalValidation\.warnings") "final validation warnings are merged"
Assert-True ($ResponseContractText -match 'args\.resolvedChatMode === "remote" \? "local" : args\.resolvedChatMode') "remote chat mode is mapped to structured local mode"
Assert-True ($ResponseContractText -match "Final response removed stale execution payload from non-execution reply") "non-execution stale execution guard exists"
Assert-True ($ResponseContractText -match "Final response enforced production-only response scrub") "production-only final scrub guard exists"

Write-Host ""
Write-Host "[OK] CodexForge final response validation smoke passed."
