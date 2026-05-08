param(
  [string]$BaseUrl = "http://localhost:3000"
)

$ErrorActionPreference = "Stop"

Write-Host ""
Write-Host "=== CodexForge domain alignment smoke ==="
Write-Host "Base URL: $BaseUrl"

function Assert-Equal {
  param(
    [string]$Label,
    [object]$Actual,
    [object]$Expected
  )

  if ($Actual -ne $Expected) {
    throw "[FAIL] $Label expected '$Expected' but got '$Actual'"
  }

  Write-Host "[PASS] $Label is $Expected"
}

function Invoke-CodexForgeChat {
  param(
    [string]$Label,
    [string]$Message,
    [string]$ExpectedDomain,
    [string]$ExpectedProfile
  )

  Write-Host ""
  Write-Host "[RUN ] $Label"

  $Body = @{
    messages = @(
      @{
        id = "msg-domain-smoke"
        role = "user"
        text = $Message
        ts = [DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds()
      }
    )
    context = @{
      projectName = "CodexForge"
      systemGuide = "CodexForge smoke test request."
      mode = "local"
    }
  } | ConvertTo-Json -Depth 20

  $Response = Invoke-WebRequest `
    -Uri "$BaseUrl/api/codexforge/chat" `
    -Method POST `
    -ContentType "application/json" `
    -Body $Body `
    -UseBasicParsing

  Assert-Equal "$Label HTTP status" $Response.StatusCode 200

  $Json = $Response.Content | ConvertFrom-Json

  $HeaderDomain = $Response.Headers["x-codexforge-domain"]
  $CapabilityDomain = $Response.Headers["x-codexforge-capability-domain"]
  $Profile = $Response.Headers["x-codexforge-response-profile"]

  Assert-Equal "$Label header domain" $HeaderDomain $ExpectedDomain
  Assert-Equal "$Label capability domain" $CapabilityDomain $ExpectedDomain
  Assert-Equal "$Label meta domain" $Json.meta.domain $ExpectedDomain
  Assert-Equal "$Label structured domain" $Json.reply.structured.domain $ExpectedDomain
  Assert-Equal "$Label structured plan domain" $Json.reply.structured.plan.domain $ExpectedDomain
  Assert-Equal "$Label response profile" $Profile $ExpectedProfile

  Write-Host "[PASS] $Label final domain alignment"
}

Invoke-CodexForgeChat `
  -Label "Blender runtime policy" `
  -ExpectedDomain "blender" `
  -ExpectedProfile "runtime-policy" `
  -Message "Plan a Blender and ComfyUI cinematic workflow for a short product video. Include runtime policy, render approval gates, and quality gates."

Invoke-CodexForgeChat `
  -Label "Trading runtime policy" `
  -ExpectedDomain "trading" `
  -ExpectedProfile "runtime-policy" `
  -Message "Research a crypto trading workflow and outline the runtime policy. Do not execute broker actions."

Invoke-CodexForgeChat `
  -Label "Deck runtime policy" `
  -ExpectedDomain "decks" `
  -ExpectedProfile "runtime-policy" `
  -Message "Plan a CodexForge investor deck and include the runtime policy, export approval gates, and quality gates."

Write-Host ""
Write-Host "[OK] CodexForge domain alignment smoke passed."
