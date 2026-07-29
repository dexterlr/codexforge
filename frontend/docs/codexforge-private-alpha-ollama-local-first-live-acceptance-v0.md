# CodexForge Ollama local-first live acceptance

This source-only admission records the completed local-first Private Alpha acceptance dated 2026-07-28 at checkpoint `041a36d39858ee90f7c7bd320f73c4c0e820d8c8`. Its date-only identity is `codexforge-ollama-local-private-alpha-local-first-live-acceptance-20260728`.

Lane 1, `local-first-selection-create-cancel`, used free-first policy `codexforge-private-alpha-free-first-routing-v1`. It selected `ollama-local::gpt-oss:20b` for approval with an observed 512-token request envelope, one runtime snapshot, no cloud inspection or transfer, and no generation. Creation returned 201, then the run moved from awaiting approval to canceled at revision 2. The ordered audit states were created, approval requested, and canceled.

Lane 2, `manual-approved-local-execution`, separately approved and explicitly executed the same local provider and model. Its observed request envelope was 64 tokens. The state path was awaiting approval at revision 1, approved at revision 2, then succeeded at revision 4. It made one local generation, produced length 27 with SHA-256 `a9d18133e6f4aedfbe07c1fb7c0291f3be3d98d730de2908f5494f1c63fe6db7`, stopped normally, and retained no error. The ordered audit states were created, approval requested, approval granted, execution started, and execution succeeded.

The observed 512 and 64 values are acceptance evidence only. They do not replace or reduce the catalog-approved local maximum, which remains 4096 output tokens. Manual approval remains required and execution remains a separate explicit action.

The boundary is local-machine. There was no paid execution, retry, fallback, model substitution, cloud transfer, cloud provider request, or Groq credential access. This slice admits metadata and documentation only; it makes no provider request and does not alter routing, approval, persistence, execution, adapters, APIs, or UI.

No prompts, outputs, run identifiers, idempotency material, approval hashes, credentials, process details, network endpoints, acceptance artifacts, temporary locations, or unprocessed provider replies are committed.
