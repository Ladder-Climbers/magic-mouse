package boot

import (
	"magic_mouse/app/model/mgmtype"
	"syscall"
)

func callDLL(nIndex int) int {
	ret, _, _ := syscall.NewLazyDLL(`User32.dll`).NewProc(`GetSystemMetrics`).Call(uintptr(nIndex))
	return int(ret)
}

func GetScreenMetrics() mgmtype.Screen {
	return mgmtype.Screen{callDLL(0), callDLL(1)}
}
