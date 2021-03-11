package droperror

import "fmt"

func DropError(err error) {
	if err != nil {
		fmt.Printf("Error: %s", err.Error())
		panic(err)
	}
}
