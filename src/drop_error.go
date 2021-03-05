package main

// 一个“不负责任”的小函数，避免出现过多的 if err != nil 这种结构。
func dropError(e error) {
	if e != nil {
		panic(e)
	}
}
