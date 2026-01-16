import { withAuth } from "next-auth/middleware";
import type { NextRequest } from "next/server";

export default withAuth(
  function middleware(_req: NextRequest) {
    // no-op: auth check is handled by withAuth
  },
  {
    pages: {
      signIn: "/login",
    },
  }
);

export const config = {
  matcher: ["/((?!login|api/auth|_next/static|_next/image|favicon.ico).*)"],
};
