// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
// import { geolocation } from '@vercel/edge';

export default async function myMiddleware(request: NextRequest) {
    // Your Middleware logic heres
    const { nextUrl: url, geo } = request;
    const country = geo?.country || 'US';
//   console.log(request);
    // const { city } = geolocation(request);
    console.log(
        `Middleware got country details of ${geo?.city}, ${geo?.country}, ${geo?.latitude}, ${geo?.longitude}, ${geo?.region} `
    );
    url.searchParams.set('country', country);
    url.searchParams.set('region', geo?.region ?? 'unk');
    url.searchParams.set('city', geo?.city ?? 'unk');
    url.searchParams.set('lat', geo?.latitude ?? 'unk');
    url.searchParams.set('lon', geo?.longitude ?? 'unk');

    if (process.env.NODE_ENV === 'development') {
        url.searchParams.set('country', 'US');
        url.searchParams.set('region', geo?.region ?? 'NC');
        url.searchParams.set('city', geo?.city ?? 'Charlotte');
        url.searchParams.set('lat', geo?.latitude ?? '35.2271');
        url.searchParams.set('lon', geo?.longitude ?? '-80.8957');

    }


    return NextResponse.rewrite(url);// Pass control to the next Middleware or route handler
}

export const config = {
    matcher: '/'
};
