import { mergeAttributes, Node } from "@tiptap/core";
import type { DOMOutputSpec } from "@tiptap/pm/model";

export interface BookmarkAttrs {
  url: string;
  title: string | null;
  description: string | null;
  image: string | null;
  favicon: string | null;
  siteName: string | null;
}

function getAttr(el: Element, name: string) {
  const value = el.getAttribute(name);
  return value && value.length > 0 ? value : null;
}

const Bookmark = Node.create({
  name: "bookmark",
  group: "block",
  atom: true,
  draggable: true,

  addAttributes() {
    return {
      url: { default: null },
      title: { default: null },
      description: { default: null },
      image: { default: null },
      favicon: { default: null },
      siteName: { default: null },
    };
  },

  parseHTML() {
    return [
      {
        tag: "a[data-bookmark]",
        // 기본 Link 마크의 a[href] 규칙보다 먼저 매칭되도록 우선순위를 높게 준다
        priority: 100,
        getAttrs: (el) => {
          if (typeof el === "string") return false;
          return {
            url: el.getAttribute("href"),
            title: getAttr(el, "data-title"),
            description: getAttr(el, "data-description"),
            image: getAttr(el, "data-image"),
            favicon: getAttr(el, "data-favicon"),
            siteName: getAttr(el, "data-site-name"),
          };
        },
      },
    ];
  },

  renderHTML({ node }) {
    const { url, title, description, image, favicon, siteName } =
      node.attrs as BookmarkAttrs;

    let hostname = "";
    try {
      hostname = new URL(url).hostname;
    } catch {
      hostname = url;
    }

    const rowChildren: DOMOutputSpec[] = [];

    if (favicon) {
      rowChildren.push([
        "img",
        { src: favicon, class: "link-bookmark-favicon", alt: "" },
      ]);
    }
    rowChildren.push(["span", { class: "link-bookmark-title" }, title || url]);
    rowChildren.push([
      "span",
      { class: "link-bookmark-domain" },
      siteName || hostname,
    ]);

    return [
      "a",
      mergeAttributes({
        "data-bookmark": "",
        href: url,
        "data-title": title ?? "",
        "data-description": description ?? "",
        "data-image": image ?? "",
        "data-favicon": favicon ?? "",
        "data-site-name": siteName ?? "",
        target: "_blank",
        rel: "noopener noreferrer",
        class: "link-bookmark",
        contenteditable: "false",
      }),
      ...rowChildren,
    ];
  },
});

export default Bookmark;
