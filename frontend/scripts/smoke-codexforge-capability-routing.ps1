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
  },
  @{
    Name = "Blender"
    Prompt = "Plan a Blender procedural scene with geometry nodes, materials, lighting, camera, and render settings."
    ExpectedDomain = "blender"
  },
  @{
    Name = "Design"
    Prompt = "Create a premium UI design system with typography, spacing, responsive layout, and visual hierarchy."
    ExpectedDomain = "design"
  },
  @{
    Name = "Marketing"
    Prompt = "Plan a marketing campaign with landing copy, funnel, CTA, analytics, and creative variants."
    ExpectedDomain = "marketing"
  },
  @{
    Name = "Decks"
    Prompt = "Create a pitch deck with slide-by-slide structure, speaker notes, story arc, and executive readability."
    ExpectedDomain = "decks"
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

    if ($domain -ne $case.ExpectedDomain -or $matched -ne "true") {
      $failures += "$($case.Name): expected domain=$($case.ExpectedDomain), matched=true; got domain=$domain, matched=$matched, tags=$tags"
    } else {
      Write-Host "PASS $($case.Name): domain=$domain matched=$matched tags=$tags"
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

