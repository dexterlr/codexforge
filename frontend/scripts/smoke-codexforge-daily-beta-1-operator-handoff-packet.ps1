param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"

$domain = "src\lib\codexforge\daily-beta-1-operator-handoff-packet"
$route = "src\app\daily-beta-1-operator-handoff-packet"
$phaseMarkers = @(
  "Daily Beta 1 operator handoff packet",
  "Daily Beta 1 operator handoff packet does not send or apply handoff automatically",
  "Operator handoff requires explicit operator approval",
  "Unresolved handoff blockers stay blocked",
  "Handoff groups",
  "Approval boundary summary"
)
$plainEnglish = @(
  "Daily Beta 1 handoff identity",
  "Operator runbook summary",
  "Rollout limitation summary",
  "Validation checklist",
  "Denied handoff actions",
  "Unresolved handoff blockers",
  "Final safety review route",
  "Daily Beta 1 release candidate route",
  "next recommended action"
)
$protectedRoutes = @(
  "/codexforge-daily-beta-1-candidate",
  "/daily-beta-1-controlled-rollout-plan",
  "/daily-beta-1-rollout-review",
  "/daily-beta-1-feedback-inbox",
  "/daily-beta-1-feedback-triage-review",
  "/daily-beta-1-regression-review",
  "/daily-beta-1-hardening-pass",
  "/daily-beta-1-documentation-refresh",
  "/daily-beta-1-release-notes-review",
  "/daily-beta-1-operator-handoff-packet",
  "/daily-beta-1-final-safety-review",
  "/codexforge-daily-beta-1-release-candidate"
)
$params = @{
  PhaseName = "Phase 527 Daily Beta 1 Operator Handoff Packet"
  ScriptFile = "smoke-codexforge-daily-beta-1-operator-handoff-packet.ps1"
  Domain = $domain
  Route = $route
  MainPanel = "DailyBetaOneOperatorHandoffPacketPanel"
  CommandLabel = "Go to Daily Beta 1 Operator Handoff Packet"
  Modules = @("daily-beta-1-operator-handoff-packet-types.ts", "daily-beta-1-operator-handoff-packet-summary.ts", "index.ts")
  Components = @("DailyBetaOneOperatorHandoffPacketPanel.tsx", "index.ts")
  Exports = @("buildDailyBetaOneOperatorHandoffPacketStableKey", "buildDailyBetaOneOperatorHandoffPacket", "buildDailyBetaOneOperatorHandoffPackets", "buildDailyBetaOneOperatorHandoffPacketBoundary", "buildDailyBetaOneOperatorHandoffPacketModel", "summarizeDailyBetaOneOperatorHandoffPacket", "DAILY_BETA_ONE_OPERATOR_HANDOFF_PACKET_LANGUAGE")
  PhaseMarkers = $phaseMarkers
  PlainEnglish = $plainEnglish
  RouteHref = "/daily-beta-1-operator-handoff-packet"
  ProtectedRoutes = $protectedRoutes
}
& (Join-Path $PSScriptRoot "codexforge-daily-beta-one-release-review-smoke-helper.ps1") @params

Write-Host "[OK] CodexForge Phase 527 Daily Beta 1 operator handoff packet smoke passed."