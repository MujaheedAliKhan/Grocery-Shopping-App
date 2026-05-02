import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./components/ProductList";
import AddProduct from "./pages/AddProduct";
import Navbar from "./components/Navbar";
import EditProduct from "./pages/EditProduct";
import toast from "react-hot-toast";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Footer from "./components/Footer";
const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [products, setProducts] = useState([]);
  // const [editProduct, setEditProduct] = useState(null);
  const [search, setSearch] = useState("");
  const location = useLocation();
  const [Loading, setLoading] = useState(false);
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/products`);

      if (!res.ok) {
          throw new Error("Failed to fetch products");
      }

      const data = await res.json();
      // console.log(data);
      setProducts(data);
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  //Functionality for deleting product
  const deleteProduct = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/api/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchProducts(); //refresh list
      toast.success("Product deleted Successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete product");
    }
    
  };

  //Add to Cart Functinality
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item._id === product._id);

      if (existing) {
        return prevCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  useEffect(() => {
    console.log("CART:", cart);
  }, [cart]);

  return (
    <>
    <div>
      {Loading ? (
    <div className="min-h-screen flex justify-center items-center h-60">
        <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
    </div>): (

    <div className="max-w-auto mx-auto">
      <Toaster />
      <Navbar search={search} setSearch={setSearch} cart={cart}/>
      <Routes>
        {/* HomePage */}
        <Route
          path="/"
          element={
            <>
              <Home />
              <ProductList
                Loading={Loading}
                search={search}
                products={products}
                deleteProduct={deleteProduct}
                addToCart={addToCart}
                // setEditProduct={setEditProduct}
              />
              <Footer />
            </>
          }
        />
        {/* Add Page */}
        <Route
          path="/add"
          element={
            <AddProduct
              Loading={Loading}
              fetchProducts={fetchProducts}
              // editProduct={editProduct}
              // setEditProduct={setEditProduct}
            />
          }
        />
        <Route
          path="/products"
          element={
            <ProductList
              Loading={Loading}
              search={search}
              products={products}
              deleteProduct={deleteProduct}
              addToCart={addToCart}
              // setEditProduct={setEditProduct}
            />
          }
        />
        <Route path="/edit/:id" element={<EditProduct />} Loading={Loading} />
        <Route path="/login" element={<Login />} Loading={Loading} />
        <Route path="/register" element={<Register />}  Loading={Loading}/>
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} Loading={Loading}/>} />
      </Routes>
    </div>
    )}
    </div>
    </>
  );
}

export default App;
