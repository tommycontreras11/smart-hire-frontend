import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { UserRoleEnum } from "./enums/common.enum";
import { getCookie } from "./utils/cookie";
import { me } from "./utils/auth.lib";

const protectedRoutes = [
  "recruitment-process",

  "/admin",
  "/admin/candidates",
  "/admin/categories",
  "/admin/competencies",
  "/admin/countries",
  "/admin/departments",
  "/admin/employees",
  "/admin/evaluation-methods",
  "/admin/institutions",
  "/admin/job-positions",
  "/admin/languages",
  "/admin/position-types",
  "/admin/recruiters",
  
  "/recruiter",
  "/recruiter/vacancies",
  "/recruiter/training",
];

// Helper function to check if a path is protected
function isProtectedRoute(path: string): boolean {
  return protectedRoutes.some((route) => path.startsWith(route));
}

export async function middleware(request: NextRequest) {
  const cookie = await getCookie();

  const user = cookie ? await me() : null;

  const currentPath = request.nextUrl.pathname;

  if (currentPath === "/auth/signIn") {
    return NextResponse.next();
  }

  if (isProtectedRoute(currentPath) && !user) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const role = user?.data?.role;

  let allowedRoutes = [...protectedRoutes];

  if (
    (currentPath === "/recruitment-process") &&
    role === UserRoleEnum.CANDIDATE
  ) {
    allowedRoutes = allowedRoutes.filter(
      (route) => route !== "recruitment-process"
    );
  }

  if (
    user?.data &&
    role !== UserRoleEnum.RECRUITER &&
    isProtectedRoute(currentPath) &&
    currentPath.startsWith("/recruiter")
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (
    user?.data &&
    role !== UserRoleEnum.EMPLOYEE &&
    isProtectedRoute(currentPath) &&
    currentPath.startsWith("/admin")
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// Optionally, you can add a matcher to optimize performance
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|__nextjs_original-stack-frames).*)",
  ],
};
