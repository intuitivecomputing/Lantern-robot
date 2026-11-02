import { forwardRef, useCallback, useEffect, useRef, useState, type MutableRefObject } from "react";
import { BUILD_GUIDE_PDF_URL, VIDEOS } from "../data/project";
import {
    BUILD_GUIDE_PAGES,
    BUILD_GUIDE_PDF_SIZE,
    BUILD_GUIDE_STEPS,
    buildGuidePageAnchor,
    buildGuidePageImage,
    buildGuideSections,
} from "../data/buildGuide";
import { DriveVideo } from "./DriveVideo";
import { Container, HairlineGrid, Label } from "./layout";

/** Height of the sticky parts bar, so jumps land below it. */
const PARTS_BAR_OFFSET = 64;

export function BuildGuidePage() {
    const pageRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [visiblePage, setVisiblePage] = useState(1);

    // Track the page closest to the upper third of the viewport.
    useEffect(() => {
        const handleScroll = () => {
            const triggerY = window.innerHeight * 0.3;
            let closestPage = 1;
            let closestDist = Infinity;

            pageRefs.current.forEach((el, i) => {
                if (!el) return;
                const rect = el.getBoundingClientRect();
                if (rect.bottom > 0 && rect.top < triggerY + rect.height * 0.5) {
                    const dist = Math.abs(rect.top - triggerY);
                    if (dist < closestDist) {
                        closestDist = dist;
                        closestPage = i + 1;
                    }
                }
            });

            setVisiblePage((prev) => (prev !== closestPage ? closestPage : prev));
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const activeSection = buildGuideSections.find(
        (s) => visiblePage >= s.startPage && visiblePage <= s.endPage
    );

    const scrollToPage = useCallback((pageNum: number) => {
        const el = pageRefs.current[pageNum - 1];
        if (!el) return;
        const top = el.getBoundingClientRect().top + window.scrollY - PARTS_BAR_OFFSET;
        window.scrollTo({ top, behavior: "smooth" });
    }, []);

    // Deep links (/build-guide#page-10) land on that page. Unloaded pages keep
    // their 16:9 placeholder height, so the target position is already right.
    useEffect(() => {
        const match = window.location.hash.match(/^#page-(\d+)$/);
        if (!match) return;
        const pageNum = Number(match[1]);
        if (pageNum >= 1 && pageNum <= BUILD_GUIDE_PAGES) {
            requestAnimationFrame(() => scrollToPage(pageNum));
        }
    }, [scrollToPage]);

    return (
        <main>
            <Container className="pt-6">
                <HairlineGrid as="section">
                    <div className="flex grow basis-60 flex-col bg-sheet px-6 py-8 md:px-7">
                        <Label>04 · making</Label>
                        <h1 className="mt-1 text-[clamp(40px,5vw,56px)] leading-none font-light tracking-[-0.02em]">
                            Build guide
                        </h1>
                        <p className="mt-4 max-w-sm text-toned">
                            The illustrated, step-by-step assembly of Lantern, from printed parts to a breathing robot.
                        </p>
                        <p className="mt-auto pt-8 font-mono text-[13px] leading-relaxed">
                            <a href={BUILD_GUIDE_PDF_URL} download>
                                build-guide.pdf ↓
                            </a>
                            <br />
                            <span className="text-label">
                                {BUILD_GUIDE_PAGES} pages · {BUILD_GUIDE_STEPS} steps · {BUILD_GUIDE_PDF_SIZE}
                            </span>
                        </p>
                    </div>
                    <div className="min-w-0 grow-[999] basis-[600px] bg-ink">
                        <DriveVideo id={VIDEOS.buildTutorial.id} title={VIDEOS.buildTutorial.title} className="block aspect-video w-full" />
                    </div>
                </HairlineGrid>
            </Container>

            <nav aria-label="Build guide parts" className="sticky top-0 z-10 mt-6 border-y border-hairline bg-chrome/95 backdrop-blur">
                <Container className="flex items-center gap-6 py-3">
                    <ol className="m-0 flex min-w-0 flex-1 list-none gap-1 overflow-x-auto p-0 font-mono text-[13px] whitespace-nowrap">
                        {buildGuideSections.map((section) => {
                            const isActive = activeSection?.id === section.id;
                            return (
                                <li key={section.id}>
                                    <button
                                        type="button"
                                        onClick={() => scrollToPage(section.startPage)}
                                        aria-current={isActive ? "step" : undefined}
                                        className={`min-h-9 cursor-pointer px-3 lowercase ${
                                            isActive ? "bg-ink text-white" : "bg-transparent text-ink hover:bg-sheet"
                                        }`}
                                    >
                                        {section.label}
                                    </button>
                                </li>
                            );
                        })}
                    </ol>
                    <span className="hidden shrink-0 font-mono text-[13px] text-label sm:inline">
                        page {visiblePage} / {BUILD_GUIDE_PAGES}
                    </span>
                </Container>
            </nav>

            <Container className="pt-6">
                <div className="mx-auto flex max-w-[1100px] flex-col gap-px border border-hairline bg-hairline">
                    {Array.from({ length: BUILD_GUIDE_PAGES }, (_, i) => i + 1).map((pageNum) => (
                        <LazyPage
                            key={pageNum}
                            pageNum={pageNum}
                            ref={(el) => {
                                pageRefs.current[pageNum - 1] = el;
                            }}
                        />
                    ))}
                </div>
            </Container>
        </main>
    );
}

// Only renders the page image once it is near the viewport.
const LazyPage = forwardRef<HTMLDivElement, { pageNum: number }>(function LazyPage({ pageNum }, forwardedRef) {
    const sentinelRef = useRef<HTMLDivElement | null>(null);
    const [loaded, setLoaded] = useState(pageNum <= 3);

    useEffect(() => {
        if (loaded) return;
        const el = sentinelRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setLoaded(true);
                    observer.disconnect();
                }
            },
            { rootMargin: "600px" }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [loaded]);

    return (
        <div
            ref={(el) => {
                sentinelRef.current = el;
                if (typeof forwardedRef === "function") forwardedRef(el);
                else if (forwardedRef) (forwardedRef as MutableRefObject<HTMLDivElement | null>).current = el;
            }}
            id={buildGuidePageAnchor(pageNum)}
            data-page={pageNum}
            className="relative bg-sheet"
        >
            {loaded ? (
                <img
                    src={buildGuidePageImage(pageNum)}
                    alt={`Build guide page ${pageNum}`}
                    className="block h-auto w-full"
                    decoding="async"
                />
            ) : (
                <div className="flex aspect-video w-full items-center justify-center font-mono text-[13px] text-label">
                    page {pageNum}
                </div>
            )}
        </div>
    );
});
