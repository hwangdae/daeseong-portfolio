export interface TocHeading {
  id: string;
  text: string;
  level: number;
}

const HEADING_REGEX = /<h([1-3])([^>]*)>([\s\S]*?)<\/h\1>/g;

function stripTags(html: string) {
  return html
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function extractToc(html: string): {
  html: string;
  headings: TocHeading[];
} {
  const headings: TocHeading[] = [];
  let index = 0;

  const withIds = html.replace(
    HEADING_REGEX,
    (match, level: string, attrs: string, inner: string) => {
      const id = `heading-${index++}`;
      const text = stripTags(inner);

      if (text) {
        headings.push({ id, text, level: Number(level) });
      }

      return `<h${level} id="${id}"${attrs}>${inner}</h${level}>`;
    },
  );

  return { html: withIds, headings };
}
