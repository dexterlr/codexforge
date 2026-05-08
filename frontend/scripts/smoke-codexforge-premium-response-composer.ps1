param(
  [string]$BaseUrl = "http://localhost:3000"
)

$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "=== CodexForge premium response composer smoke ==="
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
        id = "user-premium-response-test"
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

function Invoke-CodexForgeChatWithHeaders {
  param(
    [string]$Text,
    [hashtable]$Context = @{}
  )

  $Body = @{
    messages = @(
      @{
        id = "user-premium-response-profile-test"
        role = "user"
        text = $Text
        ts = [DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds()
        structured = $null
        source = "api"
      }
    )
    context = $Context
  } | ConvertTo-Json -Depth 30

  Invoke-WebRequest `
    -UseBasicParsing `
    -Method Post `
    -Uri "$BaseUrl/api/codexforge/chat" `
    -ContentType "application/json" `
    -Body $Body
}

$BaseContext = @{
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

Write-Host ""
Write-Host "[RUN ] Premium product planning response"

$Response = Invoke-CodexForgeChat `
  -Text "Plan a premium CodexForge landing page. Include goal, pages, components, data, risks, and first three implementation steps." `
  -Context $BaseContext

$Structured = $Response.reply.structured
$Text = [string]$Response.reply.text
$SectionTitles = @($Structured.sections | ForEach-Object { [string]$_.title })

Assert-True ($Response.ok -eq $true) "response ok true"
Assert-True ($Response.meta.domain -eq "web") "meta domain is web"
Assert-True ($Structured.domain -eq "web") "structured domain is web"
Assert-True ($Structured.mode -eq "local") "structured mode is local"

Assert-True ($Text -match "Pages") "visible text includes Pages"
Assert-True ($Text -match "Components") "visible text includes Components"
Assert-True ($Text -match "Data") "visible text includes Data"
Assert-True ($Text -match "First three implementation steps") "visible text includes first three implementation steps"

Assert-True ($Text -notmatch "Engine trace") "visible text excludes Engine trace"
Assert-True ($Text -notmatch "Execution posture") "visible text excludes Execution posture"
Assert-True ($Text -notmatch "Response quality") "visible text excludes Response quality"
Assert-True ($Text -notmatch "Recommended tool names") "visible text excludes Recommended tool names"
Assert-True ($Text -notmatch "Tool audit") "visible text excludes Tool audit"
Assert-True ($Text -notmatch "Agent runtime policy") "visible text excludes Agent runtime policy"

Assert-True (-not ($SectionTitles -contains "Engine trace")) "structured sections exclude Engine trace"
Assert-True (-not ($SectionTitles -contains "Execution posture")) "structured sections exclude Execution posture"
Assert-True (-not ($SectionTitles -contains "Response quality")) "structured sections exclude Response quality"
Assert-True (-not ($SectionTitles -contains "Recommended tool names")) "structured sections exclude Recommended tool names"
Assert-True (-not ($SectionTitles -contains "Tool audit")) "structured sections exclude Tool audit"
Assert-True (-not ($SectionTitles -contains "Agent runtime policy")) "structured sections exclude Agent runtime policy"

Write-Host ""
Write-Host "[RUN ] Response profile headers"

$ProductProfileResponse = Invoke-CodexForgeChatWithHeaders `
  -Text "Plan a premium CodexForge landing page. Include goal, pages, components, data, risks, and first three implementation steps." `
  -Context $BaseContext

Assert-True ($ProductProfileResponse.Headers["x-codexforge-response-profile"] -eq "product-plan") "product planning response profile is product-plan"

$BlenderProfileResponse = Invoke-CodexForgeChatWithHeaders `
  -Text "Plan a Blender and ComfyUI cinematic workflow for a short product video. Include runtime policy, render approval gates, and quality gates." `
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
      domains = @("blender")
    }
  }

Assert-True ($BlenderProfileResponse.Headers["x-codexforge-response-profile"] -eq "runtime-policy") "Blender response profile is runtime-policy"

$DebugProfileResponse = Invoke-CodexForgeChatWithHeaders `
  -Text "Read src/lib/codexforge/chat/premium-response-composer.ts and tell me the best next edit point." `
  -Context @{
    mode = "local"
    projectName = "CodexForge"
    repoPath = (Get-Location).Path
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

Assert-True ($DebugProfileResponse.Headers["x-codexforge-response-profile"] -eq "grounded-inspection") "explicit file request response profile is grounded-inspection"

Write-Host ""
Write-Host "[RUN ] Static premium composer assertions"

$ComposerPath = Join-Path (Get-Location) "src\lib\codexforge\chat\premium-response-composer.ts"
$RoutePath = Join-Path (Get-Location) "src\app\api\codexforge\chat\route.ts"

$ComposerText = Get-Content -Raw $ComposerPath
$RouteText = Get-Content -Raw $RoutePath

Assert-True ($ComposerText -match "export type CodexForgeResponseProfile") "premium composer exports response profile type"
Assert-True ($ComposerText -match "responseProfile") "premium composer accepts response profile"
Assert-True ($ComposerText -match '"product-plan"') "premium composer supports product-plan profile"
Assert-True ($ComposerText -match '"runtime-policy"') "premium composer supports runtime-policy profile"
Assert-True ($ComposerText -match '"diagnostic"') "premium composer supports diagnostic profile"
Assert-True ($ComposerText -match '"execution"') "premium composer supports execution profile"
Assert-True ($ComposerText -match '"grounded-inspection"') "premium composer supports grounded-inspection profile"
Assert-True ($ComposerText -match "composePremiumCodexForgeResponse") "premium composer exports composer"
Assert-True ($ComposerText -match "function getStructuredDomain") "premium composer resolves structured domain"
Assert-True ($ComposerText -match [regex]::Escape("structured.domain ?? structured.plan?.domain")) "premium composer prefers structured domain before plan domain"
Assert-True ($ComposerText -match "function inferResponseProfile") "premium composer infers response profile"
Assert-True ($ComposerText -match [regex]::Escape("if (args.input.responseProfile)")) "premium composer respects explicit response profile"
Assert-True ($ComposerText -match [regex]::Escape('if (args.domain === "web")')) "premium composer maps web to product-plan"
Assert-True ($ComposerText -match [regex]::Escape('if (args.domain !== "general")')) "premium composer maps non-general domains to runtime-policy"
Assert-True ($ComposerText -match [regex]::Escape('profile === "runtime-policy"')) "premium composer exposes runtime policy sections for runtime profile"
Assert-True ($ComposerText -match "PREMIUM_VISIBLE_RUNTIME_POLICY_SECTION_LIMIT") "premium composer limits visible runtime policy sections"
Assert-True ($ComposerText -match [regex]::Escape("sections: cleanedSections")) "premium composer returns cleaned premium sections"
Assert-True ($ComposerText -match "PREMIUM_ALWAYS_HIDE_SECTION_TITLES") "premium composer has hidden section policy"
Assert-True ($ComposerText -match "engine trace") "premium composer blocks engine trace"
Assert-True ($ComposerText -match "response quality") "premium composer blocks response quality"
Assert-True ($ComposerText -match "execution posture") "premium composer blocks execution posture"
Assert-True ($RouteText -match "resolveResponseProfile") "route resolves response profile"
Assert-True ($RouteText -match "responseProfile,") "route passes response profile"
Assert-True ($RouteText -match "x-codexforge-response-profile") "route exposes response profile header"
Assert-True ($RouteText -match "structured: premiumStructured") "final validation uses premium structured payload"

Write-Host ""
Write-Host "[OK] CodexForge premium response composer smoke passed."
