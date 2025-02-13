"use client";
import { Tooltip, useDisclosure } from "@heroui/react";
import { useRouter } from "next/navigation";

import { DeleteIcon } from "@/components/icons";
import { EditIcon } from "@/components/icons";
import { CustomModal } from "@/components/modals/CustomModal";
import { deleteCategory } from "@/services/category";
import { Category } from "@/models/Category";

export const CategoryActions = ({
  category,
  refetch,
}: {
  category: Category;
  refetch: () => void;
}) => {
  // const [isOpen, setIsOpen] = useState(false);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await deleteCategory(category.id!);
      refetch();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="relative flex items-center gap-2">
        <Tooltip content="Edit product">
          <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
            <EditIcon
              onClick={() =>
                router.push(`/categories/category-form/${category.id}`)
              }
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
        title={`Are you sure you want to delete '${category.name}' ?`}
      >
        <div>This action will delete the category and all associated data.</div>
      </CustomModal>
    </>
  );
};
