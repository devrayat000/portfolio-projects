import { NextResponse, type NextMiddleware } from "next/server";
import { getCookie } from "cookies-next";
import fetchAdapter from "@vespaiach/axios-fetch-adapter";
import { user as getUser } from "$lib/services/auth";
import { api } from "$lib/modules/axios";

const AUTH_COOKIE_KEY = "keeper.sid.access";

export const withAuth: NextMiddleware = async (req, ev) => {
  const jwt = getCookie(AUTH_COOKIE_KEY, { req: req as any });
  if (!jwt) {
    return NextResponse.redirect("/auth/login");
  }

  api.defaults.adapter = fetchAdapter;
  const user = await getUser(jwt as string);

  if (!user) {
    return NextResponse.redirect("/auth/login");
  }

  return NextResponse.next();
};

export const withoutAuth: NextMiddleware = async (req, ev) => {
  const jwt = getCookie(AUTH_COOKIE_KEY, { req: req as any });

  if (!jwt) {
    return NextResponse.next();
  }

  api.defaults.adapter = fetchAdapter;
  const user = await getUser(jwt as string);

  if (!user) {
    return NextResponse.next();
  }

  return NextResponse.redirect("/");
};
