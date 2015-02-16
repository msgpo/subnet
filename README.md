
Library for comparing and calculating IPv6 and IPv4 subnets. This library used [node-netmask](https://github.com/rs/node-netmask) for the IPv4 calculations.

THIS LIBRARY IS A WORK IN PROGRESS. DO NOT USE IT YET.


# Notes on IPv6 anycast

The last 128 addresses in an IPv6 subnet are reserved as anycast addresses according to [RFC 2526](http://tools.ietf.org/html/rfc2526) and the first address in an IPv6 subnet is reserved as the "subnet-router anycast address" according to [RFC 4291](https://tools.ietf.org/html/rfc4291). This is why the .first address is always offset from the first address in the subnet by 1 and the .last address is always offset from the last address in the subnet by 128.

If you want reserved anycast addresses included, simply use .begin and .end instead of .first and .last.

# Known bugs

This library does not support EUI-64 format addresses correctly in that it does not take into account when the universal/local bit must be set to 0. See section 2 in [RFC 2526](http://tools.ietf.org/html/rfc2526). 