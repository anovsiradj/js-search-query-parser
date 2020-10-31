

const {readFile} = require('fs').promises;

const path = `${__dirname}/syntax.sample`;

async function func() {
	let sample = await readFile(path, 'utf-8');
	return sample.split(/[\r\n\t]/g).join(' ');
}

module.exports = func;
