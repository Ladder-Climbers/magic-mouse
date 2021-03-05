package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
)

var indexHTML []byte // = bytes.NewBuffer([]byte{})
// 运行配置
var configRefreshIndex bool = true

func index(w http.ResponseWriter, r *http.Request) {
	if len(indexHTML) == 0 || configRefreshIndex {
		// 读取index
		f, err := ioutil.ReadFile("./frontend/index.html")
		if err != nil {
			fmt.Println("read fail", err)
		}
		indexHTML = f
	}
	log.Printf("visit index")
	w.Write(indexHTML)
}

func main() {
	// 建立静态文件服务器
	fs := http.FileServer(http.Dir("./frontend/"))
	http.HandleFunc("/", index)
	http.Handle("/static/", http.StripPrefix("/static/", fs))
	http.ListenAndServe(":14514", nil)
}
