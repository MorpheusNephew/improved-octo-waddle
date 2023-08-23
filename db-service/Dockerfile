FROM golang:1.21.0-bullseye

WORKDIR /app

COPY . .

RUN go build ./cmd/main.go

ENTRYPOINT [ "./main" ]
