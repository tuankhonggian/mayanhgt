import prisma from "@/libs/prismadb";

interface IParams {
  editId?: string;
}

export default async function getProductByIdEdit(params: IParams) {
  try {
    const { editId } = params;

    const product = await prisma.product.findUnique({
      where: {
        id: editId,
      },
    });

    if (!product) {
      return null;
    }
    return product;
  } catch (error: any) {
    throw new Error(error);
  }
}
