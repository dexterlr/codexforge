param(
  [string]$BaseUrl = "http://localhost:3000"
)

$ErrorActionPreference = "Stop"

$body = @{
  messages = @(
    @{
      id = "latest-message-authority-smoke-1"
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
    memory = @(
      @{
        id = "stale-memory-1"
        type = "task"
        content = "Add approval-driven diff previews from chat."
        importance = 0.95
      }
    )
  }
} | ConvertTo-Json -Depth 20

$response = Invoke-WebRequest `
  -UseBasicParsing `
  -Uri "$BaseUrl/api/codexforge/chat" `
  -Method POST `
  -ContentType "application/json" `
  -Body $body

$json = $response.Content | ConvertFrom-Json
$text = [string]$json.reply.text

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

Assert-True ($response.StatusCode -eq 200) "HTTP 200"
Assert-True ($response.Headers["x-codexforge-latest-message-override"] -eq "true") "latest-message override header is true"
Assert-True ($response.Headers["x-codexforge-grounded-primary-file"] -eq "src/lib/codexforge/chat/use-codexforge-chat.ts") "grounded primary file header is use-codexforge-chat"
Assert-True ($response.Headers["x-codexforge-domain"] -eq "debug") "domain header is debug"

Assert-True ($json.ok -eq $true) "response ok true"
Assert-True ($json.reply.structured.domain -eq "debug") "structured domain is debug"
Assert-True ($json.reply.structured.mode -eq "local-execution") "structured mode is local-execution"
Assert-True ($json.reply.structured.execution.phase -eq "idle") "structured execution phase is idle"
Assert-True ($json.reply.structured.execution.diffCount -eq 0) "structured diff count is zero"
Assert-True ($json.reply.structured.snapshot.fileCount -eq 0) "structured snapshot file count is zero"

Assert-True ($text.Contains("CodexForge latest-message authority")) "visible text includes latest-message authority title"
Assert-True ($text.Contains("Best edit point: send(...) request payload/context construction")) "visible text includes pinned edit point"
Assert-True ($text.Contains("Grounded file: src/lib/codexforge/chat/use-codexforge-chat.ts")) "visible text includes grounded file"
Assert-True ($text.Contains("No ChatMessage.")) "visible text blocks ChatMessage"
Assert-True ($text.Contains("No engine.ts.")) "visible text blocks engine.ts"
Assert-True ($text.Contains("No engine-grounded-render.ts.")) "visible text blocks engine-grounded-render"
Assert-True ($text.Contains("No approval-driven diff previews.")) "visible text blocks approval-driven diff previews"
Assert-True ($text.Contains("No search-project/read-file stale evidence.")) "visible text blocks stale repo-tool evidence"

Assert-True (-not $text.Contains("Add approval-driven diff previews from chat so CodexForge can propose changes.")) "visible text excludes stale active plan goal"
Assert-True (-not $text.Contains("Generate preview")) "visible text excludes stale active plan steps"
Assert-True (-not $text.Contains("Render approval UI")) "visible text excludes stale active plan UI step"

Write-Host ""
Write-Host "[OK] Latest-message authority smoke passed."
