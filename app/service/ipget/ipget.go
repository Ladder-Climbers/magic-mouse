package ipget

import "net"

func GetLocalIP() (ipv4 []string, err error) {
	var (
		addrs   []net.Addr
		addr    net.Addr
		ipNet   *net.IPNet
		isIpNet bool
	)
	if addrs, err = net.InterfaceAddrs(); err != nil {
		return
	}
	for _, addr = range addrs {
		if ipNet, isIpNet = addr.(*net.IPNet); isIpNet && !ipNet.IP.IsLoopback() {
			if ipNet.IP.To4() != nil && ipNet.IP.String()[:7] != "169.254" {
				ipv4 = append(ipv4, ipNet.IP.String())
			}
		}
	}
	return
}
