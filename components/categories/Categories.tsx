"use client";

import { Button } from "@heroui/button";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

import { Datatable } from "../Datatable";
import { CustomInput } from "../CustomInput";

import { CategoryActions } from "./CategoriesAction";

import { debounce } from "@/lib/utils";
import { Category } from "@/models/Category";
import { useCategory } from "@/app/categories/useCategories";
import { Image } from "@heroui/react";

export default function Categories() {
  const router = useRouter();
  const { watch, setValue } = useForm({
    defaultValues: {
      page: 1,
      limit: 10,
      keyword: "",
    },
  });
  const { data, isLoading, refetch } = useCategory({
    page: watch("page"),
    limit: watch("limit"),
    keyword: watch("keyword"),
  });

  useEffect(() => {
    refetch();
  }, [watch("page"), watch("limit"), watch("keyword")]);

  const handlePageChange = (page: number) => {
    setValue("page", page);
  };

  const columns = [
    {
      key: "name",
      label: "NAME",
      type: "component",
      renderCell: (item: Category) => (
        <div className="flex items-center gap-2">
          {
            item.image && <Image
              src={item.image}
              alt={item.name}
              width={50}
              height={50}
              className="border border-gray-300 fit-contain rounded"
             />
            }
          <div>{item.name}</div>
        </div>
      ),
    },
    {
      key: "created_at",
      label: "CREATED AT",
      type: "date",
    },
    {
      key: "updated_at",
      label: "UPDATED AT",
      type: "date",
    },
    {
      key: "action",
      label: "ACTION",
      type: "component",
      renderCell: (item: Category) => (
        <CategoryActions category={item} refetch={refetch} />
      ),
    },
  ];

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className="text-2xl font-bold">Categories</h1>
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
            onPress={() => router.push("/categories/category-form")}
          >
            Create Category
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
}
