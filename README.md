# azure-translate-api

An API for Azure Translate, designed for the Discord Translation Bot, [RITA](https://ritabot.org/).

## Features

- Auto language detection
- Source Language correction

## Usage

From automatic language detection to English:

``` js
const translate = require('rita-azure-translate-api');

translate('Ik spreek Engels', {to: 'en'}).then(res => {
    console.log(res.text);
    //=> I speak English
    console.log(res.from.language.iso);
    //=> nl
}).catch(err => {
    console.error(err);
});
```

## API

### translate(text, options)

#### text

Type: `string`

The text to be translated

#### options

Type: `object`

##### from

Type: `string` Default: `auto`

The `text` language. Must be `auto` or one of the codes/names (not case-sensitive) contained in [languages.js](https://github.com/toitzi/azure-translate-rita/blob/master/languages.js)

##### to

Type: `string` Default: `en`

The language in which the text should be translated. Must be one of the codes/names (not case-sensitive) contained in [languages.js](https://github.com/toitzi/azure-translate-rita/blob/master/languages.js).

##### raw

Type: `boolean` Default: `false`

If `true`, the returned object will have a `raw` property with the raw response (`string`) from azure Translate.

##### domain

Type: `string` Default: `"https://api.cognitive.microsofttranslator.com"`

Azure uses different domains for different regions, you can change this to fit the region you selected while creating the cognitive service

##### apiKey (required)

Type: `string` Default: `""`

Azure needs an API Key in order to accept request - even in the free version. Please specify your Azure Translator API Key!

### Returns an `object`:

- `text` *(string)* – The translated text.
- `from` *(object)*
    - `language` *(object)*
        - `iso` *(string)* - The [code of the language](https://github.com/toitzi/azure-translate-rita/blob/master/languages.js) the translated text is from.
- `raw` *(string)* - If `options.raw` is true, the raw response from Azure Translate servers. Otherwise, `''`.
