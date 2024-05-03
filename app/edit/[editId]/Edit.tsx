"use client";

import Button from "@/app/components/Button";
import Heading from "@/app/components/Heading";
import CategoryInput from "@/app/components/inputs/CategoryInput";
import CustomCheckBox from "@/app/components/inputs/CustomCheckBox";
import Input from "@/app/components/inputs/Input";
import TextArea from "@/app/components/inputs/TextArea";
import { categories } from "@/utils/Categories";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Image from "next/image";
import SelectColor from "@/app/components/inputs/SelectColor";
import { colors } from "@/utils/Colors";

export type ImageType = {
  color: string;
  colorCode: string;
  image: File | null;
};

export type UploadedImageType = {
  color: string;
  colorCode: string;
  image: string;
};

interface EditProductFormProps {
  product: any; // Modify the type of product as per your data structure
}

const EditProductForm: React.FC<EditProductFormProps> = ({ product }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<ImageType[] | null>(null);
  const [isProductCreated, setIsProductCreated] = useState(false);
  const [deletedImageIndices, setDeletedImageIndices] = useState<number[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: product.name,
      description: product.description,
      brand: product.brand,
      category: product.category,
      inStock: product.inStock,
      images: [], // Modify this if you want to prepopulate images
      price: product.price,
    },
  });

  useEffect(() => {
    setCustomValue("images", images);
  }, [images]);

  useEffect(() => {
    if (isProductCreated) {
      reset();
      setImages(null);
      setIsProductCreated(false);
    }
  }, [isProductCreated, reset]);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      setIsLoading(true); // Bắt đầu hiển thị loading indicator

      // Chuẩn bị dữ liệu cần gửi đi
      const requestData = {
        productId: product.id, // ID của sản phẩm cần cập nhật
        name: data.name,
        description: data.description,
        brand: data.brand,
        category: data.category,
        inStock: data.inStock,
        images: data.images, // Danh sách ảnh mới từ trường images của form
        price: data.price,
      };

      // Gửi yêu cầu cập nhật thông tin sản phẩm đến API backend
      const response = await fetch("/api/updateProduct", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      // Xử lý phản hồi từ API
      const responseData = await response.json();
      if (response.ok) {
        toast.success(responseData.success); // Hiển thị thông báo thành công
        setIsProductCreated(true); // Cập nhật trạng thái sản phẩm đã được cập nhật thành công
      } else {
        toast.error(responseData.error); // Hiển thị thông báo lỗi từ phản hồi của API
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Đã xảy ra lỗi khi cập nhật thông tin sản phẩm"); // Hiển thị thông báo lỗi
    } finally {
      setIsLoading(false); // Kết thúc hiển thị loading indicator
    }
  };

  const category = watch("category");

  const removeImageFromState = useCallback((value: ImageType) => {
    setImages((prev) => {
      if (prev) {
        const filteredImages = prev.filter(
          (item) => item.color !== value.color
        );
        return filteredImages;
      }

      return prev;
    });
  }, []);

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const addImageToState = useCallback((value: ImageType) => {
    setImages((prev) => {
      if (!prev) {
        return [
          {
            color: value.color,
            colorCode: value.colorCode,
            image: value.image,
          },
        ];
      }
      const existingColorIndex = prev.findIndex(
        (item) => item.color === value.color
      );
      if (existingColorIndex !== -1) {
        const updatedImages = [...prev];
        updatedImages[existingColorIndex].image = value.image;
        setCustomValue("images", updatedImages); // Cập nhật giá trị mới cho trường images trong form
        return updatedImages;
      } else {
        const updatedImages = [
          ...prev,
          {
            color: value.color,
            colorCode: value.colorCode,
            image: value.image,
          },
        ];
        setCustomValue("images", updatedImages); // Cập nhật giá trị mới cho trường images trong form
        return updatedImages;
      }
    });
  }, []);

  const deleteImage = async (index: number) => {
    try {
      // Mark the index of the image to be deleted
      setDeletedImageIndices((prevIndices) => [...prevIndices, index]);
      // Remove the image from the images state
      setImages((prevImages) => {
        if (!prevImages) return null;
        return prevImages.filter((_, i) => i !== index);
      });

      // Prepare request data
      const requestData = {
        productId: product.id,
        deletedImageIndex: index,
      };

      // Send request to update product images
      const response = await fetch("/api/updateProductImages", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error("Failed to update product images");
      }
    } catch (error) {
      console.error("Error deleting image:", error);
      toast.error("Đã xảy ra lỗi khi xóa ảnh sản phẩm");
    }
  };

  return (
    <>
      <Heading title="Edit Product" center />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="price"
        label="Price"
        disabled={isLoading}
        register={register}
        errors={errors}
        type="number"
        required
      />
      <Input
        id="brand"
        label="Brand"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <TextArea
        id="description"
        label="Description"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <CustomCheckBox
        id="inStock"
        register={register}
        label="This product is in stock"
      />
      <div className="w-full font-medium">
        <div className="mb-2 font-semibold">Select a Category</div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h[50vh] overflow-y-auto">
          {categories.map((item) => {
            if (item.label === "All") {
              return null;
            }
            return (
              <div key={item.label} className="col-span">
                <CategoryInput
                  onClick={(category) => setCustomValue("category", category)}
                  selected={category === item.label}
                  label={item.label}
                  icon={item.icon}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-full flex flex-col flex-wrap gap-4">
        <div>
          <div className="mt-6">
            <div className="font-bold mb-2">Product Images:</div>
            <div className="flex flex-wrap gap-4">
              {/* Hiển thị danh sách hình ảnh */}
              {product.images.map((image: UploadedImageType, index: number) => {
                // Skip rendering if the image index is marked for deletion
                if (deletedImageIndices.includes(index)) return null;
                return (
                  <div
                    key={index}
                    className="flex flex-col items-center relative"
                  >
                    <Image
                      src={image.image}
                      alt={`Product Image ${index + 1}`}
                      width={100}
                      height={100}
                    />
                    {/* Button to delete image */}
                    <button
                      onClick={() => deleteImage(index)}
                      className="absolute top-0 right-0 -mt-2 -mr-2 p-2 bg-red-500 text-white rounded-full"
                    >
                      X
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="font-bold">
            Select the available product colors and upload their images.
          </div>
          <div className="text-sm">
            You must upload an image for each of the color selected otherwise
            your color selection will be ignored.
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {colors.map((item, index) => {
            return (
              <SelectColor
                key={index}
                item={item}
                addImageToState={addImageToState}
                removeImageFromState={removeImageFromState}
                isProductCreated={isProductCreated}
              />
            );
          })}
        </div>
      </div>

      <Button
        label={isLoading ? "Loading..." : "Save Changes"}
        onClick={handleSubmit(onSubmit)}
      />
    </>
  );
};

export default EditProductForm;
