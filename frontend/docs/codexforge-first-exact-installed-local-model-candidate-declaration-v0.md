# CodexForge First Exact Installed Local Model Candidate Declaration v0

## Slice Q boundary

Slice Q declares one source-owned, statically validated candidate for the
existing production provider reference `ollama-local`:

```text
model ID:  qwen2.5-coder:32b
model key: ollama-local::qwen2.5-coder:32b
```

It does not create a generic provider candidate for the reserved production
provider. It does not modify production registry or catalog membership, routing,
manual selection, Private Alpha, approval, execution, UI, or API behavior.

## Exact installation observation

The historical read-only observation is pinned to:

```text
full installed SHA-256: b92d6a0bd47ee79114298de0177bf920c05a706d12633950b3936778492bef41
display-only prefix:    b92d6a0bd47e
size:                   19,851,349,898 bytes
format:                 gguf
family:                 qwen2
parameter size/count:   32.8B / 32,763,876,352
quantization:           Q4_K_M
context/embedding:      32,768 / 5,120
modified:               2026-03-04T19:06:19.4791617Z
```

The observation ran from `2026-07-30T17:10:30.7425135Z` through
`2026-07-30T17:10:30.9034990Z`, with authority date `2026-07-30`, using the
source label `ollama-localhost-metadata-api`. Slice Q performs no metadata
request. The observation is historical source evidence only.

The 12-character digest is display and inventory evidence. Only the complete
64-character lowercase digest is accepted as installed-model identity.

Observed Ollama metadata lists `completion`, `tools`, and `insert`. These values
are retained as observation data and grant no capability. The candidate remains
exactly text generation with text input and text output. Tool and insert
capabilities are not admitted.

## Observed content checksums

| Content | SHA-256 | UTF-8 bytes |
| --- | --- | ---: |
| template | `1e65450c30670713aa47fe23e8b9662bdf4065e81cc8e3cbfaa98924fcc0d320` | 1,615 |
| parameters | `null` | - |
| license | `832dd9e00a68dd83b3c3fb9f5588dad7dcf337a0db50f7d9483f310cd292e92e` | 11,343 |
| system | `66b9ea09bd5b7099cbb4fc820f31b575c0366fa439b08245566692c6784e281e` | 68 |
| Modelfile | `a6965de38f838ed1483c856796f955ccfbe040939c4ea8802601987f979a65e7` | 13,303 |

## Candidate posture

The candidate is declaration-only and static-validation-only. The local
installation observation establishes no runtime availability, qualification,
live acceptance, manual admission, automatic admission, activation, approval,
or execution.

The model packet fixes:

- capability verification to unverified;
- model qualification to not qualified;
- live acceptance to not accepted;
- manual execution admission to not admitted;
- automatic-routing admission to not admitted, with null evidence and no modes;
- registry and catalog membership to candidate-only;
- every selection, routing, Private Alpha, runtime, UI, and API visibility to
  none;
- request approval to not recorded;
- execution, registry activation, and catalog activation to impossible;
- automatic download, paid execution, retry, fallback, rerouting, provider or
  model substitution, and automatic model-size switching to false;
- maximum provider attempts to one; and
- both established kill-switch checkpoints in their existing order.

The requested candidate output ceiling is 4096 tokens. This does not change the
existing GPT-OSS local envelope or any production admission.

## Existing adapter authority

The separate Slice Q authority binds the existing source identity:

```text
provider:        ollama-local
adapter:         private-alpha-ollama-adapter
protocol:        ollama-native-http-v1
locality:        local
data boundary:   local-machine
credential mode: none
```

Its qualification, acceptance, manual-admission, automatic-admission, registry,
and catalog authorities are all `none`. The authority is not exported through a
production barrel and cannot activate the candidate.

## Canonical digests

The installation artifact digest is calculated over its canonical projection
excluding only `artifactDigest`:

```text
dfe1f6372dad8a52d68f6af185cd7cee42c31da9c9e2a6762fc58f08778f0e90
```

The complete candidate content digest is calculated over its canonical
projection excluding only `contentDigest`, while including the evidence artifact
digest:

```text
a31dc824a83578dfb62e68cc7603b8681548f9e2507ac14df8fd62d4c7b1197f
```

Both use Slice P's SHA-256 and canonicalization identifiers, complexity limits,
code-unit key ordering, and deep-freezing primitive. These checksums are not
signatures, authentication, authorization, qualification, admission, activation,
or runtime availability.

## Digest changes fail closed

Any short, malformed, or different installed digest is rejected. If the local
tag later points to different model content, this artifact remains historical and
does not cover the replacement. A new read-only observation, evidence version,
candidate digest, deterministic smoke update, review, and source approval are
required. The human-readable model key may remain stable while each reviewed
installation artifact pins its exact full digest.

## Server-only and non-escalation boundary

The candidate data, canonicalization, validator, authority, and getter live only
in the dedicated Slice Q server module. The types reuse Slice P model packet,
adapter authority, and content digest types. Neither Q file is exported from the
onboarding, model-routing, registry, catalog, router, Private Alpha, API, or UI
barrels.

Every getter call returns a new recursively frozen graph. Static validation
accepts only the exact source contract, rejects unknown or non-plain data with
bounded non-echoing codes, and returns a new recursively frozen graph.

## Deferred models

`deepseek-coder-v2:latest`, `llama3:latest`, `llama3.1:latest`,
`llama3-gpu:latest`, `llama3.1-coder-gpu:latest`,
`nomic-embed-text:latest`, `mxbai-embed-large:latest`, `all-minilm:latest`, every
uninstalled model, and every cloud provider/model remain out of scope. Mutable
`latest` tags need a separate identity decision; custom GPU aliases need
provenance inspection; embedding models do not satisfy Slice P text-generation
v1; and downloads require a separate explicit operator-approved slice.

## Protected catalog

The production catalog remains `codexforge-model-routing-v4`, with provider order
`ollama-local`, `groq-cloud`, model order `ollama-local::gpt-oss:20b`,
`groq-cloud::openai/gpt-oss-20b`, `groq-cloud::openai/gpt-oss-120b`, and JSON
SHA-256:

```text
06f4eca8688728c2d2457e48284394fa823fbbe13a07ff1fd4a781227e4e4d0b
```

## Following slice

A separately approved slice may qualify and live-accept this exact full-digest
model. Manual execution admission, automatic routing, registry/catalog
activation, and UI/API exposure remain later independent decisions.
