import cloudinary from "cloudinary";

const cloudinaryConfig = cloudinary.config({
  cloud_name: "dwbgu2shb", //'process.env.CLOUDINARY_CLOUD_NAME',
  api_key: "336627158565327", //process.env.CLOUDINARY_API_KEY,
  api_secret: "Yx2bUmYVaSOvx2ZXcNRcg6y9izM", // process.env.CLOUDINARY_API_SECRET,
});

export default cloudinaryConfig;
