param([string]$BaseUrl = "http://localhost:3000")

$ErrorActionPreference = "Stop"
. (Join-Path $PSScriptRoot "codexforge-worker-orchestration-backend-wiring-smoke-helper.ps1")

Invoke-CodexForgeWorkerOrchestrationBackendWiringSmoke `
  -SmokeName "Phase 2760 Worker Orchestration Cockpit Alignment Wiring" `
  -ScriptFile "smoke-codexforge-worker-orchestration-cockpit-alignment-wiring.ps1" `
  -Route "worker-orchestration-cockpit-alignment-wiring" `
  -CommandLabel "Go to Worker Orchestration Cockpit Alignment Wiring" `
  -RouteHref "/worker-orchestration-cockpit-alignment-wiring" `
  -Phase "2760" `
  -Title "Worker Orchestration Cockpit Alignment Wiring" `
  -Markers @(
  "2730?2761 ? Worker Orchestration Backend Wiring Mega Batch v1",
  "Worker Orchestration Backend Wiring",
  "review-only worker orchestration diagnostic",
  "blocked worker orchestration execution",
  "protected worker orchestration boundary",
  "worker orchestration contract",
  "worker job envelope",
  "worker validation boundary",
  "worker capability policy",
  "worker isolation policy",
  "queue handoff boundary",
  "scheduler handoff boundary",
  "worker dispatch blocked",
  "worker execution blocked",
  "process spawning blocked",
  "service creation blocked",
  "port binding blocked",
  "runtime deploy blocked",
  "worker persistence blocked",
  "no live worker orchestration",
  "no queue dispatch",
  "no worker dispatch",
  "no worker execution",
  "no job execution",
  "no scheduler execution",
  "no orchestration execution",
  "no worker pool creation",
  "no service creation",
  "no daemon creation",
  "no subprocess creation",
  "no process spawning",
  "no shell execution",
  "no command execution from the app",
  "no file system writes from the app",
  "no frontend persistence",
  "no browser storage writes",
  "no live provider calls",
  "no model calls",
  "no prompt sending",
  "no streaming",
  "no provider SDK imports",
  "no audio provider imports",
  "no storage provider imports",
  "no render provider imports",
  "no worker provider imports",
  "no network egress",
  "no fetch/network calls",
  "no connector calls",
  "no upload/download",
  "no render/export/publish/schedule",
  "no API creation from frontend",
  "no port binding",
  "no runtime deploy",
  "no credential storage",
  "no token storage",
  "approval and audit enforcement",
  "redaction boundary",
  "observability trace markers",
  "retry and fallback policy",
  "rate guard",
  "cost guard",
  "privacy guard",
  "safety guard",
  "worker orchestration state",
  "worker orchestration recovery",
  "operator review",
  "completion guard",
  "next likely batch: 2762?2793 ? Artifact Export Backend Wiring"
  )
