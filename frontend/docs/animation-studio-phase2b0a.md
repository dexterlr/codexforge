# Phase 2B.0A — estimate-only lifecycle

Local implementation and fake-transport validation only. This document is not an
authorization to configure credentials, estimate remotely, generate, or publish.
The final sealed acceptance handoff is authoritative about completed validation;
an implementation draft or test fixture is not a successful live estimate.

## Canonical separation

An ESTIMATE job owns the prepared Phase 2A.1 request, exact request digest,
shot revision, separate estimate authorization, one consumed attempt, outcome,
timestamp and quote. It is not a GENERATION job, generation execution intent,
generation approval or actual cost. Decimal credits/USD retain exact provider
precision; current values are explicitly synthetic.

Canonical routing distinguishes documented planning/estimation eligibility from
observed provider availability and enabled execution. It must not manufacture a
capability observation or switch on external/paid generation, Adobe or Blender.

Before authority is acquired, canonical project/sequence/shot, revision, exact
provider request and routing must still match. Native atomic publication owns
the one-attempt claim, not React state or a process-local mutex. A successful,
failed, timed-out or ambiguous attempt cannot silently reset. Changing the shot
makes a stored estimate stale and the UI must show RE-ESTIMATE REQUIRED.

The exact provider-ready request remains server-built by the Phase 2A.1 builder.
The client never supplies authoritative model, digest, cost, provider state,
correlation, routing or execution policy. The production HTTP route does not
receive a fake execution dependency. Browser fixtures are stored by the actual
canonical lifecycle using injected fakes, clearly labelled MOCK and isolated
from production data.

## Private credential procedure — instructions only, not run in this phase

Do not paste credentials into Codex/chat, put them in command arguments, save
them in repository files or expose them in logs. Do not configure anything until
the final phase verdict is READY and the operator chooses to proceed. The last
Phase 2B.0 check found no configuration in its own server-process environment;
this phase must not re-read real credential presence.

For a future private, temporary configuration, open a trusted Windows PowerShell
console yourself, outside the Codex/chat transcript. Enter the combined
KEY_ID:KEY_SECRET through a masked prompt, never as a literal command:

```powershell
$hfPrivateInput = Read-Host 'Higgsfield credential (KEY_ID:KEY_SECRET; masked)' -AsSecureString
$hfPrivatePointer = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($hfPrivateInput)
try {
    [Environment]::SetEnvironmentVariable('HF_CREDENTIALS', [Runtime.InteropServices.Marshal]::PtrToStringBSTR($hfPrivatePointer), 'Process')
} finally {
    [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($hfPrivatePointer)
    $hfPrivateInput.Dispose()
    Remove-Variable hfPrivateInput, hfPrivatePointer
}
```

This configures only that private console and processes it subsequently starts;
it does not configure an already-running Codex app or unrelated server. It does
not persist a secret to disk, user/machine environment or production settings.
Do not print the environment variable, enumerate environment values or echo the
header. Closing that console ends its environment; to clear it sooner use:

```powershell
[Environment]::SetEnvironmentVariable('HF_CREDENTIALS', $null, 'Process')
```

The private configuration commands above must not themselves make a network
request or launch generation. A later approved preflight/worker must run from
that same private console so no transfer through chat is required. Its executable,
source seal and exact arguments must be supplied by the later bounded live-gate
handoff; do not improvise a direct curl/fetch request around the application.

## Exact fresh preflight before a future live-estimate authorization

1. Verify the latest sealed source/evidence, not a consumed historical fixture.
2. Read only HF_CREDENTIALS through the server-only parser and output only a
   safe configuration status; stop if missing/invalid. No auth probe.
3. Resolve the canonical synthetic project, sequence and shot; verify current
   revision, exact request and supported contract. No uploads/references.
4. Derive the canonical estimate-planning route without claiming observed
   account capability or enabling generation.
5. Persist a NEW estimate-only intent with the exact request/endpoint/digest,
   explicit future-live provenance, attempt0/max1, and separate operator authority.
   A mock intent/result cannot be reused as live authorization.
6. Recheck no stale configuration/shot/request binding and confirm the attempt
   remains unused. Preflight must not acquire execution or consume the attempt.
7. Prove all generation/paid/Adobe/Blender policies remain OFF and no generation
   job/authorization/output was created by estimation.
8. Show the exact destination and non-secret request to the operator. Stop here
   until the ONE estimate operation is explicitly authorized. Only after that
   separate authorization may the worker atomically consume the attempt before
   its transport call. Do not use estimate approval as generation permission.

Candidate destination (documented pattern, not account-verified):
POST https://api.higgsfield.ai/estimate/bytedance/seedance/v1/lite/text-to-video

```json
{
  "prompt": "An original matte blue sphere moves slowly across a plain white background.",
  "duration": 2,
  "resolution": "480",
  "aspect_ratio": "1:1",
  "camera_fixed": true
}
```

Future limits: one authenticated estimate request, zero retries/redirects/alternate
endpoints/other provider operations, zero generation. Any response or ambiguous
transport outcome consumes the attempt and stops for review. Current phase live
request counters are required to remain zero; none of this document grants live
access.
