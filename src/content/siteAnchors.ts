import {translations} from "../i18n/translations.ts";
import {getResumePath} from "../js/utils.ts";

export const siteAnchors = [
    {
        href: getResumePath(),
        label: (lang: 'en') => translations[lang].download_cv
    },
    /*    {
            href: '#projects',
            label: (lang: 'en') => translations[lang].selectedProjects
        },*/
    {
        href: '#resume',
        label: (lang: 'en') => translations[lang].experience
    },
    {
        href: '#education',
        label: (lang: 'en') => translations[lang].education
    },

]