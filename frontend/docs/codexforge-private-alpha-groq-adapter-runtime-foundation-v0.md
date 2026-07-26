# CodexForge Private Alpha Groq Adapter Runtime Foundation v0

## Purpose

Slice H completes the provider boundary needed for a second provider without
changing the current private-alpha execution path.

The original adapter contract was still implicitly local-Ollama-specific. It
had no provider-neutral identity, no quota state, and no deterministic runtime
resolver from a model key to a server-only adapter. That made it impossible to
add a typed Groq adapter without either duplicating routing metadata or leaking
provider-specific assumptions into the store.

## Provider-neutral adapter identity

The provider contract now requires a frozen provider-neutral identity:

- provider ID and label
- model ID, label, and model key
- provider locality
- data boundary
- cost class
- approved maximum output tokens

This keeps the adapter boundary aligned with the authoritative model-routing
catalog without introducing duplicate string domains.

## Error taxonomy

Groq-specific private-alpha error codes were added so the adapter and runtime
boundary can describe Groq configuration, discovery, quota, and generation
failures without reusing Ollama-only meanings.

Historical compatibility is preserved:

- the private-alpha record version remains `1`
- persisted execution records remain local-Ollama-specific
- existing historical Ollama records remain readable
- no Groq execution record is persisted in this slice

## Adapter identities

The local Ollama adapter now exposes a frozen identity for:

- provider: `ollama-local`
- model: `gpt-oss:20b`
- model key: `ollama-local::gpt-oss:20b`
- locality: `local`
- data boundary: `local-machine`
- cost class: `local-no-provider-token-charge`
- approved maximum output tokens: `4096`

Its availability now also reports quota state as `not-applicable`.

The Groq adapter exposes a frozen identity for each admitted model:

- `groq-cloud::openai/gpt-oss-20b`
- `groq-cloud::openai/gpt-oss-120b`

Both Groq identities use:

- provider: `groq-cloud`
- provider label: `Groq Cloud`
- locality: `cloud`
- data boundary: `cloud-provider`
- cost class: `free-tier`
- approved maximum output tokens: `4096`

Each Groq adapter is explicitly bound to one model. There is no default Groq
model and no implicit model substitution.

## Availability and generation

Groq availability is configuration-aware and discovery-based:

- if the Groq credential is not configured, availability returns a bounded
  `groq_credential_missing` result and makes no discovery call
- if configured, the adapter performs exactly one discovery call and evaluates
  only its bound model
- an active discovered model maps to available provider/model state with quota
  state `available`
- missing or inactive discovery maps to `groq_model_unavailable`
- quota and rate-limit errors map to explicit quota-state outcomes

Groq generation remains delegated to the existing Groq client:

- no new fetch logic was added
- no new credential reader was added
- reasoning remains hidden by the existing Groq client
- output text is preserved exactly without trimming
- `finishReason` maps to `doneReason`
- `totalDurationNanoseconds` maps directly
- `promptTokens` maps to `promptEvalCount`
- `outputTokens` maps to `evalCount`
- `loadDurationNanoseconds` remains `null`

No retry and no fallback were added.

## Runtime model-key boundary

The runtime foundation now provides a deterministic server-only resolver from an
exact model key to an exact adapter:

- `ollama-local::gpt-oss:20b`
- `groq-cloud::openai/gpt-oss-20b`
- `groq-cloud::openai/gpt-oss-120b`

Unknown keys are rejected before unnecessary client construction, credential
read, or provider call.

Adapter construction itself performs no provider call.

Runtime inspection now produces deterministic model runtime snapshots using:

- the adapter identity
- one availability call
- an injected wall clock for `observedAt`
- an injected monotonic clock for latency

The snapshot is frozen and records:

- the exact model key
- available or unavailable state
- the adapter quota state
- deterministic observed latency when the injected clock values are valid

## Non-goals

This slice does not add:

- store integration
- API integration
- UI provider selection
- cloud approval
- credential storage
- retry
- fallback
- streaming
- tool execution

Current private-alpha execution remains local Ollama only.

Groq remains manual-only in the production catalog.

No credential or acceptance token is stored.

## Next slice

The next slice is explicit cloud approval and provider/model binding in the
private-alpha approval scope before Groq execution integration.
