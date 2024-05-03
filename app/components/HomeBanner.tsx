"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import Image from "next/image";

const HomeBanner = () => {
  return (
    <Swiper spaceBetween={30} slidesPerView={1} navigation>
      <SwiperSlide>
        <div className="relative bg-gradient-to-r from-black to-black-700 mb-8">
          <div className="mx-auto px-8 py-12 flex flex-col gap-5 md:flex-row items-center justify-evenly">
            <div className="mb-8 md:mb-0 text-center text-black">
              <h1 className="text-4xl md:text-3xl font-bold text-white mb-4">
                Siêu giảm giá mùa hè
              </h1>
              <p className="text-lg md:text-xl text-white mb-2">
                Tận hưởng giảm giá cho các mặt hàng đã chọn
              </p>
              <p className="text-2xl md:text-4xl text-yellow-400 font-bold">
                NHẬN GIẢM GIÁ KHỦNG LÊN ĐẾN 50%
              </p>
            </div>
            <div className="w-full relative aspect-video">
              <Image
                src="/1.jpeg"
                layout="fill"
                objectFit="cover"
                alt="Banner Image"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="relative bg-gradient-to-r from-black to-black-700 mb-8">
          <div className="mx-auto px-8 py-12 flex flex-col gap-5 md:flex-row items-center justify-evenly">
            <div className="mb-8 md:mb-0 text-center text-black">
              <h1 className="text-4xl md:text-3xl font-bold text-white mb-4">
                Sản Phẩm Chính Hãng
              </h1>
              <p className="text-lg md:text-xl text-white mb-2">
                Đổi trả 12 tháng - Trả góp lãi xuất thấp
              </p>
              {/* Thay đổi nội dung và màu sắc của banner thứ hai nếu cần */}
            </div>
            <div className="w-full relative aspect-video">
              <Image
                src="/bannr2.jpeg"
                layout="fill"
                objectFit="cover"
                alt="Banner Image"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default HomeBanner;
