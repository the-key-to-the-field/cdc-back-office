"use client";
import { Tooltip, useDisclosure } from "@heroui/react";
import { useRouter } from "next/navigation";

import { DeleteIcon } from "@/components/icons";
import { EditIcon } from "@/components/icons";
import { CustomModal } from "@/components/modals/CustomModal";
import { deleteBlog } from "@/services/blogs";
import { Blog } from "@/models/Blog";

export const BlogActions = ({
  blog,
  refetch,
}: {
  blog: Blog;
  refetch: () => void;
}) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const router = useRouter();

  const handleDelete = async () => {
    if (blog._id) {
      await deleteBlog(blog._id);
      refetch();
      onClose();
    }
  };

  return (
    <>
      <div className="relative flex items-center gap-2">
        <Tooltip content="Edit product">
          <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
            <EditIcon
              onClick={() => router.push(`/blogs/blog-editor/${blog._id}`)}
            />
          </span>
        </Tooltip>
        <Tooltip color="danger" content="Delete product">
          <button
            className="text-lg text-danger cursor-pointer active:opacity-50"
            onClick={onOpen}
          >
            <DeleteIcon />
          </button>
        </Tooltip>
      </div>
      <CustomModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onAction={handleDelete}
        actionText="Delete"
        title={`Are you sure you want to delete '${blog.title}' ?`}
      >
        <div>This action will delete the blog and all associated data.</div>
      </CustomModal>
    </>
  );
};
