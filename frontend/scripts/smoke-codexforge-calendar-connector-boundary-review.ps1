param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\calendar-connector-boundary-review"
$route = "src\app\calendar-connector-boundary"

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
  "Calendar connector boundary review",
  "Calendar access requires explicit approval",
  "No calendar event is read created updated or deleted from this page",
  "Calendar tokens and private event details are not displayed",
  "Requested calendar scope summary",
  "Event mutation approval requirement"
)

& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Phase 336 Calendar Connector Boundary Review" `
  -ScriptFile "smoke-codexforge-calendar-connector-boundary-review.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "CalendarConnectorBoundaryReviewPanel" `
  -CommandLabel "Go to Calendar Connector Boundary Review" `
  -Modules @("calendar-connector-boundary-review-types.ts","calendar-connector-boundary-review-summary.ts","index.ts") `
  -Components @("CalendarConnectorBoundaryReviewPanel.tsx","index.ts") `
  -Exports @("buildCalendarConnectorBoundaryReviewStableKey","buildCalendarConnectorBoundaryReview","buildCalendarConnectorBoundaryReviews","buildCalendarConnectorBoundaryReviewBoundary","buildCalendarConnectorBoundaryReviewModel","summarizeCalendarConnectorBoundaryReview","CALENDAR_CONNECTOR_BOUNDARY_REVIEW_LANGUAGE") `
  -PlainEnglish @($phaseMarkers + @("Boundary identity","Source connector workspace","Allowed Calendar actions","Denied Calendar actions","Attendee/privacy policy","Evidence capture route","Blocked reasons","advanced Calendar details collapsed/secondary","Connector evidence is reviewed before use") + $sharedConnectorSafetyMarkers) `
  -ExtraRoutes @("/connector-workspace","/gmail-connector-boundary","/contacts-connector-boundary","/research-evidence-inbox")

& (Join-Path $PSScriptRoot "codexforge-connector-review-safety-smoke-helper.ps1") `
  -Domain $domain `
  -Route $route `
  -PhaseMarkers $phaseMarkers

Write-Host "[OK] CodexForge Calendar Connector Boundary Review smoke passed."
