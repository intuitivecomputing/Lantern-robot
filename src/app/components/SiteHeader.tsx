import type { MouseEvent } from "react";
import { CAD_URL, PAPER_URL, SDK_URL } from "../data/project";
import { pathForPage, type Page } from "../routes";
import { Container, ExternalLink } from "./layout";

interface SiteHeaderProps {
    activePage: Page;
    onPageChange: (page: Page) => void;
}

const pageLinks: { page: Page; label: string }[] = [
    { page: "build-guide", label: "build guide" },
    { page: "bom", label: "bill of materials" },
];

const externalLinks = [
    { href: CAD_URL, label: "cad" },
    { href: PAPER_URL, label: "paper" },
];

export function SiteHeader({ activePage, onPageChange }: SiteHeaderProps) {
    const go = (page: Page) => (e: MouseEvent) => {
        e.preventDefault();
        onPageChange(page);
    };

    return (
        <header className="border-b border-hairline">
            <Container className="flex flex-wrap items-center justify-between gap-x-8 gap-y-2 py-3.5">
                <a
                    href={pathForPage("home")}
                    onClick={go("home")}
                    className="inline-flex items-baseline gap-3 text-ink no-underline hover:text-ink"
                    aria-label="Lantern, home"
                >
                    <span className="font-dot text-[30px] leading-none">lantern</span>
                    <span className="hidden font-mono text-[13px] text-label sm:inline">— a minimalist robotic object</span>
                </a>
                <nav aria-label="Primary" className="flex flex-wrap gap-x-6 gap-y-1 font-mono text-[13px]">
                    {pageLinks.map(({ page, label }) => (
                        <a
                            key={page}
                            href={pathForPage(page)}
                            onClick={go(page)}
                            aria-current={activePage === page ? "page" : undefined}
                            className={
                                activePage === page
                                    ? "text-ink underline underline-offset-4"
                                    : "text-ink no-underline hover:underline hover:underline-offset-4"
                            }
                        >
                            {label}
                        </a>
                    ))}
                    {externalLinks.map(({ href, label }) => (
                        <ExternalLink key={label} href={href} className="text-link no-underline hover:underline">
                            {label}
                        </ExternalLink>
                    ))}
                    <a href={SDK_URL} download className="text-link no-underline hover:underline">
                        sdk ↓
                    </a>
                </nav>
            </Container>
        </header>
    );
}
