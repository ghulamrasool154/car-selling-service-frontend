import axios from "axios";
import { cookies } from "next/headers";

export async function POST(request) {
  const body = await request.json();
  let responseObject = {
    status: 500,
    message: "Something went wrong",
    error: false,
    success: true,
  };
  try {
    let response = await axios.post(`${process.env.api_url}auth`, body);

    const authData = JSON.stringify(response.data);
    responseObject.status = 200;
    responseObject.error = false;
    responseObject.success = true;
    responseObject.message = "Login Successful";
    cookies().set("auth", authData, { maxAge: 86400 });
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
