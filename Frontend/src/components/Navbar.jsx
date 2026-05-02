import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { getUserRole } from "../utils/getUserRole";
import { IoSearchOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function Navbar({ search, setSearch, cart }) {
  const [tab, setTab] = useState("Home");
  const [nav, setNav] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const role = getUserRole();

  return (
    <nav className="bg-amber-600 shadow-md px-6 py-6 fixed w-full z-50">
      <div className="flex justify-around items-center overflow-hidden">
        {/* Desktop Menu */}
        {/* left */}
        <div className="w-1/3">
          <h1 className="text-2xl font-bold md:pl-16 text-white">
            Grocery Shopping
          </h1>
        </div>

        <div className="hidden md:flex">
          {token && (
            <div className="md:relative w-full max-w-md">
              <IoSearchOutline className="text-lg absolute left-3 top-1/2 transform -translate-y-1/2 text-black font-bold" />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onClick={() => navigate("/products")}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                className="cursor-pointer border-none outline-none bg-white text-black py-3 rounded-full px-24 text-start"
              />
            </div>
          )}
        </div>

        {/* Middle */}
        <div className="w-1/3 hidden md:flex gap-10 text-md text-white justify-center text-lg">
          {token && (
            <>
              <NavLink
                to={"/"}
                end
                className={({ isActive }) =>
                  isActive
                    ? "underline underline-offset-8 decoration-2 text-white font-bold"
                    : "transition duration-200 hover:underline hover:underline-offset-8 hover:decoration-2"
                }
              >
                Home
              </NavLink>
              {role === "admin" ? (
                <NavLink
                  to={"/add"}
                  className={({ isActive }) =>
                    isActive
                      ? "underline underline-offset-8 decoration-2 text-white font-bold"
                      : "transition duration-200  hover:underline hover:underline-offset-8 hover:decoration-2"
                  }
                >
                  Add Products
                </NavLink>
              ) : (
                <NavLink
                  to={"/products"}
                  className={({ isActive }) =>
                    isActive
                      ? "underline underline-offset-8 decoration-2 text-white font-bold"
                      : "transition duration-200  hover:underline hover:underline-offset-8 hover:decoration-2"
                  }
                >
                  Products
                </NavLink>
              )}
              <NavLink
                to={"/cart"}
                className={({ isActive }) =>
                  isActive
                    ? "underline underline-offset-8 decoration-2 text-white font-bold"
                    : "transition duration-200  hover:underline hover:underline-offset-8 hover:decoration-2"
                }
              >
                Cart
            <span className="absolute text-black bg-white text-xs px-1 rounded-full">
              {cart.length ? cart.length : null}
            </span>
          </NavLink>
            </>
          )}
        </div>

        {/* Right */}
        <div className="w-1/3 flex justify-end gap-4 md:pr-16">
          {!token ? (
            <>
              <Link
                to={"/login"}
                className="bg-white text-amber-600 px-3 py-2 font-semibold rounded-lg shadow-md hover:bg-amber-600 hover:text-white transition duration-200"
              >
                Login
              </Link>
              <Link
                to={"/register"}
                className="bg-amber-600 text-white border border-white px-3 py-2 rounded-lg  font-semibold shadow-md hover:bg-white hover:text-amber-600 transition duration-200"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <button
                className="bg-white hidden md:flex border text-amber-600 px-3 py-2 font-semibold rounded-lg shadow-md hover:bg-amber-600 hover:text-white transition duration-200 hover:border-white"
                onClick={() => {
                  localStorage.clear();
                  window.location.href = "/login";
                }}
              >
                Logout
              </button>
              {/* Mobile Menu */}
              <button
                onClick={() => setNav(!nav)}
                className="md:hidden text-2xl text-white focus:outline-none"
              >
                {nav ? "✖" : "☰"}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu with animation */}

      <div
        className={`md:hidden overflow-hidden transition-all w-full duration-300 ${
          nav ? "max-h-50 w-full p-4 " : "max-h-0"
        }`}
      >
        <div className="flex flex-col w-full text-lg text-center">
          <Link
            onClick={() => setNav(false)}
            to={"/"}
            className="cursor-pointer hover:bg-white hover:text-amber-600 py-2 transition duration-100"
          >
            Home
          </Link>
          <Link
            onClick={() => setNav(false)}
            to={"/products"}
            className="cursor-pointer hover:bg-white hover:text-amber-600 py-2 transition duration-100"
          >
            Products
          </Link>
          <Link
            onClick={() => setNav(false)}
            to={"/cart"}
            className="cursor-pointer hover:bg-white hover:text-amber-600 py-2 transition duration-100"
          >
            Cart
          </Link>
          <Link
            className="cursor-pointer hover:bg-white hover:text-amber-600 py-2 transition duration-100"
            onClick={() => {
              setNav(false);
              localStorage.clear();
              window.location.href = "/login";
            }}
          >
            Logout
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
