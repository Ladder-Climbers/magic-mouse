package main

import "syscall"

func callDLL(nIndex int) int {
	ret, _, _ := syscall.NewLazyDLL(`User32.dll`).NewProc(`GetSystemMetrics`).Call(uintptr(nIndex))
	return int(ret)
}

func GetScreenMetrics() Screen {
	return Screen{callDLL(0), callDLL(1)}
}
