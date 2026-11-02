import { useState, type MouseEvent } from "react";
import {
    AFFILIATIONS,
    AUTHORS,
    BIBTEX,
    BOM_SHEET_URL,
    BUILD_GUIDE_PDF_URL,
    CAD_URL,
    DOI,
    LASER_CUT_URL,
    PAPER_TITLE,
    PAPER_URL,
    SDK_URL,
    VENUE_PLACE,
    VENUE_SHORT,
    VIDEOS,
} from "../data/project";
import { bomCategories, bomCategorySubtotal, bomLineCount, bomTotalCost } from "../data/billOfMaterials";
import { BUILD_GUIDE_PAGES, BUILD_GUIDE_PDF_SIZE, BUILD_GUIDE_STEPS, buildGuidePageAnchor } from "../data/buildGuide";
import { pathForPage, withBase, type Page } from "../routes";
import { DriveVideo } from "./DriveVideo";
import { Caption, ChapterRow, Container, ExternalLink, HairlineGrid, Label } from "./layout";

/** Rounded headline price, as the paper gives it; the itemized total is in the bill of materials. */
const TAGLINE_PRICE_USD = 40;

interface HomePageProps {
    onPageChange: (page: Page, anchor?: string) => void;
}

const [TITLE, SUBTITLE] = PAPER_TITLE.split(": ");

/** The four design goals, in the paper's words. */
const goals = [
    { name: "Haptic", text: "Kinesthetic expansion and vibrotactile pulses make a single degree of freedom expressive." },
    { name: "Holdable", text: "Compact, light, and soft-skinned. It can talk over Wi-Fi and run on a battery, so it can sit in a lap." },
    { name: "Low-cost", text: "About $40 a robot, so large, long-term studies in the wild become affordable." },
    { name: "Simple", text: "Few parts and plain mechanics: reliable, approachable, and quick to replicate." },
];

/** Callouts on the exploded view, top to bottom. */
const anatomy = [
    "top belt clamp",
    "top cap",
    "petg shield",
    "top brace",
    "gt2 belt",
    "servo with pulley",
    "pulley stand with belt guide",
    "e-component tray",
    "base housing",
    "battery holder with i/o switch",
    "snap-on stand",
];

const bodies = [
    { name: "knit toy", image: withBase("/images/lantern-toy.webp"), backdrop: "bg-shell-yellow", alt: "Lantern in a yellow knit cover with googly eyes, held in two hands", figure: "3a" },
    { name: "knit speaker", image: withBase("/images/lantern-speaker.webp"), backdrop: "bg-shell-pink", alt: "Lantern in a striped blue, pink, and white knit cover", figure: "3b" },
    { name: "paper lamp", image: withBase("/images/lantern-lamp.webp"), backdrop: "bg-shell-red", alt: "Lantern as a glowing red paper lamp with a carry handle", figure: "3c" },
];

/** The paper's three imagined uses, each with its demo video. */
const uses = [
    {
        name: "Wake-up lamp",
        figure: "Fig. 4a.",
        video: VIDEOS.lamp,
        text: "An LED strip and an IMU make a bedside light that brightens like dawn and quickens its breathing. Flip it over to stop the alarm.",
    },
    {
        name: "Embodied speaker",
        figure: "Fig. 4b.",
        video: VIDEOS.speaker,
        text: "A small speaker and an MP3 module, with breathing synced to the beat and the vibration motor pulsing on the bass.",
    },
    {
        name: "Soft toy",
        figure: "Fig. 4c.",
        video: VIDEOS.toy,
        text: "A fluffy wool cover and printed ears that wiggle as it breathes, with a gentle purr from the vibration motor.",
    },
];

/** Pages of the build guide shown as plates; each links to its page in the guide. */
const plates = [
    { page: 6, figure: "Plate I.", detail: "step 3 · assemble the pulley", alt: "Build guide step 3: exploded view of the pulley, servo horn, and belt" },
    { page: 10, figure: "Plate II.", detail: "step 7 · wire the electronics", alt: "Build guide step 7: wiring diagram for the Pico, servo, motor driver, vibration motor, and power port" },
    { page: 18, figure: "Plate III.", detail: "step 15 · the finished skeleton", alt: "Build guide step 15: the assembled Lantern skeleton inside its sliced shell" },
];

const sdkModules = ["servo", "vibration", "audio", "music (dfplayer)", "led", "touch", "imu", "scheduler"];

const SDK_SKETCH = `import uasyncio as aio
from lantern import Lantern
from lantern.behaviors import sweep

lantern = Lantern()
lantern.init()

async def main():
    aio.create_task(lantern.vibe.heartbeat(bpm=50))
    while True:
        await sweep(lantern)  # one slow breath

aio.run(main())`;

const money = (value: number) => value.toFixed(2);

export function HomePage({ onPageChange }: HomePageProps) {
    const go = (page: Page, anchor?: string) => (e: MouseEvent) => {
        e.preventDefault();
        onPageChange(page, anchor);
    };

    return (
        <main>
            <Container className="pt-6">
                <HairlineGrid as="section">
                    <div className="flex min-w-0 grow-[3] basis-[540px] flex-col bg-sheet px-6 pt-14 pb-10 md:px-12 md:pt-18">
                        <Label className="mb-10">
                            {VENUE_SHORT.toLowerCase()} · {VENUE_PLACE.toLowerCase()}
                        </Label>
                        <h1 className="text-[clamp(56px,6.5vw,88px)] leading-[0.95] font-light tracking-[-0.03em]">{TITLE}</h1>
                        <p className="mt-3.5 text-[clamp(26px,3vw,40px)] leading-tight font-light italic">{SUBTITLE}</p>
                        <p className="mt-12 text-xl">
                            {AUTHORS.map((author, i) => (
                                <span key={author.name}>
                                    {author.name}
                                    <sup>
                                        {author.affiliations.join(",")}
                                        {author.equalContribution && "*"}
                                    </sup>
                                    {i < AUTHORS.length - 1 && ", "}
                                </span>
                            ))}
                        </p>
                        <Label small className="mt-1">
                            {AFFILIATIONS.map((affiliation, i) => `${i + 1} ${affiliation.toLowerCase()}`).join(" · ")} · *
                            equal contribution
                        </Label>
                        <div className="mt-auto flex flex-wrap items-center gap-x-7 gap-y-3 pt-10 font-mono text-sm">
                            <a
                                href={PAPER_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex min-h-12 items-center bg-ink px-5 text-white no-underline hover:bg-toned hover:text-white"
                            >
                                read the paper ↗
                            </a>
                            <a href={pathForPage("build-guide")} onClick={go("build-guide")} className="inline-flex min-h-12 items-center">
                                build one →
                            </a>
                        </div>
                    </div>
                    <figure className="m-0 flex min-w-0 grow-[2] basis-[420px] flex-col bg-shell-yellow">
                        <div className="flex min-h-[440px] grow items-end justify-center px-6 pt-10">
                            <img
                                src={withBase("/images/lantern-yellow.webp")}
                                alt="Lantern in a pale yellow knit cover with googly eyes and two yellow pom-poms"
                                width={371}
                                height={672}
                                className="block h-auto max-h-[460px] w-auto animate-breathe"
                            />
                        </div>
                        <figcaption className="flex justify-between gap-3 bg-sheet px-4.5 py-3 font-mono text-xs">
                            <span>lantern / knit, breathing</span>
                            <span className="text-label">fig. 0</span>
                        </figcaption>
                    </figure>
                </HairlineGrid>
            </Container>

            <section aria-labelledby="build-band-title" className="mt-6 bg-ink text-on-dark">
                <Container className="flex flex-wrap items-end justify-between gap-x-12 gap-y-8 py-16">
                    <h2 id="build-band-title" className="text-[clamp(40px,5.5vw,72px)] leading-[1.02] font-light tracking-[-0.02em]">
                        Build one,
                        <br />
                        then adapt it.
                    </h2>
                    <div>
                        <p className="font-dot text-[clamp(72px,9vw,112px)] leading-[0.9]">
                            {/* Doto draws "~" at cap height; nudge it down to the digits' middle. */}
                            <span aria-hidden="true" className="inline-block translate-y-[0.2em]">
                                ~
                            </span>
                            <span className="sr-only">about </span>${TAGLINE_PRICE_USD}
                        </p>
                        <p className="mt-4 flex flex-wrap gap-x-5 gap-y-1 font-mono text-[13px] text-on-dark-label">
                            <span>usd, in parts</span>
                            <a href={pathForPage("build-guide")} onClick={go("build-guide")} className="text-on-dark hover:text-on-dark">
                                build guide →
                            </a>
                            <a href={pathForPage("bom")} onClick={go("bom")} className="text-on-dark hover:text-on-dark">
                                bill of materials →
                            </a>
                        </p>
                    </div>
                </Container>
            </section>

            <Container className="pt-6">
                <div className="flex flex-col gap-px border border-hairline bg-hairline">
                    <ChapterRow
                        id="preface"
                        number="01"
                        title="Preface"
                        note={
                            <>
                                {VENUE_SHORT.toLowerCase()}, {VENUE_PLACE.toLowerCase()}.
                                <br />
                                doi:{" "}
                                <a href={PAPER_URL} target="_blank" rel="noopener noreferrer">
                                    {DOI}
                                </a>
                            </>
                        }
                    >
                        <p className="max-w-[700px] text-[23px] leading-normal">
                            Lantern is a minimalist robotic object: a simple, low-cost robot that blends into everyday
                            places and leans on our tendency to read social meaning into simple forms.
                        </p>
                        <p className="mt-5 max-w-[700px]">
                            Modelled on East Asian paper lanterns, it breathes, expanding and contracting in a slow rhythm
                            you can see and feel. It is open source, costs about ${TAGLINE_PRICE_USD} in parts, and is
                            meant to make research and teaching with robotic objects easier to start.
                        </p>
                        <HairlineGrid className="mt-8">
                            {goals.map((goal, i) => (
                                <div key={goal.name} className="min-w-0 grow basis-[200px] bg-sheet px-5 py-4">
                                    <Label small>{String(i + 1).padStart(2, "0")}</Label>
                                    <p className="mt-1 text-xl italic">{goal.name}</p>
                                    <p className="mt-1.5 text-base leading-snug text-toned">{goal.text}</p>
                                </div>
                            ))}
                        </HairlineGrid>
                    </ChapterRow>

                    <ChapterRow
                        id="form"
                        number="02"
                        title="Form"
                        note="one servo, one belt, and a petg sheet cut into eighteen strips."
                    >
                        <p className="max-w-[700px]">
                            A servo on the base housing winds a belt that runs up to the top cap. As the belt shortens it
                            pulls the cap down, and the shell between them bows outward: Lantern inhales. Letting the belt
                            out lets it exhale. A vibration motor adds pulses and heartbeats you feel in your hands.
                        </p>
                        <HairlineGrid className="mt-8">
                            <figure className="m-0 min-w-0 grow-[3] basis-[360px] bg-sheet p-5">
                                <img
                                    src={withBase("/images/exploded-view.webp")}
                                    alt="Exploded view of Lantern: top belt clamp, top cap, PETG shield, top brace, GT2 belt, servo with pulley, pulley stand with belt guide, e-component tray, base housing, battery holder, and snap-on stand"
                                    loading="lazy"
                                    className="block aspect-square w-full object-contain"
                                />
                                <Caption figure="Fig. 1.">exploded view</Caption>
                            </figure>
                            <ol className="m-0 min-w-0 grow-[2] basis-[260px] list-none bg-sheet px-5 py-3 font-mono text-xs leading-snug">
                                {anatomy.map((part, i) => (
                                    <li key={part} className="flex gap-3.5 border-b border-rule py-2.5 last:border-b-0">
                                        <span className="text-label">{String(i + 1).padStart(2, "0")}</span>
                                        <span>{part}</span>
                                    </li>
                                ))}
                            </ol>
                        </HairlineGrid>
                        <figure className="m-0 mt-6 border border-hairline bg-sheet">
                            <DriveVideo id={VIDEOS.interaction.id} title={VIDEOS.interaction.title} lazy className="block aspect-video w-full bg-ink" />
                            <figcaption className="border-t border-hairline px-3.5 py-2.5 text-base">
                                <span className="italic">Fig. 2.</span>{" "}
                                <span className="font-mono text-xs text-label">breathing, in motion</span>
                            </figcaption>
                        </figure>
                    </ChapterRow>

                    <ChapterRow
                        id="bodies"
                        number="03"
                        title="Bodies"
                        note="paper, yarn, or cotton. covers slip over the shell; printed attachments fasten to the top cap."
                    >
                        <p className="max-w-[700px]">
                            Every Lantern has the same skeleton but not the same skin. A cover changes how it looks and how
                            it feels to hold, and a few add-on parts turn it into something new.
                        </p>
                        <HairlineGrid className="mt-8">
                            {bodies.map((body) => (
                                <figure key={body.name} className={`m-0 flex min-w-0 grow basis-[200px] flex-col ${body.backdrop}`}>
                                    <div className="flex h-[260px] items-end justify-center pt-4">
                                        <img src={body.image} alt={body.alt} loading="lazy" className="h-[230px] max-w-[90%] object-contain" />
                                    </div>
                                    <figcaption className="flex justify-between gap-2 bg-sheet px-3.5 py-2.5 font-mono text-xs">
                                        <span>lantern / {body.name}</span>
                                        <span className="text-label">fig. {body.figure}</span>
                                    </figcaption>
                                </figure>
                            ))}
                        </HairlineGrid>
                        <HairlineGrid className="mt-6">
                            {uses.map((use) => (
                                <figure key={use.name} className="m-0 flex w-full flex-wrap gap-px">
                                    <div className="min-w-0 grow-[3] basis-[480px] bg-ink">
                                        <DriveVideo id={use.video.id} title={use.video.title} lazy className="block aspect-video w-full" />
                                    </div>
                                    <figcaption className="min-w-0 grow basis-[220px] bg-sheet px-5 py-4">
                                        <p className="text-lg">
                                            <span className="italic">{use.figure}</span> {use.name}
                                        </p>
                                        <p className="mt-1 text-base leading-snug text-toned">{use.text}</p>
                                    </figcaption>
                                </figure>
                            ))}
                        </HairlineGrid>
                    </ChapterRow>

                    <ChapterRow
                        id="making"
                        number="04"
                        title="Making"
                        note={
                            <>
                                <a href={pathForPage("build-guide")} onClick={go("build-guide")}>
                                    open the build guide →
                                </a>
                                <br />
                                <a href={BUILD_GUIDE_PDF_URL} download>
                                    build-guide.pdf ↓
                                </a>
                                <br />
                                {BUILD_GUIDE_PAGES} pages · {BUILD_GUIDE_STEPS} steps
                            </>
                        }
                    >
                        <p className="max-w-[700px]">
                            Every structural part prints in PLA and fastens with M3 screws. The shell is a 1 mm PETG sheet,
                            cut on a hobby-grade laser cutter. The illustrated guide goes from printed parts through the drive,
                            the electronics, and the top cap to a finished, breathing robot. Two outside labs built one in two
                            to four hours.
                        </p>
                        <HairlineGrid className="mt-8">
                            {plates.map((plate) => {
                                const anchor = buildGuidePageAnchor(plate.page);
                                return (
                                    <figure key={plate.figure} className="m-0 min-w-0 grow basis-[220px] bg-sheet p-3">
                                        <a
                                            href={`${pathForPage("build-guide")}#${anchor}`}
                                            onClick={go("build-guide", anchor)}
                                            className="group relative block"
                                        >
                                            <img
                                                src={withBase(`/images/build-guide/page-${plate.page}.webp`)}
                                                alt={plate.alt}
                                                loading="lazy"
                                                className="block aspect-video w-full object-cover"
                                            />
                                            <span className="absolute inset-0 flex items-center justify-center bg-ink/75 font-mono text-[13px] text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
                                                go to build guide →
                                            </span>
                                        </a>
                                        <Caption figure={plate.figure}>
                                            {plate.detail} · <span className="whitespace-nowrap">p. {plate.page}</span>
                                        </Caption>
                                    </figure>
                                );
                            })}
                        </HairlineGrid>
                    </ChapterRow>

                    <ChapterRow
                        id="mind"
                        number="05"
                        title="Mind"
                        note={
                            <>
                                micropython · raspberry pi pico w · cc0
                                <br />
                                <a href={SDK_URL} download>
                                    lantern-sdk.zip ↓
                                </a>
                            </>
                        }
                    >
                        <p className="max-w-[700px]">
                            The Lantern SDK is a small MicroPython library for the Raspberry Pi Pico W. One object gives you the
                            servo, the vibration motor, sound, LEDs, touch, and motion sensing, with a scheduler for behaviors
                            that respond to events. A micro-ROS version, described in the paper, connects Lantern to ROS 2.
                        </p>
                        <HairlineGrid className="mt-8">
                            <figure className="m-0 min-w-0 grow-[3] basis-[380px] bg-sheet">
                                <pre className="m-0 overflow-x-auto bg-ink px-5 py-4 font-mono text-[13px] leading-relaxed text-on-dark">
                                    {SDK_SKETCH}
                                </pre>
                                <div className="px-4 pb-3">
                                    <Caption figure="Fig. 5.">sketch · breathe with a heartbeat</Caption>
                                </div>
                            </figure>
                            <ul className="m-0 min-w-0 grow basis-[200px] list-none bg-sheet px-5 py-3 font-mono text-xs leading-snug">
                                {sdkModules.map((name) => (
                                    <li key={name} className="border-b border-rule py-2.5 last:border-b-0">
                                        lantern.{name}
                                    </li>
                                ))}
                            </ul>
                        </HairlineGrid>
                    </ChapterRow>

                    <ChapterRow
                        id="appendix-a"
                        number="a"
                        title="Bill of materials"
                        note={
                            <>
                                each robot's share of a pack. add-ons for the lamp, speaker, and toy are on the{" "}
                                <a href={pathForPage("bom")} onClick={go("bom")}>
                                    full list →
                                </a>
                            </>
                        }
                    >
                        <div className="flex flex-wrap items-end gap-x-12 gap-y-6">
                            <table className="min-w-0 grow-[2] basis-[380px] border-collapse">
                                <tbody>
                                    {bomCategories
                                        .filter((category) => !category.optional)
                                        .map((category) => (
                                            <tr key={category.id} className="border-b border-rule last:border-b-0">
                                                <th scope="row" className="py-2.5 text-left font-normal">
                                                    {category.label}
                                                </th>
                                                <td className="py-2.5 text-right font-mono text-sm">{money(bomCategorySubtotal(category))}</td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                            <div className="grow basis-[200px] border-t border-ink pt-3">
                                <p className="font-dot text-[72px] leading-[0.9]">${Math.round(bomTotalCost)}</p>
                                <Label small className="mt-2.5">
                                    total · {bomLineCount} line items
                                </Label>
                            </div>
                        </div>
                    </ChapterRow>

                    <section id="appendix-b" className="flex scroll-mt-6 flex-wrap gap-px" aria-labelledby="appendix-b-title">
                        <div className="grow basis-60 bg-sheet px-6 py-8 md:px-7">
                            <Label>b</Label>
                            <h2 id="appendix-b-title" className="mt-1 text-[34px] leading-tight font-normal">
                                Files
                            </h2>
                        </div>
                        <div className="flex min-w-0 grow-[999] basis-[600px] flex-wrap gap-px">
                            <FileCell href={BUILD_GUIDE_PDF_URL} title="Build guide" meta={`pdf · ${BUILD_GUIDE_PAGES} pages · ${BUILD_GUIDE_PDF_SIZE}`} download />
                            <FileCell href={CAD_URL} title="3D print files" meta="stl · every printed part" />
                            <FileCell href={LASER_CUT_URL} title="Laser-cut shell" meta="dxf · 1 mm petg" download />
                            <FileCell href={SDK_URL} title="Software" meta="lantern sdk · micropython · cc0" download />
                            <FileCell href={BOM_SHEET_URL} title="Bill of materials" meta="xlsx · with vendor links" download />
                        </div>
                    </section>

                    <CitationRow />
                </div>
            </Container>
        </main>
    );
}

function FileCell({ href, title, meta, download }: { href: string; title: string; meta: string; download?: boolean }) {
    const external = !download;
    return (
        <a
            href={href}
            download={download || undefined}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="flex min-w-0 grow basis-[260px] justify-between gap-3 bg-sheet p-6 text-ink no-underline hover:bg-chrome hover:text-ink"
        >
            <span>
                <span className="block text-xl">{title}</span>
                <span className="block font-mono text-xs text-label">{meta}</span>
            </span>
            <span aria-hidden="true" className="font-mono">
                {download ? "↓" : "↗"}
            </span>
        </a>
    );
}

function CitationRow() {
    const [copied, setCopied] = useState(false);

    const copy = () => {
        navigator.clipboard?.writeText(BIBTEX).then(
            () => {
                setCopied(true);
                setTimeout(() => setCopied(false), 1600);
            },
            () => setCopied(false)
        );
    };

    return (
        <section id="appendix-c" className="flex scroll-mt-6 flex-wrap gap-px" aria-labelledby="appendix-c-title">
            <div className="grow basis-60 bg-sheet px-6 py-8 md:px-7">
                <Label>c</Label>
                <h2 id="appendix-c-title" className="mt-1 text-[34px] leading-tight font-normal">
                    Citation
                </h2>
                <button
                    type="button"
                    onClick={copy}
                    className="mt-5 min-h-11 cursor-pointer border border-ink bg-sheet px-4 font-mono text-[13px] text-ink hover:bg-chrome"
                >
                    {copied ? "copied" : "copy bibtex"}
                </button>
            </div>
            <div className="min-w-0 grow-[999] basis-[600px] overflow-x-auto bg-sheet px-6 py-8 md:px-10">
                <pre className="m-0 font-mono text-[13px] leading-relaxed text-ink">{BIBTEX}</pre>
            </div>
        </section>
    );
}
