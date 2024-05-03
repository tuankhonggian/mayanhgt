"use client";

import React from "react";
import {
  SelectedImgType,
  CartProductType,
} from "@/app/product/[productId]/ProductDetails";

interface SetColorProps {
  cartProduct: CartProductType; // Thêm prop cartProduct vào SetColorProps
  images: SelectedImgType[];
  handleColorSelect: (value: SelectedImgType) => void;
}

const SetColor: React.FC<SetColorProps> = ({
  cartProduct,
  images,
  handleColorSelect,
}) => {
  // Lọc ra các màu sắc duy nhất từ danh sách hình ảnh
  const uniqueColors = Array.from(new Set(images.map((image) => image.color)));

  return (
    <div>
      <div className="flex gap-4 items-center">
        <span className="font-semibold">COLOR:</span>
        <div className="flex gap-1">
          {/* Hiển thị chỉ một hình tròn cho mỗi màu sắc duy nhất */}
          {uniqueColors.map((color) => {
            // Tìm hình ảnh tương ứng với màu sắc
            const image = images.find((img) => img.color === color);
            if (!image) return null; // Bỏ qua nếu không tìm thấy hình ảnh

            return (
              <div
                key={color}
                onClick={() => handleColorSelect(image)}
                className="h-7 w-7 rounded-full flex items-center justify-center cursor-pointer"
                style={{ background: color, border: "3px solid #A0522D" }} // Tạo viền đen cho hình tròn
              ></div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SetColor;
