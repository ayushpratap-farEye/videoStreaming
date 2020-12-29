const fs = require('fs');
const dir = __dirname + '/../videos';
console.log(`dir : ${dir}`);
const files = fs.readdirSync(dir);

module.exports.files = files;