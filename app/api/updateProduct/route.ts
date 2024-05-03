import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  try {
    // Lấy dữ liệu từ yêu cầu
    const {
      productId,
      name,
      description,
      brand,
      category,
      inStock,
      images,
      price,
    } = await request.json();

    // Thực hiện cập nhật thông tin sản phẩm trong cơ sở dữ liệu sử dụng Prisma
    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: {
        name,
        description,
        brand,
        category,
        inStock,
        price,
      },
    });

    // Trả về phản hồi thành công
    return new NextResponse(
      JSON.stringify({
        success: "Product information updated successfully.",
        updatedProduct,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating product:", error);
    // Trả về phản hồi lỗi
    return new NextResponse(
      JSON.stringify({
        error: "An error occurred while updating product information.",
      }),
      { status: 500 }
    );
  }
}
