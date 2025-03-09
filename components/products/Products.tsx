"use client";
import { Button, Image } from "@heroui/react";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { CustomInput } from "../CustomInput";

import { ProductActions } from "./components/ProductActions";

import { Product } from "@/models/Product";
import { useProduct } from "@/app/products/useProduct";
import { Datatable } from "@/components/Datatable";
import { debounce, formatPriceCurrency } from "@/lib/utils";

export const ProductsPage: NextPage = () => {
  const { watch, setValue } = useForm({
    defaultValues: {
      page: 1,
      limit: 10,
      keyword: "",
    },
  });

  const { data, isLoading, refetch } = useProduct({
    page: watch("page"),
    limit: watch("limit"),
    keyword: watch("keyword"),
  });
  console.log("data", data);

  const router = useRouter();

  useEffect(() => {
    refetch();
  }, [watch("page"), watch("limit"), watch("keyword")]);

  const columns = [
    {
      key: "name",
      label: "NAME",
      type: "component",
      renderCell: (item: Product) => (
        <div className="flex items-center gap-2">
          <Image
            src={item?.images ? item.images[0] : item.image}
            alt={item.name}
            width={50}
            height={50}
            className="border border-gray-300 fit-contain rounded"
          />
          <div>{item.name}</div>
        </div>
      ),
    },
    {
      key: "price",
      label: "PRICE",
      type: "component",
      renderCell: (item: Product) => (
        <div>{formatPriceCurrency(item.price, item.currency || '')}</div>
      ),
    },
    {
      key: "categoryName",
      label: "CATEGORY",
    },
    {
      key: "createdAt",
      label: "CREATED AT",
      type: "date",
    },
    {
      key: "updatedAt",
      label: "UPDATED AT",
      type: "date",
    },
    {
      key: "action",
      label: "ACTION",
      type: "component",
      renderCell: (item: Product) => (
        <ProductActions product={item} refetch={refetch} />
      ),
    },
  ];
  const handlePageChange = (page: number) => {
    console.log("page", page);
    setValue("page", page);
  };

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className="text-2xl font-bold">Products</h1>
      </div>
      <div className="w-full">
        <div className="flex justify-between my-4">
          <div className="w-1/4">
            <CustomInput
              name="keyword"
              placeholder="Enter keyword"
              onChange={debounce((event) => {
                setValue("keyword", event.target.value);
              }, 700)}
            />
          </div>
          <Button
            color="primary"
            className="text-right"
            onPress={() => router.push("/products/product-form")}
          >
            Add Product
          </Button>
        </div>
        <Datatable
          columns={columns}
          data={data}
          isLoading={isLoading}
          handlePageChange={handlePageChange}
        />
      </div>
    </section>
  );
};

export default ProductsPage;
