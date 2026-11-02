// Build guide structure: sections mapped to page ranges of the PDF. The PDF
// itself numbers steps 1–15; the sections group them for navigation.

import { withBase } from "../routes";

export interface BuildGuideSection {
    id: string;
    label: string;
    startPage: number;
    endPage: number;
}

export const buildGuideSections: BuildGuideSection[] = [
    { id: "cover", label: "Cover", startPage: 1, endPage: 1 },
    { id: "parts", label: "Parts", startPage: 2, endPage: 3 },
    { id: "drive", label: "Steps 1–6 · drive", startPage: 4, endPage: 9 },
    { id: "electronics", label: "Steps 7–10 · electronics", startPage: 10, endPage: 13 },
    { id: "top-cap", label: "Steps 11–12 · top cap", startPage: 14, endPage: 15 },
    { id: "shell", label: "Steps 13–15 · shell", startPage: 16, endPage: 18 },
];

export const BUILD_GUIDE_PAGES = 18;

export const BUILD_GUIDE_STEPS = 15;

export const BUILD_GUIDE_PDF_SIZE = "17.9 mb";

export const buildGuidePageImage = (pageNum: number) => withBase(`/images/build-guide/page-${pageNum}.webp`);

/** Anchor for one page of the guide, e.g. /build-guide#page-10. */
export const buildGuidePageAnchor = (pageNum: number) => `page-${pageNum}`;
