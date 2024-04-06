FROM golang:1.22

WORKDIR /app

COPY go.mod go.sum ./

RUN go mod download

COPY *.go ./

# calling binary dockerized-api
RUN CGO_ENABLED=0 GOOS=linux go build -o /dockerized-api

EXPOSE 8080

# running the binary created
CMD ["/dockerized-api"]
