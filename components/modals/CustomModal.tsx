import { Modal } from "@heroui/react";
import { Button } from "@heroui/button";
import {
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";

export const CustomModal = ({
  isOpen,
  onOpenChange,
  children,
  size = "lg",
  onAction,
  actionText = "Action",
  title = "Modal Title",
  actionColor = "danger",
}: {
  isOpen: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";
  onAction?: () => void;
  actionText?: string;
  title?: string;
  // onClose?: () => void;
  actionColor?: "primary" | "danger" | "success" | "warning" | "default";
}) => {
  return (
    <Modal
      isDismissable={false}
      isKeyboardDismissDisabled={true}
      isOpen={isOpen}
      size={size}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
            <ModalBody>{children}</ModalBody>
            {onAction && (
              <ModalFooter>
                <Button color="default" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color={actionColor} onPress={onAction}>
                  {actionText}
                </Button>
              </ModalFooter>
            )}
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
