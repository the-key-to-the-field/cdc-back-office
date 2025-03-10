"use client"
import { deleteUTFiles, uploadFiles } from "@/services/uploadthing";
import { uploadResponse } from "@/services/uploadthing";
import { TrashIcon } from "@heroicons/react/24/outline";
import { Button } from "@heroui/react";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import { Image, Spinner } from "@heroui/react";
import { useRef, useState } from "react";

interface FileUploaderProps {
    afterUpload: (url: string[] | string, key: string[] | string) => void;
    errorsMessage?: string;
    images?: string[];
    imageKeys?: string[];
    multiple?: boolean;
}

export default function FileUploader({afterUpload, errorsMessage, images = [], imageKeys, multiple = true}: FileUploaderProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [loadingImage, setLoadingImage] = useState(false);
    const [imageUrls, setImageUrls] = useState<string[]>(images);

    const handleUpload = async (formData: FormData) => {
        setLoadingImage(true);
        if (!formData) return;
        try {
            const response: uploadResponse[] = await uploadFiles(formData);
            setLoadingImage(false);
        let newImageUrls: string[] = [];
        let newImageKeys: string[] = [];

        response.forEach(res => {
            newImageUrls.push(res.data?.url || "");
            newImageKeys.push(res.data?.key || "");
        });

     
        if (multiple) { 
            setImageUrls(prev => [...(prev as string[]), ...newImageUrls]);
        } else {
            setImageUrls(newImageUrls);
        }
            afterUpload(newImageUrls, newImageKeys);
        } catch (error) {
            console.log("error", error);
            setLoadingImage(false);
        }
    };

    const deleteImage = async (image: string, e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        setLoadingImage(true);
        try {
            await deleteUTFiles([image]);
            setImageUrls(prev => (Array.isArray(prev) ? prev.filter(url => url !== image) : prev !== image ? prev : []));
            const newImageUrls: string[] = [];  
            const newImageKeys: string[] = [];
            afterUpload(newImageUrls, newImageKeys);
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
            multiple={multiple}
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
        p-2 rounded-md relative flex items-center gap-2 flex-wrap  hover:bg-gray-500 transition-all duration-300`}
            aria-label="Upload product image"
        >
            {loadingImage ? (
                <div className="flex items-center justify-center h-full w-full">
                    <Spinner color="warning" size="lg" />
                </div>
            ) : imageUrls.length > 0 && Array.isArray(imageUrls) ? imageUrls.map((image, index) => (
                    <div key={index} className="relative w-[150px] h-[150px] bg-gray-300 rounded-md">
                        <div
                            onClick={(e) => deleteImage(image, e)}
                            className="absolute top-1 right-1 z-20 bg-red-500 rounded-md p-1 cursor-pointer"
                        >
                            <TrashIcon className="w-4 h-4" />
                        </div>
                        <Image
                                alt="img_product"
                                src={image}
                                className="w-full h-full object-cover "
                            />
                    </div>
                ))  : (
                <div className="flex items-center justify-center h-full gap-2 flex-col w-full">
                    <ArrowUpTrayIcon className="w-4 h-4 text-yellow-500" />
                    <div className="text-sm text-yellow-500">
                        Upload an image <span className="text-red-500">*</span>
                    </div>
                </div>
            )}
        </div>
        {errorsMessage && (
            <div className="text-red-500 text-xs mt-1">{errorsMessage}</div>
        )}
    </div>;
}
