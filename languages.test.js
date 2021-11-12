const test = require('ava');
const translate = require('./index.js');

const apiKey = ''; // SPECIFY YOUR KEY FOR THIS TESTS TO WORK;

test('translate from en to de (German) - Hello', async t => {
    const resource = await translate('hello', {from: 'en', to: 'de', apiKey});
    t.is(resource.text, 'Hallo');
});

test('translate from de to cs (Czech) - Hallo', async t => {
    const resource = await translate('hallo', {from: 'de', to: 'cs', apiKey});
    t.is(resource.text, 'Dobrý den');
});

