import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { SUPPORTED_LANGUAGES } from "./lib/constants";

const PUBLIC_FILE = /\.(.*)$/;

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	// Skip if already prefixed or is a public file
	if (
		SUPPORTED_LANGUAGES.some(
			(language) =>
				pathname.startsWith(`/${language}`) || pathname === `/${language}/`
		) ||
		PUBLIC_FILE.test(pathname)
	) {
		return;
	}

  // Get preferred locale (from Acccept-Language header)
  const accept = request.headers
		.get("accept-language")
		?.split(",")[0]
		.split("-")[0];
	const locale = SUPPORTED_LANGUAGES.includes(accept as any)
		? accept!
		: "en";

	return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};