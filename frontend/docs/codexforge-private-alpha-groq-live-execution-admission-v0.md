# CodexForge Private Alpha Groq Live Execution Admission v0

## Scope

This slice records and admits two exact Groq Private Alpha execution paths that
were exercised through the real Jarvis or Athena UI and then verified through
credential-free reads of persisted records.

This is an admission and metadata slice only:

- no execution code changes
- no API changes
- no UI changes
- no automatic routing
- no retry
- no fallback
- no model substitution

## Accepted Models

- `groq-cloud::openai/gpt-oss-20b`
- `groq-cloud::openai/gpt-oss-120b`

Sanitized acceptance ID:

- `codexforge-groq-private-alpha-live-execution-20260727-165043`

Accepted date and checkpoint:

- accepted on `2026-07-27`
- checkpoint `b17311bb5720a5037edd756d91c266eee7ce6947`
- original live server mode `next-start-production`
- final verification mode `read-only-persisted-record-verification`

## Safe Accepted Evidence

20B accepted record:

- model ID `openai/gpt-oss-20b`
- accepted maximum output tokens `512`
- prompt tokens `107`
- output tokens `34`
- duration milliseconds `43.60`
- output SHA-256 `7260eac34af33fdbf6c21ad8633820e0ef6152036b2217d8026170b7b8b01553`

120B accepted record:

- model ID `openai/gpt-oss-120b`
- accepted maximum output tokens `512`
- prompt tokens `107`
- output tokens `46`
- duration milliseconds `99.67`
- output SHA-256 `015dc137038a67c0055c2702def41ec2b3673d46fe714d80c9f57075f015ac76`

## Safety Requirements

Exact manual provider selection and exact model selection were required.

Generic manual approval was required.

Separate cloud-transfer acknowledgement was required.

Separate cloud-execution acknowledgement was required.

Credential lifecycle remains bounded:

- no credential was stored
- no API key was stored
- no credential reference was stored
- no authorization header was stored

Final verification remained read-only:

- no provider request occurred during final verification
- no raw prompt was stored
- no raw output text was stored
- no raw provider response was stored
- no local run ID was stored
- no local Temp path was stored

## Posture

Automatic routing remains disabled for Groq.

Retry, fallback, and substitution remain disabled by the admitted posture.

The next slice is free-first automatic-routing policy integration, and it stays
separately gated.
