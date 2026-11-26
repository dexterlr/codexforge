import "server-only";

import {
  createCreatorGenerationLifecycleAdapter,
  createCreatorGenerationLifecycleAdapterForTesting,
} from "./creator-private-alpha-adapter.server";
import type { PrivateAlphaProviderAdapter } from "@/lib/codexforge/private-alpha/private-alpha-provider.server";
import {
  createCreatorPersistence,
  createCreatorPersistenceFromFilesystem,
  createCreatorPersistenceForTesting,
} from "./creator-persistence.server";
import { sanitizeCreatorTestSuffix } from "./creator-policy";
import { createCreatorService, type CreatorService } from "./creator-service.server";

const CREATOR_RUNTIME_REGISTRY_CACHE_KEY = Symbol.for(
  "codexforge.creator.runtime-service-registry.v7"
);
const CREATOR_RUNTIME_PERSISTENCE_REGISTRY_CACHE_KEY = Symbol.for(
  "codexforge.creator.runtime-persistence-registry.v3"
);
const CREATOR_RUNTIME_PREVIOUS_PERSISTENCE_REGISTRY_CACHE_KEY = Symbol.for(
  "codexforge.creator.runtime-persistence-registry.v2"
);
const CREATOR_RUNTIME_LEGACY_PERSISTENCE_REGISTRY_CACHE_KEY = Symbol.for(
  "codexforge.creator.runtime-persistence-registry.v1"
);

type CreatorRuntimeRegistry = Readonly<{
  version: 7;
  has(key: string): boolean;
  get(key: string): CreatorService | undefined;
  register(key: string, service: CreatorService): void;
  size(): number;
}>;

type CreatorRuntimePersistenceRegistry = Readonly<{
  version: 3;
  get(key: string): ReturnType<typeof createCreatorPersistence> | undefined;
  register(key: string, persistence: ReturnType<typeof createCreatorPersistence>): void;
  size(): number;
}>;

type CreatorRuntimeRegistryHost = Readonly<Record<symbol, unknown>>;
const CREATOR_RUNTIME_REGISTRY_MAXIMUM_ENTRIES = 16;

function isCreatorService(value: unknown): value is CreatorService {
  if (typeof value !== "object" || value === null) return false;
  const candidate = value as Partial<CreatorService>;
  return (
    typeof candidate.createProject === "function" &&
    typeof candidate.prepareProjectPlan === "function" &&
    typeof candidate.getProject === "function" &&
    typeof candidate.getProjectRevision === "function" &&
    typeof candidate.getTopologyRepairEligibility === "function" &&
    typeof candidate.listProjects === "function" &&
    typeof candidate.listProjectSummaries === "function" &&
    typeof candidate.actOnProject === "function" &&
    typeof candidate.readActivePreviewFile === "function" &&
    typeof candidate.readExportManifest === "function" &&
    typeof candidate.readExportFile === "function"
  );
}

function getCreatorRuntimeRegistry(): CreatorRuntimeRegistry {
  const cacheHost = process as unknown as CreatorRuntimeRegistryHost;
  const descriptor = Object.getOwnPropertyDescriptor(
    cacheHost,
    CREATOR_RUNTIME_REGISTRY_CACHE_KEY
  );
  if (descriptor) {
    const cached = descriptor.value;
    if (
      descriptor.configurable !== false ||
      descriptor.enumerable !== false ||
      descriptor.writable !== false ||
      typeof cached !== "object" ||
      cached === null ||
      !Object.isFrozen(cached) ||
      (cached as Partial<CreatorRuntimeRegistry>).version !== 7 ||
      typeof (cached as Partial<CreatorRuntimeRegistry>).has !== "function" ||
      typeof (cached as Partial<CreatorRuntimeRegistry>).get !== "function" ||
      typeof (cached as Partial<CreatorRuntimeRegistry>).register !== "function" ||
      typeof (cached as Partial<CreatorRuntimeRegistry>).size !== "function" ||
      !Number.isSafeInteger((cached as CreatorRuntimeRegistry).size()) ||
      (cached as CreatorRuntimeRegistry).size() < 0 ||
      (cached as CreatorRuntimeRegistry).size() >
        CREATOR_RUNTIME_REGISTRY_MAXIMUM_ENTRIES
    ) {
      throw new Error("Creator runtime process cache is invalid.");
    }
    return cached as CreatorRuntimeRegistry;
  }
  const services = new Map<string, CreatorService>();
  const registry = Object.freeze({
    version: 7 as const,
    has(key: string) {
      return services.has(key);
    },
    get(key: string) {
      return services.get(key);
    },
    register(key: string, service: CreatorService) {
      if (!/^production$|^test:[a-z0-9](?:[a-z0-9-]{0,46}[a-z0-9])?$/u.test(key)) {
        throw new Error("Creator runtime cache key is invalid.");
      }
      if (!isCreatorService(service)) {
        throw new Error("Creator runtime service interface is invalid.");
      }
      if (services.has(key)) {
        throw new Error("Creator runtime service is already registered.");
      }
      if (services.size >= CREATOR_RUNTIME_REGISTRY_MAXIMUM_ENTRIES) {
        throw new Error("Creator runtime process cache capacity is exhausted.");
      }
      services.set(key, Object.freeze(service));
    },
    size() {
      return services.size;
    },
  });
  Object.defineProperty(process, CREATOR_RUNTIME_REGISTRY_CACHE_KEY, {
    value: registry,
    configurable: false,
    enumerable: false,
    writable: false,
  });
  return registry;
}

function getCreatorRuntimePersistenceRegistry(): CreatorRuntimePersistenceRegistry {
  const cacheHost = process as unknown as CreatorRuntimeRegistryHost;
  const descriptor = Object.getOwnPropertyDescriptor(
    cacheHost,
    CREATOR_RUNTIME_PERSISTENCE_REGISTRY_CACHE_KEY
  );
  if (descriptor) {
    const cached = descriptor.value;
    if (
      descriptor.configurable !== false ||
      descriptor.enumerable !== false ||
      descriptor.writable !== false ||
      typeof cached !== "object" ||
      cached === null ||
      !Object.isFrozen(cached) ||
      (cached as Partial<CreatorRuntimePersistenceRegistry>).version !== 3 ||
      typeof (cached as Partial<CreatorRuntimePersistenceRegistry>).get !== "function" ||
      typeof (cached as Partial<CreatorRuntimePersistenceRegistry>).register !== "function" ||
      typeof (cached as Partial<CreatorRuntimePersistenceRegistry>).size !== "function" ||
      !Number.isSafeInteger((cached as CreatorRuntimePersistenceRegistry).size()) ||
      (cached as CreatorRuntimePersistenceRegistry).size() < 0 ||
      (cached as CreatorRuntimePersistenceRegistry).size() >
        CREATOR_RUNTIME_REGISTRY_MAXIMUM_ENTRIES
    ) {
      throw new Error("Creator runtime persistence cache is invalid.");
    }
    return cached as CreatorRuntimePersistenceRegistry;
  }
  const persistences = new Map<string, ReturnType<typeof createCreatorPersistence>>();
  const registry = Object.freeze({
    version: 3 as const,
    get(key: string) {
      return persistences.get(key);
    },
    register(key: string, persistence: ReturnType<typeof createCreatorPersistence>) {
      if (!/^production$|^test:[a-z0-9](?:[a-z0-9-]{0,46}[a-z0-9])?$/u.test(key)) {
        throw new Error("Creator runtime persistence cache key is invalid.");
      }
      if (
        !persistence ||
        typeof persistence !== "object" ||
        persistence.schemaVersion !== 3 ||
        typeof persistence.withInventoryLock !== "function" ||
        typeof persistence.withProjectLock !== "function" ||
        typeof persistence.readProject !== "function" ||
        typeof persistence.writeInitialProject !== "function"
      ) {
        throw new Error("Creator runtime persistence interface is invalid.");
      }
      if (persistences.has(key) || persistences.size >= CREATOR_RUNTIME_REGISTRY_MAXIMUM_ENTRIES) {
        throw new Error("Creator runtime persistence registration is invalid.");
      }
      persistences.set(key, persistence);
    },
    size() {
      return persistences.size;
    },
  });
  Object.defineProperty(process, CREATOR_RUNTIME_PERSISTENCE_REGISTRY_CACHE_KEY, {
    value: registry,
    configurable: false,
    enumerable: false,
    writable: false,
  });
  return registry;
}

const runtimeRegistry = getCreatorRuntimeRegistry();
const runtimePersistenceRegistry = getCreatorRuntimePersistenceRegistry();

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
    throw new Error("Provider transport is disabled in deterministic creator mode.");
  },
  async generateApprovedText() {
    throw new Error("Generation is disabled in deterministic creator mode.");
  },
}) satisfies PrivateAlphaProviderAdapter;

function resolveRuntimeKey(): Readonly<{ key: string; testSuffix: string | null }> {
  const deterministicMode = process.env.CODEXFORGE_CREATOR_DETERMINISTIC_TEST_MODE === "1";
  const requestedSuffix = process.env.CODEXFORGE_CREATOR_DETERMINISTIC_TEST_SUFFIX?.trim() ?? "";
  if (!deterministicMode && !requestedSuffix) return { key: "production", testSuffix: null };
  if (
    process.env.NODE_ENV === "production" ||
    !deterministicMode ||
    !requestedSuffix
  ) {
    throw new Error("Creator deterministic test isolation is unavailable in this runtime.");
  }
  const testSuffix = sanitizeCreatorTestSuffix(requestedSuffix);
  return { key: `test:${testSuffix}`, testSuffix };
}

export function getCreatorRuntimeService(): CreatorService {
  const runtime = resolveRuntimeKey();
  if (runtimeRegistry.has(runtime.key)) {
    const cached = runtimeRegistry.get(runtime.key);
    if (!isCreatorService(cached)) {
      throw new Error("Creator runtime cached service is invalid.");
    }
    return cached;
  }
  const persistence = getCreatorRuntimePersistence();
  const service = Object.freeze(runtime.testSuffix
    ? createCreatorService({
        persistence,
        lifecycle: createCreatorGenerationLifecycleAdapterForTesting(
          runtime.testSuffix,
          DETERMINISTIC_TRANSPORT_TRAP
        ),
      })
    : createCreatorService({
        persistence,
        lifecycle: createCreatorGenerationLifecycleAdapter(),
      }));
  runtimeRegistry.register(runtime.key, service);
  return service;
}

export function getCreatorRuntimePersistence(): ReturnType<typeof createCreatorPersistence> {
  const runtime = resolveRuntimeKey();
  const existing = runtimePersistenceRegistry.get(runtime.key);
  if (existing) return existing;
  const cacheHost = process as unknown as CreatorRuntimeRegistryHost;
  const previousDescriptor = Object.getOwnPropertyDescriptor(
    cacheHost,
    CREATOR_RUNTIME_PREVIOUS_PERSISTENCE_REGISTRY_CACHE_KEY
  );
  const legacyDescriptor = Object.getOwnPropertyDescriptor(
    cacheHost,
    CREATOR_RUNTIME_LEGACY_PERSISTENCE_REGISTRY_CACHE_KEY
  );
  const previousRegistry = previousDescriptor?.value as
    | Readonly<{ get?: (key: string) => unknown }>
    | undefined;
  const legacyRegistry = legacyDescriptor?.value as
    | Readonly<{ get?: (key: string) => unknown }>
    | undefined;
  const previousPersistence = previousRegistry?.get?.(runtime.key) as
    | Partial<ReturnType<typeof createCreatorPersistence>>
    | undefined;
  const legacyPersistence = (previousPersistence ??
    legacyRegistry?.get?.(runtime.key)) as
    | Partial<ReturnType<typeof createCreatorPersistence>>
    | undefined;
  const expectedDataRootLabel = runtime.testSuffix
    ? `.codexforge/creator-tests/${runtime.testSuffix}`
    : ".codexforge/creator";
  const persistence =
    legacyPersistence?.filesystem &&
    legacyPersistence.filesystem.dataRootLabel === expectedDataRootLabel
      ? createCreatorPersistenceFromFilesystem(legacyPersistence.filesystem)
      : runtime.testSuffix
        ? createCreatorPersistenceForTesting(runtime.testSuffix)
        : createCreatorPersistence();
  runtimePersistenceRegistry.register(runtime.key, persistence);
  return persistence;
}
