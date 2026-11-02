// Paper metadata and outbound links, shared by every page so each one only
// changes here. A `null` value isn't available yet and is hidden in the UI.
//
// TODO(release): confirm every value marked TODO(release) before going public.

import { withBase } from "../routes";

export interface Author {
    name: string;
    /** 1-based indices into AFFILIATIONS. */
    affiliations: number[];
    /** Co-first author; marked with an asterisk. */
    equalContribution?: boolean;
    url?: string;
}

export const PAPER_TITLE = "Lantern: A Minimalist Robotic Object Platform";

export const VENUE = "ACM/IEEE International Conference on Human-Robot Interaction";
export const VENUE_SHORT = "HRI ’26";
export const VENUE_PLACE = "Edinburgh, Scotland";
export const YEAR = 2026;

export const AUTHORS: Author[] = [
    { name: "Victor Nikhil Antony", affiliations: [1], equalContribution: true },
    { name: "Zhili Gong", affiliations: [2], equalContribution: true },
    { name: "Guanchen Li", affiliations: [1] },
    { name: "Clara Jeon", affiliations: [1] },
    { name: "Chien-Ming Huang", affiliations: [1] },
];

/** Index 0 is superscript 1. */
export const AFFILIATIONS = ["Johns Hopkins University", "Rice University"];

// TODO(release): confirm the copyright holder (this is the M site's).
export const COPYRIGHT_HOLDER = "Intuitive Computing Laboratory, Johns Hopkins University";

export const DOI = "10.1145/3757279.3785644";
export const PAPER_URL = `https://doi.org/${DOI}`;

// TODO(release): public contact address. Hidden until set.
export const CONTACT_EMAIL: string | null = null;

// TODO(release): funding / acknowledgments line for the footer. Hidden until set.
export const ACKNOWLEDGMENTS: string | null = null;

export const BUILD_GUIDE_PDF_URL = withBase("/downloads/lantern-build-guide.pdf");
export const LASER_CUT_URL = withBase("/downloads/lantern-laser-cutting.dxf");
export const BOM_SHEET_URL = withBase("/downloads/lantern-bom.xlsx");

// TODO(release): the SDK's repository (vantony1/lantern-sdk) is private. Link
// it here once it's public; until then the site serves the zip.
export const SDK_URL = withBase("/downloads/lantern-sdk.zip");
export const CODE_URL: string | null = null;

// TODO(release): newer STL files (June 2026) exist outside this zip. Publish
// the current set (GitHub or Zenodo) and point here.
export const CAD_URL = "https://drive.google.com/file/d/1M85cmfAoUDWXaJF93fRwPjvvmoAplIGL/view?usp=sharing";

export const WEBSITE_REPO_URL: string | null = "https://github.com/intuitivecomputing/Lantern-robot";

/** Google Drive videos. TODO(release): consider YouTube, as the M site uses. */
export const VIDEOS = {
    interaction: { id: "1q46Wg7GOFoJml2c-Up3Pxvj0Qq6ciIEm", title: "Lantern breathing under a hand" },
    buildTutorial: { id: "1dV2GeEVbiqROiyMOXZAZ4StS8w-iZezf", title: "Lantern build tutorial" },
    lamp: { id: "1zXE3dmPfpM9IQhBsJoY77ZyKV5Yh6S_c", title: "Lantern as a paper lamp" },
    speaker: { id: "1S6MMzxn9DtZOBWiOZcy3WiwgDBEFLTsu", title: "Lantern as a robotic speaker" },
    toy: { id: "1gY5b7XJOY62D9FiFXCcQXQmhj6mv-tgP", title: "Lantern as a fluffy toy" },
};

// TODO(release): the SDK ships CC0 1.0; confirm the hardware and content licenses.
export const LICENSES: { software: string; hardware: string | null; content: string | null } = {
    software: "CC0 1.0",
    hardware: null,
    content: null,
};

export const BIBTEX = `@inproceedings{antony${YEAR}lantern,
  title     = {Lantern: A Minimalist Robotic Object Platform},
  author    = {Antony, Victor Nikhil and Gong, Zhili and Li, Guanchen and Jeon, Clara and Huang, Chien-Ming},
  booktitle = {Proceedings of the 21st ACM/IEEE International Conference on Human-Robot Interaction},
  series    = {HRI '26},
  year      = {${YEAR}},
  address   = {Edinburgh, Scotland, UK},
  publisher = {ACM},
  doi       = {${DOI}}
}`;
