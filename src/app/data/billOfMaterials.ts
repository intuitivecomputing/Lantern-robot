// Mirrors lantern-bom.xlsx (public/downloads). Prices are each robot's share
// of a pack (a 12-pack of breadboards counts as one twelfth), so a first build
// costs more up front. Vendor links drop the sheet's tracking parameters.

export interface BomSubItem {
    name: string;
    quantity: number;
}

export interface BomItem {
    partName: string;
    spec?: string;
    /** Free text so bulk items can read "500 mm" or "~25". */
    quantity?: string;
    /** Omitted for bulk items priced by length or weight. */
    unitPrice?: number;
    subtotal: number;
    note?: string;
    vendor?: string;
    link?: string;
    /** Parts made from this line, such as the printed parts from the filament. */
    includes?: BomSubItem[];
}

export interface BomCategory {
    id: string;
    label: string;
    /** Add-ons: listed, but not part of the total. */
    optional?: boolean;
    note?: string;
    items: BomItem[];
}

const amazon = (asin: string) => ({ vendor: "Amazon", link: `https://www.amazon.com/dp/${asin}` });
const digikey = (path: string) => ({ vendor: "DigiKey", link: `https://www.digikey.com/en/products/detail/${path}` });
const mcmaster = (part: string) => ({ vendor: "McMaster", link: `https://www.mcmaster.com/${part}/` });

export const bomCategories: BomCategory[] = [
    {
        id: "electronics",
        label: "Electronics",
        items: [
            { partName: "Raspberry Pi Pico", quantity: "1", unitPrice: 7, subtotal: 7, ...digikey("raspberry-pi/SC0918/16627943") },
            { partName: "Servo", spec: "25 kg, with servo horn", quantity: "1", unitPrice: 12.75, subtotal: 12.75, ...amazon("B0FH55569F") },
            { partName: "Vibration motor", quantity: "1", unitPrice: 0.5, subtotal: 0.5, ...amazon("B09XMWJRJ1") },
            { partName: "Motor driver", spec: "DRV8833", quantity: "1", unitPrice: 1.2, subtotal: 1.2, ...amazon("B0FG2XJCXR") },
            { partName: "Voltage regulator", spec: "5 V, 1.5 A", quantity: "1", unitPrice: 0.5, subtotal: 0.5, ...digikey("stmicroelectronics/L7805CV/585964") },
            { partName: "Mini breadboard", quantity: "1", unitPrice: 0.67, subtotal: 0.67, ...amazon("B01KKE602W") },
            { partName: "Jumper wires", quantity: "~25", subtotal: 0.25, ...amazon("B0BYCKQV9J") },
            { partName: "Power adapter", spec: "7 V, 9.1 W", quantity: "1", unitPrice: 7.17, subtotal: 7.17, ...digikey("tri-mag-llc/L6R12-070/7681521") },
            { partName: "Power jack", spec: "5.5 × 2.1 mm", quantity: "1", unitPrice: 1.42, subtotal: 1.42, ...digikey("mpd-memory-protection-devices/EJ501B/2439533") },
        ],
    },
    {
        id: "structure",
        label: "Structure",
        items: [
            { partName: "PETG sheet", spec: "12 × 12 in, 1 mm", quantity: "1", unitPrice: 1.67, subtotal: 1.67, note: "Laser-cut into the sliced shell", ...amazon("B0DK6LM6Y4") },
            { partName: "GT2 belt", spec: "6 mm wide", quantity: "500 mm", subtotal: 0.225, ...amazon("B0D7P77JHJ") },
            {
                partName: "PLA filament",
                spec: "grey and white",
                quantity: "200 g",
                subtotal: 3,
                ...amazon("B0BM7WZPXJ"),
                includes: [
                    { name: "Base cap (a + b)", quantity: 2 },
                    { name: "Pulley (a + b + c)", quantity: 3 },
                    { name: "Belt lock with key", quantity: 1 },
                    { name: "Pulley guide", quantity: 1 },
                    { name: "Top cap (a + b)", quantity: 2 },
                    { name: "Top belt lock", quantity: 1 },
                    { name: "Snap-on stand", quantity: 1 },
                ],
            },
        ],
    },
    {
        id: "fasteners",
        label: "Fasteners",
        items: [
            { partName: "Pan head screw", spec: "M3 × 10", quantity: "11", unitPrice: 0.0426, subtotal: 0.4686, ...mcmaster("92005A122") },
            { partName: "Pan head screw", spec: "M3 × 20", quantity: "5", unitPrice: 0.0514, subtotal: 0.257, ...mcmaster("92005A128") },
            { partName: "Hex nut", spec: "M3", quantity: "14", unitPrice: 0.0281, subtotal: 0.3934, vendor: "McMaster", link: "https://www.mcmaster.com/products/nuts/hex-nuts-2~/?s=m3+nuts" },
            { partName: "Heat-set insert", spec: "M3 × 5", quantity: "2", unitPrice: 0.1798, subtotal: 0.3596, ...amazon("B0CS6VZYL8") },
        ],
    },
    {
        id: "add-ons",
        label: "Add-ons",
        optional: true,
        note: "For the lamp, speaker, and toy variants, and for running on battery instead of the wall adapter.",
        items: [
            { partName: "Yarn", spec: "for a knit exterior", quantity: "2 oz", subtotal: 1.1, ...amazon("B09W1JKZ5J") },
            { partName: "Touch sensor", spec: "TTP223", subtotal: 0.35, ...amazon("B01D1D0FLG") },
            { partName: "Copper tape", subtotal: 7, ...amazon("B0CND3L759") },
            { partName: "Speaker", subtotal: 2.5, ...amazon("B0B4D1BN4F") },
            { partName: "MP3 module", spec: "DFPlayer Mini", subtotal: 5.9, ...digikey("dfrobot/DFR0299/6588463") },
            { partName: "LED strip", spec: "programmable, 60 LEDs", subtotal: 7, ...amazon("B097BX7LRT") },
            { partName: "IMU", spec: "MPU-6050", subtotal: 3.67, ...amazon("B00LP25V1A") },
            { partName: "Battery", spec: "18650", quantity: "2", unitPrice: 4, subtotal: 8, ...amazon("B0DT8QQBTH") },
            { partName: "Battery charger", subtotal: 9, ...amazon("B0DKJ55VRM") },
            { partName: "Battery box", quantity: "1", unitPrice: 2, subtotal: 2, ...amazon("B07CWK79KG") },
        ],
    },
];

export const bomCategorySubtotal = (category: BomCategory): number =>
    category.items.reduce((sum, item) => sum + item.subtotal, 0);

const requiredCategories = bomCategories.filter((c) => !c.optional);

export const bomLineCount = requiredCategories.reduce((n, c) => n + c.items.length, 0);

/** The robot itself; add-ons excluded. */
export const bomTotalCost = requiredCategories.reduce((sum, c) => sum + bomCategorySubtotal(c), 0);
