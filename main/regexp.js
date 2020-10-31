
/* source ./syntax.regexp */
module.exports = /(?<kv>(?<kv_sign>[^\s\t\r\n0-9a-zA-Z'"])?(?<k>'(?<k1>[^']*)'|"(?<k2>[^"]*)"|(?<k3>\w+))[:=](?<v>'(?<v1>[^']*)'|"(?<v2>[^"]*)"|(?<v3>\w+)))|(?<term>(?<term_sign>[^\s\t\r\n0-9a-zA-Z'"])?(?:'(?<term1>[^']*)'|"(?<term2>[^"]*)"|(?<term3>\w+)))/g;
