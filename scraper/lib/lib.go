package lib

import (
	"fmt"
	"os"
)

func Check(error error) {
	if error != nil {
		fmt.Println(error)
		os.Exit(1)
	}
}

func WriteJSON(data []byte, path string) {
	err := os.WriteFile(path, data, 0666)
	Check(err)
}
