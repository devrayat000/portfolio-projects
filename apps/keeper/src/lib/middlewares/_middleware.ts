import { user as getUser } from "$lib/services/auth";
import { NextResponse, type NextMiddleware } from "next/server";
import nookie from "nookies";

export const withAuth: NextMiddleware = async (req, ev) => {
  const cookies = nookie.get({ req: req as any });
  const jwt = cookies["keeper.sid.access"];
  const user = await getUser(jwt);

  if (!user) {
    return NextResponse.redirect("/auth/login");
  }

  return NextResponse.next();
};
