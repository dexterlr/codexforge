#ifdef _WIN32

#include <windows.h>
#include <winioctl.h>
#include <winternl.h>

#include "codexforge_node_api_minimal.h"

#include <algorithm>
#include <cstdint>
#include <cstring>
#include <cwchar>
#include <exception>
#include <memory>
#include <stdexcept>
#include <string>
#include <utility>
#include <vector>

#ifndef OBJ_DONT_REPARSE
#define OBJ_DONT_REPARSE 0x00001000L
#endif
#ifndef FILE_OPEN
#define FILE_OPEN 0x00000001UL
#endif
#ifndef FILE_CREATE
#define FILE_CREATE 0x00000002UL
#endif
#ifndef FILE_OPEN_IF
#define FILE_OPEN_IF 0x00000003UL
#endif
#ifndef FILE_DIRECTORY_FILE
#define FILE_DIRECTORY_FILE 0x00000001UL
#endif
#ifndef FILE_SYNCHRONOUS_IO_NONALERT
#define FILE_SYNCHRONOUS_IO_NONALERT 0x00000020UL
#endif
#ifndef FILE_NON_DIRECTORY_FILE
#define FILE_NON_DIRECTORY_FILE 0x00000040UL
#endif
#ifndef FILE_OPEN_FOR_BACKUP_INTENT
#define FILE_OPEN_FOR_BACKUP_INTENT 0x00004000UL
#endif
#ifndef FILE_DELETE_ON_CLOSE
#define FILE_DELETE_ON_CLOSE 0x00001000UL
#endif
#ifndef FILE_OPEN_REQUIRING_OPLOCK
#define FILE_OPEN_REQUIRING_OPLOCK 0x00010000UL
#endif
#ifndef FILE_OPEN_REPARSE_POINT
#define FILE_OPEN_REPARSE_POINT 0x00200000UL
#endif
#ifndef ERROR_TRANSACTIONAL_CONFLICT
#define ERROR_TRANSACTIONAL_CONFLICT 6800L
#endif

namespace {

constexpr NTSTATUS kStatusObjectNameNotFound = static_cast<NTSTATUS>(0xC0000034L);
constexpr NTSTATUS kStatusObjectNameCollision = static_cast<NTSTATUS>(0xC0000035L);
constexpr NTSTATUS kStatusObjectPathNotFound = static_cast<NTSTATUS>(0xC000003AL);
constexpr NTSTATUS kStatusIoReparseTagNotHandled = static_cast<NTSTATUS>(0xC0000279L);
constexpr NTSTATUS kStatusStoppedOnSymlink = static_cast<NTSTATUS>(0x8000002DL);
constexpr NTSTATUS kStatusReparsePointEncountered = static_cast<NTSTATUS>(0xC000050BL);
constexpr size_t kMaximumSegments = 64;
constexpr size_t kMaximumSegmentCharacters = 128;
constexpr size_t kMaximumRootCharacters = 32767;
constexpr uint64_t kMaximumTransferBytes = 1024ULL * 1024ULL;
constexpr size_t kMaximumDirectoryEntries = 4096;
constexpr size_t kMaximumCleanupNodes = 8192;
constexpr size_t kMaximumCleanupDepth = 64;
constexpr size_t kMaximumTreeEntries = 15;
constexpr size_t kMaximumTreeEntryBytes = kMaximumTransferBytes;
constexpr size_t kMaximumTreeAggregateBytes = kMaximumTransferBytes;
constexpr size_t kMaximumTreeRelativeCharacters = 126;
constexpr size_t kMaximumTreeSegmentCharacters = 48;
constexpr size_t kMaximumTreeRelativeSegments = 5;

using NtCreateFilePointer = NTSTATUS(NTAPI*)(
    PHANDLE,
    ACCESS_MASK,
    POBJECT_ATTRIBUTES,
    PIO_STATUS_BLOCK,
    PLARGE_INTEGER,
    ULONG,
    ULONG,
    ULONG,
    ULONG,
    PVOID,
    ULONG);
using NtSetInformationFilePointer = NTSTATUS(NTAPI*)(
    HANDLE,
    PIO_STATUS_BLOCK,
    PVOID,
    ULONG,
    FILE_INFORMATION_CLASS);
using RtlSetCurrentTransactionPointer = BOOLEAN(NTAPI*)(HANDLE);
using CreateTransactionPointer = HANDLE(WINAPI*)(
    LPSECURITY_ATTRIBUTES,
    LPGUID,
    DWORD,
    DWORD,
    DWORD,
    DWORD,
    LPWSTR);
using CommitTransactionPointer = BOOL(WINAPI*)(HANDLE);
using RollbackTransactionPointer = BOOL(WINAPI*)(HANDLE);

struct CodexForgeFileLinkInformation {
  BOOLEAN replace_if_exists;
  HANDLE root_directory;
  ULONG file_name_length;
  WCHAR file_name[1];
};

constexpr FILE_INFORMATION_CLASS kFileLinkInformation =
    static_cast<FILE_INFORMATION_CLASS>(11);
constexpr FILE_INFORMATION_CLASS kFileRenameInformation =
    static_cast<FILE_INFORMATION_CLASS>(10);

enum class RootLifecycle {
  persistent,
  removable,
  existing,
};

struct NativeTreeEntry {
  std::vector<std::wstring> segments;
  const unsigned char* data = nullptr;
  size_t length = 0;
};

class NativeFilesystemError final : public std::runtime_error {
 public:
  NativeFilesystemError(std::string code, std::string message)
      : std::runtime_error(std::move(message)), code_(std::move(code)) {}

  const std::string& code() const noexcept { return code_; }

 private:
  std::string code_;
};

class UniqueHandle final {
 public:
  UniqueHandle() noexcept = default;
  explicit UniqueHandle(HANDLE handle) noexcept : handle_(handle) {}
  ~UniqueHandle() { reset(); }

  UniqueHandle(const UniqueHandle&) = delete;
  UniqueHandle& operator=(const UniqueHandle&) = delete;

  UniqueHandle(UniqueHandle&& other) noexcept : handle_(other.release()) {}
  UniqueHandle& operator=(UniqueHandle&& other) noexcept {
    if (this != &other) reset(other.release());
    return *this;
  }

  HANDLE get() const noexcept { return handle_; }
  bool valid() const noexcept { return handle_ != nullptr && handle_ != INVALID_HANDLE_VALUE; }
  HANDLE release() noexcept {
    HANDLE result = handle_;
    handle_ = INVALID_HANDLE_VALUE;
    return result;
  }
  void reset(HANDLE next = INVALID_HANDLE_VALUE) noexcept {
    if (valid()) CloseHandle(handle_);
    handle_ = next;
  }

 private:
  HANDLE handle_ = INVALID_HANDLE_VALUE;
};

struct FileIdentity {
  DWORD volume = 0;
  DWORD index_high = 0;
  DWORD index_low = 0;
  uint64_t size = 0;
  DWORD links = 0;
  bool directory = false;
};

FileIdentity QueryIdentity(HANDLE handle, const char* operation);

NtCreateFilePointer ResolveNtCreateFile() {
  static NtCreateFilePointer pointer = []() {
    HMODULE module = GetModuleHandleW(L"ntdll.dll");
    if (module == nullptr) return static_cast<NtCreateFilePointer>(nullptr);
    return reinterpret_cast<NtCreateFilePointer>(GetProcAddress(module, "NtCreateFile"));
  }();
  if (pointer == nullptr) {
    throw NativeFilesystemError("helper_unavailable", "NtCreateFile is unavailable on this Windows runtime.");
  }
  return pointer;
}

NtSetInformationFilePointer ResolveNtSetInformationFile() {
  static NtSetInformationFilePointer pointer = []() {
    HMODULE module = GetModuleHandleW(L"ntdll.dll");
    if (module == nullptr) return static_cast<NtSetInformationFilePointer>(nullptr);
    return reinterpret_cast<NtSetInformationFilePointer>(GetProcAddress(module, "NtSetInformationFile"));
  }();
  if (pointer == nullptr) {
    throw NativeFilesystemError(
        "helper_unavailable", "NtSetInformationFile is unavailable on this Windows runtime.");
  }
  return pointer;
}

[[noreturn]] void ThrowWindowsError(const char* operation, DWORD error);

template <typename Pointer>
Pointer ResolveRequiredProcedure(const wchar_t* module_name, const char* procedure_name) {
  HMODULE module = GetModuleHandleW(module_name);
  if (module == nullptr) module = LoadLibraryW(module_name);
  if (module == nullptr) {
    throw NativeFilesystemError("helper_unavailable", "A required Windows security module is unavailable.");
  }
  auto pointer = reinterpret_cast<Pointer>(GetProcAddress(module, procedure_name));
  if (pointer == nullptr) {
    throw NativeFilesystemError("helper_unavailable", "A required Windows security procedure is unavailable.");
  }
  return pointer;
}

std::wstring BuildTransactionSerializerName(
    HANDLE parent,
    const std::wstring& target_name) {
  FileIdentity parent_identity = QueryIdentity(
      parent, "Inspect filesystem transaction serialization parent");
  uint64_t hash = 1469598103934665603ULL;
  auto mix_byte = [&hash](unsigned char value) {
    hash ^= static_cast<uint64_t>(value);
    hash *= 1099511628211ULL;
  };
  auto mix_dword = [&mix_byte](DWORD value) {
    for (unsigned int shift = 0; shift < 32; shift += 8) {
      mix_byte(static_cast<unsigned char>((value >> shift) & 0xffU));
    }
  };
  mix_dword(parent_identity.volume);
  mix_dword(parent_identity.index_high);
  mix_dword(parent_identity.index_low);
  for (wchar_t character : target_name) {
    uint32_t folded = static_cast<uint32_t>(
        character >= L'A' && character <= L'Z'
            ? character + (L'a' - L'A')
            : character);
    for (unsigned int shift = 0; shift < 32; shift += 8) {
      mix_byte(static_cast<unsigned char>((folded >> shift) & 0xffU));
    }
  }
  wchar_t suffix[17]{};
  if (std::swprintf(suffix, 17, L"%016llx", static_cast<unsigned long long>(hash)) != 16) {
    throw NativeFilesystemError(
        "native_failure", "Filesystem transaction serialization identity could not be encoded.");
  }
  return std::wstring(L"Global\\CodexForge.CreatorFilesystem.Transaction.") + suffix;
}

class CrossProcessTransactionSerializer final {
 public:
  explicit CrossProcessTransactionSerializer(const std::wstring& name) {
    mutex_.reset(CreateMutexW(
        nullptr,
        FALSE,
        name.c_str()));
    if (!mutex_.valid()) {
      throw NativeFilesystemError(
          "helper_unavailable",
          "Windows cross-process filesystem transaction serialization is unavailable.");
    }
    DWORD wait_result = WaitForSingleObject(mutex_.get(), 30'000);
    if (wait_result == WAIT_OBJECT_0 || wait_result == WAIT_ABANDONED) {
      acquired_ = true;
      return;
    }
    if (wait_result == WAIT_TIMEOUT) {
      throw NativeFilesystemError(
          "busy",
          "Windows cross-process filesystem transaction serialization is busy.");
    }
    ThrowWindowsError(
        "Acquire cross-process filesystem transaction serialization",
        GetLastError());
  }

  CrossProcessTransactionSerializer(const CrossProcessTransactionSerializer&) = delete;
  CrossProcessTransactionSerializer& operator=(const CrossProcessTransactionSerializer&) = delete;

  ~CrossProcessTransactionSerializer() {
    if (acquired_ && !ReleaseMutex(mutex_.get())) std::terminate();
  }

  void Release() {
    if (!acquired_) return;
    if (!ReleaseMutex(mutex_.get())) {
      throw NativeFilesystemError(
          "native_failure",
          "Windows cross-process filesystem transaction serialization could not be released.");
    }
    acquired_ = false;
  }

 private:
  UniqueHandle mutex_;
  bool acquired_ = false;
};

class FilesystemTransaction final {
 public:
  FilesystemTransaction()
      : set_current_(ResolveRequiredProcedure<RtlSetCurrentTransactionPointer>(
            L"ntdll.dll", "RtlSetCurrentTransaction")),
        commit_(ResolveRequiredProcedure<CommitTransactionPointer>(
            L"KtmW32.dll", "CommitTransaction")),
        rollback_(ResolveRequiredProcedure<RollbackTransactionPointer>(
            L"KtmW32.dll", "RollbackTransaction")) {
    auto create = ResolveRequiredProcedure<CreateTransactionPointer>(
        L"KtmW32.dll", "CreateTransaction");
    transaction_.reset(create(
        nullptr,
        nullptr,
        0,
        0,
        0,
        30'000,
        const_cast<LPWSTR>(L"CodexForge creator atomic publication")));
    if (!transaction_.valid()) {
      throw NativeFilesystemError(
          "helper_unavailable",
          "Windows filesystem transaction support is unavailable; creator mutation is disabled.");
    }
    if (!set_current_(transaction_.get())) {
      throw NativeFilesystemError("helper_unavailable", "Windows refused the creator filesystem transaction context.");
    }
    current_ = true;
  }

  FilesystemTransaction(const FilesystemTransaction&) = delete;
  FilesystemTransaction& operator=(const FilesystemTransaction&) = delete;

  ~FilesystemTransaction() {
    if (current_) set_current_(nullptr);
    if (!committed_ && transaction_.valid()) rollback_(transaction_.get());
  }

  void Commit() {
    if (!current_ || committed_) {
      throw NativeFilesystemError("native_failure", "Creator filesystem transaction state is invalid.");
    }
    if (!set_current_(nullptr)) {
      throw NativeFilesystemError("native_failure", "Windows refused to detach the creator filesystem transaction.");
    }
    current_ = false;
    if (!commit_(transaction_.get())) {
      ThrowWindowsError("Commit creator filesystem transaction", GetLastError());
    }
    committed_ = true;
  }

 private:
  UniqueHandle transaction_;
  RtlSetCurrentTransactionPointer set_current_;
  CommitTransactionPointer commit_;
  RollbackTransactionPointer rollback_;
  bool current_ = false;
  bool committed_ = false;
};

[[noreturn]] void ThrowWindowsError(const char* operation, DWORD error) {
  if (error == ERROR_FILE_NOT_FOUND || error == ERROR_PATH_NOT_FOUND) {
    throw NativeFilesystemError("not_found", std::string(operation) + " did not find the requested node.");
  }
  if (error == ERROR_FILE_EXISTS || error == ERROR_ALREADY_EXISTS) {
    throw NativeFilesystemError("already_exists", std::string(operation) + " found an existing target.");
  }
  if (error == ERROR_TRANSACTIONAL_CONFLICT) {
    throw NativeFilesystemError(
        "conflict", std::string(operation) + " encountered a concurrent filesystem transaction.");
  }
  if (error == ERROR_SHARING_VIOLATION || error == ERROR_LOCK_VIOLATION || error == ERROR_BUSY) {
    throw NativeFilesystemError("busy", std::string(operation) + " encountered an independently held filesystem node.");
  }
  if (error == ERROR_ACCESS_DENIED || error == ERROR_PRIVILEGE_NOT_HELD) {
    throw NativeFilesystemError("access_denied", std::string(operation) + " was denied by the filesystem.");
  }
  if (
      error == ERROR_NOT_SUPPORTED ||
      error == ERROR_CALL_NOT_IMPLEMENTED ||
      error == ERROR_TRANSACTIONS_UNSUPPORTED_REMOTE ||
      error == ERROR_TRANSACTIONAL_OPEN_NOT_ALLOWED ||
      error == ERROR_RM_NOT_ACTIVE ||
      error == ERROR_TRANSACTION_NOT_ACTIVE) {
    throw NativeFilesystemError(
        "helper_unavailable",
        "Required Windows filesystem transaction support is unavailable; creator mutation is disabled.");
  }
  throw NativeFilesystemError(
      "native_failure",
      std::string(operation) + " failed with Windows error " + std::to_string(error) + ".");
}

[[noreturn]] void ThrowNtStatus(const char* operation, NTSTATUS status) {
  if (status == kStatusObjectNameNotFound || status == kStatusObjectPathNotFound) {
    throw NativeFilesystemError("not_found", std::string(operation) + " did not find the requested node.");
  }
  if (status == kStatusObjectNameCollision) {
    throw NativeFilesystemError("already_exists", std::string(operation) + " found an existing target.");
  }
  if (
    status == kStatusIoReparseTagNotHandled ||
    status == kStatusStoppedOnSymlink ||
    status == kStatusReparsePointEncountered
  ) {
    throw NativeFilesystemError("unsafe_reparse", std::string(operation) + " rejected a reparse point.");
  }
  using RtlNtStatusToDosErrorPointer = ULONG(WINAPI*)(NTSTATUS);
  HMODULE module = GetModuleHandleW(L"ntdll.dll");
  auto converter = module == nullptr
      ? nullptr
      : reinterpret_cast<RtlNtStatusToDosErrorPointer>(GetProcAddress(module, "RtlNtStatusToDosError"));
  if (converter != nullptr) ThrowWindowsError(operation, converter(status));
  throw NativeFilesystemError("native_failure", std::string(operation) + " failed closed at the NT object boundary.");
}

void CheckNapi(napi_env env, napi_status status, const char* operation) {
  if (status == napi_ok) return;
  const napi_extended_error_info* info = nullptr;
  napi_get_last_error_info(env, &info);
  std::string message = operation;
  message += " failed at the Node-API boundary";
  if (info != nullptr && info->error_message != nullptr) {
    message += ": ";
    message += info->error_message;
  }
  throw NativeFilesystemError("native_failure", message + ".");
}

std::wstring Utf8ToWide(const std::string& value) {
  if (value.empty()) return {};
  int required = MultiByteToWideChar(
      CP_UTF8, MB_ERR_INVALID_CHARS, value.data(), static_cast<int>(value.size()), nullptr, 0);
  if (required <= 0) {
    throw NativeFilesystemError("invalid_path", "Filesystem text is not valid UTF-8.");
  }
  std::wstring result(static_cast<size_t>(required), L'\0');
  if (MultiByteToWideChar(
          CP_UTF8,
          MB_ERR_INVALID_CHARS,
          value.data(),
          static_cast<int>(value.size()),
          result.data(),
          required) != required) {
    throw NativeFilesystemError("invalid_path", "Filesystem text could not be converted to UTF-16.");
  }
  return result;
}

std::string WideToUtf8(const wchar_t* value, size_t length) {
  if (length == 0) return {};
  int required = WideCharToMultiByte(
      CP_UTF8,
      WC_ERR_INVALID_CHARS,
      value,
      static_cast<int>(length),
      nullptr,
      0,
      nullptr,
      nullptr);
  if (required <= 0) {
    throw NativeFilesystemError("invalid_path", "Filesystem name is not valid UTF-16.");
  }
  std::string result(static_cast<size_t>(required), '\0');
  if (WideCharToMultiByte(
          CP_UTF8,
          WC_ERR_INVALID_CHARS,
          value,
          static_cast<int>(length),
          result.data(),
          required,
          nullptr,
          nullptr) != required) {
    throw NativeFilesystemError("invalid_path", "Filesystem name could not be converted to UTF-8.");
  }
  return result;
}

std::string GetString(napi_env env, napi_value value, const char* label) {
  napi_valuetype type = napi_undefined;
  CheckNapi(env, napi_typeof(env, value, &type), "Inspect string argument");
  if (type != napi_string) {
    throw NativeFilesystemError("invalid_path", std::string(label) + " must be a string.");
  }
  size_t length = 0;
  CheckNapi(env, napi_get_value_string_utf8(env, value, nullptr, 0, &length), "Measure string argument");
  if (length > kMaximumRootCharacters * 4ULL) {
    throw NativeFilesystemError("invalid_path", std::string(label) + " is too long.");
  }
  std::vector<char> buffer(length + 1, '\0');
  size_t written = 0;
  CheckNapi(
      env,
      napi_get_value_string_utf8(env, value, buffer.data(), buffer.size(), &written),
      "Read string argument");
  return std::string(buffer.data(), written);
}

bool IsAllowedSegmentCharacter(wchar_t value) {
  return (value >= L'A' && value <= L'Z') || (value >= L'a' && value <= L'z') ||
         (value >= L'0' && value <= L'9') || value == L'.' || value == L'_' || value == L'-';
}

void ValidateSegment(const std::wstring& segment) {
  if (segment.empty() || segment.size() > kMaximumSegmentCharacters || segment == L"." || segment == L".." ||
      segment.back() == L'.' || segment.back() == L' ') {
    throw NativeFilesystemError("invalid_path", "Filesystem segment is unsafe.");
  }
  for (wchar_t value : segment) {
    if (!IsAllowedSegmentCharacter(value)) {
      throw NativeFilesystemError("invalid_path", "Filesystem segment contains a forbidden character.");
    }
  }
}

std::wstring FoldAsciiSegment(const std::wstring& segment) {
  std::wstring folded;
  folded.reserve(segment.size());
  for (wchar_t value : segment) {
    folded.push_back(
        value >= L'A' && value <= L'Z'
            ? static_cast<wchar_t>(value - L'A' + L'a')
            : value);
  }
  return folded;
}

bool IsWindowsDeviceStem(const std::wstring& folded_segment) {
  const size_t dot = folded_segment.find(L'.');
  const std::wstring stem = folded_segment.substr(0, dot);
  if (stem == L"con" || stem == L"prn" || stem == L"aux" || stem == L"nul") {
    return true;
  }
  if (stem.size() == 4 && stem[3] >= L'1' && stem[3] <= L'9') {
    return stem.substr(0, 3) == L"com" || stem.substr(0, 3) == L"lpt";
  }
  return false;
}

void ValidateTreeRelativeSegments(const std::vector<std::wstring>& segments) {
  if (segments.empty() || segments.size() > kMaximumTreeRelativeSegments) {
    throw NativeFilesystemError("invalid_path", "Tree entry depth is outside its bounded envelope.");
  }
  size_t relative_characters = segments.size() - 1;
  for (const std::wstring& segment : segments) {
    ValidateSegment(segment);
    if (segment.size() > kMaximumTreeSegmentCharacters ||
        !((segment[0] >= L'A' && segment[0] <= L'Z') ||
          (segment[0] >= L'a' && segment[0] <= L'z') ||
          (segment[0] >= L'0' && segment[0] <= L'9'))) {
      throw NativeFilesystemError("invalid_path", "Tree entry contains an unsafe creator path segment.");
    }
    const std::wstring folded = FoldAsciiSegment(segment);
    if (folded == L"node_modules" || IsWindowsDeviceStem(folded)) {
      throw NativeFilesystemError("invalid_path", "Tree entry contains a forbidden creator path segment.");
    }
    relative_characters += segment.size();
  }
  if (relative_characters > kMaximumTreeRelativeCharacters) {
    throw NativeFilesystemError("invalid_path", "Tree entry path exceeds its bounded character limit.");
  }
}

bool IsCaseInsensitivePrefix(
    const std::vector<std::wstring>& possible_prefix,
    const std::vector<std::wstring>& possible_descendant) {
  if (possible_prefix.size() > possible_descendant.size()) return false;
  for (size_t index = 0; index < possible_prefix.size(); ++index) {
    if (FoldAsciiSegment(possible_prefix[index]) !=
        FoldAsciiSegment(possible_descendant[index])) {
      return false;
    }
  }
  return true;
}

void ValidateTreeEntries(const std::vector<NativeTreeEntry>& entries) {
  if (entries.empty() || entries.size() > kMaximumTreeEntries) {
    throw NativeFilesystemError("too_many_nodes", "Tree publication requires one to fifteen entries.");
  }
  size_t aggregate_bytes = 0;
  for (size_t index = 0; index < entries.size(); ++index) {
    const NativeTreeEntry& entry = entries[index];
    ValidateTreeRelativeSegments(entry.segments);
    if (entry.length > kMaximumTreeEntryBytes ||
        (entry.length > 0 && entry.data == nullptr)) {
      throw NativeFilesystemError("too_large", "Tree file exceeds its bounded byte limit.");
    }
    aggregate_bytes += entry.length;
    if (aggregate_bytes > kMaximumTreeAggregateBytes) {
      throw NativeFilesystemError("too_large", "Tree publication exceeds its aggregate byte limit.");
    }
    for (size_t prior_index = 0; prior_index < index; ++prior_index) {
      const auto& prior = entries[prior_index].segments;
      if (IsCaseInsensitivePrefix(prior, entry.segments) ||
          IsCaseInsensitivePrefix(entry.segments, prior)) {
        throw NativeFilesystemError(
            "path_collision",
            "Tree publication contains a duplicate, case collision, or file-ancestor conflict.");
      }
    }
  }
  if (aggregate_bytes == 0) {
    throw NativeFilesystemError("too_large", "Tree publication aggregate bytes must be nonzero.");
  }
}

std::vector<std::wstring> GetSegments(napi_env env, napi_value value, const char* label) {
  bool is_array = false;
  CheckNapi(env, napi_is_array(env, value, &is_array), "Inspect segment array");
  if (!is_array) {
    throw NativeFilesystemError("invalid_path", std::string(label) + " must be an array.");
  }
  uint32_t length = 0;
  CheckNapi(env, napi_get_array_length(env, value, &length), "Measure segment array");
  if (length > kMaximumSegments) {
    throw NativeFilesystemError("invalid_path", std::string(label) + " has too many components.");
  }
  std::vector<std::wstring> result;
  result.reserve(length);
  for (uint32_t index = 0; index < length; ++index) {
    napi_value item;
    CheckNapi(env, napi_get_element(env, value, index, &item), "Read segment array");
    std::wstring segment = Utf8ToWide(GetString(env, item, label));
    ValidateSegment(segment);
    result.push_back(std::move(segment));
  }
  return result;
}

FileIdentity QueryIdentity(HANDLE handle, const char* operation) {
  FILE_ATTRIBUTE_TAG_INFO tag_info{};
  if (!GetFileInformationByHandleEx(handle, FileAttributeTagInfo, &tag_info, sizeof(tag_info))) {
    ThrowWindowsError(operation, GetLastError());
  }
  if ((tag_info.FileAttributes & FILE_ATTRIBUTE_REPARSE_POINT) != 0) {
    throw NativeFilesystemError("unsafe_reparse", std::string(operation) + " rejected a reparse point.");
  }
  BY_HANDLE_FILE_INFORMATION information{};
  if (!GetFileInformationByHandle(handle, &information)) {
    ThrowWindowsError(operation, GetLastError());
  }
  FileIdentity result;
  result.volume = information.dwVolumeSerialNumber;
  result.index_high = information.nFileIndexHigh;
  result.index_low = information.nFileIndexLow;
  result.size = (static_cast<uint64_t>(information.nFileSizeHigh) << 32U) |
                static_cast<uint64_t>(information.nFileSizeLow);
  result.links = information.nNumberOfLinks;
  result.directory = (information.dwFileAttributes & FILE_ATTRIBUTE_DIRECTORY) != 0;
  return result;
}

bool SameIdentity(const FileIdentity& left, const FileIdentity& right) {
  return left.volume == right.volume && left.index_high == right.index_high &&
         left.index_low == right.index_low;
}

void ValidateTrustedRootSegment(const std::wstring& segment) {
  if (segment.empty() || segment == L"." || segment == L".." ||
      segment.back() == L'.' || segment.back() == L' ') {
    throw NativeFilesystemError("invalid_path", "Trusted project root has an unsafe component.");
  }
  for (wchar_t value : segment) {
    if (value < 0x20 || value == L'<' || value == L'>' || value == L':' || value == L'"' ||
        value == L'/' || value == L'\\' || value == L'|' || value == L'?' || value == L'*') {
      throw NativeFilesystemError("invalid_path", "Trusted project root has an unsafe component.");
    }
  }
}

UniqueHandle OpenTrustedRootComponent(HANDLE parent, const std::wstring& name) {
  ValidateTrustedRootSegment(name);
  UNICODE_STRING unicode_name{};
  unicode_name.Buffer = const_cast<PWSTR>(name.data());
  unicode_name.Length = static_cast<USHORT>(name.size() * sizeof(wchar_t));
  unicode_name.MaximumLength = unicode_name.Length;
  OBJECT_ATTRIBUTES attributes{};
  InitializeObjectAttributes(
      &attributes,
      &unicode_name,
      OBJ_CASE_INSENSITIVE | OBJ_DONT_REPARSE,
      parent,
      nullptr);
  IO_STATUS_BLOCK io_status{};
  HANDLE handle = INVALID_HANDLE_VALUE;
  NTSTATUS status = ResolveNtCreateFile()(
      &handle,
      FILE_LIST_DIRECTORY | FILE_TRAVERSE | FILE_READ_ATTRIBUTES | SYNCHRONIZE,
      &attributes,
      &io_status,
      nullptr,
      FILE_ATTRIBUTE_DIRECTORY,
      FILE_SHARE_READ | FILE_SHARE_WRITE,
      FILE_OPEN,
      FILE_DIRECTORY_FILE | FILE_SYNCHRONOUS_IO_NONALERT | FILE_OPEN_REPARSE_POINT |
          FILE_OPEN_FOR_BACKUP_INTENT,
      nullptr,
      0);
  if (status < 0) ThrowNtStatus("Open trusted project root component", status);
  UniqueHandle result(handle);
  FileIdentity identity = QueryIdentity(result.get(), "Open trusted project root component");
  if (!identity.directory) {
    throw NativeFilesystemError("unsafe_node", "Trusted project root component is not a directory.");
  }
  return result;
}

UniqueHandle OpenAbsoluteDirectory(const std::wstring& absolute_path) {
  if (absolute_path.size() < 4 || absolute_path.size() > kMaximumRootCharacters ||
      !((absolute_path[0] >= L'A' && absolute_path[0] <= L'Z') ||
        (absolute_path[0] >= L'a' && absolute_path[0] <= L'z')) ||
      absolute_path[1] != L':' ||
      (absolute_path[2] != L'\\' && absolute_path[2] != L'/')) {
    throw NativeFilesystemError("invalid_path", "Trusted project root path is invalid.");
  }
  const wchar_t drive_letter =
      absolute_path[0] >= L'a' && absolute_path[0] <= L'z'
          ? absolute_path[0] - (L'a' - L'A')
          : absolute_path[0];
  std::wstring drive_root{drive_letter, L':', L'\\'};
  HANDLE handle = CreateFileW(
      drive_root.c_str(),
      FILE_LIST_DIRECTORY | FILE_TRAVERSE | FILE_READ_ATTRIBUTES | SYNCHRONIZE,
      FILE_SHARE_READ | FILE_SHARE_WRITE,
      nullptr,
      OPEN_EXISTING,
      FILE_FLAG_BACKUP_SEMANTICS | FILE_FLAG_OPEN_REPARSE_POINT,
      nullptr);
  if (handle == INVALID_HANDLE_VALUE) ThrowWindowsError("Open trusted volume root", GetLastError());
  std::vector<UniqueHandle> chain;
  chain.emplace_back(handle);
  FileIdentity identity = QueryIdentity(chain.back().get(), "Open trusted volume root");
  if (!identity.directory) {
    throw NativeFilesystemError("unsafe_node", "Trusted volume root is not a directory.");
  }
  size_t start = 3;
  while (start < absolute_path.size()) {
    size_t end = absolute_path.find_first_of(L"\\/", start);
    if (end == std::wstring::npos) end = absolute_path.size();
    if (end == start) {
      throw NativeFilesystemError("invalid_path", "Trusted project root has an empty component.");
    }
    chain.push_back(OpenTrustedRootComponent(
        chain.back().get(), absolute_path.substr(start, end - start)));
    start = end + 1;
  }
  return std::move(chain.back());
}

UniqueHandle OpenRelative(
    HANDLE parent,
    const std::wstring& name,
    ACCESS_MASK desired_access,
    ULONG disposition,
    ULONG type_options,
    const char* operation,
    ULONG share_access = FILE_SHARE_READ | FILE_SHARE_WRITE,
    ULONG additional_options = 0) {
  ValidateSegment(name);
  UNICODE_STRING unicode_name{};
  unicode_name.Buffer = const_cast<PWSTR>(name.data());
  unicode_name.Length = static_cast<USHORT>(name.size() * sizeof(wchar_t));
  unicode_name.MaximumLength = unicode_name.Length;
  OBJECT_ATTRIBUTES attributes{};
  InitializeObjectAttributes(
      &attributes,
      &unicode_name,
      OBJ_CASE_INSENSITIVE | OBJ_DONT_REPARSE,
      parent,
      nullptr);
  IO_STATUS_BLOCK io_status{};
  HANDLE handle = INVALID_HANDLE_VALUE;
  NTSTATUS status = ResolveNtCreateFile()(
      &handle,
      desired_access,
      &attributes,
      &io_status,
      nullptr,
      type_options == FILE_DIRECTORY_FILE ? FILE_ATTRIBUTE_DIRECTORY : FILE_ATTRIBUTE_NORMAL,
      share_access,
      disposition,
      type_options | FILE_SYNCHRONOUS_IO_NONALERT | FILE_OPEN_REPARSE_POINT |
          FILE_OPEN_FOR_BACKUP_INTENT | additional_options,
      nullptr,
      0);
  if (status < 0) ThrowNtStatus(operation, status);
  UniqueHandle result(handle);
  FileIdentity identity = QueryIdentity(result.get(), operation);
  if (type_options == FILE_DIRECTORY_FILE && !identity.directory) {
    throw NativeFilesystemError("unsafe_node", std::string(operation) + " expected a directory.");
  }
  if (type_options == FILE_NON_DIRECTORY_FILE && identity.directory) {
    throw NativeFilesystemError("unsafe_node", std::string(operation) + " expected a regular file.");
  }
  return result;
}

UniqueHandle OpenDirectoryRelative(
    HANDLE parent,
    const std::wstring& name,
    bool create,
    bool exclusive,
    const char* operation,
    ACCESS_MASK additional_access = 0,
    bool mutation_access = true) {
  ULONG disposition = exclusive ? FILE_CREATE : (create ? FILE_OPEN_IF : FILE_OPEN);
  return OpenRelative(
      parent,
      name,
      FILE_LIST_DIRECTORY | FILE_TRAVERSE | FILE_READ_ATTRIBUTES | SYNCHRONIZE |
          additional_access |
          (mutation_access ? FILE_ADD_FILE | FILE_ADD_SUBDIRECTORY : 0),
      disposition,
      FILE_DIRECTORY_FILE,
      operation);
}

UniqueHandle OpenFileRelative(
    HANDLE parent,
    const std::wstring& name,
    ACCESS_MASK desired_access,
    bool exclusive,
    const char* operation,
    ULONG share_access = FILE_SHARE_READ,
    ULONG additional_options = 0) {
  return OpenRelative(
      parent,
      name,
      desired_access | FILE_READ_ATTRIBUTES | SYNCHRONIZE,
      exclusive ? FILE_CREATE : FILE_OPEN,
      FILE_NON_DIRECTORY_FILE,
      operation,
      share_access,
      additional_options);
}

class ProtectedStagingFile final {
 public:
  explicit ProtectedStagingFile(UniqueHandle file)
      : file_(std::move(file)) {}

  ProtectedStagingFile(const ProtectedStagingFile&) = delete;
  ProtectedStagingFile& operator=(const ProtectedStagingFile&) = delete;

  ~ProtectedStagingFile() {
    file_.reset();
  }

  HANDLE get() const noexcept { return file_.get(); }

  void AssertUnbroken(const char* operation) const {
    (void)operation;
  }

  void WriteAt(uint64_t offset, const unsigned char* data, DWORD length, const char* operation) {
    AssertUnbroken(operation);
    OVERLAPPED overlapped{};
    UniqueHandle event(CreateEventW(nullptr, TRUE, FALSE, nullptr));
    if (!event.valid()) ThrowWindowsError(operation, GetLastError());
    overlapped.hEvent = event.get();
    overlapped.Offset = static_cast<DWORD>(offset & 0xffffffffULL);
    overlapped.OffsetHigh = static_cast<DWORD>(offset >> 32U);
    DWORD written = 0;
    BOOL completed = WriteFile(file_.get(), data, length, &written, &overlapped);
    if (!completed && GetLastError() == ERROR_IO_PENDING) {
      if (!GetOverlappedResult(file_.get(), &overlapped, &written, TRUE)) {
        ThrowWindowsError(operation, GetLastError());
      }
    } else if (!completed) {
      ThrowWindowsError(operation, GetLastError());
    }
    if (written != length) {
      throw NativeFilesystemError("native_failure", "Creator staging write made incomplete progress.");
    }
    AssertUnbroken(operation);
  }

  void ReadAt(uint64_t offset, unsigned char* data, DWORD length, const char* operation) {
    AssertUnbroken(operation);
    OVERLAPPED overlapped{};
    UniqueHandle event(CreateEventW(nullptr, TRUE, FALSE, nullptr));
    if (!event.valid()) ThrowWindowsError(operation, GetLastError());
    overlapped.hEvent = event.get();
    overlapped.Offset = static_cast<DWORD>(offset & 0xffffffffULL);
    overlapped.OffsetHigh = static_cast<DWORD>(offset >> 32U);
    DWORD bytes_read = 0;
    BOOL completed = ReadFile(file_.get(), data, length, &bytes_read, &overlapped);
    if (!completed && GetLastError() == ERROR_IO_PENDING) {
      if (!GetOverlappedResult(file_.get(), &overlapped, &bytes_read, TRUE)) {
        ThrowWindowsError(operation, GetLastError());
      }
    } else if (!completed) {
      ThrowWindowsError(operation, GetLastError());
    }
    if (bytes_read != length) {
      throw NativeFilesystemError("native_failure", "Creator staging read made incomplete progress.");
    }
    AssertUnbroken(operation);
  }

 private:
  UniqueHandle file_;
};

std::unique_ptr<ProtectedStagingFile> CreateProtectedStagingFile(
    HANDLE parent,
    const std::wstring& name,
    const char* operation) {
  ValidateSegment(name);
  UNICODE_STRING unicode_name{};
  unicode_name.Buffer = const_cast<PWSTR>(name.data());
  unicode_name.Length = static_cast<USHORT>(name.size() * sizeof(wchar_t));
  unicode_name.MaximumLength = unicode_name.Length;
  OBJECT_ATTRIBUTES attributes{};
  InitializeObjectAttributes(
      &attributes,
      &unicode_name,
      OBJ_CASE_INSENSITIVE | OBJ_DONT_REPARSE,
      parent,
      nullptr);
  IO_STATUS_BLOCK io_status{};
  HANDLE handle = INVALID_HANDLE_VALUE;
  NTSTATUS status = ResolveNtCreateFile()(
      &handle,
      FILE_READ_DATA | FILE_WRITE_DATA | FILE_WRITE_ATTRIBUTES | FILE_READ_ATTRIBUTES | DELETE | SYNCHRONIZE,
      &attributes,
      &io_status,
      nullptr,
      FILE_ATTRIBUTE_NORMAL,
      0,
      FILE_CREATE,
      FILE_NON_DIRECTORY_FILE | FILE_OPEN_REPARSE_POINT | FILE_OPEN_FOR_BACKUP_INTENT,
      nullptr,
      0);
  if (status < 0) ThrowNtStatus(operation, status);
  return std::make_unique<ProtectedStagingFile>(UniqueHandle(handle));
}

class NativeRoot final {
 public:
  NativeRoot(
      const std::wstring& project_root,
      const std::vector<std::wstring>& root_segments,
      RootLifecycle lifecycle)
      : removable_(lifecycle == RootLifecycle::removable),
        read_only_(lifecycle == RootLifecycle::existing) {
    if (root_segments.size() < 2) {
      throw NativeFilesystemError("invalid_path", "Creator root requires an exact allowlisted segment chain.");
    }
    root_chain_.push_back(OpenAbsoluteDirectory(project_root));
    for (size_t index = 0; index < root_segments.size(); ++index) {
      root_chain_.push_back(OpenDirectoryRelative(
          root_chain_.back().get(),
          root_segments[index],
          lifecycle != RootLifecycle::existing,
          false,
          "Open creator root component",
          removable_ && index + 1 == root_segments.size() ? DELETE : 0,
          !read_only_));
    }
  }

  NativeRoot(const NativeRoot&) = delete;
  NativeRoot& operator=(const NativeRoot&) = delete;

  HANDLE root() const {
    if (closed_ || root_chain_.empty()) {
      throw NativeFilesystemError("closed", "Creator native root is closed.");
    }
    return root_chain_.back().get();
  }

  void AssertMutable() const {
    if (read_only_) {
      throw NativeFilesystemError(
          "access_denied", "Existing native root inspection does not permit mutation.");
    }
  }

  std::vector<UniqueHandle> TraverseDirectories(
      const std::vector<std::wstring>& segments,
      size_t count,
      bool create,
      const char* operation,
      bool mutation_access = true) const {
    if (count > segments.size()) {
      throw NativeFilesystemError("invalid_path", "Creator native traversal count is invalid.");
    }
    std::vector<UniqueHandle> chain;
    chain.reserve(count);
    HANDLE parent = root();
    for (size_t index = 0; index < count; ++index) {
      chain.push_back(OpenDirectoryRelative(
          parent, segments[index], create, false, operation, 0, mutation_access));
      parent = chain.back().get();
    }
    return chain;
  }

  HANDLE ParentHandle(const std::vector<UniqueHandle>& chain) const {
    return chain.empty() ? root() : chain.back().get();
  }

  void EnsureDirectory(const std::vector<std::wstring>& segments) const {
    AssertMutable();
    (void)TraverseDirectories(segments, segments.size(), true, "Ensure creator directory");
  }

  void CreateDirectoryExclusive(const std::vector<std::wstring>& segments) const {
    AssertMutable();
    if (segments.empty()) {
      throw NativeFilesystemError("invalid_path", "Exclusive directory target is missing.");
    }
    auto parents = TraverseDirectories(segments, segments.size() - 1, true, "Open directory parent");
    (void)OpenDirectoryRelative(
        ParentHandle(parents), segments.back(), true, true, "Create directory exclusively");
  }

  std::string Stat(const std::vector<std::wstring>& segments) const {
    (void)root();
    if (segments.empty()) return "directory";
    std::unique_ptr<CrossProcessTransactionSerializer> directory_serializer;
    auto parents = TraverseDirectories(
        segments, segments.size() - 1, false, "Open stat parent", false);
    directory_serializer = std::make_unique<CrossProcessTransactionSerializer>(
        BuildTransactionSerializerName(ParentHandle(parents), L"$directory-inventory$"));
    UniqueHandle target = OpenRelative(
        ParentHandle(parents),
        segments.back(),
        FILE_READ_ATTRIBUTES | SYNCHRONIZE,
        FILE_OPEN,
        0,
        "Open creator node for stat");
    FileIdentity identity = QueryIdentity(target.get(), "Stat creator node");
    if (!identity.directory && identity.links > 1) {
      throw NativeFilesystemError("unsafe_hardlink", "Creator file has more than one hard link.");
    }
    std::string result = identity.directory ? "directory" : "file";
    return result;
  }

  std::vector<std::string> ListDirectory(const std::vector<std::wstring>& segments) const {
    std::unique_ptr<CrossProcessTransactionSerializer> directory_serializer;
    auto chain = TraverseDirectories(
        segments, segments.size(), false, "Open creator directory for listing", false);
    HANDLE directory = ParentHandle(chain);
    directory_serializer = std::make_unique<CrossProcessTransactionSerializer>(
        BuildTransactionSerializerName(directory, L"$directory-inventory$"));
    FilesystemTransaction transaction;
    std::vector<std::string> names;
    std::vector<unsigned char> buffer(64 * 1024);
    bool restart = true;
    while (true) {
      FILE_INFO_BY_HANDLE_CLASS info_class = restart
          ? FileIdBothDirectoryRestartInfo
          : FileIdBothDirectoryInfo;
      if (!GetFileInformationByHandleEx(
              directory, info_class, buffer.data(), static_cast<DWORD>(buffer.size()))) {
        DWORD error = GetLastError();
        if (error == ERROR_NO_MORE_FILES) break;
        ThrowWindowsError("List creator directory", error);
      }
      restart = false;
      size_t offset = 0;
      while (offset < buffer.size()) {
        auto* entry = reinterpret_cast<FILE_ID_BOTH_DIR_INFO*>(buffer.data() + offset);
        size_t name_length = entry->FileNameLength / sizeof(wchar_t);
        std::wstring name(entry->FileName, entry->FileName + name_length);
        if (name != L"." && name != L"..") {
          if (names.size() >= kMaximumDirectoryEntries) {
            throw NativeFilesystemError("too_many_nodes", "Creator directory inventory exceeds its native limit.");
          }
          names.push_back(WideToUtf8(name.data(), name.size()));
        }
        if (entry->NextEntryOffset == 0) break;
        if (entry->NextEntryOffset > buffer.size() - offset) {
          throw NativeFilesystemError("native_failure", "Directory enumeration returned an invalid record boundary.");
        }
        offset += entry->NextEntryOffset;
      }
    }
    std::sort(names.begin(), names.end());
    transaction.Commit();
    return names;
  }

  std::vector<unsigned char> ReadFile(
      const std::vector<std::wstring>& segments,
      uint64_t maximum_bytes) const {
    if (segments.empty() || maximum_bytes > kMaximumTransferBytes) {
      throw NativeFilesystemError("invalid_path", "Bounded creator read arguments are invalid.");
    }
    std::unique_ptr<CrossProcessTransactionSerializer> directory_serializer;
    auto parents = TraverseDirectories(
        segments, segments.size() - 1, false, "Open creator read parent", false);
    directory_serializer = std::make_unique<CrossProcessTransactionSerializer>(
        BuildTransactionSerializerName(ParentHandle(parents), L"$directory-inventory$"));
    UniqueHandle file = OpenFileRelative(
        ParentHandle(parents),
        segments.back(),
        FILE_READ_DATA,
        false,
        "Open creator file for reading");
    FileIdentity identity = QueryIdentity(file.get(), "Read creator file");
    if (identity.links > 1) {
      throw NativeFilesystemError("unsafe_hardlink", "Creator file has more than one hard link.");
    }
    if (identity.size > maximum_bytes) {
      throw NativeFilesystemError("too_large", "Creator file exceeds its bounded read limit.");
    }
    std::vector<unsigned char> result(static_cast<size_t>(identity.size));
    size_t offset = 0;
    while (offset < result.size()) {
      DWORD chunk = static_cast<DWORD>(std::min<size_t>(result.size() - offset, 64 * 1024));
      DWORD read = 0;
      if (!::ReadFile(file.get(), result.data() + offset, chunk, &read, nullptr)) {
        ThrowWindowsError("Read creator file", GetLastError());
      }
      if (read == 0) {
        throw NativeFilesystemError("native_failure", "Creator file ended before its verified byte length.");
      }
      offset += read;
    }
    FileIdentity after = QueryIdentity(file.get(), "Verify creator file after read");
    if (!SameIdentity(identity, after) || identity.size != after.size || after.links > 1) {
      throw NativeFilesystemError("unsafe_node", "Creator file identity changed during its bounded read.");
    }
    return result;
  }

  UniqueHandle OpenAndVerifyExactFile(
      HANDLE parent,
      const std::wstring& name,
      const unsigned char* expected,
      size_t expected_length,
      ACCESS_MASK desired_access,
      ULONG share_access,
      const char* mismatch_code,
      const char* operation) const {
    if (expected_length > kMaximumTransferBytes ||
        (expected_length > 0 && expected == nullptr)) {
      throw NativeFilesystemError("too_large", "Native comparison exceeds its bounded byte limit.");
    }
    UniqueHandle file;
    try {
      file = OpenFileRelative(
          parent,
          name,
          desired_access,
          false,
          operation,
          share_access);
    } catch (const NativeFilesystemError& error) {
      if (error.code() == "not_found") {
        throw NativeFilesystemError(mismatch_code, "The exact native comparison target does not match.");
      }
      throw;
    }
    FileIdentity before = QueryIdentity(file.get(), operation);
    if (before.links != 1) {
      throw NativeFilesystemError("unsafe_hardlink", "Native comparison rejected a multiply-linked file.");
    }
    if (before.size != expected_length) {
      throw NativeFilesystemError(mismatch_code, "The exact native comparison target does not match.");
    }
    size_t offset = 0;
    std::vector<unsigned char> buffer(64 * 1024);
    while (offset < expected_length) {
      DWORD chunk = static_cast<DWORD>(
          std::min<size_t>(buffer.size(), expected_length - offset));
      DWORD bytes_read = 0;
      if (!::ReadFile(file.get(), buffer.data(), chunk, &bytes_read, nullptr)) {
        ThrowWindowsError(operation, GetLastError());
      }
      if (bytes_read != chunk ||
          std::memcmp(buffer.data(), expected + offset, chunk) != 0) {
        throw NativeFilesystemError(mismatch_code, "The exact native comparison target does not match.");
      }
      offset += bytes_read;
    }
    FileIdentity after = QueryIdentity(file.get(), operation);
    if (!SameIdentity(before, after) || before.size != after.size || after.links != 1) {
      throw NativeFilesystemError(mismatch_code, "The exact native comparison target changed during validation.");
    }
    return file;
  }

  std::unique_ptr<ProtectedStagingFile> CreateAndWriteFile(
      HANDLE parent,
      const std::wstring& name,
      const unsigned char* data,
      size_t length,
      const char* operation) const {
    if (length > kMaximumTransferBytes) {
      throw NativeFilesystemError("too_large", "Creator write exceeds its native byte limit.");
    }
    std::unique_ptr<ProtectedStagingFile> file =
        CreateProtectedStagingFile(parent, name, operation);
    try {
      size_t offset = 0;
      while (offset < length) {
        DWORD chunk = static_cast<DWORD>(std::min<size_t>(length - offset, 64 * 1024));
        file->WriteAt(offset, data + offset, chunk, operation);
        offset += chunk;
      }
      if (!FlushFileBuffers(file->get())) ThrowWindowsError(operation, GetLastError());
      file->AssertUnbroken(operation);
      FileIdentity identity = QueryIdentity(file->get(), operation);
      if (identity.size != length || identity.links != 1) {
        throw NativeFilesystemError("native_failure", "Creator write verification failed.");
      }
      size_t verified = 0;
      std::vector<unsigned char> verification_buffer(64 * 1024);
      while (verified < length) {
        DWORD chunk = static_cast<DWORD>(
            std::min<size_t>(verification_buffer.size(), length - verified));
        file->ReadAt(verified, verification_buffer.data(), chunk, operation);
        if (std::memcmp(verification_buffer.data(), data + verified, chunk) != 0) {
          throw NativeFilesystemError("native_failure", "Creator staging byte verification failed.");
        }
        verified += chunk;
      }
      return file;
    } catch (...) {
      try {
        MarkDelete(file->get(), "Remove failed creator staging file");
      } catch (const NativeFilesystemError& cleanup_error) {
        file.reset();
        throw NativeFilesystemError(
            "native_failure",
            std::string("Creator staging write failed and exact cleanup also failed: ") +
                cleanup_error.what());
      }
      file.reset();
      throw;
    }
  }

  void CreateLinkRelative(
      HANDLE source,
      HANDLE target_parent,
      const std::wstring& target_name,
      const char* operation) const {
    size_t name_bytes = target_name.size() * sizeof(wchar_t);
    size_t allocation = std::max(
        sizeof(CodexForgeFileLinkInformation),
        offsetof(CodexForgeFileLinkInformation, file_name) + name_bytes);
    std::vector<unsigned char> buffer(allocation, 0);
    auto* information = reinterpret_cast<CodexForgeFileLinkInformation*>(buffer.data());
    information->replace_if_exists = FALSE;
    information->root_directory = target_parent;
    information->file_name_length = static_cast<ULONG>(name_bytes);
    std::memcpy(information->file_name, target_name.data(), name_bytes);
    IO_STATUS_BLOCK status_block{};
    NTSTATUS status = ResolveNtSetInformationFile()(
        source,
        &status_block,
        information,
        static_cast<ULONG>(buffer.size()),
        kFileLinkInformation);
    if (status < 0) {
      ThrowNtStatus(operation, status);
    }
  }

  void MarkDelete(HANDLE handle, const char* operation) const {
    FILE_DISPOSITION_INFO disposition{};
    disposition.DeleteFile = TRUE;
    if (!SetFileInformationByHandle(handle, FileDispositionInfo, &disposition, sizeof(disposition))) {
      ThrowWindowsError(operation, GetLastError());
    }
  }

  void WriteAtomicExclusive(
      const std::vector<std::wstring>& segments,
      const std::wstring& temporary_name,
      const unsigned char* data,
      size_t length,
      const std::vector<std::wstring>* fence_segments,
      const unsigned char* expected_fence,
      size_t expected_fence_length) const {
    AssertMutable();
    if (segments.empty() || temporary_name == segments.back() ||
        length > kMaximumTransferBytes ||
        (length > 0 && data == nullptr) ||
        (fence_segments == nullptr &&
         (expected_fence != nullptr || expected_fence_length != 0)) ||
        (fence_segments != nullptr && fence_segments->empty()) ||
        (fence_segments != nullptr && expected_fence_length > 0 && expected_fence == nullptr)) {
      throw NativeFilesystemError("invalid_path", "Atomic creator file target is invalid.");
    }
    std::unique_ptr<CrossProcessTransactionSerializer> directory_serializer;
    std::unique_ptr<CrossProcessTransactionSerializer> serializer;
    auto parents = TraverseDirectories(segments, segments.size() - 1, true, "Open atomic creator parent");
    HANDLE parent = ParentHandle(parents);
    std::vector<UniqueHandle> fence_parents;
    HANDLE fence_parent = INVALID_HANDLE_VALUE;
    if (fence_segments != nullptr) {
      fence_parents = TraverseDirectories(
          *fence_segments,
          fence_segments->size() - 1,
          false,
          "Open atomic exclusive fence parent");
      fence_parent = ParentHandle(fence_parents);
    }
    directory_serializer = std::make_unique<CrossProcessTransactionSerializer>(
        BuildTransactionSerializerName(parent, L"$directory-inventory$"));
    serializer = std::make_unique<CrossProcessTransactionSerializer>(
        BuildTransactionSerializerName(parent, segments.back()));
    FilesystemTransaction transaction;
    UniqueHandle fence;
    if (fence_segments != nullptr) {
      fence = OpenAndVerifyExactFile(
          fence_parent,
          fence_segments->back(),
          expected_fence,
          expected_fence_length,
          FILE_READ_DATA,
          FILE_SHARE_READ,
          "fence_mismatch",
          "Validate atomic exclusive fence");
    }
    std::unique_ptr<ProtectedStagingFile> temporary = CreateAndWriteFile(
        parent, temporary_name, data, length, "Create atomic creator staging file");
    bool committed = false;
    try {
      size_t name_bytes = segments.back().size() * sizeof(wchar_t);
      size_t allocation = std::max(
          sizeof(CodexForgeFileLinkInformation),
          offsetof(CodexForgeFileLinkInformation, file_name) + name_bytes);
      std::vector<unsigned char> buffer(allocation, 0);
      auto* information = reinterpret_cast<CodexForgeFileLinkInformation*>(buffer.data());
      information->replace_if_exists = FALSE;
      information->root_directory = parent;
      information->file_name_length = static_cast<ULONG>(name_bytes);
      std::memcpy(information->file_name, segments.back().data(), name_bytes);
      IO_STATUS_BLOCK status_block{};
      NTSTATUS status = ResolveNtSetInformationFile()(
          temporary->get(),
          &status_block,
          information,
          static_cast<ULONG>(buffer.size()),
          kFileRenameInformation);
      if (status < 0) {
        ThrowNtStatus("Publish atomic creator file without replacement", status);
      }
      temporary.reset();
      transaction.Commit();
      committed = true;
      // The isolated transaction commit is the sole publication point. The
      // transacted staging name and rename are invisible before this point.
    } catch (...) {
      if (!committed && temporary) {
        try {
          MarkDelete(temporary->get(), "Remove failed creator staging file");
        } catch (const NativeFilesystemError& cleanup_error) {
          temporary.reset();
          throw NativeFilesystemError(
              "native_failure",
              std::string("Creator publication failed and exact staging cleanup also failed: ") +
                  cleanup_error.what());
        }
      }
      throw;
    }
  }

  void WriteAtomicReplace(
      const std::vector<std::wstring>& segments,
      const std::wstring& temporary_name,
      const unsigned char* data,
      size_t length,
      const unsigned char* expected,
      size_t expected_length,
      bool verify_expected,
      const std::vector<std::wstring>* fence_segments,
      const unsigned char* expected_fence,
      size_t expected_fence_length) const {
    AssertMutable();
    if (segments.empty() || temporary_name == segments.back() ||
        length > kMaximumTransferBytes ||
        (length > 0 && data == nullptr) ||
        (verify_expected && expected_length > 0 && expected == nullptr) ||
        (fence_segments == nullptr &&
         (expected_fence != nullptr || expected_fence_length != 0)) ||
        (fence_segments != nullptr && fence_segments->empty()) ||
        (fence_segments != nullptr && expected_fence_length > 0 && expected_fence == nullptr)) {
      throw NativeFilesystemError("invalid_path", "Atomic native replacement arguments are invalid.");
    }
    std::unique_ptr<CrossProcessTransactionSerializer> directory_serializer;
    auto parents = TraverseDirectories(
        segments, segments.size() - 1, false, "Open atomic replacement parent");
    HANDLE parent = ParentHandle(parents);
    directory_serializer = std::make_unique<CrossProcessTransactionSerializer>(
        BuildTransactionSerializerName(parent, L"$directory-inventory$"));
    std::vector<UniqueHandle> fence_parents;
    HANDLE fence_parent = INVALID_HANDLE_VALUE;
    if (fence_segments != nullptr) {
      fence_parents = TraverseDirectories(
          *fence_segments,
          fence_segments->size() - 1,
          false,
          "Open atomic replacement fence parent");
      fence_parent = ParentHandle(fence_parents);
    }

    FilesystemTransaction transaction;
    UniqueHandle fence;
    if (fence_segments != nullptr) {
      fence = OpenAndVerifyExactFile(
          fence_parent,
          fence_segments->back(),
          expected_fence,
          expected_fence_length,
          FILE_READ_DATA,
          FILE_SHARE_READ,
          "fence_mismatch",
          "Validate atomic replacement fence");
    }

    UniqueHandle target;
    if (verify_expected) {
      target = OpenAndVerifyExactFile(
          parent,
          segments.back(),
          expected,
          expected_length,
          FILE_READ_DATA | DELETE,
          FILE_SHARE_READ | FILE_SHARE_DELETE,
          "compare_mismatch",
          "Validate atomic replacement target");
    } else {
      target = OpenFileRelative(
          parent,
          segments.back(),
          FILE_READ_DATA | DELETE,
          false,
          "Open atomic replacement target",
          FILE_SHARE_READ | FILE_SHARE_DELETE);
      FileIdentity target_identity = QueryIdentity(target.get(), "Inspect atomic replacement target");
      if (target_identity.links != 1) {
        throw NativeFilesystemError("unsafe_hardlink", "Atomic replacement rejected a multiply-linked target.");
      }
      if (target_identity.size > kMaximumTransferBytes) {
        throw NativeFilesystemError("too_large", "Atomic replacement target exceeds its bounded byte limit.");
      }
    }
    // The comparison and the replacement both belong to this transaction.
    // Closing the target handle is required before Windows can stage a
    // replacement rename; any outside mutation of the compared transaction
    // view makes the eventual commit fail rather than publishing stale data.
    target.reset();

    std::unique_ptr<ProtectedStagingFile> temporary = CreateAndWriteFile(
        parent, temporary_name, data, length, "Create atomic replacement staging file");
    bool committed = false;
    try {
      size_t name_bytes = segments.back().size() * sizeof(wchar_t);
      size_t allocation = std::max(
          sizeof(CodexForgeFileLinkInformation),
          offsetof(CodexForgeFileLinkInformation, file_name) + name_bytes);
      std::vector<unsigned char> buffer(allocation, 0);
      auto* information = reinterpret_cast<CodexForgeFileLinkInformation*>(buffer.data());
      information->replace_if_exists = TRUE;
      information->root_directory = parent;
      information->file_name_length = static_cast<ULONG>(name_bytes);
      std::memcpy(information->file_name, segments.back().data(), name_bytes);
      IO_STATUS_BLOCK status_block{};
      NTSTATUS status = ResolveNtSetInformationFile()(
          temporary->get(),
          &status_block,
          information,
          static_cast<ULONG>(buffer.size()),
          kFileRenameInformation);
      if (status < 0) ThrowNtStatus("Replace atomic native file", status);
      temporary.reset();
      transaction.Commit();
      committed = true;
    } catch (...) {
      if (!committed && temporary) {
        try {
          MarkDelete(temporary->get(), "Remove failed atomic replacement staging file");
        } catch (const NativeFilesystemError& cleanup_error) {
          temporary.reset();
          throw NativeFilesystemError(
              "native_failure",
              std::string("Atomic replacement failed and exact staging cleanup also failed: ") +
                  cleanup_error.what());
        }
      }
      throw;
    }
  }

  void CompareDeleteExact(
      const std::vector<std::wstring>& segments,
      const unsigned char* expected,
      size_t expected_length) const {
    AssertMutable();
    if (segments.empty() || expected_length > kMaximumTransferBytes ||
        (expected_length > 0 && expected == nullptr)) {
      throw NativeFilesystemError("invalid_path", "Exact native deletion arguments are invalid.");
    }
    std::unique_ptr<CrossProcessTransactionSerializer> directory_serializer;
    std::unique_ptr<CrossProcessTransactionSerializer> serializer;
    auto parents = TraverseDirectories(
        segments, segments.size() - 1, false, "Open exact deletion parent");
    HANDLE parent = ParentHandle(parents);
    directory_serializer = std::make_unique<CrossProcessTransactionSerializer>(
        BuildTransactionSerializerName(parent, L"$directory-inventory$"));
    serializer = std::make_unique<CrossProcessTransactionSerializer>(
        BuildTransactionSerializerName(parent, segments.back()));
    FilesystemTransaction transaction;
    UniqueHandle target = OpenAndVerifyExactFile(
        parent,
        segments.back(),
        expected,
        expected_length,
        FILE_READ_DATA | DELETE,
        FILE_SHARE_READ | FILE_SHARE_DELETE,
        "compare_mismatch",
        "Validate exact deletion target");
    MarkDelete(target.get(), "Delete exact native target");
    target.reset();
    transaction.Commit();
  }

  void PublishTreeExclusive(
      const std::vector<std::wstring>& target_segments,
      const std::vector<NativeTreeEntry>& entries) const {
    AssertMutable();
    if (target_segments.empty()) {
      throw NativeFilesystemError("invalid_path", "Tree publication target is missing.");
    }
    ValidateTreeEntries(entries);
    std::unique_ptr<CrossProcessTransactionSerializer> directory_serializer;
    std::unique_ptr<CrossProcessTransactionSerializer> target_serializer;
    auto target_parents = TraverseDirectories(
        target_segments,
        target_segments.size() - 1,
        false,
        "Open tree publication parent");
    HANDLE target_parent = ParentHandle(target_parents);

    directory_serializer = std::make_unique<CrossProcessTransactionSerializer>(
        BuildTransactionSerializerName(target_parent, L"$directory-inventory$"));
    target_serializer = std::make_unique<CrossProcessTransactionSerializer>(
        BuildTransactionSerializerName(target_parent, target_segments.back()));
    FilesystemTransaction transaction;
    UniqueHandle tree = OpenDirectoryRelative(
        target_parent,
        target_segments.back(),
        true,
        true,
        "Create exclusive transaction-isolated tree root");
    for (const NativeTreeEntry& entry : entries) {
      std::vector<UniqueHandle> directory_chain;
      directory_chain.reserve(entry.segments.size() - 1);
      HANDLE file_parent = tree.get();
      for (size_t index = 0; index + 1 < entry.segments.size(); ++index) {
        directory_chain.push_back(OpenDirectoryRelative(
            file_parent,
            entry.segments[index],
            true,
            false,
            "Create transaction-isolated tree directory"));
        file_parent = directory_chain.back().get();
      }
      std::unique_ptr<ProtectedStagingFile> file = CreateAndWriteFile(
          file_parent,
          entry.segments.back(),
          entry.data,
          entry.length,
          "Create transaction-isolated tree file");
      file.reset();
    }
    tree.reset();
    transaction.Commit();
  }

  void RenameExclusive(
      const std::vector<std::wstring>& source_segments,
      const std::vector<std::wstring>& target_segments) const {
    AssertMutable();
    if (source_segments.empty() || target_segments.empty()) {
      throw NativeFilesystemError("invalid_path", "Creator rename endpoints are missing.");
    }
    auto source_parents = TraverseDirectories(
        source_segments, source_segments.size() - 1, false, "Open creator rename source parent");
    auto target_parents = TraverseDirectories(
        target_segments, target_segments.size() - 1, false, "Open creator rename target parent");
    UniqueHandle source = OpenRelative(
        ParentHandle(source_parents),
        source_segments.back(),
        DELETE | FILE_READ_ATTRIBUTES | SYNCHRONIZE,
        FILE_OPEN,
        0,
        "Open creator rename source");
    FileIdentity before = QueryIdentity(source.get(), "Inspect creator rename source");
    if (!before.directory && before.links > 1) {
      throw NativeFilesystemError("unsafe_hardlink", "Creator rename source has multiple hard links.");
    }
    size_t name_bytes = target_segments.back().size() * sizeof(wchar_t);
    size_t allocation = std::max(
        sizeof(CodexForgeFileLinkInformation),
        offsetof(CodexForgeFileLinkInformation, file_name) + name_bytes);
    std::vector<unsigned char> buffer(allocation, 0);
    auto* information = reinterpret_cast<CodexForgeFileLinkInformation*>(buffer.data());
    information->replace_if_exists = FALSE;
    information->root_directory = ParentHandle(target_parents);
    information->file_name_length = static_cast<ULONG>(name_bytes);
    std::memcpy(information->file_name, target_segments.back().data(), name_bytes);
    IO_STATUS_BLOCK status_block{};
    NTSTATUS status = ResolveNtSetInformationFile()(
        source.get(),
        &status_block,
        information,
        static_cast<ULONG>(buffer.size()),
        kFileRenameInformation);
    if (status < 0) {
      ThrowNtStatus("Rename creator node without replacement", status);
    }
    // NtSetInformationFile is the commit point: it binds this already-opened
    // source handle to the retained target-parent handle and refuses target
    // replacement. No fallible path-based verification follows the commit.
  }

  void RemoveChildren(HANDLE directory, size_t depth, size_t* remaining_nodes) const {
    if (depth > kMaximumCleanupDepth || remaining_nodes == nullptr) {
      throw NativeFilesystemError("too_many_nodes", "Creator cleanup exceeds its native depth limit.");
    }
    CrossProcessTransactionSerializer directory_serializer(
        BuildTransactionSerializerName(directory, L"$directory-inventory$"));
    std::vector<unsigned char> buffer(64 * 1024);
    bool restart = true;
    std::vector<std::wstring> names;
    while (true) {
      FILE_INFO_BY_HANDLE_CLASS info_class = restart
          ? FileIdBothDirectoryRestartInfo
          : FileIdBothDirectoryInfo;
      if (!GetFileInformationByHandleEx(
              directory, info_class, buffer.data(), static_cast<DWORD>(buffer.size()))) {
        DWORD error = GetLastError();
        if (error == ERROR_NO_MORE_FILES) break;
        ThrowWindowsError("Enumerate creator cleanup directory", error);
      }
      restart = false;
      size_t offset = 0;
      while (offset < buffer.size()) {
        auto* entry = reinterpret_cast<FILE_ID_BOTH_DIR_INFO*>(buffer.data() + offset);
        size_t name_length = entry->FileNameLength / sizeof(wchar_t);
        std::wstring name(entry->FileName, entry->FileName + name_length);
        if (name != L"." && name != L"..") {
          if (*remaining_nodes == 0 || names.size() >= kMaximumDirectoryEntries) {
            throw NativeFilesystemError("too_many_nodes", "Creator cleanup exceeds its native node limit.");
          }
          *remaining_nodes -= 1;
          names.push_back(std::move(name));
        }
        if (entry->NextEntryOffset == 0) break;
        if (entry->NextEntryOffset > buffer.size() - offset) {
          throw NativeFilesystemError("native_failure", "Cleanup enumeration returned an invalid record boundary.");
        }
        offset += entry->NextEntryOffset;
      }
    }
    for (const std::wstring& name : names) {
      std::unique_ptr<CrossProcessTransactionSerializer> child_directory_serializer;
      UniqueHandle child = OpenRelative(
          directory,
          name,
          DELETE | FILE_LIST_DIRECTORY | FILE_READ_ATTRIBUTES | SYNCHRONIZE,
          FILE_OPEN,
          0,
          "Open creator cleanup child");
      FileIdentity identity = QueryIdentity(child.get(), "Inspect creator cleanup child");
      if (identity.directory) {
        child_directory_serializer = std::make_unique<CrossProcessTransactionSerializer>(
            BuildTransactionSerializerName(child.get(), L"$directory-inventory$"));
        RemoveChildren(child.get(), depth + 1, remaining_nodes);
      } else if (identity.links > 1) {
        throw NativeFilesystemError("unsafe_hardlink", "Creator cleanup rejected a multiply-linked file.");
      }
      // Remove only the name opened relative to this trusted directory. This
      // writes no file bytes and also recovers publication interrupted between
      // hard-link creation and removal of the staging name.
      MarkDelete(child.get(), "Delete creator cleanup child by handle");
    }
  }

  void RemoveTree(const std::vector<std::wstring>& segments) const {
    AssertMutable();
    if (segments.empty()) {
      throw NativeFilesystemError("invalid_path", "Creator cleanup target is missing.");
    }
    std::unique_ptr<CrossProcessTransactionSerializer> directory_serializer;
    std::unique_ptr<CrossProcessTransactionSerializer> target_serializer;
    std::unique_ptr<CrossProcessTransactionSerializer> target_directory_serializer;
    auto parents = TraverseDirectories(segments, segments.size() - 1, false, "Open creator cleanup parent");
    HANDLE parent = ParentHandle(parents);
    directory_serializer = std::make_unique<CrossProcessTransactionSerializer>(
        BuildTransactionSerializerName(parent, L"$directory-inventory$"));
    target_serializer = std::make_unique<CrossProcessTransactionSerializer>(
        BuildTransactionSerializerName(parent, segments.back()));
    UniqueHandle target;
    try {
      target = OpenRelative(
          parent,
          segments.back(),
          DELETE | FILE_LIST_DIRECTORY | FILE_READ_ATTRIBUTES | SYNCHRONIZE,
          FILE_OPEN,
          0,
          "Open creator cleanup target");
    } catch (const NativeFilesystemError& error) {
      if (error.code() == "not_found") return;
      throw;
    }
    FileIdentity identity = QueryIdentity(target.get(), "Inspect creator cleanup target");
    if (identity.directory) {
      target_directory_serializer = std::make_unique<CrossProcessTransactionSerializer>(
          BuildTransactionSerializerName(target.get(), L"$directory-inventory$"));
      size_t remaining_nodes = kMaximumCleanupNodes;
      RemoveChildren(target.get(), 1, &remaining_nodes);
    } else if (identity.links > 1) {
      throw NativeFilesystemError("unsafe_hardlink", "Creator cleanup rejected a multiply-linked file.");
    }
    // As above, this removes the exact handle-relative name without following
    // or writing through any other hard-link name.
    MarkDelete(target.get(), "Delete creator cleanup target by handle");
  }

  void Close() {
    if (closed_) return;
    closed_ = true;
    root_chain_.clear();
  }

  void RemoveRoot() {
    AssertMutable();
    if (closed_ || root_chain_.size() < 3 || !removable_) {
      throw NativeFilesystemError("closed", "Creator native test root is unavailable for cleanup.");
    }
    // Make cleanup irreversible before its first mutation. The exact root
    // handle has retained DELETE authority from construction and denies
    // delete sharing, so it cannot be renamed or substituted while children
    // are inspected and removed.
    closed_ = true;
    std::unique_ptr<CrossProcessTransactionSerializer> root_directory_serializer;
    try {
      HANDLE exact_root = root_chain_.back().get();
      root_directory_serializer = std::make_unique<CrossProcessTransactionSerializer>(
          BuildTransactionSerializerName(exact_root, L"$directory-inventory$"));
      size_t remaining_nodes = kMaximumCleanupNodes;
      RemoveChildren(exact_root, 1, &remaining_nodes);
      MarkDelete(exact_root, "Delete exact creator test root by handle");
      root_chain_.clear();
    } catch (...) {
      // A failed cleanup remains closed. Releasing this exact handle permits
      // operator recovery, but no retry on this object can reopen a name that
      // may subsequently identify a different directory.
      root_chain_.clear();
      throw;
    }
  }

 private:
  std::vector<UniqueHandle> root_chain_;
  bool removable_ = false;
  bool read_only_ = false;
  bool closed_ = false;
};

napi_ref g_root_constructor = nullptr;

napi_value ThrowJavaScriptError(napi_env env, const NativeFilesystemError& error) {
  napi_value message;
  napi_value value;
  napi_value code;
  napi_create_string_utf8(env, error.what(), NAPI_AUTO_LENGTH, &message);
  napi_create_error(env, nullptr, message, &value);
  napi_create_string_utf8(env, error.code().c_str(), NAPI_AUTO_LENGTH, &code);
  napi_set_named_property(env, value, "code", code);
  napi_throw(env, value);
  return nullptr;
}

template <typename Callback>
napi_value Guard(napi_env env, Callback&& callback) {
  try {
    return callback();
  } catch (const NativeFilesystemError& error) {
    return ThrowJavaScriptError(env, error);
  } catch (const std::exception&) {
    return ThrowJavaScriptError(
        env,
        NativeFilesystemError("native_failure", "Creator native filesystem failed closed after an internal error."));
  }
}

NativeRoot* UnwrapRoot(napi_env env, napi_callback_info info, size_t* argc, napi_value* args) {
  napi_value this_value;
  CheckNapi(env, napi_get_cb_info(env, info, argc, args, &this_value, nullptr), "Read native root call");
  NativeRoot* root = nullptr;
  CheckNapi(env, napi_unwrap(env, this_value, reinterpret_cast<void**>(&root)), "Unwrap native root");
  if (root == nullptr) throw NativeFilesystemError("closed", "Creator native root is unavailable.");
  return root;
}

void FinalizeRoot(napi_env, void* data, void*) {
  delete static_cast<NativeRoot*>(data);
}

napi_value RootConstructor(napi_env env, napi_callback_info info) {
  return Guard(env, [&]() -> napi_value {
    size_t argc = 3;
    napi_value args[3];
    napi_value this_value;
    CheckNapi(env, napi_get_cb_info(env, info, &argc, args, &this_value, nullptr), "Construct native root");
    if (argc != 2 && argc != 3) {
      throw NativeFilesystemError("invalid_path", "Native root requires project root, root segments, and an optional lifecycle mode.");
    }
    std::wstring project_root = Utf8ToWide(GetString(env, args[0], "project root"));
    std::vector<std::wstring> root_segments = GetSegments(env, args[1], "root segments");
    RootLifecycle lifecycle = RootLifecycle::persistent;
    if (argc == 3) {
      const std::string mode = GetString(env, args[2], "root lifecycle mode");
      if (mode != "persistent" && mode != "removable" && mode != "existing") {
        throw NativeFilesystemError("invalid_path", "Native root lifecycle mode is invalid.");
      }
      lifecycle = mode == "removable"
          ? RootLifecycle::removable
          : mode == "existing" ? RootLifecycle::existing : RootLifecycle::persistent;
    }
    auto root = std::make_unique<NativeRoot>(project_root, root_segments, lifecycle);
    CheckNapi(env, napi_wrap(env, this_value, root.get(), FinalizeRoot, nullptr, nullptr), "Wrap native root");
    root.release();
    return this_value;
  });
}

napi_value RootEnsureDirectory(napi_env env, napi_callback_info info) {
  return Guard(env, [&]() -> napi_value {
    size_t argc = 1;
    napi_value args[1];
    NativeRoot* root = UnwrapRoot(env, info, &argc, args);
    if (argc != 1) throw NativeFilesystemError("invalid_path", "ensureDirectory requires segments.");
    root->EnsureDirectory(GetSegments(env, args[0], "directory segments"));
    napi_value result;
    CheckNapi(env, napi_get_undefined(env, &result), "Return ensureDirectory result");
    return result;
  });
}

napi_value RootCreateDirectoryExclusive(napi_env env, napi_callback_info info) {
  return Guard(env, [&]() -> napi_value {
    size_t argc = 1;
    napi_value args[1];
    NativeRoot* root = UnwrapRoot(env, info, &argc, args);
    if (argc != 1) throw NativeFilesystemError("invalid_path", "createDirectoryExclusive requires segments.");
    root->CreateDirectoryExclusive(GetSegments(env, args[0], "directory segments"));
    napi_value result;
    CheckNapi(env, napi_get_undefined(env, &result), "Return directory creation result");
    return result;
  });
}

napi_value RootStat(napi_env env, napi_callback_info info) {
  return Guard(env, [&]() -> napi_value {
    size_t argc = 1;
    napi_value args[1];
    NativeRoot* root = UnwrapRoot(env, info, &argc, args);
    if (argc != 1) throw NativeFilesystemError("invalid_path", "stat requires segments.");
    std::string kind = root->Stat(GetSegments(env, args[0], "stat segments"));
    napi_value result;
    CheckNapi(env, napi_create_string_utf8(env, kind.c_str(), kind.size(), &result), "Return stat result");
    return result;
  });
}

napi_value RootListDirectory(napi_env env, napi_callback_info info) {
  return Guard(env, [&]() -> napi_value {
    size_t argc = 1;
    napi_value args[1];
    NativeRoot* root = UnwrapRoot(env, info, &argc, args);
    if (argc != 1) throw NativeFilesystemError("invalid_path", "listDirectory requires segments.");
    std::vector<std::string> names = root->ListDirectory(GetSegments(env, args[0], "list segments"));
    napi_value result;
    CheckNapi(env, napi_create_array_with_length(env, names.size(), &result), "Create directory list");
    for (size_t index = 0; index < names.size(); ++index) {
      napi_value name;
      CheckNapi(
          env,
          napi_create_string_utf8(env, names[index].c_str(), names[index].size(), &name),
          "Create directory entry name");
      CheckNapi(env, napi_set_element(env, result, static_cast<uint32_t>(index), name), "Return directory entry");
    }
    return result;
  });
}

napi_value RootReadFile(napi_env env, napi_callback_info info) {
  return Guard(env, [&]() -> napi_value {
    size_t argc = 2;
    napi_value args[2];
    NativeRoot* root = UnwrapRoot(env, info, &argc, args);
    if (argc != 2) throw NativeFilesystemError("invalid_path", "readFile requires segments and a byte limit.");
    int64_t maximum = 0;
    CheckNapi(env, napi_get_value_int64(env, args[1], &maximum), "Read native byte limit");
    if (maximum < 0) throw NativeFilesystemError("invalid_path", "Native byte limit is invalid.");
    std::vector<unsigned char> bytes = root->ReadFile(
        GetSegments(env, args[0], "read segments"), static_cast<uint64_t>(maximum));
    napi_value result;
    CheckNapi(
        env,
        napi_create_buffer_copy(env, bytes.size(), bytes.data(), nullptr, &result),
        "Return native file bytes");
    return result;
  });
}

struct BufferView {
  const unsigned char* data = nullptr;
  size_t length = 0;
};

struct NullableBufferView {
  bool present = false;
  BufferView value{};
};

BufferView GetBuffer(napi_env env, napi_value value) {
  bool is_buffer = false;
  CheckNapi(env, napi_is_buffer(env, value, &is_buffer), "Inspect native buffer");
  if (!is_buffer) throw NativeFilesystemError("invalid_path", "Native write payload must be a Buffer.");
  void* data = nullptr;
  size_t length = 0;
  CheckNapi(env, napi_get_buffer_info(env, value, &data, &length), "Read native buffer");
  return {static_cast<const unsigned char*>(data), length};
}

NullableBufferView GetNullableBuffer(napi_env env, napi_value value) {
  napi_valuetype type = napi_undefined;
  CheckNapi(env, napi_typeof(env, value, &type), "Inspect nullable native buffer");
  if (type == napi_null) return {};
  return {true, GetBuffer(env, value)};
}

bool GetNullableSegments(
    napi_env env,
    napi_value value,
    const char* label,
    std::vector<std::wstring>* result) {
  if (result == nullptr) {
    throw NativeFilesystemError("native_failure", "Nullable native segment output is unavailable.");
  }
  napi_valuetype type = napi_undefined;
  CheckNapi(env, napi_typeof(env, value, &type), "Inspect nullable segment array");
  if (type == napi_null) return false;
  *result = GetSegments(env, value, label);
  return true;
}

std::vector<NativeTreeEntry> GetTreeEntries(napi_env env, napi_value value) {
  bool is_array = false;
  CheckNapi(env, napi_is_array(env, value, &is_array), "Inspect ordered tree entries");
  if (!is_array) {
    throw NativeFilesystemError("invalid_path", "Ordered tree entries must be an array.");
  }
  uint32_t length = 0;
  CheckNapi(env, napi_get_array_length(env, value, &length), "Measure ordered tree entries");
  if (length == 0 || length > kMaximumTreeEntries) {
    throw NativeFilesystemError("too_many_nodes", "Tree publication requires one to fifteen ordered entries.");
  }
  std::vector<NativeTreeEntry> entries;
  entries.reserve(length);
  for (uint32_t index = 0; index < length; ++index) {
    napi_value tuple;
    CheckNapi(env, napi_get_element(env, value, index, &tuple), "Read ordered tree entry");
    bool is_tuple = false;
    CheckNapi(env, napi_is_array(env, tuple, &is_tuple), "Inspect ordered tree entry tuple");
    if (!is_tuple) {
      throw NativeFilesystemError("invalid_path", "Each ordered tree entry must be a two-item tuple.");
    }
    uint32_t tuple_length = 0;
    CheckNapi(env, napi_get_array_length(env, tuple, &tuple_length), "Measure ordered tree entry tuple");
    if (tuple_length != 2) {
      throw NativeFilesystemError("invalid_path", "Each ordered tree entry must contain path segments and bytes.");
    }
    napi_value path_value;
    napi_value bytes_value;
    CheckNapi(env, napi_get_element(env, tuple, 0, &path_value), "Read ordered tree path");
    CheckNapi(env, napi_get_element(env, tuple, 1, &bytes_value), "Read ordered tree bytes");
    BufferView bytes = GetBuffer(env, bytes_value);
    entries.push_back({
        GetSegments(env, path_value, "tree entry segments"),
        bytes.data,
        bytes.length,
    });
  }
  return entries;
}

napi_value RootWriteAtomicExclusive(napi_env env, napi_callback_info info) {
  return Guard(env, [&]() -> napi_value {
    size_t argc = 5;
    napi_value args[5];
    NativeRoot* root = UnwrapRoot(env, info, &argc, args);
    if (argc != 3 && argc != 5) {
      throw NativeFilesystemError(
          "invalid_path",
          "writeAtomicExclusive requires segments, a temporary name, bytes, and an optional exact fence pair.");
    }
    std::wstring temporary = Utf8ToWide(GetString(env, args[1], "temporary name"));
    ValidateSegment(temporary);
    BufferView bytes = GetBuffer(env, args[2]);
    std::vector<std::wstring> fence_segments;
    bool has_fence = false;
    NullableBufferView expected_fence{};
    if (argc == 5) {
      has_fence = GetNullableSegments(
          env, args[3], "exclusive fence segments", &fence_segments);
      expected_fence = GetNullableBuffer(env, args[4]);
      if (has_fence != expected_fence.present) {
        throw NativeFilesystemError(
            "invalid_path", "Atomic native exclusive fence arguments must be supplied together.");
      }
    }
    root->WriteAtomicExclusive(
        GetSegments(env, args[0], "atomic write segments"),
        temporary,
        bytes.data,
        bytes.length,
        has_fence ? &fence_segments : nullptr,
        expected_fence.value.data,
        expected_fence.value.length);
    napi_value result;
    CheckNapi(env, napi_get_undefined(env, &result), "Return atomic write result");
    return result;
  });
}

napi_value RootWriteAtomicReplace(napi_env env, napi_callback_info info) {
  return Guard(env, [&]() -> napi_value {
    size_t argc = 6;
    napi_value args[6];
    NativeRoot* root = UnwrapRoot(env, info, &argc, args);
    if (argc != 6) {
      throw NativeFilesystemError(
          "invalid_path",
          "writeAtomicReplace requires segments, a temporary name, bytes, an optional exact target, and an optional exact fence.");
    }
    std::wstring temporary = Utf8ToWide(GetString(env, args[1], "temporary name"));
    ValidateSegment(temporary);
    BufferView bytes = GetBuffer(env, args[2]);
    NullableBufferView expected = GetNullableBuffer(env, args[3]);
    std::vector<std::wstring> fence_segments;
    bool has_fence = GetNullableSegments(
        env, args[4], "replacement fence segments", &fence_segments);
    NullableBufferView expected_fence = GetNullableBuffer(env, args[5]);
    if (has_fence != expected_fence.present) {
      throw NativeFilesystemError(
          "invalid_path", "Atomic native replacement fence arguments must be supplied together.");
    }
    root->WriteAtomicReplace(
        GetSegments(env, args[0], "atomic replacement segments"),
        temporary,
        bytes.data,
        bytes.length,
        expected.value.data,
        expected.value.length,
        expected.present,
        has_fence ? &fence_segments : nullptr,
        expected_fence.value.data,
        expected_fence.value.length);
    napi_value result;
    CheckNapi(env, napi_get_undefined(env, &result), "Return atomic replacement result");
    return result;
  });
}

napi_value RootCompareDeleteExact(napi_env env, napi_callback_info info) {
  return Guard(env, [&]() -> napi_value {
    size_t argc = 2;
    napi_value args[2];
    NativeRoot* root = UnwrapRoot(env, info, &argc, args);
    if (argc != 2) {
      throw NativeFilesystemError(
          "invalid_path", "compareDeleteExact requires segments and exact expected bytes.");
    }
    BufferView expected = GetBuffer(env, args[1]);
    root->CompareDeleteExact(
        GetSegments(env, args[0], "exact deletion segments"),
        expected.data,
        expected.length);
    napi_value result;
    CheckNapi(env, napi_get_undefined(env, &result), "Return exact deletion result");
    return result;
  });
}

napi_value RootPublishTreeExclusive(napi_env env, napi_callback_info info) {
  return Guard(env, [&]() -> napi_value {
    size_t argc = 2;
    napi_value args[2];
    NativeRoot* root = UnwrapRoot(env, info, &argc, args);
    if (argc != 2) {
      throw NativeFilesystemError(
          "invalid_path", "publishTreeExclusive requires target segments and ordered entry tuples.");
    }
    root->PublishTreeExclusive(
        GetSegments(env, args[0], "tree publication target segments"),
        GetTreeEntries(env, args[1]));
    napi_value result;
    CheckNapi(env, napi_get_undefined(env, &result), "Return exclusive tree publication result");
    return result;
  });
}

napi_value RootRenameExclusive(napi_env env, napi_callback_info info) {
  return Guard(env, [&]() -> napi_value {
    size_t argc = 2;
    napi_value args[2];
    NativeRoot* root = UnwrapRoot(env, info, &argc, args);
    if (argc != 2) throw NativeFilesystemError("invalid_path", "renameExclusive requires source and target segments.");
    root->RenameExclusive(
        GetSegments(env, args[0], "rename source segments"),
        GetSegments(env, args[1], "rename target segments"));
    napi_value result;
    CheckNapi(env, napi_get_undefined(env, &result), "Return rename result");
    return result;
  });
}

napi_value RootRemoveTree(napi_env env, napi_callback_info info) {
  return Guard(env, [&]() -> napi_value {
    size_t argc = 1;
    napi_value args[1];
    NativeRoot* root = UnwrapRoot(env, info, &argc, args);
    if (argc != 1) throw NativeFilesystemError("invalid_path", "removeTree requires segments.");
    root->RemoveTree(GetSegments(env, args[0], "cleanup segments"));
    napi_value result;
    CheckNapi(env, napi_get_undefined(env, &result), "Return cleanup result");
    return result;
  });
}

napi_value RootClose(napi_env env, napi_callback_info info) {
  return Guard(env, [&]() -> napi_value {
    size_t argc = 1;
    napi_value args[1];
    NativeRoot* root = UnwrapRoot(env, info, &argc, args);
    if (argc != 0) throw NativeFilesystemError("invalid_path", "close does not accept arguments.");
    root->Close();
    napi_value result;
    CheckNapi(env, napi_get_undefined(env, &result), "Return native root close result");
    return result;
  });
}

napi_value RootRemoveRoot(napi_env env, napi_callback_info info) {
  return Guard(env, [&]() -> napi_value {
    size_t argc = 0;
    NativeRoot* root = UnwrapRoot(env, info, &argc, nullptr);
    root->RemoveRoot();
    napi_value result;
    CheckNapi(env, napi_get_undefined(env, &result), "Return root cleanup result");
    return result;
  });
}

napi_value RootExists(napi_env env, napi_callback_info info) {
  return Guard(env, [&]() -> napi_value {
    size_t argc = 2;
    napi_value args[2];
    CheckNapi(env, napi_get_cb_info(env, info, &argc, args, nullptr, nullptr), "Read rootExists call");
    if (argc != 2) throw NativeFilesystemError("invalid_path", "rootExists requires project root and root segments.");
    std::wstring project_root = Utf8ToWide(GetString(env, args[0], "project root"));
    std::vector<std::wstring> segments = GetSegments(env, args[1], "root segments");
    bool exists = true;
    try {
      std::vector<UniqueHandle> chain;
      chain.push_back(OpenAbsoluteDirectory(project_root));
      for (const std::wstring& segment : segments) {
        chain.push_back(OpenDirectoryRelative(
            chain.back().get(),
            segment,
            false,
            false,
            "Inspect creator root component",
            0,
            false));
      }
    } catch (const NativeFilesystemError& error) {
      if (error.code() == "not_found") {
        exists = false;
      } else {
        throw;
      }
    }
    napi_value result;
    CheckNapi(env, napi_get_boolean(env, exists, &result), "Return rootExists result");
    return result;
  });
}

napi_value GetProcessIdentity(napi_env env, napi_callback_info info) {
  return Guard(env, [&]() -> napi_value {
    size_t argc = 1;
    napi_value args[1];
    CheckNapi(env, napi_get_cb_info(env, info, &argc, args, nullptr, nullptr), "Read process identity call");
    if (argc != 1) throw NativeFilesystemError("invalid_path", "Process identity requires one process id.");
    int64_t process_id = 0;
    CheckNapi(env, napi_get_value_int64(env, args[0], &process_id), "Read process identity id");
    if (process_id <= 0 || process_id > static_cast<int64_t>(MAXDWORD)) {
      throw NativeFilesystemError("invalid_path", "Process identity id is invalid.");
    }
    UniqueHandle process(OpenProcess(
        PROCESS_QUERY_LIMITED_INFORMATION | SYNCHRONIZE,
        FALSE,
        static_cast<DWORD>(process_id)));
    if (!process.valid()) {
      DWORD error = GetLastError();
      if (error == ERROR_INVALID_PARAMETER || error == ERROR_NOT_FOUND) {
        throw NativeFilesystemError("not_found", "Process identity is no longer live.");
      }
      ThrowWindowsError("Inspect process identity", error);
    }
    DWORD wait_result = WaitForSingleObject(process.get(), 0);
    if (wait_result == WAIT_OBJECT_0) {
      throw NativeFilesystemError("not_found", "Process identity is no longer live.");
    }
    if (wait_result != WAIT_TIMEOUT) ThrowWindowsError("Inspect process liveness", GetLastError());
    FILETIME creation_time{};
    FILETIME exit_time{};
    FILETIME kernel_time{};
    FILETIME user_time{};
    if (!GetProcessTimes(
            process.get(), &creation_time, &exit_time, &kernel_time, &user_time)) {
      ThrowWindowsError("Inspect process start identity", GetLastError());
    }
    ULARGE_INTEGER creation{};
    creation.LowPart = creation_time.dwLowDateTime;
    creation.HighPart = creation_time.dwHighDateTime;
    std::string identity = "windows-filetime:" + std::to_string(creation.QuadPart);
    napi_value result;
    CheckNapi(
        env,
        napi_create_string_utf8(env, identity.c_str(), identity.size(), &result),
        "Return process identity");
    return result;
  });
}

napi_value Initialize(napi_env env, napi_value exports) {
  napi_property_descriptor methods[] = {
      {"ensureDirectory", nullptr, RootEnsureDirectory, nullptr, nullptr, nullptr, napi_default, nullptr},
      {"createDirectoryExclusive", nullptr, RootCreateDirectoryExclusive, nullptr, nullptr, nullptr, napi_default, nullptr},
      {"stat", nullptr, RootStat, nullptr, nullptr, nullptr, napi_default, nullptr},
      {"listDirectory", nullptr, RootListDirectory, nullptr, nullptr, nullptr, napi_default, nullptr},
      {"readFile", nullptr, RootReadFile, nullptr, nullptr, nullptr, napi_default, nullptr},
      {"writeAtomicExclusive", nullptr, RootWriteAtomicExclusive, nullptr, nullptr, nullptr, napi_default, nullptr},
      {"writeAtomicReplace", nullptr, RootWriteAtomicReplace, nullptr, nullptr, nullptr, napi_default, nullptr},
      {"compareDeleteExact", nullptr, RootCompareDeleteExact, nullptr, nullptr, nullptr, napi_default, nullptr},
      {"publishTreeExclusive", nullptr, RootPublishTreeExclusive, nullptr, nullptr, nullptr, napi_default, nullptr},
      {"renameExclusive", nullptr, RootRenameExclusive, nullptr, nullptr, nullptr, napi_default, nullptr},
      {"removeTree", nullptr, RootRemoveTree, nullptr, nullptr, nullptr, napi_default, nullptr},
      {"close", nullptr, RootClose, nullptr, nullptr, nullptr, napi_default, nullptr},
      {"removeRoot", nullptr, RootRemoveRoot, nullptr, nullptr, nullptr, napi_default, nullptr},
  };
  napi_value constructor;
  CheckNapi(
      env,
      napi_define_class(
          env,
          "Root",
          NAPI_AUTO_LENGTH,
          RootConstructor,
          nullptr,
          sizeof(methods) / sizeof(methods[0]),
          methods,
          &constructor),
      "Define native Root class");
  CheckNapi(env, napi_create_reference(env, constructor, 1, &g_root_constructor), "Retain native Root constructor");
  CheckNapi(env, napi_set_named_property(env, exports, "Root", constructor), "Export native Root class");
  napi_property_descriptor root_exists = {
      "rootExists", nullptr, RootExists, nullptr, nullptr, nullptr, napi_default, nullptr};
  napi_property_descriptor process_identity = {
      "getProcessIdentity", nullptr, GetProcessIdentity, nullptr, nullptr, nullptr, napi_default, nullptr};
  napi_property_descriptor static_methods[] = {root_exists, process_identity};
  CheckNapi(
      env,
      napi_define_properties(env, exports, 2, static_methods),
      "Export native static methods");
  return exports;
}

}  // namespace

extern "C" __declspec(dllexport) napi_value napi_register_module_v1(
    napi_env env,
    napi_value exports) {
  if (!ResolveCodexForgeNodeApi()) return nullptr;
  return Initialize(env, exports);
}

#else
#error codexforge_creator_filesystem is Windows-only
#endif
