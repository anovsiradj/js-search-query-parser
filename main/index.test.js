
const {readFile} = require('fs').promises;
const index = require('./index.js');

var sample;
var runner;

test('load_sample_file', async () => {
	sample = await require('./sample.js')();
});

test('init', () => {
	runner = new index;
});

test('settings', () => {
	runner.settings( {test:'test'} );
	expect( runner.options.test ).toBe('test');
});

test('parse', () => {
	expect( runner.parse(sample) ).toBe(true);
});

test('check parsed result', () => {
	let expected = [
		{term: 'word', type: 'term'},
		{key: 'key', value: 'value', type: 'keyvalue'},
	];
	expect( runner.result ).toEqual( expect.arrayContaining(expected) );
});

test('get_term', () => {
	let expected = [
		{type: 'term', term: 'word'},
		{type: 'term', term: 'hash', sign: '#'},
	];
	expect( runner.get_term() ).toEqual( expect.arrayContaining(expected) );
});

test('get_term term_only', () => {
	let expected = ['word', 'hash'];
	expect( runner.get_term({term_only:true}) ).toEqual( expect.arrayContaining(expected) );
});

test('get_term is_flat', () => {
	let expected = [
		['word'],
		['hash','#'],
	];
	expect( runner.get_term({is_flat:true}) ).toEqual( expect.arrayContaining(expected) );
});

test('get_keyvalue', () => {
	let expected = [
		{type: 'keyvalue', key: 'key', value: 'value'},
		{type: 'keyvalue', key: 'key', value: 'value', sign: '#'},
	];
	expect( runner.get_keyvalue() ).toEqual( expect.arrayContaining(expected) );
});

test('get_keyvalue is_flat', () => {
	let expected = [
		['key','value'],
		['key','value', '#'],
	];
	expect( runner.get_keyvalue({is_flat:true}) ).toEqual( expect.arrayContaining(expected) );
});
