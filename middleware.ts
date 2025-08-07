import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  console.log("Middleware is running! Success!");
  return NextResponse.next();
}

export const config = {
  matcher: ['/'],
};