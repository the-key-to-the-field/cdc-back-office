"use client"
import { deleteUTFiles, uploadFiles } from "@/services/uploadthing";
import { uploadResponse } from "@/services/uploadthing";
import { TrashIcon } from "@heroicons/react/24/outline";
import { Button } from "@heroui/react";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import { Image, Spinner } from "@heroui/react";
import { useRef, useState } from "react";

interface FileUploaderProps {
    afterUpload: (url: string, key: string) => void;
    errorsMessage?: string;
    image?: string;
    imageKey?: string;
}

export default function FileUploader({afterUpload, errorsMessage, image, imageKey}: FileUploaderProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [loadingImage, setLoadingImage] = useState(false);
    const [errorImage, setErrorImage] = useState("");
    const [imageUrl, setImageUrl] = useState(image || "");
    const handleUpload = async (formData: FormData) => {
        setLoadingImage(true);
        if (!formData) return;
        const response: uploadResponse[] = await uploadFiles(formData);
    
        if (response[0].error) {
          setErrorImage(response[0].error.message);
          setLoadingImage(false);
    
          return;
        }
        setImageUrl(response[0].data?.url || "");
        afterUpload(response[0].data?.url || "", response[0].data?.key || "");

        setLoadingImage(false);
      };

      const deleteImage = async () => {
        setLoadingImage(true);
        try {
          await deleteUTFiles([imageKey!]);
          setImageUrl("");
    
          setLoadingImage(false);
        } catch (error) {
          console.log("error", error);
          setLoadingImage(false);
        }
      };
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const formData = new FormData();
  
      if (event.target.files) {
        Array.from(event.target.files).forEach((file) => {
          formData.append("files", file);
        });
        handleUpload(formData);
      }
    };
    const triggerFileInput = () => {
        // setIsOpen(true);
        fileInputRef.current?.click();
      };
  return <div>
          <input
        type="file" 
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
        aria-label="Upload product image"
      />

      <div
        role="button"
        tabIndex={0}
        onClick={triggerFileInput}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            triggerFileInput();
          }
        }}
        className={`min-w-64 h-64 cursor-pointer 
        border border-dashed border-${errorsMessage ? "red-500" : "gray-300"} 
        p-2 rounded-md relative  
        flex items-center justify-center hover:bg-gray-500 transition-all duration-300`}
        aria-label="Upload product image"
      >
        {loadingImage ? (
          <Spinner color="warning" size="lg" />
        ) : imageUrl ? (
          <Image
            alt="img_product"
            src={imageUrl}
            className="w-64 h-64 object-contain"
          />
        ) : (
          <div className="flex items-center justify-center h-full gap-2 flex-col">
            <ArrowUpTrayIcon className="w-4 h-4 text-yellow-500" />
            <div className="text-sm text-yellow-500">
              Upload an image <span className="text-red-500">*</span>
            </div>
          </div>
        )}

        {imageUrl && (
          <Button
            size="sm"
            onPress={deleteImage}
            className="absolute top-0 right-0 z-10"
            color="danger"
          >
            <TrashIcon className="w-4 h-4" />
          </Button>
        )}
      </div>
      {errorImage && (
        <div className="text-red-500 text-xs mt-1">{errorImage}</div>
      )}
      {errorsMessage && (
        <div className="text-red-500 text-xs mt-1">{errorsMessage}</div>
      )}
  </div>;
}
