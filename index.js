const got = require('got');
const languages = require('./languages.js');

function translate(text, options, gotopts) {
    options = options || {};
    gotopts = gotopts || {};
    let error;

    for (const lang of [options.from, options.to]) {
        if (lang && !languages.isSupported(lang)) {
            error = new Error('The language \'' + lang + '\' is not supported');
            error.code = 400;
        }
    }

    options.apiKey = options.apiKey || '';
    if (options.apiKey === '') {
        error = new Error('Please provide an API Key');
        error.code = 400;
    }

    if (error) {
        return new Promise((resolve, reject) => {
            reject(error);
        });
    }

    options.from = options.from || 'auto';
    options.to = options.to || 'en';

    options.from = languages.getCode(options.from);
    options.to = languages.getCode(options.to);

    options.domain = options.domain || 'https://api.cognitive.microsofttranslator.com';

    let url = options.domain + '/translate?api-version=3.0&to=' + options.to;
    if (options.from !== undefined && options.from !== 'auto') {
        url += '&from=' + options.from;
    }

    if (gotopts.headers === undefined) {
        gotopts.headers = {};
    }

    gotopts.headers['Ocp-Apim-Subscription-Key'] = options.apiKey;
    gotopts.headers['content-type'] = 'application/json;charset=UTF-8';

    gotopts.body = JSON.stringify([{Text: text}]);

    return got.post(url, gotopts).then(response => {
        const result = {
            text: '',
            from: {
                language: {
                    iso: '',
                },
            },
            raw: '',
        };

        if (options.raw) {
            result.raw = response.body;
        }

        const json = JSON.parse(response.body)?.[0];
        if (json === undefined || json.error !== undefined || json.translations === undefined || json.translations.length <= 0) {
            return result;
        }

        result.text = json.translations[0].text;
        result.from.language.iso = options.from;

        return result;
    }).catch(error => {
        error.message += `\nUrl: ${url}`;
        error.code = error.statusCode !== undefined && error.statusCode !== 200 ? 'BAD_REQUEST' : 'BAD_NETWORK';

        throw error;
    });
}

module.exports = translate;
module.exports.languages = languages;
