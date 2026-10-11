import hljs from "highlight.js/lib/common";

export const CODE_LANGUAGES = [
  { value: "", label: "자동 감지" },
  { value: "typescript", label: "TypeScript" },
  { value: "javascript", label: "JavaScript" },
  { value: "xml", label: "HTML / XML" },
  { value: "css", label: "CSS" },
  { value: "json", label: "JSON" },
  { value: "bash", label: "Bash" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "kotlin", label: "Kotlin" },
  { value: "swift", label: "Swift" },
  { value: "sql", label: "SQL" },
  { value: "yaml", label: "YAML" },
  { value: "markdown", label: "Markdown" },
  { value: "diff", label: "Diff" },
  { value: "plaintext", label: "일반 텍스트" },
] as const;

const CODE_BLOCK_REGEX =
  /<pre><code(?: class="language-([\w+-]+)")?>([\s\S]*?)<\/code><\/pre>/g;

const HTML_ENTITIES: Record<string, string> = {
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
  "&amp;": "&",
};

function decodeEntities(text: string) {
  return text.replace(/&(?:lt|gt|quot|#39|amp);/g, (m) => HTML_ENTITIES[m]);
}

// 에디터가 저장한 HTML의 코드 블록은 하이라이팅 마크업이 없는 순수 텍스트이므로,
// 글을 보여줄 때 서버에서 hljs 토큰 <span>을 입혀준다.
export function highlightCodeBlocks(html: string): string {
  return html.replace(
    CODE_BLOCK_REGEX,
    (_match, language: string | undefined, inner: string) => {
      const code = decodeEntities(inner);
      const hasLanguage = !!language && !!hljs.getLanguage(language);
      const { value, language: detected } = hasLanguage
        ? hljs.highlight(code, { language: language as string })
        : hljs.highlightAuto(code);

      return `<pre><code class="hljs language-${detected ?? "plaintext"}">${value}</code></pre>`;
    },
  );
}
