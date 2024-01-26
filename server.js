const express = require("express");
const cloudinary = require("cloudinary").v2;
const bodyParser = require("body-parser");

const app = express();
const PORT = 7680;

// Parse JSON and url-encoded payloads
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: '10mb' }));

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: "dtj0krpma",
  api_key: "389674485646689",
  api_secret: "EnWl1Ki8mXY_a3qHY3jI_dgcbeE",
});

// Route to handle the image upload
app.get('/', (req, res) => res.send('App works fine'))
app.post("/upload", async (req, res) => {
  try {
    // Extract base64 and imageFormat from the request body
    const { image, imageFormat } = req.body;

    // Upload the base64 image to Cloudinary
    const result = await cloudinary.uploader.upload(
      `data:image/${imageFormat};base64,${image}`
    );

    // Send the Cloudinary URL in the response
    res.status(200).json({ url: result.secure_url });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => console.log(`Server Running on PORT ${PORT}`));
