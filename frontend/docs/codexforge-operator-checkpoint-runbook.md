# CodexForge Operator Checkpoint Runbook

Canonical workspace:

```text
C:\ai-lab\projects\openclaw-workspace\repos\health-tracker\frontend
```

This runbook is for documentation and hygiene checkpoints. It does not approve live execution.

## Verify The Workspace

```powershell
Get-Location
git status --short
git diff --stat
git diff --check
```

Expected path: `C:\ai-lab\projects\openclaw-workspace\repos\health-tracker\frontend`.

Do not edit duplicate or scratch workspaces while preparing a CodexForge checkpoint.

## Run Build

```powershell
npm run build
```

Build output is local terminal evidence only. Do not claim CI passed unless actual CI or terminal logs prove it.

## Run All-Smoke

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\smoke-codexforge-all.ps1
```

The all-smoke registry is the local source for the highest detected phase. It does not prove remote CI status.

## Run Focused Recent Smokes

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\smoke-codexforge-checkpoint-docs.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\smoke-codexforge-command-ui-simplification.ps1
powershell -ExecutionPolicy Bypass -File .\scripts\smoke-codexforge-repo-hygiene.ps1
npm run smoke:codexforge:server
```

Use focused smokes to catch documentation drift, command/navigation regressions, repo hygiene drift, and server-rendered route issues.

## Inspect All-Smoke For Latest Phase

```powershell
$allSmoke = Get-Content -Raw .\scripts\smoke-codexforge-all.ps1
$phases = [regex]::Matches($allSmoke, 'Phase\s+(\d+)') |
  ForEach-Object { [int]$_.Groups[1].Value }
$phases | Sort-Object -Descending | Select-Object -First 1
```

Update checkpoint docs to the actual highest detected phase. If phases 970-985 are present and no higher phase exists, document the checkpoint as through phase 985 and describe the universal game-builder review layer: Universal Game Builder Boundary, Game Target Intake Packet, Game Platform Classifier Preview, Game Server Plan Preview, Game Modpack Plan Preview, Game Content Plan Preview, Game Automation Plan Preview, Game Asset Pipeline Plan Preview, Game Deployment Plan Preview, Game Safety Approval Plan, Game Evidence Capture Plan, Game Result Review Plan, Game Recovery Plan Preview, Game Packaging Plan Preview, First Universal Game Builder Candidate, and Controlled Universal Game Builder Release Candidate surfaces. Keep the package preview-only, dry-run, approval-required, not executable from UI, not routed live, and not allowed to make live model calls, provider calls, credential reads, secret reads, network calls, prompt sends, backend adapter execution, game adapter execution, file writes, command execution, runtime/server starts, game server launches, game client launches, mod installs, asset downloads, asset rendering, deployment, evidence/result/model-output persistence, recovery triggers, packaging, scaffolding, automatic memory promotions, browser credential writes, browser credential storage, hidden model calls, or hidden execution unless future approved backend-owned bounded implementations and evidence exist. Models are workers; CodexForge is the brain and owns the shared memory, knowledge, evidence, result, audit, and approval layer. Supported game target language must remain broad; Minecraft is one supported example, not the default or only route.

The current phase ledger is:

- Phase 890 - Controlled Model Use Dry-Run Inventory.
- Phase 891 - OpenAI-Compatible Model Use Dry-Run.
- Phase 892 - Local Model Use Dry-Run.
- Phase 893 - Free Model Use Dry-Run.
- Phase 894 - Paid Model Use Dry-Run.
- Phase 895 - Pro Model Use Dry-Run.
- Phase 896 - Specialist Video Model Use Dry-Run.
- Phase 897 - Specialist Image Model Use Dry-Run.
- Phase 898 - Specialist Coding Model Use Dry-Run.
- Phase 899 - Specialist Research Model Use Dry-Run.
- Phase 900 - Specialist Trading Model Use Dry-Run.
- Phase 901 - Shared Context Packet Validation.
- Phase 902 - Shared Memory Handoff Validation.
- Phase 903 - Model Router Decision Explanation Review.
- Phase 904 - First Controlled Model Router Trial Review.
- Phase 905 - Controlled Model Use Release Candidate.
- Phase 906 - Live Provider Readiness Boundary.
- Phase 907 - Approved Provider Test Packet.
- Phase 908 - OpenAI-Compatible Provider Test Packet.
- Phase 909 - Local Model Bridge Dry-Run.
- Phase 910 - Free Model Provider Trial Packet.
- Phase 911 - Paid Model Provider Trial Packet.
- Phase 912 - Pro Model Provider Trial Packet.
- Phase 913 - Specialist Model Provider Trial Packet.
- Phase 914 - Model Router Trial Cockpit.
- Phase 915 - Model Router Candidate Ranking Review.
- Phase 916 - Model Router Budget Decision Review.
- Phase 917 - Model Router Privacy Decision Review.
- Phase 918 - Model Router Shared Context Review.
- Phase 919 - Model Router Evidence Capture Review.
- Phase 920 - First Controlled Provider Trial Candidate.
- Phase 921 - Model Router Execution Readiness Candidate.
- Phase 922 - Approved Provider Health Check Boundary.
- Phase 923 - Provider Health Check Request Packet.
- Phase 924 - Provider Health Check Result Packet.
- Phase 925 - Local Model Bridge Readiness Review.
- Phase 926 - Local Model Bridge Context Packet.
- Phase 927 - Local Model Bridge Evidence Packet.
- Phase 928 - OpenAI-Compatible Router Trial Result.
- Phase 929 - Free Model Router Trial Result.
- Phase 930 - Paid Model Router Trial Result.
- Phase 931 - Pro Model Router Trial Result.
- Phase 932 - Specialist Model Router Trial Result.
- Phase 933 - Model Router Trial Summary.
- Phase 934 - Model Router Trial Regression Guard.
- Phase 935 - Model Router Trial Operator Review.
- Phase 936 - First Model Router Beta Candidate.
- Phase 937 - Controlled Model Router Beta Release Candidate.
- Phase 938 - Backend Execution Router Integration Boundary.
- Phase 939 - File Write Model-Routed Execution Preview.
- Phase 940 - Command Runner Model-Routed Execution Preview.
- Phase 941 - Local Runtime Model-Routed Execution Preview.
- Phase 942 - Evidence Store Model-Routed Execution Preview.
- Phase 943 - Result Store Model-Routed Execution Preview.
- Phase 944 - Recovery Model-Routed Execution Preview.
- Phase 945 - Packaging Model-Routed Execution Preview.
- Phase 946 - Project Scaffold Model-Routed Execution Preview.
- Phase 947 - Model-Routed Execution Approval Packet.
- Phase 948 - Model-Routed Execution Audit Packet.
- Phase 949 - Model-Routed Execution Sandbox Review.
- Phase 950 - Model-Routed Execution Validation Review.
- Phase 951 - Model-Routed Execution Operator Trial.
- Phase 952 - First Model-Routed Backend Execution Candidate.
- Phase 953 - Controlled Backend Model Router Release Candidate.
- Phase 954 - Project Builder MVP Integration Boundary.
- Phase 955 - Project Goal Intake Packet.
- Phase 956 - Project Domain Classifier Preview.
- Phase 957 - Project Plan Model-Routing Preview.
- Phase 958 - Project File Plan Preview.
- Phase 959 - Project Command Plan Preview.
- Phase 960 - Project Runtime Plan Preview.
- Phase 961 - Project Evidence Plan Preview.
- Phase 962 - Project Result Plan Preview.
- Phase 963 - Project Recovery Plan Preview.
- Phase 964 - Project Packaging Plan Preview.
- Phase 965 - Project Approval Plan Preview.
- Phase 966 - Project Builder Operator Review.
- Phase 967 - First Useful Project Builder Candidate.
- Phase 968 - Project Builder MVP Trial Packet.
- Phase 969 - Controlled Project Builder Release Candidate.
- Phase 970 - Universal Game Builder Boundary.
- Phase 971 - Game Target Intake Packet.
- Phase 972 - Game Platform Classifier Preview.
- Phase 973 - Game Server Plan Preview.
- Phase 974 - Game Modpack Plan Preview.
- Phase 975 - Game Content Plan Preview.
- Phase 976 - Game Automation Plan Preview.
- Phase 977 - Game Asset Pipeline Plan Preview.
- Phase 978 - Game Deployment Plan Preview.
- Phase 979 - Game Safety Approval Plan.
- Phase 980 - Game Evidence Capture Plan.
- Phase 981 - Game Result Review Plan.
- Phase 982 - Game Recovery Plan Preview.
- Phase 983 - Game Packaging Plan Preview.
- Phase 984 - First Universal Game Builder Candidate.
- Phase 985 - Controlled Universal Game Builder Release Candidate.

## Commit And Tag Checkpoint Docs

1. Confirm `git status --short` shows only intentional README, docs, and smoke script changes.
2. Run build, checkpoint docs smoke, all-smoke, focused smokes, server smoke, and diff hygiene checks.
3. Stage only the approved checkpoint files.
4. Commit after explicit operator approval.
5. Tag after explicit operator approval and after reviewing the final commit.

## Recover If Checkpoint Docs Smoke Fails

- Read the failing `[FAIL]` line first.
- If the highest detected phase changed, update the checkpoint docs to the actual all-smoke state.
- If safety wording is missing, add plain language for review-only surfaces, explicit operator approval, no silent mutation, no provider/local/connector/automation execution without approval, no credential/output storage, and no memory auto-promotion.
- If the smoke finds stale 230-series language, remove the obsolete roadmap text.
- If the smoke finds a false live execution or CI claim, replace it with bounded approval-language or proof-backed validation language.
- Re-run `powershell -ExecutionPolicy Bypass -File .\scripts\smoke-codexforge-checkpoint-docs.ps1`.

## What Not To Edit

- Do not create product phase surfaces.
- Do not add runtime workflow routes for documentation-only checkpoints.
- Do not add dependencies or package install behavior.
- Do not edit ignored/generated folders such as `node_modules`, `.next`, `out`, `dist`, `build`, `coverage`, `.operator`, `.codexforge`, `.checkpoints`, `_codexforge-backups`, or `unpushed-patches`.
- Do not call providers, local models, connectors, automations, web, files, shell, git, or local bridge from UI.
- Do not mutate Brain or memory.
- Do not store credentials or live outputs in `localStorage` or `sessionStorage`.
- Do not claim live execution unless an approved local/backend/provider boundary exists.
