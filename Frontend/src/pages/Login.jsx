import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;

const Login = ({Loading}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      localStorage.clear();
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      // console.log(data);

      //STORE TOKEN
      localStorage.setItem("token", data.token);
      // console.log("New Token:", data.token);

      toast.success("Login Successfull");

      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Error in Login User");
    }
  };
  return (
    <>
      {Loading ? (
        <div className="min-h-screen flex justify-center items-center h-60">
          <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center h-screen">
          <div className="flex flex-col border border-none shadow-lg px-10 py-10 rounded-lg justify-center items-center bg-gray-50">
            <h2 className=" mb-8 text-black tracking-wider text-3xl font-bold">
              Login 🥕
            </h2>
            <input
              className="py-3 px-12 mb-4 border bg-white rounded-lg outline-none text-md w-full border-none shadow-lg"
              type="email"
              value={email}
              placeholder="Enter email here"
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
            />

            <input
              className="py-3 px-12 mb-2 border bg-white rounded-lg outline-none text-md w-full border-none shadow-lg"
              type="password"
              value={password}
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off"
            />

            <button
              onClick={handleLogin}
              className="px-4 py-3 w-full mt-6 border-none outline-none font-bold bg-amber-600 text-white rounded-full shadow-lg hover:bg-amber-400 hover:text-white transition duration-200"
            >
              Login
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
