import ProductForm from "@/app/components/ProductForm";
import { getAllCategories } from "@/services/category";
import { getProductById } from "@/services/products";

export default async function ProductFormPageEdit({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const product = await getProductById(id);
  const categories = await getAllCategories();

  return <ProductForm product={product} categories={categories} />;
}
