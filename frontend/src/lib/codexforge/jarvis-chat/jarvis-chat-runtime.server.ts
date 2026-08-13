import "server-only";

import type { PrivateAlphaProviderAdapter } from "@/lib/codexforge/private-alpha/private-alpha-provider.server";
import {
  createJarvisChatLifecycleAdapter,
  createJarvisChatLifecycleAdapterForTesting,
} from "./jarvis-chat-private-alpha-adapter.server";
import {
  createJarvisChatPersistence,
  createJarvisChatPersistenceForTesting,
} from "./jarvis-chat-persistence.server";
import { sanitizeJarvisChatTestSuffix } from "./jarvis-chat-policy";
import { createJarvisChatService, type JarvisChatService } from "./jarvis-chat-service.server";

const REGISTRY_KEY = Symbol.for("codexforge.jarvis-chat.runtime-registry.v1");
const MAXIMUM_RUNTIME_SERVICES = 16;

type Registry = Readonly<{
  version: 1;
  get(key: string): JarvisChatService | undefined;
  register(key: string, service: JarvisChatService): void;
  size(): number;
}>;

type RegistryHost = Readonly<Record<symbol, unknown>>;

function isService(value: unknown): value is JarvisChatService {
  if (typeof value !== "object" || value === null) return false;
  const candidate = value as Partial<JarvisChatService>;
  return (
    typeof candidate.createConversation === "function" &&
    typeof candidate.listConversations === "function" &&
    typeof candidate.getConversation === "function" &&
    typeof candidate.getRuntimeStatus === "function" &&
    typeof candidate.actOnConversation === "function"
  );
}

function registry(): Registry {
  const host = process as unknown as RegistryHost;
  const descriptor = Object.getOwnPropertyDescriptor(host, REGISTRY_KEY);
  if (descriptor) {
    const cached = descriptor.value as Partial<Registry>;
    if (
      descriptor.configurable !== false ||
      descriptor.enumerable !== false ||
      descriptor.writable !== false ||
      !Object.isFrozen(cached) ||
      cached.version !== 1 ||
      typeof cached.get !== "function" ||
      typeof cached.register !== "function" ||
      typeof cached.size !== "function" ||
      !Number.isSafeInteger(cached.size()) ||
      cached.size() < 0 ||
      cached.size() > MAXIMUM_RUNTIME_SERVICES
    ) throw new Error("Jarvis chat runtime process cache is invalid.");
    return cached as Registry;
  }
  const services = new Map<string, JarvisChatService>();
  const value = Object.freeze({
    version: 1 as const,
    get(key: string) {
      return services.get(key);
    },
    register(key: string, service: JarvisChatService) {
      if (!/^production$|^test:[a-z0-9](?:[a-z0-9-]{0,46}[a-z0-9])?$/u.test(key) || !isService(service)) {
        throw new Error("Jarvis chat runtime registration is invalid.");
      }
      if (services.has(key) || services.size >= MAXIMUM_RUNTIME_SERVICES) {
        throw new Error("Jarvis chat runtime registration conflicts or exceeds its bound.");
      }
      services.set(key, Object.freeze(service));
    },
    size() {
      return services.size;
    },
  });
  Object.defineProperty(process, REGISTRY_KEY, {
    value,
    configurable: false,
    enumerable: false,
    writable: false,
  });
  return value;
}

const DETERMINISTIC_TRANSPORT_TRAP = Object.freeze({
  identity: {
    providerId: "ollama-local",
    providerLabel: "Local Ollama",
    modelId: "gpt-oss:20b",
    modelLabel: "gpt-oss:20b",
    modelKey: "ollama-local::gpt-oss:20b",
    locality: "local",
    dataBoundary: "local-machine",
    costClass: "local-no-provider-token-charge",
    approvedMaximumOutputTokens: 4096,
  },
  async getAvailability() {
    throw new Error("Provider availability is disabled in deterministic Jarvis chat mode.");
  },
  async generateApprovedText() {
    throw new Error("Provider generation is disabled in deterministic Jarvis chat mode.");
  },
}) satisfies PrivateAlphaProviderAdapter;

function runtimeIdentity(): Readonly<{ key: string; testSuffix: string | null }> {
  const testMode = process.env.CODEXFORGE_JARVIS_CHAT_DETERMINISTIC_TEST_MODE === "1";
  const requested = process.env.CODEXFORGE_JARVIS_CHAT_DETERMINISTIC_TEST_SUFFIX?.trim() ?? "";
  if (!testMode && !requested) return { key: "production", testSuffix: null };
  if (process.env.NODE_ENV === "production" || !testMode || !requested) {
    throw new Error("Jarvis chat deterministic test isolation is unavailable in this runtime.");
  }
  const testSuffix = sanitizeJarvisChatTestSuffix(requested);
  return { key: `test:${testSuffix}`, testSuffix };
}

export function getJarvisChatRuntimeService(): JarvisChatService {
  const identity = runtimeIdentity();
  const cache = registry();
  const existing = cache.get(identity.key);
  if (existing) {
    if (!isService(existing)) throw new Error("Jarvis chat cached service is invalid.");
    return existing;
  }
  const service = identity.testSuffix
    ? createJarvisChatService({
        persistence: createJarvisChatPersistenceForTesting(identity.testSuffix),
        lifecycle: createJarvisChatLifecycleAdapterForTesting(
          identity.testSuffix,
          DETERMINISTIC_TRANSPORT_TRAP
        ),
      })
    : createJarvisChatService({
        persistence: createJarvisChatPersistence(),
        lifecycle: createJarvisChatLifecycleAdapter(),
      });
  cache.register(identity.key, service);
  return service;
}
