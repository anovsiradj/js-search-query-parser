
/**
* 
* @author Mayendra Costanov (anovsiradj) <anov.siradj22@gmail.com>
* @version 0.0.1
* @license MIT
* 
*/

'use strict';

function func(query, options={}) {
	this.regexp = func.defaults.regexp;
	this.query = null;
	this.result = null;

	this.options = {};
	Object.assign(this.options, func.defaults.options);
	this.settings(options);

	this.parse(query);
}

func.defaults = {
	regexp: require('./regexp.js'),
	options: {},
};

func.prototype.settings = function(options={}) {
	Object.assign(this.options, options);
};

// q=query,b=buffer //
func.prototype.parse_regexp = function(query,is_debug=false) {
	if (query) this.query = query;

	let result = [];

	let b;
	while((b = this.regexp.exec(this.query)) !== null) {
		if (is_debug) {
			result.push(b);
			continue;
		}

		b = b.groups;
		let data = {};

		if (b.term) data.type = 'term';
		if (b.kv) data.type = 'keyvalue';

		let data_sign = b.term_sign || b.kv_sign || null;
		if (data_sign) data.sign = data_sign;

		if (data.type === 'term') {
			data.term = b.term1 || b.term2 || b.term3;
		}

		if (data.type === 'keyvalue') {
			data.key = b.k1 || b.k2 || b.k3;
			data.value = b.v1 || b.v2 || b.v3;
		}

		result.push(data);
	}

	if (is_debug) return result;
	this.result = result;
};

func.prototype.parse = function(query) {
	this.parse_regexp(query);

	if (this.result.length) return true;
	return false;
};

func.prototype.get = function() {
	return this.result;
};

func.prototype.get_term = function(options={}) {
	let options_default = {
		is_flat: false,
		term_only: false,
	};
	for(let i in options_default) if (!(i in options_default)) options[i] = options_default[i];

	let list = [];
	this.result.forEach(data => {
		if (data.type !== 'term') return;

		if (options.term_only) return list.push(data.term);

		if (options.is_flat) {
			let item = [data.term];
			if(data.sign) item.push(data.sign);

			return list.push(item);
		}

		return list.push(data);
	});
	return list;
};

func.prototype.get_keyvalue = function(options={}) {
	let options_default = {
		is_flat: false,
		is_object: false, // todo
	};
	for(let i in options_default) if (!(i in options_default)) options[i] = options_default[i];

	let list = [];
	this.result.forEach(data => {
		if (data.type !== 'keyvalue') return;

		if (options.is_flat) {
			let item = [data.key, data.value];
			if (data.sign) item.push(data.sign);

			return list.push(item);
		}

		list.push(data);
	});
	return list;
};

func.prototype.build = function() {
	// todo // re-build parsed query //
};

globalThis.SearchQueryParser = func;

module.exports = func;
