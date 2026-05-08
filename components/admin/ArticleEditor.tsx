"use client";

import { useMemo, useState, useTransition } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type ArticleData = {
  slug: string;
  title: string;
  excerpt: string | null;
  contentMd: string;
  heroImage: string | null;
  author: string;
  published: boolean;
};

type Props = {
  initial?: Partial<ArticleData>;
  mode: "create" | "edit";
  articleSlug?: string;
  articlePublished?: boolean;
  onSave: (formData: FormData) => Promise<void>;
  onDelete?: () => Promise<void>;
};

function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function wordCount(text: string): number {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).length;
}

export function ArticleEditor({ initial, mode, articleSlug, articlePublished, onSave, onDelete }: Props) {
  const [slug, setSlug] = useState<string>(initial?.slug ?? "");
  const [title, setTitle] = useState<string>(initial?.title ?? "");
  const [excerpt, setExcerpt] = useState<string>(initial?.excerpt ?? "");
  const [heroImage, setHeroImage] = useState<string>(initial?.heroImage ?? "");
  const [author, setAuthor] = useState<string>(initial?.author ?? "TerraDebt Team");
  const [contentMd, setContentMd] = useState<string>(initial?.contentMd ?? "");
  const [published, setPublished] = useState<boolean>(initial?.published ?? false);
  const [dirty, setDirty] = useState<boolean>(false);
  const [pending, startTransition] = useTransition();

  const words = useMemo(() => wordCount(contentMd), [contentMd]);
  const readMin = Math.max(1, Math.round(words / 200));

  const handleSlugFromTitle = () => {
    if (!title) return;
    setSlug(slugify(title));
    setDirty(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      await onSave(fd);
      setDirty(false);
    });
  };

  const handleDelete = async () => {
    if (!onDelete) return;
    if (!confirm("Delete this article? This cannot be undone.")) return;
    startTransition(async () => { await onDelete(); });
  };

  const previewSlug = articleSlug ?? slug;
  const showPreviewLink = mode === "edit" && (articlePublished ?? published) && previewSlug;

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{mode === "create" ? "New article" : "Edit article"}</h1>
          {mode === "edit" && articleSlug && <p className="text-sm text-muted mt-1 font-mono">{articleSlug}</p>}
        </div>
        <div className="flex items-center gap-3 text-xs">
          {dirty && <span className="text-amber-600 font-semibold">Unsaved changes</span>}
          {!dirty && mode === "edit" && <span className="text-muted">Saved</span>}
          {showPreviewLink && (
            <a href={`/articles/${previewSlug}`} target="_blank" rel="noreferrer" className="px-3 py-1 border border-border rounded-md no-underline">Open public preview</a>
          )}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 grid lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              name="title"
              required
              value={title}
              onChange={(e) => { setTitle(e.target.value); setDirty(true); }}
              className="w-full border border-border rounded-md px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Slug</label>
            <div className="flex gap-2">
              <input
                name="slug"
                required
                value={slug}
                onChange={(e) => { setSlug(e.target.value); setDirty(true); }}
                className="flex-1 border border-border rounded-md px-3 py-2 font-mono text-sm"
              />
              <button type="button" onClick={handleSlugFromTitle} className="px-3 py-2 border border-border rounded-md text-sm">Slug from title</button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Excerpt</label>
            <textarea
              name="excerpt"
              rows={3}
              value={excerpt}
              onChange={(e) => { setExcerpt(e.target.value); setDirty(true); }}
              className="w-full border border-border rounded-md px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Hero image (URL)</label>
            <input
              name="heroImage"
              value={heroImage}
              onChange={(e) => { setHeroImage(e.target.value); setDirty(true); }}
              className="w-full border border-border rounded-md px-3 py-2 font-mono text-sm"
            />
            {heroImage && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={heroImage} alt="hero preview" className="mt-2 h-32 rounded-md border border-border object-cover" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Author</label>
            <input
              name="author"
              value={author}
              onChange={(e) => { setAuthor(e.target.value); setDirty(true); }}
              className="w-full border border-border rounded-md px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Content (Markdown)</label>
            <textarea
              name="contentMd"
              rows={30}
              value={contentMd}
              onChange={(e) => { setContentMd(e.target.value); setDirty(true); }}
              className="w-full border border-border rounded-md px-3 py-2 font-mono text-sm"
            />
            <div className="mt-1 text-xs text-muted font-mono">{words.toLocaleString()} words · ~{readMin} min read</div>
          </div>

          <label className="flex items-center gap-2">
            <input
              name="published"
              type="checkbox"
              checked={published}
              onChange={(e) => { setPublished(e.target.checked); setDirty(true); }}
            />
            <span className="text-sm">Published</span>
          </label>

          <div className="flex gap-2 items-center">
            <button
              type="submit"
              disabled={pending}
              className={`px-4 py-2 rounded-md text-white ${dirty ? "bg-electric animate-pulse" : "bg-electric/80"} disabled:opacity-60`}
            >
              {pending ? "Saving..." : mode === "create" ? "Create" : "Save"}
            </button>
            {mode === "edit" && onDelete && (
              <button type="button" onClick={handleDelete} disabled={pending} className="text-sm text-red-600 ml-auto">Delete article</button>
            )}
          </div>
        </div>

        <div className="lg:sticky lg:top-6 lg:self-start">
          <div className="text-xs text-muted uppercase tracking-wide mb-2">Live preview</div>
          <div className="surface-card p-6 max-h-[80vh] overflow-y-auto">
            <h1 className="text-3xl font-bold">{title || "Untitled"}</h1>
            {excerpt && <p className="mt-3 text-muted">{excerpt}</p>}
            {heroImage && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={heroImage} alt="hero" className="mt-4 w-full rounded-md object-cover max-h-64" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
            )}
            <div className="prose mt-6 max-w-none">
              {contentMd ? <ReactMarkdown remarkPlugins={[remarkGfm]}>{contentMd}</ReactMarkdown> : <p className="text-muted italic">Start writing to see a preview.</p>}
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
