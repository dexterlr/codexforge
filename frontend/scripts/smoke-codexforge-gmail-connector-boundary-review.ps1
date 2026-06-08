param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\gmail-connector-boundary-review"
$route = "src\app\gmail-connector-boundary"

$sharedConnectorSafetyMarkers = @(
  "no OAuth request flow",
  "no connector authorization behavior",
  "no connector API calls",
  "no Gmail API calls",
  "no Calendar API calls",
  "no Contacts API calls",
  "no Google API calls",
  "no connector data reads",
  "no automatic email reads",
  "no automatic calendar reads",
  "no automatic contact reads",
  "no email draft/send behavior",
  "no calendar event create/update/delete behavior",
  "no contact create/update/delete behavior",
  "no token storage",
  "no localStorage/sessionStorage token storage",
  "no automatic provider calls",
  "no provider API calls",
  "no prompt/file/source/connector data sending without approval",
  "no localStorage API key storage",
  "no process.env printing",
  "no API keys or secrets displayed",
  "no source auto-fetching",
  "no memory/RAG ingestion",
  "no memory auto-promotion",
  "no Brain graph mutation",
  "no appendEvent/saveBrainGraph calls from UI",
  "no plugin execution",
  "no tool execution",
  "no agent execution",
  "no extension runtime executor",
  "no MCP runtime",
  "no MCP tool calls",
  "no command execution",
  "no shell command execution",
  "no git command execution from UI",
  "no test execution from UI",
  "no Jarvisd capability execution from UI",
  "no daemon process creation from frontend",
  "no browser-stored signing secrets",
  "no arbitrary local file browsing",
  "no arbitrary path crawling",
  "no arbitrary file read/open",
  "no auto-open local files",
  "no file mutation",
  "no file write",
  "no patch apply behavior",
  "no file deletion",
  "no package install behavior",
  "no Ruflo/Odysseus vendoring"
)

$phaseMarkers = @(
  "Gmail connector boundary review",
  "Gmail access requires explicit approval",
  "No email is read drafted or sent from this page",
  "Gmail tokens and message contents are not displayed",
  "Requested Gmail scope summary",
  "Draft send approval requirement"
)

& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Phase 335 Gmail Connector Boundary Review" `
  -ScriptFile "smoke-codexforge-gmail-connector-boundary-review.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "GmailConnectorBoundaryReviewPanel" `
  -CommandLabel "Go to Gmail Connector Boundary Review" `
  -Modules @("gmail-connector-boundary-review-types.ts","gmail-connector-boundary-review-summary.ts","index.ts") `
  -Components @("GmailConnectorBoundaryReviewPanel.tsx","index.ts") `
  -Exports @("buildGmailConnectorBoundaryReviewStableKey","buildGmailConnectorBoundaryReview","buildGmailConnectorBoundaryReviews","buildGmailConnectorBoundaryReviewBoundary","buildGmailConnectorBoundaryReviewModel","summarizeGmailConnectorBoundaryReview","GMAIL_CONNECTOR_BOUNDARY_REVIEW_LANGUAGE") `
  -PlainEnglish @($phaseMarkers + @("Boundary identity","Source connector workspace","Allowed Gmail actions","Denied Gmail actions","Privacy/redaction policy","Evidence capture route","Blocked reasons","advanced Gmail details collapsed/secondary","Connector evidence is reviewed before use") + $sharedConnectorSafetyMarkers) `
  -ExtraRoutes @("/connector-workspace","/calendar-connector-boundary","/contacts-connector-boundary","/research-evidence-inbox")

& (Join-Path $PSScriptRoot "codexforge-connector-review-safety-smoke-helper.ps1") `
  -Domain $domain `
  -Route $route `
  -PhaseMarkers $phaseMarkers

Write-Host "[OK] CodexForge Gmail Connector Boundary Review smoke passed."
