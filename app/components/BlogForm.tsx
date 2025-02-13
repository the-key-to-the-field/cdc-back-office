"use client";

import { useState } from "react";
import { Button } from "@heroui/button";
import { useRouter } from "next/navigation";

import TipTapEditor from "@/components/tip-tap-editor/TipTapEditor";
import { CustomInput } from "@/components/CustomInput";
import { createBlog, updateBlog } from "@/services/blogs";
import { Blog, BlogFormInputs } from "@/models/Blog";
import FileUploader from "@/components/file-uploader/FileUploader";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { z } from "zod";

const blogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  image: z.string().optional(),
  imageKey: z.string().optional(),
});

export default function BlogEditor({ blog }: { blog?: Blog }) {

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BlogFormInputs>({
    resolver: zodResolver(blogSchema),
    defaultValues: blog,
  });

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const onContentChange = (content: string) => {
    setValue("content", content);
  };

  const handleAddBlog = async (data: BlogFormInputs) => {
    console.log("data", data);

    try {
      setIsLoading(true);
      if (blog?._id) {
        await updateBlog(blog._id, { ...data, _id: blog._id });
      } else {
        await createBlog(data);
      }
      router.push("/blogs");
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="w-full ">
        <h1 className="text-2xl font-bold text-center mb-4">Blog Editor</h1>
      </div>
      <form onSubmit={handleSubmit(handleAddBlog)} className="flex flex-col gap-4">
        <FileUploader afterUpload={(url, key) => {
          setValue("image", url);
          setValue("imageKey", key);
        }} errorsMessage={errors.image?.message} image={blog?.image} imageKey={blog?.imageKey} />
        <div className="flex justify-between items-center gap-2">
          <CustomInput
            label="Title"
            placeholder="Enter title"
            {...register("title")}
            classNames="mb-4"
            isRequired
          />
        </div>
        <div className="w-full">
          <TipTapEditor content={watch("content")} onContentChange={onContentChange} />
        </div>
        <Button
          variant="shadow"
          color="primary"
          className="w-full"
          type="submit"
          isLoading={isLoading}
        >
          {blog?._id ? "Update blog" : "Add blog"}
        </Button>
      </form>
    </div>
  );
}
