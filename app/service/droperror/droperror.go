package droperror

import "fmt"

func DropError(err error) {
	if err != nil {
		fmt.Println("Error: %s", err.Error())
		panic(err)
	}
}