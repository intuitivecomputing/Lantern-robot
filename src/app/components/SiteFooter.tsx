import {
    ACKNOWLEDGMENTS,
    CAD_URL,
    CONTACT_EMAIL,
    COPYRIGHT_HOLDER,
    LICENSES,
    PAPER_URL,
    WEBSITE_REPO_URL,
    YEAR,
} from "../data/project";
import { Container, ExternalLink } from "./layout";

const links = [
    { href: PAPER_URL, label: "paper" },
    { href: CAD_URL, label: "cad" },
    ...(WEBSITE_REPO_URL ? [{ href: WEBSITE_REPO_URL, label: "website source" }] : []),
];

const licenseLine = [
    `Software ${LICENSES.software}`,
    LICENSES.hardware && `Hardware ${LICENSES.hardware}`,
    LICENSES.content && `Content ${LICENSES.content}`,
]
    .filter(Boolean)
    .join(" · ");

export function SiteFooter() {
    return (
        <footer className="mt-18 bg-ink text-on-dark-label">
            <Container className="flex flex-wrap justify-between gap-x-12 gap-y-6 pt-10 pb-12">
                <div>
                    <p className="text-lg text-on-dark italic">Colophon</p>
                    <p className="mt-1.5 font-mono text-xs leading-relaxed lowercase">
                        Set in Newsreader, Geist Mono, and Doto.
                        <br />© {YEAR} {COPYRIGHT_HOLDER}
                    </p>
                    {ACKNOWLEDGMENTS && <p className="mt-3 max-w-xl text-sm leading-relaxed">{ACKNOWLEDGMENTS}</p>}
                </div>
                <div className="flex flex-col gap-2 font-mono text-xs md:items-end">
                    <p className="lowercase">{licenseLine}</p>
                    <p className="flex flex-wrap gap-x-5 gap-y-1">
                        {links.map(({ href, label }) => (
                            <ExternalLink key={label} href={href} className="text-on-dark no-underline hover:text-on-dark hover:underline">
                                {label}
                            </ExternalLink>
                        ))}
                        {CONTACT_EMAIL && (
                            <a href={`mailto:${CONTACT_EMAIL}`} className="text-on-dark no-underline hover:text-on-dark hover:underline">
                                {CONTACT_EMAIL}
                            </a>
                        )}
                    </p>
                </div>
            </Container>
        </footer>
    );
}
