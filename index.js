
var bignum = require('bignum');
var Netmask = require('netmask').Netmask;

// The first 1 and last 128 addresses in a subnet in IPv6 
// are always reserved for anycast:
// https://www.iana.org/assignments/ipv6-anycast-addresses/ipv6-anycast-addresses.xml
var ANYCAST_RESERVED_FIRST = 1;
var ANYCAST_RESERVED_LAST = 128;

function num2ip(num) {
    var parts = [];
    var i, part;
    for(i=7; i >= 0; i--) {
        part = num.shiftRight(16 * i).and(parseInt("FFFF", 16))
        parts.push(part.toString(16));
    }
    
    return expandIP(parts.join(':'));
}


function ip2num(ip) {
    var num = bignum(0);
    var parts = ip.split(':');
    var i, part;
    for(i=0; i < parts.length; i++) {
        part = parts[i];
        num = num.add(bignum(parseInt(part, 16)).shiftLeft(16 * (7-i)));
    }
    return num;
}

function baseAddr(ipNum, bitmask) {
    var unmasked = 128 - bitmask;
    var bitStr = '';
    while(bitmask--) {
        bitStr += '1';
    }
    while(unmasked--) {
        bitStr += '0';
    }

    var maskNum = bignum(bitStr, base=2);
    return ipNum.and(maskNum);    
}

function endAddr(baseNum, bitmask) {
    var size = subnetSize(bitmask);
    return baseNum.add(size.sub(1));
}

function subnetSize(bitmask) {
    var unmasked = 128 - bitmask;
    var bitStr = '';
    while(unmasked--) {
        bitStr += '1';
    }
    return bignum(bitStr, base=2).add(1);
}


// converts ip to shorthand format, e.g:
// this: 00ff:00da:food:0000:0000:0000:feed:cafe
// becomes: ff:da:food::feed:cafe
function compressIP(ip) {
    // TODO implement
    throw "Not implemented"
}

// expand an IPv6 IP with double-colons
function expandIP(ip) {

    // first expand '::' parts
    var parts = ip.split(/:+/);
    var newParts = [];
    var i;
    for(i=0; i < parts.length; i++) {
        if(parts[i]) {
            newParts.push(parts[i]);
        }
    }

    var missing;
    if(newParts.length < 8) {
        if(ip.indexOf('::') < 0) { // no way to expand
            return null;
        }
        missing = 8 - newParts.length;
        var expansion = ':';
        for(i=0; i < missing; i++) {
            expansion += '0:';
        }
        ip = ip.replace('::', expansion);
    }
    ip = ip.replace(/^:/, '').replace(/:$/, '');

    // then expand zeroes
    parts = ip.split(':');
    for(i=0; i < parts.length; i++) {
        missing = 4 - parts[i].length;
        while(missing--) {
            parts[i] = '0'+parts[i];
        }
    }
    return parts.join(':');
}

var netmask6 = function(net, mask) {

    if(net.indexOf(':') > -1) {
        this.ipVersion = 6;
    } else {
        this.ipVersion = 4;
    }

    if(this.ipVersion == 6) {

        var parts;
        if(net.indexOf('/') > -1) {
            parts = net.split('/');
            net = parts[0];
            this.mask = parseInt(parts[1]);
        } else if(mask) {
            this.mask = parseInt(mask);
        } else {
            return null;
        }

        this.ip = expandIP(net);
        if(!this.ip) {
            return null;
        }
        this.ipNum = ip2num(this.ip);
        this.baseNum = baseAddr(this.ipNum, this.mask);
        this.base = num2ip(this.baseNum);

        this.start = this.base;

        this.first = num2ip(this.baseNum.add(ANYCAST_RESERVED_FIRST));

        this.size = subnetSize(this.mask);
        this.hosts = this.size.sub(ANYCAST_RESERVED_LAST).sub(ANYCAST_RESERVED_FIRST);
        this.endNum = endAddr(this.baseNum, this.mask);
        this.end = num2ip(this.endNum);
        this.last = num2ip(this.endNum.sub(ANYCAST_RESERVED_LAST));

        this.contains = function() {
            // TODO implement
            throw "Not implemented";
        };

        this.next = function() {
            // TODO implement
            throw "Not implemented";
        };

    } else {

        // TODO just use the netmask functions
        throw "Not implemented";

    }

};


module.exports = function(net, mask) {
    return new netmask6(net, mask);
}
