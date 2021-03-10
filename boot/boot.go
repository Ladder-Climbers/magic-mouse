package boot

import "magic_mouse/app/model/mgmargs"

func init() {
	mgmargs.Distance = 1080
	mgmargs.Screen = GetScreenMetrics()
}
