$ErrorActionPreference = "Stop"

$baseUrl = $env:CODEXFORGE_SMOKE_BASE_URL
if ([string]::IsNullOrWhiteSpace($baseUrl)) {
  $baseUrl = "http://localhost:3000"
}

$cases = @(
  @{
    Name = "Trading"
    Prompt = "Plan a stock and crypto trading research workflow with backtesting and paper trading first."
    ExpectedDomain = "trading"
    ExpectedAgent = "trading-researcher"
  },
  @{
    Name = "Blender"
    Prompt = "Plan a Blender procedural scene with geometry nodes, materials, lighting, camera, and render settings."
    ExpectedDomain = "blender"
    ExpectedAgent = "blender-operator"
  },
  @{
    Name = "Design"
    Prompt = "Create a premium UI design system with typography, spacing, responsive layout, and visual hierarchy."
    ExpectedDomain = "design"
    ExpectedAgent = "design-director"
  },
  @{
    Name = "Marketing"
    Prompt = "Plan a marketing campaign with landing copy, funnel, CTA, analytics, and creative variants."
    ExpectedDomain = "marketing"
    ExpectedAgent = "marketing-strategist"
  },
  @{
    Name = "Decks"
    Prompt = "Create a pitch deck with slide-by-slide structure, speaker notes, story arc, and executive readability."
    ExpectedDomain = "decks"
    ExpectedAgent = "deck-strategist"
  }
)

$failures = @()

foreach ($case in $cases) {
  $body = @{
    messages = @(
      @{
        id = "smoke-user"
        role = "user"
        text = $case.Prompt
        createdAt = [DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds()
      }
    )
    context = @{
      codexforgeCapabilities = @{
        structuredReplies = $true
        repoAwarePlanning = $true
      }
    }
  } | ConvertTo-Json -Depth 20

  try {
    $response = Invoke-WebRequest `
      -Uri "$baseUrl/api/codexforge/chat" `
      -Method POST `
      -ContentType "application/json" `
      -Body $body `
      -UseBasicParsing

    $domain = $response.Headers["x-codexforge-capability-domain"]
    $matched = $response.Headers["x-codexforge-capability-matched"]
    $tags = $response.Headers["x-codexforge-capability-tags"]
    $agent = $response.Headers["x-codexforge-agent-primary-role"]
    $supportRoles = $response.Headers["x-codexforge-agent-support-roles"]
    $approvalTools = $response.Headers["x-codexforge-agent-approval-tools"]
    $blockedTools = $response.Headers["x-codexforge-agent-blocked-tools"]

    if ($domain -ne $case.ExpectedDomain -or $matched -ne "true" -or $agent -ne $case.ExpectedAgent) {
      $failures += "$($case.Name): expected domain=$($case.ExpectedDomain), matched=true, agent=$($case.ExpectedAgent); got domain=$domain, matched=$matched, agent=$agent, tags=$tags"
    } else {
      Write-Host "PASS $($case.Name): domain=$domain agent=$agent matched=$matched tags=$tags"
      Write-Host "     support=$supportRoles approvalTools=$approvalTools blockedTools=$blockedTools"
    }
  } catch {
    $failures += "$($case.Name): request failed: $($_.Exception.Message)"
  }
}

if ($failures.Count -gt 0) {
  Write-Host ""
  Write-Host "Capability routing smoke test failed:"
  foreach ($failure in $failures) {
    Write-Host " - $failure"
  }
  exit 1
}

Write-Host ""
Write-Host "All CodexForge capability routing smoke tests passed."

Write-Host "`n=== Visible agent-team influence smoke tests ==="

$visibleCases = @(
  @{
    Name = "Blender visible influence"
    Prompt = "Plan a Blender and ComfyUI cinematic workflow for a short product video. Show the agent-directed plan and approval gates."
    ExpectedDomain = "blender"
    ExpectedPrimary = "blender-operator"
    RequiredText = @(
      "Agent-directed planning",
      "Agent safety and approval gates",
      "Primary: Blender Operator",
      "Approval tools:"
    )
  },
  @{
    Name = "Trading visible influence"
    Prompt = "Research a crypto trading workflow and outline what the trading agent should do without executing broker actions."
    ExpectedDomain = "trading"
    ExpectedPrimary = "trading-researcher"
    RequiredText = @(
      "Agent-directed planning",
      "Agent safety and approval gates",
      "Primary: Trading Researcher",
      "Blocked tools:"
    )
  },
  @{
    Name = "Decks visible influence"
    Prompt = "Plan a deck for CodexForge investor positioning with research, design, and export approval gates."
    ExpectedDomain = "decks"
    ExpectedPrimary = "deck-strategist"
    RequiredText = @(
      "Agent-directed planning",
      "Agent safety and approval gates",
      "Primary: Deck Strategist",
      "Approval tools:"
    )
  }
)

foreach ($case in $visibleCases) {
  Write-Host "[RUN ] $($case.Name)"

  $body = @{
    messages = @(
      @{
        role = "user"
        text = $case.Prompt
      }
    )
  } | ConvertTo-Json -Depth 8

  $response = Invoke-WebRequest `
    -Uri "$BaseUrl/api/codexforge/chat" `
    -Method POST `
    -Body $body `
    -ContentType "application/json" `
    -UseBasicParsing

  if ($response.StatusCode -ne 200) {
    throw "[FAIL] $($case.Name) HTTP status was $($response.StatusCode)"
  }

  $json = $response.Content | ConvertFrom-Json

  if (-not $json.ok) {
    throw "[FAIL] $($case.Name) response ok was not true"
  }

  $domainHeader = $response.Headers["x-codexforge-domain"]
  if ($domainHeader -ne $case.ExpectedDomain) {
    throw "[FAIL] $($case.Name) expected domain header '$($case.ExpectedDomain)', got '$domainHeader'"
  }

  $primaryHeader = $response.Headers["x-codexforge-agent-primary"]
  if ($primaryHeader -ne $case.ExpectedPrimary) {
    throw "[FAIL] $($case.Name) expected primary agent '$($case.ExpectedPrimary)', got '$primaryHeader'"
  }

  $text = [string]$json.reply.text

  foreach ($required in $case.RequiredText) {
    if (-not $text.Contains($required)) {
      Write-Host "`n=== Visible text for failed case ==="
      $text
      throw "[FAIL] $($case.Name) visible text missing: $required"
    }

    Write-Host "[PASS] $($case.Name) visible text includes: $required"
  }

  $sectionTitles = @()
  if ($json.reply.structured.sections) {
    $sectionTitles = @($json.reply.structured.sections | ForEach-Object { $_.title })
  }

  foreach ($requiredSection in @("Agent-directed planning", "Agent safety and approval gates")) {
    if ($sectionTitles -notcontains $requiredSection) {
      Write-Host "`n=== Structured section titles for failed case ==="
      $sectionTitles
      throw "[FAIL] $($case.Name) structured sections missing: $requiredSection"
    }

    Write-Host "[PASS] $($case.Name) structured section exists: $requiredSection"
  }

  Write-Host "[PASS] $($case.Name)"
}

Write-Host "[PASS] visible agent-team influence smoke tests passed"
