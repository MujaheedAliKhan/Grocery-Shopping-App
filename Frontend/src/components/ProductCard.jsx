import React from "react";
import App from "../App";
import { Navigate, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { getUserRole } from "../utils/getUserRole";
import toast from "react-hot-toast";

const ProductCard = ({ product, deleteProduct, setEditProduct, addToCart }) => {
  const navigate = useNavigate();
  const role = getUserRole(); // Checks the role
  // console.log("Add to Cart", addToCart);
  return (
    <div>
      <div
        className="p-4 shadow-lg h-86 border border-gray-200  rounded-md flex flex-col justify-between items-center transform hover:scale-105 transition duration-200"
        key={product._id}
      >
        <div>
          <div className="w-full h-32 overflow-hidden flex items-center justify-center transition">
            {/* Image */}
            <img
              className="h-32 w-full object-cover"
              src={product.image}
              alt={product.name}
            />
          </div>
          {/* Info */}
          <div className="flex flex-col justify-center items-start w-full">
            <h3 className="mt-2 font-semibold text-xl">{product.name}</h3>
            <p className="text-gray-500 text-md">{product.quantity}Kg</p>
            <p className="text-gray-600 text-lg">₹{product.price}/-</p>
          </div>
        </div>

        <div className="flex md:lex-col justify-around gap-2 items-center w-full">
          {role === "admin" && (
            <button
              onClick={() => navigate(`/edit/${product._id}`)} //setEditProduct(product)
              className="flex-1 border-none bg-green-600 text-white mt-2 px-5 py-2 rounded-sm shadow-md"
            >
              Edit
            </button>
          )}

          {role === "admin" && (
            <button
              onClick={() => deleteProduct(product._id)}
              className="flex-1 border border-none bg-red-600 rounded-sm px-4 py-2 shadow-md text-white mt-2"
            >
              Delete
            </button>
          )}

          <div className="flex flex-col flex-1">
            {role === "user" && (
            <button
              onClick={() => {
                console.log("CLICKED", product);
                addToCart(product);
                toast.success("Added To Cart");
              }}
              className="flex-1 bg-amber-600 text-white py-2 px-4 rounded-lg mt-2 flex justify-center items-center text-sm w-full hover:bg-amber-400 transition duration-200"
            >
              Add To Cart
            </button>
          )}

          {role !== "admin" && (
            <button
          className="flex-1  bg-amber-600 text-white py-2 px-4 rounded-lg mt-2 text-sm w-full hover:bg-amber-400 transition duration-200"
          >Buy Now
          </button>
          )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
