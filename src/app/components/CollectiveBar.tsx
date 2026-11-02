// Shared with the M site (intuitivecomputing/M-robot, apps/M-website/src/app/components/CollectiveBar.tsx).
// Change both together until the collective's components live in one shared package.

import { COLLECTIVE_NAME, CURRENT_ROBOT_ID, ROBOTS } from "../data/collective";
import { Container } from "./layout";

/**
 * Series line above the header: the collective's name and every robot in it,
 * numbered like volumes. The current robot is marked, not linked.
 */
export function CollectiveBar() {
    return (
        <div className="bg-ink text-on-dark-label">
            <Container className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 py-2 font-mono text-xs">
                <span>{COLLECTIVE_NAME}</span>
                <nav aria-label={COLLECTIVE_NAME}>
                    <ol className="m-0 flex list-none flex-wrap gap-x-5 gap-y-1 p-0">
                        {ROBOTS.map((robot, i) => {
                            const volume = `vol. ${String(i + 1).padStart(2, "0")}`;
                            const current = robot.id === CURRENT_ROBOT_ID;
                            return (
                                <li key={robot.id}>
                                    {current ? (
                                        <span aria-current="page" className="text-on-dark">
                                            {volume} · {robot.name}
                                        </span>
                                    ) : (
                                        <a href={robot.url} className="text-on-dark-label no-underline hover:text-on-dark hover:underline">
                                            {volume} · {robot.name} ↗
                                        </a>
                                    )}
                                </li>
                            );
                        })}
                    </ol>
                </nav>
            </Container>
        </div>
    );
}
