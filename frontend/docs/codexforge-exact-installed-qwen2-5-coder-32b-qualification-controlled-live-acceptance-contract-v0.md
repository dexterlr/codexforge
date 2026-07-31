# CodexForge exact installed Qwen 2.5 Coder 32B qualification and controlled live acceptance

## Slice R boundary

Slice R adds an isolated server-only qualification and one-shot acceptance
foundation for the Slice Q candidate `ollama-local::qwen2.5-coder:32b`. Source
validation and deterministic smoke execution perform no live metadata request or
generation. The two manual scripts are never part of the aggregate release gate.

Candidate declaration, qualification, live acceptance, evidence admission,
production registry admission, routing admission, and normal execution admission
remain separate states. Qualification grants only qualification evidence. A
successful controlled generation grants only pending acceptance evidence.
Evidence admission grants no production registry, routing, selector, UI, API, or
Private Alpha execution authority.

## Exact binding

The provider is `ollama-local`, the exact Ollama model is
`qwen2.5-coder:32b`, and the model key is
`ollama-local::qwen2.5-coder:32b`. The required installed digest is:

```text
b92d6a0bd47ee79114298de0177bf920c05a706d12633950b3936778492bef41
```

The Slice Q observation and complete-candidate digests are respectively:

```text
dfe1f6372dad8a52d68f6af185cd7cee42c31da9c9e2a6762fc58f08778f0e90
a31dc824a83578dfb62e68cc7603b8681548f9e2507ac14df8fd62d4c7b1197f
```

The candidate declaration ceiling remains 4096 output tokens. The controlled
acceptance lane is separately capped at 64. Automatic download and paid
execution remain false.

## Read-only qualification

Qualification uses only the fixed numeric origin `http://127.0.0.1:11434`,
`GET /api/tags`, and read-only `POST /api/show` with exact compact body:

```json
{"model":"qwen2.5-coder:32b","verbose":false}
```

There is no configurable host, DNS, redirect, proxy, credential, Ollama CLI,
child process, download, pull, create, copy, delete, reload, replacement, or
keep-alive mutation. The compact response deliberately excludes unnecessary
verbose tokenizer arrays. Metadata responses remain capped at exactly 262,144
bytes, each call at five seconds, with a ten-second qualification budget. The
current exact name, digest, installation metadata, declared capabilities,
structured model metadata, and content hashes must match Slice Q. Raw metadata
is discarded.

The qualification state path is:

```text
not-started -> verifying-installed-identity -> qualified | rejected | canceled
```

Qualification evidence expires after 15 minutes and records two metadata calls
and zero generation attempts.

## Controlled acceptance

The fixed prompt is source-owned and contains no dynamic input:

```text
Return exactly this single line of ASCII TypeScript and nothing else: export const codexForgeSliceR = 32;
```

It is 105 UTF-8 bytes with SHA-256
`25c5194982f30559a885a007c3bff63c3a8d2f32aec19dbec9c410882443cd30`.
The exact expected 35-byte output is:

```text
export const codexForgeSliceR = 32;
```

Its SHA-256 is
`e8bbd494ebcb4bb38f634493cc98b09a379f31a2a7b970592495a09e483c95e1`.
No trimming, newline conversion, or Unicode normalization is allowed.

The request has exactly one user message, no system message, tools, images,
attachments, or dynamic text; `stream` is false and options are temperature 0,
seed 0, and `num_predict` 64. The full response is capped at 65,536 bytes and
accepted output at 256 bytes. `eval_count` is required in the range 0 through
64; `done` must be true; the assistant role and exact returned model are
required. Tool calls, images, empty output, malformed responses, oversize output,
and substitution fail closed.

The acceptance state path is:

```text
not-started -> validating-qualification -> awaiting-explicit-approval
-> preflight-verification -> approval-consumed -> executing
-> accepted | rejected | canceled
```

Approval is separate, created after qualification, valid no more than ten
minutes, and bound to the exact candidate, qualification, prompt, envelope,
timeout, and one-attempt posture. An exclusive create-new tombstone consumes the
approval. Replay and uncertain crash recovery are prohibited; another attempt
requires a new qualification and approval.

The existing kill switch is read before client resolution and again immediately
before generation. Consumption before the second check remains terminal. The
generation timeout is 300 seconds and cancellation never retries.

## Evidence boundary

Evidence retains only exact identity/source digests, normalized metadata digest,
qualification/approval/checkpoint digests, byte and token counts, prompt/output
hashes, bounded timing/count data, invariant counters, terminal state, and
bounded rejection codes. It never retains raw metadata, prompt, generated
output, provider response, credentials, environment contents, operator identity,
machine paths, process details, Private Alpha identifiers, normal approval
hashes, idempotency keys, or run data.

Manual evidence output must be an explicit existing directory outside the
repository. Files use create-new semantics and are never overwritten. They are
qualification/acceptance evidence, not Private Alpha runs.

## Production invariants

The Slice O registry, `codexforge-model-routing-v4` catalog, routing policy,
Private Alpha store/routes, selectors, Jarvis, Athena, GPT-OSS Ollama adapter,
Groq runtime, credential resolution, and kill-switch implementation remain
unchanged. Qwen is not exported through a production barrel and remains absent
from normal runtime inventory.

The production catalog remains SHA-256
`06f4eca8688728c2d2457e48284394fa823fbbe13a07ff1fd4a781227e4e4d0b`,
with providers `ollama-local`, `groq-cloud` and models, in order,
`ollama-local::gpt-oss:20b`, `groq-cloud::openai/gpt-oss-20b`, and
`groq-cloud::openai/gpt-oss-120b`.
