"use client";
import { useState } from "react";

interface EditProductsProps {
  updatedProduct: any;
}

const ProductEdit: React.FC<EditProductsProps> = ({ updatedProduct }) => {
  const [formData, setFormData] = useState({
    name: updatedProduct.name,
    description: updatedProduct.description,
    price: updatedProduct.price,
    brand: updatedProduct.brand,
    category: updatedProduct.category,
    inStock: updatedProduct.inStock,
    images: updatedProduct.images,
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Submit form data to update product
    console.log(formData);
  };

  return (
    <div>
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="brand">Brand:</label>
          <input
            type="text"
            id="brand"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="inStock">In Stock:</label>
          <input
            type="checkbox"
            id="inStock"
            name="inStock"
            checked={formData.inStock}
            onChange={() =>
              setFormData((prevFormData) => ({
                ...prevFormData,
                inStock: !prevFormData.inStock,
              }))
            }
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ProductEdit;
