# CodexForge Free/Local Provider Registry Foundation v0

Slice O adds the immutable production free/local provider registry used to compose the existing `codexforge-model-routing-v4` catalog. The v4 catalog remains the routing source exposed to existing consumers.

The registry contains, in order, `ollama-local::gpt-oss:20b`, `groq-cloud::openai/gpt-oss-20b`, and `groq-cloud::openai/gpt-oss-120b`. Ollama retains its 4096-token envelope; both Groq models retain 512-token envelopes. Local-first behavior is unchanged.

Manual approval and a separate execution action remain required. Groq also requires cloud-transfer and cloud-execution acknowledgements. The existing runtime enforces both execution kill-switch checks. Paid execution, retry, fallback, and substitution remain disabled.

Registry reads perform no provider inspection, credential access, routing, persistence, or generation. The historical `ai-provider-registry` is preview-only and is not production authority. Slice P will separately define safe installed-model discovery. Slice O admits no new provider or model.
