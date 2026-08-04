#pragma once

#include <windows.h>

#include <cstddef>
#include <cstdint>

// CodexForge uses only this closed Node-API surface. Symbols are resolved from
// the hosting node.exe so the addon needs neither private V8 APIs nor a Node
// import library. These declarations follow Node-API's ABI-stable C contract.
struct napi_env__;
struct napi_value__;
struct napi_ref__;
struct napi_callback_info__;

using napi_env = napi_env__*;
using napi_value = napi_value__*;
using napi_ref = napi_ref__*;
using napi_callback_info = napi_callback_info__*;

enum napi_status {
  napi_ok = 0,
  napi_invalid_arg,
  napi_object_expected,
  napi_string_expected,
  napi_name_expected,
  napi_function_expected,
  napi_number_expected,
  napi_boolean_expected,
  napi_array_expected,
  napi_generic_failure,
  napi_pending_exception,
  napi_cancelled,
  napi_escape_called_twice,
  napi_handle_scope_mismatch,
  napi_callback_scope_mismatch,
  napi_queue_full,
  napi_closing,
  napi_bigint_expected,
  napi_date_expected,
  napi_arraybuffer_expected,
  napi_detachable_arraybuffer_expected,
  napi_would_deadlock,
};

enum napi_valuetype {
  napi_undefined = 0,
  napi_null,
  napi_boolean,
  napi_number,
  napi_string,
  napi_symbol,
  napi_object,
  napi_function,
  napi_external,
  napi_bigint,
};

enum napi_property_attributes {
  napi_default = 0,
  napi_writable = 1 << 0,
  napi_enumerable = 1 << 1,
  napi_configurable = 1 << 2,
  napi_static = 1 << 10,
};

using napi_callback = napi_value (*)(napi_env env, napi_callback_info info);
using napi_finalize = void (*)(napi_env env, void* finalize_data, void* finalize_hint);

struct napi_property_descriptor {
  const char* utf8name;
  napi_value name;
  napi_callback method;
  napi_callback getter;
  napi_callback setter;
  napi_value value;
  napi_property_attributes attributes;
  void* data;
};

struct napi_extended_error_info {
  const char* error_message;
  void* engine_reserved;
  uint32_t engine_error_code;
  napi_status error_code;
};

#define NAPI_AUTO_LENGTH static_cast<size_t>(-1)

#define CODEXFORGE_NAPI_FUNCTIONS(X) \
  X(napi_get_last_error_info, napi_status, (napi_env, const napi_extended_error_info**)) \
  X(napi_typeof, napi_status, (napi_env, napi_value, napi_valuetype*)) \
  X(napi_get_value_string_utf8, napi_status, (napi_env, napi_value, char*, size_t, size_t*)) \
  X(napi_is_array, napi_status, (napi_env, napi_value, bool*)) \
  X(napi_get_array_length, napi_status, (napi_env, napi_value, uint32_t*)) \
  X(napi_get_element, napi_status, (napi_env, napi_value, uint32_t, napi_value*)) \
  X(napi_create_string_utf8, napi_status, (napi_env, const char*, size_t, napi_value*)) \
  X(napi_create_error, napi_status, (napi_env, napi_value, napi_value, napi_value*)) \
  X(napi_set_named_property, napi_status, (napi_env, napi_value, const char*, napi_value)) \
  X(napi_throw, napi_status, (napi_env, napi_value)) \
  X(napi_get_cb_info, napi_status, (napi_env, napi_callback_info, size_t*, napi_value*, napi_value*, void**)) \
  X(napi_unwrap, napi_status, (napi_env, napi_value, void**)) \
  X(napi_wrap, napi_status, (napi_env, napi_value, void*, napi_finalize, void*, napi_ref*)) \
  X(napi_get_undefined, napi_status, (napi_env, napi_value*)) \
  X(napi_create_array_with_length, napi_status, (napi_env, size_t, napi_value*)) \
  X(napi_set_element, napi_status, (napi_env, napi_value, uint32_t, napi_value)) \
  X(napi_get_value_int64, napi_status, (napi_env, napi_value, int64_t*)) \
  X(napi_create_buffer_copy, napi_status, (napi_env, size_t, const void*, void**, napi_value*)) \
  X(napi_is_buffer, napi_status, (napi_env, napi_value, bool*)) \
  X(napi_get_buffer_info, napi_status, (napi_env, napi_value, void**, size_t*)) \
  X(napi_define_class, napi_status, (napi_env, const char*, size_t, napi_callback, void*, size_t, const napi_property_descriptor*, napi_value*)) \
  X(napi_create_reference, napi_status, (napi_env, napi_value, uint32_t, napi_ref*)) \
  X(napi_get_boolean, napi_status, (napi_env, bool, napi_value*)) \
  X(napi_define_properties, napi_status, (napi_env, napi_value, size_t, const napi_property_descriptor*))

#define CODEXFORGE_DECLARE_NAPI(name, result, arguments) \
  using name##_function = result (*) arguments; \
  inline name##_function codexforge_##name = nullptr;
CODEXFORGE_NAPI_FUNCTIONS(CODEXFORGE_DECLARE_NAPI)
#undef CODEXFORGE_DECLARE_NAPI

inline bool ResolveCodexForgeNodeApi() {
  HMODULE host = GetModuleHandleW(nullptr);
  if (host == nullptr) return false;
#define CODEXFORGE_LOAD_NAPI(name, result, arguments) \
  codexforge_##name = reinterpret_cast<name##_function>(GetProcAddress(host, #name)); \
  if (codexforge_##name == nullptr) return false;
  CODEXFORGE_NAPI_FUNCTIONS(CODEXFORGE_LOAD_NAPI)
#undef CODEXFORGE_LOAD_NAPI
  return true;
}

#define napi_get_last_error_info codexforge_napi_get_last_error_info
#define napi_typeof codexforge_napi_typeof
#define napi_get_value_string_utf8 codexforge_napi_get_value_string_utf8
#define napi_is_array codexforge_napi_is_array
#define napi_get_array_length codexforge_napi_get_array_length
#define napi_get_element codexforge_napi_get_element
#define napi_create_string_utf8 codexforge_napi_create_string_utf8
#define napi_create_error codexforge_napi_create_error
#define napi_set_named_property codexforge_napi_set_named_property
#define napi_throw codexforge_napi_throw
#define napi_get_cb_info codexforge_napi_get_cb_info
#define napi_unwrap codexforge_napi_unwrap
#define napi_wrap codexforge_napi_wrap
#define napi_get_undefined codexforge_napi_get_undefined
#define napi_create_array_with_length codexforge_napi_create_array_with_length
#define napi_set_element codexforge_napi_set_element
#define napi_get_value_int64 codexforge_napi_get_value_int64
#define napi_create_buffer_copy codexforge_napi_create_buffer_copy
#define napi_is_buffer codexforge_napi_is_buffer
#define napi_get_buffer_info codexforge_napi_get_buffer_info
#define napi_define_class codexforge_napi_define_class
#define napi_create_reference codexforge_napi_create_reference
#define napi_get_boolean codexforge_napi_get_boolean
#define napi_define_properties codexforge_napi_define_properties
