package boot

import (
	"fmt"
	"magic_mouse/app/model/mgmargs"
	"magic_mouse/app/service/ipget"
	"math"
)

func init() {
	fmt.Println(ipget.GetLocalIP())
	mgmargs.Screen = GetScreenMetrics()
	mgmargs.Distance = float32(math.Sqrt(float64(mgmargs.Screen.Height*mgmargs.Screen.Height +
		mgmargs.Screen.Width*mgmargs.Screen.Width)))
}
