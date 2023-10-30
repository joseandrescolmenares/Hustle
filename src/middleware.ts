import { NextRequest, NextResponse  } from 'next/server'
 
export function middleware(request: NextRequest) {
  // Call our authentication function to check the request
//   if(!request.cookies.has("sb-access-token")){ 
//     return NextResponse.redirect(new URL("/login", request.url))
//   }
//   return NextResponse.redirect(new URL("/", request.url))
// }
// Limit the middleware to paths starting with `/api/`
}
export const config = {
    matcher: '/dashboard',
  }