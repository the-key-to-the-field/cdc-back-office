import ProductForm from "@/app/components/ProductForm";
import { getAllCategories } from "@/services/category";

export default async function ProductFormPage() {
  const categories = await getAllCategories();



  return <ProductForm categories={categories}  />;
}
