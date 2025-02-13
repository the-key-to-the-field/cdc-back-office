import { Input, Textarea } from "@heroui/input";
import { ReactNode } from "react";
import { Control } from "react-hook-form";

interface CustomInputProps {
  name?: string;
  ariaLabel?: string;
  classNames?: string;
  endContent?: ReactNode;
  labelPlacement?: "inside" | "outside";
  placeholder?: string;
  startContent?: ReactNode;
  type?: string;
  [key: string]: any; // Allow additional props
  errorMessage?: string;
  label?: string;
  control?: Control<any>;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isClearable?: boolean;
  isRequired?: boolean;
}

export const CustomInput = ({
  name,
  ariaLabel = "",
  classNames = "",
  endContent,
  labelPlacement = "outside",
  placeholder,
  startContent,
  type = "text",
  errorMessage,
  label,
  onChange,
  isClearable = false,
  isRequired = false,
  ...props
}: CustomInputProps) => {
  return (
    <div className="w-full mb-4">
      {type === "textarea" ? (
        <Textarea
          className="w-full mt-6"
          isClearable={isClearable}
          isRequired={isRequired}
          label={label}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          {...props}
        />
      ) : (
        <Input
          aria-label={ariaLabel}
          classNames={`${classNames} bg-default-100 text-sm`}
          endContent={endContent}
          errorMessage={errorMessage}
          type={type === "number" ? "text" : type}
          isClearable={isClearable}
          isRequired={isRequired}
          label={label}
          labelPlacement={labelPlacement}
          name={name}
          placeholder={placeholder}
          startContent={startContent}
          {...props}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (type === "number") {
              if (
                e.target.value !== "" &&
                /^\d*\.?\d*$/.test(e.target.value)
              ) {
                console.log("ee", e.target.value);
                onChange?.(e);
              }
            } else {
              onChange?.(e);
            }
          }}
        />
      )}
      {/* {errorMessage && (
        <div className="text-red-500 text-xs mt-1">{errorMessage}</div>
      )} */}
    </div>
  );
};
