export interface CipaFacilNavigationItem
{
    id?: string;
    title?: string;
    subtitle?: string;
    type:
        | 'aside'
        | 'basic'
        | 'collapsable'
        | 'divider'
        | 'group'
        | 'spacer';
    hidden?: (item: CipaFacilNavigationItem) => boolean;
    active?: boolean;
    disabled?: boolean;
    link?: string;
    externalLink?: boolean;
    exactMatch?: boolean;
    function?: (item: CipaFacilNavigationItem) => void;
    classes?: {
        title?: string;
        subtitle?: string;
        icon?: string;
        wrapper?: string;
    };
    icon?: string;
    badge?: {
        title?: string;
        classes?: string;
    };
    children?: CipaFacilNavigationItem[];
    meta?: any;
}

export type CipaFacilVerticalNavigationAppearance =
    | 'default'
    | 'compact'
    | 'dense'
    | 'futuristic'
    | 'thin'
    | string;

export type CipaFacilVerticalNavigationMode =
    | 'over'
    | 'side';

export type CipaFacilVerticalNavigationPosition =
    | 'left'
    | 'right';
