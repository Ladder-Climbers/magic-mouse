package main

type DataType struct {
	Alpha   float32 `json:"alpha"`
	Beta    float32 `json:"beta"`
	Gamma   float32 `json:"gamma"`
	Keys    []int   `json:"keys"`
	Message string  `json:"message"`
}

type Message struct {
	Cmd  string   `json:"cmd"`
	Data DataType `json:"data"`
}
