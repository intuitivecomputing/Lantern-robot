interface DriveVideoProps {
    id: string;
    title: string;
    className?: string;
    /** Defer loading until the player is near the viewport. */
    lazy?: boolean;
}

/**
 * Google Drive's preview player for a shared video. Size it with className.
 * The player lays itself out for a frame at least ~300px tall and crops
 * anything shorter, hiding the bottom of the video and its controls.
 */
export function DriveVideo({ id, title, className = "", lazy = false }: DriveVideoProps) {
    return (
        <iframe
            src={`https://drive.google.com/file/d/${id}/preview`}
            title={title}
            allow="autoplay; fullscreen"
            allowFullScreen
            loading={lazy ? "lazy" : undefined}
            className={`min-h-[300px] border-0 ${className}`}
        />
    );
}
