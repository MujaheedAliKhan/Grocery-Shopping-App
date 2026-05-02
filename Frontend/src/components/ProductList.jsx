import React, { useEffect } from "react";
import ProductCard from "./ProductCard";
import App from "../App";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";

const ProductList = ({
  products,
  search,
  deleteProduct,
  setEditProduct,
  addToCart,
  Loading
}) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredProducts = products.filter((p) => {
    const matchesSearch = (p.name || "")
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" ||
      (p.category || "").toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  //Pagination
  const productsPerPage = 12;

  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;

  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, setSelectedCategory]);

  // console.log("TOTAL PRODUCTS:", products.length);
  // console.log("FILTERED:", filteredProducts.length);

  return (
    <>
      {Loading ? (
    <div className="min-h-screen flex justify-center items-center h-60">
        <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
    </div>):(


    <div className="pt-34 md:pt-30">
      <div className="pb-4">
        <h1 className="text-5xl text-gray-400 pl-12 md:pl-26 pb-4">Products</h1>
      </div>
      <div className="flex flex-wrap pl-12 md:pl-20 gap-4">
        {["All", "Fruits", "Vegetables", "Meats", "Oils"].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 border border-amber-500 rounded-lg gap-10 shadow-md transform hover:scale-105 transition duration-200
              ${selectedCategory === cat ? "bg-amber-500 text-white" : "bg-white text-black"}`}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="p-10 grid grid-cols-2 md:grid-cols-6 gap-6 ">
        {currentProducts.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            setEditProduct={setEditProduct}
            deleteProduct={deleteProduct}
            addToCart={addToCart}
          />
        ))}
      </div>

      <div className="mb-20">
        {filteredProducts.length === 0 && (
          <p className="text-center text-gray-500">No products found</p>
        )}
      </div>

      <div className="flex justify-center items-center gap-4 mb-6">
        <button
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage === 1}
          className="border px-4 py-2 bg-amber-500 text-white rounded hover:bg-white hover:border-amber-600 hover:text-amber-600 transiiton duration-200"
        >
          Prev
        </button>

        <span className="font-semibold">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage === totalPages}
          className="border px-4 py-2 bg-amber-500 text-white rounded hover:bg-white hover:border-amber-600 hover:text-amber-600 transiiton duration-200"
        >
          Next
        </button>
      </div>
    </div>
    )}
    </>
  );
};

export default ProductList;
