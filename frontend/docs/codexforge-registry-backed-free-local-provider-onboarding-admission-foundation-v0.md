# CodexForge Registry-Backed Free/Local Provider Onboarding and Admission Foundation v0

## Slice P boundary

Slice P is a candidate-only, source-only validation foundation. It adds immutable
TypeScript contracts and a pure server-owned validator for future free/local
provider and exact-model onboarding packets. It activates and advertises no new
provider or model.

The foundation has no provider-capable integration, runtime routing integration,
automatic-routing admission, registry or catalog activation, API or UI handoff,
paid routing or execution, model download, package installation, provider or
metadata request, credential read, generation, persistence, approval recording,
or execution. Manual-execution admission in a candidate packet is evidence about
an exact model; validating it never records a request approval.

Registry or catalog activation requires a future, explicit source change. The
following slice may declare the first exact candidates, but must keep them
candidate-only unless a later separately approved slice changes that boundary.

## Ownership and non-escalation

The existing Slice O registry remains the canonical production membership owner.
The production catalog remains the routing inventory owner. Existing provider and
model qualification, live acceptance, automatic-routing admission, request
approval, acknowledgement, execution admission, and execution modules retain
their current authority.

These states are deliberately independent:

1. candidate declaration;
2. static schema and identity validation;
3. capability verification;
4. exact-model cost or current Free-tier verification;
5. provider qualification;
6. exact-model qualification;
7. exact-model live acceptance;
8. exact-model manual-execution admission;
9. automatic-routing admission in a future schema revision;
10. registry/catalog activation in a future explicit source change.

No state grants another implicitly. The validator derives the highest verified
stage and rejects a packet-supplied `currentStage` as an unknown field. Provider
evidence cannot grant model qualification, acceptance, or execution admission.
Automatic-routing admission and activation are not representable as accepted v1
states.

## Packet split and identity

Provider and exact-model packets are separate members of a discriminated union.
A model packet is accepted only with its provider packet in the same bundle. The
exact identity invariant is:

```text
modelKey === providerKey + "::" + modelId
```

Provider identity, model identity, adapter identity, protocol, locality, data
boundary, and credential mode are copied into a fresh normalized object. Provider
and model adapter declarations must agree with one another and with the injected,
server-owned validation authority.

The only v1 boundary pairs are:

- local / `local-machine` / `none`;
- cloud / `cloud-provider` / `server-environment-only`.

Candidate inputs carry credential posture only and cannot contain secret values.
Production provider and model keys are reserved by constructing validation
authority from the canonical Slice O registry. This does not register the
candidate or expose it to a resolver.

## Cost and envelopes

Slice P accepts only local candidates with no provider token charge and Free-tier
cloud candidates with billing disabled and no trial-credit dependency. Paid,
trial-credit, billing-enabled, unknown-cost, and unverifiable-cost candidates are
rejected completely. A provider or model calling itself free is not evidence.

An unverified Free-tier cloud declaration may remain a candidate. It cannot
advance to qualification, live acceptance, or manual admission. Verified
Free-tier state requires an exact-model, current, source-owned evidence reference.

The conservative candidate ceilings are 4096 output tokens for local candidates
and 512 for cloud candidates. Provider-reported limits are descriptive and cannot
enlarge the requested admission envelope. Context capacity must cover the
requested output envelope. These ceilings do not revise existing production
admission policy and do not claim a permanent limit for all future providers.

## Evidence authority

Evidence references include a stable identifier, version, evidence kind, exact
scope, provenance class, artifact SHA-256, checkpoint commit, observed date, and
optional validity end date. Admission evidence is always exact-model scoped.
References are useful only when every value matches a source-owned authority
record. Current Free-tier evidence must have a non-null validity end date that
covers the authority's as-of date.

The canonical SHA-256 is a deterministic content digest/checksum only. It is not
a signature, authentication, authorization, proof of provenance, or replacement
for source-owned authority. If input supplies a digest, the validator compares it
with canonical content. Every accepted result contains a freshly calculated
digest.

## Approval and acknowledgement meanings

Every local and cloud model requires manual approval before every execution and
exact-model approval binding. Local candidates require
`cloudDataTransferRequirement: "not-required"` and null cloud/Free-tier
acknowledgement requirements.

Cloud candidates retain the exact existing Private Alpha meanings:

- cloud transfer requirement:
  `explicit-operator-acknowledgement-required`;
- required approval-time cloud transfer acknowledgement:
  `granted-for-approved-scope`;
- required execution-time cloud acknowledgement:
  `granted-for-approved-scope-execution`;
- required execution-time Free-tier confirmation:
  `operator-confirmed-current-free-tier`.

These declarations specify future execution prerequisites. Validation does not
grant or record any acknowledgement or approval.

## Execution and installation posture

Every accepted exact-model packet declares, in this exact order, both existing
kill-switch checkpoints:

1. `before-provider-adapter-resolution-or-credential-work`;
2. `immediately-before-provider-generation`.

The fixed posture also requires one provider attempt, no retry, no fallback, no
rerouting after persistence, no provider substitution, no model substitution, no
automatic model-size switching, and no paid execution. A local model installation
is an explicit operator-managed action. Runtime routing must never download a
model automatically.

## Automatic admission and activation

The v1 automatic state is exactly:

```text
state: "not-admitted"
evidence: null
modes: []
```

There is no dormant v1 branch for an automatic-admission artifact. Qualification,
cost verification, live acceptance, manual admission, capability compatibility,
adapter availability, or registry membership cannot imply automatic admission.
A future separately approved slice must revise both schema and validator before
automatic admission can exist.

Every accepted bundle is exactly candidate-only with no registry, catalog,
routing, UI, or runtime visibility. Activation requires a future explicit source
change; it cannot result from validation.

## Untrusted-input and complexity policy

Inspection is descriptor-based and does not invoke getters. Accessors, proxies,
functions, symbols, symbol keys, cycles, shared object references, exotic
prototypes, sparse arrays, non-enumerable data, secret-looking keys or bounded
common secret material, and unknown fields at every level are rejected.

The immutable v1 limits are:

| Limit | Value |
| --- | ---: |
| maximum nesting depth | 12 |
| maximum visited values/nodes | 4096 |
| maximum keys in one object | 128 |
| maximum items in one array | 256 |
| maximum string length | 8192 UTF-16 code units |
| maximum canonical payload | 262,144 UTF-8 bytes |
| maximum returned issues | 64 |

Issues are deduplicated and ordered by the fixed rejection-code tuple, then packet
kind and packet index. When more than 64 unique issues exist, position 64 is
reserved for `rejection-limit-reached`. Issues never echo a key, value, provider
response, path, or secret material.

## Canonicalization and immutability

Accepted packets are reconstructed field by field into new objects. Providers are
ordered by provider key, models by model key, and provider packets precede model
packets. Canonical object keys use deterministic UTF-16 code-unit ordering. The
digest excludes only the incoming digest field, so equivalent insertion orders
produce identical canonical JSON and content digests.

The accepted graph and all rejection graphs are recursively frozen. Because the
validator copies values, later mutation of candidate input cannot affect a result.
The validator does not register, persist, qualify, approve, acknowledge, route,
resolve, install, download, or execute anything.

## Server/client boundary

`onboarding-types.ts`, `onboarding-constants.ts`, and `onboarding/index.ts` are
client-safe declarations. Authority construction, canonicalization, digest
calculation, and validation are server-only and are exported from `server.ts`.
The generic client-safe barrel does not re-export server modules. No live
application, API, UI, routing, catalog, registry, adapter, approval, store, or
execution path imports this foundation.

## Protected production invariants

Slice P leaves existing adapters and generation paths, the Private Alpha state
machine/store/APIs, approval and acknowledgement APIs, free-first orchestration,
Jarvis/Athena behavior and UI, provider resolver, environment configuration,
production data, qualification and acceptance evidence, exact model keys, routing
decisions, kill-switch ordering, and token envelopes byte-for-byte unchanged.

In particular:

- local-first behavior and `ollama-local::gpt-oss:20b` remain unchanged;
- the local admitted envelope remains 4096;
- exact Groq 20B/120B behavior and the admitted 512 envelope remain unchanged;
- Groq 20B retains its existing gated Free-tier automatic posture;
- Groq 120B remains manual-only;
- no new candidate appears in production registry, catalog, routing, API, or UI.

The ordered production catalog JSON remains unchanged with version
`codexforge-model-routing-v4`, provider order `ollama-local`, `groq-cloud`, model
order `ollama-local::gpt-oss:20b`, `groq-cloud::openai/gpt-oss-20b`,
`groq-cloud::openai/gpt-oss-120b`, and SHA-256:

```text
06f4eca8688728c2d2457e48284394fa823fbbe13a07ff1fd4a781227e4e4d0b
```

## Next slice

The following slice should add source-owned declarations for the first exact
free/local provider and model candidates without activation. Later separately
approved slices may add qualification and exact-model live acceptance, then
manual-execution admission, and only after another schema review optional
automatic-routing admission. Registry/catalog activation remains its own explicit
source decision.
