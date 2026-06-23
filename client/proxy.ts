import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedRoutes = [
  "/dashboard",
  "/jobs",
  "/my-applications",
  "/recommendations",
  "/saved-jobs",
  "/my-profile",
];

const authRoutes = [
  "/sign-in",
  "/sign-up",
  "/forget-password",
  "/reset-password",
];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Cookie se auth check karo
  const authStorage = request.cookies.get("auth-storage")?.value;

  let isAuthenticated = false;

  if (authStorage) {
    try {
      const parsed = JSON.parse(decodeURIComponent(authStorage));
      isAuthenticated = !!parsed?.state?.token;
      console.log("isAuthenticated:", isAuthenticated);
    } catch {
      isAuthenticated = false;
    }
  }

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  // Bina login ke protected route → sign-in pe bhejo
  if (isProtected && !isAuthenticated) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // Already logged in hai aur auth page pe gaya → dashboard pe bhejo
  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
