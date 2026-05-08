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

Write-Host "
=== Visible agent-team influence smoke tests ==="

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

  $primaryCandidates = @(
    $response.Headers["x-codexforge-agent-primary"],
    $response.Headers["x-codexforge-agent-team-primary"],
    $response.Headers["x-codexforge-primary-agent"],
    $json.meta.agentTeam.primary.id,
    $json.meta.agentTeam.primary.role,
    $json.meta.agentTeam.primary.name,
    $json.meta.agentTeam.primary.label,
    $json.meta.agentTeam.primaryRole.id,
    $json.meta.agentTeam.primaryRole.role,
    $json.meta.agentTeam.primaryRole.name,
    $json.meta.agentTeam.primaryRole.label,
    $json.reply.structured.agentTeam.primary.id,
    $json.reply.structured.agentTeam.primary.role,
    $json.reply.structured.agentTeam.primary.name,
    $json.reply.structured.agentTeam.primary.label,
    $json.reply.structured.agentTeam.primaryRole.id,
    $json.reply.structured.agentTeam.primaryRole.role,
    $json.reply.structured.agentTeam.primaryRole.name,
    $json.reply.structured.agentTeam.primaryRole.label
  )

  $primaryHeader = [string](@(
    $primaryCandidates |
      ForEach-Object {
        if ($_ -is [array]) {
          $_ | Select-Object -First 1
        } else {
          $_
        }
      } |
      Where-Object { -not [string]::IsNullOrWhiteSpace([string]$_) } |
      Select-Object -First 1
  ))

  if ($primaryHeader -ne $case.ExpectedPrimary) {
    Write-Host "
=== Response headers for failed primary-agent assertion ==="
    $response.Headers.GetEnumerator() | ForEach-Object {
      Write-Host "$($_.Key): $($_.Value)"
    }

    Write-Host "
=== Structured agent team for failed primary-agent assertion ==="
    $json.reply.structured.agentTeam | ConvertTo-Json -Depth 10

    Write-Host "
=== Meta agent team for failed primary-agent assertion ==="
    $json.meta.agentTeam | ConvertTo-Json -Depth 10

    throw "[FAIL] $($case.Name) expected primary agent '$($case.ExpectedPrimary)', got '$primaryHeader'"
  }

  Write-Host "[PASS] $($case.Name) primary agent: $primaryHeader"

  $text = [string]$json.reply.text

  foreach ($required in $case.RequiredText) {
    if (-not $text.Contains($required)) {
      Write-Host "
=== Visible text for failed case ==="
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
      Write-Host "
=== Structured section titles for failed case ==="
      $sectionTitles
      throw "[FAIL] $($case.Name) structured sections missing: $requiredSection"
    }

    Write-Host "[PASS] $($case.Name) structured section exists: $requiredSection"
  }

  Write-Host "[PASS] $($case.Name)"
}

Write-Host "[PASS] visible agent-team influence smoke tests passed"

Write-Host "
=== Visible agent runtime policy smoke tests ==="

$runtimePolicyCases = @(
  @{
    Name = "Blender runtime policy"
    Prompt = "Plan a Blender and ComfyUI cinematic workflow for a short product video. Include runtime policy, render approval gates, and quality gates."
    ExpectedDomain = "blender"
    RequiredText = @(
      "Agent runtime policy",
      "Runtime rules",
      "Safety rules",
      "Quality gates",
      "Approval-required tools:",
      "render-job",
      "video-render"
    )
    ForbiddenText = @()
  },
  @{
    Name = "Trading runtime policy"
    Prompt = "Research a crypto trading workflow and outline the runtime policy. Do not execute broker actions."
    ExpectedDomain = "trading"
    RequiredText = @(
      "Agent runtime policy",
      "Runtime rules",
      "Safety rules",
      "Quality gates",
      "Blocked tools:",
      "broker-execution"
    )
    ForbiddenText = @(
      "I will place",
      "I can place a trade",
      "executing broker action"
    )
  },
  @{
    Name = "Decks runtime policy"
    Prompt = "Plan a CodexForge investor deck and include the runtime policy, export approval gates, and quality gates."
    ExpectedDomain = "decks"
    RequiredText = @(
      "Agent runtime policy",
      "Runtime rules",
      "Safety rules",
      "Quality gates",
      "Approval-required tools:",
      "deck-export"
    )
    ForbiddenText = @()
  }
)

foreach ($case in $runtimePolicyCases) {
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
    throw "[FAIL] $($case.Name) expected domain '$($case.ExpectedDomain)', got '$domainHeader'"
  }

  $text = [string]$json.reply.text

  foreach ($required in $case.RequiredText) {
    if (-not $text.Contains($required)) {
      Write-Host "
=== Visible text for failed runtime-policy case ==="
      $text
      throw "[FAIL] $($case.Name) visible text missing: $required"
    }

    Write-Host "[PASS] $($case.Name) visible text includes: $required"
  }

  foreach ($forbidden in $case.ForbiddenText) {
    if ($text.Contains($forbidden)) {
      Write-Host "
=== Visible text for forbidden runtime-policy case ==="
      $text
      throw "[FAIL] $($case.Name) visible text contains forbidden phrase: $forbidden"
    }

    Write-Host "[PASS] $($case.Name) visible text excludes: $forbidden"
  }

  $sectionTitles = @()
  if ($json.reply.structured.sections) {
    $sectionTitles = @($json.reply.structured.sections | ForEach-Object { $_.title })
  }

  foreach ($requiredSection in @("Agent runtime policy", "Runtime rules", "Safety rules", "Quality gates")) {
    if ($sectionTitles -notcontains $requiredSection) {
      Write-Host "
=== Structured section titles for failed runtime-policy case ==="
      $sectionTitles
      throw "[FAIL] $($case.Name) structured sections missing: $requiredSection"
    }

    Write-Host "[PASS] $($case.Name) structured section exists: $requiredSection"
  }

  Write-Host "[PASS] $($case.Name)"
}

Write-Host "[PASS] visible agent runtime policy smoke tests passed"

Write-Host "
=== Direct executable tool-policy smoke tests ==="

$scriptRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$repoRoot = Split-Path -Parent $scriptRoot
$guardPath = Join-Path $repoRoot "src/lib/codexforge/tools/tool-policy-guard.ts"
$executeRoutePath = Join-Path $repoRoot "src/app/api/codexforge/tools/execute/route.ts"

$guardContent = Get-Content -Raw $guardPath
$executeRouteContent = Get-Content -Raw $executeRoutePath

$directPolicyCases = @(
  @{
    Name = "Trading blocks broker execution"
    Required = @(
      "broker-execution",
      "Tool execution blocked by CodexForge runtime policy"
    )
  },
  @{
    Name = "Blender requires render approval"
    Required = @(
      "render-job",
      "video-render",
      "Tool execution requires explicit approval"
    )
  },
  @{
    Name = "Deck export requires approval"
    Required = @(
      "deck-export",
      "Approval-required tools"
    )
  },
  @{
    Name = "Mutation tools are approval gated"
    Required = @(
      "apply-diff",
      "write-file",
      "run-command",
      "run-tests",
      "build-web-app",
      "generate-diff"
    )
  },
  @{
    Name = "Read tools are known safe tools"
    Required = @(
      "read-file",
      "list-files",
      "search-project",
      "snapshot-project"
    )
  }
)

foreach ($case in $directPolicyCases) {
  Write-Host "[RUN ] $($case.Name)"

  foreach ($required in $case.Required) {
    if ($guardContent -notmatch [regex]::Escape($required)) {
      throw "[FAIL] $($case.Name) guard missing: $required"
    }

    Write-Host "[PASS] $($case.Name) guard includes: $required"
  }

  Write-Host "[PASS] $($case.Name)"
}

foreach ($required in @("evaluateCodexForgeToolPolicy", "toolPolicyDecision", "toolPolicy")) {
  if ($executeRouteContent -notmatch [regex]::Escape($required)) {
    throw "[FAIL] execute route missing executable policy marker: $required"
  }

  Write-Host "[PASS] execute route includes executable policy marker: $required"
}

Write-Host "[PASS] direct executable tool-policy smoke tests passed"

Write-Host "
=== Direct execute API tool-policy enforcement smoke tests ==="

$executePolicyCases = @(
  @{
    Name = "Execute API blocks trading broker execution"
    Body = @{
      toolName = "broker-execution"
      input = @{}
      context = @{
        domain = "trading"
      }
    }
    ExpectedStatus = 403
    RequiredText = @(
      "Tool execution blocked by CodexForge runtime policy",
      "broker-execution"
    )
  },
  @{
    Name = "Execute API requires approval for Blender render job"
    Body = @{
      toolName = "render-job"
      input = @{}
      context = @{
        domain = "blender"
      }
    }
    ExpectedStatus = 428
    RequiredText = @(
      "Tool execution requires explicit approval",
      "render-job"
    )
  },
  @{
    Name = "Execute API allows read-only search project"
    Body = @{
      toolName = "search-project"
      input = @{
        query = "codexforge"
      }
      context = @{
        domain = "design"
      }
    }
    ExpectedStatus = 200
    RequiredText = @(
      """ok"""
    )
  }
)

foreach ($case in $executePolicyCases) {
  Write-Host "[RUN ] $($case.Name)"

  $body = $case.Body | ConvertTo-Json -Depth 12

  try {
    $response = Invoke-WebRequest `
      -Uri "$BaseUrl/api/codexforge/tools/execute" `
      -Method POST `
      -Body $body `
      -ContentType "application/json" `
      -UseBasicParsing

    $statusCode = [int]$response.StatusCode
    $content = [string]$response.Content
  } catch {
    if (-not $_.Exception.Response) {
      throw
    }

    $statusCode = [int]$_.Exception.Response.StatusCode
    $stream = $_.Exception.Response.GetResponseStream()
    $reader = New-Object System.IO.StreamReader($stream)
    $content = $reader.ReadToEnd()
  }

  if ($statusCode -ne $case.ExpectedStatus) {
    Write-Host "
=== Execute policy response body ==="
    Write-Host $content
    throw "[FAIL] $($case.Name) expected HTTP $($case.ExpectedStatus), got $statusCode"
  }

  Write-Host "[PASS] $($case.Name) HTTP $statusCode"

  foreach ($required in $case.RequiredText) {
    if (-not $content.Contains($required)) {
      Write-Host "
=== Execute policy response body ==="
      Write-Host $content
      throw "[FAIL] $($case.Name) response missing: $required"
    }

    Write-Host "[PASS] $($case.Name) response includes: $required"
  }

  if ($case.ExpectedStatus -ne 200 -and -not $content.Contains("toolPolicy")) {
    Write-Host "
=== Execute policy response body ==="
    Write-Host $content
    throw "[FAIL] $($case.Name) policy rejection missing top-level toolPolicy payload"
  }

  if ($case.ExpectedStatus -ne 200) {
    Write-Host "[PASS] $($case.Name) rejection includes top-level toolPolicy payload"
  }

  Write-Host "[PASS] $($case.Name)"
}

Write-Host "[PASS] direct execute API tool-policy enforcement smoke tests passed"

Write-Host "
=== Direct execute API visible tool-policy UX smoke tests ==="

$visiblePolicyCases = @(
  @{
    Name = "Visible rejection for broker execution"
    Body = @{
      toolName = "broker-execution"
      input = @{}
      context = @{
        domain = "trading"
      }
    }
    ExpectedStatus = 403
    RequiredText = @(
      "toolPolicySummary",
      "Tool blocked by policy",
      "Blocked",
      "nextAction",
      "broker-execution"
    )
  },
  @{
    Name = "Visible approval gate for Blender render"
    Body = @{
      toolName = "render-job"
      input = @{}
      context = @{
        domain = "blender"
      }
    }
    ExpectedStatus = 428
    RequiredText = @(
      "toolPolicySummary",
      "Approval required before tool execution",
      "Approval required",
      "nextAction",
      "render-job"
    )
  }
)

foreach ($case in $visiblePolicyCases) {
  Write-Host "[RUN ] $($case.Name)"

  $body = $case.Body | ConvertTo-Json -Depth 12

  try {
    $response = Invoke-WebRequest `
      -Uri "$BaseUrl/api/codexforge/tools/execute" `
      -Method POST `
      -Body $body `
      -ContentType "application/json" `
      -UseBasicParsing

    $statusCode = [int]$response.StatusCode
    $content = [string]$response.Content
  } catch {
    if (-not $_.Exception.Response) {
      throw
    }

    $statusCode = [int]$_.Exception.Response.StatusCode
    $stream = $_.Exception.Response.GetResponseStream()
    $reader = New-Object System.IO.StreamReader($stream)
    $content = $reader.ReadToEnd()
  }

  if ($statusCode -ne $case.ExpectedStatus) {
    Write-Host "
=== Visible policy response body ==="
    Write-Host $content
    throw "[FAIL] $($case.Name) expected HTTP $($case.ExpectedStatus), got $statusCode"
  }

  Write-Host "[PASS] $($case.Name) HTTP $statusCode"

  foreach ($required in $case.RequiredText) {
    if (-not $content.Contains($required)) {
      Write-Host "
=== Visible policy response body ==="
      Write-Host $content
      throw "[FAIL] $($case.Name) response missing: $required"
    }

    Write-Host "[PASS] $($case.Name) response includes: $required"
  }

  Write-Host "[PASS] $($case.Name)"
}

Write-Host "[PASS] direct execute API visible tool-policy UX smoke tests passed"
