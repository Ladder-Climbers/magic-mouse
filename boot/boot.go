package boot

import (
	"fmt"
	"magic_mouse/app/model/mgmargs"
	"magic_mouse/app/service/droperror"
	"magic_mouse/app/service/ipget"
	"math"
)

func init() {
	fmt.Println("Your IP address(es):")
	ips, err := ipget.GetLocalIP()
	droperror.DropError(err)
	for _, ip := range ips {
		fmt.Println("\t", ip)
	}
	mgmargs.Screen = GetScreenMetrics()
	mgmargs.Distance = float32(math.Sqrt(float64(mgmargs.Screen.Height*mgmargs.Screen.Height +
		mgmargs.Screen.Width*mgmargs.Screen.Width)))
}
