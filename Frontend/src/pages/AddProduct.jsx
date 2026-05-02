import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import { getUserRole } from "../utils/getUserRole";
const API_URL = import.meta.env.VITE_API_URL;

const AddProduct = ({ fetchProducts, editProduct, setEditProduct }) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState("");
  const [imageFile, setImageFile] = useState(null);
  

  const navigate = useNavigate();
  const role = getUserRole(); //Check the role

  //Add Product Functionality
  const handleProduct = async (req, res) => {
    if (!name || !price || !imageFile || !category) {
      toast.error("Fill all fields");
      return;
    }

    try {
      let url = `${API_URL}/api/products`;
      let method = "POST";
      const token = localStorage.getItem("token");

      if (editProduct) {
        url = `${API_URL}/api/products/${editProduct._id}`;
        method = "PUT";
      }

      const formData = new FormData();

      formData.append("name", name);
      formData.append("price", price);
      formData.append("quantity", quantity);
      formData.append("category", category);

      if (imageFile) {
        formData.append("image", imageFile);
      }

      const res = await fetch(url, {
        method: method,
        headers: {
          // "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, //important
        },
        body: formData,

        // JSON.stringify({ if we use json then this is needed now we switch to Cloudinary of img
        //   name,
        //   price,
        //   quantity
        // })
      });
      const data = await res.json();
      console.log(data);

      setName("");
      setPrice("");
      setQuantity(1);
      setCategory("");

      await fetchProducts();
      // setEditProduct(null);
      navigate("/");

      toast.success(
        editProduct
          ? "Product Updated Successfully"
          : "Product Added Successfully",
      );
    } catch (error) {
      console.log(error);
      res.status(401).json({
        message: "Error in Adding or Updating Product",
      });
    }
  };
  //Functionality For Editing Product
  useEffect(() => {
    if (editProduct) {
      setName(editProduct.name);
      setPrice(editProduct.price);
      setQuantity(editProduct.quantity);
      setCategory(editProduct.category);
    }
  }, [editProduct]);

  return (
    <div className="min-h-screen pt-34 md:pt-16 mb-4 flex flex-col justify-center items-center">
      {role === "admin" ? (
        <div className="flex flex-col justify-center items-center border-none bg-gray-50 px-8 py-8 md:px-10 md:py-12 shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Add Product</h2>
          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="py-3 px-12 mb-4 border bg-white rounded-lg outline-none text-md w-70 md:w-full border-none shadow-lg"
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="py-3 px-12 mb-4 border bg-white rounded-lg outline-none text-md w-70 md:w-full border-none shadow-lg"
          />

          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="py-3 px-12 mb-4 border bg-white rounded-lg outline-none text-md w-70 md:w-full border-none shadow-lg"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="py-3 px-12 mb-4 border bg-white rounded-lg outline-none text-md w-70 md:w-full border-none shadow-lg text-gray-400"
          >
            <option value="">Select Category</option>
            <option value="fruits">Fruits</option>
            <option value="vegetables">Vegetables</option>
            <option value="meats">Meats</option>
            <option value="oils">Oils</option>
          </select>

          <label
            htmlFor="fileUpload"
            className="flex flex-col items-center justify-center w-70 md:w-full h-30 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-amber-500 hover:bg-amber-50 transition"
          >
            <span className="text-gray-500">Click to upload image</span>
          </label>

          <input
            id="fileUpload"
            className="py-3 px-12 mb-4 border text-center bg-white rounded-lg outline-none text-md w-70 md:w-full border-none shadow-lg"
            type="file"
            onChange={(e) => setImageFile(e.target.files[0])}
          />
          {/* Preview Image */}
          {imageFile && (
            <img
              src={URL.createObjectURL(imageFile)}
              alt="preview"
              className="w-32 h-32 mt-3 rounded-lg shadow-md object-cover"
            />
          )}

          {/* Which files */}
          {imageFile && (
            <p className="mt-2 text-sm text-gray-600">
              Selected: {imageFile.name}
            </p>
          )}

          <button
            onClick={handleProduct}
            className="px-4 py-3 w-full mt-2 border-none outline-none font-bold bg-amber-600 text-white rounded-full shadow-lg hover:bg-amber-400 hover:text-white transition duration-200"
          >
            Add Product
          </button>
        </div>
      ) : (
        <p className="text-md text-gray-500">Only admin can add product</p>
      )}
    </div>
  );
};

export default AddProduct;
