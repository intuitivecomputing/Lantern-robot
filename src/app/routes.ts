export type Page = "home" | "build-guide" | "bom";

/**
 * The path the site is served under: "/" in dev and at a domain root, or a
 * project path such as "/lantern/" on GitHub Pages, set with `vite build --base`.
 * Shared with the M site's routes.ts.
 */
const BASE = import.meta.env.BASE_URL;

/** Prefixes a root-relative path such as "/images/x.webp" with the base. */
export const withBase = (path: string): string => `${BASE}${path.replace(/^\/+/, "")}`;

const PATH_BY_PAGE: Record<Page, string> = {
    home: "/",
    "build-guide": "/build-guide",
    bom: "/bill-of-materials",
};

const PAGE_BY_PATH: Record<string, Page> = {
    "": "home",
    "/": "home",
    "/build-guide": "build-guide",
    "/bill-of-materials": "bom",
    // Older/alternate spellings people may have bookmarked or been sent.
    "/bom": "bom",
    "/bill-of-material": "bom",
    "/buildguide": "build-guide",
};

export const pathForPage = (page: Page): string => withBase(PATH_BY_PAGE[page]);

export const pageForPath = (pathname: string): Page => {
    const sitePath = pathname.startsWith(BASE) ? pathname.slice(BASE.length - 1) : pathname;
    const normalized = sitePath.replace(/\/+$/, "").toLowerCase();
    return PAGE_BY_PATH[normalized] ?? "home";
};

/** Fallback for non-browser contexts; the live origin wins when available. */
export const SITE_ORIGIN = "https://intuitivecomputing.github.io";

export const canonicalUrlForPage = (page: Page): string => {
    const origin =
        typeof window === "undefined" ? SITE_ORIGIN : window.location.origin;
    return `${origin}${pathForPage(page)}`;
};
