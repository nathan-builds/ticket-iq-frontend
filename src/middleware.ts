// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
// import { geolocation } from '@vercel/edge';

export default async function myMiddleware(request: NextRequest) {
  // Your Middleware logic heres
  const { nextUrl: url, geo } = request;
  const country = geo?.country || "US";
  console.log(request);
  // const { city } = geolocation(request);
  console.log(
    `Middleware got country details of ${geo?.city}, ${geo?.country}, ${geo?.latitude}, ${geo?.longitude} `
  );
    url.searchParams.set("country", country);
    url.searchParams.set("city", geo?.city || 'unk');
    url.searchParams.set("lat", geo?.latitude || 'unk');
    url.searchParams.set("lat", geo?.longitude||'unk');


  return NextResponse.rewrite(url)// Pass control to the next Middleware or route handler
}

export const config = {
  matcher: "/results",
};
