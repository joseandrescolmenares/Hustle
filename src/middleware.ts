import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: "/dashboard",
};
export function middleware(request: NextRequest) {

  if (!request.cookies.get("access_token") ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  // else if(!request.cookies.get("role")){
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }
  return NextResponse.next();
}