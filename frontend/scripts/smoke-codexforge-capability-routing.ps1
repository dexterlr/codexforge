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


