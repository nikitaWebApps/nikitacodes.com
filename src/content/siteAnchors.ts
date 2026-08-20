import {t} from "../i18n/translations.ts";
import {getResumePath} from "../js/utils.ts";

export const siteAnchors = [
    {
        href: getResumePath(),
        label: (lang: 'en') => t[lang].download_cv
    },
    {
        href: '#resume',
        label: (lang: 'en') => t[lang].experience
    },
    {
        href: '#projects',
        label: (lang: 'en') => t[lang].selectedProjects
    },

]
