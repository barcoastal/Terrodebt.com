import { ArticleEditor } from "@/components/admin/ArticleEditor";
import { createArticle } from "../actions";

export default function NewArticlePage() {
  const onSave = async (fd: FormData) => {
    "use server";
    await createArticle(fd);
  };
  return <ArticleEditor mode="create" onSave={onSave} />;
}
