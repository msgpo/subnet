
Library for comparing and calculating IPv6 and IPv4 subnets. 

This library uses [node-netmask](https://github.com/rs/node-netmask) for the IPv4 calculations.

THIS LIBRARY IS A WORK IN PROGRESS. DO NOT USE IT YET.

# Usage

All large numbers are represented as bignum objects from the [bignum npm package](https://github.com/justmoon/node-bignum).

## IPv6

```
var subnet = require('subnet');

var net = subnet('2001:470:f401::1/48');


net.ip;                       // 2001:470:f401:0000:0000:0000:0000:0001
net.base;                     // 2001:470:f401:0000:0000:0000:0000:0000
net.bitmask;                  // 48
net.size;                     // 1208925819614629174706176 (bignum)
net.first;                    // fe80:0000:0000:d000:0000:0000:0000:0001  (first IP for host assignment use)
net.last;                     // fe80:0000:0000:d00f:ffff:ffff:ffff:ff7f (last IP for host assignment use)
net.begin;                    // 2001:0470:f401:0000:0000:0000:0000:0000 (first IP in subnet)
net.end;                      // 2001:0470:f401:ffff:ffff:ffff:ffff:ffff (last IP in subnet)
```

## IPv4

```
var subnet = require('subnet');

var net = subnet('10.0.0.42/16');

net.base;                     // 10.0.0.0
net.mask;                     // 255.255.0.0
net.bitmask;                  // 12
net.hostmask;                 // 0.0.255.255
net.broadcast;                // 10.0.255.255
net.size;                     // 65536
net.first;                    // 10.0.0.1 (first IP for host assignment use)
net.last;                     // 10.0.255.254 (last IP for host assignment use)
net.begin;                    // 10.0.0.0 (first IP in subnet)
net.end;                      // 10.0.255.255 (last IP in subnet)
```

# Notes on IPv6 anycast

The last 128 addresses in an IPv6 subnet are reserved as anycast addresses according to [RFC 2526](http://tools.ietf.org/html/rfc2526) and the first address in an IPv6 subnet is reserved as the "subnet-router anycast address" according to [RFC 4291](https://tools.ietf.org/html/rfc4291). This is why the .first address is always offset from the first address in the subnet by 1 and the .last address is always offset from the last address in the subnet by 128.

If you want reserved anycast addresses included, simply use .begin and .end instead of .first and .last.

# Known bugs

This library does not support EUI-64 format addresses correctly in that it does not take into account when the universal/local bit must be set to 0. See section 2 in [RFC 2526](http://tools.ietf.org/html/rfc2526). 

# License and Copyright

Licensed under the [GPLv3](https://www.gnu.org/licenses/gpl-3.0.txt) as included in the COPYING file.

Copyright 2015 Marc Juul Christoffersen.