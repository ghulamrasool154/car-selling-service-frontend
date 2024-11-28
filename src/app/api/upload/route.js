import cloudinaryConfig from "@/config/cloudinary";
import { cookies } from "next/headers";

export async function POST(request) {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  const body = await request.json();
  console.log("body", body);

  return new Response("Hello, Next.js!", {
    status: 200,
    headers: { "Set-Cookie": `token=${token}` },
  });
}
