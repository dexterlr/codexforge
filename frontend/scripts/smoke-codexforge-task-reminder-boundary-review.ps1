param([string]$BaseUrl = "http://localhost:3000")

$domain = "src\lib\codexforge\task-reminder-boundary-review"
$route = "src\app\task-reminder-boundary"

$sharedAutomationSafetyMarkers = @(
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
  "no token storage",
  "no localStorage/sessionStorage token storage",
  "no private connector values displayed",
  "no notifications sent",
  "no reminder creation",
  "no task scheduling",
  "no automation creation",
  "no background job creation",
  "no background work runs from UI",
  "no cron/interval/polling loops from UI",
  "no automatic web browsing",
  "no web/search/provider API calls",
  "no automatic provider calls",
  "no provider API calls",
  "no source auto-fetching",
  "no source auto-refreshing",
  "no freshness auto-recheck",
  "no evidence auto-update",
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
  "server-only path boundary markers remain intact",
  "no Math.random",
  "no Date.now",
  "no mojibake"
)

$phaseMarkers = @(
  "Task reminder boundary review",
  "Task reminders require explicit approval",
  "No reminder is created from this page",
  "Notification delivery is not enabled here",
  "Delivery channel policy",
  "Conditional watch route"
)

& (Join-Path $PSScriptRoot "codexforge-local-planning-phase-smoke-helper.ps1") `
  -PhaseName "Phase 342 Task Reminder Boundary Review" `
  -ScriptFile "smoke-codexforge-task-reminder-boundary-review.ps1" `
  -Domain $domain `
  -Route $route `
  -MainPanel "TaskReminderBoundaryReviewPanel" `
  -CommandLabel "Go to Task Reminder Boundary Review" `
  -Modules @("task-reminder-boundary-review-types.ts","task-reminder-boundary-review-summary.ts","index.ts") `
  -Components @("TaskReminderBoundaryReviewPanel.tsx","index.ts") `
  -Exports @("buildTaskReminderBoundaryReviewStableKey","buildTaskReminderBoundaryReview","buildTaskReminderBoundaryReviews","buildTaskReminderBoundary","buildTaskReminderBoundaryReviewModel","summarizeTaskReminderBoundaryReview","TASK_REMINDER_BOUNDARY_REVIEW_LANGUAGE") `
  -PlainEnglish @($phaseMarkers + @("Boundary identity","Source notification center","Reminder request summary","Allowed reminder scope","Denied reminder scope","Privacy/redaction policy","Approval requirement","Blocked reasons","advanced reminder details collapsed/secondary") + $sharedAutomationSafetyMarkers) `
  -ExtraRoutes @("/operator-notification-center","/conditional-watch-review-inbox","/connector-release-candidate","/review-inbox")

& (Join-Path $PSScriptRoot "codexforge-automation-boundary-safety-smoke-helper.ps1") `
  -Domain $domain `
  -Route $route `
  -PhaseMarkers $phaseMarkers

Write-Host "[OK] CodexForge Task Reminder Boundary Review smoke passed."
