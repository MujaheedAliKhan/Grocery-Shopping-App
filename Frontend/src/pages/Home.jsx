import React from "react";

const Home = () => {
  return (
    <div className="min-h-screen mx-auto grid md:grid-cols-2 pt-16 justify-center items-center">
      <div className="flex flex-col gap-10 p-10 md:p-24 justify-start items-start">
        <h1 className="text-5xl md:text-8xl text-gray-400">Grocery Products</h1>
        <p className="text-md md:text-lg text-gray-600">
          Grocery products are everyday essential items sold for daily use,
          including Rice, Wheat Flour, Milk, Eggs, Fruits, Vegetables, cooking
          oil, spices, snacks, beverages, and household necessities.
        </p>
        <button className="text-sm border border-none bg-amber-600 text-white px-6 md:px-8 py-2.5 md:py-4 rounded-full font-semibold shadow-lg hover:bg-amber-500 transition duration-200">
          Shop Now →{" "}
        </button>
      </div>

      <div className="flex flex-col justify-between items-center">
        <div>
          <img
            className="w-auto hidden md:flex rounded-md bg-contain"
            src="/products.png"
            alt="vegetables"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
