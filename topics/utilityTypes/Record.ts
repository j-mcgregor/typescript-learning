import { logger, logLine } from '../functions';

/**
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 * RECORD
 * Constructs a type with a set of properties K of type T.
 * This utility can be used to map the properties of a type to another type.
 * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 */

//  Property K...
type Page = 'home' | 'about' | 'contact';

enum EPage {
    HOME = 'home',
    ABOUT = 'about',
    CONTACT = 'contact'
}

// of type T
interface PageInfo {
    title: string;
}

const record1: Record<Page, PageInfo> = {
    about: { title: 'about' },
    contact: { title: 'contact' },
    home: { title: 'home' }
    // gallery: { title: 'gallery' } // Error: property 'gallery' doesn't exist on type Record<Page, PageInfo>
};

// The below is almost identical but a slightly different way of doing it
const record2: Record<EPage, PageInfo> = {
    [EPage.ABOUT]: { title: 'about' },
    [EPage.CONTACT]: { title: 'contact' },
    [EPage.HOME]: { title: 'home' }
    // [EPage.GALLERY]: { title: 'gallery' } // Error: property 'gallery' doesn't exist on type Record<Page, PageInfo>,
    // gallery: { title: 'gallery' } // Error: property 'gallery' doesn't exist on type Record<Page, PageInfo>
};

export default function() {
    logLine('↓↓↓ Record ↓↓↓');
    logger(record1, true);
    logger(record2, true);
    logLine('↑↑↑ Record ↑↑↑');
}
