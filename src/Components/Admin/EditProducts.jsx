import React, { useState } from "react";

const EditProduct = () => {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 0,
    countInStock: 0,
    sku: "",
    category: "",
    brand: "",
    sizes: [],
    color: [],
    collection: "",
    material: "",
    gender: "",
    images: [
      {
        url: "https://picsum.photos/150? random=1",
      },
      {
        url: "https://picsum.photos/150? random=2",
      },
    ],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageUpload = async (e) => {
    const NewImg = e.target.files[0];
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(productData);
  };

  return (
    <div className=" max-w-5xl mx-auto p-6 rounded-md  ">
      <h2 className="text-2xl font-bold mb-6">Edit Product</h2>
      <form onSubmit={handleSubmit} className="">
        
        <div className="mb-6">
          <label htmlFor="" className="block semi-bold mb-2">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
            className="w-full border-2 border-gray-300 rounded-md p-2"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-6">
          <label htmlFor="" className="block semi-bold mb-2">
            Description
          </label>
          <textarea
            type="text"
            name="description"
            value={productData.description}
            onChange={handleChange}
            className="w-full border-2 border-gray-300 rounded-md p-2"
            rows={4}
            required
          />
        </div>

        {/* Price */}
        <div className="mb-6">
          <label htmlFor="" className="block semi-bold mb-2">
            Price
          </label>
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleChange}
            className="w-full border-2 border-gray-300 rounded-md p-2"
          />
        </div>

        {/* Count in Stock */}
        <div className="mb-6">
          <label htmlFor="" className="block semi-bold mb-2">
            Count in Stock
          </label>
          <input
            type="number"
            name="countInStock"
            value={productData.countInStock}
            onChange={handleChange}
            className="w-full border-2 border-gray-300 rounded-md p-2"
          />
        </div>

        {/* SKU */}
        <div className="mb-6">
          <label htmlFor="" className="block semi-bold mb-2">
            SKU
          </label>
          <input
            type="text"
            name="sku"
            value={productData.sku}
            onChange={handleChange}
            className="w-full border-2 border-gray-300 rounded-md p-2"
          />
        </div>

        {/* Size */}
        <div className="mb-6">
          <label htmlFor="" className="block semi-bold mb-2">
            Sizes (comma-separated)
          </label>
          <input
            type="text"
            name="sizes"
            value={productData.sizes.join(", ")}
            onChange={(e) =>
              setProductData({
                ...productData,
                sizes: e.target.value.split(",").map((size) => size.trim()),
              })
            }
            className="w-full border-2 border-gray-300 rounded-md p-2"
          />
        </div>

        {/* Color */}
        <div className="mb-6">
          <label htmlFor="" className="block semi-bold mb-2">
            Colors (comma-separated)
          </label>
          <input
            type="text"
            name="color"
            value={productData.color.join(", ")}
            onChange={(e) =>
              setProductData({
                ...productData,
                color: e.target.value.split(",").map((color) => color.trim()),
              })
            }
            className="w-full border-2 border-gray-300 rounded-md p-2"
          />
        </div>

        {/* Images */}
        <div className="mb-6">
          <label htmlFor="" className="block semi-bold mb-2">
            Upload Images
          </label>
          <input
            type="file"
            name="images"
            className=""
            multiple
            onChange={handleImageUpload}
          />
          <div className="flex gap-4 mt-4">
            {productData.images.map((image, index) => (
              <div key={index} className="">
                <img
                  src={image.url}
                  alt={image.altText || "Product Image"}
                  className="w-20 h-20 object-cover rounded-md shadow-md "
                />
              </div>
            ))}
          </div>
        </div>
        <button className="bg-green-500 text-white w-full py-2 rounded-md hover:bg-green-600 transition-colors">
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
