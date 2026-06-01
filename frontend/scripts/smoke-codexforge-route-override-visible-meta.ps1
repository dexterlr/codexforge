param(
  [string]$BaseUrl = "http://localhost:3000"
)

$ErrorActionPreference = "Stop"

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
    [hashtable]$Body
  )

  $jsonBody = $Body | ConvertTo-Json -Depth 20

  return Invoke-WebRequest -UseBasicParsing `
    -Uri "$BaseUrl/api/codexforge/chat" `
    -Method POST `
    -ContentType "application/json" `
    -Body $jsonBody
}

$productSurfaceResponse = Invoke-CodexForgeChat @{
  messages = @(
    @{
      id = "route-visible-product-surface-1"
      role = "user"
      text = "Plan a premium CodexForge landing page. Include goal, pages, components, data, risks, and first three implementation steps."
      ts = [DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds()
    }
  )
  context = @{
    projectName = "CodexForge"
    memory = @()
  }
}

$productJson = $productSurfaceResponse.Content | ConvertFrom-Json

Assert-True ($productSurfaceResponse.StatusCode -eq 200) "product-surface HTTP 200"
Assert-True ($productSurfaceResponse.Headers["x-codexforge-domain"] -eq "web") "product-surface domain header is web"
Assert-True ($productSurfaceResponse.Headers["x-codexforge-file-explicit-request"] -eq "false") "product-surface file explicit request is false"
Assert-True ($productJson.reply.structured.mode -eq "local") "product-surface structured mode is local"
Assert-True ($null -eq $productJson.reply.structured.execution) "product-surface execution is suppressed"
Assert-True ($null -eq $productJson.reply.structured.snapshot) "product-surface snapshot is suppressed"
Assert-True ($productJson.reply.structured.tools.Count -eq 0) "product-surface tools are hidden"

$latestMessageResponse = Invoke-CodexForgeChat @{
  messages = @(
    @{
      id = "route-visible-latest-message-1"
      role = "user"
      text = "Goal: Fix CodexForge stale Active Task contamination.`nBest edit point: send(...) request payload/context construction in useCodexForgeChat`nGrounded file: src/lib/codexforge/chat/use-codexforge-chat.ts`nNo ChatMessage`nNo engine.ts`nNo engine-grounded-render.ts`nNo approval-driven diff previews`nNo search-project unless engine still runs it"
      ts = [DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds()
    }
  )
  context = @{
    projectName = "CodexForge"
    activePlan = @{
      goal = "Add approval-driven diff previews from chat so CodexForge can propose changes."
      steps = @("Define contract", "Generate preview", "Render approval UI")
      status = "active"
      domain = "debug"
      tags = @("diff", "approval", "preview")
    }
    memory = @()
  }
}

$latestJson = $latestMessageResponse.Content | ConvertFrom-Json

Assert-True ($latestMessageResponse.StatusCode -eq 200) "latest-message HTTP 200"
Assert-True ($latestMessageResponse.Headers["x-codexforge-latest-message-override"] -eq "true") "latest-message override header is true"
Assert-True ($latestMessageResponse.Headers["x-codexforge-grounded-primary-file"] -eq "src/lib/codexforge/chat/use-codexforge-chat.ts") "latest-message grounded primary file header is correct"
Assert-True ($latestJson.reply.structured.mode -eq "local-execution") "latest-message structured mode is local-execution"
Assert-True ($latestJson.reply.structured.execution.phase -eq "idle") "latest-message execution phase is idle"
Assert-True ($latestJson.reply.structured.execution.diffCount -eq 0) "latest-message diff count is zero"
Assert-True ($latestJson.reply.structured.snapshot.fileCount -eq 0) "latest-message snapshot file count is zero"

Write-Host ""
Write-Host "[OK] Route override visible meta smoke passed."
