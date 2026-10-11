"use client";

import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type SubmitEvent,
} from "react";
import { useRouter } from "next/navigation";
import NextImage from "next/image";
import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { common, createLowlight } from "lowlight";
import { slugify } from "@/lib/slugify";
import { CODE_LANGUAGES } from "@/lib/highlight";
import type { BlogPost } from "@/lib/blog";
import Bookmark from "./bookmarkExtension";

const lowlight = createLowlight(common);

// 북마크 카드도 <a href> 태그로 렌더링되므로, 기본 Link 마크가 이를 가로채 일반
// 링크 텍스트로 파싱하지 않도록 data-bookmark가 있는 태그는 제외한다.
const BookmarkAwareLink = Link.extend({
  parseHTML() {
    return [{ tag: "a[href]:not([data-bookmark])" }];
  },
});

interface BlogEditorProps {
  mode: "create" | "edit";
  post?: BlogPost;
}

function ToolbarButton({
  onClick,
  active,
  disabled,
  label,
  title,
}: {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  label: string;
  title: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      disabled={disabled}
      className={`typo-navi rounded-md px-2.5 py-1.5 transition-colors disabled:opacity-40 ${
        active
          ? "bg-white/20 text-white"
          : "text-white/60 hover:bg-white/10 hover:text-white"
      }`}
    >
      {label}
    </button>
  );
}

function Toolbar({
  editor,
  onImageClick,
  onLinkClick,
  uploadingImage,
}: {
  editor: Editor;
  onImageClick: () => void;
  onLinkClick: () => void;
  uploadingImage: boolean;
}) {
  return (
    <div className="mb-2 flex flex-wrap gap-1 rounded-lg border border-white/10 bg-white/5 p-1.5">
      <ToolbarButton
        label="B"
        title="굵게"
        active={editor.isActive("bold")}
        onClick={() => editor.chain().focus().toggleBold().run()}
      />
      <ToolbarButton
        label="I"
        title="기울임"
        active={editor.isActive("italic")}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      />
      <ToolbarButton
        label="S"
        title="취소선"
        active={editor.isActive("strike")}
        onClick={() => editor.chain().focus().toggleStrike().run()}
      />
      <span className="mx-1 w-px bg-white/10" />
      <ToolbarButton
        label="H1"
        title="제목 1"
        active={editor.isActive("heading", { level: 1 })}
        onClick={() =>
          editor.chain().focus().toggleHeading({ level: 1 }).run()
        }
      />
      <ToolbarButton
        label="H2"
        title="제목 2"
        active={editor.isActive("heading", { level: 2 })}
        onClick={() =>
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        }
      />
      <ToolbarButton
        label="H3"
        title="제목 3"
        active={editor.isActive("heading", { level: 3 })}
        onClick={() =>
          editor.chain().focus().toggleHeading({ level: 3 }).run()
        }
      />
      <span className="mx-1 w-px bg-white/10" />
      <ToolbarButton
        label="• 목록"
        title="글머리 기호 목록"
        active={editor.isActive("bulletList")}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      />
      <ToolbarButton
        label="1. 목록"
        title="번호 매기기 목록"
        active={editor.isActive("orderedList")}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      />
      <ToolbarButton
        label="인용"
        title="인용구"
        active={editor.isActive("blockquote")}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
      />
      <ToolbarButton
        label="</>"
        title="인라인 코드"
        active={editor.isActive("code")}
        onClick={() => editor.chain().focus().toggleCode().run()}
      />
      <ToolbarButton
        label="코드 블록"
        title="코드 블록"
        active={editor.isActive("codeBlock")}
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
      />
      {editor.isActive("codeBlock") && (
        <select
          title="코드 블록 언어"
          value={
            (editor.getAttributes("codeBlock").language as string | null) ?? ""
          }
          onChange={(e) =>
            editor
              .chain()
              .focus()
              .updateAttributes("codeBlock", {
                language: e.target.value || null,
              })
              .run()
          }
          className="typo-navi rounded-md bg-white/10 px-2 py-1.5 text-white outline-none"
        >
          {CODE_LANGUAGES.map(({ value, label }) => (
            <option key={value} value={value} className="bg-neutral-900">
              {label}
            </option>
          ))}
        </select>
      )}
      <ToolbarButton
        label="구분선"
        title="구분선 삽입"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
      />
      <span className="mx-1 w-px bg-white/10" />
      <ToolbarButton
        label="링크"
        title="선택한 글자에 링크 걸기, 선택이 없으면 북마크 카드 삽입"
        active={editor.isActive("link")}
        onClick={onLinkClick}
      />
      <ToolbarButton
        label={uploadingImage ? "업로드 중..." : "이미지"}
        title="내 컴퓨터에서 이미지 업로드"
        disabled={uploadingImage}
        onClick={onImageClick}
      />
      <span className="mx-1 w-px bg-white/10" />
      <ToolbarButton
        label="실행 취소"
        title="실행 취소"
        onClick={() => editor.chain().focus().undo().run()}
      />
      <ToolbarButton
        label="다시 실행"
        title="다시 실행"
        onClick={() => editor.chain().focus().redo().run()}
      />
    </div>
  );
}

export default function BlogEditor({ mode, post }: BlogEditorProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(mode === "edit");
  const [description, setDescription] = useState(post?.description ?? "");
  const [date, setDate] = useState(
    post?.date ?? new Date().toISOString().slice(0, 10),
  );
  const [problem, setProblem] = useState(post?.problem ?? "");
  const [solution, setSolution] = useState(post?.solution ?? "");
  const [result, setResult] = useState(post?.result ?? "");
  const [thumbnail, setThumbnail] = useState(post?.thumbnail ?? "");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingThumbnail, setUploadingThumbnail] = useState(false);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ codeBlock: false }),
      CodeBlockLowlight.configure({ lowlight, defaultLanguage: "typescript" }),
      BookmarkAwareLink.configure({
        openOnClick: false,
        protocols: ["http", "https", "mailto"],
      }),
      Image,
      Bookmark,
      Placeholder.configure({
        placeholder: "이야기를 적어보세요...",
      }),
    ],
    content: post?.content ?? "",
    editorProps: {
      attributes: {
        class: "markdown-body min-h-[480px] px-4 py-3 outline-none",
      },
      // 편집 중에는 북마크 카드 클릭 시 페이지 이탈 대신 카드 선택만 되도록 막는다
      handleClickOn: (_view, _pos, node) => {
        if (node.type.name === "bookmark") return true;
        return false;
      },
    },
  });

  useEffect(() => {
    if (editor && post) {
      editor.commands.setContent(post.content);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor, post?.slug]);

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!slugTouched) {
      setSlug(slugify(value));
    }
  };

  const handleImageButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file || !editor) return;

    setUploadingImage(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/blog/upload", {
      method: "POST",
      body: formData,
    });

    setUploadingImage(false);

    if (!res.ok) {
      const data = await res.json().catch(() => null);
      setError(data?.error ?? "이미지 업로드에 실패했습니다.");
      return;
    }

    const data = await res.json();
    editor.chain().focus().setImage({ src: data.url }).run();
  };

  const handleThumbnailButtonClick = () => {
    thumbnailInputRef.current?.click();
  };

  const handleThumbnailFileChange = async (
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    setUploadingThumbnail(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/blog/upload", {
      method: "POST",
      body: formData,
    });

    setUploadingThumbnail(false);

    if (!res.ok) {
      const data = await res.json().catch(() => null);
      setError(data?.error ?? "이미지 업로드에 실패했습니다.");
      return;
    }

    const data = await res.json();
    setThumbnail(data.url);
  };

  const handleLinkOrBookmark = async () => {
    if (!editor) return;

    const hasSelection = !editor.state.selection.empty;

    if (hasSelection) {
      const prevHref = editor.getAttributes("link").href as
        | string
        | undefined;
      const url = window.prompt("링크 URL을 입력하세요", prevHref ?? "https://");
      if (url === null) return;
      if (url === "") {
        editor.chain().focus().extendMarkRange("link").unsetLink().run();
        return;
      }
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
      return;
    }

    const url = window.prompt(
      "링크 주소를 입력하세요 (북마크 카드로 삽입됩니다)",
      "https://",
    );
    if (!url) return;

    const res = await fetch("/api/blog/link-preview", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    }).catch(() => null);

    const attrs =
      res && res.ok
        ? await res.json()
        : {
            url,
            title: url,
            description: null,
            image: null,
            favicon: null,
            siteName: null,
          };

    editor.chain().focus().insertContent({ type: "bookmark", attrs }).run();
  };

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const content = editor?.getHTML() ?? "";
    const isEmpty = editor?.isEmpty ?? true;

    if (!title.trim() || isEmpty || !date) {
      setError("제목, 날짜, 본문은 필수입니다.");
      return;
    }

    setSaving(true);
    const endpoint =
      mode === "create" ? "/api/blog/posts" : `/api/blog/posts/${post!.slug}`;
    const method = mode === "create" ? "POST" : "PUT";

    const res = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        slug,
        description,
        date,
        content,
        problem,
        solution,
        result,
        thumbnail,
      }),
    });

    setSaving(false);

    if (!res.ok) {
      const data = await res.json().catch(() => null);
      setError(data?.error ?? "저장에 실패했습니다.");
      return;
    }

    const data = await res.json();
    router.push(`/blog/${data.slug ?? post?.slug}`);
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <p className="typo-navi text-red-400">{error}</p>}

      <div className="grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="typo-navi mb-2 block text-white/50">제목</span>
          <input
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className="typo-body w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 outline-none focus:border-white/30"
            placeholder="글 제목"
          />
        </label>
        <label className="block">
          <span className="typo-navi mb-2 block text-white/50">
            slug (URL)
          </span>
          <input
            value={slug}
            onChange={(e) => {
              setSlug(e.target.value);
              setSlugTouched(true);
            }}
            disabled={mode === "edit"}
            className="typo-body w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 outline-none focus:border-white/30 disabled:opacity-50"
            placeholder="my-first-post"
          />
        </label>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="typo-navi mb-2 block text-white/50">날짜</span>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="typo-body w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 outline-none focus:border-white/30"
          />
        </label>
        <label className="block">
          <span className="typo-navi mb-2 block text-white/50">
            요약 (선택)
          </span>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="typo-body w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 outline-none focus:border-white/30"
            placeholder="목록에 보여줄 한 줄 요약"
          />
        </label>
      </div>

      <div className="space-y-4 rounded-lg border border-white/10 bg-white/5 p-4">
        <p className="typo-navi text-white/50">
          목록 카드 노출 정보 (선택)
        </p>
        <label className="block">
          <span className="typo-navi mb-2 block text-white/50">
            대표 이미지
          </span>
          <input
            ref={thumbnailInputRef}
            type="file"
            accept="image/png,image/jpeg,image/gif,image/webp"
            onChange={handleThumbnailFileChange}
            className="hidden"
          />
          {thumbnail ? (
            <div className="flex items-center gap-3">
              <div className="relative h-20 w-32 overflow-hidden rounded-lg">
                <NextImage
                  src={thumbnail}
                  alt=""
                  fill
                  sizes="128px"
                  className="object-cover"
                />
              </div>
              <button
                type="button"
                onClick={handleThumbnailButtonClick}
                disabled={uploadingThumbnail}
                className="typo-navi text-white/60 transition-colors hover:text-white disabled:opacity-50"
              >
                {uploadingThumbnail ? "업로드 중..." : "이미지 변경"}
              </button>
              <button
                type="button"
                onClick={() => setThumbnail("")}
                className="typo-navi text-white/60 transition-colors hover:text-red-400"
              >
                제거
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleThumbnailButtonClick}
              disabled={uploadingThumbnail}
              className="typo-navi rounded-lg border border-white/10 px-4 py-2.5 text-white/60 transition-colors hover:border-white/30 hover:text-white disabled:opacity-50"
            >
              {uploadingThumbnail ? "업로드 중..." : "이미지 업로드"}
            </button>
          )}
        </label>
        <label className="block">
          <span className="typo-navi mb-2 block text-white/50">문제</span>
          <textarea
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            rows={2}
            className="typo-body w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 outline-none focus:border-white/30"
            placeholder="어떤 문제가 있었나요?"
          />
        </label>
        <label className="block">
          <span className="typo-navi mb-2 block text-white/50">
            해결 과정
          </span>
          <textarea
            value={solution}
            onChange={(e) => setSolution(e.target.value)}
            rows={2}
            className="typo-body w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 outline-none focus:border-white/30"
            placeholder="어떻게 해결했나요?"
          />
        </label>
        <label className="block">
          <span className="typo-navi mb-2 block text-white/50">결과</span>
          <textarea
            value={result}
            onChange={(e) => setResult(e.target.value)}
            rows={2}
            className="typo-body w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 outline-none focus:border-white/30"
            placeholder="어떤 결과를 얻었나요?"
          />
        </label>
      </div>

      <div>
        <span className="typo-navi mb-2 block text-white/50">본문</span>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/gif,image/webp"
          onChange={handleImageFileChange}
          className="hidden"
        />
        {editor && (
          <Toolbar
            editor={editor}
            onImageClick={handleImageButtonClick}
            onLinkClick={handleLinkOrBookmark}
            uploadingImage={uploadingImage}
          />
        )}
        <div className="rounded-lg border border-white/10 bg-white/5">
          <EditorContent editor={editor} />
        </div>
      </div>

      <button
        type="submit"
        disabled={saving}
        className="typo-navi rounded-full bg-white/10 px-6 py-3 text-white transition-colors hover:bg-white/20 disabled:opacity-50"
      >
        {saving ? "저장 중..." : mode === "create" ? "발행하기" : "수정 저장"}
      </button>
    </form>
  );
}
