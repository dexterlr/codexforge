import "server-only";

// @ts-expect-error Next ships this pinned server parser without TypeScript declarations.
import htmlParserModule from "next/dist/compiled/node-html-parser/index.js";
import type { CreatorValidationIssue } from "./creator-types";

type ParsedHtmlNode = {
  tagName?: string;
  text?: string;
  childNodes?: ParsedHtmlNode[];
  parentNode?: ParsedHtmlNode | null;
  getAttribute(name: string): string | undefined;
  querySelector(selector: string): ParsedHtmlNode | null;
  querySelectorAll(selector: string): ParsedHtmlNode[];
};

type HtmlParser = {
  parse(source: string, options?: Record<string, unknown>): ParsedHtmlNode;
};
const htmlParserImport = htmlParserModule as HtmlParser | HtmlParser["parse"];
const htmlParser: HtmlParser =
  typeof htmlParserImport === "function"
    ? { parse: htmlParserImport }
    : htmlParserImport;

type ScannedElement = Readonly<{
  name: string;
  attributes: Readonly<Record<string, string | true>>;
}>;

type MarkupScanResult =
  | Readonly<{ ok: true; elements: readonly ScannedElement[] }>
  | Readonly<{ ok: false; message: string }>;

const HTML_VOID_ELEMENTS = new Set(["br", "hr", "img", "input", "link", "meta"]);
const HTML_TEXT_ONLY_ELEMENTS = new Set(["option", "script", "textarea", "title"]);
const HTML_PHRASING_ELEMENTS = new Set([
  "a",
  "br",
  "button",
  "em",
  "img",
  "input",
  "label",
  "meter",
  "progress",
  "select",
  "small",
  "span",
  "strong",
  "textarea",
  "time",
]);
const HTML_WHITESPACE_ONLY_CONTENT_ELEMENTS = new Set([
  "html",
  "head",
  "ul",
  "ol",
  "dl",
  "select",
  "table",
  "thead",
  "tbody",
  "tfoot",
  "tr",
]);
const HTML_INTERACTIVE_DESCENDANT_ELEMENTS = new Set(["a", "button", "details", "form", "input", "label", "select", "summary", "textarea"]);
const HTML_LABELABLE_ELEMENTS = new Set(["button", "input", "meter", "progress", "select", "textarea"]);
const HTML_BOOLEAN_ATTRIBUTES = new Set([
  "checked",
  "defer",
  "disabled",
  "hidden",
  "multiple",
  "open",
  "required",
  "selected",
]);

function scanRestrictedMarkup(source: string, mode: "html" | "svg"): MarkupScanResult {
  const onlyGrammarWhitespace = mode === "html"
    ? (value: string) => /^[\t\n\f\r ]*$/.test(value)
    : (value: string) => /^[\t\n\r ]*$/.test(value);
  const leadingGrammarWhitespace = mode === "html" ? /^[\t\n\f\r ]+/ : /^[\t\n\r ]+/;
  const optionalGrammarWhitespace = mode === "html" ? /^[\t\n\f\r ]*/ : /^[\t\n\r ]*/;
  const closingGrammarTail = mode === "html" ? /^[\t\n\f\r ]*>/ : /^[\t\n\r ]*>/;
  if (
    source.includes("\0") ||
    (mode === "html"
      ? /[\u0001-\u0008\u000b\u000e-\u001f\u007f]/.test(source)
      : /[\u0001-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(source))
  ) {
    return { ok: false, message: "Control characters are forbidden in markup." };
  }
  if (/<!--|<!\[CDATA\[|<!ENTITY|<!ATTLIST|<\?|<%/i.test(source)) {
    return { ok: false, message: "Comments, declarations, entities, CDATA, and processing instructions are forbidden." };
  }

  let index = 0;
  if (mode === "html") {
    const doctype = /^[\t\n\f\r ]*<!doctype html>[\t\n\f\r ]*/i.exec(source);
    if (!doctype) return { ok: false, message: "HTML must begin with the exact HTML doctype." };
    index = doctype[0].length;
  } else if (/<!doctype/i.test(source)) {
    return { ok: false, message: "SVG declarations and doctypes are forbidden." };
  }

  const elements: ScannedElement[] = [];
  const stack: string[] = [];
  const expectedRoot = mode === "html" ? "html" : "svg";
  let rootSeen = false;
  while (index < source.length) {
    const nextTag = source.indexOf("<", index);
    const textEnd = nextTag < 0 ? source.length : nextTag;
    const text = source.slice(index, textEnd);
    const textParent = stack.at(-1) ?? null;
    if (stack.length === 0 && !onlyGrammarWhitespace(text)) {
      return { ok: false, message: "Non-whitespace content outside the document root is forbidden." };
    }
    if (
      mode === "html" &&
      textParent !== null &&
      HTML_WHITESPACE_ONLY_CONTENT_ELEMENTS.has(textParent) &&
      !onlyGrammarWhitespace(text)
    ) {
      return { ok: false, message: `Element <${textParent}> permits only semantic element children and grammar whitespace.` };
    }
    if (nextTag < 0) {
      index = source.length;
      break;
    }
    index = nextTag + 1;
    if (source[index] === "!") {
      return { ok: false, message: "Unsupported markup declaration." };
    }

    let closing = false;
    if (source[index] === "/") {
      closing = true;
      index += 1;
    }

    const nameMatch = /^[A-Za-z][A-Za-z0-9-]*/.exec(source.slice(index));
    if (!nameMatch) return { ok: false, message: "Malformed markup tag." };
    const rawName = nameMatch[0];
    const name = mode === "html" ? rawName.toLowerCase() : rawName;
    index += rawName.length;

    const currentParent = stack.at(-1) ?? null;
    if (
      mode === "html" &&
      currentParent &&
      HTML_TEXT_ONLY_ELEMENTS.has(currentParent) &&
      (!closing || name !== currentParent)
    ) {
      return { ok: false, message: `Element <${currentParent}> cannot contain markup tags in the safe HTML subset.` };
    }

    if (closing) {
      const closingTail = closingGrammarTail.exec(source.slice(index));
      if (!closingTail) return { ok: false, message: `Malformed closing tag for ${rawName}.` };
      index += closingTail[0].length;
      const expected = stack.pop();
      if (expected !== name) {
        return { ok: false, message: `Markup tags are not explicitly balanced at ${rawName}.` };
      }
      continue;
    }

    if (stack.length === 0) {
      if (rootSeen || name !== expectedRoot) {
        return { ok: false, message: `Markup requires one exact top-level <${expectedRoot}> root.` };
      }
      rootSeen = true;
    }
    if (mode === "html" && currentParent === "select" && name !== "option") {
      return { ok: false, message: "Select elements may contain only explicit option elements in the safe HTML subset." };
    }
    if (mode === "html") {
      const requiredParents: Readonly<Record<string, readonly string[]>> = {
        li: ["ul", "ol"],
        dt: ["dl"],
        dd: ["dl"],
        legend: ["fieldset"],
        option: ["select"],
        caption: ["table"],
        thead: ["table"],
        tbody: ["table"],
        tfoot: ["table"],
        tr: ["thead", "tbody", "tfoot"],
        th: ["tr"],
        td: ["tr"],
      };
      const exactParents = requiredParents[name];
      if (exactParents && (!currentParent || !exactParents.includes(currentParent))) {
        return { ok: false, message: `Element <${name}> requires one exact semantic parent in the safe HTML subset.` };
      }
      if (
        ((currentParent === "ul" || currentParent === "ol") && name !== "li") ||
        (currentParent === "dl" && name !== "dt" && name !== "dd") ||
        (currentParent === "table" && !["caption", "thead", "tbody", "tfoot"].includes(name)) ||
        (["thead", "tbody", "tfoot"].includes(currentParent ?? "") && name !== "tr") ||
        (currentParent === "tr" && name !== "th" && name !== "td")
      ) {
        return { ok: false, message: `Element <${currentParent}> contains an unsupported semantic child <${name}>.` };
      }
      if (currentParent === "head" && !["title", "meta", "link", "script"].includes(name)) {
        return { ok: false, message: `Element <head> contains an unsupported document-metadata child <${name}>.` };
      }
      const phrasingOnlyAncestor = [...stack]
        .reverse()
        .find((ancestor) => ancestor === "p" || /^h[1-6]$/.test(ancestor));
      if (phrasingOnlyAncestor && !HTML_PHRASING_ELEMENTS.has(name)) {
        return { ok: false, message: `Element <${phrasingOnlyAncestor}> cannot contain non-phrasing descendant <${name}>.` };
      }
    }
    if (
      mode === "html" &&
       ((stack.includes("button") && HTML_INTERACTIVE_DESCENDANT_ELEMENTS.has(name)) ||
         (stack.includes("a") && HTML_INTERACTIVE_DESCENDANT_ELEMENTS.has(name)) ||
         (stack.includes("summary") && HTML_INTERACTIVE_DESCENDANT_ELEMENTS.has(name)) ||
         (stack.includes("form") && name === "form") ||
         (stack.includes("label") && HTML_INTERACTIVE_DESCENDANT_ELEMENTS.has(name) && !HTML_LABELABLE_ELEMENTS.has(name)))
     ) {
      return { ok: false, message: "Interactive descendants are forbidden inside links, buttons, summaries, forms, and labels except for one exact labelable control." };
    }

    const attributes: Record<string, string | true> = {};
    let selfClosing = false;
    let openingTagTerminated = false;
    while (index < source.length) {
      const whitespace = leadingGrammarWhitespace.exec(source.slice(index));
      if (whitespace) index += whitespace[0].length;
      if (index >= source.length) break;
      if (source.startsWith("/>", index)) {
        selfClosing = true;
        openingTagTerminated = true;
        index += 2;
        break;
      }
      if (source[index] === ">") {
        openingTagTerminated = true;
        index += 1;
        break;
      }
      const attributeMatch = /^[A-Za-z_:][A-Za-z0-9_.:-]*/.exec(source.slice(index));
      if (!attributeMatch) return { ok: false, message: `Malformed attribute on ${rawName}.` };
      const rawAttributeName = attributeMatch[0];
      const attributeName = mode === "html" ? rawAttributeName.toLowerCase() : rawAttributeName;
      const foldedAttributeName = rawAttributeName.toLowerCase();
      if (Object.keys(attributes).some((key) => key.toLowerCase() === foldedAttributeName)) {
        return { ok: false, message: `Duplicate attribute ${rawAttributeName} is forbidden.` };
      }
      index += rawAttributeName.length;
      const afterName = optionalGrammarWhitespace.exec(source.slice(index))?.[0] ?? "";
      index += afterName.length;
      if (source[index] !== "=") {
        if (mode !== "html" || !HTML_BOOLEAN_ATTRIBUTES.has(attributeName)) {
          return { ok: false, message: `Attribute ${rawAttributeName} must have a quoted value.` };
        }
        attributes[attributeName] = true;
        continue;
      }
      index += 1;
      const afterEquals = optionalGrammarWhitespace.exec(source.slice(index))?.[0] ?? "";
      index += afterEquals.length;
      const quote = source[index];
      if (quote !== '"' && quote !== "'") {
        return { ok: false, message: `Attribute ${rawAttributeName} must use quotes.` };
      }
      index += 1;
      const valueEnd = source.indexOf(quote, index);
      if (valueEnd < 0) return { ok: false, message: `Attribute ${rawAttributeName} is unterminated.` };
      const value = source.slice(index, valueEnd);
      if (/[<&\u0000-\u001f\u007f]/.test(value)) {
        return { ok: false, message: `Attribute ${rawAttributeName} contains unsafe characters.` };
      }
      attributes[attributeName] = value;
      index = valueEnd + 1;
    }
    if (!openingTagTerminated) {
      return { ok: false, message: `Opening tag for ${rawName} is unterminated.` };
    }

    const voidElement = mode === "html" && HTML_VOID_ELEMENTS.has(name);
    if (mode === "html" && selfClosing && !voidElement) {
      return { ok: false, message: `Self-closing syntax is forbidden for non-void HTML element ${rawName}.` };
    }
    elements.push({ name, attributes });
    if (!selfClosing && !voidElement) stack.push(name);
  }

  if (!rootSeen) {
    return { ok: false, message: `Markup requires one exact top-level <${expectedRoot}> root.` };
  }
  if (stack.length > 0) {
    return { ok: false, message: `Markup is missing an explicit closing tag for ${stack.at(-1)}.` };
  }
  return { ok: true, elements };
}

const HTML_ALLOWED_TAGS = new Set([
  "a", "article", "aside", "body", "br", "button", "caption", "details", "div",
  "dl", "dt", "dd", "em", "fieldset", "footer", "form", "h1", "h2", "h3", "h4",
  "h5", "h6", "head", "header", "hr", "html", "img", "input", "label", "legend",
  "li", "link", "main", "meta", "meter", "nav", "ol", "option", "p", "progress",
  "script", "section", "select", "small", "span", "strong", "summary", "table", "tbody",
  "td", "textarea", "tfoot", "th", "thead", "time", "title", "tr", "ul",
]);

const HTML_GLOBAL_ATTRIBUTES = new Set(["class", "dir", "hidden", "id", "lang", "role", "tabindex", "title"]);
const HTML_ARIA_ATTRIBUTES = new Set([
  "aria-atomic",
  "aria-describedby",
  "aria-hidden",
  "aria-label",
  "aria-live",
]);
const HTML_ARIA_LABEL_ELEMENTS = new Set([
  "a", "button", "img", "input", "meter", "progress", "select", "summary", "textarea",
  "div", "p", "section", "span",
]);
const HTML_NATIVE_INTERACTIVE_ELEMENTS = new Set(["a", "button", "input", "select", "summary", "textarea"]);
const HTML_TAG_ATTRIBUTES: Readonly<Record<string, ReadonlySet<string>>> = {
  a: new Set(["href"]),
  button: new Set(["disabled", "type"]),
  details: new Set(["open"]),
  html: new Set(["lang"]),
  img: new Set(["alt", "height", "src", "width"]),
  input: new Set(["checked", "disabled", "id", "max", "min", "name", "placeholder", "required", "step", "type", "value"]),
  label: new Set(["for"]),
  link: new Set(["href", "rel"]),
  meta: new Set(["charset", "content", "name"]),
  meter: new Set(["high", "low", "max", "min", "optimum", "value"]),
  ol: new Set(["start"]),
  option: new Set(["disabled", "selected", "value"]),
  progress: new Set(["max", "value"]),
  script: new Set(["defer", "src", "type"]),
  select: new Set(["disabled", "id", "multiple", "name", "required"]),
  td: new Set([]),
  textarea: new Set(["cols", "disabled", "id", "name", "placeholder", "required", "rows"]),
  th: new Set(["scope"]),
  time: new Set(["datetime"]),
};

function markupIssue(
  code: string,
  stage: number,
  filePath: string,
  message: string,
  suggestedRepairContext: string
): CreatorValidationIssue {
  return {
    code,
    stage,
    severity: "error",
    filePath,
    message,
    suggestedRepairContext,
    blocksMaterialization: true,
  };
}

function markupWarning(
  code: string,
  stage: number,
  filePath: string,
  message: string,
  suggestedRepairContext: string
): CreatorValidationIssue {
  return {
    code,
    stage,
    severity: "warning",
    filePath,
    message,
    suggestedRepairContext,
    blocksMaterialization: false,
  };
}

function isAllowedHtmlAttribute(tag: string, attribute: string): boolean {
  return (
    HTML_GLOBAL_ATTRIBUTES.has(attribute) ||
    HTML_TAG_ATTRIBUTES[tag]?.has(attribute) === true ||
    HTML_ARIA_ATTRIBUTES.has(attribute) ||
    /^data-[a-z0-9_-]+$/.test(attribute)
  );
}

function isBoundedPositiveHtmlInteger(
  value: string,
  maximum: number
): boolean {
  return /^(?:[1-9]\d*)$/.test(value) &&
    value.length <= String(maximum).length &&
    Number(value) <= maximum;
}

function parsedTagName(node: ParsedHtmlNode | null | undefined): string | null {
  return typeof node?.tagName === "string" ? node.tagName.toLowerCase() : null;
}

function parsedElementChildren(node: ParsedHtmlNode): ParsedHtmlNode[] {
  return node.childNodes?.filter((child) => parsedTagName(child) !== null) ?? [];
}

function hasOnlyGrammarWhitespaceBeforeChild(
  parent: ParsedHtmlNode,
  target: ParsedHtmlNode | undefined
): boolean {
  if (!target) return false;
  for (const child of parent.childNodes ?? []) {
    if (child === target) return true;
    if (parsedTagName(child) !== null || !/^[\t\n\f\r ]*$/.test(child.text ?? "")) return false;
  }
  return false;
}

function hasParsedAttribute(node: ParsedHtmlNode, name: string): boolean {
  return node.getAttribute(name) !== undefined;
}

function hasAncestorTag(node: ParsedHtmlNode, tagName: string): boolean {
  let current: ParsedHtmlNode | null | undefined = node.parentNode;
  while (current) {
    if (parsedTagName(current) === tagName) return true;
    current = current.parentNode;
  }
  return false;
}

function isInsideCollapsedDetails(node: ParsedHtmlNode): boolean {
  let child: ParsedHtmlNode = node;
  let current: ParsedHtmlNode | null | undefined = node.parentNode;
  while (current) {
    if (
      parsedTagName(current) === "details" &&
      !hasParsedAttribute(current, "open") &&
      parsedTagName(child) !== "summary"
    ) {
      return true;
    }
    child = current;
    current = current.parentNode;
  }
  return false;
}

function hasHiddenAttributeInChain(node: ParsedHtmlNode): boolean {
  let current: ParsedHtmlNode | null | undefined = node;
  while (current) {
    if (typeof current.getAttribute === "function" && hasParsedAttribute(current, "hidden")) return true;
    current = current.parentNode;
  }
  return isInsideCollapsedDetails(node);
}

function hasAriaHiddenInChain(node: ParsedHtmlNode): boolean {
  let current: ParsedHtmlNode | null | undefined = node;
  while (current) {
    if (typeof current.getAttribute === "function" && current.getAttribute("aria-hidden")?.trim().toLowerCase() === "true") {
      return true;
    }
    current = current.parentNode;
  }
  return false;
}

function isExposedMarkupNode(node: ParsedHtmlNode): boolean {
  return !hasHiddenAttributeInChain(node) && !hasAriaHiddenInChain(node);
}

function visibleMarkupText(node: ParsedHtmlNode): string {
  if (!isExposedMarkupNode(node)) return "";
  if (!node.childNodes?.length) return node.text ?? "";
  return node.childNodes.map((child) => visibleMarkupText(child)).join("");
}

function hasMeaningfulAccessibleText(value: string | null | undefined): boolean {
  if (typeof value !== "string" || /\p{Cf}/u.test(value)) return false;
  return /[\p{L}\p{N}\p{P}\p{S}]/u.test(value.normalize("NFKC"));
}

function containsForbiddenDecodedHtmlControl(value: string): boolean {
  for (const character of value) {
    if (
      (/^\p{Cc}$/u.test(character) && !["\t", "\n", "\f", "\r"].includes(character)) ||
      /^\p{Cf}$/u.test(character) ||
      /^\p{Cs}$/u.test(character)
    ) {
      return true;
    }
  }
  return false;
}

function isValidCreatorLanguageTag(value: string): boolean {
  return value.length <= 35 &&
    /^[A-Za-z]{2,3}(?:-[A-Za-z]{4})?(?:-(?:[A-Za-z]{2}|\d{3}))?(?:-(?:[A-Za-z0-9]{5,8}|\d[A-Za-z0-9]{3}))*$/.test(value);
}

function hasNativeRequiredRole(node: ParsedHtmlNode, role: "heading" | "main"): boolean {
  const explicitRole = node.getAttribute("role")?.trim().toLowerCase();
  return explicitRole === undefined || explicitRole === role;
}

function isSafeLocalReference(value: string): boolean {
  return (
    value.length > 0 &&
    value.length <= 120 &&
    !value.includes("&") &&
    !value.includes("%") &&
    !value.includes("\\") &&
    !value.includes("?") &&
    !value.startsWith("/") &&
    !value.startsWith("//") &&
    !/^[A-Za-z][A-Za-z0-9+.-]*:/.test(value) &&
    !/(^|\/)\.\.(?:\/|$)/.test(value) &&
    !value.split("/").some((segment) => !segment || segment === ".")
  );
}

export type CreatorLocalReference = Readonly<{
  sourcePath: string;
  reference: string;
  expectedExtension: string | null;
}>;

export type CreatorHtmlValidationResult = Readonly<{
  issues: readonly CreatorValidationIssue[];
  references: readonly CreatorLocalReference[];
  domTargets: readonly CreatorHtmlDomTarget[];
}>;

export type CreatorHtmlDomTarget = Readonly<{
  id: string;
  elementName: string;
  hasElementChildren: boolean;
  inputType: string | null;
}>;

export function validateCreatorHtml(
  filePath: string,
  content: string
): CreatorHtmlValidationResult {
  const issues: CreatorValidationIssue[] = [];
  const references: CreatorLocalReference[] = [];
  const domTargets: CreatorHtmlDomTarget[] = [];
  const fragmentReferences: string[] = [];
  const scan = scanRestrictedMarkup(content, "html");
  if (!scan.ok) {
    return {
      issues: [markupIssue("html.syntax_subset", 4, filePath, scan.message, "Return explicit, balanced HTML with quoted attributes and no unsupported declarations.")],
      references,
      domTargets,
    };
  }

  const ids = new Set<string>();
  for (const element of scan.elements) {
    if (!HTML_ALLOWED_TAGS.has(element.name)) {
      issues.push(markupIssue("html.element_forbidden", 4, filePath, `Element <${element.name}> is outside the safe static HTML subset.`, "Use an allowlisted semantic HTML element."));
      continue;
    }
    for (const [attribute, rawValue] of Object.entries(element.attributes)) {
      const value = rawValue === true ? "" : rawValue;
      if (attribute.startsWith("on") || attribute === "style" || !isAllowedHtmlAttribute(element.name, attribute)) {
        issues.push(markupIssue("html.attribute_forbidden", 4, filePath, `Attribute ${attribute} on <${element.name}> is forbidden.`, "Remove inline behavior and unsupported attributes."));
      }
      if (
        element.name === "img" &&
        (attribute === "width" || attribute === "height") &&
        !isBoundedPositiveHtmlInteger(value, 4096)
      ) {
        issues.push(markupIssue("html.dimension_invalid", 4, filePath, `Image ${attribute} must be a decimal integer from 1 through 4096.`, "Use one bounded intrinsic image dimension without signs, units, fractions, exponents, or whitespace."));
      }
      if (
        element.name === "textarea" &&
        ((attribute === "rows" && !isBoundedPositiveHtmlInteger(value, 40)) ||
          (attribute === "cols" && !isBoundedPositiveHtmlInteger(value, 120)))
      ) {
        issues.push(markupIssue("html.dimension_invalid", 4, filePath, `Textarea ${attribute} is outside the bounded static layout policy.`, "Use rows from 1 through 40 and cols from 1 through 120 without signs, units, fractions, exponents, or whitespace."));
      }
      if (attribute === "id") {
        if (!/^[A-Za-z][A-Za-z0-9_-]{0,63}$/.test(value) || ids.has(value)) {
          issues.push(markupIssue("html.id_invalid_or_duplicate", 4, filePath, "HTML IDs must be unique bounded ASCII identifiers.", "Use a unique ID that begins with a letter."));
        }
        ids.add(value);
      }
      if (attribute === "tabindex" && (!HTML_NATIVE_INTERACTIVE_ELEMENTS.has(element.name) || value !== "0")) {
        issues.push(markupIssue("a11y.keyboard_order", 8, filePath, "tabindex is limited to zero on native interactive elements.", "Use native controls and links in logical DOM order without positive or removed tab stops."));
      }
      if (attribute === "lang" && !isValidCreatorLanguageTag(value)) {
        issues.push(markupIssue("a11y.language_invalid", 8, filePath, "Language tags must use one bounded conservative BCP 47 form.", "Use a valid language tag such as en, en-GB, ar, zh-Hans-CN, or es-419."));
      }
      if (attribute === "dir" && !/^(?:ltr|rtl|auto)$/i.test(value)) {
        issues.push(markupIssue("a11y.direction_invalid", 8, filePath, "Text direction must use one exact supported semantic value.", "Use dir=ltr, dir=rtl, or dir=auto only when an explicit direction is required."));
      }
      if (attribute === "role") {
        const validRole =
          (element.name === "main" && value === "main") ||
          (element.name === "h1" && value === "heading") ||
          (["div", "p", "section", "span"].includes(element.name) && ["alert", "status"].includes(value)) ||
          (element.name === "img" && ["img", "none", "presentation"].includes(value));
        if (!validRole) {
          issues.push(markupIssue("a11y.role_invalid", 8, filePath, "ARIA roles cannot replace native interactive or required document semantics in the static v0 subset.", "Use native semantic elements, or a bounded alert or status role on passive content."));
        }
      }
      if (attribute === "aria-hidden" && value !== "true" && value !== "false") {
        issues.push(markupIssue("a11y.aria_value_invalid", 8, filePath, "aria-hidden must be exactly true or false.", "Use an exact supported ARIA boolean value."));
      }
      if (attribute === "aria-label" && !HTML_ARIA_LABEL_ELEMENTS.has(element.name)) {
        issues.push(markupIssue("a11y.aria_name_invalid", 8, filePath, "aria-label is limited to supported interactive, image, and passive live-region elements.", "Use native visible semantics or one meaningful label on a supported element."));
      }
      if (
        attribute === "aria-describedby" &&
        !/^[A-Za-z][A-Za-z0-9_-]{0,63}(?: [A-Za-z][A-Za-z0-9_-]{0,63})*$/.test(value)
      ) {
        issues.push(markupIssue("a11y.aria_reference_invalid", 8, filePath, "aria-describedby must contain bounded space-separated local IDs.", "Reference one or more existing visible descriptive elements by exact unique ID."));
      }
      if (attribute === "aria-live" && !["off", "polite", "assertive"].includes(value)) {
        issues.push(markupIssue("a11y.aria_value_invalid", 8, filePath, "aria-live must be exactly off, polite, or assertive.", "Use one exact supported live-region politeness value."));
      }
      if (attribute === "aria-atomic" && !["true", "false"].includes(value)) {
        issues.push(markupIssue("a11y.aria_value_invalid", 8, filePath, "aria-atomic must be exactly true or false.", "Use one exact supported ARIA boolean value."));
      }
      if (attribute === "aria-labelledby") {
        issues.push(markupIssue("a11y.name_override_forbidden", 8, filePath, "aria-labelledby is outside the unambiguous accessible-name subset.", "Use meaningful visible text, an explicit native label, alt text, or one meaningful literal aria-label without ID references."));
      }
    }

    if (element.name === "form") {
      issues.push(markupIssue("html.form_forbidden", 4, filePath, "Forms are outside the non-navigating static preview subset.", "Use labelled local controls and explicit type=\"button\" interactions without a form submission context."));
    }
    if (element.name === "a" && typeof element.attributes.href !== "string") {
      issues.push(markupIssue("html.anchor_href_required", 4, filePath, "Anchors require one exact safe local href.", "Use a validated same-document fragment or local static document reference."));
    }
    if (element.name === "button" && element.attributes.type !== "button") {
      issues.push(markupIssue("html.button_type_required", 4, filePath, "Buttons must declare type=\"button\" in the non-submitting static subset.", "Set type=\"button\" explicitly and use a bounded local event handler."));
    }

    const href = typeof element.attributes.href === "string" ? element.attributes.href : null;
    const src = typeof element.attributes.src === "string" ? element.attributes.src : null;
    for (const [attribute, reference] of [["href", href], ["src", src]] as const) {
      if (reference === null) continue;
      const expectedResourceExtension =
        element.name === "script" && attribute === "src"
          ? ".js"
          : element.name === "link" && attribute === "href"
            ? ".css"
            : element.name === "img" && attribute === "src"
              ? ".svg"
              : null;
      if (expectedResourceExtension && reference.includes("#")) {
        issues.push(
          markupIssue(
            "html.resource_fragment_forbidden",
            4,
            filePath,
            `A ${element.name} resource must reference one complete typed local file without a fragment.`,
            `Reference one exact inventory ${expectedResourceExtension} file without a fragment.`
          )
        );
        continue;
      }
      if (reference.startsWith("#")) {
        if (
          element.name !== "a" ||
          attribute !== "href" ||
          !/^#[A-Za-z][A-Za-z0-9_-]{0,63}$/.test(reference)
        ) {
          issues.push(markupIssue("html.fragment_invalid", 6, filePath, `Invalid local fragment in ${attribute}.`, "Use a fragment that resolves to a unique local ID."));
        } else fragmentReferences.push(reference.slice(1));
        continue;
      }
      if (!isSafeLocalReference(reference)) {
        issues.push(markupIssue("html.reference_unsafe", 4, filePath, `Unsafe or external ${attribute} reference is forbidden.`, "Reference one exact project-local file without a scheme, query, encoding, or traversal."));
        continue;
      }
      references.push({
        sourcePath: filePath,
        reference,
        expectedExtension: expectedResourceExtension,
      });
    }

    if (element.name === "script") {
      if (typeof element.attributes.src !== "string" || element.attributes.defer !== true) {
        issues.push(markupIssue("html.script_contract", 4, filePath, "Scripts must be empty classic external scripts with src and defer.", "Move all script content to an allowlisted local .js file and use a defer script tag."));
      }
      if (element.attributes.type !== undefined && element.attributes.type !== "text/javascript") {
        issues.push(markupIssue("html.script_type", 4, filePath, "Only classic text/javascript files are allowed.", "Remove the type attribute or use text/javascript."));
      }
    }
    if (element.name === "link" && element.attributes.rel !== "stylesheet") {
      issues.push(markupIssue("html.link_contract", 4, filePath, "Only local stylesheet links are allowed.", "Use rel=\"stylesheet\" with an exact local .css file."));
    }
    if (element.name === "meta") {
      const charset = element.attributes.charset;
      const name = element.attributes.name;
      if (charset !== undefined && String(charset).toLowerCase() !== "utf-8") {
        issues.push(markupIssue("html.charset_invalid", 7, filePath, "The charset must be utf-8.", "Use <meta charset=\"utf-8\">."));
      }
      if (name !== undefined && name !== "viewport") {
        issues.push(markupIssue("html.meta_forbidden", 4, filePath, "Only charset and viewport metadata are allowed.", "Remove unsupported metadata."));
      }
    }
    if (
      element.name === "input" &&
      typeof element.attributes.type === "string" &&
      !["button", "checkbox", "number", "radio", "range", "text"].includes(
        element.attributes.type.toLowerCase()
      )
    ) {
      issues.push(markupIssue("html.input_type_forbidden", 4, filePath, "This input type is outside the local static v0 subset.", "Use text, number, range, checkbox, radio, or button controls without file/device access."));
    }
  }

  for (const fragment of fragmentReferences) {
    if (!ids.has(fragment)) {
      issues.push(markupIssue("html.fragment_missing", 6, filePath, `Local fragment #${fragment} does not resolve in this document.`, "Reference an existing unique local ID."));
    }
  }

  try {
    const root = htmlParser.parse(content, { comment: false, lowerCaseTagName: true });
    if (containsForbiddenDecodedHtmlControl(root.text ?? "")) {
      issues.push(markupIssue("html.decoded_control_or_format_character", 4, filePath, "Decoded HTML text contains an invisible control, format, or unpaired-surrogate character.", "Remove character references that decode to direction, isolation, zero-width, control, or unpaired-surrogate characters."));
    }
    const exactCount = (selector: string) => root.querySelectorAll(selector).length;
    if (
      exactCount("html") !== 1 ||
      exactCount("head") !== 1 ||
      exactCount("body") !== 1 ||
      exactCount("title") !== 1 ||
      exactCount("main") !== 1 ||
      exactCount("h1") !== 1
    ) {
      issues.push(markupIssue("html.structure_required", 7, filePath, "HTML requires exactly one html, head, body, title, main, and h1 element.", "Return one complete semantic HTML document with the required structure."));
    }
    const html = root.querySelector("html");
    const head = root.querySelector("head");
    const body = root.querySelector("body");
    const title = root.querySelector("title");
    const main = root.querySelector("main");
    const primaryHeading = root.querySelector("h1");
    for (const labelled of root.querySelectorAll("[aria-label]")) {
      if (!hasMeaningfulAccessibleText(labelled.getAttribute("aria-label"))) {
        issues.push(markupIssue("a11y.aria_name_invalid", 8, filePath, "aria-label must contain meaningful exposed text whenever it is present.", "Remove the overriding aria-label or replace it with a meaningful literal accessible name."));
      }
    }
    for (const described of root.querySelectorAll("[aria-describedby]")) {
      const references = described.getAttribute("aria-describedby")?.split(" ") ?? [];
      if (
        references.length < 1 ||
        new Set(references).size !== references.length ||
        references.some((reference) => {
          const targets = root.querySelectorAll(`#${reference}`);
          return targets.length !== 1 ||
            !isExposedMarkupNode(targets[0]) ||
            !hasMeaningfulAccessibleText(visibleMarkupText(targets[0]));
        })
      ) {
        issues.push(markupIssue("a11y.aria_reference_invalid", 8, filePath, "aria-describedby must resolve once to visible meaningful local descriptions.", "Reference unique visible descriptive text by exact local ID."));
      }
    }
    for (const target of root.querySelectorAll("[id]")) {
      const id = target.getAttribute("id");
      const elementName = parsedTagName(target);
      if (id && elementName) {
        domTargets.push({
          id,
          elementName,
          hasElementChildren: Boolean(target.childNodes?.some((child) => parsedTagName(child) !== null)),
          inputType: elementName === "input" ? target.getAttribute("type")?.trim().toLowerCase() ?? "text" : null,
        });
      }
    }
    const htmlElementChildren = html?.childNodes?.map(parsedTagName).filter((name): name is string => Boolean(name)) ?? [];
    if (
      !html ||
      !head ||
      !body ||
      !title ||
      !main ||
      !primaryHeading ||
      parsedTagName(head.parentNode) !== "html" ||
      parsedTagName(body.parentNode) !== "html" ||
      parsedTagName(title.parentNode) !== "head" ||
      htmlElementChildren.length !== 2 ||
      htmlElementChildren[0] !== "head" ||
      htmlElementChildren[1] !== "body" ||
      !hasAncestorTag(main, "body") ||
      !hasAncestorTag(primaryHeading, "main")
    ) {
      issues.push(markupIssue("html.document_topology", 7, filePath, "HTML requires head then body as direct html children, title under head, main under body, and h1 under main.", "Return one browser-consistent semantic document topology."));
    }
    if (!html?.getAttribute("lang")?.trim()) {
      issues.push(markupIssue("a11y.html_lang", 8, filePath, "The html element requires a non-empty lang attribute.", "Add an accurate lang attribute to html."));
    }
    const charsetMetas = root.querySelectorAll("meta[charset]");
    const viewportMetas = root.querySelectorAll('meta[name="viewport"]');
    const viewportContent = viewportMetas[0]?.getAttribute("content");
    if (
      charsetMetas.length !== 1 ||
      viewportMetas.length !== 1 ||
      charsetMetas[0] === viewportMetas[0] ||
      parsedTagName(charsetMetas[0]?.parentNode) !== "head" ||
      parsedTagName(viewportMetas[0]?.parentNode) !== "head" ||
      charsetMetas[0]?.getAttribute("charset")?.trim().toLowerCase() !== "utf-8" ||
      viewportContent !== "width=device-width, initial-scale=1"
    ) {
      issues.push(markupIssue("html.metadata_required", 7, filePath, "HTML requires one direct UTF-8 charset meta and one exact zoom-preserving viewport meta under head.", "Use exactly meta charset=utf-8 and meta name=viewport content=\"width=device-width, initial-scale=1\" as separate head children."));
    }
    if (!hasMeaningfulAccessibleText(title?.text) || !primaryHeading || !hasMeaningfulAccessibleText(visibleMarkupText(primaryHeading))) {
      issues.push(markupIssue("a11y.names_required", 8, filePath, "The title and h1 require visible text.", "Give the page and primary heading meaningful text."));
    }
    if (
      !body ||
      !main ||
      !primaryHeading ||
      !isExposedMarkupNode(body) ||
      !isExposedMarkupNode(main) ||
      !isExposedMarkupNode(primaryHeading) ||
      !hasNativeRequiredRole(main, "main") ||
      !hasNativeRequiredRole(primaryHeading, "heading")
    ) {
      issues.push(markupIssue("a11y.required_semantics_hidden", 8, filePath, "The body, main landmark, and primary h1 must remain rendered and exposed with their native semantics.", "Remove hidden or aria-hidden ancestors, collapsed details, and role overrides from required page content."));
    }
    if (!root.querySelector("header") || !root.querySelector("footer")) {
      issues.push(markupWarning("a11y.optional_page_landmarks", 8, filePath, "The page omits a header or footer landmark; materialization remains safe but navigation structure may be less complete.", "Add concise header and footer landmarks when they suit the approved design."));
    }
    for (const image of root.querySelectorAll("img")) {
      const alt = image.getAttribute("alt");
      const ariaLabel = image.getAttribute("aria-label");
      const role = image.getAttribute("role")?.trim().toLowerCase();
      if (alt === undefined) {
        issues.push(markupIssue("a11y.image_alt", 8, filePath, "Every image requires an alt attribute.", "Add meaningful alt text or alt=\"\" for decorative images."));
      } else if (alt !== "" && !hasMeaningfulAccessibleText(alt)) {
        issues.push(markupIssue("a11y.image_alt", 8, filePath, "Image alternative text cannot be whitespace or invisible formatting characters.", "Use meaningful alternative text, or exact alt=\"\" for a decorative image."));
      } else if (role === "img" && !hasMeaningfulAccessibleText(alt) && !hasMeaningfulAccessibleText(ariaLabel)) {
        issues.push(markupIssue("a11y.image_alt", 8, filePath, "An exposed image role requires a meaningful accessible name.", "Use meaningful alt text or an accurate aria-label for role=\"img\"."));
      } else if ((role === "none" || role === "presentation") && alt !== "") {
        issues.push(markupIssue("a11y.image_alt", 8, filePath, "A presentational image must use exact empty alternative text.", "Use alt=\"\" with role=\"none\" or role=\"presentation\"."));
      }
    }
    for (const script of root.querySelectorAll("script")) {
      if (script.text?.trim()) {
        issues.push(markupIssue("html.inline_script", 4, filePath, "Inline script content is forbidden.", "Move all JavaScript into the referenced local .js file."));
      }
    }
    const labelableElements = root.querySelectorAll("button,input,meter,progress,select,textarea");
    const validExplicitLabelIds = new Set<string>();
    for (const label of root.querySelectorAll("label")) {
      const nestedLabelableElements = label.querySelectorAll("button,input,meter,progress,select,textarea");
      const explicitTarget = label.getAttribute("for");
      const matchingExplicitElements = explicitTarget === undefined
        ? []
        : labelableElements.filter((candidate) => candidate.getAttribute("id") === explicitTarget);
      const explicitTargetMatchesNested =
        nestedLabelableElements.length === 0 ||
        (matchingExplicitElements.length === 1 && nestedLabelableElements[0] === matchingExplicitElements[0]);
      if (
        nestedLabelableElements.length > 1 ||
        (explicitTarget === undefined && nestedLabelableElements.length !== 1) ||
        (explicitTarget !== undefined && (matchingExplicitElements.length !== 1 || !explicitTargetMatchesNested))
      ) {
        issues.push(markupIssue("a11y.label_ambiguous", 8, filePath, "Each label must identify exactly one matching labelable control.", "Use one for/id pair, or wrap exactly one labelable control without a conflicting for attribute."));
        continue;
      }
      if (
        explicitTarget !== undefined &&
        isExposedMarkupNode(label) &&
        hasMeaningfulAccessibleText(visibleMarkupText(label))
      ) {
        validExplicitLabelIds.add(explicitTarget);
      }
    }
    for (const details of root.querySelectorAll("details")) {
      const elementChildren = parsedElementChildren(details);
      const summaries = elementChildren.filter((child) => parsedTagName(child) === "summary");
      const summary = summaries[0];
      if (
        summaries.length !== 1 ||
        elementChildren[0] !== summary ||
        !hasOnlyGrammarWhitespaceBeforeChild(details, summary) ||
        !summary ||
        !isExposedMarkupNode(summary) ||
        (!hasMeaningfulAccessibleText(visibleMarkupText(summary)) && !hasMeaningfulAccessibleText(summary.getAttribute("aria-label")))
      ) {
        issues.push(markupIssue("a11y.details_summary", 8, filePath, "Every details disclosure requires one first, visible, meaningfully named summary.", "Place exactly one meaningful summary as the first element child of details."));
      }
    }
    for (const summary of root.querySelectorAll("summary")) {
      if (parsedTagName(summary.parentNode) !== "details") {
        issues.push(markupIssue("a11y.details_summary", 8, filePath, "Every summary requires one immediate details disclosure parent.", "Place the summary as the first and only summary element child of details."));
      }
    }
    for (const list of root.querySelectorAll("ul,ol")) {
      const children = parsedElementChildren(list);
      if (
        children.length < 1 ||
        children.some((child) => parsedTagName(child) !== "li" || !hasMeaningfulAccessibleText(visibleMarkupText(child)))
      ) {
        issues.push(markupIssue("a11y.semantic_group_invalid", 8, filePath, "Lists require one or more immediate meaningful list-item children.", "Place meaningful li elements directly under each ul or ol."));
      }
    }
    for (const listItem of root.querySelectorAll("li")) {
      if (!["ul", "ol"].includes(parsedTagName(listItem.parentNode) ?? "")) {
        issues.push(markupIssue("a11y.semantic_group_invalid", 8, filePath, "List items require an immediate list parent.", "Place each li directly under a ul or ol."));
      }
    }
    for (const select of root.querySelectorAll("select")) {
      const options = parsedElementChildren(select);
      if (
        options.length < 1 ||
        options.some((option) =>
          parsedTagName(option) !== "option" ||
          !isExposedMarkupNode(option) ||
          !hasMeaningfulAccessibleText(visibleMarkupText(option)))
      ) {
        issues.push(markupIssue("a11y.semantic_group_invalid", 8, filePath, "Select controls require one or more immediate meaningful option children.", "Add at least one visible meaningfully named option directly under select."));
      }
    }
    for (const descriptionList of root.querySelectorAll("dl")) {
      const children = parsedElementChildren(descriptionList);
      if (
        children.length < 2 ||
        children.length % 2 !== 0 ||
        children.some((child, index) =>
          parsedTagName(child) !== (index % 2 === 0 ? "dt" : "dd") ||
          !hasMeaningfulAccessibleText(visibleMarkupText(child)))
      ) {
        issues.push(markupIssue("a11y.semantic_group_invalid", 8, filePath, "Description lists require exact meaningful dt/dd pairs.", "Place alternating meaningful dt then dd elements directly under dl."));
      }
    }
    for (const fieldset of root.querySelectorAll("fieldset")) {
      const children = parsedElementChildren(fieldset);
      const legends = children.filter((child) => parsedTagName(child) === "legend");
      if (
        legends.length !== 1 ||
        children[0] !== legends[0] ||
        !hasOnlyGrammarWhitespaceBeforeChild(fieldset, legends[0]) ||
        !hasMeaningfulAccessibleText(visibleMarkupText(legends[0]))
      ) {
        issues.push(markupIssue("a11y.semantic_group_invalid", 8, filePath, "Fieldsets require one meaningful first legend.", "Place exactly one meaningful legend as the first element child of fieldset."));
      }
    }
    for (const table of root.querySelectorAll("table")) {
      const children = parsedElementChildren(table);
      const childNames = children.map(parsedTagName);
      const caption = children[0];
      const thead = children[1];
      const tbody = children[2];
      const topologyValid =
        (childNames.length === 3 || childNames.length === 4) &&
        childNames[0] === "caption" &&
        childNames[1] === "thead" &&
        childNames[2] === "tbody" &&
        (childNames.length === 3 || childNames[3] === "tfoot");
      const headRows = thead ? parsedElementChildren(thead) : [];
      const bodyRows = tbody ? parsedElementChildren(tbody) : [];
      const footerRows = childNames[3] === "tfoot" ? parsedElementChildren(children[3]) : [];
      const expectedColumnCount = headRows.length > 0 ? parsedElementChildren(headRows[0]).length : 0;
      const rowSetsValid =
        headRows.length > 0 &&
        bodyRows.length > 0 &&
        (childNames[3] !== "tfoot" || footerRows.length > 0) &&
        [...headRows, ...bodyRows, ...footerRows].every((row) => {
          const cells = parsedElementChildren(row);
          return cells.length === expectedColumnCount && cells.every((cell, index) => {
            const tag = parsedTagName(cell);
            if (!hasMeaningfulAccessibleText(visibleMarkupText(cell))) return false;
            if (headRows.includes(row)) return tag === "th" && cell.getAttribute("scope")?.toLowerCase() === "col";
            if (tag === "th") return index === 0 && cell.getAttribute("scope")?.toLowerCase() === "row";
            return tag === "td";
          });
        });
      if (!topologyValid || !caption || !hasMeaningfulAccessibleText(visibleMarkupText(caption)) || !rowSetsValid) {
        issues.push(markupIssue("a11y.table_structure", 8, filePath, "Tables require a meaningful caption, scoped column headers, a tbody, and conservative row/cell topology.", "Use caption, thead with scope=col headers, tbody rows with td cells or one leading scope=row header, and optional tfoot."));
      }
    }
    if (root.querySelectorAll("nav").filter((node) => isExposedMarkupNode(node)).length > 1) {
      issues.push(markupIssue("a11y.landmark_ambiguous", 8, filePath, "The static v0 subset permits at most one exposed navigation landmark.", "Combine navigation links into one exposed nav landmark."));
    }
    for (const control of root.querySelectorAll("input,meter,progress,select,textarea")) {
      const type = control.getAttribute("type")?.toLowerCase();
      if (type === "hidden") continue;
      if (hasHiddenAttributeInChain(control)) continue;
      if (hasAriaHiddenInChain(control)) {
        issues.push(markupIssue("a11y.interactive_hidden", 8, filePath, "Interactive controls cannot be hidden only from assistive technology.", "Remove aria-hidden from the control and its rendered ancestors."));
        continue;
      }
      const id = control.getAttribute("id") ?? "";
      let labelAncestor: ParsedHtmlNode | null | undefined = control.parentNode;
      while (labelAncestor && parsedTagName(labelAncestor) !== "label") labelAncestor = labelAncestor.parentNode;
      const nestedLabelableElements = labelAncestor?.querySelectorAll("button,input,meter,progress,select,textarea") ?? [];
      const parentIsLabel = Boolean(
        labelAncestor &&
        nestedLabelableElements.length === 1 &&
        nestedLabelableElements[0] === control &&
        (labelAncestor.getAttribute("for") === undefined || labelAncestor.getAttribute("for") === id) &&
        isExposedMarkupNode(labelAncestor) &&
        hasMeaningfulAccessibleText(visibleMarkupText(labelAncestor))
      );
      if (!hasMeaningfulAccessibleText(control.getAttribute("aria-label")) && !validExplicitLabelIds.has(id) && !parentIsLabel) {
        issues.push(markupIssue("a11y.control_label", 8, filePath, "Every form control requires an associated label or aria-label.", "Associate a label using for/id or add an accurate aria-label."));
      }
    }
    for (const button of root.querySelectorAll("button")) {
      if (hasHiddenAttributeInChain(button)) continue;
      if (hasAriaHiddenInChain(button)) {
        issues.push(markupIssue("a11y.interactive_hidden", 8, filePath, "Interactive buttons cannot be hidden only from assistive technology.", "Remove aria-hidden from the button and its rendered ancestors."));
      } else if (!hasMeaningfulAccessibleText(visibleMarkupText(button)) && !hasMeaningfulAccessibleText(button.getAttribute("aria-label"))) {
        issues.push(markupIssue("a11y.button_name", 8, filePath, "Every button requires an accessible name.", "Add visible button text or aria-label."));
      }
    }
    for (const anchor of root.querySelectorAll("a")) {
      if (hasHiddenAttributeInChain(anchor)) continue;
      if (hasAriaHiddenInChain(anchor)) {
        issues.push(markupIssue("a11y.interactive_hidden", 8, filePath, "Interactive links cannot be hidden only from assistive technology.", "Remove aria-hidden from the link and its rendered ancestors."));
      } else if (!hasMeaningfulAccessibleText(visibleMarkupText(anchor)) && !hasMeaningfulAccessibleText(anchor.getAttribute("aria-label"))) {
        issues.push(markupIssue("a11y.link_name", 8, filePath, "Every link requires an accessible name.", "Add visible link text or aria-label."));
      }
    }
  } catch {
    issues.push(markupIssue("html.parse_failed", 7, filePath, "HTML could not be parsed into the required structure.", "Return one complete well-formed HTML document."));
  }

  return { issues, references, domTargets };
}

const SVG_ALLOWED_ELEMENTS = new Set([
  "svg", "g", "path", "rect", "circle", "ellipse", "line", "polyline", "polygon", "text",
  "title", "desc", "defs", "linearGradient", "radialGradient", "stop", "clipPath", "mask",
]);
const SVG_ALLOWED_ATTRIBUTES = new Set([
  "xmlns", "viewBox", "width", "height", "role", "aria-label", "aria-labelledby", "id", "class",
  "x", "y", "x1", "x2", "y1", "y2", "cx", "cy", "r", "rx", "ry", "d", "points",
  "fill", "fill-opacity", "fill-rule", "stroke", "stroke-width", "stroke-linecap",
  "stroke-linejoin", "stroke-opacity", "opacity", "transform", "gradientUnits", "gradientTransform",
  "offset", "stop-color", "stop-opacity", "clip-path", "mask",
]);

function isBoundedSvgViewBox(value: unknown): boolean {
  if (typeof value !== "string") return false;
  const number = "[+-]?(?:\\d+(?:\\.\\d*)?|\\.\\d+)(?:[eE][+-]?\\d+)?";
  const separator = "(?:[\\t\\n\\r ]*,[\\t\\n\\r ]*|[\\t\\n\\r ]+)";
  const match = new RegExp(`^[\\t\\n\\r ]*(${number})${separator}(${number})${separator}(${number})${separator}(${number})[\\t\\n\\r ]*$`).exec(value);
  if (!match) return false;
  const values = match.slice(1).map(Number);
  return values.every((candidate) => Number.isFinite(candidate) && Math.abs(candidate) <= 1_000_000) && values[2] > 0 && values[3] > 0;
}

function isBoundedPositiveSvgNumber(value: unknown): boolean {
  if (typeof value !== "string" || !/^(?:\d+(?:\.\d*)?|\.\d+)$/.test(value)) return false;
  const numeric = Number(value);
  return Number.isFinite(numeric) && numeric > 0 && numeric <= 1_000_000;
}

export function validateCreatorSvg(
  filePath: string,
  content: string
): readonly CreatorValidationIssue[] {
  const issues: CreatorValidationIssue[] = [];
  if (content.includes("&")) {
    issues.push(markupIssue("svg.entity_forbidden", 4, filePath, "SVG entities and entity references are forbidden.", "Use literal passive SVG values without entities."));
  }
  const scan = scanRestrictedMarkup(content, "svg");
  if (!scan.ok) {
    return [...issues, markupIssue("svg.syntax_subset", 4, filePath, scan.message, "Return a balanced passive SVG subset without declarations or executable content.")];
  }
  const ids = new Map<string, Readonly<{ elementName: string; elementIndex: number }>>();
  const duplicateIds = new Set<string>();
  scan.elements.forEach((element, elementIndex) => {
    const rawId = element.attributes.id;
    if (typeof rawId !== "string") return;
    if (!/^[A-Za-z][A-Za-z0-9_-]{0,63}$/.test(rawId)) {
      issues.push(markupIssue("svg.id_invalid_or_duplicate", 4, filePath, "SVG IDs must be unique bounded ASCII identifiers.", "Use one unique local SVG ID."));
      return;
    }
    if (ids.has(rawId)) {
      duplicateIds.add(rawId);
      issues.push(markupIssue("svg.id_invalid_or_duplicate", 4, filePath, "SVG IDs must be unique bounded ASCII identifiers.", "Use one unique local SVG ID."));
      return;
    }
    ids.set(rawId, { elementName: element.name, elementIndex });
  });
  const typedUrlTargets: Readonly<Record<string, ReadonlySet<string>>> = {
    fill: new Set(["linearGradient", "radialGradient"]),
    stroke: new Set(["linearGradient", "radialGradient"]),
    "clip-path": new Set(["clipPath"]),
    mask: new Set(["mask"]),
  };
  scan.elements.forEach((element, elementIndex) => {
    if (!SVG_ALLOWED_ELEMENTS.has(element.name)) {
      issues.push(markupIssue("svg.element_forbidden", 4, filePath, `SVG element <${element.name}> is forbidden.`, "Use only passive shape, text, grouping, gradient, clip, and mask elements."));
    }
    for (const [attribute, rawValue] of Object.entries(element.attributes)) {
      const value = rawValue === true ? "" : rawValue;
      if (
        !SVG_ALLOWED_ATTRIBUTES.has(attribute) ||
        attribute.toLowerCase().startsWith("on") ||
        /(?:href|xlink|style)/i.test(attribute)
      ) {
        issues.push(markupIssue("svg.attribute_forbidden", 4, filePath, `SVG attribute ${attribute} is forbidden.`, "Remove executable, external-reference, namespace, and unsupported attributes."));
      }
      if (attribute === "aria-labelledby") {
        issues.push(markupIssue("a11y.name_override_forbidden", 8, filePath, "SVG aria-labelledby references are outside the unambiguous passive subset.", "Use one meaningful literal aria-label on the SVG when an internal accessible name is required."));
      }
      if (attribute === "aria-label" && !hasMeaningfulAccessibleText(value)) {
        issues.push(markupIssue("a11y.aria_name_invalid", 8, filePath, "SVG aria-label must contain meaningful literal text.", "Use a meaningful literal aria-label or rely on the validated outer image alternative text."));
      }
      if (attribute === "aria-label" && element.name !== "svg") {
        issues.push(markupIssue("a11y.svg_name_scope", 8, filePath, "Accessible SVG names are only supported on the one document root.", "Name the root SVG as one passive image, or rely on the validated outer image alternative text."));
      }
      if (attribute === "role" && element.name !== "svg") {
        issues.push(markupIssue("a11y.svg_role_invalid", 8, filePath, "SVG child elements cannot introduce independent ARIA roles in the passive subset.", "Remove child roles and keep the SVG as one passive image resource."));
      }
      if (attribute === "xmlns" && value !== "http://www.w3.org/2000/svg") {
        issues.push(markupIssue("svg.namespace_invalid", 4, filePath, "SVG xmlns must be the standard SVG namespace.", "Use xmlns=\"http://www.w3.org/2000/svg\"."));
      }
      if (value.includes("\\")) {
        issues.push(markupIssue("svg.escape_forbidden", 4, filePath, "SVG attribute escapes are outside the unambiguous passive subset.", "Use literal passive SVG attribute values without CSS or character escapes."));
      }
      if (/url\(/i.test(value)) {
        const fragment = /^url\(#[A-Za-z][A-Za-z0-9_-]{0,63}\)$/.exec(value)?.[0].slice(5, -1);
        const target = fragment ? ids.get(fragment) : undefined;
        const expectedTypes = typedUrlTargets[attribute];
        if (
          !fragment ||
          !expectedTypes ||
          !target ||
          duplicateIds.has(fragment) ||
          target.elementIndex >= elementIndex ||
          !expectedTypes.has(target.elementName)
        ) {
          issues.push(markupIssue("svg.reference_unsafe", 4, filePath, "SVG resource references must use an exact typed prior-element local fragment.", "Use fill/stroke with an earlier gradient, clip-path with an earlier clipPath, or mask with an earlier mask; do not place url() in other attributes."));
        }
      }
      const isExactSvgNamespace =
        attribute === "xmlns" && value === "http://www.w3.org/2000/svg";
      if (!isExactSvgNamespace && /\b(?:https?|javascript|data|file|blob):|\/\//i.test(value)) {
        issues.push(markupIssue("svg.url_forbidden", 4, filePath, "External and dangerous SVG URL schemes are forbidden.", "Remove all external SVG references."));
      }
    }
  });
  if (scan.elements.filter((element) => element.name === "svg").length !== 1) {
    issues.push(markupIssue("svg.root_required", 7, filePath, "SVG requires exactly one svg root element.", "Return one complete SVG document."));
  }
  const root = scan.elements.find((element) => element.name === "svg");
  const rootRole = root?.attributes.role;
  const rootAriaLabel = root?.attributes["aria-label"];
  if (
    (rootRole !== undefined && !["img", "none", "presentation"].includes(String(rootRole).toLowerCase())) ||
    (String(rootRole).toLowerCase() === "img" && !hasMeaningfulAccessibleText(typeof rootAriaLabel === "string" ? rootAriaLabel : null)) ||
    (["none", "presentation"].includes(String(rootRole).toLowerCase()) && rootAriaLabel !== undefined)
  ) {
    issues.push(markupIssue("a11y.svg_role_invalid", 8, filePath, "SVG role must remain passive and consistent with its literal accessible name.", "Omit role, use role=img with one meaningful aria-label, or use a nameless none/presentation role when the outer image supplies its alternative text."));
  }
  if (
    root?.attributes.xmlns !== "http://www.w3.org/2000/svg" ||
    !isBoundedSvgViewBox(root.attributes.viewBox) ||
    (root.attributes.width !== undefined && !isBoundedPositiveSvgNumber(root.attributes.width)) ||
    (root.attributes.height !== undefined && !isBoundedPositiveSvgNumber(root.attributes.height))
  ) {
    issues.push(markupIssue("svg.root_contract", 9, filePath, "SVG requires the standard namespace and a bounded viewBox.", "Add the exact SVG namespace and a numeric viewBox."));
  }
  return issues;
}
