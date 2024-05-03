"use client";

import { formatPrice } from "@/utils/formatPrice";
import { truncateText } from "@/utils/truncateText";
import { Rating } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  data: any;
}

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const router = useRouter();

  const productRating =
    data.reviews.reduce((acc: number, item: any) => item.rating + acc, 0) /
    data.reviews.length;

  console.log(productRating);

  // Kiểm tra xem mảng data.images có tồn tại và có phần tử không
  const imageSrc =
    data.images && data.images.length > 0 ? data.images[0].image : "";

  return (
    <div
      onClick={() => router.push(`/product/${data.id}`)}
      className="col-span-1
    cursor-pointer
    border-[1.2px]
    border-slate-200
    bg-slate-50
    rounded-sm
    p-2
    transition
    hover:scale-105
    text-center
    text-sm
    "
    >
      <div
        className="
      flex
      flex-col
      items-center
      w-full
      gap-1
      "
      >
        {/* Sử dụng biến imageSrc thay vì truy cập data.images[0].image */}
        <div className="aspect-square overflow-hidden relative w-full">
          <Image
            fill
            src={imageSrc}
            alt={data.name}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="mt-4">{truncateText(data.name)}</div>
        <div>
          <Rating value={productRating} readOnly />
        </div>
        <div>{data.reviews.length} Đánh Gía</div>
        <div className="font-semibold">{formatPrice(data.price)}</div>
      </div>
    </div>
  );
};

export default ProductCard;
