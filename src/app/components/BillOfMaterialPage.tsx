import { useState } from "react";
import { BOM_SHEET_URL } from "../data/project";
import { bomCategories, bomCategorySubtotal, bomLineCount, bomTotalCost, type BomItem } from "../data/billOfMaterials";
import { canonicalUrlForPage } from "../routes";
import { Container, ExternalLink, HairlineGrid, Label } from "./layout";

const BOM_URL = canonicalUrlForPage("bom");

/** Fasteners cost fractions of a cent each, so show up to four places there. */
const money = (value: number) => `$${value < 0.1 ? value.toFixed(4).replace(/0+$/, "") : value.toFixed(2)}`;

function VendorLink({ item }: { item: BomItem }) {
    if (!item.link) {
        return <span className="text-label">—</span>;
    }
    return (
        <ExternalLink href={item.link} className="whitespace-nowrap lowercase">
            {item.vendor ?? "buy"}
        </ExternalLink>
    );
}

function DirectLink() {
    const [copied, setCopied] = useState(false);

    const copy = () => {
        navigator.clipboard?.writeText(BOM_URL).then(
            () => {
                setCopied(true);
                setTimeout(() => setCopied(false), 1600);
            },
            () => setCopied(false)
        );
    };

    return (
        <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
            <span className="text-label">direct link</span>
            <code className="bg-chrome px-2 py-1 text-ink">{BOM_URL}</code>
            <button
                type="button"
                onClick={copy}
                className="min-h-9 cursor-pointer border border-ink bg-sheet px-3 text-ink hover:bg-chrome"
            >
                {copied ? "copied" : "copy"}
            </button>
        </div>
    );
}

const headers = [
    { label: "part", align: "text-left" },
    { label: "unit", align: "text-right" },
    { label: "qty", align: "text-right" },
    { label: "subtotal", align: "text-right" },
    { label: "vendor", align: "text-left" },
];

export function BillOfMaterialPage() {
    return (
        <main>
            <Container className="pt-6">
                <HairlineGrid as="section">
                    <div className="flex grow basis-60 flex-col bg-sheet px-6 py-8 md:px-7">
                        <Label>a · appendix</Label>
                        <h1 className="mt-1 text-[clamp(40px,5vw,56px)] leading-none font-light tracking-[-0.02em]">
                            Bill of materials
                        </h1>
                        <div className="mt-auto pt-8">
                            <p className="font-dot text-[72px] leading-[0.9]">${Math.round(bomTotalCost)}</p>
                            <Label small className="mt-2.5">
                                total · {bomLineCount} line items · add-ons excluded
                            </Label>
                        </div>
                    </div>
                    <div className="flex min-w-0 grow-[999] basis-[600px] flex-col gap-6 bg-sheet px-6 py-8 md:px-10">
                        <p className="max-w-[680px]">
                            Every part needed to build one Lantern. Prices are each robot's share of a pack, so a first
                            build costs more up front; the filament line also makes every printed part. Add-ons are for the
                            lamp, speaker, and toy variants and for battery power. The{" "}
                            <a href={BOM_SHEET_URL} download>
                                spreadsheet ↓
                            </a>{" "}
                            has the same list.
                        </p>
                        <DirectLink />
                    </div>
                </HairlineGrid>
            </Container>

            <Container className="pt-6">
                <div className="overflow-x-auto border border-hairline bg-sheet">
                    <table className="w-full min-w-[720px] border-collapse">
                        <thead>
                            <tr className="bg-chrome">
                                {headers.map(({ label, align }) => (
                                    <th key={label} scope="col" className={`px-4 py-2.5 font-mono text-xs font-normal text-label ${align}`}>
                                        {label}
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        {bomCategories.map((category) => (
                            <tbody key={category.id}>
                                <tr className="border-t border-hairline">
                                    <th scope="rowgroup" colSpan={3} className="px-4 pt-6 pb-2 text-left font-mono text-xs font-normal text-label lowercase">
                                        {category.label}
                                        {category.optional && " · optional, not in the total"}
                                    </th>
                                    <td className="px-4 pt-6 pb-2 text-right font-mono text-xs text-label">
                                        {money(bomCategorySubtotal(category))}
                                    </td>
                                    <td />
                                </tr>
                                {category.note && (
                                    <tr>
                                        <td colSpan={5} className="px-4 pb-2 text-base text-label italic">
                                            {category.note}
                                        </td>
                                    </tr>
                                )}

                                {category.items.map((item) => (
                                    <tr key={`${item.partName} ${item.spec ?? ""}`} className="border-t border-rule align-top">
                                        <td className="px-4 py-3">
                                            <div>
                                                {item.partName}
                                                {item.spec && <span className="font-mono text-xs text-label"> · {item.spec.toLowerCase()}</span>}
                                            </div>
                                            {item.includes && (
                                                <ul className="m-0 mt-1 list-none p-0 font-mono text-xs leading-relaxed text-label">
                                                    {item.includes.map((sub) => (
                                                        <li key={sub.name}>
                                                            {sub.name.toLowerCase()} ×{sub.quantity}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                            {item.note && <p className="mt-1 text-base text-label italic">{item.note}</p>}
                                        </td>
                                        <td className="px-4 py-3 text-right font-mono text-sm">
                                            {item.unitPrice === undefined ? "—" : money(item.unitPrice)}
                                        </td>
                                        <td className="px-4 py-3 text-right font-mono text-sm whitespace-nowrap">{item.quantity ?? "—"}</td>
                                        <td className="px-4 py-3 text-right font-mono text-sm whitespace-nowrap">{money(item.subtotal)}</td>
                                        <td className="px-4 py-3 font-mono text-sm">
                                            <VendorLink item={item} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        ))}

                        <tfoot>
                            <tr className="border-t border-ink">
                                <th scope="row" colSpan={3} className="px-4 py-4 text-right font-normal">
                                    Total, without add-ons
                                </th>
                                <td className="px-4 py-4 text-right font-mono text-base whitespace-nowrap">{money(bomTotalCost)}</td>
                                <td />
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </Container>
        </main>
    );
}
