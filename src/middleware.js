import { NextResponse } from "next/server";
export function middleware(request) {
  const response = NextResponse.next();
  response.headers.append("acceptedMimetypes", [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/webp",
    "image/heic",
    "application/pdf",
  ]);
  console.log(response);
  console.log(request.url, "Middleware");
}
export const config = {
  matcher: "/api/upload/:path*",

  // "/((?!_next/static|_next/images).*)",
  api: {
    bodyParser: false,
  },
};
