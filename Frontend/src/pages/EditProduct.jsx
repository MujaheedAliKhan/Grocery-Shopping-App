import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const API_URL = import.meta.env.VITE_API_URL;

const EditProduct = ({Loading}) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch(`${API_URL}/api/products/${id}`);
      const data = await res.json();

      setName(data.name);
      setPrice(data.price);
      setQuantity(data.quantity || 1);
    };
    fetchProducts();
  }, [id]);

  const handleUpdate = async () => {
    const token = localStorage.getItem("token");
    await fetch(`${API_URL}/api/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        price,
        quantity,
      }),
    });
    navigate("/", {
      state: {
        refresh: true,
      },
    });
    toast.success("Product Updated Successfully");
  };
  return (
    <>
    {Loading ? (
    <div className="min-h-screen flex justify-center items-center h-60">
        <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
    </div>):(

    <div className="min-h-screen pt-16 flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center border-none bg-gray-50 px-10 py-12 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Edit Product</h2>
        <input
          className="py-3 px-12 mb-4 border bg-white rounded-lg outline-none text-md w-full border-none shadow-lg"
          type="text"
          value={name}
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="py-3 px-12 mb-4 border bg-white rounded-lg outline-none text-md w-full border-none shadow-lg"
          type="number"
          value={quantity}
          placeholder="Quantity"
          onChange={(e) => setQuantity(Number(e.target.value))}
        />

        <input
          className="py-3 px-12 mb-4 border bg-white rounded-lg outline-none text-md w-full border-none shadow-lg"
          type="number"
          value={price}
          placeholder="Price"
          onChange={(e) => setPrice(Number(e.target.value))}
        />

        <button
          className="px-4 py-3 w-full mt-2 border-none outline-none font-bold bg-amber-600 text-white rounded-full shadow-lg hover:bg-amber-400 hover:text-white transition duration-200"
          onClick={handleUpdate}
        >
          Update
        </button>
      </div>
    </div>
     )}
    </>
  );
};

export default EditProduct;
