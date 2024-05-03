// EditProduct.tsx
import Container from "@/app/components/Container";
import FormWrap from "@/app/components/FormWrap";
import getCurrentUser from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";
import EditProductForm from "./Edit";
import getProductByIdEdit from "@/actions/getProductByIdEdit";

interface IParams {
  editId?: string;
}

const EditProduct = async ({ params }: { params: IParams }) => {
  // Fetch product data by productId using getProductByIdEdit
  const product = await getProductByIdEdit(params);
  console.log("product:", product);

  // Get current user
  const currentUser = await getCurrentUser();

  // Check if product exists
  if (!product) {
    return <NullData title="Ối! Sản phẩm có ID được cung cấp không tồn tại" />;
  }

  // Check if user is an admin
  if (!currentUser || currentUser.role !== "ADMIN") {
    return <NullData title="Ối! Quyền truy cập bị từ chối" />;
  }

  // Render the edit product form and pass the product data to it
  return (
    <div className="p-8">
      <Container>
        <FormWrap>
          <EditProductForm product={product} />
        </FormWrap>
      </Container>
    </div>
  );
};

export default EditProduct;
