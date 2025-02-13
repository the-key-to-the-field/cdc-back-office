import { CustomModal } from "./modals/CustomModal";

interface PreviewModalProps {
  content: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function PreviewModal({
  content,
  isOpen,
  onClose,
}: PreviewModalProps) {
  return (
    <CustomModal
      isOpen={isOpen}
      size="5xl"
      title="HTML Preview"
      onOpenChange={onClose}
    >
      <div
        dangerouslySetInnerHTML={{ __html: content }}
        className="prose prose-sm sm:prose lg:prose-lg xl:prose-2xl max-h-[70vh] overflow-y-auto border rounded p-4"
      />
    </CustomModal>
  );
}
