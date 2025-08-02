package main

import (
	"context"
	"log"
	"os"

	"github.com/a-h/templ"
)

var components = map[string]func() templ.Component{
	"404.html":   NotFound,
	"index.html": Index,
	"about_me.html": AboutMe,
	"contact.html": Contact,
	"thank_you.html": ThankYou,
}

// main - generate components and output to *.html files
func main() {
	for file, component := range components {
		f, err := os.Create(file)
		if err != nil {
			log.Fatalf("failed to create html file: %v", err)
		}
		if err = component().Render(context.Background(), f); err != nil {
			log.Fatalf("failed to write output html file: %v", err)
		}
	}
}
