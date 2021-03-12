package boot

import (
	"magic_mouse/app/model/mgmargs"
	"math"
)

func init() {
	mgmargs.Screen = GetScreenMetrics()
	mgmargs.Distance = float32(math.Sqrt(float64(mgmargs.Screen.Height*mgmargs.Screen.Height +
		mgmargs.Screen.Width*mgmargs.Screen.Width)))
}
