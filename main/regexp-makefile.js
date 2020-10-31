
const {readFile,writeFile} = require('fs');

const input_path  = `${__dirname}/syntax.regexp`;
const output_path = `${__dirname}/regexp.js`;

const contents = regexp => {
	regexp = regexp.toString().split(/[\r\n\t]/g).join('');
	return `
/* source ./syntax.regexp */
module.exports = ${regexp};
`;
};

readFile(input_path, (err, data) => {
	if (err) throw err;
	writeFile(output_path, contents(data), (err) => {
		if (err) throw err;
	});
});
