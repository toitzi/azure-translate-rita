/**
 *
 * Source: https://docs.microsoft.com/en-us/azure/cognitive-services/translator/language-support
 *
 * The languages that Azure Translate supports alongside with their ISO 639-1 codes (not always correct iso code tho)
 * See https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
 */

const langs = {
    auto: 'Automatic',
    af: 'Afrikaans',
    sq: 'Albanian',
    am: 'Amharic',
    ar: 'Arabic',
    hy: 'Armenian',
    az: 'Azerbaijani',
    be: 'Belarusian',
    bn: 'Bengali',
    bs: 'Bosnian',
    bg: 'Bulgarian',
    ca: 'Catalan',
    'zh-Hans': 'Chinese (Simplified)',
    'zh-Hant': 'Chinese (Traditional)',
    hr: 'Croatian',
    cs: 'Czech',
    da: 'Danish',
    nl: 'Dutch',
    en: 'English',
    et: 'Estonian',
    fil: 'Filipino',
    fi: 'Finnish',
    fr: 'French',
    ka: 'Georgian',
    de: 'German',
    el: 'Greek',
    gu: 'Gujarati',
    ht: 'Haitian Creole',
    he: 'Hebrew',
    hi: 'Hindi',
    mww: 'Hmong Daw',
    hu: 'Hungarian',
    is: 'Icelandic',
    id: 'Indonesian',
    ga: 'Irish',
    it: 'Italian',
    ja: 'Japanese',
    kn: 'Kannada',
    kk: 'Kazakh',
    km: 'Khmer',
    ko: 'Korean',
    ku: 'Kurdish (Kurmanji)',
    ky: 'Kyrgyz',
    lo: 'Lao',
    lv: 'Latvian',
    lt: 'Lithuanian',
    mk: 'Macedonian',
    mg: 'Malagasy',
    ms: 'Malay',
    ml: 'Malayalam',
    mt: 'Maltese',
    mi: 'Maori',
    mr: 'Marathi',
    my: 'Myanmar (Burmese)',
    ne: 'Nepali',
    nb: 'Norwegian',
    ps: 'Pashto',
    fa: 'Persian',
    pl: 'Polish',
    pt: 'Portuguese',
    pa: 'Punjabi',
    ro: 'Romanian',
    ru: 'Russian',
    sm: 'Samoan',
    sk: 'Slovak',
    sl: 'Slovenian',
    es: 'Spanish',
    sw: 'Swahili',
    sv: 'Swedish',
    ta: 'Tamil',
    te: 'Telugu',
    th: 'Thai',
    tr: 'Turkish',
    uk: 'Ukrainian',
    ur: 'Urdu',
    uz: 'Uzbek',
    vi: 'Vietnamese',
    cy: 'Welsh',
};

/**
 * Returns the ISO 639-1 code of the desiredLang – if it is supported by Azure
 * @param {string} desiredLang – the name or the code(case sensitive) of the desired language
 * @returns {string|boolean} The ISO 639-1 code of the language or false if the language is not supported
 */
function getCode(desiredLang) {
    if (!desiredLang) {
        return false;
    }

    if (langs[desiredLang]) {
        return desiredLang;
    }

    const key = Object.keys(langs).find(key => langs[key]?.toString()?.toLowerCase() === desiredLang.toLowerCase());

    return key || false;
}

/**
 * Returns true if the desiredLang is supported by Azure Translate and false otherwise
 * @param desiredLang – the ISO 639-1 code or the name of the desired language
 * @returns {boolean}
 */
function isSupported(desiredLang) {
    return Boolean(getCode(desiredLang));
}

module.exports = langs;
module.exports.isSupported = isSupported;
module.exports.getCode = getCode;
