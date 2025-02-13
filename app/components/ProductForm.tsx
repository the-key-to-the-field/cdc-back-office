"use client";
// import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@heroui/button";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import {  Select, SelectItem, Switch } from "@heroui/react";
import { useRouter } from "next/navigation";

import { createProduct, updateProduct } from "@/services/products";
import { Product } from "@/models/Product";
import { uploadResponse } from "@/services/uploadthing";
import {  uploadFiles } from "@/services/uploadthing";
import { CustomInput } from "@/components/CustomInput";
import { Category } from "@/models/Category";
import TipTapEditor from "@/components/tip-tap-editor/TipTapEditor";
import FileUploader from "@/components/file-uploader/FileUploader";

interface ProductFormInputs {
  name: string;
  price?: number | null;
  description: string;
  image: string;
  imageKey: string;
  imageName: string;
  categoryId: string;
  currency: string | null;
  content: string;
}

const productSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  price: z.number().nullable().optional().default(null),
  description: z.string().min(1, { message: "Description is required" }),
  image: z.string().min(1, { message: "Image is required" }),
  imageKey: z.string(),
  categoryId: z.string().min(1, { message: "Category is required" }),
  currency: z.string().nullable().optional().default(null),
  content: z.string().min(1, { message: "Content is required" }),
});

const ProductForm = ({
  product,
  categories,
}: {
  product?: Product;
  categories: Category[];
}) => {
  const [loadingImage, setLoadingImage] = useState(false);
  const [errorImage, setErrorImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const router = useRouter();
  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<ProductFormInputs>({
    resolver: zodResolver(productSchema),
    defaultValues: product,
  });




  const onSubmit = async (data: ProductFormInputs) => {
    setLoading(true);
    // Handle form submission
    try {
      if (product) {
        await updateProduct(product._id, data);
        if (!isActive) {
          router.push("/products");
        }
      } else {
        await createProduct(data);
        if (!isActive) {
          router.push("/products");
        }
      }
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (formData: FormData) => {
    setLoadingImage(true);
    if (!formData) return;
    const response: uploadResponse[] = await uploadFiles(formData);

    if (response[0].error) {
      setErrorImage(response[0].error.message);
      setLoadingImage(false);

      return;
    }
    setValue("imageKey", response[0].data?.key || "");
    setValue("image", response[0].data?.url || "");

    setLoadingImage(false);
  };





  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="flex justify-end">
        <Switch
          defaultSelected={isActive}
          onChange={() => setIsActive(!isActive)}
        >
          Stay in add product
        </Switch>
      </div>
      <FileUploader afterUpload={(url, key) => {
          setValue("image", url);
          setValue("imageKey", key);
        }} errorsMessage={errors.image?.message} image={product?.image} 
          imageKey={product?.imageKey} />
  
      {errorImage && (
        <div className="text-red-500 text-xs mt-1">{errorImage}</div>
      )}
      {errors.image && (
        <div className="text-red-500 text-xs mt-1">{`Image is required`}</div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <CustomInput
              label="Product Name"
              type="text"
              isRequired={true}
              {...field}
              errorMessage={errors.name?.message}
            />
          )}
        />
        <div className="flex items-center gap-1">
        <Controller
          control={control}
          name="price"
          render={({ field }) => (
            <CustomInput
              label="Price"
              type="number"
              {...field}
              value={field.value || ''}
              isRequired={false}
              isClearable={false}
              onChange={(e) => {
                const value = e.target.value === '' ? null : Number(e.target.value);
                field.onChange(value);
              }}
              errorMessage={errors.price?.message}
              endContent={        <Controller
                control={control}
                name="currency"
                render={({ field }) => (
                  <Select
                    {...field}
                    value={field.value || ''}
      
                    aria-label="currency"
                    size="sm"
                    className="min-w-[80px] max-w-[80px] "
                    classNames={{
                      trigger: "h-8",
                      value: "text-small"
                    }}
                  >
                    {["USD", "EUR", "TND"].map((currency, index) => (
                      <SelectItem key={`${currency}`} value={currency}>{currency}</SelectItem>
                    ))}
                  </Select>
                )}
              />}
            />
          )}
        />
        </div>

      </div>

      <Controller
        control={control}
        name="categoryId"
        render={({ field }) => (
          <Select
            label="Category"
            {...field}
            defaultSelectedKeys={[product?.categoryId || '']}
            errorMessage={errors.categoryId?.message}
            isRequired={true}
          >
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </Select>
        )}
      />

      <Controller
        control={control}
        name="description"
        render={({ field }) => (
          <CustomInput
            label="Description"
            type="textarea"
            isRequired={true}
            {...field}
            errorMessage={errors.description?.message}
          />
        )}
      />
      <div className="w-full">
        <Controller
          control={control}
          name="content"
          render={({ field }) => (
            <>
              <TipTapEditor 
                content={field.value} 
                onContentChange={(content) => field.onChange(content)} 
              />
              {errors.content && (
                <div className="text-red-500 text-xs mt-1">Content is required</div>
              )}
            </>
          )}
        />
      </div>
      <div className="flex justify-end mt-4">
        <Button
          type="submit"
          color="primary"
          className="text-right"
          isLoading={loading}
        >
          {product ? "Update" : "Create"}
        </Button>
      </div>
    </form>
  );
};

export default ProductForm;
