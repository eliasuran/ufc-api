FROM golang:1.22

WORKDIR /app

COPY go.mod go.sum ./

RUN go mod download

COPY *.go ./

# building binary dockerized-crawler
RUN CGO_ENABLED=0 GOOS=linux go build -o /dockerized-crawler

EXPOSE 8080

# running the binary created
CMD ["/dockerized-crawler"]
