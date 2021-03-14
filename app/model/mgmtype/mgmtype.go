package mgmtype

type DataType struct {
	Alpha    float32  `json:"alpha"`
	Beta     float32  `json:"beta"`
	Gamma    float32  `json:"gamma"`
	Keys     []string `json:"keys"`
	MouseKey int      `json:"mouse_key"`
	Message  string   `json:"message"`
	Token    string   `json:"token"`
}

type Message struct {
	Cmd  string   `json:"cmd"`
	Data DataType `json:"data"`
}

type Angle struct {
	Alpha float32
	Beta  float32
	Gamma float32
}

type Screen struct {
	Width  int
	Height int
}
