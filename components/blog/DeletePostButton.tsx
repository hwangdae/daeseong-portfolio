"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeletePostButton({ slug }: { slug: string }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm("정말 이 글을 삭제할까요?")) return;

    setDeleting(true);
    const res = await fetch(`/api/blog/posts/${slug}`, { method: "DELETE" });
    setDeleting(false);

    if (res.ok) {
      router.push("/");
      router.refresh();
    } else {
      alert("삭제에 실패했습니다.");
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={deleting}
      className="typo-navi text-white/60 transition-colors hover:text-red-400 disabled:opacity-50"
    >
      {deleting ? "삭제 중..." : "삭제"}
    </button>
  );
}
