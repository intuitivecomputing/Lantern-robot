// Shared with the M site (intuitivecomputing/M-robot, apps/M-website/src/app/data/collective.ts);
// only CURRENT_ROBOT_ID differs. Change both together.

// The open robot collective: every robot's site names its siblings, like
// volumes in one series. Add a robot here (and on each sibling's site) to
// list it everywhere.

export interface CollectiveRobot {
    id: string;
    name: string;
    url: string;
}

export const COLLECTIVE_NAME = "open robot collective";

export const ROBOTS: CollectiveRobot[] = [
    { id: "m", name: "m", url: "https://intuitivecomputing.github.io/M-robot/" },
    // The HRI '26 paper cites https://lantern-website-iota.vercel.app/; keep
    // that address working (or redirecting here).
    { id: "lantern", name: "lantern", url: "https://intuitivecomputing.github.io/Lantern-robot/" },
];

/** This site's entry in ROBOTS. */
export const CURRENT_ROBOT_ID = "lantern";
