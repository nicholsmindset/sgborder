import { NextResponse, type NextRequest } from "next/server";

/** Next redirects match paths without case, so inspect the original path here. */
export function proxy(request: NextRequest) {
  if (new URL(request.url).pathname === "/Cameras") {
    return NextResponse.redirect(new URL("/cameras", request.url), 308);
  }
  return NextResponse.next();
}

export const config = { matcher: "/Cameras" };
