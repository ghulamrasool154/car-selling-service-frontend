import axios from "axios";
import { cookies } from "next/headers";

export async function POST(request) {
  const body = await request.json();
  const authCookie = request.cookies.get("auth")?.value;
  console.log("authCookie", authCookie);

  if (!authCookie) {
  }

  let json = JSON.parse(authCookie);

  let responseObject = {
    status: 500,
    message: "Something went wrong",
    error: false,
    success: true,
  };
  let objectBody = {
    user: json.data._id,
    model: body.carModel,
    price: body.price,
    phone: body.phone,
    city: body.city,
    maxPictures: body.maxPictures,
    pictures: body.allImages,
  };

  try {
    await axios.post(`${process.env.api_url}vehicle`, objectBody);

    responseObject.status = 201;
    responseObject.error = false;
    responseObject.success = true;
    responseObject.message = "Add vehicle info Successful";
  } catch (error) {
    let data = error.response.data;

    responseObject.error = true;
    responseObject.success = false;
    responseObject.message = data.error.message;
  }
  return new Response(JSON.stringify(responseObject), {
    status: responseObject.status,
  });
}
