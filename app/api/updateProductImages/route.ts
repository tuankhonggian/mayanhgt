import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  const body = await request.json();
  const { productId, deletedImageIndex } = body;

  try {
    // Find the product by ID
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    // If product not found, return error response
    if (!product) {
      return new Response("Product not found", { status: 404 });
    }

    // If deletedImageIndex is provided, remove the image at that index
    if (deletedImageIndex !== undefined && deletedImageIndex !== null) {
      // Remove the image at the specified index
      product.images.splice(deletedImageIndex, 1);
    }

    // Save the updated product
    await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        images: {
          set: product.images,
        },
      },
    });

    return new Response("Product images updated successfully", { status: 200 });
  } catch (error) {
    console.error("Error updating product images:", error);
    return new Response("Failed to update product images", { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
