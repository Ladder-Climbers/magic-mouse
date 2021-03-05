package main

func dropError(e error) {
	if e != nil {
		panic(e)
	}
}
