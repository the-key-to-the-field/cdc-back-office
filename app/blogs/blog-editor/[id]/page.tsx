import BlogForm from "@/app/components/BlogForm";
import { getBlogById } from "@/services/blogs";

export default async function BlogEditor({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const blog = await getBlogById(id);

  return <BlogForm blog={blog} />;
}
