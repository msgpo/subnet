#!/usr/bin/env nodejs

var netmask6 = require('../index.js');

var nm;

console.log('---------------------------');

nm = netmask6('fe80::d00f:76e5:bff:fed5:7842', 60);

console.log(nm.ip);
console.log(nm.base);
console.log(nm.first);
console.log(nm.last);
console.log('---------------------------');

nm = netmask6('2001:470:f401:123::1/48');

console.log(nm.ip);
console.log(nm.base);
console.log(nm.first);
console.log(nm.last);
console.log(nm.end);
console.log(nm.size.toString());
console.log('---------------------------');

nm = netmask6('FFFF:FFFF:FFFF:FFFF:FFFF:FFFF:FFFF:FFFF/64');

console.log(nm.ip);
console.log(nm.base);
console.log(nm.first);
console.log(nm.last);
console.log(nm.end);

console.log('---------------------------');
