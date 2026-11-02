// Shared with the M site (intuitivecomputing/M-robot, apps/M-website/src/app/components/layout.tsx).
// Change both together until the collective's components live in one shared package.

import type { ReactNode } from "react";

/** Page-width container shared by every page. */
export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
    return <div className={`mx-auto w-full max-w-[1280px] px-4 md:px-8 ${className}`}>{children}</div>;
}

/** Lowercase mono label: section numbers, metadata, captions. */
export function Label({
    children,
    className = "",
    small = false,
}: {
    children: ReactNode;
    className?: string;
    small?: boolean;
}) {
    return (
        <p className={`m-0 font-mono leading-normal text-label ${small ? "text-xs" : "text-[13px]"} ${className}`}>
            {children}
        </p>
    );
}

/**
 * White cells separated by 1px hairlines. Children are the cells; give each
 * one `bg-sheet` (or a backdrop) and a flex basis so rows wrap on phones.
 */
export function HairlineGrid({
    children,
    className = "",
    as: Tag = "div",
}: {
    children: ReactNode;
    className?: string;
    as?: "div" | "section";
}) {
    return <Tag className={`flex flex-wrap gap-px border border-hairline bg-hairline ${className}`}>{children}</Tag>;
}

interface ChapterRowProps {
    id: string;
    number: string;
    title: string;
    /** Margin note under the title: links, metadata. */
    note?: ReactNode;
    children: ReactNode;
}

/**
 * One chapter of the monograph: a spine cell with the number and title, and
 * a content cell. On narrow screens the spine stacks above the content.
 */
export function ChapterRow({ id, number, title, note, children }: ChapterRowProps) {
    return (
        <section id={id} className="flex scroll-mt-6 flex-wrap gap-px" aria-labelledby={`${id}-title`}>
            <div className="grow basis-60 bg-sheet px-6 py-8 md:px-7">
                <Label>{number}</Label>
                <h2 id={`${id}-title`} className="mt-1 text-[34px] leading-tight font-normal">
                    {title}
                </h2>
                {note && <div className="mt-5 font-mono text-xs leading-relaxed text-label">{note}</div>}
            </div>
            <div className="min-w-0 grow-[999] basis-[600px] bg-sheet px-6 py-8 md:px-10 md:pb-10">{children}</div>
        </section>
    );
}

/** Figure caption: italic serif figure number, then mono detail. */
export function Caption({ figure, children }: { figure: string; children: ReactNode }) {
    return (
        <figcaption className="mt-2 text-base">
            <span className="italic">{figure}</span>{" "}
            <span className="font-mono text-xs text-label">{children}</span>
        </figcaption>
    );
}

/** External link with a trailing arrow, opening in a new tab. */
export function ExternalLink({
    href,
    children,
    className = "",
}: {
    href: string;
    children: ReactNode;
    className?: string;
}) {
    return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
            {children} ↗
        </a>
    );
}
