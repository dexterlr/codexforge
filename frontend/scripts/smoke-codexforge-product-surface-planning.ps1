param(
  [string]$BaseUrl = "http://localhost:3000"
)

$ErrorActionPreference = "Stop"

$body = @{
  messages = @(
    @{
      id = "product-surface-smoke-1"
      role = "user"
      text = "Plan a premium CodexForge landing page. Include goal, pages, components, data, risks, and first three implementation steps."
      ts = [DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds()
    }
  )
  context = @{
    projectName = "CodexForge"
    memory = @()
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
Assert-True ($response.Headers["x-codexforge-domain"] -eq "web") "domain header is web"
Assert-True ($response.Headers["x-codexforge-file-explicit-request"] -eq "false") "file explicit request is false"

Assert-True ($json.ok -eq $true) "response ok true"
Assert-True ($json.reply.structured.domain -eq "web") "structured domain is web"
Assert-True ($json.reply.structured.mode -eq "local") "structured mode is local"
Assert-True ($json.reply.structured.tools.Count -eq 0) "structured tools are hidden"

Assert-True ($null -eq $json.reply.structured.execution) "structured execution is suppressed"
Assert-True ($null -eq $json.reply.structured.snapshot) "structured snapshot is suppressed"

Assert-True ($text.Contains("Pages")) "visible text includes Pages"
Assert-True ($text.Contains("Components")) "visible text includes Components"
Assert-True ($text.Contains("Data")) "visible text includes Data"
Assert-True ($text.Contains("First three implementation steps")) "visible text includes first three steps"
Assert-True ($text.Contains("Hero section with premium positioning and primary CTA.")) "visible text includes hero component"
Assert-True ($text.Contains("Workflow section showing plan, inspect, diff, approve, execute.")) "visible text includes workflow component"

Assert-True (-not $text.Contains("Engine trace")) "visible text excludes Engine trace"
Assert-True (-not $text.Contains("Execution posture")) "visible text excludes Execution posture"
Assert-True (-not $text.Contains("Recommended tool names")) "visible text excludes Recommended tool names"
Assert-True (-not $text.Contains("Snapshot`n- File count")) "visible text excludes Snapshot section"

Write-Host ""
Write-Host "[OK] Product surface planning smoke passed."
