
/* ??? */
/*
var sample;
(async () => {
	sample = await require('../main/sample.js')();
})();
*/

import {readFileSync} from 'fs';
var sample = readFileSync(`${__dirname}/../main/syntax.sample`, 'utf-8').split(/[\r\n\t]/).join(' ');

var regexp = require('../main/regexp.js');
var index = require('../main/index.js');

var parser = new index;
console.debug(parser.parse_regexp(sample, true));
