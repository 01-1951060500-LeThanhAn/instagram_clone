import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      const isLoggedIn = !!token;
      const isDashBoard = req.nextUrl.pathname.startsWith("/dashboard");
      if (isDashBoard) {
        if (isLoggedIn) {
          return true;
        }

        return false;
      }

      return true;
    },
  },
});

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ["/((?!api|_next/static|_next/image|.png).*)"],
};
