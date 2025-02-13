"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { Category } from "@/models/Category";
import { CustomInput } from "@/components/CustomInput";
import { createCategory, updateCategory } from "@/services/category";
import FileUploader from "../file-uploader/FileUploader";
import { useState } from "react";
import { Button } from "@heroui/button";
interface CategoryFormProps {
  initialValues?: Category;
}

export const CategoryForm = ({ initialValues }: CategoryFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<Category>({
    defaultValues: initialValues,
  });

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = async (values: Category) => {
    try {
      setIsLoading(true);
      if (initialValues && initialValues.id) {
        const response = await updateCategory(initialValues.id, values);

        console.log(response);
      } else {
        const response = await createCategory(values);

        console.log(response);
      }

      router.push("/categories");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <FileUploader afterUpload={(url, key) => {
        setValue("image", url);
        setValue("imageKey", key);
      }} errorsMessage={errors.image?.message} image={initialValues?.image} imageKey={initialValues?.imageKey} />
      <div>
        <CustomInput
          label="Name"
          placeholder="Enter category name"
          isRequired
          {...register("name", { required: "Name is required" })}
          error={errors.name?.message}
        />
      </div>

      <Button
        type="submit"
        className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/80"
        isLoading={isLoading}
        isDisabled={isLoading}
      >
        {initialValues ? "Update" : "Create"} Category
      </Button>
    </form>
  );
};
