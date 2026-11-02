import { useCallback, useEffect, useState } from "react";
import { BillOfMaterialPage } from "./components/BillOfMaterialPage";
import { BuildGuidePage } from "./components/BuildGuidePage";
import { CollectiveBar } from "./components/CollectiveBar";
import { HomePage } from "./components/HomePage";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { PAPER_TITLE } from "./data/project";
import { pageForPath, pathForPage, type Page } from "./routes";

const PAGE_TITLES: Record<Page, string> = {
  home: PAPER_TITLE,
  "build-guide": "Build guide — Lantern",
  bom: "Bill of materials — Lantern",
};

export default function App() {
  const [activePage, setActivePage] = useState<Page>(() =>
    pageForPath(window.location.pathname)
  );

  // Keep the URL in sync so every page is directly linkable and the
  // browser's back/forward buttons work. `anchor` deep-links into a page
  // (e.g. a build guide page); the page itself scrolls to it on mount.
  const handlePageChange = useCallback((page: Page, anchor?: string) => {
    setActivePage(page);
    const url = pathForPage(page) + (anchor ? `#${anchor}` : "");
    if (window.location.pathname + window.location.hash !== url) {
      window.history.pushState({}, "", url);
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      setActivePage(pageForPath(window.location.pathname));
      window.scrollTo({ top: 0, behavior: "instant" });
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Normalize aliases (/bom, trailing slashes) to the canonical path.
  useEffect(() => {
    const path = pathForPage(activePage);
    if (window.location.pathname !== path) {
      window.history.replaceState({}, "", path);
    }
    document.title = PAGE_TITLES[activePage];
  }, [activePage]);

  return (
    <div className="min-h-screen bg-chrome font-serif text-ink">
      <CollectiveBar />
      <SiteHeader activePage={activePage} onPageChange={handlePageChange} />
      {activePage === "home" ? (
        <HomePage onPageChange={handlePageChange} />
      ) : activePage === "build-guide" ? (
        <BuildGuidePage />
      ) : (
        <BillOfMaterialPage />
      )}
      <SiteFooter />
    </div>
  );
}
