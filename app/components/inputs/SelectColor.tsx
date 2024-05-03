"use client";

import { ImageType } from "@/app/admin/add-products/AddProductForm";
import { useCallback, useEffect, useState } from "react";
import SelectImage from "./SelectImage";
import Button from "../Button";

interface SelectColorProps {
  item: ImageType;
  addImageToState: (value: ImageType) => void;
  removeImageFromState: (value: ImageType) => void;
  isProductCreated: boolean;
}

const SelectColor: React.FC<SelectColorProps> = ({
  item,
  addImageToState,
  removeImageFromState,
  isProductCreated,
}) => {
  const [isSelected, setIsSelected] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [addingImage, setAddingImage] = useState<boolean>(false);

  useEffect(() => {
    if (isProductCreated) {
      setIsSelected(false);
      setFiles([]);
    }
  }, [isProductCreated]);

  const handleFileChange = useCallback(
    (value: File) => {
      setFiles((prevFiles) => [...prevFiles, value]);
      addImageToState({ ...item, image: value });
    },
    [addImageToState, item]
  );

  const handleCheck = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setIsSelected(e.target.checked);

      if (!e.target.checked) {
        setFiles([]);
        removeImageFromState(item);
      }
    },
    [removeImageFromState, item]
  );

  const handleAddImage = useCallback(() => {
    setAddingImage(true);
  }, []);

  const handleRemoveImage = useCallback(
    (fileToRemove: File) => {
      setFiles((prevFiles) =>
        prevFiles.filter((file) => file !== fileToRemove)
      );
      removeImageFromState(item);
    },
    [removeImageFromState, item]
  );

  return (
    <div className="grid grid-cols-1 overflow-y-auto border-b-[1.2px] border-slate-200 items-center p-2">
      <div className="flex flex-row gap-2 items-center h-[60px]">
        <input
          id={item.color}
          type="checkbox"
          checked={isSelected}
          onChange={handleCheck}
          className="cursor-pointer"
        />
        <label htmlFor={item.color} className="font-medium cursor-pointer">
          {item.color}
        </label>
      </div>
      <>
        {isSelected && files.length === 0 && (
          <div className="col-span-2 text-center">
            <SelectImage item={item} handleFileChange={handleFileChange} />
          </div>
        )}
        {files.map((file) => (
          <div
            key={file.name}
            className="flex flex-row gap-2 text-sm col-span-2 items-center justify-between"
          >
            <p>{file.name}</p>
            <div className="w-70px">
              <Button
                label="Cancel"
                small
                outline
                onClick={() => handleRemoveImage(file)}
              />
            </div>
          </div>
        ))}
        {addingImage && (
          <div className="col-span-2 text-center">
            <SelectImage item={item} handleFileChange={handleFileChange} />
          </div>
        )}
        {isSelected && files.length > 0 && (
          <Button label="ADD" small outline onClick={handleAddImage} />
        )}
      </>
    </div>
  );
};

export default SelectColor;
