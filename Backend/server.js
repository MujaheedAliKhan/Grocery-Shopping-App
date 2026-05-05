const express = require("express");
const app = express();
const connectDB = require("./config/db");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const Product = require("./models/Product");
const authRoutes = require("./routes/authRoutes");


//Middlewares
const authMiddleware = require("./middleware/authMiddleware");
const adminMiddleware = require("./middleware/adminMiddleware");
const upload = require("./middleware/upload");

app.use(cors({
  origin: "https://grocery-shopping-frontend.vercel.app",
  credentials:true
})); //This will help to communicate Allow Access Origin
app.use(express.json()); //It accepts the Json data later
app.use("/api/auth", authRoutes);

connectDB();

//Handles GET request
app.get("/", (req, res) => {
  res.send("Server is running on 5000");
});

//Creating Product by using of POST Method
app.post(
  "/api/products",
  authMiddleware,
  adminMiddleware,
  upload.single("image"),

  async (req, res) => {
    try {
      const { name, price, quantity, category } = req.body;
      const image = req.file ? req.file.path : "";

      const newProduct = new Product({
        name,
        price,
        quantity,
        category,
        image,
      });

      await newProduct.save();

      res.status(201).json({
        message: "Product added Successfully!",
        product: newProduct,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Error in creating product",
      });
    }
  },
);

//Fetching products by GET Method
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(201).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error in fetching product",
    });
  }
});

//Fetching product by ID  GET Method
app.get("/api/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(201).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error in fetching product by ID",
    });
  }
});

//Delete product by ID DELETE Method
app.delete(
  "/api/products/:id",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);
      res.status(201).json({
        message: "Product deleted Successfully!",
        product,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Error in deleting product",
      });
    }
  },
);

//Update product by ID with PUT Method
app.put(
  "/api/products/:id",
  authMiddleware,
  adminMiddleware,
  upload.single("image"),
  async (req, res) => {
    try {
      const { name, price, quantity, category } = req.body;

      const updateData = {
        name,
        price,
        quantity,
        category,
      };

      if (req.file) {
        updateData.image = req.file.path;
      }

      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        updateData,
        {
          new: true, //returns updated data
        },
      );

      res.status(200).json({
        message: "Product updated Successfully!",
        product: updatedProduct,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Error in updating product",
      });
    }
  },
);

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Server is running on 3000");
});
