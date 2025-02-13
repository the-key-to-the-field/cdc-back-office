import { getCategoryById } from "@/services/category";
import { CategoryForm } from "@/components/categories/CategoryForm";

interface Props {
  params: { id: string };
}

export default async function CategoryFormPage({ params }: Props) {
  const { id } = await params;
  const category = await getCategoryById(id);

  return <CategoryForm initialValues={category} />;
}
